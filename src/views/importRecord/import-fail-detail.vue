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
.table-box {
  padding: 10px;
}
.numColor {
  color: @primary-color;
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">失败详情</h2> -->
      <div class="main-container">
        
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left">此表共包含 <span class='numColor'>{{pageNum}}</span> 条数据</span>
              <exportBtn  class="btn-right" @click.native="exportExcel" />
            </div>
            <Table ref="table" :columns="columns1" :data="pageData" disabled-hover></Table>
        </div>
        <div class="page-box">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import exportBtn from "../../components/Button/export-btn.vue";
export default {
  data() {
    return {
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
          title: "导入内容",
          minWidth: 100,
          key: "fail",
          align: "center",
          tooltip: true
        },
        {
          title: "失败原因",
          minWidth: 120,
          key: "reasion",
          align: "center",
          tooltip: true
        }
      ],
      pageData: [],
      pageSize: 10,
      page: 1,
      pageNum: 0,
      action: "",
      userType: "",
      clientType: ""
    };
  },
  created() {
    this.action = this.$route.query.action;
    this.userType = this.$route.query.userType;
    if (this.action) {
      this.init();
    }
  },
  components: {
    exportBtn
  },
  watch: {},
  methods: {
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    getfailReasion(str) {
      if (str.indexOf(",,") != -1) {
        str = str.replace(new RegExp(",{2,}", "gm"), `," ",`);
      }
      let arr = JSON.parse(str);
      let obj = {};
      //数组的最后一项是失败原因，前几项是失败记录
      obj.reasion = arr.pop();
      obj.fail = arr.join();
      return obj;
    },
    exportExcel() {
      let url = this.Global.getExportUrl("import/exportFailFile.json", {
        action: this.action
      });
      window.open(url);
    },
    init() {
      let data = {};
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["action"] = this.action;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("import/queryFailInformation.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        for (let i = 0, len = res.datalist.length; i < len; i++) {
          let obj = this.getfailReasion(res.datalist[i].params);
          res.datalist[i].fail = obj.fail;
          res.datalist[i].reasion = obj.reasion;
          res.datalist[i].userType = this.userType;
        }
      });
    }
  }
};
</script>