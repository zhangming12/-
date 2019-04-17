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

table {
  width: 100%;
}
tbody td {
  text-align: center;
}
#monitor {
  height: 32px;
  border-radius: 4px;
  border: 1px solid #dddee1;
  font-size: 12px;
  line-height: 32px;
  padding: 0 7px;
  cursor: pointer;
  .TextOverflow();
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">刷单预警</h2> -->
      <div class="box" style="margin-bottom: 15px;padding-bottom:20px;">
          <Collapse>
                <Panel name="1">
                    预警策略
                    <Table slot="content" :columns="allColumns" :data="allData" disabled-hover></Table>
                </Panel>
          </Collapse>
      </div>
      <div class="box">
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span='12'>
                        <Form-item label="时间" required>
                            <!-- <Row>
                                <Col span="11">
                                    <Form-item prop="queryStartTime">
                                        <Date-picker type="datetime" placeholder="选择时间" v-model="formData.queryStartTime" ></Date-picker>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center">至</Col>
                                <Col span="11">
                                    <Form-item prop="queryEndTime">
                                        <Date-picker type="datetime" placeholder="选择时间" v-model="formData.queryEndTime" @on-change='dataChange'></Date-picker>
                                    </Form-item>
                                </Col>
                            </Row> -->
                            <Row>
                              <Col span="11">
                                  <Form-item prop="queryStartTime">
                                    <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                                  </Form-item>
                              </Col>
                              <Col span="2" style="text-align: center;">至</Col>
                              <Col span="11">
                                  <Form-item prop="queryEndTime">
                                      <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                                  </Form-item>
                              </Col>
                          </Row>
                        </Form-item>
                        
                        <Form-item label="活动名称" prop="activityId" >
                            <Select v-model="formData.activityId" placeholder="请选择" @on-change="activityChange" clearable>
                                <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="策略名称" >        
                            <div id="monitor" @click="monitorList">{{ confirmData.ruleName }}</div>
                        </Form-item>
                    </Col>
                    <Col span='8' offset="1">
                        <Form-item label="品牌名称" prop="brandId" >
                            <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" width="80">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="区域" prop="areaCode">
                            <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                        </Form-item>
                    </Col>
                    <Col span="2" offset="1" style="margin-top:58px">
                        <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
                    </Col>
                </Row>
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div class='contentTop'>
            <Button @click="exportExcel" class="btn-export" icon="ios-download-outline" type="primary">导出</Button>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
      <!--  策略规则  -->
      <Modal v-model="monitorStatus" width="800" title="预警策略">
        <Table :columns="Ycolumns" :data="Ydata" @on-selection-change="rules" disabled-hover></Table>
        <div slot="footer">
            <Button type="primary" size="large" @click="TrueMonitor">确定</Button>
        </div>
      </Modal>
  </div>
</template>

