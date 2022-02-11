import Confirm from './confirm.vue';
import { createVNode, render } from 'vue';
import './main.less';

interface IConfirmConfig {
  title: string,
  content: string,
  isOk?: () => void
  isCancel?: () => void
  [index: string]: any
}

export default function SlConfirm(optoins: IConfirmConfig) {
  const container = document.createElement('div');
  container.className = 'sl-confirm__wrapper';
  const vm = createVNode(Confirm, optoins);
  render(vm, container)
  document.body.appendChild(container);
}