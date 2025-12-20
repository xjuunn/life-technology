<template>
  <div ref="mainContainer"
    class="min-h-screen bg-base-100 text-base-content font-sans transition-colors duration-300 relative overflow-x-hidden">
    <title>life-首页</title>
    <div class="absolute w-screen h-[calc(100vh-0px)] z-1 top-20 md:top-0">
      <ClientOnly>
        <EffectGlobalMap class="relative"></EffectGlobalMap>
      </ClientOnly>
    </div>
    <section class="hero-section relative pt-8 pb-4 md:pt-40 md:pb-32 px-4 z-2">
      <div class="container mx-auto text-center max-w-5xl">
        <div
          class="hero-anim inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base-content/10 bg-base-content/5 mb-4 md:mb-8 backdrop-blur-sm invisible">
          <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span class="text-xs font-bold tracking-widest uppercase opacity-80">{{ t('hero.subtitle') }}</span>
        </div>
        <h1 :class="[
          'hero-anim font-black tracking-tight leading-none mb-4 md:mb-8 invisible',
          isEn ? 'text-4xl md:text-7xl lg:text-8xl' : 'text-5xl md:text-7xl lg:text-8xl'
        ]">
          {{ t('hero.title_prefix') }}<span
            class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{ t('hero.title_highlight')
            }}</span>
          <br />
          {{ t('hero.title_suffix') }}
        </h1>
        <p
          class="hero-anim text-lg md:text-xl text-base-content/60 max-w-3xl mx-auto mb-6 md:mb-10 leading-relaxed font-medium invisible">
          {{ t('hero.description') }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto">
          <nuxt-link to="/apps"
            class="btn bg-linear-to-r from-primary to-secondary btn-lg rounded-full px-8 py-4 w-full sm:w-auto sm:min-w-[200px] text-white border-none shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            {{ t('hero.btn_start') }}
          </nuxt-link>
          <nuxt-link to="/intro/white-book"
            class="btn btn-ghost btn-lg rounded-full px-8 py-4 w-full sm:w-auto sm:min-w-[200px] border border-base-content/30 hover:bg-base-content hover:text-base-100">
            {{ t('hero.btn_whitepaper') }}
          </nuxt-link>
          <a href="https://live.lifetv.chat/live" target="_blank"
            class="btn btn-ghost btn-lg rounded-full px-8 py-4 w-full sm:w-auto sm:min-w-[200px] border border-base-content/30 hover:bg-base-content hover:text-base-100">
            {{ t('hero.btn_live') }}
          </a>
        </div>
      </div>
    </section>
    <div class="stats-section relative border-y border-base-content/5 bg-base-content/2 z-2">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="stat-item text-center group cursor-default invisible">
            <div class="text-4xl font-black mb-1 tracking-tight group-hover:text-primary transition-colors">
              <effect-decrypted-text :text="stat.value + ''" animate-on="view" characters="1234567890" />
            </div>
            <div class="text-xs font-bold uppercase tracking-widest text-base-content/50">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
    <section class="video-intro-section py-24 px-4 relative z-10 overflow-hidden">
      <div class="container mx-auto max-w-7xl">
        <div class="flex flex-col lg:flex-row items-center gap-16">
          <div class="w-full lg:w-1/2 video-side invisible relative">
            <div
              class="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/20 blur-[120px] opacity-30 rounded-full pointer-events-none">
            </div>
            <div
              class="relative rounded-sm overflow-hidden shadow-2xl border border-base-content/5 bg-black group aspect-video">
              <div
                class="absolute inset-0 bg-linear-to-tr from-primary/10 to-transparent group-hover:opacity-0 transition-opacity duration-500 z-10 pointer-events-none">
              </div>
              <video src="https://blog.lifetv.chat/videos/lv_0_20251208110401.mp4"
                class="w-full h-full object-cover transform transition-transform duration-1000" controls playsinline>
              </video>
            </div>
          </div>
          <div class="w-full lg:w-1/2 video-text-side invisible">
            <div
              class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-6 border border-secondary/10">
              <div class="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse"></div>
              {{ t('video_section.badge') }}
            </div>
            <h2 class="text-3xl md:text-5xl font-black mb-6 leading-tight">
              {{ t('video_section.title') }}
            </h2>
            <p class="text-lg text-base-content/60 mb-8 leading-relaxed">
              {{ t('video_section.desc') }}
            </p>
            <div class="space-y-4">
              <div v-for="(item, idx) in 3" :key="idx"
                class="flex items-start gap-4 p-4 rounded-2xl hover:bg-base-content/5 transition-colors duration-300 border border-transparent hover:border-base-content/5">
                <div
                  class="w-12 h-12 rounded-xl bg-gradient-to-br from-base-200 to-base-100 flex items-center justify-center shrink-0 text-primary shadow-sm">
                  <Icon
                    :name="idx === 0 ? 'heroicons:sparkles' : idx === 1 ? 'heroicons:globe-alt' : 'heroicons:device-phone-mobile'"
                    size="24" />
                </div>
                <div>
                  <h4 class="font-bold text-lg mb-1">{{ t(`video_section.points.${idx}.title`) }}</h4>
                  <p class="text-sm text-base-content/60 leading-relaxed">{{ t(`video_section.points.${idx}.desc`) }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="trends-section relative py-32 px-4 z-2">
      <div class="container mx-auto max-w-6xl">
        <div
          class="trends-header flex flex-col md:flex-row justify-between items-center items-end mb-16 gap-6 text-center md:text-left invisible">
          <div class="max-w-xl w-full">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">{{ t('trends.subtitle') }}</h2>
            <h3 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('trends.title') }}</h3>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[400px]">
          <div
            class="trend-card md:col-span-2 rounded-[2.5rem] bg-base-200 p-10 relative overflow-hidden group border border-base-content/5 hover:border-primary/30 transition-colors duration-300 min-h-[450px] md:min-h-0 invisible">
            <div class="absolute inset-0 bg-linear-to-br from-base-content/6 to-base-content/2"></div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div
                class="w-20 h-20 rounded-2xl bg-base-100 flex items-center justify-center shadow-sm text-primary mb-6">
                <Icon name="heroicons:circle-stack" size="40" />
              </div>
              <div>
                <h4 class="text-3xl font-bold mb-3">{{ t('trends.assets.title') }}</h4>
                <p class="text-base-content/60 leading-relaxed max-w-lg">
                  {{ t('trends.assets.desc') }}
                </p>
                <nuxt-link to="/intro/what-life-do"
                  class="mt-6 flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group-hover:translate-x-2 transition-transform">
                  {{ t('trends.read_more') }}
                  <Icon name="heroicons:arrow-long-right" />
                </nuxt-link>
              </div>
            </div>
          </div>
          <div
            class="trend-card rounded-[2.5rem] bg-base-100 p-10 relative overflow-hidden group border border-base-content/5 hover:border-secondary/30 transition-colors duration-300 shadow-sm min-h-[380px] md:min-h-0 invisible">
            <div class="absolute inset-0 bg-linear-to-br from-base-content/6 to-base-content/2"></div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-20 h-20 rounded-2xl bg-base-200 flex items-center justify-center text-secondary mb-6">
                <Icon name="heroicons:chart-bar-square" size="40" />
              </div>
              <div>
                <h4 class="text-2xl font-bold mb-3">{{ t('trends.quantified.title') }}</h4>
                <p class="text-base-content/60 text-sm leading-relaxed">
                  {{ t('trends.quantified.desc') }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="trend-card rounded-[2.5rem] bg-base-100 p-10 relative overflow-hidden group border border-base-content/5 hover:border-accent/30 transition-colors duration-300 shadow-sm min-h-[380px] md:min-h-0 invisible">
            <div class="absolute inset-0 bg-linear-to-br from-base-content/6 to-base-content/2"></div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-20 h-20 rounded-2xl bg-base-200 flex items-center justify-center text-accent mb-6">
                <Icon name="heroicons:user-group" size="40" />
              </div>
              <div>
                <h4 class="text-2xl font-bold mb-3">{{ t('trends.credit.title') }}</h4>
                <p class="text-base-content/60 text-sm leading-relaxed">
                  {{ t('trends.credit.desc') }}
                </p>
              </div>
            </div>
          </div>
          <div
            class="trend-card md:col-span-2 rounded-[2.5rem] bg-neutral text-neutral-content p-10 relative overflow-hidden group min-h-[450px] md:min-h-0 invisible">
            <div class="absolute -right-10 -top-10 opacity-10 rotate-12">
              <Icon name="heroicons:finger-print" size="300" />
            </div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div
                class="w-20 h-20 rounded-2xl bg-base-200/80 flex items-center justify-center text-accent shadow-lg mb-6">
                <Icon name="heroicons:shield-check" size="40" />
              </div>
              <div>
                <h4 class="text-3xl font-bold mb-3 text-white">{{ t('trends.security.title') }}</h4>
                <p class="text-white/70 leading-relaxed max-w-lg">
                  {{ t('trends.security.desc') }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="features-section py-32 px-4 bg-base-200/50">
      <div class="container mx-auto max-w-6xl">
        <div class="features-header text-center mb-20 max-w-2xl mx-auto invisible">
          <h2 class="text-4xl font-bold mb-6">{{ t('features.title') }}</h2>
          <p class="text-base-content/60 text-lg">
            {{ t('features.subtitle') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, i) in features" :key="i"
            class="feature-card group p-8 rounded-3xl bg-base-100 border border-base-content/5 hover:border-primary/20 hover:shadow-xl transition-[border-color,box-shadow,background-color] duration-300 invisible">
            <div
              class="w-16 h-16 rounded-2xl bg-base-200 group-hover:bg-primary group-hover:text-primary-content flex items-center justify-center mb-6 text-primary transition-colors">
              <Icon :name="feature.icon" size="32" />
            </div>
            <h4 class="font-bold text-xl mb-3">{{ feature.title }}</h4>
            <p class="text-base-content/60 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="app-section py-32 px-4 overflow-hidden bg-base-100 relative z-10">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center gap-24">
          <div class="lg:w-1/2 w-full flex justify-center perspective-container">
            <div class="app-card hover-3d mx-auto w-full max-w-[380px] aspect-3/4 invisible">
              <div
                class="relative h-full w-full rounded-2xl bg-base-100 border border-base-content/10 shadow-2xl p-8 flex flex-col justify-between overflow-hidden">
                <div class="absolute inset-0 bg-linear-to-br from-base-content/5 to-transparent pointer-events-none">
                </div>
                <div class="relative z-10 flex justify-between items-center">
                  <div class="flex items-center gap-3">
                    <div
                      class="w-12 h-12 rounded-2xl bg-base-200 flex items-center justify-center text-primary shadow-sm">
                      <Icon name="ph:shield-check-fill" size="24" />
                    </div>
                    <span class="font-bold tracking-tight text-xl">LIFE Guard</span>
                  </div>
                  <div
                    class="px-3 py-1.5 rounded-full bg-green-500/10 text-green-600 text-xs font-bold flex items-center gap-2 border border-green-500/10">
                    <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                    {{ t('app.secure_status') }}
                  </div>
                </div>
                <div class="relative z-10 my-auto">
                  <div class="text-sm text-base-content/50 font-bold uppercase tracking-wider mb-2">
                    {{ t('app.points_label_en') }}
                  </div>
                  <div class="text-6xl font-mono font-black tracking-tighter text-base-content">
                    8,592<span class="text-3xl text-base-content/30">.00</span>
                  </div>
                  <div
                    class="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-bold">
                    <Icon name="heroicons:trophy" size="16" />
                    <span>{{ t('app.points_label') }}</span>
                  </div>
                </div>
                <div class="relative z-10 space-y-3">
                  <div
                    class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5 flex items-center gap-4 hover:bg-base-200 transition-colors">
                    <div
                      class="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/70 shadow-sm">
                      <Icon name="heroicons:document-text" size="20" />
                    </div>
                    <div>
                      <div class="font-bold text-sm">{{ t('app.card_id') }}</div>
                      <div class="text-xs text-base-content/50 font-medium">{{ t('app.card_id_status') }}</div>
                    </div>
                  </div>
                  <div
                    class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5 flex items-center gap-4 hover:bg-base-200 transition-colors">
                    <div
                      class="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center text-base-content/70 shadow-sm">
                      <Icon name="heroicons:chart-pie" size="20" />
                    </div>
                    <div>
                      <div class="font-bold text-sm">{{ t('app.card_health') }}</div>
                      <div class="text-xs text-base-content/50 font-medium">{{ t('app.card_health_status') }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="app-content lg:w-1/2 invisible">
            <h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {{ t('app.title_prefix') }}
              <br />
              <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{
                t('app.title_highlight') }}</span>
            </h2>
            <p class="text-lg text-base-content/60 mb-10 leading-relaxed max-w-md">
              {{ t('app.description') }}
            </p>
            <div class="space-y-8">
              <div class="app-feature flex gap-6 group">
                <div
                  class="shrink-0 w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300 shadow-sm">
                  <Icon name="heroicons:server-stack" size="26" />
                </div>
                <div>
                  <h5 class="text-xl font-bold mb-2">{{ t('app.feature_control_title') }}</h5>
                  <p class="text-base-content/60 text-sm leading-relaxed">{{ t('app.feature_control_desc') }}</p>
                </div>
              </div>
              <div class="app-feature flex gap-6 group">
                <div
                  class="shrink-0 w-14 h-14 rounded-2xl bg-base-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300 shadow-sm">
                  <Icon name="heroicons:check-badge" size="26" />
                </div>
                <div>
                  <h5 class="text-xl font-bold mb-2">{{ t('app.feature_compliance_title') }}</h5>
                  <p class="text-base-content/60 text-sm leading-relaxed">{{ t('app.feature_compliance_desc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="faq-section py-32 px-4 bg-base-200/30">
      <div class="container mx-auto max-w-3xl">
        <div class="faq-header text-center mb-16 invisible">
          <h2 class="text-3xl font-bold mb-4">{{ t('faq.title') }}</h2>
          <p class="text-base-content/60">{{ t('faq.subtitle') }}</p>
        </div>
        <div
          class="faq-list join join-vertical w-full bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden invisible">
          <div v-for="(faq, idx) in faqs" :key="idx"
            class="faq-item collapse collapse-arrow join-item border-b border-base-content/5 last:border-none">
            <input type="radio" name="faq-accordion" :checked="idx === 0" />
            <div class="collapse-title text-lg font-bold py-6 px-6 hover:bg-base-content/5 transition-colors">
              {{ faq.question }}
            </div>
            <div class="collapse-content px-6">
              <p class="text-base-content/60 leading-relaxed pb-6">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="cta-section py-40 px-4 text-center overflow-hidden relative">
      <div class="absolute inset-0 bg-linear-to-t from-base-content/5 to-transparent pointer-events-none"></div>
      <div class="container mx-auto relative z-10">
        <h2
          class="cta-bg-text text-6xl md:text-9xl font-black mb-8 tracking-tighter invisible select-none text-base-content">
          DIGITAL
        </h2>
        <div class="cta-content -mt-12 relative z-10 invisible">
          <h3 class="text-3xl md:text-5xl font-bold mb-10">{{ t('cta.title') }}</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <nuxt-link to="/apps"
              class="btn bg-linear-to-r from-primary to-secondary btn-lg rounded-full px-12 min-w-[200px] text-primary-content shadow-lg shadow-primary/20">
              {{ t('cta.btn_download') }}
            </nuxt-link>
            <button @click="openEmailClient"
              class="btn btn-outline btn-lg rounded-full px-12 min-w-[200px] border-base-content/20 hover:bg-base-content hover:text-base-100"
              style="border-image: linear-gradient(to right, var(--primary), var(--secondary)) 1;">
              {{ t('cta.btn_contact') }}
            </button>
          </div>
          <p class="mt-8 text-sm text-base-content/40">
            {{ t('cta.disclaimer') }}
          </p>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <div v-if="showContactModal" class="fixed inset-0 z-50 flex items-center justify-center">
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" @click="closeContactModal"></div>

        <div class="relative z-10 bg-base-100 rounded-3xl shadow-2xl max-w-md w-full mx-4 overflow-hidden">
          <div class="p-8 text-center border-b border-base-content/10">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:chat-bubble-left-right" size="32" class="text-primary" />
            </div>
            <h3 class="text-2xl font-bold mb-2">{{ t('contact_modal.title') }}</h3>
            <p class="text-base-content/60">{{ t('contact_modal.description') }}</p>
          </div>

          <div class="p-8">
            <div class="flex items-center justify-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-xl bg-base-200 flex items-center justify-center">
                <Icon name="cib:qq" size="24" class="text-blue-500" />
              </div>
              <div class="text-center">
                <p class="text-sm text-base-content/50 mb-1">{{ t('contact_modal.qq_label') }}</p>
                <p class="text-2xl font-bold tracking-wider">{{ qqNumber }}</p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <button @click="copyQQNumber"
                class="btn btn-primary rounded-xl py-4 flex items-center justify-center gap-2">
                <Icon name="heroicons:clipboard-document" size="20" />
                {{ t('contact_modal.copy_btn') }}
              </button>
              <button @click="closeContactModal" class="btn btn-ghost rounded-xl py-4 border border-base-content/20">
                {{ t('contact_modal.close_btn') }}
              </button>
            </div>
          </div>
          <div class="px-8 pb-8 text-center">
            <p class="text-sm text-base-content/50">{{ t('contact_modal.hint') }}</p>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { type StatsResponse } from '~/api/system'
import { computed, ref, onMounted, onUnmounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const { t, locale } = useAppI18n();
const isEn = computed(() => locale.value === 'en');
const statsData = ref<StatsResponse>()
const mainContainer = ref<HTMLElement | null>(null);
let ctx: gsap.Context;
const showContactModal = ref(false)
const qqNumber = ref('1759942536')

onMounted(() => {
  initData();

  if (mainContainer.value)
    ctx = gsap.context(() => {
      const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      heroTl.fromTo('.hero-anim',
        { autoAlpha: 0, y: 100, scale: 0.95, filter: 'blur(10px)' },
        { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.1 }
      )
        .fromTo('.stat-item',
          { autoAlpha: 0, scale: 0.8, y: 50, filter: 'blur(5px)' },
          { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1, stagger: 0.1, ease: 'back.out(1.7)' },
          '-=0.5'
        );

      const videoTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.video-intro-section',
          start: 'top 80%',
          toggleActions: 'play reverse play reverse'
        }
      });

      videoTl.fromTo('.video-side',
        { autoAlpha: 0, x: -50, rotationY: 10 },
        { autoAlpha: 1, x: 0, rotationY: 0, duration: 1.2, ease: 'power3.out' }
      ).fromTo('.video-text-side',
        { autoAlpha: 0, x: 50 },
        { autoAlpha: 1, x: 0, duration: 1.2, ease: 'power3.out' },
        "-=1"
      );

      gsap.fromTo('.trends-header',
        { autoAlpha: 0, x: -30, filter: 'blur(8px)' },
        {
          autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out',
          scrollTrigger: {
            trigger: '.trends-section',
            start: 'top 92%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

      ScrollTrigger.batch('.trend-card', {
        start: 'top 92%',
        onEnter: batch => gsap.fromTo(batch,
          { autoAlpha: 0, y: 80, rotationX: 10, scale: 0.9, filter: 'blur(5px)' },
          { autoAlpha: 1, y: 0, rotationX: 0, scale: 1, filter: 'blur(0px)', duration: 1.2, stagger: 0.15, ease: 'power3.out' }
        ),
        onLeave: batch => gsap.to(batch, { autoAlpha: 0, y: -50, scale: 0.9, filter: 'blur(5px)', duration: 0.8, ease: 'power2.in' }),
        onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 0.8, ease: 'power2.out' }),
        onLeaveBack: batch => gsap.to(batch, { autoAlpha: 0, y: 80, scale: 0.9, filter: 'blur(5px)', duration: 0.8, ease: 'power2.in' })
      });

      gsap.fromTo('.features-header',
        { autoAlpha: 0, y: 40, scale: 0.95, filter: 'blur(8px)' },
        {
          autoAlpha: 1, y: 0, scale: 1, filter: 'blur(0px)', duration: 1, ease: 'back.out(1.2)',
          scrollTrigger: {
            trigger: '.features-section',
            start: 'top 92%',
            toggleActions: 'play reverse play reverse'
          }
        }
      );

      ScrollTrigger.batch('.feature-card', {
        start: 'top 92%',
        onEnter: batch => gsap.fromTo(batch,
          { autoAlpha: 0, scale: 0.8, y: 60, filter: 'blur(5px)' },
          { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 0.8, stagger: 0.1, ease: 'back.out(1.5)' }
        ),
        onLeave: batch => gsap.to(batch, { autoAlpha: 0, scale: 0.9, filter: 'blur(5px)', duration: 0.5 }),
        onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, scale: 1, filter: 'blur(0px)', duration: 0.5 }),
        onLeaveBack: batch => gsap.to(batch, { autoAlpha: 0, scale: 0.8, y: 60, filter: 'blur(5px)', duration: 0.5 })
      });

      const appTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.app-section',
          start: 'top 90%',
          toggleActions: 'play reverse play reverse'
        }
      });

      appTl.fromTo('.app-card',
        { autoAlpha: 0, x: -80, rotation: -5, filter: 'blur(10px)' },
        { autoAlpha: 1, x: 0, rotation: 0, filter: 'blur(0px)', duration: 1.5, ease: 'elastic.out(1, 0.75)' }
      )
        .fromTo('.app-content',
          { autoAlpha: 0, x: 80, filter: 'blur(10px)' },
          { autoAlpha: 1, x: 0, filter: 'blur(0px)', duration: 1.2, ease: 'power4.out' },
          '<'
        );

      gsap.to('.app-card', {
        y: -20,
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 1.5
      });

      gsap.fromTo('.faq-header',
        { autoAlpha: 0, y: 40, filter: 'blur(8px)' },
        {
          autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: '.faq-section', start: 'top 92%', toggleActions: 'play reverse play reverse' }
        }
      );

      ScrollTrigger.batch('.faq-list', {
        start: 'top 92%',
        onEnter: batch => gsap.fromTo(batch,
          { autoAlpha: 0, y: 50, filter: 'blur(5px)' },
          { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' }
        ),
        onLeave: batch => gsap.to(batch, { autoAlpha: 0, y: -30, filter: 'blur(5px)', duration: 0.5 }),
        onEnterBack: batch => gsap.to(batch, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: 0.5 }),
        onLeaveBack: batch => gsap.to(batch, { autoAlpha: 0, y: 50, filter: 'blur(5px)', duration: 0.5 })
      });

      const ctaTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.cta-section',
          start: 'top 90%',
          toggleActions: 'play reverse play reverse'
        }
      });

      ctaTl.fromTo('.cta-bg-text',
        { autoAlpha: 0, scale: 0.5, y: 100, filter: 'blur(20px)' },
        { autoAlpha: 0.05, scale: 1, y: 0, filter: 'blur(0px)', duration: 2, ease: 'power2.out' }
      )
        .fromTo('.cta-content',
          { autoAlpha: 0, scale: 0.9, y: 50, filter: 'blur(10px)' },
          { autoAlpha: 1, scale: 1, y: 0, filter: 'blur(0px)', duration: 1.2, ease: 'elastic.out(1, 0.9)' },
          '-=1.5'
        );

    }, mainContainer.value);
})

