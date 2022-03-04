<template>
    <div class="container" id="AffichageTableau">
        <!-- <v-btn id="switchTab" v-on:click="changeTab" color="primary" elevation="2" >{{ $t("holidays.table-rtt") }}</v-btn> -->
        <!-- <joursFeriesVue/>
        <rttEmployeurVue/> -->
        <v-row>
            <v-col>
                <TableauJoursFeries/>
            </v-col>
            <v-col>
                <TableauRttEmployeur/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import TableauJoursFeries from "../components/TableauJoursFeries.vue";
import TableauRttEmployeur from "../components/TableauRttEmployeur.vue";

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