<script>
import area from "../../config/china_code_data.js";
// import echarts from 'echarts';
//
import dataRange from "../../components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name:"monitor-list-keepAlive",
  
  data() {
    const that = this;
    const validateStart = (rule, value, callback) => {
      // 验证开始时间
      if (value == "") {
        callback(new Error("请输入开始时间"));
      } else {
        if (this.formData.queryEndTime !== "") {
          // 对结束时间单独验证
          this.$refs.form.validateField("queryEndTime");
        }
        callback();
      }
    };
    const validateEnd = (rule, value, callback) => {
      // 验证结束时间

      if (value == "") {
        callback(new Error("请输入结束时间"));
      } else {
        const str = new Date(this.formData.queryStartTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
          // 判断开始时间是否大于结束时间
          callback(new Error("开始时间大于结束时间"));
        } else {
          callback();
        }
      }
    };
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
        activityId: ""
      },
      page: 1,
      pageNum: 0,
      monitorStatus: false,
      rule: {
        queryStartTime: [{ validator: validateStart, trigger: "change" }],
        queryEndTime: [{ validator: validateEnd, trigger: "change" }]
      },
      columns1: [
        {
          title: "时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.createTime);
          }
        },
        {
          title: "区域",
          key: "area",
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          align: "center"
        },
        {
          title: "电话",
          key: "phone",
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "详情",
                        content: `时间：${that.Global.createTime(
                          params.row.createTime
                        )}<br>
                                                      姓名：${
                                                        params.row.realName
                                                      }</br>
                                                      手机：${
                                                        params.row.phone
                                                      }</br>
                                                      地址：${
                                                        params.row.province
                                                      }省${params.row.city}${
                          params.row.area
                        }</br>
                                                      userId：${
                                                        params.row.userId
                                                      }</br>
                                                      活动名称：${
                                                        params.row.activityName
                                                      }</br>`
                      });
                    }
                  }
                },
                "查看详情"
              )
            ]);
          }
        }
      ],
      Ycolumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "策略名称",
          key: "ruleName",
          align: "center"
        },
        {
          title: "规则描述",
          key: "ruleDesc",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.createTime);
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            var txt = "";
            if (params.row.status == 1) {
              txt = "启用";
            } else {
              txt = "停用";
            }
            return txt;
          }
        }
      ],
      allColumns: [
        {
          title: "品牌名称",
          key: "ruleContent",
          align: "center",
          render: (h, params) => {
            var data = JSON.parse(params.row.ruleContent);
            return data.brandName;
          }
        },
        {
          title: "活动名称",
          key: "ruleContent",
          align: "center",
          render: (h, params) => {
            var data = JSON.parse(params.row.ruleContent);
            return data.activityName;
          }
        },
        {
          title: "策略名称",
          key: "ruleName",
          align: "center"
        },
        {
          title: "规则描述",
          key: "ruleDesc",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return this.Global.formatYear(params.row.createTime);
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          render: (h, params) => {
            var txt = "";
            if (params.row.status == 1) {
              txt = "启用";
            } else {
              txt = "停用";
            }
            return txt;
          }
        }
      ],
      pageData: [],
      Ydata: [],
      listStatus: true,
      keyList: [],
      areaData: area,
      brandList: [],
      activityList: [],
      monitorSelectLength: "",
      monitorSelectData: "",
      confirmData: {},
      allData: []
    };
  },
  components: {
    dataRange
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId)
      }
    });
    this.Global.doPost("risk/doQueryAll.json", {}, res => {
      this.allData = res;
    });
  },
  methods: {
    activityChange() {
      this.confirmData.ruleContent = {};
      this.confirmData.ruleName = "";
      this.monitorSelectData = "";
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
    dataChange(val) {
      this.formData.queryEndTime = val.slice(0, 11) + "23:59:59";
    },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init: function(currentPage, pageSize) {
      if (JSON.stringify(this.confirmData) == "{}") {
        this.$Message.error("没有选择规则或规则为空");
        return false;
      }
      var that = this;
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
      console.log(this.confirmData.ruleContent);
      data = this.Global.mergeJson(
        data,
        JSON.parse(this.confirmData.ruleContent)
      );
      data["userType"] = "B";
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      for (var i in data) {
        // 删除对象 brandName 后续如果需要再做调整
        if (i == "brandName") {
          delete data[i];
        }
        if (i == "activityName") {
          delete data[i];
        }
      }
      this.Global.doPost("risk/riskQuery.json", data, function(res) {
        that.pageNum = res.items;
        that.pageData = res.datalist;
        that.page = res.page;
      });
    },
    exportExcel: function() {
      if (JSON.stringify(this.confirmData) == "{}") {
        this.$Message.error("没有选择规则或规则为空");
        return false;
      }
      var that = this;
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
      data = this.Global.mergeJson(
        data,
        JSON.parse(this.confirmData.ruleContent)
      );
      data["userType"] = "B";
      for (var i in data) {
        // 删除对象 brandName 后续如果需要再做调整
        if (i == "brandName") {
          delete data[i];
        }
        if (i == "activityName") {
          delete data[i];
        }
      }
      var url = this.Global.getExportUrl("risk/riskQueryExport.json", data);
      window.open(url);
    },
    changeValue: function(value) {
      var that = this;
      this.activityList = [];
      this.Global.getActivityList(value, function(res) {
        that.activityList = res.datalist;
        that.formData.activityId = res.datalist[0].id;
      });
    },
    monitorList: function() {
      var that = this;
      if (this.formData.brandId == "") {
        this.$Message.error("请选择品牌名称");
        return false;
      }
      if (this.formData.activityId == "") {
        this.$Message.error("请选择活动名称");
        return false;
      }
      this.monitorStatus = true;
      this.Global.doPost(
        "risk/doQueryWithPage.json",
        {
          brandId: this.formData.brandId,
          activityId: this.formData.activityId,
          userType: "B"
        },
        function(res) {
          for (var i = 0; i < res.datalist.length; i++) {
            res.datalist[i]["_checked"] = false;
            if (that.confirmData.id) {
              if (that.confirmData.id == res.datalist[i].id) {
                res.datalist[i]["_checked"] = true;
              }
            }
          }
          that.Ydata = res.datalist;
        }
      );
    },
    rules(selection) {
      this.monitorSelectLength = selection.length;
      this.monitorSelectData = selection[0];
    },
    TrueMonitor: function() {
      if (this.monitorSelectLength > 1) {
        this.$Message.error("能且只能选择一项");
        return false;
      }
      if (this.monitorSelectLength == 0) {
        this.$Message.error("请选择策略规则");
        return false;
      }
      this.monitorStatus = false;
      this.confirmData = this.monitorSelectData;
    }
  }
};
</script>


