<template>
  <v-app>
    <v-container>
      <v-row justify="center" >
        <v-col class="center-text">
          <h1>Register</h1>
          <ValidationObserver v-slot="{ handleSubmit }">
            <v-form @submit.prevent="handleSubmit(handleSubmitForm)">    
              <ValidationProvider mode="passive" :rules="{regex: /^[a-zA-Z0-9#@&!$ ]*$/, requiredUserName: true, min: 3, max: 30}" v-slot="{ errors }">      
                <v-text-field v-model="username" clearable label="username"></v-text-field>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider mode="passive" :rules="{email: true, requiredEmail: true, max: 30}" v-slot="{ errors }">
                <v-text-field v-model="email" clearable label="email"></v-text-field>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider mode="passive" rules="confirmed:confirmPassword|min:6|max:15|requiredPassword" v-slot="{ errors }"><!-- must use pipe operator with confirmed -->
                <v-text-field v-model="password" clearable label="password"></v-text-field>
                <span>{{  errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider mode="passive" v-slot="{ errors }" vid="confirmPassword">
                <v-text-field v-model="confirmPassword" clearable label="Retype password"></v-text-field>
                <span>{{  errors[0] }}</span>
              </ValidationProvider>
              <!-- submit -->
                <v-btn class="mt-8" color="teal white--text" type="submit" block >S u b m i t</v-btn>
              <!-- overlay -->
              <v-overlay :value="submitOverlay" @click="submitOverlay = false">
                <h2>Thank You for registering with workadesQ</h2> 
              </v-overlay>
            </v-form>
          </ValidationObserver>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// setup validation
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { max, min, required, regex, email, confirmed, setInteractionMode } from 'vee-validate/dist/rules'
extend('min', {...min, message: "Minimum 3 characters" })
extend('max', {...max, message: "Too many characters" })
extend('requiredUserName', {...required, message: "Username is required" })
extend('requiredEmail', {...required, message: "Email is required" })
extend('requiredPassword', {...required, message: "Password is required" })
extend('regex', {...regex, message: "Special Characters allowed: # @ & ! $" })
extend('email', {...email, message: "Incorrect email format" })
extend('confirmed', {...confirmed, message: "Passwords must match" })
// setInteractionMode('passive');

// custom api caller
import { authApiCaller } from '../../utils/authApiCaller.js'

export default {
  components: {
    ValidationProvider, ValidationObserver
  },
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      submitOverlay: false,

    }
  },
  methods: {
    handleSubmitForm() {
      // insert spinner while api submits and checks for duplicate location

      // prepare data for shipment
      const data = {
        username: this.username,
        email: this.email,
        password: this.password
      }    
      // call custom api caller which uses axios  
      const reply = authApiCaller('post', data)

      console.log("reply from desk vue: ", reply)

      this.submitOverlay = true
    }
  }
}
</script>

<style scoped>
  span {
    color: rgb(212, 29, 29);
  }
</style>