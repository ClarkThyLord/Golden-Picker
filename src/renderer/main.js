import Vue from 'vue'
import App from './App'

import $ from 'jquery'
window.$ = $
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import dragula from 'dragula'
import 'dragula/dist/dragula.min.css'
window.dragula = dragula({
	copy: true,
	revertOnSpill: true,
	ignoreInputTextSelection: true,
	isContainer: function (el) {
		return el.classList.contains('pocket-space');
	},
  moves: function (el, source, handle, sibling) {
    return source.classList.contains('pocket-drag') || el.classList.contains('draggable');
  },
  accepts: function (el, target, source, sibling) {
    return target.classList.contains('pocket-drop');
  }
})

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
