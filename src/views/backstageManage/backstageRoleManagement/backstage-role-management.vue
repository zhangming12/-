<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  height: 100%;
}

.main-container {
  position: relative;
  min-height: 100%;
  padding-top: 10px;
  background: #ffffff;
  padding-bottom: 60px;
  .form {
    display: flex;
    position: relative;
    .container {
      width: 35%;
      margin: auto;
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
        color: #ff8a34;
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
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}
.box {
  padding: 0 10px;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.buttonBox {
  padding: 10px 0;
}
.roleBox {
  overflow: hidden;
  width: 100%;
  height: auto;
  .roleBoxLeft,
  .roleBoxRight {
    float: left;
    width: 48%;
    margin-left: 2%;
    box-sizing: border-box;
  }
  .roleBoxLeft {
    border-right: 1px solid #e5e5e5;
  }
}
.numColor {
  color: #ff8a34;
}

</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">后台角色管理</h2> -->
        <div class="main-container">
          <div class="box">
              <Form ref="form" class="form" :model="formData" :label-width="10">
                  <div class="container">
                    <div class="btn-left w18">
                      <Form-item prop='brandId'>
                        <Select v-model="formData.brandId" placeholder="品牌名称">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                        </Select>
                      </Form-item>
                    </div>
                    <div class="btn-left w18">
                      <Form-item prop='workerName'>
                        <Input v-model.trim='formData.workerName' placeholder="请输入角色"></Input>
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
          <div class="box" style='margin-top: 15px;overflow: hidden;text-align:center;'>
            <div class='contentTop'>
              <span class="btn-left">共查询到 <span class='numColor'>{{pageNum}}</span> 条数据</span>
              <addNewBtn class="btn-right" @click.native="createNewAccount" title="新建角色"/>
            </div>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
          </div>
          <div class="page-box">
            <div style="float: right;">
              <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
          </div>
        </div>
        <Modal
            :title="type == 'add'?'新建后台账户':'修改后台账户'"
            v-model="showUnlock"
            class-name="vertical-center-modal">
             <Form :model="formItem" :label-width="90"  :rules="rule">
                 <FormItem label="用户名" prop="userName" style="padding-bottom:10px;">
                    <Input v-model="formItem.userName"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formItem.password" type="password"></Input>
                </FormItem>
                <FormItem label="手机号" prop="phone">
                    <Input v-model="formItem.phone"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
              <div style="text-align:center">
                <i-button type="success" @click="cancel">取消</i-button>
                <i-button type="primary" @click="userBind">确定</i-button>
              </div>
                
            </div>
        </Modal>
        <Modal
            title="设置账户角色"
            v-model="showSettingRole"
            @on-ok="roleSureSetting"
            width="800"
            class-name="vertical-center-modal">
             <div class="roleBox">
                 <div class="roleBoxLeft">
                     <h5>待选择</h5>
                     <Tree ref="tree" :data="baseData" multiple show-checkbox @on-check-change="dataChange"></Tree>
                 </div>
                 <div class="roleBoxRight">
                     <h5>已选择</h5>
                     <Tree :data="baseData" show-checkbox></Tree>
                 </div>
             </div>
             <!-- var treeData = this.$refs.tree.getCheckedNodes(); -->
        </Modal>
    </div>
</template>

<script>
import addNewBtn from "@/components/Button/addNew-btn.vue";

import area from "@/config/areaCode.js";
export default {
  name: "backstage-role-management",
  components: { addNewBtn },
  data() {
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
    return {
      rule: {
        phone: [
          { validator: validatePhone, trigger: "blur" },
          { trigger: "blur" }
        ],
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      baseData: area,
      showSettingRole: false,
      type: "", //类型 add 新建  modify 修改
      formData: {
        brandId: "",
        userName: ""
      },
      formItem: {
        userName: "",
        password: "",
        phone: ""
      },
      page: 1,
      pageSize: 10,
      pageNum: 0,
      rules: {},
      columns1: [
        {
          title: "品牌",
          key: "brandName",
          align: "center",
          minWidth: 50
        },
        {
          title: "角色",
          key: "roleName",
          align: "center",
          minWidth: 50
        },
        {
          title: "角色码",
          key: "roleCode",
          align: "center",
          minWidth: 50
        },
        {
          title: "角色说明",
          key: "description",
          align: "center",
          minWidth: 50
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 300,
          render: (h, params) => {
            var tag = [
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
                      this.$router.push(
                        `/createNewRole?type=edit&id=${params.row.id}`
                      );
                    }
                  }
                },
                "修改"
              )
            ];

            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px",
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该账户？",
                        onOk: () => {
                          this.remove(params.row.id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            );
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定复制该账户？",
                        onOk: () => {
                          this.copy(params.row);
                        }
                      });
                    }
                  }
                },
                "复制"
              )
            );
            return h("div", tag);
          }
        }
      ],
      pageData: [],
      page: 1,
      pageNum: 0,
      brandList: [],
      showUnlock: false
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.init();
      }
    });
  },
  watch: {
    showUnlock(val) {
      if (!val) {
        this.formItem = {
          phone: "",
          userName: "",
          password: ""
        };
      }
    }
  },
  methods: {
    cancel() {
      this.showUnlock = false;
    },
    dataChange(val) {
      var treeData = this.$refs.tree.getCheckedNodes();
      console.log(treeData);
    },
    createNewAccount() {
      this.$router.push("/createNewRole?type=add");
    },
    submit(name) {
      // this.$refs[name].validate(valid => {
      //   if (valid) {
      this.page = 1;
      this.init();
      // } else {
      //   this.$Message.error("请选择查询条件!!");
      // }
      // });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    userBind() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          //   this.save();
          this.$Message.error("yanzhengtongg!");
        } else {
          this.$Message.error("必选项不能为空!");
        }
      });
    },
    roleSureSetting() {},
    copy(data) {
      delete data.brandName;
      // let datas = {};
      let { id, brandId, brandName, roleName, description } = data;
      let datas = { id, brandId, brandName, roleName, description };
      this.Global.doPost("role/copyRole.json", datas, res => {
        this.init();
      });
    },
    remove(id) {
      this.Global.doPost(
        "resourceAuthority/deleteRoleResrouce.json",
        id,
        res => {
          this.init();
        }
      );
    },
    init() {
      if(!this.formData.brandId){
        this.$Message.error("请选择品牌");
        return false
      }
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("role/queryWithPage.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>