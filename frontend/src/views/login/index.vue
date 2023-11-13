<template>
  <div class="layout">
    <div class="main-header">
      <div class="main-header-top">
        <div class="main-header-top-title">
          登录
        </div>
        <div class="main-header-top-toolbar">
          <span class="main-header-top-toolbar-btn" @click="minimize"><i class="el-icon-minus"></i></span>
          <span class="main-header-top-toolbar-btn" @click="close"><i class="el-icon-close"></i></span>
        </div>
      </div>
    </div>
    <div class="login-content">
      <!--      <div class="main-title">-->
      <!--        <img :src="$config.SYSTEM_ICON" alt="ttsoft" height="30px" style="vertical-align: text-top; margin-right: 4px;">-->
      <!--        <span>{{$config.SYSTEM_TITLE}}</span>-->
      <!--      </div>-->
      <el-card class="box-card">
        <el-form :disabled="formDisabled" class="login-form" ref="loginForm" :model="form">
          <el-form-item>
            <el-input
              v-model="form.username"
              placeholder="用户名"
              prefix-icon="el-icon-user"
              @keydown.enter.native="login"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.password"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              type="password"
              show-password
              @keydown.enter.native="login"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-input
              v-model="form.verifyCode"
              placeholder="验证码"
              prefix-icon="el-icon-key"
              @keydown.enter.native="login"
            >
              <!--              <template slot="suffix"><img class="validate-code-image" :src="vcodeSrc" alt="验证码" @click="loadVC">-->
              <!--              </template>-->
            </el-input>
          </el-form-item>
          <el-button ref="loginBtn" type="primary" @click="login" class="login-btn block">
            登 录
          </el-button>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>
import  baseInvoke from '@/utils/baseInvoke'
import { ipcApiRoute } from '@/api/main'

export default {
  name: 'Login',
  data() {
    return {
      form: {
        username: '',
        password: '',
        verifyCode: '',
      },
      formDisabled: false
    }
  },
  methods: {
    login() {
      this.$ipc.invoke(ipcApiRoute.login, {})
    },
    minimize() {
      baseInvoke.minimize()
    },
    close() {
      baseInvoke.close()
    }
  },
}
</script>

<style scoped lang="less">
@bgColor: #5988d7;
@borderWidth: 6px;
@headerHeight: 30px;
.layout {
  -webkit-font-smoothing: antialiased;
  -webkit-app-region: drag;
  height: 100vh;

  .main-header {
    height: @headerHeight;
    line-height: @headerHeight;
    background: @bgColor;

    &-top {
      height: inherit;
      line-height: inherit;

      &-title {
        padding-left: 10px;
        user-select: none;
        line-height: inherit;
        color: #fff;
        font-size: 17px;

        span {
          margin-left: 10px;
          font-size: 16px;
        }

        &-right {
          position: absolute;
          right: 25%;
          top: 0;
        }

      }

      &-toolbar {
        position: absolute;
        top: 0;
        right: 0;

        &-btn {
          line-height: inherit;
          padding: 0 3px;
          font-size: 20px;
          width: 30px;
          display: inline-block;
          text-align: center;
          color: #eee;
          -webkit-app-region: no-drag;

          &:hover {
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.2));
          }

          &:active, &:focus {
            background: linear-gradient(to bottom, rgba(212, 140, 140, 0.1), rgba(255, 255, 255, 0.2));
          }

          &:focus-visible {
            outline: none;
          }
        }
      }
    }
  }
}

.login-content {
  -webkit-app-region: no-drag;
  height: calc(100vh - 30px);

  .main-title {
    width: 300px;
    text-align: center;
    position: absolute;
    top: 50px;
    right: 40px;
    font-size: 20px;
    font-weight: bold;
    user-select: none;
  }

  .box-card {
    position: absolute;
    top: 100px;
    right: 40px;
    width: 300px;
    background: #ffffffeb;
    border-color: #dde0e785;
    border-radius: unset;
    box-shadow: 0 0 5px 0 #ccc;

    .login-btn {
      width: 100%;
    }
  }
}
</style>
