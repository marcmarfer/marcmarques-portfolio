<template>
    <div class="timeline-container">
      <div class="timeline">
        <div v-for="(experiences, index) in experiences" :key="index" class="timeline-item">
          <div class="timeline-dot"></div>
          <div class="timeline-content">
            <h3>{{ experiences.title }}</h3>
            <p>{{ experiences.date }}</p>
            <p>{{ experiences.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { defineProps } from "vue";
  
  const props = defineProps({
    experiences: {
      type: Array,
      required: true,
    },
  });
  </script>
  
  <style scoped>
  .timeline-container {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 100%;
  }
  
  .timeline {
    position: relative;
    width: 2px;
    background-color: #ccc;
    height: 100%;
    transform: translateX(-250px);
  }
  
  .timeline-item {
    position: relative;
    margin-bottom: 40px;
    padding-left: 25px;
  }
  
  .timeline-dot {
    position: absolute;
    left: -13px;
    top: 0;
    width: 22px;
    height: 22px;
    background-color: #686868;
    border-radius: 50%;
    border: 2px solid #ffffff;
  }

  .timeline-content {
    position: relative;
    padding: 20px;
    width: 500px;
  }
  
  .timeline-content h3 {
    margin: 0;
    font-size: 1.8rem;
    color: white;
    font-family: 'Manrope', sans-serif;
  }
  
  .timeline-content p {
    margin: 5px 0;
    font-size: 1.2rem;
    color: white;
    font-family: 'Manrope', sans-serif;
  }
  </style>
  