import axios from 'axios'
import router from '../router'
import { Message } from 'element-ui' // 引入提示信息
// 配置固定路径
import JSONBig from 'json-bigint'
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
// 在响应拦截之前要处理下id失真问题
axios.defaults.transformResponse = [function (data) {
  return JSONBig.parse(data) // 用JSONbig.pase替换 JSON.parse 保证数字的正确
}]
// 设置响应拦截
axios.interceptors.response.use(function (response) {
  // response 响应数据
//   解构一层响应数据
  console.log(response)
  return response.data ? response.data : {}
}, function (error) {
  // 状态码不是 200/201/204 时进入此函数
  // 获取状态码，进行响应的提示或处理
  console.log(error)
  let status = error.response.status // 获取状态码
  let message = '' // 提示信息
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      window.localStorage.removeItem('userInfo')
      router.push('/login') // 编程式导航
      break
    case 401:
      window.localStorage.removeItem('userInfo')
      router.push('/login')
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  Message({ type: 'warning', message }) // 设置提示信息
})
export default axios
