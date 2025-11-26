
/**
 * 健康检查
 * @returns "status": "ok" 
 */
export function health() {
  return api.get<{ status: 'ok' | string }>('/health')
}

export interface StatsResponse {
  latestBlockNumber: number;
  chainBlockNumber: number;
  storageBlockNumber: number;
  isNewChain: boolean;
  latestGasPrice: string;
  latestGasPriceRaw: string;
  totalTransactions: number;
  totalAddresses: number;
  blockTimestamp: number;
  description: string;
}

/**
 * 获取区块链的数据
 */
export function stats() {
  return api.get<StatsResponse>('/stats')
}