<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    color: #333;
    cursor: pointer;
  }
  .demo {
    float: right;
    color: @primary-color;
    line-height: 24px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}

.vertical-center-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .ivu-modal {
    top: 0;
  }
  video {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
  }
}

.showRadio {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -250px;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #f5f7f9;
  border-radius: 5px;
  .close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 20px;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">返利统计明细</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="85">
        <Row>
          <Col span="21">
            <Row>
              <Col span="14">
                <Form-item label="时间:">
                  <Row>
                    <Col span="11">
                      <Form-item  >
                        <data-range
                          @dataChange="startTimeChange"
                          hour="00:00"
                          :time="formData.queryStartTime"
                          start
                        ></data-range>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center;">至</Col>
                    <Col span="11">
                      <Form-item  >
                        <data-range
                          hour="24:00"
                          placeholder="结束时间"
                          @dataChange="endTimeChange"
                          :time="formData.queryEndTime"
                        ></data-range>
                      </Form-item>
                    </Col>
                  </Row>
                </Form-item>
              </Col>
              <Col span="10">
                <Form-item label="品牌名称:" prop="brandId">
                  <Select
                    v-model="formData.brandId"
                    placeholder="请选择"
                    @on-change="changeValue"
                    clearable
                  >
                    <Option
                      :value="item.id"
                      v-for="(item,index) in brandList"
                      :key="index"
                    >{{ item.brandName }}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <Form-item label="活动名称:" prop="activityId">
                  <Select
                    v-model="formData.activityId"
                    placeholder="请选择"
                    @on-change="getpresentList"
                    clearable
                  >
                    <Option
                      :value="item.id"
                      v-for="(item,index) in activityList"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="返利阶梯:" prop="presentId">
                  <Select v-model="formData.presentId" placeholder="请选择" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in presentNameList"
                      :key="index"
                    >{{ item.activityTag }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="用户ID:" prop="storeId">
                  <Input v-model.trim="formData.storeId" placeholder="请输入用户ID"></Input>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px">
            <div class="searchBox">
              <Button @click="submit()" class="btn-search search_btn" type="primary">查询</Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-up"
                v-if="showQuery"
              ></Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-down"
                v-else
              ></Button>
            </div>
          </Col>
        </Row>
        <transition name="fade">
          <Row v-if="showQuery">
            <Col span="7">
              <Form-item label="领取状态:">
                <Select v-model="formData.recStatus" placeholder="请选择领取状态" clearable>
                  <Option value="1">已提现</Option>
                  <Option value="0">未提现</Option>
                </Select>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;padding-bottom:20px;">
      <div class="contentTop">
        <Button
          class="btn-export"
          icon="ios-download-outline"
          @click="exportExcel"
          type="primary"
        >导出</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
    </div>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryActivityVOByGroupId, //根据活动包名ID获取陈列活动列表
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "statistical-details-rebate-keepAlive",

  data() {
    return {
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      showQuery: false,
      formData: {
        recStatus: "", //状态
        showStatus: "",
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        activityName: "", //活动名称
        brandName: "", //品牌名称
        brandId: "",
        activityId: "",
        storeId: "",
        storeName: "",
        workerName: "",
        workerPhone: "",
        checkStatus: ""
      },
      statuList: [
        {
          text: "全部",
          value: ""
        },
        {
          text: "合格",
          value: "1"
        },
        {
          text: "不合格",
          value: "2"
        }
      ],
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 80
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 120
        },
        {
          title: "活动名称",
          key: "masterActivityName",
          align: "center",
          width: 120,
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  title: params.row.masterActivityName,
                  class: "TextOverflow"
                }
              },
              params.row.masterActivityName
            );
          }
        },
        {
          title: "关联活动",
          key: "slaveActivityName",
          align: "center",
          width: 120
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center",
          width: 120
        },
        {
          title: "客户名称",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "阶梯名称",
          key: "presentName",
          align: "center",
          width: 120
        },
        {
          title: "奖励内容",
          key: "goodsName",
          align: "center",
          width: 120,
          render: (h, f) => {
            let str = "";
            if (f.row.presentType == 2) {
              str = "现金红包";
            } else {
              str = f.row.goodsName;
            }
            return h("div", str);
          }
        },
        {
          title: "返利奖励",
          key: "presentAmount",
          align: "center",
          width: 120,
          render: (h, params) => {
            let str = "";
            if (params.row.winType == 2) {
              str = `${params.row.presentAmount}元`;
            } else if (params.row.winType == 1) {
              str = `${params.row.presentAmount}`;
            }
            return h("div", str);
          }
        },
        {
          title: "业务单号",
          key: "voucherNo",
          align: "center",
          width: 120
        },
        {
          title: "交易单号",
          key: "fundoutId",
          align: "center",
          width: 120
        },
        {
          title: "发放时间",
          key: "createTime",
          align: "center",
          width: 160,
          render: (h, params) => {
            let str = "";
            if (params.row.winStatus == 0) {
              str = "";
            } else if (params.row.winStatus == 1) {
              if (params.row.createTime) {
                str = this.formatYearMonth(params.row.createTime);
              }
            }
            return h("div", str);
          }
        },
        {
          title: "领取时间",
          key: "recTime",
          align: "center",
          width: 160,
          render: (h, params) => {
            let str = "";
            if (!params.row.recTime) {
              str = "";
            } else {
              str = this.Global.createTime(params.row.recTime);
            }
            return h("div", str);
          }
        },
        {
          title: "提现状态",
          key: "recStatus",
          align: "center",
          width: 120,
          render: (h, params) => {
            let str = "";
            if (params.row.recStatus == "0") {
              str = "未提现";
            } else if (params.row.recStatus == "1") {
              str = "已提现";
            } else if (params.row.recStatus == -1) {
              str = "未清算";
            } else if (params.row.recStatus == 2) {
              str = "已提取";
            }
            return h("div", str);
          }
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [] //分组
    };
  },
  components: {
    dataRange
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 15, activityType: 4, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  mounted() {},
  methods: {
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryStartTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    close() {
      this.showVideoPlay = false;
    },
    changeValue(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) {
        return;
      }
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 15, activityType: 4, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
          if (this.activityList.length) {
            this.formData.activityId = this.activityList[0].id;
            this.getpresentList(this.formData.activityId);
          }
        }
      );
    },
    getActivityList(value) {
      this.activityList = [];
      queryActivityVOByGroupId(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data;
        }
      });
    },
    getpresentList(value) {
      this.presentNameList = [];
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd hh:mm:ss");
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "joinGoodsRebate/quesyjoinGoodsRebateRecordExport.json",
        data
      );
      window.open(url);
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      if (!this.formData.activityId) {
        this.$Message.error("活动不能为空");
        return false;
      }
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost(
        "joinGoodsRebate/joinGoodsRebateRecord.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    },
    showVideo(url, e) {
      e.stopPropagation();
      this.radioUrl = "";
      this.showVideoPlay = true;
      this.radioUrl = url;
    }
  }
};
</script>