import { YoutubeDownloadRequest, YoutubeDownloadResponse } from '@/lib/api/dto/youtube-download'
import { ApiResponse } from '@/lib/api/api-response'
import { apiClient } from '@/lib/api/index'

export const realApi = {
  /**
   * 유튜브 관련 API.
   */
  youtube: {
    /**
     * 유튜브 동영상 다운로드.
     * @param request 다운로드 요청 데이터
     */
    download: (request: YoutubeDownloadRequest) =>
      apiClient.post<ApiResponse<YoutubeDownloadResponse>>(
        '/v1/youtube/download',
        request,
      ),
  },
}