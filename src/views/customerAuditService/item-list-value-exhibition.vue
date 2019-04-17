
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
.forms {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
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
.itemBox {
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  .item-left {
    width: 200px;
    img {
      display: block;
      width: 180px;
      height: 80px;
      border: 1px solid #e5e5e5;
      margin-left: 10px;
    }
  }
  .item-right {
    flex: 1;
    .item {
      line-height: 40px;
    }
  }
}
.table-box {
  .t-head {
    line-height: 40px;
    color: #333;
    font-weight: 500;
    background-color: rgb(228, 224, 220);
    .h-item {
      text-align: center;
      border-left: 1px solid rgb(232, 234, 236);
    }
  }
  .t-body {
    .b-items {
      border-bottom: 1px solid #e5e5e5;
      .b-item {
        .b-item-h {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 40px;
        }
      }
      .showMore {
        background-color: rgb(245, 247, 249);
        .more-item {
          border-bottom: 2px dotted #e5e5e5;
          .m-items {
            padding: 20px 0 20px 20px;
            display: flex;
            flex-direction: row;
            .left {
              width: 60px;
            }
            .right {
              flex: 1;
            }
          }
          &.btns {
            text-align: right;
            padding: 10px;
          }
        }
      }
    }
  }
  .btns {
    text-align: right;
    margin: 10px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动分值配置</h2> -->
    <div class="main-container">
      <div class="box">
        <Form
          v-if="formData.flag"
          key="zzz"
          ref="form"
          class="form"
          :model="formData"
          :label-width="10"
        >
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <div class="switch" @click="scoreClick">
                  <div class="left" :class="{'active':formData.flag }">未评分</div>
                  <div class="right" :class="{'active':!formData.flag }">已评分</div>
                </div>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select
                  v-model="formData.activityId"
                  placeholder="项目名称"
                  @on-change="getpresentList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.id" placeholder="分组名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in presentList"
                    :key="index"
                  >{{ item.activityTag }}</Option>
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
        <Form v-else key="yyy" ref="form" class="forms" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <div class="switch" @click="scoreClick">
                  <div class="left" :class="{'active':formData.flag }">未评分</div>
                  <div class="right" :class="{'active':!formData.flag }">已评分</div>
                </div>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId" required>
                <Select v-model="formData.score" placeholder="分值" clearable>
                  <Option value="all">全部</Option>
                  <Option
                    :value="item.val"
                    v-for="(item,index) in scoreList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId" required>
                <Select
                  v-model="formData.activityId"
                  placeholder="项目名称"
                  @on-change="getpresentList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId" required>
                <Select v-model="formData.id" placeholder="分组名称" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in presentList"
                    :key="index"
                  >{{ item.activityTag }}</Option>
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
      <div class="box itemBox">
        <div class="item-left">
          <img :src="formDatas.logoUrl" alt>
        </div>
        <div class="item-right">
          <Row>
            <Col span="8">
              <div class="item">活动名：{{ formDatas.groupName }}</div>
              <div class="item">活动简介：{{ formDatas.summary }}</div>
            </Col>
            <Col span="8">
              <div class="item">品牌名称：{{ formDatas.brandName }}</div>
              <div class="item">特殊说明：{{ formDatas.groupName }}</div>
            </Col>
            <Col span="8">
              <div class="item">活动区域：{{ formDatas.areaList.join() }}</div>
            </Col>
          </Row>
        </div>
      </div>
      <div class="box" style="padding:10px">
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{pageNum}}</span>条数据
          </span>
        </div>
        <div class="table-box">
          <div class="t-head">
            <Row>
              <Col span="2">
                <div class="h-item">序号</div>
              </Col>
              <Col span="4">
                <div class="h-item">项目名称</div>
              </Col>
              <Col span="4">
                <div class="h-item">活动开始时间</div>
              </Col>
              <Col span="4">
                <div class="h-item">活动结束时间</div>
              </Col>
              <Col span="3">
                <div class="h-item">状态</div>
              </Col>
              <Col span="3">
                <div class="h-item">分值</div>
              </Col>
              <Col span="4">
                <div class="h-item">操作</div>
              </Col>
            </Row>
          </div>
          <div class="t-body">
            <div class="b-items" v-for="(item,index) in pageData" :key="index">
              <div class="b-item">
                <Row>
                  <Col span="2">
                    <div class="b-item-h">{{ index + 1 }}</div>
                  </Col>
                  <Col span="4">
                    <div class="b-item-h">{{ item.name }}</div>
                  </Col>
                  <Col span="4">
                    <div class="b-item-h">{{ Global.createTime(item.startTime) }}</div>
                  </Col>
                  <Col span="4">
                    <div class="b-item-h">{{ Global.createTime(item.endTime) }}</div>
                  </Col>
                  <Col span="3">
                    <div class="b-item-h">
                      {{ item.status }}
                      <!-- {{ item.showMore }} -->
                    </div>
                  </Col>
                  <Col span="3">
                    <div class="b-item-h">
                      <Select
                        style="width:100px;"
                        v-model="item.score"
                        placeholder="分值"
                        @on-change="scoreChange"
                      >
                        <Option
                          :value="n.val + '-' + index"
                          v-for="(n,i) in scoreList"
                          :key="i"
                        >{{ n.name }}</Option>
                      </Select>
                    </div>
                  </Col>
                  <Col span="4">
                    <div class="b-item-h">
                      <Button
                        type="primary"
                        @click="save(item)"
                        style="margin-right:10px;"
                        size="small"
                      >确定</Button>
                      <Button
                        type="success"
                        @click="showMoreList(item,index)"
                        size="small"
                      >{{ item.showMore ? "收起" : "展开"}}</Button>
                    </div>
                  </Col>
                </Row>
              </div>
              <div class="showMore" v-show="item.showMore">
                <div class="more-item" v-for="( val ,n) in item.presentList" :key="n">
                  <Row>
                    <Col span="6">
                      <div class="m-items">
                        <div class="left">分组名称：</div>
                        <div class="right">{{ val.activityTag }}</div>
                      </div>
                    </Col>
                    <Col span="12">
                      <div class="m-items">
                        <div class="left">审核规则：</div>
                        <div class="right">{{ val.auditPolicy }}</div>
                      </div>
                    </Col>
                    <Col span="6">
                      <div class="m-items">
                        <Select style="width:100px;" v-model="val.score" placeholder="分值">
                          <Option :value="n.val" v-for="(n,i) in scoreList" :key="i">{{ n.name }}</Option>
                        </Select>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div class="more-item btns">
                  <Button type="primary" @click="save(item)">确定</Button>
                </div>
              </div>
            </div>
          </div>
          <div class="btns" v-if="pageData.length">
            <Button @click="sureAll" type="info">批量确认</Button>
          </div>
        </div>
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
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
export default {
  name: "activity-list-value-exhibition",

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
      formDatas: {},
      activityList: [],
      presentList: [],
      noneStatus: false,
      formData: {
        brandId: "",
        flag: true,
        score: "all"
      },
      page: 1,
      pageNum: 0,
      scoreList: [], //分值列表
      pageData: [],
      pageSize: 10
    };
  },
  created() {
    let {
      id,
      groupName,
      brandName,
      areaList,
      summary,
      specDesc,
      logoUrl,
      flag
    } = this.$route.query;
    this.formDatas = {
      id,
      groupName,
      brandName,
      areaList: areaList ? areaList : [],
      summary,
      specDesc,
      logoUrl
    };
    this.formData.flag = flag;
    this.formData.groupId = id;
    this.Global.doPostNoLoading(
      "condition/queryActivity.json",
      { groupId: id },
      res => {
        Object.entries(res).forEach(item => {
          this.activityList.push({ id: Number(item[0]), name: item[1] });
        });
        if (this.activityList && this.activityList.length) {
          this.$nextTick(() => {
            this.formData.activityId = this.activityList[0].id;
            this.getpresentList(this.formData.activityId);
            this.init();
          });
        }
      }
    );
    //查询分值列表

    this.Global.doPost(
      "auditIntegral/obtainAuditIntegralPresentScore.json",
      {},
      res => {
        res.split(",").forEach(item => {
          this.scoreList.push({
            val: item - 0,
            name: `${item}分`
          });
        });
      }
    );
  },
  watch: {},
  methods: {
    scoreChange(val) {
      if (!val) return;
      let arr = val.split("-");
      console.log(arr);
      let v = arr[0];
      let index = arr[1];
      this.pageData[index].presentList.forEach(item => {
        this.$set(item, "score", parseInt(v, 10));
      });
    },
    showMoreList(item, index) {
      let flag = item.showMore;
      this.$set(this.pageData[index], "showMore", !flag);
    },
    getpresentList(value) {
      this.presentList = [];
      this.formData.id = "";
      if (!value) return;
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentList = res.data;
        }
      });
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    scoreClick() {
      console.log("ceshi");
      this.formData.flag = !this.formData.flag;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    //分组配置分值
    save(item) {
      let arr = [];
      if (item.presentList && item.presentList.length) {
        // item.presentList.forEach()
        for (let i = 0; i < item.presentList.length; i++) {
          if (!item.presentList[i].score) {
            this.$Message.info("请选择分值");
            return false;
          }
          arr.push({
            id: item.presentList[i].id,
            score: item.presentList[i].score
          });
        }
      }
      let data = {
        activityPresentList: arr
      };
      this.Global.doPost("activity/doSettingActivityScore.json", data, res => {
        this.$Message.success("配置成功");
        this.init();
      });
    },
    //批量确认
    sureAll() {
      let arr = [];
      let flag = false;
      this.pageData.forEach(item => {
        item.presentList.forEach(val => {
          if (!val.score) {
            flag = true;
            return false;
          }
          arr.push({
            id: val.id,
            score: val.score
          });
        });
      });
      if (flag) {
        this.$Message.info("请选择分数");
        return false;
      }
      let data = {
        activityPresentList: arr
      };
      this.Global.doPost("activity/doSettingActivityScore.json", data, res => {
        this.$Message.success("配置成功");
        this.init();
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      delete data["flag"];
      data["isScore"] = this.formData.flag ? 0 : 1;
      if (data["score"] == "all") {
        delete data["score"];
      }
      this.Global.doPost(
        "activity/queryActivityWithPageByIsScore.json",
        data,
        res => {
          if (res.datalist && res.datalist.length) {
            res.datalist.forEach(item => {
              let time = new Date().getTime();
              let str = "";
              if (time > item.endTime) {
                str = "已结束";
              } else if (time < item.startTime) {
                str = "未开始";
              } else {
                str = "进行中";
              }
              item.status = str;
              item.showMore = false;
            });
          }
          this.pageData = res.datalist;
          console.log(this.pageData);
          this.pageNum = res.items;
          this.page = res.page;
        }
      );
    }
  }
};
</script>