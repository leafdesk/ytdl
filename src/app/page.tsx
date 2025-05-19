import { Container } from '@chakra-ui/react'
import VideoDownloadUnit from './video-download-unit'
import VideoDownloadUnitV2 from './video-download-unit-v2'
import VideoUploadUnit from './video-upload-unit'

export default function RootPage() {
  return (
    <>
      {/* @distube/ytdl-core 라이브러리 사용 */}
      <Container>
        <VideoDownloadUnit />
      </Container>

      {/* blank */}
      <div className="h-16" />

      {/* youtubei.js 라이브러리 사용 */}
      {/* <Container>
        <VideoDownloadUnitV2 />
      </Container> */}

      {/* Video Upload to Dropbox */}
      <Container>
        <VideoUploadUnit />
      </Container>
    </>
  )
}
