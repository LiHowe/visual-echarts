<template>
  <div class="player-wrapper">
    <video :srcObject="stream"></video>
  </div>
</template>

<script>
export default {
  name: 'player',
  props: {
    stream: {
      type: MediaStream,
      default: () => new MediaStream()
    }
  }
}
</script>

<style scoped>
.player-wrapper {
}
</style>
