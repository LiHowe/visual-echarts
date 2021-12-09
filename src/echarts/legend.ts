import {
  simplifyOptions
} from './utils'
import {
  baseCheckboxItem, baseSelectItem
} from './settingsGenerator'


export function getBaseLegendOptions(detail = false) {
  const base = {
    show: baseCheckboxItem('显示图例'),
    left: baseSelectItem('对齐方式', 'auto', [
      ['自动', 'auto'],
      ['居左', 'left'],
      ['居中', 'center'],
      ['居右', 'right']
    ])
  }
  if (!detail) {
    return simplifyOptions(base)
  }
  return base
}
