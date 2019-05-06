<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 0;
  background: #fff;
  position: relative;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.center-title {
  text-indent: 1%;
  padding: 10px 0;
  font-size: 16px;
}
.echartBox {
  width: 80%;
  height: 1000px;
  position: relative;
  float: left;
}
.iconBox {
  position: absolute;
  right: 10px;
  z-index: 10;
}
.signInfor {
  width: 20%;
  float: left;
  text-align: center;
  .title {
    padding-top: 15px;
    font-size: 20px;
    font-weight: 600;
    color: #d90000;
  }
  .subTitle {
    padding-top: 20px;
    font-size: 16px;
  }
  .subDesc {
    padding-top: 10px;
    font-size: 16px;
  }
  .padding10px {
    padding-right: 10px;
  }
  .green {
    color: #34a323;
    display: inline-block;
  }
  .orange {
    color: #d90000;
    display: inline-block;
  }
}
</style>

<template>
  <div>
    <div class="box">
      <div class="iconBox">
        <router-link to="/bigGDStoreDistribute" v-if="bigStatus">
          <Icon type="ios-expand" size="22" color="red" class="small"></Icon>
        </router-link>
        <router-link to="/GDStoreDistribute" v-else>
          <Icon type="ios-contract" size="22" color="red" class="big"></Icon>
        </router-link>
      </div>
      <div style="overflow: hidden;">
        <div id="scancodeActivity" class="echartBox"></div>
        <div class="signInfor">
          <div class="title">今日签到人数（人）</div>
          <div class="subTitle">
            应到：
            <span class="green padding10px">{{planCount}}</span>实到：
            <span class="orange">{{actuallyCount}}</span>
          </div>
          <div class="subDesc" v-for="value in todaySignCount">
            <span class="padding10px">{{value.areaName}}</span>应到：
            <span class="green padding10px">{{value.planCount}}</span>实到：
            <span class="orange">{{value.actuallyCount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间

import guangdong from "@/assets/4401001.json";
export default {
  data() {
    return {
      bigStatus: true,
      formData: {
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME]
      },
      rule: {
        queryTime: [{ required: true, message: "选择日期跟时间" }]
      },
      myChart: "",
      todaySignCount: [],
      planCount: 0, //应到
      actuallyCount: 0, //应到
      setTimer: null
    };
  },
  created() {
    var path = this.$route.path;
    if (path == "/GDStoreDistribute") {
      this.bigStatus = true;
    } else {
      this.bigStatus = false;
    }
    this.init();
    this.setTimer = setInterval(() => {
      this.init();
    }, 8000);
  },
  mounted() {
    this.drawLine();
  },
  destroyed() {
    clearInterval(this.setTimer);
  },
  methods: {
    drawLine(geoCoordMap = {}, data = []) {
      geoCoordMap["花都区"] = [113.226001, 23.481427];
      // geoCoordMap['从化市']=[113.591285,23.555311];
      geoCoordMap["白云区"] = [113.296785, 23.325646];
      // geoCoordMap['萝岗区']=[113.507736,23.182956];
      geoCoordMap["荔湾区"] = [113.238879, 23.108594];

      geoCoordMap["越秀区"] = [113.261503, 23.131377];
      geoCoordMap["海珠区"] = [113.32124, 23.078816];
      geoCoordMap["天河区"] = [113.355747, 23.157191];
      geoCoordMap["黄埔区"] = [113.51378, 23.24901];
      geoCoordMap["番禺区"] = [113.45863, 22.95893];

      // geoCoordMap['南沙区']=[113.603432,22.774673];
      geoCoordMap["增城区"] = [113.772621, 23.292059];
      geoCoordMap["南海区"] = [113.0, 23.18];
      geoCoordMap["禅城区"] = [113.024906, 23.016705];
      geoCoordMap["顺德区"] = [113.2, 22.84];

      data.push(
        { name: "禅城区", value1: 1, value2: 200 },
        { name: "顺德区", value1: 1, value2: 100 },
        { name: "花都区", value2: 480, value1: 1 },
        { name: "白云区", value2: 300, value1: 1 },
        { name: "增城区", value2: 220, value1: 1 },
        { name: "荔湾区", value2: 210, value1: 1 },

        { name: "花都区", value: 480, value1: 1 },
        { name: "从化市", value: 480, value1: 1 },
        { name: "白云区", value: 480, value1: 1 },
        // { name: "萝岗区", value: 480, value1: 1 },
        { name: "荔湾区", value: 480, value1: 1 },

        { name: "越秀区", value: 480, value1: 1 },
        { name: "海珠区", value: 480, value1: 1 },
        { name: "天河区", value: 480, value1: 1 },
        { name: "黄埔区", value: 480, value1: 1 },
        { name: "番禺区", value: 480, value1: 1 },

        { name: "南沙区", value: 480, value1: 1 },
        { name: "增城区", value: 480, value1: 1 },
        { name: "南海区", value: 480, value1: 1 },
        { name: "禅城区", value: 480, value1: 1 },
        { name: "顺德区", value: 480, value1: 1 }
      );

      this.myChart = echarts.init(document.getElementById("scancodeActivity"));
      // this.myChart.height = 'auto';

      this.myChart.showLoading();
      echarts.registerMap("guangdong", guangdong);
      this.myChart.hideLoading();

      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 20;

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord
                .concat(data[i].value)
                .concat(data[i].value1)
                .concat(data[i].value2)
            });
          }
        }

        return res;
      };

      let option = {
        title: {
          text: "广东太古可口可乐CNY点亮签到 - 广州及佛山地区",
          subtext: "",
          x: "center",
          textStyle: {
            color: "#d40203",
            fontSize: 20,
            fontStyle: "normal"
          }
        },
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              //区域城市
              //   return params.name + ' : ' + params.value;
              return params.name;
            } else {
              //签到地点
              //   params.name + ' : ' + '计划10人，实到7人'
              // return params.name + ' : 计划' + params.value[2] + '人，实到' + params.value[3] + '人';//图标移上去显示内容
              return params.name; //图标移上去显示内容
            }
          }
        },
        legend: {
          orient: "vertical",
          y: "top",
          x: "right",
          data: [""],
          textStyle: {
            color: "#fff"
          }
        },
        bmap: {
          center: [104.114129, 37.550339],
          zoom: 5,
          roam: true
        },
        visualMap: {
          show: false,
          min: 0,
          max: 10,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            // color: ['#3B5077', '#031525'] // 蓝黑
            // color: ['#ffc0cb', '#800080'] // 红紫
            // color: ['#3C3B3F', '#605C3C'] // 黑绿
            // color: ['#0f0c29', '#302b63', '#24243e'] // 黑紫黑
            // color: ['#23074d', '#cc5333'] // 紫红
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#1488CC', '#2B32B2'] // 浅蓝
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            // color: ['#00467F', '#A5CC82'] // 蓝绿
            color: ["#36160b", "#280c08", "#441b0d"] // 蓝绿
          }
        },
        // toolbox: {
        //     show: true,
        //     orient: 'vertical',
        //     left: 'right',
        //     top: 'center',
        //     feature: {
        //             dataView: {readOnly: false},
        //             restore: {},
        //             saveAsImage: {}
        //             }
        // },
        geo: {
          show: true,
          map: "guangdong",
          label: {
            normal: {
              show: false
            },
            emphasis: {
              show: false
            }
          },
          roam: true,
          itemStyle: {
            normal: {
              areaColor: "#031525",
              borderColor: "#fff" //地图 区域边界
            },
            emphasis: {
              areaColor: "#ffae00"
            }
          }
        },
        series: [
          {
            name: "CNY",
            type: "scatter",
            coordinateSystem: "geo",
            // data: convertData(data),
            data: convertData(
              data.filter(v => {
                if (v.value1 == 1 && v.value) {
                  return 1;
                }
                if (v.value1 == 0) {
                  return 1;
                }
              })
            ),
            symbolSize: function(val) {
              return 12;
            },
            //签到地址文字隐藏
            label: {
              normal: {
                formatter(val) {
                  let areaArray = ["花都区", "增城区"];
                  let name = val.data.name;
                  if (
                    name == "花都区" ||
                    name == "增城区" ||
                    name == "白云区" ||
                    name == "天河区" ||
                    name == "南海区" ||
                    name == "禅城区" ||
                    name == "顺德区" ||
                    name == "番禺区" ||
                    name == "黄埔区" ||
                    name == "越秀区" ||
                    name == "荔湾区" ||
                    name == "海珠区"
                  ) {
                    return val.data.name;
                  }
                  return "";
                },
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#fff"
              }
            }
          },

          {
            type: "map",
            map: "guangdong",
            geoIndex: 0,
            aspectScale: 0.75, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false,
                textStyle: {
                  color: "#fff"
                }
              }
            },
            roam: true,
            itemStyle: {
              normal: {
                areaColor: "#031525",
                borderColor: "#3B5077"
              },
              emphasis: {
                areaColor: "#2B91B7"
              }
            },
            animation: false,
            data: data
          },
          {
            name: "点",
            type: "scatter",
            coordinateSystem: "geo",
            symbol: "pin",
            symbolSize: function(val) {
              let count = val[4] ? val[4] / 5 : 0;
              // var a = (maxSize4Pin - minSize4Pin) / (max - min);
              // var b = minSize4Pin - a*min;
              // b = maxSize4Pin - a*max;

              // return a*val[2]+b*2;//标志物 放大 气球
              return 50 + count; //标志物 放大 气球
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#ff0101",
                  fontSize: 12
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#ff0101" //标志颜色
              }
            },
            zlevel: 6,
            // data: convertData(data),
            data: convertData(
              data.filter(v => {
                if (v.value1 == 1 && !v.value) {
                  return v.value1;
                }
              })
            )
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data.filter(v => {
                if (v.value1 == 1 && !v.value) {
                  return v.value1;
                }
              })
            ),
            symbolSize: function(val) {
              //标志物 放大 底盘
              let count = val[4] ? val[4] / 10 : 0;
              return 20 + count;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            //top5签到地址文字显示
            // label: {
            //     normal: {
            //         formatter: '{b}',
            //         position: 'right',
            //         show: true
            //     }
            // },
            itemStyle: {
              normal: {
                //top5光圈放大的颜色 中心颜色 放大光圈颜色
                color: "#d7b1cf",
                shadowBlur: 12,
                shadowColor: "#d7b1cf"
              }
            },
            zlevel: 1
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data.filter(v => {
                if (v.value1 == 1 && !v.value) {
                  return v.value1;
                }
              })
            ),
            symbolSize: function(val) {
              //标志物 放大 底盘
              let count = val[4] ? val[4] / 10 : 0;
              return 20 + count;
            },
            showEffectOn: "emphasis",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            //top5签到地址文字显示
            // label: {
            //     normal: {
            //         formatter: '{b}',
            //         position: 'right',
            //         show: true
            //     }
            // },
            itemStyle: {
              normal: {
                //top5光圈放大的颜色 中心颜色 放大光圈颜色
                color: "#d7b1cf",
                shadowBlur: 10,
                shadowColor: "#d7b1cf"
              }
            },
            zlevel: 1
          }
        ]
      };
      this.myChart.setOption(option);
    },
    init() {
      var dataList = this.Global.JsonChange(this.formData);
      dataList["queryStartTime"] = EDFAULT_STARTTIME;
      dataList["queryEndTime"] = EDFAULT_ENDTIME;
      delete dataList.queryTime;
      this.Global.deleteEmptyProperty(dataList);
      this.Global.doPost("cnySign/querySignMapInfo.json", "", res => {
        this.planCount = res.toSign ? res.toSign : 0;
        this.actuallyCount = res.isSign ? res.isSign : 0;

        let dataList = res;
        let arrList = [];
        for (var x of dataList) {
          let signLocate = x.signLocate.split(",").reverse();
          signLocate[0] = Number(signLocate[0]);
          signLocate[1] = Number(signLocate[1]);
          geoCoordMap[x.signName] = signLocate;
          let obj = {};
          let signName = x.signName;
          obj["name"] = x.signName;
          obj["value1"] = x.signStatus; //计划签到   1已签到 0未签到
          obj["value2"] = x.actuallyCount; //实际签到
          arrList.push(obj);
        }
        this.drawLine(geoCoordMap, arrList);
      });
    }
  }
};
</script>