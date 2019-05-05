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
    .modal-table {
      max-height: 500px;
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
  .btn {
    cursor: pointer;
  }
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">签约审核统计</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item  required>
                      <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select> 
                  </Form-item>
                </div>
                
                <div class="btn-left w18">
                  <Form-item    required>
                      <data-range placeholder="签约时间查询范围" @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item    required>
                      <data-range placeholder="签约时间查询范围" hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
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
                      <Select v-model="formData.threeLevel"  placeholder="三级组织" clearable>
                          <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                  </div>
                </div>
              </transition>
          </Form>
        </div>
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left">此表共包含<span class='numColor'>{{ pageData.length }}</span>条数据</span>
              
              
              <exportBtn  class="btn-right" @btnClick="exportExcel" />
              <importBtn class="btn-right ml20" title="导入" @btnClick="renewShow = true"/>
            </div>
            <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
            
        </div>
        <!-- <div class="page-box">
          <div style="float: right;">
            <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
          </div>
        </div> -->
        <fieldNameDes/>
      </div>
      
     
      <!-- 导入 -->
      <myModal class="myModal"
          @close="closeModal"
          :modal="renewShow">
        <div slot="main" class="modal-main">
          <h3>导入</h3>
          <div class="modal-table">
            <i-Form>
            <Form-item label='导入类型:' prop='parameter' :label-width='88' required>
              <Select v-model="renewData.parameter" placeholder="请选择">
                  <Option :value="4">续约客户导入</Option>
                  <Option :value="5">建议名单导入</Option>
              </Select>
            </Form-item>
            <Form-item label='导入文件:' prop='parameter' :label-width='88' required>
              <div style="overflow:hidden;">
            
                <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;float:left;">
                    <Upload :action="url" 
                      :show-upload-list=false
                      :on-success='renewHandleSuccess'
                      :on-error='handleError'
                      :on-format-error="handleFormatError"
                      :format="['xlsx','xls']"
                      >
                      <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                      {{ renewData.uploadText }}

                    </Upload>
                    
                </div>

              </div>
            </Form-item>
            
          </i-Form>
          </div>
          <div class="maintain-footer">
              <span @click="closeModal" class="btn">取消</span>
              <span @click="renewUploadExcel" class="btn">确定</span>
            </div>
        </div>
      </myModal>
  </div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";

import hhTable from "@/components/table/table.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "contract-tracking-keepAlive",
  data() {
    return {
      renewShow: false,
      noneStatus: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      showQuery: false,
      renewData: {
        uploadText: "请选择上传文件",
        brandId: "",
        url: ""
      },
      url: config.uploadWorkerExcel,
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
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "" //三级组织
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      columns1: [
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
          title: "签约目标",
          key: "signTarget",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "续约客户",
          minWidth: 100,
          key: "renew",
          align: "center",
          tooltip: true
        },
        {
          title: "建议名单内客户",
          width: 130,
          key: "suggestNot",
          align: "center",
          tooltip: true
        },
        {
          title: "其他客户",
          minWidth: 100,
          key: "other",
          align: "center",
          tooltip: true
        },
        {
          title: "合计",
          width: 80,
          key: "total",
          align: "center",
          tooltip: true
        },
        {
          title: "签约达成",
          minWidth: 120,
          key: "signSuccessPercent",
          align: "center",
          tooltip: true
        },
        {
          title: "续约占比",
          key: "signRenewPercent",
          minWidth: 120,
          align: "center",
          tooltip: true
        },
        {
          title: "建议名单客户占比",
          key: "suggestPercent",
          width: 130,
          align: "center",
          tooltip: true
        },
        {
          title: "公司建议客户",
          key: "companySuggest",
          minWidth: 120,
          align: "center",
          tooltip: true
        },
        {
          title: "建议客户进度",
          key: "suggestProgress",
          minWidth: 120,
          align: "center",
          tooltip: true
        }
      ],
      pageData: [],
      brandList: []
    };
  },
  components: {
    dataRange,
    exportBtn,
    importBtn,
    myModal,
    hhTable,
    fieldNameDes
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
    renewShow(val) {
      if (!val) {
        this.renewData = {
          uploadText: "请选择上传文件"
        };
      }
    }
  },
  methods: {
    renewUploadExcel() {
      if (!this.renewData.parameter) {
        this.$Message.error("请选择导入类型");
        return false;
      }
      if (!this.renewData.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }

      let data = {
        loadFilePath: this.renewData.uploadUrl,
        parameter: this.renewData.parameter
      };
      this.Global.doPost("displayYxtg/signInfoInport.json", data, () => {
        this.$Message.success("导入成功");
        this.init();
        this.renewShow = false;
        this.renewData.uploadText = "请选择上传文件";
      });
    },

    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 xlsx 或 xls 格式的文件。"
      });
    },
    handleError() {},
    renewHandleSuccess(response, file, fileList) {
      this.renewData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.renewData.uploadUrl = url;
      }
    },
    renewDowland() {
      // 续约客户导入模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/collectTemplate.xlsx"
      );
    },

    oneLevelChange(value) {
      this.twoLeverList = [];
      this.formData.twoLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value,
        level: 2
      }).then(res => {
        if (res && res.status == 1) {
          this.twoLeverList = res.data;
          if (res.data.length) {
            this.twoLeverList.unshift({
              areaName: "全部",
              id: "全部"
            });
          }
        }
      });
    },
    twoLevelChange(value) {
      this.threeLeverList = [];
      this.formData.threeLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value,
        level: 3
      }).then(res => {
        if (res && res.status == 1) {
          this.threeLeverList = res.data;
          if (res.data.length) {
            this.threeLeverList.unshift({
              areaName: "全部",
              id: "全部"
            });
          }
        }
      });
    },
    closeModal() {
      this.renewShow = false;
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
    submit(name) {
      if (!this.formData.queryStartTime) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.oneLevel) {
        this.$Message.error("一级组织不能为空");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.noneStatus = true;
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("displayYxtg/queryCountSignList.json", data, res => {
        this.pageData = res;
        // this.pageNum = res.items;
        // this.page = res.page;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "displayYxtg/exportSignInfo.json",
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