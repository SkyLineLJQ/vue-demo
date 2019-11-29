import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import settings from './modules/settings'
import user from './modules/user'
import buttonPermissions from './modules/buttonPermissions'
import game1 from './modules/game1'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    settings,
    user,
    buttonPermissions,
    game1
  },
  getters
})

export default store
