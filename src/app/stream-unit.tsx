'use client'

import { Button, Field, Fieldset, Input, Stack } from '@chakra-ui/react'
import { useState } from 'react'
import { api } from '@/lib/api'

export default function StreamUnit() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!videoUrl) return

    setIsProcessing(true)
    try {
      // 유튜브 비디오를 드롭박스로 직접 전송
      console.log(`전송 시작: URL=${videoUrl}`)
      const { data: transferResponse } = await api.youtube.transfer({
        videoUrl,
      })
      console.log('전송 완료:', transferResponse)
    } catch (error) {
      console.error('전송 오류:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Fieldset.Root size="lg" maxW="md">
        <Stack>
          <Fieldset.Legend>스트림 전송 유닛</Fieldset.Legend>
          <Fieldset.HelperText>
            유튜브 영상을 드롭박스로 직접 스트리밍합니다.
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
              placeholder="유튜브 영상 URL을 입력하세요"
            />
          </Field.Root>
        </Fieldset.Content>

        <Button type="submit" alignSelf="flex-start" disabled={isProcessing}>
          {isProcessing ? '처리 중...' : '스트림 전송'}
        </Button>
      </Fieldset.Root>
    </form>
  )
}
