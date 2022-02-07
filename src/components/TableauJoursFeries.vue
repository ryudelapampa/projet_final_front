<template>
    <div id="tableauJoursFeries">
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
            <router-link to="/ajoutferie">
                <v-btn v-show="administrateur" color="primary" elevation="2" outlined>{{ $t("btn.add") }}</v-btn>
            </router-link>
        </table>
    </div>
</template>

<script>
    import JourFerieApi from "../services/JourFerieApi";

    export default {
        name: "tableauJoursFeries",
        data() {
            return {
                loading: false,
                listeJoursFeries: [],
            }
        },
        props: ['administrateur'],
        mounted() {
            this.refresh()
        },
        methods: {
            refresh() {
                JourFerieApi.gettAll().then(
                response => {
                    this.listeJoursFeries = response.data
                },
                errorlocale => console.log(errorlocale),
                () => console.log("Finally")
                ).catch(errorgeneral => console.log(errorgeneral))
            },
            async deleteArray(id) {
                this.loading = true;
                JourFerieApi.delete(id);
                await new Promise(resolve => setTimeout(resolve, 1500))
                this.loading = false
                this.refresh()
            }
        },
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