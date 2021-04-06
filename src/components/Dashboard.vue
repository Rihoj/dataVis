<template>
  <div class="chartWrapper">
    <line-chart :chart-data="datacollection"></line-chart>
    <button @click="fillData()">Randomize</button>
  </div>
</template>

<script>
  import LineChart from './LineChart'

  import ChartJS from "chart.js";
  import chartTrendline from "chartjs-plugin-trendline";

  ChartJS.plugins.register(chartTrendline);

  export default {
    components: {
      LineChart
    },
    data () {
      return {
        datacollection: null
      }
    },
    mounted () {
      this.fillData()
    },
    methods: {
      fillData () {
        this.datacollection = {
          labels: this.getLabels(),
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: this.getSampleData(),
              trendlineLinear: {
                  style: "rgba(255,105,180, .8)",
                  lineStyle: "dotted|solid",
                  width: 2
              }
            }
          ]
        }
      },
      someData () {
        return [{date: "2021-01-03", value: 33002.5364270397},{date: "2021-01-04", value: 31431.6122797216},{date: "2021-01-05", value: 34433.6065138377},
        {date: "2021-01-06", value: 36275.7563476709},{date: "2021-01-07", value: 39713.5078567171},{date: "2021-01-08", value: 40519.4485975339},
        {date: "2021-01-09", value: 40258.923988658},{date: "2021-01-10", value: 38709.7653748751},{date: "2021-01-11", value: 34409.6423752223},
        {date: "2021-01-12", value: 34214.6102620504},{date: "2021-01-13", value: 37017.0075034547},{date: "2021-01-14", value: 38435.8635146613},
        {date: "2021-01-15", value: 36751.5849736892},{date: "2021-01-16", value: 36016.7796059422},{date: "2021-01-17", value: 36375.8113792618},
        {date: "2021-01-18", value: 36346.6095022257},{date: "2021-01-19", value: 36577.5196463886},{date: "2021-01-20", value: 35004.5326268831},
        {date: "2021-01-21", value: 30606.1826756533},{date: "2021-01-22", value: 33368.3659318948},{date: "2021-01-23", value: 32070.0974252022},
        {date: "2021-01-24", value: 32285.726132437},{date: "2021-01-25", value: 32500.2559626891},{date: "2021-01-26", value: 32324.5556507343},
        {date: "2021-01-27", value: 30534.9993730199},{date: "2021-01-28", value: 33408.2183373915},{date: "2021-01-29", value: 34842.5573931247},
        {date: "2021-01-30", value: 34622.3732315285},{date: "2021-01-31", value: 33087.3698645166},{date: "2021-02-01", value: 33613.320764309},
        {date: "2021-02-02", value: 35632.9019515192},{date: "2021-02-03", value: 37397.426364087},{date: "2021-02-04", value: 37256.2521108726},
        {date: "2021-02-05", value: 37851.5965900821},{date: "2021-02-06", value: 40302.7997928393},{date: "2021-02-07", value: 38461.6814033048},
        {date: "2021-02-08", value: 44716.6854690563},{date: "2021-02-09", value: 46674.851688109},{date: "2021-02-10", value: 45237.475689253},
        {date: "2021-02-11", value: 47500.8975242038},{date: "2021-02-12", value: 47884.1828622953},{date: "2021-02-13", value: 47005.1906488965},
        {date: "2021-02-14", value: 49151.167576322},{date: "2021-02-15", value: 48125.9921954072},{date: "2021-02-16", value: 48840.4144745814},
        {date: "2021-02-17", value: 52165.3025552208},{date: "2021-02-18", value: 51728.5087967282},{date: "2021-02-19", value: 55719.2043616996},
        {date: "2021-02-20", value: 54801.6486439949},{date: "2021-02-21", value: 57128.6426064698},{date: "2021-02-22", value: 54181.9146491937},
        {date: "2021-02-23", value: 48172.8774769266},{date: "2021-02-24", value: 48745.4329843392},{date: "2021-02-25", value: 48291.4120833455},
        {date: "2021-02-26", value: 45752.1149194059},{date: "2021-02-27", value: 46642.6060765784},{date: "2021-02-28", value: 45092.8065726007},
        {date: "2021-03-01", value: 49248.914013312},{date: "2021-03-02", value: 47900.7768783279},{date: "2021-03-03", value: 50811.855174443},
        {date: "2021-03-04", value: 48259.4870766621},{date: "2021-03-05", value: 49149.7308288371},{date: "2021-03-06", value: 48879.1519041557},
        {date: "2021-03-07", value: 50594.6985745107},{date: "2021-03-08", value: 51503.2581321815},{date: "2021-03-09", value: 54458.0378114244},
        {date: "2021-03-10", value: 56915.1739350527},{date: "2021-03-11", value: 57636.7579619661},{date: "2021-03-12", value: 57306.166262989},
        {date: "2021-03-13", value: 60743.0418249111},{date: "2021-03-14", value: 60197.9019918003},{date: "2021-03-15", value: 56300.3341086303},
        {date: "2021-03-16", value: 56639.7839496711},{date: "2021-03-17", value: 58567.2837810578},{date: "2021-03-18", value: 57983.094743574},
        {date: "2021-03-19", value: 58451.7314659458},{date: "2021-03-20", value: 58593.6024540601},{date: "2021-03-21", value: 57796.4673712199},
        {date: "2021-03-22", value: 54329.3586346314},{date: "2021-03-23", value: 54794.2977137099},{date: "2021-03-24", value: 52787.7455257516},
        {date: "2021-03-25", value: 52173.8679802456},{date: "2021-03-26", value: 54483.0457323},{date: "2021-03-27", value: 56234.3561050027},
        {date: "2021-03-28", value: 55343.9258153269}, {date: "2021-03-29", value: 57627.6792491031}, {date: "2021-03-30", value: 58734.4754337222},
        {date: "2021-03-31", value: 58724.6645166272}, {date: "2021-04-01", value: 58984.6129299288}, {date: "2021-04-02", value: 58821.6269944414}]
      },
      getSampleData () {
        return  this.someData().map((log) => {
          return log.value
        })
      },
      getLabels () {
        return  this.someData().map((log) => {
          return log.date
        })
      }
    }
  }
</script>

<style>
  .chartWrapper {
    margin:  150px auto;
    max-height: 600px;
  }
</style>
