<style lang="less" scoped>
@import "../../../config/index.less";
.form {
  display: flex;
  justify-content: space-between;
  .w18 {
    width: 20%;
  }
}
.container {
  flex: 1;
}
.w10 {
  width: 12.5%;
}
.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 48%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 8px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    width: 52%;
    img {
      cursor: pointer;
      margin-left: 6px;
    }
  }
}
</style>
<template>
  <div class="search">
    <!-- <h2 class="Title">搜索条件组件</h2> -->
    <div class="box">
      <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
        <div class="container">
          <div class="btn-left w18">
            <Form-item required>
              <Input placeholder="客户编号" v-model.trim="formData.joinCode" clearable/>
            </Form-item>
          </div>
          <div class="btn-left w18">
            <Form-item required>
              <Input placeholder="门店名称" v-model.trim="formData.storeName" clearable/>
            </Form-item>
          </div>
          <div class="btn-left w18">
            <Form-item required>
              <Input placeholder="店主姓名" v-model.trim="formData.name" clearable/>
            </Form-item>
          </div>
          <div class="btn-left w18">
            <Form-item>
              <Input placeholder="手机号" v-model.trim="formData.phone" clearable/>
            </Form-item>
          </div>
          <div class="btn-left w18">
            <Form-item required>
              <Select v-model="formData.isQrcode" placeholder="状态" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in statusList"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
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
  </div>
</template>

<script>
export default {
  name: "search",
  data() {
    return {
      showMore: false,
      formData: {}
    };
  },
  components: {},
  created() {},
  methods: {}
};
</script>