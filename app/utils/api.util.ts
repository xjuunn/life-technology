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

export interface Pagination {
  currentPage: number,
  totalPages: number,
  totalBlogs: number,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  limit: number
}

interface RequestConfig extends AxiosRequestConfig {
  needToken?: boolean;
}

class Request {
  private instance: AxiosInstance
  private baseConfig: AxiosRequestConfig = {
    baseURL: import.meta.env.VITE_BACKBASE_URL,
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
          const message = errorHandler(res) || '未知错误'
          useToast().error(message);
          return Promise.reject(new Error(message))
        }
      },
      (error: AxiosError) => {
        const res = error.response?.data as ApiResponse<any>
        const message = errorHandler(res) || '未知错误';
        useToast().error(message);
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

/**
 * 错误处理函数
 * @param res 错误的响应
 * @returns 错误信息
 */
function errorHandler(res: ApiResponse<any>): string {
  const code = res.code.toString()
  let message = res.message || '请求出错'

  switch (code) {
    case StatusCode.REFRESH_TOKEN_INVALID:
      message = '刷新令牌无效或已过期，请重新登录'
      navigateTo('/auth/login', { replace: true })
      break
    case StatusCode.NO_REFRESH_TOKEN:
      message = '未检测到刷新令牌，请重新登录'
      navigateTo('/auth/login', { replace: true })
      break
    case StatusCode.ADMIN_REQUIRED:
      message = '需要管理员权限才能进行此操作'
      break
    case StatusCode.EXPIRED_TOKEN:
      message = '登录已过期，请重新登录'
      // navigateTo('/auth/login', { replace: true })
      useUserStore().refreshToken().catch(() => {
        navigateTo('/auth/login', { replace: true })
      })
      break
    case StatusCode.INVALID_TOKEN:
      message = '无效的登录状态，请重新登录'
      navigateTo('/auth/login', { replace: true })
      break
    case StatusCode.NO_TOKEN:
      message = '未检测到登录状态，请登录后重试'
      navigateTo('/auth/login', { replace: true })
      break
    case StatusCode.REALNAME_REQUIRED:
      message = '需要实名认证才能进行此操作'
      setTimeout(() => {
        navigateTo("/auth/real-name-auth/", { open: { target: '_blank' } })
      }, 2000);
      break
    case StatusCode.USER_DISABLED:
      message = '账户已被禁用，无法进行此操作'
      break
    case StatusCode.USER_NOT_FOUND:
      message = '用户不存在或已被删除'
      break
  }

  return message
}
