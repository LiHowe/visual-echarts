import {
  baseCheckboxItem,
  baseNumberItem,
  baseSelectItem,
  customCheckboxItem, customNumberItem,
} from './settingsGenerator'
import { simplifyOptions } from './utils'
import {
  theme1,
  theme2,
  theme3,
} from '@/echarts/theme'

export function getBaseOptions (detail = false) {
  const base = {
    animationDuration: baseNumberItem({
      label: '动画时长',
      preset: 1500,
      range: [500, 10000],
      step: 500
    }),
    animationEasing: baseSelectItem({
      label: '动画效果',
      preset: 'cubicOut',
      options: [
        ['平缓', 'linear'],
        ['缓入', 'cubicIn'],
        ['缓出', 'cubicOut'],
        ['缓入缓出', 'cubicInOut'],
      ]
    }),
    darkMode: baseCheckboxItem({
      label: '暗色模式',
      preset: false
    }),
    color: baseSelectItem({
      label: '主题',
      preset: theme1,
      options: [
        ['基础主题', theme1],
        ['主题2', theme2],
        ['主题3', theme3],
      ]
    }),
    _animationDelay: customCheckboxItem({
      label: '逐个显示',
      preset: true,
      handler: ({ val, opts, emit }) => {
        opts.animationDelay = val
          ? idx => idx * (opts._delayDuration || 500)
          : 0
        emit({
          key: 'animationDelay',
          value: opts.animationDelay
        })
      },
      trigger: (opts) => !!opts.animationDelay
    }),
    // FIXME: 待修复, 目前不好用, 需要切换_animationDelay后才能触发
    _delayDuration: customNumberItem({
      label: '显示间隔',
      preset: 500,
      step: 100,
      handler: ({ val, emit, opts }) => {
        opts._delayDuration = val
        opts.animationDelay = idx => idx * opts._delayDuration
        console.log('显示间隔变更, 间隔:', val)
        emit({
          key: 'animationDelay',
          value: opts.animationDelay
        })
      }
    })
      .hiddenWhen(opt => !opt.animationDelay),
    _singleColorFlag: customCheckboxItem({
      label: '使用单色',
      preset: false,
      handler: ({ val, opts, emit }) => {
        console.log('使用单色', val, opts.color, opts._color)
        if (val) {
          opts._color = [...opts.color]
          opts.color = opts.color[0]
        } else {
          opts.color = opts._color
        }
        emit({
          key: 'color',
          value: opts.color
        })
      }
    }),

  }
  if (!detail) return simplifyOptions(base)
  return base
}
