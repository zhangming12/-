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
      width: 52.5%;
      margin: auto;
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
  color: @primary-color;
}
.ivu-form-item {
  padding-bottom: 10px;
}
.selectBox {
  width: 94%;
  margin-left: 3%;
  height: 400px;
  padding: 10px 0;
  border: 1px solid #e5e5e5;
  .left,
  .right {
    float: left;
    width: 48%;
    height: 100%;
    margin-left: 2%;
    overflow-y: auto;
  }
  .left {
    border-right: 1px solid;
  }
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">后台账户管理</h2> -->
        <div class="main-container">
          <div class="box">
            <Form ref="form" class="form" :model="formData" :label-width="10">
                <div class="container">
                  <div class="btn-left w18">
                    <Form-item  prop='brandId'>
                      <Input v-model.trim='formData.loginAccount' placeholder="账户"></Input>
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item  prop='brandId'>
                      <Input v-model.trim='formData.phone' placeholder="手机号"></Input>
                    </Form-item>
                  </div>
                  <div class="btn-left w18">
                    <Form-item prop='loginAccount'>
                      <Input v-model.trim='formData.userName' placeholder="员工姓名"></Input>
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
              <addNewBtn class="btn-right" @click.native="createNewAccount" title="新建后台账户"/>
            </div>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
              
          </div>
          <div class="page-box" style="margin: 10px;overflow: hidden">
                <div style="float: right;">
                    <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <Modal
            :title="type == 'add'?'新建后台账户':'修改后台账户'"
            v-model="showUnlock"
            width=800
            class-name="vertical-center-modal">
             <Form :model="formItem" :label-width="90" ref="form" :rules="rule">
                 <Row>
                   <Col span="10" offset='1'>
                    <FormItem label="账户" prop="loginAccount" required>
                        <Input v-model="formItem.loginAccount"></Input>
                    </FormItem>
                   </Col>
                   <Col span="10" offset='1'>
                    <FormItem label="手机号" prop="phone" required>
                        <Input v-model="formItem.phone"></Input>
                    </FormItem>
                   </Col>
                   <Col span="10" offset='1' v-if="type == 'add'">
                    <FormItem v-if="type == 'add'" label='密码' prop="loginPwd" required>
                        <Input v-model.trim="formItem.loginPwd" type="password"></Input>
                    </FormItem>
                   </Col>
                   <Col span="10" offset='1'>
                    <FormItem label="员工姓名"  prop="loginAccount" required>
                        <Input v-model="formItem.userName"></Input>
                    </FormItem>
                   </Col>
                   
                 </Row>
                <div class="selectBox">
                    <div class="left">
                      <h4>待选择</h4>
                      <Tree @on-check-change='checkChange' ref="fatherTree" :data="baseData" show-checkbox></Tree>
                    </div>
                    <div class="right">
                      <h4>已选择</h4>
                      <Tree :data="checkedData" ref="tree"></Tree>
                    </div>
                </div>
            </Form>
            <div slot="footer">
              <div style="text-align:center">
                <i-button type="success" @click="cancel">取消</i-button>
                <i-button type="primary" @click="userBind('form')">确定</i-button>
              </div>
                
            </div>
        </Modal>
    </div>
</template>

<script>
import addNewBtn from "@/components/Button/addNew-btn.vue";
import hhTable from "@/components/table/table.vue";
export default {
  name: "backstageAccountManagement-keepAlive",
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
        userName: [
          { required: true, message: "员工姓名不能为空", trigger: "blur" }
        ],
        loginPwd: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      },
      baseData: [],
      checkedData: [],
      selectData: "",
      selectId: "", //选中的userId
      type: "", //类型 add 新建  modify 修改
      formData: {
        loginAccount: "",
        brandId: ""
      },
      formItem: {
        phone: "",
        loginPwd: "",
        loginAccount: "",
        brandId: ""
      },
      page: 1,
      pageSize: 10,
      change: [],
      pageNum: 0,
      rules: {},
      loading: true,
      columns1: [
        {
          title: "账户",
          key: "loginAccount",
          align: "center",
          minWidth: 50
        },
        {
          title: "手机号",
          key: "phone",
          align: "center",
          minWidth: 50
        },
        {
          title: "员工姓名",
          key: "userName",
          align: "center",
          minWidth: 50
        },
        {
          title: "用户角色",
          key: "roles",
          align: "center",
          minWidth: 50,
          tooltip: true
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
                      this.type = "modify";
                      this.showUnlock = true;
                      this.formItem.phone = params.row.phone;
                      this.formItem.userName = params.row.userName;
                      this.formItem.brandId = params.row.brandId;
                      this.formItem.userId = params.row.userId;
                      this.formItem.roleIds = params.row.roleIds;
                      this.formItem.loginAccount = params.row.loginAccount;
                      this.selectId = params.row.userId;
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
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该账户？",
                        onOk: () => {
                          this.remove(params.row.userId);
                        }
                      });
                    }
                  }
                },
                "删除"
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
  components: { addNewBtn, hhTable },
  created() {
    let brandIds = JSON.parse(sessionStorage.getItem("user")).brands;
    this.brandId = Object.keys(brandIds).join();
    this.init();
  },
  watch: {
    showUnlock(val) {
      if (!val) {
        this.checkedData = [];
        this.baseData = [];
        this.formItem = {
          userName: "",
          phone: "",
          loginPwd: ""
        };
      } else {
        this.getTreeData();
      }
    }
  },
  methods: {
    checkChange(val) {
      this.checkedData = [];
      const arr = [];
      val.forEach(item => {
        let obj = null
        if(item.parentId){
          //子节点
          //先找到父级
          let flag = false;
          this.checkedData.forEach(val => {
            if(val.id == item.parentId){
              flag = true;
              obj = val
            }
          })
          if(flag){
            obj.children.push({
              title:item.title,
              id:item.id,
              expand:true,
              parentId:item.parentId
            })
          }else{
            obj = {}
            this.brandList.forEach( nn => {
              if(nn.id == item.parentId){
                obj.title = nn.title
                obj.id = nn.id;
                obj.expand = true;
              }
            })
            obj.children = [];
            obj.parentId = null;
            obj.children.push({
              title:item.title,
              id:item.id,
              expand:true,
              parentId:item.parentId
            })
            this.checkedData.push(obj)
          }
        }else{
          //父节点
          //先找到该父节点是否已经存在
          let flag = false;
          this.checkedData.forEach(val => {
            if(val.id == item.parentId){
              //存在
              flag = true;
              obj = val
            }
          })
          if(flag){
            val.children.push(
              {
                title:item.title,
                id:item.id,
                expand:true,
                children:[]
              }
            )
          }
        }
      })
      return 
      // const arr = []; //定义children为空的集合
      const children = []; //定义children不为空的集合
      const jh = []; //定义和children内容相同的集合
      val.forEach((item, index) => {
        if (item.children && item.children.length === 0) {
          arr.push({
            title: item.title,
            index
          });
        }
        if (item.children && item.children.length > 0) {
          children.push(...item.children);
        }
      });
      arr.forEach(item => {
        children.forEach(j => {
          if (item.title === j.title) {
            jh.push(item);
          }
        });
      });
      jh.forEach(item => {
        val.forEach((j, i) => {
          if (item.title === j.title) {
            val.splice(i, 1);
          }
        });
      });
      this.checkedData = JSON.parse(JSON.stringify(val));
    },
    cancel() {
      this.showUnlock = false;
    },
    createNewAccount() {
      this.type = "add";
      this.showUnlock = true;
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    userBind(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.type === "add") {
            this.addUser();
          } else {
            this.upDate();
          }
        } else {
          this.$Message.error("必选项不能为空!");
        }
      });
    },
    addUser() {
      let data = this.Global.JsonChange(this.formItem);
      this.Global.deleteEmptyProperty(data);

      let datas = this.$refs["fatherTree"].getCheckedNodes();
      let list = [];
      datas.forEach(item => {
        if (item.id) {
          list.push(item.id);
        }
      });
      data["roleIds"] = list.join();
      data.loginPwd = this.Global.Md5(data.loginPwd);
      this.Global.doPost("admin/doSave.json", data, res => {
        this.$Message.success("新建账户成功");
        this.cancel();
        this.init();
      });
    },
    getTreeData() {
      let data = [];
      this.brandId.split(",").forEach(item => {
        data.push({
          id: item
        });
      });
      this.Global.doPost(
        "role/queryRoleAndBrand.json",
        { brandVOs: data },
        res => {
          this.baseData = [];
          this.brandList = [];
          if (res && res.length) {
            res.forEach(item => {
              let obj = {};
              obj.title = item.brandName;
              // obj.id = item.brandId;
              obj.id = null;
              this.brandList.push({
                id:item.brandId,
                title:item.brandName
              })
              obj.parentId = null;
              if(item.roleList && item.roleList.length){
                obj.children = []
                item.roleList.forEach(val => {
                  obj.children.push(
                    {
                      title:val.roleName,
                      id:val.id,
                      parentId:item.brandId
                    }
                  )
                })
              }
              this.baseData.push(obj)
            })
          }
          //查询选中的资源
          if (this.type == "modify") {
            this.checkedData = [];
            let datas = []
            let resData = this.formItem.roleIds.split("/");
            this.baseData.forEach((item, index) => {
              item.children.forEach((j, num) => {
                resData.forEach(k => {
                  if (j.id == k) {
                    this.$set(
                      this.baseData[index].children[num],
                      "checked",
                      true
                    );
                    datas.push(j);
                  }
                });
              });
            });
            // console.log(datas)
            // this.checkedData = datas
            this.checkChange(datas);
          }
        }
      );
    },
    upDate() {
      let data = this.Global.JsonChange(this.formItem);
      this.Global.deleteEmptyProperty(data);

      let datas = this.$refs["fatherTree"].getCheckedNodes();
      let list = [];
      datas.forEach(item => {
        if (item.id) {
          list.push(item.id);
        }
      });
      data["roleIds"] = list.join();

      this.Global.doPost("admin/doUpdate.json", data, res => {
        this.$Message.success("修改账户成功");
        this.cancel();
        this.init();
      });
      // let data = this.Global.JsonChange(this.formItem);
      // this.Global.deleteEmptyProperty(data);
      // data.userId = this.selectId;
      // this.Global.doPost("admin/doUpdate.json", data, res => {
      //   this.$Message.success("修改账户成功");
      //   this.cancel();
      //   this.init();
      // });
    },
    // 删除
    remove(userId) {
      this.Global.doPost(
        "admin/setAdminStatus.json",
        {
          userId,
          status: 3
        },
        res => {
          this.init();
        }
      );
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.brandId;
      this.Global.doPost("admin/queryWithPage.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>