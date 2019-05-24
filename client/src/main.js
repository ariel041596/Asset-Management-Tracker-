import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';


Vue.config.productionTip = false

// Setting up the default vue http module
Vue.prototype.$http = axios;
// load token from the local storage
const token = localStorage.getItem("token");
//If there is token and simply default axios authorization headers
if (token) {
  Vue.prototype.$http.default.headers.common['Authorization'] = token;

}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
