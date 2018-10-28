import Vue from 'vue'
import $ from 'jquery'
window.$ = $
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import util from './common/util'
window.util = util

import App from './App'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

new Vue({
  components: { App },
  template: '<App/>'
}).$mount('#app')
