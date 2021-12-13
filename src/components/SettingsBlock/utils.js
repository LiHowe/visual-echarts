import ColorPicker from '@/components/ColorPicker'
let uid = 1
export const genSelect = (data, key, handler = () => {}) => {
  return (
    <li class="setting-item">
      <label for={`select_${uid}`}>{ data.label }</label>
      <select id={`select_${uid++}`} onchange={e => handler(e, data, key)}>
        {genOptions(data.options, key)}
      </select>
    </li>
  )
}

export const genOptions = (opts, key) => {
  return opts.map(opt => {
    return <option value={opt.value} selected={this.obj[key] === opt.value}>{opt.label}</option>
  })
}

export const genInput = (data, key) => {
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

export const genCheckbox = (data, key) => {
  return (
    <li class="setting-item">
      <label for={`checkbox_${uid}`}>{ data.label }</label>
      <input
        type="checkbox"
        id={`checkbox_${uid++}`}
        checked={this.obj[key]}
        onchange={e => this.changeCheckbox(e, data, key)}
      />
    </li>
  )
}

// TODO: 颜色选择器组件未开发
export const genColorPicker = (data, key) => {
  return (
    <div class="setting-item">
      <p class="setting-item__label">{ data.label }</p>
      <ColorPicker />
    </div>
  )
}

// TODO: 滑块组件未开发
export const genSlider = (data, key) => {
  return (
    <div class="setting-item">
      <p class="setting-item__label">{ data.label }</p>
      <el-slider modelValue={state.clonedData[key]} onChange={val => emit({ key, value: data.dataType(val)})} />
    </div>
  )
}

export const genNumberInput = (data, key) => {
  return (
    <div class="setting-item">
      <label for={`number_${uid}`}>{ data.label }</label>
      <input
        type="number"
        id={`number_${++uid}`}
        value={this.obj[key]}
        onchange={e => this.changeCheckbox(e, data, key)}
      />
    </div>
  )
}
