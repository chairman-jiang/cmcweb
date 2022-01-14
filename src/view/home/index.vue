<template>
  <div class="contract-home">
    <Aside></Aside>
    <main class="contract-home__main">
      <header class="contract-home__header"></header>
      <main class="contract-home__submain"></main>
    </main>
  </div>
</template>
<script setup lang="ts">
import Aside from './components/aside.vue';

</script>
<style lang="less" scoped>
.contract-home {
  display: flex;
  height: 100%;
  min-width: 1366px;
  .contract-home__main {
    height: 100%;
    flex: 1;
  }
}
</style>