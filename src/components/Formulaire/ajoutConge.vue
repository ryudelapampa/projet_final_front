<template>
    <div id="formulaireajoutconge">
    <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
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
    </div>
</template>

<script>
    import { required, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
    import Absence from '../../modeles/Absence'
    import AbsenceApi from '../../services/AbsenceApi'
    import Collaborateur from '../../modeles/Collaborateur'


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
            datePicker: '',
            motif: '',
            typePicker: '',
            checkbox: null,
            absence : ''            
        }),
        mounted() {
            this.$store.dispatch("getCollab");
        },
        computed: {
            collaborateur() {return this.$store.state.stateCollaborateur.collaborateur}
        },
        methods: {
            submit() {
                this.$refs.observer.validate();
                this.absence = new Absence(this.datePicker,this.motif,this.typePicker,'INITIAL',new Collaborateur(this.collaborateur.id));
                console.log(this.absence);
                AbsenceApi.add(this.absence);
                this.dialog = false;
                this.$store.dispatch("getCollab");
                this.dialog = false
            }
        },
        components: {
          ValidationProvider,
          ValidationObserver,
        },
    }

</script>