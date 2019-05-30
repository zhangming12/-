<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  margin: 0 auto;
  padding-bottom: 0;
  background: #fff;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
//搜索条件 radio按钮
.ivu-radio-wrapper {
  margin-right: 30px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">经销商陈列活动管理</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <data-range hour="00:00" v-model="formData.queryStartTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <data-range hour="24:00" placeholder="结束时间" v-model="formData.queryEndTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.brandId" placeholder="请选择品牌">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select placeholder="请选择状态" v-model="formData.activityStatus" clearable>
                  <Option value="1">未开始</Option>
                  <Option value="0">进行中</Option>
                  <Option value="2">已结束</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Cascader
                  placeholder="请选择区域"
                  :data="areaData"
                  v-model="formData.areaCode"
                  change-on-select
                ></Cascader>
              </Form-item>
            </div>
            <div class="btn-right w10">
              <div class="searchBox">
                <div class="btn-right search-right" @click="submit('form')">
                  <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding:10px">
        <div class="contentTop">
          <addNewBtn class="btn-right" title="新建" @btnClick="handleAdd"/>
        </div>
        <Table :columns="columns" :data="pageData" disabled-hover></Table>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import area from "@/config/china_code_data.js";
import dataRange from "@/components/data-range/data-range.vue";
import addNewBtn from "@/components/Button/addNew-btn.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "dealer-dispay-manage-patrols-keepAlive",
  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        //name:'',
        activityStatus: "",
        areaCode: []
      },
      page: 1,
      pageNum: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      columns: [
        {
          title: "序号",
          type: "index",
          width: 70,
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
          align: "center",
          width: 150,
          render: (h, params) => {
            return this.Global.createTime(params.row.createTime);
          }
        },
        {
          title: "活动包名",
          key: "groupName",
          align: "center"
        },
        {
          title: "品牌",
          key: "brandName",
          align: "center"
        },
        {
          title: "活动开始时间",
          key: "startTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return params.row.startTime
              ? this.Global.createTime(params.row.startTime)
              : "";
          }
        },
        {
          title: "活动结束时间",
          key: "endTime",
          width: 150,
          align: "center",
          render: (h, params) => {
            return params.row.endTime
              ? this.Global.createTime(params.row.endTime)
              : "";
          }
        },
        {
          title: "状态",
          key: "activityStatus",
          align: "center",
          render: (h, params) => {
            let str = "";
            switch (params.row.activityStatus) {
              case 0:
                str = "进行中";
                break;
              case 1:
                str = "未开始";
                break;
              case 2:
                str = "已结束";
                break;
              default:
                str = "";
                break;
            }
            return h("div", str);
          }
        },
        {
          title: "操作",
          key: "action",
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
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
                      this.$Modal.confirm({
                        title: "警告",
                        content: "是否导出活动编码？",
                        onOk: () => {
                          var url = this.Global.getExportUrl(
                            "displayYxtg/getPresentCodeListExport.json",
                            {
                              brandId: params.row.brandId,
                              groupId: params.row.id
                            }
                          );
                          window.open(url);
                        },
                        onCancel: () => {
                          this.$Message.info("点击了取消");
                        }
                      });
                    }
                  }
                },
                "导出活动编码"
              ),
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
                      this.$router.push({
                        path: "/activityAddOrModifyPatrols",
                        query: {
                          type: "edit",
                          groupId: params.row.id,
                          brandId: params.row.brandId,
                          brandName: params.row.brandName
                        }
                      });
                    }
                  }
                },
                "修改"
              ),
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
                        path: "/activityAddOrModifyPatrols",
                        query: {
                          type: "look",
                          groupId: params.row.id,
                          brandId: params.row.brandId,
                          brandName: params.row.brandName
                        }
                      });
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      pageData: [],
      areaData: area,
      brandList: [],
      activityList: []
    };
  },
  components: {
    dataRange,
    addNewBtn
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { activityType: 6 },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
        }
      }
    );
  },
  methods: {
    submit(name) {
      this.page = 1;
      this.init(this.page, 10);
    },
    changePage(size) {
      this.init(size, 10);
    },
    init(currentPage, pageSize) {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      if (this.formData.areaCode.length) {
        data["areaCode"] = this.formData.areaCode[
          this.formData.areaCode.length - 1
        ].toString();
      }

      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      data["groupType"] = 6;
      this.Global.doPost(
        "displayYxtg/queryDisplayYxtgActivityGroupList.json",
        data,
        res => {
          this.pageNum = res.items;
          this.pageData = res && res.datalist ? res.datalist : [];
          this.page = res.page;
        }
      );
    },
    exportExcel: function() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "report/activityDetailExport.json",
        data
      );
      window.open(url);
    },
    handleAdd() {
      this.$router.push({
        path: "/activityAddOrModifyPatrols",
        query: { type: "add" }
      });
    }
  }
};
</script>