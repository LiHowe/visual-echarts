<!-- 暂时不拆分组件, 先搞, 之后优化时再拆 -->
<template>
  <div>
    <h-collapse>
      <h-panel name="text">
        <p>文本设置</p>
        <div slot="content">
          <div>
            <p class="panel-content">
              <span class="label">显示X轴</span>
              <h-switch class="control" v-model="value.xAxis.show"></h-switch>
            </p>
            <template v-if="value.xAxis.show">
              <p class="panel-content">
                <span class="label">X轴字体</span>
                <h-select class="control" v-model="value.xAxis.axisLabel.fontFamily">
                  <h-option
                    v-for="item in fontFamilies"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</h-option
                  >
                </h-select>
              </p>
              <p class="panel-content">
                <span class="label">X轴字号</span>
                <h-input-number :min="10" v-model="value.xAxis.axisLabel.fontSize"></h-input-number>
              </p>
            </template>
          </div>
          <div>
            <p class="panel-content">
              <span class="label">显示Y轴</span>
              <h-switch class="control" v-model="value.yAxis.show"></h-switch>
            </p>
            <template v-if="value.yAxis.show">
              <p class="panel-content">
                <span class="label">Y轴字体</span>
                <h-select class="control" v-model="value.yAxis.axisLabel.fontFamily">
                  <h-option
                    v-for="item in fontFamilies"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</h-option
                  >
                </h-select>
              </p>
              <p class="panel-content">
                <span class="label">Y轴字号</span>
                <h-input-number :min="10" v-model="value.yAxis.axisLabel.fontSize" />
              </p>
            </template>
          </div>
          <div>
            <p class="panel-content">
              <span class="label">显示图表标题</span>
              <h-switch class="control" v-model="value.title.show"></h-switch>
            </p>
            <template v-if="value.title.show">
              <p class="panel-content">
                <span class="label">图表标题</span>
                <h-input v-model="value.title.text" />
              </p>
              <p class="panel-content">
                <span class="label">标题字体</span>
                <h-select class="control" v-model="value.title.textStyle.fontFamily">
                  <h-option
                    v-for="item in fontFamilies"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</h-option>
                </h-select>
              </p>
              <p class="panel-content">
                <span class="label">标题字号</span>
                <h-input-number :min="10" v-model="value.title.textStyle.fontSize" />
              </p>
            </template>
          </div>
          <div>
            <p class="panel-content">
              <span class="label">显示单位</span>
              <!-- FIXME: 真值有问题 -->
              <h-switch
                class="control"
                :value="!!value.title.subtext"
                :true-value="!!value.title.subtext"
                :false-value="!value.title.subtext"
                @on-change="changeSubTitle"
              />
            </p>
            <template v-if="value.title.subtext">
              <p class="panel-content">
                <span class="label">改变单位</span>
                <h-input v-model="value.title.subtext" />
              </p>
              <p class="panel-content">
                <span class="label">单位字体</span>
                <h-select class="control" v-model="value.title.subtextStyle.fontFamily">
                  <h-option
                    v-for="item in fontFamilies"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</h-option>
                </h-select>
              </p>
              <p class="panel-content">
                <span class="label">单位字号</span>
                <h-input-number :min="10" v-model="value.title.subtextStyle.fontSize" />
              </p>
            </template>
          </div>
          <div>
            <p class="panel-content">
              <span class="label">显示图例</span>
              <h-switch
                class="control"
                v-model="value.legend.show"
              />
            </p>
            <template v-if="value.legend.show">
              <p class="panel-content">
                <span class="label">图例字体</span>
                <h-select class="control" v-model="value.legend.textStyle.fontFamily">
                  <h-option
                    v-for="item in fontFamilies"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</h-option>
                </h-select>
              </p>
              <p class="panel-content">
                <span class="label">图例字号</span>
                <h-input-number :min="10" v-model="value.legend.textStyle.fontSize" />
              </p>
            </template>
          </div>
        </div>
      </h-panel>
      <h-panel name="style">
        <p>颜色设置</p>
        <div slot="content">
          <div>
            <p class="panel-content">
              <span class="label">使用单色</span>
              <h-switch
                class="control"
                :value="!value.color.push"
                @on-change="useSingleColor"
              />
            </p>
            <p v-if="!value.color.push" class="panel-content">
              <span class="label">选择颜色</span>
              <color-picker v-model="value.color" />
            </p>
          </div>
          <div>
            <p class="panel-content">
              <span class="label">选择主题</span>
              <h-select v-model="value._theme">
                <h-option v-for="(theme, i) in themes" :key="i" :value="theme.label" :label="theme.label">
                  <span>
                    <img :src="theme.value" style="width: 100%">
                  </span>
                </h-option>
              </h-select>
            </p>
            <p class="panel-content">
              <span class="label">图表文字颜色</span>
              <color-picker v-model="globalColor" @input="changeGlobalColor" />
            </p>
            <p class="panel-content">
              <span class="label">标题文字颜色</span>
              <color-picker v-model="value.title.textStyle.color" />
            </p>
            <p class="panel-content">
              <span class="label">背景颜色</span>
              <color-picker v-model="value.backgroundColor" />
            </p>
            <p class="panel-content">
              <span class="label">背景图片</span>
              <h-upload
                action="''"
                :show-upload-list="false"
                :showErrorlist="false"
                :before-upload="handleImageUpload"
              >
                <h-button type="ghost" icon="upload">上传图片</h-button>
              </h-upload>
            </p>
          </div>
        </div>
      </h-panel>
      <h-panel name="animation">
        <p>动画设置</p>
      </h-panel>
    </h-collapse>
  </div>
