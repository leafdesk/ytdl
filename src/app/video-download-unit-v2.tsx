import { Button } from '@chakra-ui/react'
import { downloadVideo } from './actions/youtube-download-action'
export default function VideoDownloadUnitV2() {
  return (
    <>
      <span>youtubei.js </span>

      <Button onClick={downloadVideo}>다운로드</Button>
    </>
  )
}
