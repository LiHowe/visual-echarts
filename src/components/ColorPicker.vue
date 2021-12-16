<template>
  <div class="color-picker">
    <div class="color-trigger" :style="triggerStyle" @click.stop="show = true"></div>
    <ChromePicker
      v-show="show"
      class="color-picker-content"
      :style="{ top: pos.top + 20 + 'px', left: pos.left + 'px' }"
      :value="value"
      @input="changeColor"
    />
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    ChromePicker: Chrome
  },
  props: {
    value: {
      type: String,
      required: true,
      default: ''
    }
  },
  data: () => ({
    pickerInstance: null,
    pickerWrapper: null,
    show: false,
    listener: null,
    pos: {
      left: 0,
      top: 0
    }
  }),
  computed: {
    triggerStyle() {
      return {
        backgroundColor: this.value
      }
    },
    isHex() {
      return this.value.startsWith('#')
    },
    isHex8 () {
      return this.isHex && this.value.length === 9
    }
  },
  watch: {
    show(val) {
      const { offsetLeft: left, offsetTop: top } = this.$el
      this.pos = {
        left,
        top
      }
      if (val) {
        this.listenClickOutside()
      }
    }
  },
  methods:{
    changeColor({ rgba, hex, hex8 }) {
      let res
      if (!this.isHex) {
        const { r, g, b, a } = rgba
        res = `rgba(${r}, ${g}, ${b}, ${a})`
      } else if (this.isHex) {
        res = this.isHex8 ? hex8 : hex
      } else {
        throw new Error('不支持的颜色类型')
      }
      console.log('[ColorPicker] 改变颜色', res)
      if (this.value === res) return
      this.$emit('input', res)
    },
    listenClickOutside () {
      if (this.listener) return
      this.listener = e => {
        // eslint-disable-next-line no-debugger
        if (!e.path.includes(this.$el)) {
          this.show = false
        }
      }
      window.addEventListener('click', this.listener)
    },
  },
  beforeDestroy() {
    window.removeEventListener('click', this.listener)
  }
}
</script>

<style scoped>
.color-trigger {
  --trigger-size: 20px;
  height: var(--trigger-size);
  width: var(--trigger-size);
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  position: relative;
  border: 1px solid #e9e9e9;
}
.color-picker-content {
  position: absolute;
}
</style>
