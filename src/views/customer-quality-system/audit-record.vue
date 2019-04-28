// 审核记录
<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto 15px;
  padding-bottom: 0;
  background: #fff;
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
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
.sitem {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
}
.switch {
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  .left,
  .right {
    //   border: 1px solid #e5e5e5;
    width: 40%;
    text-align: center;
    cursor: pointer;
    color: white;
    background-color: #999;
  }
  .active {
    background-color: @primary-color;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">审核记录</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="queryStartTime">
                <data-range
                  placeholder="上传开始时间"
                  hour="00:00"
                  v-model="formData.queryStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryEndTime">
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
                <Select
                  v-model="formData.activityId"
                  placeholder="子活动名称"
                  @on-change="getpresentList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="item.id"
                  >{{ item.name }}</Option>
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
                      :value="item.id"
                      v-for="(item,index) in presentNameList"
                      :key="item.id"
                    >{{ item.activityTag }}</Option>
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
                  <Input v-model.trim="formData.storeName" placeholder="店铺ID"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.salesRoute" placeholder="图像编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Select v-model="formData.status" placeholder="结果" clearable>
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
          <exportBtn class="btn-right" title="导出" @click.native="exportExcel"/>
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
  </div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import zmTable from "@/components/zmTable/table.vue";
import dataRange from "@/components/data-range/data-range.vue";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "audit-allocation-keepAlive",
  components: {
    zmTable,
    myModal,
    fieldNameDes,
    dataRange,
    exportBtn
  },
  data() {
    return {
      moreHead: [
        {
          title: "阶段",
          width: 10,
          key: "one"
        },
        {
          title: "团队",
          width: 10,
          key: "one"
        },
        {
          title: "审核人",
          width: 10,
          key: "one"
        },
        {
          title: "结果",
          width: 10,
          key: "one"
        },
        {
          title: "时间",
          width: 20,
          key: "one"
        },
        {
          title: "审核意见",
          width: 40,
          key: "one"
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
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "审核时间",
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "审核意见",
          key: "groupName",
          align: "center",
          tooltip: true
        },
        {
          title: "视频",
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
                    border: "none"
                  },
                  on: {
                    click: () => {
                      this.showVideoModal(params.row);
                    }
                  }
                },
                "查看"
              )
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
                      return;
                      if (params.row.flag) {
                        this.$refs.table.changeExpend(params);
                        params.row.selectStatus = !params.row.selectStatus;
                      } else {
                        //第一次请求
                        this.Global.doPost(
                          "report/getUserInfo.json",
                          {
                            userType: "B",
                            storeId: params.row.storeId
                          },
                          res => {
                            this.$refs.table.changeExpend(params);
                            params.row.flag = true;

                            try {
                              params.row.nickName = res[0].nickName;
                              params.row.recPhone = res[0].recPhone;
                            } catch (error) {
                              console.error(error);
                            }
                            params.row.selectStatus = !params.row.selectStatus;
                          }
                        );
                      }
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
      pageData: [
        {
          presentList: [
            {
              one: "1  的成本价举办超级大白菜大家彼此进步时间从北京"
            },
            {
              one: "2"
            }
          ]
        },
        {
          presentList: [
            {
              one: "3"
            },
            {
              one: "4"
            }
          ]
        },
        {
          presentList: [
            {
              one: "5"
            }
          ]
        }
      ],
      brandList: [],
      groupList: [],
      pageSize: 10
    };
  },
  created() {
    this.Global.doPost(
      "condition/queryBrands.json",
      { date: 15, scope: "a", activityTypes: [3, 6] },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        this.formData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId);
      }
    );
  },
  watch: {},
  methods: {
    //导出
    exportExcel() {
      if (!this.brand) {
        this.$Message.error("请选择品牌");
        return false;
      }
      var url = this.Global.getExportUrl(
        "report/displayGoodsVerifyRecordExport.json",
        { brandId: this.brand }
      );
      window.open(url);
    },
    //根据项目获取分组
    getpresentList(value) {
      this.presentNameList = [];
      this.$set(this.formData, "presentId", "");
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    //根据品牌获取活动
    changeValue(value, isFirst) {
      this.groupList = [];
      this.formData.groupId = "";
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
            if (isFirst) {
              this.init();
            }
          }
        }
      );
    },
    //根据活动获取项目
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
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
      this.Global.doPost(
        "activity/queryGroupWithPageByIsScore.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          this.noneStatus = true;
        }
      );
    }
  }
};
</script>