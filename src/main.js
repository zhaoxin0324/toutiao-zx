import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.less'
import axios from 'axios'
import Component from './components/index' // 引入自定义组件对象并注册
Vue.use(Component) // 注册全局组件对象==》调用该对象的install方法
Vue.use(ElementUI)
Vue.config.productionTip = false
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'// 配置固定路径
Vue.prototype.$axios = axios // 设置全局属性

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
