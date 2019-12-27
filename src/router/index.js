import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue'
// import Comment from '../views/comment'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  path: '/home',
  name: 'home',
  component: Home,
  children: [{
    path: '', // 二级路由什么都不写 作为一级路由的默认显示组件
    component: Home2
  }, {
    path: 'comment',
    component: () => import('../views/comment') // 按需加载
  }, {
    path: 'material',
    component: () => import('../views/material') // 素材管理按需加载
  }, {
    path: 'articles',
    component: () => import('../views/articles')
  }, {
    path: 'publish',
    component: () => import('../views/publish')
  }, {
    path: 'publish/:articleId',
    component: () => import('../views/publish')
  }, {
    path: 'account',
    component: () => import('../views/account')
  }]
}, {
  path: '/login',
  component: Login
}
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
