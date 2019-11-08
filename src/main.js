import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n
import i18n from './assets/translate/i18n/i18n';

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import Directives from './directives'
import echarts from "echarts";
import 'echarts-gl';
import elTableInfiniteScroll from 'el-table-infinite-scroll';

import '@/icons' // icon
import '@/permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */
import { mockXHR } from '../mock'
if (process.env.NODE_ENV === 'production') {
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.use(Directives)
Vue.use(elTableInfiniteScroll)
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts;

new Vue({
  el: '#app',
  router,
  store,
  i18n, //很重要，别忘记
  render: h => h(App)
})
