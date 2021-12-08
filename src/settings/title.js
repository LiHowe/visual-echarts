import {COMPONENT, genOptions} from "@/settings/utils";

/**
 * 构建标题相关字段
 * @param detail 是否需要详细信息: 用于构建表单
 */
export function getBaseTitleOptions(detail = false) {
  const base = {
    fontWeight: {
      label: '字体粗细',
      type: COMPONENT.SELECT,
      dataType: [String, Number],
      default: 'normal',
      options: [
        genOptions('细', 'lighter'),
        genOptions('标准', 'normal'),
        genOptions('粗', 'bolder'),
      ],
    },
    show: {
      label: '显示标题',
      type: COMPONENT.CHECK_BOX,
      dataType: [Boolean],
      default: true,
    },
    left: {
      label: '对齐方式',
      type: COMPONENT.SELECT,
      dataType: [String],
      default: 'auto',
      options: [
        genOptions('居左', 'left'),
        genOptions('居中', 'center'),
        genOptions('居右', 'right'),
      ]
    },
    text: {
      label: '标题内容',
      type: COMPONENT.INPUT,
      dataType: [String],
      default: '默认标题'
    }
  }
  if (!detail) {
    return Object.keys(base).reduce((init, key) => {
      init[key] = base[key].default
      return init
    }, {})
  }
  return base
}
