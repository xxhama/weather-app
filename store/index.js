import axios from 'axios'
import Swal from 'sweetalert2'

export const state = () => ({
  alert: {},
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
  updateAlertMsg(state, msg) {
    state.alert = msg
  }
}

export const actions = {
  getWeather({ commit }, event) {
    commit('loading', true)
    axios
      .get('/api/weather', {
        params: { zip: event ? event.target.value : null }
      })
      .then(
        (response) => {
          commit('updateWeather', response)
          commit('loading', false)
        },
        (error) => {
          commit('updateAlertMsg', { msg: 'Please check zipcode', error })
          commit('loading', false)
        }
      )
  },
  alertMessage({ state }) {
    Swal.fire('Ouch...', state.alert.msg, 'error')
  }
}
