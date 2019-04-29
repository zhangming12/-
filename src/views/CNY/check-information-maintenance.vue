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
    .upDate {
      cursor: pointer;
      text-align: center;
      border: 1px solid #aeaeae;
      padding: 2px 12px;
      margin-right: 10px;
      width: 150px;
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
.ivu-input {
  text-align: center !important;
}
.spanBtn {
  cursor: pointer;
  margin-left: 10px;
  &:hover {
    color: @primary-color;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">签到位置维护</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
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
              <Form-item required>
                <DatePicker
                  type="daterange"
                  v-model="formData.queryTime"
                  split-panels
                  placeholder="日期"
                  style="display:block;"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <!-- <DatePicker type="date" placeholder="签到时间" style="display:block;"></DatePicker> -->
                <DatePicker
                  type="daterange"
                  v-model="formData.signTime"
                  split-panels
                  placeholder="签到时间"
                  style="display:block;"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="签到点名称" v-model="formData.signName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select
                  v-model="formData.signStatus"
                  placeholder="签到状态"
                  @on-change="oneLevelChange"
                  clearable
                >
                  <Option value="0">待签到</Option>
                  <Option value="1">正常签到</Option>
                  <Option value="2">迟到签到</Option>
                  <Option value="3">未签到</Option>
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
                  <Input placeholder="业代姓名" v-model="formData.workerName" clearable></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item required>
                  <Input placeholder="业代手机" v-model="formData.phone" clearable></Input>
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
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            共查询到
            <span class="numColor">{{ pageNum }}</span> 条数据
          </span>
          <!-- <span class="btn-left spanBtn" @click="goToAudit">去审核</span> -->
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
          <importBtn class="btn-right" @click.native="importExcelShow = true"/>
          <span class="btn-right spanBtn" @click="dowland" style="margin-right:10px;">下载模板</span>
        </div>
        <hhTable
          ref="table"
          :columns="columns1"
          :pageData="pageData"
          :noneStatus="noneStatus"
          disabled-hover
        ></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
      <fieldNameDes/>
    </div>
    <myModal class="myModal" @close="importExcelShow = false" :modal="importExcelShow">
      <div slot="main" class="modal-main">
        <h3>导入</h3>
        <div class="modal-table">
          <Form ref="form" :label-width="88">
            <div style="overflow:hidden;">
              <div class="upDate">
                <Upload
                  :action="importUrl"
                  :show-upload-list="false"
                  :on-success="handleSuccess"
                  :on-error="handleError"
                >
                  <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
                  <span>{{ importData.uploadText }}</span>
                </Upload>
              </div>
            </div>
            <div class="fotter" style="text-align:center;">
              <Button @click="importExcelShow = false" type="primary">取消</Button>
              <Button @click="exportMethod" type="success">导入</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>

    <!-- 修改 -->
    <myModal class="myModal" @close="modifyShow = false" :modal="modifyShow" width="800">
      <div slot="main" class="modal-main">
        <h3>修改</h3>
        <div class="modal-table">
          <Form ref="forms" :label-width="88">
            <Row>
              <Col span="8">
                <Form-item label="时间:">
                  <DatePicker
                    v-model="modifyData.signTime"
                    type="datetime"
                    placeholder="时间"
                    style="display:block;"
                  ></DatePicker>
                </Form-item>
                <Form-item label="签到点ID:">
                  <Input
                    @on-blur="IDFilter"
                    placeholder="签到点ID"
                    v-model.trim="modifyData.signLocateId"
                  ></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="业代手机:">
                  <Input @on-blur="phoneFilter" placeholder="业代手机" v-model.trim="modifyData.phone"></Input>
                </Form-item>
                <Form-item label="签到点名称:">{{ modifyData.signName }}</Form-item>
              </Col>
              <Col span="8">
                <Form-item label="业代姓名:">{{ modifyData.workerName }}</Form-item>
                <Form-item label="签到点地址:">{{ modifyData.signAddress }}</Form-item>
              </Col>
            </Row>
            <div class="fotter" style="text-align:center;">
              <Button @click="modifyShow = false" type="primary">取消</Button>
              <Button @click="sureMethod" type="success">确定</Button>
            </div>
          </Form>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import config from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "check-information-maintenance-keepAlive",
  data() {
    return {
      importData: {
        uploadText: "请选择上传文件"
      },
      importUrl: config.uploadWorkerExcel,
      options: {
        disabledDate(date) {
          const disabledDay = date.getTime();
          return disabledDay > new Date().getTime();
        }
      },
      modifyShow: false,
      notPass: 0,
      importExcelShow: false,
      myModalisShow: false,
      oneLeverList: [], //一级组织数据
      twoLeverList: [], //二级组织数据
      threeLeverList: [], //三级组织数据
      fourLeverList: [], //四级组织数据
      showQuery: false,
      formData: {
        brandId: "",
        oneLevel: "", //一级组织
        twoLevel: "", //二级组织
        threeLevel: "", //三级组织
        fourLevel: "", //四级组织
        queryTime: [],
        signTime: []
      },
      modifyData: {},
      page: 1,
      pageNum: 0,
      pageSize: 10,
      noneStatus: false,
      showList: [
        {
          title: "一级组织",
          key: "oneLevel"
        },
        {
          title: "二级组织",
          key: "twoLevel"
        },
        {
          title: "三级组织",
          key: "threeLevel"
        },
        {
          title: "四级组织",
          key: "fourLevel"
        }
      ],
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "时间",
          key: "signTime",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "签到点名称",
          key: "signName",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "签到地址",
          key: "signAddress",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "业代姓名",
          key: "workerName",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "业代手机",
          key: "phone",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "签到时间",
          key: "realSignTime",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "签到状态",
          key: "signStatus",
          width: 100,
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            if (params.row.signStatus == 0) {
              str = "待签到";
            } else if (params.row.signStatus == 1) {
              str = "正常签到";
            } else if (params.row.signStatus == 2) {
              str = "迟到签到";
            } else if (params.row.signStatus == 3) {
              str = "未签到";
            }
            return h("div", str);
          }
        },

        {
          title: "操作",
          width: 200,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                attrs: {
                  id: "bottonFather"
                }
              },
              [
                h(
                  "button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    attrs: {
                      id: "primary"
                    },
                    class: {
                      down: !params.row.selectStatus,
                      up: params.row.selectStatus,
                      "ivu-icon": true
                    },
                    on: {
                      click: () => {
                        this.$refs.table.changeExpend(params, this.showList);
                        params.row.selectStatus = !params.row.selectStatus;
                      }
                    }
                  },
                  "详情"
                ),
                h(
                  "button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    attrs: {
                      id: "success"
                    },
                    on: {
                      click: () => {
                        let {
                          signAddress,
                          phone,
                          workerName,
                          signLocateId,
                          signTime,
                          signName,
                          id,
                          workerId
                        } = params.row;
                        this.modifyData = {
                          signAddress,
                          phone,
                          workerName,
                          signLocateId,
                          signTime,
                          signName,
                          id,
                          workerId
                        };
                        this.modifyShow = true;
                      }
                    }
                  },
                  "修改"
                ),
                h(
                  "button",
                  {
                    style: {
                      padding: "3px 7px"
                    },
                    attrs: {
                      id: "fail"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "确定删除？",
                          onOk: () => {
                            let data = {
                              id: params.row.id
                            };
                            this.Global.doPost(
                              "cnySign/deleteCNYRecord.json",
                              data,
                              res => {
                                this.$Message.success("删除成功");
                                this.init();
                              }
                            );
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              ]
            );
          }
        }
      ],
      pageData: [],
      brandList: []
    };
  },
  components: {
    exportBtn,
    importBtn,
    myModal,
    hhTable,
    fieldNameDes
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a" },
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
  watch: {
    importExcelShow(val) {
      if (!val) {
        this.importData = {
          uploadText: "请选择上传文件"
        };
      }
    }
  },
  methods: {
    sureMethod() {
      let data = this.Global.JsonChange(this.modifyData);
      data["recordId"] = data["id"];
      data["id"] = data["signLocateId"];
      delete data["signLocateId"];
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("cnySign/updateCNYSignRecord.json", data, res => {
        this.$Message.success("修改成功");
        this.modifyShow = false;
        this.init();
      });
    },
    IDFilter() {
      this.Global.doPost(
        "cnySign/getSignLocateInfo.json",
        {
          id: this.modifyData.signLocateId
        },
        res => {
          this.modifyData.signName = res.signName;
          this.modifyData.signAddress = res.signAddress;
        }
      );
    },
    phoneFilter() {
      if (!this.Global.checkPhone(this.modifyData.phone)) {
        this.$Message.info("请输入正确的手机号");
        return false;
      }
      this.Global.doPost(
        "cnySign/getWorkerInfo.json",
        {
          phone: this.modifyData.phone
        },
        res => {
          this.modifyData.workerName = res.workerName;
        }
      );
    },
    dowland() {
      window.open(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/template/signRecord.xlsx"
      );
    },
    exportMethod() {
      if (!this.importData.loadFilePath) {
        this.$Message.info("请选择上传文件");
        return false;
      }
      this.Global.doPost(
        "cnySign/importCNYRecord.json",
        {
          loadFilePath: this.importData.loadFilePath
        },
        res => {
          this.$Message.success("导入成功");
          this.importExcelShow = false;
        }
      );
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.importData.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.importData.loadFilePath = url;
      }
    },
    goToAudit() {
      let query = {
        brandId: this.formData.brandId
      };
      this.$router.push({
        path: "/checkLocationAudit",
        query
      });
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
    },
    showDetail() {
      this.myModalisShow = true;
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      if (this.formData.queryTime.length && this.formData.queryTime[0]) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        );
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        );
      }
      if (this.formData.signTime.length && this.formData.signTime[0]) {
        data["signStartTime"] = this.Global.createTime(
          this.formData.signTime[0]
        );
        data["signEndTime"] = this.Global.createTime(this.formData.signTime[1]);
      }
      delete data["queryTime"];
      delete data["signTime"];
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("cnySign/querySignInfo.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        if (res.datalist && res.datalist.length) {
          res.datalist.forEach(item => {
            item.signTime = item.signTime
              ? this.Global.createTime(item.signTime)
              : "";
            item.realSignTime = item.realSignTime
              ? this.Global.createTime(item.realSignTime)
              : "";
          });
        }
        this.page = res.page;
        this.noneStatus = true;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      if (this.formData.queryTime.length && this.formData.queryTime[0]) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        );
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        );
      }
      if (this.formData.signTime.length && this.formData.signTime[0]) {
        data["signStartTime"] = this.Global.createTime(
          this.formData.signTime[0]
        );
        data["signEndTime"] = this.Global.createTime(this.formData.signTime[1]);
      }
      delete data["queryTime"];
      delete data["signTime"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl("cnySign/exportSignInfo.json", data);
      window.open(url);
    },

    changeValue(value) {
      this.oneLeverList = [];
      this.formData.oneLevel = "";
      if (!value) return;
      //查询一级组织数据
      queryOrganizationDictList({ brandId: value, parentId: 0 }).then(res => {
        if (res && res.status == 1) {
          this.oneLeverList = res.data;
        }
      });
    }
  }
};
</script>


