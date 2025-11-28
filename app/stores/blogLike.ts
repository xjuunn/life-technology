import { defineStore } from 'pinia';

interface BlogLikeState {
  likedBlogs: Set<string>;
  likeCounts: Record<string, number>;
}

export const useBlogLikeStore = defineStore('blogLike', {
  state: (): BlogLikeState => ({
    likedBlogs: new Set(),
    likeCounts: {},
  }),

  actions: {
    setLiked(blogId: string, isLiked: boolean) {
      if (isLiked) {
        this.likedBlogs.add(blogId);
      } else {
        this.likedBlogs.delete(blogId);
      }
    },

    setLikeCount(blogId: string, count: number) {
      this.likeCounts[blogId] = count;
    },

    updateLikeCount(blogId: string, delta: number) {
      const current = this.likeCounts[blogId] || 0;
      this.likeCounts[blogId] = Math.max(0, current + delta);
    },

    isLiked(blogId: string): boolean {
      return this.likedBlogs.has(blogId);
    },

    getLikeCount(blogId: string): number {
      return this.likeCounts[blogId] || 0;
    },
  },
});