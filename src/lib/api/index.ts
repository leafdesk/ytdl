import axios from 'axios'
import { ApiResponse } from './api-response'
import { YoutubeDownloadResponseData } from './dto/youtube-download'

/**
 * API 인스턴스 생성. (Axios)
 */
const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

const realApi = {
  /**
   * 유튜브 관련 API.
   */
  youtube: {
    /**
     * 유튜브 동영상 다운로드.
     * @param url 유튜브 동영상 URL.
     * @param path 다운로드 경로. (로컬)
     */
    download: (url: string, path: string) =>
      apiClient.post<ApiResponse<YoutubeDownloadResponseData>>(
        '/v1/youtube/download',
        {
          videoUrl: url,
          outputPath: path,
        },
      ),
  },
}

export const api = realApi

export default api
