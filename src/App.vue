<template>
  <div id="app">
    <chart-picker @changeType="t => this.chartType = t" />
    <div class="page-content" ref="content">
      <Chart
        ref="chart"
        :dimensions="['product', '2015', '2016', '2017']"
        :opts.sync="settings"
        :data="mockedData"
        :chart-type="chartType"
        :before-set-option="grabFrame"
      />
      <Player :stream="stream" :size="playerSize" :range="$refs.content" debug/>
    </div>
    <Settings
      :data="mockedData"
      :opt="settings"
      :chart="$refs.chart"
      @dataChanged="d => this.mockedData = d"
      @optionChanged="opt => this.settings = opt"
    />
  </div>
</template>

<script>
import Player from '@/components/Player'
import Settings from '@/biz/Settings'
import Chart from '@/components/Chart'
import ChartPicker from '@/components/ChartPicker'

// import {
//   getBaseTitleOptions,
//   getBaseLegendOptions,
//   getBaseAxisOptionsY,
//   getBaseAxisOptionsX,
//   getBaseOptions,
// } from '@/echarts'


const globalLabelColor = '#000'

const settings = {
  title: {
    show: true,
    text: '标题',
    left: 0,
    top: 0,
    textStyle: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      color: globalLabelColor
    },
  },
  legend: {
    show: true,
    textStyle: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      color: globalLabelColor
    }
  },
  xAxis: {
    show: true,
    axisLabel: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      color: globalLabelColor,
      formatter: val => val
    }
  },
  yAxis: {
    show: true,
    axisLabel: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      color: globalLabelColor,
      formatter: val => val
    }
  },
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  _theme: 'theme1',
  backgroundColor: 'transparent',
  graphic: [
    {
      type: 'image',
      id: 'bg',
      left: 'center',
      x: 0,
      y: 0,
      bounding: 'all',
      silent: true,
      invisible: false,
      style: {
        image: '',
        x: 0,
        y: 0,
      }
    },
    {
      type: 'text',
      id: 'subtitle',
      x: 5,
      y: 30,
      silent: true,
      invisible: false,
      style: {
        text: '单位',
        x: 0,
        y: 0,
        font: '15px sans-serif'
      }
    }
  ],
  animationDuration: 1000,
  animationDelay: idx => idx * 300
}

const mockedData = [
  ['product', '2015', '2016', '2017'],
  ['Matcha Latte', 43.3, 85.8, 93.7],
  ['Milk Tea', 83.1, 73.4, 55.1],
  ['Cheese Cocoa', 86.4, 65.2, 82.5],
  ['Walnut Brownie', 72.4, 53.9, 39.1]
]

export default {
  name: 'App',
  components: {
    Player,
    Settings,
    Chart,
    ChartPicker
  },
  data: () => ({
    settings,
    mockedData,
    stream: new MediaStream(),
    chartType: 'bar',
    playerSize: {
      h: 180,
      w: 300
    }
  }),
  methods: {
    grabFrame(ec) {
      const canvas = ec.getDom().querySelector('canvas')
      this.stream = canvas.captureStream(60)
      this.playerSize.w = canvas.width / 2
      this.playerSize.h = canvas.height / 2
    }
  }
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
  grid-template-columns: 250px auto 250px;
}
* {
  box-sizing: border-box;
}
/*
.settings-wrapper {
  box-shadow: 2px 0 4px #e9e9e9;
  background: #ebebeb;
  padding: 10px;
  height: 100%;
  width: 100%;
  overflow-x: visible;
  overflow-y: auto;
  position: relative;
}
*/
.page-content {
  position: relative;
}
</style>
