// 团队管理
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
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
      }
    }
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">团队管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="团队名称" v-model.trim="formData.teamName" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="负责人" v-model.trim="formData.account" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="手机号" v-model.trim="formData.phone" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.status" clearable placeholder="状态">
                  <Option value="1">停用</Option>
                  <Option value="2">启用</Option>
                </Select>
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
    <!-- 新建/修改团队 -->
    <myModal class="myModal" @close="closeModal" width="520" :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>{{type == 'modify' ? '修改团队信息' : type == 'look' ? '查看团队' :'新建团队'}}</h3>
        <div class="modal-table">
          <Form ref="form" :model="formDatas" :label-width="88">
            <Form-item label="团队名称" required>
              <Input
                :disabled="type == 'modify'"
                v-model.trim="formDatas.brandName"
                placeholder="团队名称"
              />
            </Form-item>
            <Form-item label="负责人" required>
              <Input
                :disabled="type == 'look'"
                v-model.trim="formDatas.brandDesc"
                placeholder="负责人"
              />
            </Form-item>
            <Form-item label="手机号" required>
              <Input :disabled="type == 'look'" v-model.trim="formDatas.phone" placeholder="手机号"/>
            </Form-item>
            <Form-item label="是否脱敏" required>
              <RadioGroup v-model="formDatas.tuomin">
                <Radio label="1">
                  <span>是</span>
                </Radio>
                <Radio label="0">
                  <span>否</span>
                </Radio>
              </RadioGroup>
            </Form-item>
            <div class="modal-fotter" style="text-align:center;">
              <Button v-if="type != 'add'" @click="closeModal" type="default">取消</Button>
              <Button @click="saveNewPresent" type="default">确定</Button>
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
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
export default {
  name: "team-manage-keepAlive",
  data() {
    return {
      myModalisShow: false,
      brandId: "",
      formData: {
        brandId: "",
        name: ""
      },
      noneStatus: false,
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "团队名称",
          key: "id",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "负责人",
          key: "brandName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },

        {
          title: "手机号",
          key: "brandDesc",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "状态",
          key: "creditLine",
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
      formDatas: {},
      menuData: {}
    };
  },
  components: { myModal, addNewBtn, hhTable },
  created() {
    this.init();
  },
  watch: {
    myModalisShow(val) {
      if (!val) {
        this.formDatas = {
          brandId: "",
          presentType: "",
          activityTag: ""
        };
      }
    }
  },
  methods: {
    showModal() {
      this.addNewPresent();
      this.type = "add";
    },
    setData(row, type) {
      this.type = type;
      this.formDatas = {
        id: row.brandId,
        name: row.name,
        type: row.type + ""
      };
    },
    saveNewPresent() {
      if (!this.formDatas.brandName) {
        this.$Message.error("品牌名称不能为空");
        return false;
      }
      if (!this.formDatas.userName) {
        this.$Message.error("联系人不能为空");
        return false;
      }
      if (!this.formDatas.phone) {
        this.$Message.error("手机号不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formDatas);
      this.Global.deleteEmptyProperty(data);

      if (this.type == "modify") {
        delete data["type"];
        data["id"] = this.formDatas.id;
        data["userId"] = this.formDatas.userId;
        this.Global.doPost("brand/doUpdate.json", data, res => {
          let str = "修改成功";
          this.$Message.success(str);
          this.menuData.brandName = this.formDatas.brandName;
          this.menuData.brandId = this.brandId;

          this.myModalisShow = false;
          this.init();
        });
      } else {
        this.Global.doPost("brand/doSave.json", data, res => {
          let str = this.type == "modify" ? "修改成功" : "保存成功";
          this.$Message.success(str);
          this.menuData.brandId = res.id;
          this.menuData.brandName = this.formDatas.brandName;
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
      if (this.formData.phone) {
        if (!this.Global.checkPhone(this.formData.phone)) {
          this.$Message.info("请输入正确的手机号");
          return false;
        }
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("brand/doQueryWithPageByUser.json", data, res => {
        this.pageData = res.datalist;
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
      });
    }
  }
};
</script>