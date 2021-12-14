<template>
  <div id="app">
    <Settings v-model="settings" />
    <div>
      <Player />
      <Chart :opts="settings" :data="mockedData"/>
    </div>
  </div>
</template>

<script>
import Player from '@/components/Player'
import Settings from '@/components/Settings.jsx'
import Chart from '@/components/Chart'
import {
  getBaseTitleOptions,
  getBaseLegendOptions,
  getBaseAxisOptionsY,
  getBaseAxisOptionsX
} from '@/echarts'

const settings = {
  title: getBaseTitleOptions(),
  legend: getBaseLegendOptions(),
  xAxis: getBaseAxisOptionsX(),
  yAxis: getBaseAxisOptionsY()
}

const mockedData = [
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
]

export default {
  name: 'App',
  components: {
    Player,
    Settings,
    Chart
  },
  data: () => ({
    settings,
    mockedData
  })
}
</script>

<style>
html, body {
  padding: 0;
  margin: 0;
}
#app {
  height: 100vh;
  width: 100vw;
  display: grid;
  grid-template-columns: 250px auto;
}
* {
  box-sizing: border-box;
}
.settings-wrapper {
  box-shadow: 2px 0 4px #e9e9e9;
  background: #ebebeb;
  padding: 10px;
  height: 100%;
  width: 100%;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
