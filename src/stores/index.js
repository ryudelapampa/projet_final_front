import Vue from "vue";
import Vuex from "vuex";
import { GestionAbsences } from "./storeAbsences";
import { GestionCollaborateur } from "./storeCollaborateur";


Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    stateAbsence : GestionAbsences,
    stateCollaborateur : GestionCollaborateur,

  },
});

// store.getters.allClients
