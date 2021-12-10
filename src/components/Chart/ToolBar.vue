<template>
  <div class="chart-tools">
    <el-switch
      :model-value="props.config.showCode"
      @change="d => changeConfig('showCode', d)"
    >
      Code
    </el-switch>
    <el-switch
      :model-value="props.config.darkMode"
      @change="d => changeConfig('darkMode', d)"
    >
      Code
    </el-switch>
  </div>
</template>

<script setup lang="ts">

const emits = defineEmits(['changeConfig'])

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      showCode: false,
      darkMode: false
    })
  }
})

function changeConfig (k: string, v) {
  console.log('changeConfig', k, v)
  emits('changeConfig', {
    k, v
  })
}

</script>
