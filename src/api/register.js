import axios from 'axios';

export function sendsms(data) {
  return axios({
    url: process.env.VUE_APP_URL + '/sendsms',
    method: 'post',
    // 是否跨域携带cookie
    withCredentials: true,
    data
  });
}

// 把 注册接口 抽取为方法
export function register(data){
  return axios({
    url: process.env.VUE_APP_URL + '/register',
    method: 'post',
    withCredentials: true,
    data
  });
}
