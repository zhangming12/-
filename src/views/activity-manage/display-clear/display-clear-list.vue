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

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  button {
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
    <!-- <h2 class="Title">陈列折扣清算(按周)</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId" required>
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>

            <Form-item label="时间:" prop="weeks">
              <Select v-model="formData.weeks" clearable @on-change="changeTime" v-if="showTime">
                <Option
                  v-for="(item, key, index) in timeList"
                  :value="key"
                  :key="index"
                >{{ key.split("_")[0] }}年 第{{ key.split("_")[1] }}周 日期：{{ item[0] | formatDate}}-{{ item[1] | formatDate}}</Option>
              </Select>
            </Form-item>
            <Form-item label="用户ID:">
              <Input v-model="formData.storeId" placeholder="请输入用户ID"></Input>
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
            <Form-item label="分组名称:">
              <Select v-model="formData.activityTag" clearable>
                <Option
                  v-for="(item, index) in presentNameList"
                  :value="item.activityTag"
                  :key="index"
                >{{ item.activityTag }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="陈列活动:" prop="activityId">
              <Select v-model="formData.activityId" @on-change="getpresentList" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>

            <Form-item label="门店编号:">
              <Input v-model="formData.joinCode" placeholder="请输入门店编号"></Input>
            </Form-item>
          </Col>

          <Col span="2" offset="1">
            <Button @click="submit('form')" class="btn-search search_btn" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="padding-bottom:20px">
      <div class="contentTop">
        <Button class="btn-right" @click="exportExcel('form')" type="error">导出</Button>
        <Button @click="batchAwardStore('form')" class="btn-right" type="primary">发放通知</Button>
        <Button @click="allWorker('form')" class="btn-right" type="success">发放折扣</Button>
        <Button @click="modifyDataMethod('form')" class="btn-right" type="primary">修改清算</Button>
        <Button @click="startClear('form')" class="btn-right" type="info">开始清算</Button>
      </div>
      <Table :columns="columns" :data="pageData" @on-selection-change="changeList" disabled-hover></Table>
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
  </div>
</template>

<script>
import {
  mergeGiveAwardCheckStatus,
  gdSyntheticalStatus,
  mergeGiveAwardStatus,
  mergeGiveAwardRecStatus,
  distributionStatus //发放状态
} from "@/util/ENUMS.js";

import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import configs from "@/util/config.js";
export default {
  name: "display-clear-list-keepAlive",
  data() {
    return {
      urls: configs.uploadWorkerExcel,
      uploadText: "选择导入文件",
      url: "",
      importShow: false,
      pageSize: 10,
      formData: {
        weeks: "",
        periodMonth: "",
        startTime: "",
        endTime: "",
        joinCode: "",
        storeId: "",
        joinCode: "",
        workerName: "",
        workerPhone: "",
        brandId: "",
        groupId: ""
      },
      showTime: true,
      timeList: {},
      activityList: [],
      brandList: [],
      groupList: [],
      selectList: [],
      presentNameList: [],
      areaName: "请选择区域",
      page: 1,
      pageNum: 0,
      rule: {
        weeks: [{ required: true, message: "请选择时间" }]
      },
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "陈列活动",
          key: "activityName",
          width: 150,
          align: "center"
        },
        {
          title: "分组名称",
          key: "activityTag",
          width: 200,
          align: "center"
        },
        {
          title: "清算时间",
          key: "liquidateTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              new Date(params.row.liquidateTime).pattern("yyyy-MM-dd HH:mm:ss")
            );
          }
        },
        {
          title: "清算周期",
          key: "periodMonth",
          width: 100,
          align: "center"
        },
        {
          title: "标准费用",
          key: "periodAmount",
          width: 120,
          align: "center"
        },
        {
          title: "用户ID",
          key: "storeId",
          width: 150,
          align: "center"
        },
        {
          title: "客户编号",
          key: "joinCode",
          width: 150,
          align: "center"
        },
        {
          title: "店名",
          key: "storeName",
          width: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          width: 120,
          align: "center"
        },
        {
          title: "手机",
          key: "phone",
          width: 120,
          align: "center"
        },
        {
          title: "省",
          key: "province",
          width: 160,
          align: "center"
        },
        {
          title: "市",
          key: "city",
          width: 100,
          align: "center"
        },
        {
          title: "区",
          key: "area",
          width: 100,
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          width: 200,
          align: "center"
        },
        {
          title: "线路编号",
          key: "salesRoute",
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
          width: 130,
          align: "center"
        },
        {
          // 1 hei 0 fou
          title: "客户状态",
          key: "isBlack",
          width: 100,
          align: "center",
          render: (h, params) => {
            return this.Global.ENUMS.blackType[params.row.isBlack];
          }
        },
        {
          // 1 合适  0 不合格
          title: "视频审核结果",
          key: "auditCountQualified",
          width: 120,
          align: "center",
          render: (h, params) => {
            return gdSyntheticalStatus[params.row.auditCountQualified];
          }
        },
        {
          // 未更新
          title: "进货达标情况",
          key: "joinCountQualified",
          width: 130,
          align: "center",
          render: (h, params) => {
            let str = "";
            if (params.row.joinCountQualified == 0) {
              str = "不合格";
            } else if (params.row.joinCountQualified == 1) {
              str = "合格";
            } else {
              str = "";
            }
            return h("div", str);
          }
        },
        {
          title: "折扣奖励",
          key: "liquidateAmount",
          width: 100,
          align: "center"
        },
        {
          //1 zhengchang 2 yichang
          title: "综合判定结果",
          key: "checkStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            return mergeGiveAwardCheckStatus[params.row.checkStatus];
          }
        },
        {
          //1010 已清算 4已发奖 0待清算 1带参与
          title: "清算状态",
          key: "status",
          width: 100,
          align: "center",
          render: (h, params) => {
            return mergeGiveAwardStatus[params.row.status];
          }
        },
        {
          title: "发放状态",
          key: "winStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            let status = "";
            if (params.row.status == 4) {
              status = "发放至店铺";
            } else if (params.row.submitStatus == 1) {
              status = "发放至品牌";
            } else if (params.row.submitStatus == 0) {
              status = "未发放";
            }
            return h("div", status);
          }
        },
        {
          title: "提现状态",
          key: "recStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            if (params.row.recStatus) {
              return mergeGiveAwardRecStatus[params.row.recStatus];
            } else {
              return "未发放";
            }
          }
        },
        {
          title: "备注",
          key: "memo",
          width: 150,
          align: "center"
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
                        time: "week"
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
                          time: "week"
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

      pageData: [],

      showQuery: false
    };
  },
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 15, activityType: 3, scope: "a", liquidatePeriod: "W" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        this.formData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId);
      }
    );
  },

  methods: {
    showTimeM() {
      this.showTime = false;
      this.$nextTick(() => {
        this.showTime = true;
      });
    },
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
      data["weeks"] = parseInt(data["weeks"].split("_")[1], 10);
      this.Global.deleteEmptyProperty(data);
      data["callBackExcelFile"] = this.url;
      this.Global.doPost(
        "liquidate/doReviseLiquidateFromExcel.json",
        data,
        res => {
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
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changeTime(value) {
      if (value) {
        this.formData.startTime = new Date(this.timeList[value][0]).pattern(
          "yyyy-MM-dd HH:mm:ss"
        );
        this.formData.endTime =
          new Date(this.timeList[value][1]).pattern("yyyy-MM-dd") + " 23:59:59";
      }
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
          liquidatePeriod: "W"
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
          liquidatePeriod: "W"
        },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
      this.Global.doPost("liquidate/getWeeksList.json", value, res => {
        this.formData.weeks = "";
        this.timeList = res;
        this.showTimeM();
      });
    },
    getpresentList(value) {
      this.presentNameList = [];
      this.formData.activityTag = "";
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["periodMonth"] = parseInt(data["weeks"].split("_")[1], 10);
      data["pageSize"] = this.pageSize;
      delete data["queryStartTime"];
      delete data["queryEndTime"];
      delete data["weeks"];
      this.Global.doPost("liquidate/queryDisplayLiquidate.json", data, res => {
        if (res) {
          this.pageNum = res.items;
          this.pageData = res.datalist;
          this.page = res.page;
        } else {
          this.page = 1;
          this.pageData = [];
          this.pageNum = 0;
        }
      });
    },
    exportExcel(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          var data = this.Global.JsonChange(this.formData);
          data["periodMonth"] = parseInt(data["weeks"].split("_")[1], 10);
          delete data["weeks"];
          this.Global.deleteEmptyProperty(data);
          var url = this.Global.getExportUrl(
            "liquidate/exportDisplayLiquidate.json",
            data
          );
          window.open(url);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    startClear(name) {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      this.$refs[name].validate(valid => {
        if (valid) {
          data["weeks"] = parseInt(data["weeks"].split("_")[1], 10);
          this.Global.doPost("liquidate/doDisplayLiquidate.json", data, res => {
            this.$Message.success(res);
          });
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changeList(selectList) {
      for (const a of selectList) {
        this.selectList.push(a.id);
      }
    },
    batchWorker(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.selectList.length > 0) {
            let { brandId, groupId, weeks, startTime, endTime } = this.formData;
            // "displayYxtg/batchSubmitLiquidateRecordToWorker.json",
            weeks = parseInt(weeks.split("_")[1], 10);
            this.Global.doPost(
              "displayYxtg/batchAwardPrice.json",
              {
                brandId,
                groupId,
                weeks,
                startTime,
                endTime,
                idList: this.selectList
              },
              res => {
                this.$Message.success("操作成功");
                this.init();
              }
            );
          } else {
            this.$Message.error("请选择发放列表!");
          }
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    allWorker(name) {
      if (!this.formData.weeks) {
        this.$Message.error("请选择查询条件");
        return;
      }
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      data["weeks"] = parseInt(data["weeks"].split("_")[1], 10);
      this.Global.deleteEmptyProperty(data);

      delete data["queryStartTime"];
      delete data["queryEndTime"];
      this.Global.doPost("liquidate/doDisplayAwardPrice.json", data, res => {
        this.$Message.success(res);
      });
    },
    batchAwardStore(name) {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      data["weeks"] = parseInt(data["weeks"].split("_")[1], 10);
      this.Global.deleteEmptyProperty(data);

      delete data["queryStartTime"];
      delete data["queryEndTime"];

      this.Global.doPost("liquidate/doSendAwardPriceNotify.json", data, res => {
        this.$Message.success(res);
      });
    },
    allAwardStore(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let { brandId, groupId, weeks, startTime, endTime } = this.formData;
          weeks = parseInt(weeks.split("_")[1], 10);
          this.Global.doPost(
            "displayYxtg/callAllAwardPrice.json",
            {
              brandId,
              groupId,
              weeks,
              startTime,
              endTime
            },
            res => {
              this.$Message.success("操作成功");
              this.init();
            }
          );
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    }
  },
  filters: {
    formatDate(t) {
      // return new Date(t).pattern("yyyy-MM-dd");
      return new Date(t).pattern("MM-dd");
    },
    formatYear(t) {
      return new Date(t).pattern("yyyy");
    }
  }
};
</script>