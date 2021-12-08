import { COMPONENT } from '@/settings';
import './index.css'
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
    changeSelect({ target }, data, key) {
      this.emit({
        key,
        value: data.dataType[0](target.options[target.selectedIndex].value)
      })
    },
    changeCheckbox({ target }, data, key) {
      this.emit({
        key,
        value: data.dataType[0](target.checked)
      })
    },
    changeInput({ target }, data, key) {
      this.emit({
        key,
        value: data.dataType[0](target.value)
      })
    },
    emit({key, value}) {
      const originData = this.obj[key]
      // if object, merge
      if (typeof originData === 'object') {
        value = Object.assign({}, originData, value)
      }
      this.$set(this.obj, key, value)
      this.$emit('change-attr', this.obj)
    }
  },
  render() {
    let uid = 1
    const genSelect = (data, key) => {
      return (
        <li class="setting-item">
          <label for={`select_${uid}`}>{ data.label }</label>
          <select id={`select_${uid++}`} onchange={e => this.changeSelect(e, data, key)}>
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
            oninput={e => this.changeInput(e, data, key)}
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
            name=""
            checked={this.obj[key]}
            onchange={e => this.changeCheckbox(e, data, key)}
          />
        </li>
      )
    }
    const c = this.config

    return (
      <ul class="settings-block">
        <div class="title">{ this.label }</div>
        <ul>
          {
            Object.keys(c).map(key => {
              const d = c[key]
              switch (d.type) {
                case COMPONENT.SELECT:
                  return genSelect(d, key)
                case COMPONENT.INPUT:
                  return genInput(d, key)
                case COMPONENT.CHECK_BOX:
                  return genCheckbox(d, key)
              }
            })
          }
        </ul>
      </ul>
    )
  }
}
