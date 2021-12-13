import {baseNumberItem} from './settingsGenerator'

export type PositionOptions = {
  left: number,
  right: number,
  top: number,
  bottom: number,
  zlevel: number,
  z: number
}

export function getPositionOptions (options?: PositionOptions) {
  const {
    left,
    right,
    bottom,
    top,
    z,
    zlevel
  } = options || {}
  return {
    left: baseNumberItem('左', left),
    right: baseNumberItem('右', right),
    top: baseNumberItem('上', top),
    bottom: baseNumberItem('下', bottom),
    zlevel: baseNumberItem('层级', zlevel),
    z: baseNumberItem('Z', z)
  }
}
