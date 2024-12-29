<script setup>
import Header from './components/Header.vue';
import CursorEffect from './components/CursorEffect.vue';
import Home from './components/Home.vue';
import Experience from './components/Experience.vue';
import Projects from './components/Projects.vue';
import Aboutme from './components/Aboutme.vue';
import Contact from './components/Contact.vue';
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
