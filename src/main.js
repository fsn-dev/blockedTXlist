import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'

import $$ from './assets/js/methods'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './assets/css/css.css'

// import VueSocketIO from 'vue-socket.io'
// Vue.use(new VueSocketIO({
// 	connection: $$.config.appURL,
// }))

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.$$ = $$
Vue.prototype.axios = axios


new Vue({
  render: h => h(App),
}).$mount('#app')
