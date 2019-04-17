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
      <!-- <h2 class="Title">转入&转出记录</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="50" :rules="rule">
                <Row>
                    <Col span="11">
                        <Form-item label="时间:" required :label-width="80">
                            <Row>
                                <Col span="11">
                                    <Form-item prop="queryStartTime">
                                      <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center;">至</Col>
                                <Col span="11">
                                    <Form-item prop="queryEndTime">
                                        <data-range hour="24:00" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="品牌名称:" prop="brandId" :label-width="80">
                            <Select v-model="formData.brandId" placeholder="请选择品牌" >
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="10" order="1">
                        <Form-item>
                            <ul v-for="(i,index) in defaultTime" :key="index">
                                <li :class="[{select: i.select == num},'time']" v-for="(j,num) in i.data" :key="num" @click="select(index,num)">{{ j.name }}</li>  
                            </ul>
                        </Form-item>
                        <Form-item label="类型:" prop="remitArrow" style="margin-left:24px">
                            <Radio-group v-model="formData.remitArrow">
                                <Radio label="1">转入/充值</Radio>
                                <Radio label="2">转出/提现</Radio>
                            </Radio-group>
                        </Form-item>
                    </Col>
                    <Col span="2" style="margin-top:24px">
                        <Form-item>
                            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                        </Form-item>
                    </Col>
                </Row>        
            </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px">

        <div class='contentTop'>
            <Button @click="exportExcel" class="btn-export ivu-btn" icon="ios-download-outline" type="primary">导出</Button>
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
import dataRange from "../../../components/data-rang.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name:"out-list-keepAlive",
  data() {
    const that = this;
    const validateStart = (rule, value, callback) => {
      // 验证开始时间
      if (value == "") {
        callback(new Error("请输入开始时间"));
      } else {
        if (this.formData.queryEndTime !== "") {
          // 对结束时间单独验证
          this.$refs.form.validateField("queryEndTime");
        }
        callback();
      }
    };
    const validateEnd = (rule, value, callback) => {
      // 验证结束时间

      if (value == "") {
        callback(new Error("请输入结束时间"));
      } else {
        const str = new Date(this.formData.queryStartTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
          // 判断开始时间是否大于结束时间
          callback(new Error("开始时间大于结束时间"));
        } else {
          callback();
        }
      }
    };
    return {
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        remitArrow: "",
        brandId: ""
      },
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
          render: (h, params) => {
            return h("div", that.Global.createTime(params.row.createTime));
          }
        },
        {
          title: "转入转出单号",
          key: "recNo",
          align: "center"
        },
        {
          title: "类型",
          key: "remitArrow",
          align: "center",
          render: (h, params) => {
            var status = params.row.remitArrow;
            if (status == 1) {
              status = "转入";
            } else {
              status = "转出";
            }
            return h("div", status);
          }
        },
        {
          title: "金额",
          key: "remitPrice",
          align: "center"
        },
        // {
        //   title: "状态",
        //   key: "payStatus",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", this.Global.ENUMS.payStatus[params.row.payStatus]);
        //   }
        // },
        {
          title: "备注",
          key: "memo",
          align: "center"
        }
      ],
      pageData: [],
      brandList: [],
      pageNum: 0,
      page: 1,
      pageSize: 10,
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
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
        this.init(1);
      }
    });
  },
  methods: {
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
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryStartTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    endTimeChange(value) {
      this.end.hour = value.hour;
      this.end.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.queryEndTime = this.Global.setHoursData(value.time, value.hour);
    },

    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init(1, 10);
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    
    init(currentPage) {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }

      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = currentPage;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("brandAccount/queryTransferList.json", data, res => {
        this.pageNum = res.items;
        this.pageData = res.datalist;
        this.page = res.page;
      });
    },
    changePage(size) {
      this.init(size, 10);
    },
    exportExcel() {
      this.$Message.error("暂时未开通此功能");
      return false;
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
      if (this.start.hour == "24:00") {
        data["queryStartTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["queryEndTime"] = this.Global.createTime(this.formData.queryEndTime);
      if (this.end.hour == "24:00") {
        data["queryEndTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "brandAccount/queryTransferList.json",
        data
      );
      window.open(url);
    }
  }
};
</script>


