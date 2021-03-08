import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import axios from 'axios'

Vue.config.productionTip = false

let back = window.location.host == 'localhost:8080' ? 'http://localhost:5000/api/' : 'https://sigesco.tedesco.es/api/';
axios.defaults.baseURL=back


new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
