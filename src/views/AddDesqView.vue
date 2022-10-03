<template>
  <ValidationObserver ref="form" v-slot="{ handleSubmit }">
    <form @submit.prevent="handleSubmit(handleSubmitForm)">
      <v-app>
      <v-main>
      <v-container>
      <v-row>
      <v-col class="px-5 text-center">
        <ValidationProvider :rules="{requiredLocation: true, min: 3, max: 30}" v-slot="{ errors }" name="autocomplete" >
        <!-- places api  -->
        <v-input value="currentPlace">
          <gmap-autocomplete
            @place_changed="setPlace"
            :options="{fields: ['geometry', 'formatted_address', 'address_components']}"            
          ></gmap-autocomplete>
        </v-input> 
        <span>{{ errors[0] }}</span>
        </ValidationProvider>
        <!-- show only if place was entered -->
        <div v-if="currentPlace">
          <!-- marker preview map -->
            <v-row >
              <v-col>
                <gmap-map :center="center" :zoom="12" style="width:100%; height: 200px;">
                  <gmap-marker :position="center" ></gmap-marker>
                </gmap-map>
              </v-col>
            </v-row>
          <!-- current place  -->
          <v-row>
            <v-col>
              <h4 v-if="currentPlace" >
                {{ currentPlace.formatted_address }}
              </h4>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <ValidationProvider :rules="{regex: /^[a-zA-Z0-9#@&!$ ]*$/, requiredName: true, min: 3, max: 30}" v-slot="{ errors }">
                <v-text-field 
                  label="Name for WorkAdesq"
                  hide-details="auto"
                  v-model="deskName"
                ></v-text-field>
                <span>{{ errors[0] }}</span>
              </ValidationProvider>
            </v-col>
          </v-row>
          <!-- features -->
          <v-row  justify="space-between" align="end" class="mx-2 mt-8" >
            <v-icon large :color="features.desk ? 'orange' : 'grey lighten-1'" @click="features.desk = !features.desk">mdi-desk</v-icon>
            <v-icon large :color="features.wifi ? 'orange' : 'grey lighten-1'" @click="features.wifi = !features.wifi">mdi-wifi</v-icon>
            <v-icon large :color="features.power ? 'orange' : 'grey lighten-1'" @click="features.power = !features.power" >mdi-power-plug</v-icon>
            <v-icon large :color="features.coffee ? 'orange' : 'grey lighten-1'" @click="features.coffee = !features.coffee" >mdi-coffee</v-icon>
            <v-icon large :color="features.wc ? 'orange' : 'grey lighten-1'" @click="features.wc = !features.wc">mdi-human-male-female</v-icon>
          </v-row>
          <v-row>
            <v-col class="mt-5 text-center">
              Weekdays from {{ weekdayHours[0] }} to: {{ weekdayHours[1] }}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mt-5">
              <v-range-slider v-model="weekdayHours" :max="max" :min="min" hide-details track-color="teal" color="teal" ></v-range-slider>        
            </v-col>
          </v-row> 
          <v-row >
            <v-col class="mt-5 text-center " >
              Weekends from {{ weekendHours[0] }} to: {{ weekendHours[1] }}
            </v-col>
          </v-row>
          <v-row>
            <v-col class="mt-5" >
              <v-range-slider v-model="weekendHours" :max="max" :min="min" hide-details track-color="teal" color="teal"></v-range-slider>        
            </v-col>
          </v-row>
          <v-row >
          <!-- days closed -->
            <v-col class="mt-5 text-center " >
              Days Closed {{ daysClosed.day }}
            </v-col>
          </v-row>
          <v-row justify="space-between" class="mx-2 mt-6">
            <div v-for="(day, idx) in daysClosed" :key="idx">
              <v-checkbox :label="day.day" color="teal" @click="day.closed = !day.closed"></v-checkbox>
            </div>
          </v-row>
          <!-- rating -->
          <v-row class="mt-6" > 
            <v-col class="text-center" >
              <v-rating v-model="rating">
                <template v-slot:item="props" >
                  <v-icon color="orange" large @click="props.click">
                    {{ props.isFilled ? 'mdi-star-circle' : 'mdi-star-circle-outline' }}
                  </v-icon>
                </template>
              </v-rating>
            </v-col>
          </v-row>
          <!-- submit -->
          <v-row justify="space-between" class="mx-2 mt-6 mb-6" > 
            <v-btn color="teal" type="submit" block >S u b m i t</v-btn>
          </v-row>
          <!-- overlay -->
          <v-overlay :value="submitOverlay" @click="submitOverlay = false">
            <h2>Thank You for submitting to workadesQ</h2> 
          </v-overlay>
        </div>
      </v-col>
      </v-row>
      </v-container>
      </v-main>
      </v-app>
    </form>
  </ValidationObserver>
</template>

<script>
  // setup validation
import { ValidationProvider, extend, ValidationObserver } from 'vee-validate'
import { max, min, required, regex } from 'vee-validate/dist/rules'
extend('min', {...min, message: "Minimum 3 characters" })
extend('max', {...max, message: "Maximum 30 characters" })
extend('requiredName', {...required, message: "Name is required" })
extend('requiredLocation', {...required, message: "Location is required" })
extend('regex', {...regex, message: "Special Characters allowed: # @ & ! $" })

// custom api caller
import { desksApiCaller } from '../utils/desksApiCaller.js'

export default {
  components: {
    ValidationProvider, ValidationObserver
  },
  data() {
    return {
      center: { lat: 45.508, lng: -73.587 }, // placeholder for user coords
      markers: [],
      places: [],
      currentPlace: "",
      deskName: "",
      formattedAddress:"",
      // features
      features: {
        desk: false, wifi: false, power: false, coffee: false, wc: false
      },
      weekdayHours: [6, 18], // pre-popuated - looks kewl
      weekendHours: [6, 18],
      min: 0, // limits on the slider from 0 to 24:00 hours
      max: 24,
      daysClosed: [
        {day: "mon",closed: false},
        {day: "tue",closed: false},
        {day: "wed",closed: false},
        {day: "thu",closed: false},
        {day: "fri",closed: false},
        {day: "sat",closed: false},
        {day: "sun",closed: false},
      ],
      rating: 3,
      submitOverlay: false,
    };
  },

  methods: {
    setPlace(place) {      
      const marker = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      this.center = marker;
      this.formattedAddress = place.formatted_address
      this.currentPlace = place;  
    },

    async handleSubmitForm() {
      // insert saving spinner
      // prepare data for shipment
      const data = {
        name: this.deskName,
        features: this.features,
        weekdayHours: this.weekdayHours,
        weekendHours: this.weekendHours,
        location: {
          type: 'Point',
          coordinates: [this.center.lat, this.center.lng],
          formattedAddress: this.formattedAddress
        },
        daysClosed: this.daysClosed,
        rating: this.rating
      }    
      this.$refs.form.validate().then(async success => {
        if (!success) return
        
        const reply = await desksApiCaller('post', data)
        if (reply === "This location already exists") {
          this.$refs.form.setErrors({autocomplete: reply})
          return
        }
        this.submitOverlay = true
      })
    } 

  },
};
</script>

<style scoped>
  span {
    color: rgb(212, 29, 29);
  }
</style>
