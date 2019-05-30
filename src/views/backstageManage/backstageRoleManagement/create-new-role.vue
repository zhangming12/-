<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.buttonBox {
  padding: 10px 0;
  h4 {
    margin-left: 30px;
    font-weight: normal;
    margin-bottom: 20px;
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
.btn {
  text-align: center;
  margin: 15px;
  .btnSearch {
    margin: 5px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">新建角色</h2> -->
    <div class="main-container">
      <div class="box">
        <Form :model="formData" :label-width="88" :rules="rules">
          <Row>
            <Col span="6">
              <Form-item label="品牌名称" prop="brandId" required>
                <Select v-model="formData.brandId" placeholder="请选择">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="角色名称" prop="roleName" required>
                <Input v-model.trim="formData.roleName" placeholder="请输入角色名称"></Input>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="角色说明" prop="description">
                <Input v-model.trim="formData.description" placeholder="请输入角色说明"></Input>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="box buttonBox">
        <Form :label-width="88" ref="form" :rules="rules">
          <Row>
            <Col span="24">
              <h4>菜单选择:</h4>
              <div class="selectBox">
                <div class="left">
                  <Tree
                    @on-check-change="checkChange"
                    ref="fatherTree"
                    :data="baseData"
                    show-checkbox
                  ></Tree>
                </div>
                <div class="right">
                  <Tree :data="checkedData" ref="tree"></Tree>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
        <div class="btn">
          <Button @click="cancel" class="btnSearch" type="info">取消</Button>
          <Button @click="submit('form')" class="btnSearch" type="success">保存</Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "create-new-role",
  data() {
    return {
      rules: {},
      baseData: [],
      type: "", //类型 add 新建  modify 修改
      formData: {
        brandId: "",
        roleName: "",
        description: ""
      },
      checkedData: [],
      brandList: [],
      showUnlock: false,
      i: 0
    };
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { tbType: "team" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.$route.query.type === "add") {
          this.formData.brandId = this.brandList[0].id;
        }
      }
    );
    let implode = (arr, parentId, level) => {
      let newArr = [];
      if (arr.length === 0) {
        return newArr;
      }
      arr.forEach(item => {
        if (item.parentId === parentId) {
          item = {
            title: item.resName,
            id: item.id,
            level
          };
          item.children = implode(arr, item.id, level + 1);
          newArr.push(item);
        }
      });
      return newArr;
    };
    this.Global.doPost(
      "resource/queryResourceByUser.json",
      { memo: true },
      res => {
        this.baseData = [];
        let arr = implode(res, 0, 1);
        this.baseData = arr;
        if (this.$route.query.type === "edit") {
          this.Global.doPost(
            "resource/getRoleResource.json",
            this.$route.query.id,
            res => {
              this.formData.brandId = res.brandId;
              this.formData.roleName = res.roleName;
              this.formData.description = res.description;
              // 为选中的菜单添加 checked = true;

              let checkedArr = [];
              res.resourceList.forEach(item => {
                let level = null;
                if (item.resType == "template") {
                  level = 1;
                }
                if (item.resType == "menu") {
                  level = 2;
                }
                if (item.resType == "page") {
                  level = 3;
                }
                checkedArr.push({
                  children: [],
                  checked: true,
                  level,
                  title: item.resName,
                  id: item.id
                });
                this.baseData.forEach((j, index) => {
                  if (j.children && j.children.length) {
                    j.children.forEach((val, num) => {
                      if (val.children && val.children.length) {
                        val.children.forEach((k, n) => {
                          if (item.resType == "page" && item.id == k.id) {
                            this.$set(
                              this.baseData[index].children[num].children[n],
                              "checked",
                              true
                            );
                          }
                        });
                      }
                    });
                  }
                });
              });
              // 过滤选中菜单显示
              this.checkedData = implode(res.resourceList, 0);
            }
          );
        }
      }
    );
  },
  watch: {
    showUnlock(val) {
      if (!val) {
      }
    }
  },
  methods: {
    checkChange(val) {
      let arr = []; //选中的
      val.forEach(item => {
        if (item.level == 1) {
          //选中的是一级
          this.baseData.forEach(val => {
            if (val.id == item.id) {
              arr.push({
                title: val.title,
                level: 1,
                children: [],
                expand: true
              });
            }
          });
        }
        if (item.level == 2) {
          //选中的是二级
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(j => {
                if (item.id == j.id) {
                  if (arr.length) {
                    let flag = null;
                    //有一级的情况
                    arr.forEach(k => {
                      if (k.title == val.title) {
                        flag = k;
                      }
                    });
                    if (flag) {
                      flag.children.push({
                        expand: true,
                        level: 2,
                        title: item.title,
                        children: []
                      });
                    } else {
                      arr.push({
                        title: val.title,
                        level: 1,
                        expand: true,
                        children: [
                          {
                            expand: true,
                            level: 2,
                            title: item.title,
                            children: []
                          }
                        ]
                      });
                    }
                    //没有一级的情况
                  } else {
                    arr.push({
                      title: val.title,
                      level: 1,
                      expand: true,
                      children: [
                        {
                          expand: true,
                          level: 2,
                          title: item.title,
                          children: []
                        }
                      ]
                    });
                  }
                }
              });
            }
          });
        }
        if (item.level == 3) {
          //选中的是三级
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(j => {
                if (j.children && j.children.length) {
                  j.children.forEach(n => {
                    if (item.id == n.id) {
                      //arr为空时
                      if (arr.length == 0) {
                        arr.push({
                          title: val.title,
                          expand: true,
                          level: 1,
                          children: [
                            {
                              expand: true,
                              level: 2,
                              title: j.title,
                              children: [
                                {
                                  expand: true,
                                  level: 3,
                                  title: item.title,
                                  children: []
                                }
                              ]
                            }
                          ]
                        });
                      } else {
                        //arr不为空时
                        // debugger
                        let flag1 = null;

                        arr.forEach(a => {
                          if (a.title == val.title) {
                            flag1 = a;
                          }
                        });

                        if (flag1) {
                          let flag2 = null;
                          //有包含他的一级
                          flag1.children.forEach(b => {
                            if (b.title == j.title) {
                              flag2 = b;
                            }
                          });
                          if (flag2) {
                            //有包含他的二级
                            flag2.children.push({
                              title: item.title,
                              children: [],
                              level: 3,
                              expand: true
                            });
                          } else {
                            //没有包含她的二级
                            flag1.children.push({
                              title: j.title,
                              expand: true,
                              level: 2,
                              children: [
                                {
                                  title: item.title,
                                  children: [],
                                  level: 3,
                                  expand: true
                                }
                              ]
                            });
                          }
                        } else {
                          //没有包含它的一级
                          arr.push({
                            title: val.title,
                            expand: true,
                            level: 1,
                            children: [
                              {
                                expand: true,
                                level: 2,
                                title: j.title,
                                children: [
                                  {
                                    expand: true,
                                    level: 3,
                                    title: item.title,
                                    children: []
                                  }
                                ]
                              }
                            ]
                          });
                        }
                      }
                    }
                  });
                }
              });
            }
          });
        }
      });
      this.checkedData = arr;
    },
    cancel() {
      this.$router.back();
    },
    createNewAccount() {
      this.type = "add";
      this.showUnlock = true;
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.formData.roleName) {
        this.$Message.error("请输入角色名称");
        return false;
      }
      if (this.checkedData.length < 1) {
        this.$Message.error("请选择角色菜单");
        return false;
      }
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      let datas = this.$refs["fatherTree"].getCheckedNodes();
      let idList = [];
      datas.forEach(item => {
        idList.push(item.id);
        if (item.level == 2) {
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(a => {
                if (a.id == item.id) {
                  idList.push(val.id);
                }
              });
            }
          });
        }
        if (item.level == 3) {
          this.baseData.forEach(val => {
            if (val.children && val.children.length) {
              val.children.forEach(a => {
                if (a.children && a.children.length) {
                  a.children.forEach(b => {
                    if (b.id == item.id) {
                      idList.push(val.id);
                      idList.push(a.id);
                    }
                  });
                }
              });
            }
          });
        }
      });
      idList = this.arrRemoval(idList);
      let api = "";
      if (this.$route.query.type === "edit") {
        api = "role/doUpdate.json";
        data["resourceList"] = idList;
        data["id"] = this.$route.query.id;
      } else {
        api = "resource/saveRoleResource.json";
        data["resourceIds"] = idList.join();
      }
      this.Global.doPost(api, data, res => {
        this.$router.back();
      });
    },
    arrRemoval(arr) {
      let obj = {};
      let newArr = [];

      for (let i = 0, len = arr.length; i < len; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = "a";
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    roleSureSetting() {}
  }
};
</script>