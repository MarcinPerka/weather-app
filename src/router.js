import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import FavoritesLocations from './views/FavoritesLocations.vue'
import ForecastInfo from './views/ForecastInfo.vue'
import HistoricalLocations from './views/HistoricalLocations.vue'

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
      path: '/favorites-locations',
      name: 'favorites-locations',
      component: FavoritesLocations
    },
    {
      path: '/forecast/:id',
      name: 'forecast',
      component: ForecastInfo
    },
    {
      path: '/historical-locations',
      name: 'historical-locations',
      component: HistoricalLocations
    }
  ]
})
