<template>
    <div id="tableauJoursFeries">
        <h1>Tableau des jours féries</h1>
        <table>
            <thead>
                <th>{{ $t("table.date") }}</th>
                <th>{{ $t("table.label") }}</th>
                <th v-show="administrateur">{{ $t("table.actions") }}</th>
            </thead>
            <tbody>
                <tr v-for="jourferie in listeJoursFeries" v-bind:key="jourferie.id">
                    <td>{{ jourferie.dateJour }}</td>
                    <td>{{ jourferie.libelle }}</td>
                    <td v-show="administrateur">
                        <v-btn>{{ $t("btn.edit") }}<v-icon color="green">mdi-lead-pencil</v-icon></v-btn>
                        |
                        <v-btn :loading="loading" color="error" @click="deleteArray(jourferie.id)">{{ $t("btn.delete") }}</v-btn>
                    </td>
                </tr>
            </tbody>
            <!-- <router-link to="/ajoutferie">
                <v-btn v-show="administrateur" color="primary" elevation="2" outlined>{{ $t("btn.add") }}</v-btn>
            </router-link> -->
        </table>

        <v-dialog v-model="dialog" persistent>
            <template v-slot:activator="{on,attrs}">
                <v-btn v-show="administrateur" color="primary" dark v-bind="attrs" v-on="on">
                    Ajout jour férié
                </v-btn> 
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">Ajout jour férié</span>
                    <v-spacer></v-spacer>
                    <v-card-actions>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                    </v-card-actions>
                </v-card-title>
                
                <v-card-text>
                    <v-container>
                        <v-slide-y-transition mode="out-in">
                            <FormulaireAjoutFerie/>
                        </v-slide-y-transition>
                    </v-container>
                </v-card-text>
                
            </v-card>
        </v-dialog>


    </div>
</template>

<script>
    import JourFerieApi from "../services/JourFerieApi";
import FormulaireAjoutFerie from "./FormulaireAjoutFerie.vue";

    export default {
    name: "tableauJoursFeries",
    data() {
        return {
            administrateur : false,
            dialog: false,
            loading: false,
            listeJoursFeries: [],
        };
    },
    mounted() {
        this.refresh();
    },
    computed: {
        
    },
    methods: {
        refresh() {
            if(this.$store.state.stateCollaborateur.collaborateur.role.id == 3){
                this.administrateur = true;
            }
            JourFerieApi.gettAll().then(response => {
                this.listeJoursFeries = response.data;
            }, errorlocale => console.log(errorlocale), () => console.log("Finally")).catch(errorgeneral => console.log(errorgeneral));
        },
        async deleteArray(id) {
            this.loading = true;
            JourFerieApi.delete(id);
            await new Promise(resolve => setTimeout(resolve, 1500));
            this.loading = false;
            this.refresh();
        }
    },
    components: { FormulaireAjoutFerie }
}
</script>

<style lang="scss" scoped>
  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
    border: 1px solid #ddd;
    margin-top: 1rem;
    margin: auto;
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