import {
  simplifyOptions,
} from './utils'
import {
  baseCheckboxItem, baseSelectItem,
} from './settingsGenerator'


export function getBaseLegendOptions(detail = false) {
  const base = {
    show: baseCheckboxItem({ label: '显示图例' }),
    left: baseSelectItem({
      label: '对齐方式',
      preset: 'auto',
      options: [
        ['自动', 'auto'],
        ['居左', 'left'],
        ['居中', 'center'],
        ['居右', 'right']
      ],
    }),
  }
  if (!detail) {
    return simplifyOptions(base)
  }
  return base
}
