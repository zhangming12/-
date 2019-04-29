<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  // margin: 0 auto 15px;
  // padding: 30px 20px;
  // padding-bottom: 0;
  // background: #fff;
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
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
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

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;
      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
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
.demo {
  margin-top: 10px;
  margin-left: 20px;
  cursor: pointer;
  color: @primary-color;
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">协议审核</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item  prop="queryStartTime" required>
                  <data-range placeholder="开始时间" @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item  prop="queryEndTime" required>
                  <data-range placeholder="结束时间" hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input v-model="formData.joinCode" placeholder="客户编号"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.signAttr" placeholder="协议属性" clearable>
                  <Option v-for="(item, key, index) in protocolSignAttr" :value="key" :key="index">{{ item }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>                             
                <Select v-model="formData.bapChannel" clearable placeholder="BAP渠道" @on-change="bapChannelChange">
                  <Option v-for="(item, key, index) in protocolBapChannel" :value="key" :key="index">{{ item }}</Option>
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
                <Form-item>
                  <Select v-model="formData.protClass" clearable placeholder="协议类型">
                    <Option v-for="(item, key, index) in protClassArrList" :value="key" :key="index">{{ item }}</Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="box" style="padding:10px">
        <div class='contentTop'>
          <exportBtn  class="btn-right" @btnClick="exportExcel" />
          <importBtn  class="btn-right" @btnClick="exportExport = true" />
        </div>
        <Table :columns="columns" :data="pageData" disabled-hover></Table>
        
      </div>
      <div class="page-box">
          <div>
            <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
          </div>
        </div>
    </div>
      <!-- 导入 -->
      <myModal class="myModal"
            @close="closeModal"
            :modal="exportExport">
            <div slot="main" class="modal-main">
              <h3>导入</h3>
              <div class="modal-table">
                  <Form ref="form" :model="formData" :label-width="88">
                      <!-- <Form-item label="渠道" required>
                        <Select placeholder="BAP渠道" v-model="exportExportData.bapChannel" clearable>
                            <Option v-for="(item, key, index) in protocolBapChannel" :value="key" :key="index">{{ item }}</Option>
                        </Select>
                      </Form-item>
                      <Form-item label="协议属性">
                        <Select v-model="exportExportData.signAttr" placeholder="协议属性" clearable>
                          <Option v-for="(item, key, index) in protocolSignAttr" :value="key" :key="index">{{ item }}</Option>
                        </Select>
                      </Form-item>
                      <Form-item label="协议类型">
                        <Select v-model="exportExportData.protClass" clearable placeholder="协议类型">
                          <Option v-for="(item, key, index) in exportProtClassArrList" :value="key" :key="index">{{ item }}</Option>
                        </Select>
                      </Form-item> -->
                      <Form-item label="上传文件" required>
                        <div style="overflow:hidden;">
                          <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;">
                              <Upload :action="importUrl" 
                              :show-upload-list=false
                              :on-success='handleSuccess'
                              :on-error='handleError'
                              >
                              <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                              <span>{{exportExportData.uploadText}}</span>
                              </Upload>
                          </div>
                      </div>
                      </Form-item>
                      <!-- <div class='demo' @click='download'>
                        <Icon type="ios-paper-outline" size='14' color='@primary-color'></Icon>
                        <span>下载模版</span>
                      </div> -->
                      <div class="fotter" style="text-align:center;">
                          <Button @click="closeModal" type="primary">取消</Button>
                          <Button type="success" @click="uploadExcel">导入</Button>
                      </div>
                  </Form>
              </div>
            </div>
      </myModal>
	</div>
</template>

<script>
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
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import dataRange from "@/components/data-rang.vue";
import myModal from "@/components/Modal/my-modal.vue";
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";

export default {
  name: "agreement-audit",

  components: {
    dataRange,
    exportBtn,
    importBtn,
    myModal
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (from.name == "protocolReportAudit") {
        vm.init();
      }
    });
  },
  data() {
    return {
      importUrl: config.uploadWorkerExcel,
      exportExportData: {
        uploadText: "选择上传文件"
      },
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      exportExport: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        joinCode: "",
        bapChannel: "",
        protClass: "",
        salesRoute: "",
        busiDept: "",
        signAttr: ""
        // checkStatus: "0"
      },
      protocolStatus,
      protocolBapChannel,
      protocolSignAttr, //签约属性
      protocolSalesDept, //销售部
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {
        queryStartTime: [
          {
            validator: validateStart
          }
        ],
        queryEndTime: [
          {
            validator: validateEnd
          }
        ]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          tooltip: true,
          width: 60
        },
        {
          title: "提交时间",
          key: "signTime",
          tooltip: true,
          width: 160,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.signTime));
          }
        },
        {
          title: "客户编号",
          key: "joinCode",
          tooltip: true,
          width: 170,
          align: "center"
        },
        {
          title: "店名",
          key: "storeName",
          tooltip: true,
          width: 140,
          align: "center"
        },
        {
          title: "客户姓名",
          key: "name",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "区",
          key: "areaName",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "详细地址",
          key: "address",
          tooltip: true,
          width: 170,
          align: "center"
        },
        {
          title: "销售部",
          key: "salesDept",
          tooltip: true,
          width: 100,
          align: "center"
        },
        {
          title: "大区",
          key: "salesRegion",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "营业部",
          key: "busiDept",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "办事处",
          key: "busiOffice",
          tooltip: true,
          width: 160,
          align: "center"
        },
        {
          title: "客户性质",
          key: "storeNature",
          tooltip: true,
          width: 100,
          align: "center"
        },
        {
          title: "BAP渠道",
          key: "bapChannel",
          tooltip: true,
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", protocolBapChannel[params.row.bapChannel]);
          }
        },
        {
          title: "子渠道",
          key: "subChannel",
          tooltip: true,
          width: 100,
          align: "center"
        },

        {
          title: "客户状态",
          key: "storeStatus",
          tooltip: true,
          width: 170,
          align: "center",
          render: (h, params) => {
            return h("div", protocolStoreStatus[params.row.storeStatus]);
          }
        },

        {
          title: "销售路线",
          key: "salesRoute",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "业代姓名",
          key: "workerName",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "协议属性",
          key: "signAttr",
          tooltip: true,
          width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", protocolSignAttr[params.row.signAttr]);
          }
        },
        {
          title: "协议类型",
          key: "protClass",
          tooltip: true,
          width: 100,
          align: "center",
          render: (h, params) => {
            let str = params.row.protClass.split("_")[0];
            return h("div", protocolProtClass[str][params.row.protClass]);
          }
        },
        {
          title: "考核冰柜",
          key: "checkFreezer",
          tooltip: true,
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", protocolCheckFreezer[params.row.checkFreezer]);
          }
        },
        {
          title: "冷饮设备",
          key: "isCorpFreezer",
          tooltip: true,
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", protocolCorpFreezer[params.row.isCorpFreezer]);
          }
        },
        {
          title: "汽水销售授权",
          key: "isSodaSales",
          tooltip: true,
          width: 130,
          align: "center",
          render: (h, params) => {
            return h("div", protocolIsSodaSales[params.row.isSodaSales]);
          }
        },
        {
          title: "三项协议1",
          key: "clauseOne",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "clauseOneNum",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "三项协议2",
          key: "clauseTwo",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "clauseTwoNum",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "三项协议3",
          key: "clauseThree",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "clauseThreeNum",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "三项协议4",
          key: "clauseFour",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "clauseFourNum",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "二次陈列1",
          key: "secondOne",
          tooltip: true,
          width: 180,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "secondOneQuantity",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "二次陈列2",
          key: "secondTwo",
          tooltip: true,
          width: 180,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "secondTwoQuantity",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "外卖",
          key: "takeoutPlatform",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "takeoutPlatformNum",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "纯悦割箱",
          key: "iceDewNum",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "isIceDewNum",
          tooltip: true,
          width: 120,
          align: "center"
        },
        {
          title: "必备SKU",
          key: "skuTarget",
          width: 130,
          tooltip: true,
          align: "center"
        },
        {
          title: "月销售目标",
          key: "monthTarget",
          width: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "折扣产品",
          key: "rewardProduct",
          tooltip: true,
          width: 160,
          align: "center"
        },
        {
          title: "折扣数量",
          key: "displayAward",
          tooltip: true,
          width: 160,
          align: "center",
          render: (h, params) => {
            let signPresentList = params.row.presentList;
            let signPresentCount = null;
            if (signPresentList) {
              for (const key of signPresentList) {
                signPresentCount += key.quantity;
              }
            }
            return h("div", signPresentCount);
          }
        },
        {
          title: "状态",
          key: "checkStatus",
          tooltip: true,
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
                      let queryParams = {
                        id: params.row.id,
                        examineStatus: "examine"
                      };
                      this.$router.push({
                        path: "/protocolReportAudit",
                        query: queryParams
                      });
                    }
                  }
                },
                "审核"
              )
            );
            return h("div", buttonArray);
          }
        }
      ],
      protClassArrList: null,
      exportProtClassArrList: null,
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
    },
    "exportExportData.bapChannel"(val) {
      if (val) {
        this.exportProtClassArrList = protocolProtClass[val];
      }
    },
    exportExport(val) {
      if (!val) {
        this.exportExportData.uploadText = "选择上传文件";
        this.exportExportData.loadFilePath = "";
      }
    }
  },
  methods: {
    bapChannelChange(val) {
      this.formData.protClass = "";
      this.protClassArrList = [];
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.exportExportData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.exportExportData.loadFilePath = url;
      }
    },
    closeModal() {
      this.exportExport = false;
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
    submit(name) {
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
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
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost(
        "brandStoreSign/queryAgreementList.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;

          for (let i = 0, len = res.datalist.length; i < len; i++) {
            // 月销售目标
            res.datalist[i].monthTarget =
              res.datalist[i].awardPremiseMap.message;
            //折扣产品
            let signPresentList = res.datalist[i].presentList;
            let signPresentDesc = "";
            if (signPresentList) {
              for (let j = 0; j < signPresentList.length; j++) {

                if(signPresentList[j].key == "clauseOne"){
                  res.datalist[i].clauseOneNum = signPresentList[j].quantity
                }
                if(signPresentList[j].key == "clauseTwo"){
                  res.datalist[i].clauseTwoNum = signPresentList[j].quantity
                }
                if(signPresentList[j].key == "clauseThree"){
                  res.datalist[i].clauseThreeNum = signPresentList[j].quantity
                }
                if(signPresentList[j].key == "clauseFour"){
                  res.datalist[i].clauseFourNum = signPresentList[j].quantity
                }
                if(signPresentList[j].key == "product" || signPresentList[j].key == "meal"){
                  res.datalist[i].takeoutPlatformNum = signPresentList[j].quantity
                }
                if(signPresentList[j].key == "isIceDew"){
                  res.datalist[i].isIceDewNum = signPresentList[j].quantity
                }
                if (j == signPresentList.length - 1) {
                  signPresentDesc += `${signPresentList[j].goodsName}${
                    signPresentList[j].quantity
                  }${signPresentList[j].unit}`;
                  continue;
                }
                
                signPresentDesc += `${signPresentList[j].goodsName}${
                  signPresentList[j].quantity
                }${signPresentList[j].unit}，`;

              }
            }
            res.datalist[i].rewardProduct = signPresentDesc;
            //三项协议1
            res.datalist[i].clauseOne =
              res.datalist[i].protContentsModel["clauseOne"];
            //三项协议2
            res.datalist[i].clauseTwo =
              res.datalist[i].protContentsModel["clauseTwo"];
            //三项协议3
            res.datalist[i].clauseThree =
              res.datalist[i].protContentsModel["clauseThree"];
            //三项协议4
            res.datalist[i].clauseFour =
              res.datalist[i].protContentsModel["clauseFour"];
            //二次陈列
            res.datalist[i].secondDisplay =
              res.datalist[i].protContentsModel["secondDisplay"] || "无";
            //外卖平台
            res.datalist[i].takeoutPlatform =
              res.datalist[i].protContentsModel["meal"] ||
              res.datalist[i].protContentsModel["product"] ||
              "无";
          }
          this.pageData = res.datalist;
        }
      );
    },
    download() {
      const url =
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/displayRetailPurchases.xlsx";
      window.open(url);
    },

    uploadExcel() {
      if (!this.exportExportData.loadFilePath) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let params = {
        loadFilePath: this.exportExportData.loadFilePath
      };
      this.isUpload = true;
      //导入
      this.Global.doPost("brandStoreSign/importSignAudit.json", params, res => {
        this.$Message.success("导入成功");
        setTimeout(() => {
          this.init();
        }, 1000);
        this.exportExport = false;
        this.wordUploadFlag = true;
        this.isUpload = false;
      });
    },
    exportExcel() {
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
      var url = this.Global.getExportUrl(
        "brandStoreSign/brandStoreSignProtExportNew.json",
        data
      );
      window.open(url);
    }
  }
};
</script>