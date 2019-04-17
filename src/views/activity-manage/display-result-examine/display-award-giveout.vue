<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-top: 15px;
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
    float: left;
    width: 47%;
    margin-left: 2%;
    margin-bottom: 10px;
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
          }
        }
      }
      .goodsInfor {
        float: right;
        width: 50%;
        p {
          margin-bottom: 0;
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
    width: 500px;
    span {
      display: block;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title" v-if="displayResultType == 'A'">陈列活动抽查确认</h2>
    <h2 class="Title" v-else-if="displayResultType == 'B'">陈列活动折扣发放</h2>-->

    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="21">
            <Row>
              <Col span="16">
                <Form-item label="上传时间:" required>
                  <Row>
                    <Col span="11">
                      <Form-item prop="queryStartTime">
                        <data-range
                          @dataChange="startTimeChange"
                          hour="00:00"
                          :time="formData.queryStartTime"
                          start
                        ></data-range>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center;">至</Col>
                    <Col span="11">
                      <Form-item prop="queryEndTime">
                        <data-range
                          hour="24:00"
                          placeholder="结束时间"
                          @dataChange="endTimeChange"
                          :time="formData.queryEndTime"
                        ></data-range>
                      </Form-item>
                    </Col>
                  </Row>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="品牌名称:" prop="brandId" required>
                  <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                    <Option
                      :value="item.id"
                      v-for="(item,index) in brandList"
                      :key="index"
                    >{{ item.brandName }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="24">
                <Row>
                  <Col span="8">
                    <Form-item label="活动包名:" prop="groupId">
                      <Select
                        v-model="formData.groupId"
                        placeholder="请选择"
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
                  </Col>
                  <Col span="8">
                    <Form-item label="陈列活动:" prop="brandId">
                      <Select v-model="formData.activityId" placeholder="请选择" clearable>
                        <Option
                          :value="item.id"
                          v-for="(item,index) in activityList"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </Form-item>
                  </Col>
                  <Col span="8">
                    <Form-item label="业代姓名:">
                      <Input v-model.trim="formData.workerName" placeholder="请输入业代姓名"></Input>
                    </Form-item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px">
            <div class="searchBox">
              <Button @click="submit('form')" class="btn-search search_btn" type="primary">查询</Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-up"
                v-if="showQuery"
              ></Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-down"
                v-else
              ></Button>
            </div>
          </Col>
        </Row>
        <transition name="fade">
          <Row v-if="showQuery">
            <Col span="7">
              <Form-item label="店铺ID:">
                <Input v-model.trim="formData.storeId" placeholder="请输入店铺ID"></Input>
              </Form-item>
              <Form-item label="业代手机号:">
                <Input v-model.trim="formData.workerPhone" placeholder="请输入业代手机号"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="店铺名称:">
                <Input v-model.trim="formData.storeName" placeholder="请输入店铺名称"></Input>
              </Form-item>
              <Form-item label="区域:">
                <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="客户编号:">
                <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="export">
        <Button type="primary" v-if="displayResultType == 'B'" @click="handleBatchSure()">批量选择发放</Button>
        <Button type="info" v-else-if="displayResultType == 'A'" @click="handleBatchSure()">批量选择确认</Button>
        <Button type="success" v-if="displayResultType == 'B'" @click="handleAllSure('form')">全部确认发放</Button>
        <Button
          type="primary"
          v-else-if="displayResultType == 'A'"
          @click="handleAllSure('form')"
        >全部确认</Button>
      </div>
      <div id="storeGoodsInfor" v-if="storeGoodsList && storeGoodsList.length">
        <!-- <Row> -->
        <CheckboxGroup v-model="social">
          <!-- <Col span="10"  offset="1" v-for="(item, index) in storeGoodsList" :key="index" style="margin-top:10px;height: 300px;"> -->
          <div class="storeGoods" v-for="(item, index) in storeGoodsList" :key="index">
            <div class="goodsOperator">
              <div class="operator-l">
                <Checkbox :label="item.id">
                  <span>状态:</span>
                </Checkbox>
                <span
                  :class="{ 'colorPrimary': item.checkStatus == 2001 ||1 }"
                >{{ item.checkStatus | displayCheckStatusFilters}}</span>
                <Button
                  type="success"
                  v-show=" item.checkStatus == 2001 "
                  @click="handleEidt(item)"
                >修改</Button>
              </div>
              <div class="operator-r">
                <Button type="primary" @click="handleLookDetail(item)">查看详情</Button>
              </div>
            </div>
            <Card>
              <div class="goodsDetail">
                <div class="showVideoPlay">
                  <video :src="item.radioUrl" :ref=""playVideo" + index" controls></video>
                </div>
                <div class="goodsInfor">
                  <P>上传时间：{{item.uploadTime | formatYearMonth}}</P>
                  <P>陈列周期：{{item.startTime |formatYearMonth }}至 {{item.endTime |formatYearMonth }}</P>
                  <P>陈列活动：{{item.activityName}}</P>
                  <P class="displayGroupPrimary">活动分组：{{item.presentName }}</P>
                  <P>业代姓名：{{item.workerName}}</P>
                  <P>业代手机：{{item.workerPhone}}</P>
                  <P>用户ID：{{item.storeId}}</P>
                  <P>客户编号：{{item.joinCode}}</P>
                  <P>门店名称：{{item.storeName}}</P>
                  <!-- <P>门店地址：{{item.storeAddress}}</P> -->
                  <P>备注：{{item.memo}}</P>
                </div>
              </div>
            </Card>
          </div>
          <!-- </Col>  -->
        </CheckboxGroup>
        <!-- </Row> -->
      </div>
      <div v-else style="text-align: center;">暂无数据</div>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <Modal v-model="goodsStausShow" width="600" id="goodsStausShow">
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{formItem.storeName}}</span>
      </p>
      <div>
        <Form :model="formItem" :label-width="65" :rules="rule">
          <FormItem label="状态">
            <RadioGroup
              v-model="formItem.checkStatus"
              @on-change="handleIsPass"
              v-if="displayResultType == 'A'"
            >
              <Radio label="1">通过</Radio>
              <Radio label="2">不通过</Radio>
              <Radio label="3">退回</Radio>
            </RadioGroup>
            <RadioGroup
              v-model="formItem.checkStatus"
              @on-change="handleIsPass"
              v-else-if="displayResultType == 'B'"
            >
              <Radio label="4">折扣发放</Radio>
            </RadioGroup>
          </FormItem>
          <div id="examine-right" v-show="!activityIsPass">
            <span style="color:#ff8a34">可输入原因,并反馈给门店</span>
            <Input v-model="agreeReason" style="width:220px" placeholder="请输入原因"></Input>
          </div>
          <div id="examine-right" v-show="activityIsPass">
            <span style="color:#ff8a34">输入不通过的原因,并反馈给门店，要求重新提交</span>
            <RadioGroup v-model="checkMessage" vertical class="radio">
              <Radio label="拍摄模糊，请重新拍摄上传5秒以上视频">拍摄模糊，请重新拍摄上传5秒以上视频</Radio>
              <Radio label="陈列摆放错误，请按要求摆放">陈列摆放错误，请按要求摆放</Radio>

              <Radio label="没有价格标识，请添加价格签，谢谢！">没有价格标识，请添加价格签，谢谢！</Radio>
              <Radio label="请及时补货，割箱陈列首层产品不能低于100%，谢谢！">请及时补货，割箱陈列首层产品不能低于100%，谢谢！</Radio>
              <Radio label="请重新上传视频，请拍摄到超市入口处或超市明显位置，谢谢！">请重新上传视频，请拍摄到超市入口处或超市明显位置，谢谢！</Radio>
              <Radio label="陈列产品两侧或前面请勿遮挡，请重新陈列后上传视频，谢谢！">陈列产品两侧或前面请勿遮挡，请重新陈列后上传视频，谢谢！</Radio>
              <Radio label="陈列位置不符合要求，请陈列在超市入口处或超市明显处，谢谢！">陈列位置不符合要求，请陈列在超市入口处或超市明显处，谢谢！</Radio>
              <Radio label="视频拍摄模糊，无法识别陈列箱数，请在光线充足的情况下拍摄上传，谢谢！">视频拍摄模糊，无法识别陈列箱数，请在光线充足的情况下拍摄上传，谢谢！</Radio>

              <Radio label="2">
                其他
                <Input v-model="refuseReason" placeholder="请输入原因"></Input>
              </Radio>
            </RadioGroup>
          </div>
          <FormItem label="备注" style="margin-right: 30px;">
            <Input
              v-model="formItem.memo"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入备注"
            ></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" @click="handleCloseModal">返回</Button>
        <Button type="warning" @click="handleSaveEidtGooodsStatu">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
import area from "@/config/china_code_data.js";
import dataRange from "../../../components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import { displayCheckStatus } from "@/util/ENUMS.js";
import { getDisplayActivityListDoQuery } from "@/api/common.js";
import {
  queryYxtgFinalAudit, //终审”列表
  queryDisplayListAwardPrizes, //发奖”列表
  displayYxtgAuditAllPass, //全部确认
  displayApplyBrandAuditAllPassGiveprize, //全部确认发奖
  displayYxtgAuditChoicePass, //批量选择确认
  displayApplyBrandAuditChoosePassGiveprize, //批量选择确认发奖
  displayFinalAudit //陈列审核（品牌终审）
} from "@/api/activity-manage/display-apply-examine.js";
/**
 * @desc 审核意见为不同或者退回
 * @param {String}  require 审核意见
 * @param require vue实例
 */
let noPassReason = (checkMessage, that) => {
  if (!checkMessage || !that) {
    return;
  }
  if (
    checkMessage == "拍摄模糊，请重新拍摄上传5秒以上视频" ||
    checkMessage == "陈列摆放错误，请按要求摆放" ||
    checkMessage == "没有价格标识，请添加价格签，谢谢！" ||
    checkMessage == "请及时补货，割箱陈列首层产品不能低于100" ||
    checkMessage ==
      "请重新上传视频，请拍摄到超市入口处或超市明显位置，谢谢！" ||
    checkMessage ==
      "陈列产品两侧或前面请勿遮挡，请重新陈列后上传视频，谢谢！" ||
    checkMessage ==
      "陈列位置不符合要求，请陈列在超市入口处或超市明显处，谢谢！" ||
    checkMessage ==
      "视频拍摄模糊，无法识别陈列箱数，请在光线充足的情况下拍摄上传，谢谢！"
  ) {
    that.checkMessage = checkMessage;
  } else {
    that.checkMessage = 2;
    that.refuseReason = checkMessage;
  }
};
export default {
  name: "display-award-giveout-keepAlive",
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
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: "",
        storeId: "",
        storeName: "",
        workerName: "",
        workerPhone: "",
        joinCode: "",
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
      displayResultType: "B",
      checkMessage: "",
      activityIsPass: false,
      refuseReason: "", //不通过、拒绝时可填写原因
      agreeReason: "", //通过可填写原因
      page: 1,
      pageNum: 0
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
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  components: {
    dataRange
  },
  watch: {
    goodsStausShow(val) {
      //监听模态框,关闭时  清空数据
      if (val == false) {
        this.refuseReason = null;
        this.formItem.storeName = "";
        this.formItem.checkStatus = "";
        this.formItem.memo = "";
        this.activityIsPass = false;
        this.checkMessage = "";

        this.refuseReason = "";
        this.agreeReason = "";
      }
    }
  },
  methods: {
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
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { activityType: 3, scope: "a", date: 7, brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          // if (this.groupList && this.groupList.length) {
          //   this.formData.groupId = this.groupList[0].id;
          // }
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
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        }
      });
    },
    changePage: function(size) {
      window.scrollTo(0, 0);
      this.init(size, 10);
    },
    createTime: function(val) {
      var time = this.Global.createTime(val);
      return time;
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      // data["queryStartTime"] = this.Global.createTime(
      //   this.formData.queryStartTime
      // );
      // data["queryEndTime"] = this.Global.formatEndTime(
      //   this.formData.queryEndTime
      // );
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
      if (this.displayResultType == "A") {
        queryYxtgFinalAudit(data).then(res => {
          //终审”列表

          if (res.status == 1) {
            this.storeGoodsList = res.data.datalist;
            this.pageNum = res.data.items;
            this.page = res.data.page;
          }
        });
      } else if (this.displayResultType == "B") {
        queryDisplayListAwardPrizes(data).then(res => {
          //发奖”列表
          if (res.status == 1) {
            this.storeGoodsList = res.data.datalist;
            this.pageNum = res.data.items;
            this.page = res.data.page;
          }
        });
      }
    },
    handleLookDetail(val) {
      let { id, activityId, storeId } = val;
      let queryParams = {
        id,
        activityId,
        storeId,
        displayActCategory: "ThreeLevel",
        displayBackType: this.displayResultType //A:终审，B：发奖
      };
      this.$router.push({ path: "/displayResultOneEdit", query: queryParams });
    },
    handleEidt(val) {
      this.goodsStausShow = true;
      let {
        id,
        brandId,
        activityId,
        storeId,
        goodsId,
        storeName,
        memo,
        checkStatus,
        checkMessage
      } = val;
      switch (checkStatus) {
        case 2001:
          checkStatus = 1;
          this.agreeReason = checkMessage;
          break;
        case 2:
          checkStatus = 2;
          noPassReason(checkMessage, this);
          break;
        case 3:
          checkStatus = 3;
          noPassReason(checkMessage, this);
          break;
        default:
          break;
      }
      this.formItem = {
        storeName,
        memo,
        id,
        brandId,
        activityId,
        storeId,
        goodsId,
        checkStatus
      };
    },
    handleSaveEidtGooodsStatu() {
      let objList = this.formItem;
      if (!this.formItem.checkStatus) {
        this.$Message.warning("请选择审核意见");
        return false;
      }
      if (
        (this.formItem.checkStatus == "2" ||
          this.formItem.checkStatus == "3") &&
        !this.checkMessage
      ) {
        this.$Message.warning("请选择不通过的原因");
        return false;
      }
      if (
        this.formItem.checkStatus == "2" ||
        this.formItem.checkStatus == "3"
      ) {
        //不通过、退回
        objList["checkMessage"] = this.checkMessage;
        if (this.checkMessage == "2") {
          if (!this.refuseReason) {
            this.$Message.warning("请填写其他原因");
            return;
          }
          objList["checkMessage"] = this.refuseReason;
        }
      } else {
        //通过
        objList["checkMessage"] = this.agreeReason;
      }

      displayFinalAudit(objList).then(res => {
        if (res.status == 1) {
          this.$Message.success("修改成功");
          this.goodsStausShow = false;
          this.init();
          this.social = [];
        }
      });
    },
    handleCloseModal() {
      this.goodsStausShow = false;
    },
    handleIsPass(val) {
      if (val == "1" || val == "4") this.activityIsPass = false;
      else {
        this.activityIsPass = true;
      }
    },
    handleAllSure(name) {
      let title;
      if (this.displayResultType == "A") {
        title = "<p>是否全部选择确认</p>";
      } else if (this.displayResultType == "B") {
        title = "<p>是否全部确认发奖</p>";
      }
      //全部确认
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.storeGoodsList.length != 0) {
            let timeStart = "";
            let timeEnd = "";
            timeStart = this.Global.createTime(this.formData.queryStartTime);
            if (this.start.hour == "24:00") {
              timeStart = this.Global.setHoursData(
                this.start.time,
                this.start.hour
              );
            }

            timeEnd = this.Global.createTime(this.formData.queryEndTime);
            if (this.end.hour == "24:00") {
              timeEnd = this.Global.setHoursData(this.end.time, this.end.hour);
            }
            let params = {
              brandId: this.formData.brandId,
              groupId: this.formData.groupId,
              activityId: this.formData.activityId,
              queryStartTime: timeStart,
              queryEndTime: timeEnd
            };
            this.$Modal.confirm({
              content: title,
              onOk: () => {
                if (this.displayResultType == "A") {
                  displayYxtgAuditAllPass(params).then(res => {
                    if (res.status == 1) {
                      this.$Message.success("全部确认成功");
                      this.init();
                    }
                  });
                } else if (this.displayResultType == "B") {
                  displayApplyBrandAuditAllPassGiveprize(params).then(res => {
                    if (res.status == 1) {
                      this.$Message.success("全部确认发奖成功");
                      this.init();
                    }
                  });
                }
              }
            });
          } else {
            this.$Message.warning("暂无数据");
          }
        }
      });
    },
    handleBatchSure() {
      let title;
      if (this.displayResultType == "A") {
        title = "<p>是否批量选择确认</p>";
      } else if (this.displayResultType == "B") {
        title = "<p>是否批量选择确认发奖</p>";
      }
      //批量确认
      if (this.social.length != 0) {
        this.$Modal.confirm({
          content: title,
          onOk: () => {
            if (this.displayResultType == "A") {
              displayYxtgAuditChoicePass(this.social).then(res => {
                if (res.status == 1) {
                  this.$Message.success("批量确认成功");
                  this.init();
                  this.social = [];
                }
              });
            } else if (this.displayResultType == "B") {
              displayApplyBrandAuditChoosePassGiveprize(this.social).then(
                res => {
                  if (res.status == 1) {
                    this.$Message.success("批量发奖成功");
                    this.init();
                    this.social = [];
                  }
                }
              );
            }
          }
        });
      } else {
        this.$Message.warning("请选择陈列活动视频");
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
      if (val) {
        return displayCheckStatus[val];
      } else {
        return "";
      }
    }
  }
};
</script>


