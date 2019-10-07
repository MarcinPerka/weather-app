<template>
  <div class="hello">
    <v-text-field
            outlined
            label="Search by city or country code..."
            append-icon="fas fa-search"
            v-model="searchInput"
            
            @keypress.enter="getCities"
          ></v-text-field>
          <section v-if="errored">
            <v-icon color="error" dark large>fas fa-times-circle</v-icon>
    <h2>Something went wrong</h2>
  </section>
  <section v-else>
    <div v-if="loading"><h2>Loading...</h2>
      <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </div>
     <div v-else>
       <h2>Results</h2>
       <div class="my-4" v-for="city in cities" :key="city.id">
         <v-card
    max-width="500"
    class="mx-auto text-center rounded-card" 
    color="grey lighten-2"
  >
  <v-row>
    <v-col cols="3">
      <v-btn :to="{name: 'forecast', params : {id: city.id}}" icon><v-icon>fas fa-ellipsis-h</v-icon></v-btn>
    </v-col>
    <v-col cols="6">
    <v-card-text >{{city.name}}, {{ city.country }}</v-card-text>
    </v-col>
    <v-col cols="3">
    <v-btn icon><v-icon>far fa-heart</v-icon></v-btn>
    </v-col>
  </v-row>
  </v-card>
    </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return {
      searchInput: "",
      cities: {},
      loading: false,
      errored: false,
      savedCities: [],
      searchInputRules: [
        v => !!v || "Place some text please",
        v => !/^\s+$/.test(v) || "Place some text please"
      ]
    }
  },
  methods:{
    getCities(searchInput){
      this.loading = true
  //    let url = `http://openweathermap-helper.herokuapp.com/?q=${searchInput}`
      let url = `http://cities-ids.herokuapp.com/?q=${searchInput}`
      axios
        .get(url, { timeout: 500 })
        .then(response => { 
          this.cities = response.data
        })
        .catch(error =>{
          console.log(error)
          this.errored = true
        })
        .finally(() => this.loading = false)
    },
    addCity(id){
       this.savedCities.push(id)
       this.saveUserCities()
    },
    saveUserCities(){
      const parsed = JSON.stringify(this.savedCities)
      localStorage.setItem(`savedCities`, parsed)
    }
  },mounted(){
    if(localStorage.getItem(`savedCities`)){
      try{
        this.userCities = JSON.parse(localStorage.getItem(`savedCities`))
      }catch(e){
        localStorage.removeItem(`savedCities`)
      }
    }
  }
}
</script>

<style scoped>
  .rounded-card{
    border-radius:20px;
  } 
</style>

  


