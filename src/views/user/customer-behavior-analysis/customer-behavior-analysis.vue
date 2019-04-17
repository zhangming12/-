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
.center-title {
  text-indent: 1%;
  padding-top: 10px;
  font-size: 16px;
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">客户行为分析</h2> -->
        <div class="box">
          <Form ref="form" :model="formData" :label-width="60" :rules="rule">
              <Row>
                  <Col span="7">
                      <Form-item label="品牌名称" prop="brandId" :label-width="90">
                          <Select v-model="formData.brandId" placeholder="请选择" @on-change="brandChangeValue">
                              <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                          </Select>  
                      </Form-item>           
                  </Col>   
                  <Col span="7">
                      <Form-item label="活动包名" prop="groupId" :label-width="90">
                          <Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList">
                              <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                          </Select>  
                      </Form-item>           
                  </Col> 
                  <Col span="7"> 
                      <Form-item label="活动名称" prop="activityId" :label-width="90" >
                          <Select v-model="formData.activityId" placeholder="请选择" @on-change="activetyChangeValue">
                              <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                          </Select>  
                      </Form-item> 
                  </Col>   
                  <Col span='2' offset="1" >
                      <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                  </Col>
              </Row>
          </Form>
        </div>
        <h2 class="center-title">更新时间：{{updateTime}}（周更新）</h2>
        <div style="overflow: hidden;">
            <weekScanCodeTime style='float:right; width: 48%;' :weekScanCodeTimeDataList='weekScanCodeTimeDataList'></weekScanCodeTime>
            <dayScanCodeTime style='float:left; width: 48%;' :dayScanCodeTimeDataList='dayScanCodeTimeDataList'></dayScanCodeTime>
        </div>
        <areDistribuite :areDistribuiteDataList='areDistribuiteDataList'></areDistribuite>
        
  </div>
</template>

<script>
import dayScanCodeTime from "./day-scancode-time.vue"; //日扫码量时段分布
import weekScanCodeTime from "./week-scancode-time.vue"; //周扫码量时段分布
import areDistribuite from "./top-are-distribute.vue"; //TOP30区域分布
import {
  typeQueryActivityVOByGroupId, //根据品牌ID获取活动包名
  typeQueryActivityGroupVOByBrandId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
export default {
  name:"customer-behavior-analysis-keepAlive",

  data() {
    const that = this;
    return {
      formData: {
        brandId: "",
        brandName: "",
        activityId: "",
        groupId: "",
        activityName: ""
      },
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }],
        groupId: [{ required: true, message: "请选择活动包名" }],
        // activityId: [{ required: true, message: "请选择活动名称" }]
      },
      brandList: [],
      groupList: [],
      activityList: [],
      updateTime: "", //更新时间
      dayScanCodeTimeDataList: null, //日扫码量时段分布
      weekScanCodeTimeDataList: null, //周扫码量时段分布
      areDistribuiteDataList: null //区域分布数据
    };
  },
  components: {
    weekScanCodeTime,
    dayScanCodeTime,
    areDistribuite
  },
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if(this.brandList && this.brandList.length){
          this.formData.brandId = this.brandList[0].id;
          this.brandChangeValue(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    init() {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      if (JSON.stringify(data) == "{}") {
        this.$Message.error("至少有一个筛选条件");
        return;
      }

      //日扫码时段分布
      this.Global.doPost(
        "report/storeDayHourScanDistribution.json",
        data,
        function(res) {
          let datalist = res;
          let hour = [];
          let scanCount = [];
          let dayScanCodeTimeDataList = {};
          that.updateTime = res[0].queryEndTime; //更新时间
          if (datalist) {
            for (var key in datalist) {
              hour.push(datalist[key]["hour"]);
              scanCount.push(datalist[key]["scanCount"]);
            }
            dayScanCodeTimeDataList.hour = hour;
            dayScanCodeTimeDataList.scanCount = scanCount;
            that.dayScanCodeTimeDataList = dayScanCodeTimeDataList;
          }
        }
      );
      //周扫码时段分布
      this.Global.doPost(
        "report/storeWeekDayHourScanDistribution.json",
        data,
        function(res) {
          if (res) {
            console.log(res);
            let datalist = res;
            let weekScanCodeTimeDataList = [];
            for (var i = 0; i < datalist.length; i++) {
              //Array[0]:星期几，Array[1]:时间，Array[2]:扫码量
              let item = [
                datalist[i].weekIdx - 1,
                datalist[i].hour,
                datalist[i].scanCount / 100
              ];
              weekScanCodeTimeDataList.push(item);
            }

            that.weekScanCodeTimeDataList = weekScanCodeTimeDataList;
          }
        }
      );
      //区域扫码分布
      this.Global.doPost(
        "report/storeAreaScanDistribution.json",
        data,
        function(res) {
          let datalist = res;
          let areaName = []; //区域
          let scanCount = []; //门店扫码量
          let areDistribuiteDataList = {};
          if (datalist) {
            for (var key in datalist) {
              areaName.push(datalist[key]["areaName"]);
              scanCount.push(datalist[key]["scanCount"]);
            }
            areDistribuiteDataList.areaName = areaName;
            areDistribuiteDataList.scanCount = scanCount;
            that.areDistribuiteDataList = areDistribuiteDataList;
          }
        }
      );
    },
    brandChangeValue(value) {
      let brandList = this.brandList;
      for (var i = 0; i < brandList.length; i++) {
        if (value == brandList[i].id) {
          this.formData.brandId = brandList[i].id;
          this.formData.brandName = brandList[i].brandName;
        }
      }
      this.groupList = [];
      this.formData.groupId = "";
      if(!value) return
      this.Global.doPost(
        "condition/queryGroup.json",
        { activityType: 1, scope: "a", brandId: value },
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
      if(!value) return ;
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
    activetyChangeValue(value) {
      let activityList = this.activityList;
      for (var i = 0; i < activityList.length; i++) {
        if (value == activityList[i].id) {
          this.formData.activityId = activityList[i].id;
          this.formData.activityName = activityList[i].name;
        }
      }
    }
  }
};
</script>


