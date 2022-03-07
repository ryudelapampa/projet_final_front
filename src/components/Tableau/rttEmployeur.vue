<template>
    <div id="tableauRttEmployeur">
        <h1>Tableau des congés d'entreprise</h1>
        <!-- TABLEAU D'AFFICHAGE DES CONGES D'ENTREPRISE  -->
        <table style="flex-wrap: nowrap;">
            <thead>
                <th >{{ $t("table.date") }}</th>
                <th>{{ $t("table.label") }}</th>
                <th>Statut</th>
                <th>{{ $t("table.type") }}</th>
                <th>Collaborateur concerné</th>
                <th v-show="administrateur">{{ $t("table.actions") }}</th>
            </thead>
            <tbody>
                <tr v-for="absence in listeRttEmployeur" v-bind:key="absence.id" >
                    <td >{{ absence.dateJour }}</td>
                    <td>{{ absence.motif }}</td>
                    <td>{{ absence.statut }}</td>
                    <td>{{ $t("type-abs.rtt-emp") }}</td>
                    <td>{{absence.collaborateur.email}} </td>
                    <td v-show="administrateur">
                        <!-- <v-btn>{{ $t("btn.edit") }}<v-icon color="green">mdi-lead-pencil</v-icon></v-btn>
                        | -->
                        <v-btn :loading="loading" color="error" @click="deleteArray(absence.id)">{{ $t("btn.delete") }}</v-btn>
                    </td>
                </tr>
            </tbody>
        </table>
        <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{on,attrs}">
                <v-btn class="mt-3" v-show="administrateur" color="primary" dark v-bind="attrs" v-on="on">
                    Ajout conge entreprise
                </v-btn> 
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Ajout conge entreprise</span>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">Fermer</v-btn>
                    </v-card-actions>
                </v-card-title>
                
                <v-card-text>
                    <v-container>
                        <v-slide-y-transition mode="out-in">
                            <FormulaireAjoutConge/>
                        </v-slide-y-transition>
                    </v-container>
                </v-card-text>
                
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
    import AbsenceApi from "../../services/AbsenceApi"
import FormulaireAjoutConge from "../Formulaire/ajoutConge.vue";

    export default {
    name: "tableauRttEmployeur",
    data() {
        return {
            administrateur : false,
            dialog : false,
            loading: false,
            listeRttEmployeur: [],
        };
    },
    mounted() {
        this.refresh();
    },
    methods: {
        refresh() {
            // A REMPLACER 
            if (this.$store.state.stateCollaborateur.collaborateur.role.id == 3) {
                this.administrateur = true;
            }
            AbsenceApi.gettAllRttEmployeur().then(response => {
                this.listeRttEmployeur = response.data;
            }, errorlocale => console.log(errorlocale), () => console.log("Finally")).catch(errorgeneral => console.log(errorgeneral));
        },
        async deleteArray(id) {
            this.loading = true;
            AbsenceApi.delete(id);
            await new Promise(resolve => setTimeout(resolve, 1500));
            this.loading = false;
            this.refresh();
        }
    },
    components: { FormulaireAjoutConge }
}
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