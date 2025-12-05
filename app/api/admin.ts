import type { ApiList } from "#imports";
import type { DownloadLinkItem } from "./download";

const base = '/admin'

export interface BlogReviewStatsResponse {
  pendingCount: string;
  approvedToday: string;
  rejectedToday: string;
}

/**
 * 获取审核统计
 */
export function blogReviewStats() {
  return api.get<BlogReviewStatsResponse>(base + "/blogs/review-stats");
}

interface StatsResponse {
  stats: {
    totalUsers: number;
    totalBlogs: number;
    totalComments: number;
    totalLikes: number;
    activeUsers: number;
    publishedBlogs: number;
    recentUsers: number;
    recentBlogs: number;
    trend: {
      dates: string[];
      users: number[];
      blogs: number[];
      comments: number[];
    }
  };
  topAuthors: [
    {
      authorId: string;
      blogCount: number;
      totalViews: number;
      author: {
        id: string;
        username: string;
        avatar: string;
      }
    },
    {
      authorId: string;
      blogCount: number;
      totalViews: number;
      author: {
        id: string;
        username: string;
        avatar: string;
      }
    }
  ]
}

/**
 * 获取系统统计
 */
export function Stats() {
  return api.get<StatsResponse>(base + '/stats');
}


export interface BatchRequest {
  /**
   * 要操作的ID列表
   */
  ids: string[];
  /**
   * 操作类型：
   * - delete: 删除
   * - activate: 激活（仅用户）
   * - deactivate: 停用（仅用户）
   * - publish: 发布（仅博客）
   * - archive: 归档（仅博客）
   */
  operation: Operation;
  /**
   * 资源类型
   */
  type: Type;
  [property: string]: any;
}

/**
 * 操作类型：
 * - delete: 删除
 * - activate: 激活（仅用户）
 * - deactivate: 停用（仅用户）
 * - publish: 发布（仅博客）
 * - archive: 归档（仅博客）
 */
export type Operation = "delete" | "activate" | "deactivate" | "publish" | "archive";

/**
 * 资源类型
 */
export type Type = "users" | "blogs" | "comments";

/**
 * 批处理数据
 * @param data 批处理数据
 */
export function batch(data: BatchRequest) {
  return api.post<{
    message: string;
    result: {
      deletedCount?: number;
      [property: string]: any;
    }
  }>(base + '/batch', data);
}

/** 用户相关接口 */
export const user = {
  listUser: listUsers,
  updateUser,
  updateUserPassword,
  delUser,
}

// 用户状态
export enum UserStatus {
  active, inactive, admin
}

export interface ListUserRequest {
  page: number;
  limit: number;
  search: string;
  status: UserStatus | undefined;
  // 实名认证状态筛选（verified=已实名，unverified=未实名）
  verified: 'verified' | 'unverified';
}

export interface AdminUserListItem {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  blogCount: number;
  totalLikes: number;
  isActive: boolean;
  idVerified: boolean;
  realName: null | string;
  idCardNumber: null | string;
  isAdmin: boolean;
  lastLoginAt: null | string;
  refreshToken: null | string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 获取用户列表
 * @param data 搜索数据
 */
function listUsers(data: ListUserRequest) {
  return api.get<{ users: AdminUserListItem[], pagination: Pagination }>(base + '/users', data);
}

export interface UpdateUserStatusRequest {
  isActive: boolean;
  isAdmin: boolean;
}

/**
 * 更新用户状态 / 授予权限
 * @param userId 用户ID
 * @param data 更新数据
 */
function updateUser(userId: string, data: UpdateUserStatusRequest) {
  return api.put<{ message: string, user: AdminUserListItem }>(base + `/users/${userId}/status`, data)
}

/**
 * 重置用户密码
 * @param userId 用户ID
 * @param newPassword 用户新密码
 */
function updateUserPassword(userId: string, newPassword: string) {
  return api.put<{
    message: string;
    user: {
      id: string;
      username: string;
      email: string;
    }
  }>(base + `/users/${userId}/password`, { newPassword });
}

/**
 * 删除用户
 * @param userId 用户ID
 */
function delUser(userId: string) {
  return api.delete<{ message: string }>(base + '/users/' + userId);
}

/** 博客相关 */
export const blog = {
  listBlogs,
  listPendingBlogs,
  approve,
  reject,
  delBlog,
}

export interface ListBlogRequest {
  page: number;
  limit: number;
  search: string;
  status: string;
  author: string;
}

export interface ListBlogItem {
  id: string;
  title: string;
  content: string;
  summary: string;
  authorId: string;
  tags: string[],
  category: string;
  coverImage: string;
  status: "draft" | "pending" | "published" | "rejected" | "archived";
  rejectReason: null | string;
  reviewedAt: null | string;
  reviewedBy: null | string;
  topOrder: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  slug: string;
  allowComments: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  }
}

/**
 * 获取博客列表
 * @param data 搜索数据
 */
function listBlogs(data: ListBlogRequest) {
  return api.get<{ blogs: ListBlogItem[], pagination: Pagination }>(base + '/blogs', data);
}

export interface ListPendingBlogsRequest {
  page: number;
  limit: number;
}

/**
 * 获取pending状态的博客列表
 * @param data 查询数据
 */
function listPendingBlogs(data: ListPendingBlogsRequest) {
  return api.get<{ blogs: ListBlogItem[], pagination: Pagination }>(base + '/blogs/pending', data);
}

