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
    },
    codeUrl: {
        type: String,
        default: ''
    },
    previewUrl: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['close']);

const isModalOpen = inject('isModalOpen');
const isCursorVisible = inject('isCursorVisible');

const handleCursorHover = () => {
    isCursorVisible.value = false;
};

const handleCursorLeave = () => {
    isCursorVisible.value = true;
};

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
    <Transition name="fade">
        <div v-if="show" class="fixed inset-0 flex items-center justify-center z-[999]">
            <div class="w-full h-full modal-background overflow-y-auto">
                <button @click="closeModal" 
                       @mouseenter="handleCursorHover" 
                       @mouseleave="handleCursorLeave"
                       class="absolute top-4 right-4 text-gray-400 hover:text-white p-2 z-10 cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div class="flex flex-col md:flex-row max-w-5xl mx-auto my-20 md:my-0 md:min-h-screen md:items-center px-8 gap-6">
                    <div class="flex items-center md:w-[50%]">
                        <img :src="image" :alt="title" class="w-full max-w-[250px] md:max-w-full h-auto object-contain rounded-lg shadow-lg">
                    </div>
                    <div class="flex flex-col md:w-[50%] md:justify-center">
                        <h2 class="text-4xl md:text-6xl font-bold font-['Manrope',_sans-serif] md:mt-0 bg-gradient-to-b from-gray-400 to-white bg-clip-text text-transparent pb-2">{{ title }}</h2>
                        
                        <div class="flex flex-wrap gap-2 mt-4">
                            <span v-for="(tech, index) in technologies" :key="index" 
                                class="px-2.5 py-1 md:px-3 md:py-1 text-xs md:text-sm font-medium bg-[#524d21] text-gray-200 rounded-full border border-[#fbf060]">
                                {{ tech }}
                            </span>
                        </div>
                        
                        <div class="mt-6 text-gray-300">
                            <p class="text-base md:text-lg leading-relaxed">{{ description }}</p>
                        </div>
                        
                        <div class="flex flex-wrap gap-4 mt-8">
                            <a v-if="codeUrl" :href="codeUrl" target="_blank" rel="noopener noreferrer"
                               @mouseenter="handleCursorHover" 
                               @mouseleave="handleCursorLeave"
                               class="inline-flex items-center justify-center px-4 py-2 bg-transparent text-gray-200 rounded-md border border-gray-400 hover:bg-gray-500/30 transition-colors duration-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                                View Code
                            </a>
                            <a v-if="previewUrl" :href="previewUrl" target="_blank" rel="noopener noreferrer"
                               @mouseenter="handleCursorHover" 
                               @mouseleave="handleCursorLeave"
                               class="inline-flex items-center justify-center px-4 py-2 bg-transparent text-gray-200 rounded-md border border-gray-400 hover:bg-gray-500/30 transition-colors duration-200 cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.modal-background {
  background-image: url('/images/gradient-bg.png');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>