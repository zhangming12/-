<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  background: #fff;
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
  .submit {
    width: 76px;
    height: 30px;
    background: @primary-color;
    text-align: center;
    line-height: 30px;
    color: #fff;
    display: inline-block;
    position: absolute;
    bottom: 0;
    left: 570px;
    cursor: pointer;
  }
  .txt {
    color: @primary-color;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">转出&提现</h2> -->
    <div class="box">
      <Row>
        <Col span="12">
          <div id="money">
            <label>品牌：</label>
            <div class="inputBox">
              <Select v-model="brandId" placeholder="请选择品牌" @on-change="changeBrand">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </div>
          </div>
          <div id="money">
            <label>汇款银行：</label>
            <div class="inputBox">
              <Input placeholder="请输入汇款银行" v-model.trim="bankName"></Input>
            </div>
          </div>
          <div id="money">
            <label>转出金额：</label>
            <div class="inputBox">
              <Input @on-change="NumberToChinese" placeholder="请输入转入金额" v-model.trim="money"></Input>
            </div>
            <span>元</span>
          </div>
          <div id="money" style="position: relative;">
            <label style="float: left;">备注：</label>
            <div class="inputBox">
              <Input v-model.trim="memo"></Input>
              <!-- <Input type="textarea" :autosize="{minRows: 5,maxRows: 7}" v-model.trim="memo"></Input> -->
            </div>
          </div>
        </Col>
        <Col span="12">
          <div id="money">
            <label>账户余额：</label>
            <span>{{ allMoney }}元</span>
          </div>
          <div id="money">
            <label>汇款单号：</label>
            <div class="inputBox">
              <Input placeholder="请输入汇款单号" v-model.trim="remitNo"></Input>
            </div>
          </div>
          <div id="money">
            <label>确认转出金额：</label>
            <div class="inputBox">
              <!-- <Input placeholder="请输入转入金额" v-model.trim="money" :disabled="true"></Input> -->
              <Input v-model.trim="text" placeholder="请输入转入金额" :readonly="true"></Input>
            </div>
            <!-- <span>元</span> -->
          </div>
        </Col>
      </Row>
      <Row>
        <Col span="24" style="text-align: center;">
          <Button class="btn-search" type="primary" @click="submit">转出</Button>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
export default {
  name: "widthdraw-list-keepAlive",
  data() {
    return {
      money: "",
      memo: "",
      allMoney: 0,
      brandId: "",
      brandList: [],
      remitNo: "",
      bankName: "",
      text: "",
      unit: ["仟", "佰", "拾", "", "仟", "佰", "拾", "", "角", "分"]
    };
  },
  created: function() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.brandId = this.brandList[0].id;
      }
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
    submit(name) {
      if (this.brandId == "") {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (this.bankName == "") {
        this.$Message.error("请输入汇款银行");
        return false;
      }
      if (this.remitNo == "") {
        this.$Message.error("请输入汇款单号");
        return false;
      }
      if (this.money == "") {
        this.$Message.error("请输入金额");
        return false;
      }
      if (this.allMoney < Number(this.money)) {
        this.$Message.error("请输入合理的转出金额");
        return false;
      }

      this.Global.doPost(
        "brandAccount/transferApply.json",
        {
          brandId: this.brandId,
          remitPrice: this.money,
          payMode: 2,
          memo: this.memo,
          remitArrow: 2,
          reciptInfo: {
            remitNo: this.remitNo,
            bankName: this.bankName
          }
        },
        res => {
          this.$Message.success("转出申请已提交");
        }
      );
    },
    changeBrand: function() {
      this.allBlance();
    },
    allBlance() {
      this.Global.doPost(
        "brandAccount/getBrandAcount.json",
        this.brandId,
        res => {
          if (res) {
            this.allMoney = res.usedBalance;
          } else {
            this.allMoney = 0;
          }
        }
      );
    }
  }
};
</script>


