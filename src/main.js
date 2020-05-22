import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VCharts from 'v-charts'
import './plugins/element.js'
// 导入全局样式表
import './assets/css/index.scss'
// 引入请求发起工具
import axios from 'axios'

import './components';
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   return config
// })
Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://127.0.01:8888/api/private/v1/'

Vue.config.productionTip = false
Vue.use(VCharts)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
