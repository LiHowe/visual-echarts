<template>
  <!-- NOTE: 由于echarts未提供subtitle的位置设置, 所以采用graphic实现副标题 -->
  <div class="panel-block">
    <p class="panel-content">
      <span class="label">显示单位</span>
      <h-switch
        size="small"
        class="control"
        v-model="value.graphic[1].invisible"
        :true-value="false"
        :false-value="true"
      />
    </p>
    <template v-if="!selfGraphic.invisible">
      <p class="panel-content">
        <span class="label">单位名称</span>
        <h-input v-model="selfGraphic.style.text" size="small"/>
      </p>
      <p class="panel-content">
        <span class="label">单位位置</span>
        <span class="control group">
          <span>
            x: <h-input-number v-model="selfGraphic.style.x" size="small" :step="1"/>
          </span>
          <span>
            y: <h-input-number v-model="selfGraphic.style.y" size="small" :step="1"/>
          </span>
        </span>
      </p>
      <p class="panel-content">
        <span class="label">单位字体</span>
        <h-select class="control" :value="fontStyle.family" size="small" @on-change="changeFamily">
          <h-option
            v-for="item in fontFamilies"
            :value="item.value"
            :key="item.value"
          >{{ item.label }}</h-option>
        </h-select>
      </p>
      <p class="panel-content">
        <span class="label">单位字号</span>
        <h-input-number :min="10" :value="fontStyle.size" size="small" @input="changeSize"/>
      </p>
    </template>
  </div>
</template>

<script>
import { fontFamilies } from '@/biz/utils'

export default {
  name: 'Subtitle',
  props: {
    value: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data: () => ({
    fontFamilies
  }),
  computed: {
    chartOption() {
      if (!this.chart || !this.chart.getOption) return null
      return this.chart.getOption()
    },
    graphic () {
      if (!this.chartOption) return null
      return (id) => this.chartOption.graphic.find(item => item.id === id)
    },
    selfGraphic () {
      return this.value.graphic.find(item => item.id === 'subtitle') || { invisible: true }
    },
    fontStyle () {
      const fontCSS = this.selfGraphic.style.font
      // 约定样式循序为: size | family | weight
      const arr = fontCSS.split(' ')
      let [ size, family ] = arr
      size = +size.match(/\d+/)[0]
      return {
        size,
        family
      }
    }
  },
  methods: {
    changeFamily (family) {
      const { size } = this.fontStyle
      this.selfGraphic.style.font = `${size}px ${family}`
    },
    changeSize (size) {
      const { family } = this.fontStyle
      this.selfGraphic.style.font = `${size}px ${family}`
      console.log('changeSize', this.value)
    }
  }
}
</script>

<style scoped>

</style>
