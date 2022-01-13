import { getMyMenuPermissionByMenuId } from '@/api/umc';
import { isArrayHasContents } from '@/utils';
import { defineStore, acceptHMRUpdate } from 'pinia';
interface IState {
  permissionList: API.MyMenuPermissionModel
  currentPermission: permissionItem
}

const state: IState = {
  permissionList: [],
  currentPermission: {
    added: 0,
    edit: 0,
    del: 0,
    isShow: 0,
    permissionId: '',
    permissionName: '',
    permissionSort: 0,
    permissionUrl: '',
    fieldList: [],
    children: []
  }
}

export const usePermissionStore = defineStore('permission', {
  // id
  state: () => {
    return state;
  },
  getters: {
    getPermissionList(state) : API.MyMenuPermissionModel {
      return state.permissionList;
    }
  },
  actions: {
    dispatchPermissionList(callback: PermissionCallback) {
      getMyMenuPermissionByMenuId().then(res => {
        this.permissionList = res;
        callback(isArrayHasContents(res) ? null : new Error('暂无权限'));
      }).catch(err => {
        callback(err);
      });
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}
