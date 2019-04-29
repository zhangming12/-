
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
    //   border: 1px solid #e5e5e5;
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
#scoreImageToday,
#typeImage,
#typeImageToday {
  width: 100%;
  height: 500px;
}
.title {
  line-height: 30px;
  h3 {
    font-size: 18px;
  }
  span {
    cursor: pointer;
    color: #3399ff;
  }
}
.type-filter-box {
  display: flex;
  flex-direction: row;
  .items {
    width: 60px;
    text-align: center;
    line-height: 30px;
    cursor: pointer;
    border: 1px solid #e5e5e5;
    background-color: #aeaeae;
    color: white;
    &.active {
      background-color: @primary-color;
    }
  }
}

.scoreBox {
  position: relative;
  .hrefBox {
    position: absolute;
    top: 44px;
    right: 15px;
    z-index: 100;
    .item {
      // width: 50px;
      line-height: 30px;
      cursor: pointer;
      color: #3399ff;
      .block {
        display: inline-block;
        width: 20px;
        height: 10px;
        border-radius: 2px;
        background-color: gray;
      }
      .persion {
        display: inline-block;
        width: 100px;
        color: #666;
      }
    }
  }
}
.pSelectbox {
  // overflow: hidden;
  overflow-y: scroll;
  width: 100%;
  max-height: 400px;
  min-height: 40px;
  .pItem {
    width: 20%;
    height: 40px;
    line-height: 40px;
    float: left;
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
            <Col span="2" offset="1">
              <h3>分值查看</h3>
            </Col>
            <Col span="3">今日审核总数：{{ todayAllAudit }}</Col>
            <Col span="3">通过：{{todayPass}}</Col>
            <Col span="3">退回：{{todayBack}}</Col>
            <Col span="3">不通过：{{todayNoPass}}</Col>
            <Col span="2" offset="1">待审核：{{ waitingCheck }}</Col>
            <Col span="2">超时审核：{{ timeoutWaitingCheck }}</Col>
            <Col span="2">
              <span @click="goToDetail">详情>></span>
            </Col>
            <Col span="2">
              <Button type="primary" style="padding:4px 20px;" @click="peopleManage">人员管理</Button>
            </Col>
          </Row>
          <Row v-else-if="formData.flag == 'w'">
            <Col span="2" offset="1">
              <h3>分值查看</h3>
            </Col>
            <Col span="4">
              <div class="type-filter-box">
                <div
                  class="items"
                  :class="{'active':item.active}"
                  @click="scoreTypeFilter(item,index)"
                  v-for="(item,index) in scoreFilterList"
                  :key="index"
                >{{item.name}}</div>
              </div>
            </Col>
            <Col span="3">本周审核总数：{{ todayAllAudit }}</Col>
            <Col span="2">通过：{{todayPass}}</Col>
            <Col span="2">退回：{{todayBack}}</Col>
            <Col span="2">不通过：{{todayNoPass}}</Col>
            <!-- <Col span="2">
                            待审核：{{ waitingCheck }}
                        </Col>
                        <Col span="2">
                            超时审核：{{ timeoutWaitingCheck }}
            </Col>-->
            <Col span="2">
              <span @click="goToDetail">详情>></span>
            </Col>
            <Col span="2">
              <Button type="primary" style="padding:4px 20px;" @click="peopleManage">人员管理</Button>
            </Col>
          </Row>
          <Row v-else>
            <Col span="2" offset="1">
              <h3>分值查看</h3>
            </Col>
            <Col span="4">
              <div class="type-filter-box">
                <div
                  class="items"
                  :class="{'active':item.active}"
                  @click="scoreTypeFilter(item,index)"
                  v-for="(item,index) in scoreFilterList"
                  :key="index"
                >{{item.name}}</div>
              </div>
            </Col>
            <Col span="3">本月审核总数：{{ checkCount }}</Col>
            <Col span="2">通过：{{todayPass}}</Col>
            <Col span="2">退回：{{todayBack}}</Col>
            <Col span="2">不通过：{{todayNoPass}}</Col>
            <Col span="2">异议：{{objectionCount}}</Col>
            <Col span="2">
              <Button type="info" style="padding:4px 20px;" @click="exportExcel">导出</Button>
            </Col>
            <Col span="2">
              <Button type="primary" style="padding:4px 20px;" @click="peopleManage">人员管理</Button>
            </Col>
          </Row>
        </div>
      </div>
      <template v-if="formData.flag == 't'">
        <div class="box scoreBox">
          <div class="hrefBox">
            <div class="item" v-for="(item,index) in itemDataList" :key="index" v-if="modalShow">
              <span class="block"></span>
              <span class="persion">{{ item.userName }}</span>
              <span @click="detailClick(item)">详情>></span>
            </div>
          </div>
          <div id="scoreImageToday"></div>
        </div>
        <div class="box typeBox">
          <div class="title">
            <Row>
              <Col span="3" offset="1">
                <h3>时段审核曲线</h3>
              </Col>
              <Col span="8" offset="1">
                <div class="type-filter-box">
                  <div
                    class="items"
                    :class="{'active':item.active}"
                    @click="todayTypeFilter(item,index)"
                    v-for="(item,index) in todayFilterList"
                    :key="index"
                  >{{item.name}}</div>
                </div>
              </Col>
            </Row>
          </div>
          <div id="typeImageToday"></div>
        </div>
      </template>
      <template v-else>
        <div class="box scoreBox">
          <div class="hrefBox" v-if="modalShow">
            <div
              class="item"
              @click="detailClick(item)"
              v-for="(item,index) in itemDataList"
              :key="index"
            >
              <span class="block"></span>
              <span class="persion">{{ item.userName }}</span>
              <span @click="detailClick(item)">详情>></span>
            </div>
          </div>
          <div id="scoreImage"></div>
        </div>
        <div class="box typeBox">
          <div class="title">
            <Row>
              <Col span="2" offset="1">
                <h3>类别查看</h3>
              </Col>
              <Col span="8" offset="1">
                <div class="type-filter-box">
                  <div
                    class="items"
                    :class="{'active':item.active}"
                    @click="typeChange(item,index)"
                    v-for="(item,index) in typeFilterList"
                    :key="index"
                  >{{item.name}}</div>
                </div>
              </Col>
            </Row>
          </div>
          <div id="typeImage"></div>
        </div>
      </template>
      <Modal v-model="persionManageShow" width="800">
        <p slot="header" style="text-align:center">
          <span>人员管理</span>
        </p>
        <div>
          <CheckboxGroup v-model="persionSelectData" v-if="persionManageData.length">
            <div class="pSelectbox">
              <div class="pItem" v-for="( item,index) in persionManageData" :key="index">
                <Checkbox :label="item.userId">{{ item.userName }}</Checkbox>
              </div>
            </div>
          </CheckboxGroup>
          <p v-else style="text-align:center;line-height:40px;">暂无数据</p>
        </div>
        <div slot="footer">
          <Button type="success" @click="persionManageShow = false;">返回</Button>
          <Button type="warning" @click="surePersion">确定</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import config from "@/util/config.js";
import fieldNameDes from "@/components/field-name-description.vue";
import dataRange from "@/components/data-rang.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import {
  thirtyAgoDate,
  sevenAgoDate,
  toadyDate,
  getDate
} from "@/util/index.js";
import echarts from "echarts";
export default {
  name: "customer-service-audit-all-day-keepAlive",

  components: {
    dataRange,
    fieldNameDes
  },
  data() {
    return {
      checkCount: 0,
      todayPass: 0,
      todayNoPass: 0,
      todayBack: 0,
      objectionCount: 0,
      todayAllAudit: 0,
      todayPass: 0,
      todayNoPass: 0,
      todayBack: 0,
      waitingCheck: 0,
      timeoutWaitingCheck: 0,
      formData: {
        queryEndTime: toadyDate,
        queryStartTime: sevenAgoDate,
        flag: "t"
      },
      modalShow: true,
      itemDataList: [],
      todayFilterList: [
        {
          name: "积分",
          key: "integral",
          active: true
        },
        {
          name: "数量",
          key: "number",
          active: false
        }
      ],
      scoreFilterList: [
        {
          name: "积分",
          key: "integral",
          active: true
        },
        {
          name: "初审",
          key: "initial",
          active: false
        },
        {
          name: "复审",
          key: "last",
          active: false
        }
      ],
      typeFilterList: [
        {
          name: "总数",
          key: "",
          active: true
        },
        {
          name: "通过",
          key: "through_count",
          active: false
        },
        {
          name: "退回",
          key: "back_count",
          active: false
        },
        {
          name: "不通过",
          key: "not_through_count",
          active: false
        },
        {
          name: "异议",
          key: "objection_count",
          active: false
        }
      ],
      persionManageShow: false,
      persionManageData: [],
      persionSelectData: [],
      todayQueryType: "integral",
      scoreQueryType: "integral",
      scoreImage: null,
      scoreImageToday: null,
      typeImage: null,
      typeImageToday: null,
      queryScreening: "",
      userId: ""
    };
  },
  created() {},
  watch: {},
  mounted() {
    this.queryAllPersion();
  },
  methods: {
    checkboxChange(val) {
      this.itemDataList = [];
      if (val && val.length) {
        val.forEach(item => {
          this.itemDataList.push({
            userId: item,
            userName: this.getUserName(item)
          });
        });
      }
    },
    surePersion() {
      this.checkboxChange(this.persionSelectData);
      this.init();
      this.updateModal();
      this.persionManageShow = false;
    },
    updateModal() {
      this.modalShow = false;
      this.$nextTick(() => {
        this.modalShow = true;
      });
    },
    peopleManage() {
      this.persionManageShow = true;
    },
    queryAllPersion() {
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralTeamByUser.json",
        {},
        res => {
          this.persionManageData = res;
          this.itemDataList = [];
          res.forEach(item => {
            if (item.isDefault == 1) {
              this.persionSelectData.push(item.userId);
              this.itemDataList.push({
                userId: item.userId,
                userName: item.userName
              });
            }
          });
          this.dateChange("t");
        }
      );
    },
    goToDetail() {
      this.$router.push({
        path: "/customerServiceNoAudit"
      });
    },
    //查询表头数据
    queryTHeadData() {
      let queryScreening =
        this.formData.flag == "w"
          ? "weeksTogether"
          : this.formData.flag == "m"
          ? "monthTogether"
          : "dayTogether";
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralStatistical.json",
        {
          queryScreening
        },
        res => {
          if (this.formData.flag == "m") {
            this.checkCount = res[0].checkCount ? res[0].checkCount : 0;
            this.todayPass = res[0].throughCount ? res[0].throughCount : 0;
            this.todayNoPass = res[0].notThroughCount
              ? res[0].notThroughCount
              : 0;
            this.todayBack = res[0].backCount ? res[0].backCount : 0;
            this.objectionCount = res[0].objectionCount
              ? res[0].objectionCount
              : 0;
          } else {
            this.todayAllAudit = res[0].checkCount ? res[0].checkCount : 0;
            this.todayPass = res[0].throughCount ? res[0].throughCount : 0;
            this.todayNoPass = res[0].notThroughCount
              ? res[0].notThroughCount
              : 0;
            this.todayBack = res[0].backCount ? res[0].backCount : 0;
            this.waitingCheck = res[0].waitingCheck ? res[0].waitingCheck : 0;
            this.timeoutWaitingCheck = res[0].timeoutWaitingCheck
              ? res[0].timeoutWaitingCheck
              : 0;
          }
        }
      );
    },
    detailClick(item) {
      let time =
        this.formData.flag == "t"
          ? this.Global.createTime(this.formData.queryEndTime).replace(
              "00:00:00",
              "24:00:00"
            )
          : this.Global.createTime(this.formData.queryEndTime);
      this.$router.push({
        path: "/customerServiceAuditAllDetail1",
        query: {
          userId: item.userId,
          userName: item.userName,
          type: this.formData.flag,
          queryStartTime: this.Global.createTime(this.formData.queryStartTime),
          queryEndTime: time
        }
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
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "auditIntegral/auditIntegralTeamByMonthExport.json",
        data
      );
      window.open(url);
    },
    typeChange(item, index) {
      this.typeFilterList.forEach(item => {
        item.active = false;
      });
      item.active = true;
      this.queryType = item.key;
      this.queryTypeInitData();
    },
    todayTypeFilter(item, index) {
      this.todayFilterList.forEach(item => {
        item.active = false;
      });
      item.active = true;
      this.todayQueryType = item.key;
      this.timeAuditCurve();
    },
    scoreTypeFilter(item, index) {
      this.scoreFilterList.forEach(item => {
        item.active = false;
      });
      item.active = true;
      this.scoreQueryType = item.key;
      this.queryScoreInitData();
    },
    queryScoreInitData() {
      if (!this.formData.queryEndTime || !this.formData.queryStartTime) {
        this.$Message.info("请选择查询时间");
        return false;
      }
      let data = {
        queryEndTime: this.Global.createTime(this.formData.queryEndTime),
        queryStartTime: this.Global.createTime(this.formData.queryStartTime)
      };
      data["userId"] = this.persionSelectData.join();
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralTeamByIntegral.json",
        Object.assign({}, data, { queryScreening: this.scoreQueryType }),
        res => {
          let lengedData = [];
          let totalData = [];
          let seriesData = {};
          let xAxisData = [];
          if (res && res.length) {
            if (res[0].aIRList && res[0].aIRList.length) {
              res[0].aIRList.forEach(vv => {
                let userId = vv.userId;
                let userName = this.getUserName(userId);
                lengedData.push({
                  userName,
                  userId
                });
                seriesData[userName] = [];
              });
            }

            res.forEach(item => {
              let num = 0;
              xAxisData.push(item.stringCountTime);
              item.aIRList.forEach(vvv => {
                let val = vvv.integralCount;
                val = val ? val : 0;
                num += val;
                let userName = this.getUserName(vvv.userId);
                seriesData[userName].push(val);
              });
              totalData.push(num);
            });
          }
          this.scoreInit(lengedData, totalData, seriesData, xAxisData);
        }
      );
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    scoreInitToday(
      yAxisData,
      totalData,
      throughData,
      backData,
      notThroughtData
    ) {
      this.scoreImageToday = echarts.init(
        document.getElementById("scoreImageToday")
      );
      let scoreImageOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // legend: {
        //   data: lengedData,
        //   right: 70,
        //   top: 48,
        //   orient: "vertical",
        //   itemGap: 16
        // },
        grid: {
          left: "3%",
          right: 200,
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: yAxisData,
          offset: 10
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
            name: "总积分",
            type: "line",
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
            yAxisIndex: 1,
            // data: [320, 302, 301, 334, 390, 330, 320]
            data: totalData
          },
          {
            name: "通过",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            // data: [320, 302, 301, 334, 390, 330, 320]
            data: throughData
          },
          {
            name: "退回",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            // data: [320, 302, 301, 334, 390, 330, 320]
            data: backData
          },
          {
            name: "不通过",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            // data: [320, 302, 301, 334, 390, 330, 320]
            data: notThroughtData
          }
        ]
      };
      this.scoreImageToday.setOption(scoreImageOption, true);
    },
    scoreInit(lengedData, totalData, seriesData, xAxisData) {
      this.scoreImage = echarts.init(document.getElementById("scoreImage"));
      let arr = [];
      let lData = [];
      if (seriesData) {
        lData = Object.keys(seriesData);
        lData.forEach(item => {
          let obj = {
            name: item,
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
            data: seriesData[item]
          };
          arr.push(obj);
        });
      }
      arr.unshift({
        name: "总数",
        type: "line",
        yAxisIndex: 1,
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: function(params) {
              if (params.value > 0) {
                return params.value;
              } else {
                return "";
              }
            }
          }
        },
        data: totalData
      });
      let scoreImageOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // legend: {
        //   data: lengedData,
        //   right: 70,
        //   top: 48,
        //   orient: "vertical",
        //   itemGap: 16
        // },
        grid: {
          left: "3%",
          right: 200,
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          offset: 10
        },
        yAxis: [
          {
            type: "value"
          },
          {
            type: "value"
          }
        ],
        series: arr
      };
      this.scoreImage.setOption(scoreImageOption, true);
    },
    typeInit(
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
    ) {
      this.typeImage = echarts.init(document.getElementById("typeImage"));

      let typeImageOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
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
          right: "3%",
          bottom: 60,
          containLabel: true
        },
        xAxis: {
          type: "category",
          data: yAxisData,
          offset: 10
        },
        yAxis: [
          {
            type: "value"
          },
          { type: "value" }
        ],
        series: [
          {
            name: "总数",
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
            data: totalData
          },
          {
            name: "1分",
            type: "bar",
            yAxisIndex: 0,
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: oneScoreData
          },
          {
            name: "2分",
            type: "bar",
            yAxisIndex: 0,
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: twoScoreData
          },
          {
            name: "3分",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: threeScoreData
          },
          {
            name: "4分",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: fourScoreData
          },
          {
            name: "5分",
            type: "bar",
            yAxisIndex: 0,
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: fiveScoreData
          },
          {
            name: "6分",
            type: "bar",
            yAxisIndex: 0,
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: sixScoreData
          },
          {
            name: "7分",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: sevenScoreData
          },
          {
            name: "8分",
            type: "bar",
            yAxisIndex: 0,
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: eightScoreData
          },
          {
            name: "9分",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: nineScoreData
          },
          {
            name: "10分",
            type: "bar",
            stack: "总量",
            yAxisIndex: 0,
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            data: tenScoreData
          }
        ]
      };
      this.typeImage.setOption(typeImageOption, true);
    },
    typeInitToday(lengedData, totalData, seriesData) {
      this.typeImageToday = echarts.init(
        document.getElementById("typeImageToday")
      );

      let arr = [];
      let lData = [];
      if (seriesData) {
        lData = Object.keys(seriesData);
        lData.forEach(item => {
          let obj = {
            name: item,
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
            data: seriesData[item]
          };
          arr.push(obj);
        });
      }
      arr.unshift({
        name: "总数",
        type: "line",
        yAxisIndex: 1,
        label: {
          normal: {
            show: true,
            position: "inside",
            formatter: function(params) {
              if (params.value > 0) {
                return params.value;
              } else {
                return "";
              }
            }
          }
        },
        data: totalData
      });
      let typeImageOption = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        // legend: {
        //   data: ["1分", "2分", "3分", "5分", "6分", "8分"],
        //   left: 100,
        //   bottom: 0,
        //   //   orient: "vertical",
        //   itemGap: 25
        // },
        grid: {
          left: "3%",
          right: 200,
          bottom: 60,
          containLabel: true
        },
        xAxis: {
          type: "category",
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
          ],
          offset: 10
        },
        yAxis: [
          {
            type: "value"
          },
          { type: "value" }
        ],
        series: arr
      };
      this.typeImageToday.setOption(typeImageOption, true);
    },
    init() {
      if (!this.formData.queryEndTime || !this.formData.queryStartTime) {
        this.$Message.info("请选择查询时间");
        return false;
      }
      let data = {
        queryEndTime: this.Global.createTime(this.formData.queryEndTime),
        queryStartTime: this.Global.createTime(this.formData.queryStartTime)
      };
      this.queryTHeadData();
      data["userId"] = this.persionSelectData.join();
      if (
        this.formData.flag == "t" &&
        data.queryEndTime == toadyDate.replace("00:00:00", "24:00:00") &&
        data.queryStartTime == toadyDate
      ) {
        //分值查看
        this.Global.doPost(
          "auditIntegral/queryAuditIntegralTeamByDay.json",
          data,
          res => {
            let yAxisData = [];
            let totalData = [];
            let throughData = [];
            let backData = [];
            let notThroughtData = [];
            if (res && res.length) {
              res.forEach(item => {
                yAxisData.push(this.getUserName(item.userId));
                totalData.push(item.integralCount ? item.integralCount : 0);
                throughData.push(item.throughCount ? item.throughCount : 0);
                backData.push(item.backCount ? item.backCount : 0);
                notThroughtData.push(
                  item.notThroughCount ? item.notThroughCount : 0
                );
              });
            }
            this.scoreInitToday(
              yAxisData,
              totalData,
              throughData,
              backData,
              notThroughtData
            );
          }
        );
        //时段审核曲线
        this.timeAuditCurve();
      } else {
        //分值查看
        this.queryScoreInitData();
        //类别查看
        this.queryTypeInitData();
      }
    },
    getUserName(userId) {
      let str = "";
      this.persionManageData.forEach(item => {
        if (item.userId == userId) {
          str = item.userName;
        }
      });
      return str;
    },
    timeAuditCurve() {
      //时段审核曲线
      if (!this.formData.queryEndTime || !this.formData.queryStartTime) {
        this.$Message.info("请选择查询时间");
        return false;
      }
      let data = {
        queryEndTime: this.Global.createTime(this.formData.queryEndTime),
        queryStartTime: this.Global.createTime(this.formData.queryStartTime)
      };
      data["userId"] = this.persionSelectData.join();
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralTeamByMoment.json",
        Object.assign({}, { queryScreening: this.todayQueryType }, data),
        res => {
          let lengedData = [];
          let totalData = [];
          let seriesData = {};
          if (res && res.length) {
            if (res[0].aIRList && res[0].aIRList.length) {
              res[0].aIRList.forEach(vv => {
                let userId = vv.userId;
                let userName = this.getUserName(userId);
                lengedData.push({
                  userName,
                  userId
                });
                seriesData[userName] = [];
              });
            }

            res.forEach(item => {
              let num = 0;
              item.aIRList.forEach(vvv => {
                let val =
                  this.todayQueryType == "integral"
                    ? vvv.integralCount
                    : vvv.checkCount;
                val = val ? val : 0;
                num += val;
                let userName = this.getUserName(vvv.userId);
                seriesData[userName].push(val);
              });
              totalData.push(num);
            });
          }
          this.typeInitToday(lengedData, totalData, seriesData);
        }
      );
    },
    queryTypeInitData() {
      if (!this.formData.queryEndTime || !this.formData.queryStartTime) {
        this.$Message.info("请选择查询时间");
        return false;
      }
      let data = {
        queryEndTime: this.Global.createTime(this.formData.queryEndTime),
        queryStartTime: this.Global.createTime(this.formData.queryStartTime)
      };
      data["userId"] = this.persionSelectData.join();
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralTeamByScore.json",
        Object.assign({}, data, { queryScreening: this.queryType }),
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
              yAxisData.push(this.getUserName(item.userId));
              let num = 0;

              oneScoreData.push(
                item.oneIntegralCount ? item.oneIntegralCount : 0
              );
              num += item.oneIntegralCount ? item.oneIntegralCount : 0;

              twoScoreData.push(
                item.twoIntegralCount ? item.twoIntegralCount : 0
              );
              num += item.twoIntegralCount ? item.twoIntegralCount : 0;

              threeScoreData.push(
                item.threeIntegralCount ? item.threeIntegralCount : 0
              );
              num += item.threeIntegralCount ? item.threeIntegralCount : 0;

              fourScoreData.push(
                item.fourIntegralCount ? item.fourIntegralCount : 0
              );
              num += item.fourIntegralCount ? item.fourIntegralCount : 0;

              fiveScoreData.push(
                item.fiveIntegralCount ? item.fiveIntegralCount : 0
              );
              num += item.fiveIntegralCount ? item.fiveIntegralCount : 0;

              sixScoreData.push(
                item.sixIntegralCount ? item.sixIntegralCount : 0
              );
              num += item.sixIntegralCount ? item.sixIntegralCount : 0;

              sevenScoreData.push(
                item.sevenIntegralCount ? item.sevenIntegralCount : 0
              );
              num += item.sevenIntegralCount ? item.sevenIntegralCount : 0;

              eightScoreData.push(
                item.eightIntegralCount ? item.eightIntegralCount : 0
              );
              num += item.eightIntegralCount ? item.eightIntegralCount : 0;

              nineScoreData.push(
                item.nineIntegralCount ? item.nineIntegralCount : 0
              );
              num += item.nineIntegralCount ? item.nineIntegralCount : 0;

              tenScoreData.push(
                item.tenIntegralCount ? item.tenIntegralCount : 0
              );
              num += item.tenIntegralCount ? item.tenIntegralCount : 0;
              totalData.push(num);
            });
          }
          console.log(yAxisData);
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
    },
    userdataUnique(arr) {
      let obj = {};
      let newArr = [];
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i].userName]) {
          obj[arr[i].userName] = "a";
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    //数组去重
    arrUnique(arr) {
      return Array.from(new Set(arr));
    }
  }
};
</script>