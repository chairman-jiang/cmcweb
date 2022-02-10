import { defineStore, acceptHMRUpdate } from 'pinia';
import { findUserByUserId } from '@/api/umc';
import { menuId } from '@/helpers';
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
        this.dispatchSyncUserInfo(res);
      })
    },
    dispatchSignout() {}
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
