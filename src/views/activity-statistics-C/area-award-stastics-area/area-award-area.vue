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
.ivu-date-picker {
  display: block;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">区域折扣统计（区）</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
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
                  <Select v-model="formData.brandId" placeholder="请选择品牌" @on-change="changeValue">
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
                    <Form-item label="活动包名:" prop="groupId">
                      <Select
                        v-model="formData.groupId"
                        placeholder="请选择活动包名"
                        @on-change="getActivityList"
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
                      <Select v-model="formData.activityId" placeholder="请选择活动" clearable>
                        <Option
                          :value="item.id"
                          v-for="(item,index) in activityList"
                          :key="index"
                        >{{ item.name }}</Option>
                      </Select>
                    </Form-item>
                  </Col>
                  <Col span="8"></Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
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
import dataRange from "@/components/data-range/data-range.vue";
import { EDFAULT_THREE_AGOTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "area-award-area-keepAlive",
  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_THREE_AGOTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      brandList: [],
      groupList: [],
      columns1: [],
      defaultList: [
        {
          title: "序号",
          type: "index",
          width: 70,
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
          title: "区/县",
          key: "area",
          align: "center"
        },
        {
          title: "用户数（去重）",
          key: "userNum",
          width: 120,
          align: "center"
        },
        {
          title: "参与量（汇总）",
          key: "sumWinNum",
          width: 120,
          align: "center"
        }
      ],
      pageData: [],
      listStatus: true,
      keyList: [],
      activityList: []
    };
  },
  created() {
    this.columns1 = this.columns1.concat(this.defaultList);
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a", channel: "C" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: item[0], brandName: item[1] });
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
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
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
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryGroup.json",
        { activityType: 1, scope: "a", brandId: value, channel: "C" },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: item[0], groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
          }
        }
      );
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
      if (!this.formData.groupId) {
        this.$Message.error("请选择查询条件!");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("请选择查询条件!");
        return false;
      }
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      data["userType"] = "C";
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["level"] = 3;
      this.Global.doPost("report/activityDailyReport.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.columns1 = [];
        this.columns1 = this.columns1.concat(this.defaultList);
        if (res.datalist.length > 0) {
          var list = res.datalist[0].gMap;
          for (var i in list) {
            var obj = {
              title: "",
              key: "",
              width: 120,
              align: "center"
            };
            obj["title"] = list[i];
            obj["key"] = i;
            this.columns1.push(obj);
            this.keyList.push(i);
          }
        }
        for (var j = 0; j < res.datalist.length; j++) {
          // 为每个对象里面添加折扣的key值
          for (var n = 0; n < this.keyList.length; n++) {
            if (res.datalist[j].countWinMap) {
              res.datalist[j][this.keyList[n]] =
                res.datalist[j].cWinMap[this.keyList[n]];
            }
          }
        }
        this.pageData = res.datalist;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      data["userType"] = "C";
      data["level"] = 3;
      var url = this.Global.getExportUrl(
        "report/activityDailyExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>