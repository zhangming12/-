<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  background: #fff;
  height: 100%;
  .box {
    height: auto;
    min-width: 1135px;
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
  overflow: hidden;
  padding: 0 10px;
  padding-bottom: 10px;

  position: relative;
  .numColor {
    color: @primary-color;
  }
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
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
.ranking-list {
  width: 100%;
  // overflow-x: auto;

  .ranking-container {
    min-height: 450px;
    display: flex;
    justify-content: center;
    // overflow: hidden;

    #fourLevel,
    #threeLevel,
    #oneLevel,
    #twoLevel {
      box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.1);
      padding: 10px;
      background-color: #fff;
      li {
        display: flex;
        border-bottom: 1px solid #e3e3e3;
        height: 40px;
        color: #4a4a4a;
        span {
          // width: 70px;
          font-size: 14px;
          height: 40px;
          line-height: 40px;
          .TextOverflow();
          text-align: center;
        }
        span.sort {
          cursor: pointer;
          .icon {
            margin-left: 2px;
          }
        }
      }
      li:first-child {
        span {
          font-size: 14px;
          font-weight: bold;
          color: #333333;
        }
        span:after {
          content: "";
          height: 18px;
          border-right: 1px solid #e9e9e9;
          display: block;
          float: right;
          margin-top: 11px;
        }
        span:last-child:after {
          border: 0;
        }
      }
      li:nth-child(2) {
        color: #ce1b20;
        span:first-child {
          background: url("../../assets/image/gold.png") center no-repeat;
          background-size: auto;
          color: #fff;
        }
      }
      li:nth-child(3) {
        color: #ffa60c;
        span:first-child {
          background: url("../../assets/image/silver.png") center no-repeat;
          background-size: auto;
          color: #fff;
        }
      }
      li:nth-child(4) {
        color: #2285cc;
        span:first-child {
          background: url("../../assets/image/copper.png") center no-repeat;
          background-size: auto;
          color: #fff;
        }
      }
    }
    #fourLevel {
      width: 920px;
      margin-right: 10px;
      span {
        width: 140px;
      }
      span.ranking {
        width: 80px;
      }
    }
    #threeLevel {
      width: 780px;
      margin-right: 10px;
      span {
        width: 140px;
      }
      span.ranking {
        width: 80px;
      }
    }
    #twoLevel {
      width: 640px;
      margin-right: 10px;
      span {
        width: 140px;
      }
      span.ranking {
        width: 80px;
      }
    }
    #oneLevel {
      width: 700px;
      margin-right: 0px;
      span {
        width: 200px;
      }
      span.ranking {
        width: 100px;
      }
    }
  }
}
.top {
  overflow: hidden;
  .top-img {
    text-align: center;
  }
  .top-icon {
    overflow: hidden;
    cursor: pointer;
    img {
      float: right;
      width: 20px;
      height: 20px;
    }
  }
}
.toLeft,
.toRight {
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  background-color: #7f7f7f;
  box-sizing: border-box;
  padding: 5px;
  cursor: pointer;
  top: 220px;
  z-index: 100;
  opacity: 0.8;
}
.toLeft {
  left: 20px;
}
.toRight {
  right: 20px;
  padding: 5px 0 0 15px;
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
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动区域排行榜</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动包名*"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range
                  @dataChange="startTimeChange"
                  hour="00:00"
                  :time="formData.queryStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range
                  hour="24:00"
                  @dataChange="endTimeChange"
                  placeholder="结束时间"
                  :time="formData.queryEndTime"
                ></data-range>
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
                <Form-item required>
                  <Select
                    v-model="formData.oneLevel"
                    placeholder="一级组织"
                    @on-change="oneLevelChange"
                    clearable
                  >
                    <Option :value="item.id" v-for="(item,index) in oneLeverList" :key="index">
                      <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                    </Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Select
                    v-model="formData.twoLevel"
                    placeholder="二级组织"
                    @on-change="twoLevelChange"
                    clearable
                  >
                    <Option :value="item.id" v-for="(item,index) in twoLeverList" :key="index">
                      <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                    </Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Select
                    v-model="formData.threeLevel"
                    placeholder="三级组织"
                    clearable
                    @on-change="threeLevelChange"
                  >
                    <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index">
                      <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                    </Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box" ref="tableBox">
        <div class="contentTop">
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
        </div>
        <!-- 排行榜 -->
        <div class="ranking-list" ref="rankingList">
          <div class="ranking-container">
            <div id="fourLevel" v-if="formData.threeLevel">
              <div class="top">
                <div class="top-img">
                  <img
                    src="../../assets/image/fourLevel10.png"
                    class="top-img"
                    alt="本周业代关联门店扫码量排行榜"
                  >
                </div>
              </div>
              <ul>
                <li>
                  <span class="ranking">排名</span>
                  <span>一级组织</span>
                  <span>二级组织</span>
                  <span>三级组织</span>
                  <span>四级组织</span>
                  <span @click="orderType = 1" class="sort">
                    上传数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 1?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                  <span @click="orderType = 2" class="sort">
                    门店数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 2?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                </li>
                <li v-for="(item,index) in fourLevelData" :key="index">
                  <span class="ranking">{{ index + 1}}</span>
                  <span :title="item.oneLevel">{{ item.oneLevel }}</span>
                  <span :title="item.twoLevel">{{ item.twoLevel }}</span>
                  <span :title="item.threeLevel">{{ item.threeLevel }}</span>
                  <span :title="item.fourLevel">{{ item.fourLevel }}</span>
                  <span>{{ item.winCount }}</span>
                  <span>{{ item.winUserCount }}</span>
                </li>
              </ul>
            </div>
            <div id="threeLevel" v-else-if="formData.twoLevel">
              <div class="top">
                <div class="top-img">
                  <img
                    src="../../assets/image/threeLevel10.png"
                    class="top-img"
                    alt="本周业代关联门店扫码量排行榜"
                  >
                </div>
              </div>
              <ul>
                <li>
                  <span class="ranking">排名</span>
                  <span>一级组织</span>
                  <span>二级组织</span>
                  <span>三级组织</span>
                  <span @click="orderType = 1" class="sort">
                    上传数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 1?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                  <span @click="orderType = 2" class="sort">
                    门店数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 2?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                </li>
                <li v-for="(item,index) in fourLevelData" :key="index">
                  <span class="ranking">{{ index + 1}}</span>
                  <span :title="item.oneLevel">{{ item.oneLevel }}</span>
                  <span :title="item.twoLevel">{{ item.twoLevel }}</span>
                  <span :title="item.threeLevel">{{ item.threeLevel }}</span>
                  <span>{{ item.winCount }}</span>
                  <span>{{ item.winUserCount }}</span>
                </li>
              </ul>
            </div>
            <div id="twoLevel" v-else-if="formData.oneLevel">
              <div class="top">
                <div class="top-img">
                  <img src="../../assets/image/twoLevel10.png" class="top-img" alt="本周业代关联门店扫码量排行榜">
                </div>
              </div>
              <ul>
                <li>
                  <span class="ranking">排名</span>
                  <span>一级组织</span>
                  <span>二级组织</span>
                  <span @click="orderType = 1" class="sort">
                    上传数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 1?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                  <span @click="orderType = 2" class="sort">
                    门店数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 2?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                </li>
                <li v-for="(item,index) in fourLevelData" :key="index">
                  <span class="ranking">{{ index + 1}}</span>
                  <span :title="item.oneLevel">{{ item.oneLevel }}</span>
                  <span :title="item.twoLevel">{{ item.twoLevel }}</span>
                  <!-- <span>{{ item.threeLevel }}</span> -->
                  <span>{{ item.winCount }}</span>
                  <span>{{ item.winUserCount }}</span>
                </li>
              </ul>
            </div>
            <div id="oneLevel" v-else>
              <div class="top">
                <div class="top-img">
                  <img src="../../assets/image/oneLevel10.png" class="top-img" alt="本周业代关联门店扫码量排行榜">
                </div>
              </div>
              <ul>
                <li>
                  <span class="ranking">排名</span>
                  <span>一级组织</span>
                  <span @click="orderType = 1" class="sort">
                    上传数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 1?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                  <span @click="orderType = 2" class="sort">
                    门店数
                    <Icon
                      class="icon"
                      type="ios-funnel"
                      :color="orderType == 2?'#ff9900':'#17233d'"
                    ></Icon>
                  </span>
                </li>
                <li v-for="(item,index) in fourLevelData" :key="index">
                  <span class="ranking">{{ index + 1}}</span>
                  <span :title="item.oneLevel">{{ item.oneLevel }}</span>
                  <span>{{ item.winCount }}</span>
                  <span>{{ item.winUserCount }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- 左右按钮 -->
        <!-- <div class="toLeft" @click="toLeft">
                <Icon type="chevron-left" size='20' color="#ffffff"></Icon>
            </div>
            <div class="toRight" @click="toRight">
                <Icon type="chevron-right" size='20' color="#ffffff"></Icon>
        </div>-->
      </div>
      <fieldNameDes/>
    </div>

    <myModal class="myModal" @close="closeModal" :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>近一周导出历史</h3>
        <div class="modal-table">
          <div class="modal-table-top">
            <span class="btn-left">
              此表共包含
              <span class="numColor">100</span>条数据
            </span>
          </div>
          <Table :columns="columns" :data="pageData" disabled-hover></Table>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";

import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "display-activity-area-sort-keepAlive",
  data() {
    return {
      myModalisShow: false,
      timer: null,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      oneLevelData: [],
      twoLevelData: [],
      threeLevelData: [],
      fourLevelData: [],
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
        groupId: "",
        activityId: "",
        threeLevel: "",
        oneLevel: "",
        twoLever: "",
        storeId: "",
        checkStatus: "",
        winStatus: "",
        joinCode: "",
        areaCode: []
      },
      orderType: 1, //1,按上传数排序，2,按门店数排序
      rule: {
        // queryStartTime: [{ validator: validateStart }],
        // queryEndTime: [{ validator: validateEnd }]
      },
      pageData: [],
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
            return h("div", this.Global.createTime(params.row.uploadTime));
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
      page: 1,
      pageSize: 10,
      step: 20,
      areaData: area,
      brandList: [],
      activityList: []
    };
  },
  components: { dataRange, exportBtn, myModal, fieldNameDes },
  watch: {
    orderType(cval, oval) {
      if (cval == oval) {
        return;
      }
      this.init(cval);
    }
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
    showDetail() {
      this.myModalisShow = true;
    },
    closeModal() {
      this.myModalisShow = false;
    },
    oneLevelChange(value) {
      this.twoLeverList = [];
      this.fourLevelData = [];
      this.formData.twoLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value,
        level: 2
      }).then(res => {
        if (res && res.status == 1) {
          this.twoLeverList = res.data;
          if (res.data.length) {
            this.twoLeverList.unshift({
              areaName: "全部",
              id: "全部"
            });
          }
        }
      });
    },
    twoLevelChange(value) {
      this.threeLeverList = [];
      this.fourLevelData = [];
      this.formData.threeLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value,
        level: 3
      }).then(res => {
        if (res && res.status == 1) {
          this.threeLeverList = res.data;
          if (res.data.length) {
            this.threeLeverList.unshift({
              areaName: "全部",
              id: "全部"
            });
          }
        }
      });
    },
    threeLevelChange(value) {
      this.fourLevelData = [];
    },
    // toLeft() {
    //   let dom = this.$refs.rankingList;
    //   let scrollLeft = dom.scrollLeft;
    //   this.timer = setInterval(() => {
    //     scrollLeft -= this.step;
    //     if (scrollLeft <= 0) {
    //       dom.scrollTo(0, 0);
    //       clearInterval(this.timer);
    //     }
    //     dom.scrollTo(scrollLeft, 0);
    //   }, 16);
    // },
    // toRight() {
    //   let dom = this.$refs.rankingList;
    //   let table = this.$refs.tableBox;
    //   let scrollLeft = dom.scrollLeft;
    //   let right = Math.abs(1450 - table.clientWidth);
    //   this.timer = setInterval(() => {
    //     scrollLeft += this.step;
    //     if (scrollLeft >= right) {
    //       dom.scrollTo(right, 0);
    //       clearInterval(this.timer);
    //     }
    //     dom.scrollTo(scrollLeft, 0);
    //   }, 16);
    // },
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
      this.page = 1;
      this.init(1);
    },
    changePage(size) {
      this.page = size;
      this.init(1);
    },
    init(sort) {
      this.fourLevelData = [];
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
      data["sortOrder"] = sort;
      this.Global.deleteEmptyProperty(data);
      console.log(data);
      this.Global.doPost(
        "uploadReport/displayOrganizationRanking.json",
        data,
        res => {
          console.log(res);
          this.fourLevelData = res;
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
      data["sortOrder"] = this.orderType;
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "uploadReport/displayOrganizationRankingExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.groupList = [];
      this.oneLeverList = [];
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
      queryOrganizationDictList({ brandId: value, parentId: 0, level: 1 }).then(
        res => {
          if (res && res.status == 1) {
            this.oneLeverList = res.data;
          }
        }
      );
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


