<template>
  <div class="contract-home">
    <Aside></Aside>
    <main class="contract-home__main" :style="{width: menuExpandState ? 'calc(100% - 80px)' : 'calc(100% - 220px)'}">
      <Header></Header>
      <main class="contract-home__submain">
        <router-view></router-view>
      </main>
    </main>
  </div>
</template>
<script setup lang="ts">
import Aside from './components/aside.vue';
import Header from './components/header.vue';
import { useOtherStateStore } from '@/store/other-state';
import { storeToRefs } from 'pinia';
const otherStateStore = useOtherStateStore();
const { menuExpandState } = storeToRefs(otherStateStore);
</script>
<style lang="less" scoped>
.contract-home {
  position: relative;
  display: flex;
  height: 100%;
  min-width: 1366px;
  .contract-home__main {
    height: 100%;
    .contract-home__submain {
      height: calc(100% - 80px);
      padding: 15px;
      background: #f7f8f9;
    }
  }
}
</style>