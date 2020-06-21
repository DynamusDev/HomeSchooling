import React from 'react'
import { readFile, unlink, moveFile, writeFile, mkdir } from '../services/fileManager'
import { parse, HTMLElement, Attributes } from 'node-html-better-parser'
import { getLanguageTag } from '../services'
import mime from '../services/mimeTypes'

type Status = 'ready' | 'loading' | 'processing' | 'failed'

export type Book = {
  chaptersURL: string[];
  chaptersNames: string[];
  createChapter: (title: string, index: number) => void;
  deleteChapter: (index: number) => void;
  updateChapter: (index: number, html: string, files: string[]) => void;
  status: Status;
  error: Error | undefined;
}

const useBook = (path: string): Book => {
  const [OPF, setOPF] = React.useState<HTMLElement | undefined>()
  const [chaptersURL, setChaptersURL] = React.useState<string[]>([])
  const [chaptersNames, setChaptersNames] = React.useState<string[]>([])
  const [status, setStatus] = React.useState<Status>('loading')
  const [error, setError] = React.useState<Error | undefined>()

  // Read the content of the OPF file
  React.useEffect(() => {
    setStatus('processing');
    (async function loadBook (path: string) {
      try {
        const contentOPF = await readFile(path + '/OEPBS/content.opf')
        const parsedOPF = parse(contentOPF).removeWhitespace()
        setOPF(parsedOPF)

        // Get Manifest's attributes of each item
        const manifest = parsedOPF
          .querySelector('manifest')
          .querySelectorAll('item')
          .map((man: HTMLElement) => man.attributes)

        // Read the href attribute each item
        const chapters = parsedOPF
          .querySelector('spine')
          .querySelectorAll('itemref')
          .map((sp: HTMLElement) => sp.attributes)
          .map((itemRef: Attributes) => manifest.find(item => item.id === itemRef.idref))
          .filter((item: Attributes | undefined) => item)
          .map((item: Attributes | undefined) => path + '/OEPBS/' + item!.href)

        setChaptersURL(chapters)
        setStatus('ready')
      } catch (e) {
        setStatus('failed')
        setError(e)
      }
    })(path)
  }, [path])

  // Read the titles of each chapter
  React.useEffect(() => {
    setStatus('processing');
    (async function loadChaptersNames (chaptersURL: string[]) {
      try {
        const chaptersNames = await Promise.all(chaptersURL.map(async url => {
          const HTMLContent = await readFile(url)
          const content = parse(HTMLContent)
          const title = content.querySelector('title').text
          return title
        }))
        setChaptersNames(chaptersNames)
        setStatus('ready')
      } catch (e) {
        setStatus('failed')
        setError(e)
      }
    })(chaptersURL)
  }, [chaptersURL])

  /** Create a new chapter:
   * <ul>
   *   <li>Rename all following chapter folders and index.xhtml file</li>
   *   <li>Create the new chapter folder and index.xhtml</li>
   *   <li>Create new Manifest and Spine entry for the chapter</li>
   *   <li>Add the new chapter in this._chapters
   *   <li>Update the opf file</li>
   * </ul>
   */
  const createChapter = React.useCallback((title: string, index: number) => {
    if (!OPF) return
    setStatus('processing');

    (async function createChapterAtIndex (title: string, index: number) {
      try {
        const manifest = OPF.querySelector('manifest')
        const spine = OPF.querySelector('spine')
        const newChapterNumber = index + 1
        const newChapterToAddName = 'chapter' + newChapterNumber
        const chaptersCount = chaptersURL.length

        // Renaming attributes in manifest for chapters and images
        for (let i = chaptersCount - 1; i >= index; i--) {
          const currentChapterName = 'chapter' + (i + 1)
          const newChapterName = 'chapter' + (i + 2)
          const currentChapterPath = path + '/OEPBS/' + currentChapterName
          const newChapterPath = path + '/OEPBS/' + newChapterName

          manifest.childNodes.forEach(child => {
            if (!(child instanceof HTMLElement)) return
            // Change the id if concerned
            if (child.id.split('-')[0] === currentChapterName) {
              child.setAttribute('id', child.id.replace(currentChapterName, newChapterName))
            }
            // Change reference for chapter, images and other files
            child.setAttribute('href', child.attributes.href.replace(currentChapterName, newChapterName))
          })

          // Rename the folder
          await moveFile(currentChapterPath, newChapterPath)
        }

        // Add the chapter's entry to the manifest
        const newManifestNode = parse(
          `<item href="chapter${newChapterNumber}/index.xhtml" id="chapter${newChapterNumber}" media-type="application/xhtml+xml" >`
        ).firstChild
        manifest.appendChild(newManifestNode)

        // Add the reference to the spine
        const newSpineItem = parse(
          `<itemref idref="chapter${chaptersCount + 1}" >`
        ).firstChild
        spine.appendChild(newSpineItem)

        // Create new chapter folder and index.xhtml file
        const newChapterFolderPath = path + '/OEPBS/' + newChapterToAddName
        const newChapterContent = template(title)
        await mkdir(newChapterFolderPath)
        await writeFile(newChapterFolderPath + '/index.xhtml', newChapterContent)

        // rewrite content.opf file
        await writeFile(
          path + '/OEPBS/content.opf',
          '<?xml version=\'1.0\' encoding=\'utf-8\'?>' + OPF.toString()
        )

        // Add the chapter to this._chapters
        const newChaptersURL = [...chaptersURL].splice(index, 0, newChapterFolderPath)
        setChaptersURL(newChaptersURL)

        setStatus('ready')
      } catch (e) {
        setStatus('failed')
        setError(e)
      }
    })(title, index)
  }, [chaptersURL, OPF, path])

  /** Update the chapter's html content */
  const updateChapter = React.useCallback((index: number, html: string, files: string[]) => {
    if (!OPF) return
    setStatus('processing');
    (async function saveContent (url: string, html: string, files: string[]) {
      try {
        // Check the assets linked to the chapters
        const manifest = OPF.querySelector('manifest')
        const chapterName = url.substring(url.lastIndexOf('/'))
        const filesNodes = manifest.childNodes.filter(child => {
          if (!(child instanceof HTMLElement)) return false
          if (child.attributes.href === chapterName + '/index.xhtml') return false
          return child.attributes.href.startsWith(chapterName + '/')
        }) as HTMLElement[]

        const filesURL = filesNodes.map(file => file.attributes.href)
        const removedFiles = filesURL.filter(url => !files.includes(url))
        const addedFiles = files.filter(url => !filesURL.includes(url))

        // Erase from the manifest the assets that were removed from the file
        manifest.childNodes = manifest.childNodes.filter(child => (!(child instanceof HTMLElement)) || !removedFiles.includes(child.attributes.href))

        // Add to the manifest the new assets
        addedFiles.forEach(url => {
          const fileName = url.substring(url.lastIndexOf('/'))
          const newManifestNode = parse(
            `<item href="${url}" id="${chapterName}-${fileName}" media-type="${mime.lookup(fileName)}" >`
          ).firstChild
          manifest.appendChild(newManifestNode)
        })

        // rewrite content.opf file
        await writeFile(
          path + '/OEPBS/content.opf',
          '<?xml version=\'1.0\' encoding=\'utf-8\'?>' + OPF.toString()
        )

        await writeFile(url, html)
        setStatus('ready')
      } catch (e) {
        setStatus('failed')
        setError(e)
      }
    })(chaptersURL[index], html, files)
  }, [chaptersURL, OPF])

  /**
   * Delete a chapter:
   * <ul>
   *   <li>Delete chapter folder.</li>
   *   <li>Delete ref from this._chapters.</li>
   *   <li>Delete ref in manifest and spine (just last itemref)</li>
   *   <li>Rename attributes in manifest</li>
   *   <li>Delete chapter folder with xml and images</li>
   *   <li>Rewrite opf file</li>
   * </ul>
   **/
  const deleteChapter = React.useCallback((index: number) => {
    if (!OPF) return
    setStatus('processing');
    (async function deleteChapterAtIndex (index: number) {
      try {
        const chapterToDelete = 'chapter' + (index + 1)
        const chaptersCount = chaptersURL.length

        // Delete Chapters folder
        await unlink(path + '/OEPBS/' + chapterToDelete)

        // Delete chapter ref in the chaptersURLs
        const newChaptersURL = chaptersURL.filter((_, i) => i !== index)
        setChaptersURL(newChaptersURL)

        // We remove the chapter from the manifest
        const manifest = OPF.querySelector('manifest')
        manifest.childNodes = manifest.childNodes.filter(
          item => !(item instanceof HTMLElement) || !item.attributes.href.includes(chapterToDelete)
        )

        // Renaming attributes in manifest for chapters and images
        for (let i = index; i < chaptersCount; i++) {
          const currentChapterName = 'chapter' + (i + 2)
          const newChapterName = 'chapter' + (i + 1)
          const currentChapterPath = path + '/OEPBS/' + currentChapterName
          const newChapterPath = path + '/OEPBS/' + newChapterName

          // We decrease all url targetting the old chapter's folder to the new one
          manifest.childNodes.forEach(child => {
            if (!(child instanceof HTMLElement)) return
            // Change the id if concerned
            if (child.id.split('-')[0] === currentChapterName) {
              child.setAttribute('id', child.id.replace(currentChapterName, newChapterName))
            }
            // Change reference for chapter, images and other files
            child.setAttribute('href', child.attributes.href.replace(/currentChapterName(\D?)/g, newChapterName + '$1'))// We need to make sure that chapter10 doesn't match chapter1
          })

          // renaming folder
          await moveFile(currentChapterPath, newChapterPath)
        }

        // We just remove the last reference in the spine
        const spine = OPF.querySelector('spine')
        spine.childNodes.pop()

        // Update the file
        await writeFile(
          path + '/OEPBS/content.opf',
          '<?xml version=\'1.0\' encoding=\'utf-8\'?>' + OPF.toString()
        )
      } catch (e) {
        setStatus('failed')
        setError(e)
      }
    })(index)
  }, [OPF, chaptersURL, path])

  return { chaptersURL, chaptersNames, createChapter, deleteChapter, updateChapter, status, error }
}

/** Create an empty document */
const template = (title: string) => `<!DOCTYPE html>
<html lang="${getLanguageTag()}">
<head>
  <meta charset="UTF-8"></meta>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
  <meta http-equiv="X-UA-Compatible" content="ie=edge"></meta>
</head>
<body style="word-break: break-all;">
  <h1>${title}</h1>
</body>                                                                                                                 
</html>`

export default useBook
