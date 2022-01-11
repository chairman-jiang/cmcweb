import { defineStore, acceptHMRUpdate } from 'pinia';

export const usePermissionStore = defineStore({
  id: 'permission',
  state: () => ({

  }),
  getters: {

  },
  actions: {

  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}
