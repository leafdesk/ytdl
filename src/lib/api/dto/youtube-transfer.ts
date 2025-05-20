/**
 * 유튜브 드롭박스 전송 요청 DTO.
 */
export interface YoutubeTransferRequest {
  /**
   * 유튜브 동영상 URL.
   */
  videoUrl: string
}

/**
 * 유튜브 드롭박스 전송 응답 DTO.
 */
export interface YoutubeTransferResponse {
  /**
   * 업로드된 Dropbox 경로
   */
  path: string
}
