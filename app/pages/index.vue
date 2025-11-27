<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans transition-colors duration-300 relative">
    <div class="absolute w-screen h-[calc(100vh-200px)] z-1">
      <effect-prism :animation-type="'hover'" :time-scale="0.1" :height="3.6" :base-width="5.5" :scale="1.5"
        :hue-shift="0" :color-frequency="1" :noise="0.5" :glow="1"></effect-prism>
      <!-- <effect-threads :distance="0.3" :amplitude="2"></effect-threads> -->
    </div>
    <section class="relative pt-40 pb-20 md:pt-40 md:pb-32 px-4 z-2">
      <div class="container mx-auto text-center max-w-5xl">
        <div
          class="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base-content/10 bg-base-content/5 mb-8 backdrop-blur-sm">
          <div class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
          <span class="text-xs font-bold tracking-widest uppercase opacity-80">{{ t('hero.subtitle') }}</span>
        </div>
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none mb-8">
          {{ t('hero.title_prefix') }}<span
            class="text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary">{{ t('hero.title_highlight')
            }}</span>
          <br />
          {{ t('hero.title_suffix') }}
        </h1>
        <p class="text-lg md:text-xl text-base-content/60 max-w-3xl mx-auto mb-10 leading-relaxed font-medium">
          {{ t('hero.description') }}
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            class="btn bg-linear-to-r from-primary to-secondary btn-lg rounded-full px-10 min-w-[180px] text-primary-content border-none shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
            {{ t('hero.btn_start') }}
          </button>
          <button
            class="btn btn-ghost btn-lg rounded-full px-10 min-w-[180px] border border-base-content/10 hover:bg-base-content hover:text-base-100">
            {{ t('hero.btn_whitepaper') }}
          </button>
        </div>
      </div>
    </section>
    <div class="border-y border-base-content/5 bg-base-content/2 z-2">
      <div class="container mx-auto px-4 py-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="(stat, index) in stats" :key="index" class="text-center group cursor-default">
            <div class="text-4xl font-black mb-1 tracking-tight group-hover:text-primary transition-colors">
              <effect-decrypted-text :text="stat.value + ''" animate-on="view" characters="1234567890" />
            </div>
            <div class="text-xs font-bold uppercase tracking-widest text-base-content/50">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
    <section class="py-32 px-4">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div class="max-w-xl">
            <h2 class="text-xs font-bold text-primary uppercase tracking-widest mb-3">{{ t('trends.subtitle') }}</h2>
            <h3 class="text-4xl md:text-5xl font-bold tracking-tight">{{ t('trends.title') }}</h3>
          </div>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          <div
            class="md:col-span-2 rounded-[2.5rem] bg-base-200 p-10 relative overflow-hidden group border border-base-content/5 hover:border-primary/30 transition-all duration-500">
            <div class="absolute inset-0 bg-linear-to-br from-base-content/5 to-transparent"></div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-16 h-16 rounded-2xl bg-base-100 flex items-center justify-center shadow-sm text-primary">
                <Icon name="heroicons:circle-stack" class="w-8 h-8" />
              </div>
              <div>
                <h4 class="text-3xl font-bold mb-3">{{ t('trends.assets.title') }}</h4>
                <p class="text-base-content/60 leading-relaxed max-w-lg">
                  {{ t('trends.assets.desc') }}
                </p>
                <div
                  class="mt-6 flex items-center gap-2 text-primary font-bold text-sm cursor-pointer group-hover:translate-x-2 transition-transform">
                  {{ t('trends.read_more') }}
                  <Icon name="heroicons:arrow-long-right" />
                </div>
              </div>
            </div>
          </div>
          <div
            class="rounded-[2.5rem] bg-base-100 p-10 relative overflow-hidden group border border-base-content/5 hover:border-secondary/30 transition-all duration-500 shadow-sm">
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center text-secondary">
                <Icon name="heroicons:chart-bar-square" class="w-8 h-8" />
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
            class="rounded-[2.5rem] bg-base-100 p-10 relative overflow-hidden group border border-base-content/5 hover:border-accent/30 transition-all duration-500 shadow-sm">
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div class="w-16 h-16 rounded-2xl bg-base-200 flex items-center justify-center text-accent">
                <Icon name="heroicons:user-group" class="w-8 h-8" />
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
            class="md:col-span-2 rounded-[2.5rem] bg-neutral text-neutral-content p-10 relative overflow-hidden group">
            <div class="absolute -right-10 -top-10 opacity-10 rotate-12">
              <Icon name="heroicons:finger-print" size="300" />
            </div>
            <div class="relative z-10 h-full flex flex-col justify-between">
              <div
                class="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md text-white">
                <Icon name="heroicons:shield-check" class="w-8 h-8" />
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
    <section class="py-32 px-4 bg-base-200/50">
      <div class="container mx-auto max-w-6xl">
        <div class="text-center mb-20 max-w-2xl mx-auto">
          <h2 class="text-4xl font-bold mb-6">{{ t('features.title') }}</h2>
          <p class="text-base-content/60 text-lg">
            {{ t('features.subtitle') }}
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="(feature, i) in features" :key="i"
            class="group p-8 rounded-3xl bg-base-100 border border-base-content/5 hover:border-primary/20 hover:shadow-xl transition-all duration-300">
            <div
              class="w-14 h-14 rounded-2xl bg-base-200 group-hover:bg-primary group-hover:text-primary-content flex items-center justify-center mb-6 text-primary transition-colors">
              <Icon :name="feature.icon" size="28" />
            </div>
            <h4 class="font-bold text-xl mb-3">{{ feature.title }}</h4>
            <p class="text-base-content/60 text-sm leading-relaxed">{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 px-4 overflow-hidden">
      <div class="container mx-auto max-w-6xl">
        <div class="flex flex-col lg:flex-row items-center gap-24">
          <div class="lg:w-1/2 w-full">
            <div
              class="relative mx-auto max-w-sm aspect-3/4 rounded-[3rem] bg-base-100 border border-base-content/5 shadow-2xl p-8 flex flex-col transform -rotate-2r:rotate-0 transition-transform duration-500">
              <div
                class="absolute inset-0 bg-linear-to-b from-base-content/5 to-transparent rounded-[3rem] pointer-events-none">
              </div>

              <div class="flex justify-between items-center mb-12 relative z-10">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-full bg-base-200 flex items-center justify-center text-primary">
                    <Icon name="ph:shield-check-fill" size="20" />
                  </div>
                  <span class="font-bold tracking-tight">LIFE Guard</span>
                </div>
                <div
                  class="px-2 py-1 rounded-full bg-green-500/10 text-green-600 text-xs font-bold flex items-center gap-1">
                  <div class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div> {{ t('app.secure_status') }}
                </div>
              </div>
              <div class="relative z-10 mb-auto">
                <div class="text-sm text-base-content/50 font-medium mb-2">{{ t('app.points_label_en') }}</div>
                <div class="text-5xl font-mono font-bold tracking-tighter mb-4">8,592<span
                    class="text-2xl text-base-content/40">.00</span></div>
                <div
                  class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold">
                  <Icon name="heroicons:trophy" size="14" />
                  <span>{{ t('app.points_label') }}</span>
                </div>
              </div>
              <div class="space-y-3 relative z-10 mt-8">
                <div class="p-4 rounded-2xl bg-base-200/50 flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center">
                    <Icon name="heroicons:document-text" />
                  </div>
                  <div>
                    <div class="font-bold text-sm">{{ t('app.card_id') }}</div>
                    <div class="text-xs text-base-content/50">{{ t('app.card_id_status') }}</div>
                  </div>
                </div>
                <div class="p-4 rounded-2xl bg-base-200/50 flex items-center gap-4">
                  <div class="w-10 h-10 rounded-full bg-base-100 flex items-center justify-center">
                    <Icon name="heroicons:chart-pie" />
                  </div>
                  <div>
                    <div class="font-bold text-sm">{{ t('app.card_health') }}</div>
                    <div class="text-xs text-base-content/50">{{ t('app.card_health_status') }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="lg:w-1/2">
            <h2 class="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {{ t('app.title_prefix') }}
              <br />
              <span class="text-primary">{{ t('app.title_highlight') }}</span>
            </h2>
            <p class="text-lg text-base-content/60 mb-10 leading-relaxed max-w-md">
              {{ t('app.description') }}
            </p>
            <div class="space-y-8">
              <div class="flex gap-6 group">
                <div
                  class="shrink-0 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                  <Icon name="heroicons:server-stack" size="24" />
                </div>
                <div>
                  <h5 class="text-xl font-bold mb-2">{{ t('app.feature_control_title') }}</h5>
                  <p class="text-base-content/60 text-sm">{{ t('app.feature_control_desc') }}</p>
                </div>
              </div>
              <div class="flex gap-6 group">
                <div
                  class="shrink-0 w-12 h-12 rounded-full bg-base-200 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-content transition-colors">
                  <Icon name="heroicons:check-badge" size="24" />
                </div>
                <div>
                  <h5 class="text-xl font-bold mb-2">{{ t('app.feature_compliance_title') }}</h5>
                  <p class="text-base-content/60 text-sm">{{ t('app.feature_compliance_desc') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="py-32 px-4 bg-base-200/30">
      <div class="container mx-auto max-w-3xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold mb-4">{{ t('faq.title') }}</h2>
          <p class="text-base-content/60">{{ t('faq.subtitle') }}</p>
        </div>
        <div class="join join-vertical w-full bg-base-100 border border-base-content/10 rounded-2xl overflow-hidden">
          <div v-for="(faq, idx) in faqs" :key="idx"
            class="collapse collapse-arrow join-item border-b border-base-content/5 last:border-none">
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
    <section class="py-40 px-4 text-center overflow-hidden relative">
      <div class="absolute inset-0 bg-linear-to-t from-base-content/5 to-transparent pointer-events-none"></div>
      <div class="container mx-auto relative z-10">
        <h2 class="text-6xl md:text-9xl font-black mb-8 tracking-tighter opacity-5 select-none text-base-content">
          DIGITAL
        </h2>
        <div class="-mt-12 relative z-10">
          <h3 class="text-3xl md:text-5xl font-bold mb-10">{{ t('cta.title') }}</h3>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              class="btn btn-primary btn-lg rounded-full px-12 min-w-[200px] text-primary-content shadow-lg shadow-primary/20">
              {{ t('cta.btn_download') }}
            </button>
            <button
              class="btn btn-outline btn-lg rounded-full px-12 min-w-[200px] border-base-content/20 hover:bg-base-content hover:text-base-100">
              {{ t('cta.btn_contact') }}
            </button>
          </div>
          <p class="mt-8 text-sm text-base-content/40">
            {{ t('cta.disclaimer') }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { type StatsResponse } from '~/api/system'
import { computed } from 'vue';
const { t } = useAppI18n();
const statsData = ref<StatsResponse>()
onMounted(() => {
  initData();
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
</script>