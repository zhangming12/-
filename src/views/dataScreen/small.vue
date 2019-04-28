
<style lang="less" scoped>
@import "../../config/index.less";
@glod-color: #f1bf2e;
#Main {
  height: 100%;
  background: url("../../assets/image/scren-bg.png") center 20% no-repeat,
    url("../../assets/image/scren-top.png") center top no-repeat;
  background-size: 500px 300px, auto;
  background-color: #0c2a44;
  padding: 10px;
  position: relative;
}
.mainTop {
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
  .boxs {
    display: flex;
    width: 50%;
    margin: auto;
    justify-content: center;
    position: relative;
    z-index: 2;
  }
  span {
    color: #81adff;
  }
  div {
    cursor: pointer;
  }
  .activityChange,
  .selectBox {
    color: #fff;
  }
}
#mainTitle {
  height: 70px;
  .child {
    height: 100%;
    .child-plate {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      position: relative;
      padding-bottom: 10px;
      span {
        color: @glod-color;
        font-size: 30px;
      }
      p {
        color: #c3bace;
        font-size: 14px;
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 100%;
        margin-left: 10px;
        span {
          font-size: 14px;
          span {
            color: @primary-color;
          }
        }
      }
      .left {
        text-align: center;
      }
    }
    .child-plate:after {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      background: @primary-color;
      transition: all 0.5s;
      top: 100%;
      left: 50%;
    }
    .child-plate:hover:after {
      width: 100%;
      left: 0;
    }
    .year {
      flex-direction: row;
    }
  }
}
#mainContent {
  height: calc(~"(100% - 110px)");
  background: url("../../assets/image/left-top.png") 10px 10px no-repeat,
    url("../../assets/image/right-top.png") calc(~"100% - 10px") 10px no-repeat,
    url("../../assets/image/left-bottom.png") 10px calc(~"100% - 10px")
      no-repeat,
    url("../../assets/image/right-bottom.png") calc(~"100% - 10px")
      calc(~"100% - 10px") no-repeat;
  padding: 25px;
  .child {
    height: 100%;
  }
  #one {
    height: 60%;
    overflow: hidden;
    &.right {
      #title-main {
        float: right;
        // margin-bottom: 32px;
        background: linear-gradient(to left, #11326c, #0c2450);
        .title-txt {
          border-right: 1px solid @primary-color;
          border-left: none;
          padding-right: 5px;
        }
      }
    }
    .selectBox {
      color: #fff;
      margin: 10px 0;
    }
  }
  #two {
    height: 40%;
    overflow: hidden;
    &.right {
      #title-main {
        float: right;
        background: linear-gradient(to left, #11326c, #0c2450);
        .title-txt {
          border-right: 1px solid @primary-color;
          border-left: none;
          padding-right: 5px;
          text-align: right;
        }
        .subtext {
          text-align: right;
        }
      }
    }
  }
  #three {
    height: 100%;
    padding: 0 30px;
    .threeTop {
      height: 30%;
      //   background: radial-gradient(#254d82 70%, #0c2a44 2%);
      background: url("../../assets/image/screen-middle.png") center no-repeat;
      background-size: auto 100%;
      text-align: center;
      h4 {
        color: @glod-color;
        font-size: 18px;
      }
      span {
        color: @glod-color;
      }
      ul {
        display: flex;
        justify-content: center;
        margin-top: 20px;
        margin-bottom: 10px;
        li {
          width: 60px;
          height: 60px;
          background: url("../../assets/image/time.png") center no-repeat;
          background-size: auto;
          font-size: 37px;
          line-height: 60px;
          color: #fff;
        }
      }
    }
  }
  #title-main {
    width: 180px;
    padding: 10px;
    background: linear-gradient(to right, #11326c, #0c2450);
    .title-txt {
      color: #fff;
      border-left: 1px solid @primary-color;
      padding-left: 5px;
      line-height: 1;
    }
    .subtext {
      color: #6785be;
      line-height: 1;
      margin-top: 5px;
      font-size: 10px;
    }
  }
}
#activity,
#province,
#city {
  position: relative;
  padding-right: 22px;
  background: url("../../assets/image/san.png") right center no-repeat;
  text-align: center;
  background-size: 22px auto;
  .List {
    position: absolute;
    max-height: 200px;
    overflow-y: scroll;
    display: none;
    background: #0c2450;
    color: #fff;
    padding: 10px 20px;
    border: 1px solid #214b77;
    text-align: left;
  }
  .Title,
  .List li {
    .TextOverflow();
    height: 21px;
  }
  .show {
    display: block;
  }
}
</style>

