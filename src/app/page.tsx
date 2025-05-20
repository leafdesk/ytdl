import { Container, Heading } from '@chakra-ui/react'
import VideoDownloadUnit from './video-download-unit'
import VideoUploadUnit from './video-upload-unit'
import DropboxTransferUnit from './dropbox-transfer-unit'
import StreamUnit from './stream-unit'

export default function RootPage() {
  return (
    <main>

      
      <Container className="flex items-center flex-col md:flex-row" gap={4}>
        {/* 스트림 전송 유닛 */}
        {/* <div className="flex-1">
          <StreamUnit />
        </div> */}

        {/* 드롭박스 전송 유닛 : 유튜브 비디오 다운로드 & 드롭박스 업로드 */}
        {/* <div className="flex-1">
          <DropboxTransferUnit />
        </div> */}
      </Container>

      {/* blank */}
      {/* <div className="h-16" /> */}

      <Container className="flex items-center flex-col md:flex-row" gap={4}>
        {/* @distube/ytdl-core 라이브러리 사용 */}
        {/* <div className="flex-1">
          <VideoDownloadUnit />
        </div> */}

        {/* Video Upload to Dropbox */}
        {/* <div className="flex-1">
          <VideoUploadUnit />
        </div> */}
      </Container>
    </main>
  )
}
