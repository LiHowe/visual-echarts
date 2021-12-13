import { simplifyOptions } from './utils'
import {baseCheckboxItem, baseColorItem, baseNumberItem} from "./settingsGenerator";
import { getPositionOptions } from './common'

export function getBaseGridOptions (detail = false) {
  const base = {
    ...getPositionOptions(),
    show: baseCheckboxItem(),
    containLabel: baseCheckboxItem(),
    backgroundColor: baseColorItem('背景颜色', 'rgba(0,0,0,0)'),
    borderWidth: baseNumberItem('边框粗细', 1),
    borderColor: baseColorItem('边框颜色', '#ccc')
  }
  if (!detail) {
    return simplifyOptions(base)
  }
  return base
}
