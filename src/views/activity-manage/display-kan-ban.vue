
<style lang="less" scoped>
@import "../../config/index.less";
@glod-color: #f1bf2e;
body,
html {
  height: 100%;
}
#Main {
  height: 100%;
  overflow: hidden;
  background: url("../../assets/image/gdtgBackground.png") no-repeat;
  background-size: cover;
  background-color: #0c2a44;
  padding: 8px;
  position: relative;
  .mainTop {
    display: flex;
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
      position: absolute;
      top: 0;
      left: 8px;
      img {
        display: block;
        float: left;
      }
    }
    .top-middle-box {
      height: 40px;
      margin: auto;
      width: 640px;
    }
    .bigOrSmall {
      position: absolute;
      top: 4px;
      right: 10px;
    }
  }

  .main-box {
    width: 100%;
    height: calc(~"(100% - 56px)");
    overflow: hidden;

    .main-top-box {
      width: 100%;
      height: 50%;
      .left,
      .middle,
      .right {
        float: left;
        width: 33.33%;
        height: 100%;
        position: relative;
        .title {
          position: absolute;
          background: #0d2674;
          border-radius: 2px;
          font-size: 14px;
          color: #00c9e5;
          text-align: center;
          width: 120px;
          height: 22px;
          line-height: 22px;
          top: 20px;
          left: 50%;
          margin-left: -60px;
        }
        .todayTitle {
          font-size: 16px;
          color: #ffeb00;
          background: none;
          top: 8px;
        }
        .numScreen {
          height: 40px;
          text-align: center;
          ul {
            display: flex;
            justify-content: center;
            margin-top: 30px;
            margin-bottom: 10px;
            li {
              width: 40px;
              height: 40px;
              background: url("../../assets/image/time.png") center no-repeat;
              background-size: auto;
              font-size: 28px;
              line-height: 40px;
              color: #fff;
              margin: 0 10px;
              border: 1px solid white;
              border-radius: 8px;
            }
          }
        }
        .time {
          text-align: center;
          color: #fbcf00;
          font-size: 12px;
        }
      }
      #todayArea,
      #qingsuanpicture,
      #totalPicture,
      #userGroup,
      #weekUpload,
      #todayUpload {
        position: absolute;
        top: 80px;
        left: 5px;
        right: 5px;
        bottom: 5px;
      }
    }
  }
}
</style>

<template>
    <div id="Main">
        <div class="mainTop">
          <div class="logo" >
              <img class="hzHuihe" src="../../assets/image/eDianJia.png" alt="">
          </div>

          <div class="top-middle-box">
              <div style="float:left;">
                <select-box @selectChange="brandClick" v-model="formData.groupId" :check="true" :width="160" :selectLict="brandList" placeholder="选择活动包名"></select-box>
              </div>
              <div style="float:left;">
                <select-box @selectChange="activityClick" v-model="formData.activityId" total :width="160" :selectLict="activityList" placeholder="选择活动"></select-box>
              </div>
              <div style="float:left;">
                <select-box @selectChange="provinceClick" v-model="formData.provinceId" :width="120" province :selectLict="provinceList" placeholder="选择省"></select-box>
              </div>
              <div style="float:left;">
                <select-box @selectChange="cityClick" v-model="formData.cityId" total :width="120" :selectLict="cityList" placeholder="选择市"></select-box>
              </div>
              
          </div>

          <div class="bigOrSmall">
              <router-link to='/displayKanBan1' v-if="bigStatus">
                <!-- <Icon type="arrow-expand" size="22" color="#fff" class='small'></Icon> -->
                <Icon type="ios-expand" size="22" color="#fff" class='small'/>
              </router-link>
              <router-link to='/displayKanBan' v-else>
                  <!-- <Icon type="arrow-shrink" size="22" color="#fff" class='big'></Icon> -->
                  <Icon type="ios-contract" size="22" color="#fff" class='big'/>
              </router-link>
          </div>
          
        </div>
        

        <div class="main-box">
          <div class="main-top-box main">
              
              <div class="left">
                  <div id="todayArea" ref="todayArea"></div>
                  <div class="title">今日区域占比</div>
              </div>
              <div class="middle">
                  
                  <div class="todayTitle title">今日上传数</div>
                  <div class="numScreen">
                    <ul>
                        <li v-for="(item,index) in numberList " :key="index">{{ item }}</li>
                    </ul>
                  </div>
                  <div class="time">{{nowTime}}</div>
                  <div id="todayUpload" ref="todayUpload"> </div>
              </div>
              <div class="right">
                  <div class="title">累计清算情况</div>
                  <div id="qingsuanpicture" ref="qingsuanpicture"></div>
              </div>
          </div>
          <div class="main-top-box main">
              
              <div class="left">
                  <div id="totalPicture" ref="totalPicture"></div>
                  <div class="title">累计合格率</div>
              </div>
              <div class="middle">
                  <div id="weekUpload" ref="weekUpload"></div>
                  <div class="title">周上传情况</div>
              </div>
              <div class="right">
                  <div class="title">新老用户成长曲线</div>
                  <div id="userGroup" ref="userGroup"></div>
              </div>
          </div>
        </div>
    </div>
    
