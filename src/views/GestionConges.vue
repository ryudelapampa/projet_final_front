<template>
  <div>
    <h1>{{ $t("manage-abs.title") }}</h1>

    <TableauGestionService />
    
  </div>
</template>

<script>
  import TableauGestionService from "../components/TableauGestionService.vue";

  export default {
    name: "GestionConges",
    components: { TableauGestionService },
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
