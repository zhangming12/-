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
    <!-- <h2 class="Title">CNY</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="活动时间" required prop="queryTime">
              <DatePicker
                v-model="formData.queryTime"
                placeholder="选择日期跟时间"
                type="datetimerange"
                style="width:100%"
              ></DatePicker>
            </Form-item>
            <Form-item label="签到地址">
              <Input v-model="formData.signAddress"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="业代姓名">
              <Input v-model="formData.workerName"></Input>
            </Form-item>
            <Form-item label="状态">
              <Select v-model="formData.signStatus" clearable>
                <Option value>全部</Option>
                <Option value="0">未签到</Option>
                <Option value="1">已签到</Option>
                <Option value="2">迟到</Option>
                <Option value="3">待签到</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="业代手机">
              <Input v-model="formData.phone"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:24px">
            <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="padding-bottom:20px">
      <div class="contentTop">
        <Button @click="exportExcel" class="btn-right" :disabled="isUpload" type="primary">导出</Button>
        <Button @click="uploadExcel" class="btn-right" style="margin-right:10px" type="primary">上传</Button>

        <wpicture-upload
          :wordUploadFlag="wordUploadFlag"
          @wordPicturnUploadSuccess="picturnUploadSuccess"
        ></wpicture-upload>
        <div class="demo" @click="exportTemplate">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
        <Button @click="ceshiDownload" class="btn-right" style="margin-right:10px" type="primary">测试</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  querySignRecord, //列表
  cnySignRecordImport,
  signDoDelete //删除
} from "@/api/activity-manage/display-activity-manage.js";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";
import { CNYSignStatus } from "@/util/ENUMS.js";
import wpictureUpload from "@/components/word-picture-upload.vue";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "CNY-sign-report-keepAlive",

  components: {
    wpictureUpload
  },
  data() {
    return {
      formData: {
        workerName: "",
        phone: "",
        signAddress: "",

        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME]
      },
      url: config.uploadWorkerExcel,
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      columns1: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "时间",
          key: "signTime",
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.signTime));
          }
        },
        {
          title: "签到点名称",
          key: "signName",
          align: "center"
        },
        {
          title: "签到点地址",
          key: "signAddress",
          align: "center"
        },
        {
          title: "业代姓名",
          key: "workerName",
          align: "center"
        },
        {
          title: "业代手机",
          key: "phone",
          align: "center"
        },
        {
          title: "签到时间",
          key: "realSignTime",
          align: "center",
          render: (h, params) => {
            if (params.row.realSignTime) {
              return h("div", this.Global.createTime(params.row.realSignTime));
            }
            return "";
          }
        },
        {
          title: "状态",
          key: "signStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", CNYSignStatus[params.row.signStatus]);
          }
        },
        {
          title: "操作",
          key: "signStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                        title: "提示",
                        content: "<p>确认要删除吗</p>",
                        onOk: () => {
                          signDoDelete(params.row.id).then(res => {
                            this.init();
                          });
                        },
                        onCancel: () => {}
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
      keyList: [],
      brandList: [],
      activityList: [],
      uploadText: "选择上传文件",
      wordUploadFlag: false, //上传成功标识
      isUpload: false
    };
  },
  created() {},
  methods: {
    ceshiDownload() {
      this.Global.downloadFile("download.file", "", res => {
        console.log(res);
      });
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
        this.formData.queryTime[0]
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryTime[1]);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      delete data.queryTime;
      querySignRecord(data).then(res => {
        if (res && res.status === 1) {
          this.pageNum = res.data.items;
          this.page = res.data.page;
          this.pageData = res.data.datalist;
        }
      });
    },

    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let params = {
        loadFilePath: this.uploadUrl
      };
      this.isUpload = true;
      //导入
      cnySignRecordImport(params).then(res => {
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
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryTime[0]
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryTime[1]);

      this.Global.deleteEmptyProperty(data);
      delete data.queryTime;
      var url = this.Global.getExportUrl(
        "cnySignRecord/cnySignRecordExport.json",
        data
      );
      window.open(url);
    },
    exportTemplate() {
      const url =
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/CNYSignRecord.xlsx";
      window.open(url);
    }
  }
};
</script>


