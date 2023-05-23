import {createRouter, createWebHistory} from 'vue-router';
import Home from './components/Home.vue';
import Containers from './components/Containers.vue';
import Images from './components/Images.vue';
import Search from './components/Search.vue';
const routes = [
    { path: '/', component: Home },
    { path: '/containers', component: Containers },
    { path: '/images', component: Images },
    { path: '/search', component: Search },
  ]

export const router = createRouter({
    history: createWebHistory(),
    routes
  });