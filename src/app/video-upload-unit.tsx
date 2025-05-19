'use client'

import { Button, Field, Fieldset, Input, Stack, Text } from '@chakra-ui/react'
import { uploadLocalFileToDropbox } from './actions/dropbox-upload-action'
import { useState, useEffect } from 'react'

export default function VideoUploadUnit() {
  const [isUploading, setIsUploading] = useState(false)
  const [sourcePath, setSourcePath] = useState('/Users/rian/Downloads/temp.mp4')
  const [destinationPath, setDestinationPath] = useState('/temp.mp4')

  useEffect(() => {
    const fileName = sourcePath.split('/').pop() || ''
    setDestinationPath(`/${fileName}`)
  }, [sourcePath])

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsUploading(true)

    try {
      const response = await uploadLocalFileToDropbox(
        sourcePath,
        destinationPath,
      )
      console.log('DropboxResponse:', response)
    } catch (error) {
      console.error('Upload Error:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSourcePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSourcePath(e.target.value)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend>Upload Video to Dropbox</Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide the file paths below.
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Source Path (Local)</Field.Label>
              <Input
                name="sourcePath"
                value={sourcePath}
                onChange={handleSourcePathChange}
                disabled={isUploading}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Destination Path (Dropbox)</Field.Label>
              <Input
                name="destinationPath"
                value={destinationPath}
                readOnly
                disabled={isUploading}
              />
            </Field.Root>
          </Fieldset.Content>

          <Button type="submit" alignSelf="flex-start" disabled={isUploading}>
            {isUploading ? 'Uploading...' : 'Upload'}
          </Button>
        </Fieldset.Root>
      </form>
    </>
  )
}
