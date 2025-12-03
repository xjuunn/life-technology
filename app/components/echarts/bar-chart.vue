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

import type { EChartsCoreOption } from 'echarts/core';
import { computed } from 'vue';

interface Props {
  width?: string;
  height?: string;
  title?: string;
  theme?: string;
  loading?: boolean;
  autoresize?: boolean;
  xAxisData: string[];
  seriesData: number[];
  seriesName?: string;
  color?: string;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  barWidth?: string;
  borderRadius?: number;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  seriesName: '数据',
  color: '#3b82f6',
  showLegend: true,
  showTooltip: true,
  showGrid: true,
  autoresize: true,
  barWidth: '60%',
  borderRadius: 4,
});

const mergedOptions = computed<EChartsCoreOption>(() => ({
  title: props.title ? {
    text: props.title,
    left: 'center',
    textStyle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
    },
  } : undefined,
  
  tooltip: props.showTooltip ? {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow',
    },
  } : undefined,
  
  legend: props.showLegend ? {
    data: [props.seriesName],
    top: 'bottom',
  } : undefined,
  
  grid: props.showGrid ? {
    left: '3%',
    right: '4%',
    bottom: props.showLegend ? '15%' : '3%',
    top: props.title ? '15%' : '3%',
    containLabel: true,
  } : undefined,
  
  xAxis: {
    type: 'category',
    data: props.xAxisData,
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
    axisLabel: {
      color: '#666',
    },
  },
  
  yAxis: {
    type: 'value',
    axisLine: {
      lineStyle: {
        color: '#ccc',
      },
    },
    axisLabel: {
      color: '#666',
    },
    splitLine: {
      lineStyle: {
        type: 'dashed',
        color: '#eee',
      },
    },
  },
  
  series: [
    {
      name: props.seriesName,
      type: 'bar',
      barWidth: props.barWidth,
      data: props.seriesData,
      itemStyle: {
        color: props.color,
        borderRadius: [props.borderRadius, props.borderRadius, 0, 0],
      },
      label: {
        show: true,
        position: 'top',
        color: '#374151',
      },
    },
  ],
}));
</script>