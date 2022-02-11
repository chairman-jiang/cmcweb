import Loading from './loading.vue';
import { createVNode, render } from 'vue';
import './main.less';
interface ILoadingConfig {
  target: HTMLElement | string
  message: string,
}

export default function SlLoading(options?: ILoadingConfig) {
  const config = Object.assign({
    target: document.body,
    message: ''
  }, options);
  const container = document.createElement('div');
  container.className = 'sl-loading-div__container';
  const vm = createVNode(Loading, {});
  let recover = false;
  render(vm, container);
  if (config.target) {
    if (typeof config.target === 'string') {
      const queryElement = document.querySelector(config.target);
      if (queryElement) {
        // tsignore
        config.target = (queryElement as HTMLElement);
      }
    }
    !config.target.style.position && (config.target.style.position = 'relative') && (recover = true);
    container.style.position = 'absolute';
  }
  config.target.appendChild(container);
  return  {
    close: () => {
      render(null, container);
      container.parentNode?.removeChild(container);
      recover && (config.target.style.position = '');
    }
  }
}
