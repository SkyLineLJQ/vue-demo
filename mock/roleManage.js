import Mock from 'mockjs'

const data = Mock.mock({
  'TwoItems|10-60': [{
    'code': '@guid',
    'name': '@ctitle(3,6)',
    'mark|1': [true, false]
  }],
  'ThreeItems|10-20': [{
    'code': '@guid',
    'name': '@ctitle(3,6)',
    'mark|1': [true, false]
  }],
  'FourItems|10-120': [{
    'code': '@guid',
    'name': '@ctitle(2,4)',
    'mark|1': [true, false]
  }],
  'ButonsItems|30-100': [{
    'code': '@guid',
    'name': '@ctitle(2,6)',
  }],
})


export default [{
  url: '/role/getTwoMenu',
  type: 'post',
  response: config => {
    const items = data.TwoItems
    return {
      code: 20000,
      data: {
        data: items
      }
    }
  }
}, {
  url: '/role/getThreeMenu',
  type: 'post',
  response: config => {
    const items = data.ThreeItems
    return {
      code: 20000,
      data: {
        data: items
      }
    }
  }
}, {
  url: '/role/getFourMenu',
  type: 'post',
  response: config => {
    const items = data.FourItems
    return {
      code: 20000,
      data: {
        data: items
      }
    }
  }
}, {
  url: '/role/getButtonsMenu',
  type: 'post',
  response: config => {
    const items = data.ButonsItems
    return {
      code: 20000,
      data: {
        data: items
      }
    }
  }
}, ]
