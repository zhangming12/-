<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
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
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.ivu-input {
  text-align: center !important;
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
        height: 30px;
        line-height: 30px;
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .btn {
    cursor: pointer;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">详情</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="请输入姓名" v-model.trim="formData.userName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.checkStatus" placeholder="请选择类型" clearable>
                  <Option :value="1">通过</Option>
                  <Option :value="2">退回</Option>
                  <Option :value="3">不通过</Option>
                  <!-- <Option :value="4">异议</Option> -->
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.presentScore" placeholder="分值" clearable>
                  <Option :value="1">1分</Option>
                  <Option :value="2">2分</Option>
                  <Option :value="3">3分</Option>
                  <Option :value="4">4分</Option>
                  <Option :value="5">5分</Option>
                  <Option :value="6">6分</Option>
                  <Option :value="7">7分</Option>
                  <Option :value="8">8分</Option>
                  <Option :value="9">9分</Option>
                  <Option :value="10">10分</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.assessment" placeholder="考核" clearable>
                  <Option :value="1">通过</Option>
                  <Option :value="4">异议</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="item.id"
                  >{{ item.brandName }}</Option>
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
                <div class="btn-right search-right" @click="submit('form')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="container" v-if="showQuery">
              <div class="btn-left w18">
                <Form-item prop="groupId" required>
                  <Select
                    v-model="formData.groupId"
                    placeholder="活动名称*"
                    @on-change="getActivityList"
                  >
                    <Option
                      :value="item.id"
                      v-for="(item,index) in groupList"
                      :key="item.id"
                    >{{ item.groupName }}</Option>
                  </Select>
                </Form-item>
                <Form-item prop="storeName" required>
                  <Input clearable v-model.trim="formData.storeName" placeholder="请输入门店名称"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item prop="brandId" required>
                  <Select
                    v-model="formData.activityId"
                    placeholder="项目名称"
                    @on-change="getpresentList"
                    clearable
                  >
                    <Option
                      :value="item.id"
                      v-for="(item,index) in activityList"
                      :key="item.id"
                    >{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item prop="brandId" required>
                  <Select v-model="formData.presentId" placeholder="分组名称" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in presentList"
                      :key="item.id"
                    >{{ item.activityTag }}</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item prop="queryStartTime" required>
                  <DatePicker
                    style="display:block;"
                    v-model="formData.queryStartTime"
                    type="date"
                    placeholder="筛选时间"
                  ></DatePicker>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item prop="queryEndTime" required>
                  <DatePicker
                    style="display:block;"
                    v-model="formData.queryEndTime"
                    type="date"
                    placeholder="筛选时间"
                  ></DatePicker>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{ pageNum }}</span>条数据
          </span>
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import hhTable from "@/components/table/table.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "customer-service-audit-all-detail2",
  data() {
    return {
      noneStatus: false,
      showQuery: false,

      formData: {
        brandId: "",
        groupId: "",
        activityId: "",
        presentId: "",
        queryStartTime: "",
        queryEndTime: ""
      },
      userId: "",
      page: 1,
      pageNum: 0,
      pageSize: 10,
      columns1: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "品牌",
          key: "brandName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "活动名",
          key: "groupName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "项目",
          key: "activityName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "分组",
          key: "presentName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "门店",
          key: "storeName",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "活动周期",
          minWidth: 100,
          key: "proid",
          align: "center",
          tooltip: true
        },
        {
          title: "视频ID",
          minWidth: 130,
          key: "recordId",
          align: "center",
          tooltip: true
        },
        {
          title: "姓名",
          minWidth: 100,
          key: "userName",
          align: "center",
          tooltip: true
        },
        {
          title: "分值",
          minWidth: 80,
          key: "presentScore",
          align: "center",
          tooltip: true
        },
        {
          title: "审核结果",
          minWidth: 120,
          key: "checkStatus",
          align: "center",
          tooltip: true,
          render: (h, parmas) => {
            let str = "";
            if (
              parmas.row.checkStatus == 1001 ||
              parmas.row.checkStatus == 2001 ||
              parmas.row.checkStatus == 1
            ) {
              str = "通过";
            } else if (parmas.row.checkStatus == 2) {
              str = "不通过";
            } else if (parmas.row.checkStatus == 3) {
              str = "退回";
            } else if (parmas.row.checkStatus == 4) {
              str = "异议";
            }
            return h("div", str);
          }
        },
        {
          title: "最终",
          key: "lastCheckStatus",
          minWidth: 120,
          align: "center",
          tooltip: true,
          render: (h, parmas) => {
            let str = "";
            if (
              parmas.row.lastCheckStatus == 1 ||
              parmas.row.lastCheckStatus == 1001 ||
              parmas.row.checkStatus == 2001
            ) {
              str = "通过";
            } else if (parmas.row.lastCheckStatus == 2) {
              str = "不通过";
            } else if (parmas.row.lastCheckStatus == 3) {
              str = "退回";
            } else if (parmas.row.lastCheckStatus == 4) {
              str = "异议";
            } else if (parmas.row.lastCheckStatus == 0) {
              str = "待审核";
            }
            return h("div", str);
          }
        },
        {
          title: "考核",
          key: "assessment",
          minWidth: 130,
          align: "center",
          tooltip: true,
          render: (h, parmas) => {
            let str = "";
            if (parmas.row.assessment == 1) {
              str = "通过";
            } else if (parmas.row.assessment == 4) {
              str = "异议";
            }
            return h("div", str);
          }
        },
        {
          title: "审核时间",
          key: "checkTime",
          minWidth: 120,
          align: "center",
          tooltip: true
        }
      ],
      pageData: [],
      brandList: [],
      groupList: [],
      activityList: [],
      presentList: []
    };
  },
  components: {
    exportBtn,
    importBtn,
    myModal,
    hhTable,
    fieldNameDes
  },
  created() {
    if (Object.keys(this.$route.query).length) {
      let {
        queryStartTime,
        queryEndTime,
        userName,
        userId
      } = this.$route.query;
      this.formData.queryStartTime = queryStartTime;
      this.formData.queryEndTime = queryEndTime;
      this.formData.userName = userName;
    }
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  watch: {},
  methods: {
    getpresentList(value) {
      this.presentList = [];
      this.formData.presentId = "";
      if (!value) return;
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentList = res.data;
        }
      });
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
      //   if (!this.formData.queryStartTime) {
      //     this.$Message.error("请输入查询起始时间");
      //     return false;
      //   }
      //   if (!this.formData.queryEndTime) {
      //     this.$Message.error("请输入查询截止时间");
      //     return false;
      //   }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动不能为空");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.noneStatus = true;
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(
        this.formData.queryEndTime
      ).replace("00:00:00", "24:00:00");

      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "auditIntegral/queryAuditIntegralDetailsByUser.json",
        data,
        res => {
          this.pageData = res.datalist;
          res.datalist.forEach(item => {
            item.proid = `${this.Global.createTime(
              item.startTime
            )}至${this.Global.createTime(item.endTime)}`;
            item.checkTime = this.Global.createTime(item.checkTime);
          });
          this.pageNum = res.items;
          this.page = res.page;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(
        this.formData.queryEndTime
      ).replace("00:00:00", "24:00:00");

      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "auditIntegral/auditIntegralDetailsByUserExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { scope: "a", date: 7, brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
            this.init();
          }
        }
      );
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    }
  }
};
</script>