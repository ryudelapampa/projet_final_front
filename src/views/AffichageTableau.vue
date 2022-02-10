<template>
    <div id="AffichageTableau">
        <!-- <v-btn id="switchTab" v-on:click="changeTab" color="primary" elevation="2" >{{ $t("holidays.table-rtt") }}</v-btn> -->
        <joursFeriesVue/>
        <rttEmployeurVue/>
    </div>
</template>

<script>
    import rttEmployeurVue from "../components/Tableau/rttEmployeur.vue";
    import joursFeriesVue from "../components/Tableau/joursFeries.vue";

    export default {
    name: "AffichageTableau",
    data: function() {
        return {

        };
    },
    mounted() {
      
    },
    computed: {
    },
    methods: {
       
    },
    components: { joursFeriesVue, rttEmployeurVue }
}
</script>