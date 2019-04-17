// 经销商管理
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto 15px;
  padding-bottom: 0;
  background: #fff;
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}
.form {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    width: 52.5%;

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
    margin-top: 4px;
    color: #333;
  }
  .demo {
    float: right;
    color: @primary-color;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    margin-right: 20px;
    span {
      text-decoration: underline;
    }
  }
}

.searchBox {
  overflow: hidden;
  .search_btn {
    float: left;
    width: 50px;
    padding: 5px 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search_icon {
    float: left;
    padding: 5px 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
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
.demo {
  color: @primary-color;
  margin-left: 20px;
  cursor: pointer;
}
.sitem {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">经销商管理</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" class="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item prop="brandId" required>
                                <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue">
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item prop="id">
                               <Select v-model="formData.id" placeholder="经销商" clearable>
                                    <Option :value="item.id" v-for="(item,index) in distributorList" :key="index">{{ item.merchantName }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item >
                                <Input v-model.trim="formData.phone" placeholder="登录账号"></Input>
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
            <div class="box" style="padding:10px">
                <div class="contentTop">
                    <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span>
                    
                    <!-- <detailBtn class="btn-right ml20" @btnClick="showDetail" /> -->
                    <addNewBtn  class="btn-right" @btnClick="addNewMerchant" />
                    <!-- <importBtn  class="btn-right" @btnClick="exportExport = true" /> -->
                </div>
                <hhTable :columns="columns" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
                
            </div>
            <div class="page-box">
                <div>
                    <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
        <!-- 新建/修改经销商第一步 -->

      <myModal class="myModal"
            @close="closeModal"
            :modal="oneStepShow">
            <div slot="main" class="modal-main">
              <h3>{{ type == 'add' ? '新建经销商' : "修改经销商"}}</h3>
              <div class="modal-table">
                  <Form ref="form" :model="oneStepData" :label-width="88">
                      <Form-item label="关联品牌:" required>
                        <Select v-model="oneStepData.brandIds" placeholder="品牌名称" multiple :disabled="type == 'modify'">
                            <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                        </Select>
                      </Form-item>
                      <Form-item label="经销商名称:" required>
                        <Input v-model.trim="oneStepData.merchantName" placeholder="请输入经销商名称"></Input>
                      </Form-item>
                      <Form-item label="启用经销商巡拍功能:" :label-width="140" required>
                         <Switch v-model="oneStepData.patrolling" size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </Switch>
                      </Form-item>
                      <Form-item label="备注信息:" :label-width="80">
                        <Input type="textarea" :rows="4" v-model.trim="oneStepData.summary" placeholder="请输入备注信息"></Input>
                      </Form-item>
                      <div class="fotter" style="text-align:center;">
                          <Button @click="closeModal" type="text">取消</Button>
                          <!-- <Button v-if="oneStepData.patrolling" type="text" @click="uploadExcel">下一步</Button> -->
                          <Button type="text" @click="saveOneStep">{{ oneStepData.patrolling && !oneStepData.phone ? '下一步' : '保存'}}</Button>
                      </div>
                  </Form>
              </div>
            </div>
      </myModal>
        <!-- 新建/修改经销商第二步 -->
      <myModal class="myModal"
            @close="twoStepShow = false"
            :modal="twoStepShow">
            <div slot="main" class="modal-main">
              <h3>{{ type == 'add' ? '新建经销商' : "修改经销商"}}</h3>
              <div class="modal-table">
                  <Form ref="form" style="padding-left:10px;" label-position="left" :model="twoStepData" :label-width="140">
                      
                      <Form-item label="关联品牌:" v-if="type == 'add'" required>
                        <!-- <Input v-model.trim="twoStepData.brandNames" readonly></Input> -->
                        {{ getBrandNames(twoStepData.brandList) }}
                      </Form-item>
                      <Form-item label="登录账号手机号:" required>
                        <Input v-model.trim="twoStepData.phone" placeholder="请输入登陆账户/手机号"></Input>
                      </Form-item>
                      <Form-item label="账号状态:" required>
                        {{type == 'add' ? '正常' : twoStepData.patrolling == 1 ? '正常' : "解除关系"}}
                      </Form-item>
                      <Form-item v-if="type == 'add'  || twoStepData.type == 'add'" :label="item.brandName + '-陈列分润比例:'" :label-width="200" required v-for="(item ,index) in twoStepData.brandList" :key="index">
                        <div class="sitem" style="display:flex;" >
                          <InputNumber :min="0" placeholder="经销商占比" v-model.trim="item.merchantProportion"></InputNumber>
                          <span style="margin:0 8px;">:</span>
                          <InputNumber :min="0" placeholder="配送公仔占比" v-model.trim="item.workerProportion"></InputNumber>
                        </div>
                      </Form-item>
                      <Form-item v-if="type == 'modify' && twoStepData.type != 'add'" label="陈列分润比例:" :label-width="100" required>
                        <div class="sitem" style="display:flex;" >
                          <InputNumber :min="0" placeholder="经销商占比" v-model.trim="twoStepData.merchantProportion"></InputNumber>
                          <span style="margin:0 8px;">:</span>
                          <InputNumber :min="0" placeholder="配送公仔占比" v-model.trim="twoStepData.workerProportion"></InputNumber>
                        </div>
                      </Form-item>
                      <Form-item :label-width="20">
                        <div>
                          若经销商或批发商老板与配送员的分成比例是6:4则填写6:4;若经销商或批发商均无奖励则
                        填写0:0,不填写数值默认是0:0
                        </div>
                        
                      </Form-item>
                      <div class="fotter" style="text-align:center;">
                          <Button @click="twoStepShow = false" type="text">取消</Button>
                          <Button type="text" @click="twoStepSave">保存</Button>
                      </div>
                  </Form>
              </div>
            </div>
      </myModal>
	</div>
</template>

<script>
import config from "@/util/config.js";
import myModal from "@/components/Modal/my-modal.vue";
import wpictureUpload from "@/components/word-picture-upload.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "dealer-management-patrols-keepAlive",

  components: {
    wpictureUpload,
    dataRange,
    exportBtn,
    detailBtn,
    hhTable,
    importBtn,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      oneStepShow: false,
      oneStepData: {
        brandIds: [],
        patrolling: false
      },
      twoStepShow: false,
      twoStepData: {
        brandList: [
          {
            merchantProportion: 0,
            workerProportion: 0,
            brandId: "",
            brandName: ""
          }
        ]
      },
      exportExport: false,
      noneStatus: false,
      formData: {
        brandId: ""
      },
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          tooltip: true
        },
        {
          title: "经销商ID",
          key: "id",
          align: "center",
          tooltip: true
        },
        {
          title: "经销商名称",
          key: "merchantName",
          align: "center",
          tooltip: true
        },
        {
          title: "联系人姓名",
          key: "userName",
          align: "center",
          tooltip: true
        },
        {
          title: "登录账号/手机号",
          key: "phone",
          align: "center",
          tooltip: true
        },
        {
          title: "备注信息",
          key: "summary",
          align: "center",
          tooltip: true
        },
        {
          title: "巡拍状态",
          key: "patrolling",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            if (params.row.patrolling == 0) {
              str = "未启用";
            } else if (params.row.patrolling == 1) {
              str = "启用";
            }
            return h("div", str);
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            if (params.row.status == 1) {
              str = "正常";
            } else if (params.row.status == 0) {
              str = "停用";
            }
            return h("div", str);
          }
        },
        {
          title: "操作",
          width: 300,
          align: "center",
          render: (h, params) => {
            var tag = [
              h(
                "Button",
                {
                  style: {
                    padding: "3px 7px"
                  },
                  attrs: {
                    type: "text"
                  },
                  on: {
                    click: () => {
                      let str =
                        params.row.status == 1 ? "解除关系" : "恢复正常";
                      this.$Modal.confirm({
                        title: "警告",
                        content: `确定对该经销商${str}?`,
                        onOk: () => {
                          this.Global.doPost(
                            "dealers/unlockMerchantBrand.json",
                            {
                              id: params.row.id,
                              brandId: params.row.brandId
                            },
                            res => {
                              this.$Message.success("成功");
                              this.init();
                            }
                          );
                        }
                      });
                    }
                  }
                },
                params.row.status == 1 ? "解除关系" : "恢复正常"
              ),
              h(
                "Button",
                {
                  style: {
                    padding: "3px 7px"
                  },
                  attrs: {
                    // id: "primary",
                    type: "text"
                  },

                  on: {
                    click: () => {
                      this.oneStepData = {
                        brandIds: [params.row.brandId],
                        merchantName: params.row.merchantName,
                        brandName: params.row.brandName,
                        brandId: params.row.brandId,
                        summary: params.row.summary,
                        patrolling: params.row.patrolling == 1 ? true : false,
                        id: params.row.id,
                        phone: params.row.phone
                      };
                      this.type = "modify";
                      this.oneStepShow = true;
                    }
                  }
                },
                "修改"
              )
            ];

            if (params.row.patrolling == 1 && params.row.phone) {
              tag.push(
                h(
                  "Button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    attrs: {
                      type: "text"
                    },
                    on: {
                      click: () => {
                        this.type = "modify";
                        this.twoStepData = {
                          merchantName: params.row.merchantName,
                          brandId: params.row.brandId,
                          brandName: params.row.brandName,
                          brandList: [
                            {
                              brandId: params.row.brandId,
                              brandName: params.row.brandName
                            }
                          ],
                          phone: params.row.phone,
                          id: params.row.id,
                          userId: params.row.userId,
                          patrolling: params.row.patrolling
                        };
                        this.Global.doPost(
                          "dealers/getPatrolAccounted.json",
                          {
                            userId: params.row.userId,
                            brandId: params.row.brandId,
                            id: params.row.id
                          },
                          res => {
                            let val = JSON.parse(res.merchantProportion);
                            this.twoStepData.merchantProportion = parseInt(
                              val.merchant,
                              10
                            )
                              ? parseInt(val.merchant, 10)
                              : 0;
                            this.twoStepData.workerProportion = parseInt(
                              val.worker,
                              10
                            )
                              ? parseInt(val.worker, 10)
                              : 0;

                            this.twoStepShow = true;
                          }
                        );
                      }
                    }
                  },
                  "巡拍维护"
                )
              );
            }
            if (params.row.userId) {
              tag.push(
                h(
                  "Button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    attrs: {
                      type: "text"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "确定删除该经销商？",
                          onOk: () => {
                            let data = {
                              status: 2,
                              userId: params.row.userId
                            };
                            this.Global.doPost(
                              "admin/setAdminStatus.json",
                              data,
                              res => {
                                this.Global.doPost(
                                  "dealers/openDisableMerchantPatrol.json",
                                  {
                                    patrolling: 0,
                                    id: params.row.id
                                  },
                                  res => {
                                    this.$Message.success("删除成功");
                                    this.init();
                                  }
                                );
                                // this.init();
                              }
                            );
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              );
            }

            return h("div", tag);
          }
        }
      ],
      importUrl: config.uploadWorkerExcel,
      pageData: [],
      brandList: [],
      type: "",
      distributorList: [],
      uploadText: "选择上传文件",
      wordUploadFlag: false, //上传成功标识
      isUpload: false,
      showQuery: false,
      examineType: null, //审核类型
      page: 1,
      pageSize: 10
    };
  },
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 15, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        this.formData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId);
      }
    );
  },
  watch: {
    oneStepShow(val) {
      if (!val) {
        this.oneStepData = {
          brandIds: []
        };
      }
    },
    twoStepData(val) {
      if (!val) {
        this.twoStepData = {
          phone: "",
          brandList: [
            {
              merchantProportion: 0,
              workerProportion: 0,
              brandName: "",
              brandId: ""
            }
          ]
        };
      }
    }
  },
  methods: {
    getBrandNames(val) {
      let names = "";
      if (val.length == 1) {
        names = val[0].brandName;
      } else {
        let arr = [];
        val.forEach(item => {
          arr.push(item.brandName);
        });
        names = arr.join();
      }

      return names;
    },
    //第一步骤保存
    saveOneStep() {
      if (!this.oneStepData.brandIds.length) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (!this.oneStepData.merchantName) {
        this.$Message.error("请填写经销商名称");
        return false;
      }
      let data = {
        merchantName: this.oneStepData.merchantName,
        summary: this.oneStepData.summary
      };
      this.Global.deleteEmptyProperty(data);
      let list = [];
      this.oneStepData.brandIds.forEach(item => {
        this.brandList.forEach(val => {
          if (item == val.id) {
            list.push({
              brandId: val.id,
              brandName: val.brandName
            });
          }
        });
      });
      data.brandMerchantList = list;
      let api = "";
      if (this.type == "add") {
        api = "dealers/doSave.json";
      } else {
        api = "dealers/doUpdate.json";
        data["id"] = this.oneStepData.id;
      }
      if (this.oneStepData.patrolling) {
        //开启巡拍
        data["patrolling"] = 1;
      } else {
        data["patrolling"] = 0;
      }
      this.Global.doPost(api, data, res => {
        this.$Message.success(this.type == "add" ? "新建成功" : "修改成功");
        if (this.oneStepData.patrolling && !this.oneStepData.phone) {
          //存在下一步
          // debugger
          this.twoStepData.phone = "";

          this.twoStepData.brandId = this.oneStepData.brandId;
          if (this.type == "modify") {
            this.twoStepData.type = "add";
            this.twoStepData.id = this.oneStepData.id;
            this.twoStepData.merchantName = this.oneStepData.merchantName;
            this.twoStepData.patrolling = 1;
            this.twoStepData.brandList = [
              {
                brandId: this.oneStepData.brandId,
                brandName: this.oneStepData.brandName,
                merchantProportion: 0,
                workerProportion: 0
              }
            ];
          } else {
            this.twoStepData.id = res;
            this.twoStepData.merchantName = this.oneStepData.merchantName;

            this.twoStepData.brandList = [];
            list.forEach(item => {
              this.twoStepData.brandList.push({
                brandId: item.brandId,
                brandName: item.brandName,
                merchantProportion: 0,
                workerProportion: 0
              });
            });
          }

          this.twoStepShow = true;
          this.oneStepShow = false;
        }
        this.oneStepShow = false;
        this.init();
        console.log(this.twoStepData);
      });
    },
    //第二步骤保存
    twoStepSave() {
      if (!this.twoStepData.phone) {
        this.$Message.error("请填写登陆账户/手机号");
        return false;
      }
      if (this.type == "add" || this.twoStepData.type == "add") {
        this.twoStepData.brandList.forEach(item => {
          if (!item.merchantProportion && item.merchantProportion != 0) {
            this.$Message.error("请填写经销商分润比例");
            return false;
          }
          if (!item.workerProportion && item.workerProportion != 0) {
            this.$Message.error("请填写配送公仔分润比例");
            return false;
          }
        });
      } else {
        if (
          !this.twoStepData.merchantProportion &&
          this.twoStepData.merchantProportion != 0
        ) {
          this.$Message.error("请填写经销商分润比例");
          return false;
        }
        if (
          !this.twoStepData.workerProportion &&
          this.twoStepData.workerProportion != 0
        ) {
          this.$Message.error("请填写配送公仔分润比例");
          return false;
        }
      }

      let data = {
        merchantName: this.twoStepData.merchantName,
        phone: this.twoStepData.phone,
        id: this.twoStepData.id
      };
      this.Global.deleteEmptyProperty(data);
      let api = "";
      if (this.type == "add" || this.twoStepData.type == "add") {
        data.brandMerchantList = this.twoStepData.brandList;
        api = "dealers/createMerchantUserLogin.json";
      } else {
        data["brandId"] = this.twoStepData.brandId;
        data["brandName"] = this.twoStepData.brandName;
        data["merchantProportion"] = this.twoStepData.merchantProportion;
        data["workerProportion"] = this.twoStepData.workerProportion;
        data["userId"] = this.twoStepData.userId;
        api = "dealers/maintenancePatrol.json";
      }

      this.Global.doPost(api, data, res => {
        this.$Message.success("保存成功");

        this.twoStepShow = false;
        this.init();
      });
    },
    addNewMerchant() {
      this.type = "add";
      this.oneStepShow = true;
    },
    changeValue(value) {
      this.distributorList = [];
      this.formData.merchantId = "";
      if (!value) return;
      //查询经销商数据
      this.getDistributorList(value);
    },
    getDistributorList(brandId) {
      this.distributorList = [];
      this.Global.doPost(
        "dealers/doQueryMerchantByBrandId.json",
        { brandId },
        res => {
          if (res.length) {
            this.distributorList = res;
          }
        }
      );
    },

    closeModal() {
      this.oneStepShow = false;
      // this.twoStepShow = false;
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost(
        "dealers/queryWithPageMerchantUser.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          this.noneStatus = true;
        }
      );
    }
  }
};
</script>