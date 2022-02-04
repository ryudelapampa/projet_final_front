<template>
  <div class="home">
    <h1>{{ test.client.nom }} </h1>
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
          <td>{{ abs.dateDebut }}</td>
          <td>{{ abs.motif }}</td>
          <td>{{ abs.statut }}</td>
          <td>
            <v-icon small color="green"> mdi-lead-pencil </v-icon>
            |
            <v-icon small color="red"> mdi-trash-can-outline </v-icon>
          </td>
        </tr>
      </tbody>
    </table>
    
  </div>
</template>

<script>


export default {
  name: 'Home',
  props: ["test"],
  data() {
    return {
     listeAbsence: this.test.client.absences,
     listeCollabService: this.test.service
    }
  },
  methods: {
    refresh() {
      
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
