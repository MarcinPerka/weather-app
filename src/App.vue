<template>
  <v-app>
    
  <v-app-bar app>
    <router-link to="/" class="toolbar-title">
    <v-toolbar-title >Weather App</v-toolbar-title>
    </router-link>
    <div class="flex-grow-1"></div>
    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" text>Search</v-btn>
        <v-btn to="/historical-locations" text>Historical Search</v-btn>
        <v-btn to="/favorites-locations" text>Favorties Locations</v-btn>
      </v-toolbar-items>

      <v-menu>
      <template v-slot:activator="{ on }">
        <v-btn
          v-on="on"
          icon
        class="hidden-md-and-up white">
          <v-icon color="primary">mdi-dots-vertical</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item>
          <v-list-item-title><v-btn to="/" text>Search</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn to="/historical-locations" text>Historical Search</v-btn></v-list-item-title>
        </v-list-item>
        <v-list-item>
          <v-list-item-title><v-btn to="/favorites-locations" text>Favorites Locations</v-btn></v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- Sizes your content based upon application components -->
  <v-content>

    <!-- Provides the application the proper gutter -->
    <v-container>
      <v-row>
      <v-col cols="12">
            <router-view></router-view>
      </v-col>
      </v-row>
      
    </v-container>
  </v-content>

 <Footer />
</v-app>
</template>

<script>
import Footer from '@/components/Footer.vue'

export default {
  components:{
    Footer
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.toolbar-title {
  color: #000000;
  text-decoration: inherit;
}
</style>
