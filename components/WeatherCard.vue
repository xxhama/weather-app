<template>
  <v-card class="mx-auto" :loading="weather.loading">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">{{
          weather.city
        }}</v-list-item-title>
        <v-list-item-subtitle>{{ weather.summary }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-layout wrap align-center>
        <v-flex sm6 display-3> {{ weather.temp }}&deg;C </v-flex>
        <v-flex sm6>
          <v-slide-y-transition>
            <v-img
              contain
              :src="weather.icon"
              alt="weather-icon"
              max-width="50%"
            ></v-img>
          </v-slide-y-transition>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle
        >{{ weather.windSpeed }} mph,
        {{ weather.windDir }}</v-list-item-subtitle
      >
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-water</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle
        >{{ Math.round(weather.humidity) }} %</v-list-item-subtitle
      >
    </v-list-item>

    <v-slider
      v-model="weather.time"
      :max="weather.labels.length - 1"
      :tick-labels="weather.labels"
      class="mx-2"
      ticks
    ></v-slider>

    <v-list class="transparent">
      <v-list-item v-for="item in weather.forecast" :key="item.day">
        <v-list-item-title>{{ item.day }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon :src="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ item.temp }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn text>Full Report</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'WeatherCard',
  props: {
    weather: {
      default: () => ({}),
      type: Object
    }
  },
  data: () => ({})
}
</script>

<style scoped></style>
