
const base = '/blogs';


export interface BlogListRequest {
  // 作者ID
  author?: string;
  // 分类筛选
  category?: string;
  // 每页数量，默认 10，最大 100
  limit?: number;
  // 页码，从 1 开始
  page?: number;
  // 搜索关键词（标题、摘要）
  search?: string;
  // 排序字段
  sortBy?: SortBy;
  // 排序方向
  sortOrder?: SortOrder;
  // 状态（公开接口只能查看已发布的）
  status?: Status;
  // 标签筛选，逗号分隔
  tags?: string;
  [property: string]: any;
}

// 排序字段
export type SortBy = "createdAt" | "viewCount" | "likeCount" | "commentCount";

// 排序方向
export type SortOrder = "asc" | "desc";

// 状态（公开接口只能查看已发布的）
export type Status = "published";

export interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string;
  authorId: string;
  tags: string[];
  category: string;
  coverImage: string;
  status: string;
  topOrder: number;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  slug: string;
  allowComments: boolean;
  createdAt: string;
  updatedAt: string;
  author: BlogAuthor;
}

export interface BlogAuthor {
  id: string;
  username: string;
  avatar: string;
}

export interface BlogListResponse {
  pagination: { currentPage: number; totalPages: number; totalBlogs: number; hasNextPage: boolean; hasPrevPage: boolean; limit: number; } | { currentPage: number; totalPages: number; totalBlogs: number; hasNextPage: boolean; hasPrevPage: boolean; limit: number; };
  blogs: Blog[];
}

/**
 * 获取博客列表
 * @param data 查询字段
 * @returns 博客列表
 */
export function list(data: BlogListRequest) {
  return api.get<BlogListResponse>(base + '/', data);
}

export interface BlogCreateRequest {
  // 分类
  category?: string;
  // 博客正文（Markdown格式）
  content: string;
  // 封面图片URL
  coverImage?: string;
  // 状态
  status?: Status;
  // 博客摘要
  summary?: string;
  // 标签数组
  tags?: string[];
  // 博客标题
  title: string;
  [property: string]: any;
}

export interface BlogCreateResponse {
  message: string;
  blog: Blog;
}

/**
 * 创建博客
 * @param data 博客数据
 */
export function create(data: BlogCreateRequest) {
  return api.post<BlogCreateResponse>(base + '/', data);
}

export interface PopularRequest {
  // 统计最近N天的数据
  days?: number;
  // 返回数量
  limit?: number;
  [property: string]: any;
}

/**
 * 获取热门博客
 * @param data 查询数据
 */
export function popular(data: PopularRequest) {
  return api.get<{ blogs: Blog[] }>(base + '/popular', data);
}

/**
 * 获取推荐博客
 * @param limit 返回数量
 */
export function recommended(limit: number) {
  return api.get<{ blogs: Blog[] }>(base + '/recommended', { limit });
}

/**
 * 获取热门标签
 */
export function tags() {
  return api.get<{ tags: string[] }>(base + '/tags');
}

/**
 * 获取分类列表
 */
export function categories() {
  return api.get<{ categories: string[] }>(base + '/categories')
}

/**
 * 根据 slug 获取博客
 * @param slug 博客 Slug
 */
export function slug(slug: string) {
  return api.get<{ blog: Blog & { isLiked: boolean } }>(base + '/slug/' + slug);
}

export interface UserBlogRequest {
  // 每页数量，默认 10，最大 100
  limit?: number;
  // 页码，从 1 开始
  page?: number;
  // 状态筛选（仅作者本人可查看草稿）
  status?: Status;
  [property: string]: any;
}

/**
 * 获取用户的博客
 * @param userId 用户ID
 * @param data 查询数据
 */
export function getUserBlogs(userId: string, data: UserBlogRequest) {
  return api.get<{ pagination: Pagination, blogs: Blog[] }>(base + '/user/' + userId, data);
}

/**
 * 获取博客详情
 * @param id 博客ID
 */
export function getBlogDetails(id: string) {
  return api.get<{ blog: Blog & { isLiked: boolean } }>(base + '/' + id);
}

export interface BlogUpdateRequest {
  // 分类
  category?: string;
  // 博客正文
  content?: string;
  // 封面图片URL
  coverImage?: string;
  // 状态
  status?: Status;
  // 博客摘要
  summary?: string;
  // 标签数组
  tags?: string[];
  // 博客标题
  title?: string;
  [property: string]: any;
}

/**
 * 更新博客
 * @param id 博客ID
 * @param data 更新博客数据
 */
export function update(id: string, data: BlogUpdateRequest) {
  return api.put<{ message: string, blog: Blog }>(base + '/' + id, data);
}

/**
 * 删除博客
 * @param id 博客ID
 */
export function del(id: string) {
  return api.delete<{ message: string }>(base + '/' + id);
}

/**
 * 点赞或取消点赞
 * @param id 博客ID
 */
export function like(id: string) {
  return api.post<{ message: string, isLiked: boolean }>(base + `/${id}/like`)
}

/**
 * 分享博客
 * @param id 博客 ID
 */
export function share(id: string) {
  return api.post<{ message: string }>(base + `/${id}/share`);
}
