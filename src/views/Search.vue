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
        <v-progress-circular
          :size="50"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </div>
      <div v-else>
        <h2>Results</h2>
        <div class="my-4" v-for="city in cities" :key="city.openWeatherMapId">
          <v-card
            max-width="500"
            class="mx-auto text-center rounded-card"
            color="grey lighten-3"
            :elevation="10"
            @click="addToRecentlyViewedCities(city.openWeatherMapId)"
          >
            <v-row>
              <v-col cols="3"></v-col>
              <v-col cols="6">
                <v-card-text>
                  <h3>{{ city.name }}, {{ city.country }}</h3>
                </v-card-text>
              </v-col>
              <v-col cols="3">
                <v-btn
                  text
                  icon
                  large
                  @click.stop="toggleFavouriteCities(city.openWeatherMapId)"
                  :class="favouriteCities.includes(city.openWeatherMapId) ? 'red--text' : ''"
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
import axios from 'axios'

export default {
  data () {
    return {
      searchInput: '',
      cities: {},
      loading: false,
      errored: false,
      favouriteCities: [],
      recentlyViewedCities: [],
      searchInputRules: [
        (v) => !!v || 'Place some text please',
        (v) => !/^\s+$/.test(v) || 'Place some text please'
      ]
    }
  },
  methods: {
    getCities () {
      this.errored = false
      this.loading = true
      let url = `https://cities-rest-api.herokuapp.com/api/cities/regex?text=${this.searchInput}`
      axios
        .get(url, { timeout: 5000 })
        .then((response) => {
          this.cities = response.data
        })
        .catch(() => {
          this.errored = true
        })
        .finally(() => (this.loading = false))
    },
    addToRecentlyViewedCities (id) {
      if (this.recentlyViewedCities.includes(id) === false) {
        this.recentlyViewedCities.push(id)
        this.saveRecentlyViewedCities()
      }
      if (this.recentlyViewedCities.length > 20) {
        this.recentlyViewedCities.shift()
      }

      this.$router.push({ name: 'forecast', params: { id: id } })
    },
    saveRecentlyViewedCities () {
      const parsed = JSON.stringify(this.recentlyViewedCities)
      localStorage.setItem(`recentlyViewedCities`, parsed)
    },
    toggleFavouriteCities (id) {
      if (this.favouriteCities.includes(id) === false) {
        this.favouriteCities.push(id)
      } else {
        for (let i = 0; i < this.favouriteCities.length; i++) {
          if (+this.favouriteCities[i] === id) {
            this.favouriteCities.splice(i, 1)
          }
        }
      }
      this.saveFavouriteCities()
    },
    saveFavouriteCities () {
      const parsed = JSON.stringify(this.favouriteCities)
      localStorage.setItem(`favouriteCities`, parsed)
    },
    loadFavouriteCities () {
      if (localStorage.getItem(`favouriteCities`)) {
        try {
          this.favouriteCities = JSON.parse(
            localStorage.getItem(`favouriteCities`)
          )
        } catch (e) {
          localStorage.removeItem(`favouriteCities`)
        }
      }
    },
    loadRecentlyViewedCities () {
      if (localStorage.getItem(`recentlyViewedCities`)) {
        try {
          this.recentlyViewedCities = JSON.parse(
            localStorage.getItem(`recentlyViewedCities`)
          )
        } catch (e) {
          localStorage.removeItem(`recentlyViewedCities`)
        }
      }
    }
  },
  mounted () {
    this.loadFavouriteCities()
    this.loadRecentlyViewedCities()
  }
}
</script>

<style scoped>
.rounded-card {
  border-radius: 20px;
}
</style>
