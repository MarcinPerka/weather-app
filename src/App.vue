<template>
  <v-app>
  <v-app-bar app>
    <v-toolbar>
    <v-toolbar-title><span>Weather</span> App</v-toolbar-title>
    <div class="flex-grow-1"></div>
    <v-toolbar-items>
        <v-btn to="/" text>Home</v-btn>
        <v-btn to="/user-locations" text>User Locations</v-btn>
      </v-toolbar-items>
    </v-toolbar>
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

  <v-footer app>
    <!-- -->
  </v-footer>
</v-app>
</template>

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
</style>
