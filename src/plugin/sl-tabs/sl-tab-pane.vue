<template>
  <div class="sl-tab-pane">
    <slot></slot>
  </div>
</template>
<script setup lang="ts" name="sl-tab-pane">
import { defineProps, defineExpose } from 'vue';
const props = defineProps<{
  name: string
  handleTabPaneClick: () => void
}>();
defineExpose({
  displayName: 'sl-tab-pane'
})
</script>
<style lang="less" scoped>
.sl-tab-pane {
  font-size: 16px;
  margin-right: .15rem;
}
</style>