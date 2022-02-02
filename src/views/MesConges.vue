<template>
  <div>
    <h1>{{ $t("absences.title") }}</h1>
    <table>
      <thead>
        <th>{{ $t("absences.type") }}</th>
        <th>{{ $t("absences.start") }}</th>
        <th>{{ $t("absences.end") }}</th>
        <th>{{ $t("absences.motif") }}</th>
        <th>{{ $t("absences.status") }}</th>
        <th>{{ $t("table.actions") }}</th>
      </thead>
      <tbody>
        <tr>
          <td>{{ $t("type-abs.paid") }}</td>
          <td>23/05/2022</td>
          <td>25/05/2022</td>
          <td>s/o</td>
          <td>{{ $t("status.pending") }}</td>
          <td>
            <v-icon small color="green"> mdi-lead-pencil </v-icon>
            |
            <v-icon small color="red"> mdi-trash-can-outline </v-icon>
          </td>
        </tr>
        <tr>
          <td>{{ $t("type-abs.paid") }}</td>
          <td>04/01/2022</td>
          <td>07/01/2022</td>
          <td>s/o</td>
          <td>{{ $t("status.approved") }}</td>
          <td>
            <v-icon small color="green"> mdi-lead-pencil </v-icon>
            |
            <v-icon small color="red"> mdi-trash-can-outline </v-icon>
          </td>
        </tr>
        <tr>
          <!-- 
            TODO à lier avec la bdd pour les données 
          <td>{{ abs.start }}</td>
          <td>{{ abs.end }}</td>
          <td>{{ abs.type }}</td>
          <td>{{ abs.motif }}</td>
          <td>{{ abs.status }}</td>
          -->
        </tr>
      </tbody>
    </table>
    <div class="container">
      <div class="soldes">
        <p>Solde congés payés : 16</p>
        <p>Solde RTT : 4</p>
        <!-- .solde -->
      </div>
      <div>
        <button class="btn btn-success">Ajouter</button>
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
