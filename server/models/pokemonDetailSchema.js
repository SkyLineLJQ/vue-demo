// 宝可梦明细表

//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const pokemonDetailSchema = mongoose.Schema({
  pokemonCode: String, // 宝可梦编码全局唯一标识
  pokemonProperty: [], // 宝可梦属性
  pokemonFeature: [], // 宝可梦特性
  pokemonRegion: [], // 宝可梦地区编号
  pokemonColor: [], // 图鉴颜色(主色调，次色调)
  pokemonAppearance: String, // 宝可梦外貌
  pokemonSpecialPower: String, // 宝可梦特殊能力
  pokemonTemperament: String, // 宝可梦性情
  pokemonSkills: [], // 宝可梦技能列表
  pokemonImage: String, // 宝可梦图片Url

}, { collection: 'pokemon_detail' })

//导出model模块
const Pokemon = module.exports = mongoose.model('pokemon_detail', pokemonDetailSchema);
