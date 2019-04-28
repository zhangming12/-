<style lang="less" scoped>
@import "../../config/index.less";

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
.ivu-date-picker {
  display: block;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">江西太古活动明细</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="21">
            <Row>
              <Col span="14">
                <Form-item label="参与时间" required>
                  <Row>
                    <Col span="11">
                      <Form-item prop="queryStartTime">
                        <data-range
                          @dataChange="startTimeChange"
                          hour="00:00"
                          :time="formData.queryStartTime"
                          start
                        ></data-range>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center;">至</Col>
                    <Col span="11">
                      <Form-item prop="queryEndTime">
                        <data-range
                          hour="24:00"
                          placeholder="结束时间"
                          @dataChange="endTimeChange"
                          :time="formData.queryEndTime"
                        ></data-range>
                      </Form-item>
                    </Col>
                  </Row>
                </Form-item>
              </Col>
              <Col span="9" offset="1">
                <Form-item label="品牌名称" prop="brandId" required>
                  <Select
                    v-model="formData.brandId"
                    placeholder="请选择"
                    @on-change="changeValue"
                    disabled
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
                <Form-item label="活动包名" prop="groupId" required>
                  <Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList">
                    <Option
                      :value="item.id"
                      v-for="(item,index) in groupList"
                      :key="index"
                    >{{ item.groupName }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="活动名称" prop="activityId">
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
                <Form-item label="销售大区" prop="regionName">
                  <Select
                    v-model="formData.regionName"
                    placeholder="请选择销售大区"
                    @on-change="areaChangeValue"
                    clearable
                  >
                    <Option
                      :value="item.regionName"
                      v-for="(item,index) in regionNameList"
                      :key="index"
                    >{{ item.regionName }}</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1" style="margin-top:10px;">
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
              <Form-item label="办事处" prop="officeName">
                <Select v-model="formData.officeName" placeholder="请选择办事处" clearable>
                  <Option
                    :value="item.officeName"
                    v-for="(item,index) in officeNameList"
                    :key="index"
                  >{{ item.officeName }}</Option>
                </Select>
              </Form-item>
              <Form-item label="折扣类型" props="goodsType">
                <Select v-model="formData.goodsType">
                  <Option value="0">电子券</Option>
                  <Option value="1">实物折扣</Option>
                  <Option value="2">电子红包</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="区域" prop="areaCode">
                <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
              </Form-item>
            </Col>
            <Col span="7">
              <Form-item label="用户ID">
                <Input v-model.trim="formData.storeId"></Input>
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
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import area from "../../config/china_code_data.js";
import dataRange from "@/components/data-rang.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME
} from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
  name: "jx-activity-detail-keepAlive",
  data() {
    return {
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      showQuery: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        areaCode: [],
        goodsType: "",
        brandId: 10,
        groupId: "",
        activityId: "",
        regionName: "", //销售大区
        storeId: "",
        officeName: "" //办事处
      },
      regionNameList: [],
      officeNameList: [], //办事处列表
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        groupId: [{ required: true, message: "活动包不能为空" }]
      },
      columns1: [
        {
          title: "参与时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.createTime);
          }
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center"
        },
        {
          title: "昵称",
          key: "nickName",
          align: "center"
        },
        {
          title: "省",
          key: "province",
          align: "center"
        },
        {
          title: "市",
          key: "city",
          align: "center"
        },
        {
          title: "区",
          key: "responsibleArea",
          align: "center"
        },
        {
          title: "销售大区",
          key: "areaname",
          align: "center"
        },
        {
          title: "办事处",
          key: "officeName",
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center"
        },
        {
          title: "业务ID",
          key: "recordId",
          align: "center"
        },
        {
          title: "业务单号",
          key: "fundoutId",
          align: "center"
        },
        {
          title: "折扣类型",
          key: "goodsType",
          align: "center",
          render: (h, params) => {
            return this.goodsType(params.row.goodsType);
          }
        },
        {
          title: "折扣",
          key: "winAmount",
          align: "center",
          render: (h, params) => {
            if (params.row.goodsType == 2) {
              return params.row.winAmount + "元";
            }
          }
        }
      ],
      pageData: [],
      areaData: area,
      brandList: [],
      groupList: "",
      activityList: [],
      areanameList: [] //销售大区列表
    };
  },
  components: {
    dataRange
  },
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a", channel: "B" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.changeValue(this.formData.brandId);
        }
      }
    );
    this.getregionNameList();
  },
  methods: {
    getregionNameList() {
      this.regionNameList = [];
      this.formData.officeName = "";
      this.Global.doPost(
        "activityqueryconditionofjx/getregionName.json",
        "",
        res => {
          this.regionNameList = res;
        }
      );
    },
    areaChangeValue(val) {
      this.getOfficeNameList(val);
    },
    getOfficeNameList(val) {
      this.officeNameList = [];
      this.formData.officeName = "";
      this.Global.doPost(
        "activityqueryconditionofjx/getofficename.json",
        { regionName: val },
        res => {
          this.officeNameList = res;
        }
      );
    },
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryStartTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    dataChange(val) {
      this.formData.queryEndTime = val.slice(0, 11) + "23:59:59";
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
    createTime(val) {
      var time = this.Global.createTime(val);
      return time;
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);

      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "B";
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      console.log(data);
      this.Global.doPost(
        "reportjx/activityDetailReportOfJX.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    },
    goodsType(data) {
      return this.Global.ENUMS.goodsType[data];
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);

      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "B";
      var url = this.Global.getExportUrl(
        "report/activityDetailExportOfJx.json",
        data
      );
      window.open(url);
    },
    getActivityList(value) {
      this.activityList = [];
      this.activityId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    changeValue(value) {
      this.groupList = [];
      this.groupId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryGroup.json",
        { activityType: 1, scope: "a", brandId: value, channel: "B" },
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
    }
  }
};
</script>