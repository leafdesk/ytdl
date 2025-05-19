import { NextResponse } from 'next/server'
import { downloadVideo } from '@/lib/youtube/download'
import fs from 'fs'
import { createApiResponse } from '@/lib/api/api-response'
import { ResultCode } from '@/lib/api/result-code'
import { HttpStatusCode } from 'axios'
import { YoutubeDownloadResponse } from '@/lib/api/dto/youtube-download'

/**
 * POST /v1/youtube/download 요청.
 * > 유튜브 동영상 다운로드.
 */
export async function POST(request: Request) {
  const { videoUrl, outputPath } = await request.json()

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }
  try {
    const response = await downloadVideo(videoUrl, outputPath, (progress) => {
      console.log(`Download progress: ${progress}%`)
    })
    return NextResponse.json(
      createApiResponse({
        code: ResultCode.SUCCESS,
        message: 'Download completed.',
        data: response,
      }),
    )
  } catch (error) {
    return NextResponse.json(
      createApiResponse({
        code: ResultCode.INTERNAL_SERVER_ERROR,
        message: 'Download failed.',
        data: null,
      }),
      { status: HttpStatusCode.InternalServerError },
    )
  }
}
