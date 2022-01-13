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
    
  },
  actions: {

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
