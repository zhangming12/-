
<style lang="less">
@import "../../config/index.less";
.form {
  position: relative;
  display: flex;
  align-items: center;
  .container {
    width: 35%;

    .w18 {
      width: 50%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;
      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
}
.esp-box th,
.esp-box td {
  border-right: 1px solid #ccc !important;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">对换客户账户日志新</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="name">
                <Input placeholder="用户ID" v-model.trim="formData.storeId" clearable></Input>
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
      <div class="box esp-box" style="padding:10px">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
        </div>
        <Table
          ref="table"
          :columns="columns"
          :data="pageData"
          :noneStatus="noneStatus"
          border
          disabled-hover
        ></Table>
      </div>
      <div class="page-box">
        <div>
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
export default {
  name: "new-custome-log",
  components: {
    hhTable,
    fieldNameDes
  },
  data() {
    return {
      noneStatus: false,
      formData: {
        phone: "",
        storeId: ""
      },
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70
        },
        {
          title: "修改时间",
          key: "createTime",
          align: "center",
          tooltip: true
        },
        {
          title: "更换前",
          align: "center",
          children: [
            {
              title: "用户ID1",
              key: "beforeOldUserId",
              align: "center",
              tooltip: true
            },
            {
              title: "客户名称1",
              key: "beforeOldStoreName",
              align: "center",
              tooltip: true
            },
            {
              title: "微信昵称1",
              key: "beforeOldWxNickName",
              align: "center",
              tooltip: true
            },
            {
              title: "用户ID2",
              key: "beforeNewUserId",
              align: "center",
              tooltip: true
            },
            {
              title: "客户名称2",
              key: "beforeNewStoreName",
              align: "center",
              tooltip: true
            },
            {
              title: "微信昵称2",
              key: "beforeNewWxNickName",
              align: "center",
              tooltip: true
            }
          ]
        },
        {
          title: "更换后",
          align: "center",
          children: [
            {
              title: "用户ID1",
              key: "afterOldUserId",
              align: "center",
              tooltip: true
            },
            {
              title: "客户名称1",
              key: "afterOldStoreName",
              align: "center",
              tooltip: true
            },
            {
              title: "微信昵称1",
              key: "afterOldWxNickName",
              align: "center",
              tooltip: true
            },
            {
              title: "用户ID2",
              key: "afterNewUserId",
              align: "center",
              tooltip: true
            },
            {
              title: "客户名称2",
              key: "afterNewStoreName",
              align: "center",
              tooltip: true
            },
            {
              title: "微信昵称2",
              key: "afterNewWxNickName",
              align: "center",
              tooltip: true
            }
          ]
        }
      ],
      pageData: [],
      pageSize: 10
    };
  },
  created() {
    if (Object.keys(this.$route.query).length) {
      let { storeId, phone } = this.$route.query;
      this.formData.storeId = storeId;
      this.formData.phone = phone;
      this.init();
    }
  },
  methods: {
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },

    init() {
      if (!this.formData.storeId) {
        this.$Message.info("请输入查询条件");
        return false;
      }
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("store/queryReplaceStoreIdLogNew.json", data, res => {
        this.pageData = res.datalist;
        if (res.datalist && res.datalist.length) {
          res.datalist.forEach(item => {
            Object.assign(item, item.paramMap);
            item.createTime = item.createTime
              ? this.Global.createTime(item.createTime)
              : "";
          });
        }
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  }
};
</script>