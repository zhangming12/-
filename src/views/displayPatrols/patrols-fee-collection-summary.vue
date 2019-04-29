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
    width: 70%;

    .w18 {
      width: 25%;
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
</style>

<template>
	<div id="Main">
		<!-- <h2 class="Title">巡拍费用总汇总</h2> -->
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
                            <Form-item prop="brandId" required>
                               <Select v-model="formData.merchantId" placeholder="经销商" clearable>
                                    <Option :value="item.id" v-for="(item,index) in distributorList" :key="index">{{ item.merchantName }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item prop="groupId" required>
                                <Select v-model="formData.groupId" placeholder="活动名称*" clearable>
                                    <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item >
                                <DatePicker type="date" placeholder="统计截止日期" v-model="formData.queryEndTime"></DatePicker>
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
                    
                </div>
                <hhTable ref="table" :columns="columns" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
            
            </div>
            <div class="page-box">
                <div>
                    <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import config from "@/util/config.js";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import dataRange from "@/components/data-rang.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "patrols-fee-collection-summary-keepAlive",

  components: {
    dataRange,
    hhTable,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      groupList: [],
      exportExportData: {
        uploadText: "选择上传文件",
        brandId: "",
        loadFilePath: ""
      },
      exportExport: false,
      noneStatus: false,
      formData: {
        brabdId: ""
      },
      page: 1,
      pageNum: 0,
      showList: [
        {
          title: "辖区店数",
          key: "countStore"
        },
        {
          title: "关联员工数",
          key: "countSlave"
        },
        {
          title: "配送员数",
          key: "countUser"
        },
        {
          title: "不通过数",
          key: "countCheckNoThrough"
        },
        {
          title: "审核中数",
          key: "countCheckIng"
        },
        {
          title: "预估总折扣",
          key: "sumPresentAmount"
        },
        {
          title: "老板获得折扣",
          key: "sumMWinAmount"
        },
        {
          title: "老板待领折扣",
          key: "merchantWinAmount"
        },
        {
          title: "员工获得折扣",
          key: "sumWWinAmount"
        },
        {
          title: "员工待领折扣",
          key: "workerWinAmount"
        }
      ], // 展示更多的时候的数据
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "截止时间",
          key: "uploadTime",
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
          title: "活动名称",
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "参与门店数",
          key: "countPatrolStore",
          align: "center",
          tooltip: true
        },
        {
          title: "上传项目数",
          key: "countActivity",
          align: "center",
          tooltip: true
        },
        {
          title: "通过数",
          key: "countCheckThrough",
          align: "center",
          tooltip: true
        },
        {
          title: "实际总折扣",
          key: "sumWinAmount",
          align: "center",
          tooltip: true
        },
        {
          title: "老板已领折扣",
          key: "mReceiveWinAmount",
          align: "center",
          tooltip: true
        },
        {
          title: "员工已领折扣",
          key: "wReceiveWinAmount",
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          width: 100,
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
                        // if (params.row.flag) {
                        this.$refs.table.changeExpend(params, this.showList);
                        params.row.selectStatus = !params.row.selectStatus;
                        // } else {
                        //   //第一次请求
                        //   this.Global.doPost(
                        //     "report/getUserInfo.json",
                        //     {
                        //       userType: "B",
                        //       storeId: params.row.storeId
                        //     },
                        //     res => {
                        //       this.$refs.table.changeExpend(
                        //         params,
                        //         this.showList
                        //       );
                        //       params.row.flag = true;

                        //       try {
                        //         params.row.nickName = res[0].nickName;
                        //         params.row.recPhone = res[0].recPhone;
                        //       } catch (error) {
                        //         console.error(error);
                        //       }
                        //       params.row.selectStatus = !params.row
                        //         .selectStatus;
                        //     }
                        //   );
                        // }
                      }
                    }
                  },
                  "详情"
                )
              ]
            );
          }
        }
      ],
      importUrl: config.uploadWorkerExcel,
      pageData: [],
      brandList: [],
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
  watch: {},
  methods: {
    changeValue(value) {
      this.distributorList = [];
      this.formData.merchantId = "";
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      //查询经销商数据
      this.getDistributorList(value);
      //查询活动数据
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
        }
      );
    },
    //查询经销商数据
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
      if (this.formData.queryEndTime) {
        data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      }
      this.Global.doPost(
        "patrolCost/patrolCostSummaryByAll.json",
        data,
        res => {
          this.pageData = res.datalist;
          res.datalist.forEach(item => {
            item.uploadTime = this.Global.createTime(item.uploadTime);
            // item.flag = false;
          });
          this.pageNum = res.items;
          this.page = res.page;
          this.noneStatus = true;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "position/positionSalesRouteExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>