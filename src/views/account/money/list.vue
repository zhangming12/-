<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
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
  margin-right: 24px;
  cursor: pointer;
}
.select {
  background: @primary-color;
  color: #fff;
}

.ivu-date-picker {
  display: block;
}
.ivu-radio-wrapper {
  margin-right: 30px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">资金流水记录</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="70" :rules="rule">
        <Row>
          <Col span="13">
            <Form-item label="时间:" required :label-width="80">
              <Row>
                <Col span="11">
                  <Form-item prop="queryStartTime">
                    <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center;">至</Col>
                <Col span="11">
                  <Form-item prop="queryEndTime">
                    <data-range hour="24:00" v-model="formData.queryEndTime"></data-range>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
            <Row>
              <Col span="12">
                <Form-item label="品牌名称:" prop="brandId" :label-width="80">
                  <Select v-model="formData.brandId" placeholder="请选择品牌">
                    <Option
                      :value="item.id"
                      v-for="(item,index) in brandList"
                      :key="index"
                    >{{ item.brandName }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="12">
                <Form-item label="活动类型:" :label-width="70">
                  <Select v-model="formData.activityType" placeholder="请选择活动类型" clearable>
                    <Option :value="1">扫码活动</Option>
                    <Option :value="3">陈列活动</Option>
                    <Option :value="4">阶梯活动</Option>
                    <Option :value="2">摇奖活动</Option>
                    <Option :value="0">其他活动</Option>
                  </Select>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="9">
            <Form-item>
              <ul style="height:40px;" v-for="(i,index) in defaultTime" :key="index">
                <li
                  :class="[{select: i.select == num},'time']"
                  v-for="(j,num) in i.data"
                  :key="num"
                  @click="select(index,num)"
                >{{ j.name }}</li>
              </ul>
            </Form-item>
            <Form-item label="门店 ID:">
              <Input v-model.trim="formData.userId" placeholder="请输入用户ID"></Input>
            </Form-item>
          </Col>
          <Col span="2" style="margin-top:24px">
            <Form-item :label-width="10">
              <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
            </Form-item>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div class="contentTop">
        <Button
          @click="exportExcel"
          class="btn-export ivu-btn"
          icon="ios-download-outline"
          type="primary"
        >导出</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div style="margin: 10px;overflow: hidden">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import edd from "./edd.vue";
import dataRange from "@/components/data-range/data-range.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  validateStart,
  validateEnd
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "money-list-keepAlive",
  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        // bizCodeList: "",
        brandId: "",
        userId: "",
        activityType: ""
      },
      page: 0,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      defaultTime: [
        {
          select: null,
          data: [
            {
              id: "today",
              name: "今天"
            },
            {
              id: "yesterday",
              name: "昨天"
            },
            {
              id: "week",
              name: "7天前"
            },
            {
              id: "month",
              name: "30天前"
            }
          ]
        }
      ],
      columns1: [
        {
          title: "时间",
          key: "createTime",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "活动类型",
          key: "activityType",
          minWidth: 100,
          render: (h, params) => {
            let arr = [
              "",
              "扫码活动",
              "摇奖活动",
              "陈列活动",
              "阶梯活动",
              "520活动"
            ];
            return h("div", arr[Number(params.row.activityType)]);
          }
        },
        {
          title: "业务单号",
          key: "bizNo",
          minWidth: 150,
          align: "center"
        },
        {
          title: "用户ID",
          key: "userId",
          minWidth: 150,
          align: "center"
        },
        {
          title: "交易单号",
          key: "wxTradeNo",
          align: "center",
          minWidth: 150
          // tooltip:true
        },
        {
          title: "类型",
          key: "bizCodeName",
          minWidth: 100,
          align: "center"
        },
        {
          title: "收支金额",
          key: "amount",
          minWidth: 150,
          align: "center"
        },
        {
          title: "账户结余",
          key: "balance",
          minWidth: 180,
          align: "center"
        },
        {
          title: "状态",
          key: "status",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", this.Global.ENUMS.payStatus[params.row.status]);
          }
        },
        {
          title: "记账摘要",
          key: "summary",
          minWidth: 100,
          align: "center",
          tooltip: true
        }
      ],
      pageData: [],
      brandList: [],
      pageNum: 0,
      page: 1
    };
  },
  components: {
    edd,
    dataRange
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.init(1, 10);
      }
    });
  },
  methods: {
    select(parent, children) {
      //时间选择
      if (this.defaultTime[parent].select == children) {
        this.defaultTime[parent].select = null;
        this.formData.queryStartTime = EDFAULT_STARTTIME;
        this.formData.queryEndTime = EDFAULT_ENDTIME;
        return false;
      }
      this.defaultTime[parent].select = children;
      var name = this.defaultTime[parent].data[children].id;
      if (name == "today") {
        this.formData.queryStartTime =
          this.Global.defaultTime().today + " 00:00:00";
        this.formData.queryEndTime =
          this.Global.defaultTime().tomorrow + " 00:00:00";
        return;
      }
      if (name == "yesterday") {
        this.formData.queryStartTime =
          this.Global.defaultTime().yesterday + " 00:00:00";
        this.formData.queryEndTime =
          this.Global.defaultTime().today + " 00:00:00";
        return;
      }
      if (name == "week") {
        this.formData.queryStartTime =
          this.Global.defaultTime().week + " 00:00:00";
        this.formData.queryEndTime =
          this.Global.defaultTime().today + " 00:00:00";
        return;
      }
      if (name == "month") {
        this.$set(
          this.formData,
          "queryStartTime",
          this.Global.defaultTime().month + " 00:00:00"
        );
        this.$set(
          this.formData,
          "queryEndTime",
          this.Global.defaultTime().today + " 00:00:00"
        );
        return;
      }
    },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(1, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    show(index) {
      this.$Modal.confirm({
        title: "",
        render: h => {
          return h(edd, {
            props: {
              row: this.data1[index]
            }
          });
        },
        onOk: function() {}
      });
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
      data["currentPage"] = currentPage;
      data["pageSize"] = pageSize;
      this.Global.doPost("brandAccount/queryBillList.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    payStatus(val) {
      return this.Global.ENUMS.payStatus[val];
    },

    formatYearMonth(time) {
      /**
       * @desc 格式化时间
       * @param {String} 时间戳
       * @return {String} 11月11日
       */
      return new Date(Number(time)).pattern("yyyy-MM-dd");
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "brandAccount/queryBillListExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>