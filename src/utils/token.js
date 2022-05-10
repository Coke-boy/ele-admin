// 操纵token的key 一般用 常量 加大写
const TOKENKEY = 'userToken';

// 存
export function setToken(token) {
  window.localStorage.setItem(TOKENKEY, token);
}
// 取
export function getToken() {
  return window.localStorage.getItem(TOKENKEY);
}
// 删
export function removeToken() {
  window.localStorage.removeItem(TOKENKEY);
}
