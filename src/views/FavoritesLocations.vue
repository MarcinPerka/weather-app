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
        <h2>Current weather in favorites locations</h2>
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
            @updateFavoritesCities="updateFavoritesCities"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";
import WeatherCardFav from "../components/WeatherCardFav.vue";

export default {
  components: {
    WeatherCardFav
  },
  data() {
    return {
      favoritesCities: [],
      savedCurrentWeathers: [],
      loading: true,
      errored: false,
      emptyFavorities: true
    };
  },
  methods: {
    updateFavoritesCities(favoritesCities) {
      this.favoritesCities = favoritesCities;
      this.savedCurrentWeathers = [];
      this.emptyFavorities = true;
      if (
        this.favoritesCities !== undefined &&
        this.favoritesCities.length > 0
      ) {
        this.favoritesCities.reverse();
        this.emptyFavorities = false;
        for (var i = 0; i < this.favoritesCities.length; i++) {
          this.getCurrentWeather(this.favoritesCities[i]);
        }
      } else {
        this.loading = false;
      }
    },
    getCurrentWeather(id) {
      let url = `https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`;
      // let url = `https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/weather?id=${id}&units=metric&APPID=0722763b1e850c2c1e3d7ce91a8b83ff`;
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
    if (localStorage.hasOwnProperty("favoritesCities") === true) {
      this.favoritesCities = JSON.parse(
        localStorage.getItem("favoritesCities")
      );
      if (
        this.favoritesCities !== undefined &&
        this.favoritesCities.length > 0
      ) {
        console.log(this.favoritesCities);
        this.favoritesCities.reverse();
        this.emptyFavorities = false;
        for (var i = 0; i < this.favoritesCities.length; i++) {
          this.getCurrentWeather(this.favoritesCities[i]);
        }
      } else {
        this.loading = false;
      }
    } else {
      this.loading = false;
    }
  }
};
</script>