import axios from 'axios';
import { getToken} from '../utils/token.js'

const indexRequest = axios.create({
    // 基地址
    baseURL:process.env.VUE_APP_URL,
    // 是否跨域
    withCredentials:true
})

// 用户信息 接口
export function info() {
  return indexRequest({
      url:"/info",
      method:"get",
      headers:{
        token:getToken()
      }
  })
}
// 用户的退出 接口
export function logout() {
  return indexRequest({
      url:"/logout",
      method:"get",
      headers:{
        token:getToken()
      }
  })
}