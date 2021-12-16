import { baseNumberItem } from './settingsGenerator'

export function getPositionOptions(options) {
  const {
    left,
    right,
    bottom,
    top,
    z,
    zlevel,
  } = options || {}
  return {
    left: baseNumberItem({ label: '左', preset: left }),
    right: baseNumberItem({ label: '右', preset: right }),
    top: baseNumberItem({ label: '上', preset: top }),
    bottom: baseNumberItem({ label: '下', preset: bottom }),
    zlevel: baseNumberItem({ label: '层级', preset: zlevel }),
    z: baseNumberItem({ label: 'Z', preset: z }),
  }
}
