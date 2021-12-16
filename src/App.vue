<template>
  <div id="app">
    <chart-picker @changeType="t => this.chartType = t" />
    <div class="page-content" ref="content">
      <Chart
        :dimensions="['product', '2015', '2016', '2017']"
        :opts="settings"
        :data="mockedData"
        :chart-type="chartType"
        :before-set-option="grabFrame"
      />
      <Player :stream="stream" :size="playerSize" :range="$refs.content" debug/>
    </div>
    <Settings
      :data="mockedData"
      :opt="settings"
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
    text: '标题',
    textStyle: {
      fontFamily: 'sans-serif',
      fontSize: 18,
      color: globalLabelColor
    },
    subtext: '单位',
    subtextStyle: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      color: globalLabelColor
    }
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
      color: globalLabelColor
    }
  },
  yAxis: {
    show: true,
    axisLabel: {
      fontFamily: 'sans-serif',
      fontSize: 12,
      color: globalLabelColor
    }
  },
  color: ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc'],
  _theme: 'theme1',
  backgroundColor: 'transparent',
  graphic: [{
    type: 'image',
    id: 'bg',
    left: 'center',
    x: 0,
    y: 0,
    bounding: 'all',
    style: {
      image: '',
      x: 0,
      y: 0,
    }
  }]
}

const mockedData = [
  { product: 'Matcha Latte', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
  { product: 'Milk Tea', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
  { product: 'Cheese Cocoa', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
  { product: 'Walnut Brownie', '2015': 72.4, '2016': 53.9, '2017': 39.1 }
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
