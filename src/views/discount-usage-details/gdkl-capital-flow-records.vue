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
    <!-- <h2 class="Title">折扣发放明细(陈列)</h2> -->
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
              <Form-item prop="queryStartTime" required>
                <data-range
                  placeholder="领取/记账开始时间"
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
                  placeholder="领取/记账结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select v-model="formData.activityType" placeholder="资金流向*" clearable>
                  <Option
                    :value="item.id"
                    :key="index"
                    v-for="(item,index) in activityTypeList"
                  >{{item.name}}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动名称"
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
                <Form-item required prop="activityId">
                  <Select v-model="formData.activityId" placeholder="子活动名" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in activityList"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </div>

              <div class="btn-left w18">
                <Form-item required>
                  <Input v-model.trim="formData.userId" placeholder="用户ID"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Input
                    :disabled="!joinCodeDis"
                    v-model.trim="formData.joinCode"
                    placeholder="客户编号"
                  ></Input>
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
          <exportBtn class="btn-right" @btnClick="myModalisShow = true" title="导出暂存"/>
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
          <!-- <hhTable :columns="columns" :pageData="historyData"  disabled-hover></hhTable> -->
          <Table :columns="columns" :data="historyData" disabled-hover></Table>
        </div>
      </div>
    </myModal>

    <!-- 时间溢出弹窗 -->
    <myModal class="myModal" @close="closeModal" :modal="timeModalShow">
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
    <myModal class="myModal" @close="closeModal" :modal="historyShow" width="800">
      <div slot="main" class="modal-main" style="padding:0;">
        <yearSelect :yearDataList="yearMonthData"/>
      </div>
    </myModal>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import refreshBtn from "@/components/Button/refresh-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import area from "@/config/china_code_data.js";
