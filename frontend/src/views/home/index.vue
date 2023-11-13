<template>
  <div class="home-wrapper">
    <el-container>
      <el-container>
        <!--        <el-aside>-->
        <!--          <div class="panel aside">-->
        <!--          </div>-->
        <!--        </el-aside>-->
        <el-main>
          <el-button @click="click">click me</el-button>
          <el-button type="danger" @click="logout" class="right">退出登录</el-button>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { ipcApiRoute } from '@/api/main'

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  methods: {
    async click() {
      const result = await this.$ipc.invoke(ipcApiRoute.test, { id: 561 })
      console.log(result)
      if(result.success) {
        this.$message.success(result.message)
      } else {
        this.$message.error(result.message)
      }
    },
    logout() {
      this.$ipc.invoke(ipcApiRoute.logout, {})
    }
  }
}
</script>

<style scoped lang="less">
.home-wrapper {
  height: 100%;
  width: 100%;
  background-color: #fff;
  user-select: none;

  .el-container {
    height: 100%;

    .el-container {
      height: calc(100% - 30px);

      .el-aside {
        width: 300px !important;
        height: 100%;
        padding-left: 8px;
        padding-right: 8px;
      }

      .el-main {
        padding: 0;
        height: 100%;
      }
    }

    .el-footer {
      position: relative;
      height: 30px !important;
      padding: 0 10px;
      font-size: 14px;

      .task-status {
        position: absolute;
        top: 4px;
        left: 14px;
      }
    }
  }
}

</style>
