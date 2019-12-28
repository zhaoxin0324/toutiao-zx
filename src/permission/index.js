// 设置路由全局守卫 router.beforeEach(function(to,from,next){}) 监视
// 首先引入路由文件index.js
import router from '../router'
import progress from 'nprogress' // 引入进度条组件
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  progress.start() // 开启进度条
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('userInfo')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
router.afterEach(function () {
  progress.done()
})
