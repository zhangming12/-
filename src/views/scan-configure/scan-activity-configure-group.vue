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
.form {
  position: relative;
  display: flex;
  .container {
    width: 35%;
    margin: auto;
    .w18 {
      width: 50%;
    }
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
.ivu-input {
  text-align: center !important;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">扫码活动配置(活动包)</h2> -->
    <div class="main-container">
      <div class="box" @keyup.enter="submit">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.showStatus" placeholder="状态" clearable>
                  <Option value="1">未开始</Option>
                  <Option value="2">进行中</Option>
                  <Option value="3">已结束</Option>
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
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>

          <addNewBtn class="btn-right ml20" @btnClick="addNewGroup"/>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>

    <myModal class="myModal" @close="closeModal" :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>近一周导出历史</h3>
        <div class="modal-table">
          <div class="modal-table-top">
            <span class="btn-left">
              此表共包含
              <span class="numColor">100</span>条数据
            </span>
          </div>
          <Table :columns="columns" :data="pageData" disabled-hover></Table>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import exportBtn from "@/components/Button/export-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "scan-activity-configure-group-keepAlive",

  data() {
    return {
      myModalisShow: false,
      formData: {
        brandId: "",
        status: ""
      },
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "品牌",
          key: "brandName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "活动包名",
          key: "groupName",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "活动时间",
          minWidth: 160,
          key: "summary",
          align: "center",
          tooltip: true
        },
        {
          title: "活动状态",
          minWidth: 100,
          key: "showStatus",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let arr = ["", "未开始", "进行中", "已结束"];
            return h("div", arr[params.row.showStatus]);
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 150,
          align: "center",
          render: (h, params) => {
            let buttonDom = [];
            buttonDom = [
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
                      let queryParams = {
                        // id: params.row.id,
                        groupId: params.row.id,
                        brandId: this.formData.brandId,
                        // storeId: params.row.storeId,
                        type: "look"
                      };

                      this.$router.push({
                        path: "/scanGroupConfigure",
                        query: queryParams
                      });
                    }
                  }
                },
                "详情"
              ),
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
                      let queryParams = {
                        // id: params.row.id,
                        groupId: params.row.id,
                        type: "modify"
                      };

                      this.$router.push({
                        path: "/scanGroupConfigure",
                        query: queryParams
                      });
                    }
                  }
                },
                "修改"
              ),
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
                      let queryParams = {
                        groupId: params.row.id,
                        brandId: this.formData.brandId
                      };

                      this.$router.push({
                        path: "/scanActivityConfigureActivity",
                        query: queryParams
                      });
                    }
                  }
                },
                "活动管理"
              )
            ];
            return h("div", buttonDom);
          }
        }
      ],
      columns: [
        {
          title: "时间",
          type: "index",
          minWidth: 140,
          align: "center"
        },
        {
          title: "文件名",
          key: "groupName",
          minWidth: 140,
          align: "center"
        },
        {
          title: "状态",
          key: "uploadTime",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.uploadTime));
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let { id, activityId, storeId } = params.row;
                      let queryParams = {
                        id,
                        activityId,
                        storeId,
                        displayActCategory: "partake",
                        displayBackType: "C"
                      };
                      this.$router.push({
                        path: "/displayResultOneEdit",
                        query: queryParams
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      pageData: [],
      brandList: [],
      activityList: []
    };
  },
  components: { exportBtn, myModal, addNewBtn },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
        }
      }
    );
  },
  methods: {
    closeModal() {
      this.myModalisShow = false;
    },
    addNewGroup() {
      this.$router.push({
        path: "/scanGroupConfigure",
        query: {
          type: "add",
          brandId: this.formData.brandId
        }
      });
    },
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "activityMaintain/doSearchActivityGroup.json",
        data,
        res => {
          console.log(res);
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "activityMaintain/doSearchActivityGroup.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


