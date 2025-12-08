<template>
  <div
    class="z-0 flex w-full h-full justify-center items-start overflow-hidden bg-base-100 transition-colors duration-300">
    <div
      class="relative w-full aspect-1056/495 mask-[linear-gradient(to_bottom,transparent,white_30%,white_70%,transparent)]"
      :style="{ color: themeColors.mapDots }">
      <div v-html="svgContent"
        class="pointer-events-none absolute inset-0 block size-full select-none [&>svg]:w-full [&>svg]:h-full transition-opacity duration-1000 ease-in-out will-change-opacity"
        :class="isMapReady ? 'opacity-100' : 'opacity-0'"></div>

      <svg v-if="isMapReady" viewBox="0 0 1056 495" class="pointer-events-none absolute inset-0 size-full select-none">
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="white" stop-opacity="0" />
            <stop offset="5%" :stop-color="themeColors.line" stop-opacity="1" />
            <stop offset="95%" :stop-color="themeColors.line" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>

        <g v-for="(route, i) in calculatedRoutes" :key="`path-group-${i}`">
          <path :d="route.path" fill="none" stroke="url(#path-gradient)" stroke-width="1" class="route-path"
            pathLength="1" :style="{ '--delay': `${i * 0.5}s` }" />
        </g>

        <g v-for="(route, i) in calculatedRoutes" :key="`points-group-${i}`" class="point-group"
          :style="{ '--delay': `${i * 0.5}s` }">
          <g>
            <circle :cx="route.start.x" :cy="route.start.y" r="2" :fill="themeColors.line" />
            <circle :cx="route.start.x" :cy="route.start.y" r="2" :fill="themeColors.line" opacity="0.5"
              class="pulse-circle" />
          </g>
          <g>
            <circle :cx="route.end.x" :cy="route.end.y" r="2" :fill="themeColors.line" />
            <circle :cx="route.end.x" :cy="route.end.y" r="2" :fill="themeColors.line" opacity="0.5"
              class="pulse-circle" />
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

const svgContent = ref('');
const isMapReady = ref(false);
const calculatedRoutes = ref<any[]>([]);
let mapWorker: Worker | null = null;

const routes = [
  {
    start: { lat: 39.9042, lng: 116.4074 },
    end: { lat: 51.5074, lng: -0.1278 }
  },
  {
    start: { lat: 31.2304, lng: 121.4737 },
    end: { lat: 34.0522, lng: -118.2437 }
  },
  {
    start: { lat: 22.5431, lng: 114.0579 },
    end: { lat: 1.3521, lng: 103.8198 }
  },
  {
    start: { lat: 30.5728, lng: 104.0668 },
    end: { lat: 48.8566, lng: 2.3522 }
  },
  {
    start: { lat: 22.3193, lng: 114.1694 },
    end: { lat: -33.8688, lng: 151.2093 }
  }
];

onMounted(() => {
  themeStore.initTheme();

  mapWorker = new Worker(new URL('~/assets/workers/map.worker.ts', import.meta.url), { type: 'module' });

  mapWorker.onmessage = (e: MessageEvent) => {
    svgContent.value = e.data.mapSvg;
    calculatedRoutes.value = e.data.routes;
    requestAnimationFrame(() => {
      isMapReady.value = true;
    });
    mapWorker?.terminate();
    mapWorker = null;
  };

  mapWorker.postMessage({ routes });
});

onUnmounted(() => {
  if (mapWorker) {
    mapWorker.terminate();
    mapWorker = null;
  }
});

const themeColors = computed(() => {
  if (themeStore.isDark) {
    return {
      line: '#ffffff',
      mapDots: '#ffffff30',
      bg: 'transparent'
    };
  } else {
    return {
      line: '#000000',
      mapDots: '#00000030',
      bg: 'transparent'
    };
  }
});
</script>

<style scoped>
.route-path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0;
  animation: draw 2s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  animation-delay: var(--delay);
  will-change: stroke-dashoffset, opacity;
}

.point-group {
  opacity: 0;
  animation: fadeIn 0.5s ease-out forwards;
  animation-delay: var(--delay);
  will-change: opacity;
}

.pulse-circle {
  transform-origin: center;
  transform-box: fill-box;
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  will-change: transform, opacity;
}

@keyframes draw {
  0% {
    stroke-dashoffset: 1;
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes pulse {

  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }

  50% {
    transform: scale(3);
    opacity: 0;
  }
}
</style>
