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
      width: 70%;
      margin: auto;
      .w18 {
        width: 25%;
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
    <!-- <h2 class="Title">陈列进货导入</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动包名*"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select
                  v-model="formData.joinPeriod"
                  clearable
                  @on-change="changeTime"
                  placeholder="*选择周期"
                >
                  <Option
                    v-for="(item, key, index) in timeList"
                    :value="key"
                    :key="index"
                  >{{ key.split('_')[0] }}年 {{ key.split('_')[1] }}周 日期：{{ item[0] | formatDate}}-{{ item[1] | formatDate}}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input v-model="formData.joinCode" placeholder="客户编号"/>
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
      <div class="box" style="padding-bottom:20px">
        <div class="contentTop">
          <span class="btn-left">
            共查询到
            <span class="numColor">{{pageNum}}</span> 条数据
          </span>

          <exportBtn class="btn-right" @click.native="exportAllExcel" title="导出"/>
          <importBtn class="btn-right" @click.native="maintainImport" title="导入"/>
          <exportBtn class="btn-right" @click.native="exportUserExcel" title="导出客户名单"/>
        </div>
        <!-- <Table :columns="columns1" :data="pageData" disabled-hover></Table> -->
        <hhTable :columns="columns1" :pageData="pageData" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
    <!-- 导入 -->
    <myModal class="myModal" height="220" @close="closeModal" :modal="maintainImportShow">
      <div slot="main" class="modal-main">
        <h3 style="margin-bottom:20px;">导入</h3>
        <Form ref="form" :model="importData" :label-width="100" :rules="rule">
          <div class="container">
            <Form-item label="品牌名称：" required>
              <Select v-model="importData.brandId" placeholder="品牌名称*">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="选择上传文件" :label-width="100" required>
              <div
                class="upDate"
                style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;"
              >
                <Upload
                  :action="url"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                >
                  <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                  {{uploadText}}
                </Upload>
              </div>
            </Form-item>
          </div>
        </Form>
        <div class="maintain-footer">
          <Button type="text" @click="closeModal">取消</Button>
          <Button type="text" @click="uploadExcel">确定</Button>
        </div>
      </div>
    </myModal>
    <Modal v-model="updatePush">
      <h3 slot="header" style="text-align:center;">进货量更新推送</h3>
      <Form :label-width="85">
        <Form-item label="品牌名称:" prop="brandId">
          <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" clearable>
            <Option
              :value="item.id"
              v-for="(item,index) in brandList"
              :key="index"
            >{{ item.brandName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="活动包名:" prop="groupId">
          <Select
            v-model="formData.groupId"
            placeholder="请选择"
            @on-change="getActivityList"
            clearable
          >
            <Option
              :value="item.id"
              v-for="(item,index) in groupList"
              :key="index"
            >{{ item.groupName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="进货量更新时间:" prop :label-width="120">
          <span></span>
        </Form-item>
      </Form>
      <div slot="footer" style="text-align:center">
        <i-button type="error" @click="close">取消</i-button>
        <i-button type="success" @click>发送</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  queryDisplayRetailPurchases, //列表
  displayRetailPurchases //导入
} from "@/api/activity-manage/display-activity-manage.js";

import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "display-import-import-keepAlive",
  components: {
    exportBtn,
    importBtn,
    myModal,
    hhTable,
    fieldNameDes
  },
  data() {
    return {
      importTimeList: [],
      importData: {
        brandId: ""
        // groupId: "",
        // memo: ""
      },
      maintainImportShow: false,
      showQuery: false,
      updatePush: false,

      formData: {
        brandId: "",
        groupId: "",
        joinPeriod: ""
      },
      url: config.uploadWorkerExcel,
      page: 1,
      pageNum: 0,
      rule: {
        // brandId: [{ required: true, message: "请选择品牌名称" }]
      },

      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "品牌名称",
          key: "brandName",

          align: "center",
          tooltip: true
        },
        {
          title: "活动包名",
          key: "groupName",
          align: "center",

          tooltip: true
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",

          tooltip: true
        },
        {
          title: "店铺名称",
          key: "storeName",
          align: "center",

          tooltip: true
        },
        {
          title: "产品名称",
          key: "joinClass",
          align: "center",

          tooltip: true
        },
        {
          title: "进货量",
          key: "joinCount",
          align: "center",

          tooltip: true
        },
        {
          title: "进货标准",
          key: "stdJoinCount",
          align: "center",

          tooltip: true
        },
        {
          title: "达标情况",
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
          title: "进货周期",
          key: "joinPeriod",
          align: "center",
          tooltip: true
          // render:(h,params) => {

          // }
        },
        {
          title: "上传时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        }
      ],
      pageData: [],
      keyList: [],
      brandList: [],
      uploadText: "选择上传文件",
      wordUploadFlag: false, //上传成功标识
      isUpload: false,
      brandList: [], //品牌数据
      groupList: [], //活动包名
      timeList: [],
      importGroupList: []
    };
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
  },
  watch: {
    maintainImportShow(val) {
      if (!val) {
        this.uploadText = "选择上传文件";
        this.importData.brandId = "";
      }
    }
  },
  methods: {
    closeModal() {
      this.maintainImportShow = false;
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    maintainImport() {
      this.maintainImportShow = true;
    },
    close() {
      this.updatePush = false;
    },
    showUpload() {
      this.updatePush = true;
    },
    changeTime(value) {
      if (value) {
        this.formData.queryStartTime = new Date(
          this.timeList[value][0]
        ).pattern("yyyy-MM-dd HH:mm:ss");
        this.formData.queryEndTime =
          new Date(this.timeList[value][1]).pattern("yyyy-MM-dd") + " 23:59:59";
      }
    },
    importChangeTime(value) {
      if (value) {
        this.importData.startTime = new Date(this.timeList[value][0]).pattern(
          "yyyy-MM-dd HH:mm:ss"
        );
        this.importData.endTime =
          new Date(this.timeList[value][1]).pattern("yyyy-MM-dd") + " 23:59:59";
      }
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      if (!this.formData.groupId) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      if (!this.formData.joinPeriod) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      this.page = 1;
      this.init(this.page, 10);
      return;
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      if (data["joinPeriod"])
        data["joinPeriod"] = parseInt(data["joinPeriod"].split("_")[1], 10);
      delete data["queryStartTime"];
      delete data["queryEndTime"];
      queryDisplayRetailPurchases(data).then(res => {
        if (res && res.status === 1) {
          this.pageNum = res.data.items;
          this.page = res.data.page;
          this.pageData = res.data.datalist;
        }
      });
    },
    download() {
      const url =
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/joinGoodsNew.xlsx";
      window.open(url);
    },
    exportUserExcel() {
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("请选择活动包名");
        return false;
      }
      if (!this.formData.joinPeriod) {
        this.$Message.error("请选择周期");
        return false;
      }

      var data = this.Global.JsonChange(this.formData);
      data["memo"] = parseInt(data["joinPeriod"].split("_")[1], 10);
      delete data["joinPeriod"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "display/quesyStorePresentInfoExport.json",
        data
      );
      window.open(url);
    },
    exportAllExcel() {
      if (!this.formData.brandId) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      if (!this.formData.groupId) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      if (!this.formData.joinPeriod) {
        this.$Message.error("请选择查询条件!");
        return;
      }
      var data = this.Global.JsonChange(this.formData);
      console.log(data);
      data["joinPeriod"] = parseInt(data["joinPeriod"].split("_")[1], 10);
      delete data["queryStartTime"];
      delete data["queryEndTime"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "display/brandStoreJoinGoodsExport.json",
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
        { date: 7, activityType: 3, scope: "a", brandId: value },
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
    },
    importChangeValue(value) {
      this.importGroupList = [];
      this.importData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.importGroupList.push({
              id: Number(item[0]),
              groupName: item[1]
            });
          });
          if (this.importGroupList && this.importGroupList.length) {
            this.importData.groupId = this.importGroupList[0].id;
            this.getActivityList(this.formData.groupId);
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
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
      this.Global.doPost("liquidate/getWeeksList.json", value, res => {
        this.formData.weeks = "";
        this.timeList = res;
      });
    },
    importGetActivityList(value) {
      if (!value) return;
      this.Global.doPost("liquidate/getWeeksList.json", value, res => {
        this.importData.memo = "";
        this.importTimeList = res;
      });
    },

    uploadExcel() {
      if (!this.importData.brandId) {
        this.$Message.warning("请选择品牌或者陈列活动");
        return false;
      }
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      // if (!this.importData.groupId) {
      //   this.$Message.error("请选择活动包名");
      //   return false;
      // }
      // if (!this.importData.memo) {
      //   this.$Message.error("请选择周期");
      //   return false;
      // }
      let params = {
        loadFilePath: this.uploadUrl,
        brandId: this.importData.brandId
        // groupId: this.importData.groupId
      };
      this.isUpload = true;
      //导入
      displayRetailPurchases(params).then(res => {
        if (res.status === 1) {
          this.$Message.success("上传成功");
          this.wordUploadFlag = true;
          this.maintainImportShow = false;
          this.init();
        }
      });
    },
    picturnUploadSuccess(val, val1) {
      // if(val){
      this.uploadUrl = val;
      this.wordUploadFlag = val1;
      // }
    }
  },
  filters: {
    formatDate(t) {
      return new Date(t).pattern("MM-dd");
    }
  }
};
</script>


