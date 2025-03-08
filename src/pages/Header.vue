<script setup>
import { ref, onMounted } from 'vue';

const experienceButton = ref(null);
const projectsButton = ref(null);
const aboutMeButton = ref(null);
const contactButton = ref(null);

const currentPath = ref('');

const updateActiveLink = () => {
  currentPath.value = window.location.hash || window.location.pathname;
};

onMounted(() => {
  updateActiveLink();

  const links = {
    '#experience': experienceButton,
    '#projects': projectsButton,
    '#about-me': aboutMeButton,
    '#contact': contactButton,
  }

  const offsetTop = 100;

  for (const [path, button] of Object.entries(links)) {
    console.log(button, path)
    button.value.addEventListener('click', () => {
      currentPath.value = path;
      const destination = document.querySelector(path);
      const rect = destination.getBoundingClientRect();
      const app = document.querySelector('#app');

      app.scrollTo({
        top: rect.top + app.scrollTop - offsetTop,
        behavior: 'smooth',
      });
    });
  }
});

</script>

<template>
  <nav>
    <div
      class="fixed text-white top-3.5 left-0 right-0 mx-auto w-fit max-w-[90%] h-5% flex justify-center items-center gap-1 font-['Onest'] rounded-[50px] bg-gray-500/10 backdrop-blur-md border border-[#545454] z-10 px-4 py-2">
      <button ref="experienceButton" 
        :style="{ color: currentPath === '#experience' ? '#fbf060' : '' }"
        class="position-relative px-1.5 text-white text-base font-medium hover:text-[#fbf060]">experience</button>
      <button ref="projectsButton" 
        :style="{ color: currentPath === '#projects' ? '#fbf060' : '' }"
        class="position-relative px-1.5 text-white text-base font-medium hover:text-[#fbf060]">projects</button>
      <button ref="aboutMeButton" 
        :style="{ color: currentPath === '#about-me' ? '#fbf060' : '' }"
        class="position-relative px-1.5 text-white text-base font-medium hover:text-[#fbf060]">about</button>
      <button ref="contactButton"
        :style="{ color: currentPath === '#contact' ? '#fbf060' : '' }"
        class="position-relative px-1.5 text-white text-base font-medium hover:text-[#fbf060]">contact</button>
    </div>
  </nav>
</template>