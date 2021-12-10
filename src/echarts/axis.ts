import {
  simplifyOptions,
} from './utils'
import {
  baseCheckboxItem, baseColorItem,
  baseInputItem,
  baseNumberItem,
  baseSelectItem
} from './settingsGenerator'

export function getBaseAxisOptionsX (detail = false) {
  const base = {
    ...getBaseAxisOptions(),
    // For xAxis custom attrs
    position: baseSelectItem('坐标轴位置', 'bottom', [
      ['顶部', 'top'],
      ['底部', 'bottom'],
    ]),
  }
  if (!detail) return simplifyOptions(base)
  return base
}

export function getBaseAxisOptionsY (detail = false) {
  const base = {
    ...getBaseAxisOptions(),
    // For yAxis custom attrs
    position: baseSelectItem('坐标轴位置', 'left', [
      ['左侧', 'left'],
      ['右侧', 'right'],
    ]),
  }
  if (!detail) return simplifyOptions(base)
  return base
}

function getBaseAxisOptions () {
  return {
    show: baseCheckboxItem('显示坐标轴'),
    axisLine: {
      label: '轴线设置',
      children: {
        show: baseCheckboxItem('显示轴线'),
        lineStyle: {
          label: '轴线样式设置',
          children: {
            color: baseColorItem('轴线颜色', '#333')
          }
        }
      }
    },
    axisTick: {
      label: '轴线刻度设置',
      children: {
        show: baseCheckboxItem('显示刻度', false),
        inside: baseCheckboxItem('刻度朝内'),
        length: baseNumberItem('刻度长度', 5, [0, 100], 1),
        lineStyle: {
          label: '刻度样式设置',
          children: {
            color: baseColorItem('刻度颜色', '#333'),
            width: baseNumberItem('刻度宽度', 1),
            type: baseSelectItem('刻度线类型', 'solid',[
              ['实线', 'solid'],
              ['虚线', 'dashed'],
              ['点线', 'dotted']
            ])
          }
        }
      }
    },
    axisLabel: {
      label: '刻度标签设置',
      children: {
        show: baseCheckboxItem('显示标签'),
        rotate: baseNumberItem('标签旋转', 0, [0, 360]),
        margin: baseNumberItem('标签与轴线间距', 8),
        color: baseColorItem('标签颜色', '#333'),
        fontStyle: baseSelectItem('字体风格', 'normal', [
          ['标准', 'normal'],
          ['斜体', 'italic'],
        ]),
        fontWeight: baseSelectItem('文字粗细', 'normal', [
          ['正常', 'normal'],
          ['加粗', 'bold'],
          ['最粗', 'bolder'],
          ['较细', 'lighter'],
        ]),
        fontSize: baseNumberItem('字体大小', 12)
      }
    }
  }

}

