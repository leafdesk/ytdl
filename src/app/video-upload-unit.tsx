'use client'

import { Button, Stack, Text } from '@chakra-ui/react'
import { uploadLocalFileToDropbox } from './actions/dropbox-upload-action'
import { useState } from 'react'

export default function VideoUploadUnit() {
  const localPath = '/Users/rian/Downloads/temp.mp4' // 업로드할 로컬 파일
  const dropboxPath = '/temp.mp4' // Dropbox 목적지
  const [isUploading, setIsUploading] = useState(false)

  const handleUpload = async () => {
    try {
      setIsUploading(true)
      await uploadLocalFileToDropbox(localPath, dropboxPath)
    } catch (error) {
      console.error(error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <>
      <Stack className="max-w-md">
        <Text>Upload to Dropbox</Text>

        <Button
          className="self-start"
          onClick={handleUpload}
          disabled={isUploading}
        >
          {isUploading ? '업로드 중...' : '업로드'}
        </Button>
      </Stack>
    </>
  )
}
