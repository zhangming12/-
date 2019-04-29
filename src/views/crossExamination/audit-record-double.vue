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
      <!-- <h2 class="Title">审核记录(双)</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10">
              <div class="container">
                    <div class="btn-left w18">
                        <Form-item required prop="brandId">
                            <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue" clearable>
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item  prop="queryStartTime" required>
                            <data-range placeholder="提交时间查询范围" @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item  prop="queryEndTime" required>
                            <data-range hour="24:00" placeholder="提交时间查询范围" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                        </Form-item>
                    </div>
                    <!-- <div class="btn-left w18">
                        <Form-item required>
                            <Select v-model="formData.checkStatus" placeholder="终审结果" clearable>
                                <Option value="1" >终审通过</Option>
                                <Option value="2" >不通过</Option>
                                <Option value="3" >退回</Option>
                            </Select> 
                        </Form-item>
                    </div> -->
                    <div class="btn-left w18">
                      <Form-item required>
                          <Select v-model="formData.diffId" placeholder="差异类型" clearable>
                              <Option value="1" >初审差异</Option>
                              <Option value="2" >AI差异</Option>
                          </Select> 
                      </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item prop="groupId" required>
                            <Select v-model="formData.checkUserId" placeholder="初审人员" clearable>
                                <Option :value="item.id" v-for="(item,index) in audioPersonList" :key="index">{{ item.userName }}</Option>
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
                            <div class="btn-right search-right" @click="submit('search')">
                              <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                            </div>
                        </div>
                    </div>
              </div>
              <transition name="fade">
                <div class="container" v-if="showQuery">
                  
                  <div class="btn-left w18">
                    <Form-item  prop="groupId" required>
                      <Input v-model.trim="joinCode" clearable placeholder="客户编号"></Input>
                    </Form-item>
                </div>
                <div class="btn-left w18">
                    <Form-item  prop="groupId" required>
                        <Select v-model="formData.groupId" placeholder="活动名称*" @on-change="getActivityList" clearable>
                            <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                        </Select>
                    </Form-item>
                </div>
                <div class="btn-left w18">
                    <Form-item required prop="activityId">
                        <Select v-model="formData.activityId" placeholder="子活动名称" clearable>
                            <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                        </Select>
                    </Form-item>
                </div>
                  
                </div>
              </transition>
          </Form>
        </div>
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left">共查询到 <span class='numColor'>{{pageNum}}</span> 条记录</span>
              
              <exportBtn  class="btn-right" @btnClick="submit('export')" title="导出"/>
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
import refreshBtn from "@/components/Button/refresh-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import area from "@/config/china_code_data.js";
import yearSelect from "@/components/year-select.vue";
import DEV_CONFIG from "@/util/config.js";
export default {
  name: "audit-record-double-keepAlive",
  data() {
    return {
      historyShow: false,
      timeModalShow: false,
      areaData: area,
      noneStatus: false,
      showList: [
        {
          title: "活动名称",
          key: "groupName"
        },
        {
          title: "子活动分组",
          key: "activityTag"
        },
        {
          title: "初审意见1",
          key: "checkFirstOneMessage"
        },
        {
          title: "初审意见2",
          key: "checkFirstTwoMessage"
        },
        {
          title: "审核意见",
          key: "checkMessage"
        },
        // {
        //   title: "客户编号",
        //   key: "joinCode"
        // }
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
          title: "提交时间",
          key: "submitTime",
          align: "center",
          tooltip: true,
          width: 150,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.submitTime));
          }
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          tooltip: true
        },
        {
          title: "子活动名",
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "初审人1",
          key: "checkFirstOneUserId",
          align: "center",
          tooltip: true
        },
        {
          title: "初审结果1",
          key: "checkFirstOneStatus",
          align: "center",
          tooltip: true,
          render:(h,params) => {
            return h("div",this.getAuditResult(params.row.checkFirstOneStatus));
          }
        },
        {
          title: "初审人2",
          key: "checkFirstTwoUserId",
          align: "center",
          tooltip: true
        },
        {
          title: "初审结果2",
          key: "checkFirstTwoStatus",
          align: "center",
          tooltip: true,
          render:(h,params) => {
            return h("div",this.getAuditResult(params.row.checkFirstTwoStatus));
          }
        },
        {
          title: "预审判定人",
          key: "checkSecondUserId",
          align: "center",
          tooltip: true
        },
        {
          title: "预审结果",
          key: "checkSecondStatus",
          align: "center",
          tooltip: true,
          render:(h,params) => {
            return h("div",this.getAuditResult(params.row.checkSecondStatus));
          }
          
        },
        {
          title: "终审结果",
          key: "checkFinalStatus",
          align: "center",
          tooltip: true,
          render:(h,params) => {
            return h("div",this.getAuditResult(params.row.checkFinalStatus));
          }
        },
        {
          title: "AI审核结果",
          key: "checkAiStatus",
          align: "center",
          tooltip: true,
          render:(h,params) => {
            return h("div",this.getAuditResult(params.row.checkAiStatus));
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
                        this.$refs.table.changeExpend(params, this.showList);
                        params.row.selectStatus = !params.row.selectStatus;
                        return;
                        if (params.row.flag) {
                          this.$refs.table.changeExpend(params, this.showList);
                          params.row.selectStatus = !params.row.selectStatus;
                        } else {
                          //第一次请求
                          this.Global.doPost(
                            "report/getUserInfo.json",
                            {
                              userType: "B",
                              storeId: params.row.storeId
                            },
                            res => {
                              this.$refs.table.changeExpend(
                                params,
                                this.showList
                              );
                              params.row.flag = true;

                              try {
                                params.row.nickName = res[0].nickName;
                                params.row.recPhone = res[0].recPhone;
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
        groupId: "",
        status: "",
        activityId: "",
        userId: "",
        areaCode: [],
        voucherNo: ""
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
      brandList: [],
      activityList: [],
      historyData: [],
      yearMonthData: [],
      audioPersonList:[]
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
    this.Global.doPostNoLoading(
      "displayYxtg/queryRoleAndUserInfo.json",
      {id:34},
      res => {
        this.audioPersonList = res;
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
    getAuditResult(val){
      let str = "";
      if(val == 1 || val == 1001 || val == 2001){
        str = "通过"
      }else if(val == 2){
        str = "不通过"
      }else if(val == 3){
        str = "退回"
      }
      return str 
    },
    queryhistoryData() {
      let data = {
        userType: "活动参与明细（扫码）",
        bizCode: "B"
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
      if (!this.formData.groupId) {
        this.$Message.error("请选择活动包");
        return false;
      }
      let data = {};
      data["memo"] = "B";
      data["groupId"] = this.formData.groupId;
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
        { date: 7, activityType: 3, scope: "a", groupId: value },
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
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
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

      // if (
      //   !this.formData.userId &&
      //   this.judgeTimeIsOver(data["queryStartTime"], data["queryEndTime"], 31)
      // ) {
      //   this.timeModalShow = true;
      //   return;
      // }

      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["uploadChannel"] = 2;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("displayYxtg/queryAuditRecord.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        for (let i = 0, len = res.datalist.length; i < len; i++) {
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

      // if (
      //   !this.formData.userId &&
      //   this.judgeTimeIsOver(data["queryStartTime"], data["queryEndTime"], 31)
      // ) {
      //   this.timeModalShow = true;
      //   return;
      // }
      data["uploadChannel"] = 2;
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "displayYxtg/auditRecordExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.groupList = [];
      this.formData.groupId = "";
      this.formData.oneLevel = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value},
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
    }
  }
};
</script>


