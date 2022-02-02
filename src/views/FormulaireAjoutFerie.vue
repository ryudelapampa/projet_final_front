<template>
    <div>
        <v-col class="d-flex" cols="12" sm="2">
            <v-select :items="choixType" label="Outlined style" outlined></v-select>
        </v-col>
        <h1>{{items}} </h1>
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-row justify="center">
                <v-date-picker v-model="picker"></v-date-picker>
            </v-row>
            <v-text-field v-model="libelle" :rules="libelleRules" label="Libelle" required ></v-text-field>
            <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required></v-checkbox>
            <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate"> Validate </v-btn>
            <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
        </v-form>
    </div>
</template>

<script>
    import JourFerieApi from "../services/JourFerieApi";
    import JourFerie from "../modeles/JourFerie";
    import router from "../router";

    export default {
        name: "formulaireajoutferie",
        data() {
            return {
                picker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                valid: true,
                libelle: '',
                libelleRules: [
                    v => !!v || 'Le libelle est obligatoire',
                ],
                checkbox: false,
            }
        },
         methods: {
            validate () {
                this.$refs.form.validate()
                JourFerieApi.add(new JourFerie(this.picker,this.libelle));
                router.push("/")
            },
            reset () {
                this.$refs.form.reset()
            },
        },
    }
</script>