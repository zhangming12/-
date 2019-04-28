<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
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
.class-btn {
  text-align: center;
  margin-bottom: 24px;
  overflow: hidden;
  button {
    width: 70px;
  }
  .cancel {
    background-color: #ffffff;
    color: @primary-color;
  }
}
</style>

<template>
  <div id="Main">
    <h2 class="Title">实物折扣状态跟踪</h2>
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="10">
            <Form-item label="时间:">
              <Input v-model="formData.createTime" :disabled="true"></Input>
            </Form-item>
            <Form-item label="所得折扣:">
              <Input v-model="formData.goodsName" :disabled="true"></Input>
            </Form-item>
            <Form-item label="用户ID:">
              <Input v-model="formData.userId" :disabled="true"></Input>
            </Form-item>
            <Form-item label="联系电话:">
              <Input v-model="formData.phone" :disabled="true"></Input>
            </Form-item>
            <Form-item label="快递公司:">
              <Input v-model="formData.phone" :disabled="true"></Input>
            </Form-item>
          </Col>
          <Col span="10" offset="2">
            <Form-item label="活动名称:">
              <Input v-model="formData.activityName" :disabled="true"></Input>
            </Form-item>
            <Form-item label="数量:">
              <Input v-model="formData.winAmount" :disabled="true"></Input>
            </Form-item>
            <Form-item label="姓名:">
              <Input v-model="formData.realName" :disabled="true"></Input>
            </Form-item>
            <Form-item label="状态:">
              <Input v-model="formData.recStatus" :disabled="true"></Input>
            </Form-item>
            <Form-item label="快递单号:">
              <Input v-model="formData.phone" :disabled="true"></Input>
            </Form-item>
          </Col>
          <Col span="24" class="class-btn">
            <Button type="primary" class="cancel" @click="handleCancel">取消</Button>
            <Button type="primary" style="margin-left:30px">发货</Button>
          </Col>
        </Row>
      </Form>
    </div>
  </div>
</template>

<script>
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  data() {
    const that = this;
    return {
      formData: {
        createTime: "",
        goodsName: "",
        userId: "",
        phone: "",
        expressName: "",

        activityName: "",
        winAmount: "",
        realName: "",
        recStatus: "",
        expressNumber: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "请选择品牌名称" }],
        activityId: [{ required: true, message: "请选择活动名称" }]
      }
    };
  },
  created: function() {},
  mounted: function() {
    // if(this.$route.query.params){
    //     var that = this;
    //     this.formData=this.$route.query.params;
    //     this.formData.createTime = this.Global.createTime(this.$route.query.params.createTime)
    // }
  },
  beforeRouteEnter(to, from, next) {
    if (to.path == "/awardStatusTracking-edit") {
      next(vm => {
        vm.formData = to.query.params;
        vm.formData.createTime = vm.Global.createTime(
          to.query.params.createTime
        ); //时间
        vm.formData.recStatus =
          vm.Global.ENUMS.harvestStauts[to.query.params.recStatus];
      });

      // next()
    }
  },
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    handleCancel() {
      this.$router.push("/awardStatusTracking");
    }
  }
};
</script>