<template>
  <div id="Main">
    <div class="mainTop">
      <div>
        <span></span>
      </div>
      <div class="boxs">
        <!-- 品牌的选择 -->
        <div class="activityChange" @click="showPackage">
          <div id="activity" style="width: 180px;">
            <div :id="formData.groupId" style="color: #d5ab32;" class="Title">{{groupName}}</div>

            <ul class="List" :class="{ 'show': showGroup}" style="width: 180px;left: -10px;">
              <li
                v-for="(item,index) in groupList"
                :key="index"
                @click.stop="changeGroup"
                :brandId="item.brandId"
                :id="item.id"
                :title="item.groupName"
              >{{ item.groupName }}</li>
            </ul>
          </div>
        </div>
        <!-- 活动的选择 -->
        <div class="activityChange" @click="show">
          <div id="activity" style="width: 180px;">
            <div :id="formData.activityId" style="color: #d5ab32;" class="Title">{{activityName}}</div>

            <ul class="List" :class="{ 'show': showList}" style="width: 180px;left: -10px;">
              <li id title="全部" @click="changeActivity">全部</li>
              <li
                v-for="(item,index) in activityList"
                :key="index"
                @click="changeActivity"
                :id="item.id"
                :title="item.name"
              >{{ item.name }}</li>
            </ul>
          </div>
        </div>

        <div class="selectBox">
          <div style="display: flex;">
            <!-- <div id='province' style='width: 120px;' @click='province'> -->
            <!-- 省的选择 -->
            <div id="province" style="width: 120px;" @click="province">
              <div style="color: #fb8833" class="Title">{{pro}}</div>

              <ul class="List" :class="{ 'show': showProvince}">
                <li id title="全部" @click="changeProvince">全部</li>
                <li
                  v-for="(item,index) in areaData"
                  :key="index"
                  @click="changeProvince"
                  :id="item.id"
                  :title="item.areaName"
                >{{ item.areaName }}</li>
              </ul>
            </div>
            <!-- 市的选择 -->
            <div id="city" style="width: 120px" @click="city">
              <div style="color: #fb8833" class="Title">{{cit}}</div>

              <ul class="List" :class="{ 'show': showCity}">
                <li id title="全部" @click="changeCity">全部</li>
                <li
                  v-for="(item,index) in cityData"
                  :key="index"
                  @click="changeCity"
                  :id="item.id"
                  :title="item.areaName"
                >{{ item.areaName }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <router-link to="/bigScreen" v-if="bigStatus">
        <!-- <Icon type="arrow-expand" size="22" color="#fff" class='small'></Icon> -->
        <Icon type="ios-expand" size="22" color="#fff" class="small"/>
      </router-link>
      <router-link to="/dataScreen" v-else>
        <!-- <Icon type="arrow-shrink" size="22" color="#fff" class='big'></Icon> -->
        <Icon type="ios-contract" size="22" color="#fff" class="big"/>
      </router-link>
    </div>
    <div id="mainTitle">
      <Row class-name="child" type="flex" justify="space-around">
        <Col span="4" class-name="child">
          <div class="child-plate">
            <span>{{ allData.scanCount }}</span>
            <p>累计参与量</p>
          </div>
        </Col>
        <Col span="4" class-name="child">
          <div class="child-plate">
            <span>{{ allData.userCount }}</span>
            <p>累计用户数</p>
          </div>
        </Col>
        <Col span="4" class-name="child">
          <div class="child-plate year">
            <div class="left">
              <span>{{ allData.lastScan ? allData.lastScan : 0 }}</span>
              <p>昨日参与量</p>
            </div>
            <div class="right">
              <span>
                <span>日环比</span>
                {{ allData.lastDayScan }}%
                <Icon
                  :type="allData.lastDayScan >0?'arrow-up-c':allData.lastDayScan == 0?'minus':'arrow-down-c'"
                  color="#ff8a34"
                ></Icon>
              </span>
              <span>
                <span>周环比</span>
                {{ allData.lastWeekScan }}%
                <Icon
                  :type="allData.lastWeekScan >0?'arrow-up-c':allData.lastWeekScan == 0?'minus':'arrow-down-c'"
                  color="#ff8a34"
                ></Icon>
              </span>
              <span>
                <span>月环比</span>
                {{ allData.lastMonthScan }}%
                <Icon
                  :type="allData.lastMonthScan >0?'arrow-up-c':allData.lastMonthScan == 0?'minus':'arrow-down-c'"
                  color="#ff8a34"
                ></Icon>
              </span>
            </div>
          </div>
        </Col>
        <Col span="4" class-name="child">
          <div class="child-plate year">
            <div class="left">
              <span>{{ allData.lastUser }}</span>
              <p>昨日用户数</p>
            </div>
            <div class="right">
              <span>
                <span>日环比</span>
                <span>{{ allData.lastDayUser }}%</span>
                <Icon
                  :type="allData.lastDayUser >0?'arrow-up-c':allData.lastDayUser == 0?'minus':'arrow-down-c'"
                  color="#ff8a34"
                ></Icon>
              </span>
              <span>
                <span>周环比</span>
                <span>{{ allData.lastWeekUser }}%</span>
                <Icon
                  :type="allData.lastWeekUser >0?'arrow-up-c':allData.lastWeekUser == 0?'minus':'arrow-down-c'"
                  color="#ff8a34"
                ></Icon>
              </span>
              <span>
                <span>月环比</span>
                <span>{{ allData.lastMonthUser }}%</span>
                <Icon
                  :type="allData.lastMonthUser >0?'arrow-up-c':allData.lastMonthUser == 0?'minus':'arrow-down-c'"
                  color="#ff8a34"
                ></Icon>
              </span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
    <div id="mainContent">
      <Row class-name="child">
        <Col class-name="child" span="7">
          <div id="one">
            <div id="title-main">
              <div class="title-txt">今日区域占比</div>
            </div>
            <div id="pieNest" style="height: 80%;width: 100%;"></div>
          </div>
          <div id="two">
            <div id="title-main">
              <div class="title-txt">近30天扫码量</div>
              <div class="subtext">统计时间：{{ yesterday }}</div>
            </div>
            <div id="lineStackLeft" style="height: 80%;"></div>
          </div>
        </Col>
        <Col class-name="child" span="9">
          <div id="three">
            <div class="threeTop">
              <h4>今日参与量</h4>
              <ul>
                <li v-for="(item,index) in numList " :key="index">{{ item }}</li>
              </ul>
              <span>{{ dateNow }}</span>
            </div>

            <div id="areaStack" style="height: 50%;"></div>
          </div>
        </Col>
        <Col class-name="child" span="8">
          <div id="one" class="right">
            <div id="title-main">
              <div class="title-txt" style="text-align:right;">今日男女覆盖率</div>
            </div>
            <div id="user" style="height: 80%;margin-top: 35px"></div>
          </div>
          <div id="two" class="right">
            <div id="title-main">
              <div class="title-txt">近30天用户数</div>
              <div class="subtext">统计时间：{{ yesterday }}</div>
            </div>
            <div id="lineStackRight" style="height: 80%;margin-top: 50px;"></div>
          </div>
        </Col>
      </Row>
    </div>
    <!-- <Spin fix v-if="spinShow">加载中...</Spin> -->
    <Spin fix v-if="spinShow">
      <Icon type="load-c" size="40" class="demo-spin-icon-load"></Icon>
      <div style="font-size: 14px;">Loading</div>
    </Spin>
  </div>
</template>

<script>
import echarts from "echarts";
import area from "../../config/gdAreacode.js";
import {
  typeQueryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
const today = new Date();
today.setTime(today.getTime() - 24 * 60 * 60 * 1000);
const yesterDay =
  today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

export default {
  data() {
    return {
      timerInterval: null, //时间计时器
      refrashIntervel: null, //定时刷新计时器
      bigStatus: true,
      pieNest: "",
      lineStackLeft: "",
      lineStackRight: "",
      areaData: [],
      cityData: "",
      areaStack: "",
      userStact: "",
      formData: {
        areaCode: "",
        activityId: "",
        brandId: "",
        groupId: "" //活动包名Id
      },
      parentCode: "",
      rule: {},
      activityList: [],
      groupList: [], //活动包名列表
      yesterday: yesterDay,
      allData: {
        scanCount: 0,
        userCount: 0,
        lastScan: 0,
        lastUser: 0,
        lastDayScan: 0,
        lastWeekScan: 0,
        lastMonthScan: 0,
        lastDayUser: 0,
        lastWeekUser: 0,
        lastMonthUser: 0
      },
      dateNow: this.Global.createTime(Date.now()),
      numList: [],
      spinShow: false,
      hand: "",
      activityName: "请选择活动",
      groupName: "",
      showGroup: false,
      showList: false,
      showProvince: false,
      showCity: false,
      pro: "请选择省",
      cit: "请选择市"
    };
  },
  created() {
    var path = this.$route.path;
    if (path == "/dataScreen") {
      this.bigStatus = true;
    } else {
      this.bigStatus = false;
    }
    this.Global.doPostNoLoading("queryActivityGroup.json", "", res => {
      this.groupList = res;
      if (res && res.length) {
        this.formData.groupId = res[0].id;
        this.formData.brandId = res[0].brandId;
        this.groupName = res[0].groupName;
        this.init();
        this.Global.doPostNoLoading("queryActivity.json", res[0].id, res => {
          this.activityList = res;
          if (res && res.length) {
            this.Global.changeArea(
              this.formData.groupId,
              res[0].id,
              "",
              pro => {
                this.areaData = pro;
              }
            );
          }
        });
      }
    });
    this.timerInterval = setInterval(() => {
      this.dateNow = this.Global.createTime(Date.now());
    }, 1000);
    this.hand = setInterval(() => {
      this.trueTime();
    }, 10000);
    // this.cityData = this.areaData[0].children;
  },
  beforeDestroy() {
    this.activityList = [];
  },
  methods: {
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      this.activityName = "";
      typeQueryActivityVOByGroupId({ groupId: value, type: 1 }).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data;
        }
      });
    },
    showPackage() {
      this.showGroup = !this.showGroup;
    },
    show: function() {
      this.showList = !this.showList;
    },
    province: function(e) {
      this.showProvince = !this.showProvince;
    },
    city: function() {
      this.showCity = !this.showCity;
    },
    changeGroup(e) {
      this.formData.groupId = e.target.id;
      this.formData.brandId = this.findBrandId(e.target.id);
      console.log(e.target.brandId);
      // console.log(this.formData)
      this.groupName = e.target.title;
      this.showGroup = false;
      this.activityName = "请选择活动";
      this.formData.activityId = "";
      this.areaData = [];
      this.formData.areaCode = "";
      this.init();
      this.Global.doPostNoLoading("queryActivity.json", e.target.id, res => {
        this.activityList = res;
      });
      this.Global.changeArea(
        this.formData.groupId,
        this.formData.activityId,
        "",
        res => {
          this.areaData = res;
          if (res) {
            this.pro = "请选择省";
            this.cit = "请选择市";
            this.init();
            this.spinShow = false;
          }
        }
      );
    },
    changeActivity(e) {
      this.formData.activityId = e.target.id;
      this.activityName = e.target.title;
      this.showList = !this.showList;
      this.spinShow = true;
      this.show();
      this.areaData = [];
      this.formData.areaCode = "";
      this.Global.changeArea(this.formData.groupId, e.target.id, "", res => {
        this.areaData = res;
        if (res) {
          this.pro = "请选择省";
          this.cit = "请选择市";
          this.init();
          this.spinShow = false;
        }
      });
    },
    changeProvince(e) {
      this.formData.areaCode = e.target.id;
      this.parentCode = e.target.id;
      this.pro = e.target.title;
      this.cit = "请选择市";
      if (e.target.id) {
        this.Global.changeArea(
          this.formData.groupId,
          this.formData.activityId,
          e.target.id,
          res => {
            this.cityData = res;
            this.init();
            this.spinShow = false;
          }
        );
      } else {
        this.cityData = [];
        this.init();
        this.spinShow = false;
      }
    },
    changeCity(e) {
      if (e.target.id) {
        this.formData.areaCode = e.target.id;
      } else {
        this.formData.areaCode = this.parentCode;
      }
      this.cit = e.target.title;
      this.showCity = !this.showCity;
      this.spinShow = true;
      this.city();
      this.init();
      this.spinShow = false;
    },
    pieNestStart() {
      this.pieNest = echarts.init(document.getElementById("pieNest"));
      var pieNestOption = {
        textStyle: { color: "#ffffff", fontSize: "12" }, //字体
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} ({d}%)"
        },
        title: {
          text: "今日占比",
          textStyle: { color: "#ffffff", fontSize: "12" },
          x: "center",
          y: "center"
        },
        grid: {
          left: 0,
          right: 0
        },
        series: []
      };
      this.pieNest.setOption(pieNestOption, true);
    },
    lineStackLeftStart() {
      this.lineStackLeft = echarts.init(
        document.getElementById("lineStackLeft")
      );
      var date = 1;
      var lineStackLeftOption = {
        tooltip: {
          trigger: "axis"
        },
        textStyle: { color: "#ffffff" }, //字体
        color: [
          "#ed7d31",
          "#5b9bd5",
          "#a5a5a5",
          "#ffc000",
          "#4472c4",
          "#70ad47",
          "#9e480e",
          "#d48265",
          "#997300",
          "#7cafdd",
          "#f1975a",
          "#b7b7b7"
        ],
        grid: {
          left: "5%",
          right: "5%",
          bottom: "10%",
          top: "5%",
          containLabel: true
        },
        xAxis: {
          axisLine: {
            lineStyle: { color: "#ffffff" }
          },
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          axisLine: { lineStyle: { color: "#ffffff" } },
          splitLine: { show: false },
          type: "value"
        },
        series: []
      };
      this.lineStackLeft.setOption(lineStackLeftOption, true);
    },
    lineStackRightStart() {
      this.lineStackRight = echarts.init(
        document.getElementById("lineStackRight")
      );
      var lineStackRightOption = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          textStyle: { color: "#ffffff" }, //字体
          bottom: "0%"
        },
        textStyle: { color: "#ffffff" }, //字体
        color: [
          "#ed7d31",
          "#5b9bd5",
          "#a5a5a5",
          "#ffc000",
          "#4472c4",
          "#70ad47",
          "#9e480e",
          "#d48265",
          "#997300",
          "#7cafdd",
          "#f1975a",
          "#b7b7b7"
        ],
        grid: {
          left: "5%",
          right: "10%",
          bottom: "10%",
          top: "5%",
          containLabel: true
        },

        xAxis: {
          axisLine: {
            lineStyle: { color: "#ffffff" }
          },
          type: "category",
          boundaryGap: false
        },
        yAxis: {
          axisLine: { lineStyle: { color: "#ffffff" } },
          splitLine: { show: false },
          type: "value"
        },
        series: []
      };
      this.lineStackRight.setOption(lineStackRightOption, true);
    },
    areaStackStart() {
      this.areaStack = echarts.init(document.getElementById("areaStack"));
      var areaStackOption = {
        textStyle: { color: "#ffffff" }, //字体
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        color: [
          "rgba(165,165,165,.6)",
          "rgba(91,155,213,.6)",
          "rgba(237,125,49,.6)",
          "#ffc000",
          "#4472c4",
          "#70ad47",
          "#9e480e",
          "#d48265",
          "#997300",
          "#7cafdd",
          "#f1975a",
          "#b7b7b7"
        ],
        legend: {
          textStyle: { color: "#ffffff" }, //字体
          // data:['果味水','茶π','力量帝维水'],
          bottom: "1%",
          height: "100%"
          // icon:"circle"
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
            data: []

            // data : ['9点前','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点后']
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: ["rgba(204,204,204,.5)"]
              }
            }
          }
        ],
        series: []
      };
      this.areaStack.setOption(areaStackOption, true);
    },
    userStart() {
      this.userStact = echarts.init(document.getElementById("user"));
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}"
        },
        series: [
          {
            center: ["25.0%", "50%"],
            radius: ["49%", "50%"],
            clockWise: false,
            hoverAnimation: false,
            type: "pie",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                color: "#5886f0",
                borderColor: "#5886f0",
                borderWidth: 10
              },
              emphasis: {
                label: {
                  textStyle: {
                    fontSize: 12
                  }
                },
                color: "#5886f0",
                borderColor: "#5886f0",
                borderWidth: 10
              }
            },
            data: [
              {
                value: 0,
                name: "男 0%"
              },
              {
                name: "nan",
                value: 100,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: "#5886f0",
                    borderColor: "#5886f0",
                    borderWidth: 0
                  },
                  emphasis: {
                    color: "#5886f0",
                    borderColor: "#5886f0",
                    borderWidth: 0
                  }
                }
              }
            ]
          },
          {
            center: ["75.0%", "50%"],
            radius: ["49%", "50%"],
            clockWise: false,
            hoverAnimation: false,
            type: "pie",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                color: "#ee3a3a",
                borderColor: "#ee3a3a",
                borderWidth: 10
              },
              emphasis: {
                label: {
                  textStyle: {
                    fontSize: 12
                  }
                },
                color: "#ee3a3a",
                borderColor: "#ee3a3a",
                borderWidth: 10
              }
            },
            data: [
              {
                value: 0,
                name: "女 0%"
              },
              {
                value: 100,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: "#ee3a3a",
                    borderColor: "#ee3a3a",
                    borderWidth: 0
                  },
                  emphasis: {
                    color: "#ee3a3a",
                    borderColor: "#ee3a3a",
                    borderWidth: 0
                  }
                }
              }
            ]
          }
        ]
      };
      this.userStact.setOption(option);
    },
    findBrandId(id) {
      let brandId = null;
      this.groupList.forEach(item => {
        if (item.id == id) {
          brandId = item.brandId;
        }
      });
      return brandId;
    },
    init() {
      this.pieNestStart();
      this.lineStackLeftStart();
      this.lineStackRightStart();
      this.areaStackStart();
      this.userStart();
      this.trueTime();
      var prarms = this.Global.JsonChange(this.formData);
      prarms["groupId"] = Number(this.formData.groupId);
      this.Global.deleteEmptyProperty(prarms);
      if (prarms["activityId"]) {
        prarms["activityId"] = Number(prarms["activityId"]);
      }
      this.Global.doPostNoLoading(
        "activityProfileReport.json",
        {
          activityId: prarms.activityId,
          groupId: Number(this.formData.groupId),
          brandId: Number(this.formData.brandId),
          areaCode: 0
        },
        data => {
          this.allData.scanCount = data.totalScanCount;
          this.allData.userCount = data.totalUserCount;
          this.allData.lastScan = data.scanCount;
          this.allData.lastUser = data.userCount;
          var dayScan = this.Global.Count(
            data.scanCount,
            data.lastScanCount,
            3
          );
          var weekScan = this.Global.Count(
            data.weekScanCount,
            data.lastWeekScanCount,
            3
          );
          var monthScan = this.Global.Count(
            data.monthScanCount,
            data.lastMonthScanCount,
            3
          );
          var dayUser = this.Global.Count(
            data.userCount,
            data.lastUserCount,
            3
          );
          var weekUser = this.Global.Count(
            data.weekUserCount,
            data.lastWeekUserCount,
            3
          );
          var monthUser = this.Global.Count(
            data.monthUserCount,
            data.lastMonthUserCount,
            3
          );
          this.allData.lastDayScan = isNaN(dayScan) ? 0 : dayScan;
          this.allData.lastWeekScan = isNaN(weekScan) ? 0 : weekScan;
          this.allData.lastMonthScan = isNaN(monthScan) ? 0 : monthScan;
          this.allData.lastDayUser = isNaN(dayUser) ? 0 : dayUser;
          this.allData.lastWeekUser = isNaN(weekUser) ? 0 : weekUser;
          this.allData.lastMonthUser = isNaN(monthUser) ? 0 : monthUser;
        },
        true
      );

      this.Global.doPostNoLoading("lastMonthReport.json", prarms, res => {
        console.log(res);
        this.storeMonthScanReport(res);
        this.storeMonthJoinReport(res);
      });
    },
    vendorScanAreaReport(data) {
      // 圆饼图
      var data = getData(data.area_list);
      this.pieNest.setOption({
        series: this.getpieNestSeries(data)
      });
      function getData(topList) {
        var result = [];
        topList.map((item, index) => {
          result.push({
            value: item.bizValue.toFixed(),
            name: item.bizDesc + " " + item.bizValue
          });
        });
        return result;
      }
    },
    vendorScanHourReport(data) {
      // 堆叠图
      this.areaStack.setOption({
        xAxis: [
          {
            data: data.x_hour
          }
        ],
        series: this.getHourReportSeries(data.y_data_list, "bizValue", true),
        legend: {
          data: this.getLegendData(data.y_data_list)
        }
      });
    },
    trueTime() {
      var prarms = this.Global.JsonChange(this.formData);
      prarms["groupId"] = Number(this.formData.groupId);
      this.Global.deleteEmptyProperty(prarms);
      this.Global.doPostNoLoading(
        "scanAreaReport.json",
        prarms,
        data => {
          this.numList = this.checkNum(data.total_sum);
          this.vendorScanAreaReport(data);
          this.userInfo(data.sex_list);
        },
        true
      );
      this.Global.doPostNoLoading(
        "scanHourReport.json",
        prarms,
        data => {
          this.vendorScanHourReport(data);
        },
        true
      );
    },
    userInfo(data) {
      // 男女性别
      var ret = {};
      if (data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].bizKey == 1) {
            ret["man"] = data[i].bizValue;
          }
          if (data[i].bizKey == 0) {
            ret["woman"] = data[i].bizValue;
          }
        }
      } else {
        ret["man"] = 0;
        ret["woman"] = 0;
      }

      this.userStact.setOption({
        series: [
          {
            center: ["25.0%", "50%"],
            radius: ["49%", "50%"],
            clockWise: false,
            hoverAnimation: false,
            type: "pie",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                color: "#5886f0",
                borderColor: "#5886f0",
                borderWidth: 10
              },
              emphasis: {
                label: {
                  textStyle: {
                    fontSize: 12
                  }
                },
                color: "#5886f0",
                borderColor: "#5886f0",
                borderWidth: 10
              }
            },
            data: [
              {
                value: ret.man,
                name: "男 " + this.count(ret.man, ret.woman, 3) + "%"
              },
              {
                name: "nan",
                value: ret.woman,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: "#5886f0",
                    borderColor: "#5886f0",
                    borderWidth: 0
                  },
                  emphasis: {
                    color: "#5886f0",
                    borderColor: "#5886f0",
                    borderWidth: 0
                  }
                }
              }
            ]
          },
          {
            center: ["75.0%", "50%"],
            radius: ["49%", "50%"],
            clockWise: false,
            hoverAnimation: false,
            type: "pie",
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  textStyle: {
                    fontSize: 12
                  },
                  position: "center"
                },
                labelLine: {
                  show: false
                },
                color: "#ee3a3a",
                borderColor: "#ee3a3a",
                borderWidth: 10
              },
              emphasis: {
                label: {
                  textStyle: {
                    fontSize: 12
                  }
                },
                color: "#ee3a3a",
                borderColor: "#ee3a3a",
                borderWidth: 10
              }
            },
            data: [
              {
                value: ret.woman,
                name: "女 " + this.count(ret.woman, ret.man, 3) + "%"
              },
              {
                name: " ",
                value: ret.man,
                itemStyle: {
                  normal: {
                    label: {
                      show: false
                    },
                    labelLine: {
                      show: false
                    },
                    color: "#ee3a3a",
                    borderColor: "#ee3a3a",
                    borderWidth: 0
                  },
                  emphasis: {
                    color: "#ee3a3a",
                    borderColor: "#ee3a3a",
                    borderWidth: 0
                  }
                }
              }
            ]
          }
        ]
      });
    },
    storeMonthScanReport(data) {
      // 月扫码量
      this.lineStackLeft.setOption({
        xAxis: [
          {
            data: data.x_month_day
          }
        ],
        series: this.getHourReportSeries(data.y_scan_data_list, "bizValue")
      });
    },
    storeMonthJoinReport(data) {
      // 月参与量（用户数）
      this.lineStackRight.setOption({
        xAxis: [
          {
            data: data.x_month_day
          }
        ],
        series: this.getHourReportSeries(data.y_user_data_list, "bizValue")
      });
    },
    count(a, b, num) {
      var number = (a / (a + b)).toFixed(num);
      if (number == Infinity) {
        return 10000;
      } else if (number == -Infinity) {
        return -10000;
      } else if (isNaN(number)) {
        return 0;
      } else {
        return (number * 100).toFixed(1);
      }
    },
    getpieNestSeries(data) {
      return [
        {
          type: "pie",
          selectedMode: "single",
          radius: [0, "15%"],
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
          data: [{ value: 100, name: "" }]
        },
        {
          type: "pie",
          radius: ["16%", "25%"],
          color: [
            "#ed7d31",
            "#5b9bd5",
            "#a5a5a5",
            "#ffc000",
            "#4472c4",
            "#70ad47",
            "#9e480e",
            "#d48265",
            "#997300",
            "#7cafdd",
            "#f1975a",
            "#b7b7b7"
          ],
          itemStyle: { normal: { borderWidth: "2", borderColor: "#ffffff" } }, //描边
          data: data
        }
      ];
    },
    getHourReportSeries: function(y_data_list, attr, isarea) {
      var result = [];
      var areaStyle = null;
      if (isarea) {
        areaStyle = {
          normal: {}
        };
      }
      if (Array.isArray(y_data_list)) {
        result.push({
          name: "数量",
          type: "line",
          label: {
            normal: {
              show: false,
              position: "top"
            }
          },
          showSymbol: false,
          areaStyle: areaStyle,
          data: getData(y_data_list)
        });
      } else {
        for (var item in y_data_list) {
          result.push({
            name: item,
            type: "line",
            label: {
              normal: {
                show: false,
                position: "top"
              }
            },
            showSymbol: false,
            areaStyle: areaStyle,
            data: getData(y_data_list[item])
          });
        }
      }

      function getData(list) {
        var temp = [];
        if (isarea) {
          list.map(function(item, index) {
            temp[item["bizKey"]] = item[attr].toFixed();
          });
          for (var i = 0; i <= 23; i++) {
            if (!temp[i]) {
              temp[i] = 0;
            }
          }
        } else {
          list.map(function(item, index) {
            temp.push(item[attr].toFixed());
          });
        }

        return temp;
      }
      return result;
    },
    getLegendData: function(data) {
      var result = [];
      for (var item in data) {
        result.push(item);
      }
      return result.reverse();
    },
    checkNum: function(data) {
      var newData = data.toString();
      return newData.split("");
    }
  },
  destroyed() {
    clearInterval(this.timerInterval);
    clearInterval(this.hand);
  }
};
</script>