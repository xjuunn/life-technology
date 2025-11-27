<template>
  <div class="absolute inset-0 flex size-full items-center justify-center overflow-hidden font-sans bg-transparent">
    <div class="relative w-full aspect-1056/495">
      <img :src="`data:image/svg+xml;utf8,${encodeURIComponent(svgMap)}`"
        class="pointer-events-none absolute inset-0 block size-full select-none" alt="world map" :draggable="false" />
      <svg ref="svgRef" viewBox="0 0 1056 495" class="pointer-events-none absolute inset-0 size-full select-none">
        <g v-for="(dot, i) in props.dots" :key="`path-group-${i}`">
          <Motion :key="`start-upper-${i}`" as="path" :d="createCurvedPath(dot)" fill="none"
            stroke="url(#path-gradient)" stroke-width="1" :initial="{ pathLength: 0 }" :animate="{ pathLength: 1 }"
            :transition="{
              duration: 1.5,
              delay: 0.2 * i,
              ease: 'easeOut',
            }"></Motion>
        </g>
        <defs>
          <linearGradient id="path-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="white" stop-opacity="0" />
            <stop offset="5%" :stop-color="lineColor" stop-opacity="1" />
            <stop offset="95%" :stop-color="lineColor" stop-opacity="1" />
            <stop offset="100%" stop-color="white" stop-opacity="0" />
          </linearGradient>
        </defs>
        <g v-for="(dot, i) in props.dots" :key="`points-group-${i}`">
          <g :key="`start-${i}`">
            <circle :cx="projectPoint(dot.start.lat, dot.start.lng).x"
              :cy="projectPoint(dot.start.lat, dot.start.lng).y" r="2" :fill="props.lineColor" />
            <circle :cx="projectPoint(dot.start.lat, dot.start.lng).x"
              :cy="projectPoint(dot.start.lat, dot.start.lng).y" r="2" :fill="props.lineColor" opacity="0.5">
              <animate attribute-name="r" from="2" to="8" dur="1.5s" begin="0s" repeat-count="indefinite" />
              <animate attribute-name="opacity" from="0.5" to="0" dur="1.5s" begin="0s" repeat-count="indefinite" />
            </circle>
          </g>
          <g :key="`end-${i}`">
            <circle :cx="projectPoint(dot.end.lat, dot.end.lng).x" :cy="projectPoint(dot.end.lat, dot.end.lng).y" r="2"
              :fill="props.lineColor" />
            <circle :cx="projectPoint(dot.end.lat, dot.end.lng).x" :cy="projectPoint(dot.end.lat, dot.end.lng).y" r="2"
              :fill="props.lineColor" opacity="0.5">
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
import { computed } from "vue";

interface Dot {
  start: { lat: number; lng: number; label?: string };
  end: { lat: number; lng: number; label?: string };
}
interface Props {
  dots?: Array<Dot>;
  lineColor?: string;
  mapColor: string;
  mapBgColor?: string;
}

const props = withDefaults(defineProps<Props>(), {
  dots: () => [],
  lineColor: "#ffffff",
  mapBgColor: "transparent",
});

const map = new DottedMap({ height: 100, grid: "diagonal" });

const svgMap = computed(() =>
  map.getSVG({
    radius: 0.22,
    color: props.mapColor,
    shape: "circle",
    backgroundColor: props.mapBgColor,
  }),
);

function projectPoint(lat: number, lng: number) {
  const x = (lng + 180) * (1056 / 360);
  const y = (90 - lat) * (495 / 180);
  return { x, y };
}

function createCurvedPath(dot: Dot) {
  const start = projectPoint(dot.start.lat, dot.start.lng);
  const end = projectPoint(dot.end.lat, dot.end.lng);
  const midX = (start.x + end.x) / 2;
  const deltaX = Math.abs(start.x - end.x);
  const curveHeight = Math.min(deltaX / 2 + 20, 80);
  const midY = Math.min(start.y, end.y) - curveHeight;
  return `M ${start.x} ${start.y} Q ${midX} ${midY} ${end.x} ${end.y}`;
}
</script>