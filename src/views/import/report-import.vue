<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}
.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .btn {
    float: left;
    padding: 5px 12px;
    margin-right: 10px;
  }
}
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
}
.demo {
  float: left;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
</style>

<template>
    <div id="Main">
        <h2 class="Title">门店基础信息导入</h2>
        <div class="box" style='margin-top: 15px;overflow: hidden;'>
            <div class='contentTop'>
                <i-button @click="importHeBeiShow=true" class="btn" icon="md-add" type="primary">河北数据导入</i-button>
                <i-button @click="importShow=true" class="btn" icon="md-add" type="primary">广东数据导入</i-button>
                <i-button @click="storeImportShow=true" class="btn" icon="md-add" type="primary">河北门店上报表导入</i-button>
            </div>
        </div>
        <Modal
          v-model="importShow">
          <h2 style="text-align:center;">广东数据导入</h2>
          <i-Form>
            <Form-item label='品牌名称:' prop='brandId' :label-width='72'>
              <Select disabled v-model="guangDongData.brandId" placeholder="请选择">
                  <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <div style="overflow:hidden;">
                <div class='demo' @click='gDowland'> 
                    <Icon type="ios-paper-outline" size='14' color='#ff8a34'></Icon>
                    <span>下载模版</span>
                </div>
                <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;">
                    <Upload :action="url" 
                    :show-upload-list=false
                    :on-success='handleSuccess'
                    :on-error='handleError'
                    >
                    <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                    <span>{{uploadText}}</span>
                    </Upload>
                </div>
            </div>
          </i-Form>
          <div slot="footer" style="text-align:center;">
            <i-button type="text" @click="cancel">取消</i-button>
            <i-button type="success" @click="gUploadExcel">确定</i-button>
          </div>
        </Modal>
        <Modal
          v-model="importHeBeiShow">
          <h2 style="text-align:center;">河北数据导入</h2>
          <i-Form>
            <Form-item label='品牌名称:' prop='brandId' :label-width='72'>
              <!-- disabled -->
              <Select disabled v-model="formData.brandId" placeholder="请选择">
                  <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label='导入类型:' prop='parameter' :label-width='72'>
              <Select v-model="formData.parameter" placeholder="请选择">
                  <Option value="2">地龙导入</Option>
                  <Option value="1">金银铜签约导入</Option>
                  <Option value="7">陈列活动导入</Option>
                  <Option value="6">纯悦餐饮抢仓</Option>
                  <Option value="3">纯悦水割箱陈列活动</Option>
                  <!-- one -->
                  <Option value="4">纯悦水冰柜陈列活动</Option>
                  <!-- two -->
                  <Option value="5">4.5L纯悦水陈列活动</Option>
                  <!-- three -->
                  <!-- <Option value="4">门店上报表导入</Option> -->
              </Select>
            </Form-item>
            <div style="overflow:hidden;">
                <div class='demo' @click='dowland'> 
                    <Icon type="ios-paper-outline" size='14' color='#ff8a34'></Icon>
                    <span>下载模版</span>
                </div>
                <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;">
                    <Upload :action="url" 
                      :show-upload-list=false
                      :on-success='hHandleSuccess'
                      :on-error='handleError'
                      >
                      <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                      {{uploadText}}
                    </Upload>
                </div>
            </div>
          </i-Form>
          <div slot="footer" style="text-align:center;">
            <i-button type="text" @click="cancel">取消</i-button>
            <i-button type="success" @click="uploadExcel">确定</i-button>
          </div>
        </Modal>
        <Modal
          v-model="storeImportShow">
          <h2 style="text-align:center;">门店上报表导入</h2>
          <i-Form>
            <Form-item label='品牌名称:' prop='brandId' :label-width='72'>
              <Select v-model="storeImportData.brandId" placeholder="请选择">
                  <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <div style="overflow:hidden;">
                <div class='demo' @click='storeDowland'> 
                    <Icon type="ios-paper-outline" size='14' color='#ff8a34'></Icon>
                    <span>下载模版</span>
                </div>
                <div class='upDate' style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;">
                    <Upload :action="url" 
                    :show-upload-list=false
                    :on-success='sHandleSuccess'
                    :on-error='handleError'
                    >
                    <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                    <span>{{uploadText}}</span>
                    </Upload>
                </div>
            </div>
          </i-Form>
          <div slot="footer" style="text-align:center;">
            <i-button type="text" @click="cancel">取消</i-button>
            <i-button type="success" @click="storeUploadExcel">确定</i-button>
          </div>
        </Modal>


        <div class="box">
          <Form ref="form" :model="formData" :label-width="85">
            <Row>
              <Col span="11">
                <Form-item label="导入时间:" required>
                    <Row>
                        <Col span="11">
                            <Form-item prop="queryStartTime">
                                <data-range @dataChange="startTimeChange" hour="00:00" :time="queryData.queryStartTime" start></data-range>
                            </Form-item>
                        </Col>
                        <Col span="2" style="text-align: center;">至</Col>
                        <Col span="11">
                            <Form-item prop="queryEndTime">
                                <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="queryData.queryEndTime"></data-range>
                            </Form-item>
                        </Col>
                    </Row>
                </Form-item>
              </Col>
              <Col span="5">
                <Form-item label="导入类型:" required>
                    <Select v-model="queryData.clientType" placeholder="请选择" clearable>
                        <Option value="signLoad_import">基础信息</Option>
                        <Option value="worker_import">业代导入</Option>
                        <Option value="collect_import">上报导入</Option>
                        <Option value="yxtg_import">粤西太古导入</Option>
                    </Select>
                </Form-item>
              </Col>
              <Col span="5">
                <Form-item label="导入结果:" required>
                    <Select v-model="queryData.result" placeholder="请选择" clearable>
                        <Option value="fail">导入失败</Option>
                        <Option value="success">导入成功</Option>
                    </Select>
                </Form-item>
              </Col>
              <Col span='2'>
                  <div class="searchBox" style="margin-left:20px;">
                      <Button @click="submit()" class="btn-search  search_btn" type="primary">查询</Button>
                  </div>

              </Col>
            </Row>
          </Form>
        </div>
        <div class="box" style='margin-top: 15px;overflow: hidden;padding-bottom:20px;'>
          <Table size="small" :columns="columns1" :data="pageData" border disabled-hover></Table>

        </div>
        <div style="margin: 10px;overflow: hidden">
          <div style="float: right;">
            <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
          </div>
        </div>
    </div>
</template>

<script>
import config from "@/util/config.js";
import dataRange from "@/components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "report-import-keepAlive",

  data() {
    return {
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "时间",
          key: "createTime",
          align: "center",
          render: (h, f) => {
            return this.Global.createTime(f.row.createTime);
          }
        },
        {
          title: "入参",
          key: "params",
          align: "center"
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      screenWidth: document.body.clientWidth,
      queryData: {
        queryStartTime: EDFAULT_ENDTIME,
        queryEndTime: EDFAULT_ENDTIME,
        // clientType:"",
        clientType: "",
        result: ""
      },
      storeImportData: {
        brandId: ""
      },
      storeImportShow: false,
      importHeBeiShow: false,
      importShow: false,
      uploadText: "选择导入文件",
      url: config.uploadWorkerExcel,
      uploadUrl: "",
      formData: {
        brandId: 8,
        // brandId:"",
        parameter: ""
      },
      guangDongData: {
        brandId: 1
      },
      rules: {},
      brandList: [],
      hUploadUrl: "",
      sUploadUrl: ""
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.storeImportData.brandId = this.brandList[0].id;
      }
    });
  },
  components: {
    dataRange
  },
  watch: {
    importShow(curVal, oldVal) {
      if (!curVal) {
        this.uploadUrl = "";
        this.uploadText = "选择上传文件";
      }
    },
    importHeBeiShow(curVal, oldVal) {
      if (!curVal) {
        this.hUploadUrl = "";
        this.uploadText = "选择上传文件";
      }
    },
    storeImportShow(curVal, oldVal) {
      if (!curVal) {
        this.sUploadUrl = "";
        this.uploadText = "选择上传文件";
      }
    }
  },
  methods: {
    // 查询开始
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.queryData.queryStartTime = this.Global.setHoursData(
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
      this.queryData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd hh:mm:ss");
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      if (!this.queryData.clientType) {
        this.$Message.error("请选择导入类型");
        return false;
      }
      if (!this.queryData.result) {
        this.$Message.error("请选择导入结果");
        return false;
      }
      var data = this.Global.JsonChange(this.queryData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["queryStartTime"] = this.Global.createTime(
        this.queryData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(
        this.queryData.queryEndTime
      );
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("basicData/queryImportLogList.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    },
    // 查询结束

    // 导入
    cancel() {
      this.importShow = false;
      this.importHeBeiShow = false;
      this.storeImportShow = false;
    },
    uploadExcel() {
      if (!this.hUploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.formData.parameter) {
        this.$Message.error("请选择导入类型");
        return false;
      }
      let data = {
        loadFilePath: this.hUploadUrl,
        brandId: this.formData.brandId,
        parameter: this.formData.parameter
      };
      this.Global.doPost(
        "basicData/brandStoreSignInfoImport.json",
        data,
        () => {
          this.$Message.success("导入成功");
          this.importHeBeiShow = false;
          this.uploadText = "选择导入文件";
        }
      );
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/hbTemplate.xlsx"
      );
    },
    gUploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.guangDongData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }

      this.Global.doPost(
        "basicData/displayYxtgInfoImport.json",
        {
          loadFilePath: this.uploadUrl,
          brandId: this.guangDongData.brandId
        },
        () => {
          this.$Message.success("导入成功");
          this.importHeBeiShow = false;
          this.importShow = false;
          this.uploadText = "选择导入文件";
        }
      );
    },
    gDowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/gdYxtgTemplate.xlsx"
      );
    },
    storeUploadExcel() {
      if (!this.sUploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.guangDongData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }

      this.Global.doPost(
        "basicData/brandStoreCollectInfoImport.json",
        {
          loadFilePath: this.sUploadUrl,
          brandId: this.storeImportData.brandId
          // parameter:8
        },
        () => {
          this.$Message.success("导入成功");
          this.importHeBeiShow = false;
          this.importShow = false;
          this.uploadText = "选择导入文件";
        }
      );
    },
    storeDowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/collectTemplate.xlsx"
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    hHandleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.hUploadUrl = url;
      }
    },
    sHandleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.sUploadUrl = url;
      }
    }
  }
};
</script>