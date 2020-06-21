import 'fake-indexeddb/auto'
import localforage from 'localforage'

import * as web from '../src/services/fileManager.web'

const generateContent = () => {
  return String(Date.now())
}

describe('File manager service', () => {
  afterEach(async () => {
    await localforage.clear()
  })

  it('should save and read files', async () => {
    const content = generateContent()
    const path = 'documents/test.txt'

    await web.writeFile(path, content)

    const storagedContent = await web.readFile(path)
    expect(storagedContent).toEqual(content)
  })

  it('should remove files', async () => {
    const content = generateContent()
    const path = 'documents/test.txt'

    await web.writeFile(path, content)

    const storaged = await web.readFile(path)
    expect(storaged).toEqual(content)

    await web.unlink(path)

    const removed = await web.readFile(path)
    expect(removed).toEqual('')
  })

  it('should move files', async () => {
    const content = generateContent()

    const originalPath = 'documents/test.txt'
    const newPath = 'files/test.txt'

    await web.writeFile(originalPath, content)
    await web.moveFile(originalPath, newPath)

    const oldPathFile = await web.readFile(originalPath)
    expect(oldPathFile).toEqual('')

    const newPathFile = await web.readFile(newPath)
    expect(newPathFile).toEqual(content)
  })

  it('should zip and unzip files', async () => {
    const file1Before = generateContent()
    const file2Before = generateContent()
    const file4Before = generateContent()

    await web.writeFile('documents/test1.txt', file1Before)
    await web.writeFile('documents/test2.txt', file2Before)
    await web.writeFile('documents/test3.md', generateContent())
    await web.writeFile('documents/sub/test4.txt', file4Before)
    await web.writeFile('files/documents/test5.txt', generateContent())
    await web.writeFile('files/test6.txt', generateContent())

    // zip
    const zippedPath = await web.zip('documents', 'epub')

    expect(zippedPath).toEqual('zippedChapters/documents.epub')

    const zippedFiles = await web.readBlob(zippedPath)

    expect(zippedFiles.type).toEqual('application/zip')

    // unzip
    const unzippedPath = await web.unzip(zippedPath)

    expect(unzippedPath).toEqual('unzippedChapters/documents')

    const test1After = await web.readFile('unzippedChapters/documents/test1.txt')
    const test2After = await web.readFile('unzippedChapters/documents/test2.txt')
    const test4After = await web.readFile('unzippedChapters/documents/sub/test4.txt')

    expect(test1After).toEqual(file1Before)
    expect(test2After).toEqual(file2Before)
    expect(test4After).toEqual(file4Before)
  })
})
