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
        height: 30px;
        line-height: 30px;
        .numColor {
          color: @primary-color;
        }
      }
    }
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  .btn {
    cursor: pointer;
  }
}
.form {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: center;
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
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">停售日志</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称*">
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
                <Input placeholder="用户ID" clearable v-model.trim="formData.storeId"></Input>
              </Form-item>
            </div>

            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="客户编号" clearable v-model.trim="formData.joinCode"></Input>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <DatePicker
                  v-model="formData.queryTime"
                  type="daterange"
                  split-panels
                  placeholder="查询时间"
                  style="width: 200px"
                ></DatePicker>
              </Form-item>
            </div>
          </div>
          <div class="btn-left w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="submit">
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
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "stop-log",
  data() {
    return {
      noneStatus: false,
      formData: {
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME],
        brandId: ""
      },
      brandList: [],
      page: 1,
      pageNum: 0,
      pageSize: 10,
      typeList: {
        1: "停售",
        2: "激活"
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 80
        },
        {
          title: "用户ID",
          key: "storeId",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "客户编号",
          key: "joinCode",
          minWidth: 160,
          align: "center",
          tooltip: true
        },
        {
          title: "处理时间",
          key: "fourLevel",
          minWidth: 160,
          align: "center",
          tooltip: true,
          render: (h, parmas) => {
            let str = "";
            if (parmas.row.createTime) {
              str = this.Global.createTime(parmas.row.createTime);
            }
            return h("div", str);
          }
        },
        {
          title: "类型",
          key: "notifyFlag",
          minWidth: 150,
          align: "center",
          tooltip: true,
          render: (h, parmas) => {
            return h("div", this.typeList[parmas.row.notifyFlag]);
          }
        }
      ],
      pageData: []
    };
  },
  components: {
    exportBtn,
    hhTable,
    fieldNameDes
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
      }
    });
    this.init();
  },
  methods: {
    submit() {
      if (!this.formData.brandId) {
        this.$Message.error("请选择品牌");
        return false;
      }
      if (
        !this.formData.storeId &&
        !this.formData.joinCode &&
        !this.formData.queryTime[0]
      ) {
        this.$Message.error("请输入查询条件");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init(size, 10);
    },
    init() {
      this.noneStatus = true;
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      if (this.formData.queryTime[0]) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        );
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        ).replace("00:00:00", "24:00:00");
      }
      delete data["queryTime"];
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("tool/getStopStoreLog.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
      });
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      if (this.formData.queryTime[0]) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryTime[0]
        );
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryTime[1]
        ).replace("00:00:00", "24:00:00");
      }
      delete data["queryTime"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "tool/getStopStoreLogExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>