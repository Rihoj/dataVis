<template>
<div class="col">
  <h1>Bitcoin Price Index</h1>

  <section v-if="errored">
    <p>We're sorry, we're not able to retrieve this information at the moment, please try back later</p>
  </section>

  <section v-else>
    <div v-if="loading">Loading...</div>

    <div v-else class="currency">
      <span class="lighten">
        <span v-html="currency.symbol"></span>{{ currency.rate_float | currencydecimal }}
      </span>
    </div>
  </section>
</div>
</template>
<script>

export default {
  data () {
    return {
      info: null
    }
  },
  computed : {
    currency () {
      return {
        symbol: "$",
        rate_float: this.$store.state.CoinDesk.currentPriceValue
      }
    },
    loading () {
      return this.$store.state.CoinDesk.loading
    },
    errored () {
      return this.$store.state.CoinDesk.errored
    }
  },
  mounted() {
    this.$store.dispatch('setCurrentBPIValue')
  },
  filters: {
    currencydecimal (value) {
      return value.toFixed(2)
    }
  }
}
</script>
<style>
</style>
