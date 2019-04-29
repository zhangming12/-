// 退回通知
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
    .w18 {
      width: 20%;
    }
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
.table-box {
  padding: 0 10px;
  position: relative;
  .numColor {
    color: @primary-color;
  }
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
    <!-- <h2 class="Title">退回通知</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10" :rules="rule">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required>
                <DatePicker
                  style="display:block;"
                  type="date"
                  v-model="formData.queryStartTime"
                  placeholder="开始时间"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <DatePicker
                  style="display:block;"
                  type="date"
                  v-model="formData.queryEndTime"
                  placeholder="结束时间"
                ></DatePicker>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select
                  v-model="formData.brandId"
                  placeholder="品牌名称"
                  @on-change="changeValue"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="item.id"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动名称"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="item.id"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId">
                <Select v-model="formData.activityId" placeholder="项目名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
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
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
        <Button @click="changeNotice" type="primary">change</Button>
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
import { EDFAULT_THREE_AGOTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间

import hhTable from "@/components/table/table.vue";
import fieldNameDes from "@/components/field-name-description.vue";
export default {
  name: "return-notice-keepAlive",
  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_THREE_AGOTIME,
        queryEndTime: EDFAULT_ENDTIME
      },
      noneStatus: false,
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
          title: "操作人",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "品牌",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "活动",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "项目",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "分组",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "批量退回数",
          key: "userName",
          align: "center",
          width: 120,
          tooltip: true,
          render: (h, params) => {
            let tag = [
              h("span", [
                999999999,
                h(
                  "sup",
                  {
                    style: {
                      color: "red",
                      display: true ? "inline" : "none"
                    }
                  },
                  "new"
                )
              ])
            ];
            return h("div", tag);
          }
        },
        {
          title: "数量",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "退回时间",
          key: "userName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "退回意见",
          key: "result",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            let result =
              params.row.result == "success" ? "核销成功" : "核销失败";
            return h("div", result);
          }
        },
        {
          title: "操作",
          width: 100,
          align: "center",
          render: (h, params) => {
            let tag = [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  style: {
                    display: true ? "block" : "none"
                  },
                  on: {
                    click: () => {
                      let query = {};
                      this.$router.push({
                        path: "/twiceAudit",
                        query
                      });
                    }
                  }
                },
                "立即处理"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      brandList: [],
      groupList: [],
      activityList: [],
      pageSize: 10,
      pageData: [{ userName: "不到解放碑加班费教师的奋笔疾书办法" }]
    };
  },
  components: {
    hhTable,
    fieldNameDes
  },
  created() {
    this.queryBrand();
    this.init();
  },
  methods: {
    changeNotice() {
      // this.$store.dispatch("getNoticeMsg");
      let num = this.$store.state.noticeMsg;
      num++;
      this.$store.commit("setNoticeMsg", num);
    },
    //查询品牌
    queryBrand() {
      this.Global.doPostNoLoading(
        "condition/queryBrands.json",
        { date: 7, activityType: 3, scope: "a" },
        res => {
          this.brandList = [];
          Object.entries(res).forEach(item => {
            this.brandList.push({ id: Number(item[0]), brandName: item[1] });
          });
          // if (this.brandList && this.brandList.length) {
          //   this.formData.brandId = this.brandList[0].id;
          //   this.changeValue(this.formData.brandId);
          // }
        }
      );
    },
    //根据品牌获取活动
    changeValue(value) {
      this.groupList = [];
      this.$set(this.formData, "groupId", "");
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          // if (this.groupList && this.groupList.length) {
          //   this.formData.groupId = this.groupList[0].id;
          //   this.getActivityList(this.formData.groupId);
          // }
        }
      );
    },
    //根据活动获取项目
    getActivityList(value) {
      this.activityList = [];
      this.$set(this.formData, "activityId", "");
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
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
        "report/activityDailyExport.json",
        data
      );
      window.open(url);
    },
    init() {
      this.pageNum = 0;
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      if (this.formData.queryStartTime) {
        data["queryStartTime"] = this.Global.createTime(
          this.formData.queryStartTime
        );
      } else {
        delete data["queryStartTime"];
      }
      if (this.formData.queryEndTime) {
        data["queryEndTime"] = this.Global.createTime(
          this.formData.queryEndTime
        );
      } else {
        delete data["queryEndTime"];
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("verific/getVerificData.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>