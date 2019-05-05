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
    .upDate {
      cursor: pointer;
      text-align: center;
      border: 1px solid #aeaeae;
      padding: 2px 12px;
      margin-right: 10px;
      width: 150px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
      .iamge {
        display: block;
        width: 580px;
        height: 400px;
        //   margin:10px;
      }
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.ivu-input {
  text-align: center !important;
}
.spanBtn {
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    color: @primary-color;
  }
}
.form {
  position: relative;
  display: flex;
  justify-content: center;
  .container {
    width: 70%;
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
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">二维码列表</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入门店名称" v-model="formData.storeName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入店主姓名" v-model.number="formData.number" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入手机号" v-model.number="formData.phone" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.threeLevel" placeholder="状态" clearable>
                  <Option :value="item.id" v-for="(item,index) in statusList" :key="index">
                    <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                  </Option>
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
            共查询到
            <span class="numColor">{{ pageNum }}</span> 条数据
          </span>
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
          <span class="btn-right spanBtn" @click="dowland" style="margin-right:10px;">生成</span>
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
    <myModal class="myModal" @close="importExcelShow = false" :modal="importExcelShow">
      <div slot="main" class="modal-main">
        <h3>导入</h3>
        <div class="modal-table">
          <Form ref="form" :label-width="88">
            <div style="overflow:hidden;">
              <div class="upDate">
                <Upload
                  :action="importUrl"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                >
                  <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                  <span>{{ importData.uploadText }}</span>
                </Upload>
              </div>
            </div>
            <div class="fotter" style="text-align:center;">
              <Button @click="importExcelShow = false" type="primary">取消</Button>
              <Button @click="exportMethod" type="success">导入</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>

    <!-- 查看图片 -->
    <myModal class="myModal" @close="showImage = false" :modal="showImage" width="600">
      <div slot="main" class="modal-main">
        <h3>查看图片</h3>
        <div class="modal-table">
          <img :src="imageUrl" class="iamge" alt>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import config from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "code-list-keepAlive",
  data() {
    return {
      importData: {
        uploadText: "请选择上传文件"
      },
      imageUrl: "",
      statusList: [],
      importUrl: config.uploadWorkerExcel,
      options: {
        disabledDate(date) {
          const disabledDay = date.getTime();
          return disabledDay > new Date().getTime();
        }
      },
      importExcelShow: false,
      myModalisShow: false,
      showQuery: false,
      formData: {
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME],
        queryStartTime: EDFAULT_STARTTIME
      },
      page: 1,
      pageNum: 0,
      rule: {},
      noneStatus: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "二维码",
          key: "twoLevel",
          minWidth: 160,
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.imageUrl = params.row.imageUrl;
                      this.showImage = true;
                    }
                  }
                },
                "图片"
              )
            ]);
          }
        },
        {
          title: "状态",
          key: "storeName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "店名",
          type: "index",
          minWidth: 140,
          align: "center"
        },
        {
          title: "绑定时间",
          key: "groupName",
          minWidth: 140,
          align: "center"
        },
        {
          title: "生成时间",
          key: "groupName",
          minWidth: 140,
          align: "center"
        },

        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let str = "启用";
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
                    click: () => {}
                  }
                },
                str
              )
            ]);
          }
        }
      ],
      pageData: [],
      brandList: [],
      showImage: false
    };
  },
  components: {
    exportBtn,
    myModal,
    hhTable,
    fieldNameDes
  },
  watch: {
    importExcelShow(val) {
      if (!val) {
        this.importData = {
          uploadText: "请选择上传文件"
        };
      }
    }
  },
  methods: {
    dowland() {
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/template/%E6%8A%98%E6%89%A3%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF%28%E5%8A%A1%E5%BF%85%E6%8C%89%E7%85%A7%E6%A0%BC%E5%BC%8F%E5%A1%AB%E5%86%99%E6%95%B0%E6%8D%AE%29.xlsx"
      );
    },
    exportMethod() {
      if (!this.importData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "brandStaff/brandStaffImport.json",
        {
          loadFilePath: this.importData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.importEmployee = false;
        }
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.importData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.importData.loadFilePath = url;
      }
    },
    goToAudit() {
      let query = {};
      this.$router.push({
        path: "/checkLocationAudit",
        query
      });
    },
    closeModal() {
      this.myModalisShow = false;
    },
    showDetail() {
      this.myModalisShow = true;
    },
    submit(name) {
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "report/displayApplyProfileStatisticsOfFourLevel.json",
        data,
        res => {
          this.pageNum = res.items;
          this.pageData = res.datalist;
          this.page = res.page;
          this.noneStatus = true;
        }
      );
    },
    exportExcel() {
      this.Global.deleteEmptyProperty(data);
      delete data.queryTime;
      var url = this.Global.getExportUrl(
        "report/displayApplyProfileStatisticsOfFourLevelExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>