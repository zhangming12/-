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
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    color: #333;
    cursor: pointer;
  }
  .demo {
    float: right;
    color: @primary-color;
    line-height: 24px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">员工信息</h2> -->
        <div class="main-container">
          <div class="box">
              <Form ref="form" :model="formData" :label-width="88">
                  <Row >
                      <Col span='7'>
                          <Form-item label='品牌名称:' required prop='brandId'>
                            <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                                  <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                              </Select>
                          </Form-item>
                          <Form-item label='手机号码:' prop='phone'>
                              <Input v-model='formData.phone' placeholder="请输入手机号码"></Input>
                          </Form-item>
                      </Col>
                      <Col span='7'> 
                          <Form-item label='员工角色:' prop='roleId'>
                            <Select v-model="formData.roleId" placeholder="请选择" clearable>
                              <Option :value="item.id" v-for="(item,index) in roleDataList" :key="index">{{ item.roleName }}</Option>
                            </Select>
                          </Form-item>
                          
                      </Col>
                      <Col span='7'> 
                          <Form-item label='员工姓名:' prop='workerName'>
                              <Input v-model='formData.workerName' placeholder="请输入业代姓名"></Input>
                          </Form-item>
                      </Col>
                      <Col span='2' offset='1' style="margin-top:28px;"> 
                          <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
                      </Col>
                  </Row>
              </Form>           
          </div>
          <div class="box" style='overflow: hidden;padding:10px;'>
              <div class='contentTop'>
                  <i-button class="btn-export" icon="ios-download-outline" @click="exportExcel" type="primary">导出</i-button>
                  <i-button @click="uploadExcel" class="btn-export" icon="android-add" type="success">导入</i-button>
                  <div class='upDate'>
                    <Upload :action="url" 
                      :show-upload-list=false
                      :on-success='handleSuccess'
                      :on-error='handleError'
                      >
                      <Icon type="ios-folder" size='14' color='#53a3f4'></Icon>
                      {{ uploadText }}
                    </Upload>
                  </div>
                  <div class='demo' @click='dowland'> 
                    <Icon type="ios-paper-outline" size='14' color='#ff8a34'></Icon>
                    <span>下载模版</span>
                  </div>
              </div>
              <Table :columns="columns1" :data="pageData" disabled-hover></Table>
              
          </div>
          <div class="page-box">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
          </div>
        </div>
        <!-- 角色调整 -->
        <Modal
            v-model="roleChangeIsShow">
            <h2 style="text-align:center;">角色调整</h2>
            <i-Form>
              <CheckboxGroup v-model="roleList">
                <Checkbox :label="item.id" v-for="item in roleListData" :key="item.id" >{{ item.roleName }}</Checkbox>
              </CheckboxGroup>
            </i-Form>
            <div slot="footer">
              <i-button type="text" @click="cancel">取消</i-button>
              <i-button type="success" @click="roleChangeMethod">确定</i-button>
            </div>
        </Modal>
    </div>
</template>

<script>
import { workerUpdateStatus } from "@/api/salesman-info/salesman-info";
import config from "../../util/config.js";
export default {
  name: "employee-information-keepAlive",

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
      changeSaleRouteIsShow: false, //更改销售路线模态框
      saleRouteData: {
        oldSaleRoute: "",
        newSaleRoute: "",
        workerId: "",
        brandId: "",
        id: "",
        roleId: ""
      },
      roleDataList: [],
      brandId: "",
      roleId: "",
      userId: "",
      roleList: [],
      roleListData: [],
      uploadText: "上传参与业代名单",
      url: config.uploadWorkerExcel,
      uploadUrl: "",
      formData: {
        workerRole: "", //业代角色
        salesRoute: "", //销售路线
        brandId: "",
        workerName: "",
        roleId: "",
        phone: "",
        bindStatus: "",
        status: ""
      },
      formItem: {
        workerName: "",
        phone: ""
      },
      page: 1,
      pageSize: 10,
      pageNum: 0,
      columns1: [
        {
          title: "品牌名称",
          key: "brandName",
          align: "center"
        },
        {
          title: "员工姓名",
          key: "workerName",
          align: "center"
        },
        {
          title: "员工角色",
          key: "roleName",
          align: "center"
          // render: (h, params) => {
          //   return h("div", this.roleNameMethod(params.row.roleVOs));
          // }
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center"
        },
        // {
        //   title: "销售路线",
        //   key: "salesRoute",
        //   align: "center"
        // },
        {
          title: "操作",
          key: "action",
          align: "center",
          // width: "400",
          render: (h, params) => {
            var tag = [];
            var str = "";
            if (params.row.roleName) {
              str = "角色调整";
            } else {
              str = "设置角色";
            }
            tag.push(
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      this.roleChange(params);
                    }
                  }
                },
                str
              )
            );

            return h("div", tag);
          }
        }
      ],
      pageData: [],
      brandList: [],
      showUnlock: false,
      roleChangeIsShow: false,
      phone: "",
      workerId: "",
      workerName: ""
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
      }
      this.init();
    });
  },
  watch: {
    roleChangeIsShow(curVal, oldVal) {
      if (!curVal) {
        this.roleList = [];
      }
    }
  },
  methods: {
    changeValue(val) {
      // let data = { brandId: val };
      this.Global.doPost(
        "resource/queryRoleList.json",
        { brandId: val },
        res => {
          this.roleDataList = res;
          console.log(res);
        }
      );
    },
    //角色调整
    roleChangeMethod() {
      let data = {};
      // data["userId"] = this.userId;

      data["roleIds"] = this.roleList.join(",");
      data["phone"] = this.phone;
      data["workerId"] = this.workerId;
      data["workerName"] = this.workerName;
      this.Global.doPost("resource/updateBrandWorkerRole.json", data, res => {
        if (res) {
          this.$Message.success("修改成功");
          this.roleChangeIsShow = false;
          this.init();
        }
      });
    },
    roleNameMethod(val) {
      let arr = [];
      if (val) {
        for (let i = 0; i < val.length; i++) {
          arr.push(val[i].roleName);
        }
        return arr.join("/");
      }
      return " ";
    },
    roleChange(val) {
      let arr = [];
      this.roleChangeIsShow = true;
      this.brandId = val.row.brandId;
      this.userId = val.row.userId;
      this.roleId = val.row.roleId;
      arr = val.row.roleIds ? val.row.roleIds.split("/") : [];
      this.roleList = arr ? arr.map(item => parseInt(item, 10)) : [];
      this.phone = val.row.phone;
      this.workerId = val.row.workerId;
      this.workerName = val.row.workerName;
      if (!this.brandId) {
        this.$Message.error("没有品牌ID");
        return false;
      }
      this.Global.doPost(
        "resource/queryRoleList.json",
        {
          brandId: val.row.brandId
        },
        res => {
          this.roleListData = res;
        }
      );
    },
    cancel() {
      this.changeSaleRouteIsShow = false;
      this.roleChangeIsShow = false;
    },
    //更改销售路线
    sureChangeSaleRoute(e) {
      //更改销售路线
      if (!this.saleRouteData.newSaleRoute) {
        this.$Message.error("请输入新的销售路线");
        this.changeSaleRouteIsShow = true;
        // e.stopPropagation();
        return false;
      }
      let data = {
        salesRoute: this.saleRouteData.newSaleRoute,
        workerId: this.saleRouteData.workerId,
        brandId: this.saleRouteData.brandId
      };
      data = this.Global.JsonChange(data);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("worker/updateWorkerSalesRoute.json", data, () => {
        this.$Message.success("成功");
        this.changeSaleRouteIsShow = false;
        this.init();
        this.saleRouteData.newSaleRoute = "";
      });
    },
    changeSaleRoute(val) {
      this.changeSaleRouteIsShow = true;
      this.saleRouteData.oldSaleRoute = val.row.salesRoute;
      this.saleRouteData.workerId = val.row.userId;
      this.saleRouteData.brandId = val.row.brandId;
    },
    geSaleRoute(val) {
      this.changeSaleRouteIsShow = true;
      this.saleRouteData.oldSaleRoute = val.row.salesRoute;
      this.saleRouteData.workerId = val.row.userId;
      this.saleRouteData.brandId = val.row.brandId;
    },
    // brandWorkerImport.json   导入的
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      this.Global.doPost(
        "resource/brandWorkerImport.json",
        {
          loadFilePath: this.uploadUrl,
          brandId: this.formData.brandId
        },
        () => {
          this.init();
          this.uploadText = "上传参与业代名单";
          this.$Message.success("导入成功");
        }
      );
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/brandRole.xlsx"
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
        // this.uploadExcel()
      }
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.info("请选择品牌");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    userBlack(brandId, workerId) {
      this.Global.doPost(
        "worker/updateStatus.json",
        {
          brandId: brandId,
          workerId: workerId,
          status: 2
        },
        () => {
          this.init();
          this.$Message.success("成功");
        }
      );
    },
    userBind(formItem) {
      this.Global.doPost(
        "worker/unBindWorker.json",
        {
          brandId: this.formItem.brandId,
          workerId: this.formItem.workerId,
          bindStatus: 0
        },
        () => {
          this.$Message.success("解绑成功");
          this.init();
        }
      );
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("resource/queryBrandRoleInfo.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    },
    // queryBrandRoleInfoExport.json   导出的
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "resource/queryBrandRoleInfoExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>