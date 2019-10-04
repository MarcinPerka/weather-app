import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import UserLocations from './views/UserLocations.vue'
import WeatherInfo from './views/WeatherInfo.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
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
    }
  ]
})
