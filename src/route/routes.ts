import { RouteRecordRaw } from 'vue-router';

export const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   redirect: ''
  // },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  },
]
