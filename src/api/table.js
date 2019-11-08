import request from '@/utils/request'

export function getList(data) {
  return request({
    url: '/table/list',
    method: 'post',
    data
  })
}

export function getSelectList(params) {
  return request({
    url: '/table/getSelectList',
    method: 'get',
    params
  })
}
