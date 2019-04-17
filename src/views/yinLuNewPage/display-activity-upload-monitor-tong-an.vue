<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .toast-info {
    overflow: hidden;
    cursor: pointer;
    position: absolute;
    bottom: 10px;
    left: 10px;
    .toast-modal {
      position: absolute;
      background: #f4f7ff;
      max-height: 300px;
      overflow-y: auto;
      border-radius: 4px;
      width: 300px;
    }
  }
}
.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 48%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 8px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    width: 52%;
    img {
      cursor: pointer;
      margin-left: 6px;
    }
  }
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      overflow-y: auto;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.ivu-input {
  text-align: center !important;
}
//店铺商品详情
#storeGoodsInfor {
  overflow: hidden;
  margin-top: 15px;
  padding-bottom: 10px;
  .storeGoods {
    margin-top: 10px;
    height: 290px;
    width: 47%;
    margin-left: 2%;
    .goodsOperator {
      overflow: hidden;
      margin-bottom: 2px;
      .operator-l {
        float: left;
        .colorPrimary {
          color: @primary-color;
        }
        .colorSuccess {
          color: #19be6b;
        }
        .colorError {
          color: #ed3f14;
        }
        .colorBack {
          color: #80848f;
        }
        button {
          padding: 3px 10px;
        }
        label {
          height: 30px;
          line-height: 30px;
        }

        span {
          display: inline-block;
        }
      }
      .operator-r {
        float: right;
        button {
          padding: 3px 10px;
        }
      }
    }
    .goodsDetail {
      overflow: hidden;
      // video{
      //     height: 200px;
      //     float: left;
      //     width: 45%;
      // }

      .showVideoPlay {
        height: 200px;
        position: relative;
        float: left;
        width: 45%;
        video {
          width: 100%;
          height: 100%;
        }
        .mask {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          background: rgba(0, 0, 0, 0.3);
          transition: opacity 0.5s;
          color: #fff;
          text-align: center;
          // &:hover{
          //     opacity: 1;
          // }
          .maskTxt {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 60px;
            height: 40px;
            // p:first-child{
            //     margin-bottom: 15px;

            // }
          }
        }
      }
      .goodsInfor {
        float: right;
        width: 45%;
        p {
          margin-bottom: 0;
          font-size: 12px;
          line-height: 24px;
        }
      }
    }
  }
}
.noData-box{
  text-align: center;
  height: 200px;
  padding-top: 180px;
  &.no-data{
    background: url('../../assets/image/noneData.png') center 10px no-repeat;
  }
  &.no-search{
    background: url('../../assets/image/noneSearch.png') center 10px no-repeat;
  }
}

</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">陈列活动上传明细</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10" :rules="rule">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item     >
                      <!-- <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select>  -->
                      <Input value='银鹭' readonly></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="groupId"    >
                      <!-- <Select v-model="formData.groupId" placeholder="活动包名*" @on-change="getActivityList" clearable>
                          <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                      </Select> -->
                      <Input value='同安陈列活动' readonly></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="queryStartTime"    >
                      <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="queryEndTime"    >
                      <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item>                             
                      <Select v-model="formData.activityId" placeholder="活动名称" clearable>
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
                    <div class="btn-right search-right" @click="submit('form')">
                      <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                    </div>
                  </div>
                </div>
              </div>
              <transition name="fade">
                <div class="container" v-if="showQuery">
                  <div class="btn-left w18">
                    <Form-item    >
                      <!-- <Select v-model="formData.oneLevel" placeholder="一级组织" @on-change="oneLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in oneLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select>  -->
                      <Input value='销售中心' readonly></Input>
                    </Form-item>
                    <Form-item>
                        <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item     >
                      <!-- <Select v-model="formData.twoLevel"  placeholder="二级组织" @on-change="twoLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in twoLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select>  -->
                      <Input value='闽南营业部' readonly></Input>
                    </Form-item>
                    <Form-item >
                        <Input v-model.trim="formData.storeId" placeholder="用户ID"></Input>
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item     >
                      <!-- <Select v-model="formData.threeLevel"  placeholder="三级组织" @on-change="threeLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select>  -->
                      <Input value='同安处' readonly></Input>
                    </Form-item>
                    <Form-item >
                        <Input v-model.trim="formData.storeName" placeholder="门店名称"></Input>
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item     >
                      <Select v-model="formData.fourLevel"  placeholder="四级组织" clearable>
                          <Option :value="item.id" v-for="(item,index) in fourLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                    
                  </div>
                  <div class="btn-left w18">
                    <Form-item>
                        <Select placeholder="审核状态" v-model="formData.checkStatus" clearable>
                            <Option value="0">审核中</Option>
                            <Option value="1">视频通过</Option>
                            <Option value="2">审核不通过</Option>
                            <Option value="3">退回需重传</Option>
                        </Select>
                    </Form-item>
                  </div>
                </div>
              </transition>
          </Form>
        </div>
        <div class="table-box box" >
            <div class="contentTop">
              <span class="btn-left">共查询到<span class='numColor'>{{pageNum}}</span>条数据</span>
            </div>
            <div id="storeGoodsInfor" v-if="storeGoodsList && storeGoodsList.length">
                <div class="storeGoods btn-left" v-for="(item, index) in storeGoodsList" :key="index">
                    <div class="goodsOperator">
                        <div class="operator-l">
                            <span :class="{ 'colorPrimary': item.checkStatus == 1 , 
                                            'colorError': item.checkStatus == 2 , 
                                            'colorBack': item.checkStatus == 3,
                                            'colorSuccess': item.checkStatus == 4}">{{ item.checkStatus | displayCheckStatusFilters}}</span>
                        </div>
                        <div class="operator-r">
                            <Button type="primary" @click="handleLookDetail(item)">查看详情</Button>
                        </div>
                    </div>
                    <Card >
                        <div class="goodsDetail">
                            <div class="showVideoPlay">
                                <video :src="item.radioUrl" :ref='"playVideo" + index' controls></video>
                            </div>

                            <div class="goodsInfor">
                                <P>上传时间：{{item.uploadTime | formatYearMonth}}</P>
                                <P>陈列周期：{{item.startTime |formatYearMonth }}至 {{item.endTime |formatYearMonth }}</P>
                                <P>陈列活动：{{item.activityName}}</P>                                    
                                <P >活动分组：<span class="displayGroupPrimary">{{item.displayGroup}}</span></P>
                                <P>业代姓名：{{item.workerName}}</P>
                                <P>业代手机：{{item.workerPhone}}</P>
                                <P>门店ID：{{item.storeId}}</P>
                                <P>客户编号：{{item.joinCode}}</P>
                                <P>门店名称：{{item.storeName}}</P>
                                <P>备注：{{item.memo}}</P>
                            </div>
                        </div>    
                    </Card>
                </div>
            </div>
            <div class="noData-box" :class="noneStatus?'no-data':'no-search'" v-else>
                <!-- 暂无数据 -->
                {{ storeGoodsList.length < 1 && noneStatus ? '暂无数据' :"请搜索后查询"}}
            </div>
        </div>
        <div class="page-box">
            <div  class="btn-right">
              <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
        <fieldNameDes/>
      </div>
  </div>
