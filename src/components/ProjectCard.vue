<script setup>
import { ref } from 'vue';
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
    }
});

const showModal = ref(false);
const openModal = () => {
    showModal.value = true;
};

const closeModal = () => {
    showModal.value = false;
};
</script>

<template>
    <div class="h-18 md:h-20 overflow-hidden rounded-xl md:shadow-lg transition-all duration-75" @click="openModal">
        <div class="w-full h-full flex items-center font-['Manrope',_sans-serif] font-semibold md:bg-[#343434] md:p-3">
            <div class="h-full aspect-square flex-shrink-0 mr-4">
                <img :src="props.image" :alt="props.title" class="h-full w-full object-cover rounded-xl">
            </div>
            <div class="flex-grow">
                <h3 class="text-white truncate">{{ props.title }}</h3>
            </div>
        </div>
    </div>
    
    <ProjectModal 
        :show="showModal" 
        :image="props.image" 
        :title="props.title" 
        :technologies="props.technologies"
        :description="props.description"
        @close="closeModal" 
    />
</template>