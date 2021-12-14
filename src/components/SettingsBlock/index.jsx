import { COMPONENT_TYPE } from '@/echarts';
import './index.css'
import ColorPicker from '@/components/ColorPicker'

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
      if (typeof originData === 'object') {
        value = Object.assign({}, originData, value)
      }
      this.$set(this.obj, key, value)
      this.$emit('changeAttr', this.obj)
    }
  },
  render() {
    const c = this.config
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

    let uid = 1
    const genSelect = (data, key) => {
      return (
        <li class="setting-item">
          <label for={`select_${uid}`}>{ data.label }</label>
          <select id={`select_${uid++}`} onchange={({ target }) => {
            this.emit({
              key,
              value: data.dataType(target.options[target.selectedIndex].value)
            })
          }}>
            {genOptions(data.options, key)}
          </select>
        </li>
      )
    }

    const genOptions = (opts, key) => {
      return opts.map(opt => {
        return <option value={opt.value} selected={this.obj[key] === opt.value}>{opt.label}</option>
      })
    }

    const genInput = (data, key) => {
      return (
        <li class="setting-item">
          <label for={`input_${uid}`}>{ data.label }</label>
          <input
            type="text"
            id={`input_${uid++}`}
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
      return (
        <li class="setting-item">
          <label for={`checkbox_${uid}`}>{ data.label }</label>
          <input
            type="checkbox"
            id={`checkbox_${uid++}`}
            checked={this.obj[key]}
            onchange={({ target }) => {
              this.emit({
                key,
                value: data.dataType(target.checked)
              })
            }}
          />
        </li>
      )
    }

// TODO: 颜色选择器组件未开发
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
      return (
        <div class="setting-item">
          <label for={`number_${uid}`}>{ data.label }</label>
          <input
            type="number"
            id={`number_${++uid}`}
            value={this.obj[key]}
            oninput={({ target }) => {
              this.emit({
                key,
                value: data.dataType(target.value)
              })
            }}
          />
        </div>
      )
    }

    return (
      <ul class="settings-block">
        <div class="title">{ this.label }</div>
        <ul>
          {
            Object.keys(c).map(key => {
              const d = c[key]
              if (d.children) {
                return genSub(d, key)
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
      </ul>
    )
  }
}
