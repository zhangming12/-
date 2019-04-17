<style lang="less" scoped>
@import "../../config/index.less";

// .box {
//   width: 100%;
//   box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
//   margin: 0 auto 15px;
//   padding: 30px 20px;
//   padding-bottom: 0;
//   background: #fff;
// }
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
    position: relative;
    .container {
      width: 52.15%;
      margin: auto;
      .w18 {
        width: 33.33%;
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
        margin-left: 8px;
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
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}
.contentTop {
  overflow: hidden;
  // margin-bottom: 10px;
  padding: 0 10px;
  height: 32px;
  line-height: 32px;
  .btn {
    float: right;
    margin-left: 10px;
  }
  .numColor {
    color: @primary-color;
  }
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;

      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    margin-top: 4px;
    color: #333;
  }
  .demo {
    float: right;
    color: @primary-color;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
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
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">导出记录</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="queryStartTime" required>
                <data-range
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
                  placeholder="结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="数据来源">
                  <Option value="11">11</Option>
                </Select>
              </Form-item>
            </div>
            <!-- <div class="btn-left w18">
                    <Form-item required>
                        <Input v-model="formData.joinCode" placeholder="客户编号" />
                    </Form-item>
            </div>-->
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
      <div class="box" style="padding-bottom:20px">
        <div class="contentTop">
          <span class="btn-left">
            共查询到
            <span class="numColor">{{pageNum}}</span> 条数据
          </span>
          <!-- <Button type="text" class="btn-right ml20" @click="exportAllExcel">刷新</Button> -->
          <exportBtn class="btn-right" @click.native="exportExcel" title="刷新"/>
          <!-- <exportBtn class="btn-right" @click.native="exportUserExcel" title="导出客户名单"/> -->
        </div>
        <hhTable :columns="columns1" :pageData="pageData" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <!-- 导入 -->
    <!-- <myModal class="myModal"
            height='220'
            @close="closeModal"
            :modal="maintainImportShow">
          <div slot="main" class="modal-main">
            <h3 style="margin-bottom:20px;">导入</h3>
            <Form ref="form" :model="importData" :label-width="100" :rules="rule">
              <div class="container">
                <Form-item label="品牌名称：" required> 
                </Form-item>
                <div class='demo' @click='download'> 
                    <Icon type="ios-paper-outline" size='14' color='#ff8a34'></Icon>
                    <span>下载导入模版</span>
                </div>
              </div>
            </Form>
            <div class="maintain-footer">
              <Button type="text" @click="closeModal">取消</Button>
            </div>
          </div>
    </myModal>-->
  </div>
</template>

<script>
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import dataRange from "@/components/data-rang.vue";
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
export default {
  name: "export-record-keepAlive",

  components: {
    exportBtn,
    importBtn,
    myModal,
    hhTable,
    dataRange
  },
  data() {
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
        queryEndTime: EDFAULT_ENDTIME
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {
        // activityId: [{ required: true, message: "请选择活动名称" }],
        // queryTime: [{ required: true, message: "选择日期跟时间" }]
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "导出时间",
          key: "brandName",
          align: "center",
          tooltip: true
        },
        {
          title: "数据来源",
          key: "groupName",
          align: "center",

          tooltip: true
        },
        {
          title: "任务名",
          key: "joinCode",
          align: "center",

          tooltip: true
        },
        {
          title: "状态",
          key: "joinCheckStatus",
          align: "center",

          render: (h, params) => {
            var str = "";
            if (params.row.joinCheckStatus == 1) {
              str = "合格";
            } else if (params.row.joinCheckStatus == 2) {
              str = "不合格";
            }
            return h("div", str);
          }
        },
        {
          title: "执行人",
          key: "joinClass",
          align: "center",

          tooltip: true
        },
        {
          title: "操作",
          key: "option",
          align: "center",
          minWidth: 120,
          tooltip: true,
          fixed: "right",
          render: (h, params) => {
            var tag = [];
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modify(params.row);
                    }
                  }
                },
                "下载"
              )
            );
            return h("div", tag);
          }
        }
      ],
      pageData: []
    };
  },
  created() {},
  methods: {
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
    submit(name) {
      if (!this.formData.queryStartTime) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      if (!this.formData.queryEndTime) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;

      this.Global.doPost("", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      delete data["queryStartTime"];
      delete data["queryEndTime"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "display/brandStoreJoinGoodsExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


