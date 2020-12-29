<template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="300">
      <template v-slot:activator="{ on }">
        <v-btn fab dark x-small color="red" @click.stop="dialog = true">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-card-title bold class="info white--text" primary-title
        >Are you sure?
        </v-card-title
        >

        <v-card-text class="text-justify"
        >Do you really want to delete this location from favourite? This
          process cannot be undone.
        </v-card-text
        >

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
      favouriteCities: []
    }
  },
  props: {
    id: String
  },
  methods: {
    removeCity () {
      for (let i = 0; i < this.favouriteCities.length; i++) {
        if (this.favouriteCities[i] === this.id) {
          this.favouriteCities.splice(i, 1)
        }
      }
      this.dialog = false
      this.saveFavouriteCities()
      this.$emit(`updateFavouriteCities`, this.favouriteCities)
    },
    saveFavouriteCities () {
      const parsed = JSON.stringify(this.favouriteCities)
      localStorage.setItem(`favouriteCities`, parsed)
    }
  },
  mounted () {
    if (localStorage.getItem(`favouriteCities`)) {
      try {
        this.favouriteCities = JSON.parse(
          localStorage.getItem(`favouriteCities`)
        )
      } catch (e) {
        localStorage.removeItem(`favouriteCities`)
      }
    }
  }
}
</script>
