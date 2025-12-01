const base = '/reports';

export interface ListReportRequest {
  targetType: string;
  targetId: string;
  reason: string;
  description: string;
}

/**
 * 
 * @param data 举报数据
 * @returns 
 */
export function list(data: ListReportRequest) {
  return api.post<{
    message: string;
    report: {
      id: string;
      targetType: string;
      reason: string;
      reasonLabel: string;
      status: string;
      createdAt: string;
    }
  }>(base, data);
}