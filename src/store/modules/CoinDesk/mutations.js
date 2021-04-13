const setCurrentValue = (state, value) => {
  localStorage.setItem('currentPriceValue', value)
  state.currentPriceValue = value
}
const setCurrentAge = (state, value) => {
  localStorage.currentPriceAge = value
  state.currentPriceAge = value
}
const setHistoryAge = (state, value) => {
  localStorage.historyAge = value
  state.historyAge = value
}
const setHistory = (state, value) => {
  localStorage.coinDeskHistory = JSON.stringify(value)
  state.history = value
}
const setLoading = (state, value) => {
  state.loading = value
}
const setErrored = (state, value) => {
  state.errored = value
}

export default {
  setCurrentValue,
  setCurrentAge,
  setLoading,
  setErrored,
  setHistory,
  setHistoryAge
}
