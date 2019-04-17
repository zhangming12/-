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
.form {
  position: relative;
  display: flex;
  .container {
    width: 17.5%;
    margin: auto;
    .w18 {
      width: 100%;
    }
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
      margin-left: 8px;
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
      // overflow-y: auto;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
        // .numColor {
        //   color: @primary-color;
        // }
      }
    }
  }
}
.ivu-input {
  text-align: center !important;
}
.upload-image-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
}
.upload-box {
  display: flex;
  margin-left: 20px;
  position: relative;
  .zhezhao {
    // background: red;
    cursor: not-allowed;
    width: 105px;
    height: 85px;
    position: absolute;
    top: -0;
    left: 0;
  }
  img {
    width: 105px;
    height: 85px;
  }
}
</style>
<template>
  <div id="Main">
      <!-- <h2 class="Title">奖品管理</h2> -->
      <div class="main-container">
        <div class="box" >
          <Form ref="form" @keyup.enter="submit" class="form" :model="formData" :label-width="10" :rules="rule">
              <div class="container">
                <div class="btn-left w18">
                  <Form-item  required>
                      <Input v-model.trim="formData.name" placeholder="折扣名称" />
                  </Form-item>
                </div>
                
              </div>
              <div class="btn-left w10">
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
              <span class="btn-left">此表共包含<span class='numColor'>{{pageNum}}</span>条数据</span>
              
              <addNewBtn class="btn-right ml20" @btnClick="showModal" />
              <!-- <exportBtn  class="btn-right" @btnClick="exportExcel" /> -->
            </div>
            <Table :columns="columns1" :data="pageData" disabled-hover></Table>
            
        </div>
        <div class="page-box">
          <div style="float: right;">
            <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
          </div>
        </div>
      </div>
      
      <myModal class="myModal"
          @close="closeModal"
          width="520"
          :modal="myModalisShow">
        <div slot="main" class="modal-main">
          <h3>{{type == 'modify' ? '修改折扣' :type == 'look' ? '查看折扣' :'新建折扣'}}</h3>
          <div class="modal-table">
              <Form ref="form" :model="formDatas" :label-width="88">
                  <Form-item label="品牌名称" required>
                      <Select :disabled="type == 'look'" v-model="formDatas.brandId" placeholder="品牌名称">
                        <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                      </Select>
                  </Form-item>
                  <Form-item label="折扣名称" required>
                      <Input :disabled="type == 'look'" v-model.trim="formDatas.name" placeholder="折扣名称" />
                  </Form-item>
                  <Form-item label="折扣分类" required>
                      <Select :disabled="type == 'look'" v-model="formDatas.type" placeholder="折扣分类">
                          <Option value="1">实物奖品</Option>
                          <Option value="2">现金红包</Option>
                          <Option value="0">电子劵</Option>
                          <Option value="9">谢谢惠顾</Option>
                      </Select>
                  </Form-item>
                  <div class="upload-image-box">
                      <p>
                          <span style="color:red;">*</span>
                          <span> 折扣图片</span>
                      </p>
                      <div class="upload-box">
                        <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
                            :data="upData" 
                            :before-upload="beforeUpload" 
                            :on-success="UploadLogoUrl" 
                            :show-upload-list="false"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError">
                            <img :src="formDatas.goodsUrl " alt="" v-if="formDatas.goodsUrl ">
                            <img src="../../assets/image/imgBg.png" alt="" v-else>
                            <div class="zhezhao" @click.stop.prevent="zhezhaoClick" v-if="type == 'look'"></div>
                        </Upload>
                      </div>
                  </div>
                  <div class="modal-fotter" style="text-align:center;">
                      <Button @click="closeModal" type="default">取消</Button>
                      <Button v-if="type != 'look'" @click="saveNewPresent" type="default">确定</Button>
                  </div>
              </Form>
          </div>
        </div>
      </myModal>
  </div>
</template>

