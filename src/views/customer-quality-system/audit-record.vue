// 审核记录
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto 15px;
  padding-bottom: 0;
  background: #fff;
}
.form {
  position: relative;
  display: flex;
  .container {
    width: 52.5%;

    .w18 {
      width: 33.3333%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
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
      font-size: 16px;
      margin-left: 20px;
    }
    .team-select-box {
      overflow: hidden;
      .item {
        width: 50%;
        float: left;
        box-sizing: border-box;
        padding: 10px;
      }
    }
    .video-box {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
.table-box {
  .btns {
    text-align: right;
    margin: 10px;
  }
}
.moreBox {
  padding: 0 76px;
  overflow: hidden;
  padding-top: 20px;
  .m-items {
    margin-bottom: 20px;
    padding-right: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e8eaec;
    color: @head-color;
    display: flex;
    flex-direction: row;
    .m-item {
      padding: 0 10px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
  }
}
.modal-mains {
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
    overflow-y: auto;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">审核记录</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <data-range placeholder="上传开始时间" hour="00:00" v-model="formData.queryStartTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <data-range hour="24:00" placeholder="上传结束时间" v-model="formData.queryEndTime"></data-range>
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
                <Select
                  @on-change="getpresentList"
                  v-model="formData.activityId"
                  placeholder="子活动名称"
                  clearable
                >
                  <Option
                    :value="item.activityId"
                    v-for="(item,index) in activityList"
                    :key="item.activityId"
                  >{{ item.activityName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <i-icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
                    <i-icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                  </button>
                </div>
                <div class="btn-right search-right" @click="submit('search')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div class="container" v-if="showQuery">
              <div class="btn-left w18">
                <Form-item prop="activityId">
                  <Select v-model="formData.presentId" placeholder="子活动分组" clearable>
                    <Option
                      :value="item.presentId"
                      v-for="(item,index) in presentNameList"
                      :key="item.presentId"
                    >{{ item.presentName }}</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeId" placeholder="店铺ID"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.id" placeholder="图像编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Select v-model="formData.checkStatus" placeholder="结果" clearable>
                    <Option value="1">通过</Option>
                    <Option value="3">退回</Option>
                    <Option value="2">不通过</Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="box" style="padding:10px">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
          <exportBtn
            v-if="Global.getConfig().hide == 0"
            class="btn-right"
            @btnClick="exportExcel"
            title="导出"
          />
          <exportBtn
            v-if="Global.getConfig().hide == 0"
            class="btn-right"
            @btnClick="myModalisShow = true"
            title="导出暂存"
          />
        </div>
        <div class="table-box">
          <zmTable
            ref="table"
            :columns="columns1"
            :pageData="pageData"
            :noneStatus="noneStatus"
            disabled-hover
          >
            <div class="moreBox" slot="moreBox" slot-scope="props">
              <div class="m-items">
                <div
                  class="m-item"
                  v-for="item in moreHead"
                  :style="{'width':item.width + '%','textAlign':'center'}"
                >
                  <span class="title">{{ item.title }}</span>
                </div>
              </div>
              <div class="m-items" v-for="(item,index) in pageData[props.slotData].presentList">
                <div
                  class="m-item"
                  v-for="val in moreHead"
                  :style="{'width': val.width + '%','textAlign':'center'}"
                >
                  <Tooltip
                    :max-width="250"
                    placement="bottom-start"
                    transfer
                    :content="item[val.key]"
                  >
                    <span class="content">{{ item[val.key] }}</span>
                  </Tooltip>
                </div>
              </div>
            </div>
          </zmTable>
        </div>
      </div>
      <!-- <videoImageLook/> -->
      <div class="page-box">
        <div>
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
    <!-- 查看视频 -->
    <myModal class="myModal" @close="closeVideo" :modal="showVideo" width="600">
      <div slot="main" class="modal-main">
        <h3>视频</h3>
        <div class="video-box">
          <video src controls></video>
        </div>
      </div>
    </myModal>
    <!-- 导入导出历史 -->
    <myModal class="myModal" @close="closeModal" :modal="myModalisShow" width="800">
      <div slot="main" class="modal-mains">
        <div class="modal-table" style="margin-top:0;">
          <div class="modal-table-top">
            <span class="btn-left">
              <Icon type="md-alert" size="22" style="margin-right:5px;"/>生成的数据报表可在【导出暂存】中保留7天,过期自动删除
            </span>
            <refreshBtn @click.native="queryhistoryData" class="btn-right"/>
          </div>
          <Table :columns="columns" :data="historyData" disabled-hover></Table>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
const RESULT = {
  "0": "待审核",
  "1": "通过",
  "2": "不通过",
  "3": "退回"
};
import myModal from "@/components/Modal/my-modal.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import refreshBtn from "@/components/Button/refresh-btn.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import zmTable from "@/components/zmTable/table.vue";
import dataRange from "@/components/data-range/data-range.vue";
import videoImageLook from "@/components/VideoImageLook/video-image-look.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "audit-allocation-keepAlive",
  components: {
    zmTable,
    myModal,
    refreshBtn,
    fieldNameDes,
    dataRange,
    exportBtn,
    videoImageLook
  },
  data() {
    return {
      myModalisShow: false,
      historyData: [],
      moreHead: [
        {
          title: "阶段",
          width: 10,
          key: "step"
        },
        {
          title: "团队",
          width: 10,
          key: "team"
        },
        {
          title: "审核人",
          width: 10,
          key: "user"
        },
        {
          title: "结果",
          width: 10,
          key: "result"
        },
        {
          title: "时间",
          width: 20,
          key: "time"
        },
        {
          title: "审核意见",
          width: 40,
          key: "message"
        }
      ],
      columns: [
        {
          title: "导出时间",
          type: "createTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "数据来源",
          key: "menu",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "文件名",
          key: "fileRename",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "状态",
          key: "result",
          minWidth: 80,
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            let color = "";
            if (params.row.result == "Down") {
              str = "已完成";
              color = "#19be6b";
            } else {
              str = "生成中";
            }
            return h(
              "div",
              {
                style: {
                  color: color
                }
              },
              str
            );
          }
        },
        {
          title: "执行人",
          key: "userName",
          minWidth: 140,
          align: "center",
          tooltip: true
        },
        {
          title: "操作",
          key: "action",
          minWidth: 100,
          align: "center",
          render: (h, params) => {
            let color = "";
            if (params.row.result == "Down") {
              color = "#066ACD";
            }
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "text",
                    size: "small",
                    disabled: params.row.result == "NotDown"
                  },
                  style: {
                    marginRight: "5px",
                    color: color
                  },
                  on: {
                    click: () => {
                      let url = this.Global.getExportUrl(
                        "download.file",
                        params.row.fileUrl
                      );
                      window.open(url);
                    }
                  }
                },
                "下载"
              )
            ]);
          }
        }
      ],
      showQuery: false,
      showVideo: false,
      noneStatus: false,
      presentNameList: [],
      activityList: [],
      formData: {
        brandId: "",
        groupId: "",
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center",
          tooltip: true
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          tooltip: true
        },
        {
          title: "活动名称",
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "项目名称",
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "分组",
          key: "presentName",
          align: "center",
          tooltip: true
        },
        {
          title: "图像编号",
          key: "id",
          align: "center",
          tooltip: true
        },
        {
          title: "最终结果",
          key: "checkStatus",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", RESULT[params.row.checkStatus]);
          }
        },
        {
          title: "审核时间",
          key: "checkTime",
          align: "center",
          tooltip: true
        },
        {
          title: "审核意见",
          key: "checkMessage",
          align: "center",
          tooltip: true
        },
        {
          title: "视频",
          align: "center",
          render: (h, params) => {
            let tag = [
              h(videoImageLook, {
                props: {
                  fileType: params.row.fileType,
                  url: params.row.url
                },
                style: {
                  border: "none"
                }
              })
            ];
            return h("div", tag);
          }
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
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$refs.table.changeExpend(params);
                      params.row.selectStatus = !params.row.selectStatus;
                    }
                  }
                },
                params.row.selectStatus ? "收起" : "展开"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      page: 1,
      pageNum: 0,
      pageData: [],
      brandList: [],
      groupList: [],
      pageSize: 10
    };
  },
  created() {
    this.queryBrand();
  },
  watch: {
    myModalisShow(val) {
      if (val) {
        this.queryhistoryData();
      } else {
        this.historyData = [];
      }
    }
  },
  methods: {
    closeModal() {
      this.myModalisShow = false;
    },
    queryhistoryData() {
      let data = {
        userType: "审核记录"
      };
      this.Global.doPost("import/getCreateFileInfor.json", data, res => {
        this.historyData = res.datalist;
      });
    },
    //导出
    exportExcel() {
      this.str = "导出";
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("audit/exportAuditLog.json", data, res => {
        this.myModalisShow = true;
      });
    },
    //根据项目获取分组
    getpresentList(value) {
      this.presentNameList = [];
      this.$set(this.formData, "presentId", "");
      if (!value) return;
      this.Global.doPostNoLoading(
        "audit/queryPresentByActivityAndTeam.json",
        value,
        res => {
          this.presentNameList = res;
        }
      );
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
          if (res && res.length) {
            this.$set(this.formData, "groupId", res[0].groupId);
            this.getActivityList(this.formData.groupId);
          }
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
    showVideoModal() {
      this.showVideo = true;
    },
    closeVideo() {
      this.showVideo = false;
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("audit/queryAuditLog.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
        res.datalist.map(item => {
          item.checkTime = item.checkTime
            ? this.Global.createTime(item.checkTime)
            : "";
          let presentList = [
            {
              step: "初审",
              team: item.firstTeam,
              user: item.firstUserName,
              time: this.Global.createTime(item.checkFirstOneTime),
              message: item.checkFirstOneMessage,
              result: RESULT[item.checkFirstOneStatus]
            }
          ];
          if (item.checkFirstTwoTime) {
            presentList.push({
              step: "复审",
              team: item.secondTeam,
              user: item.secondUserName,
              time: this.Global.createTime(item.checkFirstTwoTime),
              message: item.checkFirstTwoMessage,
              result: RESULT[item.checkFirstTwoStatus]
            });
          }
          if (item.checkSecondTime) {
            presentList.push({
              step: "质检",
              team: item.finalTeam,
              user: item.finalUserName,
              time: this.Global.createTime(item.checkSecondTime),
              message: item.checkSecondMessage,
              result: RESULT[item.checkSecondStatus]
            });
          }
          item.presentList = presentList;
        });
      });
    }
  }
};
</script>