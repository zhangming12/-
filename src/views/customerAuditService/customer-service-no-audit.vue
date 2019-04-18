<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
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

.vertical-center-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .ivu-modal {
    top: 0;
  }
  video {
    position: relative;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
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
.numberInput {
  border: 1px solid #dddee1;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 0 0 7px;
  text-align: left;
  outline: 0;
  -moz-appearance: textfield;
  color: #666;
  border-radius: 4px;
  transition: all 0.2s linear;
}
.tableBox {
  position: relative;
  min-height: 400px;
  padding: 10px;
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
    .auditBox {
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 32px;

      .left,
      .right {
        border: 1px solid @primary-color;
        padding: 0 20px;
        cursor: pointer;
        &.active {
          background-color: @primary-color;
        }
      }
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
    <!-- <h2 class="Title">客服陈列审核团控-待审核</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left auditBox w18">
              <div class="left" :class="{'active': tNoAudit}" @click="auditClick('tNoAudit')">超时</div>

              <div class="right" :class="{'active': noAudit}" @click="auditClick('noAudit')">待审</div>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId" required>
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId" required>
                <Select v-model="formData.groupId" placeholder="活动名称*" @on-change="getActivityList">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId" required>
                <Select v-model="formData.activityId" placeholder="子活动名" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
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
      <div class="box tableBox">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span> 条数据
          </span>
          <!-- <addNewBtn  class="btn-right" @btnClick="newBuildModel=true;type='add'" /> -->
        </div>
        <hhTable :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div>
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import hhTable from "@/components/table/table.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "customer-service-no-audit-keepAlive",
  data() {
    return {
      routerList: {
        singleFirst: "/firstInstanceDisplaySingle",
        singleTwo: "/auditReviewSingle",
        doubleFirst: "/firstInstanceDisplayDouble",
        doubleTwo: "/auditReviewDouble",
        xpFirst: "/dealerDisplayAuditPatrols",
        xpSecond: "/dealerDisplayFinalAuditPatrols"
      },
      noAudit: false,
      tNoAudit: true,
      noneStatus: false,
      formData: {
        groupId: "", //活动包名ID
        brandId: "",
        activityId: ""
      },
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          //   width: 60,
          align: "center",
          tooltip: true
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          tooltip: true
          //   width: 120
        },
        {
          title: "活动名",
          key: "groupName",
          align: "center",
          tooltip: true
          //   width: 120
        },
        {
          title: "项目名",
          key: "activityName",
          align: "center",
          tooltip: true
          //   width: 120
        },
        {
          title: "上传周期",
          key: "proid",
          align: "center",
          tooltip: true
          //   width: 120
        },
        {
          title: "分值",
          key: "score",
          align: "center",
          tooltip: true
          //   width: 120
        },
        {
          title: "状态",
          key: "generalField",
          align: "center",
          tooltip: true
        },
        {
          title: "上传时间",
          key: "uploadTime",
          align: "center",
          tooltip: true,
          width: 160,
          render: (h, parmas) => {
            if (parmas.row.uploadTime) {
              return h(
                "div",
                parmas.row.uploadTime.substring(
                  parmas.row.uploadTime.length - 14
                )
              );
            }
            return "";
          }
        },
        {
          title: "数量",
          key: "recordCount",
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            var tag = [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let query = {
                        brandId: params.row.brandId,
                        groupId: params.row.groupId,
                        activityId: params.row.activityId
                      };
                      let flag = "";
                      if (params.row.uploadChannel == "Default") {
                        //dan
                        if (params.row.isTOAudit == 2) {
                          //   chayi
                          flag = "singleTwo";
                        } else {
                          //chushen
                          flag = "singleFirst";
                        }
                      } else if (params.row.uploadChannel == "XP") {
                        //巡拍活动
                        if (params.row.isTOAudit == 2) {
                          //巡拍差异
                          flag = "xpSecond";
                        } else {
                          //巡拍初审
                          flag = "xpFirst";
                        }
                      } else {
                        //shuang

                        if (params.row.isTOAudit == 2) {
                          //   chayi
                          flag = "doubleTwo";
                        } else {
                          //chushen
                          flag = "doubleFirst";
                        }
                      }
                      this.$router.push({
                        path: this.routerList[flag],
                        query
                      });
                    }
                  }
                },
                "去审核"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      rule: {
        useMemoCode: [{ required: true, message: "请选择识别明码" }],
        qrUseType: [{ required: true, message: "请选择投放终端" }],
        qrLen: [{ required: true, message: "码长度不能为空" }],
        flowingNum: [{ required: true, message: "请选择流水串号" }],
        startNum: [{ required: true, message: "码包库位不能为空" }],
        endNum: [{ required: true, message: "码包库位不能为空" }]
      },
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [] //活动
    };
  },
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 7, activityTypes: [3, 6], scope: "a" },
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
  components: {
    hhTable,
    addNewBtn
  },
  watch: {},
  methods: {
    auditClick(val) {
      this[val] = !this[val];
      if (val == "noAudit") {
        this.tNoAudit = false;
      } else {
        this.noAudit = false;
      }
      this.init();
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
            this.init();
          }
        }
      );
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    submit() {
      this.page = 1;
      this.init();
    },
    init() {
      if (!this.formData.brandId) {
        this.$Message.info("品牌不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.info("活动包不能为空");
        return false;
      }
      let data = {
        brandId: this.formData.brandId,
        activityId: this.formData.activityId,
        groupId: this.formData.groupId
      };
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      if (this.noAudit) {
        data["checkStatus"] = 0;
      }
      if (this.tNoAudit) {
        data["checkStatus"] = 4;
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "auditIntegral/queryWaitingAuditTeam.json",
        data,
        res => {
          this.pageNum = res.items;
          this.page = res.page;
          this.pageData = res.datalist;
          this.noneStatus = true;
          res.datalist.forEach(item => {
            item.proid = `${this.Global.createTime(
              item.startTime
            )}至${this.Global.createTime(item.endTime)}`;
          });
        }
      );
    }
  }
};
</script>