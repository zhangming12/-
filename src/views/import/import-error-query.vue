<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}
table th {
  height: 20px !important;
}
</style>

<template>
	<div id="Main">
		<h2 class="Title">导入错误查询</h2>
		<div class="box">
			<Form ref="form" :model="formData" :label-width="85">
				<Row>
					<Col span="21">
                        <Form-item label="导入时间:">
                            <Row>
                                <Col span="11">
                                    <Form-item prop="queryStartTime">
                                        <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime" start></data-range>
                                    </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center;">至</Col>
                                <Col span="11">
                                    <Form-item prop="queryEndTime">
                                        <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                                    </Form-item>
                                </Col>
                            </Row>
                        </Form-item>
					</Col>
                    <Col span='2' offset="1">
                        <div class="searchBox">
                            <Button @click="submit()" class="btn-search  search_btn" type="primary">查询</Button>
                        </div>

					</Col>
				</Row>
			</Form>
		</div>
		<div class="box" style='margin-top: 15px;overflow: hidden;padding-bottom:20px;'>
			<Table size="small" :columns="columns1" :data="pageData" border disabled-hover></Table>

		</div>
		<div style="margin: 10px;overflow: hidden">
			<div style="float: right;">
				<Page :total="pageNum" :current="page" @on-change="changePage"></Page>
			</div>
		</div>
	</div>
</template>

<script>
import dataRange from "../../components/data-rang.vue";

import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
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
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      screenWidth: document.body.clientWidth,
      formData: {
        queryStartTime: EDFAULT_ENDTIME,
        queryEndTime: EDFAULT_ENDTIME
      },
      pageData: [],
      columns1: [
        {
          title: "序号",
          type: "index",
          align: "center"
        },
        {
          title: "时间",
          key: "createTime",
          align: "center",
          render: (h, params) => {
            return h("div", this.formatYearMonth(params.row.createTime));
          }
        },
        {
          title: "入参",
          //   key: "createTime",
          align: "center",
          children: [
            {
              title: "Company Address",
              key: "caddress",
              align: "center"
            },
            {
              title: "Company Name",
              key: "cname",
              align: "center"
            }
          ]
        }
      ],
      // columns1: [
      //   {
      //     title: "Name",
      //     key: "name",
      //     align: "center",
      //     width: 200,
      //     fixed: "left"
      //   },
      //   {
      //     title: "Other",
      //     align: "center",
      //     children: [
      //       {
      //         title: "Age",
      //         key: "age",
      //         align: "center",
      //         width: 200
      //       },
      //       {
      //         title: "Address",
      //         key: "street",
      //         align: "center"
      //       }
      //     ]
      //   },
      //   {
      //     title: "Company",
      //     key: "caddress",
      //     align: "center"
      //   },
      //   {
      //     title: "Gender",
      //     key: "gender",
      //     align: "center",
      //     width: 200,
      //     fixed: "right"
      //   }
      // ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10 //每页数据条数，默认10条
    };
  },
  created() {},
  mounted() {
    const data = [];
    for (let i = 0; i < 10; i++) {
      data.push({
        key: i,
        name: "John Brown",
        age: i + 1,
        street: "Lake Park",
        building: "C",
        door: 2035,
        caddress: "Lake Street 42",
        cname: "SoftLake Co",
        gender: "M"
      });
    }
    this.pageData = [];
  },
  components: {
    dataRange
  },
  methods: {
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
      this.formData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
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
      this.page = 1;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
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
      console.log(data);
      return false;
      this.Global.doPost("", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>