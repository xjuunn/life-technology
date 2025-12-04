<template>
<div class="modal" :class="{ 'modal-open': showModal }">
  <title>life-下载</title>
    <div class="modal-box max-w-full sm:max-w-10xl max-h-screen sm:max-h-[110vh] w-11/12 sm:w-auto">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-base sm:text-lg font-bold truncate max-w-[60%]">{{ modalTitle }}</h3>
        <p v-if="modalImages.length > 1" class="text-xs sm:text-sm text-base-content/60">
          步骤{{ currentImageIndex + 1 }} / {{ modalImages.length }}
        </p>
        <button class="btn btn-sm btn-circle" @click="closeModal">✕</button>
      </div>
      <div class="flex justify-center items-center relative">
        <button 
          v-if="modalImages.length > 1 && currentImageIndex > 0"
          class="rounded-full bg-base-100 p-2 sm:p-4 relative overflow-hidden group border border-base-content/5 hover:border-accent/30 transition-all duration-500 shadow-sm absolute left-0 sm:left-2 z-10 flex items-center justify-center"
          @click="prevImage"
        >
          <div class="absolute inset-0 bg-linear-to-br from-base-content/6 to-base-content/2"></div>
          <div class="relative z-10 w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center text-accent">
            <Icon name="heroicons:chevron-left" class="!w-4 !h-4 sm:!w-8 sm:!h-8" />
          </div>
        </button>
        <div class="w-full h-full flex items-center justify-center p-2 sm:p-4">
          <img 
            v-if="modalImages.length > 0 && modalImages[currentImageIndex]"
            :src="modalImages[currentImageIndex]" 
            :alt="`${modalTitle} - 步骤 ${currentImageIndex + 1}`" 
            class="max-w-full max-h-[60vh] sm:max-h-[75vh] object-contain rounded-lg sm:rounded-xl shadow-xl sm:shadow-2xl"
            @error="handleImageError" 
          />
        </div>
        <button 
          v-if="modalImages.length > 1 && currentImageIndex < modalImages.length - 1"
          class="rounded-full bg-base-100 p-2 sm:p-4 relative overflow-hidden group border border-base-content/5 hover:border-accent/30 transition-all duration-500 shadow-sm absolute right-0 sm:right-2 z-10 flex items-center justify-center"
          @click="nextImage"
        >
          <div class="absolute inset-0 bg-linear-to-br from-base-content/6 to-base-content/2"></div>
          <div class="relative z-10 w-6 h-6 sm:w-10 sm:h-10 flex items-center justify-center text-accent">
            <Icon name="heroicons:chevron-right" class="!w-4 !h-4 sm:!w-8 sm:!h-8" />
          </div>
        </button>
      </div>
      <div v-if="modalImages.length > 1" class="flex justify-center mt-4 space-x-1 sm:space-x-2 overflow-x-auto py-2 px-4">
        <button
          v-for="(img, index) in modalImages"
          :key="index"
          class="w-6 h-6 sm:w-10 sm:h-10 flex-shrink-0 rounded-full transition-all duration-300 border-2 border-base-300"
          :class="currentImageIndex === index ? 'bg-primary border-primary scale-110 sm:scale-125' : 'bg-base-300 hover:bg-base-400'"
          @click="currentImageIndex = index"
          :aria-label="`跳转到步骤 ${index + 1}`"
        >
        </button>
      </div>
    </div>
  </div>
  <div
    class="min-h-screen bg-base-100 text-base-content font-sans relative overflow-x-hidden selection:bg-primary selection:text-primary-content flex flex-col">
    <div class="absolute inset-0 bg-base-100 z-0"></div>
    <!-- 移动端隐藏背景图 -->
    <div class="absolute inset-y-0 right-0 w-3/4 z-0 hidden sm:block" :style="{
      backgroundImage: 'url(/imgs/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'left 80%',
      backgroundRepeat: 'no-repeat'
    }">
    </div>
    <div class="absolute inset-0 z-0">
      <div class="absolute right-1/4 top-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
    </div>

    <main class="flex-1 w-full flex items-center py-2 sm:py-4 lg:py-8 xl:py-12 overflow-y-auto overflow-x-hidden px-2 sm:px-0">
      <div class="container mx-auto sm:px-6">
        <div class="flex flex-col lg:flex-row items-center justify-center gap-4 sm:gap-6 lg:gap-12 xl:gap-16">
          <div class="w-full lg:w-1/2 text-center lg:text-left space-y-4 sm:space-y-5 lg:space-y-6 z-10 order-2 lg:order-1 lg:pr-4 xl:pr-8 2xl:pr-20">
            <div class="space-y-2 sm:space-y-3">
              <h1 class="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black tracking-tight leading-[1.1]">
                {{ t('download_page.title_line1') }}<br>
                <span class="text-primary block sm:inline">{{ t('download_page.title_line2') }}</span>
              </h1>
              <p class="text-xs sm:text-sm md:text-base text-base-content/60 max-w-md mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0">
                {{ t('download_page.description') }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center lg:justify-start px-2 sm:px-0">
              <button
                class="btn btn-sm sm:btn-md lg:btn-lg h-auto py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-xl border-0 bg-base-content text-base-100 hover:bg-primary hover:scale-[1.02] transition-all shadow-lg shadow-base-content/10 flex items-center justify-start gap-2 sm:gap-3 group text-left w-full sm:w-auto">
                <Icon name="logos:android-icon" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 shrink-0" />
                <div class="flex flex-col text-left">
                  <span class="text-[9px] sm:text-xs opacity-70 font-medium">{{ t('download_page.android_sub')
                  }}</span>
                  <span class="text-xs sm:text-sm lg:text-base font-bold">{{ t('download_page.android_label') }}</span>
                </div>
                <Icon name="heroicons:arrow-down-tray"
                  class="w-3 h-3 sm:w-4 sm:h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ml-auto" />
              </button>

              <button
                class="btn btn-sm sm:btn-md lg:btn-lg h-auto py-2 sm:py-3 px-3 sm:px-4 lg:px-6 rounded-xl bg-base-200 text-base-content border border-base-content/5 hover:bg-base-300 hover:scale-[1.02] transition-all flex items-center justify-start gap-2 sm:gap-3 group text-left w-full sm:w-auto">
                <Icon name="mingcute:apple-fill" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-base-content shrink-0" />
                <div class="flex flex-col text-left">
                  <span class="text-[9px] sm:text-xs opacity-60 font-medium">{{ t('download_page.ios_sub') }}</span>
                  <span class="text-xs sm:text-sm lg:text-base font-bold">{{ t('download_page.ios_label') }}</span>
                </div>
              </button>
            </div>

            <div class="hidden lg:flex items-center gap-2 lg:gap-3 pt-2 opacity-70">
              <div class="p-1 bg-white rounded-lg">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://life.app"
                  class="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 mix-blend-multiply" alt="QR Code">
              </div>
              <div class="text-xs lg:text-sm xl:text-sm text-base-content/60">
                <p class="font-bold text-base-content">{{ t('download_page.qr_title') }}</p>
                <p>{{ t('download_page.qr_desc') }}</p>
              </div>
            </div>

            <div
              class="flex items-center justify-center lg:justify-start gap-1.5 sm:gap-2 lg:gap-3 xl:gap-4 pt-2 text-[8px] sm:text-[9px] md:text-[10px] font-bold text-base-content/40 uppercase tracking-wider flex-wrap">
              <span class="flex items-center gap-1 sm:gap-1.5">
                <Icon name="heroicons:shield-check" class="text-success shrink-0 w-3 h-3 sm:w-4 sm:h-4" /> {{ t('download_page.features.aes')
                }}
              </span>
              <span class="flex items-center gap-1 sm:gap-1.5">
                <Icon name="heroicons:cube-transparent" class="shrink-0 w-3 h-3 sm:w-4 sm:h-4" /> {{ t('download_page.features.multichain') }}
              </span>
              <span class="flex items-center gap-1 sm:gap-1.5">
                <Icon name="heroicons:lock-closed" class="shrink-0 w-3 h-3 sm:w-4 sm:h-4" /> {{ t('download_page.features.custodial') }}
              </span>
            </div>
          </div>
          <div class="w-full lg:w-2/5 flex justify-center relative order-1 lg:order-2 mb-4 sm:mb-0">
            <div
              class="relative w-full max-w-[200px] sm:max-w-[250px] lg:max-w-[300px] xl:max-w-[350px] 2xl:max-w-[400px] flex items-center justify-center">
              <img src="/imgs/phone.png" alt="LifeChain App Preview"
                class="w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105 z-20 relative">
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="w-full bg-gradient-to-t from-base-200 to-base-100 border-t border-base-300 flex items-center justify-center pt-4 sm:pt-6 pb-2 sm:pb-4">
      <div class="container mx-auto px-3 sm:px-4 md:px-6">
        <div class="text-center mb-3 sm:mb-4">
          <h3 class="text-lg sm:text-xl font-bold text-base-content mb-1 sm:mb-2">{{ t('tutorial_section.title') }}</h3>
          <p class="text-xs sm:text-sm text-base-content/60 max-w-2xl mx-auto px-2 sm:px-0">{{ t('tutorial_section.subtitle') }}</p>
        </div>
        
        <div class="relative">
          <div class="absolute top-6 left-0 right-0 h-0.5 bg-primary/20 hidden sm:block"></div>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
            <div class="flex flex-col items-center text-center space-y-2 sm:space-y-3 group cursor-pointer" @click="openStepModal(1)">
              <div class="relative">
                <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
                  <Icon name="heroicons:arrow-down-tray" class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary" />
                </div>
                <div class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-primary rounded-full flex items-center justify-center">
                  <span class="text-white text-[10px] sm:text-xs font-bold">1</span>
                </div>
              </div>
              <div class="space-y-0.5 sm:space-y-1">
                <p class="font-semibold text-xs sm:text-sm lg:text-base text-base-content">{{ t('tutorial_section.step1_title') }}</p>
                <p class="text-[10px] sm:text-xs text-base-content/60">{{ t('tutorial_section.step1_desc') }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center text-center space-y-2 sm:space-y-3 group cursor-pointer" @click="openStepModal(2)">
              <div class="relative">
                <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-success/20 flex items-center justify-center group-hover:bg-success/30 transition-all duration-300">
                  <Icon name="heroicons:plus-circle" class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-success" />
                </div>
                <div class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-success rounded-full flex items-center justify-center">
                  <span class="text-white text-[10px] sm:text-xs font-bold">2</span>
                </div>
              </div>
              <div class="space-y-0.5 sm:space-y-1">
                <p class="font-semibold text-xs sm:text-sm lg:text-base text-base-content">{{ t('tutorial_section.step2_title') }}</p>
                <p class="text-[10px] sm:text-xs text-base-content/60">{{ t('tutorial_section.step2_desc') }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center text-center space-y-2 sm:space-y-3 group cursor-pointer" @click="openStepModal(3)">
              <div class="relative">
                <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-warning/20 flex items-center justify-center group-hover:bg-warning/30 transition-all duration-300">
                  <Icon name="heroicons:key" class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-warning" />
                </div>
                <div class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-warning rounded-full flex items-center justify-center">
                  <span class="text-white text-[10px] sm:text-xs font-bold">3</span>
                </div>
              </div>
              <div class="space-y-0.5 sm:space-y-1">
                <p class="font-semibold text-xs sm:text-sm lg:text-base text-base-content">{{ t('tutorial_section.step3_title') }}</p>
                <p class="text-[10px] sm:text-xs text-base-content/60">{{ t('tutorial_section.step3_desc') }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center text-center space-y-2 sm:space-y-3 group cursor-pointer" @click="openStepModal(4)">
              <div class="relative">
                <div class="w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-full bg-info/20 flex items-center justify-center group-hover:bg-info/30 transition-all duration-300">
                  <Icon name="heroicons:rocket-launch" class="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-info" />
                </div>
                <div class="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-info rounded-full flex items-center justify-center">
                  <span class="text-white text-[10px] sm:text-xs font-bold">4</span>
                </div>
              </div>
              <div class="space-y-0.5 sm:space-y-1">
                <p class="font-semibold text-xs sm:text-sm lg:text-base text-base-content">{{ t('tutorial_section.step4_title') }}</p>
                <p class="text-[10px] sm:text-xs text-base-content/60">{{ t('tutorial_section.step4_desc') }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-base-300">
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div class="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors whitespace-nowrap">{{ t('footer.home') }}</a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors whitespace-nowrap">{{ t('footer.about') }}</a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors whitespace-nowrap">{{ t('footer.apps') }}</a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors whitespace-nowrap">{{ t('footer.blog') }}</a>
            </div>
            <div class="text-[10px] sm:text-xs text-base-content/50 text-center sm:text-right mt-2 sm:mt-0">
              <p>{{ t('footer.copyright') }}</p>
              <p>{{ t('footer.icp') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useAppI18n();

const showModal = ref(false);
const modalImages = ref([]);
const modalTitle = ref('');
const currentImageIndex = ref(0);

const openStepModal = (step) => {
  const stepConfig = {
    1: {
      images: [
        '/imgs/step1/10.png',
        '/imgs/step1/11.png', 
        '/imgs/step1/12.png',
        '/imgs/step1/13.png'
      ],
      title: t('tutorial_section.step1_title')
    },
    2: {
      images: [
        '/imgs/step2/13.png',
        '/imgs/step2/21.png', 
        '/imgs/step2/22.png',
        '/imgs/step2/23.png',
        '/imgs/step2/24.png',
        '/imgs/step2/25.png'
      ],
      title: t('tutorial_section.step2_title')
    },
    3: {
      images: [
        '/imgs/step3/31.png',
        '/imgs/step3/32.png', 
        '/imgs/step3/33.png'
      ],
      title: t('tutorial_section.step3_title')
    },
    4: {
      images: [
        '/imgs/step4/41.png',
        '/imgs/step4/42.png', 
        '/imgs/step4/43.png',
        '/imgs/step4/44.png',
        '/imgs/step4/45.png'
      ],
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

// 切换图片
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

const handleImageError = (event) => {
  console.error('图片加载失败:', event.target.src);
};

const closeModal = () => {
  showModal.value = false;
  modalImages.value = [];
  modalTitle.value = '';
  currentImageIndex.value = 0;
};
onMounted(() => {
  const handleKeydown = (event) => {
    if (event.key === 'Escape' && showModal.value) {
      closeModal();
    }
  };
  
  window.addEventListener('keydown', handleKeydown);
  
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
});
</script>

<i18n lang="json">{
  "en": {
    "download_page": {
      "title_line1": "Explore Web3",
      "title_line2": "Within Reach",
      "description": "LIFE Wallet provides professional-grade data sovereignty protection and multi-chain asset management. Secure, private, and all-in-one. Start your digital journey now.",
      "android_sub": "Download APK",
      "android_label": "Download for Android",
      "ios_sub": "Installer",
      "ios_label": "Download for iOS",
      "qr_title": "Scan to Install",
      "qr_desc": "Use camera or browser to scan",
      "features": {
        "aes": "AES-256",
        "multichain": "Multi-Chain",
        "custodial": "Non-Custodial"
      }
    },
    "tutorial_section": {
      "title": "How to Get Started",
      "subtitle": "Get started in 4 simple steps",
      "step1_title": "Create User",
      "step1_desc": "One-click setup",
      "step2_title": "Secure Backup",
      "step2_desc": "Protect your assets",
      "step3_title": "Manage Assets",
      "step3_desc": "Multi-chain support",
      "step4_title": "Social & Live",
      "step4_desc": "Chat and earn"
    }
  },
  "zh-CN": {
    "download_page": {
      "title_line1": "畅游 Web3",
      "title_line2": "触手可及",
      "description": "LIFE 钱包为您提供专业级的数据主权保护与多链资产管理。安全、隐私、一站式，即刻开启您的数字之旅。",
      "android_sub": "Download APK",
      "android_label": "Android 下载",
      "ios_sub": "Installer",
      "ios_label": "iOS 下载",
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
      "step1_desc": "一键创建",
      "step2_title": "安全备份",
      "step2_desc": "保护资产安全",
      "step3_title": "资产管理",
      "step3_desc": "多链支持",
      "step4_title": "社交直播",
      "step4_desc": "边聊边赚"
    }
  },
  "zh-TW": {
    "download_page": {
      "title_line1": "暢遊 Web3",
      "title_line2": "觸手可及",
      "description": "LIFE 錢包為您提供專業級的數據主權保護與多鏈資產管理。安全、隱私、一站式，即刻開啟您的數字之旅。",
      "android_sub": "Download APK",
      "android_label": "Android 下載",
      "ios_sub": "Installer",
      "ios_label": "iOS 下載",
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
      "step1_desc": "一鍵創建",
      "step2_title": "安全備份",
      "step2_desc": "保護資產安全",
      "step3_title": "資產管理",
      "step3_desc": "多鏈支持",
      "step4_title": "社交直播",
      "step4_desc": "邊聊邊賺"
    }
  }
}</i18n>