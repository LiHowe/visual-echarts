<template>
  <div class="color-picker">
    <input v-model="color" />
    <chrome-picker v-model="colorObject" />
  </div>
</template>

<script>
import { ChromePicker } from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    ChromePicker
  },
  data: () => ({
    color: '',
    colorObject: {
      r: 255,
      g: 255,
      b: 255
    }
  })
}
</script>

<style scoped>

</style>
