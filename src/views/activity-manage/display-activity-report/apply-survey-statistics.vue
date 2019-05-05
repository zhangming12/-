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
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列申请概况统计</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="12">
            <Form-item label="申请时间" required prop="queryTime">
              <Row>
                <Col span="11">
                  <Form-item>
                    <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center;">至</Col>
                <Col span="11">
                  <Form-item>
                    <data-range hour="24:00" v-model="formData.queryEndTime"></data-range>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="陈列活动" prop="brandId" required>
              <Select v-model="formData.activityId" placeholder="请选择" clearable>
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
import { getDisplayActivityListDoQuery } from "@/api/common.js";
import dataRange from "@/components/data-range/data-range.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { displayApplyProfileStatistics } from "@/api/activity-manage/display-activity-manage.js";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "apply-survey-statistics-keepAlive",
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
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        activityId: "",
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME]
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        queryTime: [{ required: true, message: "选择日期跟时间" }]
      },
      columns1: [],
      defaultList: [
        {
          title: "序号",
          type: "index",
          width: 260,
          align: "center"
        },
        {
          title: "省",
          key: "province",
          align: "center",
          width: 250
        },
        {
          title: "市",
          key: "city",
          align: "center",
          width: 250
        },
        {
          title: "区",
          key: "area",
          align: "center",
          width: 220
        },
        {
          title: "门店数",
          key: "storeCount",
          align: "center",
          width: 220
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
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        }
      });
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);

      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      delete data.queryTime;
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      displayApplyProfileStatistics(data).then(res => {
        if (res.status == 1) {
          this.pageNum = res.data.items;
          this.pageData = res.data.datalist;
          this.page = res.data.page;
          this.columns1 = [];
          this.columns1 = this.columns1.concat(this.defaultList);
          if (res.data.datalist.length == 0) {
            return;
          }
          let groupAreaInfoList = res.data.datalist[0].groupAreaInfoList;
          if (groupAreaInfoList) {
            for (let i = 0; i < groupAreaInfoList.length; i++) {
              let index = i + 1;
              let arr = [
                {
                  title: "分组",
                  key: "displayGroup" + index,
                  align: "center",
                  width: 100
                },
                {
                  title: "陈列折扣",
                  key: "goodsName" + index,
                  width: 100,
                  align: "center"
                },
                {
                  title: "通过",
                  key: "uploadAuditCount" + index,
                  align: "center",
                  width: 60
                },
                {
                  title: "不通过",
                  key: "uploadNotPassCount" + index,
                  align: "center",
                  width: 80
                }
              ];
              this.columns1 = this.columns1.concat(arr);
            }
            for (let i = 0; i < res.data.datalist.length; i++) {
              for (
                let j = 0;
                j < res.data.datalist[i].groupAreaInfoList.length;
                j++
              ) {
                let index = j + 1;
                let uploadNotPassCount = "uploadNotPassCount" + index;
                let uploadAuditCount = "uploadAuditCount" + index;
                let goodsName = "goodsName" + index;
                let displayGroup = "displayGroup" + index;
                let obj = {};
                obj[uploadNotPassCount] =
                  res.data.datalist[i].groupAreaInfoList[j].uploadNotPassCount;
                obj[uploadAuditCount] =
                  res.data.datalist[i].groupAreaInfoList[j].uploadAuditCount;
                if (res.data.datalist[i].groupAreaInfoList[j].params) {
                  let params = JSON.parse(
                    res.data.datalist[i].groupAreaInfoList[j].params
                  ).periodMonthAward;
                  if (params) {
                    obj[goodsName] = params;
                  } else {
                    obj[goodsName] =
                      res.data.datalist[i].groupAreaInfoList[j].winAmount +
                      "元";
                  }
                } else {
                  obj[goodsName] =
                    res.data.datalist[i].groupAreaInfoList[j].winAmount + "元";
                }

                obj[displayGroup] =
                  res.data.datalist[i].groupAreaInfoList[j].displayGroup;
                Object.assign(res.data.datalist[i], obj);
              }
            }
          }
        }
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      delete data.queryTime;
      var url = this.Global.getExportUrl(
        "report/displayApplyProfileStatisticsExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.activityList = [];
      getDisplayActivityListDoQuery(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data.datalist;
          this.formData.activityId = res.data.datalist[0].id;
        }
      });
    }
  }
};
</script>