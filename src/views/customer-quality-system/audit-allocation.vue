// 审核分配
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
.form {
  position: relative;
  display: flex;
  .container {
    width: 70%;

    .w18 {
      width: 25%;
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
  .upDate {
    float: right;
    border: 1px solid #aeaeae;
    padding: 2px 12px;
    margin-right: 10px;
    margin-top: 4px;
    color: #333;
  }
  .demo {
    float: right;
    color: @primary-color;
    height: 30px;
    line-height: 30px;
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
.demo {
  color: @primary-color;
  margin-left: 20px;
  cursor: pointer;
}
.sitem {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
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
    <!-- <h2 class="Title">审核分配</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue">
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
                <Select v-model="formData.id" placeholder="活动名称">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="id">
                <Select v-model="formData.id" placeholder="状态">
                  <Option value="0">进行中</Option>
                  <Option value="1">未开始</Option>
                  <Option value="2">已结束</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.id" placeholder="团队">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in teamList"
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
              <div class="m-items" v-for="item in pageData[props.slotData].presentList">
                <div class="m-item" style="width:20%;">
                  <Tooltip :max-width="250" placement="bottom-start" transfer :content="item.name">
                    <span class="title">项目名称：</span>
                    <span class="content">{{ item.name }}</span>
                  </Tooltip>
                </div>

                <div class="m-item" style="width:60%;">
                  <Tooltip :max-width="250" placement="bottom-start" transfer :content="item.team">
                    <span class="title">团队：</span>
                    <span class="content">{{ item.team }}</span>
                  </Tooltip>
                </div>
                <div class="m-item" style="width:20%;text-align:right;">
                  <Button size="small" class="btn-right" type="primary" @click="showTeamModal">团队设置</Button>
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
                <span>{{ item.name }}</span>
              </Checkbox>
            </div>
          </CheckboxGroup>
        </div>
        <div class="team-footer">
          <Button type="primary">确定新建</Button>
        </div>
      </div>
    </myModal>
    <!-- 设置抽检率弹窗 -->
    <myModal class="myModal" @close="closeRate" :modal="showRate" width="400">
      <div slot="main" class="modal-main">
        <h3>抽检率</h3>
        <div class="rate-box">
          <InputNumber :max="100" :min="1" placeholder="抽检率" style="display:block;width:100%;"></InputNumber>
          <span>%</span>
        </div>
        <div class="team-footer">
          <Button type="primary">确定</Button>
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
  data() {
    return {
      showRate: false,
      noneStatus: false,
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
          title: "状态",
          key: "activityName",
          align: "center",
          tooltip: true
        },
        {
          title: "抽检率",
          key: "presentName",
          align: "center",
          tooltip: true,
          render: (h, params) => {
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
                "80%"
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
                      this.showRateModal(params.row);
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
                      this.showTeamModal(params.row);
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
                params.row.selectStatus ? "收起项目" : "展开项目"
              )
            ];
            return h("div", tag);
          }
        }
      ],
      page: 1,
      pageNum: 0,
      teamList: [
        {
          name: "111",
          id: 1
        },
        {
          name: "222",
          id: 2
        },
        {
          name: "333",
          id: 3
        },
        {
          name: "444",
          id: 4
        },
        {
          name: "555",
          id: 5
        }
      ], //团队数据
      showTeam: false, //显示团队弹窗
      selectedTeam: [], //已选择的team
      pageData: [
        {
          presentList: [
            {
              name: "1  的成本价举办超级大白菜大家彼此进步时间从北京",
              team:
                "的成本价举办超级大白菜大家彼此进步时间从北京的成本价举办超级大白菜大家彼此进步时间从北京的成本价举办超级大白菜大家彼此进步时间从北京的成本价举办超级大白菜大家彼此进步时间从北京"
            },
            {
              name: "2",
              team: "dchjh"
            }
          ]
        },
        {
          presentList: [
            {
              name: "3",
              team: "djfgjh"
            },
            {
              name: "4",
              team: "dchjh"
            }
          ]
        },
        {
          presentList: [
            {
              name: "5",
              team: "djfgjh"
            }
          ]
        }
      ],
      brandList: [],
      groupList: [],
      pageSize: 10,
      flag: null
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
    showTeamModal() {
      this.showTeam = true;
      // this.pageData[0].presentList[0].team = "12";
      // this.$set(this.pageData[0].presentList[0], "team", Math.random());
    },
    showRateModal() {
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