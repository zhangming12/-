<style lang="less" scoped>
@import "../../../config/index.less";
.main-container {
  min-height: 100%;
  background: #fff;
  padding-top: 10px;
}
#Main {
  padding: 10px 15px;
  height: 100%;
  .brandTop {
    // overflow: hidden;
    position: relative;
    .btn-box {
      position: absolute;
      top: 8px;
      right: 5px;
    }
    .select-box {
      display: flex;
      justify-content: center;
    }
    h2 {
      float: left;
    }
  }
}
ul li {
  list-style-type: none;
}
#Top {
  height: 220px;
  overflow: hidden;
  padding: 1% 0;
  // margin-bottom: 5px;
  line-height: 1;
  .boxs {
    width: 47%;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    border-right: 1px solid #e5e5e5;
    float: left;
    margin-left: 1%;
    background: #fff;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    position: relative;
    .modal-btn {
      position: absolute;
      top: 6px;
      right: 0px;
    }
    .list {
      display: flex;
      justify-content: space-between;
      width: 70%;
      li {
        // width: 130px;
        // height: 30px;
        // line-height: 30px;
        // text-align: center;
        // background: @primary-color;
        // color: #fff;
        // font-size: 14px;
        cursor: pointer;
        a {
          color: #fff;
        }
      }
    }
    .today {
      width: 60%;
      display: flex;
      justify-content: space-between;
      li {
        background: transparent;
        color: #333;
        text-align: left;
        font-size: 14px;
        span {
          color: #3caf13;
        }
      }
    }
    .moneyNum {
      font-size: 14px;
      width: 100%;
      display: flex;
      justify-content: space-around;
      span {
        color: #fb634f;
      }
    }
    .outMoney {
      font-size: 24px;
      color: #fb634f;
    }
    .topText {
      font-size: 14px;
      color: #333;
    }
  }
  .boxBottom {
    // width: 46%;
    float: right;
    margin-right: 1%;
  }
}

.Title {
  text-indent: 1%;
  font-size: 14px;
  border-left: 3px solid @primary-color;
  height: 25px;
  line-height: 25px;
  margin-bottom: 10px;
}

#content {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  height: 58%;
  // margin-top: 1%;
  background: #fff;
  #inner {
    height: 100%;
    width: 90%;
    margin: 0 auto;
  }
}
.content {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding-top: 10px;
  background: #fff;
  ul.ull {
    overflow: hidden;
    li {
      float: left;
      height: 32px;
      line-height: 32px;
      text-align: center;
      // border: 1px solid #ccc;
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
.container {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
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
      margin-bottom: 20px;
    }
    .modal-container-item {
      padding-left: 140px;
      margin-bottom: 20px;
      .item {
        .required {
          color: #ed4014;
          margin-right: 5px;
        }
        .title {
          font-weight: bold;
        }
        .input {
          margin-right: 5px;
          width: 100px;
        }
      }
      .tip {
        font-size: 12px;
        color: #c5c8ce;
      }
    }
  }
  .maintain-footer {
    margin-top: 20px;
    // display: flex;
    // justify-content: space-around;
    text-align: center;
    button {
      margin: 0 30px;
    }
  }
}
#textarea {
  outline: @primary-color;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  display: block;
  width: 70%;
  text-indent: 10px;
  margin-top: 10px;
  min-height: 80px;
}
#textarea::-webkit-input-placeholder {
  color: #c5c8ce;
}
#textarea::-moz-placeholder {
  color: #c5c8ce;
}
#textarea:-ms-input-placeholder {
  color: #c5c8ce;
}
.item {
  list-style: none;
  img {
    vertical-align: middle;
    width: 18px;
    height: 18px;
    margin-bottom: 5px;
    margin-right: 3px;
  }
  span {
    vertical-align: middle;
  }
}
</style>

