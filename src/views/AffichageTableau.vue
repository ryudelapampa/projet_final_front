<template>
    <div id="AffichageTableau">
        <v-btn id="switchTab" v-on:click="changeTab" color="primary" elevation="2" >{{ $t("holidays.table-rtt") }}</v-btn>
        <v-container v-if="tableau === 'ferie'">
            <TableauJoursFeries/>
        </v-container>
        <v-container v-else-if="tableau === 'rttemployeur'">
            <TableauRttEmployeur/>
        </v-container>
    </div>
</template>

<script>
    import TableauJoursFeries from "../components/TableauJoursFeries.vue"
    import TableauRttEmployeur from "../components/TableauRttEmployeur.vue";

    export default {
    name: "AffichageTableau",
    data() {
        return {
            tableau: "",
            administrateur: true,
            dev: false,
        };
    },
    
    methods: {
        changeTab() {
            if (this.tableau == '') {
                this.tableau = 'rttemployeur'
                document.getElementById("switchTab").innerHTML = "Tableau des Jours Feries";
            } else if (this.tableau == 'rttemployeur') {
                this.tableau = 'ferie'
                document.getElementById("switchTab").innerHTML = "Tableau des Jours Feries";
            } else if (this.tableau == 'ferie') {
                this.tableau = 'rttemployeur'
                document.getElementById("switchTab").innerHTML = "Tableau des Jours Feries";
            }
        },
    },
    components: { TableauJoursFeries, TableauRttEmployeur }
}
</script>