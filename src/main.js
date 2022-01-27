import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import i18n from './i18n'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store ( {
  state: {
    monState : "State Store 01",
    listeclient : [
      { nom : "Client 01"}
    ]
  },
  getters : {
    allClients: state => {
      return state.listeclient
    },
    addListeClient : state => client => {
      state.listeclient.push(client)
    }
  }
})

Vue.config.productionTip = false

new Vue({
  vuetify,
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
