// 审核分配
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
    width: 87.5%;

    .w18 {
      width: 20%;
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
    .team-footer {
      text-align: center;
      padding: 10px 0;
    }
    .rate-box {
      display: flex;
      margin: 20px 100px;
      align-items: center;
      span {
        width: 30px;
        display: inline-block;
        text-align: center;
      }
    }
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
    <!-- <h2 class="Title">审核分配</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select
                  v-model="formData.brandId"
                  clearable
                  placeholder="品牌名称"
                  @on-change="changeValue"
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="id">
                <Select
                  v-model="formData.groupId"
                  placeholder="活动名称"
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
            <div class="btn-left w18">
              <Form-item prop="id">
                <Select v-model="formData.status" placeholder="状态" clearable>
                  <Option value="2">进行中</Option>
                  <Option value="1">未开始</Option>
                  <Option value="3">已结束</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.teamId" placeholder="团队" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in teamList"
                    :key="index"
                  >{{ item.brandName }}</Option>
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
      <div class="box" style="padding:10px">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
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
              <div class="m-items" v-for="(item,index) in pageData[props.slotData].presentList">
                <div class="m-item" style="width:20%;">
                  <Tooltip
                    :max-width="250"
                    placement="bottom-start"
                    transfer
                    :content="item.activityName"
                  >
                    <span class="title">分组名称：</span>
                    <span class="content">{{ item.presentName }}</span>
                  </Tooltip>
                </div>

                <div class="m-item" style="width:60%;">
                  <Tooltip
                    :max-width="250"
                    placement="bottom-start"
                    transfer
                    :content="item.teamNameList"
                  >
                    <span class="title">团队：</span>
                    <span class="content">{{ item.teamNameList }}</span>
                  </Tooltip>
                </div>
                <div class="m-item" style="width:20%;text-align:right;">
                  <Button
                    size="small"
                    class="btn-right"
                    type="primary"
                    @click="showTeamModal('A',item,props.slotData,index)"
                  >团队设置</Button>
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
    <!-- 选择团队弹窗 -->
    <myModal class="myModal" @close="closeModal" :modal="showTeam" width="600">
      <div slot="main" class="modal-main">
        <h3>选择团队</h3>
        <div class="team-select-box">
          <CheckboxGroup v-model="selectedTeam">
            <div class="item" v-for="item in teamList" :key="item.id">
              <Checkbox :label="item.id">
                <span>{{ item.brandName }}</span>
              </Checkbox>
            </div>
          </CheckboxGroup>
        </div>
        <div class="team-footer">
          <Button @click="sureSave" type="primary">确定</Button>
        </div>
      </div>
    </myModal>
    <!-- 设置抽检率弹窗 -->
    <myModal class="myModal" @close="closeRate" :modal="showRate" width="400">
      <div slot="main" class="modal-main">
        <h3>抽检率</h3>
        <div class="rate-box">
          <InputNumber
            v-model.trim.number="samplingRateData.samplingRate"
            :max="100"
            :min="0"
            placeholder="抽检率"
            style="display:block;width:100%;"
          ></InputNumber>
          <span>%</span>
        </div>
        <div class="team-footer">
          <Button @click="save" type="primary">确定</Button>
        </div>
      </div>
    </myModal>
  </div>
</template>

<script>
import myModal from "@/components/Modal/my-modal.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import zmTable from "@/components/zmTable/table.vue";
export default {
  name: "audit-allocation-keepAlive",
  components: {
    zmTable,
    myModal,
    fieldNameDes
  },
  watch: {
    showRate(val) {
      if (!val) {
        this.$set(this.samplingRateData, "samplingRate", null);
      }
    },
    showTeam(val) {
      if (!val) {
        this.selectedTeam = [];
        this.groupTeamDatas = {};
      }
    }
  },
  data() {
    return {
      showRate: false,
      noneStatus: false,
      samplingRateData: {
        samplingRate: null //抽检率
      },
      formData: {
        brandId: "",
        groupId: ""
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
          title: "状态",
          key: "activityStatus",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let result = {
              1: "未开始",
              2: "进行中",
              3: "已结束"
            };
            return h("div", result[params.row.activityStatus]);
          }
        },
        {
          title: "抽检率",
          key: "samplingRate",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let rate = params.row.samplingRate;
            rate = rate ? rate * 100 + "%" : null;
            var tag = [
              h(
                "span",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: "inline-block"
                  },
                  on: {}
                },
                rate
              ),
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
                      this.samplingRateData.activityId = params.row.id;
                      this.showRateModal(params.row.samplingRate);
                    }
                  }
                },
                "设置"
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
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.groupTeamDatas.activityId = params.row.id;
                      this.showTeamModal("G");
                    }
                  }
                },
                "团队设置"
              ),
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
                      if (params.row.flag) {
                        this.$refs.table.changeExpend(params);
                        params.row.selectStatus = !params.row.selectStatus;
                      } else {
                        //第一次请求
                        this.Global.doPost(
                          "audit/queryActivityAndTeamRefByGroupId.json",
                          {
                            activityId: params.row.id
                          },
                          res => {
                            params.row.presentList = res;
                            this.$refs.table.changeExpend(params);
                            params.row.flag = true;
                            params.row.selectStatus = !params.row.selectStatus;
                          }
                        );
                      }
                    }
                  }
                },
                params.row.selectStatus ? "收起项目" : "展开项目"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      page: 1,
      pageNum: 0,
      teamList: [], //团队数据
      showTeam: false, //显示团队弹窗
      selectedTeam: [], //已选择的team
      pageData: [],
      brandList: [],
      groupList: [],
      activityList: [],
      groupTeamDatas: {},
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
    this.queryTeam();
  },
  methods: {
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    getTeamName(arr) {
      let str = "";
      if (!arr.length) return "";
      this.teamList.forEach(item => {
        arr.forEach(v => {
          if (v == item.id) {
            str += `${item.brandName}、`;
          }
        });
      });
      return str;
    },
    //活动包级别的团队选择
    sureSave() {
      if (!this.selectedTeam.length) {
        this.$Message.info("请选择团队");
        return false;
      }
      let data = {
        teamIds: this.selectedTeam
      };
      let api = "audit/addVideoBatchDistribute.json";
      if (this.groupTeamDatas.type == "G") {
        data["activityId"] = this.groupTeamDatas.activityId;
      } else {
        api = "audit/addVideoDistribute.json";
        data["presentId"] = this.groupTeamDatas.presentId;
      }
      this.Global.doPost(api, data, res => {
        this.$Message.success("保存成功");
        if (this.groupTeamDatas.type == "G") {
          this.init();
        } else {
          let teams = this.getTeamName(this.selectedTeam);
          let { fIndex, sIndex } = this.groupTeamDatas;
          this.$set(
            this.pageData[fIndex].presentList[sIndex],
            "teamNameList",
            teams
          );
        }
        this.showTeam = false;
      });
    },
    //设置抽检率
    save() {
      if (!this.samplingRateData.samplingRate) {
        this.$Message.info("请设置抽检率");
        return false;
      }
      let data = {
        activityId: this.samplingRateData.activityId,
        samplingRate: this.samplingRateData.samplingRate / 100
      };
      this.Global.doPost("audit/updateSamplingRate.json", data, res => {
        this.$Message.success("设置成功");
        this.showRate = false;
        this.init();
      });
    },
    showTeamModal(type, item, fIndex, sIndex) {
      this.groupTeamDatas.type = type;
      if (item) {
        let { teamIdList, presentId } = item;
        this.selectedTeam = teamIdList.split("、").map(v => v - 0);
        this.groupTeamDatas.presentId = presentId;
      }
      if (fIndex || fIndex == 0) {
        this.groupTeamDatas.fIndex = fIndex;
      }
      if (sIndex || sIndex == 0) {
        this.groupTeamDatas.sIndex = sIndex;
      }
      this.showTeam = true;
    },
    //查询团队
    queryTeam() {
      let data = "";
      this.Global.doPostNoLoading("audit/queryAllTeam.json", data, res => {
        this.teamList = res;
      });
    },
    showRateModal(rate) {
      this.samplingRateData.samplingRate = rate ? rate * 100 : null;
      this.showRate = true;
    },
    closeModal() {
      this.showTeam = false;
    },
    closeRate() {
      this.showRate = false;
    },
    showMoreList(item, index) {
      let flag = item.showMore;
      this.$set(this.pageData[index], "showMore", !flag);
    },

    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { scope: "a", date: 7, brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList.length) {
            this.formData.groupId = this.groupList[0].groupId;
            this.getActivityList(this.formData.groupId);
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
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("audit/queryAllActivity.json", data, res => {
        this.pageData = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
        this.noneStatus = true;
      });
    }
  }
};
</script>