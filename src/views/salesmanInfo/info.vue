<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">业代关联门店统计</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rules">
        <Row>
          <Col span="10">
            <Form-item label="品牌名称:" prop="brandId">
              <Select v-model="formData.brandId" placeholder="请选择">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="业代姓名:" prop="workerName">
              <Input v-model="formData.workerName" placeholder="请输入业代姓名"></Input>
            </Form-item>
          </Col>
          <Col span="10" offset="1">
            <Form-item label="手机号码:" prop="phone">
              <Input v-model="formData.phone" placeholder="请输入手机号码"></Input>
            </Form-item>
            <Form-item label="客户编号:">
              <Input v-model="formData.joinCode" placeholder="请输入客户编号"></Input>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:24px">
            <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;">
      <div class="contentTop">
        <Button
          @click="exportExcel"
          class="btn-export ivu-btn"
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
import config from "../../util/config.js";
export default {
  name: "info-keepAlive",

  data() {
    const validatePhone = (rule, value, callback) => {
      // 验证手机号码
      if (value == "") {
        callback(new Error("请输入手机号码"));
      } else {
        if (!this.Global.checkPhone(value)) {
          callback(new Error("请输入正确手机号码"));
        } else {
          callback();
        }
      }
    };
    return {
      formData: {
        brandId: "",
        workerName: "",
        phone: "",
        joinCode: ""
        // status: 1
      },
      page: 1,
      rules: {},
      pageNum: 0,
      pageSize: 10,
      url: config.uploadWorkerExcel,
      columns1: [
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          minWidth: 140
        },
        {
          title: "业代姓名",
          key: "workerName",
          align: "center",
          minWidth: 140
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          minWidth: 140
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center",
          minWidth: 140
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          minWidth: 140
        },
        {
          title: "门店名称",
          key: "storeName",
          align: "center",
          minWidth: 140
        },
        {
          title: "门店状态",
          key: "completeStatus",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h(
              "div",
              this.Global.ENUMS.complateStatus[params.row.completeStatus]
            );
          }
        },

        {
          title: "店主姓名",
          key: "name",
          align: "center",
          minWidth: 140
        },
        {
          title: "店主手机号",
          key: "storePhone",
          align: "center",
          minWidth: 120
        },
        {
          title: "省",
          key: "province",
          align: "center",
          minWidth: 80
        },
        {
          title: "市",
          key: "city",
          align: "center",
          minWidth: 80
        },
        {
          title: "区",
          key: "area",
          align: "center",
          minWidth: 120
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          tooltip: true,
          minWidth: 140
        }
      ],
      pageData: [],
      page: 1,
      pageNum: 0,
      brandList: []
    };
  },
  created: function() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
      }
    });
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost(
        "worker/queryBrandWorkerRelevanceStore.json",
        data,
        res => {
          this.pageNum = res.items;
          this.pageData = res.datalist;
          this.page = res.page;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "worker/queryBrandWorkerRelevanceStoreExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


