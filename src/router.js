import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import UserLocations from './views/UserLocations.vue'
import WeatherInfo from './views/WeatherInfo.vue'
import HistoricalSearch from './views/HistoricalSearch.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/user-locations',
      name: 'user-locations',
      component: UserLocations
    },
    {
      path: '/weather/:id',
      name: 'weather',
      component: WeatherInfo
    },
    {
      path: '/historical-search',
      name: 'historical-search',
      component: HistoricalSearch
    }
  ]
})
