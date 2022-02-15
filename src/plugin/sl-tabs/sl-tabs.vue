<script lang="ts">
import { h, defineComponent, computed, ref, getCurrentInstance } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import SlTabPane from './sl-tab-pane.vue';
export default defineComponent({
  name: 'sl-tabs',
  props: ['modelValue'],
  emits: ['change'],
  components: {
    LeftOutlined,
    RightOutlined
  },
  setup() {
    const slTabsRef = ref<HTMLElement>();
    const tabsContentRef = ref<HTMLElement>();
    const showArrowFlag = computed(() => (slTabsRef.value?.clientWidth || 0) < (tabsContentRef.value?.clientWidth || 0));
    const ins = getCurrentInstance();

    const handleArrowLeftClick = () => {}
    const handleArrowRightClick = () => {}
    const handleTabPaneClick = () => {}

    return {
      slTabsRef,
      tabsContentRef,
      showArrowFlag,
      defaultSlots: typeof ins?.slots.default === 'function' ? ins.slots.default() : [],

      handleArrowLeftClick,
      handleArrowRightClick,
      handleTabPaneClick
    }
  },
  render() {
    const { defaultSlots, showArrowFlag, handleTabPaneClick, handleArrowLeftClick, handleArrowRightClick } = this;

    return h('div', {
      class: ['sl-tabs'],
    },
    [
      h(LeftOutlined, {style: {display: showArrowFlag ? 'block' : 'none'}, onClick: handleArrowLeftClick }),
      h('div', {
        class: ['sl-tabs-view']
      }, defaultSlots.map(t => {
        const children = <any>t.children;
        const text = typeof children?.default === 'function' ? children.default() : '';
        return h(SlTabPane, { name: Reflect.get(t, 'name'), handleTabPaneClick }, [text]);
      })),
      h(RightOutlined, { style: { display: showArrowFlag ? 'block': 'none' }, onClick: handleArrowRightClick })
    ]);
  }
});

</script>
<style lang="less" scoped>
.sl-tabs {
  width: 100%;
  .sl-tabs-view {
    display: flex;
  }
}
</style>