<script setup>
import TechStackBar from '../components/TechStackBar.vue';
import { ref } from 'vue';

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
</script>

<template>
    <div>
        <h1 class="text-[2rem] md:text-center md:text-[3rem] text-white font-semibold m-0 mb-8 md:mb-12 font-['Onest',_sans-serif]">Projects</h1>
        <TechStackBar :technologies="technologies"/>
    </div>
</template>
