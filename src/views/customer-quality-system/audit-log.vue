// 审核日志
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
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
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
    <!-- <h2 class="Title">审核日志</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="00:00" v-model="formData.queryStartTime" placeholder="开始时间"/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="24:00" v-model="formData.queryEndTime" placeholder="结束时间"/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Input placeholder="图像编号" clearable v-model.trim="formData.recordId"/>
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
          <Page :total="pageNum" :pageSize="pageSize" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
const RESULT = {
  "4-1": "初审通过",
  "4-2": "初审不通过",
  "4-3": "初审退回",
  "5-1": "复审通过",
  "5-2": "复审不通过",
  "5-3": "复审退回",
  "7-1": "质检通过",
  "7-2": "质检不通过",
  "7-3": "质检退回",
  "6-1": "复审批量通过",
  "6-2": "复审批量不通过",
  "8-1": "质检批量通过",
  "8-2": "质检批量不通过"
};
import { EDFAULT_THREE_AGOTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间

import hhTable from "@/components/table/table.vue";
import dataRange from "@/components/data-range/data-range.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "return-notice-keepAlive",
  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_THREE_AGOTIME,
        queryEndTime: EDFAULT_ENDTIME
      },
      noneStatus: false,
      page: 1,
      pageNum: 0,
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "图像编号",
          key: "recordId",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "团队",
          key: "teamName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "用户",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "结果",
          key: "checkStatus",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            if (params.row.checkStatus && params.row.recordType) {
              let str = `${params.row.recordType}-${params.row.checkStatus}`;
              return h("div", RESULT[str]);
            }
          }
        },
        {
          title: "时间",
          key: "operateTime",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            let time = this.Global.createTime(params.row.operateTime);
            return h("div", time);
          }
        },
        {
          title: "审核意见",
          key: "checkMessage",
          align: "center",
          tooltip: true
        }
      ],
      pageSize: 20,
      pageData: []
    };
  },
  components: {
    hhTable,
    fieldNameDes,
    dataRange
  },
  methods: {
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("audit/auditLog.json", data, res => {
        this.pageData = res.datalist;
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
      });
    }
  }
};
</script>