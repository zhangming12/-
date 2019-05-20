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
  <div id="Main" @click="closeAlertBox">
    <!-- <h2 class="Title">参与记录</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="85">
        <Row>
          <Col span="21">
            <Row>
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
              <Col span="11">
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
              </Col>
            </Row>
            <Row>
              <Col span="8">
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
            </Row>
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
            <Col span="7">
              <Form-item label="线路编号:">
                <Input v-model.trim="formData.salesRoute" placeholder="请输入线路编号"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="业代编号:">
                <Input v-model.trim="formData.workerId" placeholder="请输入业代编号"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="记录员ID:" prop="supervisorId">
                <Input v-model.trim="formData.supervisorId" placeholder="请输入记录员ID"></Input>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="状态:">
                <Radio-group v-model="formData.superviseStatus">
                  <Radio
                    :label="item.value"
                    style="margin-right:5px;"
                    v-for="item in statuList"
                    :key="item.value"
                  >{{item.text}}</Radio>
                </Radio-group>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="客户编号:" prop="joinCode">
                <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
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
    <div v-if="showVideoPlay" class="showRadio">
      <span class="close" @click="close">X</span>
      <video :src="radioUrl" controls autoplay></video>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-range/data-range.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { monitorRecord } from "@/util/ENUMS.js";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "participation-record-keepAlive",

  data() {
    return {
      showQuery: false,
      formData: {
        superviseStatus: "", //状态
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        activityName: "", //活动名称
        salesRoute: "", //线路编号
        brandName: "", //品牌名称
        presentName: "", //分组名称
        recordId: "", //记录员ID
        brandId: "",
        activityId: "",
        storeId: "",
        storeName: "",
        workerName: "",
        workerPhone: "",
        checkStatus: "",
        joinCode: "" //客户编号
      },
      radioUrl: "",
      statuList: [
        {
          text: "全部",
          value: ""
        },
        {
          text: "终止参与",
          value: "3"
        },
        {
          text: "恢复参与",
          value: "4"
        }
      ],
      pageData: [],
      columns1: [
        {
          title: "时间",
          key: "createTime",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", this.formatYearMonth(params.row.createTime));
          }
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          width: 120
        },
        {
          title: "门店名称",
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
          title: "业代编号",
          key: "workerId",
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
          title: "陈列活动包名",
          key: "groupName",
          align: "center",
          width: 120
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
          title: "调整记录说明",
          key: "superviseMessage",
          align: "center",
          width: 240
        },
        {
          title: "状态",
          key: "superviseStatus",
          align: "center",
          width: 70,
          fixed: "right",
          render: (h, params) => {
            return h("div", monitorRecord[params.row.superviseStatus]);
          }
        },
        {
          title: "记录",
          key: "radioUrl",
          align: "center",
          fixed: "right",
          width: 70,
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
                    click: e => {
                      this.showVideo(params.row.radioUrl, e);
                    }
                  }
                },
                "播放"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [], //分组
      showVideoPlay: false
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
  components: {
    dataRange
  },
  methods: {
    closeAlertBox(e) {
      if (e.target.className == "showRadio" || e.target.className == "close") {
        return false;
      }
      this.showVideoPlay = false;
    },
    close() {
      this.showVideoPlay = false;
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { activityType: 3, scope: "a", date: 7, brandId: value },
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
    changePage(size) {
      this.page = size;
      this.init();
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      var url = this.Global.getExportUrl(
        "displayYxtg/queryParticipateLogListExport.json",
        data
      );
      window.open(url);
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    init(currentPage, pageSize) {
      this.pageData = [];
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "displayYxtg/queryParticipateLogList.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    },
    showVideo(url, e) {
      e.stopPropagation();
      this.radioUrl = "";
      this.showVideoPlay = true;
      this.radioUrl = url;
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd HH:mm:ss");
    }
  },
  filters: {}
};
</script>