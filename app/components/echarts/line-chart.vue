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
import * as echarts from 'echarts/core';
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
  areaStyle?: boolean;
  smooth?: boolean;
  showLegend?: boolean;
  showTooltip?: boolean;
  showGrid?: boolean;
  yAxisName?: string;
  xAxisName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  seriesName: '数据',
  color: '#3b82f6',
  areaStyle: false,
  smooth: true,
  showLegend: true,
  showTooltip: true,
  showGrid: true,
  autoresize: true,
});

const mergedOptions = computed<EChartsCoreOption>(() => {
  const baseOptions: EChartsCoreOption = {
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
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
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
      boundaryGap: false,
      data: props.xAxisData,
      name: props.xAxisName,
      nameTextStyle: {
        fontSize: 12,
        color: '#666',
      },
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
      name: props.yAxisName,
      nameTextStyle: {
        fontSize: 12,
        color: '#666',
      },
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
        type: 'line',
        smooth: props.smooth,
        data: props.seriesData,
        itemStyle: {
          color: props.color,
        },
        areaStyle: props.areaStyle
          ? {
              color: new (echarts as any).graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: props.color + '40',
                },
                {
                  offset: 1,
                  color: props.color + '10',
                },
              ]),
            }
          : undefined,
        symbol: 'circle',
        symbolSize: 8,
        lineStyle: {
          width: 3,
        },
      },
    ],
  };

  return baseOptions;
});
</script>