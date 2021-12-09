import {
  getBaseTitleOptions,
  getBaseLegendOptions,
  getBaseAxisOptionsX,
  getBaseAxisOptionsY
} from '../../echarts'
import SettingsBlock from './SettingsBlock'
import {
  reactive,
  watch,
  defineComponent,
  h
} from 'vue'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup(props, c) {

    const state = reactive({
      clonedData: {}
    })

    watch(
      () => props.modelValue,
      (val) => {
        state.clonedData = val
      }
    )

    function applySettings (attr: string, value: unknown) {
      console.log('变更配置, 属性:', attr, '值:', value)
      state.clonedData[attr] = value
      c.emit('update:modelValue', state.clonedData)
    }

    const blocks = [
      {
        label: '标题配置',
        fn: d => applySettings('title', d),
        target: props.modelValue.title,
        config: getBaseTitleOptions(true)
      },
      {
        label: '图例',
        fn: d => applySettings('title', d),
        target: props.modelValue.legend,
        config: getBaseLegendOptions(true)
      },
      {
        label: 'X轴设置',
        fn: d => applySettings('title', d),
        target: props.modelValue.xAxis,
        config: getBaseAxisOptionsX(true)
      },
      {
        label: 'Y轴设置',
        fn: d => applySettings('title', d),
        target: props.modelValue.yAxis,
        config: getBaseAxisOptionsY(true)
      }
    ]
    return () => (
      h('aside', {
        class: 'settings-wrapper'
      }, [
        blocks.map(
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
})
