<script setup>
import { ref, inject } from 'vue';
import ProjectModal from './ProjectModal.vue';

const props = defineProps({
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

const isModalOpen = inject('isModalOpen');
const showModal = ref(false);

const openModal = () => {
    showModal.value = true;
    isModalOpen.value = true;
};

const closeModal = () => {
    showModal.value = false;
    isModalOpen.value = false;
};
</script>

<template>
    <div 
        class="h-18 md:h-20 overflow-hidden rounded-xl md:shadow-lg transition-all duration-75 cursor-pointer max-w-[350px] md:max-w-full" 
        @click="openModal"
        @mouseenter="$emit('mouseenter')"
        @mouseleave="$emit('mouseleave')"
    >
        <div class="w-full h-full flex items-center font-['Manrope',_sans-serif] font-semibold bg-[#343434] p-3 text-white">
            <div class="h-full aspect-square flex-shrink-0 mr-4">
                <img :src="props.image" :alt="props.title" class="h-full w-full object-cover rounded-xl">
            </div>
            <div class="flex-grow">
                <h3 class="truncate">{{ props.title }}</h3>
            </div>
        </div>
    </div>
    
    <ProjectModal 
        :show="showModal" 
        :image="props.image" 
        :title="props.title" 
        :technologies="props.technologies"
        :description="props.description"
        :codeUrl="props.codeUrl"
        :previewUrl="props.previewUrl"
        @close="closeModal" 
    />
</template>