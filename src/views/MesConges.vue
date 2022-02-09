<template>
  <div>


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
          <td v-if="abs.type != 'RTT_EMPLOYEUR'">
            <v-btn>{{ $t("btn.edit") }}</v-btn>
            |
            <v-btn :loading="loading" @click="deleteArray(abs.id)" color="error" >{{ $t("btn.delete") }}</v-btn>
          </td>
        </tr>
      </tbody>
    </table>



    <div class="container">
      <div class="soldes">
        <p>Solde congés payés : 16</p>
        <p>Solde RTT : 4</p>
      </div>
      <!-- .soldes -->
      <div>
        <button class="btn btn-success">{{ $t("btn.add") }}</button>
      </div>
    </div>

    <CongesCal />
  </div>
</template>

<script>
  import CongesCal from "../components/CongesCal.vue";

  export default {
    name: "MesConges",
    components: { CongesCal },
    data() {
      return {
      
      };
    },
    mounted() {
      this.refresh();
    },
    computed: {
      listeAbsence() {
        return this.$store.state.client.collaborateur.absences
      },
      soldeConge() {
        let soldeConge = 16;
        for (const abs of this.listeAbsence) {
          if ((abs.type == 'CONGE_PAYE') || (abs.type == 'CONGE_NON_PAYE')) {
            soldeConge = soldeConge -1;
          }
        }
        return soldeConge;
      }
    },
    methods: {
      refresh() {
        
      },
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
