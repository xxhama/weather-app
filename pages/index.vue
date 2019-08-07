<template>
  <v-container grid-list-lg>
    <v-layout column wrap justify-center>
      <v-flex xs12>
        <v-toolbar dense>
          <v-text-field
            hide-details
            prepend-icon="mdi-magnify"
            single-line
          ></v-text-field>

          <v-btn icon>
            <v-icon>mdi-crosshairs-gps</v-icon>
          </v-btn>
        </v-toolbar>
      </v-flex>
      <v-flex xs12>
        <WeatherCard />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: {
    WeatherCard
  }
}
</script>
