<script setup>
import { onMounted, onUnmounted, inject, watch } from 'vue';

const props = defineProps({
    show: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

const emit = defineEmits(['close']);

const isModalOpen = inject('isModalOpen');

watch(() => props.show, (newValue) => {
    isModalOpen.value = newValue;
});

const closeModal = () => {
    isModalOpen.value = false;
    emit('close');
};

const handleEscape = (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
};

onMounted(() => {
    document.addEventListener('keydown', handleEscape);
    if (props.show) {
        isModalOpen.value = true;
    }
});

onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
    isModalOpen.value = false;
});
</script>

<template>
    <div v-if="show" class="fixed inset-0 flex items-center justify-center z-[999]">
        <div class="bg-[#141414] w-full h-full">
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="flex flex-col md:flex-row h-full max-w-4xl mx-auto mt-20 md:mt-0 px-8 gap-8">
                <img :src="image" :alt="title" class="max-w-full md:max-w-[50%] max-h-full object-contain rounded-lg">
                <div class="overflow-y-auto h-full flex flex-col md:w-[50%] md:justify-center">
                    <h2 class="text-3xl font-bold text-white font-['Manrope',_sans-serif] md:mt-0">{{ title }}</h2>
                </div>
            </div>
        </div>
    </div>
</template>