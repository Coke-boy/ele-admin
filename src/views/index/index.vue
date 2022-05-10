<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <div class="left">
        <!-- 左侧图标 -->
        <i @click="isCollapse = !isCollapse" class="el-icon-s-fold"></i>
        <img src="../../assets/index_logo.png" alt="" />
        <span>黑马面面</span>
      </div>
      <div class="right">
        <img :src="$store.state.userIcon" alt="" />
        <span class="name">{{ $store.state.username }},您好</span>
        <el-button type="primary" @click="logout">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="auto" class="my-aside">
        <!-- 导航菜单 -->
        <el-menu router :collapse="isCollapse" :default-active="$route.path" class="el-menu-vertical-demo">
          <template v-for="(item, index) in navRoutes">
            <el-menu-item :key="index" :index="item.meta.fullPath" v-if="item.meta.rules.includes($store.state.role)">
              <!-- 图标 -->
              <i :class="item.meta.icon"></i>
              <span slot="title">{{ item.meta.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- 路由出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { logout } from '@/api/index.js';
import { removeToken } from '@/utils/token.js';
// 导入路由数组
import navRoutes from '@/router/childrenRoutes.js';
export default {
  name: 'index',
  data() {
    return {
      // 用户名
      // username: '',
      // 用户头像
      // userIcon: '',
      // 是否折叠
      isCollapse: false,
      // 保存到data中 方便一会循环
      navRoutes: navRoutes
    };
  },
  methods: {
    logout() {
      this.$confirm('你确定要退出后台管理', '友情提示', {
        confirmButtonText: '退出',
        cancelButtonText: '取消',
        // type: 'error'
        type: 'success'
      })
        .then(() => {
          // 点击确定
          logout().then(res => {
            if (res.data.code === 200) {
              // 移除token
              removeToken();
              // 移除 Vuex中的 头像
              this.$store.commit('changeIcon', '');
              // 移除 Vuex中的 名字
              this.$store.commit('changeName', '');
              // 去登录页
              this.$router.push('/login');
            }
          });
        })
        .catch(() => {
          // 点击取消
        });
    }
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    // background: hotpink;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        margin-right: 11px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        border-radius: 50%;
        margin-right: 9px;
      }
      span.name {
        margin-right: 38px;
        font-size: 14px;
      }
    }
  }
  .my-aside {
    // background: yellowgreen;
  }
  .my-main {
    background: #0094ff;
  }
  /* c3中的transition（过渡），需要有开始和结束的值 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
}
</style>
