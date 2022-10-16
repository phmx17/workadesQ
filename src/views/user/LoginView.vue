<template>
  <v-app>
    <v-container fill-height>
      <v-row justify="center" height="100vh" >
          <v-card min-width="300" min-height="300" class="px-5">
            <h1>Login</h1>
            <ValidationObserver ref="form">
              <v-form @submit.prevent="handleSubmitForm">
                <ValidationProvider mode="passive" :rules="{requiredEmail: true, email:true, min: 3, max: 30}" v-slot="{ errors }" name="email">
                  <v-text-field v-model="email" clearable full-width height="20" label="email" ></v-text-field>
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <ValidationProvider mode="passive" :rules="{requiredPassword: true, min: 6, max: 30}" v-slot="{ errors }" name="password">
                <v-text-field v-model="password" clearable full-width height="20" label="password" ></v-text-field>
                  <span>{{ errors[0] }}</span>
                </ValidationProvider>
                <v-btn class="mt-4 mb-10 teal white--text" block type="submit">Submit</v-btn>
              </v-form>
            </ValidationObserver>
          </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
// setup validation
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { max, min, required, email } from 'vee-validate/dist/rules'
extend('min', {...min, message: "Minimum 3 characters" })
extend('max', {...max, message: "Too many characters" })
extend('requiredEmail', {...required, message: "Email is required" })
extend('requiredPassword', {...required, message: "Password is required" })
extend('email', {...email, message: "Incorrect email format" })

import { authApiCaller } from '../../utils/authApiCaller.js' // custom api caller
import { mapGetters, mapActions } from 'vuex' 
export default {
  components: {
    ValidationProvider, ValidationObserver
  },
  data() {
    return {
      email: "atj@test.com",
      password: "qwertz",
    }
  },
  methods: {
    async handleSubmitForm() {
        // insert spinner while api submits and checks for duplicate location
        // prepare data for shipment
        let data = {      
          email: this.email,
          password: this.password
        }
        this.$refs.form.validate().then(async success => {
          if (!success) return
          const user = await authApiCaller('post', data) // call api
          localStorage.setItem('anya', user.jwt) // better to local storage than cookie because cookie will get sent with EVERY request
          // document.cookie = `${user.id}=${user.jwt}`
            if (user.errMsg) {
              this.$refs.form.setErrors({email: user.errMsg}) // set validation errors
              this.$refs.form.setErrors({password: user.errMsg})
              return
            }
            // successful login; store user and jwt in vuex
            this.$store.dispatch('addUserAction', user) // calling action is better than mutation  
  
            // this.$router.push('/home');
            this.$router.go(-1)
        })
    }
  },


}
</script>

<style scoped>
  span {
    color: rgb(212, 29, 29);
  }
</style>