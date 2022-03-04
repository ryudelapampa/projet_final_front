<template>
    <table>
        <thead>
            <th>Nom</th>
            <th>Prenom</th>
            <th>Email</th>
            <th>Type d'absence</th>
            <th>Date</th>
            <th>Motif</th>
            <th>Statut</th>
            <th>{{ $t("table.actions") }}</th>
        </thead>
        <tbody>
            <tr v-for="abs in listeAbsences" v-bind:key="abs.id">
                <td>{{ abs.collaborateur.nom }}</td>
                <td>{{ abs.collaborateur.prenom }}</td>
                <td>{{ abs.collaborateur.email }}</td>
                <td>{{ abs.type }}</td>
                <td>{{ abs.dateJour }}</td>
                <td>{{ abs.motif }}</td>
                <td>{{ abs.statut }}</td>
                <td v-if="abs.statut != 'VALIDEE'">
                    <v-btn color="success" @click="validAbs(abs)">VALIDER</v-btn>
                    |
                    <v-btn color="error" @click="denyAbs()">REFUSER</v-btn>
                </td>
            </tr>
        </tbody>
        <router-link to="/ajoutferie">
            <v-btn v-show="administrateur" color="primary" elevation="2" outlined>{{ $t("btn.add") }}</v-btn>
        </router-link>
    </table>
</template>

<script>
    // import Absence from "../modeles/Absence";
import AbsenceApi from "../services/AbsenceApi";
import _ from 'lodash'

    export default {
        name: 'TableauGestionConge',
        data() {
            return {
                // listeAbsences: [],
                test : null,
            }
        },
        computed: {
            listeAbsences() {
                const listeAbsences = [];
                for (const collab of this.$store.state.stateCollaborateur.collaborateur.subordonnes ) {
                    for (const abs of collab.absences) {
                        abs.collaborateur = collab;
                        listeAbsences.push(abs);
                    }
                }
                return _.orderBy(listeAbsences,'dateJour','desc')
            }
        },
        mounted() {
           
        },
        methods: {
            
            validAbs(absence) {
                // const validAbsence = new Absence(absence.id,absence.dateJour,absence.motif,absence.type,"VALIDEE",absence.collaborateur);
                // this.test = validAbsence;
                absence.statut = "VALIDEE"
                AbsenceApi.update(absence.id,absence);
            },
            denyAbs(absence) {
                absence.statut = "REFUSEE"
                AbsenceApi.update(absence.id);
            }
        },
    }
</script>

<style lang="scss" scoped>
    table {
        border-collapse: collapse;
        border-spacing: 0;
        width: auto;
        border: 1px solid #ddd;
        margin-top: 1rem;
  }

    th {
        width: auto;
        background-color: darkgray;
        color: white;
    }

    th,td {
        text-align: left;
        padding: 16px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

</style>