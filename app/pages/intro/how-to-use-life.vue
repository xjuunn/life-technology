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

// 图标映射
const stepIcons = [
  'mingcute:user-4-fill',     // 替换 user-4-fill，更适合移动端特性
  'mingcute:shield-fill',         // 替换 check-fill，更适合安全特性
  'mingcute:dashboard-fill',      // 替换 building-4-fill，更适合控制特性
  'mingcute:earth-fill',          // 替换 global-line，更适合全球化特性
  'mingcute:components-fill',     // 替换 puzzle-fill，更适合生态系统特性
  'mingcute:profile-fill'         // 替换 user-setting-fill，更适合身份特性
]

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
  <div class="min-h-screen bg-linear-to-br from-base-200/50 to-primary/5 relative">
    <title>life-如何使用life</title>
    <!-- 背景装饰图案 -->
    <div class="absolute inset-0 z-0">
      <div class="pattern-grid-lg opacity-10 w-full h-full"></div>
    </div>
    <!-- 标题区域 -->
    <div class="hero min-h-[50vh] relative">
      <div class="hero-content text-center z-10">
        <div class="max-w-2xl">
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{
              t('nav.howToUseLife') }}</span>
          </h1>
          <p class="py-6 text-lg md:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            {{ t('about_page.benefits.subtitle') }}
          </p>
          <button class="btn btn-primary btn-lg rounded-full shadow-lg hover:scale-105 transition-all duration-300">
            {{ t('hero.btn_start') }}
          </button>
        </div>
      </div>
    </div>

    <!-- 步骤时间线 -->
    <div class="py-16 px-4 relative z-10">
      <div class="max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ t('about_page.benefits.title') }}</h2>
          <p class="text-base-content/70 max-w-2xl mx-auto leading-relaxed">
            {{ t('about_page.benefits.subtitle') }}
          </p>
        </div>

        <ul class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical">
          <li v-for="(step, index) in steps" :key="step.id" :ref="(el) => setTimelineItemRef(el as HTMLElement, index)"
            :data-index="index">
            <div class="timeline-middle cursor-pointer" @click="toggleStepVisibility(index)">
              <div
                class="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-content font-bold transition-all duration-300 hover:scale-110">
                {{ step.id }}
              </div>
            </div>

            <div :class="[
              index % 2 === 0 ? 'timeline-start mb-10 md:text-end' : 'timeline-end mb-10',
              'prose transition-all duration-500 ease-in-out transform',
              'bg-linear-to-br from-primary/5 to-secondary/5 backdrop-blur-sm border border-primary/10 rounded-xl shadow-md p-6 hover:shadow-lg', // 新增背景和悬停效果
              {
                'opacity-0 scale-90': !stepStates[index]?.visible || stepStates[index]?.animating,
                'opacity-100 scale-100': stepStates[index]?.visible && !stepStates[index]?.animating
              }
            ]">
              <div class="flex items-start gap-3 mb-3">

                <Icon :name="stepIcons[index] ?? 'mingcute:question-fill'" class="text-primary shrink-0 mt-0.5"
                  style="width: 1.8rem; height: 1.8rem;" />
                <div class="text-xl font-bold text-primary">{{ step.title }}</div>
              </div>
              <div class="text-base-content/80 leading-relaxed">{{ step.description }}</div>
            </div>

            <hr v-if="index < steps.length - 1"
              class="bg-linear-to-b from-primary/30 to-secondary/30 h-1 rounded-full border-0" />
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
  transition-duration: 300ms;
}

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
  background: radial-gradient(circle at center, var(--fallback-p, oklch(var(--p)/0.1)) 0%, transparent 70%);
}

.hero-content {
  position: relative;
  z-index: 1;
}
</style>

