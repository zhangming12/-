
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto 15px;
  padding-bottom: 0;
  background: #fff;
}

.form {
  position: relative;
  display: flex;
  // justify-content: center;
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
.myModal {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  .modal-main {
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    .header {
      background-color: #e5e5e5;
      height: 40px;
      line-height: 40px;
      font-size: 18px;
      font-weight: bold;
      color: #666;
      padding-left: 20px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .model-form {
        width: 400px;
        margin-left: 100px;
        .item-box {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: flex-start;
          .left {
            width: 70px;
            span {
              color: red;
              font-size: 14px;
            }
          }
          .right {
            flex: 1;
          }
        }
      }
    }
    .footer {
      text-align: right;
      padding: 10px 20px 10px 0;
    }
  }
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">人员维护</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item prop="name">
                                <Input placeholder="用户ID" v-model="formData.storeId"></Input>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item prop="phone">
                                <Input placeholder="手机号" v-model="formData.phone"></Input>
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
            <div class="box" style="padding:10px">
                <div class="contentTop">
                    <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span>
                    <!-- <addNewBtn  class="btn-right" title="新建" @btnClick="showModel" /> -->
                </div>
                <hhTable ref="table" :columns="columns" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
            
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
  name: "change-phone-log",

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
          type: "index"
        },
        {
          title: "修改时间",
          key: "createTime",
          align: "center",
          tooltip: true
        },
        {
          title: "用户ID",
          key: "newStoreId",
          align: "center",
          tooltip: true
        },
        {
          title: "客户编号",
          key: "newJoinCode",
          align: "center",
          tooltip: true
        },
        {
          title: "客户名称",
          key: "newStoreName",
          align: "center",
          tooltip: true
        },
        {
          title: "旧手机号",
          key: "oldPhone",
          align: "center",
          tooltip: true
        },
        {
          title: "新手机号",
          key: "phone",
          align: "center",
          tooltip: true
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
    }
    this.init();
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
      if (!this.formData.storeId && !this.formData.phone) {
        this.$Message.info("请输入查询条件");
        return false;
      }
      if (this.formData.phone) {
        if (!this.Global.checkPhone(this.formData.phone)) {
          this.$Message.info("请输入正确的手机号");
          return false;
        }
      }
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("store/queryReplaceStorePhoneLog.json", data, res => {
        this.pageData = res.datalist;
        if (res.datalist && res.datalist.length) {
          res.datalist.forEach(item => {
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