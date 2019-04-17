<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  background: #fff;
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
.tableBox {
  min-height: 500px;
  position: relative;
  margin-top: 15px;
  overflow: hidden;
  text-align: center;
  padding: 10px;
}
.queryBox {
  height: 60px;
  padding: 0 20px;
  line-height: 60px;
  overflow: hidden;
  .leftBox {
    float: left;
    span {
      display: inline-block;
      padding: 0 10px;
    }
    span:first-child {
      font-size: 14px;
      font-weight: bold;
    }
    span:last-child {
      color: #3b3bff;
      font-size: 14px;
      font-weight: bold;
      cursor: pointer;
    }
  }
  .rightBox {
    float: right;
  }
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">客资更新列表</h2> -->
        <div class="main-container">
          <div class="box queryBox">
              <div class="leftBox">
                <span>更新时间:</span>
                <span>{{updateTime}}</span>
                <span @click="updataNow">立即更新</span>
              </div>
              <div class="rightBox">
                  <Button type="primary" class="btn-search" @click="exportExcel">导出</Button>
              </div>
          </div>
          <div class="box tableBox">
              <!-- <Table :columns="columns1" :data="pageData" disabled-hover></Table> -->
              <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable> 
          </div>
          <div class="page-box">
              <div style="float: right;">
                  <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
              </div>
          </div>
        </div>
        <Modal
            title="客资更新操作"
            v-model="showUnlock"
            class-name="vertical-center-modal">
             <Form :model="formItem" :label-width="90" ref="form" :rules="rule">
                 <FormItem label="操作内容:" prop="userName">
                    <span>更新</span>
                </FormItem>
                <FormItem label="备注:" prop="memo">
                    <Input v-model="formItem.memo" type="textarea" :rows="4" placeholder="请输入备注"></Input>
                </FormItem>
            </Form>
            <div slot="footer">
              <div style="text-align:center">
                <i-button type="success" @click="cancel">取消</i-button>
                <i-button type="primary" @click="userBind">确定</i-button>
              </div>
                
            </div>
        </Modal>
    </div>
</template>

<script>
import area from "@/config/areaCode.js";
import hhTable from "@/components/table/table.vue";
export default {
  name:"guest-updateList-keepAlive",
  components: {
    hhTable
  },
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
      noneStatus: false,
      baseData: area,
      showSettingRole: false,
      type: "", //类型 add 新建  modify 修改
      formData: {
        updateTime: ""
      },
      updateTime: "",
      formItem: {
        detail: "",
        id: "",
        memo: ""
      },
      page: 1,
      pageSize: 10,
      pageNum: 0,
      rule: {},
      columns1: [
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          minWidth: 120
        },
        {
          title: "店主姓名",
          key: "name",
          align: "center",
          minWidth: 120
        },
        {
          title: "店铺名称",
          key: "storeName",
          align: "center",
          minWidth: 120
        },
        {
          title: "属性变更情况",
          key: "detail",
          align: "center",
          minWidth: 400,
          render: (h, f) => {
            let arr = [];
            let tag = [];
            if (f.row.detail) {
              arr = f.row.detail.split("|");
              console.log(arr);
              for (let i = 0; i < arr.length; i++) {
                tag.push(h("p", arr[i]));
              }
              return h("div", tag);
            }
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          minWidth: 70,
          render: (h, f) => {
            let str = "";
            if (f.row.status == 0) {
              str = "未操作";
            } else if (f.row.status == 1) {
              str = "已更新";
            } else {
              str = "";
            }
            return h("div", str);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 100,
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
                      this.formItem.id = params.row.id;
                      this.formItem.detail = params.row.detail;
                      this.showUnlock = true;
                    }
                  }
                },
                "更新"
              )
            ];
            // tag.push(
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "success",
            //         size: "small"
            //       },
            //       style: {
            //         marginRight: "5px"
            //       },
            //       on: {
            //         click: () => {
            //           this.showSettingRole = true;
            //         }
            //       }
            //     },
            //     "保留"
            //   )
            // );
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
        this.formItem.brandId = this.brandList[0].id;
        this.init();
      }
    });
  },

  watch: {
    showUnlock(val) {
      if (!val) {
        this.formItem = {
          id: "",
          detail: "",
          memo: ""
        };
      }
    }
  },
  methods: {
    exportExcel() {
      var url = this.Global.getExportUrl(
        "hbBaseData/getDiffStoreListExport.json",
        {}
      );
      window.open(url);
    },
    //立即更新
    updataNow() {
      this.$Modal.confirm({
        title: "警告",
        content: "确定立即更新？",
        onOk: () => {
          this.Global.doPost("hbBaseData/getDiffStore.json", "", res => {
            this.$Message.info("更新中，请稍后！");
            console.log(res);
            this.init();
          });
        }
      });
    },
    cancel() {
      this.showUnlock = false;
    },
    dataChange(val) {
      var treeData = this.$refs.tree.getCheckedNodes();
    },
    createNewAccount() {
      this.type = "add";
      this.showUnlock = true;
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    userBind() {
      let data = this.Global.JsonChange(this.formItem);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("hbBaseData/doUpdateDiff.json", data, res => {
        this.$Message.success("更新成功");
        this.cancel();
        this.init();
      });
    },
    init() {
      let data = {
        currentPage: this.page,
        pageSize: 10
      };
      this.Global.doPost("hbBaseData/getDiffStoreList.json", data, res => {
        this.pageNum = res.page.items;
        this.page = res.page.page;
        this.pageData = res.page.datalist;
        this.updateTime = this.Global.createTime(res.updateTime);
        this.noneStatus = true;
      });
    }
  }
};
</script>