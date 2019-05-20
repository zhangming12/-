//超时待审核
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
    <!-- <h2 class="Title">待审核</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left auditBox w18">
              <div class="left" :class="{'active': tNoAudit}" @click="auditClick('tNoAudit')">超时</div>

              <div class="right" :class="{'active': noAudit}" @click="auditClick('noAudit')">待审</div>
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
      <div class="box tableBox">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span> 条数据
          </span>
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
export default {
  name: "overtime-for-audit-keepAlive",
  data() {
    return {
      noAudit: false,
      tNoAudit: true,
      noneStatus: false,
      formData: {
        groupId: "", //活动包名ID
        brandId: "",
        activityId: ""
      },
      pageData: [],
      defaultList: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center",
          tooltip: true
        },
        {
          title: "品牌",
          key: "brandName",
          align: "center",
          tooltip: true
        },
        {
          title: "活动名",
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "项目",
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "上传周期",
          key: "proid",
          align: "center",
          tooltip: true
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          tooltip: true
        },
        {
          title: "审核团队",
          key: "teamNameList",
          align: "center",
          tooltip: true
        },
        {
          title: "初审",
          key: "firstNum",
          align: "center",
          tooltip: true
        },
        {
          title: "上传时间",
          key: "minFirstTime",
          align: "center",
          tooltip: true
        },
        {
          title: "复审",
          key: "secondNum",
          align: "center",
          tooltip: true
        },
        {
          title: "上传时间",
          key: "minSecondTime",
          align: "center",
          tooltip: true
        }
      ],
      columns1: [],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [], //品牌数据
      groupList: [], //活动包名
      activityList: [] //活动
    };
  },
  created() {
    this.queryBrand();
    let userType = this.getUserType();
    if (userType == "P") {
      this.columns1 = [
        ...this.defaultList,
        {
          title: "质检",
          key: "finalNum",
          align: "center",
          tooltip: true
        },
        {
          title: "上传时间",
          key: "minFinalTime",
          align: "center",
          tooltip: true
        }
      ];
    } else {
      this.columns1 = [...this.defaultList];
    }
  },
  components: {
    hhTable
  },
  watch: {},
  methods: {
    getUserType() {
      return JSON.parse(window.sessionStorage.getItem("user")).userType;
    },
    auditClick(val) {
      this[val] = !this[val];
      if (val == "noAudit") {
        this.tNoAudit = false;
      } else {
        this.noAudit = false;
      }
      this.init();
    },
    queryBrand() {
      this.Global.doPostNoLoading("audit/queryBrandByTeam.json", "1", res => {
        this.brandList = res;
        if (res && res.length) {
          this.$set(this.formData, "brandId", res[0].brandId);
          this.changeValue(this.formData.brandId);
        }
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
    changePage(size) {
      this.page = size;
      this.init();
    },
    submit() {
      this.page = 1;
      this.init();
    },
    formateTime(time) {
      if (time) return new Date(time).parttern("yyyy-MM-dd HH:mm:ss");
      return null;
    },
    init() {
      if (!this.formData.brandId) {
        this.$Message.info("品牌不能为空");
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
        data["level"] = 2;
      }
      if (this.tNoAudit) {
        data["level"] = 1;
      }
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("audit/queryOverOrWaitAuditVideo.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
        if (res && res.length) {
          res.datalist.forEach(item => {
            item.proid = `${this.Global.createTime(
              item.startTime
            )}至${this.Global.createTime(item.endTime)}`;
            item.minFinalTime = this.formateTime(item.minFinalTime);
            item.minSecondTime = this.formateTime(item.minSecondTime);
            item.minFirstTime = this.formateTime(item.minFirstTime);
            item.status = this.noAudit ? "待审核" : "超时";
          });
        }
        this.pageData = res.datalist;
      });
    }
  }
};
</script>