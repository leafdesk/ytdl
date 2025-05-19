/**
 * 유튜브 다운로드 요청 DTO.
 */
export interface YoutubeDownloadRequest {
  /**
   * 유튜브 동영상 URL.
   */
  videoUrl: string

  /**
   * 다운로드 경로.
   */
  outputPath: string
}

/**
 * 유튜브 다운로드 응답 DTO.
 */
export interface YoutubeDownloadResponse {
  /**
   * 다운로드된 파일의 경로. (경로 + 파일명)
   */
  outputFilePath: string

  /**
   * 파일명. (확장자 포함)
   */
  fileName: string

  /**
   * 파일명. (확장자 미포함)
   */
  fileNameWithoutExtension: string
}
