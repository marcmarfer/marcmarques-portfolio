<script setup>
const props = defineProps({
  experiences: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="w-full px-5 md:px-6 overflow-x-hidden">
    <div class="relative max-w-4xl mx-auto">
      <div class="absolute left-[15px] md:left-4 top-0 bottom-0 w-0.5 bg-gray-400"></div>
      <div v-for="(experience, index) in experiences" :key="index"
        class="relative pl-[50px] md:pl-14 mb-10 md:mb-12 flex flex-col">
        <div
          class="absolute left-[6px] md:left-[4px] top-[5px] w-5 h-5 md:w-6 md:h-6 bg-gray-600 rounded-full border-2 border-white z-10">
        </div>
        <div class="bg-white/5 rounded-lg p-5 md:p-6 w-full shadow-lg shadow-black/25">
          <h3 class="m-0 text-[1rem] md:text-[1.2rem] text-[#fbf060] font-['Manrope',_sans-serif] font-bold">
            {{ experience.title }}
          </h3>
          <p class="mt-1 mb-2.5 text-base md:text-[1rem] text-gray-400 font-['Manrope',_sans-serif] italic">
            {{ experience.date }}
          </p>
          <p class="my-1 text-sm md:text-base text-white font-['Manrope',_sans-serif] leading-relaxed" v-html="experience.description">
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
