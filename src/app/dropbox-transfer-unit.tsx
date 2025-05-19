'use client'

import { Button, Field, Fieldset, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { api } from '@/lib/api'
import { uploadLocalFileToDropbox } from './actions/dropbox-upload-action'

export default function DropboxTransferUnit() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [videoUrl, setVideoUrl] = useState('https://youtu.be/prpVhI9TUHs')
  const [downloadPath, setDownloadPath] = useState('/Users/rian/Downloads')
  const [uploadPath, setUploadPath] = useState('/')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsProcessing(true)
    let fileName = ''

    try {
      // 1. 유튜브 비디오 다운로드
      console.log(`다운로드 시작: URL=${videoUrl}, Path=${downloadPath}`)
      const { data: downloadResponse } = await api.youtube.download({
        videoUrl,
        outputPath: downloadPath,
      })
      console.log('다운로드 완료:', downloadResponse)

      // 다운로드된 파일명 추출
      fileName = downloadResponse?.data?.fileName || ''
      if (!fileName) {
        throw new Error('다운로드된 파일명을 확인할 수 없습니다.')
      }

      // 2. 드롭박스에 업로드
      const sourcePath = `${downloadPath}/${fileName}`
      const destinationPath = `${uploadPath}${fileName}`

      console.log(`업로드 시작: 소스=${sourcePath}, 대상=${destinationPath}`)
      const uploadResponse = await uploadLocalFileToDropbox(
        sourcePath,
        destinationPath,
      )
      console.log('업로드 완료:', uploadResponse)
    } catch (error) {
      console.error('전송 오류:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend>드롭박스 전송 유닛</Fieldset.Legend>
            <Fieldset.HelperText>
              유튜브 영상을 다운로드하고 드롭박스로 업로드합니다.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>URL</Field.Label>
              <Input
                name="url"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                disabled={isProcessing}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Download Path (Local)</Field.Label>
              <Input
                name="downloadPath"
                value={downloadPath}
                onChange={(e) => setDownloadPath(e.target.value)}
                disabled={isProcessing}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Upload Path (Dropbox)</Field.Label>
              <Input
                name="uploadPath"
                value={uploadPath}
                onChange={(e) => setUploadPath(e.target.value)}
                disabled={isProcessing}
              />
            </Field.Root>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start" disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Download & Upload'}
          </Button>
        </Fieldset.Root>
      </form>
    </>
  )
}
