import {
  simplifyOptions,
} from './utils'
import {
  baseCheckboxItem, baseColorItem,
  baseNumberItem,
  baseSelectItem,
} from './settingsGenerator'

export function getBaseAxisOptionsX(detail = false) {
  const base = {
    ...getBaseAxisOptions(),
    // For xAxis custom attrs
    position: baseSelectItem({
      label: '坐标轴位置',
      preset: 'bottom',
      options: [
        ['顶部', 'top'],
        ['底部', 'bottom'],
      ],
    }),
  }
  if (!detail) return simplifyOptions(base)
  return base
}

export function getBaseAxisOptionsY(detail = false) {
  const base = {
    ...getBaseAxisOptions(),
    // For yAxis custom attrs
    position: baseSelectItem({
      label: '坐标轴位置',
      preset: 'left',
      options: [
        ['左侧', 'left'],
        ['右侧', 'right'],
      ],
    }),
  }
  if (!detail) return simplifyOptions(base)
  return base
}

function getBaseAxisOptions() {
  return {
    show: baseCheckboxItem({ label: '显示坐标轴' }),
    axisLine: {
      label: '轴线设置',
      children: {
        show: baseCheckboxItem({ label: '显示轴线' }),
        lineStyle: {
          label: '轴线样式设置',
          children: {
            color: baseColorItem({ label: '轴线颜色', preset: '#333' }),
          },
        },
      },
    },
    axisTick: {
      label: '轴线刻度设置',
      children: {
        show: baseCheckboxItem({ label: '显示刻度', preset: false }),
        inside: baseCheckboxItem({ label: '刻度朝内' }),
        length: baseNumberItem({
          label: '刻度长度',
          preset: 5,
          range: [0, 100],
          step: 1,
        }),
        lineStyle: {
          label: '刻度样式设置',
          children: {
            color: baseColorItem({ label: '刻度颜色', preset: '#333' }),
            width: baseNumberItem({ label: '刻度宽度', preset: 1 }),
            type: baseSelectItem({
              label: '刻度线类型',
              preset: 'solid',
              options: [
                ['实线', 'solid'],
                ['虚线', 'dashed'],
                ['点线', 'dotted'],
              ],
            }),
          },
        },
      },
    },
    axisLabel: {
      label: '刻度标签设置',
      children: {
        show: baseCheckboxItem({ label: '显示标签' }),
        rotate: baseNumberItem({
          label: '标签旋转',
          preset: 0,
          range: [0, 360],
        }),
        margin: baseNumberItem({
          label: '标签与轴线间距',
          preset: 8,
        }),
        color: baseColorItem({
          label: '标签颜色',
          preset: '#333',
        }),
        fontStyle: baseSelectItem({
          label: '字体风格',
          preset: 'normal',
          options: [
            ['标准', 'normal'],
            ['斜体', 'italic'],
          ],
        }),
        fontWeight: baseSelectItem({
          label: '文字粗细',
          preset: 'normal',
          options: [
            ['正常', 'normal'],
            ['加粗', 'bold'],
            ['最粗', 'bolder'],
            ['较细', 'lighter'],
          ],
        }),
        fontSize: baseNumberItem({
          label: '字体大小',
          preset: 12,
        }),
      },
    },
  }

}

