import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'

// 导入 element-ui
import ElementUI from 'element-ui'
// 导入 element-ui的样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

// 导入全局样式
import './style/base.css'

Vue.config.productionTip = false

// 导入全局过滤器处理相对时间
import '@/filters/index.js'

// 导入 企业下拉框
import enterpriseSel from './views/index/question/components/enterpriseSel.vue'
// 导入 学科下拉框
import subjectSel from './views/index/question/components/subjectSel.vue'


// 注册 企业和学科下拉框
Vue.component('enterpriseSel', enterpriseSel)
Vue.component('subjectSel', subjectSel)



new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
