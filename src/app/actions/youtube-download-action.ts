'use server'

import { Innertube } from 'youtubei.js'
import { writeFile } from 'node:fs/promises'
import { streamToBuffer } from '@/lib/utils/stream-utils'

export async function downloadVideo() {
  // 세션 생성
  const youtube = await Innertube.create()

  // 동영상 정보 조회 (전체 URL 또는 videoId 둘 다 가능)
  const info = await youtube.getInfo(
    // 'https://www.youtube.com/watch?v=aqz-KE-bpKQ',

    // 'https://youtu.be/prpVhI9TUHs',
    'https://www.youtube.com/watch?v=prpVhI9TUHs',
  )

  // 가장 높은 화질+오디오가 합쳐진 muxed 스트림 선택
  const format = info.chooseFormat({ type: 'video+audio', quality: 'best' })

  // 스트림 다운로드 (ReadableStream)
  const stream = await info.download({ format: format.itag.toString() })

  // 스트림을 파일로 저장
  const buffer = await streamToBuffer(stream)
  await writeFile('video.mp4', buffer)
  console.log('저장 완료')
}
