/**
 * ReadableStream을 Buffer로 변환합니다.
 */
export async function streamToBuffer(
  stream: ReadableStream<Uint8Array>,
): Promise<Buffer> {
  const reader = stream.getReader()
  const chunks: Uint8Array[] = []

  let done = false
  while (!done) {
    const { value, done: isDone } = await reader.read()
    done = isDone
    if (value) {
      chunks.push(value)
    }
  }

  const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0)
  const result = Buffer.alloc(totalLength)

  let offset = 0
  for (const chunk of chunks) {
    result.set(chunk, offset)
    offset += chunk.length
  }

  return result
}
