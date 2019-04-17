<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  margin: 0 auto 15px;
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
    <!-- <h2 class="Title">活动码包维护</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="80" :rules="rule">
          <Row>
            <Col span="10">
              <Form-item label="品牌名称" required prop="brandId">
                <Select v-model="formData.brandId" placeholder="请选择" width="80">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
              <Form-item label="流水线">
                <Input v-model="formData.pipeLine" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="10" offset="1">
              <Form-item label="码包名称">
                <Input v-model="formData.ruleName" placeholder="请输入..."></Input>
              </Form-item>
            </Col>
            <Col span="2" offset="1" style="margin-top:24px">
              <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="box" style="padding-bottom:20px">
        <div class="contentTop">
          <Button icon="plus-round" @click="handleAdd" type="primary" class="btn-right">新建</Button>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="page" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "activity-code-maintain-keepAlive",
  data() {
    var that = this;
    return {
      formData: {
        brandId: "",
        pipeLine: "",
        ruleName: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }]
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center"
        },
        {
          title: "编号",
          key: "ruleCode",
          align: "center"
        },
        {
          title: "码包名称",
          key: "ruleName",
          align: "center"
        },
        {
          title: "流水线",
          key: "pipeLine",
          align: "center"
        },
        {
          title: "赋码总数",
          key: "totalQuantity",
          align: "center"
        },

        {
          title: "操作",
          key: "action",
          align: "center",
          width: 300,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push(
                        "/productDownloadCode?id=" + params.row.id
                      );
                    }
                  }
                },
                "生成并下载码包"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/activityCodeMaintain-edit",
                        query: { type: "edit", id: params.row.id }
                      });
                    }
                  }
                },
                "修改"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        path: "/activityCodeMaintain-look",
                        query: { type: "look", id: params.row.id }
                      });
                    }
                  }
                },
                "查看"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除？",
                        onOk: function() {
                          that.handleDelete(params.row.id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      pageData: [],
      brandList: []
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.init(1, 10);
      }
    });
  },
  mounted: function() {},
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.doPost("qrCodeRule/doQueryWithPage.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    handleAdd() {
      this.$router.push({
        path: "/activityCodeMaintain-edit",
        query: { type: "add" }
      });
    },
    handleDelete(id) {
      var that = this;
      this.Global.doPost(
        "goodsInfo/deleteGoodsInfo.json",
        {
          id: id
        },
        function() {
          that.$Message.success("成功");
          that.init();
        }
      );
    }
  }
};
</script>