onUnmounted(() => {
  ctx?.revert();
})

async function initData() {
  try {
    const { data, success } = await ApiList.system.stats();
    statsData.value = data;
  } catch (e: any) {
    console.log(e.message);

  }
}
const stats = computed(() => [
  { value: statsData.value?.totalAddresses ?? "???", label: t('stats.users') },
  { value: statsData.value?.totalTransactions ?? '???', label: t('stats.distributed_records') },
  { value: '100%', label: t('stats.autonomy') },
  { value: '0', label: t('stats.accidents') }
])

const features = computed(() => [
  { icon: "heroicons:cpu-chip", title: t('features.list.brain.title'), desc: t('features.list.brain.desc') },
  { icon: "heroicons:identification", title: t('features.list.did.title'), desc: t('features.list.did.desc') },
  { icon: "heroicons:heart", title: t('features.list.body.title'), desc: t('features.list.body.desc') },
  { icon: "heroicons:key", title: t('features.list.key.title'), desc: t('features.list.key.desc') },
  { icon: "heroicons:squares-2x2", title: t('features.list.cross.title'), desc: t('features.list.cross.desc') },
  { icon: "heroicons:eye-slash", title: t('features.list.privacy.title'), desc: t('features.list.privacy.desc') },
])

const faqs = computed(() => [
  { question: t('faq.list.q1'), answer: t('faq.list.a1') },
  { question: t('faq.list.q2'), answer: t('faq.list.a2') },
  { question: t('faq.list.q3'), answer: t('faq.list.a3') },
])

