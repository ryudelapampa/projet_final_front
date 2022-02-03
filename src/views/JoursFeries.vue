<template>
  <div>
    <h1>{{ $t("holidays.title") }}</h1>
    <v-btn id="switchTab" v-on:click="changeTab" color="primary" elevation="2" >{{ $t("holidays.table-rtt") }}</v-btn>
    <v-btn v-on:click="refresh()" color="primary" elevation="2" >{{ $t("btn.refresh") }}</v-btn>

    <table v-show="ferie">
      <thead>
        <th>{{ $t("table.date") }}</th>
        <th>{{ $t("table.label") }}</th>
        <!-- <th>{{ $t("table.type") }}</th> -->
        <th v-show="administrateur">{{ $t("table.actions") }}</th>
      </thead>
      <tbody>
        <!-- AFFICHAGE JOUR FERIE -->
        <tr v-for="jourferie in listeJourFeries" v-bind:key="jourferie.id">
          <td>{{ jourferie.dateJour }}</td>
          <td>{{ jourferie.libelle }}</td>
          <!-- <td>{{ $t("type-abs.bank-hol") }}</td> -->
          <td v-show="administrateur">
            <v-btn>{{ $t("btn.edit") }}<v-icon color="green">mdi-lead-pencil</v-icon></v-btn>
              |
            <v-btn :loading="loading" color="error" @click="deleteArray(jourferie.id)">{{ $t("btn.delete") }}</v-btn>
          </td>
        </tr>
      </tbody>
      <router-link to="/ajoutferie">
        <v-btn v-show="administrateur" color="primary" elevation="2">{{ $t("btn.add") }}</v-btn>
      </router-link>
      
    </table>

    <table v-show="rttemployeur" style="flex-wrap: nowrap;">
      <thead>
        <th >{{ $t("table.date") }}</th>
        <th>Durée</th> <!--A mettre dans les fichier langue LOCAUX-->
        <th>{{ $t("table.label") }}</th>
        <th>Statut</th>
        <th>{{ $t("table.type") }}</th>
        <th v-show="administrateur">{{ $t("table.actions") }}</th>
      </thead>
      <tbody>
        <tr v-for="absence in listAbsence" v-bind:key="absence.id" >
            <td >{{ absence.dateDebut }}</td>
            <td>{{ absence.duree }} jours</td>
            <td>{{ absence.motif }}</td>
            <td>{{ absence.statut }}</td>
            <td>{{ $t("type-abs.rtt-emp") }}</td>
            <td v-show="administrateur">
              <v-btn>{{ $t("btn.edit") }}<v-icon color="green">mdi-lead-pencil</v-icon></v-btn>
              |
              <v-btn :loading="loading" color="error" @click="deleteArray(absence.id)">{{ $t("btn.delete") }}</v-btn>
            </td>
          </tr>
      </tbody>
      <router-link to="/ajoutrttemployeur">
        <v-btn v-show="administrateur" color="primary" elevation="2">{{ $t("btn.add") }}</v-btn>
      </router-link>
    </table>
  </div>
</template>

<script>
  import JourFerieApi from "../services/JourFerieApi";
  import AbsenceApi from "../services/AbsenceApi";

  export default {
    name: "joursferies",
    data() {
      return { 
        listeJourFeries : [],
        listAbsence : [],
        ferie : true,
        rttemployeur: false,
        administrateur: true,
        loading : false,
      }
    },
    mounted() {
      this.refresh()
    },
    methods: {
      refresh() {
        JourFerieApi.gettAll().then(
          response => {
            this.listeJourFeries = response.data
          },
          errorlocale => console.log(errorlocale),
          () => console.log("Finally")
          ).catch(errorgeneral => console.log(errorgeneral))
        AbsenceApi.gettAllRttEmployeur().then(
          response => {
            this.listAbsence = response.data
          },
          errorlocale => console.log(errorlocale),
          () => console.log("Finally")
          ).catch(errorgeneral => console.log(errorgeneral))
      },
      changeTab() {
        if (this.ferie == true) {
          this.ferie = false;
          this.rttemployeur = true;
          document.getElementById("switchTab").innerHTML = "Tableau des Jours Feries";
        } else {
          this.ferie = true;
          this.rttemployeur = false;
          document.getElementById("switchTab").innerHTML = "Tableau des RTT employeurs";
        }
      },
      async deleteArray(id) {
        this.loading = true;
        if (this.ferie == true) {
          JourFerieApi.delete(id);
        } else if (this.rttemployeur == true) {
          AbsenceApi.delete(id);
        }
        await new Promise(resolve => setTimeout(resolve, 1500))
        this.loading = false
        this.refresh()
      }
    },
  };
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
</style>
