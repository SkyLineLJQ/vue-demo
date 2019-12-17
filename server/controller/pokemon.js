const mongoose = require('mongoose');
const Pokemon = require('../models/pokemonSchema');
const PokemonDetail = require('../models/pokemonDetailSchema');
const Uuid = require('uuid/v4');
const Logger = require('../utils/Logger');

module.exports = {
  // 查找列表
  findPokemonList(req, res, next) {
    Logger.info('分页查询宝可梦列表参数: ' + JSON.stringify(req.body));
    const params = req.body;
    Pokemon.find({
      status: params.status || { $ne: 'OUT' },
      pokemonIndex: params.pokemonIndex || { $ne: params.pokemonIndex },
      pokemonName: new RegExp(params.pokemonName) || { $ne: params.pokemonName },
      pokemonNameEn: new RegExp(params.pokemonNameEn) || { $ne: params.pokemonNameEn }
    })
      .limit(parseInt(params.pageSize))
      .skip(parseInt(params.pageSize) * (parseInt(params.currentPage) - 1))
      .sort({ pokemonIndex: 1 })
      .then(pokemons => {
        res.json({
          code: 20000,
          data: {
            data: pokemons,
            totalPage: pokemons.length
          }
        });
      })
      .catch(err => {
        Logger.error('查询异常' + JSON.stringify(err));
        res.json(err);
      });
  },
  // 新增或修改表单
  createOrUpdatePokemon(req, res, next) {
    Logger.info('新增或修改表单参数: ' + JSON.stringify(req.body));
    const params = req.body;
    params.pokemonCode = params.pokemonCode || Uuid();
    params.pokemonIndex = (new Array(3).join('0') + params.pokemonIndex).slice(-3)
    Pokemon.updateOne({ pokemonCode: params.pokemonCode }, params, {
      upsert: true
    })
      .then(() => {
        res.json({
          code: 20000,
          message: '操作成功'
        });
      })
      .catch(err => {
        Logger.error('新增或修改异常 ' + err);
        res.json(err);
      });
  },
  // 删除宝可梦
  removePokemonByCode(req, res, next) {
    Logger.info('删除宝可梦参数: ' + JSON.stringify(req.body));
    const params = req.body;
    Pokemon.findOneAndDelete({ pokemonCode: params.pokemonCode })
      .then(() => {
        res.json({
          code: 20000,
          message: '操作成功'
        });
      })
      .catch(err => {
        Logger.error('删除异常 ' + err);
        res.json(err);
      });
  },
  // 批量删除宝可梦
  batchDeletePokemonByCodes(req, res, next) {
    Logger.info('批量删除宝可梦参数: ' + JSON.stringify(req.body));
    const params = req.body;
    Pokemon.deleteMany({ pokemonCode: { $in: params.pokemonCodes } })
      .then(() => {
        res.json({
          code: 20000,
          message: '操作成功'
        });
      })
      .catch(err => {
        Logger.error('删除异常 ' + err);
        res.json(err);
      });
  },
  // 批量更新宝可梦
  batchUpdatePokmonStatusByCodes(req, res, next) {
    Logger.info('批量更新宝可梦参数: ' + JSON.stringify(req.body));
    const params = req.body;
    Pokemon.updateMany(
      { pokemonCode: { $in: params.pokemonCodes } },
      { $set: { status: params.status } },
      { multi: true }
    )
      .then(() => {
        res.json({
          code: 20000,
          message: '操作成功'
        });
      })
      .catch(err => {
        Logger.error('批量更新异常 ' + err);
        res.json(err);
      });
  },
  // 校验图鉴编号或名称（英文）不能有重复的
  checkPokemonIndexOrName(req, res, next) {
    Logger.info('校验宝可梦图鉴编号或名称参数: ' + JSON.stringify(req.body))
    const params = req.body
    if (params.pokemonIndex && params.pokemonIndex.length > 3) {
      res.json({
        code: 20000,
        data: false,
        message: '图鉴编号不能超过4位'
      })
      return false
    }
    params.pokemonIndex = !params.pokemonIndex ? '' : (new Array(3).join('0') + params.pokemonIndex).slice(-3)
    Pokemon.find({
      pokemonIndex: params.pokemonIndex || { $ne: params.pokemonIndex },
      pokemonName: params.pokemonName || { $ne: params.pokemonName },
      pokemonNameEn: params.pokemonNameEn || { $ne: params.pokemonNameEn },
      status: { $ne: 'OUT' },
      pokemonCode: { $ne: params.pokemonCode}
    })
      .then(pokemon => {
        if (pokemon.length === 0) {
          res.json({
            code: 20000,
            data: true,
            message: '操作成功'
          })
        } else {
          res.json({
            code: 20000,
            data: false,
            message: '存在重复的宝可梦'
          })
        }
      })
      .catch(err => {
        Logger.error('校验异常 ' + err)
        res.json(err)
      })
  },
  // 根据宝可梦编码查明细
  findPokemonDetailBypokemonCode(req, res, next) {
    Logger.info('根据宝可梦编码查明细 ' + JSON.stringify(req.body))
    const params = req.body
    Pokemon.aggregate([
      { $match: { pokemonCode: params.pokemonCode } },
      {
        $lookup: {
          from: 'pokemon_detail',
          localField: 'pokemonCode',
          foreignField: 'pokemonCode',
          as: 'pokemonDetail'
        }
      }
    ])
      .then(pokemon => {
        pokemon[0].pokemonDetail = pokemon[0].pokemonDetail[0] || ''
        res.json({
          code: 20000,
          data: pokemon[0],
          message: '操作成功'
        })
      })
      .catch(err => {
        Logger.error('查询明细异常 ' + err)
        res.json(err)
      })

  }
};
