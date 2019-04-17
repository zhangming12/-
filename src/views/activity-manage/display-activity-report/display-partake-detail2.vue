<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  // padding: 30px 20px;
  // padding-top: 15px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.export {
  overflow: hidden;
  button {
    float: right;
    padding: 5px 15px;
    margin-left: 10px;
  }
}
//店铺商品详情
#storeGoodsInfor {
  margin-top: 15px;
  overflow: hidden;
  .storeGoods {
    height: 310px;
    float: left;
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
      // overflow: hidden;
      // video{
      //     height: 200px;
      //     float: left;
      //     width: 45%;
      // }
      display: flex;
      flex-direction: row;
      position: relative;
      .tooltip {
        position: absolute;
        top: -10px;
        right: 0;
        width: 20px;
      }

      .showVideoPlay {
        height: 200px;
        position: relative;
        float: left;
        width: 45%;
        min-width: 250px;
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
        margin-left: 10px;
        p {
          margin-bottom: 0;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
}
#goodsStausShow {
  .ivu-form-item {
    margin-bottom: 12px;
  }
  #examine-right {
    //float: left;
    margin: 0 auto 10px;
    padding: 14px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    width: 400px;
    span {
      display: block;
    }
  }
}
.zhezhao {
  width: 100%;
  height: 100%;
  background-color: #000;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
  position: absolute;
  left: 0px;
  top: 0px;
  display: block;
  z-index: 1000;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动上传监控</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="queryStartTime">
                <data-range
                  @dataChange="startTimeChange"
                  hour="00:00"
                  :time="formData.queryStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryEndTime">
                <data-range
                  placeholder="结束时间"
                  hour="24:00"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select v-model="formData.brandId" placeholder="品牌" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId">
                <Select
                  v-model="formData.groupId"
                  placeholder="活动"
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
              <Form-item prop="activityId">
                <Select v-model="formData.activityId" placeholder="项目" clearable>
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
                  <Select v-model="formData.checkStatus" placeholder="状态" clearable>
                    <Option value="0">审核中</Option>
                    <Option value="1">视频通过</Option>
                    <Option value="2">审核不通过</Option>
                    <Option value="3">退回需重传</Option>
                  </Select>
                </Form-item>
                <Form-item>
                  <Input v-model.trim="formData.workerName" placeholder="请输入业代姓名"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeId" placeholder="请输入店铺ID"></Input>
                </Form-item>
                <Form-item>
                  <Input v-model.trim="formData.workerPhone" placeholder="请输入业代手机号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeName" placeholder="请输入店铺名称"></Input>
                </Form-item>
                <Form-item>
                  <Input v-model.trim="formData.id" placeholder="图像编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Cascader
                    :data="areaData"
                    v-model="formData.areaCode"
                    placeholder="地区"
                    change-on-select
                  ></Cascader>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div id="storeGoodsInfor" v-if="storeGoodsList && storeGoodsList.length">
          <CheckboxGroup v-model="social">
            <div
              class="storeGoods"
              v-for="(item, index) in storeGoodsList"
              :key="index"
              style="margin-top:10px;height: 290px;"
            >
              <div class="goodsOperator">
                <div class="operator-l">
                  <!-- <Checkbox :label="item.id">                                
                              <span>状态:</span>
                  </Checkbox>-->
                  <!-- colorSuccess colorError colorPrimary -->
                  <span
                    :class="{ 'colorPrimary': item.checkStatus == 1 , 
                                          'colorError': item.checkStatus == 2 , 
                                          'colorBack': item.checkStatus == 3,
                                          'colorSuccess': item.checkStatus == 4}"
                  >{{ item.checkStatus | displayCheckStatusFilters}}</span>
                </div>
                <div class="operator-r">
                  <Button type="primary" @click="handleLookDetail(item)">查看详情</Button>
                </div>
              </div>
              <Card>
                <div class="goodsDetail">
                  <!-- <video  controls="controls" :src="item.radioUrl"></video>  -->
                  <div class="tooltip" style="display:inline-block;">
                    <Tooltip
                      class="btn-right"
                      max-width="600"
                      transfer
                      :placement="getPlacement(index)"
                    >
                      <Icon type="md-help-circle" size="20"/>
                      <div slot="content">
                        <p class="t_p" v-for="v in item.auditPolicy" :key="v">{{ v }}</p>
                      </div>
                    </Tooltip>
                  </div>
                  <div class="showVideoPlay" v-if="item.fileType == 'radio'">
                    <video :src="item.radioUrl" :ref="'playVideo' + index" controls/>
                  </div>
                  <div class="showVideoPlay" v-if="item.fileType == 'image'">
                    <imageLook
                      :key="item.imageList[0]"
                      :position="getPosition(index)"
                      v-if="item.imageList.length"
                      :imageList="item.imageList"
                    />
                  </div>
                  <div class="goodsInfor">
                    <P>上传时间：{{item.uploadTime | formatYearMonth}}</P>
                    <P>陈列周期：{{item.startTime |formatYearMonth }}至 {{item.endTime |formatYearMonth }}</P>
                    <P>陈列活动：{{item.activityName}}</P>
                    <P class="displayGroupPrimary">活动分组：{{item.displayGroup}}</P>
                    <P>业代姓名：{{item.workerName}}</P>
                    <P>业代手机：{{item.workerPhone}}</P>
                    <P>用户ID：{{item.storeId}}</P>
                    <P>客户编号：{{item.joinCode}}</P>
                    <P>门店名称：{{item.storeName}}</P>
                    <P>视频ID：{{item.id}}</P>
                    <!-- <P>门店地址：{{item.storeAddress}}</P> -->
                    <P>备注：{{item.memo}}</P>
                  </div>
                </div>
              </Card>
            </div>
          </CheckboxGroup>
        </div>
        <div v-else style="text-align: center;">暂无数据</div>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
