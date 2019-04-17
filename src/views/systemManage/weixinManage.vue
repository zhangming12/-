<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}
.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  // padding: 30px 20px;
  padding-top: 10px;
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
      <!-- <h2 class="Title">微信用户管理</h2> -->
      <div class="main-container">
      <div class="box">
            <Form ref="form" :model="formData" :label-width="80" :rules='rule'>
                <Row>
                    <Col span="6">                       
                        <Form-item label="客户ID" prop="storeId">
                            <Input v-model.trim="formData.storeId" placeholder="请输入客户ID"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="门店编码" prop="storeCode">
                            <Input v-model.trim="formData.storeCode" placeholder="请输入门店编码"></Input>
                        </Form-item>
                    </Col>
                    <Col span="6" offset="1">
                        <Form-item label="手机号" prop="phone">
                            <Input v-model.trim="formData.phone" placeholder="请输入客户手机号"></Input>
                        </Form-item>
                    </Col>
                    <Col span='4'>
                        <Button @click="submit" type="success" style="margin-left:20px;">查询</Button>
                        <Button @click="resetForm" type="primary" style='margin-left: 10px;'>重置</Button>
                    </Col>
                </Row>
            </Form>
      </div>
      <div class="box" style="padding-bottom:20px;padding:10px;">
        <div class="contentTop" style="margin:0;">
                    <!-- <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span> -->
                    <!-- <addNewBtn  class="btn-right" title="新建" @btnClick="showModel" /> -->
              <Button class="btn-right" @click="queryLog">日志查询</Button>
          </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      </div>
      <Modal v-model="isShow" width="500">
          <h3 style="text-align:center;" slot="header">对换客户ID</h3>
          <Form :label-width="120" :rules='rule1' ref="form">
               <Form-item label="原客户ID：">
                   {{oldStoreId}}
                </Form-item>
                <Form-item label="新客户ID：">
                    <Input placeholder="请输入新客户ID" v-model.trim="editData.newStoreId"></Input>
                </Form-item>
                <Form-item label="确认新客户ID：">
                    <Input placeholder="确认新客户ID" v-model.trim="editData.sureNewStoreId"></Input>
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
  name: "weixinManage-keepAlive",

  data() {
    const that = this;
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
    const validatePwd = (rule, value, callback) => {
      // 验证密码
      if (value == "") {
        callback(new Error("请输入新的用户ID"));
      } else {
        callback();
      }
    };
    const validateNewPwd = (rule, value, callback) => {
      // 验证第二次密码
      if (value == "") {
        callback(new Error("请再次输入新的ID"));
      } else {
        if (value != this.editData.newStoreId) {
          // 判断两次密码不一致
          callback(new Error("两次输入不一致"));
        } else {
          callback();
        }
      }
    };
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
      rule: {
        phone: [{ validator: validatePhone }],
        storeId: [{ message: "请输入用户ID" }],
        storeCode: [{ message: "请输入用户请输入门店编码" }]
      },
      rule1: {
        code: [{ required: true, message: "请输入验证码" }],
        newStoreId: [{ validator: validatePwd, required: true }],
        sureNewStoreId: [{ validator: validateNewPwd, required: true }]
      },
      codeMsg: "发送验证码",
      disabledStatus: false,
      columns1: [
        {
          title: "门店名称",
          key: "storeName",
          align: "center"
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center"
        },
        {
          title: "门店编码",
          key: "storeCode",
          align: "center"
        },
        {
          title: "客户姓名",
          key: "name",
          align: "center"
        },
        {
          title: "手机号",
          key: "phone",
          align: "center"
        },
        {
          title: "地址",
          key: "address",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          width: 180,
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
                    click: this.updateRole
                  }
                },
                "更新用户ID"
              )
            ]);
          }
        }
      ],
      pageData: [],
      storeId: ""
    };
  },
  methods: {
    //获取验证码
    sendMsg() {
      let phone = "13754322270";
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
    queryLog() {
      let query = {
        storeId: this.formData.storeId,
        phone: this.formData.phone
      };
      this.$router.push({
        path: "/weChatManageLog",
        query
      });
    },
    resetForm() {
      for (let val in this.formData) {
        this.formData[val] = "";
      }
      this.cancel();
    },
    sureChangeId(e) {
      if (!this.editData.newStoreId) {
        this.$Message.error("请输入新的用户ID");
        e.preventDefault();
        return false;
      }
      if (this.editData.newStoreId == this.oldStoreId) {
        this.$Message.error("新门店ID不能与原ID相同");
        return false;
      }
      if (this.editData.sureNewStoreId != this.editData.newStoreId) {
        this.$Message.error("两次输入的新门店ID不一致");
        e.preventDefault();
        return false;
      }
      if (!this.editData.code) {
        this.$Message.error("请输入验证码");
        e.preventDefault();
        return false;
      }
      var data = {
        oldStoreId: this.oldStoreId,
        newStoreId: this.editData.newStoreId,
        authCode: this.editData.code
      };
      data = this.Global.JsonChange(data);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "store/checkJoinActivity.json",
        { newStoreId: this.editData.newStoreId, authCode: this.editData.code },
        res => {
          if (res == 1) {
            this.Global.doPost("store/changeStoreWechat.json", data, res => {
              this.isShow = false;
              this.$Message.success("修改成功");
              this.cancel();
              this.submit();
            });
          } else if (res == 0) {
            //需要提示
            this.$Modal.confirm({
              title: "警告",
              content: `新门店${
                this.editData.newStoreId
              }已参与过活动，若修改，已参与记录则转移至门店${this.oldStoreId}`,
              onOk: () => {
                this.Global.doPost(
                  "store/changeStoreWechat.json",
                  data,
                  res => {
                    this.isShow = false;
                    this.$Message.success("修改成功");
                    this.cancel();
                    this.submit();
                  }
                );
              }
            });
          }
        }
      );
    },
    //关闭模态框
    cancel() {
      this.isShow = false;
      for (let v in this.editData) {
        this.editData[v] = "";
      }
    },
    submit() {
      let proms = {
        joinCode: this.formData.storeCode,
        storeId: this.formData.storeId,
        phone: this.formData.phone
      };
      proms = this.Global.JsonChange(proms);
      this.Global.deleteEmptyProperty(proms);
      let len = Object.keys(proms).length; //判断是否为空对象
      if (len) {
        this.pageData = [];
        this.Global.doPost("store/queryStore.json", proms, res => {
          if (res.length > 0) {
            this.$Message.success("查询成功");
            res = res[0];
            this.pageData = [
              {
                storeName: res.storeName,
                storeId: res.storeId,
                storeCode: res.joinCode,
                name: res.name,
                phone: res.phone,
                address: res.address
              }
            ];
            this.oldStoreId = res.storeId;
            this.Global.deleteEmptyProperty(this.pageData[0]);
            this.storeId = res.storeId;
          } else {
            this.$Message.error("没有查询到门店");
          }
        });
      } else {
        this.$Message.error("请至少输入一个查询条件");
      }
    },
    updateRole(val) {
      this.isShow = true;
    }
  }
};
</script>