<template>
  <div class="app-container">
    <div CLASS="page-content">
      <div class="chart-content">
        <tool-bar :config="chartConfig" @changeConfig="({k, v}) => chartConfig[k] = v"/>
        <Chart :data="mockedData" :opts="settings" :config="chartConfig"/>
      </div>
      <data-sheet class="data-content" :model-value="mockedData" @dataChange="changeData" />
    </div>
    <Settings v-model="settings" class="aside-settings" />
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
  yAxis: getBaseAxisOptionsY(),
  animationDelay: idx => idx * 500,
  animationDuration: 2000
})
const mockedData = ref([
  {
    year: '20岁',
    q1: 100,
    q2: 300,
    q3: 150,
  },
  {
    year: '35岁',
    q1: 420,
    q2: 530,
    q3: 680,
  },
  {
    year: '40岁',
    q1: 420,
    q2: 840,
    q3: 850,
  },
  {
    year: '50岁',
    q1: 420,
    q2: 1640,
    q3: 1650,
  },
  {
    year: '60岁',
    q1: 420,
    q2: 2440,
    q3: 2450,
  },
  {
    year: '80岁',
    q1: 420,
    q2: 3350,
    q3: 3350,
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
  --sider-width: 300px;
  width: 100vw;
  height: 100vh;
  display: grid;
  overflow: hidden;
  grid-template-columns: auto var(--sider-width);
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
.chart-content {
  width: 100%;
  overflow: hidden;
}
.data-content {
  max-width: calc(100vw - var(--sider-width));
  height: 300px;
}
.page-content {
  --data-width: 300px;
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-rows: calc(100% - var(--data-width)) var(--data-width);
}
</style>
