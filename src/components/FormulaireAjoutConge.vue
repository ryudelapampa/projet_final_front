<template>
    <div id="formulaireajoutconge">
        <v-card elevevation="12" class="p-4 mt-5">
            <v-card-title v-on:click="form = !form" class="grey">Demande de congé (cliquer pour ouvrir)</v-card-title>
            <validation-observer ref="observer" v-slot="{ invalid }">
                <form v-show="form" @submit.prevent="submit">
                    <v-row class="mx-auto mt-3" align="center" justify="center">
                        <v-col md="auto">
                            <validation-provider v-slot="{ errors }" name="datePicker" rules="required">
                            <v-date-picker v-model="datePicker" :error-messages="errors" required></v-date-picker>
                            </validation-provider>
                        </v-col>
                        <v-col md="4">
                            <validation-provider v-slot="{ errors }" name="motif" rules="required|max:25">
                            <v-text-field v-model="motif" :counter="25" :error-messages="errors" label="motif" required></v-text-field>
                            </validation-provider>

                            <validation-provider v-slot="{ errors }"  name="typePicker" rules="required">
                            <v-select v-model="typePicker" :error-messages="errors" :items="selectTypeAbs" label="type" required ></v-select>
                            </validation-provider>

                            <validation-provider v-slot="{ errors }" rules="required" name="checkbox">
                            <v-checkbox v-model="checkbox" :error-messages="errors" value="1" label="Valider" type="checkbox" required></v-checkbox>
                        </validation-provider>
                        </v-col>
                    </v-row>
                    <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
                    <v-btn @click="clear"> clear </v-btn>
                </form>
            </validation-observer>
        </v-card>
    </div>
</template>

<script>
    import { required, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import Absence from '../modeles/Absence'
    // import CollaborateurApi from '../services/CollaborateurApi'
import AbsenceApi from '../services/AbsenceApi'

    setInteractionMode('eager')
    extend('required', {
        ...required,
        message: '{_field_} can not be empty',
    })
    extend('max', {
        ...max,
        message: '{_field_} may not be greater than {length} characters',
    })
    extend('regex', {
        ...regex,
        message: '{_field_} {_value_} does not match {regex}',
    })

    export default {
        name: "formulaireajoutconge",
        data:() => ({
            selectTypeAbs : ['CONGE_PAYE',  'CONGE_NON_PAYE'],
            form : false,
            datePicker: '',
            motif: '',
            typePicker: '',
            checkbox: null,
            
        }),
        methods: {
            submit() {
                this.$refs.observer.validate();
                AbsenceApi.add(new Absence(this.datePicker,this.motif,this.typePicker,'INITIAL'),this.client)
            }
        },
        components: {
          ValidationProvider,
          ValidationObserver,
        },
    }

</script>