<template>
  <div ref="mapWrap" class="map-warp"></div>
</template>

<script>
// import axios from "axios";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入地图图表，图表后缀都为 Chart
import { MapChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import { VisualMapComponent, TooltipComponent } from 'echarts/components';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 注册必须的组件
echarts.use([
  VisualMapComponent,
  TooltipComponent,
  MapChart,
  CanvasRenderer
]);
export default {
  data() {
    return {
        // 地图的背景底图 
        bgOption: {
          geo: {
            map: "china",
            zoom: 1.25,
            itemStyle: {
              borderColor: "#c8cdd3",
              borderWidth: 0.8,
              color: "rgba(255,255,255, 0)",
            },
          },
        },
    }
  },
  mounted(){
    this.initGeoMap();
  },
  methods: {
    initGeoMap(){
      console.log(111)
    }
  },
}
</script>

<style lang="less" scoped>
.map-warp {
  height: 100%;
  width: 100%;
}
</style>