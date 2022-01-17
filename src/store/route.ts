import { defineStore } from 'pinia';

interface IRouteItem {
  routeName: string,
  path: string
}

type RouteState = IRouteItem[]

const state: RouteState = [];

export const useRouteStore = defineStore('routeStore', {
  state: () => {
    return state;
  },
  getters: {},
  actions: {}
});