</template>

<script>
import { displayParketCheckStatus } from "@/util/ENUMS.js";
import dataRange from "../../components/data-rang.vue";
import exportBtn from "../../components/Button/export-btn.vue";
import detailBtn from "../../components/Button/detail-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import fieldNameDes from "../../components/field-name-description.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import { displayApplyDetail } from "@/api/activity-manage/display-activity-manage.js"; //api
import { getDisplayActivityListDoQuery } from "@/api/common.js";
import { displayApplyDetailTwo } from "@/api/activity-manage/display-activity-manage.js";
export default {
  name:"display-activity-upload-monitor-keepAlive",
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
      myModalisShow: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据:[]
      social: [],
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      noneStatus:false,
      storeGoodsList: [],
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "", //四级组织
        storeId: "",
        checkStatus: "",
        storeName: "",
        joinCode: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        // queryStartTime: [{ validator: validateStart }],
        // queryEndTime: [{ validator: validateEnd }]
      },
      brandList: [],
      activityList: []
    };
  },
  components: { dataRange, exportBtn, detailBtn, myModal, fieldNameDes },
  created() {
    this.getActivityList(85);
    this.threeLevelChange("17-01010300");
  },
  methods: {
    oneLevelChange(value) {
      this.twoLeverList = [];
      this.formData.twoLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.twoLeverList = res.data;
        }
      });
    },
    twoLevelChange(value) {
      this.threeLeverList = [];
      this.formData.threeLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.threeLeverList = res.data;
        }
      });
    },
    threeLevelChange(value) {
      this.fourLeverList = [];
      this.formData.fourLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: 17,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      });
    },
    closeModal() {
      this.myModalisShow = false;
    },
    showDetail() {
      this.myModalisShow = true;
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
    handleLookDetail(val) {
      let { id, activityId, storeId } = val;
      let queryParams = {
        id,
        activityId,
        storeId,
        displayActCategory: "partakeTongAn",
        displayBackType: "D"
      };
      this.$router.push({ path: "/displayResultOneEdit", query: queryParams });
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
    //查询四级组织数据
    getFourListData(brandId, presentId) {
      if (!brandId || !presentId) {
        return;
      }
      getFourList({ brandId, presentId }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
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
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    submit(name) {
      if (!this.formData.queryStartTime) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
    //   if (!this.formData.brandId) {
    //     this.$Message.error("品牌不能为空");
    //     return false;
    //   }
    //   if (!this.formData.groupId) {
    //     this.$Message.error("活动包名不能为空");
    //     return false;
    //   }
      // if (!this.formData.activityId) {
      //   this.$Message.error("活动不能为空");
      //   return false;
      // }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
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
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data['brandId'] = 17;
      data['groupId'] = 85;
      data['oneLevel'] = "17-01000000";
      data['twoLevel'] = "17-01010000";
      data['threeLevel'] = "17-01010300";
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "display/displayApplyDetailTwoOfFourLevel.json",
        data,
        res => {
          
          this.storeGoodsList = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          this.noneStatus = true;
        }
      );
    },
    exportExcel() {
      console.log("qqqqq");
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
      data['brandId'] = 17;
      data['groupId'] = 85;
      data['oneLevel'] = "17-01000000";
      data['twoLevel'] = "17-01010000";
      data['threeLevel'] = "17-01010300";
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "uploadReport/organizationUploadDetailExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.groupList = [];
      this.formData.groupId = "";
      this.formData.oneLevel = "";
      if (!value) return;
      //查询活动包
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
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        console.log(res.data);
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
    },
    handleEdit() {
      this.$router.push({
        path: "/displayReward-edit",
        query: { type: "edit" }
      });
    }
  },
  filters: {
    formatYearMonth(time) {
      /**
       * @desc 格式化时间
       * @param {String} 时间戳
       * @return {String} 11月11日
       */
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
      return displayParketCheckStatus[val];
    }
  }
};
</script>