function openContactModal() {
  showContactModal.value = true
}

function closeContactModal() {
  showContactModal.value = false
}

function copyQQNumber() {
  navigator.clipboard.writeText(qqNumber.value).then(() => {
    alert('QQ号已复制到剪贴板')
  }).catch(err => {
    console.error('复制失败:', err)
  })
}

function openEmailClient() {
  useDialog().alert("请等待邮件客户端打开。\n如果出现问题，请邮件联系lifewallet@life.tires", "启动邮件客户端")
  const to = 'lifewallet@life.tires'
  const subject = encodeURIComponent('商务合作咨询')
  const body = encodeURIComponent(
    '您好，\n\n我们希望就商务合作事宜与您联系。\n\n公司 / 个人：\n联系方式：\n合作内容：\n'
  )

  window.location.href = `mailto:${to}?subject=${subject}&body=${body}`
}

</script>


<i18n lang="json">{
  "zh-CN": {
    "hero": {
      "subtitle": "Web3 Digital Economy",
      "title_prefix": "守护",
      "title_highlight": "数据价值",
      "title_suffix": "重塑数字生命",
      "description": "LIFE 致力于构建可信的数字未来。利用区块链分布式账本技术，将个人数据转化为可视化的数字资产，打造安全、合规的数字管理终端，提升个人数据的价值与意义。",
      "btn_start": "开启数字之旅",
      "btn_whitepaper": "了解技术白皮书",
      "btn_live": "观看直播"
    },
    "stats": {
      "users": "用户数",
      "distributed_records": "分布式账本记录",
      "autonomy": "数据自主权",
      "accidents": "安全事故"
    },
    "video_section": {
      "badge": "生态演示",
      "title": "可视化您的数字未来",
      "desc": "不仅仅是冷冰冰的数据，LIFE 为您构建了一个直观、可交互的数字世界。从资产管理到社交互动，每一个操作都清晰可见，安全可控。",
      "points": [
        {
          "title": "直观交互",
          "desc": "所见即所得的资产管理界面，零门槛上手 Web3。"
        },
        {
          "title": "全球互联",
          "desc": "打破地域限制，实时连接全球数字生态应用。"
        },
        {
          "title": "移动优先",
          "desc": "专为移动端优化的操作体验，随时随地掌控您的数字生活。"
        }
      ]
    },
    "trends": {
      "subtitle": "Industry Trends",
      "title": "赋予生命更深意义",
      "read_more": "查看详情",
      "assets": {
        "title": "数据要素资产化",
        "desc": "打破“数据孤岛”，通过确权与流通机制，将日常行为转化为可量化的数字权益，赋予个体对自身数字生命的价值回收权。"
      },
      "quantified": {
        "title": "量化自我",
        "desc": "通过客观数据反馈促进健康行为正循环，使「管理身体」成为可量化的终身事业，实现数字技术赋能。"
      },
      "credit": {
        "title": "信用价值",
        "desc": "突破物理限制，通过链上行为积累信用资本，在数字生态中获得社会影响力与共创未来的参与感。"
      },
      "security": {
        "title": "安全与合规",
        "desc": "严格遵循《区块链信息服务管理规定》备案，采用AES-256加密与分布式存储，确保技术合规性与生态稳健性，让数据回归用户。"
      }
    },
    "features": {
      "title": "核心功能",
      "subtitle": "LIFE 为用户提供安全、可信的数字管家服务，构建您的 Web3 数字化身。",
      "list": {
        "brain": {
          "title": "数字大脑",
          "desc": "AI 驱动的数据分析引擎，将您的生活足迹转化为可视化数据报告与建议。"
        },
        "did": {
          "title": "数字身份 (DID)",
          "desc": "基于区块链的去中心化数字身份，一次认证，全生态通用，告别繁琐账号。"
        },
        "body": {
          "title": "数字身体",
          "desc": "连接智能穿戴设备，让健康数据上链，将良好的生活习惯转化为可视化的数字权益。"
        },
        "key": {
          "title": "私钥自持",
          "desc": "私钥离线生成并存储于用户本地设备，平台无法触碰，确保资产安全与隐私。"
        },
        "cross": {
          "title": "跨链兼容",
          "desc": "支持主流联盟链及公链技术标准，实现不同生态间的数据互通与价值流转。"
        },
        "privacy": {
          "title": "隐私计算",
          "desc": "采用零知识证明与可信执行环境技术，确保数据在“可用不可见”的前提下创造价值。"
        }
      }
    },
    "app": {
      "secure_status": "Secure",
      "points_label_en": "Digital Points",
      "points_label": "生态权益积分",
      "card_id": "数字身份认证",
      "card_id_status": "已上链存证",
      "card_health": "健康数据报告",
      "card_health_status": "加密存储中",
      "title_prefix": "打造全球更安全的",
      "title_highlight": "数字资产管家",
      "description": "全球化数字经济体系下，安全是技术挑战与信任承诺。LIFE 客户端集成 AES-256 加密与 ECDSA 签名算法，通过离线私钥存储，保障您的数字权益万无一失。",
      "feature_control_title": "自主掌控",
      "feature_control_desc": "用户数据实施端到端加密并分布式存储，结合用户自主授权机制，真正实现数据主权。",
      "feature_compliance_title": "技术合規",
      "feature_compliance_desc": "严格遵循国内区块链信息服务管理规定，确保技术应用合法合规，稳健运行。"
    },
    "faq": {
      "title": "了解 LIFE",
      "subtitle": "专业的区块链技术服务，值得信赖的选择",
      "list": {
        "q1": "什么是 LIFE 平台？",
        "a1": "LIFE 是一个基于区块链技术的去中心化数字生态系统，旨在为用户提供安全、隐私、自主的数据管理体验。它不是传统意义上的金融工具，而是您的个人数据资产管家。",
        "q2": "LIFE 积分有什么用？",
        "a2": "LIFE 积分是生态内的权益凭证，用于奖励用户对生态的數據贡献（如健康数据上传）。积分可用于兑换生态内的服务、参与社区治理投票，不可用于非法买卖。",
        "q3": "如何保障我的数据安全？",
        "a3": "我们采用军工级 AES-256 加密技术，您的核心数据和私钥仅存储在您的本地设备上。未经您授权，任何人（包括平台方）都无法查看或调用您的数据。"
      }
    },
    "cta": {
      "title": "准备好进入数字经济时代了吗？",
      "btn_download": "下载客户端",
      "btn_contact": "联系商务合作",
      "disclaimer": "* LIFE 严格遵守当地法律法规，仅提供技术服务，不涉及非法金融活动。"
    },
    "contact_modal": {
      "title": "商务合作",
      "description": "请通过以下QQ号联系我们",
      "qq_label": "商务合作QQ",
      "copy_btn": "复制QQ号",
      "close_btn": "关闭",
      "hint": "添加时请备注'商务合作'"
    }
  },
  "zh-TW": {
    "hero": {
      "subtitle": "Web3 Digital Economy",
      "title_prefix": "守護",
      "title_highlight": "數據價值",
      "title_suffix": "重塑數字生命",
      "description": "LIFE 致力於構建可信的數字未來。利用區塊鏈分佈式賬本技術，將個人數據轉化為可視化的數字資產，打造安全、合規的數字管理終端，提升個人數據的價值與意義。",
      "btn_start": "開啟數字之旅",
      "btn_whitepaper": "了解技術白皮書",
      "btn_live": "觀看直播"
    },
    "stats": {
      "users": "用户数",
      "distributed_records": "分布式帳本記錄",
      "autonomy": "數據自主權",
      "accidents": "安全事故"
    },
    "video_section": {
      "badge": "生態演示",
      "title": "可視化您的數字未來",
      "desc": "不僅僅是冷冰冰的數據，LIFE 為您構建了一個直觀、可交互的數字世界。從資產管理到社交互動，每一個操作都清晰可見，安全可控。",
      "points": [
        {
          "title": "直觀交互",
          "desc": "所見即所得的資產管理界面，零門檻上手 Web3。"
        },
        {
          "title": "全球互聯",
          "desc": "打破地域限制，實時連接全球數字生態應用。"
        },
        {
          "title": "移動優先",
          "desc": "專為移動端優化的操作體驗，隨時隨地掌控您的數字生活。"
        }
      ]
    },
    "trends": {
      "subtitle": "Industry Trends",
      "title": "賦予生命更深意義",
      "read_more": "查看詳情",
      "assets": {
        "title": "數據要素資產化",
        "desc": "打破「數據孤島」，通過確權與流通機制，將日常行為轉化為可量化的數字權益，賦予個體對自身數字生命的價值回收權。"
      },
      "quantified": {
        "title": "量化自我",
        "desc": "通過客觀數據反饋促進健康行為正循環，使「管理身體」成為可量化的終身事業，實現數字技術賦能。"
      },
      "credit": {
        "title": "信用價值",
        "desc": "突破物理限制，通過鏈上行為積累信用資本，在數字生態中獲得社會影響力與共創未來的參與感。"
      },
      "security": {
        "title": "安全與合規",
        "desc": "嚴格遵循《區塊鏈信息服務管理規定》備案，採用 AES-256 加密與分佈式存儲，確保技術合規性與生態穩健性，讓數據回歸用戶。"
      }
    },
    "features": {
      "title": "核心功能",
      "subtitle": "LIFE 為用戶提供安全、可信的數字管家服務，構建您的 Web3 數字化身。",
      "list": {
        "brain": {
          "title": "數字大腦",
          "desc": "AI 驅動的數據分析引擎，將您的生活足跡轉化為可視化數據報告與建議。"
        },
        "did": {
          "title": "數字身份 (DID)",
          "desc": "基於區塊鏈的去中心化數字身份，一次認證，全生態通用，告別繁瑣帳號。"
        },
        "body": {
          "title": "數字身體",
          "desc": "連接智能穿戴設備，讓健康數據上鏈，將良好的生活習慣轉化為可視化的數字權益。"
        },
        "key": {
          "title": "私鑰自持",
          "desc": "私鑰離線生成並存儲於用戶本地設備，平台無法觸碰，確保資產安全與隱私。"
        },
        "cross": {
          "title": "跨鏈兼容",
          "desc": "支持主流聯盟鏈及公鏈技術標準，實現不同生態間的數據互通與價值流轉。"
        },
        "privacy": {
          "title": "隱私計算",
          "desc": "採用零知識證明與可信執行環境技術，確保數據在「可用不可見」的前提下創造價值。"
        }
      }
    },
    "app": {
      "secure_status": "Secure",
      "points_label_en": "Digital Points",
      "points_label": "生態權益積分",
      "card_id": "數字身份認證",
      "card_id_status": "已上鏈存證",
      "card_health": "健康數據報告",
      "card_health_status": "加密存儲中",
      "title_prefix": "打造全球更安全的",
      "title_highlight": "數字資產管家",
      "description": "全球化數字經濟體系下，安全是技術挑戰與信任承諾。LIFE 客戶端集成 AES-256 加密與 ECDSA 簽名算法，通過離線私鑰存儲，保障您的數字權益萬無一失。",
      "feature_control_title": "自主掌控",
      "feature_control_desc": "用戶數據實施端到端加密並分佈式存儲，結合用戶自主授權機制，真正實現數據主權。",
      "feature_compliance_title": "技術合規",
      "feature_compliance_desc": "嚴格遵循國內區塊鏈信息服務管理規定，確保技術應用合法合規，穩健運行。"
    },
    "faq": {
      "title": "了解 LIFE",
      "subtitle": "專業的區塊鏈技術服務，值得信賴的選擇",
      "list": {
        "q1": "什麼是 LIFE 平台？",
        "a1": "LIFE 是一個基於區塊鏈技術的去中心化數字生態系統，旨在為用戶提供安全、隱私、自主的數據管理體驗。它不是傳統意義上的金融工具，而是您的個人數據資產管家。",
        "q2": "LIFE 積分有什麼用？",
        "a2": "LIFE 積分是生態內的權益憑證，用於獎勵用戶對生態的數據貢獻（如健康數據上傳）。積分可用於兌換生態內的服務、參與社區治理投票，不可用於非法買賣。",
        "q3": "如何保障我的數據安全？",
        "a3": "我們採用軍工級 AES-256 加密技術，您的核心數據和私鑰僅存儲在您的本地設備上。未經您授權，任何人（包括平台方）都無法查看或調用您的數據。"
      }
    },
    "cta": {
      "title": "準備好進入數字經濟時代了嗎？",
      "btn_download": "下載客戶端",
      "btn_contact": "聯繫商務合作",
      "disclaimer": "* LIFE 嚴格遵守當地法律法規，僅提供技術服務，不涉及非法金融活動。"
    },
    "contact_modal": {
      "title": "商務合作",
      "description": "請通過以下QQ號聯繫我們",
      "qq_label": "商務合作QQ",
      "copy_btn": "複製QQ號",
      "close_btn": "關閉",
      "hint": "添加時請備註'商務合作'"
    }
  },
  "en": {
    "hero": {
      "subtitle": "Web3 Digital Economy",
      "title_prefix": "Guard ",
      "title_highlight": "Data Value",
      "title_suffix": "Reshape Digital Life",
      "description": "LIFE is committed to building a trusted digital future. Utilizing blockchain distributed ledger technology, we transform personal data into visual digital assets, creating a secure and compliant digital management terminal to enhance the value and significance of personal data.",
      "btn_start": "Start Digital Journey",
      "btn_whitepaper": "Read Whitepaper",
      "btn_live": "Watch Live"
    },
    "stats": {
      "users": "User Count",
      "distributed_records": "Distributed Ledger Records",
      "autonomy": "Data Autonomy",
      "accidents": "Security Accidents"
    },
    "video_section": {
      "badge": "Ecosystem Demo",
      "title": "Visualize Your Digital Future",
      "desc": "More than just cold data, LIFE builds an intuitive and interactive digital world for you. From asset management to social interaction, every operation is clearly visible, secure, and controllable.",
      "points": [
        {
          "title": "Intuitive Interaction",
          "desc": "WYSIWYG asset management interface, zero threshold to start Web3."
        },
        {
          "title": "Global Connectivity",
          "desc": "Break geographical restrictions and connect to global digital ecosystem applications in real time."
        },
        {
          "title": "Mobile First",
          "desc": "Operation experience optimized for mobile terminals, control your digital life anytime, anywhere."
        }
      ]
    },
    "trends": {
      "subtitle": "Industry Trends",
      "title": "Giving Life Deeper Meaning",
      "read_more": "Read More",
      "assets": {
        "title": "Data Capitalization",
        "desc": "Breaking 'data silos' through ownership confirmation and circulation mechanisms, transforming daily behaviors into quantifiable digital rights, and empowering individuals to reclaim the value of their digital lives."
      },
      "quantified": {
        "title": "Quantified Self",
        "desc": "Promoting a positive cycle of healthy behaviors through objective data feedback, making 'body management' a quantifiable lifelong career empowered by digital technology."
      },
      "credit": {
        "title": "Credit Value",
        "desc": "Breaking physical limits, accumulating credit capital through on-chain behaviors, and gaining social influence and participation in co-creating the future within the digital ecosystem."
      },
      "security": {
        "title": "Security & Compliance",
        "desc": "Strictly adhering to Blockchain Information Service regulations, employing AES-256 encryption and distributed storage to ensure technical compliance and ecosystem stability, returning data ownership to users."
      }
    },
    "features": {
      "title": "Core Features",
      "subtitle": "LIFE provides secure and trusted digital stewardship services, building your Web3 digital avatar.",
      "list": {
        "brain": {
          "title": "Digital Brain",
          "desc": "AI-driven data analysis engine transforming your life footprints into visual data reports and suggestions."
        },
        "did": {
          "title": "Digital Identity (DID)",
          "desc": "Blockchain-based decentralized digital identity. One-time authentication for universal ecosystem access, saying goodbye to cumbersome accounts."
        },
        "body": {
          "title": "Digital Body",
          "desc": "Connect smart wearable devices to upload health data on-chain, transforming good life habits into visual digital rights."
        },
        "key": {
          "title": "Self-Held Private Key",
          "desc": "Private keys are generated offline and stored on your local device. The platform cannot touch them, ensuring asset security and privacy."
        },
        "cross": {
          "title": "Cross-Chain Compatibility",
          "desc": "Supports mainstream consortium and public chain technical standards, realizing data interoperability and value transfer between different ecosystems."
        },
        "privacy": {
          "title": "Privacy Computing",
          "desc": "Adopting Zero-Knowledge Proofs and Trusted Execution Environment technology to create value while ensuring data remains 'usable but invisible'."
        }
      }
    },
    "app": {
      "secure_status": "Secure",
      "points_label_en": "Digital Points",
      "points_label": "Eco Rights Points",
      "card_id": "Digital ID",
      "card_id_status": "On-chain Verified",
      "card_health": "Health Report",
      "card_health_status": "Encrypted Storage",
      "title_prefix": "Building a Safer Global",
      "title_highlight": "Digital Asset Steward",
      "description": "In the global digital economy, security is both a technical challenge and a trust commitment. The LIFE client integrates AES-256 encryption and ECDSA signature algorithms, safeguarding your digital rights through offline private key storage.",
      "feature_control_title": "Autonomous Control",
      "feature_control_desc": "User data is end-to-end encrypted and distributedly stored. Combined with user autonomous authorization mechanisms, true data sovereignty is achieved.",
      "feature_compliance_title": "Technical Compliance",
      "feature_compliance_desc": "Strictly following domestic blockchain information service management regulations to ensure legal, compliant, and stable technical operations."
    },
    "faq": {
      "title": "Learn About LIFE",
      "subtitle": "Professional blockchain technology services, a trustworthy choice",
      "list": {
        "q1": "What is the LIFE platform?",
        "a1": "LIFE is a decentralized digital ecosystem based on blockchain technology, designed to provide users with a secure, private, and autonomous data management experience. It is not a financial tool in the traditional sense, but your personal data asset steward.",
        "q2": "What are LIFE points used for?",
        "a2": "LIFE points are proofs of rights within the ecosystem, used to reward users for data contributions (such as health data uploads). Points can be used to redeem ecosystem services and participate in community governance voting, but cannot be used for illegal trading.",
        "q3": "How is my data security guaranteed?",
        "a3": "We use military-grade AES-256 encryption technology. Your core data and private keys are stored only on your local device. Without your authorization, no one (including the platform) can view or access your data."
      }
    },
    "cta": {
      "title": "Ready to enter the digital economy era?",
      "btn_download": "Download Client",
      "btn_contact": "Contact Business",
      "disclaimer": "* LIFE strictly complies with local laws and regulations, providing only technical services and not involving illegal financial activities."
    },
    "contact_modal": {
      "title": "Business Cooperation",
      "description": "Please contact us via the following QQ number",
      "qq_label": "Business QQ",
      "copy_btn": "Copy QQ Number",
      "close_btn": "Close",
      "hint": "Please note 'Business Cooperation' when adding"
    }
  }
}</i18n>