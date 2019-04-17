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
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  #province,
  #city,
  #area {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    padding: 0 20px;
    padding-top: 70px;
    padding-bottom: 20px;
    background: url("../../../assets/image/provinceTop.png") center 25px
      no-repeat;
    background-size: 175px 18px;
    background-color: #fff;
    li {
      display: flex;
      border-bottom: 1px solid #e3e3e3;
      color: #4a4a4a;
      span {
        width: 65px;
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
  #city {
    background-image: url("../../../assets/image/cityTop.png");
  }
  #area {
    background-image: url("../../../assets/image/areaTop.png");
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
.select {
  background: @primary-color;
  color: #fff;
}
.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
}
.export {
  height: 24px;
  position: relative;
  div {
    border: 1px solid @primary-color;
    padding: 3px 12px;
    float: right;
    border-bottom: 0;
    position: absolute;
    right: 1px;
    bottom: -1px;
    color: @primary-color;
    cursor: pointer;
    i {
      margin-right: 2px;
    }
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">活动排行榜</h2> -->
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
                                        <Select v-model="formData.activityId" placeholder="请选择活动">
                                            <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                                        </Select>
                                    </Form-item>
                                </Col>
                                <Col span="8">

                                  <Form-item label="区域:" prop="areaCode">
                                      <Cascader placeholder="区域" :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
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
      <h2 class="Title" style="margin-top: 20px;">区域活动排行榜</h2>
      <div class="areaBox">
          <div id="province">
              <ul>
                  <li>
                      <span>排名</span>
                      <span>省</span>
                      <span>参与量</span>
                      <span>用户</span>
                  </li>
                  <li v-for="(item,index) in provinceList" :key="index" >
                        <span>{{ index + 1}}</span>
                        <span>{{ item.province }}</span>
                        <span>{{ item.winCount }}</span>
                        <span>{{ item.winUserCount }}</span>
                    </li>
              </ul>
          </div>
          <div id="city">
              <ul>
                  <li>
                      <span>排名</span>
                      <span>省</span>
                      <span>市</span> 
                      <span>参与量</span>
                      <span>用户</span>
                  </li>
                  <li v-for="(item,index) in cityList" :key="index" >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.province }}</span>
                      <span>{{ item.city }}</span>
                      <span>{{ item.winCount }}</span>
                      <span>{{ item.winUserCount }}</span>
                  </li>
              </ul>
          </div>
          <div id="area">
              <ul>
                  <li>
                      <span>排名</span>
                      <span>省</span>
                      <span>市</span>
                      <span>区</span>
                      <span>参与量</span>
                      <span>用户</span>
                  </li>
                  <li v-for="(item,index) in areaList" :key="index"  >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.province }}</span>
                      <span>{{ item.city }}</span>
                      <span>{{ item.area }}</span>
                      <span>{{ item.winCount }}</span>
                      <span>{{ item.winUserCount }}</span>
                  </li>
              </ul>
          </div>
      </div>
  </div>
</template>

<script>
import dataRange from "../../../components/data-rang.vue";
// import area from "@/config/areaCode.js";
import area from "@/config/china_code_data.js";
import {
  typeQueryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  typeQueryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "activity-ranking-list-keepAlive",
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
      areaData: area,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: ""
      },
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "品牌不能为空" }],
        groupId: [{ required: true, message: "活动包不能为空" }]
      },
      brandList: [],
      groupList: "",
      activityList: [],
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  components: {
    dataRange
  },
  created: function() {
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
      // typeQueryActivityVOByGroupId({groupId:value,type:1}).then(res => {
      //   if (res && res.status == 1) {
      //     this.activityList = res.data;
      //   }
      // });
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
      // typeQueryActivityGroupVOByBrandId({brandId:value,groupType:1}).then(res => {
      //   if (res && res.status == 1) {
      //     this.groupList = res.data;
      //     this.formData.groupId = res.datalist[0].id;
      //   }
      // });
    },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
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
    init: function() {
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
      console.log(data);
      this.Global.doPost(
        "report/winnerStatisticsShowReport.json",
        data,
        function(res) {
          that.provinceList = res.provList;
          that.cityList = res.cityList;
          that.areaList = res.areaList;
        }
      );
    }
  }
};
</script>