import yearSelect from "@/components/year-select.vue";
import DEV_CONFIG from "@/util/config.js";
export default {
  name: "gdkl-capital-flow-records-keepAlive",
  data() {
    return {
      historyShow: false,
      timeModalShow: false,
      areaData: area,
      noneStatus: false,
      activityTypeList: [
        {
          id: "all",
          name: "全部"
        },
        {
          id: 1,
          name: "扫码活动"
        },
        {
          id: 2,
          name: "摇奖活动"
        },
        {
          id: 3,
          name: "陈列活动"
        },
        {
          id: 4,
          name: "阶梯返利活动"
        },
        {
          id: 5,
          name: "其他活动"
        },
        {
          id: 6,
          name: "补回转账"
        }
      ],
      showList: [
        {
          title: "子活动名称",
          key: "activityName",
          align: "center",
          showMore: false,
          width: 150
        },
        {
          title: "领取/记账流水",
          key: "wxTradeNo",
          showMore: false
        },
        {
          title: "参与/发放流水",
          key: "voucherNo",
          showMore: false
        },
        {
          title: "用户地址",
          key: "address",
          showMore: false
        },
        {
          title: "手机号",
          key: "recPhone",
          showMore: false
        },
        {
          title: "客户编号",
          key: "joinCode",
          showMore: false
        },
        {
          title: "店铺名称",
          key: "storeName",
          showMore: false
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
          title: "领取/记账时间",
          key: "createTime",
          align: "center",
          tooltip: true,
          width: 150,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "参与/发放时间",
          key: "recTime",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "用户ID",
          key: "userId",
          align: "center",
          tooltip: true,
          width: 120
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          tooltip: true
        },
        {
          title: "资金流向",
          key: "activityType",
          align: "center",
          tooltip: true
        },
        {
          title: "活动名称",
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "类型",
          key: "bizCode",
          align: "center",
          tooltip: true,
          width: 100
        },
        {
          title: "收支余额",
          key: "winAmount",
          align: "center",
          tooltip: true,
          width: 100
        },
        {
          title: "账户结余",
          key: "balance",
          align: "center",
          tooltip: true
        },

        {
          title: "记账摘要",
          key: "summary",
          align: "center",
          tooltip: true
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
                        this.$refs.table.changeExpend(params, this.showList);
                        params.row.selectStatus = !params.row.selectStatus;
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
        brandId: "1,11,15,26",
        groupId: "",
        activityId: "",
        userId: "",
        activityType: "all"
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
            } else if (params.row.result == "Fail") {
              str = "数据量过大";
              color = "red";
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
                    // disabled: params.row.result == "NotDown"
                    disabled: params.row.result != "Down"
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
                      // let url = DEV_CONFIG.downloadServer + params.row.fileUrl;
                      // window.open(url);
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
      brandList: [
        {
          brandName: "全部",
          id: "1,11,15,26"
        },
        {
          brandName: "广东太古粤西",
          id: "1"
        },
        {
          brandName: "广东太古粤东（扫码)",
          id: "11"
        },
        {
          brandName: "广东太古粤东（陈列）",
          id: "15"
        },
        {
          brandName: "粤西太古可乐（巡拍）",
          id: "26"
        }
      ],
      activityList: [],
      historyData: [],
      yearMonthData: [],
      typeList: {
        "100100": "补回",
        "100101": "充值退回",
        "100200": "发放红包",
        "100201": "退回红包",
        "200100": "提现",
        "200101": "提现退回",
        "200200": "转账",
        "200201": "转账退回"
      }
    };
  },
  components: {
    dataRange,
    exportBtn,
    myModal,
    hhTable,
    yearSelect,
    refreshBtn
  },
  created() {
    this.changeValue(this.formData.brandId);
  },
  computed: {
    joinCodeDis() {
      let type = this.formData.activityType;
      if (type != "all" && type != 3) this.$set(this.formData, "joinCode", "");
      return type == "all" || type == 3 || !type;
    }
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
        userType: "广东资金流水记录"
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
      data["page"] = "capitalFlowRecords";
      data["memo"] = "无";
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
      // this.timeModalShow = false;
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
    getActivityList(value) {
      this.groupList.forEach(item => {
        if (item.id == value) {
          this.groupName = item.groupName;
        }
      });
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
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
      if (!this.formData.queryStartTime) {
        this.$Message.error("请输入领取/记账开始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入领取/记账结束时间");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.activityType) {
        this.$Message.error("资金流向不能为空");
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
      let arr = this.formData.brandId.split(",");
      let brandIds = arr.map(item => parseInt(item, 10));
      let queryType = 2;
      // queryType 1 全部  2 单个的
      if (brandIds.length > 1) {
        queryType = 1;
      }
      data["queryType"] = queryType;
      delete data["brandId"];
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

      if (
        !this.formData.userId &&
        !this.formData.joinCode &&
        this.judgeTimeIsOver(data["queryStartTime"], data["queryEndTime"], 31)
      ) {
        this.timeModalShow = true;
        return;
      }

      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      data["brandIds"] = brandIds;

      if (data["activityType"] == "all") {
        delete data["activityType"];
      }
      this.Global.doPost("bill/guangDongBillRecord.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        for (let i = 0, len = res.datalist.length; i < len; i++) {
          res.datalist[i].flag = false;
          res.datalist[i].recTime = res.datalist[i].recTime
            ? this.Global.createTime(res.datalist[i].recTime)
            : "";
          res.datalist[i].createTime = this.Global.createTime(
            res.datalist[i].createTime
          );
          this.activityTypeList.forEach(item => {
            if (item.id == res.datalist[i].activityType) {
              res.datalist[i].activityType = item.name;
            }
          });
          res.datalist[i].winAmount = this.getWinAmount(
            res.datalist[i].winAmount,
            res.datalist[i].bizCode
          );
          res.datalist[i].bizCode = this.typeList[res.datalist[i].bizCode];
        }
        this.noneStatus = true;
      });
    },
    getWinAmount(winAmount, bizCode) {
      if (
        bizCode == 100101 ||
        bizCode == 100200 ||
        bizCode == 200100 ||
        bizCode == 200200
      ) {
        return `-${winAmount}元`;
      }
      return `${winAmount}元`;
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
      let arr = this.formData.brandId.split(",");
      let brandIds = arr.map(item => parseInt(item, 10));
      let queryType = 2;
      // queryType 1 全部  2 单个的
      if (brandIds.length > 1) {
        queryType = 1;
      }
      data["queryType"] = queryType;
      delete data["brandId"];
      this.Global.deleteEmptyProperty(data);
      data["brandIds"] = brandIds;
      if (data["activityType"] == "all") {
        delete data["activityType"];
      }
      this.Global.doPost("bill/guangDongBillRecordExport.json", data, res => {
        this.myModalisShow = true;
      });
    },

    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      let arr = value.split(",");
      let brandIds = arr.map(item => parseInt(item, 10));
      let queryType = 2;
      // queryType 1 全部  2 单个的
      if (brandIds.length > 1) {
        queryType = 1;
      }
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryActivityGroupByBrandId.json",
        { date: 7, activityType: 1, scope: "a", brandIds, queryType },
        res => {
          this.groupList = res;
        }
      );
    }
  }
};
</script>