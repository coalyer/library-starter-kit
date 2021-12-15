<template>
  <div ref="mapWrap" class="map-warp"></div>
</template>

// <script>
// import axios from "axios";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入地图图表，图表后缀都为 Chart
import { MapChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { VisualMapComponent, TooltipComponent } from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册必须的组件
echarts.use([
  VisualMapComponent,
  TooltipComponent,
  MapChart,
  CanvasRenderer
])
import axios from "axios"
export default {
  data () {
    return {
      geoChartOption: {
        tooltip: {
          show: true,
          position: function (point, params, dom, rect, size) {
            let tmpNode = document.createElement("div")
            tmpNode.style =
              "position:absolute;width:6px;height:6px;left:50%;bottom:-4.21px;transform:translateX(-50%) rotate(45deg);border-bottom:rgba(163,211,255,1) solid 1px;border-right:rgba(163,211,255,1) solid 1px;background-color:rgba(255,255,255,0.8);"
            dom.appendChild(tmpNode) //添加小箭头
            return [
              point[0] - size.contentSize[0] / 2,
              point[1] - size.contentSize[1] - 10,
            ]
          },
          padding: [12, 15],
          textStyle: {
            fontSize: 12,
          },
          backgroundColor: "rgba(255,255,255,0.8)",
          formatter: function (params) {
            return params.data
              ? `<div class="tooltip">${params.data.regionName}
                  <div>共享型UPF：${params.data.upfShareCount}</div>
                  <div>专享型UPF：${params.data.upfAloneCount}</div>
                  <div>MEC共享型节点：${params.data.mecShareCount}</div>
                  <div>MEC专享型节点：${params.data.mecAloneCount}</div>
                  </div>`
              : ""
          },
        },
        visualMap: {
          type: "piecewise", //分段型
          min: 0,
          max: 100,
          text: ["100", "0"], //两端的文本
          textGap: 10,
          splitNumber: 6, //对于连续型数据，自动平均切分成几段。默认为5段
          color: [
            "#1991ff",
            "#46a7ff",
            "#75bcfe",
            "#a3d3ff",
            "#d2e9ff",
            "#f3f9fe",
          ], //从低到高颜色是取反
          itemWidth: 10,
          itemHeight: 10,
          itemGap: 0, //每两个图元之间的间隔距离
          itemSymbol: "rect", //默认的图形
          seriesIndex: this.seriesIndex, // 指定取哪个系列(series)的数据
          left: "30",
          bottom: "10",
          calculable: false, //是否显示拖动手柄
          precision: 0,
          formatter: "{value}",
        },
        series: [
          {
            type: "map",
            zoom: 1.25, // 同比放大缩小
            aspectScale: 0.75, // 长宽比，此处不能设置成1，否则会扁
            // nameProperty: "code",
            label: {
              show: true,
              color: "#000",
              fontSize: 12,
              formatter: (params) =>
                params.data ? params.data.regionName : "",
            },
            itemStyle: {
              borderWidth: 0.1,
              borderColor: "rgba(25, 128, 255, 1)",
            },
            emphasis: {
              label: {
                show: true,
                color: "#000",
                fontSize: 12,
                formatter: (params) =>
                  params.data ? params.data.regionName : "",
              },
            },
            selectedMode: false, // !不让选中
            data: [],
          },
        ]
      },
      currentRegion: {
        level: 'province',
        code: 100000
      }
    }
  },
  mounted () {
    this.initGeoMap()
  },
  methods: {
    async initGeoMap () {
      let geoJsonPath = `geojson/${this.currentRegion.level}/${this.currentRegion.code}.json`
      await axios.get(geoJsonPath).then((res) => {
        if (res.data) {
          this.myChart = null
          this.bgChart = null
          echarts.registerMap(`${this.currentRegion.code}`, res.data)
          this.geoChartOption.series[0].map = this.currentRegion.code
        }
      })
      this.myChart = echarts.init(this.$refs.mapWrap)
      this.myChart.setOption(this.geoChartOption, true)
      let template = `{
        "list|1-10": [{
          "id|+1": 1
        }]
      }`

      axios.post('/api_jianshu/mock/', {
        template: JSON.stringify(template)
      }, function (data) {
        console.log(data)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.map-warp {
  height: 500px;
  width: 100%;
}
</style>