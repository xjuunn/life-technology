<script setup lang="ts">
const { t } = useAppI18n()

// 定义步骤类型接口（类型安全）
interface UseLifeStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

// 步骤数据改为计算属性，这样会响应语言变化
const steps = computed<UseLifeStep[]>(() => [
  {
    id: 1,
    title: t('about_page.safety.list.assets.title'),
    description: t('about_page.safety.list.assets.line1') + " " + t('about_page.safety.list.assets.line2') + " " + t('about_page.safety.list.assets.line3'),
    icon: "mingcute:wallet-fill"
  },
  {
    id: 2,
    title: t('about_page.safety.list.scam.title'),
    description: t('about_page.safety.list.scam.line1') + " " + t('about_page.safety.list.scam.line2') + " " + t('about_page.safety.list.scam.line3'),
    icon: "mingcute:shield-fill"
  },
  {
    id: 3,
    title: t('about_page.safety.list.tx.title'),
    description: t('about_page.safety.list.tx.line1') + " " + t('about_page.safety.list.tx.line2') + " " + t('about_page.safety.list.tx.line3'),
    icon: "mingcute:money-cny-circle-fill"
  },
  {
    id: 4,
    title: t('about_page.safety.list.compliance.title'),
    description: t('about_page.safety.list.compliance.line1') + " " + t('about_page.safety.list.compliance.line2') + " " + t('about_page.safety.list.compliance.line3'),
    icon: "mingcute:police-badge-fill"
  },
  {
    id: 5,
    title: t('about_page.safety.list.support.title'),
    description: t('about_page.safety.list.support.line1') + " " + t('about_page.safety.list.support.line2') + " " + t('about_page.safety.list.support.line3'),
    icon: "mingcute:customer-service-fill"
  },
  {
    id: 6,
    title: t('about_page.definition.small_card_eco.title'),
    description: t('about_page.definition.small_card_eco.desc'),
    icon: "mingcute:earth-fill"
  }
]);

// 添加滚动到列表区域的功能，考虑导航栏高度
const scrollToContent = () => {
  const element = document.getElementById('content-section');
  if (element) {
    const navbarHeight = 80; // 导航栏高度估计值（包括padding等）
    const targetPosition = element.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};
</script>

<template>
  <div class="min-h-screen bg-linear-to-br from-base-200/50 to-primary/5 relative">
    <!-- 背景装饰图案 -->
    <div class="absolute inset-0 z-0">
      <div class="pattern-grid-lg opacity-10 w-full h-full"></div>
    </div>
    
    <!-- 标题区域 -->
    <div class="hero min-h-[50vh] relative">
      <div class="hero-content text-center z-10">
        <div class="max-w-2xl">
          <div class="badge badge-primary mb-4">{{ t('about_page.safety.title') }}</div>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">
              {{ t('about_page.safety.subtitle') }}
            </span>
          </h1>
          
          <p class="py-6 text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            {{ t('about_page.safety.subtitle') }}
          </p>
          
          <div class="mt-8">
            <button class="btn btn-primary btn-lg rounded-full shadow-lg hover:scale-105 transition-all duration-300" @click="scrollToContent">
              {{ t('hero.btn_start') }}
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 列表区域 -->
    <div id="content-section" class="max-w-6xl mx-auto p-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="step in steps" 
          :key="step.id"
          class="card bg-linear-to-br from-primary/5 to-secondary/5 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-primary/10 rounded-xl overflow-hidden group"
        >
          <div class="card-body">
            <div class="flex items-start space-x-4">
              <div class="text-2xl p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary/20 transition-all duration-300">
                <Icon :name="step.icon" class="w-6 h-6" />
              </div>
              <div>
                <h2 class="card-title text-xl font-bold text-primary">{{ step.id }}. {{ step.title }}</h2>
                <p class="mt-3 text-base-content/80 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* 浮动网格背景样式 */
.pattern-grid-lg {
  background-image: 
    linear-gradient(currentColor 1px, transparent 1px),
    linear-gradient(90deg, currentColor 1px, transparent 1px);
  background-size: 30px 30px;
  animation: floatGrid 20s linear infinite;
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

/* 深色模式下的网格背景 */
[data-theme="dark"] .pattern-grid-lg {
  background-image: 
    linear-gradient(rgba(255, 255, 255, 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.5) 1px, transparent 1px);
}

.hero {
  background: radial-gradient(circle at center, var(--fallback-p,oklch(var(--p)/0.1)) 0%, transparent 70%);
}

.hero-content {
  position: relative;
  z-index: 1;
}

.card {
  transition: all 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
}
</style>