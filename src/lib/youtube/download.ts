import fs from 'fs'
import path from 'path'
import ytdl from '@distube/ytdl-core'

/**
 * 유튜브 API 키.
 */
const API_KEY = process.env.YOUTUBE_API_KEY

/**
 * 유튜브 API 요청 - 사용자 에이전트.
 */
const USER_AGENT = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36`

/**
 * 유튜브 API 요청 옵션.
 */
const REQUEST_OPTIONS = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'User-Agent': USER_AGENT,
  },
}

/**
 * 유튜브 API 파라미터 타입 정의.
 */
export type YoutubeApiParams = {
  channelId: string
  maxResults: number | string
  eventType: string
  type: string
  key: string
}

/**
 * 유튜브 API URL 생성.
 */
export const generateYoutubeApiUrl = (params: YoutubeApiParams): string => {
  const baseUrl = 'https://www.googleapis.com/youtube/v3/search'
  const queryParams = new URLSearchParams()
  queryParams.append('channelId', params.channelId)
  queryParams.append('maxResults', params.maxResults.toString())
  queryParams.append('eventType', params.eventType)
  queryParams.append('type', params.type)
  queryParams.append('part', 'snippet')
  queryParams.append('order', 'date')
  queryParams.append('key', params.key)
  return `${baseUrl}?${queryParams.toString()}`
}

/**
 * 유튜브 동영상 정보 가져오기.
 */
const getYoutubeVideoInfo = async (url: string) => {
  return await ytdl.getInfo(url, {
    requestOptions: REQUEST_OPTIONS,
  })
}

/**
 * 유튜브 URL 유효성 검사.
 */
const validateYoutubeUrl = (url: string) => {
  return ytdl.validateURL(url)
}

/**
 * 유튜브 다운로드 옵션 생성.
 */
const generateYoutubeDownloadOptions = (
  container: ytdl.videoFormat['container'] = 'mp4',
  qualityLabel: ytdl.videoFormat['qualityLabel'] = '360p',
  quality: ytdl.videoFormat['quality'] = 'highest',
) => {
  return {
    filter: (format: ytdl.videoFormat) =>
      format.container === container && format.qualityLabel === qualityLabel,
    quality: quality,
    requestOptions: REQUEST_OPTIONS,
  }
}

/**
 * 유튜브 영상 다운로드.
 */
export const downloadVideo = async (
  url: string,
  outputPath: string,
  onProgress: (progress: number) => void,
) => {
  try {
    if (!validateYoutubeUrl(url)) {
      throw new Error('Invalid YouTube URL')
    }
    const videoInfo = await getYoutubeVideoInfo(url)
    const sanitizedTitle = sanitizeText(videoInfo.videoDetails.title)
    const outputFilePath = path.join(outputPath, `${sanitizedTitle}.mp4`)
    const videoStream = ytdl(url, generateYoutubeDownloadOptions('mp4', '360p'))
    const fileStream = fs.createWriteStream(outputFilePath)

    videoStream.on('progress', (chunkLength, downloaded, total) => {
      const progressPercentage = Math.floor((downloaded / total) * 100)
      onProgress(progressPercentage)
    })
    videoStream.pipe(fileStream)

    return new Promise<void>((resolve, reject) => {
      fileStream.on('finish', () => {
        console.log(`Downloaded: ${outputFilePath}`)
        resolve()
      })
      fileStream.on('error', (err) => {
        reject(err)
      })
      videoStream.on('error', (err) => {
        reject(err)
      })
    })
  } catch (error: unknown) {
    return Promise.reject(error)
  }
}

/**
 * 텍스트 변환. (특수문자 제거, 소문자로 변환)
 */
function sanitizeText(text: string) {
  return text.replace(/[^a-z0-9]/gi, '_').toLowerCase()
}
