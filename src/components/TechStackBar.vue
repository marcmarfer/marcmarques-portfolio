<script setup>
import { ref } from 'vue';

const props = defineProps({
  technologies: {
    type: Array,
    required: true,
  },
});

const container = ref(null);

const isDragging = ref(false);
const startX = ref(0);
const scrollLeft = ref(0);
const currentScrollPosition = ref(0);
const isAtLeftEdge = ref(true);
const isAtRightEdge = ref(false);

function updateScrollPosition() {
  if (!container.value) return;
  
  currentScrollPosition.value = container.value.scrollLeft;
  isAtLeftEdge.value = currentScrollPosition.value <= 0;
  isAtRightEdge.value = currentScrollPosition.value + container.value.clientWidth >= container.value.scrollWidth - 1;
}

function startDrag(event) {
  isDragging.value = true;
  startX.value = event.pageX - container.value.offsetLeft;
  scrollLeft.value = container.value.scrollLeft;
  container.value.style.cursor = 'grabbing';
}

function drag(event) {
  if (!isDragging.value) return;
  event.preventDefault();
  const x = event.pageX - container.value.offsetLeft;
  const scrollDistance = (x - startX.value);
  container.value.scrollLeft = scrollLeft.value - scrollDistance;
  updateScrollPosition();
}

function stopDrag() {
  isDragging.value = false;
  container.value.style.cursor = 'grab';
}

function handleScroll() {
  updateScrollPosition();
}

function maskClass() {
  if (isAtLeftEdge.value && isAtRightEdge.value) {
    return 'no-mask';
  } else if (isAtLeftEdge.value) {
    
    return 'mask-right-only';
  } else if (isAtRightEdge.value) {
    return 'mask-left-only';
  } else {
    return 'mask-both-sides';
  }
};
</script>

<template>
  <div 
    class="tech-stack-container relative max-w-4xl mx-auto mb-10 h-12"
    @mouseenter="$emit('mouseenter')"
    @mouseleave="$emit('mouseleave')"
  >
    <div 
      ref="container" 
      :class="['flex h-full gap-10 text-white overflow-x-auto scrollbar-hide cursor-grab no-select', maskClass()]"
      @mousedown="startDrag"
      @mousemove="drag"
      @mouseup="stopDrag"
      @mouseleave="stopDrag"
      @scroll="handleScroll"
    >
      <img 
        v-for="technology in technologies" 
        :key="technology.name" 
        class="h-full w-auto flex-shrink-0 flex items-center justify-center object-contain pointer-events-none"
        :src="`/images/${technology.icon}`" 
        :alt="technology.name" 
      />
    </div>
  </div>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cursor-grab {
  cursor: grab;
}

.cursor-grab:active {
  cursor: grabbing;
}

.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.mask-both-sides {
  mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
}

.mask-left-only {
  mask-image: linear-gradient(to right, transparent, black 10%);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%);
}

.mask-right-only {
  mask-image: linear-gradient(to right, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, black 90%, transparent);
}

.no-mask {
  mask-image: none;
  -webkit-mask-image: none;
}
</style>