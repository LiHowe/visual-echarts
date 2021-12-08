<template>
  <div class="chart-container">
    <div class="chart" ref="ec"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

// 柱状图  ,折线图  饼图
export default {
  name: 'Chart',
  props: {
    // 图表选项
    opts: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    chartEl: null,
    chartObj: null
  }),
  watch: {
    opts: {
      handler (val) {
        this.chartObj.setOption(val)
      },
      deep: true
    }
  },
  methods: {

  },
  mounted() {
    this.chartEl = this.$refs.ec
    this.chartObj = echarts.init(this.chartEl)
    this.chartObj.setOption({
      xAxis: {
        type: 'category',
      },
      yAxis: {
        type: 'value'
      },
      series: [
        { type: 'line', },
        { type: 'line' },
        { type: 'line' }
      ],
      dataset: {
        dimensions: Object.keys(this.data[0]),
        source: this.data
      }
    })
    this.chartObj.setOption(this.opts)
  }
}
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 50%;
}
.chart {
  width: 100%;
  height: 100%;
}
</style>
