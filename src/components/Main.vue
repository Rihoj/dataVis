<template>
  <div class="wrapper">
    <h1>Some BT value Stuff</h1>
    <p>{{ msg }}</p>

    <Chart></Chart>

  </div>
</template>

<script>

import Chart from './Chart'
var ccxt = require ('ccxt')

export default {
  name: 'Main',
  components: {
    Chart
  },
  data () {
    // let exchange = new ccxt.kraken
    let coinbase = new ccxt['coinbase'] ()

    return {
      msg: null,
      exchange: coinbase
    }
  },
  mounted () {
    // axios
    //   // .get('https://api.coindesk.com/v1/bpi/currencies.json')
    //   .get('https://api.coinbase.com/v2/exchange-rates?currency=BTC')
    //   .then(response => (this.msg = response))

    this.msg = this.exchange.urls
  }
}
</script>

<style scoped>

</style>
