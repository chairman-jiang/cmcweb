import { defineStore } from 'pinia';

interface IOtherState {
  menuExpandState: boolean
}

const sessionKey = 'menuExpandState';

const sessionState : string | null = sessionStorage.getItem(sessionKey);

const state: IOtherState = {
  menuExpandState: sessionState === null ? false : sessionState === 'true' ? true : false
}

export const useOtherStateStore = defineStore('otherState', {
  state: () => {
    return state;
  },
  getters: {},
  actions: {
    dispatchMenuExpandState() {
      this.menuExpandState = !this.menuExpandState;
      sessionStorage.setItem(sessionKey, this.menuExpandState.toString());
    }
  }
});
