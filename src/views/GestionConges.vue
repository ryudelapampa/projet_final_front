<template>
  <div>
    <h1>{{ $t("manage-abs.title") }}</h1>

    <table>
      <thead>
        <th>{{ $t("table.name") }}</th>
        <th>{{ $t("table.email") }}</th>
        <th>{{ $t("absences.type") }}</th>
        <th>{{ $t("absences.start") }}</th>
        <th>{{ $t("absences.end") }}</th>
        <th>{{ $t("absences.motif") }}</th>
        <th>{{ $t("absences.status") }}</th>
        <th>{{ $t("table.actions") }}</th>
      </thead>
      <tbody>
        <tr>
          <td>Jean Dupont</td>
          <td>j.dupont@email.com</td>
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
          <td>Elisée Hauet</td>
          <td>e.hauet@email.com</td>
          <td>{{ $t("type-abs.paid") }}</td>
          <td>10/01/2022</td>
          <td>14/01/2022</td>
          <td>s/o</td>
          <td>{{ $t("status.pending") }}</td>
          <td>
            <v-icon small color="green"> mdi-lead-pencil </v-icon>
            |
            <v-icon small color="red"> mdi-trash-can-outline </v-icon>
          </td>
        </tr>
        <tr>
          <td>Jean Dupont</td>
          <td>j.dupont@email.com</td>
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
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "GestionConges",
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
