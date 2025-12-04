<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, nextTick } from 'vue'

const { t } = useAppI18n()
const activeSection = ref('')
const observer = ref<IntersectionObserver | null>(null)
const teamContainer = ref<HTMLElement | null>(null)
const isDown = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)

const sections = computed(() => [
  { id: 'executive', title: t('wp.sections.executive') },
  { id: 'intro', title: t('wp.sections.intro') },
  { id: 'solution', title: t('wp.sections.solution') },
  { id: 'architecture', title: t('wp.sections.architecture') },
  { id: 'product', title: t('wp.sections.product') },
  { id: 'incentives', title: t('wp.sections.incentives') },
  { id: 'community', title: t('wp.sections.community') },
  { id: 'roadmap', title: t('wp.sections.roadmap') },
  { id: 'team', title: t('wp.sections.team') },
  { id: 'market', title: t('wp.sections.market') },
  { id: 'risks', title: t('wp.sections.risks') },
  { id: 'conclusion', title: t('wp.sections.conclusion') }
])

const teamMembers = computed(() => [
  { id: 'flying_bear', name: 'Flying Bear', role: t('wp.team.role_ceo'), desc: t('wp.team.desc_ceo') },
  { id: 'original_spirit', name: 'Original Spirit', role: t('wp.team.role_tm'), desc: t('wp.team.desc_tm') },
  { id: 'seventy_seven', name: 'Seventy-seven', role: t('wp.team.role_sde'), desc: t('wp.team.desc_sde') },
  { id: 'brock', name: 'Brock', role: t('wp.team.role_ede'), desc: t('wp.team.desc_ede') },
  { id: 'skye', name: 'Skye', role: t('wp.team.role_ux'), desc: t('wp.team.desc_ux') },
  { id: 'vic', name: 'Vic', role: t('wp.team.role_fs'), desc: t('wp.team.desc_fs') },
  { id: 'neo', name: 'Neo', role: t('wp.team.role_bde'), desc: t('wp.team.desc_bde') },
  { id: 'k1lo', name: 'K1lo', role: t('wp.team.role_bpm'), desc: t('wp.team.desc_bpm') },
  { id: 'well', name: 'Well', role: t('wp.team.role_qa'), desc: t('wp.team.desc_qa') },
  { id: 'oliver', name: 'Oliver', role: t('wp.team.role_sec'), desc: t('wp.team.desc_sec') }
])

const scrollTo = (id: string) => {
  const el = document.getElementById(id)
  if (el) {
    const offset = 100
    const bodyRect = document.body.getBoundingClientRect().top
    const elementRect = el.getBoundingClientRect().top
    const elementPosition = elementRect - bodyRect
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
    activeSection.value = id
  }
}

const scrollTeam = (direction: 'left' | 'right') => {
  if (teamContainer.value) {
    const scrollAmount = 320
    teamContainer.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

const startDrag = (e: MouseEvent) => {
  if (!teamContainer.value) return
  isDown.value = true
  teamContainer.value.classList.add('cursor-grabbing')
  teamContainer.value.classList.remove('cursor-grab')
  startX.value = e.pageX - teamContainer.value.offsetLeft
  scrollLeft.value = teamContainer.value.scrollLeft
}

const stopDrag = () => {
  if (!teamContainer.value) return
  isDown.value = false
  teamContainer.value.classList.remove('cursor-grabbing')
  teamContainer.value.classList.add('cursor-grab')
}

const doDrag = (e: MouseEvent) => {
  if (!isDown.value || !teamContainer.value) return
  e.preventDefault()
  const x = e.pageX - teamContainer.value.offsetLeft
  const walk = (x - startX.value) * 2
  teamContainer.value.scrollLeft = scrollLeft.value - walk
}

onMounted(() => {
  nextTick(() => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          activeSection.value = entry.target.id
        }
      })
    }, { rootMargin: '-20% 0px -50% 0px' })

    sections.value.forEach((section) => {
      const el = document.getElementById(section.id)
      if (el) observer.value?.observe(el)
    })
  })
})

