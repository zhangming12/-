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

.ivu-form-item-content {
  width: 400px;
}
.ivu-table-wrapper {
  width: 1610px;
  position: relative;
  border: 1px solid #dddee1;
  border-bottom: 0;
  // border-right: 0;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">客户信息</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="10">
            <Form-item label="用户ID" prop="userId">
              <Input v-model.trim="formData.userId"></Input>
            </Form-item>
            <Form-item label="昵称" prop="nickName">
              <Input v-model.trim="formData.nickName"></Input>
            </Form-item>

            <Form-item label="区域" prop="areaCode">
              <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
            </Form-item>
          </Col>
          <Col span="10" offset="1">
            <Form-item label="姓名" prop="realName">
              <Input v-model.trim="formData.realName"></Input>
            </Form-item>
            <Form-item label="手机号码" prop="phone">
              <Input v-model.trim="formData.phone"></Input>
            </Form-item>
            <Form-item label="状态" prop="isBlack">
              <Radio-group v-model="formData.isBlack">
                <Radio label="0">正常</Radio>
                <Radio label="1">异常</Radio>
              </Radio-group>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top: 58px;">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <!-- <div class="export">
            <div @click="exportExcel"><Icon type="ios-download-outline" size="14"></Icon>导出</div>
      </div>-->
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
    <Modal v-model="memoStatus" title="备注" @on-ok="ok" loading>
      <Input placeholder="请输入备注信息" v-model="memo" autofocus></Input>
    </Modal>
  </div>
</template>

<script>
import area from "../../config/china_code_data.js";
export default {
  name: "userInfo-keepAlive",

  data() {
    return {
      formData: {
        areaCode: [],
        goodsType: "",
        activityName: "",
        userId: "",
        isBlack: "",
        phone: "",
        brandId: ""
      },
      page: 1,
      pageNum: 0,
      pageSize: 10,
      memoStatus: false,
      selectUserId: "",
      selectBrandId: "",
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }]
      },
      columns1: [
        {
          title: "用户ID",
          key: "userId",
          align: "center",
          width: 140
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 140
        },
        {
          title: "店铺名称",
          key: "storeName",
          align: "center",
          width: 140
        },
        {
          title: "姓名",
          key: "realName",
          align: "center",
          width: 100
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          width: 140
        },
        {
          title: "省",
          key: "province",
          align: "center",
          width: 100
        },
        {
          title: "市",
          key: "city",
          align: "center",
          width: 100
        },
        {
          title: "区/县",
          key: "area",
          align: "center",
          width: 100
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          width: 140
        },
        {
          title: "状态",
          key: "isBlack",
          width: 80,
          align: "center",
          render: (h, params) => {
            return h("div", this.blackType(params.row.isBlack));
          }
        },
        {
          title: "活动限制",
          key: "isLimit",
          width: 110,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.ENUMS.limitType[params.row.isLimit]);
          }
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          width: 80,
          render: (h, params) => {
            if (params.row.memo == null || params.row.memo == "") {
              return h("div", "无");
            } else {
              return h("div", params.row.memo);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          width: 240,
          align: "center",
          render: (h, params) => {
            var handle = {};
            var limit = {};
            if (params.row.isBlack == 0) {
              handle["txt"] = "拉黑";
              handle["type"] = "error";
              handle["content"] = "用户将被拉黑";
            } else {
              handle["txt"] = "恢复";
              handle["type"] = "success";
              handle["content"] = "用户将被恢复";
            }
            if (params.row.isLimit == 1) {
              limit["txt"] = "开放";
              limit["type"] = "success";
              limit["content"] = "用户将不受限";
            } else {
              limit["txt"] = "受限";
              limit["type"] = "info";
              limit["content"] = "用户将受限";
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: handle.type,
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: handle.content,
                        onOk: () => {
                          this.userBlack(
                            params.row.userId,
                            params.row.brandId,
                            params.row.isBlack
                          );
                        }
                      });
                    }
                  }
                },
                handle.txt
              ),

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
                      this.memo = params.row.memo;
                      this.selectUserId = params.row.userId;
                      this.selectBrandId = params.row.brandId;
                      this.showMemo();
                    }
                  }
                },
                "备注"
              ),
              h(
                "Button",
                {
                  props: {
                    type: limit.type,
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: limit.content,
                        onOk: () => {
                          this.userLimit(
                            params.row.userId,
                            params.row.brandId,
                            params.row.isLimit
                          );
                        }
                      });
                    }
                  }
                },
                limit.txt
              )
            ]);
          }
        }
      ],
      pageData: [],
      areaData: area,
      memo: ""
    };
  },
  components: {},
  created: function() {
    this.init();
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
    createTime: function(val) {
      var time = this.Global.createTime(val);
      return time;
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "B";
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("report/userInfoDetailReport.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    blackType: function(data) {
      return this.Global.ENUMS.blackType[data];
    },
    userBlack(userId, brandId, isBlack) {
      var url = "";
      if (isBlack == 0) {
        url = "report/userAddBlackList.json";
      } else {
        url = "report/userDelBlackList.json";
      }
      this.Global.doPost(
        url,
        {
          userId: userId,
          userType: "B",
          brandId: brandId
        },
        res => {
          this.init();
        }
      );
    },
    userLimit(userId, brandId, isLimit) {
      var url = "";
      if (isLimit == 0) {
        url = "report/userDelIndefinite.json";
      } else {
        url = "report/userAddIndefinite.json";
      }
      this.Global.doPost(
        url,
        {
          userId: userId,
          userType: "B",
          brandId: brandId
        },
        res => {
          this.init();
        }
      );
    },
    showMemo(userId, brandId) {
      this.memoStatus = !this.memoStatus;
    },
    ok: function() {
      this.getUserMemo(this.selectUserId, this.selectBrandId);
    },
    getUserMemo(userId, brandId) {
      this.Global.doPost(
        "report/brandUserAddMemo.json",
        {
          userId: userId,
          brandId: brandId,
          memo: this.memo,
          userType: "B"
        },
        () => {
          this.memoStatus = !this.memoStatus;
          this.init();
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "B";
      var url = this.Global.getExportUrl(
        "report/userInfoDetailExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


