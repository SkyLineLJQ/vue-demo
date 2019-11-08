import Mock from 'mockjs'

const data = Mock.mock({
  'items|1000': [{
    userCode: '@integer(0 ,100000)',
    userName: '@name',
    'sex|1': ['M', 'W'],
    'level': '@integer(0 ,5)',
    age: '@natural(0,100)',
    birthday: '@datetime(yyyy-MM-dd)',
    mark: '@title(3,5)',
    'money': '@integer(100,1000000)'
  }],
  pageInfo: {
    'currentPage': '@natural(1,10)',
    'pageSize|1': [100, 200, 300, 400],
  }
})

const OptionsData = Mock.mock({
  'items|20': [{
    label: '@name',
    value: '@increment(1000)',
    id: '@increment(100)'
  }]
})

export default [{
  url: '/table/list',
  type: 'post',
  response: config => {
    const items = data.items
    return {
      code: 20000,
      data: {
        pageInfo: {
          ...data.pageInfo,
          totoalPage: items.length
        },
        data: items 
      }
    }
  }
}, {
  url: '/table/getSelectList',
  type: 'get',
  response: config => {
    return {
      code: 20000,
      data: {
        data: OptionsData.items
      }
    }
  }
}]
