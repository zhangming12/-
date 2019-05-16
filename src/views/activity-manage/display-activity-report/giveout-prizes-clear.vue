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
.ivu-form-item {
  margin-bottom: 20px;
}
.contentTop {
  button {
    margin-left: 10px;
  }
}
.area {
  border-radius: 4px;
  border: 1px solid #dddee1;
  height: 32px;
  padding: 4px 7px;
  line-height: 2;
  cursor: pointer;
  .TextOverflow();
}
.uploadBox {
  overflow: hidden;
  .demo {
    float: left;
    cursor: pointer;
    margin-right: 10px;
  }
  .upDate {
    float: left;
    cursor: pointer;
    text-align: center;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    width: 150px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列折扣清算(按月)</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId">
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="结算周期:" prop="periodMonth">
              <Select v-model="formData.periodMonth" placeholder="请选择时间">
                <Option
                  :value="item.queryMonth"
                  v-for="(item,index) in timeDataList"
                  :key="index"
                >{{ item.queryMonth}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
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
            <Form-item label="客户编号:">
              <Input v-model="formData.joinCode" placeholder="请输入客户编号"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="陈列活动:" prop="activityId">
              <Select v-model="formData.activityId" placeholder="请选择">
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
            <Form-item label="用户ID:">
              <Input v-model="formData.storeId" placeholder="请输入用户ID"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px">
            <Button @click="submit('form')" class="btn-search search_btn" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="contentTop">
        <Button @click="exportExcel" class="btn-right" icon="ios-download-outline" type="error">导出</Button>
        <Button @click="batchAwardStore('form')" class="btn-right" type="primary">发放通知</Button>
        <Button @click="allWorker('form')" class="btn-right" type="success">发放折扣</Button>
        <Button
          @click="modifyDataMethod('form')"
          class="btn-right"
          title="仅已清算记录允许"
          type="primary"
        >修改清算</Button>
        <Button @click="handleClearDisplayActivity" class="btn-right" type="info">开始清算</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <Modal v-model="importShow">
      <h2 style="text-align:center;">修改清算导入</h2>
      <div class="uploadBox">
        <div class="demo" @click="dowland">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
        <div class="upDate">
          <Upload
            :action="urls"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
            <span>{{uploadText}}</span>
          </Upload>
        </div>
      </div>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="uploadExcel">确定</i-button>
      </div>
    </Modal>
    <Modal v-model="treeShow" @on-ok="areaList">
      <div style="height: 400px; overflow-y:auto;">
        <Tree :data="areaData" ref="tree" multiple show-checkbox></Tree>
      </div>
    </Modal>
  </div>
</template>

<script>
let auditCountQualified = {
  "1": "合格",
  "0": "不合格"
};
import area from "@/config/areaCode.js";
import config from "@/util/config.js";
import {
  callDisplayAwardPrice //全部发奖
} from "@/api/activity-manage/display-activity-manage.js";
import {
  mergeGiveAwardStatus,
  mergeGiveAwardCheckStatus,
  mergeGiveAwardRecStatus
} from "@/util/ENUMS.js";
export default {
  name: "giveout-prizes-clear-keepAlive",
  data() {
    return {
      urls: config.uploadWorkerExcel,
      uploadText: "选择导入文件",
      importShow: false,
      showQuery: false,
      groupList: [],
      treeShow: false,
      areaData: area,
      formData: {
        brandId: "",
        periodMonth: "", //结算周期
        activityId: "",

        activityTag: "",
        joinCode: "",
        joinCode: "",
        gorupId: "",
        storeId: "",
        workerPhone: "",
        areaCode: "",

        workerName: "",
        uploadCount: "",
        uploadCountOper: "",
        auditCount: "",
        auditCountOper: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        periodMonth: [{ required: true, message: "选择日期跟时间" }],
        brandId: [{ required: true, message: "选择品牌名称" }]
      },

      columns1: [
        {
          title: "陈列活动",
          key: "activityName",
          width: 100,
          align: "center"
        },
        {
          title: "分组名称",
          width: 100,
          key: "activityTag",
          align: "center"
        },

        {
          title: "上传周期",
          width: 100,
          key: "uploadPeriod",
          align: "center"
        },
        {
          title: "清算周期",
          width: 100,
          key: "periodMonth",
          align: "center"
        },

        {
          title: "标准费用",
          width: 100,
          key: "periodAmount",
          align: "center"
        },
        {
          title: "用户ID",
          key: "storeId",
          width: 100,
          align: "center"
        },
        {
          title: "客户编号",
          key: "joinCode",
          width: 100,
          align: "center"
        },
        {
          title: "店名",
          key: "storeName",
          width: 100,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 100,
          align: "center"
        },
        {
          title: "手机",
          key: "phone",
          width: 100,
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          width: 100,
          align: "center"
        },
        {
          title: "业代姓名",
          key: "workerName",
          width: 100,
          align: "center"
        },
        {
          title: "业代手机",
          key: "workerPhone",
          width: 100,
          align: "center"
        },
        {
          title: "上传次数",
          key: "uploadCount",
          width: 100,
          align: "center"
        },
        {
          title: "合格次数",
          key: "auditCount",
          width: 100,
          align: "center"
        },
        {
          title: "不合格次数",
          width: 100,
          key: "",
          align: "center",
          render: (h, params) => {
            return params.row.uploadCount - params.row.auditCount;
          }
        },

        {
          title: "待审核数",
          key: "waitAuditCount",
          width: 100,
          align: "center"
        },
        {
          title: "待上传数",
          key: "waitUploadOpenCount",
          width: 100,
          align: "center"
        },
        {
          title: "上传关闭数",
          key: "waitUploadCloseCount",
          width: 100,
          align: "center"
        },
        {
          title: "视频合格情况",
          key: "auditCountQualified",
          width: 120,
          align: "center",
          render: (h, params) => {
            return auditCountQualified[params.row.auditCountQualified];
          }
        },

        {
          title: "目标进货量",
          width: 100,
          key: "periodJoinCountInfo",
          align: "center"
        },
        {
          title: "实际进货量",
          width: 100,
          key: "joinCountInfo",
          align: "center"
        },
        {
          title: "进货量达标情况",
          key: "joinCountQualified",
          width: 100,
          align: "center",
          render: (h, params) => {
            return auditCountQualified[params.row.joinCountQualified];
          }
        },

        {
          title: "折扣",
          width: 100,
          key: "liquidateAmount",
          align: "center"
        },
        {
          title: "清算状态",
          width: 100,
          key: "status",
          align: "center",
          render: (h, params) => {
            return mergeGiveAwardStatus[params.row.status];
          }
        },
        {
          title: "审查状态",
          width: 100,
          key: "checkStatus",
          align: "center",
          render: (h, params) => {
            //1正常 2异常
            return mergeGiveAwardCheckStatus[params.row.checkStatus];
          }
        },
        {
          title: "是否提现",
          width: 100,
          key: "recStatus",
          align: "center",
          render: (h, params) => {
            //1正常 2异常
            if (
              params.row.status == "4040" ||
              params.row.status == "9090" ||
              params.row.status == "-1"
            ) {
              return "无奖金";
            }
            return mergeGiveAwardRecStatus[params.row.recStatus];
          }
        },
        {
          title: "格式",
          key: "fileType",
          width: 100,
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
                        data: JSON.stringify(params.row),
                        brandId: 1,
                        type: 1,
                        time: "month"
                      };
                      this.$router.push({
                        path: "/displayClearDetail",
                        query: queryParams
                      });
                    }
                  }
                },
                "查看"
              )
            );
            if (params.row.status == 1010) {
              buttonArray.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let queryParams = {
                          brandId: 1,
                          data: JSON.stringify(params.row),
                          type: 2,
                          time: "month"
                        };
                        this.$router.push({
                          path: "/displayClearDetail",
                          query: queryParams
                        });
                      }
                    }
                  },
                  "修改"
                )
              );
            }

            return h("div", buttonArray);
          }
        }
      ],
      url: "",
      pageData: [],
      brandList: [],
      activityList: [],
      timeDataList: [],
      bizAreaList: "",
      areaName: "请选择区域"
    };
  },
  components: {},
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 15, activityType: 3, scope: "a", liquidatePeriod: "M" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        this.formData.brandId = this.brandList[0].id;
        // this.$set(this.formData, "brandId", this.brandList[0].id);
        this.changeValue(this.formData.brandId);
      }
    );
  },
  methods: {
    modifyDataMethod(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.importShow = true;
        } else {
          this.$Message.info("请选择查询条件！");
        }
      });
    },
    uploadExcel() {
      if (!this.url) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      console.log(data);
      data["callBackExcelFile"] = this.url;
      this.Global.doPost(
        "liquidate/doReviseLiquidateFromExcel.json",
        data,
        () => {
          this.$Message.success(res);
          this.importShow = false;
          this.uploadText = "选择导入文件";
        }
      );
    },
    cancel() {
      this.importShow = false;
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.url = url;
      }
    },
    //下载模板
    dowland() {
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/template/%E6%8A%98%E6%89%A3%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF%28%E5%8A%A1%E5%BF%85%E6%8C%89%E7%85%A7%E6%A0%BC%E5%BC%8F%E5%A1%AB%E5%86%99%E6%95%B0%E6%8D%AE%29.xlsx"
      );
    },
    batchAwardStore(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = this.Global.JsonChange(this.formData);
          this.Global.deleteEmptyProperty(data);
          console.log(data);
          this.Global.doPost(
            "liquidate/doSendAwardPriceNotify.json",
            data,
            res => {
              this.$Message.success(res);
            }
          );
        }
      });
    },
    allWorker(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = this.Global.JsonChange(this.formData);
          this.Global.deleteEmptyProperty(data);
          console.log(data);
          this.Global.doPost(
            "liquidate/doDisplayAwardPrice.json",
            data,
            res => {
              this.$Message.success(res);
            }
          );
        }
      });
    },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["areaCode"] = this.bizAreaList;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("liquidate/queryDisplayLiquidate.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      if (
        !this.formData.brandId ||
        !this.formData.groupId ||
        !this.formData.periodMonth
      ) {
        this.$Message.warning("品牌名称、陈列活动及结算周期不能为空");
        return;
      }
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "liquidate/exportDisplayLiquidate.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryGroup.json",
        {
          date: 15,
          activityType: 3,
          scope: "a",
          brandId: value,
          liquidatePeriod: "M"
        },
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
      this.Global.doPost(
        "condition/queryActivity.json",
        {
          date: 15,
          activityType: 3,
          scope: "a",
          groupId: value,
          liquidatePeriod: "M"
        },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
      this.Global.doPost("liquidate/getActGroupMonthDict.json", value, res => {
        if (res && res) {
          let timeDataList = [];
          for (const key in res) {
            let item = {
              queryMonth: res[key]
            };
            timeDataList.push(item);
          }
          this.timeDataList = timeDataList;
        }
      });
    },
    handleClearDisplayActivity() {
      if (
        !this.formData.brandId ||
        !this.formData.groupId ||
        !this.formData.periodMonth
      ) {
        this.$Message.warning("品牌名称、陈列活动包及结算周期不能为空");
        return;
      }
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("liquidate/doDisplayLiquidate.json", data, res => {
        this.$Message.success(res);
      });
    },
    handleAllAward() {
      if (
        !this.formData.brandId ||
        !this.formData.activityId ||
        !this.formData.periodMonth
      ) {
        this.$Message.warning("品牌名称、陈列活动及结算周期不能为空");
        return;
      }
      let params = {
        brandId: this.formData.brandId,
        activityId: this.formData.activityId,
        periodMonth: this.formData.periodMonth
      };
      this.$Modal.confirm({
        content: "确认发放奖励",
        onOk: () => {
          callDisplayAwardPrice(params).then(res => {
            if (res && res.data === 0) {
              /* this.$Modal.warning({                        
                                    content: '发放中'
                                }); */
              this.$Message.warning("发放中");
            } else if (res && res.data === 1) {
              /* this.$Modal.success({                        
                                    content: '发放成功'
                                }); */
              this.$Message.warning("发放成功");
            }
          });
        }
      });
    },
    showTree: function() {
      this.treeShow = !this.treeShow;
      var treeData = this.$refs.tree.getCheckedNodes();

      for (const key in treeData) {
        if (treeData[key].checked) {
          treeData[key].checked = false;
        }
      }
    },
    areaList() {
      var treeData = this.$refs.tree.getCheckedNodes();
      var arr = [];
      var areaName = "";
      for (var i = 0; i < treeData.length; i++) {
        arr.push(treeData[i].value);
        areaName += treeData[i].title + "/";
      }

      this.bizAreaList = arr.join();
      this.areaName = areaName;
    }
  }
};
</script>


