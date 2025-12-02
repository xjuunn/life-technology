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

export interface ListReportsRequest {
  // 每页数量，默认 10，最大 100
  limit?: number;
  // 页码，从 1 开始
  page?: number;
  // 排序字段
  sortBy?: SortBy;
  // 排序方向
  sortOrder?: SortOrder;
  // 举报状态
  status?: string;
  // 目标类型
  targetType?: string;
  [property: string]: any;
}

export type SortBy = "createdAt" | "status";
export type SortOrder = "asc" | "desc";

export interface ListReportsResponse {
  reports: Report[];
  pagination: Pagination;
}

/**
 * 获取举报列表
 * @param data 查询数据
 */
export function listReports(data: ListReportsRequest) {
  return api.get<ListReportsResponse>(base, data);
}

export interface ReportDetailResponse {
  report: Report;
  target: {
    id: string;
    title?: string;
    content?: string;
    author?: {
      id: string;
      username: string;
      avatar: string;
    }
  }
}
