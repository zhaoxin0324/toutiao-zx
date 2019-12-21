import axios from 'axios'
// 配置固定路径
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截
axios.interceptors.request.use(function (config) {
  // config 发送请求的配置信息 将token添加到config中
  let token = window.localStorage.getItem('userInfo')
  config.headers.Authorization = `Bearer ${token}`// 统一注入token
  return config // 必须返回config
}, function (error) {
  // 请求失败时的处理
  return Promise.reject(error)
})

// 设置响应拦截
axios.interceptors.response.use(function (response) {

})
export default axios
