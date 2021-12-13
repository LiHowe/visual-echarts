import {
  getBaseTitleOptions,
  getBaseLegendOptions,
  getBaseAxisOptionsX,
  getBaseAxisOptionsY,
} from '@/echarts'
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
  data: () => ({
    clonedData: {}
  }),
  methods: {
    emitChange () {
      this.$emit('input', this.value)
    },
    applySettings (attr, value) {
      console.log('变更配置, 属性:', attr, '值:', value)
      this.clonedData[attr] = value
      this.$emit('update:modelValue', this.clonedData)
    },
  },
  beforeCreate() {
    this.blocks = [
      {
        label: '标题配置',
        fn: d => this.applySettings('title', d),
        target: this.value.title,
        config: getBaseTitleOptions(true)
      },
      {
        label: '图例',
        fn: d => this.applySettings('title', d),
        target: this.value.legend,
        config: getBaseLegendOptions(true)
      },
      {
        label: 'X轴设置',
        fn: d => this.applySettings('title', d),
        target: this.value.xAxis,
        config: getBaseAxisOptionsX(true)
      },
      {
        label: 'Y轴设置',
        fn: d => this.applySettings('title', d),
        target: this.value.yAxis,
        config: getBaseAxisOptionsY(true)
      }
    ]
  },
  render: h => (
    h('aside', {
      class: 'echarts-wrapper'
    }, [
      this.blocks.map(
        ({ label, config, fn, target}) =>
          h(SettingsBlock, {
            label,
            config,
            obj: target,
            onChangeAttr: fn
          })
      )
    ])
  )
}
