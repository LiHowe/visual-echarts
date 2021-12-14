<template>
  <div
    class="player-wrapper"
    :style="wrapperStyle"
    @mousedown="startMove"
    @mousemove="move"
    @mouseup="endMove"
  >
    <video ref="video" :width="size.w" :height="size.h" autoplay></video>
  </div>
</template>

<script>
export default {
  name: 'player',
  props: {
    stream: {
      type: MediaStream,
      default: () => new MediaStream()
    },
    size: {
      type: Object,
      default: () => ({
        w: 300,
        h: 180
      })
    },
    range: {
      type: HTMLElement,
      default: () => document.body
    }
  },
  data: () => ({
    pos: {
      x: null,
      y: null
    },
    isMoving: false
  }),
  computed: {
    wrapperPosition() {
      const offsetX = this.$refs.video?.clientWidth / 2 ?? 0
      const offsetY = this.$refs.video?.clientHeight / 2 ?? 0
      const y = this.pos.y - offsetY
      const x = this.pos.x - offsetX
      return this.detectRange({ x, y, offsetX, offsetY })
    },
    wrapperStyle() {
      const { x, y } = this.wrapperPosition
      return {
        left: x + 'px',
        top: y + 'px',
        cursor: this.isMoving ? 'move' : 'default'
      }
    }
  },
  watch: {
    stream(val) {
      console.log('Stream changed', val)
      this.$refs.video.srcObject = val
    }
  },
  methods: {
    startMove() {
      this.isMoving = true
    },
    move (e) {
      if (!this.isMoving) return
      console.log('move', e)
      this.pos.x = e.x
      this.pos.y = e.y
    },
    endMove () {
      this.isMoving = false
    },
    detectRange ({ x, y, offsetX, offsetY }) {
      if (!this.range) return {
        x, y
      }
      const { offsetLeft, offsetTop, clientHeight, clientWidth } = this.range
      if (x < offsetLeft) x = 0
      if (y < offsetTop) y = 0
      if (x + 2 * offsetX > clientWidth - offsetLeft) x = clientWidth - 2 * offsetX
      if (y + 2 * offsetY > clientHeight - offsetTop) y = clientHeight - 2 * offsetY
      return { x, y }
    }
  }
}
</script>

<style scoped>
.player-wrapper {
  position: absolute;
}
</style>
