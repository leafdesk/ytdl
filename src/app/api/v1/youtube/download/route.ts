import { NextResponse } from 'next/server'
import { downloadVideo } from '@/lib/youtube/download'
import fs from 'fs'
import { createApiResponse } from '@/lib/api/api-response'
import { ResultCode } from '@/lib/api/result-code'

export async function POST(request: Request) {
  const { videoUrl, outputPath } = await request.json()

  // 출력 경로가 존재하지 않으면 생성
  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true })
  }

  try {
    // 비디오 다운로드 실행
    await downloadVideo(videoUrl, outputPath, (progress) => {
      console.log(`다운로드 진행 상황: ${progress}%`)
    })

    // 성공 응답 반환
    return NextResponse.json(
      createApiResponse({
        data: { outputPath },
        message: '다운로드가 완료되었습니다',
      }),
    )
  } catch (error) {
    // 에러 응답 반환
    const errorResponse = createApiResponse({
      message: '다운로드에 실패했습니다',
      code: ResultCode.INTERNAL_SERVER_ERROR,
      isSuccess: false,
      data: null,
    })

    return NextResponse.json(errorResponse, { status: 500 })
  }
}
