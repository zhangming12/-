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
    width: 48%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 8px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    width: 52%;
    img {
      cursor: pointer;
      margin-left: 6px;
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
      //   overflow-y: auto;
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
.ivu-input {
  text-align: center !important;
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
span.btn {
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;
  padding: 4px 20px;
  border: 1px solid transparent;
  border-radius: 2px;
  transition: all 0.2s linear;
  &:hover {
    background-color: #e5e5e5;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列推广名单导入</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
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
                  placeholder="活动包名*"
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
                <Select v-model="formData.activityId" placeholder="活动名称" clearable>
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
                <Select
                  v-model="formData.oneLevel"
                  placeholder="一级组织"
                  @on-change="oneLevelChange"
                  clearable
                >
                  <Option :value="item.id" v-for="(item,index) in oneLeverList" :key="index">
                    <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                  </Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select
                  v-model="formData.twoLevel"
                  placeholder="二级组织"
                  @on-change="twoLevelChange"
                  clearable
                >
                  <Option :value="item.id" v-for="(item,index) in twoLeverList" :key="index">
                    <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                  </Option>
                </Select>
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
                    v-model="formData.threeLevel"
                    placeholder="三级组织"
                    @on-change="threeLevelChange"
                    clearable
                  >
                    <Option :value="item.id" v-for="(item,index) in threeLeverList" :key="index">
                      <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                    </Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Select v-model="formData.fourLevel" placeholder="四级组织" clearable>
                    <Option :value="item.id" v-for="(item,index) in fourLeverList" :key="index">
                      <span :title="item.areaName" class="text-overflow">{{item.areaName}}</span>
                    </Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeId" placeholder="用户ID"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.salesRoute" placeholder="销售路线" clearable></Input>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>

          <exportBtn class="btn-right" @btnClick="exportExcel"/>
          <delBtn class="btn-right" @btnClick="deleteShow = true"/>
          <importBtn class="btn-right" @btnClick="importShow = true"/>
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>

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
    <!-- 修改 -->
    <myModal class="myModal" @close="closeModal" :modal="modifyShow">
      <div slot="main" class="modal-main">
        <h3>修改活动</h3>
        <div class="modal-table">
          <i-Form :label-width="88">
            <Form-item label="活动时间:" required>
              <Row>
                <Col span="8">
                  <Form-item>
                    <Date-picker type="datetime" placeholder="选择日期" v-model="modifyData.startTime"></Date-picker>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align:center">至</Col>
                <Col span="8">
                  <Form-item>
                    <Date-picker type="datetime" placeholder="选择日期" v-model="modifyData.endTime"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="活动折扣:" required>
              <span style="float:left;" v-if="modifyData.presentType == 2">红包</span>
              <span style="float:left;" v-if="modifyData.presentType == 1">{{modifyData.goodsName}}</span>
              <input
                style="width:100px;float:left;"
                type="number"
                min="1"
                max="4999.99"
                class="numberInput"
                v-model.trim="modifyData.slackAmount"
              >
              <span style="float:left;" v-if="modifyData.presentType == 1">份</span>
              <span style="float:left;" v-if="modifyData.presentType == 2">元</span>
            </Form-item>
          </i-Form>
        </div>
        <div class="maintain-footer">
          <Button type="text" @click="closeModal">取消</Button>
          <Button type="text" @click="modifyTime">确定</Button>
        </div>
      </div>
    </myModal>
    <!-- 停止 -->
    <myModal class="myModal" @close="closeModal" :modal="deleteShow">
      <div slot="main" class="modal-main">
        <h3>陈列推广名单导入删除</h3>
        <div class="modal-table">
          <i-Form>
            <Form-item label="品牌名称:" prop="brandId" :label-width="72">
              <Select v-model="deleteModelData.brandId" placeholder="请选择">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
          </i-Form>
          <div style="overflow:hidden;">
            <div class="demo" style="float:left;margin:2px 6px 0 0;" @click="deleteDowland">
              <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
              <span>下载模版</span>
            </div>
            <div
              class="upDate"
              style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;float:left;"
            >
              <Upload
                :action="url"
                :show-upload-list="false"
                :on-success="deleteHandleSuccess"
                :on-error="handleError"
                :on-format-error="handleFormatError"
                :format="['xlsx','xls']"
              >
                <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                {{ deleteUploadText }}
              </Upload>
            </div>
          </div>
        </div>
        <div class="maintain-footer">
          <span @click="closeModal" class="btn">取消</span>
          <span @click="deleteUploadExcel" class="btn">确定</span>
        </div>
      </div>
    </myModal>
    <!-- 导入 -->
    <myModal class="myModal" @close="closeModal" :modal="importShow">
      <div slot="main" class="modal-main">
        <h3>陈列推广名单导入</h3>
        <div class="modal-table">
          <i-Form>
            <Form-item label="品牌名称:" prop="brandId" :label-width="72">
              <Select v-model="importModelData.brandId" placeholder="请选择">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
          </i-Form>
          <div style="overflow:hidden;">
            <div class="demo" style="float:left;margin:2px 6px 0 0;" @click="dowland">
              <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
              <span>下载模版</span>
            </div>
            <div
              class="upDate"
              style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;float:left;"
            >
              <Upload
                :action="url"
                :show-upload-list="false"
                :on-success="handleSuccess"
                :on-error="handleError"
                :on-format-error="handleFormatError"
                :format="['xlsx','xls']"
              >
                <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                {{ uploadText }}
              </Upload>
            </div>
          </div>
        </div>
        <div class="maintain-footer">
          <span @click="closeModal" class="btn">取消</span>
          <span @click="uploadExcel" class="btn">确定</span>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";

import { dispalyExamineSuggesteStatus } from "@/util/ENUMS.js";
import dataRange from "@/components/data-rang.vue";
import importBtn from "@/components/Button/import-btn.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import delBtn from "@/components/Button/del-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "display-promotion-list-import-keepAlive",
  data() {
    return {
      noneStatus: false,
      importShow: false,
      myModalisShow: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      showQuery: false,
      modifyData: {
        startTime: "",
        endTime: "",
        joinCode: "",
        brandId: "",
        presentCode: "",
        slackAmount: "",
        presentType: "",
        goodsName: ""
      },
      groupList: [],
      formData: {
        brandId: "",
        groupId: "",
        activityId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "", //四级组织
        joinCode: ""
      },
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "门店名称",
          key: "storeName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "四级组织",
          key: "fourLevel",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "销售路线",
          key: "salesRoute",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "分组名称",
          key: "presentName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "活动时间",
          key: "time",
          align: "center",
          width: 290,
          tooltip: true
        },
        {
          title: "奖励",
          key: "slackAmount",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "状态",
          key: "showStatus",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            let str = "";
            switch (params.row.showStatus) {
              case 1:
                str = "未开始";
                break;
              case 2:
                str = "已结束";
                break;
              case 3:
                str = "参与中";
                break;
              case 4:
                str = "未参与";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        },
        {
          title: "操作",
          key: "option",
          align: "center",
          minWidth: 120,
          tooltip: true,
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
                      this.modify(params.row);
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
      uploadText: "选择上传文件",
      deleteUploadText: "选择上传文件",
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
      activityList: [],
      modifyShow: false,
      deleteShow: false,
      deleteModelData: {
        brandId: ""
      },
      url: config.uploadWorkerExcel,
      deleteUploadUrl: "",
      importModelData: {
        brandId: ""
      }
    };
  },
  components: {
    dataRange,
    exportBtn,
    myModal,
    delBtn,
    importBtn,
    hhTable,
    fieldNameDes
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 3, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 xlsx 或 xls 格式的文件。"
      });
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    deleteHandleSuccess(response, file, fileList) {
      this.deleteUploadText = file.name;
      var url = response.data;
      if (url) {
        this.deleteUploadUrl = url;
      }
    },
    deleteDowland() {
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/brand/updateCollectEndtime.xls"
      );
    },
    dowland() {
      // 业务员模版
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/demo/collectTemplate.xlsx"
      );
    },
    deleteUploadExcel() {
      if (!this.deleteUploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.deleteModelData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }

      let data = {
        loadFilePath: this.deleteUploadUrl,
        brandId: this.deleteModelData.brandId
      };
      this.Global.doPost("basicData/updateCollectYxtg.json", data, () => {
        this.$Message.success("成功");
        // this.init();
        this.deleteShow = false;
        this.deleteUploadText = "选择上传文件";
      });
    },
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      if (!this.importModelData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }

      let data = {
        loadFilePath: this.uploadUrl,
        brandId: this.importModelData.brandId
      };
      this.Global.doPost(
        "basicData/brandStoreCollectInfoImport.json",
        data,
        () => {
          this.$Message.success("导入成功");
          this.init();
          this.importShow = false;
          this.uploadText = "上传参与业代名单";
        }
      );
    },
    modifyTime() {
      // 修改时间
      if (
        !this.modifyData.startTime ||
        !this.modifyData.endTime ||
        !this.modifyData.presentCode
      ) {
        this.$Message.error("时间,奖励不能为空");
        return false;
      }
      if (this.modifyData.endTime <= this.modifyData.startTime) {
        this.$Message.info("结束时间必须在开始时间之后");
        return false;
      }
      // return;
      let data = this.Global.JsonChange(this.modifyData);
      data["startTime"] = this.Global.createTime(this.modifyData.startTime);
      data["endTime"] = this.Global.createTime(this.modifyData.endTime);
      data["brandId"] = this.formData.brandId;
      delete data["presentType"];
      delete data["queryEndTime"];
      delete data["goodsName"];
      this.Global.doPost(
        "displayYxtg/updateActivityCollectTime.json",
        data,
        res => {
          this.$Message.success("修改成功");
          this.modifyShow = false;
          this.init();
        }
      );
    },
    modify(val) {
      //修改
      this.modifyShow = true;
      this.modifyData.brandId = val.brandId;
      this.modifyData.joinCode = val.joinCode;
      this.modifyData.presentCode = val.presentCode;
      this.modifyData.startTime = this.Global.createTime(val.showStartTime);
      this.modifyData.endTime = this.Global.createTime(val.showEndTime);
      this.modifyData.slackAmount = val.slackAmount;
      this.modifyData.presentType = val.presentType; //奖励类型
      this.modifyData.goodsName = val.goodsName;
    },
    oneLevelChange(value) {
      this.twoLeverList = [];
      this.formData.twoLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.twoLeverList = res.data;
        }
      });
    },
    twoLevelChange(value) {
      this.threeLeverList = [];
      this.formData.threeLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.threeLeverList = res.data;
        }
      });
    },
    threeLevelChange(value) {
      this.fourLeverList = [];
      this.formData.fourLevel = "";
      if (!value) return;
      queryOrganizationDictList({
        brandId: this.formData.brandId,
        parentId: value
      }).then(res => {
        if (res && res.status == 1) {
          this.fourLeverList = res.data;
        }
      });
    },
    closeModal() {
      this.myModalisShow = false;
      this.modifyShow = false;
      this.deleteShow = false;
      this.importShow = false;
    },
    showDetail() {
      this.myModalisShow = true;
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    //查询四级组织数据
    getFourListData(brandId, presentId) {
      if (!brandId || !presentId) {
        return;
      }
      getFourList({ brandId, presentId }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
    },
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.error("活动包名不能为空");
        return false;
      }
      // if (!this.formData.activityId) {
      //   this.$Message.error("活动不能为空");
      //   return false;
      // }

      this.init(1, 10);
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "displayYxtg/queryDisplayStoreLoadInfoOfFourLevel.json",
        data,
        res => {
          this.noneStatus = true;
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
          for (let i = 0, len = res.datalist.length; i < len; i++) {
            res.datalist[i].time =
              this.Global.createTime(res.datalist[i].showStartTime) +
              "至" +
              this.Global.createTime(res.datalist[i].showEndTime);
          }
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "displayYxtg/queryDisplayStoreLoadInfoOfFourLevelOfExport.json",
        data
      );
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.groupList = [];
      this.formData.groupId = "";
      this.formData.oneLevel = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
          }
        }
      );
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
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


