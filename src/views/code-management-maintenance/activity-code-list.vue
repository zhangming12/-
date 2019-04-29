<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
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
    color: #333;
    cursor: pointer;
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

.vertical-center-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .ivu-modal {
    top: 0;
  }
  video {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
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
.showRadio {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -250px;
  // border: 1px solid black;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #f5f7f9;
  border-radius: 5px;
  .close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
}
.numberInput {
  border: 1px solid #dddee1;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 0 0 7px;
  text-align: left;
  outline: 0;
  -moz-appearance: textfield;
  color: #666;
  border-radius: 4px;
  transition: all 0.2s linear;
}
.tableBox {
  position: relative;
  min-height: 400px;
  padding-bottom: 70px;
  margin-top: 15px;
  overflow: hidden;
  .pages {
    position: absolute;
    bottom: 20px;
    right: 20px;
    // margin: 10px;
    overflow: hidden;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">活动码包列表</h2> -->
    <div class="box">
      <Form :model="formData" :label-width="85">
        <Row>
          <Col span="21">
            <Row>
              <Col span="8">
                <Form-item label="品牌名称:">{{formData.brandName}}</Form-item>
                <Form-item label="流水线:">{{formData.pipeLine}}</Form-item>
              </Col>
              <Col span="8">
                <Form-item label="活动包名:">{{formData.groupName}}</Form-item>
                <Form-item label="投放终端:">{{formItem.qrUseType | userFilter}}</Form-item>
              </Col>
              <Col span="8">
                <Form-item label="活动名称:">{{formData.activityName}}</Form-item>
                <Form-item label="识别明码:">{{ formItem.useMemoCode | codeFilter}}</Form-item>
              </Col>
            </Row>
            <Row>
              <Col span="6">
                <Form-item label="流水串号:">{{ formItem.flowingNum | codeFilter}}</Form-item>
              </Col>
              <Col span="13">
                <Form-item label="时间:">
                  <Row>
                    <Col span="11">
                      <Form-item>
                        <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center;">至</Col>
                    <Col span="11">
                      <Form-item>
                        <data-range hour="24:00" placeholder="结束时间" v-model="formData.queryEndTime"></data-range>
                      </Form-item>
                    </Col>
                  </Row>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1" style="margin-top:10px">
            <Button @click="submit" class="btn-search search_btn" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box tableBox">
      <div class="contentTop">
        <Button
          class="btn-export"
          @click="newBuildModel=true"
          type="primary"
          style="width:120px;"
        >生成码包</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div class="pages">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <Modal v-model="newBuildModel" width="900">
      <h2 style="text-align:center;margin-bottom:20px;">生成码包</h2>
      <i-Form ref="form" :label-width="90" :model="formItem" :rules="rule">
        <Row>
          <Col span="8">
            <Form-item label="品牌名称:" required>
              <i-input readonly v-model="formData.brandName"></i-input>
            </Form-item>
            <Form-item label="投放终端:" required>{{formItem.qrUseType | userFilter}}</Form-item>
            <Form-item label="生成码量:" prop="totalCode" required>
              <input
                type="number"
                v-model="formItem.totalCode"
                min="1"
                max="20"
                class="numberInput"
              >
            </Form-item>
            <Form-item label="单码包冗余:">
              <input
                type="number"
                v-model="formItem.codePacketRedundancy"
                min="1"
                max="20"
                class="numberInput"
              >
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="活动包名:" required>
              <i-input readonly v-model="formData.groupName"></i-input>
            </Form-item>
            <Form-item
              label="识别明码:"
              prop="useMemoCode"
              required
            >{{ formItem.useMemoCode | codeFilter}}</Form-item>
            <Form-item label="每码包码量:" prop="planQuantity" required>
              <!-- <Input-number :max="10" :min="1" :value="1"></Input-number> -->
              <input
                type="number"
                min="1"
                max="2000000"
                v-model="formItem.planQuantity"
                class="numberInput"
              >
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="活动名称:" required>
              <i-input readonly v-model="formData.activityName"></i-input>
            </Form-item>
            <Form-item
              label="流水串号:"
              prop="flowingNum"
              required
            >{{ formItem.flowingNum | codeFilter}}</Form-item>
            <Form-item label="码包个数:" required>
              <i-input readonly v-model="packageNumber" placeholder="非填写,自动计算"></i-input>
            </Form-item>
          </Col>
        </Row>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="sureCreate('form')">确定</i-button>
      </div>
    </Modal>
    <Modal v-model="isShow" width="500">
      <h3 style="text-align:center;" slot="header">下载码包</h3>
      <Form :label-width="120">
        <Form-item label="验证码：">
          <Row>
            <Col span="16">
              <Input placeholder="请输入验证码" v-model.trim="editData.code"></Input>
            </Col>
            <Col span="6" offset="2">
              <Button @click="sendMsg()" :disabled="disabledStatus">{{codeMsg}}</Button>
            </Col>
          </Row>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button @click="downloadCode">下载码包</Button>
        <Button @click="isShow = false">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import dataRange from "@/components/data-range/data-range.vue";
import DEV_CONFIG from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
export default {
  name: "activity-code-list",
  data() {
    const validateTotal = (rule, value, callback) => {
      // 验证结束时间
      if (!value) {
        callback(new Error("不能为空"));
      } else {
        if (value <= 0) {
          callback(new Error("必须大于0"));
        } else if (value.toString().indexOf(".") != -1) {
          callback(new Error("必须为正整数"));
        } else {
          callback();
        }
      }
    };
    const validateSingle = (rule, value, callback) => {
      // 验证结束时间
      if (!value) {
        callback(new Error("不能为空"));
      } else {
        if (value <= 0) {
          callback(new Error("必须大于0"));
        } else if (value.toString().indexOf(".") != -1) {
          callback(new Error("必须为正整数"));
        }
        {
          callback();
        }
      }
    };
    return {
      codeMsg: "发送验证码",
      disabledStatus: false,
      newBuildModel: false,
      isShow: false,
      editData: {
        code: null
      },
      formItem: {
        brandId: "",
        activityId: "",
        groupId: "",
        flowingNum: "", //流水串号
        useMemoCode: "", //识别明码
        qrUseType: "", //投放终端
        codePackageNu: "", //码包数量
        totalCode: null, //码总量
        planQuantity: null, //单码包码数量
        codePacketRedundancy: null, //码包冗余量
        qrRuleId: "" //规则ID
      },
      zipFile: null,
      screenWidth: document.body.clientWidth,
      showQuery: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        activityName: "", //活动名称
        brandName: "", //品牌名称
        groupId: "", //活动包名ID
        groupName: "",
        brandId: "",
        activityId: "",
        codeNum: "", //码包号
        pipeLine: "", //流水线
        qrRuleId: "" //规则ID
      },
      batchId: "",
      rule: {
        planQuantity: [
          { validator: validateSingle, trigger: "blur" },
          { trigger: "blur" }
        ],
        totalCode: [
          { validator: validateTotal, trigger: "blur" },
          { trigger: "blur" }
        ]
      },
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center"
        },
        {
          title: "任务号",
          key: "taskNo",
          align: "center"
        },
        {
          title: "生成时间",
          key: "createTime",
          align: "center",
          render: (h, f) => {
            return h("div", this.Global.createTime(f.row.createTime));
          }
        },
        {
          title: "码量",
          key: "codeNum",
          align: "center"
        },
        {
          title: "码包数",
          key: "packageNum",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            if (params.row.zipFile) {
              var tag = [
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
                        this.zipFile = params.row.zipFile;
                        this.isShow = true;
                        this.batchId = params.row.batchId;
                      }
                    }
                  },
                  "下载"
                )
              ];
              return h("div", tag);
            } else {
              return h("div", " ");
            }
          }
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      // phone: "15168325218", //西鲁手机号
      phone: DEV_CONFIG.phone //荣杰手机号
    };
  },
  created() {
    this.formData.activityId = this.$route.query.activityId;
    this.formData.brandId = this.$route.query.brandId;
    this.formData.groupId = this.$route.query.groupId;
    this.formData.qrRuleId = this.$route.query.qrRuleId;
    this.getPackageInformation(this.formData);
  },
  watch: {
    isShow(val) {
      if (!val) {
        this.editData.code = null;
      }
    },
    newBuildModel(val) {
      if (!val) {
        this.formItem.codePackageNu = null;
        this.formItem.totalCode = null;
        this.formItem.planQuantity = null;
        this.formItem.codePacketRedundancy = null;
      }
    }
  },
  components: {
    dataRange
  },
  computed: {
    packageNumber() {
      if (this.formItem.totalCode && Number(this.formItem.totalCode) > 0) {
        if (
          this.formItem.planQuantity &&
          Number(this.formItem.planQuantity) > 0
        ) {
          this.formItem.codePackageNu = Math.ceil(
            Number(this.formItem.totalCode) / Number(this.formItem.planQuantity)
          );
        }
      } else {
        this.formItem.codePackageNu = "";
      }

      return this.formItem.codePackageNu;
    }
  },
  methods: {
    downloadCode() {
      if (!this.editData.code) {
        this.$Message.error("请输入验证码");
        return false;
      }
      let data = {
        authCode: this.editData.code,
        phone: this.phone
      };
      this.Global.doPost("codepackage/checkAuthCode.json", data, res => {
        this.$Modal.confirm({
          title: "警告",
          content: "确定下载该码包？",
          onOk: () => {
            this.downloadPackage(this.zipFile);
            this.isShow = false;
          }
        });
      });
      return;
    },
    sendMsg() {
      if (!this.Global.checkPhone(this.phone)) {
        this.$Message.error("请输入正确的手机号");
        return false;
      }
      this.disabledStatus = true;
      var time = 60;
      this.Global.doPost(
        "sendPackageCodeAuthCode.json",
        { phone: this.phone, smsBizCode: "user_regist", batchId: this.batchId },
        res => {
          this.Global.TimeDown(
            time,
            t => {
              this.codeMsg = t + "S";
            },
            () => {
              this.disabledStatus = false;
              this.codeMsg = "发送验证码";
            }
          );
        }
      );
    },
    sureCreate(name) {
      if (!this.formItem.totalCode && !this.formItem.planQuantity) {
        this.$Message.info("必选条件不能为空");
        return false;
      }

      this.$refs[name].validate(valid => {
        if (valid) {
          if (!this.formItem.codePacketRedundancy) {
            this.formItem.codePacketRedundancy = 0;
          }
          let data = this.Global.JsonChange(this.formItem);
          data["brandName"] = this.formData.brandName;
          data["activityName"] = this.formData.activityName;
          data["brandId"] = this.formData.brandId;
          data["activityId"] = this.formData.activityId;
          delete data["totalCode"];
          data["codePacketRedundancy"] = Number(data["codePacketRedundancy"]);
          data["planQuantity"] = Number(data["planQuantity"]);
          this.Global.deleteEmptyProperty(data);
          this.Global.doPost(
            "codepackage/productcodepackage.json",
            data,
            res => {
              this.$Message.info("码包生成中，请稍后！");
              this.cancel();
              this.init();
            }
          );
        } else {
          this.$Message.error("必选项不能为空!");
        }
      });
    },
    cancel() {
      this.newBuildModel = false;
    },
    //下载码包
    downloadPackage(zipFile) {
      let url = this.Global.getExportUrl("download.file", `qrfile/${zipFile}`);
      window.open(url);
    },
    getPackageInformation(row) {
      let { brandId, activityId, groupId, qrRuleId } = row;
      let data = {
        brandId,
        groupId,
        activityId,
        qrRuleId
      };
      this.Global.doPost("codepackage/showinformation.json", data, res => {
        this.formData.activityName = res.activityName;
        this.formData.brandName = res.brandName;
        this.formData.groupName = res.groupName;
        this.formData.pipeLine = res.pipeLine;

        this.formItem.flowingNum = res.flowingNum;
        this.formItem.useMemoCode = res.useMemoCode;
        this.formItem.qrUseType = res.qrUseType;
        this.formItem.qrRuleId = res.qrRuleId;
      });
    },
    changeValue(value) {
      this.groupList = [];
      queryActivityGroupVOByBrandId(value).then(res => {
        if (res && res.status == 1) {
          this.groupList = res.data;
        }
      });
    },
    getActivityList(value) {
      this.activityList = [];
      queryActivityVOByGroupId(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data;
        }
      });
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
      let data = {};
      if (this.formData.codeNum) {
        data["codeNum"] = this.formData.codeNum;
      }
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["qrRuleId"] = this.formItem.qrRuleId;
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["activityId"] = this.formData.activityId;
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      data["brandId"] = 1;
      delete data["brandName"];
      delete data["groupName"];
      delete data["activityName"];

      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "codepackage/queryonecodepackageinfo.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    }
  },
  filters: {
    codeFilter(val) {
      let str = "";
      switch (Number(val)) {
        case 0:
          str = "否";
          break;
        case 1:
          str = "是";
          break;
        default:
          str = "";
          break;
      }
      return str;
    },
    userFilter(val) {
      let str = "";
      switch (val) {
        case "B":
          str = "门店";
          break;
        case "C":
          str = "消费者";
          break;
        default:
          str = "";
          break;
      }
      return str;
    }
  }
};
</script>