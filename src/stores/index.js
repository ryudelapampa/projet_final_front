import Vue from "vue";
import Vuex from "vuex";
import { GestionAbsences } from "./storeAbsences";
import { GestionClient } from "./storeClient";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    absences : GestionAbsences,
    client : GestionClient,
  },
});

// store.getters.allClients
