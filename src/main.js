import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Toasted from 'vue-toasted';

Vue.use(Toasted);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
