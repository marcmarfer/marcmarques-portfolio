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
  position: fixed;
  top: 2.5%;
  left: 50%;
  transform: translateX(-50%);
  width: 29%;
  height: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  font-family: 'Onest', sans-serif;
  border-radius: 50px;
  background-color: rgba(120, 120, 120, 0.1);
  backdrop-filter: blur(8px);
  border: 1px solid #545454;
  z-index: 10;
}

.nav-link {
  position: relative;
  padding: 0px 6px;
  color: white;
  font-size: 1rem;
  transition: color 0.3s ease;
}

.nav-link:hover {
  color: #80f9e1;
}

.nav-link.active {
  color: #80f9e1;
}

/* .nav-link::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 0%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.8);
  transition: all 0.5s;
}

.nav-link:hover::after {
  width: 100%;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.8);
} */
</style>
