//质检记录
<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 60px;
  .w10 {
    width: 12.5%;
  }
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
      //   overflow-y: auto;
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
.ivu-input {
  text-align: center !important;
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
span.btn {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  padding: 4px 20px;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.2s linear;
  &:hover {
    background-color: #e5e5e5;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">质检记录</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="00:00" v-model="formData.queryStartTime" placeholder="开始时间"/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="24:00" v-model="formData.queryEndTime" placeholder="结束时间"/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select
                  v-model="formData.brandId"
                  placeholder="品牌名称"
                  @on-change="changeValue"
                  clearable
                >
                  <Option
                    :value="item.brandId"
                    v-for="(item,index) in brandList"
                    :key="item.brandId"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动名称"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.groupId"
                    v-for="(item,index) in groupList"
                    :key="item.groupId"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId">
                <Select v-model="formData.activityId" placeholder="子活动名称" clearable>
                  <Option
                    :value="item.activityId"
                    v-for="(item,index) in activityList"
                    :key="item.activityId"
                  >{{ item.activityName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-right w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <Icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
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
                <Form-item prop="groupId" required>
                  <Select v-model="formData.teamId" placeholder="团队" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in teamList"
                      :key="item.id"
                    >{{ item.brandName }}</Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
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
  </div>
</template>

<script>
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间

import myModal from "@/components/Modal/my-modal.vue";
import dataRange from "@/components/data-range/data-range.vue";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "testing-record-keepAlive",
  data() {
    return {
      showQuery: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME
      },
      noneStatus: false,
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "操作人",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "团队",
          key: "teamName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "时间",
          key: "time",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "品牌",
          key: "brandName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "活动",
          key: "groupName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "项目",
          key: "activityName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "分组",
          key: "presentName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "总数",
          key: "totalNum",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "抽检率",
          key: "sampleRate",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "正确率",
          key: "correctPrecent",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "结果",
          key: "operateType",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "数量",
          key: "actualNum",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "操作时间",
          key: "operateTime",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "意见",
          key: "message",
          align: "center",
          minWidth: 120,
          tooltip: true
        }
      ],
      pageSize: 10,
      pageData: [],
      brandList: [],
      groupList: [],
      activityList: [],
      teamList: []
    };
  },
  components: {
    myModal,
    hhTable,
    fieldNameDes,
    dataRange
  },
  created() {
    this.queryBrand();
    this.queryTeam();
  },
  methods: {
    //查询团队
    queryTeam() {
      let api = "audit/queryAllTeam.json";
      let data = "";
      this.Global.doPostNoLoading(api, data, res => {
        this.teamList = res;
      });
    },
    queryBrand() {
      this.Global.doPostNoLoading(
        "condition/queryBrands.json",
        { date: 7, activityType: 3, scope: "a" },
        res => {
          this.brandList = [];
          Object.entries(res).forEach(item => {
            this.brandList.push({
              brandId: Number(item[0]),
              brandName: item[1]
            });
          });
          if (this.brandList && this.brandList.length) {
            this.formData.brandId = res[0].brandId;
          }
        }
      );
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({
              groupId: Number(item[0]),
              groupName: item[1]
            });
          });
        }
      );
    },
    getActivityList(val) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!val) return;
      //查询活动
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: val },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({
              activityId: Number(item[0]),
              activityName: item[1]
            });
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
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "report/activityDailyExport.json",
        data
      );
      window.open(url);
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["checkType"] = "2";
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("audit/queryQualityRecheckRecord.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        let result = {
          "1": "批量通过",
          "2": "批量不通过",
          "3": "完成"
        };
        res.datalist.forEach(item => {
          item.operateTime = this.Global.createTime(item.operateTime);
          item.operateType = result[item.operateType];
        });
      });
    }
  }
};
</script>