import { COMPONENT_TYPE } from '@/echarts';
import {
  genCheckbox,
  genColorPicker,
  genInput,
  genNumberInput,
  genSelect,
  genSlider,
} from '@/components/SettingsBlock/utils'
import './index.css'

export default {
  name: 'SettingBlock',
  props: {
    label: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({}),
      required: true
    },
    // 对应echarts的options的属性
    obj: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  methods: {
    changeSelect({ target }, data, key) {
      this.emit({
        key,
        value: data.dataType[0](target.options[target.selectedIndex].value)
      })
    },
    changeCheckbox({ target }, data, key) {
      this.emit({
        key,
        value: data.dataType[0](target.checked)
      })
    },
    changeInput({ target }, data, key) {
      this.emit({
        key,
        value: data.dataType[0](target.value)
      })
    },
    emit({key, value}) {
      const originData = this.obj[key]
      // if object, merge
      if (typeof originData === 'object') {
        value = Object.assign({}, originData, value)
      }
      this.$set(this.obj, key, value)
      this.$emit('change-attr', this.obj)
    }
  },
  render() {
    const c = this.config
    function genSub (data, key) {
      return (
        <setting-block
          obj={this.obj[key]}
          config={data.children}
          label={data.label}
          onChangeAttr={value => {
            this.$emit({ key, value })
          }}
        />
      )
    }

    return (
      <ul class="settings-block">
        <div class="title">{ this.label }</div>
        <ul>
          {
            Object.keys(c).map(key => {
              const d = c[key]
              if (d.children) {
                return genSub(d, key)
              }
              switch (d.component) {
                case COMPONENT_TYPE.SELECT:
                  return genSelect(d, key)
                case COMPONENT_TYPE.INPUT:
                  return genInput(d, key)
                case COMPONENT_TYPE.CHECK_BOX:
                  return genCheckbox(d, key)
                case COMPONENT_TYPE.NUMBER:
                  return genNumberInput(d, key)
                case COMPONENT_TYPE.COLOR:
                  return genColorPicker(d, key)
                case COMPONENT_TYPE.SLIDER:
                  return genSlider(d, key)
              }
            })
          }
        </ul>
      </ul>
    )
  }
}
