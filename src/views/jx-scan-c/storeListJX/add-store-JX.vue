<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  height: 100%;
  .title {
    margin: 10px 0 30px 20px;
    color: #333;
    font-size: 16px;
    font-weight: bold;
  }
  .form {
    margin-left: 80px;
    width: 600px;
  }
  .btn-Box {
    text-align: right;
    width: 680px;
    margin-top: 20px;
    button {
      padding: 6px 20px;
      margin: 0 8px;
    }
  }
}
</style>

<template>
  <div id="Main">
    <div class="main-container">
      <div class="title">{{ type == 'add' ? '新增门店' : "修改门店" }}</div>
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="88">
          <Form-item label="拜访路线">
            <Input placeholder="请输入拜访路线" v-model.trim="formData.route" clearable/>
          </Form-item>
          <Form-item label="办事处">
            <Input placeholder="请输入办事处" v-model.trim="formData.office" clearable/>
          </Form-item>
          <Form-item label="区域">
            <Input placeholder="请输入区域" v-model.trim="formData.areaName" clearable/>
          </Form-item>
          <Form-item label="客户编号" required>
            <Input placeholder="请输入客户编号" v-model.trim="formData.joinCode" clearable/>
          </Form-item>
          <Form-item label="门店名称" required>
            <Input placeholder="请输入门店名称" v-model.trim="formData.storeName" clearable/>
          </Form-item>
          <Form-item label="联系人" required>
            <Input placeholder="请输入联系人" v-model.trim="formData.name" clearable/>
          </Form-item>
          <Form-item label="手机号" required>
            <Input placeholder="请输入手机号" v-model.trim="formData.phone" clearable/>
          </Form-item>
          <Form-item label="地址" required>
            <Input placeholder="请输入地址" v-model.trim="formData.address" clearable/>
          </Form-item>
        </Form>
        <div class="btn-Box">
          <Button @click="save" type="primary">确认</Button>
          <Button @click="cancel" type="info">取消</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "add-store-JX",
  data() {
    return {
      type: "", //类型---add新增，modify---修改
      formData: {},
      name: "/addStoreJX"
    };
  },
  created() {
    let {
      type,
      phone,
      route,
      office,
      areaName,
      joinCode,
      storeName,
      name,
      address,
      storeId
    } = this.$route.query;
    this.formData = {
      storeId,
      phone,
      route,
      office,
      areaName,
      joinCode,
      storeName,
      name,
      address
    };
    this.type = type;
  },
  methods: {
    cancel() {
      this.closePage();
      this.$router.push({
        path: "/storeListJX"
      });
    },
    //关闭当前页签
    closePage() {
      let pageOpenedList = this.$store.state.app.pageOpenedList;
      this.$store.commit("removeTag", this.name);
      this.$store.commit("closePage", this.name);
      pageOpenedList = this.$store.state.app.pageOpenedList;
      sessionStorage.pageOpenedList = JSON.stringify(pageOpenedList);
    },
    //保存
    save() {
      if (!this.formData.joinCode) {
        this.$Message.info("客户编号不能为空");
        return;
      }
      if (!this.formData.storeName) {
        this.$Message.info("门店名称不能为空");
        return;
      }
      if (!this.formData.name) {
        this.$Message.info("联系人不能为空");
        return;
      }
      if (!this.formData.phone) {
        this.$Message.info("手机号不能为空");
        return;
      }
      if (!this.Global.checkPhone(this.formData.phone)) {
        this.$Message.info("请输入正确的手机号");
        return;
      }
      if (!this.formData.address) {
        this.$Message.info("地址不能为空");
        return;
      }
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "add") {
        api = "storeZjtg/storeJXCActivityAdd.json";
      } else {
        api = "storeZjtg/storeJXCActivitySetting.json";
      }
      this.Global.doPost(api, data, res => {
        this.$Message.success("操作成功");
        this.cancel();
      });
    }
  }
};
</script>

