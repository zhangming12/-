<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
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
  min-height: 500px;
  margin-top: 25px;
  // padding-bottom: 60px;
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
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
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
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
  // text-overflow: ellipsis
  // white-space: nowrap;
}
.demo {
  float: left;
  margin-left: 10px;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
//下载二维码
.code-box {
  position: absolute;
  right: 0;
  top: 35px;
  .qrCode {
    position: absolute;
    padding: 20px 20px 5px;
    right: 0;
    top: 10px;
    border: 1px solid #cccccc;
    background: white;
    border-radius: 8px;
    z-index: 1000;
    width: 160px;
    .brandBox {
      width: 100%;
      margin-bottom: 10px;
    }
    div#img {
      display: block;
      width: 120px;
      height: 120px;
    }
    span {
      position: absolute;
      display: block;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      border-radius: 50%;
      top: 0;
      right: 0;
      border: 1px solid black;
      text-align: center;
      background: #666666;
      cursor: pointer;
    }
    a {
      display: block;
      width: 100%;
      height: 28px;
      line-height: 28px;
      text-align: center;
      background: #00cc66;
      color: white;
      font-size: 16px;
      margin-top: 15px;
      border-radius: 4px;
    }
  }
}


</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">门店电子劵流通记录(经销商)</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" class="form" :model="formData" :label-width="10">
              <div class="container">
                    <div class="btn-left w18">
                        <Form-item required prop="brandId">
                            <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item required prop="merchantId">
                            <Select v-model="formData.merchantId" placeholder="请选择经销商" clearable>
                                <Option :value="item.id" v-for="(item,index) in distributorList" :key="index">{{ item.merchantName }}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                      <Form-item required>
                          <Select v-model="formData.status" placeholder="折扣状态" clearable>
                            <Option value="all" >全部</Option>
                            <Option value="0" >待使用</Option>
                            <Option value="1" >流通中</Option>
                            <Option value="10" >待核销</Option>
                            <Option value="2" >已核销</Option>
                            <Option value="4" >已过期</Option>
                        </Select> 
                      </Form-item>
                    </div>
                    <div class="btn-left w18">
                      <Form-item required>
                        <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                      </Form-item>
                        
                    </div>
                    <div class="btn-left w18">
                      <Form-item required>
                        <Input v-model.trim="formData.userId" placeholder="用户ID"></Input>
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
                        <div class="code-box">
                          <Button @click="showCode" shape="circle" class="btn-right" type="info" style="margin:10px;" v-if="!qrCodeIsShow">查看二维码</Button>
                          <div class="qrCode" v-show="qrCodeIsShow">
                            
                              <div class="brandBox">
                                <Select v-model="codeData.merchantId" placeholder="请选择" @on-change='createImage'>
                                  <Option :value="item.id" v-for="(item,index) in codeDistributorList" :key="index">{{ item.merchantName }}</Option>
                                </Select>
                              </div>
                              <div ref="img" id="img"></div>
                              <span @click="closeCode">X</span>
                              <a :href="codeUrl" download="qrCode">下载</a>
                          </div>
                        </div>
                        
                    </div>
              </div>
              <transition name="fade">
                <div class="container" v-if="showQuery">
                  <div class="btn-left w18">
                    <Form-item  prop="queryStartTime" required>
                      <data-range @dataChange="startTimeChange" placeholder="发奖开始时间" hour="00:00" :time="formData.queryStartTime" start></data-range>
                    </Form-item>
                    
                  </div>
                  <div class="btn-left w18">
                    
                    
                    
                  </div>
                  <div class="btn-left w18">
                    <Form-item  prop="queryEndTime" required>
                        <data-range hour="24:00" placeholder="发奖结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                    </Form-item>
                    <!-- <Form-item required>
                        <Input v-model.trim="formData.realName" placeholder="配送人员"></Input>
                    </Form-item> -->
                  </div>
                  <div class="btn-left w18">
                    
                  </div>
                </div>
              </transition>
          </Form>
        </div>
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left">共查询到 <span class='numColor'>{{pageNum}}</span> 条记录</span>
              
              <exportBtn  class="btn-right" @btnClick="submit('export')" title="导出"/>
              <!-- <exportBtn  class="btn-right" @btnClick="myModalisShow = true" title="导出暂存"/> -->
              <!-- <detailBtn  class="btn-right" @btnClick="historyShow = true" title="历史数据" /> -->
            </div>
            <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" ></hhTable>
            
        </div>
        <div class="page-box">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
      
      <!-- 导入导出历史 -->
       <myModal class="myModal"
            @close="closeModal"
            :modal="myModalisShow"
            width=800>
          <div slot="main" class="modal-main">
            <!-- <h3>近一周导出历史</h3> -->
            <div class="modal-table" style="margin-top:0;">
              <div class="modal-table-top">
                <span class="btn-left"><Icon type="md-alert" size="22" style="margin-right:5px;" />生成的数据报表可在【导出暂存】中保留7天,过期自动删除</span>
                <refreshBtn @click.native="queryhistoryData" class="btn-right"/>
              </div>
              <!-- <hhTable :columns="columns" :pageData="historyData"  disabled-hover></hhTable> -->
              <Table :columns="columns" :data="historyData"  disabled-hover></Table>
            </div>
          </div>
       </myModal>

       <!-- 时间溢出弹窗 -->
       <myModal class="myModal"
            @close="closeModal"
            :modal="timeModalShow">
          <div slot="main" class="modal-main">
            <h3>提示</h3>
            <div class="modal-table">
                <!-- <p style="text-align:center;">{{ str }}的范围超过31天，请缩小查询范围或者前往【历史数据】中下载历史数据</p> -->
                <p style="text-align:center;">查询的范围超过31天，请缩小查询范围或者【导出】查看</p>
            </div>
            <div class="maintain-footer">
                <Button @click="closeModal" type="text">知道了</Button>
                <Button @click="goToHistory" style="color:#ff8a34;" type="text">导出</Button>
            </div>
          </div>
       </myModal>

       <!-- 历史数据 -->
       <myModal class="myModal"
            @close="closeModal"
            :modal="historyShow"
            width=800>
          <div slot="main" class="modal-main" style="padding:0;">
            <yearSelect :yearDataList="yearMonthData" />
          </div>
       </myModal>

  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
