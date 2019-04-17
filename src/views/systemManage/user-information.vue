
<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}
.box {
  // position: relative;
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  overflow: hidden;
  .form-title {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 600;
    padding-left: 10px;
    border-left: 3px solid @primary-color;
    margin-bottom: 10px;
    clear: both;
  }
}
#shopInfor {
  margin-top: 10px;
  .title {
    display: inline-block;
    float: left;
    height: 228px;
    line-height: 228px;
  }
  .child {
    width: 95%;
    float: left;
    margin-left: 20px;
    .Input {
      display: inline-block;
      .ivu-input {
        width: 300px;
        padding: 1px 7px;
        height: 52px;
        border-radius: 3px;
        text-align: center;
      }
    }
    .ivu-radio-group-vertical .ivu-radio-wrapper {
      display: inline;
    }
  }
}
.btn {
  padding: 5px 15px;
}
.btn:first-child {
  margin-right: 50px;
}
.btn:last-child {
  margin-left: 50px;
}
.pText {
  font-size: 14px;
  margin-top: 20px;
}
.btnBox {
  text-align: center;
  margin: 40px auto 30px;
  clear: both;
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">门店信息管理-客户信息</h2> -->
        <div class="box">
            <!-- 客户信息 -->
                <div class="form-title">客户信息</div>
                <div id="shopInfor">
                    <div class='child'>  
                        <Form :label-width='80' label-position="right">
                            <Row>
                                <Col span="6">
                                    <Form-item label='客户ID:'>
                                        {{formData.userId}}
                                    </Form-item>
                                    <Form-item label='客户生日:'>
                                        {{formData.	birthday}}
                                    </Form-item>
                                    <Form-item label='手机号码:'>
                                        <Input v-model='formData.phone' placeholder="请输入手机号码"></Input>
                                    </Form-item>
                                    <Form-item label='四级分类:'>
                                        <Input placeholder="四级分类"></Input>
                                    </Form-item>
                                </Col>
                                <Col span="6">
                                    <Form-item label='客户昵称:'>
                                        {{formData.birthday}}
                                    </Form-item>
                                    <Form-item label='客户编号:'>
                                        <Input v-model='formData.joinCode' placeholder="请输入客户编号"></Input>
                                    </Form-item>
                                    <Form-item label='一级分类:'>
                                        <Input v-model='formData.phone' placeholder="请输入一级分类"></Input>
                                    </Form-item>
                                    <Form-item label='省:'>
                                        <Input v-model='formData.provName' placeholder="请输入省"></Input>
                                    </Form-item>
                                </Col>
                                <Col span="6">
                                    <Form-item label='客户头像:'>
                                        <img src="" alt="">
                                    </Form-item>
                                    <Form-item label='客户名称:'>
                                        <Input v-model='formData.phone' placeholder="请输入客户名称"></Input>
                                    </Form-item>
                                    <Form-item label='二级分类:'>
                                        <Input v-model='formData.phone' placeholder="请输入二级分类"></Input>
                                    </Form-item>
                                    <Form-item label='市:'>
                                        <Input v-model='formData.phone' placeholder="请输入市"></Input>
                                    </Form-item>
                                </Col>
                                <Col span="6">
                                    <Form-item label='客户性别:'>
                                        {{formData.sex | sexFilter}}
                                    </Form-item>
                                    <Form-item label='客户姓名:'>
                                        <Input v-model='formData.name' placeholder="请输入客户姓名"></Input>
                                    </Form-item>
                                    <Form-item label='三级分类:'>
                                        <Input v-model='formData.phone' placeholder="请输入三级分类"></Input>
                                    </Form-item>
                                    <Form-item label='区/县:'>
                                        <Input v-model='formData.phone' placeholder="请输入区/县"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <Form-item label='地址:'>
                                        <Input v-model='formData.address' placeholder="请输入地址"></Input>
                                    </Form-item>
                                </Col>
                                <Col span="6">
                                    <Form-item label='线路编号:'>
                                        <Input v-model='formData.salesRoute' placeholder="请输入线路编号"></Input>
                                    </Form-item>
                                </Col>
                                <Col span="6">
                                    <Form-item label='品牌名称:'>
                                        {{formData.brandName}}
                                    </Form-item>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="6">
                                    <Form-item label='状态:'>
                                        <Select v-model="formData.blackStatus">
                                            <Option value="0" >正常</Option>
                                            <Option value="1" >冻结</Option>
                                        </Select>
                                    </Form-item>
                                </Col>
                                <Col span="12">
                                    <Form-item label='备注:'>
                                        <Input v-model='formData.memo' placeholder="请输入备注"></Input>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form>                     
                    </div>
                </div>
                <!-- 陈列活动 -->
                <div class="form-title" style="clear:both;">实时资产账户</div>
                <div id="shopInfor" style="overflow:hidden;">
                    <div class='child'>
                        <p class="pText">账户实时余额：<span style="font-size:16px;color:#ff8a34;"></span>元</p>
                        <p class="pText">账户实时余额：<span></span></p>
                    </div>
                </div>

            <div class="btnBox">
                <Button class="btn" type="success" @click="close">关闭</Button>
                <Button class="btn" type="primary" @click="save">保存</Button>
            </div>
            
        </div>    
    </div>
</template>

<script>
export default {
  name:"user-information",

  data() {
    return {
      formData: {
        address: "",
        phone: "",
        status: ""
      },
      accountData: {},
      storeId: ""
    };
  },
  created() {
    if (this.$route.query.storeId) {
      this.storeId = this.$route.query.storeId;
      this.init();
    }
  },
  mounted() {},
  watch: {},
  methods: {
    close() {
      this.$router.push({
        path: "/storeInformationManage"
        // query: queryParams
      });
    },
    save() {
      let data = this.Global.JsonChange(formData);
      this.Global.doPost("personnel/modifyStoreInfo.json", data, res => {
        this.$Message.success("修改成功");
        this.close();
      });
    },
    init() {
      this.Global.doPost(
        "personnel/getStoreInfo.json",
        { storeId: this.storeId },
        res => {
          this.formData = res;
        }
      );
      this.Global.doPost(
        "personnel/storeAccount.json",
        { storeId: this.storeId },
        res => {
          this.accountData = res;
        }
      );
    }
  },
  filters: {
    sexFilter(val) {
      let str = "";
      if (val == 0) {
        str = "女";
      } else if (val == 1) {
        str == "男";
      }
      return str;
    }
  }
};
</script>


