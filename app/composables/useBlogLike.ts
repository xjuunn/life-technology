import { like } from '~/api/blog';
import { useBlogLikeStore } from '~/stores/blogLike';

interface UseBlogLikeOptions {
  blogId: string;
  initialIsLiked?: boolean;
  initialLikeCount?: number;
}

export function useBlogLike(options: UseBlogLikeOptions) {
  const { blogId, initialIsLiked = false, initialLikeCount = 0 } = options;
  
  const likeStore = useBlogLikeStore();
  const isLoading = ref(false);
  const error = ref<Error | null>(null);

  // 初始化状态
  if (initialIsLiked !== undefined) {
    likeStore.setLiked(blogId, initialIsLiked);
  }
  if (initialLikeCount !== undefined) {
    likeStore.setLikeCount(blogId, initialLikeCount);
  }

  const isLiked = computed(() => likeStore.isLiked(blogId));
  const likeCount = computed(() => likeStore.getLikeCount(blogId));

  const handleLike = async () => {
    if (isLoading.value) return;

    isLoading.value = true;
    error.value = null;

    try {
      const response = await like(blogId);
      
      // 更新状态
      likeStore.setLiked(blogId, response.isLiked);
      
      // 更新点赞数量
      if (response.isLiked) {
        likeStore.updateLikeCount(blogId, 1);
      } else {
        likeStore.updateLikeCount(blogId, -1);
      }

      return response;
    } catch (err) {
      error.value = err as Error;
      console.error('点赞操作失败:', err);
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  return {
    isLiked,
    likeCount,
    isLoading: readonly(isLoading),
    error: readonly(error),
    handleLike,
  };
}