import chart from '@/views/index/chart/chart.vue';
import user from '@/views/index/user/user.vue';
import question from '@/views/index/question/question.vue';
import enterprise from '@/views/index/enterprise/enterprise.vue';
import subject from '@/views/index/subject/subject.vue';

export default [
  {
    path: 'chart',
    component: chart,
    meta: {
      title: '数据概览',
      // 允许访问的角色
      rules: ['超级管理员','管理员', '老师', '学生'],
      // 图标
      icon: 'el-icon-pie-chart',
      // 完全地址
      fullPath: '/index/chart'
    }
  },
  {
    path: 'user',
    component: user,
    meta: {
      title: '用户列表',
      rules: ['超级管理员','管理员'],
      icon: 'el-icon-user',
      fullPath: '/index/user'
    }
  },
  {
    path: 'question',
    component: question,
    meta: {
      title: '题库列表',
      rules: ['超级管理员','管理员', '老师'],
      icon: 'el-icon-edit-outline',
      fullPath: '/index/question'
    }
  },
  {
    path: 'enterprise',
    component: enterprise,
    meta: {
      title: '企业列表',
      rules: ['超级管理员','管理员', '老师'],
      icon: 'el-icon-office-building',
      fullPath: '/index/enterprise'
    }
  },
  {
    path: 'subject',
    component: subject,
    meta: {
      title: '学科列表',
      rules: ['超级管理员','管理员', '老师', '学生'],
      icon: 'el-icon-notebook-2',
      fullPath: '/index/subject'
    }
  }
];
