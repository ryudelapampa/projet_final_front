<template>
  <div>
    <h1>{{ $t("holidays.title") }}</h1>
    <table>
      <thead>
        <th>{{ $t("table.date") }}</th>
        <th>{{ $t("table.label") }}</th>
        <th>{{ $t("table.type") }}</th>
        <th>{{ $t("table.actions") }}</th>
      </thead>
      <tbody>
        <tr>
          <td>01/01/2022</td>
          <td>{{ $t("holidays.new-year") }}</td>
          <td>{{ $t("type-abs.bank-hol") }}</td>
          <td>
            <v-icon small color="green"> mdi-lead-pencil </v-icon>
            |
            <v-icon small color="red"> mdi-trash-can-outline </v-icon>
          </td>
        </tr>
        <tr>
          <td>03/01/2022</td>
          <td>{{ $t("type-abs.rtt-emp") }}</td>
          <td>{{ $t("type-abs.rtt-emp") }}</td>
          <td>
            <v-icon small color="green"> mdi-lead-pencil </v-icon>
            |
            <v-icon small color="red"> mdi-trash-can-outline </v-icon>
          </td>
        </tr>
        <tr>
          <td>04/01/2022</td>
          <td>{{ $t("holidays.easter-mon") }}</td>
          <td>{{ $t("type-abs.bank-hol") }}</td>
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
  </div>
</template>
<script>
export default {
  name: "joursferies",
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  margin-top: 1rem;
}
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
