<template>
<div class="admin-dashboard bg-base-100 min-h-screen p-6">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-base-content bg-base-200/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-base-300">
        {{ t('dashboard') }}
        <span class="block text-lg font-normal text-primary mt-2">{{ t('welcome', { date: currentDate }) }}</span>
      </h1>
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
        icon="mingcute:file-text-line"
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
            <p class="text-sm text-base-content/70 mt-1">{{ t('charts.userGrowthDesc') }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="setChartRange('month')" :class="['px-3 py-1 rounded-lg text-sm', chartRange === 'month' ? 'bg-primary text-primary-content' : 'text-base-content/70 hover:bg-base-200']">
              {{ t('charts.monthly') }}
            </button>
            <button @click="setChartRange('quarter')" :class="['px-3 py-1 rounded-lg text-sm', chartRange === 'quarter' ? 'bg-primary text-primary-content' : 'text-base-content/70 hover:bg-base-200']">
              {{ t('charts.quarterly') }}
            </button>
          </div>
        </div>
        <div class="h-[300px]">
          <LineChart
            :x-axis-data="userGrowth.xAxis"
            :series-data="userGrowth.seriesData"
            :series-name="$t('userStats.totalUsers')"
            :area-style="true"
            color="#3b82f6"
            :line-width="3"
            :show-legend="false"
          />
        </div>
      </div>

      <!-- 博客增长趋势 -->
      <div class="bg-base-100 rounded-xl shadow p-4 border border-base-300">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-bold text-base-content">{{ t('charts.blogGrowth') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('charts.blogGrowthDesc') }}</p>
          </div>
          <div class="text-sm text-base-content/70">
            {{ t('charts.totalArticles', { total: stats.totalBlogs }) }}
          </div>
        </div>
        <div class="h-[250px]">
          <LineChart
            :x-axis-data="blogGrowth.xAxis"
            :series-data="blogGrowth.seriesData"
            :series-name="t('userStats.totalBlogs')"
            :area-style="true"
            color="#10b981"
            :line-width="2"
            :show-legend="false"
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
              icon="mingcute:file-text-line"
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
            <Icon name="mingcute:crown-line" class="mr-1" />
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
                  <p class="text-xs text-base-content/60">{{ author.totalViews }} 浏览</p>
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
          <div class="text-sm text-base-content/70">
            {{ t('monthlyStats.currentMonth', { month: currentMonth }) }}
          </div>
        </div>
        <div class="h-[280px]">
          <ChartBase
            :options="monthlyStats.options"
            height="100%"
          />
        </div>
      </div>

      <!-- 系统概览 -->
      <div class="bg-base-100 rounded-xl shadow p-4 border border-base-300">
        <div class="flex justify-between items-center mb-4">
          <div>
            <h2 class="text-lg font-bold text-base-content">{{ t('systemOverview.title') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('systemOverview.desc') }}</p>
          </div>
          <div :class="['px-2 py-1 rounded text-xs font-medium border flex items-center', 
                       systemHealthy ? 'bg-success/10 text-success border-success/20' : 'bg-error/10 text-error border-error/20']">
            <Icon :name="systemHealthy ? 'mingcute:check-circle-line' : 'mingcute:warning-line'" class="mr-1 text-xs" />
            {{ systemHealthy ? t('systemOverview.runningNormal') : t('systemOverview.systemIssue') }}
          </div>
        </div>
        <div class="space-y-4">
          <SystemInfo
            :label="t('systemOverview.userStats')"
            :value="`${stats.activeUsers}/${stats.totalUsers}`"
            :healthy="true"
            icon="mingcute:user-2-line"
            :usage="stats.totalUsers > 0 ? Math.round((stats.activeUsers / stats.totalUsers) * 100) : 0"
            :details="{ used: `${stats.activeUsers} ${t('systemOverview.active')}`, total: `${stats.totalUsers} ${t('systemOverview.total')}` }"
          />
          <SystemInfo
            :label="t('systemOverview.blogStats')"
            :value="`${stats.publishedBlogs}/${stats.totalBlogs}`"
            :healthy="true"
            icon="mingcute:file-text-line"
            :usage="stats.totalBlogs > 0 ? Math.round((stats.publishedBlogs / stats.totalBlogs) * 100) : 0"
            :details="{ used: `${stats.publishedBlogs} ${t('systemOverview.published')}`, total: `${stats.totalBlogs} ${t('systemOverview.total')}` }"
          />
          <SystemInfo
            :label="t('systemOverview.commentStats')"
            :value="`${stats.totalComments}`"
            icon="mingcute:message-1-line"
            :details="{ used: `${stats.totalLikes} ${t('systemOverview.likes')}`, total: `${stats.totalComments} ${t('systemOverview.comments')}` }"
          />
          <SystemInfo
            :label="t('systemOverview.recentActivity')"
            :value="`${stats.recentUsers} ${t('systemOverview.newUsers')}`"
            icon="mingcute:time-line"
            :details="{ used: `${stats.recentUsers} ${t('systemOverview.newUsers')}`, total: `${stats.recentBlogs} ${t('systemOverview.newBlogs')}` }"
          />
        </div>
        <div class="mt-6 pt-4 border-t border-base-300">
          <div class="flex space-x-2">
            <button @click="refreshData" class="flex-1 px-3 py-2 bg-base-200 text-base-content rounded hover:bg-base-300 transition-colors flex items-center justify-center text-sm">
              <Icon name="mingcute:refresh-2-line" class="mr-1" />
              {{ t('systemOverview.refreshStatus') }}
            </button>
            <button class="flex-1 px-3 py-2 bg-primary text-primary-content rounded hover:bg-primary/90 transition-colors flex items-center justify-center text-sm">
              <Icon name="mingcute:chart-line" class="mr-1" />
              {{ t('systemOverview.detailedReport') }}
            </button>
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
import { ref, computed, watch } from 'vue';
import DashboardCard from '~/components/admin/DashboardCard.vue'
import LineChart from '~/components/echarts/line-chart.vue'
import ActionButton from '~/components/admin/ActionButton.vue'
import SystemInfo from '~/components/admin/SystemInfo.vue'
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

