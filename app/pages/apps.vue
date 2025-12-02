<template>
  <div class="modal" :class="{ 'modal-open': showModal }">
    <div class="modal-box max-w-10xl max-h-[110vh]">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-bold">{{ modalTitle }}</h3>
        <p v-if="modalImages.length > 1" class="text-sm text-base-content/60">
           步骤{{ currentImageIndex + 1 }} / {{ modalImages.length }}
        </p>
        <button class="btn btn-sm btn-circle" @click="closeModal">✕</button>
      </div>
      <div class="flex justify-center items-center relative">
       <button 
            v-if="modalImages.length > 1 && currentImageIndex > 0"
            class="rounded-full bg-base-100 p-4 relative overflow-hidden group border border-base-content/5 hover:border-accent/30 transition-all duration-500 shadow-sm absolute left-2 z-10 flex items-center justify-center"
            @click="prevImage"
          >
            <div class="absolute inset-0 bg-linear-to-br from-base-content/6 to-base-content/2"></div>
            <div class="relative z-10 w-10 h-10 flex items-center justify-center text-accent">
              <Icon name="heroicons:chevron-left" class="!w-8 !h-8" />
            </div>
          </button>
        <div class="w-full h-full flex items-center justify-center p-4">
          <img 
            v-if="modalImages.length > 0 && modalImages[currentImageIndex]"
            :src="modalImages[currentImageIndex]" 
            :alt="`${modalTitle} - 步骤 ${currentImageIndex + 1}`" 
            class="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl"
            @error="handleImageError" 
            />
        </div>
       <button 
            v-if="modalImages.length > 1 && currentImageIndex < modalImages.length - 1"
            class="rounded-full bg-base-100 p-4 relative overflow-hidden group border border-base-content/5 hover:border-accent/30 transition-all duration-500 shadow-sm absolute right-2 z-10 flex items-center justify-center"
            @click="nextImage"
          >
            <div class="absolute inset-0 bg-linear-to-br from-base-content/6 to-base-content/2"></div>
            <div class="relative z-10 w-10 h-10 flex items-center justify-center text-accent">
              <Icon name="heroicons:chevron-right" class="!w-8 !h-8" />
            </div>
          </button>
      </div>
      <div v-if="modalImages.length > 1" class="flex justify-center mt-4 space-x-2">
        <button
          v-for="(img, index) in modalImages"
          :key="index"
          class="w-10 h-10 rounded-full transition-all duration-300 border-2 border-base-300"
          :class="currentImageIndex === index ? 'bg-primary border-primary scale-125' : 'bg-base-300 hover:bg-base-400'"
          @click="currentImageIndex = index"
          :aria-label="`跳转到步骤 ${index + 1}`"
          >
        </button>
      </div>
    </div>
  </div>
  <div
    class="min-h-full h-[calc(100vh-90px)] bg-base-100 text-base-content font-sans relative overflow-hidden selection:bg-primary selection:text-primary-content flex flex-col">
    <div class="absolute inset-0 bg-base-100 z-0"></div>
    <div class="absolute inset-y-0 right-0 w-3/4 z-0 " :style="{
      backgroundImage: 'url(/imgs/background.png)',
      backgroundSize: 'cover',
      backgroundPosition: 'left 80%',
      backgroundRepeat: 'no-repeat'
    }">
    </div>
    <div class="absolute inset-0 z-0">
      <div class="absolute right-1/4 top-1/4 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
    </div>

    <main class="flex-1 w-full flex items-center py-4 sm:py-8 lg:py-12 overflow-y-auto overflow-x-hidden">
      <div class="container mx-auto sm:px-6">
        <div class="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-16">
          <div class="w-full lg:w-1/2 text-center lg:text-left space-y-5 sm:space-y-6 z-10 order-2 lg:order-1 lg:pr-8 xl:pr-20">
            <div class="space-y-3">
              <h1 class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight leading-[1.1]">
                {{ t('download_page.title_line1') }}<br>
                <span class="text-primary">{{ t('download_page.title_line2') }}</span>
              </h1>
              <p class="text-sm sm:text-base text-base-content/60 max-w-md mx-auto lg:mx-0 leading-relaxed">
                {{ t('download_page.description') }}
              </p>
            </div>

            <div class="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                class="btn btn-md sm:btn-lg h-auto py-3 px-4 sm:px-6 rounded-xl border-0 bg-base-content text-base-100 hover:bg-primary hover:scale-[1.02] transition-all shadow-lg shadow-base-content/10 flex items-center justify-start gap-3 group text-left">
                <Icon name="logos:android-icon" class="w-6 h-6 sm:w-7 sm:h-7 shrink-0" />
                <div class="flex flex-col">
                  <span class="text-[10px] sm:text-xs opacity-70 font-medium">{{ t('download_page.android_sub')
                  }}</span>
                  <span class="text-sm sm:text-base font-bold">{{ t('download_page.android_label') }}</span>
                </div>
                <Icon name="heroicons:arrow-down-tray"
                  class="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all ml-auto" />
              </button>

              <button
                class="btn btn-md sm:btn-lg h-auto py-3 px-4 sm:px-6 rounded-xl bg-base-200 text-base-content border border-base-content/5 hover:bg-base-300 hover:scale-[1.02] transition-all flex items-center justify-start gap-3 group text-left">
                <Icon name="mingcute:apple-fill" size="1.5rem"
                  class="w-6 h-6 sm:w-7 sm:h-7 text-base-content shrink-0" />
                <div class="flex flex-col">
                  <span class="text-[10px] sm:text-xs opacity-60 font-medium">{{ t('download_page.ios_sub') }}</span>
                  <span class="text-sm sm:text-base font-bold">{{ t('download_page.ios_label') }}</span>
                </div>
              </button>
            </div>

            <div class="hidden lg:flex items-center gap-3 pt-2 opacity-70">
              <div class="p-1 bg-white rounded-lg">
                <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://life.app"
                  class="w-14 h-14 xl:w-16 xl:h-16 mix-blend-multiply" alt="QR Code">
              </div>
              <div class="text-xs xl:text-sm text-base-content/60">
                <p class="font-bold text-base-content">{{ t('download_page.qr_title') }}</p>
                <p>{{ t('download_page.qr_desc') }}</p>
              </div>
            </div>

            <div
              class="flex items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2 text-[9px] sm:text-[10px] font-bold text-base-content/40 uppercase tracking-wider flex-wrap">
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:shield-check" class="text-success shrink-0" /> {{ t('download_page.features.aes')
                }}
              </span>
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:cube-transparent" class="shrink-0" /> {{ t('download_page.features.multichain') }}
              </span>
              <span class="flex items-center gap-1.5">
                <Icon name="heroicons:lock-closed" class="shrink-0" /> {{ t('download_page.features.custodial') }}
              </span>
            </div>
          </div>
          <div class="w-full lg:w-2/5 flex justify-center relative order-1 lg:order-2">
            <div
              class="relative w-full max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] flex items-center justify-center">
              <img src="/imgs/phone.png" alt="LifeChain App Preview"
                class="w-full h-auto object-contain transform transition-transform duration-700 hover:scale-105 z-20 relative">
            </div>
          </div>
        </div>
      </div>
    </main>

    <div class="h-1/5 w-full bg-gradient-to-t from-base-200 to-base-100 border-t border-base-300 flex items-center justify-center">
      <div class="container mx-auto px-6">
        <div class="text-center mb-4">
          <h3 class="text-xl font-bold text-base-content mb-2">{{ t('tutorial_section.title') }}</h3>
          <p class="text-sm text-base-content/60 max-w-2xl mx-auto">{{ t('tutorial_section.subtitle') }}</p>
        </div>
        
        <div class="relative">
          <div class="absolute top-6 left-0 right-0 h-0.5 bg-primary/20 hidden sm:block"></div>
          
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div class="flex flex-col items-center text-center space-y-3 group cursor-pointer" @click="openStepModal(1)">
              <div class="relative">
                <div class="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-all duration-300">
                  <Icon name="heroicons:arrow-down-tray" class="w-6 h-6 text-primary" />
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">1</span>
                </div>
              </div>
              <div class="space-y-1">
                <p class="font-semibold text-base text-base-content">{{ t('tutorial_section.step1_title') }}</p>
                <p class="text-xs text-base-content/60">{{ t('tutorial_section.step1_desc') }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center text-center space-y-3 group cursor-pointer" @click="openStepModal(2)">
              <div class="relative">
                <div class="w-14 h-14 rounded-full bg-success/20 flex items-center justify-center group-hover:bg-success/30 transition-all duration-300">
                  <Icon name="heroicons:plus-circle" class="w-6 h-6 text-success" />
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">2</span>
                </div>
              </div>
              <div class="space-y-1">
                <p class="font-semibold text-base text-base-content">{{ t('tutorial_section.step2_title') }}</p>
                <p class="text-xs text-base-content/60">{{ t('tutorial_section.step2_desc') }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center text-center space-y-3 group cursor-pointer" @click="openStepModal(3)">
              <div class="relative">
                <div class="w-14 h-14 rounded-full bg-warning/20 flex items-center justify-center group-hover:bg-warning/30 transition-all duration-300">
                  <Icon name="heroicons:key" class="w-6 h-6 text-warning" />
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-warning rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">3</span>
                </div>
              </div>
              <div class="space-y-1">
                <p class="font-semibold text-base text-base-content">{{ t('tutorial_section.step3_title') }}</p>
                <p class="text-xs text-base-content/60">{{ t('tutorial_section.step3_desc') }}</p>
              </div>
            </div>
            
            <div class="flex flex-col items-center text-center space-y-3 group cursor-pointer" @click="openStepModal(4)">
              <div class="relative">
                <div class="w-14 h-14 rounded-full bg-info/20 flex items-center justify-center group-hover:bg-info/30 transition-all duration-300">
                  <Icon name="heroicons:rocket-launch" class="w-6 h-6 text-info" />
                </div>
                <div class="absolute -top-2 -right-2 w-6 h-6 bg-info rounded-full flex items-center justify-center">
                  <span class="text-white text-xs font-bold">4</span>
                </div>
              </div>
              <div class="space-y-1">
                <p class="font-semibold text-base text-base-content">{{ t('tutorial_section.step4_title') }}</p>
                <p class="text-xs text-base-content/60">{{ t('tutorial_section.step4_desc') }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-6 pt-4 border-t border-base-300">
          <div class="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div class="flex space-x-6 text-sm">
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors">{{ t('footer.home') }}</a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors">{{ t('footer.about') }}</a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors">{{ t('footer.apps') }}</a>
              <a href="#" class="text-base-content/70 hover:text-primary transition-colors">{{ t('footer.blog') }}</a>
            </div>
            <div class="text-xs text-base-content/50 text-center sm:text-right">
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