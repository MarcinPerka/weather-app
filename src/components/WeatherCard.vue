<template>
  <div>
    <v-card
      class="mx-auto"
      color="#F9F9F9"
      max-width="344"
      :to="{name: 'forecast', params : {id: id}}"
      :elevation="8"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">{{ cityName }}</v-list-item-title>
          <v-list-item-subtitle>{{ weatherForecast.weather[0].description }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-2" cols="6">{{ weatherForecast.main.temp | formatValue}} &deg;C</v-col>
          <v-col cols="6">
            <v-img
              :src="'http://openweathermap.org/img/wn/'+weatherForecast.weather[0].icon+'@2x.png'"
              alt="Weather image"
              width="92"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-send</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ weatherForecast.wind.speed | formatValue}} km/h</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-cloud-download</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ weatherForecast.clouds.all }} %</v-list-item-subtitle>
      </v-list-item>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    weatherForecast: Object,
    cityName: String,
    id: 0
  },
  filters: {
    formatValue(value) {
      return parseInt(value, 10);
    }
  }
};
</script>