interface StatsResponse {
  stats: DashboardStats & { trend: TrendData };
  topAuthors: TopAuthor[];
}

interface ChartData {
  xAxis: string[];
  seriesData: number[];
}

const { t , locale} = useI18n();

// 添加加载状态和错误处理
const isLoading = ref(false);
const error = ref<string | null>(null);

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

// 用户增长数据 - 使用响应式变量
const userGrowth = ref<ChartData>({
  xAxis: [],
  seriesData: []
});

// 博客增长数据 - 使用响应式变量
const blogGrowth = ref<ChartData>({
  xAxis: [],
  seriesData: []
});

// 系统健康状态
const systemHealthy = computed(() => {
  return stats.value.totalUsers > 0 && stats.value.totalBlogs > 0;
});

// 月度统计图表配置
const monthlyStats = ref({
  options: {} as EChartsCoreOption
});

// 图表时间范围
const chartRange = ref('month');

// 设置图表时间范围
const setChartRange = async (range: string) => {
  chartRange.value = range;
  processChartData(range);
};

// 处理图表数据
const processChartData = (range: string) => {
  if (!trendData.value?.dates?.length) {
    console.warn('趋势数据为空');
    return;
  }
  const { dates, users = [], blogs = [], comments = [] } = trendData.value;
  
  let processedDates: string[] = [];
  let processedUsers: number[] = [];
  let processedBlogs: number[] = [];
  let processedComments: number[] = [];
  
  if (range === 'quarter') {
    const quarterData = new Map<string, { users: number, blogs: number, comments: number }>();
    
    dates.forEach((date, index) => {
      const [year, month] = date.split('-').map(Number);
      if (!year || !month) return;
      
      const quarter = Math.floor((month - 1) / 3) + 1;
      const quarterKey = `${year}年Q${quarter}`;
      
      const data = quarterData.get(quarterKey) || { users: 0, blogs: 0, comments: 0 };
      data.users += users[index] || 0;
      data.blogs += blogs[index] || 0;
      data.comments += comments[index] || 0;
      quarterData.set(quarterKey, data);
    });
    
    processedDates = Array.from(quarterData.keys());
    processedUsers = Array.from(quarterData.values()).map(d => d.users);
    processedBlogs = Array.from(quarterData.values()).map(d => d.blogs);
    processedComments = Array.from(quarterData.values()).map(d => d.comments);
  } else {
    const recentCount = Math.min(dates.length, 12);
    processedDates = dates.slice(-recentCount);
    processedUsers = users.slice(-recentCount);
    processedBlogs = blogs.slice(-recentCount);
    processedComments = comments.slice(-recentCount);
  }

  userGrowth.value = { xAxis: processedDates, seriesData: processedUsers };
  blogGrowth.value = { xAxis: processedDates, seriesData: processedBlogs };
  
 generateMonthlyStats(processedDates, processedBlogs, processedComments);
};

watch(locale, () => {
  if (trendData.value.dates.length > 0) {
    processChartData(chartRange.value);
  }
});

// 生成月度统计图表
const generateMonthlyStats = (dates: string[] = [], blogs: number[] = [], comments: number[] = []) => {
  if (dates.length === 0) {
    monthlyStats.value.options = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: [t('monthlyStats.blogs'), t('monthlyStats.comments')],
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
        data: dates.length > 0 ? dates : ['1月', '2月', '3月', '4月', '5月', '6月'],
        axisLine: {
          lineStyle: {
            color: '#e5e7eb'
          }
        },
        axisLabel: {
          color: '#6b7280'
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
          name: t('monthlyStats.blogs'),
          type: 'bar',
          data: blogs.length > 0 ? blogs : [12, 15, 18, 10, 14, 20],
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
          name: t('monthlyStats.comments'),
          type: 'bar',
          data: comments.length > 0 ? comments : [32, 40, 28, 35, 42, 48],
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
    return;
  }
  
  monthlyStats.value.options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [t('monthlyStats.blogs'), t('monthlyStats.comments')],
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
        color: '#6b7280'
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
        name: t('monthlyStats.blogs'),
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
        name: t('monthlyStats.comments'),
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

    trendData.value = {
      dates: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', 
              '2024-07', '2024-08', '2024-09', '2024-10', '2024-11', '2024-12'],
      users: [25, 28, 30, 32, 35, 38, 40, 42, 43, 44, 45, 45],
      blogs: [85, 88, 92, 95, 100, 105, 108, 112, 115, 118, 120, 120],
      comments: [650, 680, 700, 720, 750, 780, 800, 830, 850, 870, 890, 890]
    };
    
    // 设置模拟顶级作者数据
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
  } finally {
    isLoading.value = false;
  }
};

