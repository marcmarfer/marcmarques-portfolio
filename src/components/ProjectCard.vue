<script setup>
const props = defineProps({
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});
</script>

<template>
    <div class="h-20 overflow-hidden rounded-xl shadow-lg border-l-3 border-[#FFD700] md:border-l-0 md:hover:border-l-4 transition-all duration-75">
        <div class="w-full h-full flex items-center font-['Manrope',_sans-serif] font-semibold bg-gradient-to-r bg-[#373A40] shadow-lg p-3">
            <div class="h-full flex-shrink-0 mr-4">
                <img :src="props.image" :alt="props.title" class="h-full w-auto object-contain max-w-[60px] rounded-xl">
            </div>
            <div class="flex-grow">
                <h3 class="text-white truncate">{{ props.title }}</h3>
            </div>
        </div>
    </div>
</template>