<script setup>
import Timeline from "../components/Timeline.vue";
import { ref } from 'vue';

const experiences = ref([
{
    title: "CEO & Co-Founder - Otio App",
    date: "June 2024 - Present",
    description:
      "Together with my partner, I built our startup Otio from scratch—the first online ticketing application for all types of tasting experiences. I handle business (going to events like MWC, dealing with clients, etc.), programming, and design, developing new features and managing our commercial efforts. Check it out here: <a href='https://otioapp.com' target='_blank' rel='noopener noreferrer' class='text-[#fbf060] underline hover:text-[#f8ea36] transition-colors'>Otio App</a>"
  },
  {
    title: "Web Developer - Digalix",
    date: "October 2023 - June 2024",
    description:
      "Developed key features for a simracing management app including QR ticket validation, registration systems, and real-time simulator controls. Also created a backoffice application for 'LetRoom' at Casino de Barcelona that enabled administrators to create and manage interactive contests and generate dynamic content for their Unity-based experience."
  }
]);
</script>

<template>
  <div class="w-full max-w-full overflow-x-hidden">
    <h1 class="text-[2rem] md:text-center md:text-[2.5rem] text-white font-semibold m-0 mb-8 md:mb-10 font-['Onest',_sans-serif]">Experience</h1>
    <Timeline :experiences="experiences" />
  </div>
</template>
