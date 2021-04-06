import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// Axios
import axios from 'axios'
axios.defaults.headers.post['Content-Type'] ='application/json';

// Bootstrap
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)


// App
new Vue({
  render: h => h(App),
}).$mount('#app')
