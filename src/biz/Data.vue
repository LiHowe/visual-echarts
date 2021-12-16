<template>
  <div class="data-wrapper">
    <div ref="table"></div>
  </div>
</template>

<script>
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'
export default {
  name: 'Data',
  props: {
    value: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  data: () => ({
    clonedData: []
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
    this.initTable()
  },
  methods: {
    initTable () {
      const t = new Handsontable(this.$refs.table, {
        data: this.clonedData,
        rowHeaders: true,
        colHeaders: true,
        licenseKey: 'non-commercial-and-evaluation'
      })
      t.addHook('beforeChange', (changes, source) => {
        console.log('beforeChange', changes, source)
        changes[0][3] = Number(changes[0][3])
      })
      t.addHook('afterChange', (changes) => {
        console.log('sheet changed', changes)
        this.clonedData = t.getSourceData()
        this.handleDataChange()
      })
    },
    handleDataChange () {
      console.log('Data emit change:', this.clonedData)
      this.$emit('change', this.clonedData)
    }
  }
}
</script>

<style scoped >
.data-wrapper {

}
</style>
