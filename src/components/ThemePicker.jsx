const presetTheme = Array.from(new Array(8), (v, k) => v + k)



export default {
  props: {
    theme:{
      type: String,
      default: 'theme1',
      validator: val => {
        if (!presetTheme.includes(val)) {
          throw new Error('非可用主题')
        }
        return true
      }
    }
  },
  render: () => (
    <div>

    </div>
  )
}
