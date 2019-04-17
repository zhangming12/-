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
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">签到位置维护</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10" :rules="rule">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item  required>
                      <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select> 
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="queryEndTime" required>
                      <Input placeholder="签到点名称" v-model="formData.signName" clearable></Input>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                    <Form-item required>
                      <Select v-model="formData.oneLevel" placeholder="一级组织" @on-change="oneLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in oneLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.twoLevel"  placeholder="二级组织" @on-change="twoLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in twoLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.threeLevel"  placeholder="三级组织" @on-change="threeLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                  </div>
                <div class="btn-left w10">
                  <div class="searchBox">
                    <div class="btn-left search-left" @click="showQuery=!showQuery">
                      <button type="button">
                       {{showQuery?'收起':'更多'}} 
                        <Icon type="ios-arrow-down" size="14" style="margin-top:-2px;" v-if="!showQuery"/>
                        <Icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                      </button>
                      
                    </div>
                    <div class="btn-right search-right" @click="submit('form')">
                      <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                    </div>
                  </div>
                </div>
              </div>
              <transition name="fade">
                <div class="container" v-if="showQuery">
                  
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.fourLevel"  placeholder="四级组织" clearable>
                          <Option :value="item.id" v-for="(item,index) in fourLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                    
                  </div>
                </div>
              </transition>
          </Form>
        </div>
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left">待审核签到点:<span class='numColor'>{{ notPass }}</span></span>
              <span class="btn-left spanBtn" @click="goToAudit">去审核</span>
              <exportBtn  class="btn-right" @btnClick="exportExcel" />
              <importBtn  class="btn-right" @click.native="importExcelShow = true" />
              <span class="btn-right spanBtn" @click="dowland" style="margin-right:10px;">下载模板</span>
            </div>
            <hhTable :columns="columns1" :pageData="pageData" :noneStatus = "noneStatus" disabled-hover></hhTable>
            
        </div>
        <div class="page-box">
          <div style="float: right;">
            <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
          </div>
        </div>
        <fieldNameDes/>
      </div>
      <myModal class="myModal"
            @close="importExcelShow = false"
            :modal="importExcelShow">
            <div slot="main" class="modal-main">
              <h3>导入</h3>
              <div class="modal-table">
                  <Form ref="form" :label-width="88">
                      <div style="overflow:hidden;">
                          <div class='upDate'>
                              <Upload :action="importUrl" 
                                :show-upload-list=false
                                :on-success='handleSuccess'
                                :on-error='handleError'
                                >
                                <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
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
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "check-location-maintenance-keepAlive",
  data() {
    return {
      importData: {
        uploadText: "请选择上传文件"
      },
      importUrl: config.uploadWorkerExcel,
      options: {
        disabledDate(date) {
          const disabledDay = date.getTime();
          return disabledDay > new Date().getTime();
        }
      },
      notPass: 0,
      importExcelShow: false,
      myModalisShow: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      showQuery: false,
      formData: {
        brandId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "" //四级组织
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {
        // queryStartTime: [{ validator: validateStart }],
        // queryEndTime: [{ validator: validateEnd }]
      },
      noneStatus: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "签到点ID",
          key: "id",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "签到点名称",
          key: "signName",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "签到点地址",
          key: "signAddress",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "签到点经纬度",
          key: "signLocate",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "一级组织",
          key: "oneLevel",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "二级组织",
          key: "twoLevel",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "三级组织",
          key: "threeLevel",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "四级组织",
          key: "fourLevel",
          minWidth: 160,
          align: "center",
          tooltip: true
        },

        {
          title: "操作",
          key: "action",
          width: 150,
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
                      let {
                        province,
                        signLocate,
                        city,
                        area,
                        signName,
                        signAddress,
                        id
                      } = params.row;
                      let queryParams = {
                        signLocate,
                        area,
                        city,
                        province,
                        signName,
                        signAddress,
                        id
                      };
                      this.$router.push({
                        path: "/checkLocationModify",
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
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除？",
                        onOk: () => {
                          let data = {
                            id: params.row.id
                          };
                          this.Global.doPost(
                            "cnySign/deleteSignLocateOfSuccess.json",
                            data,
                            res => {
                              this.$Message.success("删除成功");
                              this.init();
                            }
                          );
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      pageData: [],
      brandList: []
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
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a" },
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
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/template/signLocate.xlsx"
      );
    },
    exportMethod() {
      if (!this.importData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "cnySign/importSignLocateInfo.json",
        {
          loadFilePath: this.importData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.importExcelShow = false;
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
      let query = {
        brandId: this.formData.brandId
      };
      this.$router.push({
        path: "/checkLocationAudit",
        query
      });
    },
    oneLevelChange(value) {
      this.twoLeverList = [];
      this.formData.twoLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.twoLeverList = res.data;
        }
      });
    },
    twoLevelChange(value) {
      this.threeLeverList = [];
      this.formData.threeLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.threeLeverList = res.data;
        }
      });
    },
    threeLevelChange(value) {
      this.fourLeverList = [];
      this.formData.fourLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      });
    },
    closeModal() {
      this.myModalisShow = false;
    },
    showDetail() {
      this.myModalisShow = true;
    },
    submit(name) {
      // if (!this.formData.queryStartTime) {
      //   this.$Message.error("请输入查询起始时间");
      //   return false;
      // }

      // if (!this.formData.queryEndTime) {
      //   this.$Message.error("请输入查询截止时间");
      //   return false;
      // }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      // if (!this.formData.groupId) {
      //   this.$Message.error("活动包名不能为空");
      //   return false;
      // }
      // if (!this.formData.activityId) {
      //   this.$Message.error("活动不能为空");
      //   return false;
      // }
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
      // data["queryStartTime"] = this.Global.createTime(
      //   this.formData.queryStartTime
      // );
      // if (this.start.hour == "24:00") {
      //   data["queryStartTime"] = this.Global.setHoursData(
      //     this.start.time,
      //     this.start.hour
      //   );
      // }

      // data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      // if (this.end.hour == "24:00") {
      //   data["queryEndTime"] = this.Global.setHoursData(
      //     this.end.time,
      //     this.end.hour
      //   );
      // }
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("cnySign/querySignLocateOfSuccess.json", data, res => {
        this.pageNum = res.result.items;
        this.notPass = res.notPass;
        this.pageData = res.result.datalist;
        this.page = res.result.page;
        this.noneStatus = true;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);

      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "cnySign/importSignLocateOfSuccess.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.formData.oneLevel = "";
      if (!value) return;
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
    }
  }
};
</script>


