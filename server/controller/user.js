const mongoose = require('mongoose')
const URL = require('url')
const User = require("../models/userSchema");

module.exports = {
  // 登录接口
  toLogin(req, res, next) {
    console.log('登录接口参数: ' + JSON.stringify(req.body))
    let params = req.body
    User.find({
        UserName: params.username
      })
      .then(user => {
        if (user.length == 0) {
          res.json({
            code: 60204,
            message: '账号或密码错误'
          })
        } else {
          res.json({
            code: 20000,
            data: {
              token: 'admin-token'
            },
            message: '操作成功'
          })
        }
      })
      .catch(err => {
        console.log('登录接口调用异常')
        res.json(err)
      })
  },
  getUserInfo(req, res, next) {
    console.log('获取当前登录用户' + JSON.stringify(URL.parse(req.url,true).query))
    res.json({
      code: 20000,
      data: {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        name: 'Administor'
      }
    })
  }
}
