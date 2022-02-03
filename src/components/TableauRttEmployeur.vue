<template>
    <div id="tableauRttEmployeur">
        <table style="flex-wrap: nowrap;">
            <thead>
                <th >{{ $t("table.date") }}</th>
                <th>{{ $t("table.label") }}</th>
                <th>Statut</th>
                <th>{{ $t("table.type") }}</th>
                <th v-show="administrateur">{{ $t("table.actions") }}</th>
            </thead>
            <tbody>
                <tr v-for="absence in listeRttEmployeur" v-bind:key="absence.id" >
                    <td >{{ absence.dateJour }}</td>
                    <td>{{ absence.motif }}</td>
                    <td>{{ absence.statut }}</td>
                    <td>{{ $t("type-abs.rtt-emp") }}</td>
                    <td v-show="administrateur">
                        <v-btn>{{ $t("btn.edit") }}<v-icon color="green">mdi-lead-pencil</v-icon></v-btn>
                        |
                        <v-btn :loading="loading" color="error" @click="deleteArray(absence.id)">{{ $t("btn.delete") }}</v-btn>
                    </td>
                </tr>
            </tbody>
            <router-link to="/ajoutrttemployeur">
                <v-btn v-show="administrateur" color="primary" elevation="2" outlined>{{ $t("btn.add") }}</v-btn>
        </router-link>
        </table>
    </div>
</template>

<script>
    import AbsenceApi from "../services/AbsenceApi"

    export default {
        name: 'tableauRttEmployeur',
        data() {
            return {
                loading: false,
                listeRttEmployeur: [],
                administrateur: true
            }
        },
        mounted() {
            this.refresh()
        },
        methods: {
            refresh() {
                AbsenceApi.gettAllRttEmployeur().then(
                response => {
                    this.listeRttEmployeur = response.data
                },
                errorlocale => console.log(errorlocale),
                () => console.log("Finally")
                ).catch(errorgeneral => console.log(errorgeneral))
            },
            async deleteArray(id) {
                this.loading = true;
                AbsenceApi.delete(id);
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