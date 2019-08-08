import axios from 'axios'
import { icons } from '../assets/weather-icons'

export const state = () => ({
  location: '',
  weather: {
    humidity: '40',
    windDir: '240',
    windSpeed: '35',
    icon: icons.sunny,
    city: 'Austin',
    summary: 'Summary',
    loading: false,
    labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
    time: '0',
    temp: '77',
    forecast: []
  }
})
export const mutations = {
  loading(state, loading) {
    state.weather.loading = loading
  },
  updateWeather(state, weather) {
    state.weather = Object.assign(state.weather, weather.data)
  }
}

export const actions = {
  getWeather({ commit }) {
    commit('loading', true)
    axios.get('/api/weather').then(
      (response) => {
        setTimeout(function() {
          commit('updateWeather', response)
          commit('loading', false)
        }, 1000)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
