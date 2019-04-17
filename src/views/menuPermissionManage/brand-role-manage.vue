<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  // margin: 0 auto 15px;
  // padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.contentTop {
  overflow: hidden;
  margin-bottom: 10px;
  button {
    background: #3399ff;
    float: right;
    color: white;
    border: none;
    border-radius: 2px;
    cursor: pointer;
    outline: none;
  }
}
.imgBox {
  position: relative;
  display: block;
  width: 50px;
  height: 60px;
  float: right;
  top: -15px;
  left: 10px;
  .menuImg {
    display: block;
    width: 50px;
    height: 50px;
  }
  p {
    text-align: center;
    font-size: 12px;
  }
}
.from {
  display: flex;
  position: relative;
  justify-content: center;
  .container {
    width: 17.5%;
    .w18 {
      width: 100%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
<!-- 品牌前端角色管理 -->
<template>
  <div id="Main">
    <!-- <h2 class="Title">品牌前端角色管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="from" :label-width="85">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select v-model="brandId" placeholder="品牌名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
          </div>
          <div class="btn-left w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="submit('search')">
                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div class="box" style="overflow: hidden;padding-bottom:15px;">
        <div class="contentTop">
          <button @click="creatNewRole" type="primary">新建角色</button>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
    </div>
    <Modal v-model="creatNewRoleIsShow" width="900">
      <h3 style="border:none;">角色详情</h3>
      <Form :label-width="85">
        <Row>
          <Col span="8">
            <Form-item label="品牌名称:" prop="brandId">
              <Select
                :disabled="(brandIsShow || changeShow)?true:false"
                v-model="formData.brandId"
                placeholder="请选择"
                @on-change="changeValue"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="角色名称:" prop="roleName">
              <Input
                :readonly="brandIsShow?true:false"
                v-model.trim="formData.roleName"
                placeholder="请输入角色名称"
              ></Input>
            </Form-item>
          </Col>
          <Col span="8">
            <Form-item label="备注:" prop="description">
              <Input
                :readonly="brandIsShow?true:false"
                v-model.trim="formData.description"
                placeholder="请输入备注"
              ></Input>
            </Form-item>
          </Col>
        </Row>
        <h3>选择显示菜单</h3>
        <Checkbox-group v-model="formData.resourceIds" v-if="menuList">
          <Row>
            <Col
              span="6"
              style="margin-bottom:20px;"
              v-for="(item,index) in menuList"
              :key="item.id"
            >
              <Row type="flex" align="middle" style="height:50px;">
                <Col span="8" style="height:50px;">
                  <Checkbox
                    :label="item.id"
                    style="position:relative;top:20px;"
                    :disabled="brandIsShow?true:false"
                  >
                    <div class="imgBox">
                      <img :src="item.resIcon" class="menuImg">
                      <p>{{item.resName}}</p>
                    </div>
                  </Checkbox>
                </Col>
              </Row>
            </Col>
          </Row>
        </Checkbox-group>
      </Form>
      <div slot="footer">
        <div style="text-align:center" v-if="!brandIsShow">
          <i-button type="success" @click="cancel">取消</i-button>
          <i-button type="primary" @click="sureCreatNewRole">确定</i-button>
        </div>
        <div style="text-align:center" v-if="brandIsShow">
          <i-button type="success" @click="cancel">返回</i-button>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import { removeRoleResource, getRoleResource } from "@/api/common.js";
import { workerUpdateStatus } from "@/api/salesman-info/salesman-info";
import { getBrandsList } from "@/util/index.js";
export default {
  name: "brand-role-manage-keepAlive",

  data() {
    return {
      menuList: [],
      creatNewRoleIsShow: false,
      brandIsShow: false,
      changeShow: false,
      brandId: "",
      formData: {
        brandId: "",
        roleName: "", //角色名称
        description: "", //备注
        resourceIds: [] //菜单列表
      },
      columns1: [
        {
          title: "序号",
          type: "index",

          align: "center"
        },
        {
          title: "品牌",
          key: "brandName",
          align: "center"
        },
        {
          title: "角色名",
          key: "roleName",
          align: "center"
        },
        {
          title: "角色码",
          key: "id",
          align: "center"
        },
        {
          title: "备注",
          key: "description",
          align: "center"
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
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.lookDetail(params);
                    }
                  }
                },
                "查看详情"
              )
            ];
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.changeMenuValue(params);
                    }
                  }
                },
                "修改"
              )
            );

            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该角色？",
                        onOk: () => {
                          this.userBlack(params.row.id);
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
      pageSize: 10,
      brandList: [],
      creatBrandList: [],
      roleId: ""
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.brandId = this.brandList[0].id;
        this.init();
      }
    });
  },
  watch: {
    creatNewRoleIsShow(curVal, oldVal) {
      if (!curVal) {
        this.formData.roleName = "";
        this.formData.description = "";
        this.formData.resourceIds = [];
        setTimeout(() => {
          this.changeShow = false;
          this.brandIsShow = false;
        }, 300);
      }
    }
  },
  methods: {
    changePage(size) {
      this.page = size;
      this.init();
    },
    userBlack(id) {
      removeRoleResource(id).then(res => {
        if (res && res.status == 1) {
          this.$Message.success("删除成功");
          this.init();
        }
      });
    },
    changeMenuValue(val) {
      this.changeShow = true;
      this.roleId = val.row.id;
      this.brandIsShow = false;
      this.creatNewRoleIsShow = true;
      this.formData.brandId = val.row.brandId;

      this.Global.doPost(
        "resource/queryBrandResourceList.json",
        { brandId: val.row.brandId },
        res => {
          if (res && res.length) {
            this.menuList = [];
            this.menuList = res;
            getRoleResource(val.row.id).then(res => {
              if (res && res.status == 1) {
                this.formData.resourceIds = [];
                for (let i = 0; i < res.data.resourceList.length; i++) {
                  this.formData.resourceIds.push(res.data.resourceList[i].id);
                }
                this.formData.resourceIds = this.unique(
                  this.formData.resourceIds
                );
              }
            });
          }
        }
      );
      this.formData.description = val.row.description;
      this.formData.roleName = val.row.roleName;
    },
    lookDetail(val) {
      this.formData.brandId = val.row.brandId;
      this.brandIsShow = true;
      this.creatNewRoleIsShow = true;
      this.Global.doPost(
        "resource/queryBrandResourceList.json",
        { brandId: val.row.brandId },
        res => {
          if (res && res.length) {
            this.menuList = [];
            this.menuList = res;

            getRoleResource(val.row.id).then(res => {
              this.formData.resourceIds = [];
              for (let i = 0; i < res.data.resourceList.length; i++) {
                this.formData.resourceIds.push(res.data.resourceList[i].id);
              }
            });
          }
        }
      );
      this.formData.description = val.row.description;
      this.formData.brandId = val.row.brandId;
      this.formData.roleName = val.row.roleName;
    },
    changeValue(val) {
      if (!val) {
        return;
      }
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      this.Global.doPost(
        "resource/queryBrandResourceList.json",
        { brandId: val },
        res => {
          this.menuList = [];
          this.menuList = res;
          if (this.changePage || this.brandIsShow) {
            return false;
          }
          this.formData.resourceIds = [];
          for (let i = 0; i < res.length; i++) {
            this.formData.resourceIds.push(res[i].id);
          }
        }
      );
    },
    sureCreatNewRole() {
      if (this.brandIsShow) {
        this.creatNewRoleIsShow = false;
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.formData.roleName) {
        this.$Message.error("请填写角色名称");
        return false;
      }
      if (!this.formData.resourceIds) {
        this.$Message.error("请选择菜单");
        return false;
      }
      if (this.formData.resourceIds.length > 9) {
        this.$Message.error("菜单数量不能超过9个");
        return false;
      }

      let data = this.Global.JsonChange(this.formData);
      if (!data["description"]) {
        delete data["description"];
      }
      this.formData.resourceIds = this.unique(this.formData.resourceIds);
      data["resourceIds"] = this.formData.resourceIds.join(",");
      if (this.changeShow) {
        var URL = "resource/updateRoleResource.json";
        data["roleId"] = this.roleId;
      } else {
        var URL = "resource/setRoleResource.json";
      }

      this.Global.doPost(URL, data, res => {
        if (res) {
          this.$Message.success("成功");
          this.creatNewRoleIsShow = false;
          this.init();
        }
      });
    },
    submit() {
      this.page = 1;
      this.init();
    },
    //数组去重
    unique(arr) {
      let newArr = [];
      let obj = {};
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = "abc";
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    init() {
      let data = {};
      if (!this.brandId) {
        data = {};
      } else {
        data = {
          brandId: this.brandId
        };
      }
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("resource/queryRoleList.json", data, res => {
        this.pageData = res;
      });
    },
    creatNewRole() {
      this.brandIsShow = false;
      this.creatNewRoleIsShow = true;
      this.formData.brandId = "";
      this.menuList = [];
    },
    cancel() {
      this.creatNewRoleIsShow = false;
    }
  }
};
</script>


