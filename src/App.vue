<script setup>
import Header from './pages/Header.vue';
import CursorEffect from './components/CursorEffect.vue';
import Home from './pages/Home.vue';
import Experience from './pages/Experience.vue';
import Projects from './pages/Projects.vue';
import Aboutme from './pages/Aboutme.vue';
import Contact from './pages/Contact.vue';
</script>

<template>
  <CursorEffect />
  <Header />
  <Home id="home" />
  <Experience id="experience" />
  <Projects id="projects" />
  <Aboutme id="about-me" />
  <Contact id="contact" />
</template>
