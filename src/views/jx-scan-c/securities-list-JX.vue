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
  .form {
    display: flex;
    justify-content: space-between;
  }
  .container {
    flex: 1;
    .w18 {
      width: 20%;
    }
  }
  .w10 {
    width: 12.5%;
  }
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
              <Form-item required>
                <Input placeholder="用户昵称" v-model.trim="formData.userName" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <!-- <Input placeholder="状态" v-model.trim="formData.result"/> -->
                <Select v-model="formData.result" placeholder="状态" clearable>
                  <Option value>全部</option>
                  <Option value="success">成功</Option>
                  <Option value="fail">失败</Option>
                </Select>
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
          </div>
          <div class="btn-right w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="submit('form')">
                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
              </div>
            </div>
          </div>
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
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间

import importBtn from "@/components/Button/import-btn.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "securities-list-JX-keepAlive",
  data() {
    return {
      channerList: channerList,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      formData: {
        getStartTime: EDFAULT_STARTTIME,
        getEndTime: EDFAULT_ENDTIME
      },
      noneStatus: false,
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
          title: "用户昵称",
          key: "userName",
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
            return h("div", channerList[params.row.ticketChannel]);
          }
        },
        {
          title: "领劵地址",
          key: "ticketAddress",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "结果",
          key: "result",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            let result = params.row.result == "success" ? "成功" : "失败";
            return h("div", result);
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
          title: "失败原因",
          key: "params",
          align: "center",
          minWidth: 120,
          tooltip: true
        }
      ],
      pageSize: 10,
      pageData: []
    };
  },
  components: {
    dataRange,
    exportBtn,
    myModal,
    importBtn,
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
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("verific/getVoucherRecord.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        // for (let i = 0, len = res.datalist.length; i < len; i++) {
        //   res.datalist[i].time =
        //     this.Global.createTime(res.datalist[i].showStartTime) +
        //     "至" +
        //     this.Global.createTime(res.datalist[i].showEndTime);
        // }
      });
    }
  }
};
</script>


