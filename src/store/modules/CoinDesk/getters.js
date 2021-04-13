const currentPriceAge = state => {
  if( state.currentPriceAge != 0) {
    return state.currentPriceAge;
  }
  if(localStorage.currentPriceAge) {
    return new Date(localStorage.currentPriceAge)
  }
  return state.currentPriceAge
};
const historyAge = state => {
  if( state.historyAge != 0) {
    return state.historyAge;
  }
  if(localStorage.historyAge) {
    return new Date(localStorage.historyAge)
  }
  return state.historyAge
};
const currentPriceValue = state => {
    if( state.currentPriceValue != 0) {
      return state.currentPriceValue;
    }
    if(localStorage.currentPriceValue) {
      return Number(localStorage.currentPriceValue)
    }
    return state.currentPriceValue
};
const getCoinDeskHistory = state => {
  if( Object.keys(state.history).length !== 0 ) {
    return state.history
  }
  if (localStorage.coinDeskHistory && Object.keys(JSON.parse(localStorage.coinDeskHistory)).length !== 0) {
    var history = JSON.parse(localStorage.coinDeskHistory)
    return history
  }
  return state.history
}
// CODE DUP!!!
function convertDate(d){
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${ye}-${mo}-${da}`
}

const getCurrentData = state => {
  let today = convertDate(new Date())
  let data = getCoinDeskHistory(state)
  data[today] = currentPriceValue(state)
  return data
}
const loading = state => state.loading;
const errored = state => state.errored;

export default {
  currentPriceAge,
  currentPriceValue,
  loading,
  errored,
  getCoinDeskHistory,
  historyAge,
  getCurrentData
}
