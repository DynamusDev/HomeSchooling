// import docx from 'html-docx-js'
// import toBuffer from 'blob-to-buffer'

// export async function htmlToDocx (html: string) {
//   const docxBlob = docx.asBlob(html)

//   const docxBuffer = await new Promise<Buffer>((resolve, reject) => {
//     toBuffer(docxBlob, function (err, buffer) {
//       if (err) reject(err)
//       resolve(buffer)
//     })
//   })

//   return docxBuffer
// }