<template>
<!-- <div class="main-container"> -->
    <div id="Main">
      
        <div class="brandTop">
            <!-- <h2 class="Title" style="width: 80px">资金账户 </h2> -->
            <div class="select-box">
                <Select :disabled="!flag" v-model="brand" style=" width: 150px;" placeholder="请选择品牌" @on-change="changeBrand">
                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                </Select>
            </div>
            
        </div>
        <div id="Top">
            <div class="boxs">
                <div class="topText">账户余额</div>
                 <span style="color: #3caf13" class="outMoney">{{ Amount | keepFixTwo}}</span>
                <div class="moneyNum">
                    <div class="item">
                      <img src="../../../assets/image/15.png" alt="">
                      待清算 :
                        <span style="color: #fb634f">{{ paidMoney | keepFixTwo}}</span>元
                    </div>
                    <div class="item">
                      <img src="../../../assets/image/14.png" alt="">
                        用户待提金额 :
                        
                        <span style="color: #FED970">{{ unDrawMoney | keepFixTwo}}</span>元
                    </div>
                    
                </div>
                <div class="moneyNum">
                    
                    <div class="item">
                      <img src="../../../assets/image/16.png" alt="">
                      可用余额 :
                        <span style="color: #3caf13">{{ usedMoney | keepFixTwo}}</span>元
                    </div>
                    <div class="item">
                      <img src="../../../assets/image/13.png" alt="">
                      累计已提现金额 :
                        <span style="color: #29AAFF"> {{ getMoney | keepFixTwo}}</span>元
                    </div>
                    <!-- <div class="item">
                      <img src="../../../assets/image/14.png" alt="">
                        用户待提金额 :
                        
                        <span style="color: #FED970">{{ unDrawMoney | keepFixTwo}}</span>元
                    </div> -->
                </div>
                <ul class='list'>
                    <li>
                        <router-link to="/recharge">
                            <!-- 转入 -->
                            <Button type="success">转入</Button>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/widthdraw">
                        <!-- 转出 -->
                        <Button   type="error">转出</Button>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/capitalFlowRecords">
                        <!-- 查看资金流水 -->
                        <Button  type="primary" style="width:120px">查看资金流水</Button>
                        </router-link>
                    </li>
                    <!-- <li>
                        <Button  type="info" @click="myModalisShow = true">资金账户预警</Button>
                    </li> -->
                </ul>
                <div class="modal-btn item" @click="showMyModal">
                  <!-- <Button  type="text">账户预警</Button> -->
                  <warnBtn/>
                </div>
            </div>
            <div class="boxs boxBottom">
                <div class="topText">今日费用</div>
                <!-- <div class="outMoney">{{ CR | keepFixTwo}} - {{DR | keepFixTwo}}</div> -->
                <div class="outMoney" :style="{'color': CR > DR ? '#3caf13' : '#fb634f'}">{{ CR - DR | keepTwo}}</div>
                <ul class="today">
                    <li class="item">
                        <img src="../../../assets/image/18.png" alt="">
                        今日存入
                        <span> {{ CR | keepFixTwo}}元</span>
                    </li>
                    <li class="item">
                      <img src="../../../assets/image/17.png" alt="">
                          今日支出
                        <!-- <span> {{ DR==0?0:'-' }}{{ DR }}元</span> -->
                         <span> {{ DR | keepFixTwo}}元</span>
                    </li>
                </ul>
            </div>
        </div>

        <h2 class="Title">近一周账户收支情况</h2>

        <div id="content">
            <div id="inner" ref="inner">

            </div>
        </div>


        <!-- 新加 -->
        <div class="brandTop" style="margin-top:15px;">
            <h2 class="Title" style="width: 160px;float:left">实物账户 </h2>
            <!-- <Button @click="exportExcel" style=" width: 60px;float: right;margin-left: 20px;margin-right:10px;" class="btn-search  search_btn" type="primary">导出</Button> -->
            <!-- <Button @click="lookOutWriteOff" style=" width: 120px;float: right;" type="info">查看核销流水</Button> -->
            <div class="btn-box">
              <exportBtn class="btn-right" title="导出" @click.native="exportExcel"/>
              <lookBtn class="btn-right" title="查看核销流水" @click.native="lookOutWriteOff"/>
            </div>
            
        </div>

        <div class="container" style='margin-top: 15px;overflow: hidden;padding-bottom:20px;'>
          <Table style="max-height:300px;" :columns="columns1" :data="pageData" disabled-hover></Table>
        </div>

        <h2 class="Title">近一周账户核销情况</h2>

        <div class="content">
            <ul class='ull'>
              <li @click="changeImageData(index)" :class="checkImg[index].checked?'checked':''" v-for='(item,index) in keys' :key='item'>
                {{item}}
              </li>
            </ul>
            <div ref="outer" style="height:400px;padding:20px;">

            </div>
        </div>
      <!-- </div> -->
        
        <!-- 品牌资金账户预警 -->
        <myModal class="myModal"
            @close="closeModal"
            :modal="myModalisShow">
          <div slot="main" class="modal-main">
            <h3>品牌资金账户预警</h3>
            <div class="modal-container-item">
                <div class="item">
                    <span class="title">品牌名称：</span>{{formItem.brandName}}
                </div>
            </div>
            <div class="modal-container-item">
                <div class="item">
                    <span class="title">黄色预警：</span>低于
                    <InputNumber class="input" v-model.number="formItem.yellow"></InputNumber>元
                </div>
                <div class="tip">
                    Tip：低于黄色预警金额会立即提醒1次
                </div>
            </div>
            <div class="modal-container-item">
                <div class="item">
                    <span class="title">橙色预警：</span>低于
                    <InputNumber class="input" v-model.number="formItem.orange"></InputNumber>元
                </div>
                <div class="tip">
                    Tip：低于橙色预警金额每隔6小时预警
                </div>
            </div>
            <div class="modal-container-item">
                <div class="item">
                    <!-- <span class="required">*</span> -->
                    <span class="title">红色预警：</span>低于
                    <InputNumber class="input" v-model.number="formItem.red"></InputNumber>元
                </div>
                <div class="tip">
                    Tip：低于红色预警金额每隔10分钟预警
                </div>
            </div>
            <div class="modal-container-item">
                <div class="item">
                    <!-- <span class="required">*</span> -->
                    <span class="title">预警手机号:</span>
                    <span class="tip">
                        Tip:多个手机号之间用 | 隔开
                    </span>
                </div>
                <textarea v-model.trim="formItem.phone" id="textarea" placeholder="请输入手机号"></textarea>
            </div>
            <div class="maintain-footer">
                <Button type="text" @click="closeModal">取消</Button>
                <Button type="primary" @click="sureMethod">确定</Button>
            </div>
          </div>
        </myModal>
    </div>
