
const base = '/comments';

export interface Author {
    id: string;
    username: string;
    avatar: string;
}

export interface Comment {
    id: string,
    content: string,
    authorId: string,
    blogId: string,
    parentCommentId: null | string,
    likeCount: number,
    isDeleted: boolean,
    deletedAt: null | string,
    deletedContent: null | string,
    createdAt: string,
    updatedAt: string,
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
    return api.post<{ message: string, comment: Comment }>(base + '/', data);
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

/**
 * 获取博客评论
 * @param id 博客ID
 * @param data 查询数据
 */
export function listBlogComments(id: string, data: CommentListRequest) {
    return api.get<{
        pagination: Pagination, comments: Comment[] & {
            author: Author;
            replies: Comment[]
        }
    }>(base + '/' + id, data);
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
    }
    replies: Comment;
    isLiked: boolean;
}

/**
 * 获取评论详情
 * @param id 评论ID
 */
export function getCommentDetail(id: string) {
    return api.get<GetCommentDetailResponse>(base + '/' + id);
}

/**
 * 更新评论
 * @param id 评论ID
 * @param content 更新的评论内容
 */
export function updateComment(id: string, content: string) {
    return api.put<{ message: string, comment: Comment }>(base + '/' + id, { content });
}

/**
 * 删除评论
 * @param id 评论ID
 */
export function del(id: string) {
    return api.delete<{ message: string }>(base + "/" + id);
}

/**
 * 恢复评论
 * @param id 评论ID
 */
export function restore(id: string) {
    return api.post<{ message: string, comment: Comment }>(base + `/${id}/restore`);
}

/**
 * 点赞或取消点赞评论
 * @param id 评论ID
 */
export function like(id: string) {
    return api.post<{ message: string, isLiked: string }>(base + `/${id}/like`);
}