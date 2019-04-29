<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 24px;
  cursor: pointer;
}
.select {
  background: @primary-color;
  color: #fff;
}
.ivu-radio-wrapper {
  margin-right: 15px;
}
.ivu-date-picker {
  display: block;
}
.ivu-radio-wrapper {
  margin-right: 30px;
}
.upDate {
  float: left;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">门店信息管理</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="选择区域:">
              <Cascader :data="areaData" v-model="formData.areaCode" change-on-select></Cascader>
            </Form-item>
            <Form-item label="经销商:" prop="brandId" :label-width="80">
              <Select v-model="formData.merchantId" placeholder="经销商" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in distributorList"
                  :key="index"
                >{{ item.merchantName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="客户ID:" prop="storeId" :label-width="80">
              <Input v-model.trim="formData.storeId" placeholder="请输入客户ID"></Input>
            </Form-item>
            <Form-item label="手机号码:" prop="phone" :label-width="80">
              <Input v-model.trim="formData.phone" placeholder="请输入手机号码"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId" :label-width="80">
              <Select v-model="formData.brandId" placeholder="请选择品牌" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="客户编号:" prop="joinCode" :label-width="80">
              <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
            </Form-item>
            <Form-item label="线路编号:" prop="	salesRoute" :label-width="80">
              <Input v-model.trim="formData.salesRoute" placeholder="请输入线路编号"></Input>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="选择类型:" prop="partakeType" :label-width="80">
              <Select v-model="formData.partakeType">
                <Option value="1">导入</Option>
                <Option value="2">自主参与</Option>
              </Select>
            </Form-item>
            <Form-item label="客户名称:" :label-width="80">
              <Input v-model.trim="formData.storeName" placeholder="请输入客户名称"></Input>
            </Form-item>

            <Form-item label="选择状态:" prop="blackStatus">
              <Radio-group v-model="formData.blackStatus">
                <Radio label="all">全部</Radio>
                <Radio label="1">正常</Radio>
                <Radio label="0">拉黑</Radio>
              </Radio-group>
            </Form-item>
          </Col>
          <Col span="2" style="margin-top:24px;">
            <Form-item>
              <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="contentTop">
        <Button
          style="float:right;margin-left:5px;"
          icon="ios-download-outline"
          @click="exportExcel"
          type="primary"
        >导出</Button>
        <Button
          @click="uploadIsShow = true;"
          style="float:right;margin-left:5px;"
          icon="android-add"
          type="success"
        >导入</Button>

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
    <Modal v-model="changeMessage">
      <h2 style="text-align:center;">修改备注</h2>
      <i-Form>
        <Form-item label="原备注" v-if="memoData.oldMemo">
          <Input v-model="memoData.oldMemo" readonly></Input>
        </Form-item>
        <Form-item label="新备注">
          <Input v-model="memoData.newMemo"></Input>
        </Form-item>
      </i-Form>
      <div slot="footer">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="sureChangeMemo">确定</i-button>
      </div>
    </Modal>
    <Modal v-model="uploadIsShow">
      <h2 style="text-align:center;">上传门店信息</h2>
      <i-Form>
        <Form-item label="品牌名称:" prop="brandId" :label-width="80">
          <Select v-model="uploadData.brandId" placeholder="请选择品牌">
            <Option
              :value="item.id"
              v-for="(item,index) in brandList"
              :key="index"
            >{{ item.brandName }}</Option>
          </Select>
        </Form-item>
        <div style="overflow:hidden;">
          <div class="upDate">
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
        </div>
      </i-Form>
      <div slot="footer">
        <i-button type="text" @click="cancel">取消</i-button>
        <i-button type="success" @click="uploadExcel">确定</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
import config from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "store-information-manage-keepAlive",

  data() {
    return {
      uploadIsShow: false,
      uploadData: {
        brandId: "",
        parameter: "" //导入类型
      },
      changeMessage: false,
      areaData: area,
      formData: {
        brandId: "",
        joinCode: "",
        presentName: "",
        partakeType: "",
        userType: "",
        storeName: "",
        phone: "",
        storeId: "",
        salesRoute: "",
        blackStatus: "all",
        merchantId: "", //经销商
        areaCode: []
      },
      distributorList: [],
      uploadUrl: "",
      page: 0,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 120
        },
        {
          title: "类型",
          key: "partakeType",
          align: "center",
          width: 120,
          render: (h, params) => {
            let str = "";
            switch (params.row.partakeType) {
              case 1:
                str = "导入";
                break;
              case 2:
                str = "自主参与";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        },
        {
          title: "客户ID",
          key: "storeId",
          align: "center",
          width: 120
        },
        {
          title: "昵称",
          key: "wxNickName",
          align: "center",
          width: 120
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          width: 120
        },
        {
          title: "客户名称",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          width: 120
        },
        {
          title: "手机号码",
          key: "phone",
          align: "center",
          width: 120
        },
        {
          title: "一级分类",
          key: "salesDept",
          align: "center",
          width: 120
        },
        {
          title: "二级分类",
          key: "salesRegion",
          align: "center",
          width: 120
        },
        {
          title: "三级分类",
          key: "busiDept",
          align: "center",
          width: 120
        },
        {
          title: "四级分类",
          key: "busiOffice",
          align: "center",
          width: 120
        },
        {
          title: "省",
          key: "provName",
          align: "center",
          width: 120
        },
        {
          title: "市",
          key: "cityName",
          align: "center",
          width: 120
        },
        {
          title: "区/县",
          key: "areaName",
          align: "center",
          width: 120
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          width: 120
        },
        {
          title: "线路编号",
          key: "salesRoute",
          align: "center",
          width: 120
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 120
        },
        {
          title: "经销商",
          key: "merchantName",
          align: "center",
          width: 120
        },
        {
          title: "拉黑状态",
          key: "blackStatus",
          align: "center",
          width: 120,
          render: (h, params) => {
            let tag = [];
            if (params.row.blackStatus == 0) {
              tag.push(
                h(
                  "span",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      color: "#ff6600"
                    }
                  },
                  "拉黑"
                )
              );
            } else if (params.row.blackStatus == 1) {
              tag.push(
                h(
                  "span",
                  {
                    props: {
                      type: "success",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px",
                      color: "#00cc66"
                    }
                  },
                  "正常"
                )
              );
            }
            return h("div", tag);
          }
        },
        {
          title: "冻结状态",
          key: "status",
          align: "center",
          width: 120,
          render: (h, f) => {
            let str = "";
            let styles = "";
            if (f.row.status == 1) {
              str = "正常";
              styles = "#00cc66";
            } else if (f.row.status == 2) {
              str = "冻结";
              styles = "#ff6600";
            } else if (f.row.status == 0) {
              str = "初始";
            }
            let tag = [];
            tag.push(
              h(
                "span",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    color: styles
                  }
                },
                str
              )
            );
            return h("div", tag);
          }
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          width: 120
        },
        {
          title: "操作",
          key: "option",
          align: "center",
          width: 200,
          fixed: "right",
          render: (h, params) => {
            var tag = [];
            if (params.row.blackStatus == 1) {
              tag.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "是否确定拉黑该门店",
                          onOk: () => {
                            this.Global.doPost(
                              "personnel/pullBlackStore.json",
                              {
                                storeId: params.row.storeId,
                                blackStatus: 0
                              },
                              res => {
                                this.$Message.success("设置成功");
                                this.init();
                              }
                            );
                          }
                        });
                      }
                    }
                  },
                  "拉黑"
                )
              );
            } else if (params.row.blackStatus == 0) {
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
                        this.$Modal.confirm({
                          title: "警告",
                          content: "是否确定解除拉黑状态该门店",
                          onOk: () => {
                            this.Global.doPost(
                              "personnel/pullBlackStore.json",
                              {
                                storeId: params.row.storeId,
                                blackStatus: 1
                              },
                              res => {
                                this.$Message.success("设置成功");
                                this.init();
                              }
                            );
                          }
                        });
                      }
                    }
                  },
                  "恢复"
                )
              );
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
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.memoMethod(params.row);
                    }
                  }
                },
                "备注"
              )
            );
            return h("div", tag);
          }
        }
      ],
      pageData: [],
      brandList: [],
      pageNum: 0,
      memoData: {},
      page: 1,
      pageSize: 10,
      url: config.uploadWorkerExcel,
      uploadText: "选择导入文件"
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId);
        this.uploadData.brandId = this.brandList[0].id;
        // this.init();
      }
    });
  },
  watch: {
    changeMessage(curVal, oldVal) {
      if (!curVal) {
        this.memoData = {};
      }
    },
    uploadIsShow(curVal, oldVal) {
      if (!curVal) {
        setTimeout(() => {
          this.uploadData.brandId = this.formData.brandId;
          this.uploadText = "选择导入文件";
          this.uploadUrl = "";
        }, 200);
      }
    }
  },

  methods: {
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
            // this.distributorList.unshift({
            //   id: "all",
            //   merchantName: "全部"
            // });
            // this.formData.merchantId = res[0].id;
          }
        }
      );
    },
    sureChangeMemo() {
      // if (!this.memoData.newMemo) {
      //   this.$Message.error("请输入备注");
      //   return false;
      // }
      this.Global.doPost(
        "personnel/modifyStoreInfo.json",
        {
          storeId: this.memoData.storeId,
          memo: this.memoData.newMemo
        },
        res => {
          this.$Message.success("修改成功");
          this.init();
          this.changeMessage = false;
        }
      );
    },
    cancel() {
      this.changeMessage = false;
      this.uploadIsShow = false;
    },
    modify(val) {
      //修改
      let queryParams = {
        storeId: val.storeId
      };
      this.$router.push({
        path: "/userInformation",
        query: queryParams
      });
    },
    frozen(val) {
      //冻结
      this.$Modal.confirm({
        title: "警告",
        content: "是否确定冻结该门店",
        onOk: () => {
          this.Global.doPost(
            "personnel/pullBlackStore.json",
            { storeId: val.storeId, blackStatus: val.blackStatus },
            res => {
              this.$Message.success("设置成功");
              this.init();
            }
          );
        }
      });
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(1, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    init(currentPage, pageSize) {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = this.pageSize;
      data["blackStatus"] == "all" ? delete data["blackStatus"] : "";
      this.Global.doPost("personnel/queryStoreInfoList.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    memoMethod(val) {
      //备注
      this.memoData = {
        storeId: val.storeId,
        oldMemo: val.memo,
        newMemo: ""
      };
      this.changeMessage = true;
    },
    changePage(size) {
      this.init(size, 10);
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      this.Global.doPost(
        "personnel/brandStoreSignInfoImport.json",
        {
          loadFilePath: this.uploadUrl,
          brandId: this.uploadData.brandId,
          parameter: 6
        },
        () => {
          this.init();
          this.uploadText = "上传参与业代名单";
          this.uploadIsShow = false;
        }
      );
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/hbTemplate.xlsx"
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["blackStatus"] == "all" ? delete data["blackStatus"] : "";
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "personnel/storeInfoExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


