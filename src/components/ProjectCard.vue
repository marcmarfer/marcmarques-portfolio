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
    <div class="h-20 md:h-22 overflow-hidden rounded-xl md:shadow-lg transition-all duration-75">
        <div class="w-full h-full flex items-center font-['Manrope',_sans-serif] font-semibold md:bg-[#343434] md:p-3">
            <div class="h-full aspect-square flex-shrink-0 mr-4">
                <img :src="props.image" :alt="props.title" class="h-full w-full object-cover rounded-xl">
            </div>
            <div class="flex-grow">
                <h3 class="text-white truncate">{{ props.title }}</h3>
            </div>
        </div>
    </div>
</template>