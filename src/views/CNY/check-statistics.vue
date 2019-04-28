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
  .form {
    position: relative;
    display: flex;
    // justify-content: center;
    align-items: center;
    .container {
      width: 87.5%;
      .w18 {
        width: 20%;
      }
    }
    .w10 {
      position: absolute;
      top: 0;
      right: 0;
    }
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
#echartsImage {
  width: 90%;
  height: 600px;
  margin-top: 30px;
}
.image {
  position: relative;
  .export-box {
    position: absolute;
    top: 0;
    right: 8%;
    z-index: 1000;
  }
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">签到统计</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" class="form" :model="formData" :label-width="10">
              <div class="container">
                <div class="btn-left w18">
                    <Form-item required>
                      <Select v-model="formData.brandId" placeholder="*品牌" @on-change="changeValue" clearable>
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{item.brandName}}</Option>
                      </Select> 
                    </Form-item>
                  </div>
                <div class="btn-left w18">
                  <Form-item  required>
                      <Date-picker style="display:block;" 
                      :options="options" 
                      type="daterange" placeholder="*选择日期" v-model="formData.queryTime"></Date-picker>
                  </Form-item>
                </div>
                <div class="btn-left w18">
                    <Form-item required>
                      <Select v-model="formData.oneLevel"  placeholder="*一级组织" @on-change="oneLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in oneLeverList" :key="index">{{item.areaName}}</Option>
                      </Select> 
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.twoLevel" placeholder="二级组织" @on-change="twoLevelChange" clearable>
                          <Option :value="item.id" v-for="(item,index) in twoLeverList" :key="index">{{item.areaName}}</Option>
                      </Select> 
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  required>
                      <Select v-model="formData.threeLevel" placeholder="三级组织" clearable>
                          <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index">{{item.areaName}}</Option>
                      </Select> 
                    </Form-item>
                  </div>
              </div>
              <div class="btn-left w10">
                  <div class="searchBox">
                    <div class="btn-right search-right" @click="submit('form')">
                      <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                    </div>
                  </div>
              </div>
          </Form>
        </div>
        <div class="box image">
          <div class="export-box">
            <Button @click="exportExcel" type="info">导出</Button>
          </div>
          <div id="echartsImage">
          </div>
        </div>
        <fieldNameDes/>
      </div>
  </div>
</template>

<script>
import exportBtn from "@/components/Button/export-btn.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import echarts from "echarts";
export default {
  name: "check-statistics-keepAlive",
  data() {
    return {
      brandList: [],
      echartsImage: null,
      options: {
        disabledDate(date) {
          const disabledDay = date.getTime();
          return disabledDay > new Date().getTime();
        }
      },
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      oneLevelData: [],
      twoLevelData: [],
      threeLevelData: [],
      showQuery: false,
      formData: {
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME],
        threeLevel: "",
        oneLevel: "",
        twoLever: ""
      }
    };
  },
  components: { exportBtn, fieldNameDes },
  watch: {},
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a" },
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
  mounted() {
    this.echartsImage = echarts.init(document.getElementById("echartsImage"));
    this.imageInit();
  },
  methods: {
    imageInit(
      yAxisData = [],
      signData = [],
      lateSignData = [],
      noSignData = [],
      waitSignData = []
    ) {
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["签到", "迟到签到", "未签到", "待签到"]
        },
        grid: {
          left: "5%",
          right: "4%",
          bottom: "3%",
          top: "50",
          containLabel: true
        },
        xAxis: {
          type: "value"
        },
        yAxis: {
          type: "category",
          // data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          data: yAxisData
        },
        series: [
          {
            name: "签到",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            // data: [320, 302, 301, 334, 390, 330, 320]
            data: signData
          },
          {
            name: "迟到签到",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            // data: [120, 132, 101, 134, 90, 230, 210]
            data: lateSignData
          },
          {
            name: "未签到",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            // data: [220, 182, 191, 234, 290, 330, 310]
            data: noSignData
          },
          {
            name: "待签到",
            type: "bar",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "insideRight",
                formatter: function(params) {
                  if (params.value > 0) {
                    return params.value;
                  } else {
                    return "";
                  }
                }
              }
            },
            // data: [150, 212, 201, 154, 190, 330, 410]
            data: waitSignData
          }
        ]
      };
      this.echartsImage.setOption(option, true);
    },
    oneLevelChange(value) {
      this.twoLeverList = [];
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
    submit(name) {
      if (!this.formData.queryTime[0]) {
        this.$Message.error("请输入查询时间");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.oneLevel) {
        this.$Message.error("一级组织不能为空");
        return false;
      }
      this.init(1);
    },
    changePage(size) {
      this.page = size;
      this.init(1);
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["signStartTime"] = this.Global.createTime(
        this.formData.queryTime[0]
      );
      data["signEndTime"] = this.Global.createTime(
        this.formData.queryTime[1]
      ).replace("00:00:00", "24:00:00");
      delete data["queryTime"];
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("cnySign/queryTotalSignInfo.json", data, res => {
        console.log(res);
        let keys = Object.keys(res);
        console.log(keys);
        let yAxisData = [],
          signData = [],
          lateSignData = [],
          noSignData = [],
          waitSignData = [];
        if (keys && keys.length) {
          keys.forEach(item => {
            let yAxis = item.split(",")[item.split(",").length - 1];
            yAxisData.push(yAxis);
            signData.push(res[item].normal);
            lateSignData.push(res[item].late);
            noSignData.push(res[item].abandon);
            waitSignData.push(res[item].wait);
          });
          console.log(signData);
        }
        this.imageInit(
          yAxisData,
          signData,
          lateSignData,
          noSignData,
          waitSignData
        );
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["signStartTime"] = this.Global.createTime(
        this.formData.queryTime[0]
      );
      data["signEndTime"] = this.Global.createTime(
        this.formData.queryTime[1]
      ).replace("00:00:00", "24:00:00");
      delete data["queryTime"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "cnySign/exportTotalSignInfo.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.formData.oneLevel = "";
      if (!value) return;
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0, level: 1 }).then(
        res => {
          if (res && res.status == 1) {
            this.oneLeverList = res.data;
          }
        }
      );
    }
  }
};
</script>


