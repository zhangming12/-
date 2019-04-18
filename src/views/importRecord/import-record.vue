<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.form {
  position: relative;
  display: flex;
  .container {
    margin: auto;
    width: 52.5%;
    .w18 {
      width: 33.3333%;
      .container {
        width: 100%;
      }
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
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
  padding-bottom: 60px;
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
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">导入记录</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <data-range
                  @dataChange="startTimeChange"
                  hour="00:00"
                  :time="formData.queryStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range
                  hour="24:00"
                  placeholder="结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.userType" placeholder="导入类型" clearable>
                  <Option
                    :value="item.name"
                    v-for="(item,index) in importTypeList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
          </div>
          <div class="btn-left w10">
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
          <!-- <detailBtn class="btn-right ml20" @btnClick="showDetail" /> -->
          <!-- <Button type="text" class="btn-right ml20" @click="refresh">刷新</Button> -->
          <refreshBtn class="btn-right" @click.native="refresh"/>
        </div>
        <Table ref="table" :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <!-- <img src="../../assets/image/edit.png" alt=""> -->
    </div>
  </div>
</template>

<script>
import dataRange from "../../components/data-rang.vue";
import exportBtn from "../../components/Button/export-btn.vue";
import detailBtn from "../../components/Button/detail-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import importBtn from "../../components/Button/import-btn.vue";
import refreshBtn from "@/components/Button/refresh-btn.vue";
import DEV_CONFIG from "@/util/config.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
const image = require("../../assets/image/edit.png");
export default {
  name: "import-record-keepAlive",

  data() {
    const validateStart = (rule, value, callback) => {
      // 验证开始时间
      if (value == "") {
        callback(new Error("请输入开始时间"));
      } else {
        if (this.formData.queryEndTime !== "") {
          // 对结束时间单独验证
          this.$refs.form.validateField("queryEndTime");
        }
        callback();
      }
    };
    const validateEnd = (rule, value, callback) => {
      // 验证结束时间

      if (value == "") {
        callback(new Error("请输入结束时间"));
      } else {
        const str = new Date(this.formData.queryStartTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
          // 判断开始时间是否大于结束时间
          callback(new Error("开始时间大于结束时间"));
        } else {
          callback();
        }
      }
    };
    return {
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        userType: "" //导入类型
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      importTypeList: [
        {
          name: "印刷及报废信息导入"
        },
        {
          name: "包装及报废信息导入"
        },
        {
          name: "品牌门店基础信息导入"
        },
        {
          name: "品牌门店上报信息导入"
        },
        {
          name: "品牌业务员导入"
        },
        {
          name: "品牌角色信息导入"
        },
        {
          name: "清算修改导入"
        }
      ],
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center",
          tooltip: true
        },
        {
          title: "导入时间",
          key: "createTime",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "任务名",
          key: "clientType",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "导入类型",
          minWidth: 100,
          key: "userType",
          align: "center",
          tooltip: true
        },

        {
          title: "成功条数",
          minWidth: 100,
          key: "success",
          align: "center",
          tooltip: true
        },
        {
          title: "失败条数",
          minWidth: 100,
          key: "fail",
          align: "center",
          tooltip: true
        },
        {
          title: "执行人",
          minWidth: 120,
          key: "userName",
          align: "center",
          tooltip: true
        },
        {
          title: "状态",
          minWidth: 120,
          key: "result ",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let obj = {
              BEGIN: "执行中",
              FINISH: "导入完成"
            };
            return h(
              "div",
              {
                style: {
                  color: params.row.result == "BEGIN" ? "#3B62FF" : "#7ABD59"
                }
              },
              obj[params.row.result] ? obj[params.row.result] : ""
            );
          }
        },
        {
          title: "操作",
          minWidth: 180,
          align: "center",
          // fixed: "right",
          render: (h, params) => {
            var tag = [];
            let color = "";
            if (params.row.result == "BEGIN" || params.row.fail == 0) {
              color = "#999";
            } else {
              color = "#3333FF";
            }
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    disabled:
                      params.row.result == "BEGIN" || params.row.fail == 0
                        ? true
                        : false
                  },
                  style: {
                    marginRight: "5px",
                    color: color
                  },
                  on: {
                    click: () => {
                      let queryParams = {
                        action: params.row.action,
                        userType: params.row.userType
                      };
                      this.$router.push({
                        path: "/importFailDetail",
                        query: queryParams
                      });
                    }
                  }
                },
                "失败详情"
              )
            );
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: "#ff8a34"
                  },
                  on: {
                    click: () => {
                      let url = DEV_CONFIG.downloadServer + params.row.filePath;
                      // let url = this.Global.getExportUrl(
                      //   "downloadFile.json",
                      //   params.row.clientType
                      // );
                      window.open(url);
                    }
                  }
                },
                "下载文档"
              )
            );
            return h("div", tag);
          }
        }
      ],
      pageData: []
    };
  },
  components: {
    dataRange,
    exportBtn,
    detailBtn,
    myModal,
    importBtn,
    refreshBtn
  },
  created() {},
  watch: {},
  methods: {
    //刷新
    refresh() {
      this.init();
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
      if (!this.formData.queryStartTime) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    getNumber(str) {
      let obj = {};
      let total = null;
      if (str.match(/导入(\d*)条/)) {
        total = str.match(/导入(\d*)条/)[1];
      }
      if (str.match(/失败(\d*)条/)) {
        obj.fail = str.match(/失败(\d*)条/)[1];
      } else {
        obj.fail = 0;
      }
      obj.success = total - obj.fail;
      return obj;
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
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
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("import/queryAllInformation.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        for (let i = 0, len = res.datalist.length; i < len; i++) {
          let obj = this.getNumber(res.datalist[i].params);
          res.datalist[i].fail = obj.fail;
          res.datalist[i].success = obj.success;
        }
      });
    }
  }
};
</script>


