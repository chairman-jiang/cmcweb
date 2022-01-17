<template>
  <div class="contract-home__aside" :style="{width: menuExpandState ? '80px' : '220px'}">
    <header class="aside-head" :style="{width: menuExpandState ? '80px' : '100%'}">
      <div class="head-logo" @click="handleClickLogoView">
        <img class="logo-picture" src="@/assets/logo@2x.png"/>
        <div class="head-system-name" v-show="!menuExpandState">
          <p>REAL合同系统</p>
          <p>{{version}}</p>
        </div>
      </div>
    </header>
    <a-menu class="aside-inner" theme="dark" mode="inline" :inline-collapsed="menuExpandState">
      <a-menu-item v-for="item in menuList" :key="item.permissionId">
        <template #icon>
          <StepBackwardOutlined/>
           <!-- <component is="step-backward-outlined"></component> -->
        </template>
        <span>{{item.permissionName}}</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script setup lang="ts">
/*
import { getCurrentInstance } from 'vue';
import * as icons from '@ant-design/icons-vue';
const component = Reflect.get(icons, 'xxx');
ins?.appContext.app.component(component.displayName, component);
<DownCircleOutlined />
*/
import { ref } from 'vue';
import { usePermissionStore } from '@/store/permission';
import { useOtherStateStore } from '@/store/other-state';
import { storeToRefs } from 'pinia';
import { StepBackwardOutlined } from '@ant-design/icons-vue';
import { getVersion } from '@/api/cmc';
import { useRouter } from 'vue-router';
const router = useRouter();
const permissionStore = usePermissionStore();
const otherStateStore = useOtherStateStore();
const { menuList } = storeToRefs(permissionStore);
const { menuExpandState } = storeToRefs(otherStateStore);
const version = ref<string>('v1.0.0');

getVersion().then(res => {
  version.value = res;
})

const handleClickLogoView = () => {
  router.replace('/');
}
</script>
<style lang="less" scoped>
.contract-home__aside {
  height: 100%;
  background: #001529;
  transition: all .5s ease;
  .aside-head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    .head-logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      overflow: hidden;
      .logo-picture {}
      .head-system-name {
        color: white;
        margin-left: 10px;
        transform: translateY(5px);
        p:first-child {
          font-size: 20px;
          font-weight: bold;
        }
        p {
          white-space: nowrap;
          line-height: 18px;
        }
      }
    }
    .logo-picture {
      width: 45px;
      height: 40px;
    }
  }
  .aside-inner {
    height: calc(100% - 80px);
  }
}
</style>