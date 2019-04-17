<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  position: relative;
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
  min-height: 500px;
  // padding-bottom: 60px;
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
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
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
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
  // text-overflow: ellipsis
  // white-space: nowrap;
}
.demo {
  float: left;
  margin-left: 10px;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">活动参与明细（扫码）</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10">
              <div class="container">
                  <div class="btn-left w18">
                        <Form-item  prop="queryStartTime" required>
                            <data-range placeholder="查询开始时间" @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item  prop="queryEndTime" required>
                            <data-range hour="24:00" placeholder="查询结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item required prop="brandId">
                            <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue" clearable>
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
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
                        <Form-item required prop="activityId">
                            <Select v-model="formData.activityId" placeholder="项目名称" clearable>
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
                    <Form-item required>
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
              <span class="btn-left">共查询到 <span class='numColor'>{{pageNum}}</span> 条记录</span>
              
              <exportBtn  class="btn-right" @btnClick="submit('export')" title="导出"/>
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
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "display-activity-accumulate-detail-keepAlive",
  data() {
    return {
      noneStatus: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "区域",
          key: "one",
          align: "center",
          tooltip: true,
        },
        {
          title: "营业部",
          key: "two",
          align: "center",
          tooltip: true
        },
        {
          title: "办事处",
          key: "three",
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
          title: "客户名称",
          key: "storeName",
          align: "center",
          tooltip: true
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          tooltip: true
        },
        {
          title: "活动名称",
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "项目名称",
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "上传数",
          key: "totalVideo",
          align: "center",
          tooltip: true
        },

        {
          title: "合格数",
          key: "qualified",
          align: "center",
          tooltip: true
        },
        // {
        //   title: "预计最高折扣",
        //   key: "expectAmount",
        //   align: "center",
        //   tooltip: true
        // },
        {
          title: "实际发放折扣",
          key: "actualAmount",
          align: "center",
          tooltip: true
        }
      ],
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      page: 1,
      pageSize: 10,
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: ""
      },
      page: 1,
      pageNum: 0,
      pageData: [],
      brandList: [],
      activityList: []
    };
  },
  components: {
    dataRange,
    exportBtn,
    myModal,
    hhTable
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
    getActivityList(value) {
      this.groupList.forEach(item => {
        if (item.id == value) {
          this.groupName = item.groupName;
        }
      });
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
    submit(type) {
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
      if (type == "search") {
        this.page = 1;
        this.init();
      } else if (type == "export") {
        this.exportExcel();
      }
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
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
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "displayYxtg/queryDisplayDetailInfo.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          if (res.datalist && res.datalist.length) {
            res.datalist.forEach(item => {
              if (item.fullName) {
                let arr = item.fullName.split(",");

                item.one = arr[1];
                item.two = arr[2];
                item.three = arr[3];
              }
            });
          }
          this.noneStatus = true;
        }
      );
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
        "displayYxtg/queryDisplayDetailInfoExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.groupList = [];
      this.formData.groupId = "";
      this.formData.oneLevel = "";
      if (!value) return;
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
            this.getActivityList(this.formData.groupId);
          }
        }
      );
    }
  }
};
</script>


