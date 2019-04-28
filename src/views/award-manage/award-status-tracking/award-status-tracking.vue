<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
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
    line-height: 24px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">实物折扣状态跟踪</h2> -->
      <div class="main-container">
        <div class="box">
              <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                  <Row>
                      <Col span='12'>
                          <Form-item label="时间" required>
                              <Row>
                                <Col span="11">
                                    <Form-item prop="queryStartTime">
                                      <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center;">至</Col>
                                <Col span="11">
                                    <Form-item prop="queryEndTime">
                                        <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                                    </Form-item>
                                </Col>
                            </Row>
                          </Form-item>    
                          <Form-item label="活动名称"  >
                              <Select v-model="formData.activityId" placeholder="请选择">
                                  <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                              </Select>  
                          </Form-item>                    
                          
                      </Col>
                      <Col span='8' offset="1"> 
                          <Form-item label="品牌名称">
                              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                                  <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                              </Select>  
                          </Form-item>
                          <Form-item label="区域" prop="areaCode">
                              <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                          </Form-item>                  
                      </Col>
                      <Col span="2" offset="1" style="margin-top:24px">
                          <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
                      </Col>
                  </Row>
              </Form>
        </div>
        <div class="box" style="padding-bottom:20px">
          <!-- <div class='contentTop'>
              <Button @click="exportExcel" class="btn-export" icon="ios-download-outline" type="primary">导出</Button>
              <Button class="btn-import" icon="ios-upload-outline" type="primary">导入</Button>
          </div> -->
          <div class='contentTop'>
              <Button @click="exportExcel" class="btn-right" icon="ios-download-outline" type="primary" style="margin-left:10px">导出</Button>
              <Button @click="uploadExcel" class="btn-right" icon="android-add" type="success">导入</Button> 
              <div class='upDate'>
                      <Upload :action="url" 
                      :show-upload-list=false
                      :on-success='handleSuccess'
                      :on-error='handleError'
                      >
                      <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                      {{ uploadText }} 
                      </Upload>
                  </div>
          </div>
          <Table :columns="columns1" :data="pageData" disabled-hover></Table>
          
        </div>
        <div class="page-box">
              <div style="float: right;">
                  <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
import dataRange from "@/components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
  name:"award-status-tracking-keepAlive",
  data() {
    const that = this;
    return {
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
        areaCode: [],
        activityId: ""
      },
      url: config.uploadWorkerExcel,
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "请选择品牌名称" }],
        activityId: [{ required: true, message: "请选择活动名称" }]
      },

      columns1: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "时间",
          key: "createTime",
          width: 170,
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.createTime);
          }
        },
        {
          title: "活动名称",
          key: "activityName",
          width: 100,
          align: "center"
        },
        {
          title: "获得折扣",
          key: "goodsName",
          width: 100,
          align: "center"
        },
        {
          title: "数量",
          key: "winAmount",
          width: 60,
          align: "center"
        },

        {
          title: "省",
          key: "province",
          width: 80,
          align: "center"
        },
        {
          title: "市",
          key: "city",
          width: 80,
          align: "center"
        },
        {
          title: "用户ID",
          key: "userId",
          width: 110,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          width: 80,
          align: "center"
        },
        {
          title: "联系电话",
          key: "phone",
          width: 130,
          align: "center"
        },
        {
          title: "物流单号",
          key: "expressInfo",
          width: 140,
          align: "center"
        },
        {
          title: "状态",
          key: "recStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            return this.Global.ENUMS.harvestStauts[params.row.recStatus];
          }
        },
        {
          title: "操作",
          key: "action",
          fixed: "right",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              //  h('Button', {
              //     props: {
              //         type: 'success',
              //         size: 'small'
              //     },
              //     style: {
              //         marginRight: '5px'
              //     },
              //     on: {
              //         click: () => {

              //         }
              //     }
              // }, '修改'),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      // this.$router.push('/awardStatusTracking-edit');
                      this.$router.push({
                        path: "awardStatusTracking-edit",
                        query: { params: params.row }
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
      keyList: [],
      areaData: area,
      brandList: [],
      activityList: [],
      myChart: "",
      uploadText: "上传参与业代名单"
    };
  },
  components: {
    dataRange
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId)
      }
    });
  },
  mounted() {},
  methods: {
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
    // dataChange(val) {
    //   this.formData.queryEndTime = val.slice(0, 11) + "23:59:59";
    // },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      // data["queryStartTime"] = this.Global.createTime(
      //   this.formData.queryStartTime
      // );
      // data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
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
      data["userType"] = "C";
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      console.log(data);
      this.Global.doPost("report/activityGoodsDetailReport.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    },
    exportExcel() {
      var that = this;
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
      data["userType"] = "C";
      var url = this.Global.getExportUrl(
        "report/activityDetailExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.activityList = [];
      this.Global.getActivityList(value, res => {
        this.activityList = res.datalist;
        if (res.datalist && res.datalist.length) {
          this.formData.activityId = res.datalist[0].id;
        }
      });
    },
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
        // this.uploadExcel()
      }
    },
    handleError: function() {},
    uploadExcel() {
      var that = this;
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      // this.Global.doPost('worker/uploadBrandWorker.json',{
      //     loadFilePath: this.uploadUrl,
      //     brandId: that.activityData.brandId,
      //     activityId: that.activityData.id,
      //     brandName: that.activityData.brandName
      // },function(){
      //     that.init();
      //     that.uploadText =  '上传参与业代名单';
      // })
    }
  }
};
</script>


