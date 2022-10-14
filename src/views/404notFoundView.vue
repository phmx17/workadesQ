<template>
  <v-app>
    <v-container>
      <v-row justify="center" height="100vh" >
        <v-col cols="12" class="text-center" >
            <h1 class="my-10" >404</h1>
            <h3 class="my-10">Sorry, this page can not be found</h3>
            <router-link class="my-10" :to="{name: 'home'}">Back to Home</router-link>            
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {

}
</script>

<style>

</style>