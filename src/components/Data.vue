<template>
  <div ref="table"></div>
</template>

<script>
export default {
  name: 'Data',
  props: {
    value: {
      type: Array,
      default: () => ([]),
      required: true
    }
  },
  data: () => ({

  }),
  watch: {

  }
}
</script>

<style scoped>

</style>
