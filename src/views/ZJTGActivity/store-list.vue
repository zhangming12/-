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
  // justify-content: center;
  .container {
    width: 87.5%;
    .w18 {
      width: 20%;
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
    <!-- <h2 class="Title">门店列表</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="shopping mall" v-model.trim="formData.shoppingMall" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入门店名称" v-model.trim="formData.storeName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入店主姓名" v-model.trim="formData.name" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入手机号" v-model.trim="formData.phone" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.isQrcode" placeholder="状态" clearable>
                  <Option value="1">已绑定</Option>
                  <Option value="2">未绑定</Option>
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
          <importBtn class="btn-right" @click.native="importExcelShow = true"/>
          <span class="btn-right spanBtn" @click="dowland" style="margin-right:10px;">下载模板</span>
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
  </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import config from "@/util/config.js";
export default {
  name: "store-list-keepAlive",
  data() {
    return {
      importData: {
        uploadText: "请选择上传文件"
      },
      importUrl: config.uploadWorkerExcel,
      importExcelShow: false,
      formData: {},
      page: 1,
      pageNum: 0,
      pageSize: 10,
      noneStatus: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "shopping mall",
          key: "shoppingMall",
          width: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "门店名称",
          key: "storeName",
          width: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "店主姓名",
          key: "name",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "手机号",
          key: "phone",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "地址",
          key: "address",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "绑定二维码",
          key: "qrCode",
          width: 100,
          align: "center",
          tooltip: true,
          render: (h, parmas) => {
            let str = "未绑定";
            if (parmas.row.qrCode) {
              str = "已绑定";
            }
            return h("div", str);
          }
        },
        {
          title: "纤维+",
          key: "initAmount",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "植场新人",
          key: "initTwoAmount",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "定位信息",
          key: "bindAddress",
          minWidth: 160,
          align: "center",
          tooltip: true
        }
      ],
      pageData: []
    };
  },
  components: {
    exportBtn,
    detailBtn,
    importBtn,
    myModal,
    hhTable,
    fieldNameDes
  },
  created() {},
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
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/template/zjtgStoreTemplate.xlsx"
      );
    },
    exportMethod() {
      if (!this.importData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "storeZjtg/storeZjtgImport.json",
        {
          loadFilePath: this.importData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.importExcelShow = false;
          this.init();
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
    submit(name) {
      if (this.formData.phone) {
        if (!this.Global.checkPhone(this.formData.phone)) {
          this.$Message.info("请输入正确的手机号");
          return false;
        }
      }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("storeZjtg/doQueryWithPage.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  }
};
</script>