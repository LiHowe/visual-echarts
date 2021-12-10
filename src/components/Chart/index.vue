<template>
  <div class="chart" ref="ec"></div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from 'vue'
import * as echarts from 'echarts'


const ec = ref(null)

const data = reactive({
  chartInstance: {}
})

const props = defineProps({
  // 图表选项
  opts: {
    type: Object,
    default: () => ({})
  },
  // 图表数据
  data: {
    type: Array,
    default: () => ([])
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
  }
})

watch(
  () => props.config.darkMode,
  (val: boolean) => {
    data.chartInstance.setOption({
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
  }
)


watch(
  () => props.config.showCode,
  (val) => {
    const opts = data.chartInstance.getOption()
    val && console.log(opts)
  }
)

watch(
  () => props.opts,
  val => {
    data.chartInstance.setOption(val)
  },
  {
    deep: true
  }
)

watch(
  () => props.data,
  (val) => {
    console.log('[图表] 数据改变, 数据为', val)
    data.chartInstance.setOption({
      dataset: {
        source: val
      }
    })
  }
)

function record () {
  const chartCanvas = data.chartInstance.getDom().querySelector('canvas')
  const stream = chartCanvas.captureStream(30)
  const recorder = new MediaRecorder(stream)
  recorder.start()
  recorder.ondataavailable = e => {
    const a = document.createElement('a')
    a.download = 'video.mkv'
    a.href = URL.createObjectURL(e.data)
    a.click()
  }
  const v = document.createElement('video')
  v.srcObject = stream
  v.height = 200
  v.width = 320
  v.autoplay = true
  data.chartInstance.getDom().appendChild(v)
  data.chartInstance.on('finished', e => {
    if (recorder.state === 'inactive') return
    setTimeout(() => {
      recorder.stop()
    }, 1000)
  })
}

onMounted(() => {
  data.chartInstance = echarts.init(ec.value)
  const keys = Object.keys(props.data[0])
  data.chartInstance.setOption({
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: new Array(keys.length - 1).fill({type: 'bar'}),
    dataset: {
      dimensions: keys,
      source: props.data
    }
  })
  data.chartInstance.setOption(props.opts)
  data.chartInstance.resize()
  record()
})
</script>

<style scoped>
.chart {
  width: 100%;
}
</style>