import refreshBtn from "@/components/Button/refresh-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import importBtn from "@/components/Button/import-btn.vue";
import hhTable from "@/components/table/table.vue";
import area from "@/config/china_code_data.js";
import { physicalStatus } from "@/util/ENUMS.js";
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import yearSelect from "@/components/year-select.vue";
import DEV_CONFIG from "@/util/config.js";
import QRCode from "qrcodejs2";
export default {
  name: "physical-distributor-distribution-details-keepAlive",
  data() {
    return {
      codeUrl: "",
      qrCodeIsShow: true,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      historyShow: false,
      timeModalShow: false,
      areaData: area,
      noneStatus: false,
      codeData: {
        merchantId: ""
      },
      distributorList: [], //经销商数据
      codeDistributorList: [],
      showList: [
        // {
        //   title: "配送人员",
        //   key: "realName"
        // },
        {
          title: "使用时间",
          key: "usedTime"
        },
        {
          title: "核销时间",
          key: "verifyTime"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "用户ID",
          key: "storeId"
        },
        {
          title: "一级组织",
          key: "oneLevel"
        },
        {
          title: "二级组织",
          key: "twoLevel"
        },
        {
          title: "三级组织",
          key: "threeLevel"
        },
        {
          title: "四级组织",
          key: "fourLevel"
        }
      ], // 展示更多的时候的数据
      myModalisShow: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "发奖时间",
          key: "createTime",
          align: "center",
          tooltip: true,
          width: 150,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "电子劵号",
          key: "voucherNo",
          align: "center",
          tooltip: true
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          tooltip: true
        },
        {
          title: "客户名称",
          key: "storeName",
          align: "center",
          tooltip: true
        },
        {
          title: "客户地址",
          key: "address",
          align: "center",
          tooltip: true
        },
        {
          title: "经销商",
          key: "merchantName",
          align: "center",
          tooltip: true
        },
        // {
        //   title: "活动名称",
        //   key: "groupName",
        //   align: "center",
        //   tooltip: true
        // },
        {
          title: "折扣名称",
          key: "goodsName",
          align: "center",
          tooltip: true
        },
        {
          title: "折扣数量",
          key: "winAmount",
          align: "center",
          tooltip: true
        },
        {
          title: "折扣状态",
          key: "recStatus",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            // let arr = ["待领用", "已领取", "已收到", "已退回", "已过期"];
            return h("div", physicalStatus[params.row.recStatus]);
          }
        },

        {
          title: "操作",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  id: "bottonFather"
                }
              },
              [
                h(
                  "button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    attrs: {
                      id: "primary"
                    },
                    class: {
                      down: !params.row.selectStatus,
                      up: params.row.selectStatus,
                      "ivu-icon": true
                    },
                    on: {
                      click: () => {
                        // this.$refs.table.changeExpend(params, this.showList);
                        // params.row.selectStatus = !params.row.selectStatus;
                        if (params.row.flag) {
                          this.$refs.table.changeExpend(params, this.showList);
                          params.row.selectStatus = !params.row.selectStatus;
                        } else {
                          //第一次请求
                          let data = {
                            // userId: params.row.userId,
                            joinCode: params.row.joinCode,
                            voucherNo: params.row.voucherNo
                            // brandId: params.row.brandId,
                            // srcUserId:params.row.srcUserId
                          };
                          this.Global.doPost(
                            "ecash/getDetails.json",
                            data,
                            res => {
                              this.$refs.table.changeExpend(
                                params,
                                this.showList
                              );
                              params.row.flag = true;

                              try {
                                params.row.usedTime = res.usedTime
                                  ? this.Global.createTime(res.usedTime)
                                  : "——";
                                params.row.verifyTime = res.verifyTime
                                  ? this.Global.createTime(res.verifyTime)
                                  : "——";
                                params.row.phone = res.phone;
                                params.row.address = res.address;
                                params.row.oneLevel = res.oneLevel;
                                params.row.twoLevel = res.twoLevel;
                                params.row.threeLevel = res.threeLevel;
                                params.row.fourLevel = res.fourLevel;
                                params.row.realName = res.realName;
                                params.row.activityName = res.activityName;
                                // params.row.activityTag = res.activityTag;
                                params.row.activityTag =
                                  res.activityType == 3
                                    ? res.activityTag
                                    : "——";
                              } catch (error) {
                                console.error(error);
                              }
                              params.row.selectStatus = !params.row
                                .selectStatus;
                            }
                          );
                        }
                      }
                    }
                  },
                  "详情"
                )
              ]
            );
          }
        }
      ],
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: "",
        hour: "24:00"
      },
      page: 1,
      pageSize: 10,
      groupList: [],
      formData: {
        queryStartTime: "",
        queryEndTime: "",
        brandId: "",
        status: "all",
        merchantId: "",
        activityId: "",
        userId: "",
        joinCode: "", //客户编号
        areaCode: [],
        voucherNo: "",
        merchantId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "" //四级组织
      },
      str: "",
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "导出时间",
          type: "createTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "数据来源",
          key: "menu",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "文件名",
          key: "fileRename",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "状态",
          key: "result",
          minWidth: 80,
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            let color = "";
            if (params.row.result == "Down") {
              str = "已完成";
              color = "#19be6b";
            } else {
              str = "生成中";
            }
            return h(
              "div",
              {
                style: {
                  color: color
                }
              },
              str
            );
          }
        },
        {
          title: "执行人",
          key: "userName",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let color = "";
            if (params.row.result == "Down") {
              color = "#066ACD";
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    disabled: params.row.result == "NotDown"
                  },
                  style: {
                    marginRight: "5px",
                    color: color
                  },
                  on: {
                    click: () => {
                      let url = DEV_CONFIG.downloadServer + params.row.fileUrl;
                      window.open(url);
                    }
                  }
                },
                "下载"
              )
            ]);
          }
        }
      ],
      pageData: [],
      brandList: [],
      activityList: [],
      groupList: [],
      historyData: [],
      yearMonthData: []
    };
  },
  components: {
    dataRange,
    exportBtn,
    detailBtn,
    myModal,
    importBtn,
    hhTable,
    yearSelect,
    refreshBtn
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
          // this.getDistributorList(this.formData.brandId);
        }
      }
    );
  },
  watch: {
    myModalisShow(val) {
      if (val) {
        this.queryhistoryData();
      } else {
        this.historyData = [];
      }
    },
    historyShow(val) {
      if (val) {
        this.queryYearMonthDown();
      }
    }
  },

  methods: {
    showCode() {
      this.qrCodeIsShow = true;
    },
    closeCode() {
      this.qrCodeIsShow = false;
    },
    createImage(val) {
      
      if(!val){
        return false
      }
      this.Global.doPost(
        "dealers/getWorkerIdByMerchantId.json",
        { merchantId: val },
        res => {
          //生成二维码
          let img = document.getElementById("img");
          img.innerHTML = "";
          this.qrcode = new QRCode(img, {
            text: `${ DEV_CONFIG.littleGameServer }hx?r=${ res.workerId }`,
            width: 120,
            height: 120,
            render: "canvas",
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
          });
          var canvasList = img.getElementsByTagName("canvas")[0];
          this.codeUrl = canvasList.toDataURL("image/png");
        }
      );
    },
    getDistributorList(brandId) {
      this.distributorList = [];
      this.formData.merchantId = "";
      this.codeDistributorList = [];
      this.codeData.merchantId = "";
      this.Global.doPost(
        "dealers/doQueryMerchantByBrandId.json",
        { brandId },
        res => {
          if (res.length) {
            this.codeDistributorList = JSON.parse(JSON.stringify(res));
            this.distributorList = res;
            
            this.codeData.merchantId = this.codeDistributorList[0].id;
            this.createImage(this.codeData.merchantId);
            // this.distributorList.unshift({
            //   id: "all",
            //   merchantName: "全部"
            // });
            // this.formData.merchantId = res[0].id;
          }
        }
      );
    },
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
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      });
    },
    queryhistoryData() {
      let data = {
        userType: "折扣发放明细（陈列）"
      };
      this.Global.doPost("import/getCreateFileInfor.json", data, res => {
        this.historyData = res.datalist;
      });
    },
    queryYearMonthDown() {
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      let data = {};
      data["brandId"] = this.formData.brandId;
      data["page"] = "participationDetailsScan";
      this.Global.doPost("import/getDownLoadFile.json", data, res => {
        let len = res.length;
        for (let i = 0; i < len; i++) {
          let m = res[i].month.split("-");
          res[i].year = m[0];
          res[i].m = m[1];
        }
        this.yearMonthData = res;
      });
    },
    goToHistory() {
      this.closeModal();
      this.submit("export");
      this.$nextTick(() => {
        this.myModalisShow = true;
      });
    },
    closeModal() {
      this.timeModalShow = false;
      this.historyShow = false;
      this.myModalisShow = false;
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
        this.formData.queryEndTime = value.time;
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
    submit(type) {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (type == "search") {
        this.page = 1;
        this.init();
      } else if (type == "export") {
        this.exportExcel();
      }
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      this.str = "查询";
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["status"] == "all" ? delete data["status"] : "";
      // data["merchantId"] = 1;
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
      if (!this.formData.queryStartTime) {
        delete data["queryStartTime"];
      }
      if (!this.formData.queryEndTime) {
        delete data["queryEndTime"];
      }
      if (this.formData.merchantId == "all") {
        delete data["merchantId"];
      }
      // if (
      //   !this.formData.userId &&
      //   this.judgeTimeIsOver(data["queryStartTime"], data["queryEndTime"], 31)
      // ) {
      //   this.timeModalShow = true;
      //   return;
      // }

      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("ecash/ecashDetailRecord.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        for (let i = 0, len = res.datalist.length; i < len; i++) {
          res.datalist[i].createTime = this.Global.createTime(
            res.datalist[i].createTime
          );
          res.datalist[i].recTime = this.Global.createTime(
            res.datalist[i].recTime
          );
          res.datalist[i].flag = false;
        }
        this.noneStatus = true;
      });
    },
    judgeTimeIsOver(startTime, endTime, days) {
      startTime = startTime.replace(/-/g, "/");
      startTime = new Date(startTime).getTime();
      endTime = endTime.replace(/-/g, "/");
      endTime = new Date(endTime).getTime();

      if (endTime - startTime > days * 24 * 60 * 60 * 1000) {
        return true;
      }
      return false;
    },
    exportExcel() {
      this.str = "导出";
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["status"] == "all" ? delete data["status"] : "";
      // data["merchantId"] = 1;
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
      if (!this.formData.queryStartTime) {
        delete data["queryStartTime"];
      }
      if (!this.formData.queryEndTime) {
        delete data["queryEndTime"];
      }
      if (this.formData.merchantId == "all") {
        delete data["merchantId"];
      }
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl("ecash/distributionExport.json", data);
      window.open(url);
    },
    startSendGoods() {
      let data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["status"] == "all" ? delete data["status"] : "";
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
      this.Global.doPost("merchant/startSend.json", data, res => {
        this.$Message.success("发货成功");
      });
    },
    changeValue(value) {
      this.oneLeverList = [];
      this.groupList = [];
      this.formData.groupId = "";
      this.formData.oneLevel = "";
      this.distributorList = [];
      this.formData.merchantId = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
        }
      );
      this.getDistributorList(this.formData.brandId);
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        console.log(res.data);
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
    }
  }
};
</script>


