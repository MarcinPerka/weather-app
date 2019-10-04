<template>
  <div class="hello">
    <v-text-field
            outlined
            label="Search..."
            append-icon="fas fa-search"
            v-model="city"
            @change="getCities"
          ></v-text-field>
          <section v-if="errored">
    <h2>Something went wrong</h2>
    <v-btn class="mx-2" fab large indeterminate color="error">
      <v-icon dark>fas fa-times-circle</v-icon>
    </v-btn>
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
       <div class="text-center my-2" v-for="city in cities" :key="city.id">
    <v-btn type="submit" block rounded color="primary" :to="{name: 'weather', params : {id: city.id}}">{{city.name}}, {{ city.country }}</v-btn>
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
      city: "",
      cities: {},
      loading: false,
      errored: false,
      savedCities: []
    }
  },
  methods:{
    getCities(city){
      this.loading = true
      let url = `http://cities-ids.herokuapp.com?q=${city}`
      axios
        .get(url, { timeout: 5000 })
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
      localStorage.setItem("savedCities", parsed)
    }
  },mounted(){
    if(localStorage.getItem("savedCities")){
      try{
        this.userCities = JSON.parse(localStorage.getItem("savedCities"))
      }catch(e){
        localStorage.removeItem("savedCities")
      }
    }
  }
}
</script>

  


