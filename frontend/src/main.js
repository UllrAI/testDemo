import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import './utils/tools'
import './style/atom.min.css'
import './style/reset.less'
import api from './request'
import LocalStore from '@/utils/LocalStore'
const global = new LocalStore('global', true)

window.electron.ipcRenderer.on('window-ready', (event, payload) => {
  global.set('WINDOW_ID', payload)
})

if (process.env.NODE_ENV === 'development') {
  const devHandle = import('./main.dev')
  devHandle.then((module) => {
    module.default()
  })
}

Vue.config.productionTip = false
Vue.prototype.$ipc = window.electron.ipcRenderer
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: function (h) {
    return h(App)
  }
}).$mount('#app')
