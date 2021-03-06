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
    },
    // 图表类型
    type: {
      type: String,
      default: 'line'
    },
    config: {
      type: Object,
      default: () => ({
        showCode: false,
        darkMode: false
      })
    },
    beforeSetOption: {
      type: Function,
      default: () => {}
    },
    chartType: {
      type: String,
      default: 'bar'
    },
    // 默认使用Object.keys来获取data的第一个数据的key作为维度信息
    // 但是由于Object.keys无法保证key的顺序, 所以提供了自定义维度来指定维度信息
    dimensions: {
      type: Array,
      default: () => ([])
    }
  },
  data: () => ({
    chartInstance: null
  }),
  watch: {
    'config.darkMode': (val) => {
      this.chartInstance.setOption({
        darkMode: val,
        backgroundColor: val ? '#100C2A' : 'transparent',
        color: val
          ? [
            '#4992ff',
            '#7cffb2',
            '#fddd60',
            '#ff6e76',
            '#58d9f9',
            '#05c091',
            '#ff8a45',
            '#8d48e3',
            '#dd79ff',
          ]
          : [
            '#5470c6',
            '#91cc75',
            '#fac858',
            '#ee6666',
            '#73c0de',
            '#3ba272',
            '#fc8452',
            '#9a60b4',
            '#ea7ccc'
          ]
      })
    },
    'config.showCode': val => {
      const opts = this.chartInstance.getOption()
      val && console.log(opts)
    },
    data: val => {
      console.log('[Chart] 数据改变, 数据为', val)
      this.chartInstance.setOption({
        dataset: {
          source: val
        }
      }, true)
    },
    opts: {
      handler(val) {
        this.beforeSetOption(this.chartInstance, val)
        console.log('[Chart] 配置改变, 新配置为', val)
        this.chartInstance.setOption(val)
        this.replayChart()
      },
      deep: true,
    },
    chartType() {
      this.initChart()
    }
  },
  methods: {
    replayChart () {
      this.chartInstance.setOption({
        dataset: {
          source: []
        }
      })
      this.chartInstance.setOption({
        dataset: {
          source: this.data
        }
      })
    },
    preview () {
      const v = document.createElement('video')
      v.height = 200
      v.width = 320
      v.autoplay = true
      v.controls = true
      this.chartInstance.getDom().appendChild(v)
      return {
        setStream: stream => {
          v.srcObject = stream
        }
      }
    },
    record (stream) {
      const recorder = new MediaRecorder(stream)
      recorder.start()
      recorder.ondataavailable = e => {
        const a = document.createElement('a')
        a.download = 'video.mkv'
        a.href = URL.createObjectURL(e.data)
        a.click()
      }
      this.chartInstance.on('finished', () => {
        if (recorder.state === 'inactive') return
        setTimeout(() => {
          recorder.stop()
        }, 1000)
      })
    },
    getStreamFromCanvas (frameRate = 30) {
      const chartCanvas = this.chartInstance.getDom().querySelector('canvas')
      return chartCanvas.captureStream(frameRate)
    },
    initChart() {
      const keys = this.dimensions || Object.keys(this.data[0])
      this.chartInstance.setOption({
        xAxis: {
          type: 'category',
        },
        yAxis: {},
        dataset: {
          dimensions: keys,
          source: this.data
        },
        series: new Array(keys.length - 1).fill({type: this.chartType}),
      })
    }
  },
  mounted() {
    this.chartInstance = echarts.init(this.$refs.ec)
    this.initChart()
    this.beforeSetOption && this.beforeSetOption(this.chartInstance, this.opts)
    this.chartInstance.setOption(this.opts)

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
