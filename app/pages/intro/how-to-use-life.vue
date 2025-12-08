<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const { t } = useAppI18n()

interface UseLifeStep {
  id: number;
  title: string;
  description: string;
}

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
  }
]);

const stepIcons = [
  'mingcute:finger-press-line',
  'mingcute:shield-shape-line',
  'mingcute:settings-6-line',
  'mingcute:earth-2-line',
  'mingcute:plugin-2-line'
]

const mainContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context;

const scrollToTimeline = () => {
  gsap.to(window, {
    duration: 1.2,
    scrollTo: { y: '.timeline-wrapper', offsetY: 80 },
    ease: 'power3.inOut'
  });
};

onMounted(() => {
  if (mainContainer.value) {
    ctx = gsap.context(() => {
      const heroTl = gsap.timeline();

      heroTl.fromTo('.hero-content-anim',
        { autoAlpha: 0, y: 30, filter: 'blur(10px)' },
        { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'power3.out' }
      );

      heroTl.fromTo('.hero-visual-anim',
        { autoAlpha: 0, scale: 0.9, rotation: 5 },
        { autoAlpha: 1, scale: 1, rotation: 0, duration: 1.2, ease: 'back.out(1.2)' },
        "-=0.8"
      );

      heroTl.fromTo('.stat-card',
        { autoAlpha: 0, y: 20 },
        { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out' },
        "-=0.5"
      );

      gsap.to('.hero-float-icon', {
        y: -15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.5,
          from: "random"
        }
      });

      gsap.fromTo('.timeline-line',
        { scaleY: 0, transformOrigin: 'top' },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: '.timeline-wrapper',
            start: 'top 60%',
            end: 'bottom 80%',
            scrub: 1
          }
        }
      );

      const timelineItems = gsap.utils.toArray('.timeline-item');
      timelineItems.forEach((item: any, i) => {
        const card = item.querySelector('.timeline-card');
        const isLeft = i % 2 === 0;

        gsap.fromTo(item,
          { autoAlpha: 0, y: 50 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        gsap.to(card, {
          scale: 1.02,
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          borderColor: 'oklch(var(--p))',
          duration: 0.5,
          scrollTrigger: {
            trigger: item,
            start: 'top 60%',
            end: 'bottom 60%',
            toggleActions: 'play reverse play reverse'
          }
        });
      });

    }, mainContainer.value);
  }
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<template>
  <div ref="mainContainer"
    class="min-h-screen bg-base-100 text-base-content font-sans relative overflow-x-hidden selection:bg-primary selection:text-primary-content">
    <title>life-如何使用life</title>
    <div class="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        class="absolute -right-[20%] -top-[20%] w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px] animate-pulse">
      </div>
      <div class="absolute -left-[20%] top-[30%] w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px]"></div>
    </div>

    <div class="relative pt-28 pb-16 lg:pt-40 lg:pb-24 px-6 overflow-hidden">
      <div class="container mx-auto max-w-7xl">
        <div class="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          <div class="w-full lg:w-1/2 text-center lg:text-left z-10">
            <div
              class="hero-content-anim inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base-200 border border-base-content/10 mb-8">
              <span class="relative flex h-2.5 w-2.5">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              <span class="text-xs font-bold uppercase tracking-widest text-base-content/60">Web3 Digital Assets</span>
            </div>

            <h1 class="hero-content-anim text-5xl md:text-7xl font-black tracking-tighter leading-[1.1] mb-8">
              {{ t('nav.howToUseLife') }}<br>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                {{ t('hero.highlight') }}
              </span>
            </h1>

            <p class="hero-content-anim text-xl text-base-content/60 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              {{ t('about_page.benefits.subtitle') }}
            </p>

            <div class="hero-content-anim flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button @click="scrollToTimeline"
                class="btn btn-primary btn-lg rounded-full px-8 shadow-lg shadow-primary/20 hover:scale-105 transition-transform group">
                {{ t('hero.btn_start') }}
                <Icon name="heroicons:arrow-down" class="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </button>
              <nuxt-link to="/apps"
                class="btn btn-ghost btn-lg rounded-full border border-base-content/10 hover:bg-base-content/5">
                {{ t('hero.btn_apps') }}
              </nuxt-link>
            </div>

            <div class="hero-content-anim mt-16 grid grid-cols-3 gap-6 pt-8 border-t border-base-content/5">
              <div class="stat-card">
                <div class="text-3xl font-black text-base-content">100%</div>
                <div class="text-xs font-bold text-base-content/40 uppercase mt-1">{{ t('stats.custody') }}</div>
              </div>
              <div class="stat-card">
                <div class="text-3xl font-black text-base-content">0</div>
                <div class="text-xs font-bold text-base-content/40 uppercase mt-1">{{ t('stats.cost') }}</div>
              </div>
              <div class="stat-card">
                <div class="text-3xl font-black text-base-content">24/7</div>
                <div class="text-xs font-bold text-base-content/40 uppercase mt-1">{{ t('stats.support') }}</div>
              </div>
            </div>
          </div>

          <div class="w-full lg:w-1/2 relative hero-visual-anim">
            <div class="relative w-full aspect-square max-w-[600px] mx-auto">
              <div class="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-full blur-[100px]">
              </div>

              <div
                class="relative z-10 w-full h-full bg-base-100/30 backdrop-blur-md rounded-[3rem] border border-base-content/5 shadow-2xl p-8 flex flex-col items-center justify-center gap-8">
                <div class="absolute top-10 left-10 hero-float-icon">
                  <div
                    class="w-16 h-16 bg-base-100 rounded-2xl shadow-lg flex items-center justify-center text-primary border border-base-content/5">
                    <Icon name="mingcute:wallet-3-line" class="w-8 h-8" />
                  </div>
                </div>
                <div class="absolute bottom-20 right-10 hero-float-icon" style="animation-delay: -1s;">
                  <div
                    class="w-14 h-14 bg-base-100 rounded-2xl shadow-lg flex items-center justify-center text-secondary border border-base-content/5">
                    <Icon name="mingcute:shield-line" class="w-7 h-7" />
                  </div>
                </div>
                <div class="absolute top-1/2 right-0 hero-float-icon" style="animation-delay: -0.5s;">
                  <div
                    class="w-12 h-12 bg-base-100 rounded-2xl shadow-lg flex items-center justify-center text-accent border border-base-content/5">
                    <Icon name="mingcute:globe-line" class="w-6 h-6" />
                  </div>
                </div>

                <div
                  class="w-48 h-48 hidden from-primary to-secondary rounded-4xl sm:flex items-center justify-center text-primary-content rotate-3 hover:rotate-0 hover:scale-125 transition-transform duration-500">
                  <img class="w-full" src="/favicon.png" />
                </div>
                <div class="text-center">
                  <h3 class="text-2xl font-bold mb-2">{{ t('hero.card_title') }}</h3>
                  <p class="text-base-content/60">{{ t('hero.card_desc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="relative py-32 px-4 z-10 timeline-wrapper bg-base-100">
      <div class="container mx-auto max-w-5xl relative">
        <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-base-content/5 -translate-x-1/2 hidden md:block">
        </div>
        <div
          class="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-transparent -translate-x-1/2 timeline-line origin-top hidden md:block">
        </div>

        <div class="space-y-24 relative">
          <div v-for="(step, index) in steps" :key="step.id"
            class="timeline-item flex flex-col md:flex-row items-center gap-12 relative"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">

            <div
              class="hidden md:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-base-100 border-4 border-base-content/10 z-20 items-center justify-center shadow-sm">
              <div class="w-2.5 h-2.5 rounded-full bg-primary"></div>
            </div>

            <div class="w-full md:w-1/2 flex" :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'">
              <div
                class="timeline-card group relative w-full max-w-lg bg-base-200 rounded-3xl p-8 border border-base-content/5 transition-all duration-300">
                <div class="flex items-start justify-between mb-6">
                  <div
                    class="w-14 h-14 rounded-2xl bg-base-100 flex items-center justify-center text-primary shadow-sm group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-content transition-all duration-300">
                    <Icon :name="stepIcons[index] ?? 'mingcute:question-fill'" class="w-7 h-7" />
                  </div>
                  <span class="text-5xl font-black text-base-content/5 font-mono select-none">
                    0{{ step.id }}
                  </span>
                </div>

                <h3 class="text-2xl font-bold mb-3">{{ step.title }}</h3>
                <p class="text-base-content/60 leading-relaxed">{{ step.description }}</p>
              </div>
            </div>

            <div
              class="w-full md:w-1/2 hidden md:block px-12 text-base-content/30 text-sm font-bold tracking-widest uppercase"
              :class="index % 2 === 0 ? 'text-left' : 'text-right'">
              Step {{ step.id }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<i18n lang="json">{
  "zh-CN": {
    "nav": {
      "howToUseLife": "如何使用 LIFE"
    },
    "hero": {
      "btn_start": "立即开始",
      "btn_apps": "生态应用",
      "highlight": "触手可及的未来",
      "card_title": "掌控您的数字生活",
      "card_desc": "安全、私密、自由"
    },
    "stats": {
      "custody": "自主掌握",
      "cost": "隐形成本",
      "support": "全天候响应"
    },
    "about_page": {
      "benefits": {
        "title": "LIFE 能为您做什么？",
        "subtitle": "LIFE 资产为您提供专业级的数据主权保护与多链资产管理。安全、隐私、一站式，即刻开启您的数字之旅。",
        "list": {
          "mobile": {
            "title": "移动端资产管理",
            "desc": "打破时空限制，通过手机轻松管理您的多链权益与数字收藏品，随时随地掌握资产动态。"
          },
          "security": {
            "title": "企业级安全防护",
            "desc": "采用非对称加密技术，私钥离线存储于您的设备。我们无法访问您的任何敏感数据。"
          },
          "control": {
            "title": "数据完全自主",
            "desc": "您的数据属于您自己。自主决定授权或撤销第三方应用访问，彻底告别数据被滥用。"
          },
          "global": {
            "title": "全球数字权益流转",
            "desc": "基于区块链网络，实现点对点的权益互换与流转，高效、透明，无国界限制。"
          },
          "ecosystem": {
            "title": "一站式 Web3 入口",
            "desc": "无缝连接海量 DApp，探索去中心化社交、游戏与金融应用，体验丰富的生态交互。"
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
      "btn_start": "立即開始",
      "btn_apps": "生態應用",
      "highlight": "觸手可及的未來",
      "card_title": "掌控您的數字生活",
      "card_desc": "安全、私密、自由"
    },
    "stats": {
      "custody": "自主掌握",
      "cost": "隱形成本",
      "support": "全天候響應"
    },
    "about_page": {
      "benefits": {
        "title": "LIFE 能為您做什麼？",
        "subtitle": "LIFE 錢包為您提供專業級的數據主權保護與多鏈資產管理。安全、隱私、一站式，即刻開啟您的數字之旅。",
        "list": {
          "mobile": {
            "title": "移動端資產管理",
            "desc": "打破時空限制，通過手機輕鬆管理您的多鏈權益與數字收藏品，隨時隨地掌握資產動態。"
          },
          "security": {
            "title": "企業級安全防護",
            "desc": "採用非對稱加密技術，私鑰離線存儲於您的設備。我們無法訪問您的任何敏感數據。"
          },
          "control": {
            "title": "數據完全自主",
            "desc": "您的數據屬於您自己。自主決定授權或撤銷第三方應用訪問，徹底告別數據被濫用。"
          },
          "global": {
            "title": "全球數字權益流轉",
            "desc": "基於區塊鏈網絡，實現點對點的權益互換與流轉，高效、透明，無國界限制。"
          },
          "ecosystem": {
            "title": "一站式 Web3 入口",
            "desc": "無縫連接海量 DApp，探索去中心化社交、遊戲與金融應用，體驗豐富的生態交互。"
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
      "btn_start": "Get Started",
      "btn_apps": "Ecosystem",
      "highlight": "Future Within Reach",
      "card_title": "Control Digital Life",
      "card_desc": "Secure, Private, Free"
    },
    "stats": {
      "custody": "Self-Custody",
      "cost": "Hidden Costs",
      "support": "24/7 Available"
    },
    "about_page": {
      "benefits": {
        "title": "What can LIFE do?",
        "subtitle": "LIFE provides professional-grade data sovereignty protection and multi-chain asset management. Secure, private, and all-in-one.",
        "list": {
          "mobile": {
            "title": "Mobile Asset Management",
            "desc": "Manage your multi-chain rights and digital collectibles easily via mobile, anytime, anywhere."
          },
          "security": {
            "title": "Enterprise Security",
            "desc": "Uses asymmetric encryption. Private keys are stored offline on your device. We cannot access your data."
          },
          "control": {
            "title": "Full Data Autonomy",
            "desc": "Your data belongs to you. Authorize or revoke third-party access at will. Say goodbye to data misuse."
          },
          "global": {
            "title": "Global Rights Circulation",
            "desc": "Peer-to-peer exchange and circulation of rights based on blockchain networks. Efficient, transparent, borderless."
          },
          "ecosystem": {
            "title": "One-Stop Web3 Gateway",
            "desc": "Seamlessly connect to massive DApps, explore decentralized social, gaming, and finance applications."
          }
        }
      }
    }
  }
}</i18n>