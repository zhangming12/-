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
.select {
  background: @primary-color;
  color: #fff;
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

.searchBox {
  overflow: hidden;
  .search_btn {
    float: left;
    width: 50px;
    padding: 5px 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search_icon {
    float: left;
    padding: 5px 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">客户信息</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="88" :rules="rule">
                <Row>
                    <Col span="7">  
                        <Form-item label="品牌名称:" prop="brandId" required>
                            <Select v-model="formData.brandId" placeholder="请选择">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select> 
                        </Form-item>
                        <Form-item label="用户ID:" prop="userId">
                            <Input v-model.trim="formData.userId" placeholder="请输入用户ID"></Input>
                        </Form-item>  
                                           
                        <!-- <Form-item label="区域:" prop="areaCode">
                            <Cascader  placeholder="请选择区域"  :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                        </Form-item> -->
                        
                        
                    </Col>
                    <Col span="7">
                        
                        <Form-item label="姓名:" prop="realName">
                            <Input v-model.trim="formData.realName"  placeholder="请输入姓名" ></Input>
                        </Form-item>
                        <Form-item label="手机号码:" prop="phone">
                            <Input v-model.trim="formData.phone" placeholder="请输入手机号"></Input>
                        </Form-item>
                        
                    </Col>
                    <Col span="7">
                        <Form-item label="昵称:" prop="nickName">
                            <Input v-model.trim="formData.nickName" placeholder="请输入昵称"></Input>
                        </Form-item>
                        <Form-item label="状态:" placeholder="请选择状态" prop="isBlack">
                            <Radio-group v-model="formData.isBlack">
                                <Radio label="0">正常</Radio>
                                <Radio label="1">异常</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span='2' offset="1" style="margin-top:10px">
                        <!-- <Button @click="submit('form')" type="primary">查询</Button> -->
                        <div class="searchBox">
                          <Button @click="submit('form')" class="btn-search  search_btn" type="primary">查询</Button>
                          <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-up" v-if="showQuery"></Button>
                          <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-down" v-else></Button>
                        </div>
                    </Col>
                </Row>
                <transition name="fade">
                  <Row v-if="showQuery">
                    <Col span='7'>
                      <Form-item label="区域" prop="areaCode">
                          <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                      </Form-item>
                    </Col>
                  </Row>
                </transition>
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div class='contentTop'>
            <Button @click="exportExcel" class="btn-export" icon="ios-download-outline" type="primary">导出</Button>
        </div>
        <Table :columns="columns1" :loading="tableLoading" :data="pageData" disabled-hover></Table>
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
import area from "@/config/china_code_data.js";
export default {
  name: "customer-infor-keepAlive",

  data() {
    var that = this;
    return {
      showQuery: false,
      formData: {
        areaCode: [],
        goodsType: "",
        activityName: "",
        userId: "",
        isBlack: "",
        phone: "",
        brandId: ""
      },
      tableLoading: false,
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
          width: 150
        },
        {
          title: "昵称",
          key: "nickName",
          width: 150,
          align: "center"
        },
        {
          title: "姓名",
          key: "realName",
          width: 150,
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          width: 150,
          align: "center"
        },
        {
          title: "省",
          width: 100,
          key: "province",
          align: "center"
        },
        {
          title: "市",
          width: 100,
          key: "city",
          align: "center"
        },
        {
          title: "区/县",
          width: 100,
          key: "area",
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          //ellipsis:true,
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
          width: 90,
          align: "center",
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
                        onOk: function() {
                          that.userBlack(
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
                        onOk: function() {
                          that.userLimit(
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
      brandList: [],
      pageData: [],
      areaData: area,
      memo: ""
    };
  },
  components: {},
  created() {
    // this.init(1,10);
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a", channel: "C" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          //   this.changeValue(this.formData.brandId);
        }
      }
    );
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
    createTime(val) {
      var time = this.Global.createTime(val);
      return time;
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "C";
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      //   this.tableLoading = true;
      this.Global.doPost("report/userInfoDetailReport.json", data, res => {
        this.tableLoading = false;
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    blackType(data) {
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
          userType: "C",
          brandId: brandId
        },
        res => {
          this.init();
        }
      );
    },
    userLimit(userId, brandId, isLimit) {
      var that = this;
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
          userType: "C",
          brandId: brandId
        },
        res => {
          this.init();
        }
      );
    },
    showMemo(userId, brandId) {
      this.memoStatus = !this.memoStatus;
      // this.$Modal.confirm({
      //     title: '备注',
      //     render: (h) => {
      //         return h('Input',{
      //             props: {
      //                 value: this.memo,
      //                 autofocus: true,
      //                 placeholder: '请输入备注信息',
      //                 key: 'memo'
      //             },
      //             on: {
      //                 input: (val) => {
      //                     this.memo = val;
      //                 }
      //             }
      //         })
      //     },
      //     onOk: function(){
      //         that.getUserMemo(userId,brandId)
      //     }
      // })
    },
    ok() {
      this.getUserMemo(this.selectUserId, this.selectBrandId);
    },
    getUserMemo(userId, brandId) {
      this.Global.doPost(
        "report/brandUserAddMemo.json",
        {
          userId: userId,
          brandId: brandId,
          memo: this.memo,
          userType: "C"
        },
        () => {
          this.memoStatus = !that.memoStatus;
          this.init();
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "C";
      var url = this.Global.getExportUrl(
        "report/userInfoDetailExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


