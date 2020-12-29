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
        <h2>Current weather in favourite locations</h2>
        <section v-if="emptyFavorities" class="my-4">
          <v-icon color="info" dark large>fas fa-info-circle</v-icon>
          <h3 class="my-4">You don't have any cities saved.</h3>
        </section>
        <div
          class="text-center my-2"
          v-for="(savedCurrentWeather, index) in savedCurrentWeathers"
          :key="index"
        >
          <WeatherCardFav
            :weatherForecast="savedCurrentWeather"
            :cityName="savedCurrentWeather.name"
            :id="savedCurrentWeather.id"
            @updateFavouriteCities="updateFavouriteCities"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'
import WeatherCardFav from '../components/WeatherCardFav.vue'

export default {
  components: {
    WeatherCardFav
  },
  data () {
    return {
      favouriteCities: [],
      recentlyViewedCities: [],
      savedCurrentWeathers: [],
      loading: true,
      errored: false,
      emptyFavorities: true
    }
  },
  methods: {
    updateFavouriteCities (favouriteCities) {
      this.favouriteCities = favouriteCities
      this.savedCurrentWeathers = []
      this.emptyFavorities = true
      if (
        this.favouriteCities !== undefined &&
        this.favouriteCities.length > 0
      ) {
        this.favouriteCities.reverse()
        this.emptyFavorities = false
        for (let i = 0; i < this.favouriteCities.length; i++) {
          this.getCurrentWeather(this.favouriteCities[i])
        }
      } else {
        this.loading = false
      }
    },
    getCurrentWeather (id) {
      let url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`
      axios
        .get(url, { timeout: 5000 })
        .then((response) => {
          this.savedCurrentWeathers.push(response.data)
        })
        .catch((error) => {
          console.log(error)
          this.errored = true
        })
        .finally(() => (this.loading = false))
    },
    loadFavouriteCities () {
      if (localStorage.hasOwnProperty('favouriteCities') === true) {
        this.favouriteCities = JSON.parse(
          localStorage.getItem('favouriteCities')
        )
        if (
          this.favouriteCities !== undefined &&
          this.favouriteCities.length > 0
        ) {
          console.log(this.favouriteCities)
          this.favouriteCities.reverse()
          this.emptyFavorities = false
          for (let i = 0; i < this.favouriteCities.length; i++) {
            this.getCurrentWeather(this.favouriteCities[i])
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
    this.loadFavouriteCities()
  }
}
</script>
