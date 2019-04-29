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
  padding: 10px;
  .pages {
    position: absolute;
    bottom: 20px;
    right: 20px;
    // margin: 10px;
    overflow: hidden;
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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">码包激活</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="85">
          <Row>
            <Col span="21">
              <Row>
                <Col span="6">
                  <Form-item label="品牌名称:" prop="brandId" required>
                    <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                      <Option
                        :value="item.id"
                        v-for="(item,index) in brandList"
                        :key="index"
                      >{{ item.brandName }}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col span="6">
                  <Form-item label="活动包名:" prop="groupId">
                    <Select
                      v-model="formData.groupId"
                      placeholder="请选择"
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
                </Col>
                <Col span="6">
                  <Form-item label="活动名称:" prop="activityId">
                    <Select v-model="formData.activityId" placeholder="请选择" clearable>
                      <Option
                        :value="item.id"
                        v-for="(item,index) in activityList"
                        :key="index"
                      >{{ item.name }}</Option>
                    </Select>
                  </Form-item>
                </Col>
                <Col span="6">
                  <Form-item label="码包号:">
                    <Input v-model.trim="formData.packageNo" placeholder="请输入码包号"></Input>
                  </Form-item>
                </Col>
              </Row>
              <Row>
                <Col span="14">
                  <Form-item label="时间:">
                    <Row>
                      <Col span="11">
                        <Form-item>
                          <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                        </Form-item>
                      </Col>
                      <Col span="2" style="text-align: center;">至</Col>
                      <Col span="11">
                        <Form-item>
                          <data-range
                            hour="24:00"
                            placeholder="结束时间"
                            v-model="formData.queryEndTime"
                          ></data-range>
                        </Form-item>
                      </Col>
                    </Row>
                  </Form-item>
                </Col>
                <Col span="10">
                  <Form-item label="查询时间:">
                    <RadioGroup v-model="formData.time">
                      <Radio label="shengcheng">生成时间</Radio>
                      <Radio label="jihuo">激活时间</Radio>
                    </RadioGroup>
                  </Form-item>
                </Col>
              </Row>
            </Col>
            <Col span="2" offset="1" style="margin-top:10px">
              <div class="searchBox">
                <Button @click="submit('form')" class="btn-search search_btn" type="primary">查询</Button>
                <Button
                  @click="showQuery=!showQuery"
                  class="search_icon"
                  type="primary"
                  icon="ios-arrow-up"
                  v-if="showQuery"
                ></Button>
                <Button
                  @click="showQuery=!showQuery"
                  class="search_icon"
                  type="primary"
                  icon="ios-arrow-down"
                  v-else
                ></Button>
              </div>
            </Col>
          </Row>
          <transition name="fade">
            <Row v-if="showQuery">
              <Col span="10">
                <Form-item label="状态:">
                  <Select v-model="formData.status" placeholder="请选择" clearable>
                    <Option value="1">已激活</Option>
                    <Option value="0">未激活</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
          </transition>
        </Form>
      </div>
      <div class="box tableBox">
        <div class="contentTop">
          <exportBtn class="btn-right" @btnClick="exportExcel"/>
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
import dataRange from "@/components/data-range/data-range.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "code-activation-keepAlive",
  data() {
    return {
      noneStatus: false,
      showQuery: false,
      newBuildModel: false,
      formItem: {
        brandId: ""
      },
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        groupId: "", //活动包名ID
        brandId: "",
        activityId: "",
        packageNo: "", //码包号
        status: "",
        time: "shengcheng"
      },

      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "活动名称",
          key: "activityName",
          align: "center"
        },
        {
          title: "码包号",
          key: "packageNo",
          align: "center"
        },
        {
          title: "生成时间",
          key: "codeCrateTime",
          align: "center",
          render: (h, f) => {
            let str = "";
            if (f.row.codeCrateTime == null) {
              str = "";
            } else {
              str = this.Global.createTime(f.row.codeCrateTime);
            }
            return h("div", str);
          }
        },
        {
          title: "激活时间",
          key: "activateTime",
          align: "center",
          render: (h, f) => {
            let str = "";
            if (f.row.activateTime == null) {
              str = "";
            } else {
              str = this.Global.createTime(f.row.activateTime);
            }
            return h("div", str);
          }
        },
        {
          title: "码量",
          key: "prodQuantity",
          align: "center"
        },
        {
          title: "已使用量",
          key: "useNum",
          align: "center",
          render: (h, f) => {
            let str = "";
            if (f.row.useNum) {
              str =
                parseInt(f.row.useNum, 10) / parseInt(f.row.prodQuantity, 10);
              str *= 100;
              str = str.toFixed(2);
              str += "%";
            }
            return h("div", str);
          }
        },
        // 1 已激活 0 未激活
        {
          title: "状态",
          key: "usableStatus",
          align: "center",
          render: (h, f) => {
            let arr = ["未激活", "已激活"];
            return h("div", arr[f.row.usableStatus]);
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
                    size: "small",
                    disabled: params.row.usableStatus === 1 ? true : false
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定激活该码包？",
                        onOk: () => {
                          let data = {
                            batchId: params.row.batchId
                            // activityId: params.row.activityId,
                            // packageNo: params.row.packageNo
                          };
                          this.Global.doPost(
                            "codepackage/activatecodepackage.json",
                            data,
                            res => {
                              this.init();
                              this.$Message.success("激活成功");
                            }
                          );
                        }
                      });
                    }
                  }
                },
                "激活"
              )
            ];
            return h("div", tag);
          }
        }
      ],
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
      { date: 7, activityType: 1, scope: "a" },
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
    dataRange,
    exportBtn,
    hhTable
  },
  methods: {
    exportExcel() {
      if (!this.formData.brandId) {
        this.$Message.info("品牌不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formData);
      let startTime = "";
      let endTime = "";
      startTime = this.Global.createTime(this.formData.queryStartTime);

      endTime = this.Global.createTime(this.formData.queryEndTime);

      if (this.formData.time == "shengcheng") {
        data["queryStartTime"] = startTime;
        data["queryEndTime"] = endTime;
      } else {
        data["beginActivateTime"] = startTime;
        data["endActivateTime"] = endTime;
        delete data["queryStartTime"];
        delete data["queryEndTime"];
      }

      delete data["time"];
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "codepackage/queryCodeExport.json",
        data
      );
      window.open(url);
    },
    sureCreate() {},
    cancel() {
      this.newBuildModel = false;
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryGroup.json",
        { date: 7, activityType: 1, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
        }
      );
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPost(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
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
    formatYearMonth(time) {
      return new Date(Number(time)).pattern("yyyy-MM-dd hh:mm:ss");
    },
    submit() {
      this.init(1);
    },
    init(size) {
      if (!this.formData.brandId) {
        this.$Message.info("品牌不能为空");
        return false;
      }
      let data = this.Global.JsonChange(this.formData);
      data["currentPage"] = size ? size : this.page;
      data["pageSize"] = this.pageSize;
      let startTime = "";
      let endTime = "";
      startTime = this.Global.createTime(this.formData.queryStartTime);
      endTime = this.Global.createTime(this.formData.queryEndTime);
      if (this.formData.time == "shengcheng") {
        data["queryStartTime"] = startTime;
        data["queryEndTime"] = endTime;
      } else {
        data["beginActivateTime"] = startTime;
        data["endActivateTime"] = endTime;
        delete data["queryStartTime"];
        delete data["queryEndTime"];
      }

      delete data["time"];
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("codepackage/querycode.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
        this.noneStatus = true;
      });
    }
  }
};
</script>