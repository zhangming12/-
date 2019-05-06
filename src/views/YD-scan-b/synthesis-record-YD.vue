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
    <!-- <h2 class="Title">合成记录</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="item.id"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.groupId" placeholder="活动名">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="item.id"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range placeholder="筛选开始时间" hour="00:00" v-model="formData.queryStartTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="24:00" placeholder="筛选结束时间" v-model="formData.queryEndTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="门店名称" v-model.trim="formData.storeName"/>
              </Form-item>
            </div>
            <div class="btn-right w10">
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
                <Form-item>
                  <Input placeholder="手机号" v-model.trim="formData.phone"/>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="table-box box">
        <div class="contentTop">
          <span class="btn-left">
            累计合成:
            <span class="numColor">{{pageNum}}</span>
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
//领取状态
const synthesisStatus = {
  "0": "未领取",
  "1": "已领取",
  "2": "已领取",
  "3": "未领取"
};
import dataRange from "@/components/data-range/data-range.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import area from "@/config/china_code_data.js";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "card-collecting-record-YD-keepAlive",
  data() {
    return {
      showQuery: false,
      noneStatus: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME
      },
      page: 1,
      pageNum: 0,
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 70
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "活动名称",
          key: "groupName",
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
          title: "手机号",
          key: "phone",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "店主姓名",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "合成时间",
          key: "makeTime",
          align: "center",
          width: 160,
          tooltip: true,
          render: (h, params) => {
            if (params.row.makeTime)
              return h("div", this.Global.createTime(params.row.makeTime));
          }
        },
        {
          title: "是否领取",
          key: "status",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            return h("div", synthesisStatus[params.row.status]);
          }
        }
      ],
      pageSize: 10,
      areaData: area,
      pageData: [],
      brandList: [],
      groupList: []
    };
  },
  components: {
    exportBtn,
    myModal,
    hhTable,
    fieldNameDes,
    dataRange
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { activityType: 7 },
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
    //根据品牌查询活动包
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, scope: "a", activityType: 7, brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
          }
        }
      );
    },
    submit(name) {
      if (!this.formData.brandId) {
        this.$Message.info("请选择品牌");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.info("请选择活动");
        return false;
      }
      if (!this.formData.queryStartTime || !this.formData.queryEndTime) {
        this.$Message.info("请选择查询时间");
        return false;
      }
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl("collect/makeCardsExport.json", data);
      window.open(url);
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("collect/makeCardsByStore.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>