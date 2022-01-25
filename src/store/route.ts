import { defineStore } from 'pinia';


type RouteState = IRouteItem[]
interface IState {
  routes: RouteState
  removed: IRouteItem | undefined
}

const state: IState = {
  routes: [],
  removed: undefined
};

export const useRouteStore = defineStore('routeStore', {
  state: () => {
    return state;
  },
  actions: {
    dispatchRoutesForAdd(val: IRouteItem) {
      const find = this.routes.find(t => t.path === val.path);
      if (!find) {
        this.routes.push(val);
      }
    },
    dispatchRoutesForRemove(val: IRouteItem) {
      const index = this.routes.findIndex(t => t.path === val.path);
      if (index >= 0) {
        this.routes.splice(index, 1);
        this.removed = val;
      }
    },
    dispatchRoutesForRemoveAll() {
      this.removed = this.routes.at(-1);
      this.routes = [];
    }
  }
});
