import Vue from "vue";
import Vuex from "vuex";
import { GestionAbsences } from "./storeAbsences";
import { GestionCollaborateur } from "./storeCollaborateur";
import { GestionJourFerie } from "./storeJoursFeries";

Vue.use(Vuex);

export const store = new Vuex.Store({
  modules: {
    stateAbsence : GestionAbsences,
    stateCollaborateur : GestionCollaborateur,
    stateJourFerie : GestionJourFerie
  },
});

// store.getters.allClients
