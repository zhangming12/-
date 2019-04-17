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
.ivu-date-picker {
  display: block;
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">活动汇总统计</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="88" :rules="rule">
                  <Row>
                      <Col span="21">
                         <Row>
                           <Col span="16">
                              <Form-item label="时间:" required>
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
                            </Col>
                            <Col span="8">
                                <Form-item label="品牌名称:" prop="brandId" required>
                                  <Select v-model="formData.brandId" placeholder="请选择品牌" @on-change="changeValue">
                                      <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                  </Select>  
                                </Form-item>
                            </Col>
                            <Col span="24">
                              <Row>
                                <Col span="8">
                                    <Form-item label="活动包名:" prop="groupId" required>
                                        <Select v-model="formData.groupId" placeholder="请选择活动包名" @on-change="getActivityList">
                                            <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                                        </Select>  
                                    </Form-item>
                                </Col>
                                <Col span="8">
                                    <Form-item label="活动名称:" prop="activityId">
                                        <Select v-model="formData.activityId" placeholder="请选择活动" clearable >
                                            <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                                        </Select>
                                    </Form-item>
                                </Col>
                                <Col span="8">

                                  <Form-item label="区域:" prop="areaCode">
                                      <Cascader :data="areaData" v-model="formData.areaCode" placeholder="请选择区域" change-on-select></Cascader>
                                  </Form-item>
                                </Col>
                              </Row>
                              
                            </Col>
                         </Row>
                      </Col>
                      <Col span="2" offset="1">
                          <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                      </Col>
                  </Row>

            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
      
        
        <div class='contentTop'>
            <Button @click="exportExcel" class="btn-right" icon="ios-download-outline" type="primary">导出</Button>
        </div>

        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
        <!-- <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div> -->
      </div>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
// import echarts from 'echarts';
//
import {
  typeQueryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  typeQueryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
import dataRange from "../../../components/data-rang.vue";

import {
  EDFAULT_THREE_AGOTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "activity-summary-stastics-keepAlive",
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
        queryStartTime: EDFAULT_THREE_AGOTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        areaCode: [], //区域ID
        activityId: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
        // brandId: [{ required: true, message: "品牌不能为空" },{trigger:'blur'}],
        // groupId: [{ required: true, message: "活动包不能为空" },{trigger:'blur'}],
        // activityId: [{ required: true, message: "活动不能为空" },{trigger:'blur'}],
      },
      columns1: [],
      defaultList: [
        {
          title: "时间",
          key: "days",
          minWidth: 150,
          align: "center"
        },
        {
          title: "用户数（去重）",
          minWidth: 80,
          key: "userNum",
          align: "center"
        },
        // {
        //     title: '扫码量（汇总）',
        //     key: 'userNum',
        //     align: 'center'
        // },
        {
          title: "参与量（汇总）",
          key: "sumWinNum",
          minWidth: 80,
          align: "center"
        }
      ],
      pageData: [],
      keyList: [],
      areaData: area,
      brandList: [],
      groupList: [],
      activityList: [],
      myChart: ""
    };
  },
  components: {
    dataRange
  },
  created: function() {
    var that = this;
    this.columns1 = this.columns1.concat(this.defaultList);
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a", channel: "C" },
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
  mounted: function() {},
  methods: {
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryGroup.json",
        { activityType: 1, scope: "a", brandId: value, channel: "C" },
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
    submit: function(name) {
      if (!this.formData.brandId) {
        this.$Message.error("请选择查询条件!!");
        return;
      }
      if (!this.formData.groupId) {
        this.$Message.error("请选择查询条件!!");
        return;
      }
      // if (!this.formData.activityId) {
      //   this.$Message.error("请选择查询条件!!");
      //   return;
      // }
      this.page = 1;
      this.init(this.page, 10);
      // this.$refs[name].validate(valid => {
      //   if (valid) {
      //     this.page = 1;
      //     this.init(this.page, 10);
      //   } else {
      //     this.$Message.error("请选择查询条件!!");
      //   }
      // });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init: function(currentPage, pageSize) {
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
      data["userType"] = "C";
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      console.log(data);
      this.Global.doPost("report/activityAggregateReport.json", data, res => {
        // this.pageNum = res.items;
        // this.page = res.page;
        this.columns1 = [];
        this.columns1 = this.columns1.concat(this.defaultList);
        if (res.datalist.length > 0) {
          // var list = res.datalist[0].goodsMap;
          var list = res.datalist[0].gMap;
          for (var i in list) {
            var obj = {
              title: "",
              key: "",
              minWidth: 80,
              align: "center"
            };
            obj["title"] = list[i];
            obj["key"] = i;
            that.columns1.push(obj);
            that.keyList.push(i);
          }
        }
        for (var j = 0; j < res.datalist.length; j++) {
          // 为每个对象里面添加折扣的key值
          for (var n = 0; n < that.keyList.length; n++) {
            if (res.datalist[j].countWinMap) {
              // res.datalist[j][that.keyList[n]] =
              //   res.datalist[j].countWinMap[that.keyList[n]];
              res.datalist[j][that.keyList[n]] =
                res.datalist[j].cWinMap[that.keyList[n]];
            }
          }
        }
        that.pageData = res.datalist;
      });
    },
    exportExcel: function() {
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
      data["userType"] = "C";
      var url = this.Global.getExportUrl(
        "report/activityAggregateExport.json",
        data
      );
      window.open(url);
    }
    // changeValue: function(value) {
    //   var that = this;
    //   this.activityList = [];
    //   this.Global.getActivityList(value, function(res) {
    //     that.activityList = res.datalist;
    //     that.formData.activityId = res.datalist[0].id;
    //   });
    // }
  }
};
</script>


