import Vue from 'vue'
import App from './App.vue'
import router from './assets/router'
import request from './utils/request'
import store from './store'
Vue.config.productionTip = false
Vue.prototype.$request = request;
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
