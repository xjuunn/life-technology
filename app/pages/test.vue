<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

definePageMeta({
  layout: "empty"
})

gsap.registerPlugin(ScrollTrigger)

const wrapperRef = ref<HTMLElement | null>(null)
const loaderRef = ref<HTMLElement | null>(null)
const heroRef = ref<HTMLElement | null>(null)
const horizSectionRef = ref<HTMLElement | null>(null)
const horizTrackRef = ref<HTMLElement | null>(null)
const featuresRef = ref<HTMLElement | null>(null)
const stackRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)

let lenis: Lenis | null = null
let ctx: gsap.Context | null = null

const splitText = (text: string) => text.split('')

onMounted(async () => {
  await nextTick()

  lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  })

  function raf(time: number) {
    lenis?.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  ctx = gsap.context(() => {
    const tlLoader = gsap.timeline()

    tlLoader
      .to('.loader-text span', {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        ease: 'power4.out'
      })
      .to(loaderRef.value, {
        yPercent: -100,
        duration: 1,
        ease: 'power4.inOut',
        delay: 0.5
      })
      .from('.hero-title span', {
        y: 200,
        opacity: 0,
        rotateX: 45,
        stagger: 0.05,
        duration: 1.5,
        ease: 'power4.out'
      }, '-=0.5')
      .from('.hero-sub', {
        y: 20,
        opacity: 0,
        duration: 1,
        ease: 'power2.out'
      }, '-=1')

    gsap.to('.hero-bg', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: {
        trigger: heroRef.value,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    })

    if (horizSectionRef.value && horizTrackRef.value) {
      const getScrollAmount = () => {
        let trackWidth = horizTrackRef.value!.scrollWidth
        return -(trackWidth - window.innerWidth)
      }

      const tween = gsap.to(horizTrackRef.value, {
        x: getScrollAmount,
        ease: 'none'
      })

      ScrollTrigger.create({
        trigger: horizSectionRef.value,
        start: 'top top',
        end: () => `+=${horizTrackRef.value!.scrollWidth - window.innerWidth}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
      })
    }

    const highlightText = document.querySelectorAll('.highlight-text')
    highlightText.forEach((text) => {
      gsap.fromTo(text,
        { backgroundSize: '0% 100%' },
        {
          backgroundSize: '100% 100%',
          ease: 'none',
          scrollTrigger: {
            trigger: text,
            start: 'top 80%',
            end: 'bottom 60%',
            scrub: true
          }
        }
      )
    })

    if (featuresRef.value) {
      const featureCards = featuresRef.value.querySelectorAll('.feature-card')
      featureCards.forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'top 70%',
            scrub: 1
          }
        })
      })
    }

    if (stackRef.value) {
      const cards = stackRef.value.querySelectorAll('.stack-card')
      cards.forEach((card, i) => {
        gsap.to(card, {
          scale: 1 - (cards.length - i) * 0.05,
          y: -50 * (cards.length - i),
          opacity: 1 - (cards.length - i) * 0.2,
          scrollTrigger: {
            trigger: card,
            start: 'top 20%',
            end: '+=1000',
            scrub: true,
            pin: true,
            pinSpacing: false
          }
        })
      })
    }

    if (footerRef.value) {
      gsap.from('.footer-reveal', {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: footerRef.value,
          start: 'top 75%'
        }
      })
    }

  }, wrapperRef.value!)
})

onUnmounted(() => {
  ctx?.revert()
  lenis?.destroy()
})
</script>

<template>
  <div ref="wrapperRef"
    class="bg-base-300 min-h-screen w-full overflow-hidden text-base-content selection:bg-primary selection:text-primary-content font-sans">

    <div ref="loaderRef" class="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      <h1 class="loader-text text-6xl md:text-9xl font-black text-primary overflow-hidden flex">
        <span v-for="(char, i) in splitText('LIFE-TECH')" :key="i" class="inline-block translate-y-full opacity-0">{{
          char }}</span>
      </h1>
    </div>

    <section ref="heroRef" class="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <div class="hero-bg absolute inset-0 z-0">
        <div class="absolute inset-0 bg-gradient-to-b from-black/30 via-base-300/50 to-base-300 z-10" />
        <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
          class="w-full h-full object-cover scale-110" alt="Background" />
      </div>

      <div class="relative z-20 text-center px-4 mix-blend-screen">
        <div class="hero-title overflow-hidden flex flex-wrap justify-center gap-x-2 md:gap-x-6 mb-6">
          <span class="text-6xl md:text-9xl font-black text-white inline-block">重塑</span>
          <span class="text-6xl md:text-9xl font-black text-primary inline-block">数字</span>
          <span class="text-6xl md:text-9xl font-black text-white inline-block">生命</span>
        </div>
        <p class="hero-sub text-lg md:text-2xl text-white/80 tracking-widest font-light">
          超越现实的沉浸式交互体验
        </p>
      </div>

      <div class="absolute bottom-10 z-20 animate-bounce">
        <Icon name="mingcute:arrow-down-line" class="w-8 h-8 text-white opacity-70" />
      </div>
    </section>

    <div class="py-24 bg-base-300 text-center px-6">
      <h2 class="text-4xl md:text-6xl font-bold leading-tight max-w-5xl mx-auto">
        我们将<span
          class="highlight-text bg-gradient-to-r from-primary to-primary bg-no-repeat bg-[length:0%_100%] text-transparent bg-clip-text transition-all">生物直觉</span>与<span
          class="highlight-text bg-gradient-to-r from-secondary to-secondary bg-no-repeat bg-[length:0%_100%] text-transparent bg-clip-text transition-all">算法精度</span>完美融合，创造出不仅仅是响应，而是<span
          class="highlight-text bg-gradient-to-r from-accent to-accent bg-no-repeat bg-[length:0%_100%] text-transparent bg-clip-text transition-all">感知</span>的界面。
      </h2>
    </div>

    <section ref="horizSectionRef" class="h-screen w-full bg-base-100 overflow-hidden relative">
      <div class="absolute top-10 left-10 z-10">
        <span class="text-primary font-mono tracking-widest">核心生态</span>
      </div>
      <div class="h-full flex items-center overflow-hidden">
        <div ref="horizTrackRef" class="flex gap-10 px-10 md:px-32 w-max h-max items-center">
          <div v-for="i in 5" :key="i"
            class="h-item w-[85vw] md:w-[45vw] h-[60vh] bg-base-200 rounded-3xl overflow-hidden shadow-2xl relative group border border-base-content/5 flex-shrink-0">
            <img :src="`https://picsum.photos/800/600?random=${i}`"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40"
              alt="Card" />
            <div class="absolute inset-0 bg-gradient-to-t from-base-300 to-transparent" />
            <div class="absolute bottom-0 left-0 p-8 md:p-12 w-full">
              <div class="flex items-center gap-4 mb-4">
                <span class="badge badge-primary badge-outline">MODULE 0{{ i }}</span>
              </div>
              <h3 class="text-3xl md:text-5xl font-bold mb-4 group-hover:text-primary transition-colors">智能节点 {{ i }}
              </h3>
              <p class="text-base-content/70 text-lg line-clamp-2">
                利用分布式神经网络实时处理海量数据，为您的数字资产提供全天候的智能安全防护与增值服务。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section ref="featuresRef" class="py-32 px-6 max-w-7xl mx-auto">
      <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <h2
          class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-base-content to-base-content/50">
          全栈能力<br>矩阵
        </h2>
        <p class="text-xl text-base-content/60 max-w-md pb-2">
          每一行代码都经过极致优化，只为呈现如丝般顺滑的交互体验。
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="(item, idx) in ['极致性能', '视觉盛宴', '安全加密', '多端适配', '云端同步', 'AI 驱动']" :key="idx"
          class="feature-card group p-10 bg-base-100 rounded-[2rem] border border-base-content/5 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(var(--p),0.2)]">
          <div
            class="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300">
            <Icon name="mingcute:lightning-fill" class="w-8 h-8" />
          </div>
          <h3 class="text-2xl font-bold mb-4">{{ item }}</h3>
          <p class="text-base-content/60">
            采用最新的渲染引擎技术，确保在任何设备上都能保持 60FPS 的流畅帧率，拒绝卡顿。
          </p>
        </div>
      </div>
    </section>

    <section ref="stackRef" class="py-20 relative bg-black text-white min-h-[200vh]">
      <div class="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        <h2
          class="text-[20vw] font-black absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/5 whitespace-nowrap select-none">
          EVOLUTION
        </h2>

        <div class="relative w-full max-w-2xl h-[400px]">
          <div v-for="n in 3" :key="n"
            class="stack-card absolute inset-0 w-full h-full bg-base-300 rounded-3xl border border-white/10 shadow-2xl p-10 flex flex-col justify-between origin-top">
            <div class="flex justify-between items-start">
              <span class="text-6xl font-bold text-white/10">0{{ n }}</span>
              <div class="p-3 bg-white/5 rounded-full backdrop-blur-md">
                <Icon name="mingcute:card-shield-fill" class="w-6 h-6 text-primary" />
              </div>
            </div>
            <div>
              <h3 class="text-4xl font-bold mb-4 text-white">第 {{ n }} 代架构</h3>
              <p class="text-gray-400">
                从底层逻辑重构，实现了比上一代提升 300% 的并发处理能力，同时降低了 50% 的资源消耗。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="w-full py-20 bg-primary overflow-hidden -rotate-1 origin-center border-y-8 border-black">
      <div class="flex whitespace-nowrap animate-marquee">
        <span v-for="n in 20" :key="n" class="text-8xl font-black text-black mx-8 uppercase">
          Join The Future •
        </span>
      </div>
    </div>

    <footer ref="footerRef" class="bg-base-100 pt-32 pb-10 px-6 overflow-hidden relative">
      <div class="max-w-7xl mx-auto text-center relative z-10">
        <div class="footer-reveal inline-block mb-12">
          <div
            class="w-20 h-20 bg-gradient-to-tr from-primary to-secondary rounded-full blur-2xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Icon name="mingcute:finger-press-fill" class="w-16 h-16 text-base-content relative z-10 animate-pulse" />
        </div>

        <h2 class="footer-reveal text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
          准备好<br><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">开始探索</span>了吗？
        </h2>

        <p class="footer-reveal text-xl text-base-content/60 mb-12 max-w-2xl mx-auto">
          立即加入我们，体验前所未有的数字交互旅程。所有的想象，即刻成为现实。
        </p>

        <div class="footer-reveal flex flex-col sm:flex-row justify-center gap-6 mb-20">
          <button
            class="btn btn-primary btn-lg rounded-full px-12 min-w-[200px] shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all hover:-translate-y-1">
            立即注册
          </button>
          <button class="btn btn-outline btn-lg rounded-full px-12 min-w-[200px]">
            联系销售
          </button>
        </div>

        <div
          class="footer-reveal border-t border-base-content/10 pt-10 flex flex-col md:flex-row justify-between items-center text-sm text-base-content/40">
          <p>&copy; 2024 Life Technology. 版权所有。</p>
          <div class="flex gap-6 mt-4 md:mt-0">
            <span class="hover:text-primary cursor-pointer transition-colors">隐私政策</span>
            <span class="hover:text-primary cursor-pointer transition-colors">服务条款</span>
            <span class="hover:text-primary cursor-pointer transition-colors">关于我们</span>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 20s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(-50%);
  }
}
</style>