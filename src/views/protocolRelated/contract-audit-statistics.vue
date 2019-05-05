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
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
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
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">签约审核统计</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="10">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item  required>
                      <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select> 
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item    required>
                      <data-range placeholder="签约开始时间" @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item    required>
                      <data-range placeholder="签约结束时间" hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
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
  </div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "contract-audit-statistics-keepAlive",
  data() {
    return {
      noneStatus: false,
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
        brandId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "", //四级组织
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "一级组织",
          minWidth: 100,
          key: "oneLevel",
          align: "center"
        },
        {
          title: "二级组织",
          minWidth: 100,
          key: "twoLevel",
          align: "center"
        },
        {
          title: "三级组织",
          minWidth: 100,
          key: "threeLevel",
          align: "center"
        },
        {
          title: "四级组织",
          minWidth: 100,
          key: "fourLevel",
          align: "center"
        },
        {
          title: "待签数",
          minWidth: 100,
          key: "waitSignNum",
          align: "center"
        },
        {
          title: "签约数",
          minWidth: 100,
          key: "signNum",
          align: "center"
        },
        {
          title: "通过",
          minWidth: 100,
          key: "passNum",
          align: "center"
        },
        {
          title: "退回",
          minWidth: 100,
          key: "returnNum",
          align: "center"
        },
        {
          title: "不通过",
          minWidth: 100,
          key: "refuseNum",
          align: "center"
        },
        {
          title: "审核中",
          minWidth: 100,
          key: "signingNum",
          align: "center"
        }
      ],
      pageData: [],
      brandList: []
    };
  },
  components: {
    dataRange,
    exportBtn,
    hhTable,
    fieldNameDes
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7,  scope: "a" },
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
    oneLevelChange(value) {
      this.twoLeverList = [];
      this.formData.twoLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.twoLeverList = res.data;
        }
      });
    },
    twoLevelChange(value) {
      this.threeLeverList = [];
      this.formData.threeLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.threeLeverList = res.data;
        }
      });
    },
    threeLevelChange(value) {
      this.fourLeverList = [];
      this.formData.fourLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      });
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
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      this.noneStatus = true;
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
        "uploadReport/querySignAuditeCount.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
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
        "uploadReport/signAuditeCountExport.json",
        data
      );
      window.open(url);
    },
    changeValue(value) {
      this.oneLeverList = [];
      this.formData.oneLevel = "";
      if (!value) return;
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
    }
  }
};
</script>