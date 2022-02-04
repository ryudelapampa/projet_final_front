<template>
  <div class="home">
    <h1>{{ client.nom }} </h1>
    <h2>{{ client.service.libelle}} </h2>
    <p>Congés restant : {{ this.calculsoldeconge() }} </p>
    <h1>{{ $t("absences.title") }}</h1>
    <table>
      <thead>
        <th>{{ $t("absences.type") }}</th>
        <th>{{ $t("absences.start") }}</th>
        <!-- <th>{{ $t("absences.end") }}</th> -->
        <th>{{ $t("absences.motif") }}</th>
        <th>{{ $t("absences.status") }}</th>
        <th>{{ $t("table.actions") }}</th>
      </thead>
      <tbody>
        <tr v-for="abs in listeAbsence" v-bind:key="abs.id">
          <td>{{ abs.type }}</td>
          <td>{{ abs.dateJour }}</td>
          <td>{{ abs.motif }}</td>
          <td>{{ abs.statut }}</td>
          <td>
            <v-btn>{{ $t("btn.edit") }}</v-btn>
            |
            <v-btn :loading="loading" color="error" @click="deleteArray(jourferie.id)">{{ $t("btn.delete") }}</v-btn>
          </td>
        </tr>
      </tbody>
    </table>
    <v-slide-y-transition mode="out-in">
      <FormulaireAjoutCongeVue v-show="formulaire" />
    </v-slide-y-transition>
    
  </div>
</template>

<script>

import FormulaireAjoutCongeVue from '../components/FormulaireAjoutConge.vue'

export default {
  name: 'Home',
  props: ["client"],
  components: {
    FormulaireAjoutCongeVue,
  },
  data() {
    return {
      listeAbsence: this.client.absences,
      formulaire: true,
    }
  },
  methods: {
    refresh() {
      
    },
    calculsoldeconge() {
      let soldeConge = 16;
      for(const abs of this.client.absences){
        if ((abs.type == 'CONGE_PAYE') || (abs.type == 'CONGE_NON_PAYE')) {
          soldeConge = soldeConge - 1 ;
        } 
      }
      return soldeConge;
    }
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;
  border: 1px solid #ddd;
  margin-top: 1rem;
}

th {
  background-color: darkgray;
  color: white;
}
th,
td {
  text-align: left;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.container {
  display: flex;
  justify-content: space-between;
}

.soldes {
  background-color: rgb(238, 238, 238);
  border: 1px solid black;
  margin-top: 1rem;
  padding: 1rem;
}
.btn-success {
  background-color: green;
  color: white;
  padding: 1rem;
}

/* CALENDAR */
.v-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
</style>
