
<style lang="less" scoped>
@glod-color: #f1bf2e;
@primary-color: #ff8a34;
@bac-color: rgb(249, 249, 249);
body,
html {
  width: 100%;
  height: 100%;
}
#MainBox {
  width: 100%;
  height: 100%;
  min-height: 1400px;
  overflow-x: auto;
  overflow-y: auto;
}
#Main {
  width: 100%;
  height: 100%;
  min-height: 700px;
  // background-image: url("../../assets/presentationBoardImage/1.png");
  // background-size: 100%;
  // background-repeat: no-repeat;
  // background-color: rgb(255, 255, 255);
  background: linear-gradient(to top,rgb(209,209,209) 30%,white 60%,rgb(209,209,209) );
  padding: 0;
  padding-top: 20px;
  overflow: hidden;
  .main-box {
    width: 100%;
    height: 100%;
    position: relative;
    .bigOrSmall {
      position: absolute;
      top: -18px;
      right: 10px;
      width: 22px;
      height: 22px;
      cursor: pointer;
      .bigOrSmallBox {
        display: none;
      }
      &:hover .bigOrSmallBox {
        display: block;
      }
    }
    .header {
      width: 100%;
      height: 46px;
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;
      .title {
        width: 356px;
        height: 46px;
        background: url("../../assets/presentationBoardImage/11.png") no-repeat;
        color: rgb(102, 102, 102);
        text-align: center;
        font-size: 26px;
        line-height: 40px;
      }
      .line {
        width: calc(~"(100% - 346px) / 2");
        height: 40px;
        position: absolute;
        top: 3px;
        .lef {
          width: 50%;
          height: 40px;
          background: url("../../assets/presentationBoardImage/14.png") repeat-x;
          position: absolute;
          top: 0;
        }
      }
      .left {
        left: 0;
        background: url("../../assets/presentationBoardImage/5.png") no-repeat;
        background-position: top right;
        .lef {
          left: 0;
        }
      }
      .right {
        right: 0;
        background: url("../../assets/presentationBoardImage/6.png") no-repeat;
        .lef {
          right: 0;
        }
      }
      .logBox {
        display: block;
        position: absolute;
        bottom: 0;
        right: 10px;
        cursor: pointer;
      }
    }
    .topBox,
    .bottomBox {
      width: 100%;
      height: calc(~"(100% - 56px)/2");
      position: absolute;
      top: 56px;
      padding: 0 10px;
      .boxs {
        width: 100%;
        border: 1px solid rgb(216, 216, 216);
        box-shadow: inset 0 0 40px rgb(212, 212, 212);
        position: relative;
        .left-top-box,
        .left-bottom-box,
        .right-top-box,
        .right-bottom-box {
          position: absolute;
          width: 40px;
          height: 20px;
          border-style: solid;
          border-color: #fff;
        }
        .left-top-box {
          top: -2px;
          left: -2px;
          border-width: 2px 0 0 2px;
          border:none;
        }
        .left-bottom-box {
          border-width: 0 0 2px 2px;
          bottom: -2px;
          left: -2px;
          border:none;

        }
        .right-top-box {
          top: -2px;
          right: -2px;
          border-width: 2px 2px 0 0;
          border:none;

        }
        .right-bottom-box {
          border-width: 0 2px 2px 0;
          bottom: -2px;
          right: -2px;
          border:none;

        }
      }
      .topMain {
        height: 100%;
        position: relative;
        .mapBox {
          background-image: url("../../assets/presentationBoardImage/2.png");
          background-size: 100% 100%;
          height: 50%;
          position: relative;
          .tipBox {
            position: absolute;
            width: 146px;
            height: 100px;
            top: calc(~"50% - 100px");
            border: 1px;
            left: calc(~"41% - 22px");
            z-index: 10;
            .image {
              display: block;
              width: 45px;
              height: 61px;
              position: absolute;
              top: 39px;
              left: 0;
            }
            .lineBox {
              position: absolute;
              top: 0;
              left: 45px;
              width: 80px;
              height: 100px;
              color: @primary-color;
              z-index: 10;
              .num {
                text-align: center;
              }
              .line1 {
                height: 2px;
                width: 80px;
                border: 1px solid @primary-color;
              }
              .text {
                width: 100%;
                text-align: center;
                line-height: 24px;
              }
              .line2 {
                position: absolute;
                top: 24px;
                border: 1px solid @primary-color;
                width: 20px;
                transform: rotate(-30deg) translateX(-20px) translateY(0px);
              }
            }
          }
          .cloud {
            transition: all 0.2s;
            transform: rotate(360deg);
            position: absolute;
            display: block;
            width: 108px;
            height: 89px;
            z-index: 1;
            // top: calc(~"50% - 18px");
            // left: calc(~"39% - 32px");
          }
        }
        .barBox {
          background-color: @bac-color;
          // box-shadow: 
          box-shadow: inset 0 0 40px rgb(212, 212, 212);
          width: 100%;
          position: absolute;
          height: 50%;
          top: 50%;
          left: 0;
          display: flex;
          flex-direction: row;
          .b-left {
            width: 50%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
            .circle {
              background-image: url("../../assets/presentationBoardImage/17.png");
              background-size: cover;
              position: relative;
              display: flex;
              justify-content: center;
              align-items: center;
              .tit {
                position: absolute;
                top: calc(~"76% - 15px");
                height: 30px;
                border: 1px solid white;
                line-height: 30px;
                width: 110px;
                border-radius: 4px;
                background-color: rgb(58, 58, 58);
                color: white;
                font-size: 14px;
                left: calc(~"50% - 50px");
                text-align: center;
                cursor: pointer;
              }
            }
          }
          .b-right {
            width: 50%;
            height: 100%;
          }
        }
      }
      .aTitle {
        // background: url("../../assets/presentationBoardImage/12.png") no-repeat;
        width: 100%;
        height: 40px;
        background-position: 15px bottom;
        color: rgb(102, 102, 102);
        font-size: 22px;
        line-height: 40px;
        text-indent: 90px;
        margin: 25px 20px;
      }
      .aTitle1 {
        background: url("../../assets/presentationBoardImage/act.png") no-repeat;
      }
       .aTitle2 {
        background: url("../../assets/presentationBoardImage/audit.png") no-repeat;
      }
       .aTitle3 {
        background: url("../../assets/presentationBoardImage/fee.png") no-repeat;
      }
    }
    .bottomBox {
      top: calc(~"50% + 36px");
      padding: 0 10px;
      position: absolute;
      display: flex;
      flex-direction: column;
      .top {
        width: 100%;
        height: 66%;
        position: relative;
        display: flex;
        justify-content: space-between;
        .top-left,
        .top-right {
          height: 100%;
          width: calc(~"50% - 5px");
          background-color: @bac-color;
          position: relative;
          .uploadImage,
          .auditImage {
            position: absolute;
            top: 50px;
            left: 10px;
            right: 10px;
            bottom: 10px;
          }
        }
      }
      .bottom {
        position: absolute;
        top: 66%;
        left: 0;
        height: 34%;
        width: 100%;
        padding: 10px;
        .bottom-main {
          height: 100%;
          position: relative;
          background-color: @bac-color;
          .bottom-contain {
            position: absolute;
            top: 40px;
            left: 0;
            right: 0;
            bottom: 0;
            display: flex;
            justify-content: space-between;
            .bc {
              display: flex;
              justify-content: space-around;
              flex-direction: row;
              align-items: center;
              flex: 1;
              .bc-main {
                .tit {
                  color: rgb(102, 102, 102);
                  font-size: 14px;
                  text-align: center;
                }
                .imgBox {
                  height: 90px;
                  display: flex;
                  flex-direction: row;
                  align-items: flex-end;
                  img {
                    margin-right: 10px;
                  }
                  .people {
                    display: block;
                    color: rgb(102, 102, 102);
                    padding-left: 6px;
                    padding-bottom: 8px;
                    font-size: 14px;
                    font-weight: 600;
                  }
                }
              }
            }
            .bc-middle {
              width: 11px;
              background: url("../../assets/presentationBoardImage/9.png")
                repeat-y;
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
    <div id="Main">
      <div class="main-box">
        <div class="bigOrSmall">
          <div class="bigOrSmallBox">
            <router-link to="/presentationBoardBig" v-if="bigStatus">
              <Icon type="ios-expand" size="22" color="#fff" class="small"/>
            </router-link>
            <router-link to="/presentationBoard" v-else>
              <Icon type="ios-contract" size="22" color="#fff" class="big"/>
            </router-link>
          </div>
        </div>
        <div class="header">
          <div class="title"></div>
          <div class="left line">
            <div class="lef"></div>
          </div>
          <div class="right line">
            <div class="lef"></div>
          </div>
          <sGroup :groupId="groupId" :groupList="groupList" @getGroupId="getGid" class="logBox"/>
        </div>
        <div class="topBox">
          <div class="boxs topMain">
            <div class="left-top-box"></div>
            <div class="left-bottom-box"></div>
            <div class="right-top-box"></div>
            <div class="right-bottom-box"></div>

            <div class="mapBox" ref="mapBox">
              <img
                src="../../assets/presentationBoardImage/7.png"
                ref="cloud"
                class="cloud"
                id="cloud"
              >
              <div class="tipBox">
                <img src="../../assets/presentationBoardImage/10.png" class="image">
                <div class="lineBox">
                  <div class="num">
                    <digitroll
                      v-if="isRest"
                      :num="mapNum"
                      height="24"
                      color="#ff8a34"
                      fSize="16"
                      id="num4"
                    />
                  </div>
                  <div class="line line1"></div>
                  <div class="line line2"></div>

                  <div class="text">会展中心</div>
                </div>
              </div>
            </div>

            <div class="barBox">
              <div class="b-left" ref="bLeft">
                <div class="circle" ref="circle">
                  <digitroll
                    v-if="isRest"
                    :num="peopleNum"
                    height="150"
                    color="#fff"
                    fSize="80"
                    id="num3"
                  />
                  <div class="tit">当前参与门店数</div>
                </div>
              </div>
              <div class="b-right">
                <message
                  :destory="destory"
                  :brandId="brandId"
                  :groupId="groupId"
                  :isRest="isRest"
                  :peopleData="peopleData"
                  :isUpdate="isUpdate"
                  v-if="!destory"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="bottomBox">
          <div class="top">
            <div class="top-left boxs">
              <div class="aTitle aTitle1">
                <!-- 活动上传统计 -->
              </div>
              <div class="left-top-box"></div>
              <div class="left-bottom-box"></div>
              <div class="right-top-box"></div>
              <div class="right-bottom-box"></div>
              <div class="uploadImage" ref="uploadImage"></div>
            </div>
            <div class="top-right boxs">
              <div class="aTitle aTitle2"></div>
              <div class="left-top-box"></div>
              <div class="left-bottom-box"></div>
              <div class="right-top-box"></div>
              <div class="right-bottom-box"></div>

              <div class="auditImage" ref="auditImage"></div>
            </div>
          </div>
          <div class="bottom">
            <div class="bottom-main boxs">
              <div class="left-top-box"></div>
              <div class="left-bottom-box"></div>
              <div class="right-top-box"></div>
              <div class="right-bottom-box"></div>

              <div class="aTitle aTitle3"></div>

              <div class="bottom-contain">
                <div class="bc-left bc">
                  <div class="bc-main">
                    <div class="tit">合格已发放费用</div>
                    <div class="imgBox">
                      <img src="../../assets/presentationBoardImage/4.png" alt>
                      <digitroll
                        v-if="isRest"
                        :num="presentAmount"
                        color="#f7dd0e"
                        fSize="38"
                        id="num1"
                      />
                      <span class="people">元</span>
                    </div>
                  </div>
                  <div class="bc-main">
                    <div class="tit">合格已发放门店数</div>
                    <div class="imgBox">
                      <img src="../../assets/presentationBoardImage/15.png" alt>
                      <digitroll
                        v-if="isRest"
                        :num="countUser"
                        color="#f7dd0e"
                        fSize="38"
                        id="num6"
                      />
                      <span class="people">家</span>
                    </div>
                  </div>
                </div>
                <div class="bc-middle"></div>
                <div class="bc-right bc">
                  <div class="bc-main">
                    <div class="tit">已领取费用</div>
                    <div class="imgBox">
                      <img src="../../assets/presentationBoardImage/16.png" alt>
                      <digitroll
                        v-if="isRest"
                        :num="recAmount"
                        color="#f7dd0e"
                        fSize="38"
                        id="num2"
                      />
                      <span class="people">元</span>
                    </div>
                  </div>
                  <div class="bc-main">
                    <div class="tit">已领取门店数</div>
                    <div class="imgBox">
                      <img src="../../assets/presentationBoardImage/3.png" alt>
                      <digitroll
                        v-if="isRest"
                        :num="recUserCount"
                        color="#f7dd0e"
                        fSize="38"
                        id="num7"
                      />
                      <span class="people">家</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import digitroll from "@/components/digitroll/digitroll.vue";
import message from "@/components/message/message1.vue";
import sGroup from "@/components/selectGroup1.vue";
export default {
  name: "presentation-board",
  data() {
    return {
      showNum: true,
      isRest: true,
      bigStatus: true,
      isUpdate: false,
      uploadImage: null,
      auditImage: null,
      brandId: 3,
      mapNum: 0,
      destory: false,
      maxPeople: 50,
      peopleNum: 0,
      peopleList: [],
      peopleData: null,
      groupId: 137,
      groupList: [],
      presentAmount: 0, //已發放
      recUserCount: 0, //已接收
      countUser: 0, //合格已发放门店数
      recAmount: 0, //已领取费用
      echartsData: [
        { name: "待审核", key: "waitingCheck" },
        { name: "通过", key: "throughCount" },
        { name: "不通过", key: "notThroughCount" },
        { name: "退回", key: "backCount" }
      ],
      id: null,
      storeId: null,
      timer: null
    };
  },
  watch: {},
  created() {
    var path = this.$route.path;
    if (path == "/presentationBoard") {
      this.bigStatus = true;
    } else {
      this.bigStatus = false;
    }
  },
  components: { digitroll, message, sGroup },
  mounted() {
    this.uploadImage = echarts.init(this.$refs.uploadImage);
    this.auditImage = echarts.init(this.$refs.auditImage);
    this.queryGroupList();
    this.timer = setInterval(() => {
      this.init();
    }, 2000);
  },
  beforeDestroy() {
    console.log("ccdehcbdhcgy");
    this.clearAllTimerOut();
  },
  methods: {
    clearAllTimerOut() {
      this.destory = true;
      clearInterval(this.timer);
    },
    getBLeftSize(num) {
      let bLeft = this.$refs.bLeft;
      let { width, height } = bLeft.getBoundingClientRect();
      let size = Math.min(width, height) * 0.95;
      let circle = this.$refs.circle;
      circle.style.width = size + "px";
      circle.style.height = size + "px";
    },
    getCloudSize(num) {
      let mapBox = this.$refs.mapBox;
      // num = 30
      // num = num > this.maxPeople
      let { width, height } = mapBox.getBoundingClientRect();
      let scale = num / this.maxPeople;
      let cloud = this.$refs.cloud;
      let cloudW = 0.2 * width * scale;
      let cloudH = 0.6 * scale * height;
      let left = 0.41 * width - cloudW / 2;
      let top = 0.5 * height - cloudH / 2;
      cloud.style.left = left + "px";
      cloud.style.top = top + "px";

      cloud.style.width = cloudW + "px";
      cloud.style.height = cloudH + "px";
    },
    getGid(id) {
      this.groupId = id;

      this.resertData();
    },
    resertData() {
      this.mapNum = 0;
      this.peopleNum = 0;
      this.presentAmount = 0;
      this.recUserCount = 0;
      this.countUser = 0;
      this.recAmount = 0;
      this.id = null;
      this.storeId = null;
      this.resert();
    },
    resert() {
      this.isRest = false;
      this.$nextTick(() => {
        this.isRest = true;
      });
    },
    //当前参与人数与地图数据
    queryPeopleData() {
      this.Global.doPostNoLoading(
        "displayStoreApply/displayDemoSigningCountUserByDay.json",
        { groupId: this.groupId, brandId: this.brandId },
        res => {
          this.peopleNum = res ? res : 0;
          this.mapNum = res ? res : 0;
          this.getCloudSize(this.mapNum);
          this.getBLeftSize(this.peopleNum);
        }
      );
    },
    //当前参与人数列表
    queryPeopleList() {
      let data = {
        groupId: this.groupId,
        brandId: this.brandId,
        id: this.id,
        storeId: this.storeId
      };
      this.Global.deleteEmptyProperty(data);
      this.Global.doPostNoLoading(
        "displayStoreApply/displayDemoSigningCountUserByDayList.json",
        data,
        res => {
          if (res && res[0].id) {
            this.peopleData = res[0];
            this.id = res[0].id;
            this.storeId = res[0].storeId;
            this.isUpdate = true;
            this.$nextTick(() => {
              this.isUpdate = false;
            });
          } else {
            this.isUpdate = false;
            this.peopleData = null;
          }
        }
      );
    },
    //活动包数据
    queryGroupList() {
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: this.brandId },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.groupId = this.groupList[0].id;
            this.init();
          }
        }
      );
    },
    uploadMethod() {
      this.Global.doPostNoLoading(
        "displayStoreApply/displayDemoSigningCountActivityUpload.json",
        { groupId: this.groupId, brandId: this.brandId },
        res => {
          let xAxisData = [];
          let data = [];
          if (res && res.length) {
            res.forEach(item => {
              xAxisData.push(item.activityName);
              data.push(item.uploadCount);
            });
          }
          this.uploadImageInit(xAxisData, data);
        }
      );
    },
    init() {
      // this.queryPeopleList();
      this.queryBottomNum();
      this.uploadMethod();
      this.auditMethod();
      this.queryPeopleData();
    },
    queryBottomNum() {
      this.Global.doPostNoLoading(
        "displayStoreApply/displayDemoSigningCostSettlement.json",
        { groupId: this.groupId, brandId: this.brandId },
        res => {
          this.recUserCount = res.recUserCount ? res.recUserCount : 0;
          this.presentAmount = res.presentAmount ? res.presentAmount : 0;
          this.recAmount = res.recAmount ? res.recAmount : 0;
          this.countUser = res.countUser ? res.countUser : 0;
        }
      );
    },
    uploadImageInit(xAxisData = [], data = []) {
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
        xAxis: {
          type: "category",
          axisLabel: {
            show: true,
            textStyle: {
              color: "rgb(102,102,102)",
              fontSize: "16"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          // x轴的颜色和宽度
          axisLine: {
            lineStyle: {
              color: "rgb(192,192,192)",
              width: 3 //这里是坐标轴的宽度,可以去掉
            }
          },
          data: xAxisData
        },
        yAxis: { type: "value", show: false },
        series: [
          {
            name: "上传数",
            type: "bar",
            barWidth: 80,
            label: {
              normal: {
                show: true,
                position: "top",
                textStyle: {
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: "blod"
                }
              }
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: "#0d50ab"
                  },
                  {
                    offset: 1,
                    color: "#1ca8fc"
                  }
                ]),
                // color: function(params) { 
                //     var colorList = ['rgb(28,76,159)','rgb(15,28,160)','rgb(74,29,166)','#EE9201','#29AAE3', '#B74AE5','#0AAF9F','#E89589','#16A085','#4A235A','#C39BD3 ','#F9E79F','#BA4A00','#ECF0F1','#616A6B','#EAF2F8','#4A235A','#3498DB' ]; 
                //     return colorList[params.dataIndex] 
                // }
              }
            },

            data
          }
        ]
      };

      this.uploadImage.setOption(option);
    },
    auditImageInit(echartData = []) {
      var scale = 1;

      var rich = {
        yellow: {
          color: "#ffc72b",
          fontSize: 30 * scale,
          padding: [5, 4],
          align: "center"
        },
        total: {
          color: "#ffc72b",
          fontSize: 40 * scale,
          align: "center"
        },
        white: {
          color: "rgb(102,102,102)",
          align: "center",
          fontSize: 14 * scale,
          padding: [5, 0]
        },
        blue: {
          color: "#49dff0",
          fontSize: 16 * scale,
          align: "center"
        },
        hr: {
          borderColor: "rgb(192,192,192)",
          width: "100%",
          borderWidth: 1,
          height: 0
        }
      };
      let option = {
        color:['rgb(242,156,65)','rgb(67,150,78)','rgb(212,51,32)','rgb(54,140,247)'],
        series: [
          {
            name: "待审核",
            type: "pie",
            radius: ["38%", "60%"],
            hoverAnimation: false,
            color: [
              "rgb(255,152,31)",
              "#009944",
              "#e61600",
              "#038bbf",
              "#6f81da",
              "#00ffb4"
            ],
            label: {
              normal: {
                formatter: function(params, ticket, callback) {
                  var total = 0;
                  var percent = 0;
                  echartData.forEach(function(value, index, array) {
                    total += value.value;
                  });
                  percent = ((params.value / total) * 100).toFixed(1);
                  percent = isNaN(percent) ? 0 : percent;
                  return (
                    "{white|" +
                    params.name +
                    "---" +
                    params.value +
                    "}\n{hr|}\n{white|" +
                    // params.value +
                    // "}\n{white|" +
                    percent +
                    "%}"
                  );
                  // }
                  // return (
                  //   "{white|" +
                  //   params.name +
                  //   "---" +
                  //   params.value +
                  //   "}\n{hr|}"
                  // );
                },
                rich: rich
              }
            },
            labelLine: {
              normal: {
                length: 20 * scale,
                length2: 0,
                lineStyle: {
                  color: "rgb(192,192,192)"
                }
              }
            },
            data: echartData
          }
        ]
      };
      this.auditImage.setOption(option);
    },
    auditMethod() {
      this.Global.doPostNoLoading(
        "displayStoreApply/displayDemoSigningCountAuditCase.json",
        { groupId: this.groupId, brandId: this.brandId },
        res => {
          let echartData = [];
          this.echartsData.forEach(item => {
            echartData.push({
              name: item.name,
              value: res[item.key]
            });
          });
          this.auditImageInit(echartData);
        }
      );
    }
  }
};
</script>