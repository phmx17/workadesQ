<template>
  <v-app>
    <v-container class="container" >
      <v-row justify="center">
        <v-col cols="12">
          <div class="container">
       
            <div style="display: flex; align-items: center; justify-content: space-between" >
              <h4>user: {{ center.lat }} | {{ center.lng }}</h4>
              <h4>map: {{ mapCoordinates.lat }} | {{ mapCoordinates.lng }}</h4>
            </div>

   
          <br>
          <gmap-map
            :center="center"
            :zoom='12'
            style="width:100%; height: 600px;" 
            ref="mapRef"
            @dragend="handleDrag"
            @click="handleInfoWindowClose"

          >
            <!-- info window -->
            <gmap-info-window :options="infoWindowOptions" :position="infoWindowPosition" :opened="infoWindowOpened" @closeclick="handleInfoWindowClose">
              <div class="infoWindow">
                <h4>{{ activeDesk.name }}</h4>
                <p>Open: {{ activeDesk.weekdayHours[0] }} to {{ activeDesk.weekdayHours[1] }}</p>
              </div>
            </gmap-info-window>

            <!-- marker -->
            <gmap-marker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :draggable="false"
              :clickable="true"
              @click="handleMarkerClicked(index)"

            ></gmap-marker>
          </gmap-map>
          </div>
        </v-col>
      </v-row>
    </v-container>  
  </v-app>
</template>

<script>
import { desksApiCaller } from '../utils/desksApiCaller.js' // custom api caller
import { mapGetters } from 'vuex' 

export default { 
  data() {
    return {      
      center: { lat: 45.508, lng: -73.587 }, // same as user coordinates
      zoomLevel: 0,
      map: null,
      markers: [],
      places: [],
      currentPlace: null,
      boundsLowLat: 0,   // could also convert to array later, used for loading markers according to map bounds
      boundsHiLat: 0,
      boundsLowLng: 0,
      boundsHiLng: 0,
      // for info window
      activeDesk: {
        location: {
          coordinates: [0, 0]
        },
        weekdayHours: [0, 0]
      },
      infoWindowOptions: { pixelOffset: { width: 0, height: -35}},
      infoWindowOpened: false,

    };
  },

  async mounted() {
    this.geolocate();
    this.$refs.mapRef.$mapPromise.then(map => this.map = map)
    // populate map with markers
    const desks = await desksApiCaller('get')
    if (!desks.error) {
      this.displayMarkers(desks) // get markers onto the map
      this.storeDesks(desks) // save to vuex
    }
    else console.log("Error api call at mounted(): ", desks.error)
  },

  methods: {
    storeDesks(desks) {
      this.$store.dispatch('addDesksAction', desks) // calling action in vuex
    },

    displayMarkers(desks) {
      // update markers list for showing on map
      desks.forEach(desk => {
        let marker = {} // required here, otherwise marker turns into an observer after markers.push
        marker.lat = desk.location.coordinates[0]
        marker.lng = desk.location.coordinates[1]
        this.markers.push({ position: marker})
      })
    },

    setPlace(place) {
      this.currentPlace = place;
    },
    // not needed....
    // addMarker() {
    //   if (this.currentPlace) {
    //     const marker = {
    //       lat: this.currentPlace.geometry.location.lat(),
    //       lng: this.currentPlace.geometry.location.lng()
    //     };
    //     this.markers.push({ position: marker });
    //     this.places.push(this.currentPlace);
    //     this.center = marker;
    //     this.currentPlace = null;
    //   }
    // },

    geolocate() {
      const options = {enableHighAccuracy: true}
      this.$getLocation(options).then(coordinates => {  // calling the better locator
        this.center = {
          lat: coordinates.lat,
          lng: coordinates.lng
        }
      }).catch(error => alert("location services turned off")) // prevent error in console
      
      // old school
      // navigator.geolocation.getCurrentPosition(position => {
      //   this.center = {
      //     lat: position.coords.latitude,
      //     lng: position.coords.longitude 
      //   };
      // });
    },  

    handleDrag() {
      // get zoom and center or perhaps later the bounds for loading markers
      // this.center.lat = this.map.getCenter().lat().toFixed(4),
      // this.center.lng = this.map.getCenter().lng().toFixed(4),
      // this.zoomLevel = this.map.getZoom()
      const bounds = this.map.getBounds()
      // this.boundsLowLat = bounds.Ab.lo  // maybe convert to array later
      // this.boundsHiLat = bounds.Ab.hi
      // this.boundsLowLng = bounds.Va.lo
      // this.boundsHiLng = bounds.Va.hi
    },

    // handleAddMarker() {
    //   const lat = this.map.getCenter().lat()
    //   const lng = this.map.getCenter().lng()
    //   console.log(this.map)
     
    //   const marker = {lat, lng}
    //   this.markers.push({ position: marker });  
    //   this.center = marker    
    // },

    handleMarkerClicked(index) {
      this.activeDesk = this.getDesks[index]
      this.infoWindowOpened = true
    },

    handleInfoWindowClose() {
      this.infoWindowOpened = false
    },
 
  },
  computed: {
    mapCoordinates() {
      if (!this.map) return {lat: 0, lng: 0}
      return {
        lat: this.map.getCenter().lat().toFixed(4), 
        lng: this.map.getCenter().lng().toFixed(4)
      }
    },
    infoWindowPosition() {
      console.log("active info desk lng:" , this.activeDesk.location.coordinates[1])
      return {
        lat: parseFloat(this.activeDesk.location.coordinates[0]),
        lng: parseFloat(this.activeDesk.location.coordinates[1])
      }
    },

    ...mapGetters(['getDesks']) // using vuex mapper for getters
  }
}

</script>

<style scoped>
.container {
  height: 80vh;
  width: 100vw;
}
.row {
  position: absolute;
  height: 80vh;
  width: 100vw;   
}
.col {
  position: absolute;
  height: 80vh;
  width: 100vw;   
}
</style>
