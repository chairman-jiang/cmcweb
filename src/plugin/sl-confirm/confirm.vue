<template>
  <div class="sl-confirm">
    <header class="sl-confirm__header">
      <div>
        <img src="@/assets/dialog-tip@2x.png" />
        <span class="confirm-title">{{title}}</span>
      </div>
      <a-icon type="close" @click="handleClose" />
    </header>
    <main class="sl-confirm__main">{{content}}</main>
    <footer class="sl-confirm__footer">
      <a-button @click="handleCancel">取消</a-button>
      <al-button @click="handleConfirm">确认</al-button>
    </footer>
  </div>
</template>
<script setup lang="ts">
import { IConfirmConfig } from './types';
import { defineProps, getCurrentInstance } from 'vue';
const props = defineProps<IConfirmConfig>()
const ins = getCurrentInstance();
const handleClose = () => {}
const handleCancel = () => {
  typeof props.isCancel === 'function' && props.isCancel();
}
const handleConfirm = () => {
  typeof props.isOk === 'function' && props.isOk();
}
</script>
<style lang="less" scoped>
.sl-confirm {
  position: relative;
  margin: 15vh;
  width: 3.72rem;
  height: 2.09rem;
  background-color: white;
  box-shadow: 0.02rem 0.03rem 0.12rem -0.06rem rgb(0 0 0 / 65%);
  border-radius: 0.06rem;
  padding: .22rem .19rem .3rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 40px;
    .confirm-title {
      margin-left: 0.12rem;
    }
  }
  &__main {
    height: calc(100% - 74px);
  }
  &__footer {
    height: 34px;
  }
}

</style>