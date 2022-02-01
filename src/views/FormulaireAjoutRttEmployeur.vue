<template>
  <validation-observer ref="observer" v-slot="{ invalid }">
    <form @submit.prevent="submit">
      <validation-provider v-slot="{ errors }" name="Name" rules="required|max:10">
        <v-text-field v-model="name" :counter="10" :error-messages="errors" label="Name" required></v-text-field>
      </validation-provider>

      <validation-provider v-slot="{ errors }" rules="required" name="checkbox">
        <v-checkbox v-model="checkbox" :error-messages="errors" value="1" label="Option" type="checkbox" required></v-checkbox>
      </validation-provider>

      <v-btn class="mr-4" type="submit" :disabled="invalid"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
    </form>
  </validation-observer>
</template>

<script>
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
    name:"formulaireajoutrttemployeur",
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '',
      phoneNumber: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: null,
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
      },
      clear () {
        this.name = ''
        this.phoneNumber = ''
        this.email = ''
        this.select = null
        this.checkbox = null
        this.$refs.observer.reset()
      },
    },
  }
</script>