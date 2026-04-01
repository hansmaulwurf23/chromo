import { createRouter, createWebHistory } from 'vue-router'
import DayInputView from '../views/DayInputView.vue'
import AuthView from "@/views/AuthView.vue";
import AccountsView from "@/views/AccountsView.vue";
import ThePageNotFound from "@/components/ThePageNotFound.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: DayInputView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
    },
    {
      path: '/accounts',
      name: 'accounts',
      component: AccountsView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: "/:catchAll(.*)",
      component: ThePageNotFound
    }
  ],
})

export default router
