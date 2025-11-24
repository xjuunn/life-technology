import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  AxiosError
} from 'axios'
import { useUserStore } from '@/stores/user'

export interface ApiResponse<T = any> {
  code: number;
  data: T;
  success: boolean;
  message: string;
  error: null | { message: string, [key: string]: any; };
  [key: string]: any;
}

interface RequestConfig extends AxiosRequestConfig {
  needToken?: boolean;
}

class Request {
  private instance: AxiosInstance
  private baseConfig: AxiosRequestConfig = {
    baseURL: useRuntimeConfig().public.base_url,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  }

  constructor(config?: AxiosRequestConfig) {
    this.instance = axios.create(Object.assign({}, this.baseConfig, config))
    this.setupInterceptors()
  }

  private setupInterceptors() {
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        const userStore = useUserStore()
        const token = userStore.token
        if (token && config.headers) {
          config.headers.set('Authorization', `Bearer ${token}`)
        }
        return config
      },
      (error: AxiosError) => Promise.reject(error)
    )

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        const res = response.data as ApiResponse<any>
        if (res.success) {
          return res as unknown as AxiosResponse
        } else {
          const errorMsg = res.message || '请求处理失败'
          return Promise.reject(new Error(errorMsg))
        }
      },
      (error: AxiosError) => {
        let message = '网络连接故障'
        if (error.response && error.response.data) {
          const errData = error.response.data as any
          message = errData.message || errData.error || error.message
        }
        return Promise.reject(new Error(message))
      }
    )
  }

  public async request<T = any, D = any>(config: RequestConfig): Promise<ApiResponse<T>> {
    return this.instance.request<any, ApiResponse<T>, D>(config)
  }

  public get<T = any>(url: string, params?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url, params })
  }

  public post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  public put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  public delete<T = any>(url: string, params?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url, params })
  }

  public patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }
}

export const api = new Request()

export default Request

