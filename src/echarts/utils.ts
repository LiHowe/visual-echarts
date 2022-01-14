export type SelectOption = {
  label: string,
  value: string
}

/**
 * 统一Select的option对象
 * @param label
 * @param value
 * @return {{label, value}}
 */
export function genOptions (label: string, value: any): SelectOption {
  return {
    label,
    value
  }
}

/**
 * 简化选项
 * @param options
 * @return {{}}
 */
export function simplifyOptions (options) {
  return Object.keys(options).reduce((init, key) => {
    // eslint-disable-next-line no-debugger
    if (options[key].children) {
      init[key] = simplifyOptions(options[key].children)
    } else {
      init[key] = options[key].preset
    }
    return init
  }, {})
}

/**
 * @since 2021/1/13
 * @author zihao.he
 * @param ec Echart Instance
 * @param target The series idx and bar idx
 */
export function getSeriesPosition(ec, target = [0, 0]) {
  const zr = ec.getZr()
  const shapes = zr.storage.getRoots()
  const seriesShapes = shapes
    .filter(shape => shape.__ecComponentInfo.mainType === 'series')
    // make sure the series data is sequential.
    .sort((a, b) =>
      a.__ecComponentInfo.index - b.__ecComponentInfo.index
    )
  const [seriesIdx, groupIdx] = target
  const bar = seriesShapes[seriesIdx].childAt(groupIdx)
  const info = bar.getBoundingRect()
  console.log({
    bar, info
  })
  return {
    x: info.x + info.width / 2,
    y: info.y
  }
}
