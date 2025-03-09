<script setup>
import { ref, onMounted, nextTick } from 'vue';

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
}

function stopDrag() {
  isDragging.value = false;
  container.value.style.cursor = 'grab';
}
</script>

<template>
  <div 
    ref="container" 
    class="flex relative max-w-4xl mx-auto mb-12 h-16 gap-10 text-white overflow-x-auto scrollbar-hide cursor-grab"
    @mousedown="startDrag"
    @mousemove="drag"
    @mouseup="stopDrag"
    @mouseleave="stopDrag"
  >
    <img 
      v-for="technology in technologies" 
      :key="technology.name" 
      class="h-full w-auto flex-shrink-0 flex items-center justify-center object-contain pointer-events-none"
      :src="`@/assets/images/${technology.icon}`" 
      :alt="technology.name" 
    />
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
</style>