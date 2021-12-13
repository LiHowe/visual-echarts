/**
 * 统一Select的option对象
 * @param label
 * @param value
 * @return {{label, value}}
 */
export function genOptions (label, value) {
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

