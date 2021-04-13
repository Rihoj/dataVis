<template>
  <div class="container">
    <div class="row">
      <div class="col chart">
        <line-chart :chart-data="graphData"></line-chart>
        <button @click="reset()">Randomize</button>
        <button @click="runSim()">Resimulate</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <BPI></BPI>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h3>starting values</h3>
        <label class="labelWidth">comodity: </label><input disabled="disabled" v-model="this.btStart" type="text"> <br/>
        <label class="labelWidth">bank: </label><input v-model="config.startValue" type="text"> <br/>
        <label class="labelWidth">days: </label><input v-model="config.days" type="text"> <br/>
        <label class="labelWidth">maxGain: </label><input v-model="config.maxGain" type="text"> <br/>
        <label class="labelWidth">maxLost: </label><input v-model="config.maxLost" type="text"> <br/>
      </div>
      <div class="col">
        <h3>sim values</h3>
        <label class="labelWidth">trendDays: </label><input v-model="config.trendDays" type="text"> <br/>
        <label class="labelWidth">buy Low Offset: </label><input v-model="config.buyLowOffset" type="text"> <br/>
        <label class="labelWidth">sell High Offset: </label><input v-model="config.sellHighOffset" type="text"> <br/>
        <label class="labelWidth">buy percent: </label><input v-model="config.buyQty" type="text"> <br/>
        <label class="labelWidth">sell percent: </label><input v-model="config.sellQty" type="text"> <br/>
      </div>

      <div class="col">
        <h3>Data</h3>
        <table class="output">
          <tr> <td>Start:</td><td>${{config.startValue}}</td> </tr>
          <tr> <td>Bank:</td><td>${{config.startBank}}</td> </tr>
          <tr> <td>Portfolio:</td>  <td>{{config.portfolioStart}}</td> </tr>
        </table>
      </div>

      <div class="col">
        <h3>Results</h3>
        <table class="output">
          <tr> <td>No action:</td><td>${{result.noAction}}</td> </tr>
          <tr> <td>Portfolio:</td><td>{{result.portfolio}}</td> </tr>
          <tr> <td>Ending Portfolio Value:</td><td>${{result.portfolioValue}}</td> </tr>
          <tr> <td>Ending Bank:</td><td>{{result.bank}}</td> </tr>
          <tr> <td>Total Cash Value:</td><td>${{result.totalCashValue}}</td> </tr>
        </table>
      </div>
    </div>

    <div class="row">
      <p v-html="logText"></p>
    </div>
  </div>
</template>

