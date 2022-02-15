<template>
  <div class="contract-home__aside" :style="{flexBasis: menuExpandState ? '80px' : '220px'}">
    <header class="aside-head" :style="{width: menuExpandState ? '80px' : '100%'}">
      <div class="head-logo" @click="handleClickLogoView">
        <img class="logo-picture" src="@/assets/logo@2x.png"/>
        <div class="head-system-name" v-show="!menuExpandState">
          <p>VBFI业财易</p>
          <p>{{version}}</p>
        </div>
      </div>
    </header>
    <a-menu class="aside-inner" theme="dark" mode="inline" :inline-collapsed="menuExpandState" :open-keys="openKeys" @openChange="handleOpenChange">
      <a-sub-menu v-for="item in menuList" :key="item.permissionId" @click="handleMenuSubItemClick(item)">
        <template #icon>
           <component :is="item.var1"></component>
        </template>
        <template #title>{{item.permissionName}}</template>
        <a-menu-item v-for="child in item.children" :key="child.permissionId" @click.stop="handleMenuItemClick(child)">
          <template #icon>
            <StepBackwardOutlined/>
          </template>
          {{child.permissionName}}
        </a-menu-item>
      </a-sub-menu>
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
import { useRouteStore } from '@/store/route';
import { storeToRefs } from 'pinia';
import { StepBackwardOutlined } from '@ant-design/icons-vue';
import { getVersion } from '@/api/cmc';
import { useRouter } from 'vue-router';
const router = useRouter();
const permissionStore = usePermissionStore();
const otherStateStore = useOtherStateStore();
const routeStore = useRouteStore();
const { menuList } = storeToRefs(permissionStore);
const { menuExpandState } = storeToRefs(otherStateStore);
const version = ref<string>('v1.0.0');
const openKeys = ref<string[]>([]);
const menuSubItemName: string[] = ['合同统计'];
getVersion().then(res => {
  version.value = res;
});

const handleClickLogoView = () => {
  router.replace('/');
}

const handleOpenChange = (val: string[]) => {
  openKeys.value = val.length ? [val[val.length - 1]] : [];
}

const handleMenuSubItemClick = (item: IMenuItem) => {
  if (menuSubItemName.includes(item.permissionName)) {
    router.push(item.permissionUrl);
    routeStore.dispatchRoutesForAdd({
      routeName: item.permissionName,
      path: item.permissionUrl
    });
  }
}
const handleMenuItemClick = (item: IMenuItem) => {
  console.log(item, '--');
  router.push(item.permissionUrl);
  routeStore.dispatchRoutesForAdd({
    routeName: item.permissionName,
    path: item.permissionUrl
  });
}
</script>
<style lang="less" scoped>
.contract-home__aside {
  height: 100%;
  background: #001529;
  transition: all .5s ease;
  .aside-head {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    &::after {
      content: "";
      display: block;
      position: absolute;
      bottom: 0px;
      left: 50%;
      transform: translateX(-50%);
      height: 1px;
      width: 85%;
      background: #24293f;
    }
    .head-logo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      overflow: hidden;
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
  :deep(.ant-menu) {
    .anticon svg {
      font-size: 18px;
    }
  }
}
</style>