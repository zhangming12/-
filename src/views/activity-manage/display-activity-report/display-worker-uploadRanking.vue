<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  padding: 15px;
}
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.areaBox {
  width: 100%;
  padding-top: 15px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  #scancode {
    li {
      span {
        // width: 75px;
        width: 25%;
      }
    }
  }
  #activityRate {
    li {
      span {
        // width: 75px;
        width: 16%;
      }
    }
  }
  #province,
  #scancode,
  #activityRate {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    padding: 20px;
    //padding-top: 20px;
    //padding-bottom: 20px;
    //background: url('../../../assets/image/provinceTop.png') center 25px no-repeat;
    background-size: 300px 20px;
    background-color: #fff;
    overflow: hidden;
    ul {
      display: inline-block;
      width: 100%;
    }
    li {
      display: flex;
      border-bottom: 1px solid #e3e3e3;
      color: #4a4a4a;
      span {
        // width: 75px;
        height: 30px;
        line-height: 30px;
        .TextOverflow();
        text-align: center;
      }
    }
    li:first-child {
      span:after {
        content: "";
        height: 12px;
        border-right: 1px solid #4a4a4a;
        display: block;
        float: right;
        margin-top: 10px;
      }
      span:last-child:after {
        border: 0;
      }
    }
    li:nth-child(2) {
      color: #ce1b20;
      span:first-child {
        background: url("../../../assets/image/gold.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
    li:nth-child(3) {
      color: #ffa60c;
      span:first-child {
        background: url("../../../assets/image/silver.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
    li:nth-child(4) {
      color: #2285cc;
      span:first-child {
        background: url("../../../assets/image/copper.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
  }
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

.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
}
.ivu-date-picker {
  display: block;
}
.center-title {
  text-indent: 1%;
  padding: 10px 0;
  font-size: 16px;
}
.top {
  overflow: hidden;
  .top-img {
    text-align: center;
  }
  .top-icon {
    overflow: hidden;
    cursor: pointer;
    img {
      float: right;
      width: 20px;
      height: 20px;
    }
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">陈列业代上传排行榜</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="88" :rules="rule">
                <Row>
                    <Col span="10">
                        
                        <Form-item label="品牌名称:" prop="brandId" >
                            <Select v-model="formData.brandId" placeholder="请选择" @on-change="brandChangeValue">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>                                                  
                    </Col>
                    <Col span="10" offset="1">                   
                        <Form-item label="时间:"  prop="queryStartTime">
                            <Select v-model="formData.queryStartTime"  placeholder="请选择" @on-change="timeDataChangeValue" >
                                <Option :value="item.actStartTime" v-for="(item,index) in timeDataList" :key="index" >{{ item.actStartTime}} - {{ item.actEndTime}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="2" offset="1" >
                        <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                    </Col>
                </Row>
            </Form>
      </div>
      <div class="areaBox">
          
          <div id="scancode" >
              <div class="top">
                    <div class="top-img">
                        <img src="../../../assets/image/display-upload-achievements.jpg" class="top-img">
                    </div>
                    <div class="top-icon"  @click="uploadAchievementsExport" v-show="scancodeDatalist.length>0">
                
                        <img src="../../../assets/image/echart-down.jpg" >
                    </div>
              </div>
              <ul>
                  <li>
                      <span>排名</span>
                      <span>业代姓名</span>
                      <span>手机号</span> 
                      <span>门店数</span>
                      
                  </li>
                  <li v-for="(item,index) in scancodeDatalist" :key="index" >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.workerName }}</span>
                      <span>{{ item.workerPhone }}</span>
                      <span>{{ item.storeCount }}</span>
                      
                  </li>
              </ul>
          </div>
        
      </div>
  </div>
</template>

<script>
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间

import {
  workerDisplayUploadCompletionRateRanking,
  workerDisplayUploadPerformanceRanking
} from "@/api/activity-manage/display-activity-manage.js";

export default {
  name:"display-worker-uploadRanking-keepAlive",
  data() {
    const that = this;
    return {
      formData: {
        brandId: "",
        brandName: "",
        queryStartTime: "",
        queryEndTime: ""
      },
      rule: {
        queryStartTime: [{ required: true, message: "请选择时间" }]
      },
      brandList: [],
      activityList: [],
      timeDataList: [], //时间，活动周序列表
      scancodeDatalist: [] //上传绩效
    };
  },
  created: function() {
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
          this.brandChangeValue(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        }
      });
    },
    init: function() {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["needCount"] = false;
      //上传绩效排行
      workerDisplayUploadPerformanceRanking(data).then(res => {
        if (res.status == 1) {
          this.scancodeDatalist = res.data.datalist;
        }
      });
    },
    brandChangeValue: function(value) {
      var that = this;
      this.activityList = [];
      let brandList = this.brandList; //品牌列表
      for (var i = 0; i < brandList.length; i++) {
        if (value == brandList[i].id) {
          this.formData.brandId = brandList[i].id;
          this.formData.brandName = brandList[i].brandName;
        }
      }
      //活动的接口
      //    this.Global.getActivityList(value,function(res){
      //        that.activityList = res.datalist;
      //        that.formData.activityId=res.datalist[0].id;

      //    })
      setTimeout(() => {
        this.getTimeDataList(); //获取活动周序列表
      }, 500);
    },
    activityChangeValue(value) {
      let that = this;
      let activityList = this.activityList; //品牌列表
      for (var i = 0; i < activityList.length; i++) {
        if (value == activityList[i].id) {
          this.formData.activityId = activityList[i].id;
          this.formData.activityName = activityList[i].name;
        }
      }
      setTimeout(() => {
        this.getTimeDataList(); //获取活动周序列表
      }, 500);
    },
    getTimeDataList() {
      //获取活动周序列表
      let that = this;
      let data = {
        brandId: that.formData.brandId
      };
      that.Global.doPost("report/getBrandWeekDict.json", data, function(res) {
        if (res) {
          let timeDataList = [];
          for (const key in res) {
            let item = {
              actStartTime: res[key][0],
              actEndTime: res[key][1]
            };
            timeDataList.push(item);
          }
          //timeDataList.reverse();//倒序
          that.timeDataList = timeDataList;
          that.formData.queryStartTime = timeDataList[0].actStartTime;
          that.formData.queryEndTime = timeDataList[0].actEndTime;
        }
      });
    },
    uploadAchievementsExport() {
      //上传绩效
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);

      var url = this.Global.getExportUrl(
        "report/workerDisplayUploadPerformanceRankingExport.json",
        data
      );
      window.open(url);
    },

    timeDataChangeValue(value) {
      console.log("ceshi")
      let timeDataList = this.timeDataList;
      if (value) {
        for (var i = 0; i < timeDataList.length; i++) {
          if (value == timeDataList[i].actStartTime) {
            this.formData.queryStartTime = timeDataList[i].actStartTime;
            this.formData.queryEndTime = timeDataList[i].actEndTime;
          }
        }
      }
    }
  }
};
</script>


