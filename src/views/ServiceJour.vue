<template>
  <div>
    <h1>{{ $t("planning.title") }}</h1>

    <table>
      <thead>
        <th>{{ $t("table.name") }}</th>
        <th>01/01</th>
        <th>02/01</th>
        <th>03/01</th>
        <th>04/01</th>
        <th>05/01</th>
        <th>06/01</th>
        <th>07/01</th>
        <th>08/01</th>
        <th>09/01</th>
        <th>10/01</th>
        <th>11/01</th>
        <th>12/01</th>
      </thead>
      <tbody>
        <tr>
          <td>Patrick Duchemin</td>
          <td class="bank-hol">F</td>
          <td class="weekend"></td>
          <td class="rtt-emp">R</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="weekend"></td>
          <td class="weekend"></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Jean Dupont</td>
          <td class="bank-hol">F</td>
          <td class="weekend"></td>
          <td class="rtt-emp">R</td>
          <td class="paid">C</td>
          <td class="paid">C</td>
          <td class="paid">C</td>
          <td class="paid">C</td>
          <td class="weekend"></td>
          <td class="weekend"></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Elisée Hauet</td>
          <td class="bank-hol">F</td>
          <td class="weekend"></td>
          <td class="rtt-emp">R</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class="weekend"></td>
          <td class="weekend"></td>
          <td class="pending">att.</td>
          <td class="pending">att.</td>
          <td class="pending">att.</td>
        </tr>
      </tbody>
    </table>
    <div class="container legend">
      <div class="paid">C</div>
      <div class="pending">att.</div>
      <div class="R-emp">R</div>
      <div class="bank-hol">F</div>
    </div>
    <!-- .container -->
  </div>
</template>

<script>
export default {
  name: "ServiceJour",
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
  text-align: center ;
  padding: 16px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

.bank-hol {
  background-color: darkgray;
  display: flex;
}

.paid {
  background-color: lightcoral;
}

.rtt-emp {
  background-color: lightblue;
}

.pending {
  background-color: lightyellow;
}
.weekend {
  background-color: lightgray;
}

.legend {
  margin: 1rem 0;
  width: 50%;
  display: flex;
  justify-content: space-around;
  border: 1px solid black;
  div {
    padding: 10px;
    border: 0.5px solid darkgray;
  }
}
</style>
