<template>
  <v-card class="mx-auto" :loading="loading">
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="headline">{{ city }}</v-list-item-title>
        <v-list-item-subtitle>{{ summary }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-layout wrap align-center>
        <v-flex sm6 display-3> {{ temp }}&deg;C </v-flex>
        <v-flex sm6>
          <v-img contain :src="icon" alt="weather-icon" max-width="50%"></v-img>
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle
        >{{ windSpeed }} mph, {{ windDir }}</v-list-item-subtitle
      >
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-water</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ Math.round(humidity) }} %</v-list-item-subtitle>
    </v-list-item>

    <v-slider
      v-model="time"
      :max="6"
      :tick-labels="labels"
      class="mx-2"
      ticks
    ></v-slider>

    <v-list class="transparent">
      <v-list-item v-for="item in forecast" :key="item.day">
        <v-list-item-title>{{ item.day }}</v-list-item-title>

        <v-list-item-icon>
          <v-icon></v-icon>
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
import { icons } from '../assets/weather-icons.js'
import { data } from '../testData'
const { currently, minutely } = data

const testData = [
  {
    day: 'Tuesday',
    icon: icons.sunny,
    temp: '24\xB0/12\xB0'
  },
  {
    day: 'Wednesday',
    icon: icons.sunny,
    temp: '22\xB0/14\xB0'
  },
  { day: 'Thursday', icon: icons.cloudy, temp: '25\xB0/15\xB0' }
]

export default {
  name: 'WeatherCard',
  data: () => ({
    humidity: currently.humidity,
    windDir: currently.windBearing,
    windSpeed: currently.windSpeed,
    icon: icons.sunny,
    city: 'Austin',
    summary: minutely.summary,
    loading: false,
    labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
    time: 0,
    temp: currently.temperature,
    forecast: testData
  })
}
</script>

<style scoped></style>
