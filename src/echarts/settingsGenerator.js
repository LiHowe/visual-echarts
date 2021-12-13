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

export function baseCheckboxItem (
  label = '是否显示',
  preset = true
) {
  return {
    label,
    component: COMPONENT_TYPE.CHECK_BOX,
    dataType: Boolean,
    preset
  }
}

export function baseInputItem (label, preset = '') {
  return {
    label,
    component: COMPONENT_TYPE.INPUT,
    dataType: String,
    preset
  }
}

export function baseNumberItem (
  label,
  preset = 0,
  range = [],
  step = 1
) {
  const [min, max] = range
  return {
    label,
    component: COMPONENT_TYPE.NUMBER,
    dataType: Number,
    preset,
    min,
    max,
    step
  }
}

export function baseSelectItem (
  label,
  preset,
  options
) {
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
  return {
    label,
    component: COMPONENT_TYPE.SELECT,
    dataType: String,
    preset,
    options
}
}

export function baseColorItem (label, preset) {
  return {
    label,
    preset,
    component: COMPONENT_TYPE.COLOR,
    dataType: String
  }
}

export function baseSliderItem (label, preset) {
  return {
    label,
    preset,
    component: COMPONENT_TYPE.SLIDER,
    dataType: Number
  }
}
