<script setup>
//script for the active link class to do the underline effect
import { ref, onMounted } from 'vue';

const currentPath = ref('');

const updateActiveLink = () => {
  currentPath.value = window.location.hash || window.location.pathname;
};

onMounted(() => {
  updateActiveLink();
  window.addEventListener('hashchange', updateActiveLink);
  window.addEventListener('popstate', updateActiveLink);
});
</script>

<template>
  <nav>
    <a href="#home" :class="['nav-link', currentPath === '#home' ? 'active' : '']">home</a>
    <a href="#experience" :class="['nav-link', currentPath === '#experience' ? 'active' : '']">experience</a>
    <a href="#projects" :class="['nav-link', currentPath === '#projects' ? 'active' : '']">projects</a>
    <a href="#about-me" :class="['nav-link', currentPath === '#about-me' ? 'active' : '']">about me</a>
    <a href="#contact" :class="['nav-link', currentPath === '#contact' ? 'active' : '']">contact</a>
  </nav>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap');

nav {
    width: 100%;
    height: 10%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4rem;
    font-family: 'Onest', sans-serif;
}

.nav-link {
    color: white;
    font-size: 1.2rem;
    padding: 0px 6px;
    position: relative;
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: white;
    transition: all 0.5s;
}

.nav-link:hover::after {
    width: 100%;
}

.nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: white;
}
</style>
