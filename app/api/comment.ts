const base = '/comments';

// 统一响应格式
export interface BaseResponse<T = any> {
    success: boolean;
    code: number;
    message: string;
    data: T;
    error: any;
}

export interface Author {
    id: string;
    username: string;
    avatar: string;
}

export interface Comment {
    id: string;
    content: string;
    authorId: string;
    blogId: string;
    parentCommentId: null | string;
    likeCount: number;
    isDeleted: boolean;
    deletedAt: null | string;
    deletedContent: null | string;
    createdAt: string;
    updatedAt: string;
    author: Author;
}

export interface CommentCreateRequest {
    content: string;
    blogId: string;
    parentCommentId: null | string;
}

/**
 * 创建评论
 * @param data 评论数据
 */
export function create(data: CommentCreateRequest) {
    return api.post<BaseResponse<{ message: string; comment: Comment }>>(base + '/', data);
}

export interface CommentListRequest {
    // 每页数量，默认 10，最大 100
    limit?: number;
    // 页码，从 1 开始
    page?: number;
    // 排序字段
    sortBy?: SortBy;
    // 排序方向
    sortOrder?: SortOrder;
    [property: string]: any;
}

export type SortBy = "createdAt" | "likeCount";
export type SortOrder = "asc" | "desc";

export interface CommentWithReplies extends Comment {
    replies: Comment[];
}

export interface BlogCommentsResponse {
    pagination: Pagination;
    comments: CommentWithReplies[];
}

/**
 * 获取博客评论
 * @param id 博客ID
 * @param data 查询数据
 */
export function listBlogComments(id: string, data: CommentListRequest) {
    return api.get<BaseResponse<BlogCommentsResponse>>(base + '/blog/' + id, data);
}

export interface ListUserCommentsRequest {
    // 每页数量，默认 10，最大 100
    limit?: number;
    // 页码，从 1 开始
    page?: number;
    [property: string]: any;
}

export interface ListUserCommentsResponse {
    comments: (Comment & {
        blog: {
            id: string;
            title: string;
            slug: string;
        };
    })[];
    pagination: Pagination;
}

/**
 * 获取用户评论
 * @param userID 用户ID
 * @param data 查询数据
 */
export function listUserComments(userID: string, data: ListUserCommentsRequest) {
    return api.get<ListUserCommentsResponse>(base + '/users/' + userID, data);
}

export interface GetCommentDetailResponse {
    comment: Comment;
    blog: {
        id: string;
        title: string;
    };
    replies: Comment[];
    isLiked: boolean;
}

/**
 * 获取评论详情
 * @param id 评论ID
 */
export function getCommentDetail(id: string) {
    return api.get<BaseResponse<GetCommentDetailResponse>>(base + '/' + id);
}

/**
 * 更新评论
 * @param id 评论ID
 * @param content 更新的评论内容
 */
export function updateComment(id: string, content: string) {
    return api.put<BaseResponse<{ message: string; comment: Comment }>>(base + '/' + id, { content });
}

/**
 * 删除评论
 * @param id 评论ID
 */
export function del(id: string) {
    return api.delete<BaseResponse<{ message: string }>>(base + "/" + id);
}

/**
 * 恢复评论
 * @param id 评论ID
 */
export function restore(id: string) {
    return api.post<BaseResponse<{ message: string; comment: Comment }>>(base + `/${id}/restore`);
}

/**
 * 点赞或取消点赞评论
 * @param id 评论ID
 */
export function like(id: string) {
    return api.post<BaseResponse<{ message: string; isLiked: boolean }>>(base + `/${id}/like`);
}

// Pagination 接口定义（假设存在）
export interface Pagination {
    currentPage: number;
    totalPages: number;
    totalComments: number;
    hasNextPage: boolean;
    hasPrevPage: boolean; // 修正：图片中是 hasPreviewPage，但应该是 hasPrevPage
    limit: number;
}