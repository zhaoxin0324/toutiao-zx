import axios from '../utils/interceptors.js'
import { API_UPLOADIMG, API_SAVEUSERINFO, API_GETUSERINFO } from '../constant/api.js'
export function uploadImg (data) {
  return axios({
    url: API_UPLOADIMG,
    method: 'patch',
    data
  })
}
export function saveUserInfo (data) {
  return axios({
    url: API_SAVEUSERINFO,
    method: 'patch',
    data
  })
}
export function getUserInfo () {
  return axios({
    url: API_GETUSERINFO
  })
}
