var IndexController = require('./controller/index')
var HeroController = require('./controller/hero')
var PokemonController = require('./controller/pokemon')
let UserController = require('./controller/user')

module.exports = function (app) {
    app.get('/', IndexController.index)
    app.get('/getHeros', HeroController.hero)
    app.get('/findHeros', HeroController.findHeros)
    app.post('/createHeroOrUpdateHero', HeroController.createHeroOrUpdateHero)
    app.post('/removeHeroByCode', HeroController.removeHeroByCode)
    app.post('/batchDeleteHeroByCodes', HeroController.batchDeleteHeroByCodes)
    app.post('/batchUpdateStatusByCodes', HeroController.batchUpdateStatusByCodes)
    // 宝可梦Controller
    app.post('/pokemon/findPokemonList', PokemonController.findPokemonList)
    app.post('/pokemon/createOrUpdatePokemon', PokemonController.createOrUpdatePokemon)
    app.post('/pokemon/removePokemonByCode', PokemonController.removePokemonByCode)
    app.post('/pokemon/batchDeletePokemonByCodes', PokemonController.batchDeletePokemonByCodes)
    app.post('/pokemon/batchUpdatePokmonStatusByCodes', PokemonController.batchUpdatePokmonStatusByCodes)
    app.post('/pokemon/checkPokemonIndexOrName', PokemonController.checkPokemonIndexOrName)
    app.post('/pokemon/findPokemonDetailBypokemonCode', PokemonController.findPokemonDetailBypokemonCode)
    // 用户登录相关
    app.post('/user/login', UserController.toLogin)
    app.get('/user/info', UserController.getUserInfo)
}
