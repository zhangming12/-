<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 10px;
  background: #fff;
  h4 {
    font-size: 14px;
    width: 100px;
    text-align: right;
  }
  ul {
    padding: 0 130px;
    overflow: hidden;
    .children {
      width: 160px;
      height: 40px;
      float: left;
      margin-right: 70px;
      margin-bottom: 20px;
      border: 1px solid #d2d2d2;
      text-align: center;
      line-height: 40px;
    }
    .select {
      border-color: @primary-color;
    }
  }
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}

.export {
  height: 24px;
  position: relative;
  div {
    border: 1px solid @primary-color;
    padding: 3px 12px;
    float: right;
    border-bottom: 0;
    position: absolute;
    right: 1px;
    bottom: -1px;
    color: @primary-color;
    cursor: pointer;
    i {
      margin-right: 2px;
    }
  }
}
#money {
  overflow: hidden;
  margin-bottom: 20px;
  width: 450px;
  label {
    width: 100px;
    text-align: right;
    padding: 6px 0;
    display: inline-block;
    font-size: 14px;
  }
  .inputBox {
    display: inline-block;
    width: 70%;
  }

  .txt {
    display: inline-block;
    color: @primary-color;
  }
}
.submit {
  width: 76px;
  height: 30px;
  background: @primary-color;
  text-align: center;
  line-height: 30px;
  color: #fff;
  display: inline-block;
  cursor: pointer;
}
.boxBottom {
  margin-top: 15px;
  padding-bottom: 20px;
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">转入&充值</h2> -->
      <div class="box">
          <h4>转入银行 : </h4>
          <ul class="brankList">
            <li :class="[{select: active == item.bankCode },'children']" v-for="(item,index) in bankList" :key="index" @click="select(item.bankCode)">
                <img :src="item.logo" alt="">
            </li>
          </ul>
      </div>
      <div class="box boxBottom">
              <Row>
                  <Col span="12">
                    <div id="money">
                        <label>品牌： </label>
                        <div class="inputBox">
                            <Select v-model="brandId" placeholder="请选择品牌">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </div>
                    </div>
                </Col>
                <Col span="12">
                    <div id="money">
                        <label>汇款单号： </label>
                        <div class="inputBox">
                            <Input placeholder="请输入汇款单号" v-model.trim="remitNo"></Input>
                        </div>
                    </div> 
                </Col>
                
                <Col span="12">
                    <div id="money">
                        <label>金额： </label>
                        <div class="inputBox">
                            <Input placeholder="请输入转入金额" @on-change="NumberToChinese" v-model.trim="money"></Input>
                        </div>
                        <span>元</span>
                    </div> 
                </Col>
                <Col span="12">
                    <div id="money">
                        <label>确认转入金额：</label>
                        <div class="inputBox">
                            <!-- <Input v-model.trim="money" :disabled="true"></Input> -->
                            <Input v-model.trim="text" :readonly="true"></Input>
                        </div>
                        <!-- <span>元</span> -->
                    </div>
                </Col>
                
                <Col span="12">
                    <div id="money" style="position: relative;">
                        <label style="float: left;">备注：</label>
                        <div class="inputBox">
                            <Input v-model.trim="memo"></Input>
                        </div>
                    </div>
                </Col>
            </Row>  
            <Row>
                <Col span="24" style="text-align: center;">                    
                    <Button  class="btn-search" type="primary" @click="submit">提交</Button>                
                </Col>
            </Row> 
      </div>
  </div>
</template>

<script>
export default {
  name:"recharge-list-keepAlive",
  data() {
    return {
      formData: {},
      active: null,
      bankList: [],
      money: "",
      memo: "",
      brandList: [],
      brandId: "",
      bankCode: "",
      remitNo: "",
      text: "",
      unit: ["仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"]
    };
  },
  created: function() {
    var that = this;
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.brandId = this.brandList[0].id;
      }
    });
    this.Global.getBankList(function(res) {
      that.bankList = res;
    });
  },
  methods: {
    toDx(n) {
      //阿拉伯数字转换函数
      switch (n) {
        case "0":
          return "零";
        case "1":
          return "壹";
        case "2":
          return "贰";
        case "3":
          return "叁";
        case "4":
          return "肆";
        case "5":
          return "伍";
        case "6":
          return "陆";
        case "7":
          return "柒";
        case "8":
          return "捌";
        case "9":
          return "玖";
      }
    },
    // 转换算法主函数
    NumberToChinese(e) {
      let m = Number(e.target.value);
      m *= 100;
      m += "";
      let length = m.length;

      let result = "";
      for (let i = 0; i < length; i++) {
        if (i == 2) {
          result = "元" + result;
        } else if (i == 6) {
          result = "万" + result;
        }
        if (m.charAt(length - i - 1) == 0) {
          if (i != 0 && i != 1) {
            if (
              result.charAt(0) != "零" &&
              result.charAt(0) != "元" &&
              result.charAt(0) != "万"
            ) {
              result = "零" + result;
            }
          }
          continue;
        }
        result =
          this.toDx(m.charAt(length - i - 1)) +
          this.unit[this.unit.length - i - 1] +
          result;
      }
      result += result.charAt(result.length - 1) == "元" ? "整" : "";
      this.text = result;
    },
    select: function(id) {
      //时间选择
      this.active = id;
      this.bankCode = id;
    },
    submit: function() {
      var that = this;
      if (this.bankCode == "") {
        this.$Message.error("请选择银行");
        return false;
      }
      if (this.money == "") {
        this.$Message.error("请输入金额");
        return false;
      }
      if (this.remitNo == "") {
        this.$Message.error("请输入汇款单号");
        return false;
      }
      if (this.brandId == "") {
        this.$Message.error("请选择品牌");
        return false;
      }
      this.Global.doPost(
        "brandAccount/transferApply.json",
        {
          brandId: this.brandId,
          remitPrice: this.money,
          payMode: 2,
          memo: this.memo,
          remitArrow: 1,
          reciptInfo: {
            bankCode: this.bankCode,
            remitNo: this.remitNo
          }
        },
        function(res) {
          that.$Message.success("转入申请已提交");
        }
      );
    }
  }
};
</script>


