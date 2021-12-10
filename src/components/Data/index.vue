<template>
  <div ref="table"></div>
</template>

<script setup lang="ts">
import {
  defineProps, onMounted,
  reactive, ref, watch, watchEffect
} from 'vue'
import Handsontable from 'handsontable'
import 'handsontable/dist/handsontable.full.css'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => ([]),
    required: true
  }
})

const table = ref(null)

const clonedData = ref([])

const emits = defineEmits(['dataChange'])

watchEffect(() => {
  clonedData.value = [...props.modelValue]
})

onMounted(() => {
  const t = new Handsontable(table.value, {
    data: clonedData.value,
    rowHeaders: true,
    colHeaders: true,
    licenseKey: 'non-commercial-and-evaluation'
  })
  t.addHook('beforeChange', (changes, source) => {
    console.log('beforeChange', changes, source)
    changes[0][3] = Number(changes[0][3])
  })
  t.addHook('afterChange', (changes) => {
    console.log('sheet changed', changes)
    clonedData.value = t.getSourceData()
    emits('dataChange', clonedData.value)
  })
})
</script>
