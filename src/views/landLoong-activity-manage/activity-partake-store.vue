<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
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
  margin-bottom: 10px;
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
.searchBox {
  overflow: hidden;
  .search_btn {
    float: left;
    width: 50px;
    padding: 5px 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search_icon {
    float: left;
    padding: 5px 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">活动参与门店信息</h2>            -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="客户编号">
              <Input v-model="formData.joinCode"></Input>
            </Form-item>
            <Form-item label="业代姓名">
              <Input v-model="formData.workerName"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="店铺名称">
              <Input v-model="formData.storeName"></Input>
            </Form-item>
            <Form-item label="业代手机">
              <Input v-model="formData.workerPhone"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="客户渠道">
              <Select v-model="formData.bapChannel" clearable>
                <Option
                  v-for="(item, key, index) in protocolBapChannel"
                  :value="key"
                  :key="index"
                >{{ item }}</Option>
              </Select>
            </Form-item>

            <Form-item label="参与活动">
              <Select v-model="formData.isLoong" clearable>
                <Option value="0">未参与</Option>
                <Option value="1">执行中</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="2" offset="1">
            <div class="searchBox">
              <Button @click="submit()" class="btn-search search_btn" type="primary">查询</Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-up"
                v-if="showQuery"
              ></Button>
              <Button
                @click="showQuery=!showQuery"
                class="search_icon"
                type="primary"
                icon="ios-arrow-down"
                v-else
              ></Button>
            </div>
          </Col>
        </Row>
        <transition name="fade">
          <Row v-if="showQuery">
            <Col span="7">
              <Form-item label="销售路线">
                <Input v-model="formData.salesRoute"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="销售部">
                <Input v-model="formData.salesDept"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="大区">
                <Input v-model="formData.salesRegion"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="营业部">
                <Input v-model="formData.busiDept"></Input>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="padding-bottom:20px">
      <div class="contentTop">
        <Button class="btn-right" @click="exportExcel" type="success">导出</Button>
        <Button
          @click="uploadExcel"
          class="btn-right"
          :disabled="isUpload"
          type="primary"
          style="margin-right: 12px;"
        >导入</Button>
        <wpicture-upload
          :wordUploadFlag="wordUploadFlag"
          @wordPicturnUploadSuccess="picturnUploadSuccess"
        ></wpicture-upload>
        <div class="demo" @click="downExcel">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
      </div>
      <Table :columns="columns" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  queryLoongStoreList,
  deleteLoongStoreInfo,
  brandStoreSignInfoImport
} from "@/api/landLoong-activity-manage/landLoong-activity-manage.js";

import {
  landLoongIsLoong, //客户状态
  protocolBapChannel //BAP渠道
} from "@/util/ENUMS.js";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_STARTSAMETIME
} from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";

import wpictureUpload from "@/components/word-picture-upload.vue";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "activity-partake-store-keepAlive",

  components: {
    wpictureUpload
  },
  data() {
    const that = this;
    return {
      formData: {
        // queryStartTime:EDFAULT_STARTSAMETIME,
        // queryEndTime:EDFAULT_ENDTIME,
        joinCode: "",
        storeName: "",
        busiDept: "",
        workerName: "",
        workerPhone: "",
        salesRoute: "",
        salesDept: "",
        salesRegion: "",
        bapChannel: "",
        isLoong: ""
      },
      protocolBapChannel,

      url: config.uploadWorkerExcel,
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        queryTime: [{ required: true, message: "选择日期跟时间" }]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "销售部",
          key: "salesDept",
          width: 170,
          align: "center"
        },
        {
          title: "销售大区",
          key: "salesRegion",
          width: 140,
          align: "center"
        },
        {
          title: "营业部",
          key: "busiDept",
          width: 120,
          align: "center"
        },
        {
          title: "客户编号",
          key: "joinCode",
          width: 120,
          align: "center"
        },
        {
          title: "店铺名称",
          key: "storeName",
          width: 200,
          align: "center"
        },
        {
          title: "DSD/DSS",
          key: "storeNature",
          width: 100,
          align: "center"
        },
        {
          title: "BAP渠道",
          key: "bapChannel",
          width: 120,
          align: "center"
        },
        {
          title: "销售路线",
          key: "salesRoute",
          width: 120,
          align: "center"
        },
        {
          title: "负责业代",
          key: "workerName",
          width: 160,
          align: "center"
        },
        {
          title: "地域性质",
          key: "regionProp",
          width: 100,
          align: "center"
        },
        {
          title: "客户地址",
          key: "address",
          width: 150,
          align: "center"
        },
        {
          title: "联系方式",
          key: "phone",
          width: 120,
          align: "center"
        },
        {
          title: "活动状态",
          key: "isLoong",
          width: 170,
          align: "center",
          render: (h, params) => {
            return landLoongIsLoong[params.row.isLoong];
          }
        },
        {
          title: "操作",
          key: "action",
          width: 80,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            let buttonArray = [];

            buttonArray.push(
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
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该记录？",
                        onOk: function() {
                          that.handleDelete(params.row.id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            );

            return h("div", buttonArray);
          }
        }
      ],
      protClassArrList: null,
      pageData: [],
      uploadText: "选择上传文件",
      wordUploadFlag: false, //上传成功标识
      isUpload: false,
      showQuery: false
    };
  },
  created() {
    this.submit(1, 10);
  },
  methods: {
    submit: function() {
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);

      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["activityType"] = 1;
      queryLoongStoreList(data).then(res => {
        if (res && res.status === 1) {
          this.pageNum = res.data.items;
          this.page = res.data.page;
          this.pageData = res.data.datalist;
        }
      });
    },
    downExcel: function() {
      const url =
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/brandStoreSignInfoImport.xlsx";
      window.open(url);
    },

    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let params = {
        loadFilePath: this.uploadUrl,
        parameter: 2
      };
      this.isUpload = true;
      //导入
      brandStoreSignInfoImport(params).then(res => {
        if (res.status === 1) {
          this.init(1, 10);
          this.$Message.success("上传成功");
          this.wordUploadFlag = true;
          this.isUpload = false;
        } else {
          this.isUpload = false;
        }
      });
    },
    picturnUploadSuccess(val, val1) {
      this.uploadUrl = val;
      this.wordUploadFlag = val1;
    },
    exportExcel: function() {
      var data = this.Global.JsonChange(this.formData);
      data["activityType"] = 1;
      this.Global.deleteEmptyProperty(data);
      console.log(data);
      var url = this.Global.getExportUrl(
        "displayLoongLog/loongStoreInfoExport.json",
        data
      );
      window.open(url);
    },
    handleDelete(id) {
      deleteLoongStoreInfo(id).then(res => {
        if (res && res.status === 1) {
          this.$Message.success("删除成功");
          this.submit();
        }
      });
    }
  }
};
</script>


