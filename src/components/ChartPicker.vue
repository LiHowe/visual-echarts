<template>
  <div class="chart-picker">
    <button @click="addChart">新建图表</button>

    <button @click="changeChartType('pie')">饼图</button>
    <button @click="changeChartType('bar')">柱状图</button>
    <button @click="changeChartType('line')">折线图</button>
  </div>
</template>

<script>

export default {
  name: 'ChartPicker',
  data: () => ({

  }),
  methods: {
    changeChartType (type) {
      this.$emit('changeType', type)
    },
    addChart () {

    }
  }
}
</script>

<style scoped>

</style>
