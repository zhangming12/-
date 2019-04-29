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
  .w35 {
    width: 35%;
    .status {
      display: flex;
      flex-direction: row;
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
.tableBox {
  padding: 10px;
}
.download {
  margin-top: 10px;
  cursor: pointer;
}
.uploadBox {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 10px;
  .download {
    margin-top: -4px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">员工管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required prop="brandId">
                <Select v-model="formData.brandId" placeholder="品牌名称">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="workerName">
                <Input v-model="formData.workerName" placeholder="员工姓名"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="phone">
                <Input v-model="formData.phone" placeholder="手机号码"></Input>
              </Form-item>
            </div>

            <div class="btn-left w18">
              <Form-item>
                <Input v-model="formData.salesRoute" placeholder="员工编号"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input v-model="formData.deptName" placeholder="所属工作流"></Input>
              </Form-item>
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <Icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
                    <Icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                  </button>
                </div>
                <div class="btn-right search-right" @click="submit('search')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="container" v-if="showQuery">
              <div class="btn-left w18">
                <Form-item required prop="userType">
                  <Select v-model="formData.userType" placeholder="员工类型">
                    <Option
                      :value="item.id"
                      v-for="(item ,index) in userTypeList"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w35">
                <Form-item required>
                  <div class="status">
                    <span>账号状态：</span>
                    <Radio-group v-model="formData.status">
                      <Radio label>全部</Radio>
                      <Radio label="0">锁定</Radio>
                      <Radio label="1">解锁</Radio>
                    </Radio-group>
                  </div>
                </Form-item>
              </div>
              <div class="btn-left w35">
                <Form-item required>
                  <div class="status">
                    <span>状态：</span>
                    <Radio-group v-model="formData.bindStatus">
                      <Radio label>全部</Radio>
                      <Radio label="1">已绑定</Radio>
                      <Radio label="0">未绑定</Radio>
                    </Radio-group>
                  </div>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="box tableBox">
        <div class="contentTop">
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
          <importBtn class="btn-right" @btnClick="imortModel"/>
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div>
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <!-- 解绑 -->
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
    <!-- 更改销售路线 -->
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
    <!-- 修改 -->
    <Modal v-model="changeMessage">
      <h2 style="text-align:center;">修改信息</h2>
      <i-Form ref="checkMes" :label-width="88" :rules="ruleInline">
        <Form-item label="品牌名称:">{{changeMessageData.brandName}}</Form-item>
        <Form-item label="员工ID:">{{changeMessageData.workerId}}</Form-item>

        <Form-item label="员工类型:" required prop="userType">
          <Select v-model="changeMessageData.userType" placeholder="员工类型">
            <Option
              :value="item.id"
              v-for="(item ,index) in userTypeList"
              :key="index"
            >{{ item.name }}</Option>
          </Select>
        </Form-item>
        <Form-item label="员工姓名:" required prop="workerName">
          <Input v-model="changeMessageData.workerName"></Input>
        </Form-item>
        <Form-item label="员工编号:" prop="salesRoute">
          <Input v-model="changeMessageData.salesRoute"></Input>
        </Form-item>
        <Form-item label="手机号码:" required prop="phone">
          <Input v-model="changeMessageData.phone"></Input>
        </Form-item>
        <Form-item label="邮箱:" prop="email">
          <Input v-model="changeMessageData.email"></Input>
        </Form-item>
        <Form-item label="所属工作流:" prop="deptName">
          <Input v-model="changeMessageData.deptName"></Input>
          <!-- {{ changeMessageData.deptName }} -->
        </Form-item>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="sureChangeMessageList('checkMes')">确定</i-button>
      </div>
    </Modal>
    <!-- 上传 -->
    <Modal v-model="importShow">
      <h2 style="text-align:center;">上传员工名单</h2>
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
            <Option
              :value="item.id"
              v-for="(item ,index) in userTypeList"
              :key="index"
            >{{ item.name }}</Option>
          </Select>
        </Form-item>
        <div class="uploadBox">
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
          <div class="download" @click="dowland">
            <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
            <span>下载其他员工模版</span>
          </div>
        </div>
        <div class="uploadBox">
          <div
            class="upDate"
            style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;"
          >
            <Upload
              :action="url"
              :show-upload-list="false"
              :on-success="handleSuccessInternal"
              :on-error="handleError"
            >
              <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
              {{ uploadTextInternal }}
            </Upload>
          </div>
          <div class="download" @click="dowlandInternal">
            <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
            <span>下载内部员工模版</span>
          </div>
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
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
export default {
  name: "organization-personnel-management-keepAlive",
  components: {
    exportBtn,
    hhTable,
    importBtn
  },
  data() {
    return {
      userTypeList: [
        {
          id: "A",
          name: "审核员"
        },
        {
          id: "W",
          name: "品牌业务员"
        },
        {
          id: "PI",
          name: "巡检员"
        },
        {
          id: "C",
          name: "C端客户"
        },
        {
          id: "DM",
          name: "主任"
        },
        {
          id: "LM",
          name: "配送员"
        },
        {
          id: "M",
          name: "经销商"
        },
        {
          id: "HX",
          name: "核销员"
        },
        {
          id: "FS",
          name: "工厂员工"
        },
        {
          id: "ES",
          name: "内部员工"
        },
        {
          id: "CL",
          name: "公司领导"
        }
      ],
      noneStatus: false,
      showQuery: false,
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
      uploadText: "上传其他员工名单",
      uploadTextInternal: "上传内部员工名单",
      url: config.uploadWorkerExcel,
      uploadUrl: "",
      uploadUrlInternal: "",
      formData: {
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
          title: "序号",
          type: "index",
          align: "center",
          width: 50
        },
        {
          title: "品牌名称",
          key: "brandName",
          tooltip: true,
          align: "center"
        },
        {
          title: "员工类型",
          key: "userType",
          tooltip: true,
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.ENUMS.userType[params.row.userType]);
          }
        },
        {
          title: "员工编号",
          key: "salesRoute",
          tooltip: true,
          align: "center"
        },
        {
          title: "系统员工ID",
          key: "workerId",
          align: "center",
          tooltip: true
        },
        {
          title: "业代姓名",
          key: "workerName",
          align: "center",
          tooltip: true
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          tooltip: true
        },
        {
          title: "邮箱",
          key: "email",
          align: "center",
          tooltip: true
        },
        {
          title: "所属工作流",
          key: "deptName",
          align: "center",
          tooltip: true
        },
        {
          title: "锁定状态",
          key: "status",
          align: "center",
          tooltip: true,
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
          title: "绑定状态",
          key: "bindStatus",
          align: "center",
          tooltip: true,
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
          width: 190,
          render: (h, params) => {
            var tag = [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "text",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         this.$Modal.confirm({
              //           title: "警告",
              //           content: "确定删除该业务员？",
              //           onOk: () => {
              //             this.userBlack(
              //               params.row.brandId,
              //               params.row.workerId
              //             );
              //           }
              //         });
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ];
            if (params.row.bindStatus == 1) {
              tag.push(
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
                      type: "text",
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
                      type: "text",
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
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      // this.Global.doPost("updateQueryIsBindingSalesRoute.json",{
                      //   brandId
                      // })
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
        // this.init();
      }
    });
  },
  watch: {
    changeMessage(curVal) {
      if (!curVal) {
        this.changeMessageData = {};
      }
    },
    importShow(val) {
      if (!val) {
        this.uploadUrl = "";
        this.uploadUrlInternal = "";
        this.uploadText = "上传其他员工名单";
        this.uploadTextInternal = "上传内部员工名单";
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
        // !this.changeMessageData.email
      ) {
        this.$Message.error("员工姓名、员工类型、员工电话");
        return false;
      }
      if (!this.Global.checkPhone(this.changeMessageData.phone)) {
        this.$Message.error("手机号码格式不对");
        return false;
      }
      if (this.changeMessageData.email) {
        if (
          !/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(this.changeMessageData.email)
        ) {
          this.$Message.error("邮箱格式不对");
          return false;
        }
      }

      let data = this.Global.JsonChange(this.changeMessageData);
      if (!this.changeMessageData.salesRoute) {
        data["salesRoute"] = "无";
      }
      delete data["brandName"];
      // this.Global.doPost("worker/updateWorkerInfo.json", data, res => {
      //   this.changeMessage = false;
      //   this.$Message.success("修改成功");
      //   this.init();
      // });
      // return
      this.Global.doPost(
        "worker/updateQueryIsBindingSalesRoute.json",
        {
          brandId: this.changeMessageData.brandId,
          salesRoute: this.changeMessageData.salesRoute,
          workerId: this.changeMessageData.workerId
        },
        res => {
          if (res && res.length) {
            this.$Modal.confirm({
              title: "警告",
              content: `该销售路线已与${res[0].phone}(${
                res[0].workerName
              })绑定，确定更换？`,
              onOk: () => {
                this.Global.doPost(
                  "worker/updateWorkerInfo.json",
                  data,
                  res => {
                    this.changeMessage = false;
                    this.$Message.success("修改成功");
                    this.init();
                  }
                );
              }
            });
          } else {
            this.Global.doPost("worker/updateWorkerInfo.json", data, res => {
              this.changeMessage = false;
              this.$Message.success("修改成功");
              this.init();
            });
          }
        }
      );
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
        userType: val.userType,
        deptName: val.deptName,
        email: val.email
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
      if (!this.uploadUrl && !this.uploadUrlInternal) {
        this.$Message.error("请上传文件");
        return false;
      }
      if (this.uploadUrl) {
        if (!this.importModelData.userType) {
          this.$Message.error("请选择角色类型");
          return false;
        }

        let data = {
          loadFilePath: this.uploadUrl,
          brandId: this.importModelData.brandId,
          userType: this.importModelData.userType
        };
        this.Global.doPost("worker/brandWorkerImport.json", data, res => {
          this.init();
          this.$Message.success("导入成功");
          this.importShow = false;
          this.uploadText = "上传其他员工名单";
        });
      }
      if (this.uploadUrlInternal) {
        let data = {
          loadFilePath: this.uploadUrlInternal,
          brandId: this.importModelData.brandId
          // userType: this.importModelData.userType
        };
        this.Global.doPost("brandStaff/brandStaffImport.json", data, res => {
          this.init();
          this.$Message.success("导入成功");
          this.importShow = false;
          this.uploadTextInternal = "上传内部员工名单";
        });
      }
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/brandWorkerInfo.xlsx"
      );
    },
    dowlandInternal() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/brandStaff.xlsx"
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      let url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    handleSuccessInternal(response, file, fileList) {
      this.uploadTextInternal = file.name;
      let url = response.data;
      if (url) {
        this.uploadUrlInternal = url;
      }
    },

    submit(name) {
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
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("worker/queryWorkerActivityReport.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        this.noneStatus = true;
      });
    },
    exportExcel() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      let url = this.Global.getExportUrl(
        "worker/queryWorkerActivityReportExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>