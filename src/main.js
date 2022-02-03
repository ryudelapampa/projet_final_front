import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import i18n from './i18n'
//import Vuex from 'vuex'
import { store } from './stores'

//Vue.use(Vuex)

store.getters.allAbsences

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
i18n.locale = "fr";