<script setup>
import { onMounted, onUnmounted, inject, watch } from 'vue';

const isCursorVisible = inject('isCursorVisible');

onMounted(() => {
    const cursorLight = document.querySelector('#cursor-light');

    const handleMouseMove = (e) => {
        cursorLight.style.left = `${e.clientX}px`;
        cursorLight.style.top = `${e.clientY}px`;
    };

    window.addEventListener('mousemove', handleMouseMove);

    watch(isCursorVisible, (visible) => {
        if (cursorLight) {
            cursorLight.style.opacity = visible ? '1' : '0';
        }
    });

    onUnmounted(() => {
        window.removeEventListener("mousemove", handleMouseMove);
    });
});
</script>

<template>
    <div class="fixed hidden sm:block w-[30px] h-[30px] rounded-full pointer-events-none -translate-x-1/2 -translate-y-1/2 z-[9999] border-2 border-white/80 shadow-[0_0_5px_2px_rgba(255,255,255,0.3),0_0_10px_4px_rgba(255,255,255,0.1)]" id="cursor-light"></div>
</template>

