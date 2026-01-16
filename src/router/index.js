import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/MainPage.vue')
    },
    {
      path: '/beer/:id',
      name: 'beer-detail',
      component: () => import('../views/BeerDetail.vue')
    },
    {
      path: '/add',
      name: 'add-beer',
      component: () => import('../views/AddBeer.vue')
    }
  ],
})

export default router
