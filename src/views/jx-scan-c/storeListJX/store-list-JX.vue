<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  position: relative;
  min-height: 100%;
  background: #ffffff;
  padding-bottom: 60px;
  .form {
    display: flex;
    justify-content: space-between;
    .w18 {
      width: 20%;
    }
  }
  .container {
    flex: 1;
  }
  .w10 {
    width: 12.5%;
  }
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
.template {
  cursor: pointer;
  margin-right: 10px;
  &:hover {
    color: @primary-color;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">门店列表</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="客户编号" v-model.trim="formData.joinCode" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="门店名称" v-model.trim="formData.storeName" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="店主姓名" v-model.trim="formData.name" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="手机号" v-model.trim="formData.phone" clearable/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.isQrcode" placeholder="状态" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in statusList"
                    :key="item.id"
                  >{{ item.name }}</Option>
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
          <!-- <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>-->

          <importBtn class="btn-right" @btnClick="importShow = true"/>
          <span class="btn-right template" style="cursor:pointer;" @click="dowland">门店表格模板</span>

          <addNewBtn class="btn-left" @btnClick="addStore" title="新增门店"/>
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
    <!-- 导入 -->
    <myModal class="myModal" @close="closeModal" :modal="importShow">
      <div slot="main" class="modal-main">
        <h3>导入</h3>
        <div class="modal-table">
          <div style="overflow:hidden;">
            <!-- <div class="demo" style="float:left;margin:2px 6px 0 0;" @click="dowland">
              <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
              <span>下载模版</span>
            </div>-->
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
    <Modal title="查看图片" v-model="visible">
      <img :src="src" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>

<script>
import importBtn from "@/components/Button/import-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "securities-list-JX-keepAlive",
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let path = from.path;
      if (path == "/addStoreJX") {
        vm.init();
      }
    });
  },
  data() {
    return {
      statusList: [
        {
          name: "已参与",
          id: "1"
        },
        {
          name: "未参与",
          id: "2"
        }
      ], //状态列表
      noneStatus: false,
      importShow: false,
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
      formData: {},
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [
        // {
        //   title: "序号",
        //   type: "index",
        //   align: "center",
        //   width: 70
        // },
        {
          title: "拜访路线",
          key: "route",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "办事处",
          key: "office",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "区域",
          key: "areaName",
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
          title: "门店名称",
          key: "storeName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "联系人",
          key: "name",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "手机号",
          key: "phone",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "地址",
          key: "address",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "参与活动",
          key: "time",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            let str = params.row.userId ? "已参与" : "未参与";
            return h("div", str);
          }
        },
        {
          title: "门头照",
          key: "storeImage",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            let tag = [];
            if (params.row.storeImage) {
              tag.push(
                h("img", {
                  attrs: { src: params.row.storeImage },
                  style: {
                    display: "block",
                    width: "20px",
                    height: "20px",
                    margin: "0 auto",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      this.src = params.row.storeImage;
                      this.visible = true;
                    }
                  }
                })
              );
            }

            return h("div", tag);
          }
        },
        {
          title: "定位信息",
          key: "bindAddress",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "操作",
          key: "option",
          align: "center",
          width: 150,
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
                      // this.modify(params.row);
                      let query = {
                        type: "modify",
                        phone: params.row.phone,
                        route: params.row.route,
                        office: params.row.office,
                        areaName: params.row.areaName,
                        joinCode: params.row.joinCode,
                        storeName: params.row.storeName,
                        name: params.row.name,
                        address: params.row.address,
                        storeId: params.row.storeId
                      };
                      this.$router.push({
                        path: "/addStoreJX",
                        query
                      });
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
                    type: "text",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let data = {
                        storeId: params.row.storeId,
                        status: params.row.status == 1 ? 2 : 1
                      };
                      this.Global.doPost(
                        "storeZjtg/storeJXCActivitySetting.json",
                        data,
                        res => {
                          this.$Message.success("操作成功");
                          this.init();
                        }
                      );
                    }
                  }
                },
                params.row.status == 1 ? "停用" : "启用"
              )
            );
            return h("div", tag);
          }
        }
      ],
      uploadText: "选择上传文件",
      pageSize: 10,
      src: "",
      visible: false,
      pageData: [],
      uploadUrl: "",
      modifyShow: false,
      url: config.uploadWorkerExcel,
      importModelData: {
        brandId: ""
      }
    };
  },
  components: {
    exportBtn,
    myModal,
    importBtn,
    addNewBtn,
    hhTable,
    fieldNameDes
  },
  created() {},
  methods: {
    addStore() {
      let query = {
        type: "add"
      };
      this.$router.push({
        path: "/addStoreJX",
        query
      });
    },
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
    dowland() {
      // 导入模板
      window.open(
        "http://hbrand.oss-cn-hangzhou.aliyuncs.com/template/jxCActivityStore.xlsx"
      );
    },
    uploadExcel() {
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }

      let data = {
        loadFilePath: this.uploadUrl
      };
      this.Global.doPost("storeZjtg/storeJXCActivityImport.json", data, () => {
        this.$Message.success("导入成功");
        this.init();
        this.importShow = false;
        this.uploadText = "上传参与业代名单";
      });
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
    closeModal() {
      this.modifyShow = false;
      this.importShow = false;
    },
    submit(name) {
      // if (!this.formData.brandId) {
      //   this.$Message.error("品牌不能为空");
      //   return false;
      // }
      // if (!this.formData.groupId) {
      //   this.$Message.error("活动包名不能为空");
      //   return false;
      // }
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
      this.Global.doPost(
        "storeZjtg/doQueryWithPageByJXCActivity.json",
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
    }
  }
};
</script>