onUnmounted(() => {
  if (observer.value) observer.value.disconnect()
})
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content font-sans scroll-smooth transition-colors duration-300">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl py-12">
      <div class="flex flex-col lg:flex-row gap-12">
        <aside class="hidden lg:block w-64 shrink-0">
          <div class="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4 custom-scrollbar">
            <nav class="space-y-1 border-l-2 border-base-200">
              <a v-for="item in sections" :key="item.id" @click.prevent="scrollTo(item.id)"
                :class="activeSection === item.id ? 'border-primary text-primary font-bold bg-primary/5' : 'border-transparent text-base-content/60 hover:text-base-content hover:bg-base-200'"
                class="block pl-4 py-2.5 text-sm border-l-2 cursor-pointer transition-all duration-200 rounded-r-md">
                {{ item.title }}
              </a>
            </nav>
          </div>
        </aside>
        <main class="flex-1 min-w-0">
          <article
            class="prose prose-base sm:prose-lg max-w-none prose-headings:text-base-content prose-p:text-base-content/80 prose-strong:text-base-content prose-li:text-base-content/80">
            <header class="mb-12 not-prose border-b border-base-200 pb-8">
              <div class="flex items-center gap-2 text-sm text-base-content/50 font-mono mb-3">
                <span class="badge badge-outline badge-sm">{{ t('wp.meta.version') }}</span>
                <span>{{ t('wp.meta.date') }}</span>
              </div>
              <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-base-content mb-6">
                LifeChain <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">{{
                  t('wp.title_suffix') }}</span>
              </h1>
              <p class="text-xl text-base-content/70 leading-relaxed font-light">
                {{ t('wp.subtitle') }}
              </p>
            </header>
            <div
              class="alert bg-base-200/40 border-l-4 border-warning rounded-r-lg shadow-sm mb-12 text-sm not-prose backdrop-blur-sm">
              <div class="w-full">
                <h3 class="font-bold uppercase tracking-wide opacity-80 mb-2 flex items-center gap-2">
                  <Icon name="mingcute:warning-line" class="w-5 h-5" />
                  {{ t('wp.disclaimer.title') }}
                </h3>
                <div class="opacity-80 leading-relaxed text-justify">{{ t('wp.disclaimer.content') }}</div>
              </div>
            </div>

            <section id="executive" class="scroll-mt-24">
              <h2>1. {{ t('wp.sections.executive') }}</h2>
              <p>{{ t('wp.content.exec_p1') }}</p>
              <p>{{ t('wp.content.exec_p2') }}</p>
              <p>{{ t('wp.content.exec_p3') }}</p>
            </section>

            <section id="intro" class="scroll-mt-24">
              <h2>2. {{ t('wp.sections.intro') }}</h2>
              <p class="font-medium text-lg">{{ t('wp.content.intro_lead') }}</p>
              <div class="grid gap-4 not-prose my-6">
                <div v-for="i in 5" :key="i"
                  class="flex gap-4 p-4 rounded-xl bg-base-200/30 hover:bg-base-200 transition-colors duration-200">
                  <div
                    class="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0 text-primary font-bold text-sm">
                    {{ i }}</div>
                  <div>
                    <strong class="block text-base-content mb-1">{{ t(`wp.content.intro_p${i}_t`) }}</strong>
                    <span class="text-sm text-base-content/70">{{ t(`wp.content.intro_p${i}_d`) }}</span>
                  </div>
                </div>
              </div>
            </section>

            <section id="solution" class="scroll-mt-24">
              <h2>3. {{ t('wp.sections.solution') }}</h2>
              <div class="grid sm:grid-cols-2 gap-5 not-prose my-6">
                <div v-for="i in 6" :key="i"
                  class="card bg-base-100 border border-base-200 hover:border-primary/50 hover:shadow-md transition-all duration-300">
                  <div class="card-body p-5">
                    <h4 class="card-title text-base font-bold text-primary">{{ t(`wp.content.sol_p${i}_t`) }}</h4>
                    <p class="text-sm text-base-content/70 mt-1 leading-relaxed">{{ t(`wp.content.sol_p${i}_d`) }}</p>
                  </div>
                </div>
              </div>
            </section>

            <section id="architecture" class="scroll-mt-24">
              <h2>4. {{ t('wp.sections.architecture') }}</h2>
              <h3>4.1 {{ t('wp.content.arch_net_title') }}</h3>
              <ul class="list-none pl-0 space-y-2">
                <li class="flex items-start gap-2">
                  <Icon name="mingcute:check-circle-line" class="w-5 h-5 text-success shrink-0 mt-1" />
                  <span><strong>{{ t('wp.content.arch_net_1_t') }}:</strong> {{ t('wp.content.arch_net_1_d') }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon name="mingcute:check-circle-line" class="w-5 h-5 text-success shrink-0 mt-1" />
                  <span><strong>{{ t('wp.content.arch_net_2_t') }}:</strong> {{ t('wp.content.arch_net_2_d') }}</span>
                </li>
                <li class="flex items-start gap-2">
                  <Icon name="mingcute:check-circle-line" class="w-5 h-5 text-success shrink-0 mt-1" />
                  <span><strong>{{ t('wp.content.arch_net_3_t') }}:</strong> {{ t('wp.content.arch_net_3_d') }}</span>
                </li>
              </ul>

              <h3>4.2 {{ t('wp.content.arch_sec_title') }}</h3>
              <p>{{ t('wp.content.arch_sec_intro') }}</p>
              <div class="bg-base-200/50 p-6 rounded-xl not-prose border border-base-300">
                <ul class="grid sm:grid-cols-2 gap-4">
                  <li v-for="i in 5" :key="i" class="flex gap-2">
                    <div class="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></div>
                    <div>
                      <strong class="block text-sm text-base-content">{{ t(`wp.content.arch_sec_${i}_t`) }}</strong>
                      <span class="text-xs text-base-content/60">{{ t(`wp.content.arch_sec_${i}_d`) }}</span>
                    </div>
                  </li>
                </ul>
              </div>

              <h3>4.3 {{ t('wp.content.arch_priv_title') }}</h3>
              <p>{{ t('wp.content.arch_priv_desc') }}</p>
            </section>

            <section id="product" class="scroll-mt-24">
              <h2>5. {{ t('wp.sections.product') }}</h2>
              <h3>5.1 Watch H</h3>
              <div
                class="card bg-gradient-to-br from-base-200 to-base-100 border border-base-300 not-prose mb-8 shadow-sm">
                <div class="card-body p-6 sm:p-8">
                  <div class="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 class="flex items-center gap-2 font-bold text-lg mb-4 text-primary">
                        <Icon name="mingcute:fitness-line" />
                        {{ t('wp.content.prod_hw_1') }}
                      </h4>
                      <ul class="space-y-2 text-sm text-base-content/80">
                        <li class="flex items-center gap-2">
                          <Icon name="mingcute:check-line" class="text-success w-4 h-4" /> {{
                            t('wp.content.prod_hw_1_1') }}
                        </li>
                        <li class="flex items-center gap-2">
                          <Icon name="mingcute:check-line" class="text-success w-4 h-4" /> {{
                            t('wp.content.prod_hw_1_2') }}
                        </li>
                        <li class="flex items-center gap-2">
                          <Icon name="mingcute:check-line" class="text-success w-4 h-4" /> {{
                            t('wp.content.prod_hw_1_3') }}
                        </li>
                        <li class="flex items-center gap-2">
                          <Icon name="mingcute:check-line" class="text-success w-4 h-4" /> {{
                            t('wp.content.prod_hw_1_4') }}
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 class="flex items-center gap-2 font-bold text-lg mb-4 text-secondary">
                        <Icon name="mingcute:shield-line" />
                        {{ t('wp.content.prod_hw_2') }}
                      </h4>
                      <ul class="space-y-2 text-sm text-base-content/80">
                        <li class="flex items-center gap-2">
                          <Icon name="mingcute:check-line" class="text-success w-4 h-4" /> {{
                            t('wp.content.prod_hw_2_1') }}
                        </li>
                        <li class="flex items-center gap-2">
                          <Icon name="mingcute:check-line" class="text-success w-4 h-4" /> {{
                            t('wp.content.prod_hw_2_2') }}
                        </li>
                        <li class="flex items-center gap-2">
                          <Icon name="mingcute:check-line" class="text-success w-4 h-4" /> {{
                            t('wp.content.prod_hw_2_3') }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <h3>5.2 LifeChain App</h3>
              <p>{{ t('wp.content.prod_app_desc') }}</p>
              <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 not-prose mt-4">
                <div v-for="i in 5" :key="i"
                  class="p-3 bg-base-200/50 rounded-lg text-center hover:bg-base-200 transition-colors">
                  <div class="font-bold text-xs sm:text-sm mb-1">{{ t(`wp.content.prod_app_${i}_t`) }}</div>
                  <div class="text-[10px] sm:text-xs opacity-60 leading-tight">{{ t(`wp.content.prod_app_${i}_d`) }}
                  </div>
                </div>
              </div>
            </section>

            <section id="incentives" class="scroll-mt-24">
              <h2>6. {{ t('wp.sections.incentives') }}</h2>
              <div class="flex flex-col sm:flex-row gap-4 not-prose mb-8">
                <div class="stats shadow flex-1 bg-base-100 border border-base-200">
                  <div class="stat place-items-center">
                    <div class="stat-title uppercase text-xs font-bold tracking-wider opacity-60">{{
                      t('wp.content.eco_name_l') }}</div>
                    <div class="stat-value text-primary text-3xl mt-1">{{ t('wp.content.eco_name_v') }}</div>
                  </div>
                </div>
                <div class="stats shadow flex-1 bg-base-100 border border-base-200">
                  <div class="stat place-items-center">
                    <div class="stat-title uppercase text-xs font-bold tracking-wider opacity-60">{{
                      t('wp.content.eco_cap_l') }}</div>
                    <div class="stat-value text-secondary text-3xl mt-1">{{ t('wp.content.eco_cap_v') }}</div>
                  </div>
                </div>
              </div>
              <p>{{ t('wp.content.eco_intro') }}</p>

              <div class="overflow-x-auto not-prose border border-base-300 rounded-xl shadow-sm bg-base-100 my-8">
                <table class="table w-full">
                  <thead class="bg-base-200/50">
                    <tr>
                      <th class="font-bold uppercase text-xs tracking-wider">{{ t('wp.content.eco_tb_c1') }}</th>
                      <th class="font-bold uppercase text-xs tracking-wider">{{ t('wp.content.eco_tb_c2') }}</th>
                      <th class="font-bold uppercase text-xs tracking-wider">{{ t('wp.content.eco_tb_c3') }}</th>
                    </tr>
                  </thead>
                  <tbody class="text-sm">
                    <tr v-for="i in 5" :key="i"
                      class="hover:bg-base-50 transition-colors border-b border-base-200 last:border-none">
                      <td class="font-bold text-base-content/90">{{ t(`wp.content.eco_r${i}_c1`) }}</td>
                      <td class="font-mono text-primary">{{ t(`wp.content.eco_r${i}_c2`) }}</td>
                      <td class="text-base-content/70">{{ t(`wp.content.eco_r${i}_c3`) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <h3>{{ t('wp.content.eco_mech_title') }}</h3>
              <p>{{ t('wp.content.eco_mech_desc') }}</p>

              <h3>{{ t('wp.content.eco_opt_title') }}</h3>
              <p>{{ t('wp.content.eco_opt_desc') }}</p>
            </section>

            <section id="community" class="scroll-mt-24">
              <h2>7. {{ t('wp.sections.community') }}</h2>
              <div class="bg-base-200/30 p-6 rounded-xl border border-base-200">
                <p class="m-0 font-medium leading-relaxed">{{ t('wp.content.gov_desc') }}</p>
              </div>
            </section>

            <section id="roadmap" class="scroll-mt-24">
              <h2>8. {{ t('wp.sections.roadmap') }}</h2>
              <div
                class="not-prose relative space-y-8 pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-base-300">
                <div v-for="i in 4" :key="i" class="relative group">
                  <div
                    class="absolute -left-[29px] top-1.5 h-6 w-6 rounded-full bg-base-100 border-4 border-base-300 group-hover:border-primary group-hover:scale-110 transition-all duration-300 z-10">
                  </div>
                  <div
                    class="bg-base-100 border border-base-200 p-5 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                    <h4 class="font-bold text-lg text-primary mb-1">{{ t(`wp.content.road_p${i}_t`) }}</h4>
                    <div class="text-xs font-bold uppercase tracking-wide opacity-50 mb-3">{{
                      t(`wp.content.road_p${i}_d`) }}</div>
                    <ul class="space-y-1.5">
                      <li v-for="(item, k) in 3" :key="k" class="text-sm flex items-start gap-2 opacity-80">
                        <span class="w-1.5 h-1.5 rounded-full bg-base-content/40 mt-1.5 shrink-0"></span>
                        {{ t(`wp.content.road_p${i}_l${k + 1}`) }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            <section id="team" class="scroll-mt-24">
              <h2>9. {{ t('wp.sections.team') }}</h2>

              <div class="relative group not-prose mb-12" @mouseleave="stopDrag" @mouseup="stopDrag">
                <!-- Navigation Buttons -->
                <div
                  class="absolute left-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button @click="scrollTeam('left')"
                    class="btn btn-circle btn-primary shadow-lg border-none bg-primary/90 hover:bg-primary text-white">
                    <Icon name="mingcute:left-line" class="w-6 h-6" />
                  </button>
                </div>
                <div
                  class="absolute right-2 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button @click="scrollTeam('right')"
                    class="btn btn-circle btn-primary shadow-lg border-none bg-primary/90 hover:bg-primary text-white">
                    <Icon name="mingcute:right-line" class="w-6 h-6" />
                  </button>
                </div>

                <!-- Carousel Container -->
                <div ref="teamContainer"
                  class="flex overflow-x-auto gap-5 pb-6 pt-2 px-1 cursor-grab active:cursor-grabbing scrollbar-hide snap-x snap-mandatory"
                  @mousedown="startDrag" @mousemove="doDrag">
                  <div v-for="member in teamMembers" :key="member.id" class="flex-none w-80 snap-center">
                    <div
                      class="card bg-base-100 shadow-md hover:shadow-xl border border-base-200 h-full transition-all duration-300">
                      <div class="card-body p-6">
                        <div class="flex items-center gap-4 mb-4">
                          <div class="avatar placeholder">
                            <div
                              class="bg-primary text-primary-content rounded-xl w-12 h-12 shadow-inner flex items-center justify-center">
                              <span class="text-xl font-black">{{ member.name.charAt(0) }}</span>
                            </div>
                          </div>
                          <div>
                            <h3 class="card-title text-lg leading-tight">{{ member.name }}</h3>
                            <div class="text-xs font-bold text-primary uppercase tracking-wider mt-0.5">{{ member.role
                              }}</div>
                          </div>
                        </div>
                        <p class="text-sm opacity-70 leading-relaxed">{{ member.desc }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <h3>{{ t('wp.content.advisor_title') }}</h3>
              <div class="grid sm:grid-cols-2 gap-6 not-prose">
                <div v-for="i in 2" :key="i"
                  class="p-6 bg-base-100 rounded-xl border border-base-200 shadow-sm flex gap-4 items-start hover:border-primary/30 transition-colors">
                  <div
                    class="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                    <Icon name="mingcute:user-star-line" class="w-5 h-5" />
                  </div>
                  <div>
                    <div class="font-bold text-lg mb-1">{{ t(`wp.content.adv_${i}_n`) }}</div>
                    <div class="text-sm text-base-content/70 leading-relaxed">{{ t(`wp.content.adv_${i}_d`) }}</div>
                  </div>
                </div>
              </div>
            </section>

            <section id="market" class="scroll-mt-24">
              <h2>10. {{ t('wp.sections.market') }}</h2>
              <p>{{ t('wp.content.mkt_desc') }}</p>
              <h3>{{ t('wp.content.mkt_adv_t') }}</h3>
              <div class="not-prose grid gap-4">
                <div v-for="i in 5" :key="i" class="p-4 rounded-lg border border-base-200 bg-base-100">
                  <strong class="text-primary block mb-1">{{ t(`wp.content.mkt_p${i}_t`) }}</strong>
                  <span class="text-sm opacity-80">{{ t(`wp.content.mkt_p${i}_d`) }}</span>
                </div>
              </div>
            </section>

            <section id="risks" class="scroll-mt-24">
              <h2>11. {{ t('wp.sections.risks') }}</h2>
              <div class="overflow-x-auto not-prose border border-base-300 rounded-xl shadow-sm bg-base-100">
                <table class="table w-full text-sm">
                  <thead class="bg-base-200/50">
                    <tr>
                      <th class="font-bold">{{ t('wp.content.risk_c1') }}</th>
                      <th class="font-bold">{{ t('wp.content.risk_c2') }}</th>
                      <th class="font-bold">{{ t('wp.content.risk_c3') }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="i in 5" :key="i" class="border-b border-base-200 last:border-none">
                      <td class="font-bold text-primary">{{ t(`wp.content.risk_r${i}_c1`) }}</td>
                      <td class="font-medium">{{ t(`wp.content.risk_r${i}_c2`) }}</td>
                      <td class="text-base-content/70">{{ t(`wp.content.risk_r${i}_c3`) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section id="conclusion" class="scroll-mt-24">
              <h2>12. {{ t('wp.sections.conclusion') }}</h2>
              <p class="text-lg leading-relaxed">{{ t('wp.content.conc_p1') }}</p>
              <p class="text-lg leading-relaxed">{{ t('wp.content.conc_p2') }}</p>
              <div
                class="not-prose mt-12 p-10 bg-gradient-to-br from-base-200 to-base-100 rounded-3xl border border-base-300 text-center shadow-lg">
                <Icon name="mingcute:rocket-line" class="w-12 h-12 text-primary mx-auto mb-4 animate-bounce" />
                <h3 class="text-2xl font-black mb-6">{{ t('wp.content.cta_t') }}</h3>
                <div class="grid sm:grid-cols-3 gap-4 mb-8 text-sm font-medium opacity-80 max-w-2xl mx-auto">
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">1</div>
                    {{ t('wp.content.cta_l1') }}
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">2</div>
                    {{ t('wp.content.cta_l2') }}
                  </div>
                  <div class="flex flex-col items-center gap-2">
                    <div class="w-8 h-8 rounded-full bg-base-300 flex items-center justify-center">3</div>
                    {{ t('wp.content.cta_l3') }}
                  </div>
                </div>
                <a href="https://life.voto/" target="_blank"
                  class="btn btn-primary btn-lg rounded-full px-10 shadow-xl hover:scale-105 transition-transform">
                  {{ t('wp.content.btn_web') }}
                </a>
              </div>
            </section>

          </article>
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: currentColor;
  opacity: 0.1;
  border-radius: 20px;
}

.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>


<i18n lang="json">{
  "en": {
    "wp": {
      "meta": {
        "version": "Version 2.1",
        "date": "Release Date: 2025-09-01"
      },
      "title_suffix": "Whitepaper",
      "subtitle": "Leading the Future of Digital Lifestyle: A Social Health Ecosystem Based on Trusted Networks.",
      "disclaimer": {
        "title": "Product Introduction & Disclaimer",
        "content": "This document presents the technical vision and roadmap of the LifeChain project. It is for informational purposes only and does not constitute financial advice, investment offers, or guarantees. The points mentioned are internal utility credits and have no monetary value."
      },
      "sections": {
        "executive": "Executive Summary",
        "intro": "Introduction",
        "solution": "Solution Overview",
        "architecture": "Technical Architecture",
        "product": "Product Components",
        "incentives": "Ecosystem Incentives",
        "community": "Community Governance",
        "roadmap": "Roadmap",
        "team": "Team & Advisors",
        "market": "Market Analysis",
        "risks": "Risk Mitigation",
        "conclusion": "Conclusion"
      },
      "team": {
        "role_ceo": "CEO",
        "desc_ceo": "Co-founder & CEO. 15 years in internet industry, focusing on data accumulation and AI technology.",
        "role_tm": "Tech Manager",
        "desc_tm": "8 years dev experience. Skilled in team management and technical architecture design.",
        "role_sde": "Senior Dev",
        "desc_sde": "Backend specialist. Builds efficient server-side architectures using Node.js/Java/Go.",
        "role_ede": "Exchange Dev",
        "desc_ede": "Responsible for the design of exchange-related systems, focusing on matching engines, risk control, and highly available architectures.",
        "role_ux": "UI/UX Designer",
        "desc_ux": "Rich experience in user experience design for large-scale project interfaces.",
        "role_fs": "Senior Dev",
        "desc_fs": "Full-stack developer (6 years). Skilled in Vue.js, Java, Node.js stacks.",
        "role_bde": "Chain Dev",
        "desc_bde": "Focuses on on-chain development, responsible for the design, development and deployment of smart contracts.",
        "role_bpm": "Chain PM",
        "desc_bpm": "Responsible for blockchain project management and cross-team coordination, driving high-quality on-time delivery.",
        "role_qa": "Test Engineer",
        "desc_qa": "Ensures product quality and stability through rigorous test planning.",
        "role_sec": "Security Eng",
        "desc_sec": "Focuses on network/app security, penetration testing, and defense architecture."
      },
      "content": {
        "exec_p1": "LifeChain drives a paradigm shift in health data ownership. By integrating secure networks, AI, and smart wearables, we build an inclusive digital ecosystem.",
        "exec_p2": "The system includes a high-performance network, the Watch H with hardware security, and immersive social apps. Health data is authenticated at the source.",
        "exec_p3": "Users earn 'LIF Credits' by recording healthy behaviors. These credits are used within the ecosystem for services and data insights, fostering a green, smart lifestyle.",
        "intro_lead": "The Value Dilemma of Health Data:",
        "intro_p1_t": "Data Silos",
        "intro_p1_d": "Users cannot effectively access or utilize their data.",
        "intro_p2_t": "Trust Deficit",
        "intro_p2_d": "Traditional incentives are prone to data inconsistencies.",
        "intro_p3_t": "Sustainability",
        "intro_p3_d": "Many models lack intrinsic utility cycles.",
        "intro_p4_t": "Fragmentation",
        "intro_p4_d": "Hardware and social platforms remain disconnected.",
        "intro_p5_t": "Security",
        "intro_p5_d": "Lack of hardware-level protection for digital rights.",
        "sol_p1_t": "Trusted Source Data",
        "sol_p1_d": "Watch H signs data at generation, ensuring authenticity.",
        "sol_p2_t": "Incentive Distribution",
        "sol_p2_d": "Automated protocols reward health recording with credits.",
        "sol_p3_t": "Service Exchange",
        "sol_p3_d": "Users exchange anonymized data insights for service benefits.",
        "sol_p4_t": "Social Health",
        "sol_p4_d": "Integrating health challenges with community interaction.",
        "sol_p5_t": "Rights Security",
        "sol_p5_d": "Hardware environments protect digital identities and credits.",
        "sol_p6_t": "Green Lifestyle",
        "sol_p6_d": "Low-power networks support carbon-neutral goals.",
        "arch_net_title": "LifeChain Network",
        "arch_net_1_t": "Consensus",
        "arch_net_1_d": "Efficient DPoS mechanism for energy saving.",
        "arch_net_2_t": "Performance",
        "arch_net_2_d": "High throughput for real-time wearable data.",
        "arch_net_3_t": "Compatibility",
        "arch_net_3_d": "Supports standard data interfaces and privacy computation.",
        "arch_sec_title": "Trusted Core: Watch H",
        "arch_sec_intro": "Adopts advanced cryptography standards.",
        "arch_sec_1_t": "Secure Element",
        "arch_sec_1_d": "Certified isolated environment.",
        "arch_sec_2_t": "Self-Custody",
        "arch_sec_2_d": "Keys never leave the chip.",
        "arch_sec_3_t": "Secure Signing",
        "arch_sec_3_d": "Hardware-verified operation confirmations.",
        "arch_sec_4_t": "Multi-Credential",
        "arch_sec_4_d": "Supports various digital certificates.",
        "arch_sec_5_t": "Digital Identity",
        "arch_sec_5_d": "Chip-based DID for secure login.",
        "arch_priv_title": "Privacy Mechanism",
        "arch_priv_desc": "Uses local computation and zero-knowledge proofs to verify health outcomes without exposing raw data, complying with global privacy regulations.",
        "prod_hw_1": "Health Monitoring",
        "prod_hw_1_1": "High-precision optical heart rate",
        "prod_hw_1_2": "SpO2 & HRV analysis",
        "prod_hw_1_3": "Sleep cycle tracking",
        "prod_hw_1_4": "Low-power sensors",
        "prod_hw_2": "Digital Security",
        "prod_hw_2_1": "Built-in Security Module",
        "prod_hw_2_2": "Encrypted NFC",
        "prod_hw_2_3": "Light node synchronization",
        "prod_app_desc": "The interaction hub of the ecosystem.",
        "prod_app_1_t": "Dashboard",
        "prod_app_1_d": "Visualize health data and credit balance.",
        "prod_app_2_t": "Social Hub",
        "prod_app_2_d": "Join clubs and health challenges.",
        "prod_app_3_t": "Service Market",
        "prod_app_3_d": "Redeem credits for insights or services.",
        "prod_app_4_t": "Rights Interface",
        "prod_app_4_d": "Manage digital rights and badges.",
        "prod_app_5_t": "Governance",
        "prod_app_5_d": "Vote on community proposals.",
        "eco_name_l": "Unit Name",
        "eco_name_v": "LIF Credits",
        "eco_cap_l": "Supply Mechanism",
        "eco_cap_v": "Dynamic Generation",
        "eco_intro": "Credits are non-financial utility points used to measure contribution.",
        "eco_tb_c1": "Category",
        "eco_tb_c2": "Allocation",
        "eco_tb_c3": "Generation Rule",
        "eco_r1_c1": "Activity Recording",
        "eco_r1_c2": "80%",
        "eco_r1_c3": "Generated via daily health tasks over ~100 years.",
        "eco_r2_c1": "Ecosystem Reserve",
        "eco_r2_c2": "10%",
        "eco_r2_c3": "Linear generation over 48 months for partnerships.",
        "eco_r3_c1": "Marketing",
        "eco_r3_c2": "4.76%",
        "eco_r3_c3": "Community incentives and awareness grants.",
        "eco_r4_c1": "Early Contributor",
        "eco_r4_c2": "3.81%",
        "eco_r4_c3": "One-time grant for beta testers.",
        "eco_r5_c1": "Team",
        "eco_r5_c2": "1.43%",
        "eco_r5_c3": "Long-term vesting for development stability.",
        "eco_mech_title": "Acquisition Mechanism",
        "eco_mech_desc": "Credits are obtained by wearing Watch H (Proof of Activity). Commitment to daily goals increases acquisition rate.",
        "eco_opt_title": "Ecosystem Cycle",
        "eco_opt_desc": "Used credits are processed for invalidation within the system to ensure service balance.",
        "gov_desc": "LifeChain moves towards Community Co-governance. Users with sufficient contribution credits can propose and vote on ecosystem parameters and upgrades.",
        "road_p1_t": "Phase 1: Foundation",
        "road_p1_d": "2023 Q4 - 2024 Q2",
        "road_p1_l1": "Network internal testing",
        "road_p1_l2": "Watch H prototype verification",
        "road_p1_l3": "App MVP development",
        "road_p2_t": "Phase 2: Growth",
        "road_p2_d": "2025 Q2 - 2025 Q4",
        "road_p2_l1": "Network service launch",
        "road_p2_l2": "First batch Watch H distribution",
        "road_p2_l3": "App launch with hybrid services",
        "road_p3_t": "Phase 3: Expansion",
        "road_p3_d": "2025 Q4 - 2026 Q1",
        "road_p3_l1": "Developer SDK release",
        "road_p3_l2": "University data partnerships",
        "road_p3_l3": "Community governance transition",
        "road_p4_t": "Phase 4: Future",
        "road_p4_d": "2026+",
        "road_p4_l1": "Support more device types",
        "road_p4_l2": "AI health modules",
        "road_p4_l3": "Carbon neutral goals",
        "advisor_title": "Advisors",
        "adv_1_n": "Dr. Alan Smith",
        "adv_1_d": "Biomedical Data Science Professor. Advises on compliance.",
        "adv_2_n": "Sarah Chen",
        "adv_2_d": "Digital Strategy Expert. Advises on ecosystem sustainability.",
        "mkt_desc": "Targeting the global digital health and smart wearable market.",
        "mkt_adv_t": "Core Advantages",
        "mkt_p1_t": "Full Stack",
        "mkt_p1_d": "Network + Hardware + App vertical integration.",
        "mkt_p2_t": "Hardware Trust",
        "mkt_p2_d": "Solves source data trust issues.",
        "mkt_p3_t": "Sustainability",
        "mkt_p3_d": "Dynamic supply ensures utility logic.",
        "mkt_p4_t": "Social",
        "mkt_p4_d": "Strong community features for retention.",
        "mkt_p5_t": "Green",
        "mkt_p5_d": "Low barrier to entry for digital life.",
        "risk_c1": "Category",
        "risk_c2": "Description",
        "risk_c3": "Mitigation",
        "risk_r1_c1": "Technical",
        "risk_r1_c2": "Hardware/Network performance",
        "risk_r1_c3": "Top-tier audits & proven crypto standards",
        "risk_r2_c1": "Compliance",
        "risk_r2_c2": "Data privacy regulations",
        "risk_r2_c3": "Strict adherence to PIPL/GDPR; legal counsel",
        "risk_r3_c1": "Market",
        "risk_r3_c2": "Fluctuation in engagement",
        "risk_r3_c3": "Focus on intrinsic utility and services",
        "risk_r4_c1": "Competition",
        "risk_r4_c2": "Tech giants entering space",
        "risk_r4_c3": "Rapid iteration & community moat",
        "risk_r5_c1": "Centralization",
        "risk_r5_c2": "Early device scarcity",
        "risk_r5_c3": "Proof of Commitment mechanisms",
        "conc_p1": "LifeChain breaks the monopoly on health data. We build a user-owned ecosystem.",
        "conc_p2": "With LIF Credits primarily generated via health behavior, we inaugurate a fair value distribution paradigm.",
        "cta_t": "Join the Ecosystem",
        "cta_l1": "Download the App",
        "cta_l2": "Get Watch H to join the health ecosystem",
        "cta_l3": "Record data, earn credits, live healthy",
        "btn_web": "Official Website"
      }
    }
  },
  "zh-CN": {
    "wp": {
      "meta": {
        "version": "版本 2.1",
        "date": "发布日期：2025年9月1日"
      },
      "title_suffix": "白皮书",
      "subtitle": "引领数字生活方式的未来：基于可信网络的社会健康生态系统。",
      "disclaimer": {
        "title": "产品介绍与免责声明",
        "content": "本白皮书展示了LifeChain项目的技术愿景和路线图。仅供信息参考，不构成任何形式的投资建议、金融要约或承诺。文中所述“积分”为生态内部效用单位，无货币价值。"
      },
      "sections": {
        "executive": "执行摘要",
        "intro": "引言",
        "solution": "解决方案",
        "architecture": "技术架构",
        "product": "产品组件",
        "incentives": "生态激励",
        "community": "社区共治",
        "roadmap": "路线图",
        "team": "团队与顾问",
        "market": "市场分析",
        "risks": "风险与缓解",
        "conclusion": "结语"
      },
      "team": {
        "role_ceo": "CEO",
        "desc_ceo": "联合创始人兼CEO。15年互联网经验，专注于数据积累和AI技术。",
        "role_tm": "技术经理",
        "desc_tm": "8年开发经验。负责技术团队管理和架构设计。",
        "role_sde": "高级开发",
        "desc_sde": "后端专家。擅长使用Node.js/Java/Go构建高效服务器架构。",
        "role_ede": "积分系统开发",
        "desc_ede": "负责积分相关系统设计与开发，重点是规则引擎、风控和高可用架构。",
        "role_ux": "UI/UX设计师",
        "desc_ux": "拥有丰富的大型项目界面设计和用户体验设计经验。",
        "role_fs": "高级开发",
        "desc_fs": "全栈开发者（6年）。精通Vue.js、Java、Node.js技术栈。",
        "role_bde": "网络开发",
        "desc_bde": "专注于底层网络开发，负责智能合约的设计、开发和部署。",
        "role_bpm": "项目经理",
        "desc_bpm": "负责项目管理和跨团队协调，推动高质量按时交付。",
        "role_qa": "测试工程师",
        "desc_qa": "通过严格的测试计划确保产品质量和稳定性。",
        "role_sec": "安全工程师",
        "desc_sec": "专注于网络/应用安全、渗透测试和防御架构。"
      },
      "content": {
        "exec_p1": "LifeChain 旨在推动个人健康数据管理权的变革。通过整合安全网络、AI和智能穿戴设备，我们构建了一个包容的数字生态。",
        "exec_p2": "系统包含高性能网络、内置硬件安全的Watch H手表及沉浸式社交应用。健康数据在源头进行真实性认证。",
        "exec_p3": "用户通过记录健康行为获得“LIF积分”。这些积分在生态内用于兑换服务和数据洞察，促进绿色智能生活方式。",
        "intro_lead": "健康数据的价值困境：",
        "intro_p1_t": "数据孤岛",
        "intro_p1_d": "用户无法有效访问或利用自己的完整数据。",
        "intro_p2_t": "信任缺失",
        "intro_p2_d": "传统激励机制易受数据不一致影响。",
        "intro_p3_t": "不可持续",
        "intro_p3_d": "许多模式缺乏内在的效用循环。",
        "intro_p4_t": "体验割裂",
        "intro_p4_d": "硬件与社交平台缺乏联动。",
        "intro_p5_t": "安全隐患",
        "intro_p5_d": "缺乏硬件级的数字权益保护。",
        "sol_p1_t": "可信源头数据",
        "sol_p1_d": "Watch H 在生成端签名，确保数据真实。",
        "sol_p2_t": "权益分配",
        "sol_p2_d": "自动化协议根据健康记录分发积分。",
        "sol_p3_t": "服务交换",
        "sol_p3_d": "用户可用脱敏数据洞察换取服务权益。",
        "sol_p4_t": "社交健康",
        "sol_p4_d": "深度融合健康挑战与社区互动。",
        "sol_p5_t": "权益安全",
        "sol_p5_d": "硬件环境保护数字身份和积分。",
        "sol_p6_t": "绿色生活",
        "sol_p6_d": "低功耗网络支持碳中和目标。",
        "arch_net_title": "LifeChain 网络",
        "arch_net_1_t": "共识机制",
        "arch_net_1_d": "高效DPoS机制，节能环保。",
        "arch_net_2_t": "高性能",
        "arch_net_2_d": "高吞吐量以适应实时穿戴设备数据。",
        "arch_net_3_t": "兼容性",
        "arch_net_3_d": "支持标准数据接口和隐私计算。",
        "arch_sec_title": "可信核心：Watch H",
        "arch_sec_intro": "采用先进的加密标准。",
        "arch_sec_1_t": "安全单元",
        "arch_sec_1_d": "认证的物理隔离环境。",
        "arch_sec_2_t": "自主管理",
        "arch_sec_2_d": "密钥永不出芯片。",
        "arch_sec_3_t": "安全签名",
        "arch_sec_3_d": "硬件验证的操作确认。",
        "arch_sec_4_t": "多凭证支持",
        "arch_sec_4_d": "支持多种数字凭证。",
        "arch_sec_5_t": "数字身份",
        "arch_sec_5_d": "基于芯片的DID安全登录。",
        "arch_priv_title": "隐私保护机制",
        "arch_priv_desc": "通过“本地计算、网络验证”及零知识证明，在不泄露原始数据的情况下验证健康结果，符合全球隐私法规。",
        "prod_hw_1": "健康监测",
        "prod_hw_1_1": "高精度光学心率",
        "prod_hw_1_2": "血氧与HRV分析",
        "prod_hw_1_3": "睡眠周期监测",
        "prod_hw_1_4": "低功耗传感器",
        "prod_hw_2": "数字安全",
        "prod_hw_2_1": "内置安全模块",
        "prod_hw_2_2": "加密NFC",
        "prod_hw_2_3": "轻节点同步",
        "prod_app_desc": "生态系统的交互中枢。",
        "prod_app_1_t": "仪表盘",
        "prod_app_1_d": "可视化健康数据流和积分。",
        "prod_app_2_t": "社交中心",
        "prod_app_2_d": "加入社团和健康挑战。",
        "prod_app_3_t": "服务市场",
        "prod_app_3_d": "兑换健康洞察或服务。",
        "prod_app_4_t": "权益界面",
        "prod_app_4_d": "管理数字权益和勋章。",
        "prod_app_5_t": "共治门户",
        "prod_app_5_d": "参与社区建议投票。",
        "eco_name_l": "单位名称",
        "eco_name_v": "LIF 积分",
        "eco_cap_l": "供应机制",
        "eco_cap_v": "动态产出",
        "eco_intro": "积分是衡量生态贡献的非金融效用单位。",
        "eco_tb_c1": "类别",
        "eco_tb_c2": "比例",
        "eco_tb_c3": "产出规则",
        "eco_r1_c1": "活动记录",
        "eco_r1_c2": "80%",
        "eco_r1_c3": "通过每日健康任务持续产出。",
        "eco_r2_c1": "生态储备",
        "eco_r2_c2": "10%",
        "eco_r2_c3": "48个月线性发放，用于合作伙伴支持。",
        "eco_r3_c1": "市场推广",
        "eco_r3_c2": "4.76%",
        "eco_r3_c3": "用于社区激励和品牌建设。",
        "eco_r4_c1": "早期贡献",
        "eco_r4_c2": "3.81%",
        "eco_r4_c3": "给予早期测试者的奖励。",
        "eco_r5_c1": "团队建设",
        "eco_r5_c2": "1.43%",
        "eco_r5_c3": "长期锁定以确保开发稳定性。",
        "eco_mech_title": "获取机制",
        "eco_mech_desc": "佩戴 Watch H（活动证明）即可获取积分。每日达成承诺目标可提升获取效率。",
        "eco_opt_title": "生态循环",
        "eco_opt_desc": "已使用的积分将按规则在系统内进行注销/失效处理，以维持服务平衡。",
        "gov_desc": "LifeChain 迈向社区共治。拥有足够贡献积分的用户可对生态参数和技术升级提出建议并投票。",
        "road_p1_t": "第一阶段：基础",
        "road_p1_d": "2023 Q4 - 2024 Q2",
        "road_p1_l1": "网络内部测试",
        "road_p1_l2": "Watch H 原型机验证",
        "road_p1_l3": "App MVP 开发",
        "road_p2_t": "第二阶段：成长",
        "road_p2_d": "2025 Q2 - 2025 Q4",
        "road_p2_l1": "网络服务上线",
        "road_p2_l2": "首批 Watch H 分发",
        "road_p2_l3": "App 上线及混合服务",
        "road_p3_t": "第三阶段：拓展",
        "road_p3_d": "2025 Q4 - 2026 Q1",
        "road_p3_l1": "开发者 SDK 发布",
        "road_p3_l2": "高校数据合作",
        "road_p3_l3": "社区共治过渡",
        "road_p4_t": "第四阶段：未来",
        "road_p4_d": "2026+",
        "road_p4_l1": "支持更多设备类型",
        "road_p4_l2": "AI 健康模块",
        "road_p4_l3": "碳中和目标",
        "advisor_title": "顾问",
        "adv_1_n": "Alan Smith 博士",
        "adv_1_d": "生物医学数据科学教授。提供合规性建议。",
        "adv_2_n": "Sarah Chen",
        "adv_2_d": "数字战略专家。提供生态可持续性建议。",
        "mkt_desc": "瞄准全球数字健康和智能穿戴市场。",
        "mkt_adv_t": "核心优势",
        "mkt_p1_t": "全栈方案",
        "mkt_p1_d": "网络+硬件+App 垂直整合。",
        "mkt_p2_t": "硬件信任",
        "mkt_p2_d": "解决源头数据信任问题。",
        "mkt_p3_t": "可持续性",
        "mkt_p3_d": "动态供应机制确保效用逻辑。",
        "mkt_p4_t": "社交属性",
        "mkt_p4_d": "强社区功能提升留存。",
        "mkt_p5_t": "绿色包容",
        "mkt_p5_d": "参与门槛低，覆盖广泛。",
        "risk_c1": "类别",
        "risk_c2": "描述",
        "risk_c3": "缓解措施",
        "risk_r1_c1": "技术",
        "risk_r1_c2": "硬件/网络性能问题",
        "risk_r1_c3": "顶级审计与验证过的加密标准",
        "risk_r2_c1": "合规",
        "risk_r2_c2": "数据隐私法规",
        "risk_r2_c3": "严格遵守 PIPL/GDPR；法律顾问",
        "risk_r3_c1": "市场",
        "risk_r3_c2": "参与度波动",
        "risk_r3_c3": "专注于内在效用和服务",
        "risk_r4_c1": "竞争",
        "risk_r4_c2": "科技巨头入场",
        "risk_r4_c3": "快速迭代与社区护城河",
        "risk_r5_c1": "中心化",
        "risk_r5_c2": "早期设备稀缺",
        "risk_r5_c3": "承诺证明机制",
        "conc_p1": "LifeChain 打破健康数据垄断。我们致力于打造用户拥有的生态系统。",
        "conc_p2": "通过主要由健康行为获取的 LIF 积分，我们开启了公平的价值分配范式。",
        "cta_t": "加入生态系统",
        "cta_l1": "下载应用",
        "cta_l2": "获取 Watch H 加入健康生态",
        "cta_l3": "记录数据，赚取积分，健康生活",
        "btn_web": "官方网站"
      }
    }
  },
  "zh-TW": {
    "wp": {
      "meta": {
        "version": "版本 2.1",
        "date": "發布日期：2025年9月1日"
      },
      "title_suffix": "白皮書",
      "subtitle": "引領數位生活方式的未來：基於可信網絡的社會健康生態系統。",
      "disclaimer": {
        "title": "產品介紹與免責聲明",
        "content": "本白皮書展示了LifeChain項目的技術願景和路線圖。僅供信息參考，不構成任何形式的投資建議、金融要約或承諾。文中所述“積分”為生態內部效用單位，無貨幣價值。"
      },
      "sections": {
        "executive": "執行摘要",
        "intro": "引言",
        "solution": "解決方案",
        "architecture": "技術架構",
        "product": "產品組件",
        "incentives": "生態激勵",
        "community": "社區共治",
        "roadmap": "路線圖",
        "team": "團隊與顧問",
        "market": "市場分析",
        "risks": "風險與緩解",
        "conclusion": "結語"
      },
      "team": {
        "role_ceo": "CEO",
        "desc_ceo": "聯合創始人兼CEO。15年互聯網經驗，專注於數據積累和AI技術。",
        "role_tm": "技術經理",
        "desc_tm": "8年開發經驗。負責技術團隊管理和架構設計。",
        "role_sde": "高級開發",
        "desc_sde": "後端專家。擅長使用Node.js/Java/Go構建高效服務器架構。",
        "role_ede": "積分系統開發",
        "desc_ede": "負責積分相關系統設計與開發，重點是規則引擎、風險控制和高可用架構。",
        "role_ux": "UI/UX設計師",
        "desc_ux": "擁有豐富的大型項目界面設計和用戶體驗設計經驗。",
        "role_fs": "高級開發",
        "desc_fs": "全棧開發者（6年）。精通Vue.js、Java、Node.js技術棧。",
        "role_bde": "網絡開發",
        "desc_bde": "專注於底層網絡開發，負責智能合約的設計、開發和部署。",
        "role_bpm": "項目經理",
        "desc_bpm": "負責項目管理和跨團隊協調，推動高質量按時交付。",
        "role_qa": "測試工程師",
        "desc_qa": "通過嚴格的測試計劃確保產品質量和穩定性。",
        "role_sec": "安全工程師",
        "desc_sec": "專注於網絡/應用安全、滲透測試和防禦架構。"
      },
      "content": {
        "exec_p1": "LifeChain 旨在推動個人健康數據管理權的變革。通過整合安全網絡、AI和智能穿戴設備，我們構建了一個包容的數位生態。",
        "exec_p2": "系統包含高性能網絡、內置硬件安全的Watch H手錶及沉浸式社交應用。健康數據在源頭進行真實性認證。",
        "exec_p3": "用戶通過記錄健康行為獲得“LIF積分”。這些積分在生態內用於兌換服務和數據洞察，促進綠色智能生活方式。",
        "intro_lead": "健康數據的價值困境：",
        "intro_p1_t": "數據孤島",
        "intro_p1_d": "用戶無法有效訪問或利用自己的完整數據。",
        "intro_p2_t": "信任缺失",
        "intro_p2_d": "傳統激勵機制易受數據不一致影響。",
        "intro_p3_t": "不可持續",
        "intro_p3_d": "許多模式缺乏內在的效用循環。",
        "intro_p4_t": "體驗割裂",
        "intro_p4_d": "硬件與社交平台缺乏聯動。",
        "intro_p5_t": "安全隱患",
        "intro_p5_d": "缺乏硬件級的數位權益保護。",
        "sol_p1_t": "可信源頭數據",
        "sol_p1_d": "Watch H 在生成端簽名，確保數據真實。",
        "sol_p2_t": "權益分配",
        "sol_p2_d": "自動化協議根據健康記錄分發積分。",
        "sol_p3_t": "服務交換",
        "sol_p3_d": "用戶可用脫敏數據洞察換取服務權益。",
        "sol_p4_t": "社交健康",
        "sol_p4_d": "深度融合健康挑戰與社區互動。",
        "sol_p5_t": "權益安全",
        "sol_p5_d": "硬件環境保護數位身份和積分。",
        "sol_p6_t": "綠色生活",
        "sol_p6_d": "低功耗網絡支持碳中和目標。",
        "arch_net_title": "LifeChain 網絡",
        "arch_net_1_t": "共識機制",
        "arch_net_1_d": "高效DPoS機制，節能環保。",
        "arch_net_2_t": "高性能",
        "arch_net_2_d": "高吞吐量以適應實時穿戴設備數據。",
        "arch_net_3_t": "兼容性",
        "arch_net_3_d": "支持標準數據接口和隱私計算。",
        "arch_sec_title": "可信核心：Watch H",
        "arch_sec_intro": "採用先進的加密標準。",
        "arch_sec_1_t": "安全單元",
        "arch_sec_1_d": "認證的物理隔離環境。",
        "arch_sec_2_t": "自主管理",
        "arch_sec_2_d": "密鑰永不出芯片。",
        "arch_sec_3_t": "安全簽名",
        "arch_sec_3_d": "硬件驗證的操作確認。",
        "arch_sec_4_t": "多憑證支持",
        "arch_sec_4_d": "支持多種數位憑證。",
        "arch_sec_5_t": "數位身份",
        "arch_sec_5_d": "基於芯片的DID安全登錄。",
        "arch_priv_title": "隱私保護機制",
        "arch_priv_desc": "通過“本地計算、網絡驗證”及零知識證明，在不泄露原始數據的情況下驗證健康結果，符合全球隱私法規。",
        "prod_hw_1": "健康監測",
        "prod_hw_1_1": "高精度光學心率",
        "prod_hw_1_2": "血氧與HRV分析",
        "prod_hw_1_3": "睡眠週期監測",
        "prod_hw_1_4": "低功耗傳感器",
        "prod_hw_2": "數位安全",
        "prod_hw_2_1": "內置安全模塊",
        "prod_hw_2_2": "加密NFC",
        "prod_hw_2_3": "輕節點同步",
        "prod_app_desc": "生態系統的交互中樞。",
        "prod_app_1_t": "儀表盤",
        "prod_app_1_d": "可視化健康數據流和積分。",
        "prod_app_2_t": "社交中心",
        "prod_app_2_d": "加入社團和健康挑戰。",
        "prod_app_3_t": "服務市場",
        "prod_app_3_d": "兌換健康洞察或服務。",
        "prod_app_4_t": "權益界面",
        "prod_app_4_d": "管理數位權益和勳章。",
        "prod_app_5_t": "共治門戶",
        "prod_app_5_d": "參與社區建議投票。",
        "eco_name_l": "單位名稱",
        "eco_name_v": "LIF 積分",
        "eco_cap_l": "供應機制",
        "eco_cap_v": "動態產出",
        "eco_intro": "積分是衡量生態貢獻的非金融效用單位。",
        "eco_tb_c1": "類別",
        "eco_tb_c2": "比例",
        "eco_tb_c3": "產出規則",
        "eco_r1_c1": "活動記錄",
        "eco_r1_c2": "80%",
        "eco_r1_c3": "通過每日健康任務持續產出。",
        "eco_r2_c1": "生態儲備",
        "eco_r2_c2": "10%",
        "eco_r2_c3": "48個月線性發放，用於合作夥伴支持。",
        "eco_r3_c1": "市場推廣",
        "eco_r3_c2": "4.76%",
        "eco_r3_c3": "用於社區激勵和品牌建設。",
        "eco_r4_c1": "早期貢獻",
        "eco_r4_c2": "3.81%",
        "eco_r4_c3": "給予早期測試者的獎勵。",
        "eco_r5_c1": "團隊建設",
        "eco_r5_c2": "1.43%",
        "eco_r5_c3": "長期鎖定以確保開發穩定性。",
        "eco_mech_title": "獲取機制",
        "eco_mech_desc": "佩戴 Watch H（活動證明）即可獲取積分。每日達成承諾目標可提升獲取效率。",
        "eco_opt_title": "生態循環",
        "eco_opt_desc": "已使用的積分將按規則在系統內進行註銷/失效處理，以維持服務平衡。",
        "gov_desc": "LifeChain 邁向社區共治。擁有足夠貢獻積分的用戶可對生態參數和技術升級提出建議並投票。",
        "road_p1_t": "第一階段：基礎",
        "road_p1_d": "2023 Q4 - 2024 Q2",
        "road_p1_l1": "網絡內部測試",
        "road_p1_l2": "Watch H 原型機驗證",
        "road_p1_l3": "App MVP 開發",
        "road_p2_t": "第二階段：成長",
        "road_p2_d": "2025 Q2 - 2025 Q4",
        "road_p2_l1": "網絡服務上線",
        "road_p2_l2": "首批 Watch H 分發",
        "road_p2_l3": "App 上線及混合服務",
        "road_p3_t": "第三階段：拓展",
        "road_p3_d": "2025 Q4 - 2026 Q1",
        "road_p3_l1": "開發者 SDK 發布",
        "road_p3_l2": "高校數據合作",
        "road_p3_l3": "社區共治過渡",
        "road_p4_t": "第四階段：未來",
        "road_p4_d": "2026+",
        "road_p4_l1": "支持更多設備類型",
        "road_p4_l2": "AI 健康模塊",
        "road_p4_l3": "碳中和目標",
        "advisor_title": "顧問",
        "adv_1_n": "Alan Smith 博士",
        "adv_1_d": "生物醫學數據科學教授。提供合規性建議。",
        "adv_2_n": "Sarah Chen",
        "adv_2_d": "數位戰略專家。提供生態可持續性建議。",
        "mkt_desc": "瞄準全球數位健康和智能穿戴市場。",
        "mkt_adv_t": "核心優勢",
        "mkt_p1_t": "全棧方案",
        "mkt_p1_d": "網絡+硬件+App 垂直整合。",
        "mkt_p2_t": "硬件信任",
        "mkt_p2_d": "解決源頭數據信任問題。",
        "mkt_p3_t": "可持續性",
        "mkt_p3_d": "動態供應機制確保效用邏輯。",
        "mkt_p4_t": "社交屬性",
        "mkt_p4_d": "強社區功能提升留存。",
        "mkt_p5_t": "綠色包容",
        "mkt_p5_d": "參與門檻低，覆蓋廣泛。",
        "risk_c1": "類別",
        "risk_c2": "描述",
        "risk_c3": "緩解措施",
        "risk_r1_c1": "技術",
        "risk_r1_c2": "硬件/網絡性能問題",
        "risk_r1_c3": "頂級審計與驗證過的加密標準",
        "risk_r2_c1": "合規",
        "risk_r2_c2": "數據隱私法規",
        "risk_r2_c3": "嚴格遵守 PIPL/GDPR；法律顧問",
        "risk_r3_c1": "市場",
        "risk_r3_c2": "參與度波動",
        "risk_r3_c3": "專注於內在效用和服務",
        "risk_r4_c1": "競爭",
        "risk_r4_c2": "科技巨頭入場",
        "risk_r4_c3": "快速迭代與社區護城河",
        "risk_r5_c1": "中心化",
        "risk_r5_c2": "早期設備稀缺",
        "risk_r5_c3": "承諾證明機制",
        "conc_p1": "LifeChain 打破健康數據壟斷。我們致力於打造用戶擁有的生態系統。",
        "conc_p2": "通過主要由健康行為獲取的 LIF 積分，我們開啟了公平的價值分配範式。",
        "cta_t": "加入生態系統",
        "cta_l1": "下載應用",
        "cta_l2": "獲取 Watch H 加入健康生態",
        "cta_l3": "記錄數據，賺取積分，健康生活",
        "btn_web": "官方網站"
      }
    }
  }
}</i18n>