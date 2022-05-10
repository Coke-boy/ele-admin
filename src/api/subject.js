import request from '@/utils/request.js'

// 学科删除
export function subjectRemove(data) {
  return request({
    url: '/subject/remove',
    method: 'post',
    data
  });
}
// 学科编辑
export function subjectEdit(data) {
  return request({
    url: '/subject/edit',
    method: 'post',
    data
  });
}
// 学科状态设置
export function subjectStatus(data) {
  return request({
    url: '/subject/status',
    method: 'post',
    data
  });
}
// 学科list
export function subjectList(params) {
  return request({
    url: '/subject/list',
    method: 'get',
    params 
  });
}
// 学科添加
export function subjectAdd(data) {
  return request({
    url: '/subject/add',
    method: 'post',
    data
  });
}
