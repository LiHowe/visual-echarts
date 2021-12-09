<template>
  <div class="chart" ref="ec"></div>
</template>

<script setup>
import {onMounted, reactive, ref, watch} from 'vue'
import * as echarts from 'echarts'

const ec = ref(null)

const data = reactive({
  chartInstance: null
})

const props = defineProps({
  opts: {
    type: Object,
    default: () => ({})
  },
  data: {
    type: Array,
    default: () => ([])
  }
})

watch(
  () => props.opts,
  val => {
    console.log('enter chart options', val)
    data.chartInstance.setOption(val)
  },
  {
    deep: true
  }
)

onMounted(() => {
  data.chartInstance = echarts.init(ec.value)
  data.chartInstance.setOption({
    xAxis: {
      type: 'category',
    },
    yAxis: {
      type: 'value'
    },
    series: [
      { type: 'line' },
      { type: 'line' },
      { type: 'line' }
    ],
    dataset: {
      dimensions: Object.keys(props.data[0]),
      source: props.data
    }
  })
  data.chartInstance.setOption(props.opts)
})
</script>

<style scoped>
.chart {
  width: 100%;
  height: 100%;
}
</style>
