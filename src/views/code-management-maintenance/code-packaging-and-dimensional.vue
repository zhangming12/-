<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
}

.contentTop {
  height: 40px;
  line-height: 40px;
  margin-bottom: 0;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.table-box {
  padding: 0 10px;
  // min-height: 500px;/
  padding-bottom: 60px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
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
      overflow-y: auto;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
}
.demo {
  float: left;
  margin-left: 10px;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">二维码包装及报废</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="24:00" placeholder="结束时间" v-model="formData.queryEndTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select
                  v-model="formData.groupId"
                  placeholder="总活动名*"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>

            <div class="btn-left w18">
              <Form-item>
                <Checkbox v-model="formData.status">仅显示正常数据</Checkbox>
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
                <div class="btn-right search-right" @click="submit('form')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="container" v-if="showQuery">
              <div class="btn-left w18">
                <Form-item required>
                  <Select
                    v-model="formData.activityId"
                    placeholder="活动名称"
                    clearable
                    @on-change="getActivityName"
                  >
                    <Option
                      :value="item.id"
                      v-for="(item,index) in activityList"
                      :key="index"
                    >{{ item.name }}</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Input v-model.trim="formData.packageNo" placeholder="请输入码包号"></Input>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            {{activityName?activityName:groupName?groupName:""}}
            ：已包装码包数
            <span
              class="numColor"
            >{{pageNum}}</span>，已包装码量
            <span class="numColor">{{codeNum}}</span>，损耗量
            <span class="numColor">{{scrapNum}}</span>
          </span>

          <exportBtn class="btn-right" @btnClick="exportExcel"/>
          <importBtn class="btn-right" @btnClick="maintainImport" title="维护导入"/>
        </div>
        <Table ref="table" :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>

    <!-- 导入导出历史 -->
    <myModal class="myModal" @close="closeModal" :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>近一周导出历史</h3>
        <div class="modal-table">
          <div class="modal-table-top">
            <span class="btn-left">
              此表共包含
              <span class="numColor">100</span>条数据
            </span>
          </div>
          <Table :columns="columns" :data="pageData" disabled-hover></Table>
        </div>
      </div>
    </myModal>
    <!-- 维护导入 -->
    <myModal class="myModal" height="220" @close="closeModal" :modal="maintainImportShow">
      <div slot="main" class="modal-main">
        <h3 style="margin-bottom:20px;">维护导入</h3>
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <Form-item label="品牌名称：" :label-width="100" required>
              <Select v-model="maintainImportData.brandId" placeholder="品牌名称*">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="已包装码包：" :label-width="100" required>
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
                  {{uploadText}}
                </Upload>
              </div>
            </Form-item>
            <div class="demo" @click="dowland">
              <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
              <span>下载导入模版</span>
            </div>
          </div>
        </Form>
        <div class="maintain-footer">
          <Button type="text" @click="closeModal">取消</Button>
          <Button type="text" @click="uploadExcel">确定</Button>
        </div>
      </div>
    </myModal>

    <!-- 修改备注 -->
    <myModal class="myModal" height="130" @close="closeModal" :modal="modifyMemo">
      <div slot="main" class="modal-main">
        <h3 style="margin-bottom:10px;">修改包装备注</h3>

        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <Form-item label="包装备注：" :label-width="100">
              <Input v-model="memo" placeholder="请输入包装备注"/>
            </Form-item>
          </div>
        </Form>
        <div class="maintain-footer">
          <Button type="text" @click="closeModal">取消</Button>
          <Button type="text" @click="modifyMemos">确定</Button>
        </div>
      </div>
    </myModal>

    <!-- 修改标贴编号 -->
    <myModal class="myModal" height="130" @close="closeModal" :modal="labelNumberShow">
      <div slot="main" class="modal-main">
        <h3 style="margin-bottom:10px;">修改标贴编号</h3>

        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <Form-item label="标贴编号：" :label-width="100" required>
              <Input v-model="labelNumber" placeholder="请输入标贴编号"/>
            </Form-item>
          </div>
        </Form>
        <div class="maintain-footer">
          <Button type="text" @click="closeModal">取消</Button>
          <Button type="text" @click="modifyLabel">确定</Button>
        </div>
      </div>
    </myModal>

    <!-- 包装报废数 -->

    <myModal class="myModal" width="800" @close="closeModal" :modal="paintScrapeShow">
      <div slot="main" class="modal-main">
        <h3 style="margin-bottom:10px;">包装报废数</h3>
        <Table
          ref="tableScrap"
          maxHeight="200"
          :columns="paintScrapeColoms"
          :data="paintScrapeData"
          disabled-hover
        ></Table>

        <div class="maintain-footer">
          <Button type="text" @click="uploadExcelScrap">导出</Button>
          <Button type="text" @click="closeModal">关闭</Button>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
const image = require("@/assets/image/edit.png");
import dataRange from "@/components/data-range/data-range.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import importBtn from "@/components/Button/import-btn.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import config from "@/util/config.js";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "code-packaging-and-dimensional-keepAlive",
  data() {
    return {
      url: config.uploadWorkerExcel,
      maintainImportShow: false,
      maintainImportData: {
        brandId: ""
      },
      id: "",
      paintScrapeShow: false,
      paintScrapeData: [],
      paintScrapeColoms: [
        {
          title: "导入时间",
          key: "createTime",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "码包号",
          key: "packageNo",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "码包名称",
          key: "packageName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "本次包装量",
          key: "packNormal",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "标贴编号",
          key: "lable",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "本次报废数",
          key: "packScrap",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "本次报废标贴编号",
          key: "lableScrap",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "剩余回库量",
          key: "rest",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "剩余回库标贴编号",
          key: "lableRest",
          minWidth: 200,
          align: "center",
          tooltip: true
        },
        {
          title: "备注",
          key: "memo",
          minWidth: 160,
          align: "center",
          tooltip: true
        }
      ],
      scrapNum: 0,
      codeNum: 0,
      groupName: "",
      activityName: "",
      labelNumberShow: false,
      labelNumber: "",
      memo: "",
      modifyMemo: false,
      myModalisShow: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      showQuery: false,
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        status: true,
        activityId: "",
        packageNo: ""
      },
      uploadText: "请选择导入文件",
      uploadUrl: "",
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      columns1: [
        {
          title: "导入更新时间",
          key: "updateTime",
          minWidth: 160,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.updateTime));
          }
        },
        {
          title: "总活动名",
          key: "groupName",
          minWidth: 150,
          align: "center",
          tooltip: true
        },
        {
          title: "活动名称",
          minWidth: 100,
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "已包装码包号",
          minWidth: 150,
          key: "packageNo",
          align: "center",
          tooltip: true
        },
        {
          title: "标贴编号",
          minWidth: 180,
          key: "lable",
          align: "center",
          tooltip: true
        },
        {
          title: "印刷正常数",
          minWidth: 120,
          key: "printNormal",
          align: "center",
          tooltip: true
        },
        {
          title: "包装正常数",
          minWidth: 120,
          key: "packNormal",
          align: "center",
          tooltip: true
        },
        {
          title: "包装剩余数",
          minWidth: 120,
          key: "packRest",
          align: "center",
          tooltip: true
        },
        {
          title: "包装报废数",
          minWidth: 120,
          key: "packScrap",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            var tag = [];

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
                      this.paintScrapeShow = true;
                      this.paintScrapeData = [];
                      this.Global.doPostNoLoading(
                        "codepackage/queryPackAndScrapFactoryInfo.json",
                        {
                          packageNo: params.row.packageNo,
                          brandId: this.formData.brandId
                        },
                        res => {
                          this.paintScrapeData = res;

                          for (
                            let i = 0;
                            i < this.paintScrapeData.length;
                            i++
                          ) {
                            this.paintScrapeData[
                              i
                            ].createTime = this.Global.createTime(
                              this.paintScrapeData[i].createTime
                            );
                          }
                        }
                      );
                    }
                  }
                },
                params.row.packScrap
              )
            );
            return h("div", tag);
          }
        },
        {
          title: "包装备注",
          key: "memo",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  title: params.row.memo
                },
                style: {
                  position: "relative",
                  paddingRight: "20px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }
              },
              [
                h(
                  "span",
                  {
                    style: {
                      verticalAlign: "center"
                    }
                  },
                  params.row.memo ? params.row.memo : "无"
                ),
                h("img", {
                  attrs: {
                    src: image
                  },
                  style: {
                    marginLeft: "5px",
                    verticalAlign: "center",
                    cursor: "pointer",
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "18px",
                    height: "18px"
                  },
                  on: {
                    click: () => {
                      this.modifyMemo = true;
                      this.memo = params.row.memo;
                      this.id = params.row.id;
                    }
                  }
                })
              ]
            );
          }
        },
        {
          title: "状态",
          key: "status",
          minWidth: 120,
          align: "center",
          render: (h, params) => {
            let str = "";
            if (params.row.status == 1) {
              str = "正常";
            } else if (params.row.status == 2) {
              str = "此行作废";
            }
            return h("div", str);
          }
        },
        {
          title: "操作",
          minWidth: 100,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            var tag = [];

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
                      this.$Modal.confirm({
                        title: "警告",
                        content: "是否确定作废",
                        onOk: () => {
                          this.Global.doPost(
                            "codepackage/updateStatusOfPack.json",
                            {
                              id: params.row.id
                            },
                            res => {
                              this.$Message.success("操作成功");
                              this.init();
                            }
                          );
                        }
                      });
                    }
                  }
                },
                "作废"
              )
            );
            return h("div", tag);
          }
        }
      ],
      columns: [
        {
          title: "时间",
          type: "index",
          minWidth: 140,
          align: "center"
        },
        {
          title: "文件名",
          key: "groupName",
          minWidth: 140,
          align: "center"
        },
        {
          title: "状态",
          key: "uploadTime",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.uploadTime));
          }
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                      let { id, activityId, storeId } = params.row;
                      let queryParams = {
                        id,
                        activityId,
                        storeId,
                        displayActCategory: "partake",
                        displayBackType: "C"
                      };
                      this.$router.push({
                        path: "/displayResultOneEdit",
                        query: queryParams
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        }
      ],
      pageData: [],
      areaData: area,
      brandList: [],
      activityList: []
    };
  },
  components: { dataRange, exportBtn, myModal, importBtn },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.maintainImportData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    getActivityName(val) {
      this.activityName = "";
      if (!val) return;
      this.activityList.forEach(item => {
        if (item.id == val) {
          this.activityName = item.name;
        }
      });
    },
    uploadExcelScrap() {
      this.$refs.tableScrap.exportCsv({
        filename: "包装报废数"
      });
    },
    // 修改标贴编号
    modifyLabel() {
      let data = {};
      data["lable"] = this.labelNumber;
      data["id"] = this.id;
      this.Global.doPostNoLoading("codepackage/updataLable.json", data, res => {
        this.$Message.success("修改成功");
        this.labelNumberShow = false;
        this.init();
      });
    },
    // 修改备注
    modifyMemos() {
      let data = {};
      data["memo"] = this.memo;
      data["id"] = this.id;
      this.Global.doPostNoLoading("codepackage/updateMemo.json", data, res => {
        this.$Message.success("修改成功");
        this.modifyMemo = false;
        this.init();
      });
    },
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.maintainImportData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }

      this.Global.doPost(
        "codepackage/packAndScrapImport.json",
        {
          loadFilePath: this.uploadUrl,
          brandId: this.maintainImportData.brandId
        },
        () => {
          this.$Message.success("导入成功");
          this.maintainImportShow = false;
          this.uploadText = "选择导入文件";
          this.init();
        }
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    //维护导入
    maintainImport() {
      this.maintainImportShow = true;
    },
    closeModal() {
      this.myModalisShow = false;
      this.maintainImportShow = false;
      this.modifyMemo = false;
      this.labelNumberShow = false;
      this.paintScrapeShow = false;
    },
    showDetail() {
      this.myModalisShow = true;
    },
    getActivityList(value) {
      this.groupList.forEach(item => {
        if (item.id == value) {
          this.groupName = item.groupName;
        }
      });
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/template/qr_code_pack_template.xlsx"
      );
    },
    submit(name) {
      if (!this.formData.queryStartTime) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryEndTime) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
        return false;
      }
      this.init(1, 10);
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      if (data["status"]) {
        data["status"] = 1;
      } else {
        data["status"] = 2;
        delete data["status"];
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "codepackage/queryPackAndScrapInfo.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          if (this.pageData.length) {
            this.codeNum = this.pageData[0].codeNum;
            this.scrapNum = this.pageData[0].scrapNum;
          }
        }
      );
    },
    exportExcel() {
      let data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (data["status"]) {
        data["status"] = 1;
      } else {
        data["status"] = 2;
        delete data["status"];
      }
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "codepackage/queryPackAndScrapInfoExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 1, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.groupName = this.groupList[0].groupName;
            this.getActivityList(this.formData.groupId);
          }
        }
      );
    },
    handleEdit() {
      this.$router.push({
        path: "/displayReward-edit",
        query: { type: "edit" }
      });
    }
  }
};
</script>