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
    },
    technologies: {
        type: Array,
        default: () => []
    },
    description: {
        type: String,
        default: ''
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
        <div class="bg-[#141414] w-full h-full overflow-y-auto">
            <button @click="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 z-10">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            <div class="flex flex-col md:flex-row h-full max-w-5xl mx-auto mt-20 mb-20 md:mt-0 px-8 gap-8">
                <div class="flex items-center md:w-[50%]">
                    <img :src="image" :alt="title" class="w-full max-w-[400px] md:max-w-full h-auto object-contain rounded-lg">
                </div>
                <div class="h-full flex flex-col md:w-[50%] md:justify-center">
                    <h2 class="text-4xl md:text-6xl font-bold font-['Manrope',_sans-serif] md:mt-0 bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent pb-2">{{ title }}</h2>
                    
                    <div class="flex flex-wrap gap-2 mt-4">
                        <span v-for="(tech, index) in technologies" :key="index" 
                              class="px-3 py-1 text-sm font-medium bg-gray-800 text-gray-300 rounded-full border border-gray-700">
                            {{ tech }}
                        </span>
                    </div>
                    
                    <div class="mt-6 text-gray-300">
                        <p class="text-lg leading-relaxed">{{ description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>