<style lang="less" scoped>
@import "../../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列追踪统计</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="12">
            <Form-item label="上传时间" required>
              <Row>
                <Col span="11">
                  <Form-item>
                    <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center;">至</Col>
                <Col span="11">
                  <Form-item>
                    <data-range hour="24:00" placeholder="结束时间" v-model="formData.queryEndTime"></data-range>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="陈列活动" prop="brandId" required>
              <Select v-model="formData.activityId" placeholder="请选择" @on-change="changeActivity">
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="8" offset="1">
            <Form-item label="品牌名称" required>
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:24px">
            <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="contentTop">
        <Button @click="exportExcel" class="btn-right" icon="ios-download-outline" type="primary">导出</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-range/data-range.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { displayTrackStatisticsForPeriod } from "@/api/activity-manage/display-activity-manage.js";
import { getDisplayActivityListDoQuery } from "@/api/common.js";
export default {
  name: "displayt-rack-statistics-keepAlive",
  data() {
    return {
      formData: {
        brandId: "",
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        activityId: "",
        activityName: ""
      },
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [],
      defaultList: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "销售部",
          key: "salesDept",
          align: "center"
        },
        {
          title: "销售大区",
          key: "salesRegion",
          align: "center"
        },
        {
          title: "业务部",
          key: "busiDept",
          align: "center"
        },
        {
          title: "上报用户数",
          key: "userCount",
          align: "center"
        },

        {
          title: "注册用户数",
          key: "registerCount",
          align: "center"
        },
        {
          title: "注册达成率",
          key: "registerRate",
          align: "center"
        },
        {
          title: "申请用户数",
          key: "applyCount",
          align: "center"
        },
        {
          title: "申请达成率",
          key: "applyRate",
          align: "center"
        }
      ],
      pageData: [],
      brandList: [],
      activityList: []
    };
  },
  components: { dataRange },
  created() {
    this.columns1 = this.columns1.concat(this.defaultList);
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
      }
    });
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
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      displayTrackStatisticsForPeriod(data).then(res => {
        if (res.status == 1) {
          this.pageNum = res.data.items;
          this.pageData = res.data;
          this.page = res.data.page;
          this.columns1 = [];
          this.columns1 = this.columns1.concat(this.defaultList);
          if (res.data.length == 0) return;

          let maxPeriodsArr = [];

          for (var i = 0; i < res.data.length; i++) {
            maxPeriodsArr.push(res.data[i].maxPeriods);
          }
          let maxPeriods = Math.max.apply(Math, maxPeriodsArr); //列表中最长的周期

          let groupAreaInfoList = res.data[0].periodDateMap;
          if (groupAreaInfoList) {
            for (var i = 0; i < maxPeriods; i++) {
              let index = parseInt(i) + 1;
              let arr = [
                {
                  title: `上传数`,
                  key: "uploadCount" + index,
                  align: "center"
                },
                {
                  title: "上传率",
                  key: "uploadRate" + index,
                  align: "center"
                },
                {
                  title: "合格数",
                  key: "auditCount" + index,
                  align: "center"
                },
                {
                  title: "合格率",
                  key: "auditRate" + index,
                  align: "center"
                },
                {
                  title: "不合格数",
                  key: "notpassCount" + index,
                  align: "center"
                }
              ];

              this.columns1 = this.columns1.concat(arr);
            }

            for (var i = 0; i < res.data.length; i++) {
              for (const groip_key in res.data[i].periodDateMap) {
                let indexPeriodDateMap = res.data[i].periodDateMap[groip_key];
                let index = parseInt(groip_key);
                let uploadCount = "uploadCount" + index;
                let uploadRate = "uploadRate" + index;
                let auditCount = "auditCount" + index;
                let auditRate = "auditRate" + index;
                let notpassCount = "notpassCount" + index;
                let objDatalist = {};
                objDatalist[uploadCount] = indexPeriodDateMap.uploadCount;
                objDatalist[uploadRate] =
                  indexPeriodDateMap.uploadRate &&
                  (indexPeriodDateMap.uploadRate * 100).toFixed(2) + "%";
                objDatalist[auditCount] = indexPeriodDateMap.auditCount;
                objDatalist[auditRate] =
                  indexPeriodDateMap.auditRate &&
                  (indexPeriodDateMap.auditRate * 100).toFixed(2) + "%";
                objDatalist[notpassCount] = indexPeriodDateMap.notpassCount;
                Object.assign(res.data[i], objDatalist);
              }
            }
          }
        }
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);

      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      var url = this.Global.getExportUrl(
        "report/displayTrackStatisticsForPeriodExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.activityList = [];
      let brandList = this.brandList;
      for (var i = 0; i < brandList.length; i++) {
        if (value == brandList[i].id) {
          this.formData.brandName = brandList[i].brandName;
        }
      }
      getDisplayActivityListDoQuery(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data.datalist;
          this.formData.activityId = res.data.datalist[0].id;
        }
      });
    },
    changeActivity(val) {
      let activityList = this.activityList;
      if (activityList) {
        for (const key in activityList) {
          if (activityList[key].id === val) {
            this.formData.activityName = activityList[key].name;
          }
        }
      }
    }
  }
};
</script>