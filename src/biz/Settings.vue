<template>
  <div class="settings-wrapper">
    <h-tabs class="settings-wrapper__header" v-model="current">
      <h-tab-pane label="样式属性" name="options" />
      <h-tab-pane label="数据编辑" name="data" />
    </h-tabs>
    <div class="settings-wrapper__content">
      <DataEdit v-if="isData" :value="data" :chart="chart" @change="handleDataChange" />
      <Options v-else :value="opt" :chart="chart" @change="handleOptionsChange"/>
    </div>
  </div>
</template>

<script>
import DataEdit from '@/biz/Data'
import Options from '@/biz/Options'
export default {
  name: 'settings',
  components: {
    DataEdit,
    Options
  },
  props: {
    opt: {
      type: Object,
      default: () => ({})
    },
    data: {
      type: Array,
      default: () => ([])
    },
    // echarts实例, 为了多图表控制
    chart: {
      type: Object,
      default: () => ({})
    }
  },
  data: () => ({
    current: 'options', // or 'data'
  }),
  computed: {
    isData() {
      return this.current === 'data'
    }
  },
  methods: {
    handleDataChange (d) {
      console.log('Setting handle data change', d)
      this.$emit('dataChanged', d)
    },
    handleOptionsChange (opt) {
      this.$emit('optionChanged', opt)
    }
  }
}
</script>

<style scoped>
.settings-wrapper {

}
.settings-wrapper__content {
  width: 100%;
  min-height: 50%;
  overflow: auto;
}
/deep/.panel-block + .panel-block {
  margin-top: 10px;
}
/deep/.panel-content {
  display: grid;
  grid-template-columns: 80px auto;
  align-content: space-between;
  align-items: center;
  line-height: 2;
}
/deep/.panel-content + .panel-content {
  margin-top: 5px;
}
/deep/.panel-content .label {
  font-weight: bold;
}
/deep/.control.group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 10px;
}
/deep/.panel-content .h-input-number {
  width: 100%;
}
/deep/.panel-content .control {
  justify-self: end;
}
</style>
