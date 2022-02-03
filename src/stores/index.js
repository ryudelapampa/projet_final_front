import Vue from "vue";
import Vuex from "vuex";
import { GestionAbsences } from "./storeAbsences";

Vue.use(Vuex);

const GestionGenerale = {
  state: {
    monState: "State Store 01",
  },
};

export const store = new Vuex.Store({
  modules: {
    absences: GestionAbsences,
    general: GestionGenerale,
  },
});

// store.getters.allClients
