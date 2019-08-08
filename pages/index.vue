<template>
  <v-container grid-list-lg>
    <v-layout wrap align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-toolbar dense>
            <v-text-field
              hide-details
              prepend-icon="mdi-magnify"
              single-line
              @keyup.enter.native="search"
            ></v-text-field>

            <v-btn icon>
              <v-icon>mdi-crosshairs-gps</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <WeatherCard :data="weatherCard" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
import { mapState, mapMutations } from 'vuex'
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: {
    WeatherCard
  },
  data: () => ({}),
  computed: {
    ...mapState(['location', 'weatherCard'])
  },
  methods: {
    ...mapMutations('index', ['updateWeatherCard']),
    search: (event) => {
      axios
        .get('./api/weather', {
          query: { zip: event.target.value }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }
}
</script>
