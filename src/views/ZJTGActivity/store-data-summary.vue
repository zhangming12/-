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
      .iamge {
        display: block;
        width: 580px;
        height: 400px;
        //   margin:10px;
      }
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
.form {
  position: relative;
  display: flex;
  // justify-content: center;
  .container {
    width: 87.5%;
    .w18 {
      width: 20%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">二维码列表</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入门店名称" v-model.trim="formData.storeName" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.type" placeholder="类型" clearable>
                  <Option value="1">纤维+</Option>
                  <Option value="2">植场新人</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入起始数量" v-model.trim="formData.initAmount" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="请输入剩余瓶数" v-model.number="formData.leftAmount" clearable></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <DatePicker
                  type="daterange"
                  v-model="formData.queryTime"
                  split-panels
                  placeholder="参与活动时间"
                  style="display:block;"
                ></DatePicker>
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
          <span class="btn-left">
            共查询到
            <span class="numColor">{{ pageNum }}</span> 条数据
          </span>
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
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
  </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import config from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "store-data-summary-keepAlive",
  data() {
    return {
      options: {
        disabledDate(date) {
          const disabledDay = date.getTime();
          return disabledDay > new Date().getTime();
        }
      },
      formData: {
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME]
      },
      page: 1,
      pageNum: 0,
      noneStatus: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          minWidth: 70,
          align: "center"
        },

        {
          title: "门店名称",
          key: "storeName",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "纤维+",
          key: "initAmount",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "已兑换瓶数",
          key: "recAmount",
          minWidth: 140,
          align: "center"
        },
        {
          title: "活动剩余瓶数",
          key: "leftAmount",
          minWidth: 140,
          align: "center"
        },
        {
          title: "植场新人",
          key: "initTwoAmount",
          minWidth: 140,
          align: "center"
        },
        {
          title: "已兑换瓶数",
          key: "recTwoAmount",
          minWidth: 140,
          align: "center"
        },
        {
          title: "活动剩余瓶数",
          key: "leftTwoAmount",
          minWidth: 140,
          align: "center"
        },
        {
          title: "兑换人数",
          key: "countUser",
          minWidth: 140,
          align: "center"
        },
        {
          title: "门店参与时间",
          key: "bindTime",
          width: 150,
          align: "center",
          tooltip: true
        }
      ],
      pageData: [],
      pageSize: 10
    };
  },
  components: {
    exportBtn,
    myModal,
    hhTable,
    fieldNameDes
  },
  methods: {
    submit(name) {
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
      if (!this.formData.type) {
        delete data["initAmount"];
        delete data["leftAmount"];
      } else {
        if (this.formData.type == 2) {
          data["initTwoAmount"] = data["initAmount"];
          data["leftTwoAmount"] = data["leftAmount"];
          delete data["initAmount"];
          delete data["leftAmount"];
        }
      }
      if (this.formData.queryTime[0]) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        );
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        );
      }
      delete data["queryTime"];
      delete data["type"];
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "storeZjtg/queryWithPageByStoreDataCount.json",
        data,
        res => {
          this.pageNum = res.items;
          this.pageData = res.datalist;
          if (res.datalist && res.datalist.length) {
            res.datalist.forEach(item => {
              item.bindTime = item.bindTime
                ? this.Global.createTime(item.bindTime)
                : "";
            });
          }

          this.page = res.page;
          this.noneStatus = true;
        }
      );
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      if (!this.formData.type) {
        delete data["initAmount"];
        delete data["leftAmount"];
      } else {
        if (this.formData.type == 2) {
          data["initTwoAmount"] = data["initAmount"];
          data["leftTwoAmount"] = data["leftAmount"];
          delete data["initAmount"];
          delete data["leftAmount"];
        }
      }
      if (this.formData.queryTime[0]) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        );
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        );
      }
      delete data["queryTime"];
      delete data["type"];
      var url = this.Global.getExportUrl(
        "storeZjtg/storeDataCountExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


