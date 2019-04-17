<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  background: #ffffff;
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .export {
    position: fixed;
    z-index: 900;
    top: 140px;
    right: 40px;
    span {
      padding: 0 15px;
      border-radius: 20px;
      color: @primary-color;
      border: 1px solid @primary-color;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
        color: white;
        background-color: @primary-color;
      }
    }
  }
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.table-box {
  padding: 0 10px;
  min-height: 500px;
  position: relative;
  .numColor {
    color: @primary-color;
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
.warnColor {
  color: #ed3f14;
}
.primaryColor {
  color: @primary-color;
}
.successColor {
  color: #19be6b;
}
.noData {
  text-align: center;
  line-height: 100px;
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title" v-if="displayExamineType == 'A'">陈列一级审核</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item required prop="brandId">
                                <Select v-model="formData.brandId" placeholder="品牌名称"  @on-change="changeValue">
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                </Select>
                            </Form-item>
                        </div>   
                        <div class="btn-left w18">
                            <Form-item  prop="queryStartTime" required>
                                <data-range @dataChange="startTimeChange" placeholder="上传开始时间" hour="00:00" :time="formData.queryStartTime" start></data-range>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item  prop="queryEndTime" required>
                                <data-range hour="24:00" placeholder="上传结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                            </Form-item>
                        </div>
                        
                        <div class="btn-left w18">
                            <Form-item prop="groupId" required>
                                <Select v-model="formData.groupId" placeholder="活动名称" @on-change="getActivityList" clearable>
                                    <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                                </Select>
                            </Form-item> 
                        </div>
                        <div class="btn-left w18">
                            <Form-item prop="activityId">
                                <Select v-model="formData.activityId" placeholder="子活动名" clearable>
                                    <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w10">
                            <div class="searchBox">
                                <div class="btn-left search-left" @click="showQuery=!showQuery">
                                <button type="button">
                                    {{showQuery?'收起':'更多'}}
                                    <Icon type="ios-arrow-down" size="14" style="margin-top:-2px;" v-if="!showQuery"/>
                                    <Icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                                </button>
                                </div>
                                <div class="btn-right search-right" @click="submit('search')">
                                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="container" v-if="showQuery">
                            <div class="btn-left w18">
                                <Form-item>
                                    <Input v-model.trim="formData.storeId" placeholder="门店ID"></Input>
                                </Form-item>
                            </div>
                            <div class="btn-left w18">
                                <Form-item>
                                    <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                                </Form-item>
                            </div>
                            <div class="btn-left w18">
                                <Form-item required>
                                    <Input v-model.trim="formData.salesRoute" placeholder="销售路线"></Input>
                                </Form-item>
                            </div>
                        </div>
                    </transition>
                </Form>
            </div>
            <div class="table-box box">
                <div class="contentTop">
                <span class="btn-left">共查询到 <span class='numColor'>{{ pageNum }}</span> 条记录</span>
                
                <!-- <exportBtn  class="btn-right" @btnClick="submit('export')" title="导出"/> -->
                <!-- <exportBtn  class="btn-right" @btnClick="myModalisShow = true" title="导出暂存"/> -->
                <!-- <detailBtn  class="btn-right" @btnClick="historyShow = true" title="历史数据" /> -->
                </div>
                <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" ></hhTable>
                
            </div>
            <div class="page-box">
                <div style="float: right;">
                    <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import hhTable from "@/components/table/table.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "display-warning-abnormal-keepAlive",
  components: {
    dataRange,
    hhTable
  },
  data() {
    return {
      pageData: [],
      noneStatus: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "门店ID",
          key: "storeId",
          align: "center",
          tooltip: true
        },
        {
          title: "上传周期",
          key: "period",
          align: "center",
          tooltip: true
        },
        {
          title: "销售路线",
          key: "salesRoute",
          align: "center",
          tooltip: true
        },
        {
          title: "业代姓名",
          key: "workerName",
          align: "center",
          tooltip: true,
          width: 150
        },
        {
          title: "子活动名称",
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "风险来源",
          key: "riskSource",
          align: "center",
          tooltip: true,
          render: (h,params) => {
            let str = "";
            if (params.row.riskSource == "H") {
              str = "人工";
            } else if (params.row.riskSource == "M") {
              str = "自动";
            }
            return h('div',str);
          }
        },
        {
          title: "风险类型",
          key: "riskType",

          align: "center",
          tooltip: true,
          render: (h,params) => {
            let str = "无";
            if (params.row.riskType == "V") {
              str = "视频异常";
            }
            return h("div",str);
          }
        },
        {
          title: "风险描述",
          key: "riskDes",
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h(
              "div",

              [
                h(
                  "button",
                  {
                    attrs: {
                      type: "text"
                    },
                    style: {
                      backgroundColor: "white"
                    },
                    on: {
                      click: () => {
                        let { storeId, activityId, period } = params.row;
                        let query = {
                          storeId,
                          activityId,
                          period
                        };
                        this.$router.push({
                          path: "/displayAbnormalDetail",
                          query
                        });
                      }
                    }
                  },
                  "查看详情"
                )
              ]
            );
          }
        }
      ],
      startTime: EDFAULT_STARTTIME,
      endTime: EDFAULT_ENDTIME,
      startHour: "00:00",
      endHour: "24:00",
      showQuery: false,
      groupList: [], //活动包名
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
        groupId: "", //活动包名ID
        brandId: "",
        activityId: "",
        storeId: "",
        joinCode: "",
        salesRoute: ""
      },
      brandList: [],
      activityList: [],
      storeGoodsList: null,
      page: 1,
      pageSize: 10,
      pageNum: 0
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
          this.groupList = [];
          this.formData.groupId = "";
          this.Global.doPostNoLoading(
            "condition/queryGroup.json",
            {
              date: 7,
              activityType: 3,
              scope: "a",
              brandId: this.formData.brandId
            },
            res => {
              Object.entries(res).forEach(item => {
                this.groupList.push({
                  id: Number(item[0]),
                  groupName: item[1]
                });
              });
              if (this.groupList && this.groupList.length) {
                this.formData.groupId = this.groupList[0].id;
                this.getActivityList(this.formData.groupId);
              }
            }
          );
        }
      }
    );
  },
  methods: {
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
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
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    createTime(val) {
      var time = this.Global.createTime(val);
      return time;
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
    init() {
      if (!this.formData.groupId) {
        this.$Message.error("活动包不能为空");
        return;
      }
      var data = this.Global.JsonChange(this.formData);

      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.setHoursData(
        this.endTime,
        this.endHour
      );
      data["queryStartTime"] = this.Global.setHoursData(
        this.startTime,
        this.startHour
      );
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.formData.brandId;
      data["level"] = 1;
      this.Global.doPost("displayYxtg/queryVideoRisk.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.currentPage = res.page;
      });
    }
  },

  filters: {}
};
</script>