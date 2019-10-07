<template>
  <div>
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
       <h2>Current weather in favourite locations</h2>
       <div class="text-center my-2" v-for="(savedCurrentWeather, index) in savedCurrentWeathers" :key="index">
        <WeatherCard :weatherForecast="savedCurrentWeather" :cityName="savedCurrentWeather.name" />
        </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from 'axios'
import WeatherCard from '../components/WeatherCard.vue'

export default {
  components:{
        WeatherCard
    },
  data(){
    return{
      savedLocations: [],
      savedCurrentWeathers: {},
      loading: true,
      errored: false
    }
  },
  mounted(){
    var storedLocations = [524901, 2643743];
    localStorage.setItem("savedLocations", JSON.stringify(storedLocations));
    
    this.savedLocations = JSON.parse(localStorage.getItem("savedLocations"));
    
    for (var i = 0; i < this.savedLocations.length; i++) {
    let url = `http://api.openweathermap.org/data/2.5/weather?id=${this.savedLocations[i]}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`
            axios
                .get(url, { timeout: 500 })
                .then(response =>{
                    this.savedCurrentWeathers.push(response.data)
                }).catch(error =>{
                    console.log(error)
                this.errored = true
                }).finally(() => this.loading = false)
    }
  }
}
</script>