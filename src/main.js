import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import Store from './store'

Vue.config.productionTip = false

// Axios
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] ='application/json';

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(Vuex)
var store = Store()

// App
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
