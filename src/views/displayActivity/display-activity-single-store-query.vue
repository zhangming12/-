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
//店铺信息
#shopInfor {
  overflow: hidden;
  .title {
    display: inline-block;

    // float: left;
    height: 228px;
    line-height: 228px;
  }
  .child {
    .Input {
      display: inline-block;
      .ivu-input {
        width: 300px;
        padding: 1px 7px;
        height: 52px;
        border-radius: 3px;
        text-align: center;
      }
    }
    .ivu-radio-group-vertical .ivu-radio-wrapper {
      display: inline;
    }
  }
  .ivu-form-item {
    margin-bottom: 12px;
  }
}
#shopGoodsList {
  margin-top: 10px;
  .videoBox {
    overflow: hidden;
    min-width: 260px;
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #e5e5e5;
  }
  .date {
    font-size: 12px;
    overflow: hidden;
    margin-bottom: 5px;
    span {
      float: left;
    }
    span:last-child {
      float: right;
    }
    .select {
      color: #fe8600;
    }
  }
  .showVideo {
    height: 250px;
    position: relative;
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
        p:first-child {
          margin-bottom: 15px;
        }
      }
    }
  }
  .superscript {
    color: #000;
    text-align: center;
    line-height: 40px;
  }
  .notPass {
    color: #ed3f14;
  }
  .waiting {
    color: @primary-color;
  }

  .pass {
    color: #19be6b;
  }
}
.noData-box {
  text-align: center;
  height: 200px;
  padding-top: 180px;
  &.no-data {
    background: url("../../assets/image/noneData.png") center 10px no-repeat;
  }
  &.no-search {
    background: url("../../assets/image/noneSearch.png") center 10px no-repeat;
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
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动包名*"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryStartTime" required>
                <data-range
                  @dataChange="startTimeChange"
                  hour="00:00"
                  :time="formData.queryStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryEndTime" required>
                <data-range
                  hour="24:00"
                  placeholder="结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.activityId" placeholder="*活动名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <Icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
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
                <Form-item>
                  <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeId" placeholder="用户ID"></Input>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <!-- <div class="box" style="margin-top: 15px;padding-bottom:20px"> -->
        <div v-if="pageData">
          <div id="shopInfor">
            <div class="child">
              <Form :model="pageData" label-position="right" :label-width="88">
                <Row>
                  <Col span="6">
                    <FormItem label="店铺名称">
                      <span>{{pageData.storeName }}</span>
                    </FormItem>
                    <FormItem label="分组名称:">
                      <span>{{pageData.displayGroup}}</span>
                    </FormItem>
                    <FormItem label="不通过数:">
                      <span>{{pageData.notPassCount}}</span>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="店主姓名:">
                      <span>{{pageData.name}}</span>
                    </FormItem>
                    <FormItem label="陈列折扣:">
                      <span>{{pageData.totalAmount?pageData.totalAmount:0}}</span>
                    </FormItem>
                    <FormItem label="通过未发奖数:">
                      <span>{{pageData.passCount}}</span>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="联系电话:">
                      <span>{{pageData.storePhone}}</span>
                    </FormItem>
                    <FormItem label="上传数:">
                      <span>{{pageData.uploadCount}}</span>
                    </FormItem>

                    <FormItem label="奖励已发放:">
                      <span>{{pageData.awardPrizes}}</span>
                    </FormItem>
                  </Col>
                  <Col span="6">
                    <FormItem label="地址:">
                      <span>{{pageData.storeAddress}}</span>
                    </FormItem>
                    <FormItem label="待审核数:">
                      <span>{{pageData.notAudit}}</span>
                    </FormItem>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
          <div id="shopGoodsList">
            <Row>
              <Col
                span="6"
                class="shopGood"
                v-for="(item,index) in pageData.displayStoreVideo"
                :key="index"
              >
                <div class="videoBox">
                  <div class="date">
                    <span>{{ item.startTime | dateTranslate }}至{{ item.endTime | dateTranslate }}</span>
                    <span
                      :class="[item.checkStatus == 2 ? 'notPass' : item.checkStatus == 0 || item.checkStatus == 1001 || item.checkStatus == 1002 || item.checkStatus == 1003 || item.checkStatus == 2001?'waiting':item.checkStatus == 1 || item.checkStatus == 4?'pass':'']"
                    >{{ item.checkStatus | displayCheck }}</span>
                  </div>
                  <!-- v-if="item.fileType == 'radio'" -->
                  <div class="showVideo" v-if="item.fileType == 'radio'">
                    <video :src="item.radioUrl" :ref=""playVideo" + index" controls></video>
                  </div>
                  <div class="showVideo" v-if="item.fileType == 'image'">
                    <imageLook
                      :key="item.imageList[0]"
                      :position="getPosition(index)"
                      :imageList="item.imageList"
                    />
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <!-- <div v-else style='text-align: center;'>
                    暂无数据  
        </div>-->
        <div class="noData-box" :class="noneStatus?'no-data':'no-search'" v-else>
          <!-- 暂无数据 -->
          {{ noneStatus ? '暂无数据' :"请搜索后查询"}}
        </div>
        <!-- </div> -->
      </div>
      <div class="page-box">
        <div class="btn-right">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
import area from "../../config/china_code_data.js";

import {
  dispalyExamineSuggesteStatus,
} from "@/util/ENUMS.js";
import imageLook from "@/components/imgLook/img-look.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
  name: "display-activity-single-store-query-keepAlive",
  data() {
    return {
      noneStatus: false,
      myModalisShow: false,
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      pageData: null,
      storeGoodsList: [],
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: "",
        storeId: "",
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
  components: {
    dataRange,
    exportBtn,
    detailBtn,
    myModal,
    fieldNameDes,
    imageLook
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
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  // 5AB00077479
  methods: {
    getPosition(index) {
      let n = index % 4;
      if (n == 0 || n == 1) {
        return "right";
      } else {
        return "left";
      }
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
        displayActCategory: "partake",
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
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
        return false;
      }
      if (!this.formData.activityId) {
        this.$Message.error("活动不能为空");
        return false;
      }

      this.init(1, 10);
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
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "display/displayApplyStoreDetailOfFourLevel.json",
        data,
        res => {
          this.pageData = res;
          if (res.displayStoreVideo && res.displayStoreVideo.length) {
            res.displayStoreVideo.forEach(item => {
              let imageList = [];
              if (item.image) {
                imageList = item.image.filter(val => val);
              }
              item.imageList = imageList;
            });
          }
          this.noneStatus = true;
        }
      );
    },

    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
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
    },
    handleEdit() {
      this.$router.push({
        path: "/displayReward-edit",
        query: { type: "edit" }
      });
    }
  },
  filters: {
    displayCheck(value) {
      let displayCheckStatus = {
        "0": "待审核",
        "1": "通过",
        "2": "不通过",
        "3": "退回",
        "4": "奖励发放",
        "1001": "待审核",
        "1002": "待审核",
        "1003": "待审核",
        "2001": "待审核"
      };
      return displayCheckStatus[value];
    },
    dateTranslate(value) {
      return new Date(value).pattern("yyyy-MM-dd");
    }
  }
};
</script>


