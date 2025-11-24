
/**
 * 健康检查
 * @returns "status": "ok" 
 */
export function health() {
  return api.get<{ status: 'ok' | string }>('/health')
}