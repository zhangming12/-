<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.buttonBox {
  padding: 10px 0;
  .selectBox {
    width: 98%;
    margin-left: 10px;
    min-height: 400px;
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    display: flex;
    flex-direction: row;
    .left,
    .right {
      // float: left;
      width: 90%;
      height: 100%;
      padding-left: 2%;
    }
    .right {
      width: 10%;
    }
    .left {
      overflow-y: auto;
    }
    .right {
      .btn-box {
        width: 200px;
        border: 1px solid #e5e5e5;
        padding: 10px;
        .block-btn {
          display: block;
        }
      }
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
.upload-box {
  img {
    float: left;
    width: 40px;
    height: 40px;
    margin-right: 10px;
  }
}
.openNew {
  text-align: center;
  font-size: 60px;
  color: #999;
  cursor: pointer;
  line-height: 100px;
  margin-top: 100px;
  span {
    display: inline-block;
    position: relative;
    &::before {
      content: "+";
      position: absolute;
      display: inline-block;
      top: 0;
      left: -100px;
      font-size: 100px;
    }
  }
}
</style>
    
<template>
  <div id="Main">
      <!-- <h2 class="Title">组织关系管理</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" class="form" :model="formData" :label-width="10">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item  required>
                      <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                          <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select> 
                  </Form-item>
                </div>
                
              </div>
          </Form>
        </div>
        <div class="box buttonBox">
            <Form :label-width="88">
                <Row>
                    <Col span='24' >
                          <div class="selectBox" v-if="treeData && treeData.length">
                            <div class="left">
                              <Tree ref="tree" :data="treeData" :render="renderContent" @on-check-change="save"></Tree>
                            </div>
                            <div class="right">
                              <Button type="primary" @click="weihuTree" >维护关系树</Button>
                            </div>
                          </div>
                          <div class="openNew" v-else>
                            <span @click="addNewWorke = true;addType = 'add';">开启工作流</span>
                          </div>
                    </Col>
                    
                </Row>
            </Form>
        </div>
      </div>
      <!-- 新建/修改工作流 -->
      <Modal v-model="addNewWorke">
        <h3 slot="header" style="color:#f60;text-align:center">
            {{ addType == 'add' ? "新建工作流" : "修改工作流"}}
        </h3>
        <Form :model="menuData" :label-width="88">
          <Form-item label='品  牌:'>
              {{ formData.brandName }}
          </Form-item>
          <Form-item label='流程终点:' prop='deptName' required>
              <Input v-model.trim="addNewWorkeData.deptName" placeholder="请输入流程终点"></Input>
          </Form-item>
          
        </Form>
        <div slot="footer" style="text-align:center;">
          <Button type="text" @click="cancel">取消</Button>
          <Button type="text" @click="saveNewWorke">保存</Button>
        </div>
      </Modal>
        <!-- 新建/修改组织 -->
      <Modal v-model="oneMenuShow">
        <h3 slot="header" style="color:#f60;text-align:center">
            {{ menuData.type == 'add' ? '新建组织' : '修改组织'}}
        </h3>
        <Form :model="menuData" :label-width="88">
          <Form-item label='职位名称:' prop='deptName' required>
              <Input v-model.trim="menuData.deptName" placeholder="请输入职位名称"></Input>
          </Form-item>
          <Form-item label='汇报对象:' prop='menuName' required>
              {{menuData.menuName}}
          </Form-item>
          <Form-item label='位置:' required>
              <Select v-model="menuData.memo" placeholder="位置">
                  <Option :value="item.id" v-for="(item,index) in positionList" :key="index">{{ item.name }}</Option>
              </Select>
          </Form-item>
        </Form>
        <div slot="footer" style="text-align:center;">
          <Button type="text" @click="cancel">取消</Button>
          <Button type="text" @click="partitionSave">保存</Button>
        </div>
      </Modal>
  </div>
</template>
    
<script>
export default {
  name: "organizational-relationship-management-keepAlive",
  data() {
    return {
      treeData: [],
      buttonProps: {
        type: "text",
        size: "small",
        value: true
      },
      positionList: [
        {
          name: "无",
          id: "no"
        },
        {
          name: "起点",
          id: 0
        },
        {
          name: "终点",
          id: 1
        }
      ],
      addNewWorke: false,
      showSettingRole: false,
      type: "", //类型 add 新建  modify 修改
      oneMenuShow: false,
      menuData: {},
      brandList: [],
      formData: {
        brandId: "",
        brandName: ""
      },
      addType: "",
      addNewWorkeData: {
        deptName: ""
      },
      maxLevel: 5
    };
  },
  watch: {
    addNewWorke(val) {
      if (!val) {
        this.addNewWorkeData.deptName = "";
      }
    },
    oneMenuShow(val) {
      if (!val) {
        this.menuData = {};
      }
    }
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.formData.brandName = this.brandList[0].brandName;
          this.getTreeData(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    weihuTree() {
      if (!this.formData.brandId) {
        this.$Message.info("请选择品牌");
        return false;
      }
      this.Global.doPost(
        "position/updatePosition.json",
        { brandId: this.formData.brandId },
        res => {
          this.$Message.success("维护成功");
        }
      );
    },
    saveNewWorke() {
      if (!this.addNewWorkeData.deptName) {
        this.$Message.error("请输入流程终点");
        return false;
      }
      let data = {
        brandId: this.formData.brandId,
        deptName: this.addNewWorkeData.deptName,
        memo: 1,
        parentId: 0
      };
      let api = "";
      if (this.addType == "add") {
        api = "position/doSave.json";
      } else {
        api = "position/modifyPosition.json";
        data["id"] = this.menuData.id;
      }
      this.Global.doPost(api, data, res => {
        // let str =
        this.$Message.success(this.addType == "add" ? "新建成功" : "修改成功");
        this.cancel();
        this.changeValue(this.formData.brandId);
      });
    },
    renderContent(h, { root, node, data }) {
      return h(
        "span",
        {
          style: {
            display: "inline-block",
            width: "80%"
          }
        },
        [
          h("span", [
            h("Icon", {
              props: {
                type: "ios-paper-outline"
              },
              style: {
                marginRight: "8px"
              }
            }),
            h("span", data.title)
          ]),
          h(
            "span",
            {
              style: {
                display: "inline-block",
                marginLeft: "20px"
              }
            },
            [
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  style: {
                    marginRight: "8px",
                    display:
                      data.level > this.maxLevel || data.memo == 0
                        ? "none"
                        : "inline-block"
                  },
                  on: {
                    click: () => {
                      this.append(data);
                    }
                  }
                },
                "新建"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  on: {
                    click: () => {
                      this.remove(root, node, data);
                    }
                  }
                },
                "删除"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  on: {
                    click: () => {
                      this.update(data, node, root);
                    }
                  }
                },
                "修改"
              )
            ]
          )
        ]
      );
    },
    append(data) {
      this.oneMenuShow = true;
      this.menuData.type = "add";
      this.menuData.menuName = data.title;
      this.menuData.id = data.id;
      this.menuData.memo = "no";
      this.menuData.level = data.level;
    },
    update(data, node, root) {
      if (data.level == 1) {
        this.addType = "modify";
        this.addNewWorke = true;
        this.addNewWorkeData.deptName = data.title;
        this.menuData.id = data.id;
      } else {
        this.menuData.type = "modify";
        this.menuData.deptName = data.title;
        let level = data.level - 1;
        root.forEach(item => {
          if (item.node.level == level) {
            if (item.node.children && item.node.children.length) {
              for (let i = 0, len = item.node.children.length; i < len; i++) {
                if (item.node.children[i].id == data.id) {
                  this.menuData.menuName = item.node.title;
                }
              }
            }
          }
        });
        this.menuData.id = data.id;
        this.menuData.level = data.level;

        this.menuData.memo = data.memo ? parseInt(data.memo, 10) : "no";
        this.oneMenuShow = true;
      }
    },
    getTreeData(val) {
      this.treeData = [];
      this.Global.doPost("position/queryAll.json", { brandId: val }, res => {
        if (res && res.length) {
          let implode = (arr, parentId, level) => {
            let newArr = [];
            if (arr.length === 0) {
              return newArr;
            }
            arr.forEach(item => {
              if (item.parentId === parentId) {
                item = {
                  title: item.deptName,
                  id: item.id,
                  parentId: item.parentId,
                  checked: true,
                  expand: true,
                  memo: item.memo,
                  level
                };
                item.children = implode(arr, item.id, level + 1);
                newArr.push(item);
              }
            });
            return newArr;
          };
          const arr = implode(res, 0, 1);
          this.treeData = arr;
          console.log(this.treeData);
        }
      });
    },
    remove(root, node, data) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该组织？",
        onOk: () => {
          this.Global.doPost(
            "position/removePosition.json",
            { id: data.id },
            res => {
              this.$Message.success("删除成功！");
              this.changeValue(this.formData.brandId);
            }
          );
        }
      });
    },
    //保存
    save() {
      let treeData = this.$refs.tree.getCheckedNodes();
      const [a, ...b] = treeData;
      let data = [];
      for (let i = 0; i < treeData.length; i++) {}
      return;
    },
    //新建组织保存
    partitionSave() {
      if (!this.menuData.deptName) {
        this.$Message.error("请输入职位名称");
        return false;
      }

      let data = {
        brandId: this.formData.brandId,
        deptName: this.menuData.deptName
        // parentId: this.menuData.id
      };
      if (this.menuData.memo != "no") {
        data["memo"] = this.menuData.memo;
      }
      if (this.menuData.level >= this.maxLevel) {
        data["memo"] = 0;
      }
      let api = "";
      if (this.menuData.type == "add") {
        api = "position/doSave.json";
        data["parentId"] = this.menuData.id;
      } else {
        api = "position/modifyPosition.json";
        data["id"] = this.menuData.id;
      }
      this.Global.doPost(api, data, res => {
        this.$Message.success("新建成功");
        this.cancel();
        this.changeValue(this.formData.brandId);
      });
    },
    cancel() {
      this.oneMenuShow = false;
      this.addNewWorke = false;
    },
    changeValue(val) {
      this.formData.brandName = "";
      if (!val) return;
      this.brandList.forEach(item => {
        if (item.id == val) {
          this.formData.brandName = item.brandName;
        }
      });
      this.getTreeData(val);
    }
  }
};
</script>