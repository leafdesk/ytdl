import axios from 'axios'
import { realApi } from '@/lib/api/real-api'

/**
 * API 인스턴스 생성. (Axios)
 */
export const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const api = realApi

export default api