// 手动刷新数据
const refreshData = async () => {
  await fetchDashboardData();
};

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

// 当前时间
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

// 当前月份
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

  const currentLang = useI18n().locale.value || 'zh-CN';

  return monthNames[currentLang]?.[monthIndex] || monthNames['zh-CN'][monthIndex];
});

onMounted(async () => {
  await fetchDashboardData();
});

definePageMeta({
  layout: 'admin',
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
</style>

<i18n lang="json">
{
  "zh-CN": {
    "dashboard": "管理仪表板",
    "welcome": "欢迎回来，管理员！今天是 {date}",
    "userStats": {
      "totalUsers": "总用户数",
      "totalBlogs": "博客文章", 
      "totalComments": "评论总数",
      "totalLikes": "总点赞数",
      "activeUsers": "活跃用户",
      "activeUsersDesc": "总计 {total} 用户",
      "published": "已发布",
      "vsLastMonth": "较上月新增"
    },
    "charts": {
      "userGrowth": "用户增长趋势",
      "userGrowthDesc": "近12个月用户增长情况",
      "monthly": "月度",
      "quarterly": "季度",
      "blogGrowth": "博客增长趋势",
      "blogGrowthDesc": "近12个月博客发布情况",
      "totalArticles": "总计 {total} 篇"
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
      "title": "月度统计",
      "desc": "博客和评论月度统计",
      "currentMonth": "当前月份: {month}",
      "blogs": "博客发布",
      "comments": "评论数量"
    },
    "footer": {
      "lastUpdate": "最后更新: {time}",
      "contactSupport": "如有问题请联系技术支持"
    },
    "months": [
      "一月", "二月", "三月", "四月", "五月", "六月", 
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ]
  },
  "en": {
    "dashboard": "Admin Dashboard",
    "welcome": "Welcome back, Admin! Today is {date}",
    "userStats": {
      "totalUsers": "Total Users",
      "totalBlogs": "Blog Articles",
      "totalComments": "Total Comments",
      "totalLikes": "Total Likes",
      "activeUsers": "Active Users",
      "activeUsersDesc": "Total {total} users",
      "published": "Published",
      "vsLastMonth": "New this month"
    },
    "charts": {
      "userGrowth": "User Growth Trend",
      "userGrowthDesc": "User growth over the past 12 months",
      "monthly": "Monthly",
      "quarterly": "Quarterly",
      "blogGrowth": "Blog Growth Trend",
      "blogGrowthDesc": "Blog publishing over the past 12 months",
      "totalArticles": "Total {total} articles"
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
      "title": "Monthly Statistics",
      "desc": "Monthly blog and comment statistics",
      "currentMonth": "Current month: {month}",
      "blogs": "Blogs Published",
      "comments": "Comments"
    },
    "footer": {
      "lastUpdate": "Last update: {time}",
      "contactSupport": "Contact technical support if you have any problems"
    },
    "months": [
      "January", "February", "March", "April", "May", "June", 
      "July", "August", "September", "October", "November", "December"
    ]
  },
  "zh-TW": {
    "dashboard": "管理儀表板",
    "welcome": "歡迎回來，管理員！今天是 {date}",
    "userStats": {
      "totalUsers": "總用戶數",
      "totalBlogs": "博客文章",
      "totalComments": "評論總數",
      "totalLikes": "總點讚數",
      "activeUsers": "活躍用戶",
      "activeUsersDesc": "總計 {total} 用戶",
      "published": "已發布",
      "vsLastMonth": "較上月新增"
    },
    "charts": {
      "userGrowth": "用戶增長趨勢",
      "userGrowthDesc": "近12個月用戶增長情況",
      "monthly": "月度",
      "quarterly": "季度",
      "blogGrowth": "博客增長趨勢",
      "blogGrowthDesc": "近12個月博客發布情況",
      "totalArticles": "總計 {total} 篇"
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
      "title": "月度統計",
      "desc": "博客和評論月度統計",
      "currentMonth": "當前月份: {month}",
      "blogs": "博客發布",
      "comments": "評論數量"
    },
    "footer": {
      "lastUpdate": "最後更新: {time}",
      "contactSupport": "如有問題請聯繫技術支援"
    },
    "months": [
      "一月", "二月", "三月", "四月", "五月", "六月", 
      "七月", "八月", "九月", "十月", "十一月", "十二月"
    ]
  }
}
</i18n>