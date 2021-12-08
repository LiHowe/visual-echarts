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
import Settings from '@/components/Settings'
import Chart from '@/components/Chart'
import { getBaseTitleOptions } from '@/settings'

const settings = {
  title: getBaseTitleOptions()
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
  }),
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
  grid-template-columns: 25% 75%;
}
</style>
