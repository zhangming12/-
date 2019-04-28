<style lang="less" scoped>
@import "../../../config/index.less";
.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  // padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  // box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.demo-table-info-column {
  min-width: 100px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列申请审核</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="queryStartTime">
                <data-range
                  @dataChange="startTimeChange"
                  hour="00:00"
                  :time="formData.queryStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryEndTime">
                <data-range
                  placeholder="结束时间"
                  hour="24:00"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select v-model="formData.brandId" placeholder="品牌" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId">
                <Select
                  v-model="formData.groupId"
                  placeholder="活动"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId">
                <Select v-model="formData.activityId" placeholder="项目" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <Icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
                    <Icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                  </button>
                </div>
                <div class="btn-right search-right" @click="submit('form')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="container" v-if="showQuery">
              <div class="btn-left w18">
                <Form-item>
                  <Select v-model="formData.displayApplyStatus" placeholder="状态" clearable>
                    <Option value="0">待审核</Option>
                    <Option value="1">通过</Option>
                    <Option value="2">不通过</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Cascader
                    placeholder="区域"
                    :data="areaData"
                    v-model="formData.areaCode"
                    change-on-select
                  ></Cascader>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model="formData.storeId" placeholder="请输入店铺ID"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding: 0 10px">
        <div class="contentTop">
          <Button
            @click="exportExcel"
            class="btn-export btn-right"
            icon="ios-download-outline"
            type="primary"
          >导出</Button>
        </div>
        <Table :columns="columns" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
import { displayApplyStatus } from "@/util/ENUMS.js";
import { queryDisPlayApplyAudit } from "@/api/activity-manage/display-apply-examine.js"; //api
import dataRange from "@/components/data-rang.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "display-apply-keepAlive",
  data() {
    return {
      showQuery: false,
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        activityName: "",
        groupId: "",
        displayApplyStatus: "",
        storeId: "",
        areaCode: []
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "申请时间",
          key: "displayApplyTime",
          width: 150,
          align: "center"
        },
        {
          title: "店铺ID",
          key: "storeId",
          width: 150,
          align: "center"
        },
        {
          title: "店名",
          key: "storeName",
          width: 150,
          align: "center"
        },
        {
          title: "BAP销售渠道",
          key: "bapChannel",
          width: 150,
          align: "center"
        },
        {
          title: "营业部",
          key: "busiDept",
          width: 150,
          align: "center"
        },
        {
          title: "销售大区",
          key: "salesRegion",
          width: 150,
          align: "center"
        },
        {
          title: "销售部",
          key: "salesDept",
          width: 150,
          align: "center"
        },
        {
          title: "客户性质",
          key: "storeNature",
          width: 150,
          align: "center"
        },
        {
          title: "省",
          key: "province",
          width: 100,
          align: "center"
        },
        {
          title: "市",
          width: 100,
          key: "city",
          align: "center"
        },
        {
          title: "区",
          width: 100,
          key: "area",
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          width: 100,
          align: "center"
        },
        {
          title: "陈列活动",
          key: "activityName",
          width: 100,
          align: "center"
        },
        {
          title: "关联业代ID",
          key: "workerId",
          width: 110,
          align: "center"
        },
        {
          title: "关联业代姓名",
          key: "workerName",
          width: 120,
          align: "center"
        },
        {
          title: "状态",
          key: "displayApplyStatus",
          align: "center",
          width: 120
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            let buttonDom;
            if (params.row.displayApplyStatus) {
              buttonDom = [
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let queryParams = {
                          id: params.row.id,
                          activityId: params.row.activityId,
                          storeId: params.row.storeId,
                          displayActCategory: "look"
                        };

                        this.$router.push({
                          path: "/displayApplyExamine",
                          query: queryParams
                        });
                      }
                    }
                  },
                  "查看"
                )
              ];
            } else {
              buttonDom = [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let queryParams = {
                          id: params.row.id,
                          activityId: params.row.activityId,
                          storeId: params.row.storeId
                        };

                        this.$router.push({
                          path: "/displayApplyExamine",
                          query: queryParams
                        });
                      }
                    }
                  },
                  "审核"
                )
              ];
            }
            return h("div", buttonDom);
          }
        }
      ],
      pageData: [],
      areaData: area,
      brandList: [],
      activityList: []
    };
  },
  components: {
    dataRange
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 3, scope: "a" },
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
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
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
    init(currentPage, pageSize) {
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
      delete data["queryTime"];
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      queryDisPlayApplyAudit(data).then(res => {
        if (res.status == 1) {
          this.pageNum = res.data.items;
          this.pageData = res.data.datalist;
          this.page = res.data.page;
          for (let i = 0; i < this.pageData.length; i++) {
            var index = this.pageData[i]["displayApplyStatus"];
            if (index == 0) {
              this.pageData[i]["displayApplyStatus"] = "未审核";
            } else if (index == 1) {
              this.pageData[i]["displayApplyStatus"] = "通过";
            } else if (index == 2) {
              this.pageData[i]["displayApplyStatus"] = "未通过";
            } else if (index == 3) {
              this.pageData[i]["displayApplyStatus"] = "二次审核通过";
            } else if (index == 4) {
              this.pageData[i]["displayApplyStatus"] = "退回";
            }
            this.pageData[i]["displayApplyTime"] = this.formateTime(
              this.pageData[i]["displayApplyTime"]
            );
          }
        }
      });
    },
    formateTime(time) {
      var date = new Date(time); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D = date.getDate() + " ";
      var h = date.getHours() + ":";
      var m = date.getMinutes() + ":";
      var s = date.getSeconds();
      return Y + M + D + h + m + s;
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
        "display/queryDisPlayApplyAuditExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { activityType: 3, scope: "a", date: 7, brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
          }
        }
      );
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    handleAdd() {
      this.$router.push({
        path: "/displayReward-edit",
        query: { type: "add" }
      });
    },
    handleEdit() {
      this.$router.push({
        path: "/displayReward-edit",
        query: { type: "edit" }
      });
    }
  }
};
</script>


