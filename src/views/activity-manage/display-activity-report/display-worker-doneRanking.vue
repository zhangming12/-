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
  #scancode {
    //background-image: url('../../../assets/image/week-worker-scancode.jpg');
  }
  #activityRate {
    //background-image: url('../../../assets/image/week-worker-actrate.jpg');
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
      <!-- <h2 class="Title">陈列业代完成率排行榜</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="88" :rules="rule">
                <Row>
                    <Col span="10">  
                         <Form-item label="品牌名称" prop="brandId" required>
                            <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>                     
                         <Form-item label="活动名称" required>
                            <Select v-model="formData.activityId" placeholder="请选择" @on-change="activityChangeValue">
                                <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item> 
                        
                        
                    </Col>
                    <Col span="10" offset="1">
                        <Form-item label="活动包名:" prop="groupId" required>
                            <Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList" clearable>
                                <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                            </Select>
                        </Form-item>
                         
                        <Form-item label="时间"  prop="queryMonth">
                            <Select v-model="formData.queryMonth"  placeholder="请选择" @on-change="timeDataChangeValue" >
                                <Option :value="item.queryMonth" v-for="(item,index) in timeDataList" :key="index" >{{ item.queryMonth}}</Option>
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
          <div id="activityRate">
              <div class="top">
                    <div class="top-img">
                        <img src="../../../assets/image/display-upload-finished.jpg" >
                    </div>
                    <div class="top-icon"  @click="uploadFinishedExport" v-show="activityRate.length>0">
                        <img src="../../../assets/image/echart-down.jpg" >
                    </div>
              </div>
              <ul>
                  <li>
                      <span>排名</span>
                      <span>业代姓名</span>
                      <span>手机号</span>
                      <span>上传门店</span>
                      <span>合格门店</span>
                      <span>合格率</span>
                  </li>
                  <li v-for="(item,index) in activityRate" :key="index"  >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.workerName }}</span>
                      <span>{{ item.workerPhone }}</span>
                      <span>{{ item.allStoreCount }}</span>
                      <span>{{ item.storeCount }}</span>
                      <span>{{ (item.qualifiedRate * 100).toFixed(2) + '%'}}</span>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { getDisplayActivityListDoQuery } from "@/api/common.js";
import {
  workerDisplayUploadCompletionRateRanking,
  workerDisplayUploadPerformanceRanking
} from "@/api/activity-manage/display-activity-manage.js";
import {
  typeQueryActivityVOByGroupId, //根据品牌ID获取活动包名
  typeQueryActivityGroupVOByBrandId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
export default {
  name:"display-worker-doneRanking-keepAlive",
  data() {
    return {
      formData: {
        brandId: "",
        groupId: "",
        brandName: "",
        queryMonth: ""
      },
      rule: {
        queryMonth: [{ required: true, message: "请选择时间" }]
      },
      brandList: [],
      groupList: [],
      activityList: [],
      timeDataList: [], //时间，活动周序列表
      activityRate: [] //上传完成率
    };
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
        if(this.brandList && this.brandList.length){
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
          this.init();
        } else {
          this.$Message.error("请输入查询条件！");
        }
      });
    },
    getBrandName(id) {
      let name = "";
      for (let i = 0; i < this.brandList.length; i++) {
        if (id == this.brandList[i].id) {
          name = this.brandList[i].brandName;
          return name;
        }
      }
    },
    init() {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["brandName"] = this.getBrandName(this.formData.brandId);
      data["needCount"] = false;
      console.log(data);
      workerDisplayUploadCompletionRateRanking(data).then(res => {
        if (res.status == 1) {
          this.activityRate = res.data.datalist;
        }
      });
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if(!value) return ;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
      // typeQueryActivityVOByGroupId({ groupId: value, type: 3 }).then(res => {
      //   if (res && res.status == 1) {
      //     this.activityList = res.data;
      //   }
      // });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if(!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
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
    activityChangeValue(value) {
      let that = this;
      let activityList = this.activityList; //品牌列表
      for (var i = 0; i < activityList.length; i++) {
        if (value == activityList[i].id) {
          this.formData.activityId = activityList[i].id;
          this.formData.activityName = activityList[i].name;
        }
      }
      if (this.activityList.length > 0) {
        setTimeout(() => {
          this.getTimeDataList(); //获取活动周序列表
        }, 500);
      } else {
        that.timeDataList = [];
      }
    },
    getTimeDataList() {
      //获取活动周序列表
      let that = this;
      let data = {
        brandId: that.formData.brandId,
        activityId: that.formData.activityId
      };
      that.Global.doPost("report/getActivityMonthDict.json", data, function(
        res
      ) {
        if (res) {
          let timeDataList = [];
          for (const key in res) {
            let item = {
              queryMonth: res[key]
            };
            timeDataList.push(item);
          }
          that.timeDataList = timeDataList;
          that.formData.queryMonth = timeDataList[0].queryMonth;
        }
      });
    },
    uploadFinishedExport() {
      //上传完成率
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      data['brandName'] = this.getBrandName(this.formData.brandId)
      this.Global.deleteEmptyProperty(data);

      var url = this.Global.getExportUrl(
        "report/workerDisplayUploadCompletionRateRankingExport.json",
        data
      );
      window.open(url);
    },
    timeDataChangeValue(value) {
      let timeDataList = this.timeDataList;
      if (value) {
        for (var i = 0; i < timeDataList.length; i++) {
          if (value == timeDataList[i].actStartTime) {
            this.formData.queryMonth = timeDataList[i].queryMonth;
          }
        }
      }
    }
  }
};
</script>


