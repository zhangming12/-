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
</style>

<template>
  <div id="Main">
    <h2 class="Title">陈列结果清算发奖</h2>
    <div class="box">
      <Form ref="form" :model="formData" :label-width="85">
        <Row>
          <Col span="9">
            <Form-item label="上传时间:">
              <Row>
                <Col span="11">
                  <Form-item>
                    <Date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="formData.queryStartTime"
                    ></Date-picker>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align:center">至</Col>
                <Col span="11">
                  <Form-item>
                    <Date-picker
                      type="datetime"
                      placeholder="选择日期"
                      v-model="formData.queryEndTime"
                      @on-change="dataChange"
                    ></Date-picker>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
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
          <Col span="6">
            <Form-item label="品牌名称:" prop="brandId">
              <Select
                v-model="formData.brandId"
                placeholder="请选择"
                @on-change="changeValue"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="分组名称:" prop="presentId">
              <Select v-model="formData.presentId" placeholder="请选择" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in presentNameList"
                  :key="index"
                >{{ item.activityTag }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="6">
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
            <Form-item label="客户编号:" prop="joinCode">
              <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px">
            <div class="searchBox">
              <Button @click="submit()" class="btn-search search_btn" type="primary">查询</Button>
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
            <Col span="9">
              <Form-item label="门店名称:">
                <Input v-model.trim="formData.storeName" placeholder="请输入门店名称"></Input>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="用户ID:">
                <Input v-model.trim="formData.storeId" placeholder="请输入用户ID"></Input>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="业代手机:">
                <Input v-model.trim="formData.workerPhone" placeholder="请输入业代手机"></Input>
              </Form-item>
            </Col>
            <Col span="9">
              <Form-item label="区域:">
                <Input v-model.trim="formData.workerPhone" placeholder="请输入区域"></Input>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="业代姓名:">
                <Input v-model.trim="formData.workerName" placeholder="请输入业代姓名"></Input>
              </Form-item>
            </Col>
          </Row>
        </transition>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;">
      <div class="contentTop">
        <Button
          class="btn-export"
          icon="ios-download-outline"
          @click="exportExcel"
          type="primary"
        >导出</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
    </div>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
      </div>
    </div>
    <button @click="showVideoPlay=true">按钮</button>
    <Modal v-model="showVideoPlay" :width="800">
      <div>
        <Form :label-width="85" label-position="left">
          <Row>
            <Col span="8" offset="1">
              <Form-item label="客户编号:">{{tableData.joinCode}}</Form-item>
              <Form-item label="用户ID:">{{tableData.storeId}}</Form-item>
              <Form-item label="手机号码:">{{tableData.phone}}</Form-item>
            </Col>
            <Col span="14" offset="1">
              <Form-item label="门店名称:">{{tableData.storeName}}</Form-item>
              <Form-item label="客户姓名:">{{tableData.userName}}</Form-item>
              <Form-item label="客户状态:">{{tableData.salesRoute}}</Form-item>
            </Col>
          </Row>
          <Form-item label="地址:" :label-width="50">{{tableData.address}}</Form-item>
          <Row>
            <Col span="8" offset="1">
              <Form-item label="线路编号:">{{tableData.salesRoute}}</Form-item>
            </Col>
            <Col span="14" offset="1">
              <Form-item label="业代姓名:">{{tableData.salesRoute}}</Form-item>
            </Col>
          </Row>
          <Form-item label="业代手机:">{{tableData.workerPhone}}</Form-item>
          <Row>
            <Col span="8" offset="1">
              <Form-item label="陈列活动:">{{tableData.activityName}}</Form-item>
              <Form-item label="上传时间:">{{tableData.createTime}}</Form-item>
              <Form-item label="合格情况:" :label-width="120">{{tableData.salesRoute}}</Form-item>
              <Form-item label="进货达标情况:" :label-width="120">{{tableData.salesRoute}}</Form-item>
              <Form-item label="标准费用:">{{tableData.salesRoute}}</Form-item>
              <Form-item label="清算状态:">{{tableData.salesRoute}}</Form-item>
            </Col>
            <Col span="14" offset="1">
              <Form-item label="分组名称:">{{tableData.presentName}}</Form-item>
              <Form-item label="结算周期:">{{tableData.presentName}}</Form-item>
              <Form-item label="稽查状态:">{{tableData.presentName}}</Form-item>
              <Form-item label="综合判定状态:" :label-width="120">{{tableData.presentName}}</Form-item>
              <Form-item label="折扣奖励:">
                <div style="overflow:hidden;"></div>
              </Form-item>
              <Form-item label="体现状态:">{{tableData.presentName}}</Form-item>
            </Col>
          </Row>
          <Form-item label="特殊处理:">
            <RadioGroup v-model="tableData.gender">
              <Radio label="male">暂不发放奖励</Radio>
              <Radio label="female">正常发放奖励</Radio>
            </RadioGroup>
          </Form-item>
          <Form-item label="备注:" :label-width="50">
            <Input
              v-model="tableData.memo"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="请输入备注"
            ></Input>
          </Form-item>
        </Form>
      </div>
      <div slot="footer" style="text-align:center">
        <Button @click class="btn-search search_btn" type="primary">返回</Button>
        <Button @click class="btn-search search_btn" type="success">保存</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId, //根据活动包名ID获取陈列活动列表
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "display-results-liquidation-awards-keepAlive",
  data() {
    return {
      screenWidth: document.body.clientWidth,
      showQuery: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        activityName: "", //活动名称
        salesRoute: "", //线路编号
        brandName: "", //品牌名称
        presentName: "", //分组名称
        presentId: "", //分组id
        supervisorId: "", //记录员ID
        groupId: "", //活动包名ID
        brandId: "",
        activityId: "",
        storeId: "",
        storeName: "",
        workerName: "",
        workerPhone: "",
        joinCode: "" //客户编号
      },
      showVideoPlay: false,
      pageData: [],
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
          title: "陈列活动",
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
          title: "上传时间",
          key: "createTime",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", this.formatYearMonth(params.row.createTime));
          }
        },
        {
          title: "结算周期",
          key: "brandName",
          align: "center",
          width: 120
        },

        {
          title: "标准费用",
          key: "supervisorId",
          align: "center",
          width: 120
        },
        {
          title: "用户ID",
          key: "storeId",
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
          title: "门店",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          width: 120
        },
        {
          title: "手机",
          key: "phone",
          align: "center",
          width: 120
        },
        {
          title: "省",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "市",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "区",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "线路编号",
          key: "salesRoute",
          align: "center",
          width: 120
        },
        {
          title: "业代姓名",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "业代手机",
          key: "workerPhone",
          align: "center",
          width: 120
        },
        {
          title: "客户状态",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "合格情况",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "进货达标情况",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "稽查状态",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "综合判定状态",
          key: "workerName",
          align: "center",
          width: 150
        },
        {
          title: "折扣奖励",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "清算状态",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "提现状态",
          key: "workerName",
          align: "center",
          width: 120
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          width: 120
        },
        {
          title: "操作",
          key: "option",
          align: "center",
          width: 70,
          fixed: "right",
          render: (h, params) => {
            var tag = [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "修改"
              )
            ];
            tag.push(
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
                    click: () => {}
                  }
                },
                "删除"
              )
            );
            return h("div", tag);
          }
        }
      ],
      tableData: {},
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [] //分组
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
      }
    });
  },
  mounted() {},
  methods: {
    dataChange(val) {
      this.formData.queryEndTime = val.slice(0, 11) + "23:59:59";
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
    getpresentList(value) {
      this.presentNameList = [];
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
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd HH:mm:ss");
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "displayYxtg/querySuperviseLogListExport.json",
        data
      );
      window.open(url);
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost(
        "displayYxtg/querySuperviseLogList.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    }
  }
};
</script>