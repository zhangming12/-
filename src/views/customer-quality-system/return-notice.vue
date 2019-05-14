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
                <data-range hour="00:00" v-model="formData.queryStartTime" placeholder="开始时间"/>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <data-range hour="24:00" v-model="formData.queryEndTime" placeholder="结束时间"/>
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
                    :value="item.brandId"
                    v-for="(item,index) in brandList"
                    :key="item.brandId"
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
                    :value="item.groupId"
                    v-for="(item,index) in groupList"
                    :key="item.groupId"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId">
                <Select v-model="formData.activityId" placeholder="子活动名称" clearable>
                  <Option
                    :value="item.activityId"
                    v-for="(item,index) in activityList"
                    :key="item.activityId"
                  >{{ item.activityName }}</Option>
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
import dataRange from "@/components/data-range/data-range.vue";
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
          title: "时间",
          key: "time",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "品牌",
          key: "brandName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "活动",
          key: "groupName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "项目",
          key: "activityName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "分组",
          key: "presentName",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "总数",
          key: "totalNum",
          align: "center",
          width: 120,
          tooltip: true
        },
        {
          title: "抽检率",
          key: "sampleRate",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "正确率",
          key: "correctPrecent",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "批量退回",
          key: "actualNum",
          align: "center",
          minWidth: 120,
          tooltip: true,
          render: (h, params) => {
            let tag = [
              h(
                "span",
                {
                  style: {
                    display: "inline"
                  }
                },
                params.row.actualNum
              ),
              h(
                "sup",
                {
                  style: {
                    color: "red",
                    display: params.row.status == 1 ? "inline" : "none"
                  }
                },
                "new"
              )
            ];
            return h("div", tag);
          }
        },
        {
          title: "退回时间",
          key: "operateTime",
          align: "center",
          minWidth: 120,
          tooltip: true
        },
        {
          title: "退回意见",
          key: "message",
          align: "center",
          minWidth: 120,
          tooltip: true
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
                    size: "small",
                    disabled: params.row.finish == 1 ? false : true
                  },
                  on: {
                    click: () => {
                      let {
                        startTime,
                        endTime,
                        brandId,
                        groupId,
                        activityId,
                        presentId,
                        teamId,
                        videoLogId
                      } = params.row;
                      let data = {
                        queryStartTime: startTime,
                        queryEndTime: endTime,
                        brandId,
                        groupId,
                        activityId,
                        presentId,
                        id: videoLogId
                      };
                      this.Global.deleteEmptyProperty(data);
                      this.Global.doPost(
                        "audit/querySecondAuditNum.json",
                        data,
                        res => {
                          if (res && res != 0) {
                            delete data["id"];
                            data["teamId"] = teamId;
                            this.$router.push({
                              path: "/twiceAudit",
                              query: data
                            });
                          } else {
                            params.row.finish = 0;
                            this.$Message.info("该条记录已处理");
                          }
                        }
                      );
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
      pageData: []
    };
  },
  components: {
    hhTable,
    fieldNameDes,
    dataRange
  },
  created() {
    this.queryBrand();
    this.init();
  },
  methods: {
    changeNotice() {
      this.$store.dispatch("getNoticeMsg");
    },
    queryBrand() {
      this.Global.doPostNoLoading("audit/queryBrandByTeam.json", "1", res => {
        this.brandList = res;
      });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      //查询活动包
      this.Global.doPostNoLoading(
        "audit/queryGroupByBrandAndTeam.json",
        value,
        res => {
          this.groupList = res;
        }
      );
    },
    getActivityList(val) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!val) return;
      //查询活动
      this.Global.doPostNoLoading(
        "audit/queryActivityByBrandAndTeam.json",
        val,
        res => {
          this.activityList = res;
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
      data["checkType"] = 2;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("audit/returnNotice.json", data, res => {
        this.noneStatus = true;
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        res.datalist.map(item => {
          item.time = `${item.startTime}至${item.endTime}`;
          item.operateTime = this.Global.createTime(item.operateTime);
        });
        this.changeNotice();
      });
    }
  }
};
</script>