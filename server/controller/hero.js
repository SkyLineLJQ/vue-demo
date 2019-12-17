const mongoose = require('mongoose')
const Hero = require("../models/heroSchema");
const Uuid = require("uuid/v4")

module.exports = {
    // @Test
    hero(req, res, next) {
        console.log('controller hero')
        Hero.find({})
            .sort({ update_at: -1 })
            .then(heros => {
                res.json(heros);
            })
            .catch(err => {
                console.log(2);
                res.json(err);
            });
    },
    // 查找列表
    findHeros(req, res, next) {
        console.log('findHeros: ' + JSON.stringify(req.body))
        Hero.find().limit(req.body.pageSize).skip(req.body.pageSize * (req.body.currentPage - 1))
            .then(heros => {
                res.json(heros)
            })
            .catch(err => {
                console.log('查询异常')
                res.json(err)
            })
    },
    // 新增或修改表单
    createHeroOrUpdateHero(req, res, next) {
        console.log('createHeroOrUpdateHero: ' + JSON.stringify(req.body))
        let params = req.body
        params.heroCode = params.heroCode || Uuid()
        Hero.updateOne({ heroCode: params.heroCode }, params, { upsert: true })
            .then(() => {
                res.json({
                    code: 0,
                    message: "操作成功"
                })
            })
            .catch(err => {
                console.log('新增或修改异常 ' + err)
                res.json(err)
            })
    },
    // 删除英雄
    removeHeroByCode(req, res, next) {
        console.log('removeHeroById: ' + JSON.stringify(req.body))
        let params = req.body
        Hero.findOneAndDelete({ heroCode: params.heroCode })
            .then(() => {
                res.json({
                    code: 0,
                    message: "操作成功"
                })
            })
            .catch(err => {
                console.log('删除异常 ' + err)
                res.json(err)
            })
    },
    // 批量删除英雄
    batchDeleteHeroByCodes(req, res, next) {
        console.log('batchDeleteHeroByIds: ' + JSON.stringify(req.body))
        let params = req.body
        Hero.deleteMany({ heroCode: { $in: params.heroCodes } })
            .then(() => {
                res.json({
                    code: 0,
                    message: "操作成功"
                })
            })
            .catch(err => {
                console.log('删除异常 ' + err)
                res.json(err)
            })
    },
    // 批量更新英雄
    batchUpdateStatusByCodes(req, res, next) {
        console.log('batchUpdateStatusByCodes: ' + JSON.stringify(req.body))
        let params = req.body
        Hero.updateMany({ heroCode: { $in: params.heroCodes } }, { $set: { status: params.status } }, { multi: true })
            .then(() => {
                res.json({
                    code: 0,
                    message: "操作成功"
                })
            })
            .catch(err => {
                console.log('更新异常 ' + err)
                res.json(err)
            })
    }
}