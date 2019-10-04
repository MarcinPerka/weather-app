import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import '@fortawesome/fontawesome-free/css/all.css'

Vue.config.productionTip = false
Vue.use(vuetify)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
