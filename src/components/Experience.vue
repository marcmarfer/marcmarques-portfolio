<template>
  <div>
    <h1>Experience</h1>
    <Timeline :experiences="experiences"/>
  </div>
</template>

<script>
import Timeline from "./Timeline.vue";

export default {
  components: { Timeline },
  data() {
    return {
      experiences: [
        {
          title: "Title",
          date: "December 2024",
          description:
            'Description Description Description Description Description Description Description Description',
        },
        {
          title: "Title",
          date: "December 2024",
          description:
            'Description Description Description Description Description Description Description Description',
        },
        {
          title: "Title",
          date: "December 2024",
          description:
            'Description Description Description Description Description Description Description Description',
        }
      ],
    };
  },
};
</script>

<style scoped>
  h1 {
    font-family: 'Onest', sans-serif;
    text-align: center;
  }
</style>