/**
 * 审核通过博客
 * @param id 博客ID
 */
function approve(id: string) {
  return api.put<{ message: string }>(base + `/blogs/${id}/approve`);
}

/**
 * 审核拒绝博客
 * @param id 博客ID
 * @param reason 拒绝原因
 */
function reject(id: string, reason: string) {
  return api.put<{ message: string }>(base + `/blogs/${id}/reject`, { reason });
}

/**
 * 删除博客
 * @param id 博客ID
 */
function delBlog(id: string) {
  return api.delete<{ message: string }>(base + '/blogs/' + id);
}

/** 评论相关接口 */
export const comment = {
  listComment,
  delComment,
}

export interface ListCommentRequest {
  page: number;
  limit: number;
  search: string;
  isDeleted: boolean;
  author: string;
  blog: string;
}

export interface ListCOmmentItem {
  id: string;
  content: string;
  authorId: string;
  blogId: string;
  parentCommentId: string;
  likeCount: number;
  isDeleted: boolean;
  deletedAt: null | string;
  deletedContent: null | string;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    username: string;
    email: string;
    avatar: string;
  },
  blog: {
    id: string;
    title: string;
    slug: string;
  }
}

/**
 * 获取全部评论
 * @param data 查询数据
 */
function listComment(data: ListCommentRequest) {
  return api.get<{ comments: ListCOmmentItem[], pagination: Pagination }>(base + '/comments', data);
}

/**
 * 删除评论
 * @param id 评论ID
 */
function delComment(id: string) {
  return api.delete<{ message: string }>(base + '/comments/' + id);
}

/** 举报相关接口 */
export const reports = {
  listReports,
  reportStats,
  handleReport,
}

export interface ListReportsRequest {
  page: number;
  limit: number;
  status: "pending" | "resolved" | "dismissed";
  targetType: "Blog" | "Comment";
}

export interface ListReportsItem {
  id: string;
  reporterId: string;
  targetType: string;
  targetId: string;
  reason: string;
  description: string;
  status: string;
  handledBy: null | string;
  handleResult: null | string;
  handledAt: null | string;
  createdAt: string;
  updatedAt: string;
  reporter: {
    id: string;
    username: string;
    avatar: string;
  },
  handler: null | string;
  reasonLabel: string;
  target: {
    id: string;
    title: string;
    authorId: string;
    status: string;
    author: {
      id: string;
      username: string;
    }
  }
}

/**
 * 获取举报列表
 * @param data 查询数据
 */
function listReports(data: ListReportsRequest) {
  return api.get<{ reports: ListReportsItem[], pagination: Pagination }>(base + '/reports', data);
}

/**
 * 获取举报统计
 */
function reportStats() {
  return api.get<{
    stats: {
      pending: number;
      resolved: number;
      dismissed: number;
      total: number;
    }
  }>(base + '/reports/stats');
}

/**
 * Request
 */
export interface HandleReportRequest {
  /**
   * 处理操作：delete-删除内容，dismiss-驳回举报
   */
  action: Action;
  /**
   * 处理结果说明（可选）
   */
  handleResult?: string;
  [property: string]: any;
}

/**
 * 处理操作：delete-删除内容，dismiss-驳回举报
 */
export type Action = "delete" | "dismiss";

/**
 * 处理举报
 * @param id 举报ID
 * @param data 处理数据
 */
function handleReport(id: string, data: HandleReportRequest) {
  return api.put<{
    message: string;
    report: {
      id: string;
      status: string;
      handleResult: string;
      handledAt: string;
    }
  }>(base + '/reports/' + id, data);
}

/** 下载链接管理 */
export const download = {
  listDoanloadLinks,
  listDownloadStats,
  downloadLinkCreate,
  downloadLinkUPdate,
  downloadLinkDelete,
}

export interface DoanloadLinkItem {
  id: number;
  platform: ApiList.download.Platform;
  name: string;
  version: null | number | string;
  downloadUrl: string;
  description: null | string;
  fileSize: number | null | string;
  isActive: boolean;
  sortOrder: number;
  downloadCount: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * 获取所有的下载链接列表
 */
function listDoanloadLinks() {
  return api.get<{ downloads: string }>('/downloads/admin/all')
}

/**
 * 获取下载统计
 */
function listDownloadStats() {
  return api.get<{
    totalDownloads: number;
    downloads: {
      id: number,
      platform: ApiList.download.Platform;
      name: "lifeapp" | string;
      downloadCount: number;
      createdAt: string;
    }
  }>('/downloads/admin/stats');
}

export interface DownloadLinkCreateRequest {
  platform: ApiList.download.Platform;
  name: string;
  version: string;
  downloadUrl: string;
  description: string;
  fileSize: string;
  isActive: boolean;
  sortOrder: number;
}

/**
 * 创建下载链接
 * @param data 创建数据
 */
function downloadLinkCreate(data: DownloadLinkCreateRequest) {
  return api.post<{ message: string, download: DoanloadLinkItem }>('/downloads/admin', data);
}

/**
 * 修改下载链接
 * @param data 修改数据
 */
function downloadLinkUPdate(data: DownloadLinkCreateRequest) {
  return api.post<{ message: string, download: DownloadLinkItem }>('/downloads/admin', data);
}

/**
 * 删除下载链接
 * @param id 要删除的链接ID
 */
function downloadLinkDelete(id: string | number) {
  return api.delete<{ message: string }>('/downloads/admin/' + id);
}