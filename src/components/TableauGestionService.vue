<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="absences"
      :items-per-page="10"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ $t("manage-abs.title") }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ $t("manage-abs.form-title") }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nom"
                        label="Nom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.prenom"
                        label="Prénom"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.email"
                        label="Email"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.type"
                        label="Type d'absence"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.date"
                        label="Date"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.motif"
                        label="Motif"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.statut"
                        label="Statut"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-3" text @click="close">
                  {{ $t("btn.cancel") }}
                </v-btn>
                <v-btn color="success darken-3" text @click="save">
                  {{ $t("btn.save") }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title wrap class="text-h5">{{
                $t("manage-abs.confirm-del")
              }}</v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error darken-1" text @click="closeDelete">
                  {{ $t("btn.cancel") }}
                </v-btn>
                <v-btn color="success darken-1" text @click="deleteItemConfirm">
                  {{ $t("btn.ok") }}
                </v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          x-small
          color="success darken-1"
          class="mr-2"
          @click="editItem(item)"
        >
          {{ $t("btn.edit") }}
        </v-btn>
        <v-btn x-small color="error darken-1" @click="deleteItem(item)">
          {{ $t("btn.delete") }}
        </v-btn>
      </template>
      <template v-slot:no-data>
        <v-btn color="blue darken-1" text @click="closeDelete">
          {{ $t("btn.cancel") }}
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import AbsenceApi from "../services/AbsenceApi";

export default {
  name: "TableauGestionService",
  data() {
    return {
      // absences: this.getAbsences(),
      currentItem: {},
      dialog: false,
      dialogDelete: false,
      defaultItem: {
        nom: "",
        prenom: "",
        email: "",
        type: "",
        date: "",
        motif: "",
        statut: "",
      },
      editedIndex: -1,
      editedItem: {
        nom: "",
        prenom: "",
        email: "",
        type: "",
        date: "",
        motif: "",
        statut: "",
      },
      headers: [
        { text: "Nom", align: "center", value: "collaborateur.nom" },
        { text: "Prénom", align: "center", value: "collaborateur.prenom" },
        { text: "Email", align: "center", value: "collaborateur.email" },
        { text: "Type d'absence", align: "center", value: "type" },
        { text: "Date", align: "center", value: "dateJour" },
        { text: "Motif", align: "center", value: "motif" },
        { text: "Statut", align: "center", value: "statut" },
        { text: "Actions", align: "center", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    absences() {
      let absences = [];
      for (const collab of this.$store.state.stateCollaborateur.collaborateur.subordonnes ) {
        for (const abs of collab.absences) {
          abs.collaborateur = collab;
          absences.push(abs);
        }
      }
      return absences;
    }
  },
  methods: {
    editItem(item) {
      this.editedIndex = this.absences.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    updateRecord(id, item) {
      console.log(item);
      AbsenceApi.update(id, item);
      console.log(item);
      this.getAbsences();
    },
    deleteItem(item) {
      this.editedIndex = this.absences.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.currentItem = item;
      console.log("id à supprimer : " + item.id);
      this.dialogDelete = true;
    },
    deleteItemConfirm() {
      this.absences.splice(this.absences, 1);
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
        Object.assign(this.absences[this.editedIndex], this.editedItem);
      } else {
        this.absences.push(this.editedItem);
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
};
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

.v-card__title {
  word-break: normal;
}
</style>
