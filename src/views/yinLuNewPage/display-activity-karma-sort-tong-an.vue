<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  background: #fff;
  min-height: 100%;
  padding-bottom: 60px;
  .box {
    height: auto;
  }
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.table-box {
  overflow: hidden;
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

#allCount {
  float: left;
  span {
    color: @primary-color;
  }
}

#rankTopImage {
  width: 285px;
  height: 17px;
  margin: 10px auto 20px;
}

#rankHeader {
  overflow: hidden;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  li {
    width: 8%;
    border-right: 1px solid #e5e5e5;
    color: #000;
    font-weight: 700;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:last-child {
      border-right: 0;
    }
    #sort {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        height: 6px;
        line-height: 6px;
        color: #666;
      }
    }
  }
  li:first-child {
    width: 4%;
  }
}

#rankList {
  overflow: hidden;
  height: 40px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e5e5e5;
  li {
    height: 40px;
    line-height: 40px;
    width: 8%;
    text-align: center;
  }
  li:first-child {
    width: 4%;
  }
  &.top1:nth-child(1) {
    color: #ff4c3f;
    li {
      &:first-child {
        background: url("../../assets/image/gold.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
  }
  &.top2:nth-child(2) {
    color: #fda629;
    li {
      &:first-child {
        background: url("../../assets/image/silver.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
  }
  &.top3:nth-child(3) {
    color: #2ba7fc;
    li {
      &:first-child {
        background: url("../../assets/image/copper.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
  }
}
.contentTop {
  margin-top: 10px;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动区域排行榜</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <Input value="银鹭" readonly></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId">
                <Input value="同安陈列活动" readonly></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <data-range hour="00:00" v-model="formData.startTime" start></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <data-range hour="24:00" placeholder="结束时间" v-model="formData.endTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.activityId" placeholder="活动名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w10">
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
                  <Input value="销售中心" readonly></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input value="闽南营业部" readonly></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input value="同安处" readonly></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Select v-model="formData.fourLevel" placeholder="四级组织" clearable>
                    <Option :value="item.id" v-for="(item,index) in fourLeverList" :key="index">
                      <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                    </Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <div id="allCount">
            此表包含
            <span>{{pageNum}}</span> 条数据
          </div>
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
        </div>

        <!-- 业代排行榜 -->

        <div id="rank">
          <div id="rankTopImage">
            <img src="../../assets/image/yedai10.png" alt>
          </div>
          <ul id="rankHeader">
            <li
              v-for="(item,index) in rankHeaderList"
              :key="index"
              @click="changeRankList(item.type,item.sort)"
            >
              {{ item.title }}
              <div id="sort" v-if="item.sort">
                <Icon
                  type="ios-funnel"
                  :color="item.type == formData.orderType?'#ff9900':'#17233d'"
                ></Icon>
              </div>
            </li>
          </ul>
          <div>
            <ul
              id="rankList"
              :class="page == 1?'top' + ( index + 1 ):''"
              v-for="(item,index) in rankList"
              :key="index"
            >
              <li>{{ ( page - 1) * pageSize + index + 1 }}</li>
              <li
                v-for="(j,num) in rankHeaderList"
                :key="num"
                v-if="j.type !== 'index'"
              >{{item[j.type]}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" :page-size="pageSize" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import dataRange from "@/components/data-range/data-range.vue";
import exportBtn from "@/components/Button/export-btn.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "display-activity-karma-sort-keepAlive",
  data() {
    return {
      showQuery: false,
      groupList: [],
      formData: {
        startTime: EDFAULT_STARTTIME,
        endTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: "",
        oneLevel: "",
        twoLevel: "",
        threeLevel: "",
        fourLevel: "",
        orderType: "upLoadVideo"
      },
      rule: {},
      page: 1,
      pageNum: 0,
      brandList: [],
      activityList: [],
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      rankHeaderList: [
        {
          title: "排名",
          type: "index"
        },
        {
          title: "业代姓名",
          type: "workerName"
        },
        {
          title: "销售路线",
          type: "salesRoute"
        },
        {
          title: "一级组织",
          type: "oneLevel"
        },
        {
          title: "二级组织",
          type: "twoLevel"
        },
        {
          title: "三级组织",
          type: "threeLevel"
        },
        {
          title: "四级组织",
          type: "fourLevel"
        },
        {
          title: "上传视频数",
          type: "upLoadVideo",
          sort: true
        },
        {
          title: "合格率",
          type: "percentOfPass",
          sort: true
        },
        {
          title: "退回率",
          type: "rejectionRate",
          sort: true
        },
        {
          title: "不合格率",
          type: "percentDefective",
          sort: true
        },
        {
          title: "待审核数",
          type: "numberOfAudits",
          sort: true
        },
        {
          title: "上传门店数",
          type: "numberOfStores",
          sort: true
        }
      ],
      pageSize: 20,
      rankList: []
    };
  },
  components: { dataRange, exportBtn, fieldNameDes },
  created() {
    this.getActivityList(85);
    this.threeLevelChange("17-01010300");
  },
  methods: {
    up(index, type) {
      this.rankList.sort((a, b) => {
        return a[type] < b[type] ? -1 : 1;
      });
    },
    down(index, type) {
      this.rankList.sort((a, b) => {
        return a[type] < b[type] ? 1 : -1;
      });
    },
    changeRankList(type, status) {
      if (status && type !== this.formData.orderType) {
        this.formData.orderType = type;
        this.init(this.page, 20);
      }
    },
    changePage(size) {
      this.page = size;
      this.init(size, 20);
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
      if (!this.formData.startTime) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.endTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      this.page = 1;
      this.init(this.page, 20);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["startTime"] = this.Global.createTime(this.formData.startTime);
      data["endTime"] = this.Global.createTime(this.formData.endTime);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["brandId"] = 17;
      data["groupId"] = 85;
      data["oneLevel"] = "17-01000000";
      data["twoLevel"] = "17-01010000";
      data["threeLevel"] = "17-01010300";
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "uploadReport/salesDispalyActivityUploaddeDetail.json",
        data,
        res => {
          this.rankList = res.datalist;
          this.page = res.page;
          this.pageNum = res.items;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["startTime"] = this.Global.createTime(this.formData.startTime);
      data["endTime"] = this.Global.createTime(this.formData.endTime);
      this.Global.deleteEmptyProperty(data);
      data["brandId"] = 17;
      data["groupId"] = 85;
      data["oneLevel"] = "17-01000000";
      data["twoLevel"] = "17-01010000";
      data["threeLevel"] = "17-01010300";
      var url = this.Global.getExportUrl(
        "uploadReport/salesDispalyActivityUploaddeDetailExport.json",
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

      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
    },
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
        brandId: 17,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      });
    }
  }
};
</script>