import request from '@/utils/request'

export function getTwoMenu(data) {
  return request({
    url: '/role/getTwoMenu',
    method: 'post',
    data
  })
}

export function getThreeMenu(data) {
  return request({
    url: '/role/getThreeMenu',
    method: 'post',
    data
  })
}

export function getFourMenu(data) {
  return request({
    url: '/role/getFourMenu',
    method: 'post',
    data
  })
}

export function getButtonsMenu(data) {
  return request({
    url: '/role/getButtonsMenu',
    method: 'post',
    data
  })
}

