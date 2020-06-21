import { unzip as RNUnzip, zip as RNZip } from 'react-native-zip-archive'
import { DocumentDirectoryPath } from 'react-native-fs'
export * from 'react-native-fs'

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
export async function unzip (zipPath: string) {
  const folderName = zipPath.split('/').pop()
  const targetDir = DocumentDirectoryPath + '/unzippedChapters/' + folderName
  const unzippedBookPath = await RNUnzip(zipPath, targetDir)
  return unzippedBookPath
}

/**
 * zip folder
 * returns: zipped path
 */
export async function zip (folderPath: string, extension: 'epub' | 'zip') {
  const fileName = folderPath.split('/').pop() + '.' + extension
  const targetFile = DocumentDirectoryPath + '/zippedChapters/' + fileName
  const zippedPath = await RNZip(folderPath, targetFile)
  return zippedPath
}
