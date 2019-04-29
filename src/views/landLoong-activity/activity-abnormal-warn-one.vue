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
        <h2 class="Title">活动异常预警</h2>           
      <div class="box">  
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span="21">
                        <Row>
                            <Col span="13">
                                <Form-item label="时间:">
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
                            </Col>
                            <Col span="11">
                                <Form-item label="客户编号">
                                    <Input  v-model="formData.joinCode"></Input>                              
                                </Form-item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span="8">
                                <Form-item label="店铺名称">
                                    <Input  v-model="formData.storeName"></Input>                             
                                </Form-item>
                            </Col>
                            <Col span="8">
                                <Form-item label="客户渠道">
                                    <Select v-model="formData.bapChannel" clearable>
                                        <Option v-for="(item, key, index) in protocolBapChannel" :value="key" :key="index">{{ item }}</Option>
                                    </Select>
                                </Form-item> 
                            </Col>
                            <Col span="8">
                                <Form-item label="业代姓名">
                                    <Input  v-model="formData.workerName"></Input>                             
                                </Form-item>
                            </Col>
                        </Row>
                    </Col>
                    <Col span="2" offset="1">
                            <div class="searchBox">
                                <Button @click="submit('form')" class="btn-search  search_btn" type="primary">查询</Button> 
                                <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-up" v-if="showQuery"></Button>
                                <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-down" v-else></Button>                        
                                
                            </div>                                            
                        </Col>
                </Row>
                <transition name="fade">
                    <Row v-if="showQuery">
                        <Col span='7'>
                            <Form-item label="销售路线">
                                <Input  v-model="formData.salesRoute"></Input>                                                         
                                
                            </Form-item> 
                        </Col>
                        <Col span='7'>
                            <Form-item label="销售部" >                                                        
                                <Input  v-model="formData.salesDept"></Input>                             
                            </Form-item> 
                        </Col>
                        <Col span='7'>
                            <Form-item label="大区">                         
                                <Input  v-model="formData.salesRegion"></Input>                             
                            </Form-item>   
                        </Col>
                        <Col span='7'>
                        <Form-item label="营业部">
                                <Input  v-model="formData.busiDept"></Input> 
                            </Form-item> 
                        </Col>
                        <Col span='7'>
                        <Form-item label="业代手机" >
                            <Input  v-model="formData.workerPhone"></Input> 
                        </Form-item> 
                        </Col>
                    </Row>
                </transition>
            </Form>          
      </div>
      <div class="box" style="padding-bottom:20px">        
        <div class='contentTop'>  
            <Button class="btn-right" @click="exportExcel"  type="primary" >导出</Button>
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
import { queryLoongActivityRisk } from "@/api/landLoong-activity-manage/landLoong-activity-manage.js";

import {
  protocolBapChannel //BAP渠道
} from "@/util/ENUMS.js";

import dataRange from "@/components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";

import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
  name:"activity-abnormal-warn-one-keepAlive",

  components: {
    dataRange
  },
  data() {
    const that = this;
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
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
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        queryTime: [{ required: true, message: "选择日期跟时间" }]
      },
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "上传时间",
          key: "joinCode",
          width: 170,
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.uploadTime);
          }
        },
        {
          title: "上传周期",
          key: "storeName",
          width: 180,
          align: "center",
          render: (h, params) => {
            return `${that.Global.formatYear(
              params.row.startTime
            )}至${that.Global.formatYear(params.row.endTime)}`;
          }
        },
        {
          title: "销售部",
          key: "salesDept",
          width: 120,
          align: "center"
        },
        {
          title: "销售大区",
          key: "salesRegion",
          width: 120,
          align: "center"
        },
        {
          title: "营业部",
          key: "busiDept",
          width: 170,
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
          width: 170,
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
          width: 200,
          align: "center"
        },
        {
          title: "联系方式",
          key: "phone",
          width: 120,
          align: "center"
        },
        {
          title: "预警状态",
          key: "riskStatus",
          width: 170,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 100,
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
                      let queryParams = {
                        joinCode: params.row.joinCode,
                        id: params.row.id,
                        // activityId:params.row.activityId,
                        loongBizType:"one",
                        storeId: params.row.storeId
                      };
                      this.$router.push({
                        path: "/examineDetail",
                        query: queryParams
                      });
                    }
                  }
                },
                "查看详情"
              )
            );

            return h("div", buttonArray);
          }
        }
      ],

      pageData: [],
      showQuery: false
    };
  },
  created() {
    // this.init();
  },
  mounted() {},

  methods: {
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
    init: function(currentPage, pageSize) {
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
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["loongBizType"] = "one";
      delete data.queryTime;
      queryLoongActivityRisk(data).then(res => {
        if (res && res.status === 1) {
          console.log(res.data);
          this.pageNum = res.data.items;
          this.page = res.data.page;
          this.pageData = res.data.datalist;
        }
      });
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
      this.formData.queryEndTime = this.Global.setHoursData(value.time, value.hour);
    },

    exportExcel: function() {
      var data = this.Global.JsonChange(this.formData);
      data["loongBizType"] = "one";
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
      delete data.queryTime;
      console.log(data);
      var url = this.Global.getExportUrl(
        "displayLoongLog/loongActivityRiskExport.json",
        data
      );
      window.open(url);
    },

    importExcel() {}
  }
};
</script>


