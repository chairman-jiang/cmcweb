import SlTabs from './sl-tabs/sl-tabs.vue';
import SlTabPane from './sl-tabs/sl-tab-pane.vue';
import PageSubTitle from '@/components/page-sub-title.vue';
import { App } from 'vue';

const components = [
  SlTabs, SlTabPane,
  PageSubTitle
];

export default {
  install: (app: App) => {
    components.forEach(e => {
      app.component(e.name, e);
    });
  }
}

