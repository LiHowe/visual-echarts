<template>
  <div class="chart" ref="ec"></div>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive, ref, watch} from 'vue'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'


const ec = ref(null)

let chartInstance = reactive({}) as ECharts

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
    chartInstance.setOption({
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
    const opts = chartInstance.getOption()
    val && console.log(opts)
  }
)

watch(
  () => props.opts,
  val => {
    chartInstance.setOption(val)
  },
  {
    deep: true
  }
)

watch(
  () => props.data,
  (val) => {
    console.log('[图表] 数据改变, 数据为', val)
    chartInstance.setOption({
      dataset: {
        source: val
      }
    })
  }
)

/**
 * 预览方法
 */
function preview () {
  const v = document.createElement('video')
  v.height = 200
  v.width = 320
  v.autoplay = true
  v.controls = true
  chartInstance.getDom().appendChild(v)
  return {
    setStream: (stream: MediaStream) => {
      v.srcObject = stream
    }
  }
}

/**
 * 录制方法
 * @param stream
 */
function record (stream) {
  const recorder = new MediaRecorder(stream)
  recorder.start()
  recorder.ondataavailable = e => {
    const a = document.createElement('a')
    a.download = 'video.mkv'
    a.href = URL.createObjectURL(e.data)
    a.click()
  }
  chartInstance.on('finished', () => {
    if (recorder.state === 'inactive') return
    setTimeout(() => {
      recorder.stop()
    }, 1000)
  })
}

function getStreamFromCanvas (frameRate = 30) {
  const chartCanvas = chartInstance.getDom().querySelector('canvas')
  return chartCanvas.captureStream(frameRate)
}


onMounted(() => {
  chartInstance = echarts.init(ec.value)
  const keys = Object.keys(props.data[0])
  chartInstance.setOption({
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
  const p = preview()
  const stream = getStreamFromCanvas()
  p.setStream(stream)
  // 先录制,
  // record(stream)
  chartInstance.setOption(props.opts)
})
</script>

<style scoped>
.chart {
  width: 100%;
}
</style>