</template>

<script>
import echarts from "echarts";
import myModal from "../../../components/Modal/my-modal.vue";
import warnBtn from "../../../components/Button/warn-btn.vue";
import lookBtn from "../../../components/Button/look-btn.vue";
import exportBtn from "../../../components/Button/export-btn.vue";
export default {
  name: "account-keepAlive",
  data() {
    return {
      timer: null,
      flag: true,
      myModalisShow: false,
      formItem: {
        //资金账户预警数据
        phone: "",
        yellow: null,
        red: null,
        orange: null,
        brandId: "",
        brandName: ""
      },
      Amount: "计算中",
      brand: "",
      brandList: [],
      CR: "计算中",
      DR: "计算中",
      usedMoney: "计算中",
      getMoney: "计算中", //累计已提现金额
      paidMoney: "计算中",
      unDrawMoney: "计算中",
      columns1: [
        {
          title: "折扣名称",
          key: "goodsName",
          align: "center"
        },
        {
          title: "发放总量",
          key: "totalAmount",
          align: "center"
        },
        {
          title: "已过期总量",
          key: "totalExpired",
          align: "center"
        },
        {
          title: "已核销总量",
          key: "totalUsed",
          align: "center"
        },

        {
          title: "待核销总量",
          key: "notUsed",
          align: "center"
        },
        {
          title: "今日核销总量",
          key: "todayAmount",
          align: "center"
        },
        {
          title: "今日核销门店总量",
          key: "todayStore",
          align: "center"
        }
      ],
      pageData: [],
      outer: "",
      checkImg: [],
      nameData: ["当日收货量", "当日待收货量", "当日失效量"],
      imageData: {},
      keys: []
    };
  },
  components: { myModal, warnBtn, lookBtn, exportBtn },
  created() {
    // condition/queryBrands.json
    // condition/queryAllBrands.json
    this.Global.doPostNoLoading("condition/queryAllBrands.json", "", res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.brand = this.brandList[0].id;
        this.formItem.brandName = this.brandList[0].brandName;
        this.drawLine();
        this.changeBrand();
      }
    });
  },
  watch: {
    myModalisShow(val) {
      if (!val) {
        //当弹窗关闭时，清除数据
        this.formItem.phone = "";
        this.formItem.yellow = null;
        this.formItem.orange = null;
        this.formItem.red = null;
      }
    }
  },
  mounted() {
    this.data = echarts.init(this.$refs.inner);
    var dataOption = {
      color: ["#3caf13", "#fb634f"],
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      grid: {
        show: true,
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: [],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      legend: {
        data: ["收入", "支出"],
        top: "20px"
      },
      series: []
    };
    this.data.setOption(dataOption);
    this.drawLine();
  },
  filters: {
    keepFixTwo(val) {
      let value = Number(val);
      if (isNaN(value)) {
        return "计算中";
      }
      return value.toFixed(2);
    },
    keepTwo(val) {
      let value = Math.abs(Number(val));
      if (isNaN(value)) {
        return "计算中";
      }
      return value.toFixed(2);
    }
  },
  methods: {
    showMyModal() {
      this.myModalisShow = true;
      // return
      this.Global.doPost(
        "brandAccount/getAccountWarnConfig.json",
        { brandId: this.brand },
        res => {
          console.log(res[0]);
          this.formItem = res[0];
          this.myModalisShow = true;
        }
      );
    },
    //确定设置资金账号预警
    sureMethod() {
      //当三级预警填了任意一个,电话号码不能为空
      if (this.formItem.red || this.formItem.yellow || this.formItem.orange) {
        if (!this.checkPhone()) {
          return false;
        }
      }
      //只填了手机号码时的校验校验手机号码
      if (this.formItem.phone) {
        if (!this.checkPhone()) {
          return false;
        }
      }
      let data = this.Global.JsonChange(this.formItem);
      this.Global.deleteEmptyProperty(data);
      delete data["brandName"];
      delete data["warnConfig"];
      console.log(data);
      this.Global.doPost("brandAccount/doSaveWarnConfig.json", data, res => {
        this.$Message.success("设置成功");
        this.closeModal();
      });
    },
    //校验手机号
    checkPhone() {
      if (!this.formItem.phone) {
        this.$Message.error("手机号码不能为空");
        return false;
      }
      let phoneArr = this.formItem.phone.split("|");
      for (let i = 0; i < phoneArr.length; i++) {
        if (!this.Global.checkPhone(phoneArr[i])) {
          this.$Message.error("请输入正确的手机号");
          return false;
        }
      }
      return true;
    },
    //关闭模态框
    closeModal() {
      this.myModalisShow = false;
    },
    lookOutWriteOff() {
      //查看核销流水
      let queryParams = {
        brandId: this.brand
      };
      this.$router.push({
        path: "./writeDownFlowRecord",
        query: queryParams
      });
    },
    exportExcel() {
      if (!this.brand) {
        this.$Message.error("请选择品牌");
        return false;
      }
      var url = this.Global.getExportUrl(
        "report/displayGoodsVerifyRecordExport.json",
        { brandId: this.brand }
      );
      window.open(url);
    },
    drawLine() {
      this.myChart = echarts.init(this.$refs.outer);
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: []
        },
        yAxis: {},
        // label: {
        //   normal: {
        //     show: true,
        //     position: "top",
        //     textStyle: {
        //       color: "black"
        //     }
        //   }
        // },
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
    init() {
      /* 
              DR: '转出'
              CR： ‘转入’
            */

      // this.DR = 0;
      // this.CR = 0;
      // this.Amount = 0; //账户余额
      // this.usedMoney = 0; //可用余额
      // this.getMoney = 0; //已提现金额
      // this.paidMoney = 0; //带清算金额
      // this.unDrawMoney = 0; //带清算金额
      if (!this.flag) {
        return;
      }
      this.timer = setTimeout(() => {
        this.flag = true;
        this.$Message.info("请求超时");
      }, 30000);
      this.flag = false;
      this.DR = "计算中";
      this.CR = "计算中";
      this.Amount = "计算中"; //账户余额
      this.usedMoney = "计算中"; //可用余额
      this.getMoney = "计算中"; //已提现金额
      this.paidMoney = "计算中"; //带清算金额
      this.unDrawMoney = "计算中"; //带清算金额

      this.data.showLoading(); // echart 自带 loading
      this.Global.doPost(
        "brandAccount/fundBoardWeekCount.json",
        this.brand,
        res => {
          console.log(res);
          this.DR = res.inoutAmout.outAmount;
          this.CR = res.inoutAmout.inAmount;
          var DRdata = [];
          var CRdata = [];
          var x_data = [];
          var ruset = {};
          if (res.bizMap) {
            x_data = Object.keys(res.bizMap);

            for (let i = 0; i < x_data.length; i++) {
              DRdata.push(res.bizMap[x_data[i]].outAmount);
              CRdata.push(res.bizMap[x_data[i]].inAmount);
            }
          }

          var seriesData = [];
          ruset["收入"] = CRdata;
          ruset["支出"] = DRdata;
          for (var j in ruset) {
            seriesData.push({
              name: j,
              type: "bar",
              data: ruset[j]
            });
          }
          this.data.setOption({
            xAxis: {
              data: x_data
            },
            series: seriesData
          });
          this.myChart.setOption({
            xAxis: {
              data: x_data
            }
          });
          this.data.hideLoading(); // 隐藏echart自带loading
        }
      );
      this.Global.doPost(
        "brandAccount/fundBoardBalace.json",
        this.brand,
        res => {
          this.Amount = res.totalAmount; //账户余额
          this.usedMoney = res.usedAmount; //可用余额
        }
      );
      this.Global.doPost(
        "brandAccount/fundBoardSumAmount.json",
        this.brand,
        res => {
          clearTimeout(this.timer);
          this.flag = true;
          this.paidMoney = res.paidAmount; //待清算金额
          this.unDrawMoney = res.unFundoutAmount; //用户待提金额
          this.getMoney = res.fundoutAmount; //累计已提现金额
        }
      );
    },
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
      // this.myChart = echarts.init(this.$refs.outer);
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
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          data: xData.reverse()
        },
        yAxis: {},
        title: {
          show: true,
          text: this.keys[n]
        },
        series: seriesData.reverse()
      });
    },
    changeBrand(value) {
      this.init();
      this.brandList.forEach(item => {
        if (item.id == value) {
          this.formItem.brandName = item.brandName;
        }
      });
      this.writeOffData();
      this.Global.doPost(
        "report/displayGoodsVerifyRecord.json",
        { brandId: this.brand },
        res => {
          if (!res) {
            this.pageData = [];
            return;
          }
          this.pageData = res;
        }
      );
    },
    writeOffData() {
      this.Global.doPost(
        "goodsInfo/useGoodsInfoSummary.json",
        { brandId: this.brand },
        res => {
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
        }
      );
    }
  }
};
</script>


