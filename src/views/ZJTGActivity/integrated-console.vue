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
    // background-color: red;
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
      <!-- <h2 class="Title">综合控制台</h2> -->
      <div class="main-container">
        <div class="box">
            <div class="clearfix thewrap">
                <div class="tooltip toolLeft" style="top:10px;line-height:20px;">
                  <p>
                    <span class="title">纤维+</span>
                    <span class="fSpan">
                        已领取:
                        <span class="greenColor">
                            {{ recAmount }}
                        </span>
                    </span>
                    <span class="fSpan">
                        未领取:
                        <span class="redColor">
                            {{ leftAmount }}
                        </span>
                    </span>
                  </p>
                  <p>
                    <span class="title">植场新人</span>
                    <span class="fSpan">
                        已领取:
                        <span class="greenColor">
                            {{ recTwoAmount }}
                        </span>
                    </span>
                    <span class="fSpan">
                        未领取:
                        <span class="redColor">
                            {{ leftTwoAmount }}
                        </span>
                    </span>
                  </p> 
                </div>
                <div class="tooltip toolRight">
                    <span class="fSpan">
                        累计参与活动用户:
                        <span class="greenColor">
                            {{ countUser }}
                        </span>
                    </span>
                </div>
                <div class="quarter-div" id="image1">
                    
                </div>
                <div class="quarter-div" id="image2">
                    
                </div>
            </div>
            <div class="clearfix thewrap">
                <div class="tooltip toolLeft">
                    <span class="fSpan">
                        已绑定:
                        <span class="greenColor">
                            {{ isBind }}
                        </span>
                    </span>
                    <span class="fSpan">
                        未绑定:
                        <span class="redColor">
                            {{ isNotBind }}
                        </span>
                    </span>
                </div>
                <div class="tooltip toolRight">
                    <span class="fSpan">
                        累计查看用户:
                        <span class="greenColor">
                            {{ shareLookCountUser }}
                        </span>
                    </span>
                </div>
                <div class="quarter-div" id="image3">

                </div>
                <div class="quarter-div" id="image4">
                    
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "integrated-console",
  data() {
    return {
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      recAmount: 0, //已领取
      leftAmount: 0, //未领取
      recTwoAmount: 0,
      leftTwoAmount: 0,
      countUser: 0, //累计参与活动用户
      isBind: 0, //已绑定
      isNotBind: 0, //未绑定
      shareLookCountUser: 0 //累计查看用户
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
  },
  watch: {},
  methods: {
    imageOneInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "饮料领取瓶数",
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
          text: "参与活动用户数",
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
            name: "参与活动用户数",
            type: "line"
          }
        ]
      };
      this.image2.setOption(option, true);
    },
    imageThreeInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "已绑定门店数",
          x: 10,
          y: 10
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          data: xAxisData
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: yAxisData,
            name: "已绑定门店数",
            type: "line"
          }
        ]
      };
      this.image3.setOption(option, true);
    },
    imageFourInit(xAxisData = [], yAxisData = []) {
      let option = {
        title: {
          text: "分享查看数量",
          x: 10,
          y: 10
        },
        xAxis: {
          type: "category",
          data: xAxisData
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
            name: "分享查看数量",
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
      this.Global.doPost(
        "storeZjtg/integratedControlConsole.json",
        data,
        res => {
          let {
            recAmount,
            leftAmount,
            countUser,
            isBind,
            isNotBind,
            shareLookCountUser,
            recTwoAmount,
            leftTwoAmount
          } = res[0];
          this.recAmount = recAmount ? recAmount : 0;
          this.leftAmount = leftAmount ? leftAmount : 0;
          this.recTwoAmount = recTwoAmount ? recTwoAmount : 0;
          this.leftTwoAmount = leftTwoAmount ? leftTwoAmount : 0;
          this.countUser = countUser ? countUser : 0;
          this.isBind = isBind ? isBind : 0;
          this.isNotBind = isNotBind ? isNotBind : 0;
          this.shareLookCountUser = shareLookCountUser ? shareLookCountUser : 0;

          if (res[0].recDrinksList && res[0].recDrinksList.length) {
            let arr = res[0].recDrinksList;
            let xAxisData = [];
            let yAxisData = [];
            arr.forEach(item => {
              xAxisData.push(this.getTimeStr(item.createTime));
              yAxisData.push(item.recAmount ? item.recAmount : 0);
            });
            this.imageOneInit(xAxisData, yAxisData);
          }

          if (res[0].countUserList && res[0].countUserList.length) {
            let arr = res[0].countUserList;
            let xAxisData = [];
            let yAxisData = [];
            arr.forEach(item => {
              xAxisData.push(this.getTimeStr(item.createTime));
              yAxisData.push(item.countUser ? item.countUser : 0);
            });
            this.imageTwoInit(xAxisData, yAxisData);
          }

          if (res[0].isBindList && res[0].isBindList.length) {
            let arr = res[0].isBindList;
            let xAxisData = [];
            let yAxisData = [];
            arr.forEach(item => {
              xAxisData.push(this.getTimeStr(item.createTime));
              yAxisData.push(item.isBind ? item.isBind : 0);
            });
            this.imageThreeInit(xAxisData, yAxisData);
          }
          
          if (res[0].shareLookList && res[0].shareLookList.length) {
            let arr = res[0].shareLookList;
            let xAxisData = [];
            let yAxisData = [];
            arr.forEach(item => {
              xAxisData.push(this.getTimeStr(item.createTime));
              yAxisData.push(
                item.shareLookCountUser ? item.shareLookCountUser : 0
              );
            });
            this.imageFourInit(xAxisData, yAxisData);
          }
        }
      );
    }
  }
};
</script>


