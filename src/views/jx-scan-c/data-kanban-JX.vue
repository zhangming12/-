<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 10px !important;
  .box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    min-height: 100%;
  }
}
/*将页面分为4个部分*/
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.clearfix {
  *zoom: 1;
}
.thewrap {
  //   margin-top: 16px;
  padding-left: 20px;
  padding-right: 20px;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  overflow: auto;
  position: relative;
  .tooltip {
    position: absolute;

    top: 25px;
    z-index: 1000;
    &.toolLeft {
      right: 53%;
    }
    &.toolRight {
      right: 6%;
    }
    .title {
      display: inline-block;
      width: 70px;
    }
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
}
.quarter-div {
  width: 50%;
  height: 100%;
  box-sizing: border-box;
  float: left;
  overflow: auto;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">江西C端扫码活动-数据看板</h2> -->
    <div class="main-container">
      <div class="box">
        <div class="clearfix thewrap">
          <div class="tooltip toolLeft">
            <span class="fSpan">
              已参与:
              <span class="greenColor">{{ receivedNum }}</span>
            </span>
            <span class="fSpan">
              未参与:
              <span class="redColor">{{ unReceivedNum }}</span>
            </span>
          </div>
          <div class="tooltip toolRight">
            <span class="fSpan">
              累计领劵:
              <span class="greenColor">{{ addReceivedNum }}</span>
            </span>
            <span class="fSpan">
              生动化:
              <span class="redColor">{{ underlineNum }}</span>
            </span>
            <span class="fSpan">
              抖音:
              <span class="blueColor">{{ tiktok }}</span>
            </span>
            <span class="fSpan">
              其他:
              <span class="greenColor">{{ other }}</span>
            </span>
          </div>
          <div class="quarter-div" id="image1"></div>
          <div class="quarter-div" id="image2"></div>
        </div>
        <div class="clearfix thewrap">
          <div class="tooltip toolLeft">
            <span class="fSpan">
              领劵成功:
              <span class="redColor">{{ getTicketSuccess }}</span>
            </span>
          </div>
          <div class="tooltip toolRight">
            <span class="fSpan">
              核销成功:
              <span class="redColor">{{ verificSuccessNum }}</span>
            </span>
          </div>
          <div class="quarter-div" id="image3"></div>
          <div class="quarter-div" id="image4"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "data-kanban-JX",
  data() {
    return {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      // xAxisData: [],
      receivedNum: 0, //已参与
      unReceivedNum: 0, //未参与
      addReceivedNum: 0, //累计领劵
      underlineNum: 0, //生动化
      tiktok: 0, //抖音
      other: 0, //其他
      getTicketSuccess: 0, //领劵成功
      verificSuccessNum: 0 //核销成功
    };
  },
  components: {},
  created() {},
  mounted() {
    this.image1 = echarts.init(document.getElementById("image1"));
    this.image2 = echarts.init(document.getElementById("image2"));
    this.image3 = echarts.init(document.getElementById("image3"));
    this.image4 = echarts.init(document.getElementById("image4"));
    this.imageOneInit();
    this.imageTwoInit();
    this.imageThreeInit();
    this.imageFourInit();
    this.init();
    // this.xAxisData = this.getxAxisData(15);
  },
  watch: {},
  methods: {
    getxAxisData(days) {
      let oneDayTime = 24 * 60 * 60 * 1000;
      let nowTime = Date.now();
      let arr = [];
      for (let i = 0; i < days; i++) {
        let str = new Date(nowTime - i * oneDayTime).pattern("MM-dd");
        arr.push(str);
      }
      return arr;
    },

    imageOneInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "参与活动门店",
          x: 10,
          y: 10
        },
        color: ["red", "blue", "green"],
        xAxis: {
          type: "category",
          data: xAxisData,
          // data: this.xAxisData,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45"
          }
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
            name: "已参与",
            type: "line"
          }
        ]
      };
      this.image1.setOption(option, true);
    },
    imageTwoInit(
      xAxisData = [],
      underlineData = [],
      tiktokData = [],
      otherData = []
    ) {
      let option = {
        title: {
          text: "领劵渠道",
          x: 10,
          y: 10
        },
        color: ["red", "blue", "green"],
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45"
          }
        },
        yAxis: {
          type: "value"
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: underlineData,
            name: "生动化",
            type: "line"
          },
          {
            data: tiktokData,
            name: "抖音",
            type: "line"
          },
          {
            data: otherData,
            name: "其他",
            type: "line"
          }
        ]
      };
      this.image2.setOption(option, true);
    },
    imageThreeInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "领劵用户数",
          x: 10,
          y: 10
        },
        color: ["red", "blue", "green"],
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45"
          }
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: yAxisData,
            name: "领劵成功",
            type: "line"
          }
        ]
      };
      this.image3.setOption(option, true);
    },
    imageFourInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "核销记录",
          x: 10,
          y: 10
        },
        color: ["red", "blue", "green"],
        xAxis: {
          type: "category",
          data: xAxisData,
          axisLabel: {
            //坐标轴刻度标签的相关设置。
            interval: 0,
            rotate: "45"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: yAxisData,
            name: "核销成功",
            type: "line"
          }
        ]
      };
      this.image4.setOption(option, true);
    },
    getTimeStr(time) {
      let str = this.Global.createTime(time);
      return str.slice(5, 10);
    },
    init() {
      let data = {};
      this.Global.doPost("verific/JXDataBoard.json", data, res => {
        /**
         * 头部的数据都放在最后一条里面
         */
        if (res && res.length) {
          let titleData = res[res.length - 1];
          this.receivedNum = titleData.joinedStore ? titleData.joinedStore : 0; //已参与
          this.unReceivedNum = titleData.unjoinedStore
            ? titleData.unjoinedStore
            : 0; //未参与
          this.addReceivedNum = titleData.addGetTicket
            ? titleData.addGetTicket
            : 0; //累计领劵
          this.underlineNum = titleData.allUnderlineNum
            ? titleData.allUnderlineNum
            : 0; //生动化
          this.tiktok = titleData.allTiktokNum ? titleData.allTiktokNum : 0; //抖音
          this.other = titleData.allOtherNum ? titleData.allOtherNum : 0; //其他
          this.getTicketSuccess = titleData.getTicketSuccess
            ? titleData.getTicketSuccess
            : 0; //领劵成功
          this.verificSuccessNum = titleData.verificSuccess
            ? titleData.verificSuccess
            : 0; //核销成功
          let xAxisData = []; //x轴数据
          let oneYAxisData = [], //参与活动门店数据
            underlineData = [], //生动化
            tiktokData = [], //抖音
            otherData = [], //其他
            threeYAxisData = [], //领劵用户数
            fourYAxisData = []; //核销记录
          res.forEach(item => {
            xAxisData.push(this.getTimeStr(item.date));
            oneYAxisData.push(
              item.joinActivityStore ? item.joinActivityStore : 0
            );
            underlineData.push(item.underline ? item.underline : 0);
            tiktokData.push(item.tiktok ? item.tiktok : 0);
            otherData.push(item.other ? item.other : 0);
            threeYAxisData.push(
              item.receivedTicketNum ? item.receivedTicketNum : 0
            );
            fourYAxisData.push(item.verificRecord ? item.verificRecord : 0);
          });
          this.imageOneInit(xAxisData, oneYAxisData);
          this.imageTwoInit(xAxisData, underlineData, tiktokData, otherData);
          this.imageThreeInit(xAxisData, threeYAxisData);
          this.imageFourInit(xAxisData, fourYAxisData);
        }
      });
    }
  }
};
</script>