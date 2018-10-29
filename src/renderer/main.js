import Vue from 'vue'
import App from './App'

import $ from 'jquery'
window.$ = $
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import util from './common/util'
window.util = util

import db from './common/db'
window.db = db().then((response) => {
	window.db = response
	
	if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
	Vue.config.productionTip = false

	new Vue({
	  components: { App },
	  template: '<App/>'
	}).$mount('#app')
})
