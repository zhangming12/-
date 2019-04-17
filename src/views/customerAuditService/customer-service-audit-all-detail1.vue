
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto 15px;
  padding-bottom: 0;
  background: #fff;
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}
.form {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 52.5%;

    .w18 {
      width: 33.3333%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;
      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    margin-top: 4px;
    color: #333;
  }
  .demo {
    float: right;
    color: @primary-color;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}

.searchBox {
  overflow: hidden;
  .search_btn {
    float: left;
    width: 50px;
    padding: 5px 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search_icon {
    float: left;
    padding: 5px 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.demo {
  color: @primary-color;
  margin-left: 20px;
  cursor: pointer;
}
.sitem {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.switch {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  .left,
  .right {
    width: 40%;
    text-align: center;
    cursor: pointer;
    color: white;
    background-color: #999;
  }
  .left {
    border-right: 1px solid #fff;
  }
  .active {
    background-color: @primary-color;
  }
}
#scoreImage,
#todayImage,
#typeImage {
  width: 100%;
  height: 500px;
}
.title {
  line-height: 30px;
  h3 {
    font-size: 18px;
  }
  span.span {
    cursor: pointer;
    color: #3399ff;
  }
}
.starBox {
  display: flex;
  flex-direction: row;
  img {
    width: 20px;
    height: 20px;
    margin-top: 4px;
    margin-left: 4px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动分值配置</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <div class="switch">
                  <div
                    class="left"
                    @click="dateChange('t')"
                    :class="{'active':formData.flag == 't' }"
                  >今天</div>
                  <div
                    class="left"
                    @click="dateChange('w')"
                    :class="{'active':formData.flag == 'w' }"
                  >最近7天</div>
                  <div
                    class="right"
                    @click="dateChange('m')"
                    :class="{'active':formData.flag == 'm' }"
                  >最近30天</div>
                </div>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryStartTime" required>
                <DatePicker
                  style="display:block;"
                  v-model="formData.queryStartTime"
                  type="date"
                  placeholder="筛选时间"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryEndTime" required>
                <DatePicker
                  style="display:block;"
                  v-model="formData.queryEndTime"
                  type="date"
                  placeholder="筛选时间"
                ></DatePicker>
              </Form-item>
            </div>
          </div>
          <div class="btn-right w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="submit('form')">
                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="box scoreBox" style="padding:10px">
        <div class="title">
          <Row v-if="formData.flag == 't'">
            <Col span="3" offset="1">
              <h3>时段审核曲线</h3>
            </Col>
            <Col span="2">{{ userName }}</Col>
            <Col span="3">今日总积分：{{ todayScore }}</Col>
            <Col span="3">今日审核数量：{{ todayNum }}</Col>
            <Col span="3">通过：{{ throughCount }}</Col>
            <Col span="3">退回：{{ backCount }}</Col>
            <Col span="3">不通过：{{ notThroughCount }}</Col>
            <Col span="2">
              <span class="span" @click="goToDetail">详情>></span>
            </Col>
          </Row>
          <Row v-else-if="formData.flag == 'w'">
            <Col span="2" offset="1">
              <h3>分值查看</h3>
            </Col>
            <Col span="2">{{ userName }}</Col>
            <Col span="3">今日总积分：{{ todayScore }}</Col>
            <Col span="3">今日审核数量：{{ todayNum }}</Col>
            <Col span="2">
              <span class="span" @click="goToDetail">详情>></span>
            </Col>
          </Row>
          <Row v-else>
            <Col span="2" offset="1">
              <h3>分值查看</h3>
            </Col>
            <Col span="2">{{ userName }}</Col>
            <Col span="3">本月总积分：{{ monthScore }}</Col>
            <Col span="3">本月审核数量：{{ monthNum }}</Col>
            <Col span="3">累计总积分：{{ allScore }}</Col>
            <Col span="3">
              <div class="starBox">
                <span>累计审核数量：{{ allNum }}</span>
                <template>
                  <img
                    :title="getToolWord(allNum)"
                    v-if="allNum > 100000"
                    src="@/assets/image/king.png"
                    alt
                  >
                  <img
                    :title="getToolWord(allNum)"
                    v-else-if="allNum > 50000"
                    src="@/assets/image/starShine.png"
                    alt
                  >
                  <img
                    :title="getToolWord(allNum)"
                    v-else-if="allNum > 30000"
                    src="@/assets/image/diamond.png"
                    alt
                  >
                  <img
                    :title="getToolWord(allNum)"
                    v-else-if="allNum > 10000"
                    src="@/assets/image/bronze.png"
                    alt
                  >
                </template>
              </div>
            </Col>
            <Col span="2">
              <span class="span" @click="goToDetail">详情>></span>
            </Col>
          </Row>
        </div>
      </div>
      <template v-if="formData.flag=='t'">
        <div class="box scoreBox">
          <div id="todayImage"></div>
        </div>
      </template>
      <template v-else>
        <div class="box scoreBox">
          <div id="scoreImage"></div>
        </div>
        <div class="box typeBox">
          <div class="title">
            <Row>
              <Col span="2" offset="1">
                <h3>类别查看</h3>
              </Col>
            </Row>
          </div>
          <div id="typeImage"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import config from "@/util/config.js";
import wpictureUpload from "@/components/word-picture-upload.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import {
  thirtyAgoDate,
  sevenAgoDate,
  toadyDate,
  getDate
} from "@/util/index.js";
import echarts from "echarts";
export default {
  name: "customer-service-audit-self-day",
  components: {
    wpictureUpload,
    dataRange,
    exportBtn,
    fieldNameDes
  },
  data() {
    return {
      backCount: 0,
      throughCount: 0,
      notThroughCount: 0,
      monthScore: 0,
      monthNum: 0,
      allScore: 0,
      allNum: 0,
      userId: "",
      todayScore: 0,
      todayNum: 0,
      formData: {
        flag: "t",
        queryStartTime: toadyDate,
        queryEndTime: toadyDate.replace("00:00:00", "24:00:00")
      },
      scoreImage: null,
      typeImage: null,
      todayImage: null
    };
  },
  created() {
    let {
      userId,
      userName,
      type,
      queryStartTime,
      queryEndTime
    } = this.$route.query;
    this.userId = userId;
    this.userName = userName;
    this.type = type;
    this.formData.flag = type;
    this.formData.queryStartTime = queryStartTime;
    this.formData.queryEndTime = queryEndTime;
  },
  watch: {},
  mounted() {
    this.dateChange(this.formData.flag);
  },
  methods: {
    goToDetail() {
      let query = {
        queryStartTime: this.Global.createTime(this.formData.queryStartTime),
        queryEndTime: this.Global.createTime(this.formData.queryEndTime),
        userName: this.userName,
        userId: this.userId
      };
      this.$router.push({
        path: "/customerServiceAuditAllDetail2",
        query
      });
    },
    dateChange(val) {
      this.$set(this.formData, "flag", val);
      if (val == "t") {
        this.formData.queryStartTime = toadyDate;
        this.formData.queryEndTime = toadyDate.replace("00:00:00", "24:00:00");
      } else {
        this.formData.queryEndTime = toadyDate;
        if (val == "w") {
          this.formData.queryStartTime = sevenAgoDate;
        } else {
          this.formData.queryStartTime = thirtyAgoDate;
        }
      }
      this.$nextTick(() => {
        this.init();
      });
    },
    //查询表头数据
    queryTHeadData() {
      let queryScreening =
        this.formData.flag == "w"
          ? "weeksOneself"
          : this.formData.flag == "m"
          ? "monthOneself"
          : "dayOneself";
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralStatistical.json",
        {
          userId: this.userId,
          queryScreening
        },
        res => {
          if (this.formData.flag == "w") {
            this.todayScore = res[0].integralCount ? res[0].integralCount : 0;
            this.todayNum = res[0].checkCount ? res[0].checkCount : 0;
          } else if (this.formData.flag == "m") {
            this.monthScore = res[0].integralCount ? res[0].integralCount : 0;
            this.monthNum = res[0].checkCount ? res[0].checkCount : 0;
            this.allScore = res[0].sumIntegralCount
              ? res[0].sumIntegralCount
              : 0;
            this.allNum = res[0].sumCheckCount ? res[0].sumCheckCount : 0;
          } else {
            this.todayScore = res[0].integralCount ? res[0].integralCount : 0;
            this.todayNum = res[0].checkCount ? res[0].checkCount : 0;
            this.notThroughCount = res[0].notThroughCount
              ? res[0].notThroughCount
              : 0;
            this.throughCount = res[0].throughCount ? res[0].throughCount : 0;
            this.backCount = res[0].backCount ? res[0].backCount : 0;
          }
        }
      );
    },
    submit(name) {
      this.page = 1;
      this.init(true);
    },
    todayInit(
      totalData = [0, 0, 0, 0, 0, 0, 0],
      passData = [0, 0, 0, 0, 0, 0, 0],
      backData = [0, 0, 0, 0, 0, 0, 0],
      noPassData = [0, 0, 0, 0, 0, 0, 0],
      otherData = [0, 0, 0, 0, 0, 0, 0]
    ) {
      this.todayImage = echarts.init(document.getElementById("todayImage"));
      let scoreImageOption = {
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
          data: ["总积分", "通过", "退回", "不通过", "异议"],
          right: 10,
          top: 50,
          orient: "vertical",
          itemGap: 25
        },
        grid: {
          left: "3%",
          right: 150,
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: [
              0,
              1,
              2,
              3,
              4,
              5,
              6,
              7,
              8,
              9,
              10,
              11,
              12,
              13,
              14,
              15,
              16,
              17,
              18,
              19,
              20,
              21,
              22,
              23
            ]
          }
        ],
        yAxis: [
          {
            type: "value"
          },
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "总积分",
            type: "line",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            areaStyle: { normal: {} },
            data: totalData
          },

          {
            name: "通过",
            type: "line",
            yAxisIndex: 0,
            areaStyle: { normal: {} },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: passData
          },
          {
            name: "退回",
            type: "line",
            yAxisIndex: 0,
            areaStyle: { normal: {} },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: backData
          },
          {
            name: "不通过",
            type: "line",
            yAxisIndex: 0,
            areaStyle: { normal: {} },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: noPassData
          },
          {
            name: "异议",
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            areaStyle: { normal: {} },
            data: otherData
          }
        ]
      };
      this.todayImage.setOption(scoreImageOption, true);
    },
    scoreInit(
      xAxisData = this.getResentDays(7),
      totalData = [0, 0, 0, 0, 0, 0, 0],
      passData = [0, 0, 0, 0, 0, 0, 0],
      backData = [0, 0, 0, 0, 0, 0, 0],
      noPassData = [0, 0, 0, 0, 0, 0, 0],
      otherData = [0, 0, 0, 0, 0, 0, 0]
    ) {
      this.scoreImage = echarts.init(document.getElementById("scoreImage"));
      let scoreImageOption = {
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
          data: ["总积分", "通过", "退回", "不通过", "异议"],
          right: 10,
          top: 50,
          orient: "vertical",
          itemGap: 25
        },
        grid: {
          left: "3%",
          right: 150,
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xAxisData
          }
        ],
        yAxis: [
          {
            type: "value"
          },
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "总积分",
            type: "line",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            areaStyle: { normal: {} },
            data: totalData
          },

          {
            name: "通过",
            yAxisIndex: 0,
            type: "line",
            areaStyle: { normal: {} },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: passData
          },
          {
            name: "退回",
            type: "line",
            yAxisIndex: 0,
            areaStyle: { normal: {} },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: backData
          },
          {
            name: "不通过",
            type: "line",
            yAxisIndex: 0,
            areaStyle: { normal: {} },
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: noPassData
          },
          {
            name: "异议",
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            areaStyle: { normal: {} },
            data: otherData
          }
        ]
      };
      this.scoreImage.setOption(scoreImageOption, true);
    },
    getToolWord(val) {
      let str = "";
      if (val >= 100000) {
        str = "您已经是最强王者！";
      } else if (val >= 50000) {
        str = "您是至尊星耀，距王者只差一步！";
      } else if (val >= 30000) {
        str = "虽然叫永恒钻石，希望你不要永恒在钻石YO！";
      } else {
        str = "原以为是个王者，没想到是个青铜！";
      }
      return str;
    },
    typeInit(
      yAxisData = this.getResentDays(7),
      oneScoreData = [0, 0, 0, 0, 0, 0, 0],
      twoScoreData = [0, 0, 0, 0, 0, 0, 0],
      threeScoreData = [0, 0, 0, 0, 0, 0, 0],
      fourScoreData = [0, 0, 0, 0, 0, 0, 0],
      fiveScoreData = [0, 0, 0, 0, 0, 0, 0],
      sixScoreData = [0, 0, 0, 0, 0, 0, 0],
      sevenScoreData = [0, 0, 0, 0, 0, 0, 0],
      eightScoreData = [0, 0, 0, 0, 0, 0, 0],
      nineScoreData = [0, 0, 0, 0, 0, 0, 0],
      tenScoreData = [0, 0, 0, 0, 0, 0, 0],
      totalData = [0, 0, 0, 0, 0, 0, 0]
    ) {
      //   if (!this.typeImage) {
      this.typeImage = echarts.init(document.getElementById("typeImage"));
      //   }
      let typeImageOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        legend: {
          data: [
            "1分",
            "2分",
            "3分",
            "4分",
            "5分",
            "6分",
            "7分",
            "8分",
            "9分",
            "10分"
          ],
          left: 100,
          bottom: 0,
          //   orient: "vertical",
          itemGap: 25
        },
        grid: {
          left: "3%",
          right: 150,
          bottom: 60,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: yAxisData
        },
        yAxis: [
          {
            type: "value"
          },
          {
            type: "value"
          }
        ],
        series: [
          {
            type: "line",
            yAxisIndex: 1,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "总数",
            data: totalData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "1分",
            data: oneScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "2分",
            data: twoScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "3分",
            data: threeScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "4分",
            data: fourScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "5分",
            data: fiveScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "6分",
            data: sixScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "7分",
            data: sevenScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "8分",
            data: eightScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "9分",
            data: nineScoreData
          },
          {
            type: "line",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "insideRight",
                // distance: 0,
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            name: "10分",
            data: tenScoreData
          }
        ]
      };
      this.typeImage.setOption(typeImageOption, true);
    },
    getResentDays(n) {
      let arr = [];
      if (n) {
        for (let i = 1; i <= n; i++) {
          arr.unshift(getDate(-i));
        }
      }
      return arr;
    },
    init(flag) {
      let data = {};
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);
      data["userId"] = this.userId;
      this.queryTHeadData();
      if (
        this.formData.flag == "t" &&
        data.queryEndTime == toadyDate.replace("00:00:00", "24:00:00") &&
        data.queryStartTime == toadyDate
      ) {
        this.Global.doPost(
          "auditIntegral/queryAuditIntegralOneselfByDay.json",
          { userId: data.userId },
          res => {
            let xAxisData = [];
            let totalData = [];
            let passData = [];
            let backData = [];
            let noPassData = [];
            let otherData = [];
            if (res && res.length) {
              res.forEach(item => {
                totalData.push(
                  item.aIRList && item.aIRList[0].integralCount
                    ? item.aIRList[0].integralCount
                    : 0
                );
                passData.push(
                  item.aIRList && item.aIRList[0].throughCount
                    ? item.aIRList[0].throughCount
                    : 0
                );
                backData.push(
                  item.aIRList && item.aIRList[0].backCount
                    ? item.aIRList[0].backCount
                    : 0
                );
                noPassData.push(
                  item.aIRList && item.aIRList[0].notThroughCount
                    ? item.aIRList[0].notThroughCount
                    : 0
                );
                otherData.push(
                  item.aIRList && item.aIRList[0].objectionCount
                    ? item.aIRList[0].objectionCount
                    : 0
                );
              });
            }
            this.todayInit(
              totalData,
              passData,
              backData,
              noPassData,
              otherData
            );
          }
        );
      } else {
        //分值查看
        if (flag) {
          this.$set(this.formData, "flag", "m");
        }

        this.Global.doPost(
          "auditIntegral/queryAuditIntegralOneselfByIntegral.json",
          data,
          res => {
            let xAxisData = [];
            let totalData = [];
            let passData = [];
            let backData = [];
            let noPassData = [];
            let otherData = [];
            if (res && res.length) {
              res.forEach(item => {
                xAxisData.push(item.stringCountTime);
                totalData.push(item.integralCount ? item.integralCount : 0);
                passData.push(item.throughCount ? item.throughCount : 0);
                backData.push(item.backCount ? item.backCount : 0);
                noPassData.push(
                  item.notThroughCount ? item.notThroughCount : 0
                );
                otherData.push(item.objectionCount ? item.objectionCount : 0);
              });
            }
            this.scoreInit(
              xAxisData,
              totalData,
              passData,
              backData,
              noPassData,
              otherData
            );
          }
        );
        //类别查看
        this.Global.doPost(
          "auditIntegral/queryAuditIntegralOneselfByScore.json",
          data,
          res => {
            let yAxisData = [];
            let oneScoreData = [];
            let twoScoreData = [];
            let threeScoreData = [];
            let fourScoreData = [];
            let fiveScoreData = [];
            let sixScoreData = [];
            let sevenScoreData = [];

            let eightScoreData = [];
            let nineScoreData = [];
            let tenScoreData = [];

            let totalData = [];
            if (res && res.length) {
              res.forEach(item => {
                yAxisData.push(item.stringCountTime);
                oneScoreData.push(
                  item.oneIntegralCount ? item.oneIntegralCount : 0
                );
                twoScoreData.push(
                  item.twoIntegralCount ? item.twoIntegralCount : 0
                );

                threeScoreData.push(
                  item.threeIntegralCount ? item.threeIntegralCount : 0
                );
                fourScoreData.push(
                  item.fourIntegralCount ? item.fourIntegralCount : 0
                );
                fiveScoreData.push(
                  item.fiveIntegralCount ? item.fiveIntegralCount : 0
                );

                sixScoreData.push(
                  item.sixIntegralCount ? item.sixIntegralCount : 0
                );
                sevenScoreData.push(
                  item.sevenIntegralCount ? item.sevenIntegralCount : 0
                );
                eightScoreData.push(
                  item.eightIntegralCount ? item.eightIntegralCount : 0
                );
                nineScoreData.push(
                  item.nineIntegralCount ? item.nineIntegralCount : 0
                );
                tenScoreData.push(
                  item.tenIntegralCount ? item.tenIntegralCount : 0
                );
                totalData.push(item.integralCount ? item.integralCount : 0);
              });
            }
            this.typeInit(
              yAxisData,
              oneScoreData,
              twoScoreData,
              threeScoreData,
              fourScoreData,
              fiveScoreData,
              sixScoreData,
              sevenScoreData,
              eightScoreData,
              nineScoreData,
              tenScoreData,
              totalData
            );
          }
        );
      }
    }
  }
};
</script>