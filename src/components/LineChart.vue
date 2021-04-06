<script>

import { Line, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  extends: Line,
  mixins: [reactiveProp],
  prop: {
    height: '600px',
  },
  data () {
    return {
      options: {
        maintainAspectRatio: false,
      }
    }
  } ,
  mounted () {
    // If you want to pass options please create a local options object
    this.renderChart(this.chartData, this.options)
  }
}

</script>

<style scoped>

</style>
