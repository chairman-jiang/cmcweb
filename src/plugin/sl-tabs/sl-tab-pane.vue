<template>
  <div class="sl-tab-pane">
    <span @click="handleTabPaneClick(name)">
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts" name="sl-tab-pane">
import { defineProps } from 'vue';
defineProps<{
  name: string
  handleTabPaneClick: (val: string) => void
}>();
</script>
<style lang="less" scoped>
.sl-tab-pane-active.sl-tab-pane__active-color {
  span {
    color: #3853fd;
    font-weight: bold;
  }
}
.sl-tab-pane-active.sl-tab-pane__active-font {
  span {
    font-weight: bold;
    font-size: 18px;
  }
}
.sl-tab-pane-active.sl-tab-pane__active-all {
  span {
    color: #3853fd;
    font-size: 18px;
    font-weight: bold;
  }
}
.sl-tab-pane {
  height: 40px;
  padding: 0px 20px;
  line-height: 30px;
  span {
    font-size: 16px;
    cursor: pointer;
  }
}
.sl-tab-pane:first-child {
  padding-left: 0px !important;
}
.sl-tab-pane:last-child {
  padding-right: 0px !important;
}
</style>