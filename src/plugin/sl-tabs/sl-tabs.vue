<script lang="ts">
import { h, defineComponent, computed, ref, getCurrentInstance, PropType, onMounted, nextTick } from 'vue';
import { LeftOutlined, RightOutlined } from '@ant-design/icons-vue';
import SlTabPane from './sl-tab-pane.vue';
export default defineComponent({
  name: 'sl-tabs',
  props: {
    modelValue: String,
    spacing: {
      type: Number,
      default: () => 20
    },
    outLine: {
      type: Boolean,
      default: () => false
    },
    radius: {
      type: Boolean,
      default: () => false
    },
    paneActiveMode: {
      type: String as PropType<'color' | 'font' | 'all'>,
      default: () => 'color'
    }
  },
  emits: ['update:modelValue'],
  components: {
    LeftOutlined,
    RightOutlined
  },
  setup(props, ctx) {
    const slTabsRef = ref<HTMLElement>();
    const tabsContentRef = ref<HTMLElement>();
    const tabBarRef = ref<HTMLElement>();
    const showArrowFlag = computed(() => (slTabsRef.value?.clientWidth || 0) < (tabsContentRef.value?.clientWidth || 0));
    const ins = getCurrentInstance();
    const defaultSlots = typeof ins?.slots.default === 'function' ? ins.slots.default() : [];

    const tabBarMove = () => {
      const index = defaultSlots.findIndex(t => t.props?.name === props.modelValue);
      const bar = document.querySelector('.sl-tabs-bar');
      const children = tabsContentRef.value?.children || [];
      const activeDom = children[index];
      const activeWidth = (activeDom.clientWidth - 20) / 2;
      // @ts-ignore
      bar?.setAttribute('style', `transform: translateX(${activeDom.offsetLeft + activeWidth}px);`);
    }
    const handleArrowLeftClick = () => {}
    const handleArrowRightClick = () => {}
    const handleTabPaneClick = (val: string) => {
      if (props.modelValue !== val) {
        ctx.emit('update:modelValue', val);
        nextTick(() => {
          tabBarMove();
        })
      }
    }

    onMounted(() => {
      tabBarMove();
    });

    return {
      slTabsRef,
      tabsContentRef,
      showArrowFlag,
      defaultSlots,

      handleArrowLeftClick,
      handleArrowRightClick,
      handleTabPaneClick
    }
  },
  render() {
    const { defaultSlots, showArrowFlag, handleTabPaneClick, handleArrowLeftClick, handleArrowRightClick } = this;
    return h('div', {
      class: ['sl-tabs'],
      ref: 'slTabsRef'
    },
    [
      h(LeftOutlined, {style: {display: showArrowFlag ? 'block' : 'none'}, onClick: handleArrowLeftClick }),
      h('div', {
        class: ['sl-tabs-view'],
      }, [
        h('div', { class: { 'sl-tab-pane-content': true, 'sl-tabs-outline': this.outLine }, ref: 'tabsContentRef' }, defaultSlots.map(t => {
          const children = <any>t.children;
          const text = typeof children?.default === 'function' ? children.default() : '';
          const paneActiveClassName = `sl-tab-pane__active-${this.paneActiveMode}`;
          // https://forum.vuejs.org/t/how-to-avoid-non-function-value-encountered-for-default-slot-warning/107039
          return h(SlTabPane, {
              class: { 'sl-tab-pane-active': this.modelValue === t.props?.name, [paneActiveClassName]: true },
              style: { margin: `0px ${this.spacing}px` },
              name: t.props?.name,
              handleTabPaneClick 
            }, 
            { default: () => text }
          );
        })),
        h('div', { class: 'sl-tabs-bar', style: { borderRadius: this.radius ? '4px' : '0px' }, ref: 'tabBarRef' })
      ]),
      h(RightOutlined, { style: { display: showArrowFlag ? 'block': 'none' }, onClick: handleArrowRightClick })
    ]);
  }
});

</script>
<style lang="less" scoped>
.sl-tabs {
  display: flex;
  width: 100%;
  .sl-tabs-view {
    position: relative;
    flex: 1;
    .sl-tab-pane-content {
      display: flex;
    }
    .sl-tabs-outline {
      // border-bottom: 1px solid #f0f0f0;
      border-bottom: 1px solid #e4e7ed;
    }
    .sl-tabs-bar {
      position: absolute;
      bottom: 0px;
      left: 0px;
      height: 5px;
      width: 20px;
      transform: translateX(0px);
      transition: all .5s ease;
      background-color: @primary-color;
    }
  }
}
</style>