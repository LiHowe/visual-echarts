<template>
 <el-container class="app-container">
   <el-aside width="250px">
     <Settings v-model="settings" class="aside-settings" />
   </el-aside>
   <el-container class="page-content">
     <Chart :data="mockedData" :opts="settings"/>
   </el-container>
 </el-container>
</template>
<script setup>
import Settings from './components/Settings'
import Chart from './components/Chart.vue'
import {
  getBaseLegendOptions,
  getBaseTitleOptions,
  getBaseAxisOptionsY,
  getBaseAxisOptionsX
} from './echarts'
import {
  reactive
} from 'vue'

const settings = reactive({
  title: getBaseTitleOptions(),
  legend: getBaseLegendOptions(),
  xAxis: getBaseAxisOptionsX(),
  yAxis: getBaseAxisOptionsY()
})
const mockedData = reactive([
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
  height: 100%;
}
</style>
