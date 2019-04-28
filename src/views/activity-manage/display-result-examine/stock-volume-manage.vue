
<style lang="less" scoped>
@import "../../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
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
    margin-left: 10px;
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
.showRadio {
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  margin-left: -150px;
  margin-top: -250px;
  // border: 1px solid black;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  padding: 20px;
  background: #f5f7f9;
  border-radius: 5px;
  .close {
    position: absolute;
    top: 0px;
    right: 0px;
    cursor: pointer;
    display: block;
    width: 20px;
    height: 20px;
    font-size: 20px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动进货量管理</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="85">
        <Row>
          <Col span="7">
            <Form-item label="时间:">
              <Row>
                <Col span="11">
                  <Form-item>
                    <Date-picker type="date" placeholder="选择日期" v-model="formData.queryStartTime"></Date-picker>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align:center">至</Col>
                <Col span="11">
                  <Form-item>
                    <Date-picker type="date" placeholder="选择日期" v-model="formData.queryEndTime"></Date-picker>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="活动名称:" prop="activityId">
              <Select
                v-model="formData.activityId"
                placeholder="请选择"
                @on-change="getpresentList"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId">
              <Select
                v-model="formData.brandId"
                placeholder="请选择"
                @on-change="changeValue"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="分组名称:" prop="presentId">
              <Select v-model="formData.presentId" placeholder="请选择" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in presentNameList"
                  :key="index"
                >{{ item.activityTag }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="活动包名:" prop="groupId">
              <Select
                v-model="formData.groupId"
                placeholder="请选择"
                @on-change="getActivityList"
                clearable
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in groupList"
                  :key="index"
                >{{ item.groupName }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px">
            <div class="searchBox">
              <Button @click="submit()" class="btn-search search_btn" type="primary">查询</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;overflow: hidden;">
      <div class="contentTop">
        <i-button class="btn" @click="exportExcel" type="info" style="width:120px;">导出客户名单</i-button>
        <i-button class="btn" @click="exportExcel" type="error">导出</i-button>
        <i-button @click="uploadExcel" class="btn" type="success">导入</i-button>
        <i-button @click="uploadExcel" class="btn" type="primary">上传数据</i-button>
        <i-button
          class="btn"
          @click="showUpload"
          type="info"
          style="float:left;width:120px;"
        >进货量更新推送</i-button>

        <div class="demo" @click="dowland">
          <Icon type="ios-paper-outline" size="14" color="#ff8a34"></Icon>
          <span>下载模版</span>
        </div>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
    </div>
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
      </div>
    </div>
    <Modal v-model="updatePush">
      <h3 slot="header" style="text-align:center;">进货量更新推送</h3>
      <Form :label-width="85">
        <Form-item label="品牌名称:" prop="brandId">
          <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" clearable>
            <Option
              :value="item.id"
              v-for="(item,index) in brandList"
              :key="index"
            >{{ item.brandName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="活动包名:" prop="groupId">
          <Select
            v-model="formData.groupId"
            placeholder="请选择"
            @on-change="getActivityList"
            clearable
          >
            <Option
              :value="item.id"
              v-for="(item,index) in groupList"
              :key="index"
            >{{ item.groupName }}</Option>
          </Select>
        </Form-item>
        <Form-item label="进货量更新时间:" prop :label-width="120">
          <span></span>
        </Form-item>
      </Form>
      <div slot="footer" style="text-align:center">
        <i-button type="error" @click="close">取消</i-button>
        <i-button type="success" @click>发送</i-button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId, //根据活动包名ID获取陈列活动列表
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "stock-volume-manage-keepAlive",
  data() {
    return {
      uploadText: "",
      url: "",
      showQuery: false,
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        presentName: "", //分组名称
        presentId: "", //分组id
        groupId: "", //活动包名ID
        brandId: "",
        activityId: ""
      },
      updatePush: false,
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center",
          width: 120
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 120
        },
        {
          title: "活动包名",
          key: "groupName",
          align: "center",
          width: 120
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center",
          width: 120
        },
        {
          title: "分组名称",
          key: "presentName",
          align: "center",
          width: 120
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          width: 120
        },
        {
          title: "店铺名称",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "产品名称",
          key: "productName",
          align: "center",
          width: 120
        },
        {
          title: "进货量",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "进货标准",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "达标情况",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "进货周期",
          key: "storeName",
          align: "center",
          width: 120
        },
        {
          title: "上传时间",
          key: "createTime",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", this.formatYearMonth(params.row.createTime));
          }
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [], //活动
      presentNameList: [] //分组
    };
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
  },
  mounted() {},
  methods: {
    dowland() {},
    handleError() {},
    handleSuccess() {},
    uploadExcel() {},
    // closeAlertBox(e) {
    //   if (e.target.className == "showRadio" || e.target.className == "close") {
    //     return false;
    //   }
    //   this.updatePush = false;
    // },
    close() {
      this.updatePush = false;
    },
    changeValue(value) {
      this.groupList = [];
      queryActivityGroupVOByBrandId(value).then(res => {
        if (res && res.status == 1) {
          this.groupList = res.data;
        }
      });
    },
    getActivityList(value) {
      this.activityList = [];
      queryActivityVOByGroupId(value).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data;
        }
      });
    },
    getpresentList(value) {
      this.presentNameList = [];
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd hh:mm:ss");
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(
        this.formData.queryEndTime.getTime() + (24 * 3600 * 1000 - 1000)
      );
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "displayYxtg/querySuperviseLogListExport.json",
        data
      );
      window.open(url);
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      //结束时间默认为当天的23:59:59
      data["queryEndTime"] = this.Global.createTime(
        this.formData.queryEndTime.getTime() + (24 * 3600 * 1000 - 1000)
      );
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost(
        "displayYxtg/querySuperviseLogList.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
        }
      );
    },
    showUpload() {
      this.updatePush = true;
    }
  }
};
</script>