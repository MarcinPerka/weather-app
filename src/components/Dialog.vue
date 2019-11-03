<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="300" >
      <template v-slot:activator="{ on }">
        <v-btn fab dark x-small color="red" :on="on" >
          <v-icon dark>mdi-minus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title bold class="info white--text" primary-title>Are you sure?</v-card-title>

        <v-card-text
          class="text-justify"
        >Do you really want to delete this location from favorites? This process cannot be undone.</v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" dark @click="removeCity">Delete</v-btn>
          <v-btn color="grey" dark @click="dialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
        favoritesCities: new Array(),
      }
    },
    props:{
        id: 0
    },
    methods:{
        removeCity(){
            for( var i = 0; i < this.favoritesCities.length; i++){ 
                if (this.favoritesCities[i] === this.id) {
                this.favoritesCities.splice(i, 1); 
          }
        }
        this.dialog = false
        this.saveFavoritesCities()
        this.$emit(`updateFavoritesCities`,this.favoritesCities)
    },
    saveFavoritesCities(){
      const parsed = JSON.stringify(this.favoritesCities)
      localStorage.setItem(`favoritesCities`, parsed)
    }
    },
    mounted(){
    if(localStorage.getItem(`favoritesCities`)){
      try{
        this.favoritesCities = JSON.parse(localStorage.getItem(`favoritesCities`))
      }catch(e){
        localStorage.removeItem(`favoritesCities`)
      }
    }
  }
  }
</script>