// 转账导入

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
  & > span {
    margin-right: 10px;
  }
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
      //   overflow-y: auto;
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
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
span.btn {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  padding: 4px 20px;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.2s linear;
  &:hover {
    background-color: #e5e5e5;
  }
}
.upDate {
  cursor: pointer;
  text-align: center;
  border: 1px solid #aeaeae;
  width: 150px;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">转账导入</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <DatePicker
                  type="daterange"
                  v-model="formData.queryTime"
                  split-panels
                  placeholder="发放时间"
                  style="display:block;"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动包名"
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
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.activityId" placeholder="活动名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>

            <div class="btn-left w18">
              <Form-item>
                <Input v-model.trim="formData.userId" placeholder="用户ID" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <Icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
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
                <Form-item required>
                  <Input v-model="formData.batchNo" placeholder="批次号" clearable/>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Select v-model="formData.transferStatus" placeholder="发放状态" clearable>
                    <Option value="0">未发放</Option>
                    <Option value="1">发放成功</Option>
                    <Option value="2">发放失败</Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            金额:
            <span class="numColor">{{mount}}</span>
          </span>
          <span class="btn-left">
            用户:
            <span class="numColor">{{userMount}}</span>
          </span>
          <span class="btn-left">
            记录:
            <span class="numColor">{{recordMount}}</span>
          </span>

          <exportBtn class="btn-right" @btnClick="exportExcel"/>
          <delBtn class="btn-right" @btnClick="sendShow" title="发放"/>
          <detailBtn class="btn-right ml20" @btnClick="showDetail" title="导入结果"/>
          <importBtn class="btn-right" @btnClick="importShow = true"/>
          <Button
            class="btn-right"
            icon="ios-paper-outline"
            type="default"
            @click="dowland"
            style="margin-top:6px;padding:4px;"
          >下载模版</Button>
        </div>
        <hhTable
          :columns="columns1"
          ref="table"
          :pageData="pageData"
          :noneStatus="noneStatus"
          disabled-hover
        ></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>

    <!-- 发放 -->
    <myModal class="myModal" @close="closeModal" :modal="grantShow">
      <div slot="main" class="modal-main">
        <h3>发放</h3>
        <div class="modal-table">
          <i-Form>
            <Form-item label="令牌:" prop="brandId" :label-width="72">
              <Input
                v-model.trim="sendData.transferToken"
                placeholder="令牌"
                style="width:200px;"
                clearable
              />
            </Form-item>
            <Form-item label="安全码:" prop="brandId" :label-width="72">
              <div class="grant">
                <Input
                  v-model.trim="sendData.authCode"
                  placeholder="安全码"
                  style="width:200px;"
                  clearable
                />
                <Button type="default" :disabled="disabledStatus" @click="sendMsg">{{ codeMsg }}</Button>
              </div>
            </Form-item>
          </i-Form>
        </div>
        <div class="maintain-footer">
          <span @click="closeModal" class="btn">取消</span>
          <span @click="sureSend" class="btn">确定发放</span>
        </div>
      </div>
    </myModal>
    <!-- 导入 -->
    <myModal class="myModal" @close="closeModal" :modal="importShow">
      <div slot="main" class="modal-main">
        <h3>导入</h3>
        <div class="modal-table">
          <i-Form>
            <Form-item label="导入文件:" :label-width="100">
              <div style="overflow:hidden;">
                <div class="upDate">
                  <Upload
                    :action="url"
                    :show-upload-list="false"
                    :on-success="handleSuccess"
                    :on-error="handleError"
                    :on-format-error="handleFormatError"
                    :format="['xlsx','xls']"
                  >
                    <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                    {{ uploadText }}
                  </Upload>
                </div>
              </div>
            </Form-item>
            <Form-item label="是否发送短信:" :label-width="100">
              <RadioGroup v-model="importModelData.sendSms">
                <Radio label="1">是</Radio>
                <Radio label="0">否</Radio>
              </RadioGroup>
            </Form-item>
          </i-Form>
        </div>
        <div class="maintain-footer">
          <span @click="closeModal" class="btn">取消</span>
          <span @click="uploadExcel" class="btn">确定</span>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import importBtn from "@/components/Button/import-btn.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
import delBtn from "@/components/Button/del-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
const PHONE = "17362520897"; //接收安全码的手机号
export default {
  name: "capital-flow-record-import-keepAlive",
  data() {
    return {
      recordMount: 0,
      userMount: 0,
      mount: 0,
      codeMsg: "获取安全码",
      disabledStatus: false,
      noneStatus: false,
      importShow: false,
      showQuery: false,

      groupList: [],
      formData: {
        brandId: "",
        groupId: "",
        activityId: "",
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME],
        joinCode: ""
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "发放时间",
          key: "updateTime",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "用户ID",
          key: "userId",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "活动名称",
          key: "groupName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "项目名称",
          key: "activityName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "发放金额",
          key: "amount",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "批次号",
          key: "batchNo",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "发放状态",
          key: "transferStatus",
          align: "center",
          tooltip: true
        },
        {
          title: "发放结果",
          key: "memo",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "操作",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  id: "bottonFather"
                }
              },
              [
                h(
                  "button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    attrs: {
                      id: "primary"
                    },
                    class: {
                      down: !params.row.selectStatus,
                      up: params.row.selectStatus,
                      "ivu-icon": true
                    },
                    on: {
                      click: () => {
                        this.$refs.table.changeExpend(params, this.showList);
                        params.row.selectStatus = !params.row.selectStatus;
                      }
                    }
                  },
                  "详情"
                )
              ]
            );
          }
        }
      ],
      showList: [
        {
          title: "记账摘要",
          key: "summary"
        },
        {
          title: "短信内容",
          key: "smsContent"
        },
        //1 已发送  0 未发送
        {
          title: "通知发放结果",
          key: "smsStatus"
        }
      ],
      uploadText: "选择上传文件",
      deleteUploadText: "选择上传文件",
      pageData: [],
      brandList: [],
      activityList: [],
      grantShow: false,
      sendData: {},
      url: config.uploadWorkerExcel,
      deleteUploadUrl: "",
      importModelData: {}
    };
  },
  components: {
    exportBtn,
    detailBtn,
    myModal,
    delBtn,
    importBtn,
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
    grantShow(val) {
      if (!val) {
        this.sendData = {};
      }
    },
    importShow(val) {
      if (!val) {
        this.importModelData = {};
      }
    }
  },
  methods: {
    //发放
    sendShow() {
      if (!this.formData.batchNo) {
        this.$Message.info("请填写批次号");
        return false;
      }
      if (this.formData.transferStatus != 0) {
        this.$Message.info("请选择状态且状态需为未发放");
        return false;
      }
      this.grantShow = true;
    },
    //获取安全码
    sendMsg() {
      var phone = PHONE;
      this.disabledStatus = true;
      var time = 60;
      this.Global.doPost("liquidate/getTokenAndAuthCode.json", {}, res => {
        this.Global.TimeDown(
          time,
          t => {
            this.codeMsg = t + "S";
          },
          () => {
            this.disabledStatus = false;
            this.codeMsg = "获取安全码";
          }
        );
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
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/template/transferRecordImportTemplate.xlsx"
      );
    },
    sureSend() {
      if (!this.sendData.transferToken) {
        this.$Message.error("令牌不能为空");
        return false;
      }
      if (!this.sendData.authCode) {
        this.$Message.error("安全码不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.sendData);
      Object.assign(data, this.formateData());
      delete data["startTime"];
      delete data["endTime"];
      delete data["transferStatus"];
      this.Global.doPost("liquidate/doTransfer.json", data, () => {
        this.$Message.success("红包发放中，请稍候！");
        this.grantShow = false;
      });
    },
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.importModelData.sendSms) {
        this.$Message.error("请选择是否发送短信");
        return false;
      }

      let data = {
        excelFile: this.uploadUrl,
        sendSms: this.importModelData.sendSms
      };
      this.Global.doPost(
        "liquidate/doSaveTransferRecordFromExcel.json",
        data,
        () => {
          this.$Message.success("导入成功");
          this.init();
          this.importShow = false;
          this.uploadText = "上传文件";
        }
      );
    },
    closeModal() {
      this.grantShow = false;
      this.importShow = false;
    },
    showDetail() {
      this.$router.push({
        path: "/importRecord"
      });
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
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd hh:mm:ss");
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      this.pageNum = 0;
      let data = this.formateData();
      if (!data) return;
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("liquidate/selectTransferRecord.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        for (let i = 0, len = res.datalist.length; i < len; i++) {
          res.datalist[i].updateTime = this.Global.createTime(
            res.datalist[i].updateTime
          );
          res.datalist[i].transferStatus =
            res.datalist[i].transferStatus == 0
              ? "未发放"
              : res.datalist[i].transferStatus == 1
              ? "发放成功"
              : "发放失败";
          res.datalist[i].smsStatus =
            res.datalist[i].smsStatus == 0
              ? "未发送"
              : res.datalist[i].smsStatus == 1
              ? "已发送"
              : "";
        }
        let len = res.datalist.length;
        this.recordMount = res.items;

        if (len) {
          this.userMount = res.datalist[len - 1].userNum
            ? res.datalist[len - 1].userNum
            : 0;
          this.mount = res.datalist[len - 1].sumAmount
            ? res.datalist[len - 1].sumAmount
            : 0;
        } else {
          this.userMount = 0;
          this.mount = 0;
        }
      });
    },
    exportExcel() {
      let data = this.formateData();
      if (!data) return;
      var url = this.Global.getExportUrl(
        "liquidate/transferRecordExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          // if (this.groupList && this.groupList.length) {
          //   this.formData.groupId = this.groupList[0].id;
          //   this.getActivityList(this.formData.groupId);
          // }
        }
      );
    },
    formateData() {
      if (!this.formData.brandId) {
        this.$Message.info("请选择品牌");
        return false;
      }
      let data = this.Global.JsonChange(this.formData);
      if (this.formData.queryTime[0]) {
        data["startTime"] = this.formateTime(
          new Date(this.formData.queryTime[0])
        );
        data["endTime"] = this.formateTime(
          new Date(this.formData.queryTime[1])
        );
      }
      delete data["queryTime"];
      this.Global.deleteEmptyProperty(data);
      return data;
    }
  }
};
</script>