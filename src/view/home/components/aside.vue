<template>
  <div class="contract-home__aside">
    <header class="aside-head">
      <img src="@/assets/logo@2x.png" />
      <div class="aside-head__title">
        <p>REAL合同系统</p>
        <p>{{version}}</p>
      </div>
    </header>
    <a-menu class="aside-inner" :inline-collapsed="collapsed">
      <a-menu-item key="1">
        <template #icon>
          <step-backward-outlined />
        </template>
        <span>Option 1</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { usePermissionStore } from '@/store/permission';
import { storeToRefs } from 'pinia';
import { StepBackwardOutlined } from '@ant-design/icons-vue';
const permissionStore = usePermissionStore();
const { permissionList } = storeToRefs(permissionStore);
const collapsed = ref<boolean>(false);
const version = ref<string>('');
</script>
<style lang="less" scoped>
.contract-home__aside {
  height: 100%;
  .aside-head {
    height: 80px;
  }
  .aside-inner {
    height: calc(100% - 80px);
  }

}
</style>