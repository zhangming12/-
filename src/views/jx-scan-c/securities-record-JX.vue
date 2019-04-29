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
      //   overflow-y: auto;
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
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
span.btn {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  padding: 4px 20px;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.2s linear;
  &:hover {
    background-color: #e5e5e5;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">领劵列表</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="getStartTime" required>
                <data-range
                  @dataChange="startTimeChange"
                  placeholder="领取开始时间"
                  hour="00:00"
                  :time="formData.getStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="getEndTime" required>
                <data-range
                  hour="24:00"
                  placeholder="领取结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.getEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="startTime" required>
                <data-range
                  @dataChange="useStartTimeChange"
                  placeholder="使用开始时间"
                  hour="00:00"
                  :time="formData.startTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="endTime" required>
                <data-range
                  hour="24:00"
                  placeholder="使用结束时间"
                  @dataChange="useEndTimeChange"
                  :time="formData.endTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.channel" placeholder="渠道" clearable>
                  <Option value>全部</option>
                  <Option :value="key" v-for="(item,key) in channerList" :key="key">{{item}}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-right w10">
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
                <Form-item>
                  <Select v-model="formData.recStatus" placeholder="状态" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in statusList"
                      :key="item.name"
                    >{{ item.name }}</Option>
                  </Select>
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
            <span class="numColor">{{pageNum}}</span>条数据
          </span>

          <!-- <exportBtn class="btn-right" @btnClick="exportExcel"/> -->
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
const channerList = {
  tiktok: "抖音",
  cycle: "其他",
  underline: "生动化"
};
import dataRange from "@/components/data-rang.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间

import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "securities-record-JX-keepAlive",
  data() {
    return {
      channerList: channerList,
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      useStart: {
        time: "",
        hour: ""
      },
      useEnd: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      formData: {
        // getStartTime: "",
        getStartTime: EDFAULT_STARTTIME,
        getEndTime: EDFAULT_ENDTIME,
        startTime: EDFAULT_STARTTIME,
        endTime: EDFAULT_ENDTIME
      },
      noneStatus: false,
      channelList: [],
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "劵编号",
          key: "ticketNo",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "领劵渠道",
          key: "ticketChannel",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            if (params.row.ticketChannel)
              return h("div", channerList[params.row.ticketChannel]);
          }
        },
        {
          title: "领取时间",
          key: "receiveTime",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            if (params.row.receiveTime)
              return h("div", this.Global.createTime(params.row.receiveTime));
          }
        },
        {
          title: "使用",
          key: "recStatus",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
              return h("div", params.row.recStatus == 2 ? '已使用' : "未使用");
          }
        },
        {
          title: "使用时间",
          key: "recTime",
          align: "center",
          minWidth: 120,
          tooltip: true,
           render: (h, params) => {
            if (params.row.recTime)
              return h("div", this.Global.createTime(params.row.recTime));
          }
        }
      ],
      pageSize: 10,
      pageData: [],
      statusList: [
        {
          name: "全部",
          id: ""
        },
        {
          name: "已使用",
          id: 2
        },
        {
          name: "未使用",
          id: 0
        }
      ]
    };
  },
  components: {
    dataRange,
    exportBtn,
    myModal,
    hhTable,
    fieldNameDes
  },
  created() {},
  methods: {
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.getStartTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        this.formData.getEndTime = value.time;
        return;
      }
      this.formData.getEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    useStartTimeChange(value) {
      this.useStart.hour = value.hour;
      this.useStart.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.startTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    useEndTimeChange(value) {
      this.useEnd.hour = value.hour;
      this.useEnd.time = value.time;
      if (value.hour == "24:00") {
        this.formData.endTime = value.time;
        return;
      }
      this.formData.endTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    submit(name) {
      // if (!this.formData.brandId) {
      //   this.$Message.error("品牌不能为空");
      //   return false;
      // }
      // if (!this.formData.groupId) {
      //   this.$Message.error("活动包名不能为空");
      //   return false;
      // }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "report/activityDailyExport.json",
        data
      );
      window.open(url);
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      if(this.formData.getStartTime){
        data["getStartTime"] = this.Global.createTime(
          this.formData.getStartTime
        );
        if (this.start.hour == "24:00") {
          data["getStartTime"] = this.Global.setHoursData(
            this.start.time,
            this.start.hour
          );
        }
      }else{
        delete data['getStartTime']
      }
      if(this.formData.getEndTime){
        data["getEndTime"] = this.Global.createTime(this.formData.getEndTime);
        if (this.end.hour == "24:00") {
          data["getEndTime"] = this.Global.setHoursData(
            this.end.time,
            this.end.hour
          );
        }
      }else{
        delete data['getEndTime']

      }
      if(this.formData.startTime){
        data["startTime"] = this.Global.createTime(this.formData.startTime);
        if (this.useStart.hour == "24:00") {
          data["startTime"] = this.Global.setHoursData(
            this.useStart.time,
            this.useStart.hour
          );
        }
      }else{
        delete data['startTime']
      }
      
      if(this.formData.endTime){
        data["endTime"] = this.Global.createTime(this.formData.endTime);
        if (this.useEnd.hour == "24:00") {
          data["endTime"] = this.Global.setHoursData(
            this.useEnd.time,
            this.useEnd.hour
          );
        }
      }else{
        delete data['endTime']
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("verific/getUseTicketRecord.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>


