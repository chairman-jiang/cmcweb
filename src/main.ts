import { createApp, App as VueInstance } from 'vue';
import router from '@/route';
import App from './App.vue';
import { createPinia } from 'pinia';
import { usePermissionStore } from '@/store/permission';
import { message } from 'ant-design-vue';
import '@/style/index.less';

const app: VueInstance = createApp(App);
app.use(router).use(createPinia()).mount('#app');

const store = usePermissionStore();
store.dispatchPermissionList(app, (err) => {
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
