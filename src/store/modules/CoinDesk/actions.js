import axios from 'axios'

const setCurrentBPIValue = (context) => {
  var getCurrentPrice = true
  if (context.getters.currentPriceAge != 0) {
    var diff = ( new Date() - context.getters.currentPriceAge ) / 1000;
    diff /= 60;
    getCurrentPrice = (Math.abs(Math.round(diff)) >= 5)
  }
  if (getCurrentPrice) {
    axios
    .get('https://api.coindesk.com/v1/bpi/currentprice/USD.json')
    .then(response => {
      console.log(response.data.disclaimer);
      context.commit('setCurrentValue', response.data.bpi.USD.rate_float);
      context.commit('setCurrentAge', new Date());
      context.commit('setLoading', false);
    }).catch(error => {
      console.log(error)
      context.commit('setErrored', true);
    })
    .finally(() => context.commit('setLoading', false))
  } else {
    context.commit('setCurrentAge', context.getters.currentPriceAge)
    context.commit('setCurrentValue', context.getters.currentPriceValue)
    context.commit('setLoading', false)
  }
};
function convertDate(d){
  let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
  let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
  let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
  return `${ye}-${mo}-${da}`
}

const getCoinDeskHistory = (context, days) => {
  var sDate = new Date()
  sDate.setDate(sDate.getDate() - days)
  var startDate = convertDate(new Date(sDate))

  var eDate = new Date()
  eDate.setDate(eDate.getDate() - 1)

  var endDate = convertDate(new Date(eDate));

  var getHistory = true
  if (context.getters.historyAge != 0) {
    var diff = ( new Date() - context.getters.historyAge ) / 1000;
    diff /= 60;
    getHistory = (Math.abs(Math.round(diff)) >= 60*24)
  }
  if (getHistory) {
  axios
  .get('https://api.coindesk.com/v1/bpi/historical/close.json?start='+startDate+'&end='+endDate)
  .then(response => {
    console.log(response.data.disclaimer)
    context.commit('setHistory', response.data.bpi)
    context.commit('setHistoryAge', new Date())
  })
}
}

export default {
  setCurrentBPIValue,
  getCoinDeskHistory
};
