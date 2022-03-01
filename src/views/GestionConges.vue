<template>
  <div>
    <TableauGestionService2 v-if="controleAcces" />
  </div>
</template>

<script>
  // import TableauGestionService from "../components/TableauGestionService.vue";
import TableauGestionService2 from "../components/TableauGestionService2.vue";

  export default {
    name: "GestionConges",
    components: {  TableauGestionService2 },
    data() {
      return {
        controleAcces : false
      }
    },
    mounted() {
      this.verifAcces()
    },
    methods: {
      verifAcces() {
        if (this.$store.state.stateCollaborateur.collaborateur.role.libelle != 'SALARIE') {
          this.controleAcces = true
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
