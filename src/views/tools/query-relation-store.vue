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
</style>

<template>
  <div id="Main">
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.type" clearable placeholder="类型">
                  <Option value="1">店员</Option>
                  <Option value="2">连锁门店</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="用户ID" v-model.trim="formData.userId" clearable></Input>
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
        <div class="contentTop">
          <!-- <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span> -->
          <exportBtn class="btn-right" title="导出" @click.native="exportExcel"/>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import exportBtn from "@/components/Button/export-btn.vue";
export default {
  name: "query-relation-store-keepAlive",
  data() {
    return {
      formData: {},
      page: 1,
      pageNum: 0,
      pageSize: 10,
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
          align: "center"
        },
        {
          title: "店主/负责人",
          key: "storeId",
          align: "center"
        },
        {
          title: "店员/分店",
          key: "wxNickName",
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  on: {
                    click: () => {}
                  }
                },
                "解除"
              )
            ]);
          }
        }
      ],
      pageData: [{}]
    };
  },
  components: { exportBtn },
  created() {
    this.init();
  },
  methods: {
    exportExcel() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "report/displayGoodsVerifyRecordExport.json",
        data
      );
      window.open(url);
    },
    submit() {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("personnel/queryStoreInfoList.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    }
  }
};
</script>