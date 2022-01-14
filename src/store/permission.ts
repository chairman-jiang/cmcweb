import { App } from 'vue';
import { getMyMenuPermissionByMenuId } from '@/api/umc';
import { isArrayHasContents } from '@/utils';
import { defineStore, acceptHMRUpdate } from 'pinia';
interface IState {
  permissionList: API.MyMenuPermissionModel
  currentPermission: IPermissionItemModel
  menuList: MenuList
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
    var1: '',
    fieldList: [],
    children: []
  },
  menuList: []
}

const menuIconLookup = (app: App) => {
  const menuFilter = (list: API.MyMenuPermissionModel) : MenuList => list.reduce<MenuList>((prv, cur) => {
    if (cur.isShow) {
      return prv.concat([{
        permissionId: cur.permissionId,
        permissionName: cur.permissionName,
        permissionUrl: cur.permissionUrl,
        var1: cur.var1,
        children: isArrayHasContents(cur.children) ? menuFilter(cur.children) : []
      }])
    } else {
      return prv;
    }
  }, []);
  return menuFilter;
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
    dispatchPermissionList(app: App ,callback: PermissionCallback) {
      getMyMenuPermissionByMenuId().then(res => {
        this.permissionList = res;
        this.menuList = menuIconLookup(app)(res);
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
