// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import Mint from 'mint-ui'

// 引入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts 

Vue.use(Mint)

import 'mint-ui/lib/style.css';

Vue.config.productionTip = false
Vue.prototype.$http=axios
Vue.prototype.$qs=qs

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
