import { NextResponse } from 'next/server'
import { Dropbox } from 'dropbox'
import fetch from 'node-fetch'
import ytdl from 'ytdl-core'

export const runtime = 'nodejs' // 반드시 Node.js 런타임 사용

// 세션 업로드 시 한 번에 전송할 청크 크기 (8MB 권장)
const CHUNK_SIZE = 8 * 1024 * 1024

export async function POST(request: Request) {
  const { videoUrl } = await request.json()
  if (!videoUrl) {
    return NextResponse.json({ error: 'videoUrl is required' }, { status: 400 })
  }

  // 1) 유튜브 스트림 생성
  let stream: NodeJS.ReadableStream

  try {
    stream = ytdl(videoUrl, { quality: 'highest', filter: 'audioandvideo' })
  } catch (err) {
    return NextResponse.json({ error: 'Invalid video URL' }, { status: 400 })
  }

  // 2) Dropbox SDK 초기화
  const dbx = new Dropbox({
    accessToken: process.env.DROPBOX_ACCESS_TOKEN!,
    fetch,
  })

  let sessionId: string | undefined
  let offset = 0

  try {
    // 3) 스트림을 청크 단위로 읽어 Dropbox 세션 업로드
    for await (const chunk of stream) {
      console.log('debug 1')
      if (offset === 0) {
        // 세션 시작
        const resp = await dbx.filesUploadSessionStart({
          close: false,
          contents: chunk as Buffer,
        })
        sessionId = resp.result.session_id
      } else {
        console.log('debug 2')
        // 이어붙이기
        await dbx.filesUploadSessionAppendV2({
          cursor: { session_id: sessionId!, offset },
          close: false,
          contents: chunk as Buffer,
        })
      }
      offset += (chunk as Buffer).length
    }

    console.log('debug 3')

    // 4) 세션 종료 및 커밋
    const dropboxPath = `/videos/${Date.now()}.mp4`
    await dbx.filesUploadSessionFinish({
      cursor: { session_id: sessionId!, offset },
      commit: {
        path: dropboxPath,
        mode: { '.tag': 'add' },
        autorename: true,
        mute: false,
      },
    })

    // 5) 응답
    return NextResponse.json({
      success: true,
      message: 'Uploaded to Dropbox',
      path: dropboxPath,
    })
  } catch (err: any) {
    console.error('Upload error:', err)
    return NextResponse.json(
      { error: 'Upload failed', details: err.error || err.message },
      { status: 500 },
    )
  }
}
