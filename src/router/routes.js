import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Experience from '../pages/Experience.vue';
import Projects from '../pages/Projects.vue';
import Aboutme from '../pages/Aboutme.vue';
import Contact from '../pages/Contact.vue';

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/experience', name: 'experience', component: Experience },
  { path: '/projects', name: 'Projects', component: Projects },
  { path: '/about-me', name: 'about-me', component: Aboutme },
  { path: '/contact', name: 'contact', component: Contact },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
