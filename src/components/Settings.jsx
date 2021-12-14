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
  computed: {
    blocks() {
      return [
        {
          label: '标题配置',
          fn: d => this.applySettings('title', d),
          target: this.clonedData.title,
          config: getBaseTitleOptions(true)
        },
        {
          label: '图例',
          fn: d => this.applySettings('legend', d),
          target: this.clonedData.legend,
          config: getBaseLegendOptions(true)
        },
        {
          label: 'X轴设置',
          fn: d => this.applySettings('xAxis', d),
          target: this.clonedData.xAxis,
          config: getBaseAxisOptionsX(true)
        },
        {
          label: 'Y轴设置',
          fn: d => this.applySettings('yAxis', d),
          target: this.clonedData.yAxis,
          config: getBaseAxisOptionsY(true)
        }
      ]
    }
  },
  watch: {
    value: {
      handler (val) {
        this.clonedData = val
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    applySettings (attr, value) {
      console.log('[Settings] applySettings:', attr, value)
      this.clonedData[attr] = value
      this.$emit('input', this.clonedData)
    },
  },
  render(h) {
    return (
      h('aside', {
        class: 'settings-wrapper'
      }, [
        this.blocks.map(
          ({ label, config, fn, target}) =>
            h(SettingsBlock, {
              props: {
                label,
                config,
                obj: target,
              },
              on: {
                changeAttr: fn
              }
            })
        )
      ])
    )
  }
}
