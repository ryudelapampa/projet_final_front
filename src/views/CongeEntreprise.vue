<template>
    <div id="AffichageTableau">
        <v-row>
            <v-col cols="">
                <TableauJoursFeries/>
            </v-col>
            <v-col cols="8">
                <AffichageRTTEmployeur/>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import TableauJoursFeries from "../components/Tableau/jourFerie.vue";
    import AffichageRTTEmployeur from "../components/Tableau/RTTEmployeur.vue";

    export default {
        name: "AffichageTableau",
        components: { TableauJoursFeries, AffichageRTTEmployeur }
    }
</script>

<style scoped>

    #AffichageTableau {
        margin-left: 100px;
        margin-right: 100px;
    }

</style>