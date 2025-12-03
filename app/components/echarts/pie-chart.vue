<template>
  <chart-base
    :width="width"
    :height="height"
    :options="mergedOptions"
    :theme="theme"
    :loading="loading"
    :autoresize="autoresize"
  />
</template>

<script setup lang="ts">
import { ref, computed, nextTick, watch, onMounted, onUnmounted } from 'vue'; // 添加这行
import ChartBase from './chart-base.vue'; // 导入 ChartBase 组件
import type { EChartsCoreOption } from 'echarts/core';

interface PieData {
  name: string;
  value: number;
  color?: string;
}

interface Props {
  width?: string;
  height?: string;
  title?: string;
  theme?: string;
  loading?: boolean;
  autoresize?: boolean;
  data: PieData[];
  colors?: string[];
  showLegend?: boolean;
  showTooltip?: boolean;
  radius?: string | string[];
  donut?: boolean;
  center?: string[];
  showLabel?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  theme: 'light',
  showLegend: true,
  showTooltip: true,
  radius: '70%',
  donut: false,
  center: () => ['50%', '50%'],
  showLabel: true,
  autoresize: true,
  colors: () => ['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899']
});

defineOptions({
  name: 'PieChart'
});

const mergedOptions = computed<EChartsCoreOption>(() => ({
  title: props.title ? {
    text: props.title,
    left: 'center',
    textStyle: {
      fontSize: 14,
      fontWeight: '600',
      color: '#374151',
    },
    padding: [10, 0]
  } : undefined,
  
  tooltip: props.showTooltip ? {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  } : undefined,
  
  legend: props.showLegend ? {
    type: 'scroll',
    orient: 'vertical',
    right: 10,
    top: 'middle',
    textStyle: {
      color: '#6b7280',
      fontSize: 12
    },
    pageTextStyle: {
      color: '#6b7280'
    }
  } : undefined,
  
  series: [{
    name: '数据分布',
    type: 'pie',
    radius: props.donut ? ['40%', '70%'] : props.radius,
    center: props.center,
    avoidLabelOverlap: true,
    itemStyle: {
      borderRadius: 4,
      borderColor: '#fff',
      borderWidth: 2
    },
    label: props.showLabel ? {
      show: true,
      position: 'outside',
      formatter: '{b}: {d}%',
      color: '#374151',
      fontSize: 12
    } : {
      show: false
    },
    labelLine: {
      show: props.showLabel
    },
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      },
      label: {
        show: true,
        fontWeight: 'bold'
      }
    },
    data: props.data.map((item, index) => ({
      ...item,
      itemStyle: {
        color: item.color || props.colors![index % props.colors!.length]
      }
    }))
  }]
}));
</script>