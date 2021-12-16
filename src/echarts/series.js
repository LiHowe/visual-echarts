import { simplifyOptions } from '@/echarts/utils'
import {
  baseColorItem,
  baseHiddenItem,
  baseNumberItem,
  baseSelectItem, customCheckboxItem,
} from '@/echarts/settingsGenerator'

export function getBaseSeriesOptions ({
  type
}) {
  return {
    type: baseHiddenItem(type)
  }
}

export function getBarSeriesOptions (detail = false) {
  const base = {
    ...getBaseSeriesOptions('bar'),
    itemStyle: {
      label: '图形样式',
      children: {
        borderColor: baseColorItem({
          label: '描边颜色',
          preset: '#000'
        }),
        borderWidth: baseNumberItem({
          label: '描边宽度',
          preset: 0,
          step: 0.5,
          range: [0]
        }),
        borderType: baseSelectItem({
          label: '描边类型',
          preset: 'solid',
          options: [
            ['实线', 'solid'],
            ['虚线', 'dashed'],
            ['点线', 'dotted'],
          ]
        }),
        borderRadius: baseNumberItem({
          label: '圆角半径',
          step: 1,
          preset: 0,
        }).hiddenWhen(opt => !!opt._borderRadius),
        _borderRadius: customCheckboxItem({
          label: '分别设置圆角半径'
        })
      }
    }
  }
  if (!detail) {
    return simplifyOptions(base)
  }
  return base
}

export function getLineSeriesOptions () {

}

export function getPieSeriesOptions () {

}
