<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
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
  .btn {
    float: right;
  }
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

.ivu-form .ivu-form-item:nth-child(1) {
  width: 200px;
}

.ivu-modal-footer {
  border: none !important;
}
.container {
  width: 100%;
  height: 90px;
  overflow: hidden;
}

#List {
  overflow: hidden;
  #upload {
    width: 90px;
    float: left;
    .add {
      width: 90px;
      height: 90px;
      border-radius: 5px;
      border: 1px dashed #495060;
      text-align: center;
      line-height: 90px;
    }
  }
  .imgList {
    margin-right: 10px;
    width: 90px;
    height: 90px;
    border-radius: 5px;
    border: 1px dashed #495060;
    display: table-cell;
    vertical-align: middle;
    float: left;
    position: relative;
    span {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 100;
      width: 20px;
      height: 20px;
      line-height: 20px;
      font-size: 18px;
      cursor: pointer;
    }
    img {
      display: block;
      width: 88px;
      height: 88px;
    }
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">功能菜单</h2> -->
    <div class="main-container">
      <div class="box" style="margin-top: 15px;overflow: hidden;">
        <div class="contentTop">
          <i-button @click="creatNewRole" type="info" class="btn">新建菜单</i-button>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <Modal v-model="creatNewMenuIsShow" class-name="vertical-center-modal">
      <Form :label-width="80">
        <FormItem label="菜单名称：">
          <Input
            :readonly="lookDetailisShow?true:false"
            placeholder="不超过四个字"
            style="width:100px;"
            type="text"
            v-model="creatNewRoleData.resName"
            :maxlength="4"
          ></Input>
        </FormItem>
        <FormItem label="功能简介：">
          <Input
            :readonly="lookDetailisShow?true:false"
            placeholder="请输入功能简介"
            v-model="creatNewRoleData.summary"
          ></Input>
        </FormItem>
        <FormItem label="角标类型：">
          <Radio-group v-model="creatNewRoleData.iconSign">
            <Radio :label="0" :disabled="lookDetailisShow?true:false">无</Radio>
            <Radio :label="1" :disabled="lookDetailisShow?true:false">小红点</Radio>
            <Radio :label="2" :disabled="lookDetailisShow?true:false">数字</Radio>
            <Radio :label="3" :disabled="lookDetailisShow?true:false">文字类型</Radio>
          </Radio-group>
        </FormItem>
        <FormItem label="菜单图标：">
          <div class="container">
            <div id="List">
              <div class="imgList" v-if="creatNewRoleData.resIcon">
                <img :src="creatNewRoleData.resIcon">
                <span v-if="!lookDetailisShow" @click="changeImgAgain">X</span>
              </div>
              <Upload
                action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                v-if="!lookDetailisShow"
                id="upload"
                :data="upData"
                :max-size="2048"
                :on-exceeded-size="handleMaxSize"
                :before-upload="beforeUpload"
                :on-success="successUpload"
                :show-upload-list="false"
                :format="['jpg','jpeg','png']"
                :on-format-error="handleFormatError"
              >
                <div class="add">
                  <Icon type="ios-cloud-upload" size="30"></Icon>
                </div>
              </Upload>
            </div>
            <div id="editorElem" style="text-align:left"></div>
          </div>
        </FormItem>
        <FormItem label="菜单URL：">
          <Input
            :readonly="lookDetailisShow?true:false"
            placeholder="菜单URL"
            v-model.trim="creatNewRoleData.resPage"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer" style="text-align:center;border-top:none;">
        <div v-if="!lookDetailisShow" style="text-align:center;border-top:none;">
          <i-button type="success" @click="cancel">取消</i-button>
          <i-button type="primary" @click="submit">确定</i-button>
        </div>
        <div v-if="lookDetailisShow" style="text-align:center;border-top:none;">
          <i-button type="success" @click="cancel">返回</i-button>
        </div>
      </div>
    </Modal>
    <Modal title="查看图片" v-model="visible">
      <img :src="src" v-if="visible" style="width: 100%">
    </Modal>
  </div>
</template>
<script>
import { doDelete } from "@/api/common.js";
import config from "@/util/config.js";
import PROJECT_CONFIG from "@/util/config.js";
import upData from "../../assets/js/upload.js";
export default {
  name: "function-menu-keepAlive",

  data() {
    return {
      timeStr: "",
      upData: upData,
      lookDetailisShow: false,
      updataIsShow: false,
      visible: false,
      src: "",
      creatNewMenuIsShow: false,
      creatNewRoleData: {
        resName: "", //菜单名称
        summary: "", //功能简介
        resIcon: "", //菜单按钮资源
        iconSign: "0", //角标类型
        resPage: ""
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "菜单名称",
          key: "resName",
          align: "center"
        },
        {
          title: "功能简介",
          key: "summary",
          align: "center"
        },
        {
          title: "图标",
          key: "resIcon",
          align: "center",
          render: (h, params) => {
            var tag = [
              h("img", {
                attrs: { src: params.row.resIcon },
                style: {
                  display: "block",
                  width: "20px",
                  height: "20px",
                  margin: "0 auto",
                  cursor: "pointer"
                },
                on: {
                  click: () => {
                    this.src = params.row.resIcon;
                    this.visible = true;
                  }
                }
              })
            ];
            return h("div", tag);
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
                      this.updataMeun(params);
                      this.menuId = params.row.id;
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
                        content: "确定删除该功能？",
                        onOk: () => {
                          this.userBlack(params.row.id);
                          this.init();
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
      pageSize: 10,
      pageNum: 0,
      menuId: ""
    };
  },
  created() {
    this.init();
  },
  watch: {
    creatNewMenuIsShow(curVal, oldVal) {
      if (!curVal) {
        this.resetData();

        this.menuId = "";
        setTimeout(() => {
          this.lookDetailisShow = false;
          this.updataIsShow = false;
        }, 500);
      }
    }
  },
  computed: {
    uploadList() {
      return this.$refs.upload ? this.$refs.upload.fileList : [];
    }
  },
  methods: {
    handleMaxSize(file) {
      this.$Notice.warning({
        title: "超出文件大小限制",
        desc: "文件 " + file.name + " 太大，不能超过 2M。"
      });
    },
    changeImgAgain() {
      this.creatNewRoleData.resIcon = "";
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    successUpload(response, file, fileList) {
      this.creatNewRoleData.resIcon =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr + file.name;
    },
    beforeUpload(res) {
      this.timeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.timeStr + res.name;
    },
    resetData() {
      this.creatNewRoleData = {
        resName: "", //菜单名称
        summary: "", //功能简介
        resIcon: "", //菜单按钮资源
        iconSign: "0", //角标类型
        resPage: "" //菜单url
      };
    },
    close() {
      this.creatNewRoleData.resIcon = "";
    },
    userBlack(id) {
      doDelete(id).then(res => {
        if (res && res.status == 1) {
          this.$Message.success("删除成功");
          this.init();
        }
      });
    },
    updataMeun(val) {
      this.creatNewMenuIsShow = true;
      this.updataIsShow = true;
      this.creatNewRoleData = {
        resName: val.row.resName,
        summary: val.row.summary,
        resIcon: val.row.resIcon,
        iconSign: val.row.iconSign,
        resPage: val.row.resPage
      };
    },
    lookDetail(val) {
      this.lookDetailisShow = true;
      this.creatNewMenuIsShow = true;
      this.creatNewRoleData = {
        resName: val.row.resName,
        summary: val.row.summary,
        resIcon: val.row.resIcon,
        iconSign: val.row.iconSign,
        resPage: val.row.resPage
      };
    },

    creatNewRole() {
      this.creatNewMenuIsShow = true;
    },
    cancel() {
      this.creatNewMenuIsShow = false;
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      let data = {};
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("resource/doQueryAll.json", {}, res => {
        this.pageData = res;
      });
    },
    submit() {
      if (!this.creatNewRoleData.resName) {
        this.$Message.error("菜单名称不能为空");
        return false;
      }

      let data = this.Global.JsonChange(this.creatNewRoleData);
      data["resType"] = "menu";

      data["resIcon"] = this.creatNewRoleData.resIcon;
      if (this.updataIsShow) {
        data["id"] = this.menuId;
        this.Global.doPost("resource/doUpdate.json", data, res => {
          this.creatNewMenuIsShow = false;
          this.init();
        });
      } else {
        this.Global.doPost("resource/doSave.json", data, res => {
          this.creatNewMenuIsShow = false;
          this.init();
        });
      }
    }
  }
};
</script>