import { defineStore, acceptHMRUpdate } from 'pinia';

const state: API.SignloginModel = {
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
    getUserInfo(state) : API.SignloginModel {
      return state;
    }
  },
  actions: {
    dispatchUserInfo(data: API.SignloginModel) {
      for (const key in this) {
        if (Object.prototype.hasOwnProperty.call(this, key)) {
          Reflect.has(data, key) && Reflect.set(this, key, data[key]);
        }
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
