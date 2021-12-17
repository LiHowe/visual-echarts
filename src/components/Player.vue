<template>
  <div
    class="player-wrapper"
    :class="{debug}"
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
    },
    debug: {
      type: Boolean,
      default: false
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
      return this.detectRange(this.pos)
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
      this.$refs.video.srcObject = val
    }
  },
  mounted() {
    const selfWidth = this.$refs.video?.clientWidth ?? 0
    const selfHeight = this.$refs.video?.clientHeight ?? 0
    this.pos.selfWidth = selfWidth
    this.pos.selfHeight = selfHeight
  },
  methods: {
    startMove() {
      this.isMoving = true
    },
    move (e) {
      if (!this.isMoving) return
      const { clientX, clientY } = e
      this.pos.x = clientX - this.pos.selfWidth / 2
      this.pos.y = clientY - this.pos.selfHeight / 2

    },
    endMove () {
      this.isMoving = false
    },
    detectRange ({ x, y }) {
      if (!this.range) return {
        x, y
      }
      const { clientHeight, clientWidth, offsetLeft, offsetTop } = this.range
      if (x < offsetLeft) x = offsetLeft
      if (y < offsetTop) y = offsetTop
      if (x + this.pos.selfWidth > offsetLeft + clientWidth) x = offsetLeft + clientWidth - this.pos.selfWidth
      if (y + this.pos.selfHeight > offsetTop + clientHeight) y = offsetTop + clientHeight - this.pos.selfHeight
      return { x, y }
    }
  }
}
</script>

<style scoped>
.player-wrapper {
  position: fixed;
}
.player-wrapper.debug {
  border: 1px solid #e9e9e9;
}
</style>
