<template>
<div>
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
       <h2>Forecast</h2>
       <div class="text-center my-2" v-for="(weatherForecast, index) in weatherForecasts" :key="index">
        <WeatherCard :weatherForecast="weatherForecast" :cityName="cityName" />
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
            weatherForecasts: [],
            loading: true,
            errored: false,
            cityName: ''
        }
    },
    mounted(){
        let url = `http://api.openweathermap.org/data/2.5/forecast?id=${this.$route.params.id}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`
            axios
                .get(url, { timeout: 5000 })
                .then(response =>{
                    this.weatherForecasts=response.data.list
                    this.cityName=response.data.city.name
                }).catch(error =>{
                    console.log(error)
                this.errored = true
                }).finally(() => this.loading = false)
    }  
}
</script>