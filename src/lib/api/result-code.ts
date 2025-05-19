/**
 * API 결과 코드
 */
export enum ResultCode {
  /**
   * 요청이 성공적으로 처리됨
   */
  SUCCESS = '0000',

  /**
   * 잘못된 요청 - 클라이언트 오류
   */
  BAD_REQUEST = '4000',

  /**
   * 인증되지 않은 요청 - 로그인이 필요함
   */
  UNAUTHORIZED = '4010',

  /**
   * 접근 권한 없음 - 권한이 부족함
   */
  FORBIDDEN = '4030',

  /**
   * 요청한 리소스를 찾을 수 없음
   */
  NOT_FOUND = '4040',

  /**
   * 서버 내부 오류 발생
   */
  INTERNAL_SERVER_ERROR = '5000',
}
