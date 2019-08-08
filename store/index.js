export const state = () => ({
  location: '',
  weatherCard: {}
})
export const mutations = {
  updateWeatherCard(state, weatherCard) {
    state.weatherCard = weatherCard
  }
}
