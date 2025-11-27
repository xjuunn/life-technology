<template>
  <div
    class="z-0 flex w-full h-full justify-center items-start overflow-hidden bg-base-100 transition-colors duration-300">

    <div
      class="relative w-full aspect-1056/495 mask-[linear-gradient(to_bottom,transparent,white_30%,white_70%,transparent)]">
      <!-- 底图 -->
      <img :src="`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`"
        class="pointer-events-none absolute inset-0 block size-full select-none" alt="world map" :draggable="false" />

      <!-- 线条层 -->
      <svg viewBox="0 0 1056 495" class="pointer-events-none absolute inset-0 size-full select-none">
        <g v-for="(dot, i) in routes" :key="`path-group-${i}`">
          <Motion as="path" :d="createCurvedPath(dot)" fill="none" stroke="url(#path-gradient)" stroke-width="1"
            :initial="{ pathLength: 0 }" :animate="{ pathLength: 1 }" :transition="{
              duration: 1.5,
              delay: 0.2 * i,
              ease: 'easeOut',
            }"></Motion>
        </g>
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="white" stop-opacity="0" />
            <stop offset="5%" :stop-color="themeColors.line" stop-opacity="1" />
            <stop offset="95%" :stop-color="themeColors.line" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
        <g v-for="(dot, i) in routes" :key="`points-group-${i}`">
          <g>
            <circle :cx="projectPoint(dot.start.lat, dot.start.lng).x"
              :cy="projectPoint(dot.start.lat, dot.start.lng).y" r="2" :fill="themeColors.line" />
            <circle :cx="projectPoint(dot.start.lat, dot.start.lng).x"
              :cy="projectPoint(dot.start.lat, dot.start.lng).y" r="2" :fill="themeColors.line" opacity="0.5">
              <animate attribute-name="r" from="2" to="8" dur="1.5s" begin="0s" repeat-count="indefinite" />
              <animate attribute-name="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeat-count="indefinite" />
            </circle>
          </g>
          <g>
            <circle :cx="projectPoint(dot.end.lat, dot.end.lng).x" :cy="projectPoint(dot.end.lat, dot.end.lng).y" r="2"
              :fill="themeColors.line" />
            <circle :cx="projectPoint(dot.end.lat, dot.end.lng).x" :cy="projectPoint(dot.end.lat, dot.end.lng).y" r="2"
              :fill="themeColors.line" opacity="0.5">
              <animate attribute-name="r" from="2" to="8" dur="1.5s" begin="0s" repeat-count="indefinite" />
              <animate attribute-name="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeat-count="indefinite" />
            </circle>
          </g>
        </g>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
import DottedMap from "dotted-map";
import { Motion } from "motion-v";
import { computed, onMounted } from "vue";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();

onMounted(() => {
  themeStore.initTheme();
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
      mapDots: '#00000020',
      bg: 'transparent'
    };
  }
});

const map = new DottedMap({ height: 100, grid: "diagonal" });

const svgMap = computed(() =>
  map.getSVG({
    radius: 0.22,
    color: themeColors.value.mapDots,
    shape: "circle",
    backgroundColor: themeColors.value.bg,
  })
);

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

function projectPoint(lat: number, lng: number) {
  const x = (lng + 180) * (1056 / 360);
  const y = (90 - lat) * (495 / 180);
  return { x, y };
}

function createCurvedPath(dot: any) {
  const start = projectPoint(dot.start.lat, dot.start.lng);
  const end = projectPoint(dot.end.lat, dot.end.lng);
  const midX = (start.x + end.x) / 2;
  const deltaX = Math.abs(start.x - end.x);
  const curveHeight = Math.min(deltaX / 2 + 20, 80);
  const midY = Math.min(start.y, end.y) - curveHeight;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}
</script>