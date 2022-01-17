<template>
  <header class="contract-home__header">
    <div class="head-left">
      <div class="left-aside-toggle" @click="handleMenuExpandIconClick">
        <menu-fold-outlined v-if="menuExpandState" class="left-menuexpand-icon" />
        <menu-unfold-outlined v-else class="left-menuexpand-icon" />
      </div>
      <div class="left-route">
        <div class="route-list"></div>
        <div class="route-operation">
          <a-dropdown>
            <down-outlined/>
            <template #overlay>
              <a-menu-item>
                重新加载
              </a-menu-item>
            </template>
          </a-dropdown>
        </div>
      </div>
    </div>
    <div class="head-right__user">
      <a-popover placement="bottom">
        <template #content>
          <span>{{userName}}</span>
        </template>
        <div class="user-name">Hi~{{userName}}</div>
      </a-popover>
      <logout-outlined class="user-icon__logout" :rotate="-90" @click="handleLogout" />
    </div>
  </header>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useOtherStateStore } from '@/store/other-state';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, DownOutlined } from '@ant-design/icons-vue';
import { AccessTokenKey, cookieUserIdKey } from '@/helpers/enums';
import { useRouter } from 'vue-router';
import cookies from 'js-cookie';
const router = useRouter();
const otherStateStore = useOtherStateStore();
const userStore = useUserStore();
const { userName } = storeToRefs(userStore);
const { menuExpandState } = storeToRefs(otherStateStore);

const handleMenuExpandIconClick = () => {
  otherStateStore.dispatchMenuExpandState();
};

const handleLogout = () => {
  cookies.remove(AccessTokenKey);
  cookies.remove(cookieUserIdKey);
  router.replace('/login');
}
</script>
<style lang="less" scoped>
.contract-home__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
  padding: 0px 10px;
  .head-left {
    display: flex;
    width: calc(100% - 150px);
    .left-aside-toggle {
      width: 18px;
      .left-menuexpand-icon {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .left-route {
      width: calc(100% - 18px);
      background-color: aquamarine;
      .route-list {

      }
      .route-operation {
        
      }
    }
  }
  .head-right__user {
    display: flex;
    font-size: 18px;
    align-items: center;
    width: 130px;
    .user-name {
      width: 100px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .user-icon__logout {
      margin-left: 10px;
      cursor: pointer;
    }
  }
}
</style>
