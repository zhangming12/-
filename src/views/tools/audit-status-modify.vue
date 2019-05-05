<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  background: #ffffff;
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .box {
    .card {
      border-radius: 2px;
      margin-bottom: 10px;
      overflow: hidden;
      .card-top {
        // height: 530px;
        float: left;
        margin-left: 1%;
        margin-bottom: 10px;
        width: 48%;
        box-sizing: border-box;
        padding: 10px;
        position: relative;
        display: flex;
        flex-direction: row;
        .no-upload {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          img {
            width: 163px;
            height: 163px;
          }
          p {
            margin-top: 15px;
          }
        }
        .card-left {
          border: 1px solid #e5e5e5;
        }
        .card-left{
          box-sizing: border-box;
          padding: 10px;
          padding-left: 20px;
          width: 100%;
          position: relative;

          .video-box {
            width: 100%;
            height: 213px;
            display: flex;
            .video {
              width: 100%;
              height: 213px;

              .video-main {
                width: 170px;
                position: relative;
                video {
                  width: 179px;
                  height: 213px;
                }
                img.triangle {
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
            }
          }
          .content-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            .item-box {
              line-height: 36px;
              font-size: 12px;
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .status {
                width: 70px;
              }

              display: flex;
              flex-direction: row;
              align-items: center;
            }
          }
          .btn-box {
            text-align: right;
            margin-top: 10px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}


.triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  z-index: 100;
}

.noneVideoUrl {
  display: block;
  object-fit: cover;
  height: 100%;
}
.container-box {
  margin-bottom: 10px;
  height: 75px;
  .left {
    float: left;
    width: 60px;
    height: 75px;
    font-size: 12px;
  }
  .right {
    float: left;
    margin-left: 8px;
    width: calc(~"(100% - 100px)");
  }
}
.container-status {
  overflow: hidden;
  // float: left;
  margin-top: 3px;
  line-height: 28px;
  margin-bottom: 10px;
  cursor: pointer;
  span {
    float: left;
    line-height: 15px;
    margin-left: 10px;
  }
  .bigCircle {
    margin-left: 20px;
    width: 15px;
    height: 15px;
    border: 1px solid #ff9900;
    border-radius: 50%;
    position: relative;
    float: left;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff9900;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
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
.warnColor {
  color: #ed3f14;
}
.primaryColor {
  color: @primary-color;
}
.successColor {
  color: #19be6b;
}
.noData {
  text-align: center;
  line-height: 100px;
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title" v-if="displayExamineType == 'A'">审核状态修改</h2> -->
    <div class="main-container">
        <div class="box">
            <Form ref="form" :model="formData" :label-width="10">
                <div class="container">
                        
                    <div class="btn-left w18">
                        <Form-item       >
                            <data-range @dataChange="startTimeChange" placeholder="申请开始时间" hour="00:00" :time="formData.queryStartTime" start></data-range>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item       >
                            <data-range hour="24:00" placeholder="申请结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item     prop="brandId">
                            <Select v-model="formData.brandId" placeholder="品牌名称"  @on-change="changeValue">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item prop="groupId"    >
                            <Select v-model="formData.groupId" placeholder="活动名称" @on-change="getActivityList" clearable>
                                <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                            </Select>
                        </Form-item> 
                    </div>
                    <div class="btn-left w18">
                        <Form-item prop="activityId">
                            <Select v-model="formData.activityId" placeholder="子活动名称*" @on-change="getpresentList" clearable>
                                <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="btn-left w10">
                        <div class="searchBox">
                            <div class="btn-left search-left" @click="showQuery=!showQuery">
                            <button type="button">
                                {{showQuery?'收起':'更多'}}
                                <Icon type="ios-arrow-down" size="14" style="margin-top:-2px;" v-if="!showQuery"/>
                                <Icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                            </button>
                            </div>
                            <div class="btn-right search-right" @click="submit('search')">
                            <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <transition name="fade">
                    <div class="container" v-if="showQuery">
                        <div class="btn-left w18">
                            <Form-item prop="activityId">
                                <Select v-model="formData.presentId" placeholder="子活动分组" clearable>
                                    <Option :value="item.id" v-for="(item,index) in presentNameList" :key="index">{{ item.activityTag }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item>
                                <Input v-model.trim="formData.storeId" placeholder="门店ID" clearable></Input>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item>
                                <Input v-model.trim="formData.joinCode" placeholder="客户编号" clearable></Input>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item    >
                                <RadioGroup v-model="formData.isYinLu">
                                    <Radio label="other">其他</Radio>
                                    <Radio label="yinlu">双端上传</Radio>
                                </RadioGroup>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item    >
                                <RadioGroup v-model="formData.uploadChannel">
                                    <Radio :disabled="formData.isYinLu == 'other'" label="M">门店</Radio>
                                    <Radio :disabled="formData.isYinLu == 'other'" label="W">业务员</Radio>
                                </RadioGroup>
                            </Form-item>
                        </div>
                    </div>
                </transition>
            </Form>
        </div>
        <div class="box" style="width:100%;padding:40px 10px 10px;" v-if="storeGoodsList && storeGoodsList.length">

            <div class="card" >
                <div class="card-top" v-for="(item,index) in storeGoodsList" :key="index">
                    <div class="card-left" >
                        
                        <template >
                            
                            <div class="video-box">
                                <div class="video">
                                    <div class="video-main">
                                        <video :src="item.radioUrl" v-if="item.radioUrl" controls></video>
                                        <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                        <img class="triangle" src="../../assets/image/triangle-this.jpg">
                                    </div>
                                    
                                </div>
                            </div>
                            <div class="content-box">
                                <Row style="width:100%;">
                                    <Col span="8">
                                    <div class="item-box">
                                        <span>审核状态：</span>
                                        <span :class="item.checkStatus == 1001 || item.checkStatus == 2001 || item.checkStatus == 1? 'successColor' : item.checkStatus == 1002 || item.checkStatus == 2 ? 'primaryColor' : item.checkStatus == 1003 || item.checkStatus == 3 ? 'warnColor' :''">{{ item.checkStatus | checkStatusFilter }}</span>
                                    </div>
                                    </Col>
                                    <Col span="8">
                                    <div class="item-box">
                                        <p :title="getWeek(item.startTime,item.endTime)">
                                        <span>上传周期：</span>
                                        <span>{{ getWeek(item.startTime,item.endTime) }}</span>
                                        </p>
                                    </div>
                                    </Col>
                                    <Col span="8">
                                    </Col>
                                    <Col span="23">
                                    <div class="item-box">
                                        <span class="status">审核状态：</span>
                                        <RadioGroup  v-model="item.status" @on-change="radioChange"> 
                                            <Radio :label="1">通过</Radio>
                                            <Radio :label="2">不通过</Radio>
                                            <Radio :label="3" v-if="item.liquidateStatus == -1">退回</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div class="item-box">
                                        <span class="status">审核意见：</span>
                                        <Input v-model.trim="item.checkMessage" placeholder="审核意见"></Input>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                            <div class="btn-box">
                                <Button type="primary" @click="save(item,index)">保存</Button>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        <div class="noData" v-else>暂无数据</div>
        
    </div>
	</div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import { displayCheckStatus } from "@/util/ENUMS.js";
export default {
  name: "display-one-level-audit-keepAlive",
  components: {
    dataRange
  },
  data() {
    return {
      displayExamineWordList: [],
      index: null,
      flag: null,
      startTime: EDFAULT_STARTTIME,
      endTime: EDFAULT_ENDTIME,
      startHour: "00:00",
      endHour: "24:00",
      showQuery: false,
      groupList: [], //活动包名
      enterTime: null,
      leaveTime: null,
      ruleBoxData: [], //规则框数据
      ruleBox: [], //规则框是否显示
      saveData: {},
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
        groupId: "", //活动包名ID
        brandId: "",
        activityId: "",
        storeId: "",
        storeName: "",
        isYinLu: "other",
        workerName: "",
        workerPhone: "",
        checkStatus: "",
        joinCode: "",
        salesRoute: "",
      },
      brandList: [],
      activityList: [],
      social: [],
      storeGoodsList: [],
      goodsStausShow: false,
      formItem: {
        storeName: "",
        checkStatus: "",
      },
      checkStatus: {
        success: "1001",
        fail: "1002",
        back: "1003"
      },
      presentNameList: [],
      activityIsPass: false,
      refuseReason: "", //不通过、拒绝时可填写原因
      agreeReason: "", //通过可填写原因
      page: 1,
      pageSize: 5,
      pageNum: 0,
      displayExamineType: "A",
      examineB: "",
      checkObj: [],
      wordList: []
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
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.groupList = [];
          this.formData.groupId = "";
          this.Global.doPostNoLoading(
            "condition/queryGroup.json",
            {
              date: 7,
              activityType: 3,
              scope: "a",
              brandId: this.formData.brandId
            },
            res => {
              Object.entries(res).forEach(item => {
                this.groupList.push({
                  id: Number(item[0]),
                  groupName: item[1]
                });
              });
              if (this.groupList && this.groupList.length) {
                this.formData.groupId = this.groupList[0].id;
                this.getActivityList(this.formData.groupId);
              }
            }
          );
        }
      }
    );
  },
  mounted() {},
  watch: {
    "formItem.checkStatus"(val) {
      if (val == 2001 || val == 1001) {
        this.activityIsPass = false;
      } else if (val == 1002 || val == 1003 || val == 2 || val == 3) {
        this.activityIsPass = true;
      }
    },
    goodsStausShow(val) {
      //模态框关闭，清空
      if (val == false) {
        this.refuseReason = "";
        this.agreeReason = "";
        this.checkMessage = "";
      }
    }
  },
  methods: {
    getWeek(start, end) {
      return `${this.formatTime(start)}至${this.formatTime(end)}`;
    },
    formatTime(time) {
      var time = new Date(time);
      var month = time.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = time.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var date = month + "月" + day + "日";
      return date;
    },
    saveWarning(item, index) {
      if (item.riskType == "no") {
        this.$Message.info("请选择风险类型");
        return false;
      }
      let data = {};
      if (item.riskType == "V") {
        data["riskType"] = "V";
        if (!item.riskDes) {
          this.$Message.error("请填写风险描述！");
          return false;
        }
        data["riskDes"] = item.riskDes;
      }
      let val = item.store ? item.store : item.worker;

      let { storeId, period, activityId } = val;
      data["storeId"] = storeId;
      data["period"] = period;
      data["activityId"] = activityId;
      data["riskSource"] = "H";
      this.Global.doPost("displayYxtg/addVideoRisk.json", data, res => {
        this.$Message.success("保存成功");
      });
    },
    getpresentList(value) {
      this.presentNameList = [];
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    radioChange(val) {
    },
    //状态过滤
    wordFilter(e) {
      let val = e.target.value;
      if (!val) {
        this.displayExamineWordList = JSON.parse(JSON.stringify(this.wordList));
        return false;
      }
      this.displayExamineWordList = this.wordList.filter(item => {
        return item.word.indexOf(val) != -1;
      });
    },
    aiStatusChange(val) {
      if (val == 1002 || val == 1003 || val == 2 || val == 3) {
        this.goodsStausShow = true;
      }
    },
    save(item, index) {
      let statusC = item.status;
      if (!statusC) {
        this.$Message.error("请选择审核意见");
        return false;
      }
      if (statusC == 2 || statusC == 3) {
        if (!item.checkMessage) {
          this.$Message.error("请输入审核意见");
          return false;
        }
      }
      var params = {
        id: item.id,
        checkMessage: item.checkMessage,
        checkStatus: statusC
      };

      params = this.Global.JsonChange(params);
      // this.Global.deleteEmptyProperty(params);
      this.Global.doPost("tool/updateVideoStatus.json", params, res => {
        // this.init();
        this.$Message.success("保存成功");
        this.storeGoodsList = [];
      });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
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
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    submit(name) {
      this.init();
    },
    createTime(val) {
      var time = this.Global.createTime(val);
      return time;
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
    init() {
      if (!this.formData.groupId) {
        this.$Message.error("活动名称不能为空");
        return;
      }
      if (!this.formData.activityId) {
        this.$Message.error("子活动不能为空");
        return;
      }
      if (!this.formData.storeId && !this.formData.joinCode) {
        this.$Message.error("门店ID,客户编号必传一个");
        return;
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
      data["brandId"] = this.formData.brandId;
      if (data["isYinLu"] == "other") {
        delete data["isYinLu"];
        delete data["uploadChannel"];
      } else {
        if (!data["uploadChannel"]) {
        
          this.$Message.error("请选择门店或者业务员");
          return false;
        }
      }
      delete data['isYinLu']
      this.Global.doPost(
        "tool/queryVideo.json",
        data,
        res => {
          this.storeGoodsList = res;
          for (let i = 0, len = res.length; i < len; i++) {
            res[i].status = this.setStatus(
              res[i].checkStatus,
              "store",
              i
            );
          }
        }
      );
    },
    setStatus(val, flag, index) {
      if (val == 0) {
        return;
      }
      if (val == 1001 || val == 2001 || val == 1) {
        val = 1;
      }
      if (val == 1002 || val == 2) {
        val = 2;
      }
      if (val == 1003 || val == 3) {
        val = 3;
      }
      return val;
    },
    changeCheckStatus(val) {
      if (this.displayExamineType == "B") {
        if (val == 1001) {
          val = 2001;
        } else if (val == 1002) {
          val = 2;
        } else if (val == 1003) {
          val = 3;
        }
        return val;
      }
      return val;
    },
    handleCloseModal() {
      this.goodsStausShow = false;
      this.formItem = {};
    },
  },

  filters: {
    checkStatusFilter(val) {
      let str = "";
      if (val == 1001 || val == 2001) {
        str = "通过";
      } else if (val == 1002 || val == 2) {
        str = "不通过";
      } else if (val == 1003 || val == 3) {
        str = "退回";
      } else if (val == 0) {
        str = "未审核";
      } else if (val == 1) {
        str = "通过";
      }
      return str;
    },
    storeOrWorker(val) {
      if (val == "W") {
        return "业务员";
      } else if (val == "M") {
        return "门店";
      } else {
        return "";
      }
    },
    warningStatuFilter(val) {
      let va = Number(val);
      if (va == 100) {
        return "正常";
      } else {
        return "无";
      }
    },
    skufilter(val) {
      let str = "";
      if (val == 1) {
        str = "/合格";
      } else if (val == 2) {
        str = "/不合格";
      }
      return str;
    },
    statusFilter(val) {
      let statu = Number(val);
      if (statu == 0) {
        return "未审核";
      } else if (statu == 1 || statu == 1001 || statu == 2001) {
        return "通过";
      } else if (statu == 2 || statu == 1002 || statu == 2002) {
        return "不通过";
      } else if (statu == 3 || statu == 1003 || statu == 2003) {
        return "退回";
      }
    },
    formatYearMonth(time) {
      var time = new Date(time);
      var month = time.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = time.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var date = month + "月" + day + "日";
      return date;
    },
    displayCheckStatusFilters(val) {
      return displayCheckStatus[val];
    }
  }
};
</script>