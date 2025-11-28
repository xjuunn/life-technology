<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
const { t } = useAppI18n();
import { list, categories } from '~/api/blog';

const blogs = ref<any[]>([]);
const blogCategories = ref<string[]>([]);
const currentPage = ref(1);
const itemsPerPage = ref(8); // 默认每页显示8个博客
const loading = ref(false);
const sortBy = ref<'createdAt' | 'viewCount' | 'likeCount' | 'commentCount'>('createdAt'); // 默认排序字段
const sortOrder = ref<'asc' | 'desc'>('desc'); // 默认排序方向
const searchKeyword = ref(''); // 搜索关键字
const selectedCategory = ref<string | null>(null); // 选中的分类

const popularTags = computed(() => [
  t('blog_page.tags.blockchain'),
  t('blog_page.tags.sovereignty'),
  t('blog_page.tags.dao'),
  t('blog_page.tags.nft'),
  t('blog_page.tags.defi')
]);

const pagination = ref({
  currentPage: 1,
  totalPages: 1,
  totalBlogs: 0,
  hasNextPage: false,
  hasPrevPage: false,
  limit: 16
});

// 获取博客列表（带分页）
const fetchBlogs = async (page: number = 1) => {
  loading.value = true;
  try {
    // 构造请求参数
    const params: any = { 
      page, 
      limit: itemsPerPage.value,
      sortBy: sortBy.value,
      sortOrder: sortOrder.value
    };
    
    // 只有当搜索关键字不为空时才添加搜索参数
    if (searchKeyword.value && searchKeyword.value.trim() !== '') {
      params.search = searchKeyword.value.trim();
    }
    
    // 如果选择了分类，则添加分类筛选参数
    if (selectedCategory.value) {
      params.category = selectedCategory.value;
    }
    
    const result = await list(params);
    
    // 更新博客数据
    blogs.value = result.data.blogs;
    
    // 更新分页信息
    if (result.data.pagination) {
      pagination.value = result.data.pagination;
    } else {
      // 如果API没有返回分页信息，则手动计算
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
    console.error('获取博客列表失败:', error);
  } finally {
    loading.value = false;
  }
};

// 切换页面
const changePage = (page: number | string) => {
  const pageNum = Number(page);
  if (pageNum >= 1 && pageNum <= pagination.value.totalPages && pageNum !== currentPage.value) {
    fetchBlogs(pageNum);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// 更改每页显示数量
const changeItemsPerPage = (limit: number) => {
  itemsPerPage.value = limit;
  currentPage.value = 1; // 重置到第一页
  fetchBlogs(1);
};

// 更改排序方式
const changeSortBy = (field: 'createdAt' | 'viewCount' | 'likeCount' | 'commentCount', order?: 'asc' | 'desc') => {
  sortBy.value = field;
  
  // 如果提供了排序方向，则使用提供的方向，否则保持当前方向
  if (order) {
    sortOrder.value = order;
  }
  
  currentPage.value = 1; // 重置到第一页
  fetchBlogs(1);
};

// 更改排序方向
const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  currentPage.value = 1; // 重置到第一页
  fetchBlogs(1);
};

// 执行搜索
const performSearch = () => {
  currentPage.value = 1; // 重置到第一页
  fetchBlogs(1);
};

// 清空搜索
const clearSearch = () => {
  searchKeyword.value = '';
  currentPage.value = 1;
  fetchBlogs(1);
};

// 选择分类
const selectCategory = (category: string | null) => {
  selectedCategory.value = category;
  currentPage.value = 1; // 重置到第一页
  fetchBlogs(1);
};

// 上一页
const prevPage = () => {
  if (pagination.value.hasPrevPage) {
    changePage(currentPage.value - 1);
  }
};

// 下一页
const nextPage = () => {
  if (pagination.value.hasNextPage) {
    changePage(currentPage.value + 1);
  }
};

// 计算显示的页码按钮
const getPageNumbers = () => {
  const pages: (number | string)[] = [];
  const totalPages = pagination.value.totalPages;
  const current = currentPage.value;
  
  if (totalPages <= 5) {
    // 总页数较少时显示所有页码
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // 总页数较多时显示部分页码
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

// 在组件挂载时获取博客列表
onMounted(async () => {
  await Promise.all([
    fetchBlogs(1),
    categories().then(result => {
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
        class="absolute -top-32 -right-32 w-120 h-120 lg:w-160 lg:h-160 bg-primary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40 dark:opacity-30">
      </div>
      <div
        class="absolute -bottom-32 -left-32 w-120 h-120 lg:w-160 lg:h-160 bg-secondary/10 rounded-full blur-[100px] lg:blur-[128px] opacity-40 dark:opacity-30">
      </div>
    </div>

    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
      <section class="min-h-[40vh] lg:min-h-[45vh] flex flex-col justify-end pb-8 lg:pb-12 pt-24 sm:pt-28 lg:pt-32">
        <div class="max-w-3xl mx-auto w-full text-center space-y-6 lg:space-y-8">
          <div class="space-y-3 lg:space-y-4">
            <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-tight">
              {{ t('blog_page.hero.title_prefix') }} <span
                class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{
                  t('blog_page.hero.title_highlight') }}</span>
            </h1>
            <p class="text-base-content/60 text-sm sm:text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
              {{ t('blog_page.hero.subtitle') }}
            </p>
          </div>

          <div
            class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between bg-base-200/50 dark:bg-base-200/30 backdrop-blur-xl border border-base-content/5 p-2 sm:p-2.5 rounded-2xl lg:rounded-3xl shadow-lg relative z-10">
            <div class="relative flex-1">
              <div class="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                <Icon name="heroicons:magnifying-glass" class="w-4 h-4 sm:w-5 sm:h-5 text-base-content/40" />
              </div>
              <input 
                v-model="searchKeyword"
                @keyup.enter="performSearch"
                type="text" 
                :placeholder="t('blog_page.search_placeholder')"
                class="input input-sm sm:input-md w-full pl-9 sm:pl-11 bg-transparent border-0 focus:bg-base-100 dark:focus:bg-base-300/50 rounded-xl transition-colors placeholder:text-base-content/30 text-sm sm:text-base" />
                
              <div v-if="searchKeyword" class="absolute inset-y-0 right-0 pr-3 sm:pr-4 flex items-center">
                <button @click="clearSearch" class="btn btn-xs btn-circle btn-ghost text-base-content/50 hover:text-base-content">
                  <Icon name="heroicons:x-mark" class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <button 
              @click="performSearch"
              class="btn bg-linear-to-r from-primary to-secondary/90 btn-sm sm:btn-md rounded-lg font-medium whitespace-nowrap">
             <Icon name="heroicons:magnifying-glass" class="w-4 h-4 sm:w-5 sm:h-5 text-gray-700 dark:text-gray-200" />
              <span class="hidden sm:inline ml-2 text-gray-800 dark:text-gray-100">搜索</span>
            </button>

            <div class="flex items-center justify-center gap-1 sm:gap-2 shrink-0 relative" style="z-index: 1000;">
              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button"
                  class="btn btn-ghost btn-xs sm:btn-sm rounded-full font-normal text-base-content/70 gap-1 sm:gap-2 px-2 sm:px-3">
                  <Icon name="heroicons:tag" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span class="hidden sm:inline">{{ t('blog_page.filter.category_label') }}</span>
                  <Icon name="heroicons:chevron-down" class="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                </div>
                <ul tabindex="0"
                  class="dropdown-content menu p-2 shadow-xl bg-base-100 dark:bg-base-200 rounded-xl w-44 sm:w-52 border border-base-content/5 mt-2 text-sm">

                  <li>
                    <a 
                      class="rounded-lg" 
                      :class="{ 'bg-primary text-primary-content': selectedCategory === null }"
                      @click="selectCategory(null)">
                      {{ t('blog_page.filter.options.all') || '全部文章' }}
                    </a>
                  </li>
                  <li v-for="category in blogCategories" :key="category">
                    <a 
                      class="rounded-lg" 
                      :class="{ 'bg-primary text-primary-content': selectedCategory === category }"
                      @click="selectCategory(category)">
                      {{ category }}
                    </a>
                  </li>
                </ul>
              </div>

              <div class="h-4 w-px bg-base-content/10"></div>

              <div class="dropdown dropdown-end">
                <div tabindex="0" role="button"
                  class="btn btn-ghost btn-xs sm:btn-sm rounded-full font-normal text-base-content/70 gap-1 sm:gap-2 px-2 sm:px-3">
                  <Icon name="heroicons:arrows-up-down" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span class="hidden sm:inline">{{ t('blog_page.sort.label') }}</span>
                  <Icon :name="sortOrder === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" class="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <ul tabindex="0"
                  class="dropdown-content menu p-2 shadow-xl bg-base-100 dark:bg-base-200 rounded-xl w-44 sm:w-52 border border-base-content/5 mt-2 text-sm">
                  <li><a class="rounded-lg" @click="changeSortBy('createdAt', 'desc')">{{ t('blog_page.sort.options.newest') }}</a></li>
                  <li><a class="rounded-lg" @click="changeSortBy('viewCount', 'desc')">{{ t('blog_page.sort.options.popular') }}</a></li>
                  <li><a class="rounded-lg" @click="changeSortBy('likeCount', 'desc')">{{ t('blog_page.sort.options.most_liked') }}</a></li>
                  <li><a class="rounded-lg" @click="changeSortBy('commentCount', 'desc')">{{ t('blog_page.sort.options.most_commented') }}</a></li>
                  <li><a class="rounded-lg" @click="changeSortBy('createdAt', 'asc')">{{ t('blog_page.sort.options.oldest') }}</a></li>
                  <div class="divider my-1"></div>
                  <li><a class="rounded-lg flex items-center justify-between" @click="toggleSortOrder">
                    {{ sortOrder === 'asc' ? t('blog_page.sort.order.asc') : t('blog_page.sort.order.desc') }}
                    <Icon :name="sortOrder === 'asc' ? 'heroicons:arrow-up' : 'heroicons:arrow-down'" class="w-4 h-4" />
                  </a></li>
                </ul>
              </div>
            </div>
          </div>
<!-- 
          <div class="flex gap-2 justify-center flex-wrap px-2">
            <div v-for="tag in popularTags" :key="tag"
              class="badge badge-outline badge-sm sm:badge-md hover:bg-primary hover:text-primary-content hover:border-primary cursor-pointer transition-all duration-200 py-2.5 sm:py-3 px-3 sm:px-4 text-xs sm:text-sm">
              {{ tag }}
            </div>
          </div> -->
        </div>
      </section>

      <section class="pb-16 lg:pb-24">
        <!-- 博客列表加载状态 -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          <div v-for="n in itemsPerPage" :key="n" class="card bg-base-300">
            <div class="p-3 sm:p-4">
              <div class="aspect-16/10 w-full rounded-xl lg:rounded-2xl bg-base-content/10"></div>
              <div class="pt-4 space-y-3">
                <div class="flex flex-wrap gap-2">
                  <div class="badge badge-ghost badge-sm rounded-full bg-base-content/10 w-12 h-4"></div>
                </div>
                <div class="space-y-2">
                  <div class="h-5 bg-base-content/10 rounded w-3/4"></div>
                  <div class="h-5 bg-base-content/10 rounded w-1/2"></div>
                </div>
                <div class="space-y-1.5 pt-1">
                  <div class="h-4 bg-base-content/10 rounded w-full"></div>
                  <div class="h-4 bg-base-content/10 rounded w-4/5"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 博客列表 -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
          <div v-for="blog in blogs" :key="blog.id"
            class="card bg-base-300 border border-base-content/5 rounded-2xl lg:rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            @click="$router.push(`/blog/${blog.id}`)" >
            <div class="p-3  bg-base-300 sm:p-4">
              <div class="relative w-full rounded-xl lg:rounded-2xl overflow-hidden" style="aspect-ratio: 16/10;">
    <img :src="blog.coverImage" :alt="blog.title" class="absolute inset-0 w-full h-full object-cover"></img>
  </div>

              <div class="pt-4 space-y-3">
                <div class="flex flex-wrap gap-2">
                  <div v-for="tag in blog.tags" :key="tag"
                    class="">
                    <span class="text-xs">{{ tag }}</span>
                    
                  </div>
                  
                </div>
           
                <div class="space-y-2">
                  <h3 class="font-bold text-lg leading-tight line-clamp-2">{{ blog.title }}</h3>
                </div>
<div class="space-y-1.5 pt-1">
  <p class="text-sm text-base-content/70 line-clamp-2 min-h-[2.5em]">
    {{ blog.summary ? blog.summary.substring(0, 45) + (blog.summary.length > 45 ? '...' : '') : '' }}
  </p>
</div>
              </div>

              <div class="flex items-center justify-between mt-5 pt-4 border-t border-base-content/5">
                <div class="flex items-center gap-2">
                  <div class="avatar">
                    <div class="w-7 h-7 rounded-full">
                      <img :src="blog.author.avatar" :alt="blog.author.username" class="object-cover w-full h-full">
                    </div>
                  </div>
                  <div class="text-sm font-medium truncate max-w-20">{{ blog.author.username }}</div>
                </div>
                <div class="text-xs text-base-content/50">
                  {{ blog.createdAt ? blog.createdAt.split('-').slice(0, 2).join('-') : '' }}
                </div>
              </div>
              <div class="flex justify-end mt-2">
                <div class="badge badge-xs bg-base-300 text-xs flex items-center justify-center">
                  {{ blog.category }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 分页控件 -->
        <div v-if="pagination.totalPages > 1" class="flex flex-col items-center mt-10 lg:mt-16 gap-4">
          <!-- 每页显示数量选择器 -->
          <div class="flex items-center gap-2">
            <span class="text-sm text-base-content/70">{{ '每页显示' }}</span>
            <select 
              v-model.number="itemsPerPage" 
              @change="changeItemsPerPage(itemsPerPage)"
              class="select select-bordered select-sm w-24"
            >
              <option value="4">4 {{  '条' }}</option>
              <option value="8" selected>8  {{ '条' }}</option>
              <option value="12">12 {{  '条' }}</option>
              <option value="16">16 {{  '条' }}</option>
            </select>
          </div>
          
          <!-- 分页按钮 -->
          <div class="join">
            <!-- 上一页按钮 -->
            <button
              class="join-item btn btn-sm sm:btn-md btn-outline border-base-content/10 text-base-content/50 hover:bg-base-content hover:text-base-100 hover:border-base-content"
              :disabled="!pagination.hasPrevPage"
              @click="prevPage">
              <Icon name="heroicons:chevron-left" class="w-4 h-4" />
            </button>

            <!-- 页码按钮 -->
            <template v-for="page in getPageNumbers()" :key="page">
              <button 
                v-if="page === '...'"
                class="join-item btn btn-sm sm:btn-md btn-outline border-base-content/10 text-base-content/50 cursor-default"
                disabled>
                ...
              </button>
              <button
                v-else
                class="join-item btn btn-sm sm:btn-md"
                :class="{
                  'bg-primary text-primary-content border-primary hover:bg-primary/90 hover:border-primary/90': page === currentPage,
                  'btn-outline border-base-content/10 text-base-content/60 hover:bg-base-content hover:text-base-100 hover:border-base-content': page !== currentPage
                }"
                @click="changePage(Number(page))">
                {{ page }}
              </button>
            </template>

            <!-- 下一页按钮 -->
            <button
              class="join-item btn btn-sm sm:btn-md btn-outline border-base-content/10 text-base-content/50 hover:bg-base-content hover:text-base-100 hover:border-base-content"
              :disabled="!pagination.hasNextPage"
              @click="nextPage">
              <Icon name="heroicons:chevron-right" class="w-4 h-4" />
            </button>
          </div>
          
          <!-- 分页信息 -->
          <div class="text-sm text-base-content/60">
            {{ `第 ${currentPage} 页，共 ${pagination.totalPages} 页，总计 ${pagination.totalBlogs} 篇文章` }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>