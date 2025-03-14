<script setup>
import TechStackBar from '../components/TechStackBar.vue';
import ProjectCard from '../components/ProjectCard.vue';
import { ref, inject } from 'vue';
import technologiesData from '../data/technologies.json';
import projectsData from '../data/projects.json';

const technologies = ref(technologiesData.technologies);
const launchedProjects = ref(projectsData.launched);
const inProgressProjects = ref(projectsData.inProgress);

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
        <h2 class="max-w-4xl mx-auto text-[1.25rem] md:text-[1.5rem] text-white font-semibold mb-4 font-['Onest',_sans-serif]">Tech Stack</h2>
        <TechStackBar
            :technologies="technologies"
            @mouseenter="handleCursorHover"
            @mouseleave="handleCursorLeave"
        />
        <h2 class="max-w-4xl mx-auto text-[1.25rem] md:text-[1.5rem] text-white font-semibold mb-4 font-['Onest',_sans-serif]">Launched and maintained</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-6">
            <ProjectCard 
                v-for="(project, index) in launchedProjects" 
                :key="index"
                :image="project.image" 
                :title="project.title"
                :technologies="project.technologies"
                :description="project.description"
                class="cursor-pointer"
                @mouseenter="handleCursorHover"
                @mouseleave="handleCursorLeave"
            />
        </div>
        <h2 class="max-w-4xl mx-auto text-[1.25rem] md:text-[1.5rem] text-white font-semibold mb-4 font-['Onest',_sans-serif]">In Progress...</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8 md:mb-10">
            <ProjectCard 
                v-for="(project, index) in inProgressProjects" 
                :key="index"
                :image="project.image" 
                :title="project.title"
                :technologies="project.technologies"
                :description="project.description"
                class="cursor-pointer"
                @mouseenter="handleCursorHover"
                @mouseleave="handleCursorLeave"
            />
        </div>
    </div>
</template>
