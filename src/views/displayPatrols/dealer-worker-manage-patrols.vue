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
    <!-- <h2 class="Title">经销商员工管理</h2> -->
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
              <Form-item prop="brandId" required>
                <Select v-model="formData.id" placeholder="经销商" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in distributorList"
                    :key="index"
                  >{{ item.merchantName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input v-model.trim="formData.userName" placeholder="员工姓名"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input v-model.trim="formData.phone" placeholder="员工手机号"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input v-model.trim="formData.userId" placeholder="客户ID"></Input>
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
                <div class="btn-right search-right" @click="submit('search')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="container" v-if="showQuery">
              <div class="btn-left w18">
                <Form-item required>
                  <Select v-model="formData.status" placeholder="全部状态" clearable>
                    <Option value="0">拉黑</Option>
                    <Option value="1">正常</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Input v-model.trim="formData.salesRoute" placeholder="线路编号"></Input>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            共查询到
            <span class="numColor">{{pageNum}}</span> 条记录
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

    <!-- 导入导出历史 -->
    <myModal class="myModal" @close="closeModal" :modal="myModalisShow" width="800">
      <div slot="main" class="modal-main">
        <!-- <h3>近一周导出历史</h3> -->
        <div class="modal-table" style="margin-top:0;">
          <div class="modal-table-top">
            <span class="btn-left">
              <Icon type="md-alert" size="22" style="margin-right:5px;"/>生成的数据报表可在【导出暂存】中保留7天,过期自动删除
            </span>
            <refreshBtn @click.native="queryhistoryData" class="btn-right"/>
          </div>
          <Table :columns="columns" :data="historyData" disabled-hover></Table>
        </div>
      </div>
    </myModal>

    <!-- 时间溢出弹窗 -->
    <myModal class="myModal" @close="closeModal" :modal="timeModalShow">
      <div slot="main" class="modal-main">
        <h3>提示</h3>
        <div class="modal-table">
          <p style="text-align:center;">查询的范围超过31天，请缩小查询范围或者【导出】查看</p>
        </div>
        <div class="maintain-footer">
          <Button @click="closeModal" type="text">知道了</Button>
          <Button @click="goToHistory" style="color:#ff8a34;" type="text">导出</Button>
        </div>
      </div>
    </myModal>

    <!-- 历史数据 -->
    <myModal class="myModal" @close="closeModal" :modal="historyShow" width="800">
      <div slot="main" class="modal-main" style="padding:0;">
        <yearSelect :yearDataList="yearMonthData"/>
      </div>
    </myModal>
  </div>
</template>

<script>
import exportBtn from "@/components/Button/export-btn.vue";
import refreshBtn from "@/components/Button/refresh-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import area from "@/config/china_code_data.js";
import config from "@/util/config.js";
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import yearSelect from "@/components/year-select.vue";
export default {
  name: "dealer-worker-manage-patrols-keepAlive",
  data() {
    return {
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
        {
          title: "领取时间",
          key: "recTime"
        },
        {
          title: "领取流水",
          key: "wxTradeNo"
        },
        // {
        //   title: "用户昵称",
        //   key: "nickName"
        // },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "客户地址",
          key: "address"
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
          title: "员工姓名",
          key: "userName",
          align: "center",
          tooltip: true
        },
        {
          title: "员工手机号",
          key: "phone",
          align: "center",
          tooltip: true
        },
        {
          title: "加入时间",
          key: "createTime",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },

        {
          title: "操作",
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
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: `确定删除?`,
                          onOk: () => {
                            this.Global.doPost(
                              "dealers/unlockMerchantDoll.json",
                              {
                                id: params.row.id,
                                userId: params.row.userId
                              },
                              res => {
                                this.$Message.success("成功");
                                this.init();
                              }
                            );
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      showQuery: false,
      page: 1,
      pageSize: 10,
      groupList: [],
      formData: {
        queryStartTime: "",
        queryEndTime: "",
        brandId: "",
        status: "",
        activityId: "",
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
                      let url = this.Global.getExportUrl(
                        "download.file",
                        params.row.fileUrl
                      );
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
      distributorList: [],
      brandList: [],
      activityList: [],
      historyData: [],
      yearMonthData: []
    };
  },
  components: {
    exportBtn,
    myModal,
    hhTable,
    yearSelect,
    refreshBtn
  },
  created() {
    let userData = JSON.parse(sessionStorage.getItem("user")).brands;
    let brandId = this.Global.doPostNoLoading(
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
      this.exportExport = false;
      this.timeModalShow = false;
      this.historyShow = false;
      this.myModalisShow = false;
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

      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "dealers/queryWithPageMerchantDoll.json",
        data,
        res => {
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
        }
      );
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
      var url = this.Global.getExportUrl(
        "dealers/queryWithPageMerchantDollExport.json",
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
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
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