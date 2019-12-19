import LayoutAside from './home/layout-aside.vue'
import LayoutHeader from './home/layout-header.vue'

export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册组件
    Vue.component('layout-header', LayoutHeader) // 全局注册组件
  }
}
