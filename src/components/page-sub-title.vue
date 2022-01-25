<template>
  <div class="page-sub-title">
    <div class="left-title">{{title}}</div>
    <slot name="right"></slot>
  </div>
</template>
<script setup lang="ts">
import { defineProps, defineExpose } from 'vue';
defineProps({
  title: {
    type: String,
    default: '标题',
    required: true
  }
});

defineExpose({
  displayName: 'page-sub-title'
})
</script>
<style lang="less" scoped>
.page-sub-title {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  &::before {
    content: "";
    position: absolute;
    left: 0px;
    top: 50%;
    transform: translateY(-50%);
    display: block;
    height: .18rem;
    width: .04rem;
    background: #3d8bf8;
  }

  .left-title {
    font-size: .22rem;
    font-weight: bold;
    padding-left: 10px;
    user-select: none;
  }
}
</style>