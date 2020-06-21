import React from 'react'
import { parse, HTMLElement, TextNode } from 'node-html-better-parser'
import { readFile } from '../services/fileManager'

export type Chapter = {
  title: string;
  htmlContent: string;
  parsedContent: HTMLElement;
  files: string[];
  updateTitle: (title: string) => void;
  updateHTML: (html: string, files?: string[]) => void;
}

const useChapter = (url: string, save: (html: string, files: string[]) => void) => {
  const [title, setTitle] = React.useState('')
  const [parsedContent, setParsedContent] = React.useState<HTMLElement | undefined>()
  const [files, setFiles] = React.useState<string[]>([])
  const html = React.useRef<string>('')
  React.useEffect(() => {
    (async function readHTML () {
      const htmlContent = await readFile(url)
      const content = parse(htmlContent)
      setParsedContent(content)
      html.current = htmlContent
      // TODO : maybe replace relative paths to absolute
      const newFiles = [...htmlContent.matchAll(/src\s*=\s*["'](?!http)(.*)["']/g)].map(entry => entry[1])
      setFiles(newFiles)
    })()
  }, [url])

  /** Update the chapter's html content */
  const updateContent = (updatedHTML: string) => {
    if (!parsedContent) return
    // If the div representing the title changed, we need to update the document title
    const newParsedContent = parse(updatedHTML)
    const newTitle = newParsedContent.querySelector('#title').text
    if (newTitle && title !== newTitle) {
      setTitle(title)
      newParsedContent.querySelector('title').childNodes = [new TextNode(title)]
    }
    setParsedContent(newParsedContent)
    html.current = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE html>` + newParsedContent.toString()
    const newFiles = [...html.current.matchAll(/src\s*=\s*["'](?!http)(.*)["']/g)].map(entry => entry[1])
    save(html.current, newFiles)
    setFiles(newFiles)
  }

  return { title, files, htmlContent: html.current, updateContent }
}

export default useChapter
