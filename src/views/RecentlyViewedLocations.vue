<template>
  <div>
    <section v-if="errored">
      <v-icon color="error" dark large>fas fa-times-circle</v-icon>
      <h3 class="my-4">Something went wrong</h3>
    </section>
    <section v-else>
      <div v-if="loading">
        <h3>Loading...</h3>
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else>
        <h2>Current weather in recently viewed cities</h2>
        <section v-if="emptyRecentlyViewedCities" class="my-4">
          <v-icon color="info" dark large>fas fa-info-circle</v-icon>
          <h3 class="my-4">You don't have any recently viewed cities.</h3>
        </section>
        <div
          class="text-center my-2"
          v-for="(savedCurrentWeather, index) in savedCurrentWeathers"
          :key="index"
        >
          <WeatherCard
            :weatherForecast="savedCurrentWeather"
            :cityName="savedCurrentWeather.name"
            :id="savedCurrentWeather.id"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import WeatherCard from '../components/WeatherCard.vue'

export default {
  components: {
    WeatherCard
  },
  data () {
    return {
      recentlyViewedCities: [],
      savedCurrentWeathers: [],
      loading: true,
      errored: false,
      emptyRecentlyViewedCities: true
    }
  },
  methods: {
    getCurrentWeather (id) {
      let url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`
      axios
        .get(url, { timeout: 7000 })
        .then((response) => {
          this.savedCurrentWeathers.push(response.data)
        })
        .catch(() => {
          this.errored = true
        })
        .finally(() => (this.loading = false))
    },
    loadRecentlyViewedCities () {
      if (localStorage.hasOwnProperty('recentlyViewedCities') === true) {
        this.recentlyViewedCities = JSON.parse(
          localStorage.getItem('recentlyViewedCities')
        )
        if (
          this.recentlyViewedCities !== undefined &&
          this.recentlyViewedCities.length > 0
        ) {
          this.recentlyViewedCities.reverse()
          this.emptyRecentlyViewedCities = false
          for (let i = 0; i < this.recentlyViewedCities.length; i++) {
            this.getCurrentWeather(this.recentlyViewedCities[i])
          }
        } else {
          this.loading = false
        }
      } else {
        this.loading = false
      }
    }
  },
  mounted () {
    this.loadRecentlyViewedCities()
  }
}
</script>
