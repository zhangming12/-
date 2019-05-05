<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-date-picker {
  display: block;
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
    <!-- <h2 class="Title">活动参与情况汇总（周）</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="9">
            <Form-item label="时间" required>
              <Row>
                <Col span="11">
                  <Form-item  >
                    <Date-picker
                      type="datetime"
                      placeholder="选择时间"
                      v-model="formData.queryStartTime"
                    ></Date-picker>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center">至</Col>
                <Col span="11">
                  <Form-item  >
                    <Date-picker type="datetime" placeholder="选择时间" v-model="formData.queryEndTime"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="营业部">
              <Input v-model.trim="formData.busiDept"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="销售部">
              <Input v-model.trim="formData.salesDept"></Input>
            </Form-item>
          </Col>
          <Col span="6">
            <Form-item label="大区">
              <Input v-model.trim="formData.salesRegion"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:28px">
            <Button @click="submit('form')" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 30px;padding-bottom:20px">
      <div class="contentTop">
        <Button
          @click="exportExcel"
          class="btn-export"
          icon="ios-download-outline"
          type="primary"
        >导出</Button>
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
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { loongTrackStatisticsForWeek } from "@/api/landLoong-activity-manage/landLoong-activity-manage.js";
export default {
  name: "activity-partake-summary-keepAlive",

  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        busiDept: "",
        salesDept: "",
        salesRegion: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
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
          width: 150,
          align: "center"
        },
        {
          title: "销售大区",
          key: "salesRegion",
          width: 200,
          align: "center"
        },
        {
          title: "营业部",
          key: "busiDept",
          width: 200,
          align: "center"
        },
        {
          title: "目标客户",
          key: "userCount",
          width: 100,
          align: "center"
        },
        {
          title: "执行客户",
          key: "registerCount",
          width: 100,
          align: "center"
        },
        {
          title: "执行率",
          key: "registerRate",
          width: 100,
          align: "center",
          render: (h, params) => {
            return (params.row.registerRate * 100).toFixed(2) + "%";
          }
        }
      ],
      pageData: [],
      keyList: [],
      activityList: [],
      showQuery: false
    };
  },
  created() {
    this.columns1 = this.columns1.concat(this.defaultList);
    this.init(1, 10);
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
      data["brandId"] = 8;
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      loongTrackStatisticsForWeek(data).then(res => {
        if (res.data && res.status == 1) {
          this.pageNum = res.data.items;
          this.page = res.data.page;
          this.columns1 = [];
          this.columns1 = this.columns1.concat(this.defaultList);
          let datalist = res.data.datalist;
          let keyList = [];
          if (datalist.length > 0) {
            var list = datalist[0].weekData;
            for (var i in list) {
              var obj = {
                title: `第${list[i].weeks}周客户数`,
                key: `${list[i].weeks}uploadCount`,
                align: "center",
                width: 110
              };
              var obj1 = {
                title: `第${list[i].weeks}周达成率`,
                key: `${list[i].weeks}uploadRate`,
                align: "center",
                width: 110
              };
              this.columns1.push(obj);
              this.columns1.push(obj1);
              keyList.push(list[i]);
            }
          }
          this.keyList = keyList;
          for (var j = 0; j < datalist.length; j++) {
            for (var n = 0; n < keyList.length; n++) {
              if (datalist[j].weekData) {
                datalist[j][`${keyList[n].weeks}uploadCount`] =
                  datalist[j].weekData[n]["uploadCount"];
                datalist[j][`${keyList[n].weeks}uploadRate`] =
                  (datalist[j].weekData[n]["uploadRate"] * 100).toFixed(2) +
                  "%";
              }
            }
          }
          this.pageData = datalist;
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
      data["brandId"] = 8;
      var url = this.Global.getExportUrl(
        "report/loongTrackStatisticsForWeekExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>