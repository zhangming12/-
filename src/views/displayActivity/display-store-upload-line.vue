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
}
.table-box {
  margin-top: 20px;
  padding: 0 10px;
  position: relative;
  #scancodeActivity {
    height: 450px;
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
.ivu-input {
  text-align: center !important;
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">陈列门店上传曲线</h2> -->
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
                  <Form-item  prop="groupId" required>
                      <Select v-model="formData.groupId" placeholder="活动包名*" @on-change="getActivityList" clearable>
                          <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                      </Select>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                  <Form-item>                             
                      <Select v-model="formData.activityId" placeholder="活动名称" clearable>
                          <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
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
        <div class="table-box box" >
          <div id="scancodeActivity"></div>
        </div>
        <fieldNameDes/>
      </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { storeDisplayUploadScanGrowthCurve } from "@/api/activity-manage/display-activity-manage.js";
import {
  dispalyShowStatus,
  dispalyExamineSuggesteStatus,
  displayParketCheckStatus
} from "@/util/ENUMS.js";
import exportBtn from "../../components/Button/export-btn.vue";
import detailBtn from "../../components/Button/detail-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import fieldNameDes from "../../components/field-name-description.vue";
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
import { displayApplyDetailTwo } from "@/api/activity-manage/display-activity-manage.js";
export default {
  name: "display-store-upload-line-keepAlive",
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
      myModalisShow: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据:[]
      social: [],
      showQuery: false,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      storeGoodsList: [],
      groupList: [],
      formData: {
        brandId: "",
        groupId: "",
        activityId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "" //四级组织
      },
      page: 1,
      pageNum: 0,
      rule: {},
      brandList: [],
      activityList: []
    };
  },
  components: { exportBtn, detailBtn, myModal, fieldNameDes },
  mounted() {
    this.drawLine();
    window.addEventListener("resize", () => {
      this.myChart.resize(); 
    }, false);
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
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("scancodeActivity"));
      let option = {
        color: ["#FF706E", "#6F99FF", "#80FF80", "#FF8096", "#800080"],
        title: {
          text: "陈列上传成长曲线"
        },
        tooltip: {
          trigger: "axis"
        },
        // color: ["#FF0000"],
        legend: {
          data: ["当日上传门店数", "当日上传数"]
        },
        // grid: {
        //   left: "3%",
        //   right: "4%",
        //   bottom: "3%",
        //   containLabel: true
        // },
        grid: {
          x: 50,
          x2: 50,
          y: 60,
          y2: 30
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: "保存"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [],
          axisLine: {
            lineStyle: {
              color: "#999999",
              width: 1
            }
          }
          //data:this.activityGrowup.activityCountDate,
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} "
            },
            min: 0,
            max: 30,
            axisLine: {
              lineStyle: {
                color: "#999999",
                width: 1
              }
            }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            show: true,
            type: "slider",
            y: "90%",
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: "当日上传门店数",
            type: "line",
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: []
          },
          {
            name: "当日上传数",
            type: "line",
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: []
          }
        ]
      };

      this.myChart.setOption(option);
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
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      });
    },
    closeModal() {
      this.myModalisShow = false;
    },
    showDetail() {
      this.myModalisShow = true;
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
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    submit(name) {
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
      this.Global.doPost(
        "report/storeDisplayUploadScanGrowthCurve.json",
        data,
        res => {
          let datalist = res;
          let activityCountDate = []; //时间
          let activityScanCount = []; //当日上传门店数
          let activityStoreCount = []; //活跃门店数
          // let uploadNumList = [];
          for (var key in datalist) {
            activityCountDate.push(datalist[key]["countDate"]);
            activityScanCount.push(datalist[key]["uploadCount"]);
            activityStoreCount.push(datalist[key]["storeCount"]);
            // uploadNumList.push(datalist[key]["storeCount"])
          }
          //分别返回扫码量和门店数最大值
          let ScanMax = Math.max.apply(Math, activityScanCount);
          let StoreMax = Math.max.apply(Math, activityStoreCount);

          //返回扫码量和门店数中最大值
          let NumberMax = ScanMax > StoreMax ? ScanMax : StoreMax;
          this.myChart.setOption({
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: activityCountDate
            },
            // grid: {
            //   left: "3%",
            //   right: "4%",
            //   bottom: "3%",
            //   containLabel: true
            // },
            grid: {
              x: 50,
              x2: 50,
              y: 60,
              y2: 30
            },
            yAxis: [
              {
                type: "value",
                axisLabel: {
                  formatter: "{value} "
                },
                min: 0,
                max: NumberMax
              }
            ],
            series: [
              {
                name: "当日上传门店数",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityStoreCount
              },
              {
                name: "当日上传数",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityScanCount
              }
            ]
          });
        }
      );
      return;
      storeDisplayUploadScanGrowthCurve(data).then(res => {
        if (res.status == "1") {
          let datalist = res.data;
          let activityCountDate = []; //时间
          let activityScanCount = []; //当日上传门店数
          let activityStoreCount = []; //活跃门店数
          for (var key in datalist) {
            activityCountDate.push(datalist[key]["countDate"]);
            activityScanCount.push(datalist[key]["uploadCount"]);
            activityStoreCount.push(datalist[key]["storeCount"]);
          }
          //分别返回扫码量和门店数最大值
          let ScanMax = Math.max.apply(Math, activityScanCount);
          let StoreMax = Math.max.apply(Math, activityStoreCount);

          //返回扫码量和门店数中最大值
          let NumberMax = ScanMax > StoreMax ? ScanMax : StoreMax;
          this.myChart.setOption({
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: activityCountDate
            },
            yAxis: [
              {
                type: "value",
                axisLabel: {
                  formatter: "{value} "
                },
                min: 0,
                max: NumberMax
              }
            ],
            series: [
              {
                name: "当日上传门店数",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityStoreCount
              },
              {
                name: "当日上传数",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityScanCount
              }
            ]
          });
        }
      });
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
        console.log(res.data);
        if (res && res.status == 1) {
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
  },
  filters: {
    displayCheckStatusFilters(val) {
      return displayParketCheckStatus[val];
    }
  }
};
</script>


