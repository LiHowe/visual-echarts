<template>
  <div class="app-container">
    <Settings v-model="settings" class="aside-settings" />
    <div class="page-content">
      <tool-bar :config="chartConfig" @changeConfig="({k, v}) => chartConfig[k] = v"/>
      <Chart :data="mockedData" :opts="settings" :config="chartConfig"/>
      <data-sheet :model-value="mockedData" @dataChange="changeData" />
    </div>
  </div>
</template>
<script setup>
import Settings from './components/Settings'
import Chart from './components/Chart/index.vue'
import ToolBar from './components/Chart/ToolBar.vue'
import DataSheet from './components/Data/index.vue'
import {
  getBaseLegendOptions,
  getBaseTitleOptions,
  getBaseAxisOptionsY,
  getBaseAxisOptionsX
} from './echarts'
import {
  reactive,
  ref
} from 'vue'

const settings = reactive({
  title: getBaseTitleOptions(),
  legend: getBaseLegendOptions(),
  xAxis: getBaseAxisOptionsX(),
  yAxis: getBaseAxisOptionsY()
})
const mockedData = ref([
  {
    year: '2010',
    q1: 100,
    q2: 200,
    q3: 150,
    q4: 300
  },
  {
    year: '2011',
    q1: 120,
    q2: 230,
    q3: 180,
    q4: 350
  },
  {
    year: '2012',
    q1: 200,
    q2: 140,
    q3: 350,
    q4: 500
  }
])

const chartConfig = reactive({
  showCode: false
})

function changeData(data) {
  console.log('[APP] 数据改变,', data)
  mockedData.value = data
}

</script>
<style>
html,
body {
  padding: 0;
  margin: 0;
}
</style>
<style scoped>
.app-container {
  width: 100vw;
  height: 100vh;
  display: grid;
  overflow: hidden;
  grid-template-columns: 250px auto;
}
.aside-settings {
  width: 100%;
  height: 100%;
  overflow: visible;
}
.settings-wrapper {
  padding: 5px 10px;
  box-shadow: 1px 0 4px 0 #e5e5e5;
  background: #f9f9f9;
  overflow: hidden auto;
  box-sizing: border-box;
}
.page-content {
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: 30px auto 30%;
}
</style>
