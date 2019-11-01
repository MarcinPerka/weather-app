<template>
  <div>
    <section v-if="errored">
      <v-icon color="error" dark large>fas fa-times-circle</v-icon>
      <h3 class="my-4">Something went wrong</h3>
    </section>
    <section v-else>
      <div v-if="loading">
        <h3>Loading...</h3>
        <v-progress-circular :size="50" color="primary" indeterminate></v-progress-circular>
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
import axios from "axios";
import WeatherCard from "../components/WeatherCard.vue";

export default {
  components: {
    WeatherCard
  },
  data() {
    return {
      favoritesCities: new Array(),
      savedCurrentWeathers: new Array(),
      loading: true,
      errored: false,
      emptyFavorities: true
    };
  },
  methods: {
    getCurrentWeather(id) {
      let url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`;
      let data = axios
        .get(url, { timeout: 5000 })
        .then(response => {
          this.savedCurrentWeathers.push(response.data);
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    }
  },
  mounted() {
    this.favoritesCities = JSON.parse(localStorage.getItem("favoritesCities"));
    if (this.favoritesCities != null) {
      this.favoritesCities.reverse();
      this.emptyFavorities = false;
      for (var i = 0; i < this.favoritesCities.length; i++) {
        this.loading = true;
        this.getCurrentWeather(this.favoritesCities[i]);
      }
    }
  }
};
</script>