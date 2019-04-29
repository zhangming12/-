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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">码包激活预警</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="85">
        <Row>
          <Col span="21">
            <Row>
              <Col span="16">
                <Form-item label="时间:" required>
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
              <Col span="8">
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
                <Form-item label="码包号:" prop="packageNo">
                  <Input v-model.trim="formData.packageNo" placeholder="请输入码包号"></Input>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1">
            <Button @click="submit()" class="btn-search search_btn" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;padding-bottom:20px;">
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
    </div>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
      </div>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-range/data-range.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
export default {
  name: "code-warning-keepAlive",

  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        packageNo: "", //码包号
        groupId: "", //活动包名ID
        brandId: "",
        activityId: ""
      },
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          minWidth: 70
        },
        {
          title: "扫码时间",
          key: "createTime",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            return h("div", this.formatYearMonth(params.row.createTime));
          }
        },
        {
          title: "扫码地",
          key: "areaName",
          align: "center",
          minWidth: 120
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          minWidth: 120
        },
        {
          title: "活动包名",
          key: "groupName",
          align: "center",
          minWidth: 120
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          minWidth: 150
        },
        {
          title: "码包号",
          key: "packageNo",
          align: "center",
          minWidth: 120
        }
      ],
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
    });
  },
  components: {
    dataRange
  },
  methods: {
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      queryActivityGroupVOByBrandId(value).then(res => {
        if (res && res.status == 1) {
          this.groupList = res.data;
        }
      });
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
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
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("codepackage/qrRisk.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>