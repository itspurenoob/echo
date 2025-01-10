// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import AppMain from '../views/AppMain.vue'; // This would be your main app page

const routes = [
  { path: '/', redirect: '/app/' }, // Redirect root to /app
  { path: '/app/me', component: AppMain }, // Main app page
  { path: '/app/login', component: Login }, // Login page
];

const router = createRouter({
  history: createWebHistory(), // Enables modern browser history mode
  routes,
});

export default router;
