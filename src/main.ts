import { createApp, App as VueInstance } from 'vue';
import router from '@/route';
import App from './App.vue';
import { createPinia } from 'pinia';
import { usePermissionStore } from '@/store/permission';
import { useUserStore } from '@/store/user';
import { message } from 'ant-design-vue';
import '@/style/index.less';
import { base64Decode } from './utils';
import cookies from 'js-cookie';
import SlLoading from '@/plugin/sl-plugin';

const loading = SlLoading();

const app: VueInstance = createApp(App);
app.use(router).use(createPinia()).mount('#app');

const store = usePermissionStore();

store.dispatchPermissionList(app, (err) => {
  loading.close();
  const isInLogin: boolean = window.location.pathname.startsWith('/login');
  const userStore = useUserStore();
  const id = cookies.get('id');
  id && userStore.dispatchUserInfo(base64Decode(id));
  router.isReady().then(() => {
    if (err) {
      message.error(err.message);
      !isInLogin && router.replace('/login');
    } else {
      isInLogin && router.replace('/');
    }
  })
});
