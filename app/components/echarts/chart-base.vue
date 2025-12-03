<template>
  <div 
    ref="chartRef" 
    class="echarts-container"
    :style="{ width: width, height: height }"
  ></div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  BarChart,
  LineChart,
  PieChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  CanvasRenderer
]);

interface Props {
  width?: string;
  height?: string;
  options: any;
  theme?: string | object;
  initOptions?: object;
  loading?: boolean;
  loadingOptions?: object;
  autoresize?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '400px',
  theme: 'light',
  autoresize: true,
});

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: any = null;

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return;
  
  // 如果已经存在实例，先销毁
  if (chartInstance) {
    chartInstance.dispose();
  }
  
  // 创建新的图表实例
  chartInstance = echarts.init(
    chartRef.value,
    props.theme,
    props.initOptions
  );
  
  // 设置配置项
  chartInstance.setOption(props.options, true);
  
  if (props.loading && chartInstance) {
    chartInstance.showLoading(props.loadingOptions);
  } else if (chartInstance) {
    chartInstance.hideLoading();
  }
};

// 更新图表
const updateChart = () => {
  if (!chartInstance || !props.options) return;
  
  chartInstance.setOption(props.options, true);
  
  if (props.loading) {
    chartInstance.showLoading(props.loadingOptions);
  } else {
    chartInstance.hideLoading();
  }
};

// 监听窗口大小变化
const resizeChart = () => {
  if (chartInstance) {
    chartInstance.resize();
  }
};

let resizeObserver: ResizeObserver | null = null;

onMounted(() => {
  nextTick(() => {
    initChart();
    
    // 监听容器大小变化
    if (chartRef.value && props.autoresize) {
      resizeObserver = new ResizeObserver(() => {
        resizeChart();
      });
      resizeObserver.observe(chartRef.value);
    }
    
    // 监听窗口大小变化
    if (props.autoresize) {
      window.addEventListener('resize', resizeChart);
    }
  });
});

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose();
  }
  
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
  
  if (props.autoresize) {
    window.removeEventListener('resize', resizeChart);
  }
});

// 监听 options 变化
watch(() => props.options, updateChart, { deep: true });

// 监听 loading 状态变化
watch(() => props.loading, (newVal) => {
  if (!chartInstance) return;
  
  if (newVal) {
    chartInstance.showLoading(props.loadingOptions);
  } else {
    chartInstance.hideLoading();
  }
});

defineExpose({
  getInstance: () => chartInstance,
  resize: resizeChart,
  dispose: () => {
    if (chartInstance) {
      chartInstance.dispose();
      chartInstance = null;
    }
  }
});
</script>

<style scoped>
.echarts-container {
  position: relative;
  min-height: 200px;
}
</style>