<style lang="less" scoped>
@import "../../../config/index.less";

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
  .btn {
    float: right;
    margin-left: 10px;
  }
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动进货量管理</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="21">
            <Row>
              <Col span="14">
                <Form-item label="时间:" required>
                  <Row>
                    <Col span="11">
                      <Form-item prop="queryStartTime">
                        <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center;">至</Col>
                    <Col span="11">
                      <Form-item prop="queryEndTime">
                        <data-range placeholder="结束时间" hour="24:00" v-model="formData.queryEndTime"></data-range>
                      </Form-item>
                    </Col>
                  </Row>
                </Form-item>
              </Col>
              <Col span="10">
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
                    <Form-item label="活动名称:" prop="activityId">
                      <Select
                        v-model="formData.activityId"
                        placeholder="请选择"
                        @on-change="getpresentList"
                        clearable
                      >
                        <Option
                          :value="item.id"
                          v-for="(item,index) in activityList"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </Form-item>
                  </Col>
                  <Col span="8">
                    <Form-item label="客户编号:" prop="areaCode">
                      <Input v-model="formData.joinCode" placeholder="请输入客户编号"></Input>
                    </Form-item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1" style="margin-top:24px">
            <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="padding-bottom:20px">
      <div class="contentTop">
        <i-button class="btn" @click="exportUserExcel" type="info" style="width:120px;">导出客户名单</i-button>
        <i-button class="btn" @click="exportAllExcel" type="success">导出</i-button>
        <Button @click="uploadExcel" class="btn-right" :disabled="isUpload" type="primary">上传</Button>

        <wpicture-upload
          :wordUploadFlag="wordUploadFlag"
          @wordPicturnUploadSuccess="picturnUploadSuccess"
        ></wpicture-upload>
        <div class="demo" @click="exportExcel">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <Modal v-model="updatePush">
      <h3 slot="header" style="text-align:center;">进货量更新推送</h3>
      <Form :label-width="85">
        <Form-item label="品牌名称:" prop="brandId">
          <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" clearable>
            <Option
              :value="item.id"
              v-for="(item,index) in brandList"
              :key="index"
            >{{ item.brandName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="活动包名:" prop="groupId">
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
        <Form-item label="进货量更新时间:" prop :label-width="120">
          <span></span>
        </Form-item>
      </Form>
      <div slot="footer" style="text-align:center">
        <i-button type="error" @click="close">取消</i-button>
        <i-button type="success" @click>发送</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import {
  queryDisplayRetailPurchases, //列表
  displayRetailPurchases //导入
} from "@/api/activity-manage/display-activity-manage.js";

import dataRange from "@/components/data-range/data-range.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";

import wpictureUpload from "@/components/word-picture-upload.vue";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "award-purchase-amount-keepAlive",
  components: {
    wpictureUpload,
    dataRange
  },
  data() {
    return {
      updatePush: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        activityId: "",
        storeId: "",
        groupId: "",
        storeName: "",
        joinCode: ""
      },
      url: config.uploadWorkerExcel,
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "请选择品牌名称" }]
        // activityId: [{ required: true, message: "请选择活动名称" }],
        // queryTime: [{ required: true, message: "选择日期跟时间" }]
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 120
        },
        {
          title: "品牌名称",
          key: "brandName",
          width: 170,
          align: "center"
        },
        {
          title: "活动包名",
          key: "groupName",
          align: "center",
          width: 120
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          width: 120
        },
        {
          title: "分组名称",
          key: "presentName",
          align: "center",
          width: 120
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          width: 120
        },
        {
          title: "店铺名称",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "产品名称",
          key: "joinClass",
          align: "center",
          width: 120
        },
        {
          title: "进货量",
          key: "joinCount",
          align: "center",
          width: 120
        },
        {
          title: "进货标准",
          key: "stdJoinCount",
          align: "center",
          width: 120
        },
        {
          title: "达标情况",
          key: "joinCheckStatus",
          align: "center",
          width: 120,
          render: (h, params) => {
            var str = "";
            if (params.row.joinCheckStatus == 1) {
              str = "合格";
            } else if (params.row.joinCheckStatus == 2) {
              str = "不合格";
            }
            return h("div", str);
          }
        },
        {
          title: "进货周期",
          key: "joinPeriod",
          align: "center",
          width: 120
        },
        {
          title: "上传时间",
          key: "createTime",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        }
      ],
      pageData: [],
      keyList: [],
      brandList: [],
      uploadText: "选择上传文件",
      wordUploadFlag: false, //上传成功标识
      isUpload: false,
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [] //分组
    };
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
  methods: {
    close() {
      this.updatePush = false;
    },
    showUpload() {
      this.updatePush = true;
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      delete data["brandName"];
      queryDisplayRetailPurchases(data).then(res => {
        if (res && res.status === 1) {
          this.pageNum = res.data.items;
          this.page = res.data.page;
          this.pageData = res.data.datalist;
        }
      });
    },
    exportExcel() {
      const url =
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/joinGoodsNew.xlsx";
      window.open(url);
    },
    exportUserExcel() {
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("请选择活动包名");
        return false;
      }

      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "display/quesyStorePresentInfoExport.json",
        data
      );
      window.open(url);
    },
    exportAllExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      delete data["brandName"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "display/brandStoreJoinGoodsExport.json",
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
    getpresentList(value) {
      this.presentNameList = [];
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },

    uploadExcel() {
      if (!this.formData.brandId) {
        this.$Message.warning("请选择品牌或者陈列活动");
        return false;
      }
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("请选择活动包名");
        return false;
      }
      // if (!this.formData.activityId) {
      //   this.$Message.error("请选择活动");
      //   return false;
      // }
      let params = {
        loadFilePath: this.uploadUrl,
        brandId: this.formData.brandId,
        brandName: this.formData.brandName,
        // activityId: this.formData.activityId,
        groupId: this.formData.groupId
      };
      this.isUpload = true;
      //导入
      displayRetailPurchases(params).then(res => {
        if (res.status === 1) {
          this.init();
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
    }
  }
};
</script>