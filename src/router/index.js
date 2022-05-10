import Vue from 'vue';
import VueRouter from 'vue-router';

// 导入 进度条组件
import NProgress from 'nprogress';
// 导入 进度条样式
import 'nprogress/nprogress.css';


import { getToken, removeToken } from '@/utils/token.js';

import { info } from '@/api/index.js';

// 按需导入 Element-ui的弹框
import { Message } from 'element-ui';

import store from '@/store/index.js';

Vue.use(VueRouter);

import login from '../views/login/login.vue';
import index from '../views/index/index.vue';

// 导入嵌套路由
import children from './childrenRoutes.js';

const router = new VueRouter({
  // 路由规则
  routes: [
    // 重定向地址
    {
      path: '/',
      redirect: '/login'
    },
    // 登录
    {
      path: '/login',
      component: login,
      meta: {
        title: '用户登录', 
        // 允许访问的角色
        rules: ['超级管理员','管理员', '老师', '学生']
      }
    },
    // 首页
    {
      path: '/index',
      component: index,
      meta: {
        title: '管理首页',
        // 允许访问的角色
        rules: ['超级管理员','管理员', '老师', '学生']
      },
      // 嵌套路由
      children
    }
  ]
});

// 无需登录即可进入的页面(登录页或者404等等)
const whitePaths = ['/login', '/demo'];

// 前置守卫
router.beforeEach((to, from, next) => {
  // 开启进度条
  NProgress.start();
  // 如果去往的页面需要登录
  if (whitePaths.includes(to.path.toLocaleLowerCase()) !== true) {
    // 判断token 是否存在
    // 不存在 提示用户，并返回登录页 缓存不存在
    if (getToken() === null) {
      Message.warning('请先登录');
      NProgress.done();
      next('/login');
    } else {
      // token 存在
      // 发送请求获取真实token
      info().then(res => {
        if (res.data.code === 206) {
          // token有问题，清除本地token
          removeToken();
          Message.warning('登录状态有误，请重新登录');
          NProgress.done();
          next('/login');
        } else if (res.data.code === 200) {
          // 用户状态判断:
          if (res.data.data.status === 1) {
            // 启用
            // 处理用户的信息 用户的名字
            const username = res.data.data.username;
            // 处理用户的信息 用户的头像
            const userIcon = process.env.VUE_APP_URL + '/' + res.data.data.avatar;
            // 调用仓库的方法，保存用户信息
            store.commit('changeIcon', userIcon);
            store.commit('changeName', username);
            // window.console.log(from)
            // 如果是从 不需要登陆的页面过来的，弹框
            if (whitePaths.includes(from.path)) {
              // 可以正常访问时，才提示欢迎
              Message.success('欢迎你！！');
            }
            // 获取当前用户的角色
            const role = res.data.data.role;
            // 调用仓库方法 保存起来
            store.commit('changeRole', role);
            // 判断是否有访问的权限
            if (to.meta.rules.includes(role)) {
              // 有 放走
              next();
            } else {
              // 没有 提示用户
              Message.warning('没有访问权限，无法访问');
              // 关闭进度条
              NProgress.done();
            }
          } else {
            // 禁用状态
            // 提示用户
            // 返回登录页
            Message.warning('当前出于禁用状态，请等待管理员审核');
            NProgress.done();
            next('/login');
          }
        }
      });
    }
  } else {
    // 无需登录的页面直接通行
    next();
  }
});

// 后置守卫
router.afterEach(to => {
  // 关闭进度条
  NProgress.done();
  // 修改当前页面标题
  window.document.title = to.meta.title;
});

export default router;
