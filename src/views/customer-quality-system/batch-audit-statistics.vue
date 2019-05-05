// 批量审核统计
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
    <!-- <h2 class="Title">批量审核统计</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item   required>
                <DatePicker type="date" v-model="formData.queryStartTime" placeholder="开始时间"></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item   required>
                <DatePicker type="date" v-model="formData.queryEndTime" placeholder="结束时间"></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.teamId" placeholder="团队" clearable>
                  <Option value="all">全部</Option>
                  <Option value="success">成功</Option>
                  <Option value="fail">失败</Option>
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
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间

import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "batch-audit-statistics-keepAlive",
  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME
      },
      noneStatus: false,
      page: 1,
      pageNum: 0,
      teamData: [],
      userData: [],
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "团队",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "正确数",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "不正确数",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "质检正确率",
          key: "userName",
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
    hhTable,
    fieldNameDes
  },
  created() {
    this.getTeamData();
  },
  methods: {
    getTeamData() {
      let data = {};
      this.Global.doPost("", data, res => {
        this.teamData = res;
        this.getUserData();
      });
    },
    getUserData(val) {
      let data = {};
      this.Global.doPost("", data, res => {
        this.userData = res;
      });
    },
    submit(name) {
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
      if (this.formData.queryStartTime) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryStartTime
        );
        if (this.start.hour == "24:00") {
          data["queryStartTime"] = this.Global.setHoursData(
            this.start.time,
            this.start.hour
          );
        }
      } else {
        delete data["queryStartTime"];
      }
      if (this.formData.queryEndTime) {
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryEndTime
        );
        if (this.end.hour == "24:00") {
          data["queryEndTime"] = this.Global.setHoursData(
            this.end.time,
            this.end.hour
          );
        }
      } else {
        delete data["queryEndTime"];
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("verific/getVerificData.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>