<script>
  import LineChart from './LineChart'
  import BPI from './BPI'

  export default {
    components: {
      LineChart,
      BPI
    },
    data () {
      return {
        config: {
          startValue: 300,
          startBank: 0,
          maxGain: .05,
          maxLost: .04,
          days: 200,
          trendDays: 8,
          portfolioStart: 0,
          buyLowOffset: .1,
          sellHighOffset: .15,
          buyQty: .40,
          sellQty: .1,
        },
        bank: 0,
        portfolio: 0,
        state: {
          currentValue: 0,
          currentDate: 0,
          data: {
            labels: [],
            values: [],
            trend: [],
            portfolio: [],
            bank: []
          }
        },
        result: {
          portfolio: 0,
          portfolioStart: 0,
          portfolioValue: 0,
          noAction: 0,
          bank: 0,
        },
        computedValues: {},
        datacollection: {},
        logText: ''
      }
    },
    computed: {
      btStart () { // value of coin at start
        return this.$store.getters.currentPriceValue
      },
      trend () {
        let lastFew = [];
        let trend = []

        Object.values(this.$store.getters.getCurrentData).map((val) => {
          lastFew.push(val)
          if(lastFew.length > this.config.trendDays) {
            lastFew.shift()
          }

          trend.push(lastFew.reduce((a, b) => a + b) / lastFew.length)
        })
        return trend
      },
      predictFuture () {
        let future = {}

        for (var i = 1; i < 10; i++) {
          let last = 0;
          if (i == 1) {
            last = this.$store.getters.currentPriceValue
          } else {
            last = future[this.convertDate(this.createDateFrom(i-1))]
          }
          console.log(last)
          let max = Number(last) + (Number(last) * Number(this.config.maxGain))
          let min = Number(last) - (Number(last) * Number(this.config.maxLost))

          let next = (Math.random() * (max - min)) + min
          future[this.convertDate(this.createDateFrom(i))] = +next.toFixed(6)
        }

        return future
      },
      graphData () {
        return {
          labels: Object.keys({...this.$store.getters.getCurrentData, ...this.predictFuture}),
          datasets: [
            {
              label: 'trend',
              data: this.trend
            },
            {
              label: 'BT value',
              backgroundColor: 'blue',
              data: Object.values(this.$store.getters.getCurrentData),
            },
            {
              label: 'BT Potential',
              backgroundColor: 'green',
              data: Object.values({...this.$store.getters.getCurrentData, ...this.predictFuture}),
            },
            // {
            //   label: 'portfolio',
            //   backgroundColor: '#ff3300',
            //   data: this.computedValues.portfolio
            // },
            // {
            //   label: 'bank',
            //   backgroundColor: '#ff6600',
            //   data: this.computedValues.bank
            // }
          ]
        }
      }
    },
    mounted () {
      this.$store.dispatch('getCoinDeskHistory', this.config.days)
      this.reset()
    },
    methods: {
      createDateFrom(days) {
        let currentDate = new Date()
        currentDate.setDate(currentDate.getDate() + days)
        return new Date(currentDate)
      },
      // CODE DUP!!!
      convertDate(d){
        let ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        let mo = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(d);
        let da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
        return `${ye}-${mo}-${da}`
      },
      reset() {
        this.state.data.labels = []
        this.state.data.values = []
        this.loadData()

        this.runSim()
      },
      runSim () {
        this.logText = ''
        this.state.data.trend = []
        this.state.data.portfolio = []
        this.state.data.bank = []

        this.portfolio = (this.config.startValue / 2) / this.config.btStart
        this.config.portfolioStart = this.portfolio
        this.config.startBank = this.config.startValue / 2
        this.bank = this.config.startBank

        this.calculateTrends()

        this.calculateActions()

        this.result = {
          noAction: ((this.state.currentValue * this.config.portfolioStart) + (this.config.startValue / 2)).toFixed(2),
          bank: +(this.bank).toFixed(2),
          portfolio: this.portfolio.toFixed(8),
          portfolioStart: this.config.portfolioStart.toFixed(8),
          portfolioValue: (this.portfolio * this.state.currentValue).toFixed(2),
          totalCashValue: (this.portfolio * this.state.currentValue + this.bank).toFixed(2)
        }

        this.computedValues = this.state.data

        this.fillChartData()
      },
      nextValue (last) {
        let max = Number(last) + (Number(last) * Number(this.config.maxGain))
        let min = Number(last) - (Number(last) * Number(this.config.maxLost))

        let next = (Math.random() * (max - min)) + min
        return +next.toFixed(6)
      },
      fillChartData () {
        this.datacollection = {
          labels: this.computedValues.labels,
          datasets: [
            {
              label: 'trend',
              data: this.computedValues.trend
            },
            {
              label: 'BT value',
              backgroundColor: 'blue',
              data: this.computedValues.values
            },
            {
              label: 'portfolio',
              backgroundColor: '#ff3300',
              data: this.computedValues.portfolio
            },
            {
              label: 'bank',
              backgroundColor: '#ff6600',
              data: this.computedValues.bank
            }
          ]
        }
      },
      loadData() {
        let last = this.btStart
        for (var i = 0; i < this.config.days; i++) {
          last = this.nextValue(last)
          this.state.data.labels.push(i);
          this.state.data.values.push(last);
        }
      },
      calculateTrends() {
        let lastFew = [];

        this.state.data.values.map((val, i) => {
          this.state.currentValue = val
          this.state.currentDate = i
          lastFew.push(val)
          if(lastFew.length > this.config.trendDays) {
            lastFew.shift()
          }

          this.state.data.trend.push(lastFew.reduce((a, b) => a + b) / lastFew.length)
        })
      },
      calculateActions() {
        this.state.data.values.map((val, i) => {
          this.state.currentValue = val
          this.state.currentDate = i

          // console.log('CV '+this.state.currentValue)
          // console.log(( 1 - this.config.buyLowOffset) + ' of CV '+this.state.currentValue * ( 1 - this.config.buyLowOffset))
          // console.log('trend '+this.state.data.trend[i])

          if(this.state.currentDate < 3) {
            this.log('waiting')
          } else if(this.state.currentValue * (1 + this.config.buyLowOffset) < this.state.data.trend[i] ) {
            this.buy()
          } else if(this.state.currentValue * ( 1 - this.config.sellHighOffset) > this.state.data.trend[i] ) {
            this.sell()
          } else {
            this.log('no action')
          }

          this.state.data.portfolio.push(this.portfolio * this.state.currentValue)
          this.state.data.bank.push(this.bank + (this.portfolio * this.state.currentValue))
          // console.log('----')
        })
      },
      buy() {
        if(this.bank < 5) {
          this.log("Bank is to low to buy")
        }
        this.log("Buying $"+(this.bank * this.config.buyQty).toFixed(2)+' / ₿'+((this.bank * this.config.buyQty) / this.state.currentValue))
        this.portfolio = this.portfolio + ( (this.bank * this.config.buyQty) / this.state.currentValue )
        this.bank = this.bank * (1 - this.config.buyQty)
      },
      sell() {
        if(this.portfolio * this.state.currentValue < 5) {
          this.log("Portfolio is to low to sell")
        }
        this.log("Selling ₿"+ (this.portfolio * this.config.sellQty) + ' / $' + ((this.portfolio * this.config.sellQty) * this.state.currentValue ).toFixed(2))
        this.bank = this.bank + ((this.portfolio * this.config.sellQty) * this.state.currentValue )
        this.portfolio = this.portfolio * (1 - this.config.sellQty)
      },
      log(string) {
        this.logText += this.state.currentDate + ": " + string + '<br/>'
        // console.log(this.state.currentDate + ": " + string)
      }
    }
  }
</script>

<style>
  .chart {
    max-width: 1526;
    /* margin:  150px auto; */
  }
  .inputWrapper {
    max-width: 600px;
    margin:  auto;
  }
  .labelWidth {
    text-align: right;
    min-width: 200px;
    padding-right: 15px;
  }
  .output td:nth-child(odd) {
    text-align: right;
    padding-right: 10px;
  }
  .output td:nth-child(even) {
    padding-right: 2px;
    text-align: left;
  }
  button {
    margin:15px;
  }
</style>
