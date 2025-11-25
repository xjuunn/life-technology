<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans selection:bg-primary selection:text-primary-content">
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <div class="absolute top-0 right-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] opacity-50"></div>
      <div class="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-secondary/5 rounded-full blur-[100px] opacity-50"></div>
      <div
        class="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay">
      </div>
    </div>
    <section class="relative pt-32 pb-20 px-4 md:px-8">
      <div class="container mx-auto max-w-6xl">
        <div class="max-w-3xl">
          <div class="badge badge-primary badge-outline mb-6 font-bold tracking-wider py-4 px-4">{{
            t('about_page.header.badge') }}</div>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1] mb-8">
            {{ t('about_page.header.title_prefix') }}<br>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{
              t('about_page.header.title_highlight') }}</span>
          </h1>
          <p class="text-xl text-base-content/70 leading-relaxed max-w-2xl">
            {{ t('about_page.header.description') }}
          </p>
        </div>
      </div>
    </section>
    <section class="py-20 px-4 md:px-8 border-t border-base-content/5 bg-base-200/30">
      <div class="container mx-auto max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- 大卡片：定义 -->
          <div
            class="md:col-span-2 bg-base-100 rounded-4xl p-8 md:p-12 border border-base-content/5 shadow-sm flex flex-col justify-between group hover:border-primary/20 transition-colors">
            <div>
              <div class="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                <Icon name="heroicons:cube-transparent" size="24" />
              </div>
              <h3 class="text-3xl font-bold mb-4">{{ t('about_page.definition.main_card.title') }}</h3>
              <p class="text-base-content/60 leading-relaxed text-lg">
                {{ t('about_page.definition.main_card.desc') }}
              </p>
            </div>
            <div class="mt-8 flex flex-wrap gap-3">
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">{{
                t('about_page.definition.main_card.badge_web3') }}</div>
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">{{
                t('about_page.definition.main_card.badge_decentralized') }}</div>
              <div class="badge badge-lg bg-base-200 border-none text-base-content/70">{{
                t('about_page.definition.main_card.badge_sovereignty') }}</div>
            </div>
          </div>

          <!-- 右侧小卡片组 -->
          <div class="grid grid-rows-2 gap-6">
            <div
              class="bg-base-100 rounded-4xl p-8 border border-base-content/5 shadow-sm flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
              <Icon name="heroicons:key" class="text-secondary w-8 h-8 mb-3" />
              <h4 class="text-xl font-bold mb-2">{{ t('about_page.definition.small_card_key.title') }}</h4>
              <p class="text-sm text-base-content/60">{{ t('about_page.definition.small_card_key.desc') }}</p>
            </div>
            <div
              class="bg-base-100 rounded-4xl p-8 border border-base-content/5 shadow-sm flex flex-col justify-center hover:-translate-y-1 transition-transform duration-300">
              <Icon name="heroicons:globe-alt" class="text-accent w-8 h-8 mb-3" />
              <h4 class="text-xl font-bold mb-2">{{ t('about_page.definition.small_card_eco.title') }}</h4>
              <p class="text-sm text-base-content/60">{{ t('about_page.definition.small_card_eco.desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-4 md:px-8 overflow-hidden">
      <div class="container mx-auto max-w-6xl space-y-24">
        <div class="flex flex-col md:flex-row items-center gap-12 md:gap-20">
          <div class="w-full md:w-1/2 relative">
            <div
              class="absolute -inset-4 bg-linear-to-tr from-primary/20 to-transparent rounded-full blur-3xl opacity-30">
            </div>
            <div
              class="relative bg-base-200 border border-base-content/10 rounded-[2.5rem] p-8 md:p-12 aspect-square flex items-center justify-center">
              <Icon name="heroicons:currency-dollar" class="w-32 h-32 text-primary animate-pulse" />
              <div
                class="absolute bottom-10 left-10 right-10 p-4 bg-base-100/80 backdrop-blur-md rounded-2xl border border-base-content/5 shadow-lg">
                <div class="flex justify-between items-center text-sm font-bold">
                  <span>Governance</span>
                  <span class="text-primary">Active</span>
                </div>
                <div class="h-2 bg-base-300 rounded-full mt-2 overflow-hidden">
                  <div class="h-full bg-primary w-3/4"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <h2 class="text-sm font-bold text-primary uppercase tracking-widest mb-2">{{ t('about_page.token.subtitle')
              }}</h2>
            <h3 class="text-3xl md:text-4xl font-bold mb-6">{{ t('about_page.token.title') }}</h3>
            <p class="text-base-content/60 text-lg leading-relaxed mb-8">
              {{ t('about_page.token.desc') }}
            </p>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <Icon name="heroicons:check-circle" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">{{ t('about_page.token.list.circulation.title')
                    }}</span>
                  <span class="text-sm text-base-content/60">{{ t('about_page.token.list.circulation.desc') }}</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="heroicons:user-group" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">{{ t('about_page.token.list.governance.title')
                    }}</span>
                  <span class="text-sm text-base-content/60">{{ t('about_page.token.list.governance.desc') }}</span>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <Icon name="heroicons:sparkles" class="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <span class="font-bold block text-base-content">{{ t('about_page.token.list.incentive.title')
                    }}</span>
                  <span class="text-sm text-base-content/60">{{ t('about_page.token.list.incentive.desc') }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
          <div class="w-full md:w-1/2 relative">
            <div
              class="absolute -inset-4 bg-linear-to-bl from-secondary/20 to-transparent rounded-full blur-3xl opacity-30">
            </div>
            <div
              class="relative bg-base-200 border border-base-content/10 rounded-[2.5rem] p-8 md:p-12 aspect-square flex flex-col items-center justify-center overflow-hidden">
              <div
                class="w-64 bg-base-100 rounded-3xl shadow-2xl border border-base-content/5 p-4 transform rotate-6 hover:rotate-0 transition-transform duration-500">
                <div class="flex justify-between items-center mb-6">
                  <div class="w-8 h-8 bg-secondary/20 rounded-full"></div>
                  <div class="text-xs font-mono opacity-50">0x3F...8A2</div>
                </div>
                <div class="text-2xl font-bold mb-1">$12,450.00</div>
                <div class="text-xs text-green-500 mb-6">+2.4% (24h)</div>
                <div class="grid grid-cols-4 gap-2 mb-4">
                  <div v-for="i in 4" :key="i" class="h-10 bg-base-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <h2 class="text-sm font-bold text-secondary uppercase tracking-widest mb-2">{{
              t('about_page.wallet.subtitle') }}</h2>
            <h3 class="text-3xl md:text-4xl font-bold mb-6">{{ t('about_page.wallet.title') }}</h3>
            <p class="text-base-content/60 text-lg leading-relaxed mb-8">
              {{ t('about_page.wallet.desc') }}
            </p>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.multichain.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.multichain.desc') }}</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.storage.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.storage.desc') }}</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.privacy.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.privacy.desc') }}</div>
              </div>
              <div class="p-4 rounded-2xl bg-base-200/50 border border-base-content/5">
                <div class="font-bold mb-1">{{ t('about_page.wallet.features.opensource.title') }}</div>
                <div class="text-xs text-base-content/60">{{ t('about_page.wallet.features.opensource.desc') }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-20 px-4 md:px-8 bg-base-content text-base-100">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-16 max-w-2xl mx-auto">
          <h2 class="text-3xl md:text-5xl font-bold mb-6">{{ t('about_page.benefits.title') }}</h2>
          <p class="text-base-100/60 text-lg">{{ t('about_page.benefits.subtitle') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="(item, index) in benefits" :key="index"
            class="p-8 rounded-3xl bg-base-100/10 border border-white/10 hover:bg-base-100/20 transition-colors group cursor-default">
            <div class="mb-4 text-primary">
              <Icon :name="item.icon" size="32" />
            </div>
            <h4 class="text-xl font-bold mb-3 text-base-300">{{ item.title }}</h4>
            <p class="text-sm text-base-100/60 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>

        <div class="mt-16 text-center border-t border-white/10 pt-12">
          <div class="inline-flex flex-col items-center">
            <span class="text-primary font-bold tracking-widest uppercase text-xs mb-2">{{
              t('about_page.benefits.future.label') }}</span>
            <h3 class="text-2xl font-bold mb-4">{{ t('about_page.benefits.future.title') }}</h3>
            <p class="max-w-2xl text-base-100/60 mb-8">
              {{ t('about_page.benefits.future.desc') }}
            </p>
            <button
              class="btn btn-outline btn-primary rounded-full text-white border-white/20 hover:bg-white hover:text-base-content hover:border-white">
              {{ t('about_page.benefits.future.btn') }}
            </button>
          </div>
        </div>
      </div>
    </section>
    <section class="py-24 px-4 md:px-8 bg-base-200/50">
      <div class="container mx-auto max-w-4xl">
        <div class="flex items-end justify-between mb-12">
          <div>
            <h2 class="text-3xl md:text-4xl font-bold">{{ t('about_page.safety.title') }}</h2>
            <p class="text-base-content/60 mt-2">{{ t('about_page.safety.subtitle') }}</p>
          </div>
          <Icon name="heroicons:shield-exclamation" class="w-16 h-16 text-base-content/10 hidden md:block" />
        </div>

        <div class="space-y-4">
          <div v-for="(tip, idx) in safetyTips" :key="idx"
            class="collapse collapse-plus bg-base-100 border border-base-content/5 rounded-2xl hover:shadow-md transition-shadow">
            <input type="radio" name="safety-accordion" :checked="idx === 0" />
            <div class="collapse-title text-lg font-bold flex items-center gap-4 py-6 pr-12">
              <span
                class="shrink-0 w-8 h-8 rounded-full bg-base-200 text-sm flex items-center justify-center text-base-content/50 font-mono">
                0{{ idx + 1 }}
              </span>
              {{ tip.title }}
            </div>
            <div class="collapse-content">
              <div class="pl-12 pr-4 pb-6 space-y-2">
                <p v-for="(line, lIdx) in tip.lines" :key="lIdx"
                  class="text-base-content/70 text-sm leading-relaxed flex gap-2">
                  <span class="text-primary mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0 block"></span>
                  <span>{{ line }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const { t } = useAppI18n();

const benefits = computed(() => [
  {
    icon: "heroicons:device-phone-mobile",
    title: t('about_page.benefits.list.mobile.title'),
    desc: t('about_page.benefits.list.mobile.desc')
  },
  {
    icon: "heroicons:lock-closed",
    title: t('about_page.benefits.list.security.title'),
    desc: t('about_page.benefits.list.security.desc')
  },
  {
    icon: "heroicons:finger-print",
    title: t('about_page.benefits.list.control.title'),
    desc: t('about_page.benefits.list.control.desc')
  },
  {
    icon: "heroicons:globe-asia-australia",
    title: t('about_page.benefits.list.global.title'),
    desc: t('about_page.benefits.list.global.desc')
  },
  {
    icon: "heroicons:squares-plus",
    title: t('about_page.benefits.list.ecosystem.title'),
    desc: t('about_page.benefits.list.ecosystem.desc')
  },
  {
    icon: "heroicons:user-circle",
    title: t('about_page.benefits.list.identity.title'),
    desc: t('about_page.benefits.list.identity.desc')
  }
])

const safetyTips = computed(() => [
  {
    title: t('about_page.safety.list.assets.title'),
    lines: [
      t('about_page.safety.list.assets.line1'),
      t('about_page.safety.list.assets.line2'),
      t('about_page.safety.list.assets.line3')
    ]
  },
  {
    title: t('about_page.safety.list.scam.title'),
    lines: [
      t('about_page.safety.list.scam.line1'),
      t('about_page.safety.list.scam.line2'),
      t('about_page.safety.list.scam.line3')
    ]
  },
  {
    title: t('about_page.safety.list.tx.title'),
    lines: [
      t('about_page.safety.list.tx.line1'),
      t('about_page.safety.list.tx.line2'),
      t('about_page.safety.list.tx.line3')
    ]
  },
  {
    title: t('about_page.safety.list.compliance.title'),
    lines: [
      t('about_page.safety.list.compliance.line1'),
      t('about_page.safety.list.compliance.line2'),
      t('about_page.safety.list.compliance.line3')
    ]
  },
  {
    title: t('about_page.safety.list.support.title'),
    lines: [
      t('about_page.safety.list.support.line1'),
      t('about_page.safety.list.support.line2'),
      t('about_page.safety.list.support.line3')
    ]
  }
])
</script>