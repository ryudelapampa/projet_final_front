<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="datePicker" rules="required">
        <v-row justify="center">
          <v-date-picker v-model="datePicker" :error-messages="errors" required></v-date-picker>
        </v-row>
      </validation-provider>
      <validation-provider v-slot="{ errors }" name="libelle" rules="required|max:25">
        <v-text-field v-model="libelle" :counter="25" :error-messages="errors" label="Libelle" required></v-text-field>
      </validation-provider>
      <validation-provider v-slot="{ errors }" rules="required" name="checkbox">
        <v-checkbox v-model="checkbox" :error-messages="errors" value="1" label="Valider" type="checkbox" required></v-checkbox>
      </validation-provider>
      <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </validation-observer>
</template>

<script>
    import JourFerieApi from '../services/JourFerieApi'
    import JourFerie from '../modeles/JourFerie'
    import router from '../router'
    import { required, max, regex } from 'vee-validate/dist/rules'
    import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

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
        name:"formulaireajoutferie",
        components: {
          ValidationProvider,
          ValidationObserver,
        },
        data: () => ({
            datePicker: '',
            // datePicker: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            libelle: '',
            checkbox: null,
        }),

        methods: {
          submit () {
              this.$refs.observer.validate();
              JourFerieApi.add(new JourFerie(this.datePicker,this.libelle));
              router.push("/tableau");
          },
          clear () {
              this.datePicker = ''
              this.libelle = ''
              this.checkbox = null
              this.$refs.observer.reset()
          },
        },
    }
</script>