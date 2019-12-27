import LayoutAside from './home/layout-aside.vue'
import LayoutHeader from './home/layout-header.vue'
import BreadCrumb from './common/bread-crumb'
import { quillEditor } from 'vue-quill-editor'
import CoverImage from './publish/cover-image'
import SelectImage from './publish/select-image'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册组件
    Vue.component('layout-header', LayoutHeader) // 全局注册组件
    Vue.component('bread-crumb', BreadCrumb) // 全局注册面包屑组件
    Vue.component('quill-editor', quillEditor)
    Vue.component('cover-image', CoverImage) // 注册一个封面组件
    Vue.component('select-image', SelectImage)
  }
}
