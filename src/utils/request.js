// 导入 axios
import axios from 'axios';
// 导入token工具函数
import { getToken } from '../utils/token.js';

// 创建新的请求对象
const request = axios.create({
  // 基地址
  baseURL: process.env.VUE_APP_URL,
  // 是否跨域携带cookie
  withCredentials: true
});

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    // 在发送请求之前，携带上token
    config.headers.token = getToken();
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  function(response) {
    // 拿掉返回数据的 .data(减少结构层)
    return response.data;
  },
  function(error) {
    return Promise.reject(error);
  }
);

export default request
