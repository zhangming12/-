<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;
      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    color: #333;
    cursor: pointer;
  }
  .demo {
    float: right;
    color: @primary-color;
    line-height: 24px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}

.vertical-center-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .ivu-modal {
    top: 0;
  }
  video {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
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
.showRadio {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -250px;
  // border: 1px solid black;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #f5f7f9;
  border-radius: 5px;
  .close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
}
.box {
  ul.ull {
    overflow: hidden;
    li {
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
      // border:1px solid #ccc;
      cursor: pointer;
      margin: 10px;
      padding: 0 12px;
      // background:#00cc66;
      background: #ccc;
      border-radius: 4px;
      color: #fff;
    }
    li.checked {
      background: #00cc66;
    }
  }
}
</style>

<template>
  <div id="Main">
    <h2 class="Title">陈列折扣使用情况汇总-品牌及经销商</h2>
    <div class="box">
      <Form ref="form" :model="formData" :label-width="85">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId">
              <Select
                v-model="formData.brandId"
                placeholder="请选择"
                @on-change="changeValue"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="分组名称:" prop="presentId">
              <Select v-model="formData.presentId" placeholder="请选择" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in presentNameList"
                  :key="index"
                >{{ item.activityTag }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="活动包名:" prop="groupId">
              <Select
                v-model="formData.groupId"
                placeholder="请选择"
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
          </Col>
          <Col span="7">
            <Form-item label="活动名称:" prop="activityId">
              <Select
                v-model="formData.activityId"
                placeholder="请选择"
                @on-change="getpresentList"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px">
            <div class="searchBox">
              <Button @click="submit()" type="primary">查询</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;">
      <ul class="ull">
        <li
          @click="changeImageData(index)"
          :class="checkImg[index].checked?'checked':''"
          v-for="(item,index) in keys"
          :key="item"
        >{{item}}</li>
      </ul>
      <div ref="scancodeActivity" :style="{height: '500px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "display-prizes-summary-keepAlive",
  data() {
    return {
      formData: {
        presentId: "", //分组id
        groupId: "", //活动包名ID
        brandId: "", //品牌ID
        activityId: "" //活动ID
      },
      keys: [],
      myChart: null,
      // showQuery: false,
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [], //分组
      nameData: ["当日收货量", "当日待收货量", "当日失效量"],
      imageData: {},
      checkImg: []
    };
  },
  created() {
    //获取品牌列表数据
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
          this.drawLine();
          this.init();
        }
      }
    );
  },
  mounted() {
    // this.$nextTick
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(this.$refs.scancodeActivity);
      let option = {
        color: ["#0093FA", "#009943", "#FF3E39"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: ["当日收货量", "当日待收货量", "当日失效量"],
          top: "20px"
        },
        xAxis: {
          data: []
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "当日收货量",
            type: "bar",
            barGap: 0,
            data: [0, 0, 0, 0, 0, 0]
          },
          {
            name: "当日待收货量",
            type: "bar",
            barGap: 0,
            data: [0, 0, 0, 0, 0, 0]
          },
          {
            name: "当日失效量",
            type: "bar",
            barGap: 0,
            data: [0, 0, 0, 0, 0, 0]
          }
        ]
      };

      this.myChart.setOption(option);
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { activityType: 3, scope: "a", date: 7, brandId: value },
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
    getpresentList(value) {
      this.presentNameList = [];
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd HH:mm:ss");
    },
    submit() {
      this.init();
    },
    liClick(i) {},
    changeImageData(n) {
      let xData = [];
      let seriesData = [];
      if (this.keys.length >= 1) {
        for (let i = 0; i < this.imageData[this.keys[n]].length; i++) {
          xData.push(
            this.Global.createTime(
              this.imageData[this.keys[n]][i].countDate
            ).slice(0, 10)
          );
        }
        for (let j = 0; j < 3; j++) {
          var sData = [];
          for (let i = 0; i < this.imageData[this.keys[n]].length; i++) {
            if (j == 0) {
              sData.push(this.imageData[this.keys[n]][i].verifyAmount);
            }
            if (j == 1) {
              sData.push(this.imageData[this.keys[n]][i].allBalanceAmount);
            }
            if (j == 2) {
              sData.push(this.imageData[this.keys[n]][i].expireAmount);
            }
          }
          seriesData.push({
            name: this.nameData[j],
            type: "bar",
            barGap: 0,
            data: sData.reverse()
          });
        }
      }
      for (let i = 0; i < this.checkImg.length; i++) {
        this.checkImg[i].checked = false;
        if (i == n) {
          this.checkImg[i].checked = true;
        }
      }
      this.myChart.clear();
      this.myChart.setOption({
        color: ["#0093FA", "#009943", "#FF3E39"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: ["当日收货量", "当日待收货量", "当日失效量"],
          top: "20px"
        },
        xAxis: {
          data: []
        },
        yAxis: {
          type: "value"
        },
        title: {
          text: this.keys[n],
          show: true
        },
        xAxis: {
          data: xData.reverse()
        },
        series: seriesData.reverse()
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);

      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("goodsInfo/useGoodsInfoSummary.json", data, res => {
        this.imageData = res;
        this.keys = [];
        for (let key in res) {
          this.keys.push(key);
        }
        for (let i = 0; i < this.keys.length; i++) {
          this.checkImg.push({
            checked: false
          });
        }
        this.changeImageData(0);
      });
    }
  }
};
</script>