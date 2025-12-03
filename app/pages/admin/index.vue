<template>
<div class="admin-dashboard bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen p-6">
    <!-- 页面标题 -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold text-gray-900 bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100">
        管理仪表板
        <span class="block text-lg font-normal text-blue-600 mt-2">欢迎回来，管理员！今天是 {{ currentDate }}</span>
      </h1>
    </div>

    <!-- 统计卡片 -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <DashboardCard  
        title="总用户数"
        :count="stats.totalUsers"
        icon="mingcute:user-2-line"
        :change="12"
        trend="up"
        color="blue"
        class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      />
      <DashboardCard 
        title="博客文章"
        :count="stats.totalBlogs"
        icon="mingcute:file-text-line"
        :change="8"
        trend="up"
        color="green"
        class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      />
      <DashboardCard
        title="评论总数"
        :count="stats.totalComments"
        icon="mingcute:message-1-line"
        :change="15"
        trend="up"
        color="purple"
        class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      />
      <DashboardCard
        title="系统状态"
        status="正常"
        icon="mingcute:check-circle-line"
        uptime="99.9%"
        color="emerald"
        class="transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
      />
    </div>

    <!-- 图表区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- 用户增长趋势 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">用户增长趋势</h2>
            <p class="text-sm text-gray-500 mt-1">近12个月用户增长情况</p>
          </div>
          <div class="flex space-x-2">
            <button @click="setChartRange('month')" :class="['px-3 py-1 rounded-lg text-sm', chartRange === 'month' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100']">
              月度
            </button>
            <button @click="setChartRange('quarter')" :class="['px-3 py-1 rounded-lg text-sm', chartRange === 'quarter' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100']">
              季度
            </button>
          </div>
        </div>
        <div class="h-[300px]">
          <line-chart
            :x-axis-data="userGrowth.xAxis"
            :series-data="userGrowth.seriesData"
            :series-name="'新增用户'"
            :area-style="true"
            color="#3b82f6"
            :show-legend="false"
          />
        </div>
      </div>

      <!-- 内容分布 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">内容类型分布</h2>
            <p class="text-sm text-gray-500 mt-1">各类文章占比统计</p>
          </div>
          <div class="text-sm text-gray-500">
            总计 {{ contentDistribution.total }} 篇
          </div>
        </div>
        <div class="h-[300px]">
          <pie-chart
            :data="contentDistribution.data"
            :donut="true"
            :show-legend="true"
            :center="['50%', '50%']"
          />
        </div>
      </div>
    </div>

    <!-- 快速操作和访问统计 -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <!-- 快速操作 -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-800">快速操作</h2>
            <span class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">常用管理功能</span>
          </div>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ActionButton 
              to="/admin/users"
              icon="mingcute:user-line"
              label="用户管理"
              description="管理用户账户"
              color="blue"
            />
            <ActionButton 
              to="/admin/blogs"
              icon="mingcute:file-text-line"
              label="博客管理"
              description="编辑博客文章"
              color="green"
            />
            <ActionButton
              to="/admin/comments"
              icon="mingcute:message-1-line"
              label="评论审核"
              description="审核用户评论"
              color="purple"
            />
            <ActionButton
              to="/admin/system"
              icon="mingcute:settings-3-line"
              label="系统设置"
              description="系统配置"
              color="orange"
            />
          </div>
        </div>
      </div>

      <!-- 访问统计 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800">访问统计</h2>
          <div class="flex items-center text-sm text-gray-500">
            <Icon name="mingcute:calendar-line" class="mr-2" />
            今日
          </div>
        </div>
        <div class="space-y-4">
          <div class="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                <Icon name="mingcute:eye-line" class="text-blue-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">页面浏览量</p>
                <p class="text-sm text-gray-500">Page Views</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-blue-600">{{ visitorStats.pv }}</p>
              <p class="text-sm text-green-600">+12.5%</p>
            </div>
          </div>
          <div class="flex justify-between items-center p-3 bg-green-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                <Icon name="mingcute:user-line" class="text-green-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">独立访客</p>
                <p class="text-sm text-gray-500">Unique Visitors</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-green-600">{{ visitorStats.uv }}</p>
              <p class="text-sm text-green-600">+8.3%</p>
            </div>
          </div>
          <div class="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
            <div class="flex items-center">
              <div class="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                <Icon name="mingcute:mouse-line" class="text-purple-600" />
              </div>
              <div>
                <p class="font-medium text-gray-900">点击次数</p>
                <p class="text-sm text-gray-500">Total Clicks</p>
              </div>
            </div>
            <div class="text-right">
              <p class="text-2xl font-bold text-purple-600">{{ visitorStats.clicks }}</p>
              <p class="text-sm text-green-600">+15.2%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- 最近活动 -->
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">最近活动</h2>
            <p class="text-sm text-gray-500 mt-1">系统最近的操作记录</p>
          </div>
          <button class="px-4 py-2 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors duration-200 border border-blue-100 flex items-center">
            <Icon name="mingcute:list-check-line" class="mr-2" />
            查看全部
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
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">系统概览</h2>
            <p class="text-sm text-gray-500 mt-1">当前系统运行状态</p>
          </div>
          <div class="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg font-medium border border-emerald-100 flex items-center">
            <Icon name="mingcute:check-circle-line" class="mr-1" />
            运行正常
          </div>
        </div>
        <div class="space-y-6">
          <SystemInfo
            label="服务器状态"
            :value="systemInfo.serverStatus"
            :healthy="true"
            icon="mingcute:server-line"
            usage="45"
          />
          <SystemInfo
            label="数据库连接"
            :value="systemInfo.databaseStatus"
            :healthy="true"
            icon="mingcute:database-line"
            usage="32"
          />
          <SystemInfo
            label="存储空间"
            :value="systemInfo.storage"
            :details="{ used: '85 GB', total: '100 GB' }"
            icon="mingcute:hard-drive-line"
            usage="85"
          />
          <SystemInfo
            label="内存使用"
            :value="systemInfo.memory"
            :details="{ used: '7.2 GB', total: '10 GB' }"
            icon="mingcute:chip-line"
            usage="72"
          />
        </div>
        <div class="mt-8 pt-6 border-t border-gray-100">
          <div class="flex space-x-3">
            <button class="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center">
              <Icon name="mingcute:refresh-2-line" class="mr-2" />
              刷新状态
            </button>
            <button class="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center">
              <Icon name="mingcute:chart-line" class="mr-2" />
              详细报告
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 月度发布统计 -->
    <div class="mt-8">
      <div class="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h2 class="text-xl font-bold text-gray-800">月度发布统计</h2>
            <p class="text-sm text-gray-500 mt-1">各分类月度文章发布数量</p>
          </div>
          <div class="text-sm text-gray-500">
            当前月份: {{ currentMonth }}
          </div>
        </div>
        <div class="h-[350px]">
          <chart-base
            :options="monthlyStats.options"
            height="100%"
          />
        </div>
      </div>
    </div>

    <!-- 添加底部装饰 -->
    <div class="mt-10 pt-6 border-t border-gray-200">
      <p class="text-center text-gray-400 text-sm">
        最后更新: {{ currentTime }} | 如有问题请联系技术支持
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
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

