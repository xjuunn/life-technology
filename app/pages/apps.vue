<script setup lang="ts">
import { ApiList } from '#imports';
import type { DownloadLinkItem } from '~/api/download';

const { t } = useAppI18n();

const showModal = ref(false);
const modalImages = ref<string[]>([]);
const modalTitle = ref('');
const currentImageIndex = ref(0);
const links = ref<DownloadLinkItem[]>([]);
const loading = ref<Record<number, boolean>>({});

interface StepConfig {
  images: string[];
  title: string;
}

const openStepModal = (step: number) => {
  const stepConfig: Record<number, StepConfig> = {
    1: {
      images: ['/imgs/step1/10.png', '/imgs/step1/11.png', '/imgs/step1/12.png', '/imgs/step1/13.png'],
      title: t('tutorial_section.step1_title')
    },
    2: {
      images: ['/imgs/step2/13.png', '/imgs/step2/21.png', '/imgs/step2/22.png', '/imgs/step2/23.png', '/imgs/step2/24.png', '/imgs/step2/25.png'],
      title: t('tutorial_section.step2_title')
    },
    3: {
      images: ['/imgs/step3/31.png', '/imgs/step3/32.png', '/imgs/step3/33.png'],
      title: t('tutorial_section.step3_title')
    },
    4: {
      images: ['/imgs/step4/41.png', '/imgs/step4/42.png', '/imgs/step4/44.png', '/imgs/step4/45.png'],
      title: t('tutorial_section.step4_title')
    }
  };

  const config = stepConfig[step];
  if (config) {
    modalImages.value = config.images;
    modalTitle.value = config.title;
    currentImageIndex.value = 0;
    showModal.value = true;
  }
};

const nextImage = () => {
  if (currentImageIndex.value < modalImages.value.length - 1) {
    currentImageIndex.value++;
  }
};

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
  }
};

const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
};

const closeModal = () => {
  showModal.value = false;
  setTimeout(() => {
    modalImages.value = [];
    modalTitle.value = '';
    currentImageIndex.value = 0;
  }, 300);
};

const androidLink = computed(() =>
  links.value.find(l => l.platform === 'android' && l.name === 'lifeapp') ||
  links.value.find(l => l.platform === 'android')
);

const iosLink = computed(() =>
  links.value.find(l => l.platform === 'ios')
);

