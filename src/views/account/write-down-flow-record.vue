<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
}

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}
.time:last-child {
  margin-right: 0px;
}
.select {
  background: @primary-color;
  color: #fff;
}
.ivu-radio-wrapper {
  margin-right: 15px;
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
    <!-- <h2 class="Title">实物流水记录</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="50" :rules="rule">
        <Row>
          <Col span="21">
            <Row>
              <Col span="14">
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
              </Col>
              <Col span="10">
                <Form-item>
                  <ul v-for="(i,index) in defaultTime" :key="index">
                    <li
                      :class="[{select: i.select == num},'time']"
                      v-for="(j,num) in i.data"
                      :key="num"
                      @click="select(index,num)"
                    >{{ j.name }}</li>
                  </ul>
                </Form-item>
              </Col>
              <Col span="24">
                <Row>
                  <Col span="8">
                    <Form-item label="品牌名称:" prop="brandId" :label-width="80">
                      <Select v-model="formData.brandId" placeholder="请选择品牌">
                        <Option
                          :value="item.id"
                          v-for="(item,index) in brandList"
                          :key="index"
                        >{{ item.brandName }}</Option>
                      </Select>
                    </Form-item>

                    <Form-item label="折扣名称:" prop="goodsName" :label-width="80">
                      <Input v-model.trim="formData.goodsName" placeholder="请输入折扣名称"></Input>
                    </Form-item>
                  </Col>
                  <Col span="8">
                    <Form-item label="类型:" prop="recordType" :label-width="80">
                      <Select v-model="formData.recordType" placeholder="请选择类型" clearable>
                        <Option value="发奖">发奖</Option>
                        <Option value="核销收货">核销收货</Option>
                        <Option value="确认收货">确认收货</Option>
                      </Select>
                    </Form-item>
                    <Form-item label="客户编号:" prop="joinCode" :label-width="80">
                      <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
                    </Form-item>
                  </Col>
                  <Col span="8">
                    <Form-item label="流水单号:" prop="recordNo" :label-width="80">
                      <Input v-model.trim="formData.recordNo" placeholder="请输入流水单号"></Input>
                    </Form-item>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1" style="margin-top:24px;text-align:center;">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
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
          type="info"
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
import dataRange from "@/components/data-range/data-range.vue";

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "write-down-flow-record-keepAlive",
  data() {
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        joinCode: "",
        goodsName: "",
        recordType: ""
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
          key: "recordTime",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", this.Global.createTime(params.row.recordTime));
          }
        },
        {
          title: "品牌名称",
          key: "brandName",
          align: "center",
          width: 120
        },
        {
          title: "用户ID",
          key: "storeId",
          align: "center",
          width: 120
        },
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          width: 120
        },
        {
          title: "客户名称",
          key: "userName",
          align: "center",
          width: 120
        },
        {
          title: "类型",
          key: "recordType",
          align: "center",
          width: 120
        },
        {
          title: "流水单号",
          key: "recordNo",
          align: "center",
          width: 120
        },
        {
          title: "核销折扣",
          key: "goodsName",
          align: "center",
          width: 120
        },
        {
          title: "数量",
          key: "recordAmount",
          align: "center",
          width: 120,
          render: (h, f) => {
            return h("div", f.row.recordAmount + "份");
          }
        },

        {
          title: "配送/核销员编号",
          key: "workerNo",
          align: "center",
          width: 180
        },
        {
          title: "配送/核销员姓名",
          key: "workerName",
          align: "center",
          width: 180
        },
        {
          title: "配送/核销员手机",
          key: "workerPhone",
          align: "center",
          width: 180
        }
      ],
      pageData: [],
      brandList: [],
      pageNum: 0,
      page: 1,
      currentPage: 1,
      pageSize: 10
    };
  },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.$route.query.brandId
          ? Number(this.$route.query.brandId)
          : this.brandList[0].id;
        this.init();
      }
    });
  },
  components: {
    dataRange
  },
  methods: {
    dataChange(val) {
      //将结束时间默认设置为当天的23:59:59
      this.formData.queryEndTime = val.slice(0, 11) + "23:59:59";
    },
    select(parent, children) {
      //时间选择
      if (this.defaultTime[parent].select == children) {
        this.defaultTime[parent].select = null;
        this.formData.queryStartTime = EDFAULT_STARTTIME;
        this.formData.queryEndTime = EDFAULT_TOMORROW;
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
        this.formData.queryStartTime =
          this.Global.defaultTime().month + " 00:00:00";
        this.formData.queryEndTime =
          this.Global.defaultTime().today + " 00:00:00";
        return;
      }
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      data["currentPage"] = this.currentPage;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("report/displayGoodsBillRecord.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    changePage(size) {
      this.currentPage = size;
      this.init();
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);

      this.Global.deleteEmptyProperty(data);
      // return
      var url = this.Global.getExportUrl(
        "report/displayGoodsBillRecordExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>