'use server'

import { Dropbox } from 'dropbox'
import fetch from 'node-fetch'
import * as fs from 'fs/promises'

/**
 * 로컬 파일을 Dropbox에 업로드.
 * @param localPath 로컬 파일 경로 (Source Path)
 * @param dropboxPath Dropbox 경로 (Destination Path)
 * @returns DropboxResponse
 */
export async function uploadLocalFileToDropbox(
  localPath: string,
  dropboxPath: string,
) {
  const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN,
    fetch,
  })

  const fileBuffer = await fs.readFile(localPath)

  return await dbx.filesUpload({
    path: dropboxPath,
    contents: fileBuffer,
    mode: { '.tag': 'add' }, // 이미 있으면 autorename 설정 가능
    autorename: true,
    mute: false,
  })
}
