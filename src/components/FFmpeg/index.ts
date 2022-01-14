import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({ log: true })
;(async () => {
  await ffmpeg.load()
})()
