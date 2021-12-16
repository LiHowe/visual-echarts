<template>
  <div class="settings-wrapper">
    <h-tabs class="settings-wrapper__header" v-model="current">
      <h-tab-pane label="样式属性" name="options" />
      <h-tab-pane label="数据编辑" name="data" />
    </h-tabs>
    <div class="settings-wrapper__content">
      <DataEdit v-if="isData" :value="data" @change="handleDataChange" />
      <Options v-else :value="opt" @change="handleOptionsChange"/>
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
  height: 100%;
}
</style>
