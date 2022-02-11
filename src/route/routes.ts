import { RouteRecordRaw } from 'vue-router';
import Home from '@/view/home/index.vue';

export const routes: RouteRecordRaw[] = [
  // {
  //   path: '/',
  //   redirect: '/home'
  // },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/dataBoard',
        name: 'DataBoard',
        component: () => import('@/view/charts/contract-data-board/index.vue')
      },
      {
        path: '/contractSaleAnalysis',
        name: 'ContractSaleAnalysis',
        component: () => import('@/view/charts/contract-sale-analysis/index.vue'),
        meta: {
          oldPath: '/marketChart'
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/view/login/index.vue')
  },
]
