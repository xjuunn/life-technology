<script setup lang="ts">
const { t } = useAppI18n();
const blogs = ref<any[]>([]);
const blogCategories = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(12);
const loading = ref(false);
const sortBy = ref<'createdAt' | 'viewCount' | 'likeCount' | 'commentCount'>('createdAt');
const sortOrder = ref<'asc' | 'desc'>('desc');
const searchKeyword = ref('');
const selectedCategory = ref<string | null>(null);

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalBlogs: 0,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 16
});

const fetchBlogs = async (page: number = 1) => {
  loading.value = true;
  try {
    const params: any = {
      page,
      limit: itemsPerPage.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    };

    if (searchKeyword.value?.trim()) {
      params.search = searchKeyword.value.trim();
    }

    if (selectedCategory.value) {
      params.category = selectedCategory.value;
    }

    const result = await ApiList.blog.list(params);
    blogs.value = result.data.blogs;

    if (result.data.pagination) {
      pagination.value = result.data.pagination;
    } else {
      const totalBlogs = result.data.blogs.length;
      const totalPages = Math.ceil(totalBlogs / itemsPerPage.value);
      pagination.value = {
        currentPage: page,
        totalPages: totalPages,
        totalBlogs: totalBlogs,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
        limit: itemsPerPage.value
      };
    }
    currentPage.value = page;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const changePage = (page: number | string) => {
  const pageNum = Number(page);
  if (pageNum >= 1 && pageNum <= pagination.value.totalPages && pageNum !== currentPage.value) {
    fetchBlogs(pageNum);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

const changeItemsPerPage = () => {
  currentPage.value = 1;
  fetchBlogs(1);
};

const changeSortBy = (field: 'createdAt' | 'viewCount' | 'likeCount' | 'commentCount', order?: 'asc' | 'desc') => {
  sortBy.value = field;
  if (order) sortOrder.value = order;
  currentPage.value = 1;
  fetchBlogs(1);
};

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  currentPage.value = 1;
  fetchBlogs(1);
};

const performSearch = () => {
  currentPage.value = 1;
  fetchBlogs(1);
};

const clearSearch = () => {
  searchKeyword.value = '';
  currentPage.value = 1;
  fetchBlogs(1);
};

const selectCategory = (category: string | null) => {
  selectedCategory.value = category;
  currentPage.value = 1;
  fetchBlogs(1);
};

const prevPage = () => {
  if (pagination.value.hasPrevPage) changePage(currentPage.value - 1);
};

const nextPage = () => {
  if (pagination.value.hasNextPage) changePage(currentPage.value + 1);
};

const getPageNumbers = () => {
  const pages: (number | string)[] = [];
  const totalPages = pagination.value.totalPages;
  const current = currentPage.value;

  if (totalPages <= 5) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    if (current <= 3) {
      pages.push(1, 2, 3, 4, 5, '...', totalPages);
    } else if (current >= totalPages - 2) {
      pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(1, '...', current - 1, current, current + 1, '...', totalPages);
    }
  }
  return pages;
};

onMounted(async () => {
  await Promise.all([
    fetchBlogs(1),
    ApiList.blog.categories().then(result => {
      blogCategories.value = result.data.categories;
    })
  ]);
});
</script>

<template>
  <div
    class="min-h-screen text-base-content font-sans relative overflow-x-hidden selection:bg-primary selection:text-primary-content">
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div
        class="absolute -top-32 -right-32 w-120 h-120 lg:w-160 lg:h-160 bg-primary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40">
      </div>
      <div
        class="absolute -bottom-32 -left-32 w-120 h-120 lg:w-160 lg:h-160 bg-secondary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40">
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <section class="min-h-[30vh] flex flex-col justify-end pb-8 pt-24">
        <div class="max-w-4xl mx-auto w-full text-center space-y-8">
          <div class="space-y-4">
            <h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
              {{ t('blog_page.hero.title_prefix') }} <span
                class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{
                  t('blog_page.hero.title_highlight') }}</span>
            </h1>
            <p class="text-base-content/60 text-lg sm:text-xl">{{ t('blog_page.hero.subtitle') }}</p>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-3 items-center justify-between bg-base-100/50 backdrop-blur-xl border border-base-content/5 p-2 rounded-2xl shadow-lg relative z-10">
            <div class="relative flex-1 w-full">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Icon name="mingcute:search-line" class="w-5 h-5 text-base-content/40" />
              </div>
              <input v-model="searchKeyword" @keyup.enter="performSearch" type="text"
                :placeholder="t('blog_page.search_placeholder')"
                class="input w-full pl-11 bg-transparent border-0 focus:outline-none focus:bg-base-100/50 rounded-xl" />
              <button v-if="searchKeyword" @click="clearSearch"
                class="absolute inset-y-0 right-3 flex items-center btn btn-ghost btn-xs btn-circle">
                <Icon name="mingcute:close-line" class="w-4 h-4" />
              </button>
            </div>

            <div class="flex items-center gap-2 w-full sm:w-auto justify-end px-2">
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm rounded-lg font-normal gap-2">
                  <Icon name="mingcute:filter-line" class="w-4 h-4" />
                  <span>{{ selectedCategory || t('blog_page.filter.category_label') }}</span>
                  <Icon name="mingcute:down-line" class="w-3 h-3 opacity-50" />
                </div>
                <ul tabindex="0"
                  class="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-content/5 mt-2 z-50">
                  <li><a :class="{ 'bg-primary/10 text-primary': selectedCategory === null }"
                      @click="selectCategory(null)">{{ t('blog_page.filter.options.all') }}</a></li>
                  <li v-for="category in blogCategories" :key="category">
                    <a :class="{ 'bg-primary/10 text-primary': selectedCategory === category }"
                      @click="selectCategory(category)">{{ category }}</a>
                  </li>
                </ul>
              </div>

              <div class="h-4 w-px bg-base-content/10"></div>

              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn btn-ghost btn-sm rounded-lg font-normal gap-2">
                  <Icon name="mingcute:sort-ascending-line" class="w-4 h-4" />
                  <span>{{ t('blog_page.sort.label') }}</span>
                </div>
                <ul tabindex="0"
                  class="dropdown-content menu p-2 shadow-xl bg-base-100 rounded-xl w-52 border border-base-content/5 mt-2 z-50">
                  <li><a @click="changeSortBy('createdAt', 'desc')">{{ t('blog_page.sort.options.newest') }}</a></li>
                  <li><a @click="changeSortBy('viewCount', 'desc')">{{ t('blog_page.sort.options.popular') }}</a></li>
                  <li><a @click="changeSortBy('likeCount', 'desc')">{{ t('blog_page.sort.options.most_liked') }}</a>
                  </li>
                  <div class="divider my-1"></div>
                  <li><a class="flex justify-between" @click="toggleSortOrder">
                      {{ sortOrder === 'asc' ? t('blog_page.sort.order.asc') : t('blog_page.sort.order.desc') }}
                      <Icon :name="sortOrder === 'asc' ? 'mingcute:arrow-up-line' : 'mingcute:arrow-down-line'" />
                    </a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="pb-16 lg:pb-24">
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="n in itemsPerPage" :key="n"
            class="card bg-base-100 border border-base-content/5 h-[380px] animate-pulse">
            <div class="h-48 bg-base-content/5 w-full"></div>
            <div class="p-5 space-y-4">
              <div class="h-4 bg-base-content/5 rounded w-1/3"></div>
              <div class="h-6 bg-base-content/5 rounded w-3/4"></div>
              <div class="h-4 bg-base-content/5 rounded w-full"></div>
              <div class="h-4 bg-base-content/5 rounded w-2/3"></div>
            </div>
          </div>
        </div>

        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div v-for="blog in blogs" :key="blog.id"
            class="group flex flex-col h-full bg-base-100 border border-base-content/5 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
            @click="$router.push(`/blog/${blog.id}`)">

            <div class="relative aspect-video overflow-hidden bg-base-200">
              <img :src="blog.coverImage" :alt="blog.title"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy" />
              <div class="absolute top-3 left-3">
                <span
                  class="badge badge-primary shadow-md border-none text-xs font-semibold px-3 py-2.5 backdrop-blur-md bg-primary/90 text-primary-content">
                  {{ blog.category }}
                </span>
              </div>
            </div>

            <div class="flex flex-col flex-1 p-5">
              <div class="mb-3 flex flex-wrap gap-2">
                <span v-for="tag in blog.tags?.slice(0, 3)" :key="tag"
                  class="text-xs font-medium text-base-content/50 bg-base-200/50 px-2 py-1 rounded-md">
                  #{{ tag }}
                </span>
              </div>

              <h3 class="text-lg font-bold leading-snug mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                {{ blog.title }}
              </h3>

              <p class="text-sm text-base-content/60 line-clamp-2 mb-4 flex-1">
                {{ blog.summary }}
              </p>

              <div class="flex items-center justify-between pt-4 border-t border-base-content/5 mt-auto">
                <div class="flex items-center gap-2">
                  <div class="avatar">
                    <div class="w-6 h-6 rounded-full ring-1 ring-base-content/10">
                      <img :src="blog.author.avatar" :alt="blog.author.username" />
                    </div>
                  </div>
                  <span class="text-xs font-medium opacity-70 truncate max-w-20">{{ blog.author.username }}</span>
                </div>

                <div class="flex items-center gap-4 text-xs text-base-content/50">
                  <div class="flex items-center gap-1">
                    <Icon name="mingcute:heart-line" class="w-3.5 h-3.5" />
                    <span>{{ blog.likeCount || 0 }}</span>
                  </div>
                  <div class="flex items-center gap-1">
                    <Icon name="mingcute:eye-line" class="w-3.5 h-3.5" />
                    <span>{{ blog.viewCount || 0 }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="pagination.totalPages > 1" class="flex flex-col items-center mt-16 gap-6">
          <div class="join shadow-sm">
            <button class="join-item btn btn-sm bg-base-100" :disabled="!pagination.hasPrevPage" @click="prevPage">
              <Icon name="mingcute:left-line" />
            </button>

            <template v-for="page in getPageNumbers()" :key="page">
              <button v-if="page === '...'" class="join-item btn btn-sm bg-base-100 btn-disabled">
                ...
              </button>
              <button v-else class="join-item btn btn-sm"
                :class="page === currentPage ? 'btn-primary text-primary-content' : 'bg-base-100'"
                @click="changePage(Number(page))">
                {{ page }}
              </button>
            </template>

            <button class="join-item btn btn-sm bg-base-100" :disabled="!pagination.hasNextPage" @click="nextPage">
              <Icon name="mingcute:right-line" />
            </button>
          </div>

          <div class="flex items-center gap-4 text-xs text-base-content/50">
            <div class="w-32 text-end">{{ t('blog_page.pagination.total', { total: pagination.totalBlogs }) }}</div>
            <div class="h-3 w-px bg-base-content/20"></div>
            <select v-model.number="itemsPerPage" @change="changeItemsPerPage"
              class="select select-ghost select-xs focus:bg-transparent">
              <option value="8">8 / page</option>
              <option value="12">12 / page</option>
              <option value="16">16 / page</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<i18n lang="json">{
  "zh-CN": {
    "blog_page": {
      "hero": {
        "title_prefix": "探索",
        "title_highlight": "Web3 视界",
        "subtitle": "洞察行业趋势，掌握技术前沿，与 LIFE 一起定义数字未来"
      },
      "search_placeholder": "搜索文章、教程或观点...",
      "filter": {
        "category_label": "分类",
        "options": {
          "all": "全部文章"
        }
      },
      "sort": {
        "label": "排序",
        "options": {
          "newest": "最新发布",
          "popular": "最多阅读",
          "most_liked": "最多点赞",
          "most_commented": "最多评论",
          "oldest": "最早发布"
        },
        "order": {
          "asc": "升序",
          "desc": "降序"
        }
      },
      "tags": {
        "blockchain": "#区块链",
        "sovereignty": "#数据主权",
        "dao": "#DAO",
        "nft": "#NFT",
        "defi": "#DeFi"
      },
      "pagination": {
        "total": "共 {total} 篇"
      }
    }
  },
  "zh-TW": {
    "blog_page": {
      "hero": {
        "title_prefix": "探索",
        "title_highlight": "Web3 視界",
        "subtitle": "洞察行業趨勢，掌握技術前沿，與 LIFE 一起定義數字未來"
      },
      "search_placeholder": "搜尋文章、教程或觀點...",
      "filter": {
        "category_label": "分類",
        "options": {
          "all": "全部文章"
        }
      },
      "sort": {
        "label": "排序",
        "options": {
          "newest": "最新發布",
          "popular": "最多閱讀",
          "most_liked": "最多點讚",
          "most_commented": "最多評論",
          "oldest": "最早發布"
        },
        "order": {
          "asc": "升序",
          "desc": "降序"
        }
      },
      "tags": {
        "blockchain": "#區塊鏈",
        "sovereignty": "#數據主權",
        "dao": "#DAO",
        "nft": "#NFT",
        "defi": "#DeFi"
      },
      "pagination": {
        "total": "共 {total} 篇"
      }
    }
  },
  "en": {
    "blog_page": {
      "hero": {
        "title_prefix": "Explore",
        "title_highlight": "Web3 Vision",
        "subtitle": "Insight into industry trends, mastering frontier technology, defining the digital future with LIFE"
      },
      "search_placeholder": "Search articles, tutorials, or views...",
      "filter": {
        "category_label": "Category",
        "options": {
          "all": "All Articles"
        }
      },
      "sort": {
        "label": "Sort",
        "options": {
          "newest": "Newest",
          "popular": "Most Viewed",
          "most_liked": "Most Liked",
          "most_commented": "Most Commented",
          "oldest": "Oldest"
        },
        "order": {
          "asc": "Ascending",
          "desc": "Descending"
        }
      },
      "tags": {
        "blockchain": "Blockchain",
        "sovereignty": "Data Sovereignty",
        "dao": "DAO",
        "nft": "NFT",
        "defi": "DeFi"
      },
      "pagination": {
        "total": "Total {total} items"
      }
    }
  }
}</i18n>