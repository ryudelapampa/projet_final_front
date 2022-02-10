<template>
    <div>
        <v-data-table :headers="headers" :items="listeRttEmployeur" :items-per-page="5" class="elevation-1">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title><!--{{ $t("manage-abs.title") }}--> Tableau des RTT Employeur</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <v-card>
                            <v-card-title>
                                <span class="text-h5"><!--{{ $t("manage-abs.form-title") }}--></span>
                            </v-card-title>
                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.dateJour" label="Date" ></v-text-field> 
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.motif" label="Motif" ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.statut" label="Statut" disabled></v-text-field> 
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.type" label="type" disabled></v-text-field> 
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field v-model="editedItem.collaborateur" label="Collaborateur concerné" disabled></v-text-field> 
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>
                            <v-card-actions v-if="admin">
                                <v-spacer></v-spacer>
                                <v-btn color="error darken-3" text @click="close"> {{ $t("btn.cancel") }} </v-btn>
                                <v-btn color="success darken-3" text @click="save"> {{ $t("btn.save") }} </v-btn>
                            </v-card-actions>
                            
                        </v-card>
                        
                    </v-dialog>
                    
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title wrap class="text-h5">{{ $t("manage-abs.confirm-del") }}</v-card-title>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="error darken-1" text @click="closeDelete"> {{ $t("btn.cancel") }} </v-btn>
                                <v-btn color="success darken-1" text @click="deleteItemConfirm"> {{ $t("btn.ok") }} </v-btn>
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>

            <template v-slot:item.actions="{ item }">
                <!-- <v-btn x-small color="primary darken-1" class="mr-2"  @click="editItem(item)"> {{ $t("btn.edit") }} </v-btn> -->
                <v-btn x-small color="error darken-1" @click="deleteItem(item)"> {{ $t("btn.delete") }} </v-btn> 
            </template>
            <template v-slot:no-data>
                <v-btn color="blue darken-1" text @click="closeDelete">{{ $t("btn.cancel") }}</v-btn>
            </template>
        </v-data-table>
        <v-btn color="success " text @click="ajout()"> Ajout </v-btn>
    </div>
</template>

<script>
    import AbsenceApi from "../../services/AbsenceApi";

    export default {
        name: 'tableauRttEmployeur',
        data() {
            return {
                admin : false,
                listeRttEmployeur : [],
                currentItem:{},
                dialog: false, 
                dialogDelete: false,
                defaultItem: {
                    dateJour: '',
                    motif: '',
                    statut: '',
                    type: '',
                    collaborateur: ''
                },
                editedIndex: -1,
                editedItem: {
                    dateJour: '',
                    motif: '',
                    // statut: '',
                    // type: '',
                    // collaborateur: ''
                },
                headers: [
                    { text: "Date du Jour", align: "center", value: "dateJour" },
                    { text: "Motif", align: "center", value: "motif" },
                    { text: "Statut", align: "center", value: "statut" },
                    { text: "Type", align: "center", value: "type" },
                    { text: "Collaborateur concerné", align: "center", value: "collaborateur.nom" },
                    { text: "Actions", align: "center", value: "actions", sortable: false },
                ],
            };
        },
        mounted() {
            this.refresh()
        },
        computed: {
            
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

                if (this.$store.state.stateCollaborateur.collaborateur.role.libelle == 'ADMINISTRATEUR') {
                    this.admin = true
                } 
            },
            editItem(item) {
                this.editedIndex = this.listeRttEmployeur.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.dialog = true;
            },
            updateRecord(id, item) {
                console.log(item);
                AbsenceApi.update(id, item);
                console.log(item);
                this.refresh();
            },
            deleteItem(item) {
                this.editedIndex = this.listeRttEmployeur.indexOf(item);
                this.editedItem = Object.assign({}, item);
                this.currentItem = item;
                console.log("id à supprimer : " + item.id);
                this.dialogDelete = true;
            },
            deleteItemConfirm() {
                this.listeRttEmployeur.splice(this.listeRttEmployeur, 1);
                this.deleteRecord();
                this.closeDelete();
            },

            deleteRecord() {
                AbsenceApi.delete(this.currentItem.id);
                console.log("id supprimé : " + this.currentItem.id);
                this.currentItem = {};
                },
                close() {
                this.dialog = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },

            closeDelete() {
                this.dialogDelete = false;
                this.$nextTick(() => {
                    this.editedItem = Object.assign({}, this.defaultItem);
                    this.editedIndex = -1;
                });
            },

            save() {
                if (this.editedIndex > -1) {
                    Object.assign(this.listeRttEmployeur[this.editedIndex], this.editedItem);
                } else {
                    this.listeRttEmployeur.push(this.editedItem);
                }
                this.close();
            },
        },

        watch: {
            dialog(val) {
                val || this.close();
            },
            dialogDelete(val) {
                val || this.closeDelete();
            },
        },
    }
</script>