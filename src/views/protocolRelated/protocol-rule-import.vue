<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  //   box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  //   padding: 30px 20px;
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
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
.demo{
  color: @primary-color;
  margin-top: 10px;
  margin-left: 10px;
  cursor: pointer;
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">协议规则导入</h2> -->
        <div class="main-container">
            <div class="box">
                <!-- <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item>                             
                                <Select placeholder="BAP渠道" v-model="formData.bapChannel" clearable>
                                    <Option v-for="(item, key, index) in protocolBapChannel" :value="key" :key="index">{{ item }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item>
                                <Select v-model="formData.signAttr" clearable placeholder="签约属性">
                                    <Option v-for="(item, key, index) in protocolSignAttr" :value="key" :key="index">{{ item }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item>
                                <Select v-model="formData.signAttr" clearable placeholder="签约属性">
                                    <Option v-for="(item, key, index) in protocolSignAttr" :value="key" :key="index">{{ item }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item>
                                <Select v-model="formData.protClass" clearable placeholder="协议类型">
                                    <Option v-for="(item, key, index) in protClassArrList" :value="key" :key="index">{{ item }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item>
                                <Select v-model="formData.checkStatus" placeholder="规则状态" clearable>
                                    <Option value="0">待审核</Option>
                                    <Option value="1001">一审通过</Option>
                                    <Option value="3">退回</Option>
                                    <Option value="1">审核通过</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-right w10">
                            <div class="searchBox">
                                <div class="btn-right search-right" @click="submit('form')">
                                    <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </Form> -->
                <Button style="margin-left:10px;" type="primary" @click="exportExport = true">协议规则导入</Button>
                <Button style="margin-left:10px;" type="success" @click="importHeBeiShow = true">奖励规则导入</Button>
            </div>
            <!-- <div class="box" style="padding:10px">
                <div class="contentTop">
                    <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span>
                    <exportBtn  class="btn-right" @btnClick="exportExcel" />
                    <importBtn  class="btn-right" @btnClick="exportExport = true" />
                </div>
                <Table :columns="columns" :data="pageData" disabled-hover></Table>
                
            </div> -->
            <!-- <div class="page-box">
                <div>
                    <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
                </div>
            </div> -->
        </div>
        <!-- 协议规则导入 -->
      <myModal class="myModal"
            @close="closeModal"
            :modal="exportExport">
            <div slot="main" class="modal-main">
              <h3>协议规则导入</h3>
              <div class="modal-table">
                  <Form ref="form" :model="formData" :label-width="88">
                      <Form-item label="上传文件" required>
                        <div style="overflow:hidden;">
                          <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;">
                              <Upload :action="importUrl" 
                              :show-upload-list=false
                              :on-success='handleSuccess'
                              :on-error='handleError'
                              >
                              <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                              <span>{{exportExportData.uploadText}}</span>
                              </Upload>
                          </div>
                      </div>
                      </Form-item>
                      <!-- <div class='demo' @click='download'>
                        <Icon type="ios-paper-outline" size='14' color='@primary-color'></Icon>
                        <span>下载模版</span>
                      </div> -->
                      <div class="fotter" style="text-align:center;">
                          <Button @click="closeModal" type="primary">取消</Button>
                          <Button type="success" @click="uploadExcel">导入</Button>
                      </div>
                  </Form>
              </div>
            </div>
      </myModal>
      <!-- 奖励规则导入 -->
      <myModal class="myModal"
            @close="cancel"
            :modal="importHeBeiShow">
            <div slot="main" class="modal-main">
              <h3>奖励规则导入</h3>
              <div class="modal-table">
                  <Form ref="form" :model="formData" :label-width="88">
                      <Form-item label="上传文件" required>
                        <div style="overflow:hidden;">
                          <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;">
                              <Upload :action="importUrl" 
                              :show-upload-list=false
                              :on-success='hHandleSuccess'
                              :on-error='handleError'
                              >
                              <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                              <span>{{uploadText}}</span>
                              </Upload>
                          </div>
                      </div>
                      </Form-item>
                      <!-- <div class='demo' @click='download'>
                        <Icon type="ios-paper-outline" size='14' color='@primary-color'></Icon>
                        <span>下载模版</span>
                      </div> -->
                      <div class="fotter" style="text-align:center;">
                          <Button @click="cancel" type="primary">取消</Button>
                          <Button type="success" @click="UuploadExcel">导入</Button>
                      </div>
                  </Form>
              </div>
            </div>
      </myModal>
	</div>
</template>

<script>
import {
  protocolStatus,
  protocolCheckFreezer,
  protocolCorpFreezer,
  protocolSecondDisplay,
  salesTargetsGoods, //月销售目标
  protocolStoreStatus, //客户状态
  protocolBapChannel, //BAP渠道
  protocolSignAttr, //签约属性
  protocolSalesDept, //销售部
  protocolProtClass, //协议类型
  protocolIsSodaSales //汽水销售权
} from "@/util/ENUMS.js";
import config from "@/util/config.js";
import myModal from "@/components/Modal/my-modal.vue";
import wpictureUpload from "@/components/word-picture-upload.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
export default {
  name: "protocol-rule-import-keepAlive",

  components: {
    wpictureUpload,
    dataRange,
    exportBtn,
    detailBtn,
    hhTable,
    importBtn,
    myModal,
    fieldNameDes
  },
  data() {
    return {
      exportExportData: {
        uploadText: "选择上传文件"
      },
      uploadText: "选择导入文件",
      hUploadUrl: "",
      importHeBeiShow:false,
      exportExport: false,
      noneStatus: false,
      formData: {
        salesDept: "",
        salesRegion: "",
        bapChannel: "",
        protClass: "",
        salesRoute: "",
        busiDept: "",
        signAttr: "",
        checkStatus: "0"
      },
      protocolStatus,
      protocolBapChannel,
      protocolSignAttr, //签约属性
      protocolSalesDept, //销售部
      url: config.uploadWorkerExcel,
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60
        },
        {
          title: "渠道",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "客户性质",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "协议类型",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "协议ID",
          key: "joinCode",
          align: "center",
          width: 150
        },
        {
          title: "冰柜",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "汽水专卖",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "三项协议1-汽水专卖",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "三项协议2-铺货(SKU)",
          key: "index",
          tooltip: true,
          align: "center",
          width: 180
        },
        {
          title: "三项协议3-冰柜纯度",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "三项协议4-冰柜第一位置",
          key: "index",
          tooltip: true,
          align: "center",
          width: 180
        },
        {
          title: "二次陈列-端架",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "二次陈列-小方展架",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "二次陈列-RB套餐牌",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "二次陈列-助销工具投放",
          key: "index",
          tooltip: true,
          align: "center",
          width: 180
        },
        {
          title: "纯悦割箱组数",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "外卖平台-套餐",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "外卖平台-产品",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "销量杠杆",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        {
          title: "必备SKU",
          key: "index",
          tooltip: true,
          align: "center",
          width: 150
        },
        // {
        //   title: "店名",
        //   key: "storeName",
        //   align: "center"
        // },
        // {
        //   title: "地域性质",
        //   key: "regionProp",
        //   align: "center"
        // },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          render: (h, params) => {
            let btnAry = [];
            btnAry.push(
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
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定失效该协议？",
                        onOk: () => {
                          let data = {};
                          this.Global.doPost("", data, res => {
                            this.$Message.success("失效成功");
                            this.init();
                          });
                        }
                      });
                    }
                  }
                },
                "失效"
              )
            );
            return h("div", btnAry);
          }
        }
      ],
      importUrl: config.uploadWorkerExcel,
      protClassArrList: null,
      pageData: [{}, {}],
      uploadText: "选择上传文件",
      wordUploadFlag: false, //上传成功标识
      isUpload: false,
      showQuery: false,
      examineType: null, //审核类型
      page: 1,
      pageSize: 10
    };
  },
  created() {
    // this.init();
  },
  watch: {
    "formData.bapChannel"(val) {
      if (val) {
        this.protClassArrList = protocolProtClass[val];
      }
    },
    exportExport(val) {
      if (!val) {
        this.exportExportData.uploadText = "请选择上传文件";
        this.exportExportData.loadFilePath = "";
      }
    }
  },
  methods: {
    cancel(){
      this.importHeBeiShow = false;
    },
    hHandleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.hUploadUrl = url;
      }
    },
    UuploadExcel() {
      if (!this.hUploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let data = {
        loadFilePath: this.hUploadUrl,
        brandId:8
      };
      this.Global.doPost(
        "brandStoreSign/importSignPresentRule.json",
        data,
        () => {
          this.$Message.success("导入成功");
          this.importHeBeiShow = false;
          this.uploadText = "选择导入文件";
        }
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.exportExportData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.exportExportData.loadFilePath = url;
      }
    },
    closeModal() {
      this.exportExport = false;
    },
    submit() {
      this.page = 1;
      this.init();
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
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    },
    download() {
      const url =
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/displayRetailPurchases.xlsx";
      window.open(url);
    },

    uploadExcel() {
      if (!this.exportExportData.loadFilePath) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let params = {
        loadFilePath: this.exportExportData.loadFilePath,
        brandId: 8
      };
      this.isUpload = true;
      //导入
      this.Global.doPost("brandStoreSign/importSignRule.json", params, res => {
        this.init();
        this.$Message.success("上传成功");
        this.wordUploadFlag = true;
        this.exportExport = false;
        this.isUpload = false;
      });
    },
    picturnUploadSuccess(val, val1) {
      this.uploadUrl = val;
      this.wordUploadFlag = val1;
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "brandStoreSign/importSignRule.json",
        data
      );
      window.open(url);
    }
  }
};
</script>