import { ResultCode } from '@/lib/api/result-code'

/**
 * API 응답 타입 정의. (공통)
 */
export interface ApiResponse<T = any> {
  /**
   * 트랜잭션 ID. (UUID 포맷을 따름)
   */
  txid: string

  /**
   * 결과 코드.
   */
  code: string

  /**
   * 성공 여부.
   */
  isSuccess?: boolean

  /**
   * HTTP 상태.
   */
  httpStatus?: number

  /**
   * 결과 메시지.
   */
  message?: string

  /**
   * 응답 데이터. (없는 경우 null)
   */
  data?: T

  /**
   * 타임 스탬프.
   */
  timestamp: number
}

/**
 * API 응답 생성 함수 매개변수 타입
 */
export interface CreateApiResponseProps<T = any> {
  data?: T
  message?: string
  code?: string
  isSuccess?: boolean
}

/**
 * API 응답 생성 함수
 */
export function createApiResponse<T = any>(
  props: CreateApiResponseProps<T>,
): ApiResponse<T> {
  const {
    data = null as unknown as T,
    message = props.isSuccess === false ? '오류가 발생했습니다' : '성공',
    code = props.isSuccess === false
      ? ResultCode.INTERNAL_SERVER_ERROR
      : ResultCode.SUCCESS,
    isSuccess = true,
  } = props

  return {
    txid: generateTxid(),
    code,
    isSuccess,
    message,
    data,
    timestamp: Date.now(),
  }
}

/**
 * 트랜잭션 ID 생성 함수
 */
function generateTxid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}
