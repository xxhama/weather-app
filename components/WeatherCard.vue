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
        <v-flex lg8 sm6 xs12 display-3> {{ `${weather.temp} &deg;F` }}</v-flex>
        <v-flex lg4 sm6 xs12>
          <v-img
            aspect-ratio="2"
            contain
            :src="weather.icon"
            alt="weather-icon"
          />
        </v-flex>
      </v-layout>
    </v-card-text>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-send</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{
        `${weather.windSpeed} MPH, ${weather.windDir}`
      }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-icon>
        <v-icon>mdi-water</v-icon>
      </v-list-item-icon>
      <v-list-item-subtitle>{{ `${weather.humidity}%` }} </v-list-item-subtitle>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>mdi-arrow-collapse-down</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{
          `${weather.pressure} P`
        }}</v-list-item-subtitle>
      </v-list-item>
    </v-list-item>
    <v-divider />
    <v-list class="transparent">
      <v-list-item v-for="item in weather.forecast" :key="item.day">
        <v-list-item-title>{{ item.time }}</v-list-item-title>

        <v-list-item-icon>
          <v-img aspect-ratio="1" :src="item.icon" />
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          <strong>{{ `${item.temp.high}&deg;` }}</strong>
          <v-spacer />
          <small>{{ `${item.temp.low}&deg;` }}</small>
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
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
