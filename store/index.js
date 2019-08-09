import axios from 'axios'

export const state = () => ({
  zip: '',
  location: '',
  weather: {
    humidity: '',
    windDir: '',
    windSpeed: '',
    icon: '',
    city: '',
    summary: '',
    loading: false,
    labels: ['SU', 'MO', 'TU', 'WED', 'TH', 'FR', 'SA'],
    time: '0',
    temp: '',
    forecast: []
  }
})
export const mutations = {
  loading(state, loading) {
    state.weather.loading = loading
  },
  updateWeather(state, weather) {
    state.weather = { ...state.weather, ...weather.data }
  },
  updateForecast(state, forecast) {
    state.weather = { ...state.forecast, forecast }
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
        }, 500)
      },
      (error) => {
        console.log(error)
      }
    )
  }
}