<script>
import { queryDisPlayApplyAudit } from "@/api/activity-manage/display-apply-examine.js"; //api
import dataRange from "../../components/data-rang.vue";
import exportBtn from "../../components/Button/export-btn.vue";
import addNewBtn from "../../components/Button/addNew-btn.vue";
import myModal from "../../components/Modal/my-modal.vue";
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import {
  typeQueryActivityVOByGroupId, //根据品牌ID获取活动包名
  typeQueryActivityGroupVOByBrandId, //根据活动包名ID获取陈列活动列表
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
import { displayApplyDetail } from "@/api/activity-manage/display-activity-manage.js"; //api
import { getDisplayActivityListDoQuery } from "@/api/common.js";
export default {
  name: "present-management",
  data() {
    return {
      myModalisShow: false,
      formData: {
        brandId: "",
        name: ""
      },
      brandId: "",
      upData: upData,
      page: 1,
      pageNum: 0,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "折扣名称",
          key: "name",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "折扣类型",
          key: "type",
          minWidth: 150,
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            if (params.row.type == 1) {
              str = "实物奖品";
            } else if (params.row.type == 2) {
              str = "现金红包";
            } else if (params.row.type == 0) {
              str = "电子券";
            } else if (params.row.type == 9) {
              str = "谢谢参与";
            }
            return h("div", str);
          }
        },
        {
          title: "状态",
          minWidth: 100,
          key: "status",
          align: "center",
          tooltip: true,
          render: (h, parms) => {
            let str = "停用";
            if (parms.row.status == 1) {
              str = "启用";
            }
            return h(
              "div",
              {
                style: {
                  color: parms.row.status == 1 ? "green" : ""
                }
              },
              str
            );
          }
          //1 有
        },
        {
          title: "操作",
          key: "action",
          minWidth: 200,
          align: "center",
          render: (h, params) => {
            let buttonDom = [
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
                      this.setData(params.row, "look");
                      this.addNewPresent();
                    }
                  }
                },
                "详情"
              ),
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
                      this.setData(params.row, "modify");
                      this.id = params.row.id;
                      this.addNewPresent();
                    }
                  }
                },
                "修改"
              )
            ];
            if (params.row.status == 1) {
              buttonDom.push(
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
                          content: "确定停用该奖项？",
                          onOk: () => {
                            let data = {
                              id: params.row.id,
                              status: 0
                            };
                            this.stopOrStartGoods(data);
                          }
                        });
                      }
                    }
                  },
                  "停用"
                )
              );
            } else {
              buttonDom.push(
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
                          content: "确定启用该奖项？",
                          onOk: () => {
                            let data = {
                              id: params.row.id,
                              status: 1
                            };
                            this.stopOrStartGoods(data);
                          }
                        });
                      }
                    }
                  },
                  "启用"
                )
              );
            }
            return h("div", buttonDom);
          }
        }
      ],
      type: "",
      pageData: [],
      brandList: [],
      activityList: [],
      timeStr:"",
      formDatas: {
        brandId: "",
        type: "",
        name: "",
        goodsUrl: ""
      },
      logoUrl: ""
    };
  },
  components: { dataRange, exportBtn, myModal, addNewBtn },
  created() {
    this.brandId = this.$route.query.brandId;
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      // if (this.brandList && this.brandList.length) {
      //   this.formData.brandId = this.brandList[0].id;
      // }
    });
  },
  watch: {
    myModalisShow(val) {
      if (!val) {
        this.formDatas = {
          brandId: "",
          presentType: "",
          activityTag: "",
          logoUrl: ""
        };
      }
    }
  },
  methods: {
    zhezhaoClick() {
      return false;
    },
    showModal() {
      this.addNewPresent();
      this.type = "add";
    },
    stopOrStartGoods(data) {
      this.Global.doPost(
        "activityMaintain/doStopOrStartGoods.json",
        data,
        res => {
          this.$Message.success("成功");
          this.init();
        }
      );
    },
    setData(row, type) {
      this.type = type;
      this.formDatas = {
        brandId: row.brandId,
        name: row.name,
        type: row.type + "",
        goodsUrl: row.goodsUrl
      };
    },
    saveNewPresent() {
      let data = this.Global.JsonChange(this.formDatas);
      if (this.type == "modify") {
        data["id"] = this.id;
      }
      this.Global.doPost(
        "activityMaintain/doUpdateOrBuildGoods.json",
        data,
        res => {
          let str = this.type == "modify" ? "修改成功" : "保存成功";
          this.$Message.success(str);
          this.myModalisShow = false;
          this.init();
        }
      );
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    beforeUpload(res) {
      this.timeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.timeStr + res.name;
    },
    UploadLogoUrl(response, file, fileList) {
      //陈列图片
      this.formDatas.goodsUrl =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr + file.name;
      // console.log(this.formData.logoUrl);
    },
    closeModal() {
      this.myModalisShow = false;
    },
    addNewPresent() {
      this.myModalisShow = true;
    },
    formateTime(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd-hh");
    },
    submit(name) {
      // if (!this.formData.brandId) {
      //   this.$Message.error("折扣名称不能为空");
      //   return false;
      // }
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["brandId"] = this.brandId;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "activityMaintain/doSearchGoodsList.json",
        data,
        res => {
          console.log(res);
          this.pageData = res;
          // this.pageNum = res.items;
          // this.page = res.page;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "uploadReport/organizationUploadDetailExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


