import { createApp, App as VueInstance, h } from 'vue';
import router from '@/route';
import App from './App.vue';
import { createPinia } from 'pinia';
import { usePermissionStore } from '@/store/permission';
import { useUserStore } from '@/store/user';
import { useRouteStore } from '@/store/route';
import { message } from 'ant-design-vue';
import '@/style/index.less';
import { base64Decode } from './utils';
import cookies from 'js-cookie';
import SlLoading from '@/plugin/sl-plugin';
import plugin from '@/plugin';
import { ConfigProvider } from 'ant-design-vue';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

const loading = SlLoading();

const app: VueInstance = createApp(h(ConfigProvider, { locale: zhCN }, { default: () => h(App) }));
app.use(router).use(createPinia()).use(plugin).mount('#app');
const ignorePaths = ['/', '/login', '/refresh'];

const permissionStore = usePermissionStore();
const routeStore = useRouteStore();
permissionStore.dispatchPermissionList(app, (err) => {
  loading.close();
  const pathName = window.location.pathname;
  const isInLogin: boolean = pathName.startsWith('/login');
  const userStore = useUserStore();
  const id = cookies.get('id');
  id && userStore.dispatchUserInfo(base64Decode(id));
  if (!ignorePaths.includes(pathName)) {
    permissionStore.dispatchCurrentPermission(pathName);
    routeStore.dispatchRoutesForAdd({
      routeName: permissionStore.currentPermission.permissionName,
      path: pathName
    });
  }
  router.beforeEach((to, from, next) => {
    if (!ignorePaths.includes(to.path)) {
      permissionStore.dispatchCurrentPermission(to.path);
      routeStore.dispatchRoutesForAdd({
        routeName: permissionStore.currentPermission.permissionName,
        path: to.path
      });
    }
    next();
  });
  router.isReady().then(() => {
    if (err) {
      message.error(err.message);
      !isInLogin && router.replace('/login');
    } else {
      isInLogin && router.replace('/');
    }
  })
});
