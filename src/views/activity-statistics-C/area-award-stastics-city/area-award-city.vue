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
        <!-- <h2 class="Title">区域折扣统计（市）</h2> -->
        <div class="box">
            <Form ref="form" :model="formData" :label-width="88">
              <Row>
                  <Col span="21">
                      <Row>
                        <Col span="16">
                          <Form-item label="时间:"   >
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
                            <Form-item label="品牌名称:" prop="brandId"   >
                              <Select v-model="formData.brandId" placeholder="请选择品牌" @on-change="changeValue">
                                  <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                              </Select>  
                            </Form-item>
                        </Col>
                        <Col span="24">
                          <Row>
                            <Col span="8">
                                <Form-item label="活动包名:" prop="groupId"   >
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
            <div style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import dataRange from "../../../components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_THREE_AGOTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import {
  typeQueryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  typeQueryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
export default {
  name: "area-award-city-keepAlive",
  data() {
    const that = this;
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
        activityId: ""
      },
      brandList: [],
      groupList: [],
      page: 1,
      pageNum: 0,
      columns1: [],
      defaultList: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "省",
          key: "province",
          align: "center"
        },
        {
          title: "市",
          key: "city",
          align: "center"
        },
        {
          title: "用户数（去重）",
          key: "userNum",
          width: 200,
          align: "center"
        },
        {
          title: "参与量（汇总）",
          key: "sumWinNum",
          width: 200,
          align: "center"
        }
      ],
      pageData: [],
      keyList: [],
      activityList: []
    };
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
          this.brandList.push({ id: item[0], brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  components: {
    dataRange
  },
  methods: {
    getActivityList(value) {
      // this.formData.groupId = value + ''
      // console.log(this.formData.groupId)
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: item[0], name: item[1] });
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
      // this.init(this.page, 10);
      // return

      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var that = this;
      if (!this.formData.groupId) {
        this.$Message.error("请选择查询条件!");
        return false;
      }
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
      data["level"] = 2;
      console.log(data);
      this.Global.doPost("report/activityDailyReport.json", data, function(
        res
      ) {
        that.pageNum = res.items;
        that.page = res.page;
        that.columns1 = [];
        that.columns1 = that.columns1.concat(that.defaultList);
        if (res.datalist.length > 0) {
          // var list = res.datalist[0].goodsMap;
          var list = res.datalist[0].gMap;
          for (var i in list) {
            var obj = {
              title: "",
              key: "",
              width: 120,
              align: "center"
            };
            obj["title"] = list[i];
            obj["key"] = i;
            that.columns1.push(obj);
            that.keyList.push(i);
          }
        }
        console.log(that.keyList);
        console.log(that.columns1);

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
        console.log(that.pageData);
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
      data["level"] = 2;
      var url = this.Global.getExportUrl(
        "report/activityDailyExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


