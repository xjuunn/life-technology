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
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- 标题区域 -->
    <div class="hero bg-base-200 min-h-[50vh] floating-grid-bg">
      <div class="hero-content text-center">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
            {{ t('nav.howToUseLife') }}
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">LIFE</span>
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
          <li v-for="(step, index) in steps" :key="step.id">
            <div class="timeline-middle">
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold">
                {{ step.id }}
              </div>
            </div>
            
            <div :class="index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10'">
              <div class="text-lg font-bold text-primary">{{ step.title }}</div>
              <div class="text-base-content/80">{{ step.description }}</div>
            </div>
            
            <hr v-if="index < steps.length - 1" class="bg-base-content/10" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
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