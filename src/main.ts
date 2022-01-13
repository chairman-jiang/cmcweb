import { createApp } from 'vue';
import router from '@/route';
import App from './App.vue';
import { createPinia } from 'pinia';
import { usePermissionStore } from '@/store/permission';
import { message } from 'ant-design-vue';
import '@/style/index.less';

createApp(App).use(router).use(createPinia()).mount('#app');

const store = usePermissionStore();
store.dispatchPermissionList((err) => {
  const isInLogin: boolean = window.location.pathname.startsWith('/login');
  router.isReady().then(() => {
    if (err) {
      message.error(err.message);
      !isInLogin && router.replace('/login');
    } else {
      isInLogin && router.replace('/');
    }
  })
});
