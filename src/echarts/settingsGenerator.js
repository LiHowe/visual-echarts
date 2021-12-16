// ---- COMPONENT_TYPE Settings Generator ----

import {
  genOptions
} from './utils'

export const COMPONENT_TYPE = {
  SELECT: 0,
  INPUT: 1,
  CHECK_BOX: 2,
  NUMBER: 3,
  SLIDER: 4,
  COLOR: 5
}

function baseItem (config) {
  return {
    ...config,
    hidden: () => false,
    disabled: () => false,
    setHidden(fn) {
      this.hidden = fn
      return this
    }
  }
}


export function baseCheckboxItem ({
  label = '是否显示',
  preset = true,
}) {
  return baseItem({
    label,
    component: COMPONENT_TYPE.CHECK_BOX,
    dataType: Boolean,
    preset
  })
}

/**
 * 自定义点选框
 * 用于控制虚拟属性(非echarts属性)
 */
export function customCheckboxItem ({
  label,
  preset = false,
  handler = () => {}
}) {
  return baseItem({
    label,
    component: COMPONENT_TYPE.CHECK_BOX,
    dataType: Boolean,
    preset,
    handler,
    trigger: () => false
  })
}


export function baseInputItem ({
  label,
  preset = ''
}) {
  return baseItem({
    label,
    component: COMPONENT_TYPE.INPUT,
    dataType: String,
    preset
  })
}

export function baseNumberItem ({
  label,
  preset = 0,
  range = [],
  step = 1,
}) {
  const [min, max] = range
  return baseItem({
    label,
    component: COMPONENT_TYPE.NUMBER,
    dataType: Number,
    preset,
    min,
    max,
    step
  })
}

export function customNumberItem({
  label,
  preset,
  range = [],
  step = 1,
  handler
}) {
  return {
    ...baseNumberItem({ label, preset, range, step }),
    handler
  }
}

export function baseSelectItem ({
  label,
  preset,
  options,
}) {
  const fOpt = options[0]
  if (typeof fOpt === 'string') {
    options = options.map(item => genOptions(item, item))
  } else if (fOpt instanceof Object && Reflect.has(fOpt, 'label')) {
    options = options.map(genOptions)
  } else if (fOpt instanceof Array) {
    options = options.map(item => {
      const [label, value] = item
      return genOptions(label, value)
    })
  }
  return baseItem({
    label,
    component: COMPONENT_TYPE.SELECT,
    dataType: String,
    preset,
    options
  })
}

export function baseColorItem ({
  label,
  preset
}) {
  return baseItem({
    label,
    preset,
    component: COMPONENT_TYPE.COLOR,
    dataType: String
  })
}

export function baseSliderItem ({
  label,
  preset
}) {
  return baseItem({
    label,
    preset,
    component: COMPONENT_TYPE.SLIDER,
    dataType: Number
  })
}

/**
 * 隐藏框
 * @param arg
 */
export function baseHiddenItem (arg) {
  return baseItem({
    preset: arg,
    hidden: () => true
  })
}

// export function baseConnectItem (config, connection) {
//   return {
//
//   }
// }
