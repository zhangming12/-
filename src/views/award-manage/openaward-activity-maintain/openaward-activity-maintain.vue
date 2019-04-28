<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  margin: 0 auto 15px;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.ivu-radio-wrapper {
  margin-right: 30px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">开奖活动维护</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="80" :rules="rule">
          <Row>
            <Col span="10">
              <Form-item label="品牌名称" required prop="brandId">
                <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
              <Form-item label="展示区域">
                <Cascader :data="areaData" v-model="formData.searchAreaCode" change-on-select></Cascader>
              </Form-item>
            </Col>
            <Col span="10" offset="1">
              <Form-item label="活动名称">
                <Select v-model="formData.name" placeholder="请选择">
                  <Option
                    :value="item.name"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
              <Form-item label="活动状态">
                <Radio-group v-model="formData.showStatus">
                  <Radio label="0">非展示中</Radio>
                  <Radio label="1">展示中</Radio>
                </Radio-group>
              </Form-item>
            </Col>
            <Col span="2" offset="1" style="margin-top:24px">
              <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
            </Col>
          </Row>
        </Form>
      </div>
      <div class="box" style="padding-bottom:20px">
        <div class="contentTop">
          <Button icon="plus-round" @click="handleAdd" type="primary" class="btn-right">新建</Button>
        </div>
        <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="1" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";

import { showStatus } from "@/util/ENUMS.js"; //展示状态

export default {
  name: "openaward-activity-maintain-keepAlive",
  data() {
    const that = this;
    return {
      formData: {
        brandId: "",
        name: "",
        searchAreaCode: [],
        showStatus: ""
      },
      page: 1,
      pageNum: 0,
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }],
        name: [{ required: true, message: "请选择活动名称", trigger: "change" }]
      },
      columns1: [
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "活动名称",
          key: "brandName",
          width: 150,
          align: "center"
        },
        {
          title: "折扣名称",
          key: "name",

          align: "center"
        },
        {
          title: "公众号URL",
          key: "pageUrl",

          align: "center"
        },
        {
          title: "开始时间",
          key: "startTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.startTime);
          }
        },
        {
          title: "结束时间",
          key: "endTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return this.Global.createTime(params.row.endTime);
          }
        },
        {
          title: "状态",
          key: "showStatus",
          width: 100,
          align: "center",
          render: (h, params) => {
            return showStatus[params.row.showStatus];
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
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
                      this.$router.push({
                        path: "/openawardActivityMaintain-edit",
                        query: {
                          type: "edd",
                          id: params.row.id,
                          brandId: params.row.brandId
                        }
                      });
                    }
                  }
                },
                "修改"
              )
            ];
            if (params.row.showStatus == 3) {
              tag.push(
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.$Modal.confirm({
                          title: "警告",
                          content: "确定删除？",
                          onOk: function() {
                            that.handleDelete(params.row.id, params.row.id);
                          }
                        });
                      }
                    }
                  },
                  "删除"
                )
              );
            }
            return h("div", tag);
          }
        }
      ],
      pageData: [],
      showStatus, //展示状态
      brandList: [],
      activityList: [],
      areaData: area
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formItem.brandId = this.brandList[0].id;
        this.changeValue(this.brandList[0].id);
        this.init(1, 10);
      }
    });
  },
  mounted: function() {},
  methods: {
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(this.page, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    changePage: function(size) {
      this.init(size, 10);
    },
    init: function(currentPage, pageSize) {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);

      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.doPost("activity/queryActivityList.json", data, function(
        res
      ) {
        that.pageNum = res.items;
        that.pageData = res.datalist;
        that.page = res.page;
      });
    },
    changeValue: function(value) {
      var that = this;
      this.activityList = [];
      this.Global.getActivityList(value, function(res) {
        that.activityList = res.datalist;
        that.formData.name = res.datalist[0].name;
      });
    },
    handleAdd() {
      this.$router.push({
        path: "/openawardActivityMaintain-edit",
        query: { type: "add" }
      });
    },
    handleDelete(id) {
      var that = this;
      this.Global.doPost(
        "activity/updateActivityInfoStatus.json",
        {
          id: id,
          status: 0
        },
        function() {
          that.$Message.success("成功");
          that.init();
        }
      );
    }
  }
};
</script>


