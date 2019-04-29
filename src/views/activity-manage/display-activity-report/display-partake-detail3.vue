<style lang="less" scoped>
@import "../../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
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
  margin-top: 10px;
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
    <!-- <h2 class="Title">河北中粮陈列上传明细</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="21">
            <Row>
              <Col span="16">
                <Form-item label="上传时间:" required>
                  <Row>
                    <Col span="11">
                      <Form-item prop="queryStartTime">
                        <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center;">至</Col>
                    <Col span="11">
                      <Form-item prop="queryEndTime">
                        <data-range hour="24:00" placeholder="结束时间" v-model="formData.queryEndTime"></data-range>
                      </Form-item>
                    </Col>
                  </Row>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="品牌名称:" required>
                  <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                    <Option
                      :value="item.id"
                      v-for="(item,index) in brandList"
                      :key="index"
                    >{{ item.brandName }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="24">
                <Row>
                  <Col span="8">
                    <Form-item label="活动包名:" prop="groupId" required>
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
                  </Col>
                  <Col span="8">
                    <Form-item label="陈列活动:">
                      <Select v-model="formData.activityId" placeholder="请选择" clearable>
                        <Option
                          :value="item.id"
                          v-for="(item,index) in activityList"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </Form-item>
                  </Col>
                  <Col span="8">
                    <Form-item label="区域:">
                      <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                    </Form-item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1">
            <div class="searchBox">
              <Button @click="submit('form')" class="btn-search search_btn" type="primary">查询</Button>
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
              <Form-item label="审核状态:">
                <Select v-model="formData.checkStatus" clearable>
                  <Option value="0">审核中</Option>
                  <Option value="1">视频通过</Option>
                  <Option value="2">审核不通过</Option>
                  <Option value="3">退回需重传</Option>
                </Select>
              </Form-item>
              <Form-item label="店铺ID:">
                <Input v-model.trim="formData.storeId" placeholder="请输入店铺ID"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="发放状态:">
                <Select v-model="formData.winStatus" clearable>
                  <Option value="4">通过已发放</Option>
                  <Option value="4040">未达发放要求</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="客户编号:">
                <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="contentTop">
        <Button @click="exportExcel" class="btn-right" icon="ios-download-outline" type="primary">导出</Button>
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
import area from "@/config/china_code_data.js";

import {
  dispalyExamineSuggesteStatus,
  displayParketCheckStatus,
  liquidationState,
  receiveState
} from "@/util/ENUMS.js";
import dataRange from "@/components/data-range/data-range.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { displayApplyDetail } from "@/api/activity-manage/display-activity-manage.js"; //api
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "display-partake-detail3-keepAlive",
  data() {
    return {
      showQuery: false,
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
        activityId: "",
        groupId: "",
        storeId: "",
        checkStatus: "",
        winStatus: "",
        joinCode: "",
        areaCode: []
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "上传时间",
          key: "uploadTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.uploadTime));
          }
        },
        {
          title: "陈列周期",
          key: "createTime",
          width: 160,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              this.Global.formatYear(params.row.startTime) +
                "至" +
                this.Global.formatYear(params.row.endTime)
            );
          }
        },
        {
          title: "店铺ID",
          key: "storeId",
          width: 120,
          align: "center"
        },
        {
          title: "客户编号",
          width: 100,
          key: "joinCode",
          align: "center"
        },
        {
          title: "渠道",
          width: 100,
          key: "bapChannel",
          align: "center"
        },
        {
          title: "销售路线",
          width: 120,
          key: "salesRoute",
          align: "center"
        },
        {
          title: "业代姓名",
          width: 120,
          key: "workerName",
          align: "center"
        },
        {
          title: "业代手机",
          width: 120,
          key: "workerPhone",
          align: "center"
        },
        {
          title: "店名",
          width: 100,
          key: "storeName",
          align: "center"
        },
        {
          title: "清算状态",
          width: 100,
          key: "liquidateStatus",
          align: "center",
          render: (h, params) => {
            return h("div", liquidationState[params.row.liquidateStatus]);
          }
        },
        {
          title: "预计折扣金额 ",
          width: 120,
          key: "presentStdAmount",
          align: "center"
        },
        {
          title: "领取状态 ",
          width: 100,
          key: "recStatus",
          align: "center",
          render: (h, params) => {
            return h("div", receiveState[params.row.recStatus]);
          }
        },
        {
          title: "领取金额 ",
          width: 100,
          key: "amount",
          align: "center"
        },
        {
          title: "省",
          width: 100,
          key: "province",
          align: "center"
        },
        {
          title: "市",
          width: 100,
          key: "city",
          align: "center"
        },
        {
          title: "区",
          width: 100,
          key: "area",
          align: "center"
        },
        {
          title: "地址",
          width: 120,
          key: "address",
          align: "center"
        },
        {
          title: "陈列活动",
          key: "activityName",
          width: 130,
          align: "center"
        },
        {
          title: "分组名称",
          key: "displayGroup",
          width: 120,
          align: "center"
        },

        {
          title: "审核意见",
          key: "checkStatus",
          width: 120,
          align: "center",
          render: (h, params) => {
            return h("div", displayParketCheckStatus[params.row.checkStatus]);
          }
        },
        {
          title: "格式",
          key: "fileType",
          width: 120,
          align: "center",
          render: (h, params) => {
            let str = "";
            if (params.row.fileType == "radio") {
              str = "视频";
            } else if (params.row.fileType == "image") {
              str = "图片";
            }
            return h("div", str);
          }
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
                      let { id, activityId, storeId } = params.row;
                      let queryParams = {
                        id,
                        activityId,
                        storeId,
                        displayActCategory: "partake",
                        displayBackType: "E"
                      };
                      this.$router.push({
                        path: "/displayResultOneEdit",
                        query: queryParams
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
      areaData: area,
      brandList: [],
      groupList: [],
      activityList: []
    };
  },
  components: { dataRange },
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

  methods: {
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
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
      if (!this.formData.groupId) {
        this.$Message.error("请输入查询条件！");
        return false;
      }
      this.init(1, 10);
    },
    changePage(size) {
      this.init(size, 10);
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
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.deleteEmptyProperty(data);
      displayApplyDetail(data).then(res => {
        if (res.status == 1) {
          this.pageNum = res.data.items;
          this.pageData = res.data.datalist;
          this.page = res.data.page;
        }
      });
    },
    exportExcel() {
      if (!this.formData.groupId) {
        this.$Message.error("请输入查询条件！");
        return false;
      }
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);

      var url = this.Global.getExportUrl(
        "display/displayUploadDetailExport.json",
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
    handleEdit() {
      this.$router.push({
        path: "/displayReward-edit",
        query: { type: "edit" }
      });
    }
  }
};
</script>