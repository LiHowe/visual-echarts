import {COMPONENT, genOptions} from "@/settings/utils";

export function getBaseLegendOptions(detail = false) {
  const base = {
    show: {
      label: '显示图例',
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