const qrCodeUrl = computed(() => {
  const targetUrl = androidLink.value?.downloadUrl || iosLink.value?.downloadUrl || 'https://life.app';
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=10&data=${encodeURIComponent(targetUrl)}`;
});

async function initData() {
  try {
    const { data } = await ApiList.download.links();
    links.value = data.downloads;
  } catch (error) {
    console.error(error);
  }
}

async function handleDownload(link: DownloadLinkItem | undefined) {
  if (!link) return;

  loading.value[link.id] = true;
  try {
    ApiList.download.increaseDownloadsNumber(link.id);
    window.open(link.downloadUrl, '_blank');
  } catch (error) {
    window.open(link.downloadUrl, '_blank');
  } finally {
    loading.value[link.id] = false;
  }
}

const scrollToTutorial = () => {
  const el = document.getElementById('tutorial-section');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && showModal.value) {
      closeModal();
    }
  };
  initData();
  window.addEventListener('keydown', handleKeydown);

  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
});
</script>

<template>
  <div>
    <div class="modal backdrop-blur-md bg-black/40 transition-all duration-300 z-[999]"
      :class="{ 'modal-open': showModal, 'opacity-0 pointer-events-none': !showModal, 'opacity-100 pointer-events-auto': showModal }">
      <div
        class="modal-box max-w-6xl w-11/12 h-[90vh] bg-base-100/95 backdrop-blur-xl shadow-2xl border border-base-content/5 rounded-[2rem] p-0 overflow-hidden flex flex-col">
        <div class="flex justify-between items-center p-6 border-b border-base-content/5 bg-base-100/50">
          <div class="flex flex-col">
            <h3 class="text-xl font-black tracking-tight flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              {{ modalTitle }}
            </h3>
            <p v-if="modalImages.length > 1" class="text-xs font-mono text-base-content/50 mt-1 pl-4">
              STEP {{ currentImageIndex + 1 }} / {{ modalImages.length }}
            </p>
          </div>
          <button class="btn btn-sm btn-circle btn-ghost hover:bg-base-content/10 transition-colors"
            @click="closeModal">✕</button>
        </div>
        <div class="relative flex-1 bg-base-200/30 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
          <button v-if="modalImages.length > 1" :disabled="currentImageIndex === 0"
            class="absolute left-4 z-20 btn btn-circle btn-lg bg-base-100 border border-base-content/5 shadow-xl hover:scale-105 hover:bg-primary hover:text-primary-content hover:border-primary disabled:opacity-0 transition-all duration-300"
            @click="prevImage">
            <Icon name="heroicons:chevron-left" class="w-8 h-8" />
          </button>

          <Transition name="slide-fade" mode="out-in">
            <div :key="currentImageIndex" class="w-full h-full flex items-center justify-center">
              <img v-if="modalImages.length > 0" :src="modalImages[currentImageIndex]"
                class="max-h-[65vh] w-auto object-contain shadow-2xl rounded-2xl ring-1 ring-base-content/5"
                @error="handleImageError" />
            </div>
          </Transition>

          <button v-if="modalImages.length > 1" :disabled="currentImageIndex === modalImages.length - 1"
            class="absolute right-4 z-20 btn btn-circle btn-lg bg-base-100 border border-base-content/5 shadow-xl hover:scale-105 hover:bg-primary hover:text-primary-content hover:border-primary disabled:opacity-0 transition-all duration-300"
            @click="nextImage">
            <Icon name="heroicons:chevron-right" class="w-8 h-8" />
          </button>
        </div>

        <div v-if="modalImages.length > 1"
          class="p-6 bg-base-100 border-t border-base-content/5 flex justify-center gap-3 overflow-x-auto">
          <button v-for="(_, index) in modalImages" :key="index"
            class="h-2 rounded-full transition-all duration-500 ease-out"
            :class="currentImageIndex === index ? 'bg-primary w-12' : 'bg-base-content/10 w-2 hover:bg-base-content/30'"
            @click="currentImageIndex = index">
          </button>
        </div>
      </div>
      <form method="dialog" class="modal-backdrop" @click="closeModal">
        <button>close</button>
      </form>
    </div>

    <div
      class="bg-base-100 text-base-content font-sans relative overflow-x-hidden selection:bg-primary selection:text-primary-content flex flex-col">
      <div class="relative pt-20 flex flex-col justify-center overflow-hidden">
        <div class="absolute inset-0 z-0 pointer-events-none">
          <div
            class="absolute top-0 right-0 w-2/3 h-full bg-[url('/imgs/background.png')] bg-cover bg-no-repeat bg-[center_top] opacity-40 hidden lg:block mix-blend-overlay">
          </div>
          <div
            class="absolute right-[-10%] top-[10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[150px] animate-pulse">
          </div>
          <div class="absolute left-[-10%] bottom-[10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px]">
          </div>
        </div>
        <main class="container mx-auto px-6 relative z-10 flex flex-col justify-center">
          <div class="flex flex-col lg:flex-row items-center justify-between gap-12 h-full py-12 lg:py-0">

            <div class="w-full lg:w-1/2 space-y-12 flex flex-col justify-center order-2 lg:order-1">
              <div class="space-y-6 text-center lg:text-left">
                <div
                  class="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-base-content/5 border border-base-content/10 w-fit mx-auto lg:mx-0 backdrop-blur-md">
                  <span class="relative flex h-2.5 w-2.5">
                    <span
                      class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                  </span>
                  <span class="text-xs font-bold uppercase tracking-[0.2em] opacity-70">Web3 Digital Wallet</span>
                </div>
                <h1 class="text-5xl sm:text-6xl lg:text-8xl font-black tracking-tighter leading-[1]">
                  {{ t('download_page.title_line1') }}
                  <span
                    class="text-transparent bg-clip-text bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] animate-shine block mt-2">{{
                      t('download_page.title_line2') }}</span>
                </h1>
                <p class="text-xl text-base-content/60 max-w-xl mx-auto lg:mx-0 leading-relaxed font-light">
                  {{ t('download_page.description') }}
                </p>
              </div>

              <div class="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                <button @click="handleDownload(androidLink)"
                  :disabled="!androidLink || (androidLink && loading[androidLink.id])"
                  class="group relative overflow-hidden rounded-2xl bg-base-content text-base-100 p-1 pr-8 transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed min-w-[220px]">
                  <div class="absolute inset-0 transition-all group-hover:opacity-90">
                  </div>
                  <div class="relative flex items-center gap-4 bg-transparent p-3.5">
                    <div
                      class="flex h-14 w-14 items-center justify-center rounded-xl bg-base-100/10 text-base-100 backdrop-blur-md">
                      <span v-if="androidLink && loading[androidLink.id]"
                        class="loading loading-spinner loading-sm"></span>
                      <Icon v-else name="logos:android-icon" class="h-7 w-7" />
                    </div>
                    <div class="flex flex-col items-start">
                      <span class="text-[10px] font-bold opacity-70 uppercase tracking-widest">Download APK</span>
                      <span class="text-lg font-bold">Android</span>
                    </div>
                    <div
                      class="ml-auto w-8 h-8 rounded-full bg-base-100/10 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                      <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
                    </div>
                  </div>
                </button>

                <button @click="handleDownload(iosLink)" :disabled="!iosLink || (iosLink && loading[iosLink.id])"
                  class="group relative overflow-hidden rounded-2xl bg-base-100 text-base-content p-1 pr-8 transition-all hover:scale-[1.02] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-primary/50 border border-base-content/10 min-w-[220px] active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                  <div class="relative flex items-center gap-4 p-3.5">
                    <div
                      class="flex h-14 w-14 items-center justify-center rounded-xl bg-base-200 text-base-content group-hover:bg-primary group-hover:text-primary-content transition-colors duration-300">
                      <span v-if="iosLink && loading[iosLink.id]" class="loading loading-spinner loading-sm"></span>
                      <Icon v-else name="mingcute:apple-fill" class="h-7 w-7" />
                    </div>
                    <div class="flex flex-col items-start">
                      <span
                        class="text-[10px] font-bold opacity-60 uppercase tracking-widest group-hover:text-primary transition-colors">Download
                        IPA</span>
                      <span class="text-lg font-bold">iOS</span>
                    </div>
                    <div
                      class="ml-auto w-8 h-8 rounded-full bg-base-200 flex items-center justify-center opacity-0 -translate-x-4 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 group-hover:bg-primary group-hover:text-primary-content">
                      <Icon name="heroicons:arrow-down-tray" class="h-4 w-4" />
                    </div>
                  </div>
                </button>
              </div>

              <div class="hidden lg:flex items-center gap-6 pt-6">
                <div
                  class="relative p-2 bg-white rounded-2xl shadow-xl shadow-base-content/5 border border-base-content/5 group hover:scale-105 transition-transform duration-300">
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                  </div>
                  <img :src="qrCodeUrl" class="relative z-10 w-24 h-24 mix-blend-multiply" alt="QR Code">
                </div>
                <div class="space-y-1.5">
                  <p class="font-bold text-base-content text-lg flex items-center gap-2">
                    <Icon name="mingcute:scan-line" />
                    {{ t('download_page.qr_title') }}
                  </p>
                  <p class="text-sm text-base-content/50">{{ t('download_page.qr_desc') }}</p>
                  <div class="flex items-center gap-3 pt-2">
                    <div class="badge badge-soft font-mono text-[10px]">{{ androidLink?.version ||
                      'Latest' }}</div>
                    <div class="text-xs text-base-content/40 font-mono flex items-center gap-1">
                      <Icon name="mingcute:file-line" />
                      {{ androidLink?.fileSize || 'N/A' }}
                    </div>
                  </div>
                </div>
              </div>

              <div
                class="flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-6 border-t border-base-content/5 w-full lg:w-fit px-6 lg:px-0 opacity-70">
                <div class="flex items-center gap-2 text-xs font-bold uppercase tracking-wider"
                  v-for="feat in ['aes', 'multichain', 'custodial']" :key="feat">
                  <div class="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <Icon name="heroicons:check" class="w-3 h-3" />
                  </div>
                  {{ t(`download_page.features.${feat}`) }}
                </div>
              </div>
            </div>

            <div
              class="w-full lg:w-1/2 flex justify-center order-1 lg:order-2 perspective-[2000px] h-full items-center">
              <div class="relative w-[300px] sm:w-[360px] lg:w-[420px] xl:w-[480px] group">
                <div
                  class="absolute inset-0 bg-gradient-to-tr from-primary/30 via-secondary/20 to-primary/10 rounded-full blur-[80px] transform scale-90 group-hover:scale-100 transition-transform duration-1000">
                </div>
                <img src="/imgs/phone.png" alt="App Preview"
                  class="relative z-10 w-full h-auto drop-shadow-2xl transform transition-all duration-700 group-hover:-translate-y-6 group-hover:rotate-y-12 will-change-transform">
              </div>
            </div>

          </div>
        </main>
      </div>
      <br><br>
      <div id="tutorial-section" class="bg-base-50/50 border-t border-base-content/5 relative z-10 py-20 lg:py-32">
        <div class="container mx-auto px-6">
          <div class="text-center mb-16 lg:mb-24">
            <div
              class="inline-block mb-4 px-4 py-1 rounded-full bg-base-200 text-xs font-bold uppercase tracking-widest text-base-content/60">
              Guide</div>
            <h3 class="text-4xl md:text-5xl font-black mb-4">{{ t('tutorial_section.title') }}</h3>
            <p class="text-xl text-base-content/50 max-w-2xl mx-auto">{{ t('tutorial_section.subtitle') }}</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative max-w-7xl mx-auto">
            <div
              class="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-base-content/10 to-transparent dashed-line">
            </div>

            <div v-for="step in 4" :key="step" class="relative group cursor-pointer" @click="openStepModal(step)">
              <div class="flex flex-col items-center text-center gap-6 relative z-10">
                <div
                  class="w-24 h-24 rounded-[2rem] bg-base-100 border border-base-content/5 flex items-center justify-center shadow-lg group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:border-primary/30 transition-all duration-500 relative overflow-hidden">
                  <div
                    class="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  </div>
                  <Icon
                    :name="step === 1 ? 'heroicons:user-plus' : step === 2 ? 'heroicons:shield-check' : step === 3 ? 'heroicons:currency-dollar' : 'heroicons:chat-bubble-left-right'"
                    class="!w-10 !h-10 transition-all duration-500 group-hover:scale-110"
                    :class="step === 1 ? 'text-primary' : step === 2 ? 'text-success' : step === 3 ? 'text-warning' : 'text-info'" />
                  <div
                    class="absolute -bottom-3 -right-3 font-black text-7xl text-base-content/5 select-none font-mono group-hover:text-primary/10 transition-colors">
                    0{{ step }}</div>
                </div>
                <div class="space-y-2">
                  <h4 class="font-bold text-xl group-hover:text-primary transition-colors">{{
                    t(`tutorial_section.step${step}_title`) }}</h4>
                  <p class="text-sm text-base-content/50 leading-relaxed max-w-[200px] mx-auto">{{
                    t(`tutorial_section.step${step}_desc`) }}</p>
                </div>

                <div
                  class="mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                  <span
                    class="btn btn-xs btn-outline rounded-full border-base-content/20 text-xs font-normal lowercase">view
                    details</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<style scoped>
@keyframes shine {
  to {
    background-position: 200% center;
  }
}

.animate-shine {
  animation: shine 6s linear infinite;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: scale(1.05);
}

.dashed-line {
  background-image: linear-gradient(to right, currentColor 50%, transparent 50%);
  background-size: 20px 100%;
  opacity: 0.1;
}
</style>


<i18n lang="json">{
  "en": {
    "download_page": {
      "title_line1": "Explore Web3",
      "title_line2": "Within Reach",
      "description": "LIFE Wallet provides professional-grade data sovereignty protection and multi-chain asset management. Secure, private, and all-in-one. Start your digital journey now.",
      "title": "Download Client",
      "qr_title": "Scan to Install",
      "qr_desc": "Scan via Camera or Browser",
      "features": {
        "aes": "AES-256 Encryption",
        "multichain": "Multi-Chain Support",
        "custodial": "Non-Custodial"
      }
    },
    "tutorial_section": {
      "title": "Get Started",
      "subtitle": "Begin your decentralized journey in 4 simple steps",
      "step1_title": "Create Identity",
      "step1_desc": "One-click generation of decentralized identity",
      "step2_title": "Secure Backup",
      "step2_desc": "Safely store your mnemonic phrase offline",
      "step3_title": "Manage Assets",
      "step3_desc": "One-stop management for multi-chain assets",
      "step4_title": "Ecosystem",
      "step4_desc": "Connect with rich social and DApp ecosystem"
    }
  },
  "zh-CN": {
    "download_page": {
      "title_line1": "畅游 Web3",
      "title_line2": "触手可及",
      "description": "LIFE 资产为您提供专业级的数据主权保护与多链资产管理。安全、隐私、一站式，即刻开启您的数字之旅。",
      "title": "下载客户端",
      "qr_title": "手机扫码安装",
      "qr_desc": "推荐使用系统相机或浏览器扫码",
      "features": {
        "aes": "AES-256 加密",
        "multichain": "多链支持",
        "custodial": "非托管"
      }
    },
    "tutorial_section": {
      "title": "使用指南",
      "subtitle": "只需4步，轻松上手",
      "step1_title": "创建用户",
      "step1_desc": "一键创建去中心化身份",
      "step2_title": "安全备份",
      "step2_desc": "离线保存助记词，保护资产安全",
      "step3_title": "资产管理",
      "step3_desc": "多链资产一站式管理",
      "step4_title": "生态交互",
      "step4_desc": "体验丰富的社交与 DApp 生态"
    }
  },
  "zh-TW": {
    "download_page": {
      "title_line1": "暢遊 Web3",
      "title_line2": "觸手可及",
      "description": "LIFE 錢包為您提供專業級的數據主權保護與多鏈資產管理。安全、隱私、一站式，即刻開啟您的數字之旅。",
      "title": "下載客戶端",
      "qr_title": "手機掃碼安裝",
      "qr_desc": "推薦使用系統相機或瀏覽器掃碼",
      "features": {
        "aes": "AES-256 加密",
        "multichain": "多鏈支持",
        "custodial": "非託管"
      }
    },
    "tutorial_section": {
      "title": "使用指南",
      "subtitle": "只需4步，輕鬆上手",
      "step1_title": "創建用户",
      "step1_desc": "一鍵創建去中心化身份",
      "step2_title": "安全備份",
      "step2_desc": "離線保存助記詞，保護資產安全",
      "step3_title": "資產管理",
      "step3_desc": "多鏈資產一站式管理",
      "step4_title": "生態交互",
      "step4_desc": "體驗豐富的社交與 DApp 生態"
    }
  }
}</i18n>