<template>
  <v-container grid-list-lg>
    <v-layout wrap align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-toolbar dense>
            <v-text-field
              maxlength="5"
              label="Zip Code"
              hide-details
              prepend-icon="mdi-magnify"
              single-line
              @keyup.enter.native="getWeather"
            />

            <v-btn icon>
              <v-icon @click.stop.native="getWeather"
                >mdi-crosshairs-gps</v-icon
              >
            </v-btn>
          </v-toolbar>
        </v-card>
      </v-flex>
      <v-flex xs12>
        <WeatherCard :weather="weather" />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import WeatherCard from '~/components/WeatherCard.vue'

export default {
  components: {
    WeatherCard
  },
  data: () => ({}),
  computed: {
    ...mapState(['location', 'weather', 'zip', 'alert'])
  },
  watch: {
    alert() {
      this.notify()
    }
  },
  mounted() {
    this.getWeather()
  },
  methods: {
    ...mapActions({
      getWeather: 'getWeather',
      notify: 'alertMessage'
    })
  }
}
</script>
