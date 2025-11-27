<script setup lang="ts">
const { t } = useAppI18n()

// 定义步骤类型接口（类型安全）
interface UseLifeStep {
  id: number;
  title: string;
  description: string;
}

// 步骤数据改为计算属性，以便响应语言变化
const steps = computed<UseLifeStep[]>(() => [
  {
    id: 1,
    title: t('about_page.benefits.list.mobile.title'),
    description: t('about_page.benefits.list.mobile.desc')
  },
  {
    id: 2,
    title: t('about_page.benefits.list.security.title'),
    description: t('about_page.benefits.list.security.desc')
  },
  {
    id: 3,
    title: t('about_page.benefits.list.control.title'),
    description: t('about_page.benefits.list.control.desc')
  },
  {
    id: 4,
    title: t('about_page.benefits.list.global.title'),
    description: t('about_page.benefits.list.global.desc')
  },
  {
    id: 5,
    title: t('about_page.benefits.list.ecosystem.title'),
    description: t('about_page.benefits.list.ecosystem.desc')
  },
  {
    id: 6,
    title: t('about_page.benefits.list.identity.title'),
    description: t('about_page.benefits.list.identity.desc')
  }
]);
// 添加状态管理
const stepStates = ref(steps.value.map(() => ({ 
  visible: true,
  animating: false 
})))

// 切换步骤可见性的函数
const toggleStepVisibility = (index: number) => {
  const target = stepStates.value[index]
  if (!target) return // 增加检查防止 undefined 访问
  target.animating = true
  setTimeout(() => {
    target.visible = !target.visible
    target.animating = false
  }, 150)
}

// 添加滚动相关的响应式数据
const observer = ref<IntersectionObserver | null>(null)
const timelineItems = ref<HTMLElement[]>([])

// 设置 Intersection Observer
onMounted(() => {
  observer.value = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const index = parseInt(entry.target.getAttribute('data-index') || '0')
      if (entry.isIntersecting) {
        // 元素进入视口时显示
        showStepWithAnimation(index)
      } else {
        // 元素离开视口时隐藏
        hideStepWithAnimation(index)
      }
    })
  }, {
    threshold: 0.1, // 10%可见时触发
    rootMargin: '0px 0px -50px 0px' // 提前50px触发
  })

  // 观察所有时间线项目
  timelineItems.value.forEach(item => {
    if (item) observer.value?.observe(item)
  })
})

// 清理资源
onBeforeUnmount(() => {
  if (observer.value) {
    timelineItems.value.forEach(item => {
      if (item) observer.value?.unobserve(item)
    })
    observer.value.disconnect()
  }
})

// 显示步骤的动画函数
const showStepWithAnimation = (index: number) => {
  const target = stepStates.value[index]
  if (!target) return
  
  target.animating = true
  // 500ms 动画时间
  setTimeout(() => {
    target.visible = true
    target.animating = false
  }, 500)
}

// 隐藏步骤的动画函数
const hideStepWithAnimation = (index: number) => {
  const target = stepStates.value[index]
  if (!target) return
  
  target.animating = true
  // 500ms 动画时间
  setTimeout(() => {
    target.visible = false
    target.animating = false
  }, 500)
}

// 更新模板引用
const setTimelineItemRef = (el: HTMLElement | null, index: number) => {
  if (el) {
    timelineItems.value[index] = el
  }
}
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- 标题区域 -->
    <div class="hero bg-base-200 min-h-[50vh] floating-grid-bg">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{t('nav.howToUseLife')}}</span>
          </h1>
          <p class="py-6 text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto">
            {{ t('about_page.benefits.subtitle') }}
          </p>
          <button class="btn btn-primary btn-lg rounded-full shadow-lg hover:scale-105 transition-transform">
            {{ t('hero.btn_start') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 步骤时间线 -->
    <div class="py-16 px-4">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ t('about_page.benefits.title') }}</h2>
          <p class="text-base-content/70 max-w-2xl mx-auto">
            {{ t('about_page.benefits.subtitle') }}
          </p>
        </div>
        
         <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
    <li 
      v-for="(step, index) in steps" 
      :key="step.id"
      :ref="(el) => setTimelineItemRef(el as HTMLElement, index)"
      :data-index="index"
    >
      <div class="timeline-middle cursor-pointer" @click="toggleStepVisibility(index)">
        <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold transition-transform duration-200 hover:scale-110">
          {{ step.id }}
        </div>
      </div>
      
      <div 
        :class="[
          index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10',
          'prose transition-all duration-500 ease-in-out transform',
           'border border-base-300 rounded-lg shadow-md p-6', // 新增边框和阴影样式
          {
            'opacity-0 scale-90': !stepStates[index]?.visible || stepStates[index]?.animating,
            'opacity-100 scale-100': stepStates[index]?.visible && !stepStates[index]?.animating
          }
        ]"
      >
        <div class="text-lg font-bold text-primary">{{ step.title }}</div>
        <div class="w-60 text-base-content/300">{{ step.description }}</div>
      </div>
      
      <hr v-if="index < steps.length - 1" class="bg-base-content/10" />
    </li>
  </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.timeline-middle {
  cursor: pointer;
}

.timeline-middle .rounded-full {
  transition: transform 0.2s ease;
}

.timeline-middle:hover .rounded-full {
  transform: scale(1.1);
}

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms; /* 更改为300ms */
}
/* 浮动网格背景样式 */
.floating-grid-bg {
  position: relative;
  overflow: hidden;
}

.floating-grid-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
  animation: floatGrid 20s ease-in-out infinite;
  z-index: 0;
}

/* 深色模式下的网格背景 */
[data-theme="dark"] .floating-grid-bg::before {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
}

@keyframes floatGrid {
  0% {
    transform: translate(0, 0);
    background-size: 30px 30px;
  }
  50% {
    transform: translate(15px, 15px);
    background-size: 35px 35px;
  }
  100% {
    transform: translate(0, 0);
    background-size: 30px 30px;
  }
}

.hero-content {
  position: relative;
  z-index: 1;
}
</style>