<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  height: 100%;
}
.main-container {
  min-height: 100%;
  position: relative;
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
  min-height: 500px;
  // padding-bottom: 60px;
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
.searchBox {
  overflow: hidden;
  .search-left,
  .search-right {
    width: 50%;
  }
  .search-left {
    button {
      outline: none;
      border: none;
      width: 60px;
      height: 30px;
      line-height: 30px;
      background: #ffffff;
      margin-left: 10px;
      cursor: pointer;
      color: @primary-color;
    }
  }
  .search-right {
    img {
      cursor: pointer;
      margin-left: 10px;
    }
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
      //   max-height: 500px;
      overflow-y: auto;
      margin-top: 10px;
      h3 {
        margin-bottom: 8px;
      }
      .videoBox {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
        min-height: 100px;
        padding: 4px;
        p {
          color: #999;
        }
        video {
          max-height: 500px;
        }
      }
    }
  }
}
.upDate {
  float: left;
  border: 1px solid #aeaeae;
  border-radius: 4px;
  padding: 2px 12px;
  margin-right: 10px;
  color: #333;
  cursor: pointer;
  // text-overflow: ellipsis
  // white-space: nowrap;
}
.demo {
  float: left;
  margin-left: 10px;
  color: @primary-color;
  line-height: 24px;
  cursor: pointer;
  margin-right: 20px;
  span {
    text-decoration: underline;
  }
}
.maintain-footer {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
}
.btn-left.span {
  margin-right: 10px;
}
.form {
  position: relative;
  display: flex;
  justify-content: center;
  .container {
    width: 35%;
    .w18 {
      width: 100%;
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
      <!-- <h2 class="Title">审核记录(单)</h2> -->
      <div class="main-container">
        <div class="box">
          <Form ref="form" class="form" :model="formData" :label-width="10">
              <div class="container">
                    <div class="btn-left w18">
                        <Form-item  prop="queryStartTime"   >
                            <DatePicker type="daterange" v-model="formData.queryTime" split-panels placeholder="审核时间" style="display:block;"></DatePicker>
                        </Form-item>
                    </div>
              </div>
              <div class="btn-left w10">
                <div class="searchBox">
                    <div class="btn-right search-right" @click="submit('search')">
                        <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                    </div>
                </div>
              </div>
          </Form>
        </div>
        <div class="table-box box">
            <div class="contentTop">
              <span class="btn-left span">合格： <span class='numColor'>{{ isQualifiedCount }}</span></span>
              <span class="btn-left span">不合格： <span class='numColor'>{{ isNotQualifiedCount }}</span></span>
              <span class="btn-left span">判定中： <span class='numColor'>{{ isQualifiedIngCount }}</span></span>
            </div>
            <hhTable ref="table" :columns="columns1" :pageData="pageData" :noneStatus="noneStatus" ></hhTable>
            
        </div>
        <div class="page-box">
            <div style="float: right;">
                <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
            </div>
        </div>
      </div>
      
      <!-- 导入导出历史 -->
       <myModal class="myModal"
            @close="closeModal"
            :modal="myModalisShow"
            width=520>
          <div slot="main" class="modal-main">
            <!-- <h3>近一周导出历史</h3> -->
            <div class="modal-table" style="margin-top:0;">
              <h3>查看视频</h3>
              <div class="videoBox">
                  <video v-if="videoSrc" :src="videoSrc" controls></video>
                  <p v-else> 暂无视频 </p>
              </div>
            </div>
          </div>
       </myModal>

  </div>
</template>

<script>
import refreshBtn from "@/components/Button/refresh-btn.vue";
import myModal from "@/components/Modal/my-modal.vue";
import hhTable from "@/components/table/table.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "out-source-audit-record-keepAlive",
  data() {
    return {
      isQualifiedIngCount: 0,
      isNotQualifiedCount: 0,
      isQualifiedCount: 0,
      videoSrc: null,
      pageNum: 0,
      noneStatus: false,
      myModalisShow: false,
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "审核时间",
          key: "checkTime",
          align: "center",
          tooltip: true,
          width: 150,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.checkTime));
          }
        },
        {
          title: "活动ID",
          key: "groupId",
          align: "center",
          tooltip: true
        },
        {
          title: "项目ID",
          key: "activityId",
          align: "center",
          tooltip: true
        },
        {
          title: "分组ID",
          key: "presentId",
          align: "center",
          tooltip: true
        },
        {
          title: "图像ID",
          key: "id",
          align: "center",
          tooltip: true
        },
        {
          title: "审核结果",
          key: "checkStatusLong",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", this.getAuditResult(params.row.checkStatusLong));
          }
        },
        {
          title: "审核意见",
          key: "checkMessage",
          align: "center",
          tooltip: true
        },
        {
          title: "终审结果",
          key: "checkSecondStatus",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", this.getAuditResult(params.row.checkSecondStatus));
          }
        },
        {
          title: "终审意见",
          key: "checkSecondMessage",
          align: "center",
          tooltip: true
        },
        {
          title: "记录判定",
          key: "isQualified",
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          width: 100,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "button",
                {
                  style: {
                    padding: "3px 7px"
                  },
                  attr: {
                    type: "info"
                  },
                  on: {
                    click: () => {
                      this.videoSrc = params.row.radioUrl;
                      this.myModalisShow = true;
                    }
                  }
                },
                "查看视频"
              )
            ]);
          }
        }
      ],
      page: 1,
      pageSize: 10,
      formData: {
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME]
      },
      str: "",
      page: 1,
      pageData: []
    };
  },
  components: {
    myModal,
    hhTable,
    refreshBtn
  },
  created() {},
  watch: {
    myModalisShow(val) {}
  },
  methods: {
    getAuditResult(val) {
      let str = "";
      if (val == 1 || val == 1001 || val == 2001) {
        str = "通过";
      } else if (val == 2) {
        str = "不通过";
      } else if (val == 3) {
        str = "退回";
      }
      return str;
    },
    closeModal() {
      this.myModalisShow = false;
    },
    submit() {
      if (!this.formData.queryTime[0]) {
        this.$Message.info("请选择查询条件");
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
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      delete data["queryTime"];
      //   data["uploadChannel"] = 1;
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost(
        "displayYxtg/queryAcrossAuditByUpdatedVersionRecord.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          for (let i = 0, len = res.datalist.length; i < len; i++) {
            res.datalist[i].recTime = this.Global.createTime(
              res.datalist[i].recTime
            );
            res.datalist[i].flag = false;
          }
          this.noneStatus = true;
        }
      );
      //查询数量
      this.Global.doPost("displayYxtg/obtainCountLog.json", data, res => {
        this.isQualifiedCount = res.isQualifiedCount;
        this.isNotQualifiedCount = res.isNotQualifiedCount;
        this.isQualifiedIngCount = res.isQualifiedIngCount;
      });
    }
  }
};
</script>