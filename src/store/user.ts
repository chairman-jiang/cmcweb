import { defineStore, acceptHMRUpdate } from 'pinia';
import { findUserByUserId } from '@/api/umc';
import { menuId } from '@/helpers';
import cookies from 'js-cookie';
import { AccessTokenKey, cookieUserIdKey } from '@/helpers/enums';
import router from '@/route';
import { Modal } from 'ant-design-vue';
const state: API.UserInfo = {
  loginName: '',
  userId: '',
  userName: '',
  userNumber: '',
  password: '',
  mobile: '',
  email: '',
  sex: '',
  pictureBase64: ''
}

export const useUserStore = defineStore('user', {
  state: () => {
    return state;
  },
  getters: {
    getUserInfo(state) : API.UserInfo {
      return state;
    }
  },
  actions: {
    dispatchSyncUserInfo(data: API.UserInfo) {
      for (const key in this) {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          Reflect.has(data, key) && Reflect.set(this, key, data[key]);
        }
      }
    },
    dispatchUserInfo(userId: string) {
      findUserByUserId({menuId: menuId, userId}).then(res => {
        console.log(res, 'res');
        this.dispatchSyncUserInfo(res);
      })
    },
    dispatchSignout() {
      Modal.confirm({
        title: '确定要退出吗?',
        content: '退出后将会跳转到登录页',
        onOk: () => {
          cookies.remove(AccessTokenKey);
          cookies.remove(cookieUserIdKey);
          router.replace('/login');
        }
      });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
