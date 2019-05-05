<style lang="less" scoped>
@import "../../../config/index.less";
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

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    margin-top: 4px;
    color: #333;
  }
  .demo {
    float: right;
    color: @primary-color;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
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
    <!-- <h2 class="Title" v-if=" examineType == 'director' ">业务员协议查报</h2>
    <h2 class="Title" v-else-if=" examineType == 'department' ">市场部协议查报</h2>-->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80">
        <Row>
          <Col span="12">
            <Form-item label="提交时间">
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
          <Col span="9">
            <Form-item label="客户编号">
              <Input v-model="formData.joinCode"></Input>
            </Form-item>
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
          <Col span="21">
            <Row>
              <Col span="8">
                <Form-item label="状态">
                  <Select v-model="formData.checkStatus" clearable>
                    <Option value="0">待审核</Option>
                    <Option value="1001">一审通过</Option>
                    <Option value="3">退回</Option>
                    <Option value="1">审核通过</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="BAP渠道">
                  <Select v-model="formData.bapChannel" clearable>
                    <Option
                      v-for="(item, key, index) in protocolBapChannel"
                      :value="key"
                      :key="index"
                    >{{ item }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="路线编号">
                  <Input v-model="formData.salesRoute"></Input>
                </Form-item>
              </Col>
            </Row>
          </Col>
        </Row>
        <transition name="fade">
          <Row v-if="showQuery">
            <Col span="7">
              <Form-item label="签约属性">
                <Select v-model="formData.signAttr" clearable>
                  <Option
                    v-for="(item, key, index) in protocolSignAttr"
                    :value="key"
                    :key="index"
                  >{{ item }}</Option>
                </Select>
              </Form-item>
              <Form-item label="营业部">
                <Input v-model="formData.busiDept"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="销售部">
                <Select v-model="formData.salesDept" clearable>
                  <Option
                    v-for="(item, key, index) in protocolSalesDept"
                    :value="key"
                    :key="index"
                  >{{ item }}</Option>
                </Select>
              </Form-item>
              <Form-item label="协议类型">
                <Select v-model="formData.protClass" clearable>
                  <Option
                    v-for="(item, key, index) in protClassArrList"
                    :value="key"
                    :key="index"
                  >{{ item }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="大区">
                <Input v-model="formData.salesRegion"></Input>
              </Form-item>
            </Col>
            <Col span="7"></Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="padding-bottom:20px">
      <div class="contentTop">
        <Button class="btn-right" @click="exportExcel" type="success">导出</Button>
        <Button
          @click="uploadExcel"
          class="btn-right"
          :disabled="isUpload"
          type="primary"
          style="margin-right: 12px;"
        >导入</Button>
        <wpicture-upload
          :wordUploadFlag="wordUploadFlag"
          @wordPicturnUploadSuccess="picturnUploadSuccess"
        ></wpicture-upload>
        <div class="demo" @click="exportExcel">
          <Icon type="ios-paper-outline" size="14" color="@primary-color"></Icon>
          <span>下载模版</span>
        </div>
      </div>
      <Table :columns="columns" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryBrandStoreSignProtFirstList,
  queryBrandStoreSignSecondAuditList,
  firstImportAudit,
  seondImportAudit
} from "@/api/yellow-gold-protocol/protocol-examine.js";
import {
  protocolStatus,
  protocolCheckFreezer,
  protocolCorpFreezer,
  protocolSecondDisplay,
  salesTargetsGoods, //月销售目标
  protocolStoreStatus, //客户状态
  protocolBapChannel, //BAP渠道
  protocolSignAttr, //签约属性
  protocolSalesDept, //销售部
  protocolProtClass, //协议类型
  protocolIsSodaSales //汽水销售权
} from "@/util/ENUMS.js";

import dataRange from "@/components/data-rang.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";

import wpictureUpload from "@/components/word-picture-upload.vue";

export default {
  name: "examine-director-keepAlive",

  components: {
    wpictureUpload,
    dataRange
  },
  data() {
    return {
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
        salesDept: "",
        salesRegion: "",
        bapChannel: "",
        protClass: "",
        salesRoute: "",
        busiDept: "",
        signAttr: "",
        checkStatus: "0"
        // queryTime: [ EDFAULT_STARTTIME , EDFAULT_ENDTIME ]
      },
      protocolStatus,
      protocolBapChannel,
      protocolSignAttr, //签约属性
      protocolSalesDept, //销售部
      url: config.uploadWorkerExcel,
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "提交时间",
          key: "signTime",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.signTime));
          }
        },
        {
          title: "客户编号",
          key: "joinCode",
          width: 170,
          align: "center"
        },
        {
          title: "店名",
          key: "storeName",
          width: 140,
          align: "center"
        },
        {
          title: "地域性质",
          key: "regionProp",
          width: 120,
          align: "center"
        },
        {
          title: "区",
          key: "areaName",
          width: 120,
          align: "center"
        },
        {
          title: "地址详情",
          key: "address",
          width: 170,
          align: "center"
        },

        {
          title: "销售部",
          key: "salesDept",
          width: 100,
          align: "center"
        },
        {
          title: "大区",
          key: "salesRegion",
          width: 120,
          align: "center"
        },
        {
          title: "营业部",
          key: "busiDept",
          width: 120,
          align: "center"
        },
        {
          title: "办事处",
          key: "busiOffice",
          width: 160,
          align: "center"
        },
        {
          title: "客户性质",
          key: "storeNature",
          width: 100,
          align: "center"
        },
        {
          title: "BAP渠道",
          key: "bapChannel",
          width: 100,
          align: "center"
        },
        {
          title: "子渠道",
          key: "subChannel",
          width: 100,
          align: "center"
        },
        {
          title: "客户姓名",
          key: "name",
          width: 120,
          align: "center"
        },
        {
          title: "客户状态",
          key: "storeStatus",
          width: 170,
          align: "center",
          render: (h, params) => {
            return h("div", protocolStoreStatus[params.row.storeStatus]);
          }
        },

        {
          title: "销售线路号",
          key: "salesRoute",
          width: 120,
          align: "center"
        },
        {
          title: "业代姓名",
          key: "workerName",
          width: 120,
          align: "center"
        },
        {
          title: "业代手机",
          key: "workerPhone",
          width: 120,
          align: "center"
        },
        {
          title: "签约属性",
          key: "signAttr",
          width: 120,
          align: "center"
        },
        {
          title: "协议类型",
          key: "protClass",
          width: 100,
          align: "center"
        },
        {
          title: "考核冰柜",
          key: "checkFreezer",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", protocolCheckFreezer[params.row.checkFreezer]);
          }
        },
        {
          title: "冷饮设备",
          key: "isCorpFreezer",
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", protocolCorpFreezer[params.row.isCorpFreezer]);
          }
        },
        {
          title: "汽水销售授权",
          key: "isSodaSales",
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSales[params.row.isSodaSales]);
          }
        },
        {
          title: "三项协议1",
          key: "protContent",
          width: 170,
          align: "center",
          render: (h, params) => {
            if (params.row.protMap) {
              return h("div", params.row.protMap["1"]);
            }
            return "";
          }
        },
        {
          title: "三项协议2",
          key: "protContent",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.protMap) {
              return h("div", params.row.protMap["2"]);
            }
            return "";
          }
        },
        {
          title: "三项协议3",
          key: "protContent",
          width: 120,
          align: "center",
          render: (h, params) => {
            if (params.row.protMap) {
              return h("div", params.row.protMap["3"]);
            }
            return "";
          }
        },
        {
          title: "三项协议4",
          key: "protContent",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.protMap) {
              return h("div", params.row.protMap["4"]);
            }
            return "";
          }
        },
        {
          title: "三项协议5（二次陈列）",
          key: "secondDisplay",
          width: 180,
          align: "center",
          render: (h, params) => {
            return h("div", protocolSecondDisplay[params.row.secondDisplay]);
          }
        },
        {
          title: "纯悦割箱数",
          key: "iceDewNum",
          width: 120,
          align: "center"
        },
        {
          title: "SKU铺货目标",
          key: "displaySignSkuRule",
          width: 130,
          align: "center",
          render: (h, params) => {
            let count =
              params.row.displaySignSkuRule &&
              params.row.displaySignSkuRule.count
                ? params.row.displaySignSkuRule.count + "个SUK"
                : 0;
            return h("div", count);
          }
        },
        {
          title: "月销售目标",
          key: "salesTargets",
          width: 200,
          align: "center",
          render: (h, params) => {
            let goodsList =
              params.row.salesTargets && params.row.salesTargets.goodsMap;
            let signPresentDesc = [];
            for (const key in goodsList) {
              signPresentDesc.push(
                `${salesTargetsGoods[key]}${goodsList[key]}箱`
              );
            }
            signPresentDesc = signPresentDesc.length
              ? signPresentDesc.join(",")
              : null;
            return h("div", signPresentDesc);
          }
        },
        {
          title: "奖励产品",
          key: "displayAward",
          width: 160,
          align: "center",
          render: (h, params) => {
            let signPresentList = params.row.signPresentList;
            let signPresentDesc = "";
            for (var i = 0; i < signPresentList.length; i++) {
              if (i == signPresentList.length - 1) {
                signPresentDesc += `${signPresentList[i].goodsName}${
                  signPresentList[i].quantity
                }箱`;
                continue;
              }
              signPresentDesc += `${signPresentList[i].goodsName}${
                signPresentList[i].quantity
              }箱，`;
            }

            return h("div", signPresentDesc);
          }
        },
        {
          title: "折扣数量",
          key: "displayAward",
          width: 160,
          align: "center",
          render: (h, params) => {
            let signPresentList = params.row.signPresentList;
            let signPresentCount = 0;
            for (const key of signPresentList) {
              signPresentCount += key.quantity;
            }
            return h("div", signPresentCount);
          }
        },
        {
          title: "客户货架排面及SKU数",
          key: "faceRequire",
          width: 600,
          align: "center",
          render: (h, params) => {
            let faceRequire =
              params.row.faceRequire &&
              params.row.faceRequire.replace(/\|/g, "，");
            return h("div", faceRequire);
          }
        },
        {
          title: "第一位置集中陈列",
          key: "displayRequire",
          width: 250,
          align: "center",
          render: (h, params) => {
            let displayRequire =
              params.row.displayRequire &&
              params.row.displayRequire.replace(/\|/g, "，");
            return h("div", displayRequire);
          }
        },
        {
          title: "状态",
          key: "checkStatus",
          width: 170,
          align: "center",
          render: (h, params) => {
            return h("div", protocolStatus[params.row.checkStatus]);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 100,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let buttonArray = [];
            if (
              (this.examineType === "director" &&
                params.row.checkStatus === 0) ||
              (this.examineType === "department" &&
                params.row.checkStatus === 1001)
            ) {
              buttonArray.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "primary",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        //初审  this.examineType = director
                        //复审  this.examineType = department
                        let queryParams = {
                          id: params.row.id,
                          examineType: this.examineType,
                          examineStatus: "examine"
                        };
                        this.$router.push({
                          path: "/protocolReportExamine",
                          query: queryParams
                        });
                      }
                    }
                  },
                  "审核"
                )
              );
            } else {
              buttonArray.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        //初审  this.examineType = director
                        //复审  this.examineType = department
                        let queryParams = {
                          id: params.row.id,
                          examineType: this.examineType,
                          examineStatus: "look"
                        };
                        this.$router.push({
                          path: "/protocolReportExamine",
                          query: queryParams
                        });
                      }
                    }
                  },
                  "查看"
                )
              );
            }
            return h("div", buttonArray);
          }
        }
      ],
      protClassArrList: null,
      pageData: [],
      uploadText: "选择上传文件",
      wordUploadFlag: false, //上传成功标识
      isUpload: false,
      showQuery: false,
      examineType: null //审核类型
    };
  },
  created() {
    this.init();
  },
  mounted() {},
  watch: {
    "formData.bapChannel"(val) {
      if (val) {
        this.protClassArrList = protocolProtClass[val];
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    if (to.path == "/examineDirector") {
      //主任协议查报(业务员上级)
      next(vm => {
        vm.examineType = "director";
        vm.page = 1;
        vm.pageNum = 0;
        vm.pageData = [];
        vm.uploadUrl = "";
        vm.wordUploadFlag = true;
        vm.formDataInit();
        vm.formData.checkStatus = "0";
        vm.init();
      });
    } else if (to.path == "/examineDepartment") {
      //主任协议查报(业务员上级)
      next(vm => {
        vm.examineType = "department";
        vm.page = 1;
        vm.pageNum = 0;
        vm.pageData = [];
        vm.uploadUrl = "";
        vm.wordUploadFlag = true;
        vm.formDataInit();
        vm.formData.checkStatus = "1001";
        vm.init();
      });
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
    formDataInit() {
      this.formData.queryStartTime = EDFAULT_STARTTIME;
      this.formData.queryEndTime = EDFAULT_ENDTIME;
      this.formData.joinCode = "";
      this.formData.salesDept = "";
      this.formData.salesRegion = "";
      this.formData.bapChannel = "";
      this.formData.protClass = "";

      this.formData.salesRoute = "";
      this.formData.busiDept = "";
      this.formData.signAttr = "";
      // this.formData.checkStatus = '';
    },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
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
      delete data.queryTime;
      console.log(data);
      if (this.examineType == "director") {
        queryBrandStoreSignProtFirstList(data).then(res => {
          console.log(res);
          if (res && res.status === 1) {
            this.pageNum = res.data.items;
            this.page = res.data.page;
            this.pageData = res.data.datalist;
          }
        });
      } else if (this.examineType == "department") {
        queryBrandStoreSignSecondAuditList(data).then(res => {
          if (res && res.status === 1) {
            this.pageNum = res.data.items;
            this.page = res.data.page;
            this.pageData = res.data.datalist;
          }
        });
      }
    },
    exportExcel: function() {
      const url =
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/displayRetailPurchases.xlsx";
      window.open(url);
    },

    uploadExcel: function() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let params = {
        loadFilePath: this.uploadUrl
      };
      this.isUpload = true;
      //导入
      if (this.examineType == "director") {
        firstImportAudit(params).then(res => {
          if (res.status === 1) {
            this.init();
            this.$Message.success("上传成功");
            this.wordUploadFlag = true;
            this.isUpload = false;
          } else {
            this.isUpload = false;
          }
        });
      } else if (this.examineType == "department") {
        seondImportAudit(params).then(res => {
          if (res.status === 1) {
            this.init();
            this.$Message.success("上传成功");
            this.wordUploadFlag = true;
            this.isUpload = false;
          } else {
            this.isUpload = false;
          }
        });
      }
    },
    picturnUploadSuccess(val, val1) {
      this.uploadUrl = val;
      this.wordUploadFlag = val1;
    },
    exportExcel: function() {
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
      delete data.queryTime;
      console.log(data);
      var url = this.Global.getExportUrl(
        "brandStoreSign/brandStoreSignProtExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>