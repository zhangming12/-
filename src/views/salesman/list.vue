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
.ivu-radio-wrapper {
  margin-right: 30px;
}
</style>

<template>
    <div id="Main">
      <!-- <h2 class="Title">业代推广活动设置</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="90" :rules="rule">
                <Row>
                    <Col span="12">
                        <Form-item label="时间" required>
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
                        <Form-item label="区域" prop="searchAreaCode">
                            <Cascader :data="areaData" v-model="formData.searchAreaCode" change-on-select></Cascader>
                        </Form-item>
                    </Col>
                    <Col span="8" offset="1">
                    <Form-item label="品牌名称" prop="brandId">
                            <Select v-model="formData.brandId" placeholder="请选择">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>  
                        </Form-item>
                         <Form-item label="状态" props="showStatus">
                            <Radio-group v-model="formData.showStatus" style="width: 100%;">
                                <Radio label="1">进行中</Radio>
                                <Radio label="2">暂停</Radio>
                                <Radio label="4">结束</Radio>
                            </Radio-group>
                        </Form-item>
                         
                    </Col>
                    <Col span="2" offset="1" style="margin-top:24px">
                        <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                    </Col>
                </Row>
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div class='contentTop'>
            <Button @click="add" class="btn-right" type="primary">新增</Button>
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
import area from "@/config/china_code_data.js";
import dataRange from "../../components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import { dispalyShowStatus } from "@/util/ENUMS.js";
export default {
  name:"salesman-list-keepAlive",

  data() {
    const that = this;
    return {
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        searchAreaCode: [],
        goodsType: "",
        brandId: "",
        remitArrow: ""
      },
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [
        {
          title: "品牌名称",
          key: "brandName",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h("div", that.Global.formatYear(params.row.createTime));
          }
        },
        {
          title: "陈列主题",
          key: "name",
          align: "center"
        },
        {
          title: "开始时间",
          key: "startTime",
          align: "center",
          render: (h, params) => {
            return h("div", that.Global.createTime(params.row.startTime));
          }
        },
        {
          title: "结束时间",
          key: "endTime",
          align: "center",
          render: (h, params) => {
            return h("div", that.Global.createTime(params.row.endTime));
          }
        },
        {
          title: "状态",
          key: "showStatus",
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              that.Global.ENUMS.activityType[params.row.showStatus]
            );
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h("div", [
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
                    click: () => {
                      let pramasData = {
                        brandId: params.row.brandId,
                        vendorName: params.row.vendorName,
                        id: params.row.id,
                        brandName: params.row.brandName,
                        lastStep: "Y"
                      };
                      //  this.$router.push('/salesmanNext');
                      this.$router.push({
                        path: "/salesmanNext",
                        query: pramasData
                      });
                      //this.$store.commit('default',params.row)
                    }
                  }
                },
                "关联业代"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/salesmanEdd?type=edd&id=" + params.row.id
                      );
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      pageData: [],
      areaData: area,
      brandList: [],
      activityList: []
    };
  },
  components: {
    dataRange
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.init();
      }
    });
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
    // dataChange(val) {
    //   this.formData.queryEndTime = val.slice(0, 11) + "23:59:59";
    // },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init: function(currentPage, pageSize) {
      var that = this;
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
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["isPromote"] = 1;
      console.log(data);
      this.Global.doPost("activity/queryActivityList.json", data, res => {
        console.log(res);
        that.pageNum = res.items;
        that.page = res.page;
        that.pageData = res.datalist;
        // for(let i = 0;i<this.pageData.length;i++){
        //     this.pageData[i].createTime = this.formateTime(this.pageData[i].createTime);
        //     this.pageData[i].startTime = this.formateTime(this.pageData[i].startTime);
        //     this.pageData[i].endTime = this.formateTime(this.pageData[i].endTime);
        //     this.pageData[i].showStatus = this.goodsType(this.pageData[i].showStatus);
        // }
      });
    },
    goodsType: function(data) {
      return dispalyShowStatus[data];
    },
    add: function() {
      this.$router.push("/salesmanEdd?type=add");
    },
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    }
  }
};
</script>


