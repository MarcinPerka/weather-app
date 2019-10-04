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
    <v-btn type="submit"  block rounded color="primary" @click="addCity(city.id)">{{city.name}}, {{ city.country }}</v-btn>
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
      userCities: []
    }
  },
  methods:{
    getCities(city){
      this.loading = true
      let url = `http://cities-ids.herokuapp.com?q=${city}`
      axios
        .get(url, { timeout: 15000 })
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
       this.userCities.push(id)
       this.saveUserCities()
       this.$router.push({name: 'weather', params : {id: id}})
    },
    saveUserCities(){
      const parsed = JSON.stringify(this.userCities)
      localStorage.setItem("userCities", parsed)
    }
  },mounted(){
    if(localStorage.getItem("userCities")){
      try{
        this.userCities = JSON.parse(localStorage.getItem("userCities"))
      }catch(e){
        localStorage.removeItem("userCities")
      }
    }
  }
}
</script>

  


