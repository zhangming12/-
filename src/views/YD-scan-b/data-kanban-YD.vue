<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-top: 10px;
  padding-bottom: 10px !important;
  .form {
    display: flex;
    justify-content: space-between;
  }
  .container {
    width: 87.5%;
    .w18 {
      width: 20%;
    }
  }
}
.imageBox {
  // background-color: red;
  height: 100%;
  min-height: 600px;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  .left,
  .right {
    flex: 1;
    position: relative;
    .tooltip {
      position: absolute;

      top: 25px;
      z-index: 1000;
      right: 3%;
      .fSpan {
        margin-right: 8px;
        .greenColor {
          color: green;
        }
        .redColor {
          color: red;
        }
        .blueColor {
          color: blue;
        }
      }
    }
    .image {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">粤东B端扫码+集卡活动-数据看板</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="item.id"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.groupId" placeholder="活动包名*">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="item.id"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
          </div>
          <div class="btn-right w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="init">
                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="box imageBox">
        <div class="left">
          <div class="tooltip">
            <span class="fSpan">
              已合成:
              <span class="greenColor">{{ synthesized }}</span>
            </span>
          </div>
          <div id="card-num" class="image"></div>
        </div>
        <div class="right">
          <div class="tooltip">
            <span class="fSpan">
              总门店数:
              <span class="greenColor">{{ totalStore }}</span>
            </span>
          </div>
          <div id="card-summary" class="image"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "data-kanban-YD",
  data() {
    return {
      formData: {},
      brandList: [],
      groupList: [],
      image1: null,
      image2: null,
      synthesized: 0, //已合成
      totalStore: 0 //总门店数
    };
  },
  components: {},
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { activityType: 7 },
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
    this.image1 = echarts.init(document.getElementById("card-num"));
    this.image2 = echarts.init(document.getElementById("card-summary"));
    this.imageOneInit();
    this.imageTwoInit();
    // this.init();
  },
  watch: {},
  methods: {
    //根据品牌查询活动包
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        // "condition/queryGroup.json",
        "condition/queryGroup.json",
        { date: 7, activityTypes: [1, 7], scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.init();
          }
        }
      );
    },
    imageOneInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "集卡合成数",
          x: 10,
          y: 10
        },
        xAxis: {
          type: "category",
          data: xAxisData
        },
        yAxis: {
          type: "value"
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: yAxisData,
            name: "饮料领取瓶数",
            type: "line"
          }
        ]
      };
      this.image1.setOption(option, true);
    },
    imageTwoInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "门店集卡阶段统计",
          x: 10,
          y: 10
        },
        xAxis: {
          type: "category",
          // show: false,
          data: xAxisData,
          //隐藏轴线
          axisLine: {
            show: false
          },
          //隐藏刻度线
          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          show: false
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: yAxisData,
            name: "门店数",
            itemStyle: {
              normal: {
                color: "#4ad2ff",
                label: {
                  show: true, //开启显示
                  position: "top", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "black",
                    fontSize: 12
                  }
                }
              }
            },
            type: "bar"
          }
        ]
      };
      this.image2.setOption(option, true);
    },
    getTimeStr(time) {
      let str = this.Global.createTime(time);
      return str.slice(5, 10);
    },
    getXaris(str) {
      if (str) return `${str}张`;
      else return "";
    },
    init() {
      if (!this.formData.brandId) {
        this.$Message.info("请选择品牌");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.info("请选择活动");
        return false;
      }
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("collect/makeCardsBoardList.json", data, res => {
        this.synthesized = res.makeData.items;
        this.totalStore = res.storeData.items;
        if (res.makeData && res.makeData.datalist) {
          let arr = res.makeData.datalist;
          let xAxisData = [];
          let yAxisData = [];
          arr.forEach(item => {
            xAxisData.push(this.getTimeStr(item.makeBoardTime));
            yAxisData.push(item.makeBoardNum ? item.makeBoardNum : 0);
          });
          this.imageOneInit(xAxisData, yAxisData);
        }
        if (res.storeData && res.storeData.datalist) {
          let arr = res.storeData.datalist;
          let xAxisData = [];
          let yAxisData = [];
          arr.forEach(item => {
            xAxisData.push(this.getXaris(item.cardsBoardNum));
            yAxisData.push(item.storeBoardNum ? item.storeBoardNum : 0);
          });
          this.imageTwoInit(xAxisData, yAxisData);
        }
      });
    }
  }
};
</script>