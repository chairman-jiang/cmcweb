<template>
  <div class="login-view">
    <div class="login-w">
      <div class="login-card__left"></div>
      <div class="login-card__right">
        <div class="card-right__content">
          <div class="content-logo">
            <img src="@/assets/logo@2x.png" />
          </div>
          <div class="content-title">欢迎使用视联动力合同系统!</div>
          <div class="content-form">
            <a-form :model="form" autocomplete="off" @submit.prevent="handleFormSubmit" :label-col="{span: 4}" :wrapper-col="{ span: 16 }">
              <a-form-item label="用户名" name="loginName" :rules="rules.loginName" v-bind="validateInfos.loginName">
                <a-input v-model:value="form.loginName" placeholder="请输入用户名" />
              </a-form-item>
              <a-form-item label="密码" name="password" :rules="rules.password" v-bind="validateInfos.password">
                <a-input-password v-model:value="form.password" placeholder="请输入密码" autocomplete="new-password" />
              </a-form-item>
              <a-form-item :wrapper-col="{ offset: 4, span: 16 }">
                <a-button type="primary" html-type="submit" style="width: 100%;" :loading="loading">登录</a-button>
              </a-form-item>
            </a-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, ref, getCurrentInstance, App } from 'vue';
import { useRouter } from 'vue-router';
import { signlogin } from '@/api/umc';
import { Encrypt } from '@/utils';
import { Form, message } from 'ant-design-vue';
import { useUserStore } from '@/store/user';
import { usePermissionStore } from '@/store/permission';
const userStore = useUserStore();
const usePermission = usePermissionStore();
const router = useRouter();
const app = getCurrentInstance();
const form = reactive<Param.ISignlogin>({
  loginName: '',
  password: ''
});
const rules: IRules = {
  loginName: [
    { required: true, message: '请输入用户名' }
  ],
  password: [
    { required: true, message: '请输入密码' }
  ]
}
const loading = ref<boolean>(false);
const { validateInfos, validate } = Form.useForm(form, rules);

const handleFormSubmit = () => {
  loading.value = true;
  signlogin({loginName: form.loginName, password: Encrypt(form.password)}).then(res => {
    userStore.dispatchUserInfo(res);
    usePermission.dispatchPermissionList((app?.appContext.app as App), (err) => {
      message[err ? 'error' : 'success'](err ? err.message : `登陆成功 Hi~${res.userName}`);
      !err && router.replace('/');
    });
  }).finally(() => {
    loading.value = false;
  })
}
const handleKeyDown = (e: KeyboardEvent) => {
  e.keyCode === 13 && validate()
}
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown);
})
onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeyDown);
});
</script>
<style lang="less" scoped>
.login-view {
  height: 100%;
  background: #F2F3F9;
  overflow: hidden;
  .login-w {
    display: flex;
    align-items: center;
    position: relative;
    width: 1200px;
    height: 80vh;
    margin: 10vh auto;
  }
  .login-card__left {
    height: 80%;
    width: 60%;
    background: url('../../assets/login-bg2@2x.png') no-repeat center;
    background-size: 100% 100%;
  }
  .login-card__right {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 85%;
    width: 50%;
    padding: 2.5%;
    background: #FFFFFF;
    box-shadow: -6px 2px 32px 0px rgba(41, 41, 41, 0.16);
    border-radius: 6px;
    .card-right__content {
      height: 100%;
      width: 100%;
      background: url('../../assets/login-card-right-bg@2x.png') no-repeat center;
      background-size: 100% 100%;
      .content-logo {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 102px;
        height: 102px;
        background: white;
        box-shadow: 0px .1rem .25rem 0px rgba(216,221,236,0.5);
        border-radius: 16px;
        margin: 84px auto 44px;
        img {
          height: 50px;
        }
      }
      .content-title {
        font-size: 24px;
        font-weight: bold;
        color: #313131;
        text-align: center;
        margin-bottom: 82px;
      }

      .content-form {
        input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active {
          transition: background-color 5000s ease-in-out 0s;
          -webkit-box-shadow: 0 0 0px 1000px white inset;
        }
        input:-internal-autofill-selected {
          -webkit-box-shadow: 0 0 0px 1000px white inset;
          background-color: white !important;
        }
      }
    }
  }
}
</style>