<template>
  <aside class="settings-wrapper">
    <SettingsBlock
      label="标题配置"
      :obj="value.title"
      :config="getBaseTitleOptions(true)"
      @change-attr="d => applySettings('title', d)"
    />
    <SettingsBlock
      label="图例"
      :obj="value.legend"
      :config="getBaseLegendOptions(true)"
      @change-attr="d => applySettings('legend', d)"
    />
  </aside>
</template>

<script>
import { getBaseTitleOptions, getBaseLegendOptions } from '@/settings'
import SettingsBlock from "@/components/SettingsBlock";

export default {
  name: "Settings",
  components: {
    SettingsBlock
  },
  props: {
    value: {
      type: Object,
      default: () => ({}),
    }
  },
  methods: {
    emitChange () {
      this.$emit('input', this.value)
    },
    applySettings (attr, value) {
      this.$set(this.value, attr, value)
      this.emitChange()
    },
    getBaseTitleOptions,
    getBaseLegendOptions
  }
}
</script>

<style scoped>
.settings-wrapper {
  padding: 5px 10px;
  box-shadow: 1px 0 4px 0 #e5e5e5;
  background: #f9f9f9;
}
</style>
