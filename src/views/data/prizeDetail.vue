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
      <!-- <h2 class="Title">B端折扣使用明细</h2> -->
      <div class="box">
            <!-- <Form ref="form" :model="formData" :label-width="88" :rules="rule">      
                <Row>
                    <Col span="12">
                        <Form-item label="领取时间:" required>
                            <Row>
                              <Col span="11">
                                  <Form-item prop="queryStartTime">
                                    <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                                  </Form-item>
                              </Col>
                              <Col span="2" style="text-align: center;">至</Col>
                              <Col span="11">
                                  <Form-item prop="queryEndTime">
                                      <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                                  </Form-item>
                              </Col>
                          </Row>
                        </Form-item>
                    </Col>
                    <Col span="8" offset="1">
                        <Form-item label="折扣类型" props="goodsType" >
                            <Select v-model="formData.goodsType" >
                                <Option value="0">电子券</Option>
                                <Option value="1">实物折扣</Option>
                                <Option value="2">电子红包</Option>
                            </Select>  
                        </Form-item>
                    </Col>
                    <Col span='2' offset="1" style="margin-top: 28px;">
                        <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                    </Col>
                    <Col span='6'>
                        <Form-item label="品牌名称:" prop="brandId">
                          <Select v-model="formData.brandId" placeholder="请选择品牌">
                              <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                          </Select>  
                        </Form-item>
                    </Col>
                    <Col span='6'>
                        <Form-item label="用户ID">
                            <Input v-model.trim="formData.storeId" ></Input>
                        </Form-item>
                    </Col>
                    <Col span="8" offset="1">
                        <Form-item label="区域" prop="areaCode">
                            <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                        </Form-item>
                    </Col>
                </Row>
            </Form> -->


            <Form ref="form" :model="formData" :label-width="88" :rules="rule">
                <Row>
                    <Col span="21" >
                        <Row>
                          <Col span="16">
                              <Form-item label="领取时间:" required>
                                <Row>
                                    <Col span="11">
                                        <Form-item prop="queryStartTime">
                                          <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                                        </Form-item>
                                    </Col>
                                    <Col span="2" style="text-align: center;">至</Col>
                                    <Col span="11">
                                        <Form-item prop="queryEndTime">
                                            <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                                        </Form-item>
                                    </Col>
                                </Row>
                              </Form-item>
                          </Col>
                          <Col span="8">
                            <Form-item label="品牌名称:" prop="brandId" required>
                                <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                </Select> 
                            </Form-item>
                          </Col>
                          <Col span="24">
                            <Row>
                              <Col span="8">
                                <Form-item label="活动包名:" prop="groupId">
                                  <Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList" clearable>
                                    <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                                  </Select>
                                </Form-item>
                                  
                              </Col>
                              <Col span="8">
                                <Form-item label="子活动:" prop="brandId">                        
                                    <Select v-model="formData.activityId" placeholder="请选择" clearable>
                                        <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                                    </Select> 
                                </Form-item>
                                
                              </Col>
                              <Col span="8">
                                <Form-item label="用户ID">
                                    <Input v-model.trim="formData.storeId" ></Input>
                                </Form-item>
                                
                              </Col>
                            </Row>
                          </Col>
                        </Row>
                    </Col>
                    <Col span='2' offset="1" style="margin-top:20px">
                        
                        <div class="searchBox">
                          <Button @click="submit('form')" class="btn-search  search_btn" type="primary">查询</Button>
                          <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-up" v-if="showQuery"></Button>
                          <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-down" v-else></Button>
                        </div>
                    </Col>
                </Row>
                <transition name="fade">
                  <Row v-if="showQuery">
                    <Col span='7'>
                      <Form-item label="区域" prop="areaCode">
                          <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                      </Form-item>
                    </Col>
                  </Row>
                </transition>
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div class='contentTop'>
            <Button @click="exportExcel" class="btn-right" icon="ios-download-outline" type="primary">导出</Button>
        </div>
        <Table :columns="columns1"  :data="pageData" disabled-hover></Table>
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
import dataRange from "../../components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "prizeDetail-keepAlive",

  data() {
    const validateStart = (rule, value, callback) => {
      // 验证开始时间
      if (value == "") {
        callback(new Error("请输入开始时间"));
      } else {
        if (this.formData.queryEndTime !== "") {
          // 对结束时间单独验证
          this.$refs.form.validateField("queryEndTime");
        }
        callback();
      }
    };
    const validateEnd = (rule, value, callback) => {
      // 验证结束时间

      if (value == "") {
        callback(new Error("请输入结束时间"));
      } else {
        const str = new Date(this.formData.queryStartTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
          // 判断开始时间是否大于结束时间
          callback(new Error("开始时间大于结束时间"));
        } else {
          callback();
        }
      }
    };
    return {
      start: {
        time: "",
        hour: ""
      },
      showQuery: false,
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      brandList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        areaCode: [],
        goodsType: "",
        storeId: "",
        brandId: "",
        groupId: "",
        activityId: ""
      },
      groupList: [],
      activityList: [],
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      columns1: [
        {
          title: "领取时间",
          key: "recTime",
          align: "center",
          width: 150,
          render: (h, params) => {
            return params.row.recTime
              ? this.Global.createTime(params.row.recTime)
              : "";
          }
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center",
          width: 110
        },
        {
          title: "门店名称",
          key: "storeName",
          align: "center",
          width: 110,
          tooltip:true
        },
        {
          title: "昵称",
          key: "nickName",
          width: 150,
          align: "center",
          tooltip:true
        },
        {
          title: "省",
          key: "province",
          width: 150,
          align: "center"
        },
        {
          title: "市",
          key: "city",
          width: 150,
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          width: 150,
          align: "center"
        },
        {
          title: "业务ID",
          key: "recordId",
          align: "center",
          width: 150,
          render: (h, params) => {
            return params.row.recordId ? params.row.recordId : "";
          }
        },
        {
          title: "业务单号",
          key: "fundoutId",
          align: "center",
          width: 150,
          render: (h, params) => {
            return params.row.fundoutId ? params.row.fundoutId : "";
          }
        },
        {
          title: "折扣类型",
          key: "goodsType",
          align: "center",
          width: 150,
          render: (h, params) => {
            return this.goodsType(params.row.goodsType);
          }
        },
        {
          title: "折扣",
          key: "goodsName",
          width: 150,
          align: "center"
        },
        {
          title: "状态",
          key: "statusMessage",
          width: 150,
          align: "center"
        }
        // {
        //   title: "交易单号",
        //   key: "wxTradeNo",
        //   align: "center",
        //   width: 150
        // }
      ],
      pageData: [],
      areaData: area
    };
  },
  components: {
    dataRange
  },
  created() {
    // this.init(1, 10);
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a", channel: "B" },
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
  methods: {
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
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { activityType: 1, scope: "a", date: 7, brandId: value, channel: "B" },
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
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
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
    show(index) {
      this.$Modal.confirm({
        title: "",
        render: h => {
          return h(edd, {
            props: {
              row: this.data1[index]
            }
          });
        },
        onOk: () => {}
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
      this.Global.doPost(
        "report/activityPrizeUsedDetailReport.json",
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
        "report/activityPrizeUsedDetailExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>