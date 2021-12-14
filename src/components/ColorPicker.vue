<template>
  <div class="color-picker">
    <input v-model="color" />
    <ChromePicker v-model="colorObject" />
  </div>
</template>

<script>
import { Chrome } from 'vue-color'
export default {
  name: 'ColorPicker',
  components: {
    ChromePicker: Chrome
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
