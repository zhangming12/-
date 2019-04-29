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
  .form {
    display: flex;
    justify-content: space-between;
  }
  .container {
    flex: 1;
  }
  .w18 {
    width: 20%;
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
</style>
<template>
  <div id="Main">
    <!-- <h2 class="Title">门店数据统计</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
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
                <Select v-model="formData.groupId" placeholder="活动包名">
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
                <Cascader
                  placeholder="区域"
                  :data="areaData"
                  @on-change="changeArea"
                  change-on-select
                ></Cascader>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Input placeholder="门店名称" v-model.trim="formData.storeName"/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input placeholder="手机号" v-model.trim="formData.phone"/>
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
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
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
import area from "@/config/china_code_data.js";
import exportBtn from "@/components/Button/export-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import config from "@/util/config.js";
import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "store-data-summary-YD-keepAlive",
  data() {
    return {
      noneStatus: false,
      formData: {},
      brandList: [],
      groupList: [],
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
          title: "省",
          key: "provinceName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "市",
          key: "cityName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "区",
          key: "areaName",
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
          title: "目前卡片",
          key: "currentCardsCount",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "累计合成",
          key: "totalCards",
          align: "center",
          minWidth: 120,
          tooltip: true
        }
      ],
      pageSize: 10,
      areaData: area,
      pageData: []
    };
  },
  components: {
    exportBtn,
    myModal,
    hhTable,
    fieldNameDes
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
    changeArea(value, selectedData) {
      let len = value.length;
      if (len) {
        if (len == 1) {
          this.formData.provinceId = value[0];
          this.formData.cityId = "";
        }
        if (len == 2) {
          this.formData.provinceId = "";
          this.formData.cityId = value[1];
        }
      } else {
        this.formData.cityId = "";
        this.formData.provinceId = "";
      }
      // console.log(selectedData);
    },
    //根据品牌查询活动包
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 1, scope: "a", brandId: value },
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
      var url = this.Global.getExportUrl(
        "collect/storeCollectDataExport.json",
        data
      );
      window.open(url);
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("collect/storeCollectData.json", data, res => {
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
      });
    }
  }
};
</script>


