<template>
  <v-app>
    <v-container>
      <v-row justify="center" >
        <v-col class="center-text">
          <h1>Register</h1>
          <ValidationObserver ref="form">
            <v-form @submit.prevent="handleSubmitForm">    
              <ValidationProvider :rules="{regex: /^[a-zA-Z0-9#@&!$ ]*$/, requiredUserName: true, min: 3, max: 30}" v-slot="{ errors }" name="username">      
                <v-text-field v-model="username" clearable label="username" @blur="handleValidateUsername" ></v-text-field>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider :rules="{email: true, requiredEmail: true, max: 30}" v-slot="{ errors }" name="email">
                <v-text-field v-model="email" clearable label="email" @blur="handleValidateEmail" ></v-text-field>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider mode="passive" rules="confirmed:confirmPassword|min:3|max:15|requiredPassword" v-slot="{ errors }"><!-- must use pipe operator with confirmed -->
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

// custom api caller
import { usersApiCaller } from '../../utils/usersApiCaller.js'
import { registerApiValidate } from '../../utils/registerApiValidate.js'

export default {
  components: {
    ValidationProvider, ValidationObserver
  },
  data() {
    return {
      username: "slim yelow",
      email: "slimyelow@gmail.com",
      password: "qwer",
      confirmPassword: "qwer",
      submitOverlay: false,

    }
  },
  methods: {
    async handleValidateUsername() {
      const reply = await registerApiValidate('username', this.username)
      if (reply) this.$refs.form.setErrors({username: "Username has already been taken"})     
    },

    async handleValidateEmail() {
      const reply = await registerApiValidate('email', this.email)
      if (reply) if (reply) this.$refs.form.setErrors({email: "Email is already in use"})     
    },

    async handleSubmitForm() {
      // insert spinner while api submits and checks for duplicate location
      // prepare data for shipment
      let data = {
      username: this.username,
      email: this.email,
      password: this.password
      }
      this.$refs.form.validate().then(async success => {
        if (!success) return

        const reply = await usersApiCaller('post', data)
        if (reply === "username has already been taken") {
          this.$refs.form.setErrors({username: reply})
          return
        }
        if (reply === "email is already in use") {
          this.$refs.form.setErrors({email: reply})
          return
        }
        this.submitOverlay = true
        this.$router.push('/login')
      })
      
    }
  }
}

</script>

<style scoped>
  span {
    color: rgb(212, 29, 29);
  }
</style>