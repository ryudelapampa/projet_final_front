<template>
  <v-app>
    <Navbar />
    <v-main >
      <v-slide-y-transition mode="out-in">
        <router-view/>
      </v-slide-y-transition>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navigation/Navbar.vue";
// import CollaborateurApi from "./services/CollaborateurApi";

export default {
  name: "app",
  components: { 
    Navbar, 
  },
  data: function(){
    return {
     
    }
  },
  computed: {
    collaborateur() {
      return this.$store.state.stateCollaborateur.collaborateur
    }
  },
  mounted() {
    this.$store.dispatch("getCollab");
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

h1 {
  text-align: center;
  margin: 1rem 0;
}
</style>
