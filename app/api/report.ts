const base = '/reports';

export interface CreateReportRequest {
  targetType: string;
  targetId: string;
  reason: string;
  description?: string;
}

export interface Report {
  id: string;
  targetType: string;
  reason: string;
  reasonLabel: string;
  status: string;
  createdAt: string;
}

export interface CreateReportResponse {
  message: string;
  report: Report;
}

/**
 * 创建举报
 * @param data 举报数据
 * @returns 
 */
export function create(data: CreateReportRequest) {
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