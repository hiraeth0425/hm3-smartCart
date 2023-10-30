import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/stores.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: () => import('@/views/layout/index.vue'),
      children: [
        { path: '/home', component: () => import('@/views/layout/home.vue') },
        {
          path: '/category',
          component: () => import('@/views/layout/category.vue')
        },
        { path: '/cart', component: () => import('@/views/layout/cart.vue') },
        { path: '/user', component: () => import('@/views/layout/user.vue') }
      ]
    },
    { path: '/login', component: () => import('@/views/login/index.vue') },
    { path: '/search', component: () => import('@/views/Search/index.vue') },
    {
      path: '/searchlist',
      component: () => import('@/views/Search/Searchlist.vue')
    },
    {
      path: '/prodetail',
      component: () => import('@/views/ProDetail/index.vue')
    },
    { path: '/pay', component: () => import('@/views/Pay/index.vue') },
    { path: '/myorder', component: () => import('@/views/MyOrder/index.vue') }
  ]
})

// 全局導航守衛
const authUrls = ['/pay', '/myorder']

router.beforeEach((to) => {
  const userStore = useUserStore()
  const token = userStore.token
  if (!token && authUrls.includes(to.path)) {
    // 返回 false 以取消导航
    return '/login'
  }
})

export default router
