import {
  defineComponent,
  reactive,
  watch
} from 'vue'
import {
  COMPONENT_TYPE
} from '../../echarts'

import './styles/settings.css'

import { nanoid } from 'nanoid'
import type {
  BaseCheckboxItem,
  BaseColorItem,
  BaseNumberItem,
  BaseSelectItem,
  BaseSliderItem,
} from '../../echarts/settingsGenerator'
import { SelectOption } from '../../echarts/utils'
import { BaseSettingItem } from '../../echarts/settingsGenerator'

export default defineComponent({
  name: 'SettingsBlock',
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
  emits: ['changeAttr'],
  setup(props, context) {

    const state = reactive({
      clonedData: props.obj
    })

    watch(
      () => props.obj,
      (val) => {
        state.clonedData = val
      }
    )

    function emit({key, value}) {
      const originData = state.clonedData[key]
      // if object, merge
      if (typeof originData === 'object') {
        value = Object.assign({}, originData, value)
      }
      state.clonedData[key] = value
      context.emit('changeAttr', state.clonedData)
    }

    function genSub (data, key) {
      return (
        <settings-block
          label={data.label}
          config={data.children}
          obj={props.obj[key]}
          onChangeAttr={value => {
            emit({ key, value })
          }}
        />
      )
    }

    function genNumberInput (data: BaseNumberItem, key: string) {
      const uid = nanoid(4)
      return (
        <div class="setting-item">
          <label class="setting-item__label" for={uid}>{ data.label }</label>
          <el-input-number size="mini" modelValue={state.clonedData[key]} id={uid} onChange={val => {
            emit({ key, value: data.dataType(val) })
          }}/>
        </div>
      )
    }

    function genSelect (data: BaseSelectItem, key: string) {
      const uid = nanoid(4)
      return (
        <div class="setting-item">
          <label class="setting-item__label" for={uid}>{ data.label }</label>
          <el-select size="mini" modelValue={state.clonedData[key]} onChange={val => {
            emit({ key, value: data.dataType(val)})
          }}>
            { genOption(data.options) }
          </el-select>
        </div>
      )
    }

    function genOption (opts: SelectOption[]) {
      return opts.map(opt => (
        <el-option key={opt.value} label={opt.label} value={opt.value} />
      ))
    }

    function genInput (data, key) {
      return (
        <div class="setting-item">
          <p class="setting-item__label">{ data.label }</p>
          <el-input type="text" size="mini" modelValue={state.clonedData[key]} onInput={(val) => {
            emit({ key, value: data.dataType(val)})
          }} />
        </div>
      )
    }

    function genCheckbox (data: BaseCheckboxItem, key: string) {
      const uid = nanoid(4)
      return (
        <div class="setting-item inline">
          <label class="setting-item__label" for={uid}>{ data.label }</label>
          <el-switch id={uid} modelValue={state.clonedData[key]} onChange={val => emit({ key, value: data.dataType(val)})} />
        </div>
      )
    }

    function genColorPicker (data: BaseColorItem, key:string) {
      return (
        <div class="setting-item">
          <p class="setting-item__label">{ data.label }</p>
          <el-color-picker size="mini" modelValue={state.clonedData[key]} onChange={val => emit({ key, value: data.dataType(val)})} />
        </div>
      )
    }

    function genSlider (data: BaseSliderItem, key: string) {
      return (
        <div class="setting-item">
          <p class="setting-item__label">{ data.label }</p>
          <el-slider modelValue={state.clonedData[key]} onChange={val => emit({ key, value: data.dataType(val)})} />
        </div>
      )
    }

    const c = props.config
    return () => (
      <el-collapse value={true}>
        <el-collapse-item title={props.label}>
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
        </el-collapse-item>
      </el-collapse>
    )
  }
})
