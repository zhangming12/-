<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto 15px;
  padding: 30px 20px 0;
  background: #fff;
}

.ivu-radio-wrapper {
  margin-right: 30px;
}
.buttonBox {
  padding: 10px 0;
}
.roleBox {
  overflow: hidden;
  width: 100%;
  height: auto;
  .roleBoxLeft,
  .roleBoxRight {
    float: left;
    width: 48%;
    margin-left: 2%;
    box-sizing: border-box;
  }
  .roleBoxLeft {
    border-right: 1px solid #e5e5e5;
  }
}
.tableBox {
  min-height: 410px;
  position: relative;
  margin-top: 15px;
  overflow: hidden;
  text-align: center;
  padding-bottom: 70px;
  .pageBox {
    position: absolute;
    bottom: 20px;
    right: 20px;
    overflow: hidden;
    margin: 10px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">客资更新操作日志</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88">
        <Row>
          <Col span="21">
            <Row>
              <Col span="16">
                <Form-item label="操作时间:" required>
                  <Row>
                    <Col span="11">
                      <Form-item prop="startTime">
                        <data-range
                          @dataChange="startTimeChange"
                          hour="00:00"
                          :time="formData.startTime"
                          start
                        ></data-range>
                      </Form-item>
                    </Col>
                    <Col span="2" style="text-align: center;">至</Col>
                    <Col span="11">
                      <Form-item prop="endTime">
                        <data-range
                          hour="24:00"
                          placeholder="结束时间"
                          @dataChange="endTimeChange"
                          :time="formData.endTime"
                        ></data-range>
                      </Form-item>
                    </Col>
                  </Row>
                </Form-item>
                <Form-item label="客户编号:">
                  <Input v-model.trim="formData.joinCode" placeholder="请输入客户编号"></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="操作人:">
                  <Input v-model.trim="formData.userName" placeholder="请输入操作人"></Input>
                </Form-item>
              </Col>
            </Row>
          </Col>
          <Col span="2" offset="1" style="margin-top:20px;">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box tableBox">
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
      <div class="pageBox">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import area from "@/config/areaCode.js";
import dataRange from "@/components/data-rang.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "guest-update-operation-log-keepAlive",
  components: {
    dataRange
  },
  data() {
    return {
      baseData: area,
      showSettingRole: false,
      type: "", //类型 add 新建  modify 修改
      formData: {
        startTime: EDFAULT_STARTTIME,
        endTime: EDFAULT_ENDTIME,
        joinCode: "", //客户编号
        userName: "" //操作人
      },
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      formItem: {
        userName: "",
        password: "",
        phone: ""
      },
      page: 1,
      pageSize: 10,
      pageNum: 0,
      rules: {},
      columns1: [
        {
          title: "客户编号",
          key: "joinCode",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作类型",
          key: "userName",
          align: "center",
          minWidth: 120,
          render: (h, f) => {
            return h("div", "更新");
          }
        },
        {
          title: "操作人",
          key: "userName",
          align: "center",
          minWidth: 120
        },
        {
          title: "操作时间",
          key: "operateTime",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            let str = "";
            if (!params.row.operateTime) {
              str = "";
            } else {
              str = this.Global.createTime(params.row.operateTime);
            }
            return h("div", str);
          }
        },
        {
          title: "属性变更情况",
          key: "params",
          align: "center",
          minWidth: 400,
          render: (h, f) => {
            let arr = [];
            let tag = [];
            if (f.row.params) {
              arr = f.row.params.split("|");
              for (let i = 0; i < arr.length; i++) {
                tag.push(h("p", arr[i]));
              }
              return h("div", tag);
            }
          }
        },
        {
          title: "备注",
          key: "memo",
          align: "center",
          minWidth: 100
        }
      ],
      pageData: [],
      page: 1,
      pageNum: 0
    };
  },
  created() {},
  watch: {},
  methods: {
    startTimeChange(value) {
      this.start.hour = value.hour;
      this.start.time = value.time;
      if (value.hour == "24:00") {
        return;
      }
      this.formData.startTime = this.Global.setHoursData(
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
      this.formData.endTime = this.Global.setHoursData(value.time, value.hour);
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
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);

      data["startTime"] = this.Global.createTime(this.formData.startTime);
      if (this.start.hour == "24:00") {
        data["startTime"] = this.Global.setHoursData(
          this.start.time,
          this.start.hour
        );
      }

      data["endTime"] = this.Global.createTime(this.formData.endTime);
      if (this.end.hour == "24:00") {
        data["endTime"] = this.Global.setHoursData(
          this.end.time,
          this.end.hour
        );
      }
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("hbBaseData/getUpdateDiffLog.json", data, res => {
        this.pageNum = res.items;
        this.page = res.page;
        this.pageData = res.datalist;
      });
    }
  }
};
</script>