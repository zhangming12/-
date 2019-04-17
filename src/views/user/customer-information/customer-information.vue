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

.ivu-form-item-content {
  width: 400px;
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
                        <Form-item label="门店ID:" prop="storeId">
                            <Input clearable v-model.trim="formData.storeId" placeholder="请输入门店ID"></Input>
                        </Form-item>
                    </Col>
                    <Col span="7">
                        
                        <Form-item label="门店编号:" prop="realName">
                            <Input clearable v-model.trim="formData.joinCode" placeholder="请输入门店编号"></Input>
                        </Form-item>
                        <!-- <Form-item label="区域:" prop="areaCode">
                            <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
                        </Form-item> -->
                        
                    </Col>
                    <Col span="7">
                        <Form-item label="手机号:" prop="nickName">
                            <Input clearable v-model.trim="formData.phone" placeholder="请输入手机号"></Input>
                        </Form-item>
                        
                        <!-- <Form-item label="状态:" prop="isBlack">
                            <Radio-group v-model="formData.isBlack">
                                <Radio label="0">正常</Radio>
                                <Radio label="1">异常</Radio>
                            </Radio-group>
                        </Form-item> -->
                    </Col>

                    <Col span='2' offset="1" style="margin-top: 0px;">
                        <!-- <Button @click="submit('form')" type="primary" class="btn-search">查询</Button> -->
                        <div class="searchBox">
                          <Button @click="submit('form')" class="btn-search  search_btn" type="primary">查询</Button>
                          <!-- <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-up" v-if="showQuery"></Button>
                          <Button @click="showQuery=!showQuery" class="search_icon" type="primary" icon="ios-arrow-down" v-else></Button> -->
                        </div>
                    </Col>
                </Row>
                <!-- <transition name="fade">
                  <Row v-if="showQuery">
                    <Col span='7'>
                      <Form-item label="手机号码:" prop="phone">
                            <Input v-model.trim="formData.phone" placeholder="请输入手机号码"></Input>
                        </Form-item>
                    </Col>
                  </Row>
                </transition> -->
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">
        <div class='contentTop'>
            <Button @click="goToLog" class="btn-right" type="primary">停售日志</Button>
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
      <Modal v-model="showMore" >
        <h3 slot="header" style="text-align:center;">修改</h3>
        <Form :label-width="85">
          <Form-item label="门店ID:" prop="storeId">
						<Input readonly v-model="addData.storeId"></Input>
					</Form-item>

          <Form-item label="门店名称:" prop="storeName">
						<Input placeholder="请输入门店名称" v-model="addData.storeName"></Input>
					</Form-item>
          <Form-item label="姓名:" prop="name">
						<Input placeholder="请输入姓名" v-model="addData.name"></Input>
					</Form-item>
          <Form-item label="手机号:" prop="phone">
						<Input placeholder="请输入手机号" v-model="addData.phone"></Input>
					</Form-item>
          <Form-item label="区域:" prop="areaName">
						<Input readonly v-model="addData.areaName"></Input>
					</Form-item>
          <Form-item label="地址:" prop="address">
						<Input placeholder="请输入地址" v-model="addData.address"></Input>
            <!-- <Cascader :data="areaData" v-model="addData.areaCode" change-on-select></Cascader> -->
					</Form-item>
          <Form-item >
            <p style="text-align:right;cursor:pointer;" @click="modifyAddress"><span>本店定位修改>></span></p>
					</Form-item>
        </Form>
        <div slot="footer" style="text-align:center">
            <i-button type="error" @click="showMore = false">取消</i-button>
            <i-button type="success" @click="sureChange">确定</i-button>
        </div>
		</Modal>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
export default {
  name: "customer-information-keepAlive",

  data() {
    return {
      areaData: area,
      formData: {
        areaCode: [],
        goodsType: "",
        activityName: "",
        userId: "",
        isBlack: "",
        phone: ""
      },
      showMore: false,
      addData: {},
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
          key: "storeId",
          align: "center",
          minWidth: 140,
          tooltip: true
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          tooltip: true,
          minWidth: 140
        },
        {
          title: "店铺名称",
          key: "storeName",
          align: "center",
          tooltip: true,
          minWidth: 140
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "昵称",
          key: "wxNickName",
          align: "center",
          minWidth: 100,
          tooltip: true
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          minWidth: 140,
          tooltip: true
        },
        {
          title: "区域",
          key: "areaName",
          align: "center",
          minWidth: 140,
          tooltip: true
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          minWidth: 140,
          tooltip: true
        },
        {
          title: "状态",
          key: "status",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            let tag = [
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
                      this.$Modal.confirm({
                        title: "警告",
                        content: "是否确定修改状态",
                        onOk: () => {
                          let data = {
                            storeId: params.row.storeId,
                            status: params.row.status == 1 ? 2 : 1
                          };
                          this.Global.doPost(
                            "store/doSettingStoreByStatus.json",
                            data,
                            res => {
                              this.$Message.success("修改成功");
                              this.init();
                            }
                          );
                        }
                      });
                    }
                  }
                },
                this.blackType(params.row.status)
              )
            ];
            return h("div", tag);
          }
        },
        {
          title: "客户类型",
          key: "storeType",
          minWidth: 110,
          align: "center",
          render: (h, params) => {
            let str = "";
            if (params.row.storeType == 0) {
              str = "门店";
            } else {
              str = "内部员工";
            }
            if (params.row.storeType != 0) {
              let tag = [
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
                        this.$Modal.confirm({
                          title: "警告",
                          content: "是否确定解绑内部员工",
                          onOk: () => {
                            let data = {
                              id: params.row.storeType
                            };
                            this.Global.doPost(
                              "brandStaff/deleteBrandStaff.json",
                              data,
                              res => {
                                this.$Message.success("解绑成功");
                                this.init();
                              }
                            );
                          }
                        });
                      }
                    }
                  },
                  str
                )
              ];
              return h("div", tag);
            } else {
              return h("div", str);
            }
          }
        },
        {
          title: "金银铜",
          key: "isSign",
          minWidth: 110,
          align: "center",
          render: (h, params) => {
            let str = "";
            if (params.row.isSign == -1 || params.row.isSign == 2) {
              str = "否";
            } else if (params.row.isSign == 0 || params.row.isSign == 1) {
              str = "是";
            }
            return h("div", str);
          }
        },
        {
          title: "是否停售门店",
          key: "isDiscontinued",
          minWidth: 110,
          align: "center",
          render: (h, params) => {
            let str = "";
            if (params.row.isDiscontinued == 0) {
              str = "停售";
            } else if (params.row.isDiscontinued == 1) {
              str = "未停售";
            }
            return h("div", str);
          }
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return h("div", params.row.memo ? params.row.memo : "无");
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let tag = [
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
                      this.addData = {
                        storeId: params.row.storeId,
                        storeName: params.row.storeName,
                        name: params.row.name,
                        phone: params.row.phone,
                        address: params.row.address,
                        areaName: params.row.areaName,
                        joinCode:params.row.joinCode,
                        locate:params.row.locate
                      };
                      this.showMore = true;
                    }
                  }
                },
                "修改"
              )
            ];
            if (params.row.isDiscontinued == 0) {
              tag.push(
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
                        this.$Modal.confirm({
                          title: "警告",
                          content: "启用停售客户必须重新导入上报信息",
                          onOk: () => {
                            this.Global.doPost(
                              "tool/doActivateStopStore.json",
                              {joinCode:params.row.joinCode,brandId:params.row.brandId},
                              res => {
                                this.$Message.success("操作成功");
                                this.init();
                              }
                            );
                          }
                        });
                      }
                    }
                  },
                  "启用停售客户"
                )
              );
            }
            return h("div", tag);
          }
        }
      ],
      pageData: [],
      areaData: area,
      memo: "",
      userInforEdit: false,
      brandList: [],
      showQuery: false
    };
  },
  watch: {
    showMore(val) {
      if (!val) {
        this.addData = {};
      }
    }
  },
  created() {
    let path = this.$route.path;
  },
  beforeRouteEnter(to, from, next) {
    // if (to.path == "/customerInformate") {
    //   next(vm => {
    //     vm.userInforEdit = true;
    //   });
    // } else {
    //   next(vm => {
    //     if(from.name == "customerInformateEdit"){
    //       vm.init();
    //     }
    //     vm.userInforEdit = false;
    //   });
    // }
    next(vm => {
      if (to.path == "/customerInformate") {
        vm.userInforEdit = true;
      } else {
        vm.userInforEdit = false;
      }
      if (from.name == "customerInformateEdit" || from.name == "modifyStoreAddress") {
        vm.init();
      }
      // vm.init()
    });
  },
  methods: {
    modifyAddress(){
      this.showMore = false;
      let { joinCode,storeId,storeName,address,phone,locate } = this.addData;
      let query = {joinCode,storeId,storeName,address,phone,locate}
      this.$router.push({
        path: "/modifyStoreAddress",
        query
      });
    },
    goToLog() {
      this.$router.push({
        path: "/stopLog"
      });
    },
    sureChange() {
      if (!this.addData.name) {
        this.$Message.info("姓名不能为空");
        return false;
      }
      if (!this.addData.address) {
        this.$Message.info("地址不能为空");
        return false;
      }
      if (this.addData.phone) {
        if (!this.Global.checkPhone(this.addData.phone)) {
          this.$Message.info("请输入正确的手机号");
          return false;
        }
      }
      let { phone, storeId, storeName, name, address } = this.addData;
      let data = { phone, storeId, storeName, name, address, memo:"openPhone" };
      // this.Global.deleteEmptyProperty(data);
      data['isOnePhone'] = 1;
      this.Global.doPost("store/doSettingStore.json", data, res => {
        this.$Message.success("修改成功");
        this.showMore = false;
        this.init();
      });
    },
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
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data['isOnePhone'] = 1;
      this.Global.doPost("store/querySettingStoreData.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        // this.page = res.page;
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