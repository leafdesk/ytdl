import { Container } from '@chakra-ui/react'
import VideoDownloadUnit from './video-download-unit'
import VideoUploadUnit from './video-upload-unit'

export default function RootPage() {
  return (
    <Container className="flex flex-col md:flex-row" gap={4}>
      {/* @distube/ytdl-core 라이브러리 사용 */}
      <div className="flex-1">
        <VideoDownloadUnit />
      </div>

      {/* Video Upload to Dropbox */}
      <div className="flex-1">
        <VideoUploadUnit />
      </div>
    </Container>
  )
}
