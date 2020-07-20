<template>
  <div class="hello">
    <v-text-field
      outlined
      label="Search by city or country code..."
      append-icon="fas fa-search"
      v-model="searchInput"
      @click:append="getCities"
      @keydown.enter.prevent="getCities"
      :rules="searchInputRules"
    ></v-text-field>
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
        <h2>Results</h2>
        <div class="my-4" v-for="city in cities" :key="city.openWeatherMapId">
          <v-card
            max-width="500"
            class="mx-auto text-center rounded-card"
            color="grey lighten-3"
            :elevation="10"
            @click="addToHistoricalCities(city.openWeatherMapId)"
          >
            <v-row>
              <v-col cols="3"></v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3>{{city.name}}, {{ city.country }}</h3>
                </v-card-text>
              </v-col>
              <v-col cols="3">
                <v-btn
                  text
                  icon
                  large
                  @click.stop="toggleFavoritesCities(city.openWeatherMapId)"
                  :class="favoritesCities.includes(city.openWeatherMapId) ? 'red--text' : ''"
                >
                  <v-icon>mdi-heart</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      searchInput: "",
      cities: {},
      loading: false,
      errored: false,
      favoritesCities: new Array(),
      historicalCities: new Array(),
      searchInputRules: [
        v => !!v || "Place some text please",
        v => !/^\s+$/.test(v) || "Place some text please"
      ]
    };
  },
  methods: {
    getCities() {
      this.errored = false;
      this.loading = true;
      let url = `https://cities-rest-api.herokuapp.com/api/cities/regex?text=${this.searchInput}`;
      // let url = ` https://cors-anywhere.herokuapp.com/https://cities-ids.herokuapp.com/?q=${this.searchInput}`;
      axios
        .get(url, { timeout: 5000 })
        .then(response => {
          this.cities = response.data;
        })
        .catch(error => {
          console.log(error);
          this.errored = true;
        })
        .finally(() => (this.loading = false));
    },
    addToHistoricalCities(id) {
      if (this.historicalCities.includes(id) == false) {
        this.historicalCities.push(id);
        this.saveHistoricalCities();
      }
      if (this.historicalCities.length > 20) {
        this.historicalCities.shift();
      }

      this.$router.push({ name: "forecast", params: { id: id } });
    },
    saveHistoricalCities() {
      const parsed = JSON.stringify(this.historicalCities);
      localStorage.setItem(`historicalCities`, parsed);
    },
    toggleFavoritesCities(id) {
      if (this.favoritesCities.includes(id) == false)
        this.favoritesCities.push(id);
      else {
        for (var i = 0; i < this.favoritesCities.length; i++) {
          if (this.favoritesCities[i] === id) {
            this.favoritesCities.splice(i, 1);
          }
        }
      }
      this.saveFavoritesCities();
    },
    saveFavoritesCities() {
      const parsed = JSON.stringify(this.favoritesCities);
      localStorage.setItem(`favoritesCities`, parsed);
    }
  },
  mounted() {
    if (localStorage.getItem(`favoritesCities`)) {
      try {
        this.favoritesCities = JSON.parse(
          localStorage.getItem(`favoritesCities`)
        );
      } catch (e) {
        localStorage.removeItem(`favoritesCities`);
      }
    }

    if (localStorage.getItem(`historicalCities`)) {
      try {
        this.historicalCities = JSON.parse(
          localStorage.getItem(`historicalCities`)
        );
      } catch (e) {
        localStorage.removeItem(`historicalCities`);
      }
    }
  }
};
</script>

<style scoped>
.rounded-card {
  border-radius: 20px;
}
</style>

  


