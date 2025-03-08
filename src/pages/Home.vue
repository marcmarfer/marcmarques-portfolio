<script setup>
import Avatar from '../components/Avatar.vue';
</script>

<template>
    <div class="flex flex-col md:flex-row h-[100%] gap-4 md:gap-8 pt-[90px] md:pt-[5%]">
        <div class="flex flex-col justify-center w-full md:w-1/2 font-['Manrope'] order-1 md:order-1 pt">
            <div class="flex flex-col justify-start gap-2 w-full">
                <h1 class="text-[2rem] md:text-[3rem] text-white font-semibold m-0">Marc Marqués</h1>
                <p class="text-xl md:text-2xl text-[#ccc] m-0 font-extralight"><span class="text-[#fbf060]">Full-stack
                        web developer</span> from Barcelona, Spain.</p>
                <p class="text-xl md:text-2xl text-[#ccc] m-0 font-extralight">Building modern, efficient, and reliable
                    web solutions.</p>
            </div>
        </div>
        <Avatar />
    </div>
</template>
