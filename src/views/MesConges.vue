<template>
  <div>
    <div class="container">
      <h1>{{ $t("absences.title") }}</h1>
      <v-spacer></v-spacer>
      <div class="soldes" >
        <p> Solde congé : {{ soldeConge }}</p>
        <p>Solde RTT : {{ soldeRtt }} </p>
      </div>
    </div>
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
        <tr v-for="abs in listeAbsence " v-bind:key="abs.id">
        <!-- <tr v-repeat="abs in listeAbsence | orderBy "> -->
          <td>{{ abs.type }}</td>
          <td>{{ abs.dateJour }}</td>
          <td>{{ abs.motif }}</td>
          <td>{{ abs.statut }}</td>
          <td v-if="abs.type != 'RTT_EMPLOYEUR' && abs.statut == 'INITIAL' || abs.statut == 'REJETEE'">
            <v-btn>{{ $t("btn.edit") }}</v-btn>
            |
            <v-btn :loading="loading" @click="deleteArray(abs.id)" color="error" >{{ $t("btn.delete") }}</v-btn>
          </td>
        </tr>
      </tbody>
    </table>

    <v-dialog v-model="dialog" persistent> 
      <template v-slot:activator="{on, attrs}">
        <v-btn class="mt-3" color="primary" dark v-bind="attrs" v-on="on">
          Demande de congés
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Demande de congé</span>
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"> Fermer </v-btn>
        </v-card-actions>
        <v-card-text>
          <v-container>
            <v-slide-y-transition mode="out-in">
              <FormulaireAjoutCongeVue/>
            </v-slide-y-transition>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <CongesCal v-bind:absences="h" />
  </div>
</template>

<script>
  import CongesCal from "../components/CongesCal.vue";
  import AbsenceApi from "../services/AbsenceApi";
  import FormulaireAjoutCongeVue from "../components/Formulaire/ajoutConge.vue";
  import _ from 'lodash'

  export default {
    name: "MesConges",
    components: { CongesCal,FormulaireAjoutCongeVue },
    data() {
      return {
        dialog : false,
        loading : false,
        sortKey : '',
        sortSettings: {'date' : true},
        desc : true,
      };
    },
    mounted() {
      this.$store.dispatch("getCollab");
      
    },
    computed: {
      listeAbsence() {
        return _.orderBy(this.$store.state.stateCollaborateur.collaborateur.absences,'dateJour','desc')
      },
      soldeConge() {
        let soldeConge = 16;
        for (const abs of this.listeAbsence) {
          if ((abs.type == 'CONGE_PAYE') || (abs.type == 'CONGE_NON_PAYE')) {
            soldeConge = soldeConge -1;
          }
        }
        return soldeConge;
      },
      soldeRtt() {
        let soldeRtt = 11;
        for (const abs of this.listeAbsence) {
          if ((abs.type == 'RTT_EMPLOYEUR') || (abs.type == 'RTT_EMPLOYER')) {
            soldeRtt = soldeRtt -1;
          }
        }
        return soldeRtt;
      }
    },
    methods: {
      async deleteArray(id) {
        this.loading = true;
        AbsenceApi.delete(id);
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.loading = false
        this.$store.dispatch("getCollab");
      },
      orderBy(sorKey) {
        this.sortKey = sorKey;
        this.sortSettings[sorKey] = !this.sortSettings[sorKey];
        this.desc = this.sortSettings[sorKey]
      }
    },
  };
</script>

<style lang="scss" scoped>

  table {
    margin: auto;
    border-collapse: collapse;
    border-spacing: 0;
    width: 80%;
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

  // SOLDE 

  .soldes {
    margin: auto;
    max-height: 120px;
    max-width: 200px;
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
