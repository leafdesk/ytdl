import { Button } from '@chakra-ui/react'
import { downloadVideo } from './actions/youtube-download-action'

/**
 * 유튜브 영상 다운로드 유닛
 * youtubei.js 라이브러리 사용
 */
export default function VideoDownloadUnitV2() {
  return (
    <>
      <Button onClick={downloadVideo}>다운로드</Button>
    </>
  )
}
