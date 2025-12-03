<template>
  <div ref="chartRef" :style="{ width: width, height: height }"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import * as echarts from 'echarts'

interface Props {
  xAxisData: string[]
  seriesData: number[]
  seriesName?: string
  areaStyle?: boolean
  color?: string
  showLegend?: boolean
  width?: string
  height?: string
}

const props = withDefaults(defineProps<Props>(), {
  seriesName: '数据',
  areaStyle: false,
  color: '#3b82f6',
  showLegend: true,
  width: '100%',
  height: '300px'
})

const chartRef = ref<HTMLElement | null>(null)
let chartInstance: echarts.ECharts | null = null

onMounted(() => {
  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value)
    renderChart()
  }
})

const renderChart = () => {
  if (!chartInstance) return
  
  const option: any = {
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.xAxisData,
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
    series: [{
      name: props.seriesName,
      type: 'line',
      data: props.seriesData,
      smooth: true,
      lineStyle: {
        color: props.color,
        width: 3
      },
      itemStyle: {
        color: props.color
      },
      areaStyle: props.areaStyle ? {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: props.color + '40' },
          { offset: 1, color: props.color + '05' }
        ])
      } : undefined
    }],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderColor: '#e5e7eb',
      textStyle: {
        color: '#374151'
      }
    }
  }
  
  if (props.showLegend) {
    option.legend = {
      data: [props.seriesName],
      bottom: 0,
      textStyle: {
        color: '#6b7280'
      }
    }
  }
  
  chartInstance.setOption(option)
}
</script>