import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import MesCongesVue from "../views/MesConges.vue";
import JoursFeriesVue from "../views/JoursFeries.vue";
import ServiceJourVue from "../views/CongeService.vue";
import CongesServiceVue from "../views/GestionConges.vue";
import AffichageTableauVue from "../views/CongeEntreprise.vue"; 

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/mesconges",
    name: "MesConges",
    component: MesCongesVue,
  },
  {
    path: "/joursferies",
    name: "JoursFeries",
    component: JoursFeriesVue,
  },
  {
    path: "/servicejour",
    name: "ServiceJour",
    component: ServiceJourVue,
  },
  {
    path: "/gestion",
    name: "CongesService",
    component: CongesServiceVue,
  },
  {
    path: "/tableau",
    name: "AffichageTableau",
    component: AffichageTableauVue
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
