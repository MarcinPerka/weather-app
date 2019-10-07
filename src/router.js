import Vue from 'vue'
import Router from 'vue-router'
import Search from './views/Search.vue'
import UserLocations from './views/UserLocations.vue'
import ForecastInfo from './views/ForecastInfo.vue'
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
      path: '/forecast/:id',
      name: 'forecast',
      component: ForecastInfo
    },
    {
      path: '/historical-search',
      name: 'historical-search',
      component: HistoricalSearch
    }
  ]
})
