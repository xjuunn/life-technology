<template>
<div class="admin-dashboard bg-base-100 min-h-screen p-6">
  <title>life-管理后台</title>
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-base-content bg-base-200/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-base-300">
        {{ t('dashboard') }}
        <span class="block text-lg font-normal text-primary mt-2">{{ t('welcome', { date: currentDate }) }}</span>
      </h1>
    </div>

    <!-- 数据状态和刷新控制 -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3 sm:gap-0">
      <!-- 最后更新时间 -->
      <div class="text-sm text-base-content/70 flex items-center gap-2">
        <span class="hidden sm:inline">{{ t('dataStatus.lastUpdate') }}:</span>
        <span class="font-medium text-base-content">{{ lastRefreshTime }}</span>
      </div>  
      <!-- 刷新控制区域 -->
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <div class="form-control flex-1 sm:flex-none">
          <label class="label cursor-pointer flex items-center justify-between gap-2 p-0">
            <span class="label-text text-sm truncate min-w-0">
              <span class="hidden xs:inline">{{ t('dataStatus.autoRefresh', { seconds: autoRefreshInterval / 1000 }) }}</span>
              <span class="xs:hidden">{{ t('dataStatus.autoRefresh', { seconds: '' }).replace('()', '') }}</span>
            </span>
            <input type="checkbox" class="toggle toggle-sm flex-shrink-0" v-model="autoRefreshEnabled" />
          </label>
        </div>
        
        <!-- 刷新按钮 -->
        <button 
          @click="refreshData" 
          class="btn btn-sm btn-outline flex-shrink-0 min-w-[unset] px-3 sm:px-4" 
          :disabled="isLoading"
          :class="{'btn-square': windowWidth < 640}"
          :title="windowWidth < 640 ? t('dataStatus.refreshData') : ''"
        >
          <Icon 
            v-if="isLoading" 
            name="mingcute:refresh-2-line" 
            class="animate-spin" 
            :class="{'mr-1': windowWidth >= 640}" 
          />
          <Icon 
            v-else 
            name="mingcute:refresh-2-line" 
            :class="{'mr-1': windowWidth >= 640}" 
          />
          <span class="hidden sm:inline">{{ t('dataStatus.refreshData') }}</span>
        </button>
      </div>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard  
        :title="t('userStats.totalUsers')"
        :count="stats.totalUsers"
        icon="mingcute:user-2-line"
        :change="10"
        trend="up"
        color="primary"
        class="transform transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] bg-base-100 border-2 border-primary/20"
        :highlight="true"
      />
      <DashboardCard 
        :title="t('userStats.totalBlogs')"
        :count="stats.totalBlogs"
        icon="mingcute:file-line"
        :change="8"
        trend="up"
        color="secondary"
        class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] bg-base-100 border-2 border-secondary/20"
        :highlight="true"
      />
      <DashboardCard
        :title="t('userStats.totalComments')"
        :count="stats.totalComments"
        icon="mingcute:message-1-line"
        :change="15"
        trend="up"
        color="accent"
        class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] bg-base-100 border-2 border-accent/20"
        :highlight="true"
      />
      <DashboardCard
        :title="t('userStats.systemStatus')"
        :status="t('userStats.normal')"
        icon="mingcute:check-circle-line"
        :uptime="t('userStats.uptime', { uptime: '99.9%' })"
        color="success"
        class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02] bg-base-100 border-2 border-success/20"
        :highlight="true"
      />
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- 用户增长趋势 -->
      <div class="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-base-content">{{ t('charts.userGrowth') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('charts.userGrowthDailyDesc') }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <div class="flex space-x-2 mr-4">
              <button @click="setChartRange('7days')" :class="['px-3 py-1 rounded-lg text-sm', chartRange === '7days' ? 'bg-primary text-primary-content' : 'text-base-content/70 hover:bg-base-200']">
                {{ t('charts.last7Days') }}
              </button>
              <button @click="setChartRange('30days')" :class="['px-3 py-1 rounded-lg text-sm', chartRange === '30days' ? 'bg-primary text-primary-content' : 'text-base-content/70 hover:bg-base-200']">
                {{ t('charts.last30Days') }}
              </button>
            </div>
            <button @click="refreshChartData('userGrowth')" class="btn btn-xs btn-ghost" :title="t('charts.refreshChart')">
              <Icon name="mingcute:refresh-2-line" />
            </button>
          </div>
        </div>
        <div class="h-[300px]">
          <!-- 添加加载状态 -->
          <div v-if="isLoading" class="flex items-center justify-center h-full">
            <div class="text-center">
              <div class="loading loading-spinner loading-lg text-primary"></div>
              <p class="mt-2 text-base-content/70">{{ t('loading.chartData') }}</p>
            </div>
          </div>
          <div v-else-if="error" class="flex items-center justify-center h-full">
            <div class="text-center text-error">
              <Icon name="mingcute:close-circle-line" class="text-3xl mb-2" />
              <p>{{ error }}</p>
              <button @click="refreshData" class="btn btn-sm btn-outline mt-3">{{ t('loading.retry') }}</button>
            </div>
          </div>
          <div v-else-if="!userGrowth.xAxis.length || !userGrowth.seriesData.length" class="flex items-center justify-center h-full">
            <div class="text-center text-base-content/70">
              <Icon name="mingcute:chart-line-line" class="text-3xl mb-2" />
              <p>{{ t('loading.noData') }}</p>
            </div>
          </div>
          <LineChart v-else
            :x-axis-data="userGrowth.xAxis"
            :series-data="userGrowth.seriesData"
            :series-name="t('userStats.totalUsers')"
            :area-style="true"
            color="#3b82f6"
            :line-width="3"
            :show-legend="false"
            :x-axis-rotate="userGrowth.xAxis.length > 10 ? 45 : 0"
            :x-axis-interval="userGrowth.xAxis.length > 15 ? Math.floor(userGrowth.xAxis.length / 8) : 0"
            :key="'userGrowth-' + chartDataVersion"
          />
        </div>
      </div>

      <!-- 博客增长趋势 -->
      <div class="bg-base-100 rounded-xl shadow p-4 border border-base-300">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-bold text-base-content">{{ t('charts.blogGrowth') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('charts.blogGrowthDailyDesc') }}</p>
          </div>
          <div class="flex items-center">
            <div class="text-sm text-base-content/70 mr-4">
              {{ t('charts.totalArticles', { total: stats.totalBlogs }) }}
            </div>
            <button @click="refreshChartData('blogGrowth')" class="btn btn-xs btn-ghost" :title="t('charts.refreshChart')">
              <Icon name="mingcute:refresh-2-line" />
            </button>
          </div>
        </div>
        <div class="h-[250px]">
          <!-- 添加加载状态 -->
          <div v-if="isLoading" class="flex items-center justify-center h-full">
            <div class="text-center">
              <div class="loading loading-spinner loading-lg text-primary"></div>
              <p class="mt-2 text-base-content/70">{{ t('loading.chartData') }}</p>
            </div>
          </div>
          <div v-else-if="error" class="flex items-center justify-center h-full">
            <div class="text-center text-error">
              <Icon name="mingcute:close-circle-line" class="text-3xl mb-2" />
              <p>{{ error }}</p>
            </div>
          </div>
          <div v-else-if="!blogGrowth.xAxis.length || !blogGrowth.seriesData.length" class="flex items-center justify-center h-full">
            <div class="text-center text-base-content/70">
              <Icon name="mingcute:chart-line-line" class="text-3xl mb-2" />
              <p>{{ t('loading.noData') }}</p>
            </div>
          </div>
          <LineChart v-else
            :x-axis-data="blogGrowth.xAxis"
            :series-data="blogGrowth.seriesData"
            :series-name="t('userStats.totalBlogs')"
            :area-style="true"
            color="#10b981"
            :line-width="2"
            :show-legend="false"
            :x-axis-rotate="blogGrowth.xAxis.length > 10 ? 45 : 0"
            :x-axis-interval="blogGrowth.xAxis.length > 15 ? Math.floor(blogGrowth.xAxis.length / 8) : 0"
            :key="'blogGrowth-' + chartDataVersion"
          />
       </div>
      </div>
    </div>

    <!-- 快速操作和作者排行 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
      <div class="lg:col-span-2">
        <div class="bg-base-100 rounded-xl shadow p-4 border border-base-300">
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-bold text-base-content">{{ t('quickActions.title') }}</h2>
            <span class="text-xs text-base-content/70 bg-base-200 px-3 py-1 rounded-lg">{{ t('quickActions.desc') }}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            <ActionButton 
              to="/admin/users"
              icon="mingcute:user-2-line"
              :label="t('quickActions.userManagement')"
              :description="t('quickActions.userManagementDesc')"
              color="primary"
            />
            <ActionButton 
              to="/admin/blogs"
              icon="mingcute:file-line"
              :label="t('quickActions.blogManagement')"
              :description="t('quickActions.blogManagementDesc')"
              color="secondary"
            />
            <ActionButton
              to="/admin/comments"
              icon="mingcute:message-1-line"
              :label="t('quickActions.commentReview')"
              :description="t('quickActions.commentReviewDesc')"
              color="accent"
            />
            <ActionButton
              to="/admin/reports"
              icon="mingcute:flag-2-line"
              :label="t('quickActions.reportManagement')"
              :description="t('quickActions.reportManagementDesc')"
              color="warning"
            />
          </div>
        </div>
      </div>

      <!-- 顶级作者排行 -->
      <div class="bg-base-100 rounded-xl shadow p-4 border border-base-300">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-bold text-base-content">{{ t('topAuthors.title') }}</h2>
          <div class="flex items-center text-xs text-base-content/70">
            <Icon name="mingcute:medal-line" class="mr-1" />
            {{ t('topAuthors.desc') }}
          </div>
        </div>
        <div class="space-y-3">
          <div v-for="(author, index) in topAuthors" :key="author.authorId" class="flex items-center p-2 bg-base-200/50 rounded-lg hover:bg-base-200 transition-colors">
            <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-2 font-bold text-primary text-sm">
              {{ index + 1 }}
            </div>
            <div class="flex-1">
              <div class="flex items-center">
                <div class="w-6 h-6 rounded-full bg-base-300 mr-2 overflow-hidden">
                  <img v-if="author.author.avatar" :src="author.author.avatar" :alt="author.author.username" class="w-full h-full object-cover">
                  <div v-else class="w-full h-full flex items-center justify-center bg-base-300 text-base-content/70 text-xs">
                    {{ author.author.username.charAt(0).toUpperCase() }}
                  </div>
                </div>
                <div>
                  <p class="font-medium text-base-content text-sm">{{ author.author.username }}</p>
                  <p class="text-xs text-base-content/60">{{ author.totalViews }} {{ t('topAuthors.views') }}</p>
                </div>
              </div>
            </div>
            <div class="text-right">
              <p class="font-bold text-base-content">{{ author.blogCount }}</p>
              <p class="text-xs text-base-content/60">{{ t('topAuthors.blogs') }}</p>
            </div>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-base-300">
          <div class="grid grid-cols-2 gap-3 text-center">
            <div>
              <p class="text-xl font-bold text-primary">{{ stats.publishedBlogs }}</p>
              <p class="text-xs text-base-content/70">{{ t('topAuthors.published') }}</p>
            </div>
            <div>
              <p class="text-xl font-bold text-secondary">{{ stats.totalLikes }}</p>
              <p class="text-xs text-base-content/70">{{ t('topAuthors.totalLikes') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- 月度统计图表 -->
      <div class="bg-base-100 rounded-xl shadow p-4 border border-base-300">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-bold text-base-content">{{ t('monthlyStats.title') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('monthlyStats.desc') }}</p>
          </div>
          <div class="flex items-center">
            <div class="text-sm text-base-content/70 mr-4">
              {{ t('monthlyStats.currentMonth', { month: currentMonth }) }}
            </div>
            <button @click="refreshChartData('monthlyStats')" class="btn btn-xs btn-ghost" :title="t('charts.refreshChart')">
              <Icon name="mingcute:refresh-2-line" />
            </button>
          </div>
        </div>
        <div class="h-[280px]">
          <ChartBase
            :options="monthlyStats.options"
            height="100%"
            :key="'monthlyStats-' + chartDataVersion"
          />
        </div>
      </div>

      <!-- 用户预览 -->
      <div class="space-y-4">
        <!-- 用户统计 -->
        <div class="flex items-center justify-between p-4 bg-base-200/30 rounded-lg">
          <div class="flex items-center">
            <Icon name="mingcute:user-2-line" class="text-primary mr-3" />
            <div>
              <p class="text-sm font-medium text-base-content">{{ t('systemOverview.userStats') }}</p>
              <p class="text-xs text-base-content/70">{{ stats.activeUsers }}/{{ stats.totalUsers }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-base-content">{{ stats.activeUsers }}</p>
            <p class="text-xs text-base-content/70">{{ t('systemOverview.active') }}</p>
          </div>
        </div>
        
        <!-- 博客统计 -->
        <div class="flex items-center justify-between p-4 bg-base-200/30 rounded-lg">
          <div class="flex items-center">
            <Icon name="mingcute:file-line" class="text-secondary mr-3" />
            <div>
              <p class="text-sm font-medium text-base-content">{{ t('systemOverview.blogStats') }}</p>
              <p class="text-xs text-base-content/70">{{ stats.publishedBlogs }}/{{ stats.totalBlogs }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-base-content">{{ stats.publishedBlogs }}</p>
            <p class="text-xs text-base-content/70">{{ t('systemOverview.published') }}</p>
          </div>
        </div>
        
        <!-- 评论统计 -->
        <div class="flex items-center justify-between p-4 bg-base-200/30 rounded-lg">
          <div class="flex items-center">
            <Icon name="mingcute:message-1-line" class="text-accent mr-3" />
            <div>
              <p class="text-sm font-medium text-base-content">{{ t('systemOverview.commentStats') }}</p>
              <p class="text-xs text-base-content/70">{{ stats.totalLikes }}/{{ stats.totalComments }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-base-content">{{ stats.totalComments }}</p>
            <p class="text-xs text-base-content/70">{{ t('systemOverview.comments') }}</p>
          </div>
        </div>
        
        <!-- 最近活动 -->
        <div class="flex items-center justify-between p-4 bg-base-200/30 rounded-lg">
          <div class="flex items-center">
            <Icon name="mingcute:time-line" class="text-info mr-3" />
            <div>
              <p class="text-sm font-medium text-base-content">{{ t('systemOverview.recentActivity') }}</p>
              <p class="text-xs text-base-content/70">{{ stats.recentUsers }}/{{ stats.recentBlogs }}</p>
            </div>
          </div>
          <div class="text-right">
            <p class="text-lg font-bold text-base-content">{{ stats.recentUsers }}</p>
            <p class="text-xs text-base-content/70">{{ t('systemOverview.newUsers') }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 添加底部装饰 -->
    <div class="mt-8 pt-4 border-t border-base-300">
      <p class="text-center text-base-content/50 text-xs">
        {{ t('footer.lastUpdate', { time: currentTime }) }} | {{ t('footer.contactSupport') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue';
import { useRoute } from 'vue-router';
import DashboardCard from '~/components/admin/DashboardCard.vue'
import LineChart from '~/components/echarts/line-chart.vue'
import ActionButton from '~/components/admin/ActionButton.vue'
import ChartBase from '~/components/echarts/chart-base.vue'
import { Stats as fetchStats } from '~/api/admin'
import type { EChartsCoreOption } from 'echarts/core';

interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalComments: number;
  totalLikes: number;
  activeUsers: number;
  publishedBlogs: number;
  recentUsers: number;
  recentBlogs: number;
}

interface TrendData {
  dates: string[];
  users: number[];
  blogs: number[];
  comments: number[];
}

interface TopAuthor {
  authorId: string;
  blogCount: number;
  totalViews: number;
  author: {
    id: string;
    username: string;
    avatar: string;
  };
}

interface ChartData {
  xAxis: string[];
  seriesData: number[];
}

const { t, locale } = useI18n();
const route = useRoute();

// 添加加载状态和错误处理
const isLoading = ref(false);
const error = ref<string | null>(null);
const chartRange = ref('7days');

// 数据刷新控制
const autoRefreshEnabled = ref(true);
const autoRefreshInterval = ref(30000); // 30秒
let autoRefreshTimer: NodeJS.Timeout | null = null;
const lastRefreshTime = ref<string>('');
const chartDataVersion = ref(0); 

// 统计数据
const stats = ref<DashboardStats>({
  totalUsers: 0,
  totalBlogs: 0,
  totalComments: 0,
  totalLikes: 0,
  activeUsers: 0,
  publishedBlogs: 0,
  recentUsers: 0,
  recentBlogs: 0
});

// 趋势数据
const trendData = ref<TrendData>({
  dates: [],
  users: [],
  blogs: [],
  comments: []
});

// 顶级作者
const topAuthors = ref<TopAuthor[]>([]);

// 用户增长数据 
const userGrowth = ref<ChartData>({
  xAxis: [],
  seriesData: []
});

// 博客增长数据
const blogGrowth = ref<ChartData>({
  xAxis: [],
  seriesData: []
});

// 月度统计图表配置
const monthlyStats = ref({
  options: {} as EChartsCoreOption
});

// 更新最后刷新时间
const updateLastRefreshTime = () => {
  const now = new Date();
  lastRefreshTime.value = now.toLocaleString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};

const setChartRange = async (range: string) => {
  chartRange.value = range;
  processChartData(range);
  chartDataVersion.value++;
};

const refreshChartData = (chartType: string) => {
  console.log(`刷新图表数据: ${chartType}`);
  chartDataVersion.value++; 

  if (chartType === 'userGrowth' || chartType === 'blogGrowth') {
    processChartData(chartRange.value);
  } else if (chartType === 'monthlyStats') {
    // 生成每日统计数据
    generateDailyStats();
  }
};

const processChartData = (range: string) => {
  console.log('处理图表数据，范围:', range);
  
  if (!trendData.value || trendData.value.dates.length === 0) {
    console.warn('没有趋势数据可用');
    const defaultData = generateDefaultDailyData(range);
    userGrowth.value = defaultData.userGrowth;
    blogGrowth.value = defaultData.blogGrowth;
    generateDailyStats();
    return;
  }

  const { dates, users = [], blogs = [], comments = [] } = trendData.value;
  console.log('原始趋势数据:', { dates, users, blogs, comments });
  
  let processedDates: string[] = [];
  let processedUsers: number[] = [];
  let processedBlogs: number[] = [];
  let processedComments: number[] = [];
  
  // 根据选择的范围筛选数据
  let dayCount = 7;
  if (range === '30days') {
    dayCount = 30;
  }

  const recentCount = Math.min(dates.length, dayCount);
  
  // 过滤出有效的日期数据
  const validDates = dates.slice(-recentCount).filter(date => date != null);
  const validUsers = users.slice(-recentCount);
  const validBlogs = blogs.slice(-recentCount);
  const validComments = comments.slice(-recentCount);

  processedDates = validDates.map(date => {
    if (date && typeof date === 'string') {
      try {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) {
          if (date.includes('-')) {
            const [yearStr, monthStr] = date.split('-');
            const year = yearStr || '';
            const month = monthStr || '';
            return `${month}/${year.slice(-2)}`;
          }
          return date;
        }
        
        // 根据语言环境格式化日期
        const currentLang = locale.value || 'zh-CN';
        const day = dateObj.getDate();
        const month = dateObj.getMonth() + 1;
        
        if (currentLang === 'en') {
          return `${month}/${day}`;
        } else if (currentLang === 'zh-TW') {
          return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`;
        } else {

          return `${month}月${day}日`;
        }
      } catch (e) {
        console.warn('日期解析失败:', date, e);
        return date;
      }
    }
    return date || t('charts.unknownDate');
  });
  
  processedUsers = validUsers;
  processedBlogs = validBlogs;
  processedComments = validComments;
  
  console.log('处理后的图表数据:', {
    dates: processedDates,
    users: processedUsers,
    blogs: processedBlogs,
    comments: processedComments
  });
  
   console.log('处理后的图表数据:', {
    dates: processedDates,
    users: processedUsers,
    blogs: processedBlogs,
    comments: processedComments
  });
  
  const minLength = Math.min(
    processedDates.length, 
    processedUsers.length, 
    processedBlogs.length, 
    processedComments.length
  );
  
  userGrowth.value = {
    xAxis: processedDates.slice(0, minLength),
    seriesData: processedUsers.slice(0, minLength)
  };
  
  blogGrowth.value = {
    xAxis: processedDates.slice(0, minLength),
    seriesData: processedBlogs.slice(0, minLength)
  };
  
  // 生成每日统计数据
  generateDailyStats();
};

const generateDefaultDailyData = (range: string) => {
  const dayCount = range === '30days' ? 30 : 7;
  const today = new Date();
  const dates: string[] = [];
  const users: number[] = [];
  const blogs: number[] = [];
  
  for (let i = dayCount - 1; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    const month = date.getMonth() + 1;
    const day = date.getDate();
    const currentLang = locale.value || 'zh-CN';
    
    if (currentLang === 'en') {
      dates.push(`${month}/${day}`);
    } else if (currentLang === 'zh-TW') {
      dates.push(`${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}`);
    } else {
      dates.push(`${month}月${day}日`);
    }

    const baseUsers = 40;
    users.push(baseUsers + Math.floor(Math.random() * 10));

    const baseBlogs = 110;
    blogs.push(baseBlogs + Math.floor(Math.random() * 15));
  }
  
  return {
    userGrowth: {
      xAxis: dates,
      seriesData: users
    },
    blogGrowth: {
      xAxis: dates,
      seriesData: blogs
    }
  };
};

// 生成每日统计数据图表
const generateDailyStats = () => {
  const dates = userGrowth.value.xAxis || [];
  const blogs = blogGrowth.value.seriesData || [];
  const comments = trendData.value.comments?.slice(-dates.length) || [];

  if (dates.length === 0) {
    const defaultData = generateDefaultDailyData(chartRange.value);
    monthlyStats.value.options = createDailyChartOptions(
      defaultData.userGrowth.xAxis,
      defaultData.blogGrowth.seriesData,
      Array(dates.length || 7).fill(0).map(() => Math.floor(Math.random() * 50))
    );
    return;
  }
  
  monthlyStats.value.options = createDailyChartOptions(dates, blogs, comments);
};

const createDailyChartOptions = (dates: string[], blogs: number[], comments: number[]) => {
  const currentLang = locale.value || 'zh-CN';
  
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        let result = '';
        if (params && params.length > 0) {
          result = `${params[0].axisValue}<br/>`;
          params.forEach((item: any) => {
            result += `${item.marker} ${item.seriesName}: ${item.value}<br/>`;
          });
        }
        return result;
      }
    },
    legend: {
      data: [t('dailyStats.blogs'), t('dailyStats.comments')],
      bottom: 10,
      textStyle: {
        color: '#6b7280'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '15%',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: dates,
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280',
        rotate: dates.length > 10 ? 45 : 0,
        interval: dates.length > 15 ? Math.floor(dates.length / 8) : 0
      }
    },
    yAxis: {
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#e5e7eb'
        }
      },
      axisLabel: {
        color: '#6b7280'
      },
      splitLine: {
        lineStyle: {
          color: '#f3f4f6'
        }
      }
    },
    series: [
      {
        name: t('dailyStats.blogs'),
        type: 'bar',
        data: blogs,
        itemStyle: {
          color: '#3b82f6'
        },
        emphasis: {
          itemStyle: {
            color: '#2563eb'
          }
        }
      },
      {
        name: t('dailyStats.comments'),
        type: 'bar',
        data: comments,
        itemStyle: {
          color: '#10b981'
        },
        emphasis: {
          itemStyle: {
            color: '#059669'
          }
        }
      }
    ]
  } as EChartsCoreOption;
};

watch(locale, () => {
  if (trendData.value.dates.length > 0) {
    processChartData(chartRange.value);
  }
});

// 获取仪表盘数据
const fetchDashboardData = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    const response = await fetchStats();
    console.log('API响应:', response); 
    
    if (response && response.data) {
      const statsData = response.data;
      
      console.log('statsData:', statsData);
      console.log('statsData.stats:', statsData?.stats);
      console.log('statsData.topAuthors:', statsData?.topAuthors);

      if (statsData?.stats) {
        stats.value = {
          totalUsers: statsData.stats.totalUsers || 0,
          totalBlogs: statsData.stats.totalBlogs || 0,
          totalComments: statsData.stats.totalComments || 0,
          totalLikes: statsData.stats.totalLikes || 0,
          activeUsers: statsData.stats.activeUsers || 0,
          publishedBlogs: statsData.stats.publishedBlogs || 0,
          recentUsers: statsData.stats.recentUsers || 0,
          recentBlogs: statsData.stats.recentBlogs || 0
        };

        if (statsData.stats.trend) {
          trendData.value = {
            dates: statsData.stats.trend.dates || [],
            users: statsData.stats.trend.users || [],
            blogs: statsData.stats.trend.blogs || [],
            comments: statsData.stats.trend.comments || []
          };
        }
      } else {
        console.warn('API返回的数据中没有stats字段');
        stats.value = {
          totalUsers: 0,
          totalBlogs: 0,
          totalComments: 0,
          totalLikes: 0,
          activeUsers: 0,
          publishedBlogs: 0,
          recentUsers: 0,
          recentBlogs: 0
        };
      }
      
      // 更新顶级作者
      topAuthors.value = statsData?.topAuthors || [];
      
      // 处理图表数据
      processChartData(chartRange.value);
      
      // 更新刷新时间
      updateLastRefreshTime();

      chartDataVersion.value++;
    } else {
      console.warn('API返回空响应或没有data字段');
      throw new Error('数据获取失败：无效的响应');
    }
    
  } catch (err: any) {
    console.error('获取仪表盘数据失败:', err);
    error.value = err.message || '获取数据失败';

    stats.value = {
      totalUsers: 45,
      totalBlogs: 120,
      totalComments: 890,
      totalLikes: 3450,
      activeUsers: 32,
      publishedBlogs: 98,
      recentUsers: 5,
      recentBlogs: 12
    };

    const today = new Date();
    const dates: string[] = [];
    const users: number[] = [];
    const blogs: number[] = [];
    const comments: number[] = [];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      dates.push(`${year}-${month}-${day}`);
      
      const baseUsers = 25 + Math.floor(i / 2);
      users.push(baseUsers + Math.floor(Math.random() * 5));
      
      const baseBlogs = 85 + i;
      blogs.push(baseBlogs + Math.floor(Math.random() * 10));
      
      const baseComments = 650 + i * 8;
      comments.push(baseComments + Math.floor(Math.random() * 30));
    }
    
    trendData.value = {
      dates: dates,
      users: users,
      blogs: blogs,
      comments: comments
    };
    
    topAuthors.value = [
      {
        authorId: '1',
        blogCount: 15,
        totalViews: 12500,
        author: {
          id: '1',
          username: '张三',
          avatar: ''
        }
      },
      {
        authorId: '2',
        blogCount: 12,
        totalViews: 9800,
        author: {
          id: '2',
          username: '李四',
          avatar: ''
        }
      },
      {
        authorId: '3',
        blogCount: 10,
        totalViews: 7600,
        author: {
          id: '3',
          username: '王五',
          avatar: ''
        }
      }
    ];
    
    // 处理图表数据
    processChartData(chartRange.value);
    
    // 更新刷新时间
    updateLastRefreshTime();
  } finally {
    isLoading.value = false;
  }
};

// 手动刷新数据
const refreshData = async () => {
  await fetchDashboardData();
};

// 设置自动刷新定时器
const setupAutoRefresh = () => {
  clearAutoRefresh();
  
  if (autoRefreshEnabled.value) {
    autoRefreshTimer = setInterval(async () => {
      console.log('自动刷新数据...');
      await refreshData();
    }, autoRefreshInterval.value);
  }
};

// 清除自动刷新定时器
const clearAutoRefresh = () => {
  if (autoRefreshTimer) {
    clearInterval(autoRefreshTimer);
    autoRefreshTimer = null;
  }
};

// 监听自动刷新设置变化
watch(autoRefreshEnabled, (newValue) => {
  if (newValue) {
    setupAutoRefresh();
  } else {
    clearAutoRefresh();
  }
});

// 监听路由变化，当切换页面时刷新数据
watch(() => route.path, (newPath, oldPath) => {
  if (newPath === '/admin' && newPath !== oldPath) {
    console.log('切换到仪表板页面，刷新数据');
    refreshData();
  }
});

onActivated(() => {
  console.log('页面激活，刷新数据');
  refreshData();

  setupAutoRefresh();
});

onDeactivated(() => {
  console.log('页面失活，清除定时器');
  clearAutoRefresh();
});

onUnmounted(() => {
  clearAutoRefresh();
});

// 当前日期
const currentDate = computed(() => {
  const now = new Date();
  return now.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    weekday: 'long'
  });
});

const currentTime = computed(() => {
  const now = new Date();
  return now.toLocaleString('zh-CN', { 
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
});

const currentMonth = computed(() => {
  const now = new Date();
  const monthIndex = now.getMonth(); 

  const monthNames = {
    'zh-CN': ['一月', '二月', '三月', '四月', '五月', '六月', 
              '七月', '八月', '九月', '十月', '十一月', '十二月'],
    'zh-TW': ['一月', '二月', '三月', '四月', '五月', '六月', 
              '七月', '八月', '九月', '十月', '十一月', '十二月'],
    'en': ['January', 'February', 'March', 'April', 'May', 'June', 
           'July', 'August', 'September', 'October', 'November', 'December']
  };

  const currentLang = locale.value || 'zh-CN';

  return monthNames[currentLang as keyof typeof monthNames]?.[monthIndex] || monthNames['zh-CN'][monthIndex];
});

onMounted(async () => {
  await fetchDashboardData();
  setupAutoRefresh();
});

definePageMeta({
  layout: 'admin',
});

// 添加窗口宽度响应式
const windowWidth = ref(window.innerWidth);

const updateWindowWidth = () => {
  windowWidth.value = window.innerWidth;
};

onMounted(() => {
  window.addEventListener('resize', updateWindowWidth);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateWindowWidth);
});
</script>

<style scoped>
.admin-dashboard {
  background-image: 
    radial-gradient(circle at 10% 20%, hsl(var(--p)/0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, hsl(var(--a)/0.05) 0%, transparent 20%);
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--b2));
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--bc)/0.3);
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--bc)/0.5);
}

/* 刷新动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>

<i18n lang="json">
{
  "zh-CN": {
    "dashboard": "管理仪表板",
    "welcome": "欢迎回来，管理员！今天是 {date}",
    "dataStatus": {
      "lastUpdate": "数据最后更新",
      "autoRefresh": "自动刷新 ({seconds}秒)",
      "refreshData": "刷新数据"
    },
    "loading": {
      "chartData": "加载图表数据中...",
      "noData": "暂无数据",
      "retry": "重试"
    },
    "userStats": {
      "totalUsers": "总用户数",
      "totalBlogs": "博客文章", 
      "totalComments": "评论总数",
      "totalLikes": "总点赞数",
      "activeUsers": "活跃用户",
      "activeUsersDesc": "总计 {total} 用户",
      "published": "已发布",
      "vsLastMonth": "较上月新增",
      "systemStatus": "系统状态", 
      "normal": "正常",            
      "uptime": "正常运行时间 {uptime}"  
    },
    "charts": {
      "userGrowth": "用户增长趋势",
      "userGrowthDailyDesc": "最近30天用户增长情况",
      "userGrowthDesc": "近12个月用户增长情况",
      "blogGrowth": "博客增长趋势",
      "blogGrowthDailyDesc": "最近30天博客发布情况",
      "blogGrowthDesc": "近12个月博客发布情况",
      "last7Days": "最近7天",
      "last30Days": "最近30天",
      "totalArticles": "总计 {total} 篇",
      "unknownDate": "未知日期",
      "refreshChart": "刷新图表数据"
    },
    "dailyStats": {
      "blogs": "博客发布",
      "comments": "评论数量"
    },
    "quickActions": {
      "title": "快速操作",
      "desc": "常用管理功能",
      "userManagement": "用户管理",
      "userManagementDesc": "管理用户账户",
      "blogManagement": "博客管理",
      "blogManagementDesc": "编辑博客文章",
      "commentReview": "评论审核",
      "commentReviewDesc": "审核用户评论",
      "reportManagement": "举报管理",
      "reportManagementDesc": "处理用户举报"
    },
    "topAuthors": {
      "title": "顶级作者",
      "desc": "博客发布排行榜",
      "blogs": "篇博客",
      "views": "浏览",
      "published": "已发布",
      "totalLikes": "总点赞"
    },
    "recentActivities": {
      "title": "最近活动",
      "desc": "系统最近的操作记录",
      "viewAll": "查看全部"
    },
    "systemOverview": {
      "title": "系统概览",
      "desc": "当前系统运行状态",
      "runningNormal": "运行正常",
      "systemIssue": "系统异常",
      "userStats": "用户统计",
      "blogStats": "博客统计",
      "commentStats": "评论统计",
      "recentActivity": "最近活动",
      "active": "活跃",
      "total": "总计",
      "published": "已发布",
      "likes": "点赞",
      "comments": "评论",
      "newUsers": "新用户",
      "newBlogs": "新博客",
      "refreshStatus": "刷新状态",
      "detailedReport": "详细报告"
    },
    "monthlyStats": {
      "title": "每日统计",
      "desc": "博客和评论每日统计",
      "currentMonth": "当前月份: {month}",
      "blogs": "博客发布",
      "comments": "评论数量"
    },
    "footer": {
      "lastUpdate": "最后更新: {time}",
      "contactSupport": "如有问题请联系技术支持"
    }
  },
  "en": {
    "dashboard": "Admin Dashboard",
    "welcome": "Welcome back, Admin! Today is {date}",
    "dataStatus": {
      "lastUpdate": "Data last updated",
      "autoRefresh": "Auto refresh ({seconds} seconds)",
      "refreshData": "Refresh Data"
    },
    "loading": {
      "chartData": "Loading chart data...",
      "noData": "No data available",
      "retry": "Retry"
    },
    "userStats": {
      "totalUsers": "Total Users",
      "totalBlogs": "Blog Articles",
      "totalComments": "Total Comments",
      "totalLikes": "Total Likes",
      "activeUsers": "Active Users",
      "activeUsersDesc": "Total {total} users",
      "published": "Published",
      "vsLastMonth": "New this month",
      "systemStatus": "System Status",  
      "normal": "Normal", 
      "uptime": "Uptime {uptime}"
    },
    "charts": {
      "userGrowth": "User Growth Trend",
      "userGrowthDailyDesc": "User growth over the past 30 days",
      "userGrowthDesc": "User growth over the past 12 months",
      "blogGrowth": "Blog Growth Trend",
      "blogGrowthDailyDesc": "Blog publishing over the past 30 days",
      "blogGrowthDesc": "Blog publishing over the past 12 months",
      "last7Days": "Last 7 Days",
      "last30Days": "Last 30 Days",
      "totalArticles": "Total {total} articles",
      "unknownDate": "Unknown date",
      "refreshChart": "Refresh chart data"
    },
    "dailyStats": {
      "blogs": "Blogs Published",
      "comments": "Comments"
    },
    "quickActions": {
      "title": "Quick Actions",
      "desc": "Common management functions",
      "userManagement": "User Management",
      "userManagementDesc": "Manage user accounts",
      "blogManagement": "Blog Management",
      "blogManagementDesc": "Edit blog articles",
      "commentReview": "Comment Review",
      "commentReviewDesc": "Review user comments",
      "reportManagement": "Report Management",
      "reportManagementDesc": "Handle user reports"
    },
    "topAuthors": {
      "title": "Top Authors",
      "desc": "Blog Publishing Ranking",
      "blogs": "blogs",
      "views": "views",
      "published": "Published",
      "totalLikes": "Total Likes"
    },
    "recentActivities": {
      "title": "Recent Activities",
      "desc": "Recent system operation records",
      "viewAll": "View All"
    },
    "systemOverview": {
      "title": "System Overview",
      "desc": "Current system operation status",
      "runningNormal": "Running Normal",
      "systemIssue": "System Issue",
      "userStats": "User Statistics",
      "blogStats": "Blog Statistics",
      "commentStats": "Comment Statistics",
      "recentActivity": "Recent Activity",
      "active": "active",
      "total": "total",
      "published": "published",
      "likes": "likes",
      "comments": "comments",
      "newUsers": "new users",
      "newBlogs": "new blogs",
      "refreshStatus": "Refresh Status",
      "detailedReport": "Detailed Report"
    },
    "monthlyStats": {
      "title": "Daily Statistics",
      "desc": "Daily blog and comment statistics",
      "currentMonth": "Current month: {month}",
      "blogs": "Blogs Published",
      "comments": "Comments"
    },
    "footer": {
      "lastUpdate": "Last update: {time}",
      "contactSupport": "Contact technical support if you have any problems"
    }
  },
  "zh-TW": {
    "dashboard": "管理儀表板",
    "welcome": "歡迎回來，管理員！今天是 {date}",
    "dataStatus": {
      "lastUpdate": "數據最後更新",
      "autoRefresh": "自動刷新 ({seconds}秒)",
      "refreshData": "刷新數據"
    },
    "loading": {
      "chartData": "加載圖表數據中...",
      "noData": "暫無數據",
      "retry": "重試"
    },
    "userStats": {
      "totalUsers": "總用戶數",
      "totalBlogs": "博客文章",
      "totalComments": "評論總數",
      "totalLikes": "總點讚數",
      "activeUsers": "活躍用戶",
      "activeUsersDesc": "總計 {total} 用戶",
      "published": "已發布",
      "vsLastMonth": "較上月新增",
       "systemStatus": "系統狀態",      
      "normal": "正常",           
      "uptime": "正常運行時間 {uptime}" 
    },
    "charts": {
      "userGrowth": "用戶增長趨勢",
      "userGrowthDailyDesc": "最近30天用戶增長情況",
      "userGrowthDesc": "近12個月用戶增長情況",
      "blogGrowth": "博客增長趨勢",
      "blogGrowthDailyDesc": "最近30天博客發布情況",
      "blogGrowthDesc": "近12個月博客發布情況",
      "last7Days": "最近7天",
      "last30Days": "最近30天",
      "totalArticles": "總計 {total} 篇",
      "unknownDate": "未知日期",
      "refreshChart": "刷新圖表數據"
    },
    "dailyStats": {
      "blogs": "博客發布",
      "comments": "評論數量"
    },
    "quickActions": {
      "title": "快速操作",
      "desc": "常用管理功能",
      "userManagement": "用戶管理",
      "userManagementDesc": "管理用戶賬戶",
      "blogManagement": "博客管理",
      "blogManagementDesc": "編輯博客文章",
      "commentReview": "評論審核",
      "commentReviewDesc": "審核用戶評論",
      "reportManagement": "舉報管理",
      "reportManagementDesc": "處理用戶舉報"
    },
    "topAuthors": {
      "title": "頂級作者",
      "desc": "博客發布排行榜",
      "blogs": "篇博客",
      "views": "瀏覽",
      "published": "已發布",
      "totalLikes": "總點讚"
    },
    "recentActivities": {
      "title": "最近活動",
      "desc": "系統最近的操作記錄",
      "viewAll": "查看全部"
    },
    "systemOverview": {
      "title": "系統概覽",
      "desc": "當前系統運行狀態",
      "runningNormal": "運行正常",
      "systemIssue": "系統異常",
      "userStats": "用戶統計",
      "blogStats": "博客統計",
      "commentStats": "評論統計",
      "recentActivity": "最近活動",
      "active": "活躍",
      "total": "總計",
      "published": "已發布",
      "likes": "點讚",
      "comments": "評論",
      "newUsers": "新用戶",
      "newBlogs": "新博客",
      "refreshStatus": "刷新狀態",
      "detailedReport": "詳細報告"
    },
    "monthlyStats": {
      "title": "每日統計",
      "desc": "博客和評論每日統計",
      "currentMonth": "當前月份: {month}",
      "blogs": "博客發布",
      "comments": "評論數量"
    },
    "footer": {
      "lastUpdate": "最後更新: {time}",
      "contactSupport": "如有問題請聯繫技術支援"
    }
  }
}
</i18n>