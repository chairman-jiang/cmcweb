<template>
  <header class="contract-home__header">
    <div class="head-left">
      <div class="left-aside-toggle" @click="handleMenuExpandIconClick">
        <MenuFoldOutlined v-if="menuExpandState" class="left-menuexpand-icon" />
        <MenuUnfoldOutlined v-else class="left-menuexpand-icon" />
      </div>
      <div class="left-route">
        <div class="route-list">
          <a-tag v-for="item in routes" :key="item.path" :color="item.path === $route.path ? '#5e81ff' : ''"
                closable class="route-item__tag" @close.prevent="handleTagClose(item)">{{item.routeName}}
          </a-tag>
        </div>
        <div class="route-operation">
          <a-dropdown :trigger="['click']">
            <DownOutlined/>
            <template #overlay>
              <a-menu>
                <a-menu-item key="0" @click="handleRefresh">
                  <template #icon>
                    <UndoOutlined/>
                  </template>
                  刷新
                </a-menu-item>
                <a-menu-item key="1" @click="handleCloseCurrent">
                  <template #icon>
                    <CloseOutlined/>
                  </template>
                  关闭页签
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="3" @click="handleCloseOther">
                  <template #icon>
                    <ColumnWidthOutlined/>
                  </template>
                  关闭其他页签
                </a-menu-item>
                <a-menu-item key="4" @click="handleCloseAll">
                  <template #icon>
                    <MinusOutlined/>
                  </template>
                  关闭全部页签
                </a-menu-item>
              </a-menu>
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
      <LogoutOutlined class="user-icon__logout" :rotate="-90" @click="handleLogout" />
    </div>
  </header>
</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUserStore } from '@/store/user';
import { useOtherStateStore } from '@/store/other-state';
import { useRouteStore } from '@/store/route';
import { MenuFoldOutlined, MenuUnfoldOutlined, LogoutOutlined, DownOutlined,
  UndoOutlined, CloseOutlined, ColumnWidthOutlined, MinusOutlined
} from '@ant-design/icons-vue';
import { AccessTokenKey, cookieUserIdKey } from '@/helpers/enums';
import { useRouter } from 'vue-router';
import cookies from 'js-cookie';
import { message } from 'ant-design-vue';
const router = useRouter();
const otherStateStore = useOtherStateStore();
const userStore = useUserStore();
const routeStore = useRouteStore();
const { userName } = storeToRefs(userStore);
const { menuExpandState } = storeToRefs(otherStateStore);
const { routes } = storeToRefs(routeStore);

const handleMenuExpandIconClick = () => {
  otherStateStore.dispatchMenuExpandState();
};

const handleTagClose = (item: IRouteItem) => {
  if (routes.value.length === 1) {
    message.error('只剩最后一项了, 不能删除');
    return;
  }
  routeStore.dispatchRoutesForRemove(item);
}

const handleRefresh = () => {};
const handleCloseCurrent = () => {};
const handleCloseOther = () => {};
const handleCloseAll = () => {}

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
  border-bottom: 1px solid #EEF1F7;
  .head-left {
    display: flex;
    width: calc(100% - 150px);
    .left-aside-toggle {
      display: flex;
      align-items: center;
      width: 28px;
      .left-menuexpand-icon {
        font-size: 18px;
        cursor: pointer;
      }
    }
    .left-route {
      display: flex;
      width: calc(100% - 18px);
      .route-list {
        flex: 1;
        .route-item__tag {
          cursor: pointer;
        }
      }
      .route-operation {
        text-align: center;
        width: 50px;
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
