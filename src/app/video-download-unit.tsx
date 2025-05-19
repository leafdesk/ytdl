'use client'

import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  NativeSelect,
  Stack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { api } from '@/lib/api'
import { YoutubeDownloadRequest } from '@/lib/api/dto/youtube-download'

export default function VideoDownloadUnit() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const request: YoutubeDownloadRequest = {
      videoUrl: formData.get('url') as string,
      outputPath: formData.get('path') as string,
    }
    console.log(
      `URL: ${request.videoUrl}, Download Path: ${request.outputPath}`,
    )

    try {
      const response = await api.youtube.download(request)
      console.log(response)
    } catch (error) {
      console.error('다운로드 오류:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend>Youtube Video Download</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide your video details below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>URL</Field.Label>
              <Input
                name="url"
                defaultValue="https://youtu.be/prpVhI9TUHs"
                disabled={isLoading}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Download Path (Local)</Field.Label>
              <Input
                name="path"
                type="text"
                defaultValue="/Users/rian/Downloads"
                disabled={isLoading}
              />
            </Field.Root>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start" disabled={isLoading}>
            {isLoading ? 'Downloading...' : 'Download'}
          </Button>
        </Fieldset.Root>
      </form>
    </>
  )
}
