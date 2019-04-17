<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  .title {
    float: left;
    span {
      display: inline-block;
      height: 150px;
      line-height: 150px;
    }
  }
  .table {
    float: left;
    margin-left: 30px;
  }
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
footer {
  text-align: center;
  margin: 40px 0 20px;
  padding-bottom: 30px;
  button {
    margin-right: 20px;
  }
}
</style>

<template>
  <div id="Main">
    <h2 class="Title">活动码包-新增</h2>
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="11">
            <Form-item label="品牌名称" prop="brandId">
              <Select v-model="formData.brandId" placeholder="请选择" :disabled="true" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="流水线">
              <Input v-model="formData.pipeLine" :disabled="true"></Input>
            </Form-item>
          </Col>
          <Col span="11" offset="1">
            <Form-item label="码包名称">
              <Input v-model="formData.ruleName" :disabled="true"></Input>
            </Form-item>
            <Form-item label="赋码总数">
              <Input v-model="formData.totalQuantity" :disabled="true"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="padding-bottom:20px;">
      <div style="overflow: hidden">
        <div class="title">
          <span>码包记录</span>
        </div>
        <div class="table">
          <Table :columns="columns1" :data="pageData" disabled-hover width="600"></Table>
        </div>
      </div>
      <footer>
        <Button type="primary" @click="goBack">返回</Button>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "activity-code-maintain-look-keepAlive",
  data() {
    return {
      formData: {
        brandId: "",
        pipeLine: "",
        ruleName: "",
        totalQuantity: ""
      },
      res_formData: null, //根据活动主键id请求数据
      page: 1,
      pageNum: 0,
      rule: {
        // totalQuantity: [
        //     { required: true, message: '码包加量不能为空',  }
        // ],
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },

        {
          title: "时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "赋码数",
          key: "prodQuantity",
          align: "center"
        },
        {
          title: "备注",
          key: "memo",
          align: "center"
        }
      ],
      pageData: [],
      type: null,
      brandList: []
    };
  },
  created: function() {
    let that = this;
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
    });
    var type = this.$route.query.type;
    var id = this.$route.query.id;
    if (type) {
      this.type = type;
    }
    if (id) {
      this.Global.doPost("qrCodeRule/queryQrCodeRuleInfo.json", id, function(
        res
      ) {
        console.log(res);
        that.formData.brandId = res.brandId;
        that.formData.ruleName = res.ruleName;
        that.formData.pipeLine = res.pipeLine; //流水线
        that.formData.totalQuantity = res.totalQuantity;
        that.pageData = res.taskList;
      });
    }
  },
  mounted: function() {},
  methods: {
    changePage: function(size) {
      this.init(size, 10);
    },

    goBack: function() {
      this.$router.back();
    }
  }
};
</script>


