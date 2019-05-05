<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
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
    <!-- <h2 class="Title">活动监控</h2>            -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="21">
            <Row>
              <Col span="13">
                <Form-item label="拍摄时间:" required>
                  <Row>
                    <Col span="11">
                      <Form-item  >
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
                      <Form-item  >
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
              <Col span="11">
                <Form-item label="客户编号:">
                  <Input v-model="formData.joinCode" placeholder="请输入客户编号"></Input>
                </Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="8">
                <Form-item label="店铺名称:">
                  <Input v-model="formData.storeName" placeholder="请输入店铺名称"></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="客户渠道:">
                  <Select v-model="formData.bapChannel" placeholder="请选择客户渠道" clearable>
                    <Option
                      v-for="(item, key, index) in protocolBapChannel"
                      :value="key"
                      :key="index"
                    >{{ item }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="业代姓名:">
                  <Input v-model="formData.workerName" placeholder="请输入业代姓名"></Input>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1">
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
              <Form-item label="路线编号:">
                <Input v-model="formData.salesRoute" placeholder="请输入路线编号"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="销售部:">
                <Input v-model="formData.salesDept" placeholder="请输入销售部"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="大区:">
                <Input v-model="formData.salesRegion" placeholder="请输入大区"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="营业部:">
                <Input v-model="formData.busiDept" placeholder="请输入营业部"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="业代手机:">
                <Input v-model="formData.workerPhone" placeholder="请输入业代手机"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="用户ID:">
                <Input v-model="formData.storeId" placeholder="请输入用户ID"></Input>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="padding-bottom:20px">
      <div id="storeGoodsInfor" v-if="storeGoodsList && storeGoodsList.length">
        <Row>
          <Col
            span="11"
            offset="1"
            v-for="(item, index) in storeGoodsList"
            :key="index"
            style="margin-top:10px;"
          >
            <storeInforCard :storeInforData="item" :loongBizType="type"></storeInforCard>
          </Col>
        </Row>
      </div>
      <div v-else style="text-align: center;">暂无数据</div>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" :page-size="4" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import {
  protocolBapChannel //BAP渠道
} from "@/util/ENUMS.js";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间

import storeInforCard from "@/components/store-infor-card.vue";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "activity-monitor-keepAlive",

  components: {
    storeInforCard,
    dataRange
  },
  data() {
    const that = this;
    return {
      type: "loong",
      protocolBapChannel,
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
        joinCode: "",
        storeName: "",
        busiDept: "",
        workerName: "",
        workerPhone: "",
        salesRoute: "",
        salesDept: "",
        salesRegion: "",
        bapChannel: "",
        isLoong: "",
        storeId: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        queryTime: [{ required: true, message: "选择日期跟时间" }]
      },
      storeGoodsList: null,
      showQuery: false
    };
  },
  created() {},
  mounted() {
    // this.init(1, 4);
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
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 4);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 4);
    },
    init: function(currentPage, pageSize) {
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
      data["loongBizType"] = "loong";
      delete data.queryTime;
      this.Global.doPost(
        "displayLoongLog/queryLoongActivityMonitor.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.storeGoodsList = res.datalist;
        }
      );
    }
  }
};
</script>