<i18n lang="json">{
  "zh-CN": {
    "nav": {
      "howToUseLife": "如何使用 LIFE"
    },
    "hero": {
      "btn_start": "立即开始"
    },
    "about_page": {
      "benefits": {
        "title": "LIFE 能为您做什么？",
        "subtitle": "无论您是区块链新手还是资深极客，这里都有您需要的功能。",
        "list": {
          "mobile": {
            "title": "随时随地管理资产",
            "desc": "无需依赖第三方，无论何时何地，通过手机或电脑即可自由转账、收款、参与链上活动。"
          },
          "security": {
            "title": "极致安全与隐私",
            "desc": "端到端加密、零知识证明。您的私钥和数据永远只保存在您的设备本地，LIFE 不存储任何敏感信息。"
          },
          "control": {
            "title": "数据自主可控",
            "desc": "自主授权或撤销第三方访问权限，支持链上足迹清理，真正实现数据主权。"
          },
          "global": {
            "title": "全球低成本支付",
            "desc": "极低手续费、极快速度完成跨境交易。无国界限制，无需银行等待。"
          },
          "ecosystem": {
            "title": "Web3 应用生态",
            "desc": "内置 DApp 浏览器，安全访问 DeFi、NFT、GameFi 等创新应用，探索无限可能。"
          },
          "identity": {
            "title": "匿名与身份保护",
            "desc": "无需绑定手机或实名。支持选择性披露身份，最大程度保护您的个人隐私。"
          }
        }
      }
    }
  },
  "zh-TW": {
    "nav": {
      "howToUseLife": "如何使用 LIFE"
    },
    "hero": {
      "btn_start": "立即開始"
    },
    "about_page": {
      "benefits": {
        "title": "LIFE 能為您做什麼？",
        "subtitle": "無論您是區塊鏈新手還是資深極客，這裡都有您需要的功能。",
        "list": {
          "mobile": {
            "title": "隨時隨地管理資產",
            "desc": "無需依賴第三方，無論何時何地，通過手機或電腦即可自由轉賬、收款、參與鏈上活動。"
          },
          "security": {
            "title": "極致安全與隱私",
            "desc": "端到端加密、零知識證明。您的私鑰和數據永遠只保存在您的設備本地，LIFE 不存儲任何敏感信息。"
          },
          "control": {
            "title": "數據自主可控",
            "desc": "自主授權或撤銷第三方訪問權限，支持鏈上足跡清理，真正實現數據主權。"
          },
          "global": {
            "title": "全球低成本支付",
            "desc": "極低手續費、極快速度完成跨境交易。無國界限制，無需銀行等待。"
          },
          "ecosystem": {
            "title": "Web3 應用生態",
            "desc": "內置 DApp 瀏覽器，安全訪問 DeFi、NFT、GameFi 等創新應用，探索無限可能。"
          },
          "identity": {
            "title": "匿名與身份保護",
            "desc": "無需綁定手機或實名。支持選擇性披露身份，最大程度保護您的個人隱私。"
          }
        }
      }
    }
  },
  "en": {
    "nav": {
      "howToUseLife": "How to Use LIFE"
    },
    "hero": {
      "btn_start": "Get Started Now"
    },
    "about_page": {
      "benefits": {
        "title": "What can LIFE do for you?",
        "subtitle": "Whether you are a blockchain novice or a seasoned geek, we have the features you need.",
        "list": {
          "mobile": {
            "title": "Manage Assets Anywhere",
            "desc": "No reliance on third parties. Transfer, receive, and participate in on-chain activities freely via mobile or PC anytime, anywhere."
          },
          "security": {
            "title": "Ultimate Security & Privacy",
            "desc": "End-to-end encryption, Zero-Knowledge Proofs. Your private keys and data are forever stored only locally on your device; LIFE stores no sensitive information."
          },
          "control": {
            "title": "Data Controllability",
            "desc": "Autonomously authorize or revoke third-party access, support on-chain footprint cleaning, and truly realize data sovereignty."
          },
          "global": {
            "title": "Global Low-Cost Payments",
            "desc": "Complete cross-border transactions with extremely low fees and high speed. No border restrictions, no bank waiting times."
          },
          "ecosystem": {
            "title": "Web3 App Ecosystem",
            "desc": "Built-in DApp browser to safely access innovative applications like DeFi, NFT, GameFi, and explore infinite possibilities."
          },
          "identity": {
            "title": "Anonymity & ID Protection",
            "desc": "No mobile binding or real-name verification required. Supports selective identity disclosure to maximize your personal privacy protection."
          }
        }
      }
    }
  }
}</i18n>