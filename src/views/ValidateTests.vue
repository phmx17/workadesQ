<template>
  <v-app>
  <v-container>
    <v-row >
      <v-col class="text-center">
        <h2 label="enter name" >validate tests</h2>
        <ValidationProvider rules="required|alpha_num|min:3|max:30" v-slot="{ errors }" >
          <v-text-field label="enter name of venue " v-model="myAge"  clearable  ></v-text-field>
          <span>{{ errors[0] }}</span>
        </ValidationProvider>

      </v-col>
    </v-row>

  </v-container>

  </v-app>
</template>

<script>
// setup validation
import { ValidationProvider, extend } from 'vee-validate'
import { max, min, required, alpha_num } from 'vee-validate/dist/rules'

extend('min', {...min, message: "Minimum 3 characters" })
extend('max', {...max, message: "Maximum 30 characters" })
extend('alpha_num', {...alpha_num, message: "Alphanumeric only" })
extend('required', {...required, message: "Name is required" })

export default {
  components: {
    ValidationProvider
  },

  data() {
    return {
      myAge: "",

    }
  },
  // methods: {

  // },
  // computed: {

  // }
}
</script>

<style>

</style>