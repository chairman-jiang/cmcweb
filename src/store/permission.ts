import { App } from 'vue';
import { getMyMenuPermissionByMenuId } from '@/api/umc';
import { isArrayHasContents } from '@/utils';
import { defineStore, acceptHMRUpdate } from 'pinia';
import { 
  AppstoreOutlined, AreaChartOutlined, PropertySafetyOutlined, UnorderedListOutlined
} from '@ant-design/icons-vue';
const icons = {
  'appstore-outlined': AppstoreOutlined,
  'area-chart-outlined': AreaChartOutlined,
  'property-safety-outlined': PropertySafetyOutlined
};
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
  app.component(UnorderedListOutlined.displayName, UnorderedListOutlined)
  const menuFilter = (list: API.MyMenuPermissionModel) : MenuList => list.reduce<MenuList>((prv, cur) => {
    if (cur.isShow) {
      const icon = Reflect.get(icons, cur.var1);
      if (icon) {
        app.component(icon.displayName, icon);
      }
      return prv.concat([{
        permissionId: cur.permissionId,
        permissionName: cur.permissionName,
        permissionUrl: cur.permissionUrl.replace(/\/home/g, ''),
        var1: cur.var1 || 'unordered-list-outlined',
        children: isArrayHasContents(cur.children) ? menuFilter(cur.children) : []
      }]);
    } else {
      return prv;
    }
  }, []);
  return menuFilter;
}

const accordingToUrlFindPermission = (url: string, permissionList: API.MyMenuPermissionModel) : IPermissionItemModel | undefined => {
  let result: IPermissionItemModel | undefined;
  function findNode (node: IPermissionItemModel) {
    if (!node) {
      return undefined;
    }
    if (node.permissionUrl.replace(/\/home/g, '') === url) {
      result = node;
      return node;
    }
    if (isArrayHasContents(node.children)) {
      for (let index = 0; index < node.children.length; index++) {
        findNode(node.children[index]);
      }
    }
  }

  for (const iterator of permissionList) {
    findNode(iterator);
    if (result) break;
  }

  return result;
};

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
    },
    dispatchCurrentPermission(url: string) {
      const node = accordingToUrlFindPermission(url, this.permissionList);
      if (node) {
        this.currentPermission = node;
      }
    }
  }
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePermissionStore, import.meta.hot))
}
