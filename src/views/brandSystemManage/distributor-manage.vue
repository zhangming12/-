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
    <!-- <h2 class="Title">经销商管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form
          ref="form"
          @keyup.enter="submit"
          class="form"
          :model="formData"
          :label-width="10"
          :rules="rule"
        >
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <!-- <div class="btn-left w18">
                  <Form-item  required>
                    <Select v-model="formData.brandId" placeholder="经销商名称" @on-change="queryDistributorList">
                        <Option :value="item.id" v-for="(item,index) in distributorList" :key="index">{{ item.distributor }}</Option>
                    </Select>
                  </Form-item>
            </div>-->
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
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{ pageNum }}</span>条数据
          </span>

          <addNewBtn class="btn-right ml20" @btnClick="showModal"/>
          <!-- <exportBtn  class="btn-right" @btnClick="exportExcel" /> -->
        </div>
        <!-- <Table :columns="columns1" :data="pageData" disabled-hover></Table> -->
        <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus"></hhTable>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>

    <myModal class="myModal" @close="closeModal" width="520" :modal="myModalisShow">
      <div slot="main" class="modal-main">
        <h3>{{type == 'modify' ? '修改经销商' :type == 'look' ? '查看经销商' :'新建经销商'}}</h3>
        <div class="modal-table">
          <Form ref="form" :model="formDatas" :label-width="88">
            <Form-item label="品牌名称" required>
              <Select
                :disabled="type != 'add' "
                v-model="formDatas.brandId"
                placeholder="品牌名称"
                @on-change="getBrandName"
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="经销商名称" required>
              <Input
                :disabled="type == 'look'"
                v-model.trim="formDatas.merchantName"
                placeholder="经销商名称"
              />
            </Form-item>
            <Form-item label="经销商描述" required>
              <Input
                :disabled="type == 'look'"
                v-model.trim="formDatas.summary"
                placeholder="经销商描述"
              />
            </Form-item>
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
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryOrganizationDictList //查询四级组织数据
} from "@/api/common.js";
export default {
  name: "distributor-manage-keepAlive",
  data() {
    return {
      myModalisShow: false,
      formData: {
        brandId: ""
      },
      distributorList: [],
      brandList: [],
      brandId: "",
      noneStatus: false,
      upData: upData,
      page: 1,
      pageNum: 0,
      pageSize: 10,
      rule: {},
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },
        {
          title: "经销商ID",
          key: "id",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "经销商名称",
          key: "merchantName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },

        {
          title: "经销商描述",
          key: "summary",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "品牌名称",
          key: "brandName",
          minWidth: 160,
          align: "center",
          tooltip: true
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
                      this.setData(params.row, "modify");
                      this.formDatas.brandName = params.row.brandName;
                      this.formDatas.brandId = params.row.brandId;
                      this.formDatas.merchantName = params.row.merchantName;
                      this.formDatas.summary = params.row.summary;
                      this.formDatas.id = params.row.id;
                      this.addNewPresent();
                    }
                  }
                },
                "修改"
              )
            ];
            return h("div", buttonDom);
          }
        }
      ],
      type: "",
      pageData: [],
      brandList: [],
      activityList: [],
      formDatas: {
        brandId: "",
        brandName: "",
        merchantName: "",
        summary: "",
        id: ""
      },
      logoUrl: ""
    };
  },
  components: { dataRange, exportBtn, myModal, addNewBtn, hhTable },
  created() {
    this.Global.doPostNoLoading("condition/queryAllBrands.json", "", res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        // this.formData.brandId = this.brandList[0].id;
        this.init();
      }
    });
  },
  watch: {
    myModalisShow(val) {
      if (!val) {
        this.formDatas = {
          brandId: "",
          brandName: "",
          summary: "",
          merchantName: ""
        };
      }
    }
  },
  methods: {
    getBrandName(val) {
      this.brandList.forEach(item => {
        if (item.id == val) {
          this.formDatas.brandName = item.brandName;
        }
      });
    },
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
      if (!this.formDatas.brandId) {
        this.$Message.error("品牌不能为空");
        return false;
      }
      if (!this.formDatas.merchantName) {
        this.$Message.error("经销商名称不能为空");
        return false;
      }

      if (!this.formDatas.summary) {
        this.$Message.error("经销商描述不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formDatas);
      this.Global.deleteEmptyProperty(data);
      if (this.type == "modify") {
        delete data["type"];
        this.Global.doPost("dealers/doUpdate.json", data, res => {
          let str = "修改成功";
          this.$Message.success(str);
          this.myModalisShow = false;
          this.init();
        });
      } else {
        this.Global.doPost("dealers/doSave.json", data, res => {
          let str = "保存成功";
          this.$Message.success(str);
          this.myModalisShow = false;
          this.init();
        });
      }
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    beforeUpload(res) {
      this.upData["key"] = "ecuda/image/" + res.name;
    },
    UploadLogoUrl(response, file, fileList) {
      //陈列图片
      this.formDatas.goodsUrl =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + file.name;
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
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init(currentPage, pageSize) {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("dealers/doQueryWithPage.json", data, res => {
        //   console.log(res);
        this.pageData = res.datalist;
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
      });
    },
    queryDistributorList(val) {
      this.Global.doPost("dealers/doQueryMerchantByBrandId.json", val, res => {
        Object.entries(res).forEach(item => {
          this.distributorList.push({ id: item[0], distributor: item[1] });
        });
      });
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


