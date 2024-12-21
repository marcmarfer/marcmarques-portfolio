<template>
    <div id="cursor-light"></div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';

onMounted(() => {
    const cursorLight = document.querySelector('#cursor-light');

    const handleMouseMove = (e) => {
        cursorLight.style.left = `${e.clientX}px`;
        cursorLight.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    onUnmounted(() => {
        document.removeEventListener("mousemove", handleMouseMove);
    });

});
</script>

<style scoped>
#cursor-light {
  position: fixed;
  border: rgba(255, 255, 255, 0.8) 2px solid;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  pointer-events: none;
  transform: translate(-50%, -50%);
  z-index: 9999;
  box-shadow: 0 0 5px 2px rgba(255, 255, 255, 0.3),
              0 0 10px 4px rgba(255, 255, 255, 0.1);
}
</style>