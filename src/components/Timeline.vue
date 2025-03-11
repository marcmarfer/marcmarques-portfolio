<script setup>
const props = defineProps({
  experiences: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="w-full overflow-x-hidden">
    <div class="relative max-w-4xl mx-auto">
      <div class="absolute left-[7px] top-0 bottom-0 w-0.5 bg-gray-600"></div>
      <div v-for="(experience, index) in experiences" :key="index"
        class="relative pl-[35px] md:pl-14 mb-8 md:mb-12 flex flex-col">
        <div
          class="absolute left-[0px] top-[5px] w-4 h-4 bg-[#fbf060] rounded-full z-10">
        </div>
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
</template>
