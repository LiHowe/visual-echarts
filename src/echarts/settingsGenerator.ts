// ---- COMPONENT_TYPE Settings Generator ----

import {
  genOptions,
  SelectOption
} from './utils'

export enum COMPONENT_TYPE {
  SELECT,
  INPUT,
  CHECK_BOX,
  NUMBER,
  SLIDER,
  COLOR
}

export interface BaseSettingItem<T> {
  label: string
  preset: T
}

export interface BaseCheckboxItem extends BaseSettingItem<boolean> {
  dataType: BooleanConstructor
  component: COMPONENT_TYPE.CHECK_BOX
}
export interface BaseInputItem extends BaseSettingItem<string> {
  dataType: StringConstructor
  component: COMPONENT_TYPE.INPUT
}
export interface BaseColorItem extends BaseSettingItem<string> {
  dataType: StringConstructor
  component: COMPONENT_TYPE.COLOR
}
export interface BaseSliderItem extends BaseSettingItem<number> {
  dataType: NumberConstructor,
  component: COMPONENT_TYPE.SLIDER
}

export interface BaseNumberItem extends BaseSettingItem<number> {
  dataType: NumberConstructor
  component: COMPONENT_TYPE.NUMBER
  min?: number,
  max?: number,
  step?: number
}

export interface BaseSelectItem extends BaseSettingItem<string> {
  dataType: StringConstructor
  component: COMPONENT_TYPE.SELECT
  options: SelectOption[]
}

export function baseCheckboxItem (
  label = '是否显示',
  preset = true
): BaseCheckboxItem {
  return {
    label,
    component: COMPONENT_TYPE.CHECK_BOX,
    dataType: Boolean,
    preset
  }
}

export function baseInputItem (label: string, preset = ''): BaseInputItem {
  return {
    label,
    component: COMPONENT_TYPE.INPUT,
    dataType: String,
    preset
  }
}

export function baseNumberItem (
  label: string,
  preset = 0,
  range: number[] = [],
  step = 1
): BaseNumberItem {
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
  label: string,
  preset: string,
  options: SelectOption[] | Record<string, string>[] | string[][] = []
): BaseSelectItem {
  const fOpt = options[0]
  if (typeof fOpt === 'string') {
    options = options.map(item => genOptions(item, item))
  } else if (fOpt instanceof Object && Reflect.has(fOpt, 'label')) {
    options = options.map(genOptions)
  } else if (fOpt instanceof Array) {
    options = options.map(item => {
      const [label, value] = <string[]>item
      return genOptions(label, value)
    })
  }
  return {
    label,
    component: COMPONENT_TYPE.SELECT,
    dataType: String,
    preset,
    options: (options as SelectOption[])
  }
}

export function baseColorItem (label: string, preset: string = ''): BaseColorItem {
  return {
    label,
    preset,
    component: COMPONENT_TYPE.COLOR,
    dataType: String
  }
}

export function baseSliderItem (label: string, preset: number): BaseSliderItem {
  return {
    label,
    preset,
    component: COMPONENT_TYPE.SLIDER,
    dataType: Number
  }
}