</template>

<script>
import echarts from "echarts";
import selectBox from "@/components/select-box.vue";
import area from "@/config/china_code_data.js";
import {
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
import selectBoxVue from "@/components/select-box.vue";

export default {
  data() {
    return {
      nowTime: "",
      numberList: [0], //今日上传数数组
      selectMainShow: false,
      todayArea: null,
      todayUpload: null,
      qingsuanpicture: null,
      totalPicture: null,
      weekUpload: null,
      userGroup: null,
      barPictureLengedData: [],
      bigStatus: true,
      refreshTime: "",
      countryList: area,
      activityIsShow: false,
      provinceShow: false,
      cityShow: false,
      provinceList: [],
      cityList: [],
      color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],

      brandList: [], //品牌列表
      activityId: "", //阶梯返利活动ID
      activityName: "", //阶梯返利活动名称
      activityList: [],
      groupList: [], //活动包名列表
      dateNow: this.Global.createTime(Date.now()),
      numList: [],
      spinShow: false,
      hand: "",
      groupList: [],
      showList: false,
      timer: null,
      formData: {
        groupId: "",
        activityId: "",
        provinceId: "",
        cityId: ""
      },
      timers: null
    };
  },
  components: { selectBox },
  watch: {
    "formData.activityId"() {
      this.init();
    }
  },
  computed: {},
  created() {
    let brandIdList = [];
    if (window.sessionStorage.getItem("user")) {
      let session = JSON.parse(window.sessionStorage.getItem("user"))
        .brandInfoList;

      for (let i = 0; i < session.length; i++) {
        brandIdList.push(session[i].id);
      }
    }
    var path = this.$route.path;
    if (path == "/displayKanBan") {
      this.bigStatus = true;
    } else {
      this.bigStatus = false;
    }
    this.nowTime = this.initializationTime();

    this.timer = setInterval(() => {
      this.nowTime = this.initializationTime();
    }, 1000);
    this.Global.doPostNoLoading(
      "displayYxtg/queryDisplayYxtgActivityGroupList.json",
      {
        brandList: brandIdList,
        groupType: 3
      },
      res => {
        this.brandList = [];
        if (res) {
          if (res.datalist && res.datalist.length) {
            for (let i = 0; i < res.datalist.length; i++) {
              this.brandList.push({
                label: res.datalist[i].groupName,
                value: res.datalist[i].id
              });
            }
            this.formData.groupId = this.brandList[0].value;
            this.init();
            this.Global.doPostNoLoading(
              "queryGroupArea.json",
              {
                groupId: this.formData.groupId,
                areaCode: ""
              },
              res => {
                this.provinceList = [];
                if (res && res.length) {
                  for (let i = 0; i < res.length; i++) {
                    this.provinceList.push({
                      label: res[i].areaName,
                      value: res[i].id
                    });
                  }
                }
              }
            );
          }
          this.activityList = [];
          queryActivityVOByGroupId(this.formData.groupId).then(res => {
            if (res && res.status == 1) {
              if (res.data && res.data.length) {
                for (let i = 0; i < res.data.length; i++) {
                  this.activityList.push({
                    label: res.data[i].name,
                    value: res.data[i].id
                  });
                }
              } else {
                this.activityList = [];
                // this.$Message.error("该活动包名下暂无活动");
              }
            }
          });
        }
      }
    );
  },

  mounted() {
    window.addEventListener("resize", this.reload);
    //初始化图表
    this.$nextTick(() => {
      this.todayArea = echarts.init(this.$refs.todayArea);
      this.todayUpload = echarts.init(this.$refs.todayUpload);
      this.qingsuanpicture = echarts.init(this.$refs.qingsuanpicture);
      this.totalPicture = echarts.init(this.$refs.totalPicture);
      this.userGroup = echarts.init(this.$refs.userGroup);
      this.weekUpload = echarts.init(this.$refs.weekUpload);
      this.drawBarPicture();
      this.drawWeekUpload();
      this.drawLineTotal();

      this.drawLineTodayUpload();
      this.drawLinepresentPicture();
      this.drawLineToday();
      this.init();
    });

    // if (this.formData.groupId) {
    this.timers = setInterval(() => {
      if (this.formData.groupId) {
        this.init();
      }
    }, 10000);
    // }
  },
  beforeDestroy() {
    this.activityList = [];
    window.removeEventListener("resize", this.reload);
    clearInterval(this.timer);
    clearInterval(this.timers);
  },
  methods: {
    reload() {
      location.reload();
    },
    cityClick(val) {
      this.init();
    },
    drawLineTodayUpload(todayData = [], yesterdayData = [], weekAgoData = []) {
      let xAxisData = [];
      for (let i = 0; i < 24; i++) {
        xAxisData.push(i);
      }
      let option = {
        color: ["#FF706E", "#6F99FF", "#FFBC6A"],

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          show: true,
          left: "center",
          bottom: 0,
          textStyle: {
            color: "#fff"
          },
          data: ["今日", "前一天", "前七天"]
        },

        grid: {
          left: "1%",
          right: "5%",
          bottom: "15%",
          top: "2%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            },
            textStyle: {
              color: "#fff"
            },
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            },
            axisTick: {
              show: false
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "今日",
            type: "line",
            // stack: "总量",
            areaStyle: { normal: {} },
            data: todayData
          },
          {
            name: "前一天",
            type: "line",
            // stack: "总量",
            areaStyle: { normal: {} },
            data: yesterdayData
          },
          {
            name: "前七天",
            type: "line",
            // stack: "总量",
            areaStyle: { normal: {} },
            data: weekAgoData
          }
        ]
      };

      this.todayUpload.setOption(option);
    },

    drawWeekUpload(
      xAxis = [],
      qualifiedData = [],
      notQualifiedData = [],
      auditData = [],
      uploadData = [],
      userData = [],
      // lengndData = ["合格", "不合格", "审核中", "待上传","可参与用户数"]
      lengndData = ["合格", "不合格", "审核中", "待上传"]
    ) {
      let option = {
        color: ["#49E287", "#FF706E", "#FFBC6A", "#6F99FF", "#F85730"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "1%",
          right: "5%",
          bottom: "15%",
          top: "10%",
          containLabel: true
        },

        legend: {
          show: true,
          bottom: 0,
          left: "center",
          data: lengndData,
          textStyle: {
            color: "#fff"
          }
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
                color: "#fff",
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: "#fff",
              fontSize: "12"
            },
            min: 0,
            // max: 250,
            // interval: 50,
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
                color: "#fff",
                width: 1
              }
            },
            splitLine: {
              show: false
            }
          },
          {
            type: "value",
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
                color: "#fff",
                width: 1
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
            name: "合格",
            type: "bar",
            stack: "aaa",
            barWidth: "70%",
            // barGap:30%,
            // barMinHeight:30,
            label: {
              normal: {
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                },
                show: true,
                position: "inside"
              }
            },
            data: qualifiedData
          },
          {
            name: "不合格",
            type: "bar",
            stack: "aaa",
            label: {
              normal: {
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                },
                show: true,
                position: "inside"
              }
            },
            data: notQualifiedData
          },
          {
            name: "审核中",
            type: "bar",
            stack: "aaa",
            label: {
              normal: {
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                },
                show: true,
                position: "inside"
              }
            },
            data: auditData
          },
          {
            name: "待上传",
            type: "bar",
            stack: "aaa",
            label: {
              normal: {
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                },
                show: true,
                position: "inside"
              }
            },
            data: uploadData
          }
          // {
          //   name: "可参与用户数",
          //   type: "line",
          //   yAxisIndex: 1,
          //   label: {
          //     normal: {
          //       formatter: function(params) {
          //         if (params.value > 0) {
          //           return params.value;
          //         } else {
          //           return "";
          //         }
          //       },
          //       show: true,
          //       position: "top",
          //       color: "#fff"
          //     }
          //   },
          //   data: userData
          // }
        ]
      };

      this.weekUpload.setOption(option);
    },
    //刷新
    reflashData() {
      this.refreshTime = this.initializationTime();
      this.init();
    },
    //初始化时间
    initializationTime() {
      let data = new Date();
      let year = data.getFullYear();
      let month = data.getMonth() + 1;
      month = month < 10 ? "0" + month : month;
      let day = data.getDate();
      day = day < 10 ? "0" + day : day;
      let hour = data.getHours();
      hour = hour < 10 ? "0" + hour : hour;
      let s = data.getMinutes();
      s = s < 10 ? "0" + s : s;
      let m = data.getSeconds();
      m = m < 10 ? "0" + m : m;
      return `${year}-${month}-${day} ${hour}:${s}:${m}`;
    },
    getActivityList() {},
    styleMethod(index) {
      let style = {
        backgroundColor: `${this.color[index]}`
      };
      return style;
    },
    drawLineToday(todayData = [], subtext = "0家") {
      //今日区域占比
      let option = {
        // color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
        title: {
          text: "今日占比",
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
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} {c} ({d}%)"
        },
        series: [
          {
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            color: ["#335573"],
            label: {
              normal: {
                position: "inner"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: todayData.length ? [] : [{ value: 100, name: "" }]
          },
          {
            name: "今日区域占比",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["35%", "50%"],
            data: todayData,
            label: {
              normal: {
                show: todayData.length ? true : false,
                formatter: "{b} {c}家 {d}%",
                color: "#fff",
                fontSize: 12
                // borderWidth: 20,
                // borderRadius: 4,
                // padding: [-10, -70]
              }
            },
            labelLine: {
              // show:false,
              normal: {
                show: todayData.length ? true : false,
                // length: 5,
                // length2: 50,
                lineStyle: {
                  color: "#fff"
                }
              }
            }
          }
        ]
      };
      this.todayArea.setOption(option);
    },

    drawLineTotal(
      totalData = [
        {
          name: "审核中",
          value: 0
        },
        {
          name: "通过",
          value: 0
        },
        {
          name: "不通过",
          value: 0
        },
        {
          name: "退回",
          value: 0
        }
      ],
      checkStatusListLegend = ["审核中", "通过", "不通过", "退回"],
      flag = false
    ) {
      //累积合格率

      let option = {
        color: [
          "#FFBA70",
          "#FF7070",
          "#49E287",
          "#6F99FF",
          "#F85730",
          "#FE1F08"
        ],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          show: flag,
          bottom: 0,
          left: "center",
          textStyle: {
            color: "#fff"
          },
          data: checkStatusListLegend
        },
        series: [
          {
            name: "累计合格率",
            type: "pie",
            radius: "70%",
            center: ["50%", "50%"],
            data: totalData,
            minAngle: 15,
            roseType: "radius",
            label: {
              // show: flag,
              normal: {
                show: flag,
                formatter: "{b} {d}%\n\n",
                color: "#fff",
                fontSize: 12,
                borderWidth: 20,
                borderRadius: 4,
                padding: [-10, -70]
              }
            },
            labelLine: {
              normal: {
                show: flag,
                length: 5,
                length2: 50,
                lineStyle: {
                  color: "#fff"
                }
              }
            },

            animationType: "scale",
            animationEasing: "elasticOut",
            animationDelay: function(idx) {
              return Math.random() * 200;
            }
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
        { name: "待清算", value: 0 },
        { name: "待提取", value: 0 },
        { name: "已提取", value: 0 }
      ],
      lengndData = ["待清算", "待提取", "已提取"],
      flag = false
    ) {
      //折扣分布\
      if (!presentData.length) {
        presentData = [
          { name: "待清算", value: 0 },
          { name: "待提取", value: 0 },
          { name: "已提取", value: 0 }
        ];
      }
      if (!personData.length) {
        personData = [
          { name: "待清算", value: 0 },
          { name: "待提取", value: 0 },
          { name: "已提取", value: 0 }
        ];
      }
      if (!lengndData.length) {
        lengndData = ["待清算", "待提取", "已提取"];
      }
      let option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        color: [
          "#FE1F08",
          "#26A7D9",
          "#00E78C",
          "#6901FB",
          "#0066FF",
          "#bda29a"
        ],
        legend: {
          bottom: 0,
          left: "center",
          data: lengndData,
          textStyle: {
            color: "#fff"
          }
        },
        series: [
          {
            name: "折扣分布",
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              normal: {
                show: flag,
                formatter: "{b}: {c} {d}%\n\n",
                color: "#fff",
                fontSize: 12,
                padding: [0, -70]
              }
            },
            labelLine: {
              normal: {
                show: flag,
                length: 5,
                length2: 50,
                lineStyle: {
                  color: "#fff"
                }
              }
            },
            data: presentData
          },
          {
            name: "清算结果",
            type: "pie",
            selectedMode: "single",
            selectedOffset: 0,
            radius: [0, "40%"],

            label: {
              normal: {
                position: "inner",
                fontSize: 12,
                formatter: "{b}: {c}"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: personData
          }
        ]
      };
      this.qingsuanpicture.setOption(option);
    },
    drawBarPicture(xAxis = [], oldUserData = [], newUserData = []) {
      let option = {
        color: ["#49E287", "#6F99FF", "#F85730"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "1%",
          right: "5%",
          bottom: "15%",
          top: "10%",
          containLabel: true
        },
        legend: {
          show: true,
          bottom: 0,
          left: "center",
          data: ["新用户", "老用户"],
          textStyle: {
            color: "#fff"
          }
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
              interval: 0,
              rotate: 40,
              textStyle: {
                color: "#fff",
                fontSize: "10"
              }
            },
            data: xAxis,
            axisPointer: {
              type: "shadow"
            },
            axisLine: {
              lineStyle: {
                color: "#fff",
                width: 1
              }
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            nameTextStyle: {
              color: "#fff",
              fontSize: "12"
            },
            min: 0,
            // max: 250,
            // interval: 50,
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
                color: "#fff",
                width: 1
              }
            },
            splitLine: {
              show: false
            }
          }
        ],
        series: [
          {
            name: "新用户",
            type: "bar",
            stack: "aaa",
            label: {
              normal: {
                show: true,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                },
                position: "inside"
              }
            },
            data: newUserData
          },
          {
            name: "老用户",
            type: "bar",
            stack: "aaa",
            label: {
              normal: {
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                },
                show: true,
                position: "inside"
              }
            },
            data: oldUserData
          }
        ]
      };

      this.userGroup.setOption(option);
    },
    init() {
      if (!this.formData.groupId) {
        return false;
      }
      let data = {
        groupId: this.formData.groupId,
        activityId: this.formData.activityId
      };
      let areaCode = "";
      if (this.formData.provinceId && this.formData.cityId) {
        areaCode = this.formData.cityId;
      } else if (this.formData.provinceId && !this.formData.cityId) {
        areaCode = this.formData.provinceId;
      } else if (!this.formData.provinceId && !this.formData.cityId) {
        areaCode = "";
      }
      if (areaCode) {
        data.areaCode = areaCode;
      }
      this.Global.deleteEmptyProperty(data);
      //实时上传数统计(今日，昨日，前7天当天) 实时数据
      this.Global.doPostNoLoading(
        "dataBoard/realTimeUploadCount.json",
        data,
        res => {
          let todayData = [];
          let yesterdayData = [];
          let weekAgoData = [];
          let countTodayUpload = 0;
          if (res) {
            //今日

            if (res["今日"]["今日"] && res["今日"]["今日"].length) {
              for (let i = 0; i < res["今日"]["今日"].length; i++) {
                if (!res["今日"]["今日"][i].stValue) {
                  res["今日"]["今日"][i].stValue = 0;
                }
                countTodayUpload += res["今日"]["今日"][i].stValue;
                todayData.push(res["今日"]["今日"][i].stValue);
              }
            }
            //今日上传数
            this.numberList = countTodayUpload
              .toString()
              .split()
              .join();
            //前1天
            if (res["昨日"]["前1天"] && res["昨日"]["前1天"].length) {
              for (let i = 0; i < res["昨日"]["前1天"].length; i++) {
                if (!res["昨日"]["前1天"][i].stValue) {
                  res["昨日"]["前1天"][i].stValue = 0;
                }
                yesterdayData.push(res["昨日"]["前1天"][i].stValue);
              }
            }
            //前7天
            if (res["上周"]["前7天"] && res["上周"]["前7天"].length) {
              for (let i = 0; i < res["上周"]["前7天"].length; i++) {
                if (!res["上周"]["前7天"][i].stValue) {
                  res["上周"]["前7天"][i].stValue = 0;
                }
                weekAgoData.push(res["上周"]["前7天"][i].stValue);
              }
            }
            this.drawLineTodayUpload(todayData, yesterdayData, weekAgoData);
          } else {
            this.drawLineTodayUpload();
          }
        }
      );
      //今日区域，清算情况，累计合格率统计 实时数据
      this.Global.doPostNoLoading(
        "dataBoard/todayCountReport.json",
        data,
        res => {
          if (res) {
            //今日区域占比
            let todayAreaData = [];
            let subtext = 0;
            if (res.area_list && res.area_list.length) {
              for (let i = 0; i < res.area_list.length; i++) {
                if (!res.area_list[i].areaName) {
                  res.area_list[i].areaName = "未知";
                }
                subtext += res.area_list[i].stValue;
                todayAreaData.push({
                  name: res.area_list[i].areaName,
                  value: res.area_list[i].stValue
                });
              }
              subtext += "家";
              this.drawLineToday(todayAreaData, subtext);
            } else {
              this.drawLineToday();
            }
            //清算情况资金
            let balanceList = [];
            let balanceLengedData = [];
            let flag = false;
            if (res.balance_list && res.balance_list.length) {
              for (let i = 0; i < res.balance_list.length; i++) {
                if (!res.balance_list[i].countValue) {
                  res.balance_list[i].countValue = 0;
                  continue;
                }
                let name = "";
                if (res.balance_list[i].stKey == -1) {
                  name = "待清算";
                }
                if (res.balance_list[i].stKey == 0) {
                  name = "待提取";
                }
                if (res.balance_list[i].stKey == 1) {
                  name = "提取中";
                }
                if (res.balance_list[i].stKey == 2) {
                  name = "已提取";
                }
                if (res.balance_list[i].stKey == 3) {
                  name = "退回";
                }
                if (res.balance_list[i].stKey == 4) {
                  name = "清算未发";
                }
                balanceLengedData.push(name);
                balanceList.push({
                  name,
                  value: res.balance_list[i].countValue
                });
              }
            }

            if (balanceList.length) {
              flag = true;
            }
            //清算情况人数
            let balancePersonList = [];

            if (res.liqiuDate_list && res.liqiuDate_list.length) {
              for (let i = 0; i < res.liqiuDate_list.length; i++) {
                if (!res.liqiuDate_list[i].stValue) {
                  res.liqiuDate_list[i].stValue = 0;
                  continue;
                }
                let name = "";
                if (res.liqiuDate_list[i].stKey == -1) {
                  name = "待清算";
                }
                if (res.liqiuDate_list[i].stKey == 0) {
                  name = "待提取";
                }
                if (res.liqiuDate_list[i].stKey == 1) {
                  name = "提取中";
                }
                if (res.liqiuDate_list[i].stKey == 2) {
                  name = "已提取";
                }
                if (res.liqiuDate_list[i].stKey == 3) {
                  name = "退回";
                }
                if (res.liqiuDate_list[i].stKey == 4) {
                  name = "清算未发";
                }

                balancePersonList.push({
                  name,
                  value: res.liqiuDate_list[i].stValue
                });
              }
            }
            this.drawLinepresentPicture(
              balanceList,
              balancePersonList,
              balanceLengedData,
              flag
            );

            //累积合格率
            let checkStatusList = [];
            let checkStatusListLegend = [];
            let auditNum = 0;
            let totalFlag = false;
            if (res.checkStatus_list && res.checkStatus_list.length) {
              res.checkStatus_list.sort((a, b) => {
                return a.stKey - b.stKey;
              });
              for (let i = 0; i < res.checkStatus_list.length; i++) {
                if (res.checkStatus_list[i].stKey == -1) {
                  continue;
                }
                let name = this.getName(res.checkStatus_list[i].stKey);
                checkStatusList.push({
                  name,
                  value: res.checkStatus_list[i].stValue
                });
                checkStatusListLegend.push(name);
              }
              if (checkStatusList.length) {
                totalFlag = true;
              }
              this.drawLineTotal(
                checkStatusList,
                checkStatusListLegend,
                totalFlag
              );
            } else {
              this.drawLineTotal();
            }
          } else {
            this.drawLineToday();
            this.drawLinepresentPicture();
            this.drawLineTotal();
          }
        }
      );

      //周上传情况
      this.Global.doPostNoLoading(
        "dataBoard/weekUploadCount.json",
        data,
        res => {
          if (res && res.week_list) {
            let lengndData = [];
            for (let item in res.week_list) {
              lengndData.push(item);
            }

            let qualifiedData = [];
            let xAxisData = [];
            //合格
            if (res.week_list["合格"] && res.week_list["合格"].length) {
              for (let i = 0; i < res.week_list["合格"].length; i++) {
                if (!res.week_list["合格"][i].countValue) {
                  res.week_list["合格"][i].countValue = 0;
                }
                if (!res.week_list["合格"][i].week) {
                  res.week_list["合格"][i].week = "";
                }
                xAxisData.push(res.week_list["合格"][i].week);
                qualifiedData.push(res.week_list["合格"][i].countValue);
              }
            }
            //不合格
            let notQualifiedData = [];
            if (res.week_list["不合格"] && res.week_list["不合格"].length) {
              for (let i = 0; i < res.week_list["不合格"].length; i++) {
                if (!res.week_list["不合格"][i].countValue) {
                  res.week_list["不合格"][i].countValue = 0;
                }
                notQualifiedData.push(res.week_list["不合格"][i].countValue);
              }
            }
            //审核中
            let auditData = [];
            if (res.week_list["审核中"] && res.week_list["审核中"].length) {
              for (let i = 0; i < res.week_list["审核中"].length; i++) {
                if (!res.week_list["审核中"][i].countValue) {
                  res.week_list["审核中"][i].countValue = 0;
                }
                auditData.push(res.week_list["审核中"][i].countValue);
              }
            }
            //待上传
            let uploadData = [];
            if (res.week_list["待上传"] && res.week_list["待上传"].length) {
              for (let i = 0; i < res.week_list["待上传"].length; i++) {
                if (!res.week_list["待上传"][i].countValue) {
                  res.week_list["待上传"][i].countValue = 0;
                }
                uploadData.push(res.week_list["待上传"][i].countValue);
              }
            }
            //参与用户数
            let userData = [];
            // if (
            //   res.week_list["参与用户数"] &&
            //   res.week_list["参与用户数"].length
            // ) {
            //   for (let i = 0; i < res.week_list["参与用户数"].length; i++) {
            //     if (!res.week_list["参与用户数"][i].countValue) {
            //       res.week_list["参与用户数"][i].countValue = 0;
            //     }
            //     userData.push(res.week_list["参与用户数"][i].countValue);
            //   }
            //   lengndData.push("可参与用户数")
            // }
            this.drawWeekUpload(
              xAxisData,
              qualifiedData,
              notQualifiedData,
              auditData,
              uploadData,
              userData,
              lengndData
            );
          } else {
            this.drawWeekUpload();
          }
        }
      );
      //新老用户成长曲线

      this.Global.doPostNoLoading(
        "dataBoard/userMonthCount.json",
        data,
        res => {
          if (res) {
            //新老用户数
            let newUserData = [];
            let xAxisData = [];
            let oldUserData = [];
            let keys = Object.keys(res["历史用户数"]);
            if (keys && keys.length) {
              keys.forEach(item => {
                xAxisData.push(item.slice(5, 10));
                newUserData.push(res["历史用户数"][item].newUser);
                oldUserData.push(res["历史用户数"][item].hisUser);
              });
            }
            if (res["今日用户数"]) {
              let todayKay = Object.keys(res["今日用户数"]);
              if (todayKay.length) {
                xAxisData.push(todayKay[0].slice(5, 10));
                newUserData.push(res["今日用户数"][todayKay[0]].newUser);
                oldUserData.push(res["今日用户数"][todayKay[0]].hisUser);
              }
            }
            this.drawBarPicture(xAxisData, oldUserData, newUserData);
          }
        }
      );
    },
    getName(val) {
      let name = "";
      switch (val) {
        case "1":
          name = "通过";
          break;
        case "2":
          name = "不通过";
          break;
        case "3":
          name = "退回";
          break;
        case "0":
          name = "审核中";
          break;
        default:
          name = "";
          break;
      }
      return name;
    },
    mainShow(e) {
      e.stopPropagation();
      this.selectMainShow = !this.selectMainShow;
    },
    cityShowClick(e) {
      e.stopPropagation();
      this.cityShow = !this.cityShow;
    },
    activityShow(e) {
      e.stopPropagation();
      this.activityIsShow = !this.activityIsShow;
    },
    brandClick(val) {
      this.activityList = [];
      this.init();
      this.formData.provinceId = "";
      this.provinceList = [];
      this.cityList = [];
      this.formData.cityId = "";
      this.Global.doPostNoLoading(
        "queryGroupArea.json",
        {
          groupId: this.formData.groupId,
          areaCode: ""
        },
        res => {
          if (res && res.length) {
            for (let i = 0; i < res.length; i++) {
              this.provinceList.push({
                label: res[i].areaName,
                value: res[i].id
              });
            }
          }
        }
      );
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: val },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ value: Number(item[0]), label: item[1] });
          });
        }
      );
    },
    activityClick(val) {
      this.init();
    },
    clear(e) {
      e.stopPropagation();
      this.activityName = "";
      this.activityId = "";
    },
    provinceShowClick(e) {
      e.stopPropagation();
      this.provinceShow = !this.provinceShow;
    },
    provinceClick(val) {
      this.formData.cityId = "";
      this.cityList = [];
      this.formData.cityId = "";
      this.Global.doPostNoLoading(
        "queryGroupArea.json",
        {
          groupId: this.formData.groupId,
          areaCode: this.formData.provinceId
        },
        res => {
          if (res && res.length) {
            for (let i = 0; i < res.length; i++) {
              this.cityList.push({
                label: res[i].areaName,
                value: res[i].id
              });
            }
          }
        }
      );
      this.init();
    },
    closeSelectModel() {
      this.cityShow = false;
      this.provinceShow = false;
      this.activityIsShow = false;
      this.selectMainShow = false;
    }
  }
};
</script>