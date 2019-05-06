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
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">门店信息管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required prop="brandId">
                <Select
                  v-model="formData.brandId"
                  placeholder="品牌名称"
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
            </div>
            <div class="btn-left w18">
              <Form-item prop="merchantId">
                <Select v-model="formData.merchantId" placeholder="经销商" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in distributorList"
                    :key="index"
                  >{{ item.merchantName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <!-- <Form-item required>
                            <Select v-model="formData.oneLevel" placeholder="一级组织" @on-change="oneLevelChange" clearable>
                                <Option :value="item.id" v-for="(item,index) in oneLeverList" :key="index">{{item.areaName}}</Option>
                            </Select> 
              </Form-item>-->
              <Form-item required>
                <Input v-model.trim="formData.storeId" placeholder="客户ID"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <!-- <Form-item required>
                            <Select v-model="formData.twoLevel"  placeholder="二级组织" @on-change="twoLevelChange" clearable>
                                <Option :value="item.id" v-for="(item,index) in twoLeverList" :key="index">{{item.areaName}}</Option>
                            </Select> 
              </Form-item>-->
              <Form-item required>
                <Input v-model.trim="formData.phone" placeholder="手机号码"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <!-- <Form-item  required>
                            <Select v-model="formData.threeLevel"  placeholder="三级组织" @on-change="threeLevelChange" clearable>
                                <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index">{{item.areaName}}</Option>
                            </Select> 
              </Form-item>-->
              <Form-item required>
                <Select v-model="formData.status" placeholder="全部状态" clearable>
                  <Option value="0">拉黑</Option>
                  <Option value="1">正常</Option>
                </Select>
              </Form-item>
            </div>

            <div class="btn-left w10">
              <div class="searchBox">
                <!-- <div class="btn-left search-left" @click="showQuery=!showQuery">
                              <button type="button">
                                  {{showQuery?'收起':'更多'}}
                                  <Icon type="ios-arrow-down" size="14" style="margin-top:-2px;" v-if="!showQuery"/>
                                  <Icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                              </button>
                </div>-->
                <div class="btn-right search-right" @click="submit('search')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="container" v-if="showQuery">
              <div class="btn-left w18">
                <!-- <Form-item  required>
                      <Select v-model="formData.fourLevel"  placeholder="四级组织" clearable>
                          <Option :value="item.id" v-for="(item,index) in fourLeverList" :key="index">{{item.areaName}}</Option>
                      </Select> 
                </Form-item>-->
              </div>
              <div class="btn-left w18"></div>

              <div class="btn-left w18">
                <!-- <Form-item required>
                        <Input v-model.trim="formData.jionCode" placeholder="客户编号"></Input>
                </Form-item>-->
              </div>
              <div class="btn-left w18"></div>
              <div class="btn-left w18">
                <!-- <Form-item required>
                        <Input v-model.trim="formData.salesRoute" placeholder="线路编号"></Input>
                </Form-item>-->
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            共查询到
            <span class="numColor">{{ pageNum }}</span> 条记录
          </span>

          <exportBtn class="btn-right" @btnClick="submit('export')" title="导出"/>
        </div>
        <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus"></hhTable>
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
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import refreshBtn from "@/components/Button/refresh-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import area from "@/config/china_code_data.js";
import config from "@/util/config.js";
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "store-information-manage-patrols-keepAlive",
  data() {
    return {
      exportExportData: {
        uploadText: "请选择上传文件"
      },
      importUrl: config.uploadWorkerExcel,
      exportExport: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      historyShow: false,
      timeModalShow: false,
      areaData: area,
      noneStatus: false,
      showList: [
        // {
        //   title: "数据来源",
        //   key: "recTime"
        // },
        {
          title: "省",
          key: "provName"
        },
        {
          title: "市",
          key: "cityName"
        },
        {
          title: "区/县",
          key: "areaName"
        },
        {
          title: "地址",
          key: "address"
        },
        {
          title: "品牌名称",
          key: "brandName"
        },

        {
          title: "经销商",
          key: "merchantName"
        },
        {
          title: "备注",
          key: "memo"
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
          title: "客户ID",
          key: "storeId",
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
          title: "姓名",
          key: "name",
          align: "center",
          tooltip: true
        },
        {
          title: "手机号",
          key: "phone",
          align: "center",
          tooltip: true
        },
        {
          title: "拉黑状态",
          key: "status",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let arr = ["拉黑", "正常"];
            return h("div", arr[params.row.status]);
          }
        },
        {
          title: "操作",
          width: 200,
          align: "center",
          render: (h, params) => {
            let tag = [
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
                      this.$refs.table.changeExpend(params, this.showList);
                      params.row.selectStatus = !params.row.selectStatus;
                    }
                  }
                },
                "详情"
              )
            ];
            let str = params.row.status == 1 ? "拉黑" : "恢复正常";
            tag.push(
              h(
                "button",
                {
                  style: {
                    padding: "3px 7px"
                  },
                  attrs: {
                    id: params.row.status == 1 ? "fail" : "success"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: `确定${str}？`,
                        onOk: () => {
                          this.Global.doPost(
                            "store/settingPatrolStoreByStatus.json",
                            {
                              id: params.row.signLoadId,
                              status: params.row.status == 1 ? 0 : 1
                            },
                            res => {
                              this.$Message.success(`${str}成功`);
                              this.init();
                            }
                          );
                        }
                      });
                    }
                  }
                },
                str
              )
            );
            return h(
              "div",
              {
                attrs: {
                  id: "bottonFather"
                }
              },
              tag
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
        status: "",
        userId: "",
        joinCode: "", //客户编号
        areaCode: [],
        voucherNo: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "" //四级组织
      },
      str: "",
      page: 1,
      pageNum: 0,

      pageData: [],
      distributorList: [],
      brandList: [],
      activityList: [],
      historyData: [],
      yearMonthData: []
    };
  },
  components: {
    dataRange,
    exportBtn,
    myModal,
    hhTable,
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
    uploadExcel() {
      if (!this.exportExportData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.exportExportData.loadFilePath) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let params = {
        loadFilePath: this.exportExportData.loadFilePath,
        brandId: this.exportExportData.brandId
      };
      this.isUpload = true;
      //导入
      this.Global.doPost(
        "position/positionSalesRouteImport.json",
        params,
        res => {
          this.init();
          this.$Message.success("上传成功");
          this.wordUploadFlag = true;
          this.isUpload = false;
          this.exportExport = false;
        }
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.exportExportData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.exportExportData.loadFilePath = url;
      }
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
      // if (!this.formData.groupId) {
      //   this.$Message.error("活动包名不能为空");
      //   return false;
      // }
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

      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("store/queryWithPageByPatrolStore.json", data, res => {
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
      this.Global.deleteEmptyProperty(data);

      let url = this.Global.getExportUrl(
        "store/queryWithPageByPatrolStoreExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.oneLeverList = [];
      this.distributorList = [];
      this.formData.merchantId = "";
      this.formData.oneLevel = "";
      if (!value) return;

      //查询经销商数据
      this.getDistributorList(value);
      //查询一级组织数据
      // queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {

      //   if (res && res.status == 1) {
      //     this.oneLeverList = res.data;
      //   }
      // });
    },
    getDistributorList(brandId) {
      this.distributorList = [];
      this.Global.doPost(
        "dealers/doQueryMerchantByBrandId.json",
        { brandId },
        res => {
          if (res.length) {
            this.distributorList = res;
          }
        }
      );
    }
  }
};
</script>


