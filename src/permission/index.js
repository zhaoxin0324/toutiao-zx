// 设置路由全局守卫 router.beforeEach(function(to,from,next){}) 监视
// 首先引入路由文件index.js
import router from '../router'
router.beforeEach(function (to, from, next) {
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
