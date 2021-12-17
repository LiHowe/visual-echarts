<template>
  <div class="data-wrapper">
    <div class="panel-block data-settings">
      <p class="panel-content">
        <span class="label">首行作为表头</span>
        <h-switch class="control" v-model="settings.firstRowAsHeader" size="small" />
      </p>
      <p class="panel-content">
        <span class="label">显示百分数</span>
        <h-switch class="control" v-model="settings.asPercent" size="small"/>
      </p>
      <p class="panel-content">
        <span class="label">保留小数位数</span>
        <h-input-number class="control" v-model="settings.decimal" size="small"/>
      </p>
    </div>
    <hot-table :data="clonedData" :settings="tableSettings" />
  </div>
</template>

<script>
import { HotTable } from '@handsontable/vue'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/dist/handsontable.full.css'

registerAllModules()

export default {
  name: 'Data',
  props: {
    value: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  components: {
    HotTable
  },
  data: () => ({
    clonedData: [],
    settings: {
      firstRowAsHeader: false,
      asPercent: false,
      decimal: 2
    },
    tableSettings: {}
  }),
  watch: {
    value: {
      handler(val) {
        this.clonedData = val
      },
      deep: true,
      immediate: true
    }
  },
  mounted() {
  },
  created() {
    this.tableSettings = {
      data: this.clonedData,
      rowHeaders: true,
      colHeaders: true,
      licenseKey: 'non-commercial-and-evaluation',
      minRows: 15,
      minCols: 8
    }
  },
  methods: {
    handleDataChange () {
      console.log('Data emit change:', this.clonedData)
      this.$emit('change', this.clonedData)
    }
  }
}
</script>

<style scoped >
.data-wrapper {
  width: 100%;
  height: 100%;
}
.data-settings {
  margin-bottom: 10px;
}
</style>
