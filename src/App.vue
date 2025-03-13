<script setup>
import Header from './pages/Header.vue';
import CursorEffect from './components/CursorEffect.vue';
import Home from './pages/Home.vue';
import Experience from './pages/Experience.vue';
import Projects from './pages/Projects.vue';
import Aboutme from './pages/Aboutme.vue';
import { ref, provide } from 'vue';

const isCursorVisible = ref(true);
provide('isCursorVisible', isCursorVisible);

const isModalOpen = ref(false);
provide('isModalOpen', isModalOpen);
</script>

<template>
  <CursorEffect />
  <Header />
  <Home id="home" />
  <Experience id="experience" />
  <Projects id="projects" />
  <Aboutme id="about-me" />
</template>
