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

export default function VideoDownloadUnit() {
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)

    const formData = new FormData(event.currentTarget)
    const url = formData.get('url') as string
    const downloadPath = formData.get('path') as string
    console.log(`URL: ${url}, Download Path: ${downloadPath}`)

    try {
      const response = await api.youtube.download(url, downloadPath)
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
            {isLoading ? '다운로드 중...' : '다운로드'}
          </Button>
        </Fieldset.Root>
      </form>
    </>
  )
}
