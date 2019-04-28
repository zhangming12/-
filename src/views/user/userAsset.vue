<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">客户实时资产</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId">
              <Select v-model="formData.brandId" placeholder="请选择品牌">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>

            <Form-item label="昵称:" prop="nickName">
              <Input v-model.trim="formData.nickName" placeholder="请输入昵称"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="用户ID:" prop="userId">
              <Input v-model.trim="formData.userId" placeholder="请输入用户ID"></Input>
            </Form-item>
            <Form-item label="手机号码:" prop="phone">
              <Input v-model.trim="formData.phone" placeholder="请输入手机号码"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="姓名:" props="realName">
              <Input v-model.trim="formData.realName" placeholder="请输入姓名"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top: 24px;">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="contentTop">
        <Button
          @click="exportExcel"
          class="btn-export"
          icon="ios-download-outline"
          type="primary"
        >导出</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "userAsset-keepAlive",

  data() {
    return {
      formData: {},
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {},
      brandList: [],
      columns1: [
        {
          title: "用户ID",
          key: "userId",
          align: "center"
        },
        {
          title: "昵称",
          key: "nickName",
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          align: "center"
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center"
        },
        {
          title: "折扣类型",
          key: "goodsType",
          align: "center",
          render: (h, params) => {
            return this.goodsType(params.row.goodsType);
          }
        },
        {
          title: "折扣名称",
          key: "goodsName",
          align: "center"
        },
        {
          title: "余量",
          key: "winAmount",
          align: "center"
        }
      ],
      pageData: []
    };
  },
  components: {},
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { channel: "B" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
        }
      }
    );
  },
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.page = size;
      this.init();
    },
    goodsType: function(data) {
      return this.Global.ENUMS.goodsType[data];
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      if (JSON.stringify(data) == "{}") {
        this.$Message.error("至少有一个筛选条件");
        return;
      }
      data["userType"] = "B";
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("report/userPrizeListReport.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      if (JSON.stringify(data) == "{}") {
        this.$Message.error("至少有一个筛选条件");
        return;
      }
      data["userType"] = "B";
      var url = this.Global.getExportUrl(
        "report/userPrizeListExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>