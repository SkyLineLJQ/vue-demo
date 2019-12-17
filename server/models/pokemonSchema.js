//引入mongoose模块
const mongoose = require('mongoose')

//定义数据模型，可以看到，我们下面创建了一个表，表中的数据有name、age、sex等字段，并且这些字段的数据类型也定义了，最后将model导出即可
const pokemonSchema = mongoose.Schema({
    pokemonCode: String, // 宝可梦编码全局唯一标识
    pokemonIndex: String, // 图鉴编码
    pokemonName: String, // 宝可梦名称
    pokemonNameEn: String, // 英文名称
    pokemonHP: Number, 
    pokemonAD: Number,
    pokemonWF: Number,
    pokemonTF: Number,
    pokemonAP: Number,
    pokemonSP: Number,
    pokemonSum: Number, // 个体值合计
    imgUrl: String, // 图片地址
    isFavourite: String, // 是否为收藏
    desc: String, // 备注
    status: String // 状态
}, { collection: 'pokemon' })

//导出model模块
const Pokemon = module.exports = mongoose.model('pokemon', pokemonSchema);