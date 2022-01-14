<template>
  <div class="chart" ref="ec"></div>
</template>

<script setup lang="ts">
import {computed, nextTick, onMounted, reactive, ref, watch} from 'vue'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { getSeriesPosition } from '../../echarts/utils'
import Tooltip from '../../assets/tooltip.png'


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
    console.log('[图表] 配置变更, 配置为', val)
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
    }, 3000)
  })
}

function getStreamFromCanvas (frameRate = 25) {
  const chartCanvas = chartInstance.getDom().querySelector('canvas')
  return chartCanvas.captureStream(frameRate)
}


type GraphConfig = {
  width: number,
  height: number,
  text: string,
  pos: number[], // [seriesIdx, barIdx]
  offset?: number[] // [offsetX, offsetY]
}

function setChartGraph (chart: ECharts, config: GraphConfig) {
  const { width, height, text, pos=[0, 0], offset = [0, 0] } = config
  const { x, y } = getSeriesPosition(chart, pos)
  const [offsetX, offsetY] = offset
  chart.setOption({
    graphic: [
      {
        id: 'tooltip',
        type: 'group',
        left: x - width/2 + offsetX,
        top: y - height + offsetY,
        width,
        height,
        silence: true,
        z: 1,
        children: [
          {
            type: 'image',
            style: {
              image: Tooltip,
              width,
              height,
            }
          },
          {
            type: 'text',
            style: {
              fill: '#8d48e3',
              x: width / 4,
              y: height / 10,
              text: text,
              font: '24px Microsoft YaHei'
            }
          }
        ]
      }
    ]
  })
  let i = -1
  let step = 1

  const inter = setInterval(() => {
    i += step
    if (i >= 10) {
      step = -1
    }
    if (i <= 0) {
      step = 1
    }
    chart.setOption({
      graphic: [
        {
          id: 'tooltip',
          top: y - height + offsetY - i
        }
      ]
    })
  }, 50)
  setTimeout(() => {
    clearInterval(inter)
  }, 2 * 1000)
}


onMounted(() => {
  const search = window.location.search === '?node'
  chartInstance = echarts.init(ec.value)
  const keys = Object.keys(props.data[0])
  const img = document.createElement('img')
  const yellowBar = 'data:image/png;base64,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'
  const blueBar = 'data:image/png;base64,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'
  const purpleBar = 'data:image/png;base64,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'
  const symbols = [yellowBar, purpleBar, blueBar]
  chartInstance.setOption({
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: Array.from(new Array(keys.length - 1), (item, idx) => ({
      type: 'pictorialBar',
      symbol: 'image://' + symbols[idx % 3],
      symbolClip: true,
      symbolSize: ['100%', '100%'],
      symbolPosition: 'start',
      barGap: '-30%'
    })),
    animationDuration: 3000,
  })
  const stream = getStreamFromCanvas()
  // 先录制,
  search && record(stream)
  nextTick(() => {
    chartInstance.setOption({
      dataset: {
        dimensions: keys,
        source: props.data
      },
    })
    let manualTriggered = true
    chartInstance.on('finished', () => {
      if (manualTriggered) {
        manualTriggered = false
        const graphConfig = {
          width: 200,
          height: 100,
          text: [
            '12.34万元',
            '现金价值'
          ].join('\n'),
          pos: [1, 3]
        }
        setChartGraph(chartInstance, graphConfig)
      }
    })
  })
  const p = preview()
  p.setStream(stream)
  chartInstance.setOption(props.opts)
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
