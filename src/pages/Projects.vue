<script setup>
import TechStackBar from '../components/TechStackBar.vue';
import ProjectCard from '../components/ProjectCard.vue';
import { ref, inject } from 'vue';

const technologies = ref([
    { name: 'HTML', icon: 'html.png' },
    { name: 'CSS', icon: 'css.png' },
    { name: 'JavaScript', icon: 'javascript.png' },
    { name: 'Typescript', icon: 'typescript.svg' },
    { name: 'Vue', icon: 'vue.svg' },
    { name: 'React', icon: 'react.png' },
    { name: 'Angular', icon: 'angular.png' },
    { name: 'Astro', icon: 'astro.png' },
    { name: 'Tailwind CSS', icon: 'tailwind.png' },
    { name: 'Bootstrap', icon: 'bootstrap.png' },
    { name: 'Figma', icon: 'figma.png' },
    { name: 'Threejs', icon: 'threejs.png' },
    { name: 'Laravel', icon: 'laravel.png' },
    { name: 'Nodejs', icon: 'nodejs.png' }, 
    { name: 'Express', icon: 'express.png' },
    { name: 'MySQL', icon: 'mysql.png' },
    { name: 'PostgreSQL', icon: 'postgresql.png' },
    { name: 'Git', icon: 'git.png' },
    { name: 'Github', icon: 'github.png' },
    { name: 'Docker', icon: 'docker.png' },
    { name: 'Nginx', icon: 'nginx.png' },
])

const isCursorVisible = inject('isCursorVisible');

const handleCursorHover = () => {
    isCursorVisible.value = false;
};

const handleCursorLeave = () => {
    isCursorVisible.value = true;
};
</script>

<template>
    <div>
        <h1 class="text-[2rem] md:text-center md:text-[2.5rem] text-white font-semibold mb-8 md:mb-10 font-['Onest',_sans-serif]">Projects</h1>
        <TechStackBar
            :technologies="technologies"
            @mouseenter="handleCursorHover"
            @mouseleave="handleCursorLeave"
        />
        <h2 class="max-w-4xl mx-auto text-[1.25rem] md:text-[1.5rem] text-white font-semibold mb-4 font-['Onest',_sans-serif]">Launched and maintained</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
            <ProjectCard 
            :image="'/images/projects/otio.png'" 
            :title="'Otio App'" 
            class="cursor-pointer"
            @mouseenter="handleCursorHover"
            @mouseleave="handleCursorLeave"/>
            <ProjectCard 
            :image="'/images/projects/neumatrans.png'" 
            :title="'Neumatrans Dashboard'"
            class="cursor-pointer"
            @mouseenter="handleCursorHover"
            @mouseleave="handleCursorLeave"/>
            <ProjectCard 
            :image="'/images/projects/tloz.png'" 
            :title="'TLOZ fight game'"
            class="cursor-pointer"
            @mouseenter="handleCursorHover"
            @mouseleave="handleCursorLeave"/>
            <ProjectCard 
            :image="'/images/projects/sandbox.png'" 
            :title="'3D Sandbox'"
            class="cursor-pointer"
            @mouseenter="handleCursorHover"
            @mouseleave="handleCursorLeave"/>
        </div>
        <h2 class="max-w-4xl mx-auto text-[1.25rem] md:text-[1.5rem] text-white font-semibold mb-4 font-['Onest',_sans-serif]">In Progress...</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8 md:mb-10">
            <ProjectCard 
            :image="'/images/projects/bitbot.png'" 
            :title="'BitBot'"
            class="cursor-pointer"
            @mouseenter="handleCursorHover"
            @mouseleave="handleCursorLeave"/>
        </div>
    </div>
</template>
