
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
  justify-content: center;
  align-items: center;
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
      text-align: center;
      font-size: 14px;
    }
    .modal-table {
      max-height: 500px;
      margin-top: 10px;
      .modal-table-top {
        overflow: hidden;
        height: 30px;
        line-height: 30px;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动分值配置</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <div class="switch" @click="formData.flag = !formData.flag">
                  <div class="left" :class="{'active':formData.flag }">未评分</div>
                  <div class="right" :class="{'active':!formData.flag }">已评分</div>
                </div>
              </Form-item>
            </div>
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
        <hhTable :columns="columns" :pageData="pageData" :noneStatus="noneStatus" disabled-hover></hhTable>
      </div>
      <div class="page-box">
        <div>
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/util/config.js";
import myModal from "@/components/Modal/my-modal.vue";
import wpictureUpload from "@/components/word-picture-upload.vue";
import fieldNameDes from "@/components/field-name-description.vue";
import hhTable from "@/components/table/table.vue";
import dataRange from "@/components/data-rang.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import detailBtn from "@/components/Button/detail-btn.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
export default {
  name: "activity-list-value-exhibition-keepAlive",
  components: {
    wpictureUpload,
    dataRange,
    exportBtn,
    detailBtn,
    hhTable,
    importBtn,
    myModal,
    fieldNameDes,
    addNewBtn
  },
  data() {
    return {
      noneStatus: false,
      formData: {
        brandId: "",
        flag: true
      },
      page: 1,
      pageNum: 0,
      columns: [
        {
          title: "序号",
          type: "index"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "活动名",
          key: "groupName",
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
          title: "活动开始时间",
          key: "startTime",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.startTime));
          }
        },
        {
          title: "活动结束时间",
          key: "endTime",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.endTime));
          }
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          tooltip: true,
          render: (h, params) => {
            let str = "";
            let time = new Date().getTime();
            if (time > params.row.endTime) {
              str = "已结束";
            } else if (time < params.row.startTime) {
              str = "未开始";
            } else {
              str = "进行中";
            }
            return h("div", str);
          }
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            var tag = [
              h(
                "Button",
                {
                  style: {
                    padding: "3px 7px"
                  },
                  attrs: {
                    type: "success"
                  },
                  on: {
                    click: () => {
                      let query = {
                        id: params.row.id,
                        groupName: params.row.groupName,
                        brandName: params.row.brandName,
                        areaList: params.row.areaList,
                        summary: params.row.summary,
                        specDesc: params.row.specDesc,
                        logoUrl: params.row.logoUrl,
                        flag: this.flag
                        //   id:params.row.id,
                      };
                      this.$router.push({
                        path: "/itemListValueExhibition",
                        query
                      });
                    }
                  }
                },
                "详情"
              )
            ];

            return h("div", tag);
          }
        }
      ],
      importUrl: config.uploadWorkerExcel,
      pageData: [],
      brandList: [],
      groupList: [],
      showQuery: false,
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
      data["isScore"] = this.formData.flag ? 0 : 1;
      delete data["flag"];
      this.Global.doPost(
        "activity/queryGroupWithPageByIsScore.json",
        data,
        res => {
          this.pageData = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
          this.noneStatus = true;
          this.flag = this.formData.flag;
        }
      );
    }
  }
};
</script>