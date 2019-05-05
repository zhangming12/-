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

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
//店铺信息
#shopInfor {
  overflow: hidden;
  .title {
    display: inline-block;
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
    width: 220px;
    margin-bottom: 10px;
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
    <!-- <h2 class="Title">陈列活动门店明细</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="12">
            <Form-item label="陈列周期:" required>
              <Row>
                <Col span="11">
                  <Form-item>
                    <data-range
                      hour="00:00"
                      v-model="formData.queryStartTime"
                    ></data-range>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center;">至</Col>
                <Col span="11">
                  <Form-item>
                    <data-range
                      placeholder="结束时间"
                      hour="24:00"
                      v-model="formData.queryEndTime"
                    ></data-range>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>

            <Form-item label="陈列活动:" prop="activityId">
              <Select v-model="formData.activityId" placeholder="请选择" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="8" offset="1">
            <Form-item label="品牌名称:">
              <Select
                v-model="formData.brandId"
                placeholder="请选择"
                @on-change="changeValue"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="店铺ID:">
              <Input v-model.trim="formData.storeId" placeholder="请输入店铺ID" clearable></Input>
            </Form-item>
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
            <Col span="12">
              <Form-item label="客户编号:">
                <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号" clearable></Input>
              </Form-item>
            </Col>
            <Col span="8" offset="1">
              <Form-item label="审核状态:">
                <Select v-model="formData.checkStatus" placeholder="请选择" clearable>
                  <Option value="0">审核中</Option>
                  <Option value="1">视频通过</Option>
                  <Option value="2">审核不通过</Option>
                  <Option value="3">退回需重传</Option>
                  <Option value="4">通过已发奖</Option>
                </Select>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>

    <div class="box" style="margin-top: 15px;padding-bottom:20px">
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
                <div class="showVideo">
                  <video :src="item.radioUrl" :ref=""playVideo" + index" controls></video>
                  
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
      <div v-else style="text-align: center;">暂无数据</div>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-range/data-range.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { displayApplyStoreDetail } from "@/api/activity-manage/display-activity-manage.js"; //api
import { getDisplayActivityListDoQuery } from "@/api/common.js";
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
  name: "display-store-detail-keepAlive",
  data() {
    return {
      showQuery: false,
      formData: {
        storeId: "",
        checkStatus: "",
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        activityId: "",
        brandId: "",
        joinCode: ""
      },
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        storeId: [{ required: true, message: "请输入店铺ID" }]
      },
      brandList: [],
      activityList: [],
      pageData: null
    };
  },
  components: {
    dataRange
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
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        }
      });
    },
    changePage: function(size) {
      this.init();
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      
      this.Global.deleteEmptyProperty(data);
      if (!this.formData.storeId && !this.formData.joinCode) {
        this.$Message.warning("请填写店铺ID或者客户编号");
        return;
      }
      displayApplyStoreDetail(data).then(res => {
        if (res.status === 1) {
          this.pageData = res.data;
        }
      });
    },
    changeValue(value) {
      this.formData.activityId = "";
      this.activityList = [];
      if (!value) {
        return;
      }
      getDisplayActivityListDoQuery(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data.datalist;
          this.formData.activityId = res.data.datalist[0].id;
        }
      });
    },
    video(e) {
      var index = e.currentTarget.dataset.id;
      var className = "playVideo" + index;
      var dom = this.$refs[className][0];
      dom.play();
    },
    dbVideo(e) {
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