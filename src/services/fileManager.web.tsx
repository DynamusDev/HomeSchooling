import localforage from 'localforage'
import mime from '../services/mimeTypes'
import JSZip from 'jszip'

const blobToString = async (blob: Blob): Promise<string> => {
  const text: string = await new Promise((resolve) => {
    const reader = new FileReader()

    reader.addEventListener('loadend', () => {
      const text = reader.result as string
      resolve(text)
    })

    reader.readAsText(blob)
  })

  return text
}

const stringToBlob = (filename: string, text: string): Blob => {
  let type = mime.lookup(filename)
  if (!type) type = 'text/plain'

  const file = new Blob([text], { type })

  return file
}

export const readBlob = async (id: string) => {
  const blob: Blob = await localforage.getItem(id)

  if (!blob) return null

  return blob
}

export const readFile = async (id: string): Promise<string> => {
  const blob = await readBlob(id)

  if (!blob) return ''

  return blobToString(blob)
}

export const unlink = (id: string): Promise<void> => {
  return localforage.removeItem(id)
}

export const writeBlob = async (id: string, file: Blob) => {
  return localforage.setItem(id, file)
}

export const writeFile = async (id: string, content: string) => {
  return localforage.setItem(id, stringToBlob(id, content))
}

export const moveFile = async (to: string, from: string): Promise<boolean> => {
  const file = await readFile(to)

  if (!file) return false

  await writeFile(from, file)
  await unlink(to)

  return true
}

export const mkdir = async (filepath: string): Promise<void> => {
  console.log('creating directory', filepath)
  return Promise.resolve()
}

export async function download (id: string) {
  console.log('Downloading', id)
}

export async function upload (id: string, data: string) {
  console.log('Uploading', data, id)
}

/**
 * unzip file
 * return: folderPath
 */
export async function unzip (zipPath: string): Promise<string> {
  const blobFiles: Blob = await localforage.getItem(zipPath)
  if (!blobFiles) return ''

  const zip = new JSZip()
  const zippedFiles = await zip.loadAsync(blobFiles)
  const filenames = Object.keys(zippedFiles.files)

  const folderName = zipPath.split('/').pop()?.split('.')[0]
  const upzippedPath = `unzippedChapters/${folderName}`

  await Promise.all(filenames.map(async filename => {
    const compressedFile = zippedFiles.file(filename)

    if (compressedFile) {
      const fileBlob = await compressedFile.async('blob')
      const fileText = await blobToString(fileBlob)

      await writeFile(`${upzippedPath}/${filename}`, fileText)
    }
  }))

  return upzippedPath
  // return Promise.resolve('')
}

/**
 * zip folder
 * returns: zipped path
 */
export async function zip (folderPath: string, extension: 'epub' | 'zip') {
  const allKeys = await localforage.keys()

  if (!folderPath.endsWith('/')) folderPath = `${folderPath}/`

  const keys = allKeys.filter(key => key.startsWith(folderPath))

  if (keys.length === 0) return false

  const zip = new JSZip()

  await Promise.all(keys.map(async key => {
    const path = key.split('/')
    path.shift()

    const fileBlob = await readBlob(key)

    if (fileBlob) zip.file(path.join('/'), fileBlob)
  }))

  const zippedFiles = await zip.generateAsync({ type: 'blob' })
  const folderName = folderPath.substring(0, (folderPath.length - 1)).replace(/\//g, '-')
  const zippedPath = `zippedChapters/${folderName}.${extension}`

  await localforage.setItem(zippedPath, zippedFiles)

  return zippedPath
  // return Promise.resolve('')
}
