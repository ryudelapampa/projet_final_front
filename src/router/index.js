import Vue from "vue";
import VueRouter from "vue-router";

import Home from "@/views/Home.vue";
import testVue from "@/views/test.vue";
import MesCongesVue from "../views/MesConges.vue";
import JoursFeriesVue from "../views/JoursFeries.vue";
import ServiceJourVue from "../views/ServiceJour.vue";
import CongesServiceVue from "../views/GestionConges.vue";
import FormulaireAjoutFerieVue from "../views/FormulaireAjoutFerie.vue";
import FormulaireAjoutRttEmployeurVue from "../views/FormulaireAjoutRttEmployeur.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/test",
    name: "testVue",
    component: testVue,
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
    path: "/ajoutferie",
    name: "formulaireajoutferie",
    component: FormulaireAjoutFerieVue,
  },
  {
    path: "/ajoutrttemployeur",
    name: "formulaireajoutrttemployeur",
    component: FormulaireAjoutRttEmployeurVue,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
