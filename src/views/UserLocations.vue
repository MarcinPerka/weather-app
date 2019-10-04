<template>
  <div>
       <h2>Current weather</h2>
       <div class="text-center my-2" v-for="(userCitiesData, index) in userCitiesData" :key="index">
        <WeatherCard :weatherForecast="userCitiesData" :cityName="userCitiesName[index]" />
        </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data(){
    return{
      userCities: [],
      errored: false,
      userCitiesData: [],
      userCitiesName: []
    }
  },
  methods:{
    callApi(){
      for(element in this.userCities){
        console.log(element)
      let url = `http://api.openweathermap.org/data/2.5/weather?id=${element}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`
            axios
                .get(url, { timeout: 15000 })
                .then(response =>{
                    this.userCitiesData.push(response.data.list)
                    this.userCitiesName.push(response.data.city.name)
                }).catch(error =>{
                    console.log(error)
                this.errored = true
                })  
    }
  },
  mounted(){
    if(localStorage.getItem("userCities")){
      try{
        this.userCities = JSON.parse(localStorage.getItem("userCities"))
      }catch(e){
        localStorage.removeItem("userCities")
      }
      this.callApi()
      }
    }
  }
}
</script>