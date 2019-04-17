
<style lang="less" scoped>
@import "../../config/index.less";
* {
  margin: 0;
  padding: 0;
}
@glod-color: #f1bf2e;
body,
html {
  width: 100%;
  height: 100%;
}
#MainBox {
  width: 100%;
  height: 100%;
  overflow-x: auto;
  overflow-y: auto;
}
#Main {
  width: 100%;
  min-width: 1200px;
  height: 100%;
  min-height: 700px;
  background: url("../../assets/image/gdtgBackground.png") no-repeat;
  background-size: cover;
  background-color: #0c2a44;
  padding: 8px;
  overflow: hidden;
  position: relative;
  .mainTop {
    font-size: 14px;
    color: white;
    height: 40px;
    position: relative;
    margin-top: 5px;
    width: 100%;
    .logo {
      width: 33.33%;
      height: 40px;
      float: left;
      img {
        display: block;
        float: left;
      }
      span {
        float: left;
        display: block;
        height: 34px;
        line-height: 34px;
        color: white;
        text-align: center;
        width: 26px;
        font-size: 20px;
        font-family: "微软雅黑";
      }
    }
    .top-middle-box {
      height: 40px;
      float: left;
      width: 60%;
      .select-box {
        float: left;
        margin-right: 20px;
        border: 2px solid #082883;
        width: 220px;
        height: 34px;
        margin: 0 auto;
        border-radius: 4px;
        position: relative;
        .select-top-box {
          overflow: hidden;
          text-align: center;
          line-height: 32px;
          font-size: 12px;
          color: #ccc;
          font-family: "微软雅黑";
          cursor: pointer;
          position: relative;
          .select-top-extra {
            position: absolute;
            top: 2px;
            right: 6px;
            width: 24px;
            height: 24px;
            border-radius: 2px;
            img {
              width: 24px;
              height: 24px;
            }
          }
        }

        .select-main-box {
          transition: all 1s;
          position: absolute;
          z-index: 1000;
          background: #0e2c48;
          width: 100%;
          text-align: center;
          top: 40px;
          border: 1px solid #0e2c48;
          border-radius: 4px;
          min-height: 20px;
          max-height: 200px;
          overflow-y: auto;
          ul li {
            cursor: pointer;
            line-height: 30px;
            height: 30px;
            font-size: 12px;
            color: #ccc;
            font-family: "微软雅黑";
          }
        }
      }
      .refreshBox {
        margin-left: 20px;
        line-height: 34px;
        height: 40px;
        span {
          font-size: 12px;
          float: left;
        }
        span:first-child {
          color: #00c8e2;
        }
        img {
          margin-top: 4px;
          float: left;
          margin-left: 10px;
          cursor: pointer;
        }
      }
    }
    .bigOrSmall {
      // width: 15%;
      margin-top: 8px;
      margin-right: 5px;
      float: right;
    }
  }

  .main-box {
    width: 100%;
    height: calc(~"(100% - 56px)");
    overflow: hidden;
    .main-left-box {
      width: 25%;
      height: 100%;
      float: left;
      .mapTitile {
        margin: 50px auto 0;
        text-align: center;
        height: 32px;
        line-height: 32px;
        font-size: 16px;
        font-weight: bold;
        width: 200px;
        color: #00d9f3;
        position: relative;
        .left,
        .right {
          position: absolute;
          width: 8px;
          height: 16px;
          border-style: solid;
          border-color: #0059bb;
          top: 8px;
        }
        .left {
          left: 0;
          border-width: 2px 0 0 2px;
        }
        .right {
          right: 0;
          border-width: 0 2px 2px 0;
        }
      }
      #scancodeActivity {
        width: 100%;
        height: calc(~"(100% - 82px)");
      }
    }
    .main-right-box {
      width: 74.9%;
      height: 100%;
      float: left;

      .barPcture {
        width: 100%;
        height: 32%;
      }
      .legendBox {
        display: flex;
        height: 40px;
        // padding: 10px 0;
        width: 100%;
        justify-content: space-around;
        margin-bottom: 13px;
        .legendBoxItem {
          margin-top: 10px;
          height: 20px;
          .legendBoxItems {
            margin: 0 auto;
            div {
              width: 40px;
              height: 16px;
              margin-top: 2px;
              background: red;
              float: left;
              border-radius: 4px;
            }
            p {
              float: left;
              line-height: 20px;
              margin-left: 10px;
              color: white;
              font-size: 12px;
            }
          }
        }
      }
      .barPcturelengend {
        display: inline-block;
        text-align: center;
        position: absolute;
        top: 60px;
        margin-left: -200px;
        .legendBoxItem {
          display: inline-block;
          width: 200px;
          height: 20px;
          .legendBoxItems {
            div {
              width: 20px;
              height: 15px;
              border-radius: 2px;
              vertical-align: middle;
              float: left;
              margin-right: 10px;
              margin-top: 4px;
              cursor: pointer;
            }
            .totalItem {
              overflow: hidden;
              background: #0c2a44;
              .cicle {
                float: left;
                width: 10px;
                background: white;
                height: 10px;
                border-radius: 100%;
                border: 1px solid red;
              }
              .line {
                float: left;
                width: 80px;
                height: 2px;
                margin-top: -6px;
                margin-left: 10px;
              }
            }
            p {
              color: #0099b7;
              font-size: 12px;
              vertical-align: middle;
              line-height: 20px;
              float: left;
              span {
                color: white;
                font-size: 16px;
              }
            }
          }
        }
      }
      .bar-box {
        width: 100%;
        // height: calc(~"(100% - 240px)");
        height: calc(~"(68% - 60px)");
        .boxs {
          width: 100%;
          margin: 10px auto;
          border: 4px solid #082883;
          box-shadow: inset 0 0 40px #082883;
          // padding: 8px 0;
          height: 48%;
          position: relative;
          .left-top-box,
          .left-bottom-box,
          .right-top-box,
          .right-bottom-box {
            position: absolute;
            width: 40px;
            height: 20px;
            border-style: solid;
            border-color: #00c4e6;
          }
          .left-top-box {
            top: -2px;
            left: -2px;
            border-width: 2px 0 0 2px;
          }
          .left-bottom-box {
            border-width: 0 0 2px 2px;
            bottom: -2px;
            left: -2px;
          }
          .right-top-box {
            top: -2px;
            right: -2px;
            border-width: 2px 2px 0 0;
          }
          .right-bottom-box {
            border-width: 0 2px 2px 0;
            bottom: -2px;
            right: -2px;
          }

          .container-box {
            width: 33.33%;
            border-right: 2px solid #082883;
            height: 100%;
            float: left;
            position: relative;

            .title-left {
              text-align: center;
              position: absolute;
              color: #00b9d3;
              font-size: 14px;
              font-weight: bold;
              width: 140px;
              height: 24px;
              line-height: 24px;
              top: -16px;
              background: #0d1e53;
              left: 50%;
              margin-left: -70px;
              .title-left-left {
                position: absolute;
                border-color: #0079f1;
                border-style: solid;
                border-width: 2px 0 0 2px;
                width: 8px;
                height: 16px;
                top: 5px;
                left: 0;
              }
              .title-left-right {
                position: absolute;
                border-color: #0079f1;
                border-style: solid;
                border-width: 0 2px 2px 0;
                width: 8px;
                height: 16px;
                top: 5px;
                right: 0;
              }
            }
            .top-right,
            .bottom-right {
              position: absolute;
              width: 2px;
              height: 10px;
              background: #04adcd;
            }
            .top-right {
              top: 0;
              right: -2px;
            }
            .bottom-right {
              bottom: 0;
              right: -2px;
            }
            #todayPicture,
            #totalPicture,
            #yesterdayPicture,
            #fridayPicture,
            #presentPicture {
              // width: 100%;
              position: absolute;
              top: 0px;
              left: 0px;
              right: 0px;
              bottom: 0px;
              z-index: 10000;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
    <div id="MainBox">
      <div id="Main" @click="closeSelect">
        <div class="mainTop">
          <div class="logo" >
              <img class="gdYxtg" src="../../assets/image/gdtgLogo.png" alt="">
              <span>X</span>
              <img class="hzHuihe" src="../../assets/image/eDianJia.png" alt="">
          </div>

          <div class="top-middle-box">
              <div class="select-box" style="margin-right:20px;">
                  <div @click="mainShow" class="select-top-box">
                      <span v-if="!formData.brandName">阶梯返利活动</span>
                      <span v-if="formData.brandName">{{formData.brandName}}</span>
                      <div class="select-top-extra">
                          <Icon type="arrow-down-b" size="20"  v-show="!selectMainShow" @click="mainShow" color="#FFD300"></Icon>
                          <Icon type="arrow-up-b" v-show="selectMainShow" @click="mainShow" size="20" color="#FFD300"></Icon>
                      </div>
                  </div>
                  <div v-show="selectMainShow" class="select-main-box">
                      <ul>
                          <li @click="liClick(item.brandId,item.brandName,$event)" v-for="(item ,index) in brandList" :key="index">
                              {{item.brandName}}
                          </li>
                      </ul>
                  </div>
              </div> 
              <div class="select-box" style="margin-right:20px;">
                  <div @click="activityShow" class="select-top-box">
                      <span v-show="!formData.activityName">请选择活动</span>
                      <span v-show="formData.activityName">{{formData.activityName}}</span>
                      <div class="select-top-extra">
                          <Icon type="arrow-down-b" size="20"  v-show="!activityIsShow" @click="activityShow" color="#FFD300"></Icon>
                          <Icon type="arrow-up-b" v-show="activityIsShow" @click="activityShow" size="20" color="#FFD300"></Icon>
                      </div>
                  </div>
                  <div v-show="activityIsShow" class="select-main-box">
                      <ul>
                          <li @click="activityClick(item.slaveActivityId,item.slaveActivityName,$event)" v-for="(item ,index) in activityList" :key="index">
                              {{item.slaveActivityName}}
                          </li>
                      </ul>
                  </div>
              </div> 

              <div class="refreshBox" style="margin-left:20px;">
                <span>更新时间:</span>
                <span>{{refreshTime}}</span>
                <img @click="reflashData" src="../../assets/image/shuaxin.png" alt="">
              </div>
          </div>

          <div class="bigOrSmall">
              <router-link to='/rebateRealTimeKanban1' v-if="bigStatus">
                <!-- <Icon type="arrow-expand" size="22" color="#fff" class='small'></Icon> -->
                <Icon type="ios-expand" size="22" color="#fff" class='small'/>
              </router-link>
              <router-link to='/rebateRealTimeKanban' v-else>
                  <!-- <Icon type="arrow-shrink" size="22" color="#fff" class='big'></Icon> -->
                  <Icon type="ios-contract" size="22" color="#fff" class='big'/>
              </router-link>
          </div>
          
        </div>
        <div class="main-box">

          <div class="main-left-box">
            <div class="mapTitile">
                粤西扫码门店数量显示
              <div class="left"></div>
              <div class="right"></div>
            </div>
            <div id="scancodeActivity"></div>
          </div>

          <div class="main-right-box">
              <div class="legendBox barPcturelengend">
                <div class="legendBoxItem">
                   <div class="legendBoxItems">
                      <div style="backgroundColor:#00E78C;"></div>
                      <p>今日新用户: <span>{{barPictureLengedData[0]}}</span>  家</p>
                   </div>
                </div>
                 <div class="legendBoxItem">
                   <div class="legendBoxItems">
                      <div style="backgroundColor:#0066FF;"></div>
                      <p>今日老用户: <span>{{barPictureLengedData[1]}}</span>  家</p>
                   </div>
                    
                 </div>
                 <div class="legendBoxItem" style="width:100px;">
                   <div class="legendBoxItems" style="margin-top:-2px;">
                      <div class="totalItem" style="backgroundColor:#001146;">
                        <div class="cicle"></div>
                        <div class="line"></div>
                      </div>
                      <p>累计</p>
                   </div>
                    
                 </div>
              </div>
              <div class="barPcture" ref="barPcture"></div>

              <div class="legendBox" style="width:30px;">
                 <!-- <div class="legendBoxItem" v-for="(item,index) in lengendData" :key="index">
                   <div class="legendBoxItems">
                      <div :style="styleMethod(index)"></div>
                      <p>{{item}}</p>
                   </div>
                    
                 </div> -->
              </div>

              <div class="bar-box">
                <div class="boxs" style="margin-bottom:20px;">
                  <div class="container-box" style="border:none;">
                      <div id="yesterdayPicture" ref="yesterdayPicture"></div>
                  </div>
                  <div class="container-box" style="border:none;">
                      <div class="title-left title">
                          本期阶梯返利占比
                          <div class="title-left-left"></div>
                          <div class="title-left-right"></div>
                      </div>
                      <div id="todayPicture" ref="todayPicture"></div>
                  </div>
                  <div style="border-right:none;" class="container-box">
                    <div id="fridayPicture" ref="fridayPicture"></div>
                  </div>
                  <div class="left-top-box"></div>
                  <div class="left-bottom-box"></div>
                  <div class="right-top-box"></div>
                  <div class="right-bottom-box"></div>
                </div>
                <div id="box" class="boxs">
                  <div class="container-box">
                      <div id="totalPicture" ref="totalPicture"></div>
                      <div class="title-left title">
                          累计返利占比
                          <div class="title-left-left"></div>
                          <div class="title-left-right"></div>
                      </div>


                      <div class="top-right"></div>
                      <div class="bottom-right"></div>
                  </div>
                  <div class="container-box">
                      <div class="title-left title">
                          累计奖励分布
                          <div class="title-left-left"></div>
                          <div class="title-left-right"></div>
                      </div>
                      <div class="top-right"></div>
                      <div class="bottom-right"></div>
                      <div id="presentPicture" ref="presentPicture"></div>
                  </div>
                  <div style="border-right:none;" class="container-box">
                      <div class="title-left title">
                          累计关联门店占比
                          <div class="title-left-left"></div>
                          <div class="title-left-right"></div>
                      </div>
                      <div id="totalPicture" ref="yibiaotu"></div>
                  </div>
                  <div class="left-top-box"></div>
                  <div class="left-bottom-box"></div>
                  <div class="right-top-box"></div>
                  <div class="right-bottom-box"></div>
                </div>
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

import guangdong from "@/assets/yuedong.json";

export default {
  name:"rebate-real-time-kanban",

  data() {
    return {
      barPictureLengedData: [0, 0],
      bigStatus: true,
      refreshTime: EDFAULT_ENDTIME,
      activityIsShow: false,
      color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
      yibiaopanPicture: null,
      barPicture: null,
      yesterdayPicture: null,
      presentPicture: null,
      fridayPicture: null,
      selectMainShow: false,
      todayPictures: null,
      totalPicture: null,
      brandList: [], //品牌列表
      activityId: "", //阶梯返利活动ID
      activityName: "", //阶梯返利活动名称
      activityList: [],
      dateNow: this.Global.createTime(Date.now()),
      numList: [],
      spinShow: false,
      hand: "",

      showList: false,
      timer: null,
      formData: {
        brandId: "",
        activityId: "",
        brandName: "",
        activityName: ""
      },
      geoCoordMap: {
        //广东佛山各个区地图数据
        花都区: [113.226001, 23.481427],
        白云区: [113.296785, 23.325646],
        萝岗区: [113.507736, 23.182956],
        荔湾区: [113.238879, 23.108594],
        越秀区: [113.261503, 23.131377],
        海珠区: [113.32124, 23.078816],
        天河区: [113.355747, 23.157191],
        黄埔区: [113.51378, 23.24901],
        番禺区: [113.45863, 22.95893],
        南沙区: [113.603432, 22.774673],
        增城区: [113.772621, 23.292059],
        南海区: [113.0, 23.18],
        禅城区: [113.024906, 23.016705],
        顺德区: [113.2, 22.84],
        从化市: [113.591285, 23.555311],
        高明区: [112.88, 22.9],
        三水区: [112.87, 23.17],
        //清远市
        佛冈县: [113.555135527344, 23.9051271796876],
        连南瑶族自治县: [112.263338652344, 24.446567609375],
        连山壮族瑶族自治县: [112.157345, 24.7438430000001],
        连州市: [112.377345, 24.923843],
        清城区: [113.057345, 23.643843],
        清新县: [112.857345, 23.943843],
        阳山县: [112.747345, 24.553843],
        英德市: [113.167345, 24.253843],
        //韶关市
        武江区: [113.57, 24.8],
        浈江区: [113.6, 24.8],
        曲江区: [113.6, 24.68],
        乐昌市: [113.35, 25.13],
        南雄市: [114.3, 25.12],
        仁化县: [113.75, 25.08],
        乳源瑶族自治县: [113.27, 24.78],
        始兴县: [114.07, 24.95],
        翁源县: [114.13, 24.35],
        新丰县: [114.2, 24.07]
      },
      text: "0家",
      initialData: [
        {
          name: "未进阶",
          value: 0
        },
        {
          name: "第一阶梯",
          value: 0
        },
        {
          name: "第二阶梯",
          value: 0
        },
        {
          name: "第三阶梯",
          value: 0
        }
      ],
      lengendData: ["未进阶", "第一阶梯", "第二阶梯", "第三阶梯"]
    };
  },
  watch: {
    "formData.activityId"() {
      this.init();
    }
  },
  created() {
    var path = this.$route.path;
    if (path == "/rebateRealTimeKanban") {
      this.bigStatus = true;
    } else {
      this.bigStatus = false;
    }
    // this.refreshTime = this.initializationTime();
    this.Global.doPostNoLoading("ladder/queryBrandList.json", "", res => {
      console.log(res);
      this.brandList = res;
      if (res && res.length) {
        this.formData.brandId = res[0].brandId;
        this.formData.brandName = res[0].brandName;
        this.getActivityList(res[0].brandId);
      }
    });
  },
  beforeDestroy() {},
  mounted() {
    window.addEventListener("resize", this.reload);
    //初始化图表
    this.$nextTick(() => {
      this.myChart = echarts.init(document.getElementById("scancodeActivity"));
      this.barPicture = echarts.init(this.$refs.barPcture);
      this.totalPicture = echarts.init(this.$refs.totalPicture);
      this.yesterdayPicture = echarts.init(this.$refs.yesterdayPicture);
      this.fridayPicture = echarts.init(this.$refs.fridayPicture);
      this.todayPictures = echarts.init(this.$refs.todayPicture);
      this.presentPicture = echarts.init(this.$refs.presentPicture);
      this.yibiaopanPicture = echarts.init(this.$refs.yibiaotu);
      this.drawLine();
      this.drawBarPicture();
      this.drawYiBiaoPan();
      this.drawLineTotal();

      this.drawLineyesterday();
      this.drawLinefriday();
      this.drawLinepresentPicture();
      this.drawLineToday();
      this.init();
    });
  },
  beforeDestroy() {
    this.activityList = [];
    window.removeEventListener('resize',this.reload);
  },
  methods: {
    reload(){location.reload();},
    //刷新
    reflashData() {
      // this.refreshTime = this.initializationTime();
      this.init();
    },
    //初始化时间
    initializationTime() {
      let data = new Date();
      let hour = data.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let s = data.getMinutes();
      s = s < 10 ? "0" + s : s;
      return `${hour}:${s}`;
    },
    styleMethod(index) {
      let style = {
        backgroundColor: `${this.color[index]}`
      };
      return style;
    },
    drawLine(arr = []) {
      var mapName = "guangdong";
      var data = [];
      for (let item in this.geoCoordMap) {
        if (this.geoCoordMap.hasOwnProperty(item)) {
          data.push({
            name: item,
            // value: Math.floor(Math.random() * 10 - 5)
            value: 0
          });
        }
      }
      if (arr.length) {
        for (let i = 0; i < arr.length; i++) {
          let value = arr[i].name;
          for (let j = 0; j < data.length; j++) {
            if (data[j].name == arr[i].name) {
              data[j].value = arr[i].value;
            }
          }
        }
      }

      /*获取地图数据*/
      this.myChart.showLoading();
      echarts.registerMap("guangdong", guangdong);
      this.myChart.hideLoading();
      var geoCoordMap = this.geoCoordMap;
      var max = 480,
        min = 9; // todo
      var maxSize4Pin = 100,
        minSize4Pin = 40;

      var convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };
      let option = {
        tooltip: {
          trigger: "item",
          formatter: function(params) {
            if (typeof params.value[2] == "undefined") {
              return params.name + " : " + Math.floor(params.value);
            } else {
              return params.name + " : " + Math.floor(params.value[2]);
            }
          }
        },
        grid: {
          top: 0,
          bottom: 0
        },
        visualMap: {
          show: false,
          min: 0,
          max: 200,
          left: "left",
          top: "bottom",
          text: ["高", "低"], // 文本，默认为数值文本
          calculable: true,
          seriesIndex: [1],
          inRange: {
            color: ["#FDB800", "#FE3E00"]
          }
        },
        geo: {
          show: true,
          map: mapName,
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
              borderColor: "#3B5077"
            },
            emphasis: {
              areaColor: "#2B91B7"
            }
          }
        },
        series: [
          {
            name: "散点",
            type: "scatter",
            coordinateSystem: "geo",
            data: convertData(data),
            symbolSize: function(val) {
              if (val[2] == 0) {
                val[2] = 1;
              }
              return val[2] / 10;
            },
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "#05C3F9"
              }
            }
          },
          {
            type: "map",
            map: mapName,
            geoIndex: 0,
            zoom: 2,
            aspectScale: 1, //长宽比
            showLegendSymbol: false, // 存在legend时显示
            label: {
              normal: {
                show: true
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
            symbol: "pin", //气泡
            symbolSize: function(val) {
              var a = (maxSize4Pin - minSize4Pin) / (max - min);
              var b = minSize4Pin - a * min;
              b = maxSize4Pin - a * max;
              return a * val[2] + b;
            },
            label: {
              normal: {
                show: true,
                textStyle: {
                  color: "#fff",
                  fontSize: 9
                }
              }
            },
            itemStyle: {
              normal: {
                color: "#F62157" //标志颜色
              }
            },
            zlevel: 6,
            data: convertData(data).filter(item => {
              return item.value[2] > 0;
            })
          },
          {
            name: "Top 5",
            type: "effectScatter",
            coordinateSystem: "geo",
            data: convertData(
              data
              // .sort(function(a, b) {
              //   return b.value - a.value;
              // })
              // .slice(0, 5)
            ),
            symbolSize: function(val) {
              if (val[2] == 0) {
                val[2] = 1;
              }
              return val[2] / 10;
            },
            showEffectOn: "render",
            rippleEffect: {
              brushType: "stroke"
            },
            hoverAnimation: true,
            label: {
              normal: {
                formatter: "{b}",
                position: "right",
                show: true
              }
            },
            itemStyle: {
              normal: {
                color: "yellow",
                shadowBlur: 10,
                shadowColor: "yellow"
              }
            },
            zlevel: 1
          }
        ]
      };
      this.myChart.setOption(option);
    },
    drawLineToday(
      todayData = [
        {
          name: "未进阶",
          value: 0
        },
        {
          name: "第一阶梯",
          value: 0
        },
        {
          name: "第二阶梯",
          value: 0
        },
        {
          name: "第三阶梯",
          value: 0
        }
      ],
      subtext = this.text,
      data = [],
      color = this.color
    ) {
      //今日阶梯返利占比
      if (!color) {
        color: this.color;
      }
      let selectedData = {};
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == "未进阶") {
            selectedData[data[i]] = false;
          } else {
            selectedData[data[i]] = true;
          }
        }
      } else {
        selectedData = {
          未进阶: true,
          第一阶梯: true,
          第二阶梯: true,
          第三阶梯: true
        };
      }
      let option = {
        color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
        // color,
        title: {
          text: "今日",
          subtext: subtext,
          textStyle: {
            color: "#00BFDB",
            fontSize: "14",
            fontWeight: "bolder",
            lineHeight: "20"
          },
          subtextStyle: {
            color: "#ffffff",
            fontSize: "12"
          },
          left: "center",
          top: "40%"
        },
        legend: {
          x: "center",
          y: "bottom",
          itemWidth: 15,
          itenHeightL: 10,
          itemGap: 0,
          textStyle: {
            color: "white",
            fontSize: 10
          },
          data: data,
          selected: selectedData
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "今日阶梯占比返利",
            type: "pie",
            center: ["50%", "50%"],
            startAngle: 180,
            radius: ["40%", "70%"],
            data: todayData,
            label: {
              normal: {
                formatter: "{c}家 {d}%\n\n",
                color: "#fff",
                fontSize: 12,
                borderWidth: 20,
                borderRadius: 4,
                padding: [0, -30]
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 30,
                lineStyle: {
                  color: "#fff"
                }
              }
            }
          }
        ]
      };
      this.todayPictures.setOption(option);
    },
    drawLineyesterday(
      yesterdayData = [
        {
          name: "未进阶",
          value: 0
        },
        {
          name: "第一阶梯",
          value: 0
        },
        {
          name: "第二阶梯",
          value: 0
        },
        {
          name: "第三阶梯",
          value: 0
        }
      ],
      yesterdaysubtext = this.text,
      data = []
    ) {
      //昨日阶梯返利占比
      let selectedData = {};
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == "未进阶") {
            selectedData[data[i]] = false;
          } else {
            selectedData[data[i]] = true;
          }
        }
      } else {
        selectedData = {
          未进阶: true,
          第一阶梯: true,
          第二阶梯: true,
          第三阶梯: true
        };
      }
      let option = {
        color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
        legend: {
          x: "center",
          y: "bottom",
          itemWidth: 15,
          itenHeightL: 10,
          itemGap: 0,
          textStyle: {
            color: "white",
            fontSize: 10
          },
          data: data,
          selected: selectedData
        },
        title: {
          text: "昨日",
          subtext: yesterdaysubtext,
          textStyle: {
            color: "#00BFDB",
            fontSize: "14",
            fontWeight: "bolder",
            lineHeight: "20"
          },
          subtextStyle: {
            color: "#ffffff",
            fontSize: "10"
          },
          left: "center",
          top: "40%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "昨日阶梯占比返利",
            type: "pie",
            startAngle: 180,
            radius: ["40%", "70%"],
            label: {
              normal: {
                formatter: "{d}%\n\n",
                // formatter: "{c}家 {d}%\n\n",
                color: "#fff",
                fontSize: 12,
                padding: [0, -30]
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 30,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            data: yesterdayData
          }
        ]
      };
      this.yesterdayPicture.setOption(option);
    },
    drawLinefriday(
      fridayData = [
        {
          name: "未进阶",
          value: 0
        },
        {
          name: "第一阶梯",
          value: 0
        },
        {
          name: "第二阶梯",
          value: 0
        },
        {
          name: "第三阶梯",
          value: 0
        }
      ],
      fridaysubtext = this.text,
      data = []
    ) {
      //上周五阶梯返利占比
      let selectedData = {};
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == "未进阶") {
            selectedData[data[i]] = false;
          } else {
            selectedData[data[i]] = true;
          }
        }
      } else {
        selectedData = {
          未进阶: true,
          第一阶梯: true,
          第二阶梯: true,
          第三阶梯: true
        };
      }
      let option = {
        color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
        title: {
          text: "上周五",
          subtext: fridaysubtext,
          textStyle: {
            color: "#00BFDB",
            fontSize: "14",
            fontWeight: "bolder",
            lineHeight: "20"
          },
          subtextStyle: {
            color: "#ffffff",
            fontSize: "12"
          },
          left: "center",
          top: "40%"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          itemWidth: 15,
          itenHeightL: 10,
          itemGap: 0,
          textStyle: {
            color: "white",
            fontSize: 10
          },
          data: data,
          selected: selectedData
        },
        series: [
          {
            name: "上周五阶梯占比返利",
            type: "pie",
            radius: ["40%", "70%"],
            startAngle: 180,
            label: {
              normal: {
                formatter: "{c}家 {d}%\n\n",
                color: "#fff",
                fontSize: 12,
                padding: [0, -30]
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 30,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            data: fridayData
          }
        ]
      };
      this.fridayPicture.setOption(option);
    },

    drawLineTotal(
      totalData = [
        {
          name: "未进阶",
          value: 0
        },
        {
          name: "第一阶梯",
          value: 0
        },
        {
          name: "第二阶梯",
          value: 0
        },
        {
          name: "第三阶梯",
          value: 0
        }
      ],
      totalsubtext = this.text,
      data = []
    ) {
      //累积阶梯返利占比
      let selectedData = {};
      if (data.length) {
        for (let i = 0; i < data.length; i++) {
          if (data[i] == "未进阶") {
            selectedData[data[i]] = false;
          } else {
            selectedData[data[i]] = true;
          }
        }
      } else {
        selectedData = {
          未进阶: true,
          第一阶梯: true,
          第二阶梯: true,
          第三阶梯: true
        };
      }
      let option = {
        color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
        title: {
          text: "累计",
          subtext: totalsubtext,
          textStyle: {
            color: "#00BFDB",
            fontSize: "14",
            fontWeight: "bolder",
            lineHeight: "20"
          },
          subtextStyle: {
            color: "#ffffff",
            fontSize: "10"
          },
          left: "center",
          top: "40%"
        },
        legend: {
          x: "center",
          y: "bottom",
          itemWidth: 15,
          itenHeightL: 10,
          itemGap: 0,
          textStyle: {
            color: "white",
            fontSize: 10
          },
          data: data,
          selected: selectedData
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
          {
            name: "累计阶梯返利占比",
            type: "pie",
            radius: ["40%", "70%"],
            startAngle: 180,
            label: {
              normal: {
                formatter: "{d}%\n\n",
                color: "#fff",
                fontSize: 12,
                padding: [0, -30]
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 30,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            data: totalData
          }
        ]
      };
      this.totalPicture.setOption(option);
    },

    drawLinepresentPicture(
      presentData = [
        { name: "待清算", value: 0 },
        { name: "待提取", value: 0 },
        { name: "已提取", value: 0 }
      ],
      personData = [
        { name: "待清算人数", value: 0 },
        { name: "已清算人数", value: 0 }
      ]
    ) {
      //奖励分布\
      if (!presentData.length) {
        presentData = [
          { name: "待清算", value: 0 },
          { name: "待提取", value: 0 },
          { name: "已提取", value: 0 }
        ];
      }
      if (!personData.length) {
        personData = [
          { name: "待清算人数", value: 0 },
          { name: "已清算人数", value: 0 }
        ];
      }
      let lengendData = [];
      for (let i = 0; i < presentData.length; i++) {
        lengendData.push(presentData[i].name);
      }
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          x: "center",
          y: "bottom",
          itemWidth: 15,
          itenHeightL: 10,
          itemGap: 0,
          textStyle: {
            color: "white",
            fontSize: 10
          },
          data: lengendData
          // selected:selectedData
        },
        color: ["#FE1F08", "#26A7D9", "#00E78C", "#6901FB", "#0066FF"],
        series: [
          {
            name: "清算结果",
            type: "pie",
            selectedMode: "single",
            selectedOffset: 0,
            radius: [0, "40%"],
            clickable: false,
            label: {
              normal: {
                position: "inner",
                formatter: "{b}: {c}",
                fontSize: 12
              }
            },
            labelLine: {
              normal: {
                formatter: "{b}: {c} {d}%\n\n",
                show: false
              }
            },
            data: personData
          },
          {
            name: "奖励分布",
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              normal: {
                formatter: "{b}: {c}家 {d}%\n\n",
                color: "#fff",
                fontSize: 12,
                padding: [0, -70]
              }
            },
            labelLine: {
              normal: {
                show: true,
                length: 5,
                length2: 50,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            data: presentData
          }
        ]
      };
      this.presentPicture.setOption(option);
    },
    drawBarPicture(
      xAxis = [],
      oldUserData = [],
      newUserData = [],
      totalUaerData = [],
      legendData = ["新用户", "老用户"]
    ) {
      let option = {
        color: ["#00E78C", "#0066FF", "#F85730"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          x: 50,
          x2: 50,
          y: 60,
          y2: 30
        },
        legend: {
          show: false
        },
        xAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "12"
              }
            },
            data: xAxis,
            axisPointer: {
              type: "shadow"
            },
            axisLine: {
              lineStyle: {
                color: "#08288F",
                width: 4
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            name: "数量",
            nameTextStyle: {
              color: "#fff",
              fontSize: "12"
            },
            min: 0,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              formatter: "{value}",
              textStyle: {
                color: "#fff",
                fontSize: "12"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#08288F",
                width: 4
              }
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
            name: "累计",
            nameTextStyle: {
              color: "#fff",
              fontSize: "12"
            },
            min: 0,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: "12"
              }
            },
            axisLine: {
              lineStyle: {
                color: "#08288F",
                width: 4
              }
            },
            splitLine: {
              show: false,
              //  改变轴线颜色
              lineStyle: {
                // 使用深浅的间隔色
                color: ["red"]
              }
            }
          }
        ],
        series: [
          {
            name: "新用户",
            type: "bar",
            stack: "aaa",
            barWidth: 30,
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: newUserData
          },
          {
            name: "老用户",
            type: "bar",
            stack: "aaa",
            barWidth: 30,
            label: {
              normal: {
                show: true,
                position: "inside"
              }
            },
            data: oldUserData
          },
          {
            name: "累积",
            type: "line",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                color: "#fff"
              }
            },
            data: totalUaerData
          }
        ]
      };

      this.barPicture.setOption(option);
    },
    drawYiBiaoPan(value = 0) {
      let option = {
        color: ["#00E78C", "#0066FF", "#F85730"],
        title: {
          text: "25%",
          x: "50%",
          y: "45%",
          textAlign: "center",
          textStyle: {
            fontWeight: "normal",
            fontSize: 16,
            color: "#ffffff"
          }
        },
        series: [
          {
            name: " ",
            type: "pie",
            radius: ["50%", "80%"],
            avoidLabelOverlap: false,
            startAngle: 225,
            color: ["#6901FB", "transparent"],
            hoverAnimation: false,
            legendHoverLink: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: 75,
                name: "1"
              },
              {
                value: 25,
                name: "2"
              }
            ]
          },
          {
            name: "",
            type: "pie",
            radius: ["54%", "76%"],
            avoidLabelOverlap: false,
            startAngle: 317,
            color: ["#fff", "transparent"],
            hoverAnimation: false,
            legendHoverLink: false,
            clockwise: false,
            itemStyle: {
              normal: {
                borderColor: "transparent",
                borderWidth: "20"
              },
              emphasis: {
                borderColor: "transparent",
                borderWidth: "20"
              }
            },
            z: 10,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                name: ""
              },
              {
                name: ""
              }
            ]
          }
        ]
      };
      var value_ = (100 - value) * 266 / 360;
      option.title.text = value + "%";
      option.series[1].data[0].value = value_;
      option.series[1].data[1].value = 100 - value_;
      this.yibiaopanPicture.setOption(option, true);
    },
    getColor(data) {
      let color = [];
      for (let i = 0; i < data.length; i++) {
        let name = data[i].name;
        for (let j = 0; j < this.lengendData.length; j++) {
          if (this.lengendData[j].name == name) {
            color.push(this.color[j]);
          }
        }
      }
      return color;
    },
    init() {
      if (!this.formData.brandId) {
        // this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.formData.activityId) {
        this.$Message.error("请选择活动");
        return false;
      }
      let data = {
        // brandId: this.formData.brandId,
        activityId: this.formData.activityId
      };

      this.Global.doPostNoLoading("ladder/ladderRebateReport.json", data, res => {
        console.log(res);
        let lengendData = [];
        //更新时间
        if (res.updateTime) {
          this.refreshTime = this.Global.createTime(res.updateTime);
        }
        //关联门店
        if (res.refStore) {
          let value = res.refStore.refStore / res.refStore.totalStore;
          value = (100 * value).toFixed(2);
          this.drawYiBiaoPan(value);
        }
        //获取15天内新老客户数
        if (res.dailyUser) {
          let xAxis = [];
          res.dailyUser.x_month_day.forEach(item => {
            xAxis.push(item.slice(5));
          });
          let oldUserData = [];
          let newUserData = [];
          let totalUaerData = [];
          // let legendData = [];

          let keys = Object.keys(res.dailyUser.y_data_list);

          keys.forEach(item => {
            oldUserData.push(res.dailyUser.y_data_list[item].hisUser);
            newUserData.push(res.dailyUser.y_data_list[item].newUser);
            totalUaerData.push(res.dailyUser.y_data_list[item].totalUser);
          });
          this.barPictureLengedData = [];
          this.barPictureLengedData = [
            newUserData[newUserData.length - 1],
            oldUserData[oldUserData.length - 1]
          ];
          this.drawBarPicture(xAxis, oldUserData, newUserData, totalUaerData);
        }
        //今日数据
        if (res.ladderCount.todayModel) {
          let todaysubtext = "";
          let todayData = [];
          let todayLendata = [];
          if (!res.ladderCount.todayModel.totalScanCount) {
            res.ladderCount.todayModel.totalScanCount = "暂无奖励";
          }
          // ${res.ladderCount.todayModel.totalScanCount}/
          todaysubtext = `${res.ladderCount.todayModel.totalUserCount}家`;

          let todayKey = Object.keys(
            res.ladderCount.todayModel.ladderDetailMap
          );
          let todayValue = Object.values(
            res.ladderCount.todayModel.ladderDetailMap
          );
          // this.lengendData = [];
          for (let i = 0; i < todayKey.length; i++) {
            todayData.push({
              value: todayValue[i],
              name: this.lengedf(todayKey[i])
            });
            // this.lengendData.push({
            //   name: this.lengedf(todayKey[i])
            // });
            lengendData.push(this.lengedf(todayKey[i]));
            todayLendata.push(this.lengedf(todayKey[i]));
          }
          if(todayData && todayData.length){
            this.drawLineToday(todayData, todaysubtext, todayLendata);
          }else{
            this.drawLineToday();
          }
          
        }
        //昨日数据
        if (res.ladderCount.yestModel) {
          let yesterdaysubtext = "";
          let yesterdayData = [];
          let yesLenData = [];
          if (!res.ladderCount.yestModel.totalScanCount) {
            res.ladderCount.yestModel.totalScanCount = "暂无奖励";
          }
          // ${res.ladderCount.yestModel.totalScanCount}/
          yesterdaysubtext = `${res.ladderCount.yestModel.totalUserCount}家`;

          let yestKey = Object.keys(res.ladderCount.yestModel.ladderDetailMap);
          let yestValue = Object.values(
            res.ladderCount.yestModel.ladderDetailMap
          );

          for (let i = 0; i < yestKey.length; i++) {
            yesterdayData.push({
              value: yestValue[i],
              name: this.lengedf(yestKey[i])
            });
            lengendData.push(this.lengedf(yestKey[i]));
            yesLenData.push(this.lengedf(yestKey[i]));
          }
          if (yesterdayData && yesterdayData.length) {
            this.drawLineyesterday(yesterdayData, yesterdaysubtext, yesLenData);
          } else {
            this.drawLineyesterday();
          }
          // this.drawLineyesterday(yesterdayData, yesterdaysubtext,yesLenData);
        }

        //上周五数据
        if (res.ladderCount.lastModel) {
          let fridaysubtext = "";
          let fridayData = [];
          let friData = [];
          if (!res.ladderCount.lastModel.totalScanCount) {
            res.ladderCount.lastModel.totalScanCount = "暂无奖励";
          }
          // ${res.ladderCount.lastModel.totalScanCount}/
          fridaysubtext = `${res.ladderCount.lastModel.totalUserCount}家`;

          let fridayKey = Object.keys(
            res.ladderCount.lastModel.ladderDetailMap
          );
          let fridayValue = Object.values(
            res.ladderCount.lastModel.ladderDetailMap
          );

          for (let i = 0; i < fridayKey.length; i++) {
            fridayData.push({
              value: fridayValue[i],
              name: this.lengedf(fridayKey[i])
            });
            lengendData.push(this.lengedf(fridayKey[i]));
            friData.push(this.lengedf(fridayKey[i]));
          }
          if(fridayData && fridayData.length){
            this.drawLinefriday(fridayData, fridaysubtext, friData);
          }else{
            this.drawLinefriday();
          }
          
        }

        //累计数据
        if (res.ladderCount.allModel) {
          let totalsubtext = "";
          let totalData = [];
          let totalLengedData = [];
          if (!res.ladderCount.allModel.totalScanCount) {
            res.ladderCount.allModel.totalScanCount = "暂无折扣";
          }
          totalsubtext = `${res.ladderCount.allModel.totalUserCount}家`;
          // ${res.ladderCount.allModel.totalScanCount}
          let totalKey = Object.keys(res.ladderCount.allModel.ladderDetailMap);
          let totalValue = Object.values(
            res.ladderCount.allModel.ladderDetailMap
          );

          for (let i = 0; i < totalKey.length; i++) {
            totalData.push({
              value: totalValue[i],
              name: this.lengedf(totalKey[i])
            });
            totalLengedData.push(this.lengedf(totalKey[i]));
            lengendData.push(this.lengedf(totalKey[i]));
          }
          if(totalData && totalData.length){
            this.drawLineTotal(totalData, totalsubtext, totalLengedData);
          }
          else{
            this.drawLineTotal();
          }
          
        }
        // this.lengendData = [];
        this.lengendData = [...new Set(lengendData)];
        //奖励分布数据

        if (res.ladderPrize) {
          let presentData = [];
          let personData = [];
          if (res.ladderPrize.liquTotalCount > 0) {
            personData.push({
              name: "待算",
              value: res.ladderPrize.liquTotalCount
            });
          }
          if (res.ladderPrize.unliquTotalCount > 0) {
            personData.push({
              name: "已算",
              value: res.ladderPrize.unliquTotalCount
            });
          }

          presentData.push({
            value: res.ladderPrize.unsendCount,
            name: "待提取"
          });
          presentData.push({
            value: res.ladderPrize.receiveCount,
            name: "已提取"
          });
          presentData.push({
            value: res.ladderPrize.unliquCount,
            name: "待清算"
          });
          this.drawLinepresentPicture(presentData, personData);
        } else {
          this.drawLinepresentPicture();
        }
        //地图数据
        if (res.dailyArea && res.dailyArea.length) {
          let mapData = [];

          for (let i = 0; i < res.dailyArea.length; i++) {
            mapData.push({
              name: res.dailyArea[i].bizKey,
              value: res.dailyArea[i].bizValue
            });
          }

          this.drawLine(mapData);
        } else {
          this.drawLine();
        }
      });
    },
    closeSelect(e) {
      if (
        e.target.className != "select-box" ||
        e.target.className != "select-top-box" ||
        e.target.className != "select-main-box"
      ) {
        this.selectMainShow = false;
      }
    },
    mainShow(e) {
      e.stopPropagation();
      this.selectMainShow = !this.selectMainShow;
    },
    activityShow(e) {
      e.stopPropagation();
      this.activityIsShow = !this.activityIsShow;
    },
    //获取活动列表
    getActivityList(val) {
      this.activityList = [];
      this.Global.doPostNoLoading("ladder/queryActivityList.json", val, res => {
        console.log(res);

        if (res && res.length) {
          this.activityList = res;
          this.formData.activityName = res[0].slaveActivityName;
          this.formData.activityId = res[0].slaveActivityId;
        } else {
          this.formData.activityName = "";
          this.formData.activityId = "";
          this.$Message.error("该品牌下暂无活动");
        }
      });
    },
    liClick(id, val, e) {
      e.stopPropagation();
      if (this.formData.brandId == id) {
        this.selectMainShow = false;
        return false;
      }
      this.formData.brandName = val;
      this.selectMainShow = false;
      this.formData.brandId = id;

      this.activityList = [];
      this.getActivityList(this.formData.brandId);
      return;
      this.Global.doPostNoLoading(
        "joinGoodsRebate/getRebateActivityList.json",
        id,
        res => {
          if (res && res.length) {
            this.activityList = res;
            this.formData.activityName = res[0].name;
            this.formData.activityId = res[0].id;
          } else {
            this.formData.activityName = "";
            this.formData.activityId = "";
            this.$Message.error("该品牌下暂无活动");
          }
        }
      );
    },
    activityClick(id, val, e) {
      e.stopPropagation();
      if (this.formData.activityId == id) {
        this.activityIsShow = false;
        return false;
      }
      this.formData.activityName = val;
      this.activityIsShow = false;
      this.formData.activityId = id;
    },
    clear(e) {
      e.stopPropagation();
      this.activityName = "";
      this.activityId = "";
    },
    lengedf(val) {
      let str = "";
      switch (Number(val)) {
        case 0:
          str = "未进阶";
          break;
        case 20:
          str = "20箱优惠";
          break;
        case 50:
          str = "50箱优惠";
          break;
        case 100:
          str = "100箱优惠";
          break;
        default:
          str = "";
          break;
      }
      return str;
    }
  }
  // filters: {
  //   lengedFilter(val) {
  //     return this.lengedf(val)
  //   }
  // }
};
</script>