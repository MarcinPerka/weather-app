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
       <h2>Current weather in historical searches</h2>
       <div class="text-center my-2" v-for="(savedCurrentWeather, index) in savedCurrentWeathers" :key="index">
        <WeatherCard :weatherForecast="savedCurrentWeather" :cityName="savedCurrentWeather.name" :id="savedCurrentWeather.id"/>
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
      historicalCities: new Array(),
      savedCurrentWeathers: new Array(),
      loading: true,
      errored: false
    }
  },
  methods:{
    getCurrentWeather(id){
      let url = `http://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`
      let data =
            axios
                .get(url, { timeout: 500 })
                .then(response =>{
                    this.savedCurrentWeathers.push(response.data)
                }).catch(error =>{
                    console.log(error)
                this.errored = true
                })
      
    }
  },
  mounted(){
    
    this.historicalCities = JSON.parse(localStorage.getItem("historicalCities"));
    this.historicalCities.reverse()

    for (var i = 0; i < this.historicalCities.length; i++) {
      this.getCurrentWeather(this.historicalCities[i])
    }
  
    this.loading = false
  }
}
</script>