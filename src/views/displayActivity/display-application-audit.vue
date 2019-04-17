<style lang="less" scoped>
@import "../../config/index.less";
#Main{
  height: 100%;
}
.main-container{
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
  
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 48%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 8px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    width: 52%;
    img {
      cursor: pointer;
      margin-left: 6px;
    }
  }
}
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      overflow-y: auto;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.ivu-input{
  text-align: center !important;
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">陈列申请审核</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10" :rules="rule">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item  required>
                      <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select> 
                  </Form-item>
                </div>
                
                <div class="btn-left w18">
                  <Form-item  prop="queryStartTime" required>
                      <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="queryEndTime" required>
                      <data-range placeholder="结束时间" hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item  prop="groupId" required>
                      <Select v-model="formData.groupId" placeholder="活动名称*" @on-change="getActivityList" clearable>
                          <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                      </Select>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item>                             
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
                    <div class="btn-right search-right" @click="submit('form')">
                      <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                    </div>
                  </div>
                </div>
              </div>
              <transition name="fade">
                <div class="container" v-if="showQuery">
                  <div class="btn-left w18">
                    <Form-item>
                      <Select v-model="formData.displayApplyStatus" placeholder="状态" clearable>
                          <Option value="0">待审核</Option>
                          <Option value="1">通过</Option>
                          <Option value="2">不通过</Option>
                      </Select>
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item required>
                      <Select v-model="formData.oneLevel" placeholder="一级组织" @on-change="oneLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in oneLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.twoLevel"  placeholder="二级组织" @on-change="twoLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in twoLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.threeLevel"  placeholder="三级组织" @on-change="threeLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.fourLevel"  placeholder="四级组织" clearable>
                          <Option :value="item.id" v-for="(item,index) in fourLeverList" :key="index"><span :title="item.areaName" class="text-overflow">{{item.areaName}}</span></Option>
                      </Select> 
                    </Form-item>
                    
                  </div>
                  
                </div>
              </transition>
          </Form>
        </div>
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span>
              
              <detailBtn class="btn-right ml20" @btnClick="showDetail" />
              <exportBtn  class="btn-right" @btnClick="exportExcel" />
            </div>
            <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
            
        </div>
        <div class="page-box">
          <div style="float: right;">
            <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
          </div>
        </div>
        <fieldNameDes/>
      </div>
      
      <myModal class="myModal"
          @close="closeModal"
          :modal="myModalisShow">
        <div slot="main" class="modal-main">
          <h3>近一周导出历史</h3>
          <div class="modal-table">
            <div class="modal-table-top">
              <span class="btn-left">此表共包含<span class='numColor'>100</span>条数据</span>
            </div>
            <Table :columns="columns" :data="pageData" disabled-hover></Table>
          </div>
        </div>
      </myModal>
  </div>
</template>

<script>
import area from "../../config/china_code_data.js";

import {
  dispalyShowStatus,
  dispalyExamineSuggesteStatus,
  displayParketCheckStatus
} from "@/util/ENUMS.js";
import { queryDisPlayApplyAudit } from "@/api/activity-manage/display-apply-examine.js"; //api
import dataRange from "../../components/data-rang.vue";
import exportBtn from "../../components/Button/export-btn.vue";
import detailBtn from "../../components/Button/detail-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import {
  typeQueryActivityVOByGroupId, //根据品牌ID获取活动包名
  typeQueryActivityGroupVOByBrandId, //根据活动包名ID获取陈列活动列表
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import { displayApplyDetail } from "@/api/activity-manage/display-activity-manage.js"; //api
import { getDisplayActivityListDoQuery } from "@/api/common.js";
export default {
  name:"display-application-audit-keepAlive",
  data() {
    const that = this;
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
      noneStatus:false,
      myModalisShow: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        displayApplyStatus:"",
        brandId: "",
        groupId: "",
        activityId: "",
        oneLevel:"",//一级组织
        twoLevel:"",//二级组织
        threeLevel:"",//三级组织
        fourLevel:"",//四级组织
      },
      page: 1,
      pageNum: 0,
      rule: {
        // queryStartTime: [{ validator: validateStart }],
        // queryEndTime: [{ validator: validateEnd }]
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "店铺名称",
          key: "storeName",
          minWidth: 160,
          align: "center",
          tooltip:true
        },
        {
          title: "用户ID",
          key: "storeId",
          minWidth: 150,
          align: "center",
          tooltip:true
        },
        {
          title: "四级组织",
          key: "fourLevel",
          minWidth: 150,
          align: "center",
          tooltip:true
        },
        {
          title: "门店地址",
          minWidth: 100,
          key: "address",
          align: "center",
          tooltip:true
        },
        {
          title: "活动名称",
          minWidth: 100,
          key: "groupName",
          align: "center",
          tooltip:true
        },
        {
          title: "子活动名",
          minWidth: 100,
          key: "activityName",
          align: "center",
          tooltip:true
        },
        {
          title: "申请时间",
          minWidth: 100,
          key: "displayApplyTime",
          align: "center",
          render:(h,f) => {
            return h("div",this.Global.createTime(f.row.displayApplyTime))

          }
        },
        {
          title: "状态",
          key: "displayApplyStatus",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            let buttonDom;
            if (params.row.displayApplyStatus) {
              buttonDom = [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let queryParams = {
                          id: params.row.id,
                          activityId: params.row.activityId,
                          storeId: params.row.storeId,
                          displayActCategory: "look"
                        };

                        this.$router.push({
                          path: "/displayApplyExamine",
                          query: queryParams
                        });
                      }
                    }
                  },
                  "查看"
                )
              ];
            } else {
              buttonDom = [
                h(
                  "Button",
                  {
                    props: {
                      type: "text",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        let queryParams = {
                          id: params.row.id,
                          activityId: params.row.activityId,
                          storeId: params.row.storeId
                        };

                        this.$router.push({
                          path: "/displayApplyExamine",
                          query: queryParams
                        });
                      }
                    }
                  },
                  "审核"
                )
              ];
            }
            return h("div", buttonDom);
          }
        }
      ],
      columns: [
        {
          title: "时间",
          type: "index",
          minWidth: 140,
          align: "center"
        },
        {
          title: "文件名",
          key: "groupName",
          minWidth: 140,
          align: "center"
        },
        {
          title: "状态",
          key: "uploadTime",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            return h("div", that.Global.createTime(params.row.uploadTime));
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                      let { id, activityId, storeId } = params.row;
                      let queryParams = {
                        id,
                        activityId,
                        storeId,
                        displayActCategory: "partake",
                        displayBackType: "C"
                      };
                      this.$router.push({
                        path: "/displayResultOneEdit",
                        query: queryParams
                      });
                    }
                  }
                },
                "查看"
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
  components: { dataRange, exportBtn, detailBtn, myModal,fieldNameDes,hhTable },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 3, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if(this.brandList && this.brandList.length){
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId)
        }
      }
    );
  },
  methods: {
    oneLevelChange(value) {
      this.twoLeverList = [];
      this.formData.twoLevel = ""
      if(!value) return;
      queryOrganizationDictList({brandId:this.formData.brandId,parentId:value}).then(res=>{
        if (res && res.status == 1) {
          this.twoLeverList = res.data;
        }
      })
    },
    twoLevelChange(value) {
      this.threeLeverList = [];
      this.formData.threeLevel = ""
      if(!value) return;
      queryOrganizationDictList({brandId:this.formData.brandId,parentId:value}).then(res=>{
        if (res && res.status == 1) {
          this.threeLeverList = res.data;
        }
      })
    },
    threeLevelChange(value) {
      this.fourLeverList = [];
      this.formData.fourLevel = ""
      if(!value) return;
      queryOrganizationDictList({brandId:this.formData.brandId,parentId:value}).then(res=>{
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      })
    },
    closeModal() {
      this.myModalisShow = false;
    },
    showDetail() {
      this.myModalisShow = true;
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
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if(!value) return ;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
      // typeQueryActivityVOByGroupId({ groupId: value, type: 3 }).then(res => {
      //   if (res && res.status == 1) {
      //     this.activityList = res.data;
      //   }
      // });
    },
    //查询四级组织数据
    getFourListData(brandId, presentId) {
      if (!brandId || !presentId) {
        return;
      }
      getFourList({ brandId, presentId }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
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
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    submit(name) {
      if (!this.formData.queryStartTime) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
        return false;
      }
      // if (!this.formData.activityId) {
      //   this.$Message.error("活动不能为空");
      //   return false;
      // }

      this.init(1, 10);
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      this.noneStatus = true;
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
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("display/queryDisPlayApplyAuditOfFourLevel.json",data,res => {
        this.pageNum = res.items;
          this.pageData = res.datalist;
          this.page = res.page;
          for (let i = 0; i < this.pageData.length; i++) {
            var index = this.pageData[i]["displayApplyStatus"];
            if (index == 0) {
              this.pageData[i]["displayApplyStatus"] = "未审核";
            } else if (index == 1) {
              this.pageData[i]["displayApplyStatus"] = "通过";
            } else if (index == 2) {
              this.pageData[i]["displayApplyStatus"] = "未通过";
            } else if (index == 3) {
              this.pageData[i]["displayApplyStatus"] = "二次审核通过";
            } else if (index == 4) {
              this.pageData[i]["displayApplyStatus"] = "退回";
            }
            this.pageData[i]["displayApplyTime"] = this.formateTime(
              this.pageData[i]["displayApplyTime"]
            );
          }
      })
      // queryDisPlayApplyAudit(data).then(res => {
      //   if (res.status == 1) {
      //     this.pageNum = res.data.items;
      //     this.pageData = res.data.datalist;
      //     this.page = res.data.page;
      //     for (let i = 0; i < this.pageData.length; i++) {
      //       var index = this.pageData[i]["displayApplyStatus"];
      //       if (index == 0) {
      //         this.pageData[i]["displayApplyStatus"] = "未审核";
      //       } else if (index == 1) {
      //         this.pageData[i]["displayApplyStatus"] = "通过";
      //       } else if (index == 2) {
      //         this.pageData[i]["displayApplyStatus"] = "未通过";
      //       } else if (index == 3) {
      //         this.pageData[i]["displayApplyStatus"] = "二次审核通过";
      //       } else if (index == 4) {
      //         this.pageData[i]["displayApplyStatus"] = "退回";
      //       }
      //       this.pageData[i]["displayApplyTime"] = this.formateTime(
      //         this.pageData[i]["displayApplyTime"]
      //       );
      //     }
      //   }
      // });
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
      var url = this.Global.getExportUrl(
        "uploadReport/organizationUploadDetailExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.groupList = [];
      this.formData.groupId = "";
      this.formData.oneLevel = "";
      if(!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId)
          }
        }
      );
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value,parentId:0}).then(res => {
        console.log(res.data)
        if(res && res.status == 1){
          this.oneLeverList = res.data;
        }
      });
    },
    handleEdit() {
      this.$router.push({
        path: "/displayReward-edit",
        query: { type: "edit" }
      });
    }
  }
};
</script>


