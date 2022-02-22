<template>
  <div class="home">
   <h1>Bienvenue {{ collaborateur.nom}} {{ collaborateur.prenom}} </h1>
   <h2>Service : {{ collaborateur.service.libelle }} </h2>
   <h2>Role : {{ collaborateur.role.libelle}} </h2>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    components: {
     
    },
    data:function() {
      return {
        
      }
    },
    computed: {
      collaborateur() {
        return this.$store.state.stateCollaborateur.collaborateur;
      }
    },
    mounted() {
     this.$store.dispatch("getCollab")
    },
    methods: {
      
    },
  }
</script>

<style lang="scss" scoped>

</style>
