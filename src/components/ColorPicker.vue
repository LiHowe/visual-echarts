<template>
  <div class="color-picker">
    <div class="color-trigger" :style="triggerStyle" @click.stop="show = true"></div>
<!--    <ChromePicker :value="value" @input="changeColor"/>-->
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
import Vue from 'vue'
export default {
  name: 'ColorPicker',
  components: {
    // ChromePicker: Chrome
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
    listener: null
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
      if (val) {
        this.showPicker(this.$el)
      } else {
        this.hidePicker()
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
    generatePicker () {
      if (!this.pickerInstance) {
        const vm = this
        const Picker = new Vue({
          render (h) {
            return h(Chrome, {
              attrs: {
                value: vm.value
              },
              on: {
                input: vm.changeColor
              }
            })
          }
        })
        this.pickerInstance = Picker.$mount(document.createElement('div'))
      }
      return this.pickerInstance.$el
    },
    mountPicker () {
      let uid = this.pickerInstance?._uid
      const wrapper = document.createElement('div')
      if (!uid) {
        const child = this.generatePicker()
        wrapper.appendChild(child)
        uid = this.pickerInstance._uid
      }
      this.pickerWrapper = wrapper
      wrapper.id = 'color-picker-wrapper_' + uid
      wrapper.style.position = 'absolute'
      this.updatePosition()
      document.querySelector('.settings-wrapper').appendChild(wrapper)
    },
    listenClickOutside () {
      if (this.listener) return
      this.listener = e => {
        // eslint-disable-next-line no-debugger
        debugger
        if (e.target.id !== this.pickerWrapper.id && e.target.id !== this.pickerInstance._uid) {
          this.show = false
        }
      }
      window.addEventListener('click', this.listener)
    },
    /**
     * update picker wrapper pos
     */
    updatePosition () {
      if (!this.$el) return
      this.pickerWrapper.style.left = this.$el.offsetLeft + 'px'
      // eslint-disable-next-line no-debugger
      this.pickerWrapper.style.top = this.$el.offsetTop + 20 + 'px'
    },
    showPicker() {
      if (this.pickerWrapper && this.pickerInstance) {
        this.pickerWrapper.style.display = 'block'
        this.updatePosition()
      } else {
        this.mountPicker()
      }
      this.listenClickOutside()
    },
    hidePicker() {
      this.pickerWrapper.style.display = 'none'
    }
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
}
</style>
