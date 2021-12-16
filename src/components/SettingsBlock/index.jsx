import { COMPONENT_TYPE } from '@/echarts';
import './index.css'
import ColorPicker from '@/components/ColorPicker'
import { getUid } from '@/components/SettingsBlock/utils'

export default {
  name: 'SettingBlock',
  props: {
    label: {
      type: String,
      default: ''
    },
    config: {
      type: Object,
      default: () => ({}),
      required: true
    },
    // 对应echarts的options的属性
    obj: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  methods: {
    emit({key, value}) {
      console.log('Emit,', key, value)
      const originData = this.obj[key]
      // if object, merge
      if (originData instanceof Object) {
        value = Object.assign(originData, value)
      }
      console.log('[SettingsBlock] emit:', key, value, this.obj)
      this.$set(this.obj, key, value)
      this.$emit('changeAttr', this.obj)
    }
  },
  render() {
    const c = this.config

    const isHidden = (data) => {
      if (data._hidden instanceof Function) {
        return data._hidden(this.obj)
      } else {
        return data._hidden
      }
    }

    const callFnWithCatch = (fn, ...args) => {
      try {
        fn(...args)
      } catch (e) {
        console.log(e)
      }
    }

    const genSub = (data, key) => {
      return (
        <setting-block
          obj={this.obj[key]}
          config={data.children}
          label={data.label}
          onChangeAttr={value => {
            this.emit({ key, value })
          }}
        />
      )
    }

    const genSelect = (data, key) => {
      const uid = getUid()
      return (
        <li class="setting-item">
          <label for={`select_${uid}`}>{ data.label }</label>
          <select id={`select_${uid}`} onchange={({ target }) => {
            this.emit({
              key,
              value: JSON.parse(target.options[target.selectedIndex].value)
            })
          }}>
            {genOptions(data.options, key)}
          </select>
        </li>
      )
    }

    const genOptions = (opts, key) => {
      const isSameValue = (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b)
      }
      return opts.map(opt => {
        return <option value={JSON.stringify(opt.value)} selected={isSameValue(this.obj[key], opt.value)}>{opt.label}</option>
      })
    }

    const genInput = (data, key) => {
      const uid = getUid()
      return (
        <li class="setting-item">
          <label for={`input_${uid}`}>{ data.label }</label>
          <input
            type="text"
            id={`input_${uid}`}
            value={this.obj[key]}
            oninput={({target}) => {
              this.emit({
                key,
                value: data.dataType(target.value)
              })
            }}
          />
        </li>
      )
    }

    const genCheckbox = (data, key) => {
      const uid = getUid()
      const isChecked = data.trigger ? data.trigger(this.obj) : this.obj[key]
      const handler = ({ target }) => {
        if (data.handler) {
          callFnWithCatch(data.handler, {
            val: target.checked,
            opts: this.obj,
            emit: this.emit,
            key
          })
        } else {
          this.emit({
            key,
            value: data.dataType(target.checked)
          })
        }
      }
      if (isHidden(data)) return null
      return (
        <li class="setting-item">
          <label for={`checkbox_${uid}`}>{ data.label }</label>
          <input
            type="checkbox"
            id={`checkbox_${uid}`}
            checked={isChecked}
            value={this.obj[key]}
            onchange={handler}
          />
        </li>
      )
    }

    const genColorPicker = (data, key) => {
      return (
        <div class="setting-item">
          <p class="setting-item__label">{ data.label }</p>
          <ColorPicker value={this.obj[key]} oninput={color => {
            this.emit({
              key,
              value: data.dataType(color)
            })
          }}/>
        </div>
      )
    }

// TODO: 滑块组件未开发
    const genSlider = (data, key) => {
      return (
        <div class="setting-item">
          <p class="setting-item__label">{ data.label }</p>
          <input type="slider" value={this.obj[key]} />
        </div>
      )
    }

    const genNumberInput = (data, key) => {
      const uid = getUid()
      const handler = ({ target }) => {
        if (data.handler) {
          callFnWithCatch(data.handler, {
            val: target.value,
            opts: this.obj,
            emit: this.emit,
            key
          })
        } else {
          this.emit({
            key,
            value: data.dataType(target.value)
          })
        }
      }
      if (isHidden(data)) return null
      return (
        <div class="setting-item">
          <label for={`number_${uid}`}>{ data.label }</label>
          <input
            type="number"
            id={`number_${uid}`}
            value={this.obj[key]}
            max={data.max}
            min={data.min}
            step={data.step}
            oninput={handler}
          />
        </div>
      )
    }

    return (
      <ul class="settings-block">
        <div class="title">{ this.label }</div>
        <li>
          <ul class="settings-block__content">
            {
              Object.keys(c).map(key => {
                const d = c[key]
                if (d.children) {
                  // 如果存在触发条件
                  if (d._hiddenWhen) {
                    console.log('enter hidden when', this.obj)
                    if (!d._hiddenWhen(this.obj)) {
                      return genSub(d, key)
                    }
                  } else {
                    return genSub(d, key)
                  }
                }
                switch (d.component) {
                  case COMPONENT_TYPE.SELECT:
                    return genSelect(d, key)
                  case COMPONENT_TYPE.INPUT:
                    return genInput(d, key)
                  case COMPONENT_TYPE.CHECK_BOX:
                    return genCheckbox(d, key)
                  case COMPONENT_TYPE.NUMBER:
                    return genNumberInput(d, key)
                  case COMPONENT_TYPE.COLOR:
                    return genColorPicker(d, key)
                  case COMPONENT_TYPE.SLIDER:
                    return genSlider(d, key)
                }
              })
            }
          </ul>
        </li>
      </ul>
    )
  }
}
