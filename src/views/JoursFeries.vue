<template>
  <div>
    <h1>{{ $t("holidays.title") }}</h1>
    <v-btn id="switchTab" v-on:click="changeTab" color="primary" elevation="2" >Tableau des RTT employeurs</v-btn>

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
            <v-btn>Modif<v-icon color="green">mdi-lead-pencil</v-icon></v-btn>
              |
            <v-btn>Delete<v-icon color="red">mdi-trash-can-outline</v-icon></v-btn>
          </td>
        </tr>
      </tbody>
      <router-link to="/ajoutferie">
        <v-btn v-show="administrateur" color="primary" elevation="2">Ajouter</v-btn>
      </router-link>
      
    </table>

    <table v-show="rttemployeur">
      <thead>
        <th>{{ $t("table.date") }}</th>
        <th>Durée</th> <!--A mettre dans les fichier langue LOCAUX-->
        <th>{{ $t("table.label") }}</th>
        <th>Statut</th>
        <th>{{ $t("table.type") }}</th>
        <th v-show="administrateur">{{ $t("table.actions") }}</th>
      </thead>
      <tbody>
        <tr v-for="absence in listAbsence" v-bind:key="absence.id" >
            <td>{{ absence.dateDebut }}</td>
            <td>{{ absence.duree }} jours</td>
            <td>{{ absence.motif }}</td>
            <td>{{ absence.statut }}</td>
            <td>{{ $t("type-abs.rtt-emp") }}</td>
            <td v-show="administrateur">
              <v-btn>Modif<v-icon color="green">mdi-lead-pencil</v-icon></v-btn>
              |
              <v-btn>Delete<v-icon color="red">mdi-trash-can-outline</v-icon></v-btn>
            </td>
          </tr>
      </tbody>
      <router-link to="/ajoutrttemployeur">
        <v-btn v-show="administrateur" color="primary" elevation="2">Ajouter</v-btn>
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
        administrateur: false,
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
