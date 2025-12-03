import * as echarts from 'echarts/core';
import {
  BarChart,
  LineChart,
  PieChart,
  // 可以按需添加更多图表类型
  ScatterChart,
  RadarChart,
  GaugeChart,
  FunnelChart
} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BrushComponent,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent
} from 'echarts/components';
import {
  CanvasRenderer,

} from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  // 图表类型
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  RadarChart,
  GaugeChart,
  FunnelChart,
  // 组件
  TitleComponent,
  TooltipComponent,
  GridComponent,
  PolarComponent,
  AriaComponent,
  ParallelComponent,
  LegendComponent,
  DataZoomComponent,
  VisualMapComponent,
  TimelineComponent,
  CalendarComponent,
  GraphicComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BrushComponent,
  MarkLineComponent,
  MarkPointComponent,
  MarkAreaComponent,
  
  // 渲染器
  CanvasRenderer,
]);

// 将 ECharts 实例挂载到全局
export default defineNuxtPlugin(() => {
  return {
    provide: {
      echarts
    }
  };
});