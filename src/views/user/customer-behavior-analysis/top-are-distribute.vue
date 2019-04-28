<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  // margin: 0 auto;
  //float: left;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
</style>

<template>
  <div id="Main">
    <div class="box">
      <div id="toAreDistribuite" :style="{ height: '400px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  props: {
    areDistribuiteDataList: Object
  },
  data() {
    return {
      datalist: null,
      myChart: ""
    };
  },
  components: {},
  created: function() {},
  mounted() {
    this.drawLine();
  },
  watch: {
    areDistribuiteDataList(val) {
      this.datalist = val;
      this.myChart.setOption({
        xAxis: [
          {
            type: "category",
            data: val.areaName,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            name: "门店扫码量",
            type: "bar",
            barWidth: "40%",
            data: val.scanCount
          }
        ]
      });
    }
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("toAreDistribuite"));
      // 绘制图表
      app.title = "坐标轴刻度与标签对齐";

      let option = {
        title: {
          text: "TOP30区域分布"
        },
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "直接访问",
            type: "bar",
            barWidth: "40%",
            data: []
          }
        ]
      };

      this.myChart.setOption(option);
    }
  }
};
</script>


