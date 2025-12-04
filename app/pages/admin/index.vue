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

      <!-- 内容分布 -->
      <div class="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-base-content">{{ t('charts.contentDistribution') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('charts.contentDistributionDesc') }}</p>
          </div>
          <div class="text-sm text-base-content/70">
            {{ t('charts.totalArticles', { total: contentDistribution.total }) }}
          </div>
        </div>
        <div class="h-[300px]">
          <PieChart
            :data="contentDistribution.data"
            :donut="true"
            :show-legend="true"
            :center="['50%', '40%']"
          />
        </div>
      </div>
    </div>

    <!-- 快速操作和访问统计 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 快速操作 -->
      <div class="lg:col-span-2">
        <div class="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-base-content">{{ t('quickActions.title') }}</h2>
            <span class="text-sm text-base-content/70 bg-base-200 px-3 py-1 rounded-lg">{{ t('quickActions.desc') }}</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
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
              to="/admin/system"
              icon="mingcute:settings-3-line"
              :label="t('quickActions.systemSettings')"
              :description="t('quickActions.systemSettingsDesc')"
              color="warning"
            />
          </div>
        </div>
      </div>

      <!-- 访问统计 -->
      <div class="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-base-content">{{ t('visitorStats.title') }}</h2>
          <div class="flex items-center text-sm text-base-content/70">
            <Icon name="mingcute:calendar-line" class="mr-2" />
            {{ t('visitorStats.today') }}
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-primary/10 rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <Icon name="mingcute:eye-line" class="text-primary" />
              </div>
              <div>
                <p class="font-medium text-base-content">{{ t('visitorStats.pageViews') }}</p>
                <p class="text-sm text-base-content/70">{{ t('visitorStats.pageViewsEn') }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-primary">{{ visitorStats.pv }}</p>
              <p class="text-sm text-success">+12.5%</p>
            </div>
          </div>
          <div class="flex justify-between items-center p-3 bg-secondary/10 rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center mr-3">
                <Icon name="mingcute:user-line" class="text-secondary" />
              </div>
              <div>
                <p class="font-medium text-base-content">{{ t('visitorStats.uniqueVisitors') }}</p>
                <p class="text-sm text-base-content/70">{{ t('visitorStats.uniqueVisitorsEn') }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-secondary">{{ visitorStats.uv }}</p>
              <p class="text-sm text-success">+8.3%</p>
            </div>
          </div>
          <div class="flex justify-between items-center p-3 bg-accent/10 rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center mr-3">
                <Icon name="mingcute:mouse-line" class="text-accent" />
              </div>
              <div>
                <p class="font-medium text-base-content">{{ t('visitorStats.clicks') }}</p>
                <p class="text-sm text-base-content/70">{{ t('visitorStats.clicksEn') }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-accent">{{ visitorStats.clicks }}</p>
              <p class="text-sm text-success">+15.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 最近活动 -->
      <div class="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-base-content">{{ t('recentActivities.title') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('recentActivities.desc') }}</p>
          </div>
          <button class="px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 rounded-lg font-medium transition-colors duration-200 border border-primary/20 flex items-center">
            <Icon name="mingcute:list-check-line" class="mr-2" />
            {{ t('recentActivities.viewAll') }}
          </button>
        </div>
        <div class="space-y-4">
          <ActivityItem  
            v-for="activity in recentActivities"
            :key="activity.id"
            :activity="activity"
          />
        </div>
      </div>

      <!-- 系统概览 -->
      <div class="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-base-content">{{ t('systemOverview.title') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('systemOverview.desc') }}</p>
          </div>
          <div class="px-3 py-1 bg-success/10 text-success rounded-lg font-medium border border-success/20 flex items-center">
            <Icon name="mingcute:check-circle-line" class="mr-1" />
            {{ t('systemOverview.runningNormal') }}
          </div>
        </div>
        <div class="space-y-6">
          <SystemInfo
            :label="$t('systemOverview.serverStatus')"
            :value="systemInfo.serverStatus"
            :healthy="true"
            icon="mingcute:server-line"
            :usage="45"
          />
          <SystemInfo
            :label="$t('systemOverview.databaseStatus')"
            :value="systemInfo.databaseStatus"
            :healthy="true"
            icon="mingcute:database-line"
            :usage="32"
          />
          <SystemInfo
            :label="$t('systemOverview.storage')"
            :value="systemInfo.storage"
            :details="{ used: '85 GB', total: '100 GB' }"
            icon="mingcute:hard-drive-line"
            :usage="85"
          />
          <SystemInfo
            :label="$t('systemOverview.memory')"
            :value="systemInfo.memory"
            :details="{ used: '7.2 GB', total: '10 GB' }"
            icon="mingcute:chip-line"
            :usage="72"
          />
        </div>
        <div class="mt-8 pt-6 border-t border-base-300">
          <div class="flex space-x-3">
            <button class="flex-1 px-4 py-2 bg-base-200 text-base-content rounded-lg hover:bg-base-300 transition-colors flex items-center justify-center">
              <Icon name="mingcute:refresh-2-line" class="mr-2" />
              {{ $t('systemOverview.refreshStatus') }}
            </button>
            <button class="flex-1 px-4 py-2 bg-primary text-primary-content rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center">
              <Icon name="mingcute:chart-line" class="mr-2" />
              {{ $t('systemOverview.detailedReport') }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 月度发布统计 -->
    <div class="mt-8">
      <div class="bg-base-100 rounded-2xl shadow-lg p-6 border border-base-300">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-base-content">{{ t('monthlyStats.title') }}</h2>
            <p class="text-sm text-base-content/70 mt-1">{{ t('monthlyStats.desc') }}</p>
          </div>
          <div class="text-sm text-base-content/70">
            {{ t('monthlyStats.currentMonth', { month: currentMonth }) }}
          </div>
        </div>
        <div class="h-[350px]">
          <ChartBase
            :options="monthlyStats.options"
            height="100%"
          />
        </div>
      </div>
    </div>

    <!-- 添加底部装饰 -->
    <div class="mt-10 pt-6 border-t border-base-300">
      <p class="text-center text-base-content/50 text-sm">
        {{ t('footer.lastUpdate', { time: currentTime }) }} | {{ t('footer.contactSupport') }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardCard from '~/components/admin/DashboardCard.vue'
import LineChart from '~/components/echarts/line-chart.vue'
import ActionButton from '~/components/admin/ActionButton.vue'
import PieChart from '~/components/echarts/pie-chart.vue'
import ActivityItem from '~/components/admin/ActivityItem.vue'
import SystemInfo from '~/components/admin/SystemInfo.vue'
import ChartBase from '~/components/echarts/chart-base.vue'

import type { EChartsCoreOption } from 'echarts/core';

// 导入类型定义
interface DashboardStats {
  totalUsers: number;
  totalBlogs: number;
  totalComments: number;
}

interface Activity {
  id: number;
  user: string;
  action: string;
  target: string;
  time: string;
  type: 'user' | 'blog' | 'comment';
}

interface SystemInfoType {
  serverStatus: string;
  databaseStatus: string;
  storage: string;
  memory: string;
}

interface VisitorStats {
  pv: number;
  uv: number;
  clicks: number;
}

// 使用Nuxt 3的useI18n
const { t } = useI18n();

// 统计数据
const stats = ref<DashboardStats>({
  totalUsers: 1542,
  totalBlogs: 328,
  totalComments: 4289
});

// 用户增长数据
const userGrowth = ref({
  xAxis: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  seriesData: [120, 132, 101, 134, 90, 230, 210, 182, 191, 234, 290, 330]
});

// 内容分布数据
const contentDistribution = ref({
  data: [
    { name: t('contentTypes.technical'), value: 45, color: '#3b82f6' }, 
    { name: t('contentTypes.life'), value: 25, color: '#10b981' },
    { name: t('contentTypes.product'), value: 15, color: '#8b5cf6' }, 
    { name: t('contentTypes.industry'), value: 10, color: '#f59e0b' }, 
    { name: t('contentTypes.other'), value: 5, color: '#ef4444' }
  ],
  total: 100
});

// 最近活动
const recentActivities = ref<Activity[]>([
  { id: 1, user: '张三', action: t('actions.newBlog'), target: 'Vue3入门指南', time: '10分钟前', type: 'blog' },
  { id: 2, user: '李四', action: t('actions.commented'), target: 'TypeScript最佳实践', time: '25分钟前', type: 'comment' },
  { id: 3, user: '王五', action: t('actions.registered'), target: '', time: '1小时前', type: 'user' },
  { id: 4, user: '赵六', action: t('actions.updatedProfile'), target: '', time: '2小时前', type: 'user' },
]);

// 系统信息
const systemInfo = ref<SystemInfoType>({
  serverStatus: '运行中',
  databaseStatus: '已连接',
  storage: '85 GB / 100 GB',
  memory: '7.2 GB / 10 GB'
});

// 访问统计
const visitorStats = ref<VisitorStats>({
  pv: 12458,
  uv: 3421,
  clicks: 54879
});

const lineChartAreaColor = computed(() => {
  return {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [
      { offset: 0, color: '#3b82f680' }, 
      { offset: 1, color: '#3b82f620' }
    ]
  };
});

// 月度统计图表配置
const monthlyStats = ref({
  options: {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: [
        t('contentTypes.technical'),
        t('contentTypes.life'), 
        t('contentTypes.product'),
        t('contentTypes.industry'),
        t('contentTypes.other')
      ],
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
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
        name: t('contentTypes.technical'),
        type: 'bar',
        stack: '总量',
        data: [12, 15, 18, 10, 14, 20, 22, 18, 16, 25, 28, 30],
        itemStyle: {
          color: '#3b82f6' // 蓝色
        },
        emphasis: {
          itemStyle: {
            color: '#2563eb' // 更深的蓝色
          }
        }
      },
      {
        name: t('contentTypes.life'),
        type: 'bar',
        stack: '总量',
        data: [8, 6, 10, 12, 8, 15, 14, 12, 10, 18, 16, 20],
        itemStyle: {
          color: '#10b981' // 绿色
        },
        emphasis: {
          itemStyle: {
            color: '#059669' // 更深的绿色
          }
        }
      },
      {
        name: t('contentTypes.product'),
        type: 'bar',
        stack: '总量',
        data: [5, 4, 6, 8, 6, 10, 9, 8, 7, 12, 10, 14],
        itemStyle: {
          color: '#8b5cf6' // 紫色
        },
        emphasis: {
          itemStyle: {
            color: '#7c3aed' // 更深的紫色
          }
        }
      },
      {
        name: t('contentTypes.industry'),
        type: 'bar',
        stack: '总量',
        data: [3, 2, 4, 5, 4, 6, 7, 5, 4, 8, 6, 9],
        itemStyle: {
          color: '#f59e0b' // 橙色
        },
        emphasis: {
          itemStyle: {
            color: '#d97706' // 更深的橙色
          }
        }
      },
      {
        name: t('contentTypes.other'),
        type: 'bar',
        stack: '总量',
        data: [1, 2, 1, 3, 2, 4, 3, 2, 1, 5, 4, 6],
        itemStyle: {
          color: '#ef4444' // 红色
        },
        emphasis: {
          itemStyle: {
            color: '#dc2626' // 更深的红色
          }
        }
      }
    ]
  } as EChartsCoreOption
});

// 图表时间范围
const chartRange = ref('month');

// 设置图表时间范围
const setChartRange = (range: string) => {
  chartRange.value = range;
  // 这里可以添加根据时间范围更新数据的逻辑
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

// 当前时间（带时分秒）
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
  const months = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'];
  return months[now.getMonth()];
});

// 定义页面元信息
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
      "systemStatus": "系统状态",
      "normal": "正常",
      "uptime": "在线率: {uptime}",
      "vsLastMonth": "较上月"
    },
    "charts": {
      "userGrowth": "用户增长趋势",
      "userGrowthDesc": "近12个月用户增长情况",
      "monthly": "月度",
      "quarterly": "季度",
      "contentDistribution": "内容类型分布",
      "contentDistributionDesc": "各类文章占比统计",
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
      "systemSettings": "系统设置",
      "systemSettingsDesc": "系统配置"
    },
    "visitorStats": {
      "title": "访问统计",
      "today": "今日",
      "pageViews": "页面浏览量",
      "pageViewsEn": "Page Views",
      "uniqueVisitors": "独立访客",
      "uniqueVisitorsEn": "Unique Visitors",
      "clicks": "点击次数",
      "clicksEn": "Total Clicks"
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
      "serverStatus": "服务器状态",
      "databaseStatus": "数据库连接",
      "storage": "存储空间",
      "memory": "内存使用",
      "refreshStatus": "刷新状态",
      "detailedReport": "详细报告"
    },
    "monthlyStats": {
      "title": "月度发布统计",
      "desc": "各分类月度文章发布数量",
      "currentMonth": "当前月份: {month}"
    },
    "contentTypes": {
      "technical": "技术文章",
      "life": "生活分享",
      "product": "产品介绍",
      "industry": "行业资讯",
      "other": "其他"
    },
    "footer": {
      "lastUpdate": "最后更新: {time}",
      "contactSupport": "如有问题请联系技术支持"
    },
    "actions": {
      "newBlog": "发布了新博客",
      "commented": "评论了",
      "registered": "注册了新账户",
      "updatedProfile": "更新了个人资料"
    }
  },
  "en": {
    "dashboard": "Admin Dashboard",
    "welcome": "Welcome back, Admin! Today is {date}",
    "userStats": {
      "totalUsers": "Total Users",
      "totalBlogs": "Blog Articles",
      "totalComments": "Total Comments",
      "systemStatus": "System Status",
      "normal": "Normal",
      "uptime": "Uptime: {uptime}",
      "vsLastMonth": "vs last month"
    },
    "charts": {
      "userGrowth": "User Growth Trend",
      "userGrowthDesc": "User growth over the past 12 months",
      "monthly": "Monthly",
      "quarterly": "Quarterly",
      "contentDistribution": "Content Type Distribution",
      "contentDistributionDesc": "Distribution of article types",
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
      "systemSettings": "System Settings",
      "systemSettingsDesc": "System configuration"
    },
    "visitorStats": {
      "title": "Visitor Statistics",
      "today": "Today",
      "pageViews": "Page Views",
      "pageViewsEn": "Page Views",
      "uniqueVisitors": "Unique Visitors",
      "uniqueVisitorsEn": "Unique Visitors",
      "clicks": "Total Clicks",
      "clicksEn": "Total Clicks"
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
      "serverStatus": "Server Status",
      "databaseStatus": "Database Connection",
      "storage": "Storage Space",
      "memory": "Memory Usage",
      "refreshStatus": "Refresh Status",
      "detailedReport": "Detailed Report"
    },
    "monthlyStats": {
      "title": "Monthly Publishing Statistics",
      "desc": "Monthly article publishing count by category",
      "currentMonth": "Current month: {month}"
    },
    "contentTypes": {
      "technical": "Technical Articles",
      "life": "Life Sharing",
      "product": "Product Introduction",
      "industry": "Industry News",
      "other": "Other"
    },
    "footer": {
      "lastUpdate": "Last update: {time}",
      "contactSupport": "Contact technical support if you have any problems"
    },
    "actions": {
      "newBlog": "published a new blog",
      "commented": "commented on",
      "registered": "registered a new account",
      "updatedProfile": "updated profile"
    }
  },
  "zh-TW": {
    "dashboard": "管理儀表板",
    "welcome": "歡迎回來，管理員！今天是 {date}",
    "userStats": {
      "totalUsers": "總用戶數",
      "totalBlogs": "博客文章",
      "totalComments": "評論總數",
      "systemStatus": "系統狀態",
      "normal": "正常",
      "uptime": "上線率: {uptime}",
      "vsLastMonth": "較上月"
    },
    "charts": {
      "userGrowth": "用戶增長趨勢",
      "userGrowthDesc": "近12個月用戶增長情況",
      "monthly": "月度",
      "quarterly": "季度",
      "contentDistribution": "內容類型分佈",
      "contentDistributionDesc": "各類文章佔比統計",
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
      "systemSettings": "系統設定",
      "systemSettingsDesc": "系統配置"
    },
    "visitorStats": {
      "title": "訪問統計",
      "today": "今日",
      "pageViews": "頁面瀏覽量",
      "pageViewsEn": "Page Views",
      "uniqueVisitors": "獨立訪客",
      "uniqueVisitorsEn": "Unique Visitors",
      "clicks": "點擊次數",
      "clicksEn": "Total Clicks"
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
      "serverStatus": "伺服器狀態",
      "databaseStatus": "數據庫連接",
      "storage": "存儲空間",
      "memory": "記憶體使用",
      "refreshStatus": "刷新狀態",
      "detailedReport": "詳細報告"
    },
    "monthlyStats": {
      "title": "月度發佈統計",
      "desc": "各分類月度文章發佈數量",
      "currentMonth": "當前月份: {month}"
    },
    "contentTypes": {
      "technical": "技術文章",
      "life": "生活分享",
      "product": "產品介紹",
      "industry": "行業資訊",
      "other": "其他"
    },
    "footer": {
      "lastUpdate": "最後更新: {time}",
      "contactSupport": "如有問題請聯繫技術支援"
    },
    "actions": {
      "newBlog": "發佈了新博客",
      "commented": "評論了",
      "registered": "註冊了新賬戶",
      "updatedProfile": "更新了個人資料"
    }
  }
}
</i18n>