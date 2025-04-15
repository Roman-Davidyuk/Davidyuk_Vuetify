import List from '@/views/List.vue'
import MyGroup from '../views/MyGroup.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'List',
      component: List,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/my-group',
      name: 'MyGroup',
      component: MyGroup,
    },
  ],
})

export default router
