<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
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
    height: 500px;
    padding: 10px 0;
    border: 1px solid #e5e5e5;
    .left,
    .right {
      // float: left;
      width: 100%;
      height: 100%;
      padding-left: 2%;
    }
    .left {
      // border-right: 1px solid;
      overflow-y: auto;
    }
    .right {
      .btn-box {
        width: 200px;
        border: 1px solid #e5e5e5;
        padding: 10px;
        .block-btn {
          display: block;
          // margin-bottom: 10px;
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
</style>
    
    <template>
  <div id="Main">
    <!-- <h2 class="Title">菜单管理</h2> -->
    <div class="main-container">
      <div class="box buttonBox">
        <Form :label-width="88">
          <Row>
            <Col span="24">
              <h4>菜单管理:</h4>
              <div class="selectBox">
                <div class="left">
                  <Tree ref="tree" :data="treeData" :render="renderContent" @on-check-change="save"></Tree>
                </div>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
    <!-- 新建/修改一级菜单 -->
    <Modal v-model="oneMenuShow">
      <h3
        slot="header"
        style="color:#f60;text-align:center"
      >{{menuData.type == 'add'?'新建一级菜单':'修改一级菜单'}}</h3>
      <Form :model="menuData" :label-width="88">
        <Form-item label="菜单名称:" prop="resName" required>
          <Input v-model.trim="menuData.resName" placeholder="请输入菜单名称"></Input>
        </Form-item>

        <Form-item label="所属模块:" prop="menuName" required>
          <Select v-model="menuData.menuName" placeholder="模块名称" clearable>
            <Option
              :value="item.id"
              v-for="(item,index) in modularList"
              :key="index"
            >{{ item.title }}</Option>
          </Select>
        </Form-item>
        <Form-item label="排序号:" prop="orderIndex" required>
          <Input v-model.trim="menuData.orderIndex" placeholder="请输入序号"></Input>
        </Form-item>
        <Form-item label="icon:" prop="resIcon" required>
          <Input v-model.trim="menuData.resIcon" placeholder="请输入ICON"></Input>
        </Form-item>
        <Form-item label="菜单说明:" prop="summary">
          <Input v-model.trim="menuData.summary" placeholder="请输入功能说明"></Input>
        </Form-item>
      </Form>
      <div slot="footer" style="text-align:center;">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="text" @click="partitionSave">保存</Button>
      </div>
    </Modal>
    <!-- 新建/修改二级菜单 -->
    <Modal v-model="twoMenuShow">
      <h3
        slot="header"
        style="color:#f60;text-align:center"
      >{{menuData.type == 'add'?'新建二级菜单':'修改二级菜单'}}</h3>
      <Form :model="menuData" :label-width="100">
        <Form-item label="菜单名称:" prop="resName" required>
          <Input v-model.trim="menuData.resName" placeholder="请输入菜单名称"></Input>
        </Form-item>
        <Form-item label="菜单URL:" prop="resPage" required>
          <Input v-model.trim="menuData.resPage" placeholder="请输入菜单URL"></Input>
        </Form-item>
        <Form-item label="所属模块:" prop="menuName" required @on-change="getOneLevelMenuList">
          <Select v-model="menuData.menuName" placeholder="模块名称" clearable>
            <Option
              :value="item.id"
              v-for="(item,index) in modularList"
              :key="index"
            >{{ item.title }}</Option>
          </Select>
        </Form-item>
        <Form-item label="所属一级菜单:" prop="module" required>
          <Select v-model="menuData.module" placeholder="一级菜单" clearable>
            <Option
              :value="item.id"
              v-for="(item,index) in oneLevelMenuList"
              :key="index"
            >{{ item.resName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="排序号:" prop="orderIndex" required>
          <Input v-model.trim="menuData.orderIndex" placeholder="请输入序号"></Input>
        </Form-item>
        <Form-item label="菜单说明:" prop="summary">
          <Input v-model.trim="menuData.summary" placeholder="请输入功能说明"></Input>
        </Form-item>
      </Form>
      <div slot="footer" style="text-align:center;">
        <Button type="text" @click="cancel">取消</Button>
        <Button type="text" @click="twoLevelMenuSure">保存</Button>
      </div>
    </Modal>
  </div>
</template>
    
<script>
export default {
  name: "menu-manage-keepAlive",
  data() {
    return {
      treeData: [],
      modularList: [],
      oneLevelMenuList: [],
      buttonProps: {
        type: "text",
        size: "small",
        value: true
      },
      showSettingRole: false,
      type: "", //类型 add 新建  modify 修改
      oneMenuShow: false,
      twoMenuShow: false,
      menuData: {
        type: "", //add modify
        menuName: "",
        summary: "", //功能说明
        orderIndex: null,
        resIcon: "",
        resName: "",
        resPage: ""
      },
      maxLevel: [],
      selectData: {
        resType: ""
      }
    };
  },
  watch: {
    oneMenuShow(val) {
      if (!val) {
        this.menuData = {};
      }
    },
    twoMenuShow(val) {
      if (!val) {
        this.menuData = {};
      }
    }
  },
  created() {
    this.getTreeData();
  },
  methods: {
    getTreeData() {
      let implode = null;
      this.maxLevel = [];
      implode = (arr, parentId, level) => {
        let newArr = [];
        if (arr.length === 0) {
          return newArr;
        }
        arr.forEach(item => {
          if (item.parentId === parentId) {
            item = {
              title: item.resName,
              id: item.id,
              parentId: item.parentId,
              status: item.status,
              checked: true,
              resType: item.resType,
              summary: item.summary,
              resIcon: item.resIcon,
              resPage: item.resPage,
              orderIndex: item.orderIndex,
              level
            };
            item.children = implode(arr, item.id, level + 1);
            this.maxLevel.push(level);
            newArr.push(item);
          }
        });
        return newArr;
      };

      this.Global.doPost("resource/queryResourceByUser.json", {}, res => {
        this.treeData = [];
        let arr = implode(res, 0, 1);
        arr.forEach(item => {
          if (item.resType == "template" && item.parentId == 0) {
            this.treeData.push(item);
          }
        });
        this.maxLevel = Math.max(...this.maxLevel);
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
                    display: data.level != 3 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.append(data);
                    }
                  }
                },
                "添加子菜单"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  style: {
                    display: data.level != 1 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.changeStatus(data);
                    }
                  }
                },
                data.status == 1 ? "停用" : "启用"
              ),
              h(
                "Button",
                {
                  props: Object.assign({}, this.buttonProps),
                  style: {
                    display: data.level != 1 ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.change(root, node, data);
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
    getModularList() {
      this.modularList = [];
      this.treeData.forEach(item => {
        this.modularList.push({
          title: item.title,
          level: item.level,
          parentId: item.parentId,
          id: item.id
        });
      });
    },
    //获取一级菜单List
    getOneLevelMenuList(id) {
      this.oneLevelMenuList = [];
      this.menuData.module = "";
      if (!id) {
        return;
      }
      this.Global.doPost("resource/queryMenuByTemplate.json", id, res => {
        this.oneLevelMenuList = res;
      });
    },
    //获取所属模块
    getBelonedModule(id) {
      // debugger
      let str = null;
      this.treeData.forEach(item => {
        item.children.forEach(val => {
          if (val.id == id) {
            str = item.id;
            return str;
          }
          if (val.children && val.children.length) {
            val.children.forEach(pro => {
              if (pro.id == id) {
                str = item.id;
                return str;
              }
            });
          }
        });
      });
      return str;
    },
    //获取所属一级菜单
    getBelonedOneMenu(id) {
      let str = null;
      this.treeData.forEach(item => {
        item.children.forEach(val => {
          if (val.children && val.children.length) {
            val.children.forEach(pro => {
              if (pro.id == id) {
                str = val.id;
                return str;
              }
            });
          }
        });
      });
      return str;
    },
    append(data) {
      this.getModularList();
      if (data.level == 1) {
        this.oneMenuShow = true;
        this.menuData.menuName = data.id;
      } else {
        let parentId = this.getBelonedModule(data.id);
        this.menuData.menuName = parentId;
        this.getOneLevelMenuList(parentId);
        if (data.level == 2) {
          setTimeout(() => {
            this.menuData.module = data.id;
            this.$set(this.menuData, "module", data.id);
          }, 0);
        }
        this.twoMenuShow = true;
      }
      this.menuData.level = data.level;
      this.menuData.type = "add";
      this.selectData = data;
    },
    //停用启用
    changeStatus(data) {
      this.Global.doPost(
        "resourceAuthority/removeByStatus.json",
        data.id,
        res => {
          let str = data.status == 1 ? 0 : 1;
          this.$set(data, "status", str);
        }
      );
    },
    remove(root, node, data) {
      const parentKey = root.find(el => el === node).parent;
      const parent = root.find(el => el.nodeKey === parentKey).node;
      const index = parent.children.indexOf(data);
      parent.children.splice(index, 1);
    },
    // 修改
    change(root, node, data) {
      let parentId = this.getBelonedModule(data.id);
      this.getModularList();
      this.menuData.menuName = parentId;
      this.getOneLevelMenuList(parentId);

      if (data.level == 2) {
        // this.menuData.module = data.id;
        this.oneMenuShow = true;
      } else {
        setTimeout(() => {
          this.menuData.module = this.getBelonedOneMenu(data.id);
        }, 0);
        this.twoMenuShow = true;
      }

      this.menuData.type = "edit";
      this.menuData.id = data.id;
      this.selectData = data;
      this.menuData.resPage = data.resPage;
      this.menuData.summary = data.summary;
      this.menuData.resIcon = data.resIcon;
      this.menuData.resName = data.title;
      this.menuData.orderIndex = data.orderIndex;
    },
    //保存
    save() {
      let treeData = this.$refs.tree.getCheckedNodes();
      const [a, ...b] = treeData;
      let data = [];
      for (let i = 0; i < treeData.length; i++) {}
      return;
    },
    //新建一级菜单
    partitionSave() {
      if (!this.menuData.resName) {
        this.$Message.error("菜单名称不能为空");
        return false;
      }
      if (!this.menuData.menuName) {
        this.$Message.error("模块名称不能为空");
        return false;
      }
      if (!this.menuData.orderIndex) {
        this.$Message.error("排序号不能为空");
        return false;
      }
      if (!this.menuData.resIcon) {
        this.$Message.error("菜单ICON不能为空");
        return false;
      }
      this.addNode(this.selectData);
    },
    //新建/修改二级菜单
    twoLevelMenuSure() {
      if (!this.menuData.resName) {
        this.$Message.error("菜单名称不能为空");
        return false;
      }
      if (!this.menuData.resPage) {
        this.$Message.error("菜单URL不能为空");
        return false;
      }
      if (!this.menuData.menuName) {
        this.$Message.error("模块名称不能为空");
        return false;
      }
      if (!this.menuData.module) {
        this.$Message.error("所属一级菜单不能为空");
        return false;
      }
      if (!this.menuData.orderIndex) {
        this.$Message.error("排序号不能为空");
        return false;
      }
      const {
        resPage,
        orderIndex,
        summary,
        resIcon,
        resName,
        menuName
      } = this.menuData;
      const resType = "page";
      let parmas = {
        orderIndex,
        summary,
        parentId: this.menuData.module,
        resName,
        resType,
        resPage
      };
      if (this.menuData.type == "edit") {
        parmas["id"] = this.menuData.id;
      }
      this.Global.deleteEmptyProperty(parmas);

      this.Global.doPost("resourceAuthority/addResource.json", parmas, res => {
        this.$Message.success(
          this.menuData.type == "edit" ? "修改成功" : "新建成功"
        );
        this.getTreeData();
        this.cancel();
      });
    },
    cancel() {
      this.oneMenuShow = false;
      this.twoMenuShow = false;
    },
    addNode(data) {
      const { resPage, orderIndex, summary, resIcon, resName } = this.menuData;
      const resType = "menu";
      let parmas = {
        orderIndex,
        summary,
        parentId: this.menuData.menuName,
        resName,
        resType,
        resIcon
      };
      if (this.menuData.type == "edit") {
        parmas["id"] = this.menuData.id;
      }
      this.Global.deleteEmptyProperty(parmas);
      this.Global.doPost("resourceAuthority/addResource.json", parmas, res => {
        this.$Message.success(
          this.menuData.type == "edit" ? "修改成功" : "新建成功"
        );
        this.getTreeData();
        this.cancel();
      });
    },
    dataChange(val) {},
    createNewAccount() {},
    submit(name) {},
    userBind() {}
  }
};
</script>