import dataRange from "../../../components/data-rang.vue";
import imageLook from "@/components/imgLook/img-look.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import { displayParketCheckStatus } from "@/util/ENUMS.js";
import { getDisplayActivityListDoQuery } from "@/api/common.js";
import { displayApplyDetailTwo } from "@/api/activity-manage/display-activity-manage.js";
import { queryDisplayListForSecondAudit } from "@/api/activity-manage/display-apply-examine.js";
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
export default {
  name: "display-partake-detail2-keepAlive",
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
      groupList: [],
      showQuery: false,
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
        activityId: "",
        groupId: "",
        storeId: "",
        storeName: "",
        workerName: "",
        workerPhone: "",
        checkStatus: "",
        areaCode: []
      },
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      areaData: area,
      brandList: [],
      activityList: [],
      social: [],
      storeGoodsList: null,
      goodsStausShow: false,
      formItem: {
        storeName: "",
        checkStatus: "",
        memo: ""
      },
      checkMessage: "",
      activityIsPass: false,
      refuseReason: "",
      page: 1,
      pageNum: 0
    };
  },
  components: { dataRange, imageLook },
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
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    getPlacement(index) {
      let str = "right";
      if (index % 2) {
        str = "left";
      }
      return str;
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
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
    getPosition(index) {
      if (!index) return "right";
      if (index % 2 == 0) return "right";
      return "left";
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
      this.page = 1;
      this.init(this.page, 10);
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
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
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
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      displayApplyDetailTwo(data).then(res => {
        if (res.status == 1) {
          this.storeGoodsList = res.data.datalist;
          let datalist = res.data.datalist;
          if (datalist && datalist.length) {
            datalist.forEach(item => {
              let imageList = [];
              if (item.image) {
                imageList = item.image.filter(val => val);
              }
              item.imageList = imageList;
              if (item.auditPolicy) {
                item.auditPolicy = item.auditPolicy.split("|");
              } else {
                item.auditPolicy = [];
              }
            });
          }
          this.pageNum = res.data.items;
          this.page = res.data.page;
        }
      });
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
    handleCloseModal() {
      this.goodsStausShow = false;
      this.formItem = [];
    },
    handleIsPass(val) {
      if (val == "2001") this.activityIsPass = false;
      else {
        this.activityIsPass = true;
      }
    },
    handleVPlay(e) {
      var index = e.currentTarget.dataset.id;
      var className = "playVideo" + index;
      var dom = this.$refs[className][0];
      dom.play();
    },
    handleBbPlay(e) {
      var index = e.currentTarget.dataset.id;
      var className = "playVideo" + index;
      var dom = this.$refs[className][0];
      this.launchFullScreen(dom);
    },
    launchFullScreen(element) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
      }
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