</template>

<script>
import ColorPicker from '@/components/ColorPicker'
export default {
  name: 'Options',
  components: { ColorPicker },
  props: {
    // 图标选项
    value: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data: () => ({
    // TODO: 字体待完善
    fontFamilies: [
      {
        label: '默认',
        value: 'sans-serif'
      },
      {
        label: '等宽',
        value: 'monospace'
      }
    ],
    themes: [
      {
        label: 'theme1',
        value: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTkyLjEgMTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5Mi4xIDE1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzRFNzBGMDt9Cgkuc3Qxe2ZpbGw6IzAwQzVEMjt9Cgkuc3Qye2ZpbGw6I0ZGQ0UyQjt9Cgkuc3Qze2ZpbGw6I0ZGODEyQzt9Cgkuc3Q0e2ZpbGw6I0Y5NTAzRTt9Cgkuc3Q1e2ZpbGw6I0VEMDZBRjt9Cgkuc3Q2e2ZpbGw6Izk5MjdGQzt9Cgkuc3Q3e2ZpbGw6IzE3MjBEMTt9Cjwvc3R5bGU+CjxnPgoJPHJlY3QgY2xhc3M9InN0MCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSIyNCIgY2xhc3M9InN0MSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSI0OCIgY2xhc3M9InN0MiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSI3MiIgY2xhc3M9InN0MyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSI5NiIgY2xhc3M9InN0NCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSIxMjAuMSIgY2xhc3M9InN0NSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSIxNDQuMSIgY2xhc3M9InN0NiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSIxNjguMSIgY2xhc3M9InN0NyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+CjwvZz4KPC9zdmc+Cg=='
      },
      {
        label: 'theme2',
        value: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMiwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IuWbvuWxgl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCIKCSB2aWV3Qm94PSIwIDAgMTkyLjEgMTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDE5Mi4xIDE1OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6I0ZGQTMwMDt9Cgkuc3Qxe2ZpbGw6I0ZGRDAwODt9Cgkuc3Qye2ZpbGw6IzhCQzM0QTt9Cgkuc3Qze2ZpbGw6IzRDQUY1MDt9Cgkuc3Q0e2ZpbGw6IzAwOTY4ODt9Cgkuc3Q1e2ZpbGw6IzNGNTFCNTt9Cgkuc3Q2e2ZpbGw6IzNEN0FEQjt9Cgkuc3Q3e2ZpbGw6IzAzQTlGNDt9Cjwvc3R5bGU+CjxnPgoJPHJlY3QgeD0iMCIgeT0iMCIgY2xhc3M9InN0MCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSIyNCIgeT0iMCIgY2xhc3M9InN0MSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSI0OCIgeT0iMCIgY2xhc3M9InN0MiIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSI3MiIgeT0iMCIgY2xhc3M9InN0MyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSI5NiIgeT0iMCIgY2xhc3M9InN0NCIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+Cgk8cmVjdCB4PSIxMjAiIHk9IjAiIGNsYXNzPSJzdDUiIHdpZHRoPSIyNCIgaGVpZ2h0PSIxNSIvPgoJPHJlY3QgeD0iMTQ0IiB5PSIwIiBjbGFzcz0ic3Q2IiB3aWR0aD0iMjQiIGhlaWdodD0iMTUiLz4KCTxyZWN0IHg9IjE2OCIgeT0iMCIgY2xhc3M9InN0NyIgd2lkdGg9IjI0IiBoZWlnaHQ9IjE1Ii8+CjwvZz4KPC9zdmc+Cg=='
      }
    ],
    globalColor: '#000'
  }),
  methods: {
    changeSubTitle (val) {
      console.log('changeSubTitle', val)
      this.value.title.subtext = !val ? '' : '单位'
    },
    useSingleColor (flag) {
      let temp = this.value._color
      if (temp) {
        temp = this.value.color
        this.value.color = this.value._color
        this.value._color = temp
      } else {
        if (flag) {
          this.$set(this.value, '_color', this.value.color)
          this.value.color = this.value.color[0]
        } else {
          this.value.color = ['#5470c6', '#91cc75', '#fac858', '#ee6666', '#73c0de', '#3ba272', '#fc8452', '#9a60b4', '#ea7ccc']
        }
      }
    },
    // TODO: 改变全局颜色
    /**
     * 改变全局颜色, 包括:
     * xAxis 和yAxis 字体颜色
     * title的subtext的颜色
     * series的label颜色
     * legend的颜色
     */
    changeGlobalColor (color) {
      this.value.title.subtextStyle.color = color
      this.value.xAxis.axisLabel.color = color
      this.value.yAxis.axisLabel.color = color
      this.value.legend.textStyle.color = color
    },
    handleImageUpload (files) {
      console.log(files)
      const reader = new FileReader()
      reader.readAsDataURL(files)
      reader.onloadend = () => {
        console.log('读取完毕')
        this.value.graphic = [{
          type: 'image',
          id: 'bg',
          x: 0,
          y: 0,
          bounding: 'all',
          style: {
            image: reader.result,
            x: 0,
            y: 0,
          }
        }]
      }
    }
  }
}
</script>

<style scoped>
.panel-content {
  display: grid;
  grid-template-columns: 35% auto;
  align-content: space-between;
}
.panel-content .control {
  justify-self: end;
}
</style>
