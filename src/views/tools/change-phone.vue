<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}
.box {
  width: 100%;
  margin: 0 auto;
  background: #fff;
}
.form {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 52.5%;

    .w18 {
      width: 33.3333%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
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
.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
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
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">修改终端手机号</h2> -->
      <div class="main-container">
        <div class="box">
            <Form ref="form" class="form" :model="formData" :label-width="10">
                <div class="container">
                    <div class="btn-left w18">
                        <Form-item prop="labelName">
                            <Input placeholder="请输入客户编号" v-model.trim="formData.joinCode" clearable></Input>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item prop="labelName">
                            <Input placeholder="请输入客户ID" v-model.trim="formData.storeId" clearable></Input>
                        </Form-item>
                    </div>
                    <div class="btn-left w18">
                        <Form-item prop="labelName">
                            <Input placeholder="请输入客户名称" v-model.trim="formData.storeName" clearable></Input>
                        </Form-item>
                    </div>
                </div>
                <div class="btn-right w10">
                    <div class="searchBox">
                        <div class="btn-right search-right" @click="submit('form')">
                            <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                        </div>
                    </div>
                </div>
            </Form>
        </div>
        <div class="box" style="padding-bottom:20px;padding:10px;padding-top:0;">
          <div class="contentTop" style="margin:0;">
                    <!-- <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span> -->
                    <!-- <addNewBtn  class="btn-right" title="新建" @btnClick="showModel" /> -->
              <Button class="btn-right" @click="queryLog">日志查询</Button>
          </div>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
        </div>
      </div>
      <Modal v-model="isShow" width="500">
          <h3 style="text-align:center;" slot="header">修改终端手机号</h3>
          <Form :label-width="120" ref="form">
               <Form-item label="原用手机号：">
                   {{editData.oldPhone}}
                </Form-item>
                <Form-item label="新手机号：">
                    <Input placeholder="请输入新手机号" v-model.trim="editData.phone"></Input>
                </Form-item>
                <Form-item label="验证码：">
                    <Row>
                        <Col span="8" >
                            <Input placeholder="请输入验证码" v-model.trim="editData.code"></Input>
                        </Col>
                        <Col span="6" offset="2">
                            <p>137*****270</p>
                        </Col>
                        <Col span="6" offset="2">
                            <Button @click="sendMsg()" :disabled="disabledStatus">{{codeMsg}}</Button>
                        </Col>
                    </Row>
                </Form-item>                   
            </Form>
            <div slot='footer'>
                <Button @click="sureChangeId">确定</Button>
                <Button @click="cancel">取消</Button>
            </div>
      </Modal>
  </div>
</template>

<script>
export default {
  name: "change-phone-keepAlive",

  data() {
    return {
      codeMsg: "发送验证码",
      disabledStatus: false,
      isShow: false, //是否显示模态框
      formData: {
        storeId: "", //门店id
        storeCode: "", //门店编码
        phone: "" //手机号码
      },
      oldStoreId: "",
      editData: {
        newStoreId: "",
        sureNewStoreId: "",
        code: ""
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 120
        },
        {
          title: "类型",
          key: "partakeType",
          align: "center",
          width: 120,
          render: (h, params) => {
            let str = "";
            switch (params.row.partakeType) {
              case 1:
                str = "导入";
                break;
              case 2:
                str = "自主参与";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        },
        {
          title: "客户ID",
          key: "storeId",
          align: "center",
          width: 120
        },
        {
          title: "昵称",
          key: "wxNickName",
          align: "center",
          width: 120
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          width: 120
        },
        {
          title: "客户名称",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          width: 120
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          width: 120
        },
        {
          title: "一级分类",
          key: "salesDept",
          align: "center",
          width: 120
        },
        {
          title: "二级分类",
          key: "salesRegion",
          align: "center",
          width: 120
        },
        {
          title: "三级分类",
          key: "busiDept",
          align: "center",
          width: 120
        },
        {
          title: "四级分类",
          key: "busiOffice",
          align: "center",
          width: 120
        },
        {
          title: "省",
          key: "provName",
          align: "center",
          width: 120
        },
        {
          title: "市",
          key: "cityName",
          align: "center",
          width: 120
        },
        {
          title: "区/县",
          key: "areaName",
          align: "center",
          width: 120
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          width: 120
        },
        {
          title: "线路编号",
          key: "salesRoute",
          align: "center",
          width: 120
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 120
        },
        {
          title: "经销商",
          key: "merchantName",
          align: "center",
          width: 120
        },
        {
          title: "拉黑状态",
          key: "blackStatus",
          align: "center",
          width: 120,
          render: (h, params) => {
            let tag = [];
            if (params.row.blackStatus == 0) {
              tag.push(
                h(
                  "span",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      color: "#ff6600"
                    }
                  },
                  "拉黑"
                )
              );
            } else if (params.row.blackStatus == 1) {
              tag.push(
                h(
                  "span",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      color: "#00cc66"
                    }
                  },
                  "正常"
                )
              );
            }
            return h("div", tag);
          }
        },
        {
          title: "冻结状态",
          key: "status",
          align: "center",
          width: 120,
          render: (h, f) => {
            let str = "";
            let styles = "";
            if (f.row.status == 1) {
              str = "正常";
              styles = "#00cc66";
            } else if (f.row.status == 2) {
              str = "冻结";
              styles = "#ff6600";
            } else if (f.row.status == 0) {
              str = "初始";
            }
            let tag = [];
            tag.push(
              h(
                "span",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: styles
                  }
                },
                str
              )
            );
            return h("div", tag);
          }
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          width: 120
        },
        {
          title: "操作",
          key: "action",
          width: 180,
          fixed: "right",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  on: {
                    // click: this.updateRole
                    click: () => {
                      this.editData.oldPhone = params.row.phone;
                      this.editData.newStoreId = params.row.storeId;
                      this.isShow = true;
                    }
                  }
                },
                "修改手机号"
              )
            ]);
          }
        }
      ],
      pageData: [],
      storeId: ""
    };
  },
  watch: {
    isShow(val) {
      if (!val) {
        this.editData = {};
      }
    }
  },
  methods: {
    queryLog() {
      let query = {
        storeId: this.formData.storeId,
        phone: this.formData.phone
      };
      this.$router.push({
        path: "/changePhoneLog",
        query
      });
    },
    //获取验证码
    sendMsg() {
      let phone = "13754322270";
      //   let phone = "18336162911";
      if (!this.Global.checkPhone(phone)) {
        this.$Message.error("请输入正确的手机号");
        return false;
      }
      this.disabledStatus = true;
      var time = 10;
      this.Global.sendMsg(phone, "user_regist", () => {
        this.Global.TimeDown(
          time,
          t => {
            this.codeMsg = t + "S";
          },
          () => {
            this.disabledStatus = false;
            this.codeMsg = "发送验证码";
          }
        );
      });
    },
    sureChangeId() {
      if (!this.editData.phone) {
        this.$Message.error("请输入手机号码");
        return false;
      }
      if (!this.editData.code) {
        this.$Message.error("请输入验证码");
        return false;
      }
      var data = {
        newStoreId: this.editData.newStoreId,
        phone: this.editData.phone,
        oldPhone: this.editData.oldPhone,
        authCode: this.editData.code
      };
      data = this.Global.JsonChange(data);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("store/replaceStorePhone.json", data, res => {
        if (res && res.length) {
          let str = "<p>手机号已存在，已绑定</p>";
          res.forEach(item => {
            str += `<p>门店ID:${item.storeId},客户姓名:${
              item.storeName
            },客户编号:${item.joinCode}</p>`;
          });
          this.$Modal.info({
            title: "提示",
            content: str,
            okText: "OK"
          });
        } else {
          this.$Message.success("修改成功");
          this.init();
        }
        this.isShow = false;
      });
    },
    //关闭模态框
    cancel() {
      this.isShow = false;
      for (let v in this.editData) {
        this.editData[v] = "";
      }
    },
    submit() {
      if (
        !this.formData.joinCode &&
        !this.formData.storeId &&
        !this.formData.storeName
      ) {
        this.$Message.info("至少输入一个查询条件");
        return false;
      }
      this.init();
    },
    init(currentPage, pageSize) {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("personnel/queryStoreInfoList.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    updateRole(val) {
      this.isShow = true;
    }
  }
};
</script>