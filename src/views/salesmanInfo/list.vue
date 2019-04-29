<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
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
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rules">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId">
              <Select v-model="formData.brandId" placeholder="请选择">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="销售路线:" prop="salesRoute">
              <Input v-model="formData.salesRoute" placeholder="请输入销售路线"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="业代姓名:" prop="workerName">
              <Input v-model="formData.workerName" placeholder="请输入业代姓名"></Input>
            </Form-item>
            <Form-item label="账号状态:">
              <Radio-group v-model="formData.status">
                <Radio label>全部</Radio>
                <Radio label="0">锁定</Radio>
                <Radio label="1">解锁</Radio>
              </Radio-group>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="手机号码:" prop="phone">
              <Input v-model="formData.phone" placeholder="请输入手机号码"></Input>
            </Form-item>
            <Form-item label="状态:" prop="bindStatus">
              <Radio-group v-model="formData.bindStatus">
                <Radio label>全部</Radio>
                <Radio label="1">已绑定</Radio>
                <Radio label="0">未绑定</Radio>
              </Radio-group>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:28px;">
            <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;">
      <div class="contentTop">
        <Button
          class="btn-export"
          icon="ios-download-outline"
          @click="exportExcel"
          type="primary"
        >导出</Button>
        <Button @click="imortModel" class="btn-export" icon="android-add" type="info">导入</Button>
        <div class="demo" @click="dowland">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <Modal
      title="确定解绑该业务员？"
      v-model="showUnlock"
      @on-ok="userBind"
      class-name="vertical-center-modal"
    >
      <Form :model="formItem" :label-width="90">
        <FormItem label="姓名">
          <Input v-model="formItem.workerName"></Input>
        </FormItem>
        <FormItem label="手机号">
          <Input v-model="formItem.phone"></Input>
        </FormItem>
      </Form>
    </Modal>
    <Modal v-model="changeSaleRouteIsShow">
      <h2 v-if="saleRouteData.oldSaleRoute" style="text-align:center;">更改销售路线</h2>
      <h2 v-else style="text-align:center;">设置销售路线</h2>
      <i-Form>
        <Form-item label="原销售路线" v-if="saleRouteData.oldSaleRoute">
          <Input :readonly="saleRouteData.oldSaleRoute" v-model="saleRouteData.oldSaleRoute"></Input>
        </Form-item>
        <Form-item label="新销售路线">
          <Input v-model="saleRouteData.newSaleRoute"></Input>
        </Form-item>
      </i-Form>
      <div slot="footer">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="sureChangeSaleRoute($event)">确定</i-button>
      </div>
    </Modal>
    <Modal v-model="changeMessage">
      <h2 style="text-align:center;">修改信息</h2>
      <i-Form ref="checkMes" :label-width="75" :rules="ruleInline">
        <Form-item label="品牌名称:">{{changeMessageData.brandName}}</Form-item>
        <Form-item label="员工ID:">{{changeMessageData.workerId}}</Form-item>
        <Form-item label="员工姓名:" prop="workerName">
          <Input v-model="changeMessageData.workerName"></Input>
        </Form-item>
        <Form-item label="员工编号:" prop="salesRoute">
          <Input v-model="changeMessageData.salesRoute"></Input>
        </Form-item>
        <Form-item label="员工类型:" prop="userType">
          <Select v-model="changeMessageData.userType" placeholder="请选择">
            <!-- <Option value="P">平台</Option> -->
            <Option value="PI">巡检员</Option>
            <Option value="W">品牌业务员</Option>
            <Option value="C">C端客户</Option>
            <Option value="DM">主任</Option>
            <Option value="LM">配送员</Option>
            <Option value="CL">公司领导</Option>
            <Option value="ES">内部员工</Option>
            <Option value="FS">工厂员工</Option>
            <Option value="HX">核销员</Option>
            <Option value="M">经销商</Option>
            <Option value="Z">公仔</Option>
          </Select>
        </Form-item>
        <Form-item label="手机号码:" prop="phone">
          <Input v-model="changeMessageData.phone"></Input>
        </Form-item>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="sureChangeMessageList('checkMes')">确定</i-button>
      </div>
    </Modal>
    <Modal v-model="importShow">
      <h2 style="text-align:center;">上传参与业代名单</h2>
      <i-Form>
        <Form-item label="品牌名称:" prop="brandId" :label-width="72">
          <Select v-model="importModelData.brandId" placeholder="请选择">
            <Option
              :value="item.id"
              v-for="(item,index) in importModelData.brandList"
              :key="index"
            >{{ item.brandName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="员工类型:" prop="userType" :label-width="72">
          <Select v-model="importModelData.userType" placeholder="请选择">
            <!-- <Option value="P">平台</Option> -->
            <Option value="PI">巡检员</Option>
            <Option value="W">品牌业务员</Option>
            <Option value="C">C端客户</Option>
            <Option value="DM">主任</Option>
            <Option value="LM">配送员</Option>
            <Option value="CL">公司领导</Option>
            <Option value="ES">内部员工</Option>
            <Option value="FS">工厂员工</Option>
            <Option value="HX">核销员</Option>
            <Option value="M">经销商</Option>
            <Option value="Z">公仔</Option>
          </Select>
        </Form-item>
        <div
          class="upDate"
          style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;"
        >
          <Upload
            :action="url"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :on-error="handleError"
          >
            <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
            {{ uploadText }}
          </Upload>
        </div>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="uploadExcel">确定</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { workerUpdateStatus } from "@/api/salesman-info/salesman-info";
import config from "@/util/config.js";
export default {
  name: "list-keepAlive",

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
      ruleInline: {},
      importShow: false,
      importModelData: {
        brandList: [],
        brandId: "",
        userType: ""
      },
      changeMessageData: {
        phone: "",
        workerName: "",
        salesRoute: ""
      },
      changeMessage: false, //修改信息模态框
      changeSaleRouteIsShow: false, //更改销售路线模态框
      saleRouteData: {
        oldSaleRoute: "",
        newSaleRoute: "",
        workerId: "",
        brandId: ""
      },
      uploadText: "上传参与业代名单",
      url: config.uploadWorkerExcel,
      uploadUrl: "",
      formData: {
        // workerRole: "", //业代角色
        salesRoute: "", //销售路线
        brandId: "",
        workerName: "",
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
      rules: {},
      columns1: [
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          minWidth: 50
        },
        {
          title: "员工类型",
          key: "userType",
          align: "center",
          minWidth: 50,
          // width:'120',
          render: (h, params) => {
            return h("div", this.Global.ENUMS.userType[params.row.userType]);
          }
        },
        {
          title: "员工编号",
          key: "salesRoute",
          align: "center",
          minWidth: 50
          // width:'120'
        },
        {
          title: "系统员工ID",
          key: "workerId",
          align: "center",
          minWidth: 70
          // width:'120'
        },
        {
          title: "业代姓名",
          key: "workerName",
          align: "center",
          minWidth: 50
          // width:'120'
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          minWidth: 50
          // width:'120'
        },
        {
          title: "锁定状态",
          key: "status",
          align: "center",
          minWidth: 50,
          // width:'120',
          render: (h, params) => {
            let str = "";
            switch (params.row.status) {
              case 0:
                str = "锁定";
                break;
              case 1:
                str = "解锁";
                break;
              case 2:
                str = "软删除";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        },
        {
          title: "状态",
          key: "bindStatus",
          align: "center",
          // width:'120',
          minWidth: 50,
          render: (h, params) => {
            return h(
              "div",
              this.Global.ENUMS.workerType[params.row.bindStatus]
            );
          }
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
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定删除该业务员？",
                        onOk: () => {
                          this.userBlack(
                            params.row.brandId,
                            params.row.workerId
                          );
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ];
            if (params.row.bindStatus == 1) {
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
                        let {
                          brandId,
                          workerId,
                          workerName,
                          phone
                        } = params.row;
                        this.showUnlock = true;
                        this.formItem = {
                          workerName,
                          phone,
                          brandId,
                          workerId
                        };
                      }
                    }
                  },
                  "解绑"
                )
              );
            }

            if (params.row.status == 1) {
              tag.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "确定锁定该业务员？",
                          onOk: () => {
                            let sendData = {
                              workerId: params.row.workerId,
                              status: 0,
                              brandId: params.row.brandId
                            };
                            workerUpdateStatus(sendData).then(res => {
                              if (res && res.status == 1) {
                                this.init();
                              }
                            });
                          }
                        });
                      }
                    }
                  },
                  "锁定"
                )
              );
            } else if (params.row.status == 0) {
              tag.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      size: "small"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "确定解锁该业务员？",
                          onOk: () => {
                            let sendData = {
                              workerId: params.row.workerId,
                              status: 1,
                              brandId: params.row.brandId
                            };
                            workerUpdateStatus(sendData).then(res => {
                              if (res && res.status == 1) {
                                this.init();
                              }
                            });
                          }
                        });
                      }
                    }
                  },
                  "解锁"
                )
              );
            }

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
                      this.changeMessageMethod(params.row);
                    }
                  }
                },
                "修改"
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
      this.importModelData.brandList = this.brandList;
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.importModelData.brandId = this.brandList[0].id;
        this.init();
      }
    });
  },
  watch: {
    changeMessage(curVal) {
      if (!curVal) {
        this.changeMessageData = {};
      }
    }
  },
  methods: {
    imortModel() {
      this.importShow = true;
    },
    sureChangeMessageList(name) {
      if (
        !this.changeMessageData.workerName ||
        !this.changeMessageData.userType ||
        !this.changeMessageData.phone
      ) {
        this.$Message.error("员工姓名、员工类型、员工电话不能为空");
        return false;
      }
      if (!this.Global.checkPhone(this.changeMessageData.phone)) {
        this.$Message.error("手机号码格式不对");
        return false;
      }

      let data = this.Global.JsonChange(this.changeMessageData);
      if (!this.changeMessageData.salesRoute) {
        data["salesRoute"] = "无";
      }
      delete data["brandName"];
      this.Global.doPost("worker/updateWorkerInfo.json", data, res => {
        this.changeMessage = false;
        this.$Message.success("修改成功");
        this.init();
      });
    },
    changeMessageMethod(val) {
      this.changeMessageData = {};
      this.changeMessageData = {
        brandId: val.brandId,
        brandName: val.brandName,
        workerId: val.workerId,
        phone: val.phone,
        workerName: val.workerName,
        salesRoute: val.salesRoute,
        userType: val.userType
      };
      this.changeMessage = true;
    },
    cancel() {
      this.changeSaleRouteIsShow = false;
      this.changeMessage = false;
      this.importShow = false;
      this.importModelData.userType = "";
      this.changeMessageData = {
        phone: "",
        workerName: "",
        salesRoute: ""
      };
    },
    uploadExcel() {
      if (!this.importModelData.userType) {
        this.$Message.error("请选择角色类型");
        return false;
      }
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }

      let data = {
        loadFilePath: this.uploadUrl,
        brandId: this.importModelData.brandId,
        userType: this.importModelData.userType
      };
      this.Global.doPost("worker/brandWorkerImport.json", data, () => {
        this.init();
        this.$Message.success("导入成功");
        this.importShow = false;
        this.uploadText = "上传参与业代名单";
      });
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/brandWorkerInfo.xlsx"
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
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("worker/queryWorkerActivityReport.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "worker/queryWorkerActivityReportExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>