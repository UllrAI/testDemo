<template>
  <div class="layout">
    <div class="main-header">
      <div class="main-header-top">
        <div class="main-header-top-title">
          主页
        </div>
        <div class="main-header-top-toolbar">
          <span class="main-header-top-toolbar-btn" @click="minimize"><i class="el-icon-minus"></i></span>

          <span class="main-header-top-toolbar-btn" @click="toggleMaximized">
            <i :class="{'el-icon-full-screen':!maximized,'el-icon-copy-document':maximized}"></i>
          </span>
          <span class="main-header-top-toolbar-btn red-bg" @click="close"><i class="el-icon-close"></i></span>

        </div>
      </div>
    </div>
    <div class="main-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import  baseInvoke from '@/utils/baseInvoke'

export default {
  name: 'Layout',
  data() {
    return {
      maximized: false,
    }
  },
  mounted() {
    this.$ipc.on('maximize', (event) => {
      this.maximized = true
    })
    this.$ipc.on('unmaximize', (event) => {
      this.maximized = false
    })
  },
  methods: {
    toggleMaximized() {
      if (!this.maximized) {
        this.maximize()
      } else {
        this.unmaximize()
      }
      this.maximized = !this.maximized
    },
    minimize() {
      baseInvoke.minimize()
    },
    maximize() {
      baseInvoke.maximize()
    },
    unmaximize() {
      baseInvoke.unmaximize()
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

.main-container {
  padding: @borderWidth;
  padding-top: 0;
  background: @bgColor;
  height: calc(100vh - @headerHeight - @borderWidth);
  overflow: auto;
  -webkit-app-region: no-drag;
}

.active {
  background: #cccccc6e;
  border-radius: 4px;
}

.el-input.tc-input {
  :deep(.el-input__inner) {
    padding-right: 95px;
  }

  :deep(.el-input__suffix) {
    right: 0;
  }
}

.preferences-dialog {
  :deep(.el-dialog__body) {
    height: 300px;
  }
}
</style>
