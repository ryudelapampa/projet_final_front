<template>
    <div id="AffichageTableau">
        <!-- <v-btn id="switchTab" v-on:click="changeTab" color="primary" elevation="2" >{{ $t("holidays.table-rtt") }}</v-btn> -->
        <!-- <joursFeriesVue/>
        <rttEmployeurVue/> -->
        <TableauJoursFeries/>
        <TableauRttEmployeur/>
    </div>
</template>

<script>
import TableauJoursFeries from "../components/TableauJoursFeries.vue";
import TableauRttEmployeur from "../components/TableauRttEmployeur.vue";
    // import rttEmployeurVue from "../components/Tableau/rttEmployeur.vue";
    // import joursFeriesVue from "../components/Tableau/joursFeries.vue";

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
    components: { TableauJoursFeries, TableauRttEmployeur }
}
</script>