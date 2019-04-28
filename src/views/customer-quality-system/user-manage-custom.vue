//用户管理
<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.form {
  position: relative;
  display: flex;
  .container {
    width: 87.5%;
    margin: auto;
    .w18 {
      width: 20%;
    }
  }
}
.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
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
    img {
      cursor: pointer;
      margin-left: 10px;
    }
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
    padding: 10px;
    width: 100%;
    height: 100%;
    h3 {
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
    }
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">用户管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form
          ref="form"
          @keyup.enter="submit"
          class="form"
          :model="formData"
          :label-width="10"
          :rules="rule"
        >
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="用户名称" v-model="formData.userName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="登录账号" v-model="formData.loginAccount" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="手机号" v-model="formData.phone" clearable></Input>
              </Form-item>
            </div>
          </div>
          <div class="btn-left w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="submit('form')">
                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{ pageNum }}</span>条数据
          </span>

          <addNewBtn class="btn-right ml20" @btnClick="showModal"/>
        </div>
        <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus"></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>

    <myModal class="myModal" @close="closeModal" width="520" :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>{{type == 'modify' ? '修改用户' :'新建用户'}}</h3>
        <div class="modal-table">
          <Form ref="form" :model="formItem" :label-width="88">
            <Form-item label="用户名称" required>
              <Input
                :disabled="type == 'look'"
                v-model.trim="formItem.merchantName"
                placeholder="用户名称"
              />
            </Form-item>
            <Form-item label="登录账号" required>
              <Input :disabled="type == 'look'" v-model.trim="formItem.summary" placeholder="登录账号"/>
            </Form-item>
            <Form-item label="密码" required>
              <Input :disabled="type == 'look'" v-model.trim="formItem.summary" placeholder="密码"/>
            </Form-item>
            <Form-item label="手机号">
              <Input :disabled="type == 'look'" v-model.trim="formItem.summary" placeholder="手机号"/>
            </Form-item>
            <Form-item label="角色" required>
              <RadioGroup v-model="formItem.role">
                <div class="role-item" v-for="item in roleList" :key="item.id">
                  <Radio :label="item.id">{{ item.name }}</Radio>
                </div>
              </RadioGroup>
            </Form-item>
            <div class="modal-fotter" style="text-align:center;">
              <Button @click="closeModal" type="default">取消</Button>
              <Button v-if="type != 'look'" @click="saveNewPresent" type="default">确定</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import addNewBtn from "@/components/Button/addNew-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
export default {
  name: "user-manage-custom",
  data() {
    return {
      myModalisShow: false,
      formData: {
        brandId: ""
      },
      roleList: [
        {
          id: 1,
          name: "111"
        },
        {
          id: 2,
          name: "222"
        },
        {
          id: 3,
          name: "333"
        },
        {
          id: 4,
          name: "444"
        },
        {
          id: 1,
          name: "111"
        }
      ], //角色列表
      brandList: [],
      brandId: "",
      noneStatus: false,
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "用户名称",
          key: "id",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "登录账号",
          key: "merchantName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },

        {
          title: "手机号",
          key: "summary",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "角色",
          key: "brandName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let buttonDom = [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.setData(params.row, "modify");
                      this.formItem.brandName = params.row.brandName;
                      this.formItem.brandId = params.row.brandId;
                      this.formItem.merchantName = params.row.merchantName;
                      this.formItem.summary = params.row.summary;
                      this.formItem.id = params.row.id;
                      this.addNewPresent();
                    }
                  }
                },
                "修改"
              )
            ];
            return h("div", buttonDom);
          }
        }
      ],
      type: "",
      pageData: [],
      brandList: [],
      activityList: [],
      formItem: {
        brandId: "",
        brandName: "",
        merchantName: "",
        summary: "",
        id: ""
      }
    };
  },
  components: { myModal, addNewBtn, hhTable },
  created() {},
  watch: {
    myModalisShow(val) {
      if (!val) {
        this.formItem = {
          brandId: "",
          brandName: "",
          summary: "",
          merchantName: ""
        };
      }
    }
  },
  methods: {
    //查询角色列表
    queryRoleList() {
      if (!this.roleList.length) {
        let data = {};
        this.Global.doPost("", data, res => {
          this.roleList = res;
        });
      }
    },
    showModal() {
      this.addNewPresent();
      this.type = "add";
    },
    setData(row, type) {
      this.type = type;
      this.formItem = {
        brandId: row.brandId,
        name: row.name,
        type: row.type + "",
        goodsUrl: row.goodsUrl
      };
    },
    saveNewPresent() {
      if (!this.formItem.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formItem.merchantName) {
        this.$Message.error("经销商名称不能为空");
        return false;
      }

      if (!this.formItem.summary) {
        this.$Message.error("经销商描述不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formItem);
      this.Global.deleteEmptyProperty(data);
      if (this.type == "modify") {
        delete data["type"];
        this.Global.doPost("dealers/doUpdate.json", data, res => {
          let str = "修改成功";
          this.$Message.success(str);
          this.myModalisShow = false;
          this.init();
        });
      } else {
        this.Global.doPost("dealers/doSave.json", data, res => {
          let str = "保存成功";
          this.$Message.success(str);
          this.myModalisShow = false;
          this.init();
        });
      }
    },
    closeModal() {
      this.myModalisShow = false;
    },
    addNewPresent() {
      this.myModalisShow = true;
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("dealers/doQueryWithPage.json", data, res => {
        //   console.log(res);
        this.pageData = res.datalist;
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
      });
    }
  }
};
</script>