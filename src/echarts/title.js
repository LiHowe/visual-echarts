import {
  simplifyOptions,
} from './utils'

import {
  baseCheckboxItem,
  baseInputItem,
  baseSelectItem,
} from './settingsGenerator'

/**
 * 构建标题相关字段
 * @param detail 是否需要详细信息: 用于构建表单
 */
export function getBaseTitleOptions(detail = false) {
  const base = {
    textStyle: {
      label: '标题样式',
      children: {
        fontWeight: baseSelectItem({
          label: '字体粗细',
          preset: 'normal',
          options: [
            ['细', 'lighter'],
            ['标准', 'normal'],
            ['粗', 'bolder'],
          ],
        }),
      },
    },
    show: baseCheckboxItem({ label: '显示标题' }),
    left: baseSelectItem({
      label: '对齐方式',
      preset: 'auto',
      options: [
        ['自动', 'auto'],
        ['居左', 'left'],
        ['居中', 'center'],
        ['居右', 'right'],
      ],
    }),
    text: baseInputItem({
      label: '标题内容',
      preset: '默认标题',
    }),
  }
  if (!detail) {
    return simplifyOptions(base)
  }
  return base
}
