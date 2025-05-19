'use server'

import { Dropbox } from 'dropbox'
import fetch from 'node-fetch'
import * as fs from 'fs/promises'

export async function uploadLocalFileToDropbox(
  localPath: string,
  dropboxPath: string,
) {
  const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
    fetch,
  })

  const fileBuffer = await fs.readFile(localPath)

  const result = await dbx.filesUpload({
    path: dropboxPath,
    contents: fileBuffer,
    mode: { '.tag': 'add' }, // 이미 있으면 autorename 설정 가능
    autorename: true,
    mute: false,
  })

  // DropboxResponse
  console.log(result)
}
