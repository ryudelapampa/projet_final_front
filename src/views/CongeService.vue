<template>
  <div>
    <h1>{{ $t("planning.title") }}</h1>
    <CongesCal v-bind:absences="this.absences"/>

  </div>
</template>

<script>
  import CongesCal from "../components/CongesCal.vue";

  export default {
    name: "ServiceJour",
    components: { CongesCal },
    data() {
      return {
        
      }
    },
    mounted() {
      this.data();
    },
    computed : {
      absences() {
        let data = [];
        for (const subord of this.$store.state.stateCollaborateur.collaborateur.subordonnes) {
          for (const abs of subord.absences) {
            abs.collaborateur = subord;
            data.push(abs);
          }
        }
        return data;
      },
    }
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

</style>