interface SystemInfo {
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
    { name: '技术文章', value: 45, color: '#3b82f6' },
    { name: '生活分享', value: 25, color: '#10b981' },
    { name: '产品介绍', value: 15, color: '#8b5cf6' },
    { name: '行业资讯', value: 10, color: '#f59e0b' },
    { name: '其他', value: 5, color: '#6b7280' }
  ],
  total: 100
});

// 最近活动
const recentActivities = ref<Activity[]>([
  { id: 1, user: '张三', action: '发布了新博客', target: 'Vue3入门指南', time: '10分钟前', type: 'blog' },
  { id: 2, user: '李四', action: '评论了', target: 'TypeScript最佳实践', time: '25分钟前', type: 'comment' },
  { id: 3, user: '王五', action: '注册了新账户', target: '', time: '1小时前', type: 'user' },
  { id: 4, user: '赵六', action: '更新了个人资料', target: '', time: '2小时前', type: 'user' },
]);

// 系统信息
const systemInfo = ref<SystemInfo>({
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
      data: ['技术文章', '生活分享', '产品介绍', '行业资讯', '其他'],
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
        name: '技术文章',
        type: 'bar',
        stack: '总量',
        data: [12, 15, 18, 10, 14, 20, 22, 18, 16, 25, 28, 30],
        itemStyle: {
          color: '#3b82f6'
        }
      },
      {
        name: '生活分享',
        type: 'bar',
        stack: '总量',
        data: [8, 6, 10, 12, 8, 15, 14, 12, 10, 18, 16, 20],
        itemStyle: {
          color: '#10b981'
        }
      },
      {
        name: '产品介绍',
        type: 'bar',
        stack: '总量',
        data: [5, 4, 6, 8, 6, 10, 9, 8, 7, 12, 10, 14],
        itemStyle: {
          color: '#8b5cf6'
        }
      },
      {
        name: '行业资讯',
        type: 'bar',
        stack: '总量',
        data: [3, 2, 4, 5, 4, 6, 7, 5, 4, 8, 6, 9],
        itemStyle: {
          color: '#f59e0b'
        }
      },
      {
        name: '其他',
        type: 'bar',
        stack: '总量',
        data: [1, 2, 1, 3, 2, 4, 3, 2, 1, 5, 4, 6],
        itemStyle: {
          color: '#6b7280'
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
    radial-gradient(circle at 10% 20%, rgba(59, 130, 246, 0.05) 0%, transparent 20%),
    radial-gradient(circle at 90% 80%, rgba(139, 92, 246, 0.05) 0%, transparent 20%);
}

/* 自定义滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a1a1a1;
}
</style>