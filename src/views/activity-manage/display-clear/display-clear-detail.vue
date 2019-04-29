<style lang="less" scoped>
@import "../../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.txt {
  margin-left: -20px;
}
footer {
  text-align: center;
  padding: 0 20px 20px;
  .btn-back {
    margin-left: 50px;
  }
  .btn-back:first-child {
    margin-left: 0;
  }
}
.backBox {
  text-align: center;
  margin: 20px 0;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动门店明细</h2> -->
    <div class="box">
      <Form :model="formData" label-position="left" :label-width="80" inline>
        <Row>
          <Col span="6">
            <FormItem label="客户编号：">
              <span class="txt">{{formData.joinCode}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="店铺名称：">
              <span class="txt">{{formData.storeName}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="店铺ID：" :label-width="70">
              <span class="txt">{{formData.storeId}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="客户姓名：">
              <span class="txt">{{formData.name}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="手机号码：">
              <span class="txt">{{formData.phone | phoneFormat}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="客户状态：">
              <span class="txt">{{formData.isBlack | isBlack}}</span>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="门店地址：">
              <span class="txt">{{formData.address}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="线路编号：">
              <span class="txt">{{formData.salesRoute}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="业代姓名：">
              <span class="txt">{{formData.workerName}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="业代手机：">
              <span class="txt">{{formData.workerPhone | phoneFormat}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="陈列活动：">
              <span class="txt">{{formData.activityName}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="分组名称：">
              <span class="txt">{{formData.activityTag}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="清算时间：">
              <span class="txt">{{formData.liquidateTime | formatYearMonth}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="结算周期：">
              <span class="txt">{{formData.periodMonth}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="合格情况：" :label-width="100">
              <span class="txt">{{formData.auditCountQualified | auditCountQualified }}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="稽查状态：">
              <span v-if="status == 1" class="txt">{{formData.checkStatus | checkStatus}}</span>
              <Select v-if="status == 2" v-model="formData.checkStatus" clearable>
                <Option
                  v-for="(item, index) in checkStatusList"
                  :value="item.id"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="进货达标状态：" :label-width="100">
              <span class="txt">更新中</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="综合判定状态：" :label-width="100">
              <span
                v-if="status == 1"
                class="txt"
              >{{formData.auditCountQualified | auditCountQualified}}</span>
              <Select v-if="status == 2" v-model="formData.auditCountQualified" clearable>
                <Option
                  v-for="(item, index) in auditCountQualifiedList"
                  :value="item.id"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="标准费用：">
              <span class="txt">{{formData.periodAmount}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="折扣：">
              <Row v-if="status == 2">
                <Col span="12">
                  <Input v-model="formData.liquidateAmount"></Input>
                </Col>
                <Col span="12">元/周</Col>
              </Row>
              <span v-if="status == 1" class="txt">{{formData.liquidateAmount}}元/周</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="清算状态：">
              <span class="txt">{{formData.status | status}}</span>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="提现状态：">
              <span class="txt">{{formData.recStatus | recStatus}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="6">
            <FormItem label="特殊处理：">
              <span class="txt" v-if="status == 1">{{formData.switchStatus | switchStatus}}</span>
              <RadioGroup v-if="status == 2" v-model="formData.switchStatus">
                <Radio :label="0">暂不发放奖励（全部发放时将不包括此客户此项奖励）</Radio>
                <Radio :label="1">正常发放奖励</Radio>
              </RadioGroup>
            </FormItem>
          </Col>
          <Col span="6">
            <FormItem label="清算ID：">
              <span class="txt">{{ formData.id }}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col>
            <FormItem label="备注信息：" style="width: 100%;">
              <span class="txt" v-if="status == 1">{{formData.memo}}</span>
              <Input
                v-if="status == 2"
                v-model="formData.memo"
                type="textarea"
                :autosize="{minRows: 5,maxRows: 10}"
              ></Input>
            </FormItem>
          </Col>
        </Row>
      </Form>
      <footer class="backBox">
        <Button type="primary" v-if="status == 2" class="btn-back" @click="submit">保存</Button>
        <Button type="success" class="btn-back" @click="back">返回</Button>
      </footer>
    </div>
  </div>
</template>

<script>
import {
  mergeGiveAwardCheckStatus,
  gdSyntheticalStatus,
  mergeGiveAwardStatus,
  mergeGiveAwardRecStatus
} from "@/util/ENUMS.js";
export default {
  data() {
    return {
      time: "",
      formData: {
        joinCode: "",
        phone: "",
        storeName: "",
        storeId: "",
        name: "",
        isBlack: "",
        address: "",
        salesRoute: "",
        workerName: "",
        workerPhone: "",
        activityName: "",
        activityTag: "",
        liquidateTime: "",
        periodMonth: "",
        auditCountQualified: "",
        checkStatus: "",
        riskStatus: "更新中",
        auditCountQualified: "",
        periodAmount: "",
        liquidateAmount: "",
        status: "",
        recStatus: "",
        memo: "",
        switchStatus: ""
      },
      checkStatusList: [
        {
          name: "正常",
          id: 1
        },
        {
          name: "异常",
          id: 2
        }
      ],
      auditCountQualifiedList: [
        {
          name: "合格",
          id: 1
        },
        {
          name: "不合格",
          id: 0
        }
      ],
      status: "",
      brandId: 1
    };
  },
  created() {
    this.formData = JSON.parse(this.$route.query.data);
    this.status = this.$route.query.type;
    this.brandId = this.$route.query.brandId;
    this.time = this.$route.query.time;
  },
  methods: {
    back() {
      let path = this.time == "month" ? "/giveoutPrizesClear" : "/displayClear";
      this.$router.push({
        path: path
      });
    },
    submit() {
      let {
        checkStatus,
        auditCountQualified,
        liquidateAmount,
        switchStatus,
        memo,
        id
      } = this.formData;
      let data = {
        checkStatus: auditCountQualified,
        superviseStatus: checkStatus,
        liquidateAmount,
        switchStatus,
        memo,
        id
        // brandId: this.brandId
      };
      this.Global.JsonChange(data);
      //   displayYxtg/checkDisplayLiquidateRecord.json
      this.Global.doPost("liquidate/doEditLiquidateRecord.json", data, res => {
        this.$Message.success("修改成功");
        this.back();
      });
    }
  },
  filters: {
    phoneFormat(val) {
      var reg = /^(\d{3})(\d{4})(\d{4})$/;
      var matches = reg.exec(val);
      if (matches) {
        return `${matches[1]}-${matches[2]}-${matches[3]}`;
      } else {
        return val;
      }
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd HH:mm:ss");
    },
    isBlack(type) {
      let blackType = {
        "0": "正常",
        "1": "异常"
      };
      return blackType[type];
    },
    auditCountQualified(type) {
      return gdSyntheticalStatus[type];
    },
    checkStatus(type) {
      return mergeGiveAwardCheckStatus[type];
    },
    status(type) {
      return mergeGiveAwardStatus[type];
    },
    recStatus(type) {
      if (type) {
        return mergeGiveAwardRecStatus[type];
      } else {
        return "未发放";
      }
    },
    switchStatus(type) {
      let switchStatus = {
        "0": "暂不发放奖励（全部发放时将不包括此客户此项奖励）",
        "1": "正常发放奖励"
      };
      return switchStatus[type];
    }
  }
};
</script>
