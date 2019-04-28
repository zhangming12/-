<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}
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
  margin-right: 10px;
  cursor: pointer;
}

.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
}
.ivu-date-picker {
  display: block;
}
.center-title {
  text-indent: 1%;
  padding: 10px 0;
  font-size: 16px;
}
.top {
  overflow: hidden;
  .top-img {
    text-align: center;
  }
  .top-icon {
    overflow: hidden;
    cursor: pointer;
    img {
      float: right;
      width: 20px;
      height: 20px;
    }
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">上传视频统计导出</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88">
        <Row>
          <Col span="14">
            <Form-item label="时间:">
              <Row>
                <Col span="11">
                  <Form-item prop="queryStartTime">
                    <data-range
                      @dataChange="startTimeChange"
                      hour="00:00"
                      :time="formData.queryStartTime"
                      start
                    ></data-range>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center;">至</Col>
                <Col span="11">
                  <Form-item prop="queryEndTime">
                    <data-range
                      hour="24:00"
                      placeholder="结束时间"
                      @dataChange="endTimeChange"
                      :time="formData.queryEndTime"
                    ></data-range>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
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
          <Col span="7">
            <Form-item label="品牌名称" prop="brandId">
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="活动名称">
              <Select
                v-model="formData.activityId"
                placeholder="请选择"
                @on-change="activityChangeValue"
              >
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="2" offset="1">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>

    <div class="box" style="margin-top: 15px;overflow: hidden;padding-bottom:20px;">
      <div class="contentTop">
        <Button
          class="btn-export"
          icon="ios-download-outline"
          @click="exportExcel"
          type="primary"
        >导出</Button>
      </div>
      <Table :columns="columns1" :data="pageData" disabled-hover></Table>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import {
  typeQueryActivityVOByGroupId, //根据品牌ID获取活动包名
  typeQueryActivityGroupVOByBrandId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
export default {
  name: "upload-video-import-keepAlive",

  data() {
    return {
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: EDFAULT_ENDTIME,
        hour: "24:00"
      },
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        // queryMonth:"",
        brandId: "",
        groupId: "",
        activityId: ""
        // brandName: "",
        // queryMonth: ""
      },
      pageData: [],
      columns1: [
        {
          title: "销售大区",
          key: "salesRegion",
          align: "center",
          minWidth: 120,
          render: (h, params) => {
            if (params.row.salesRegion == "total") {
              return h(
                "div",
                {
                  style: {
                    color: "red"
                  }
                },
                "合计："
              );
            } else {
              return h("div", params.row.salesRegion);
            }
          }
        },
        {
          title: "营业部",
          key: "busiDept",
          align: "center",
          minWidth: 120
        },
        {
          title: "上报门店数",
          key: "upStoreNum",
          align: "center",
          minWidth: 120
        },
        {
          title: "上报活动数",
          key: "upActNum",
          align: "center",
          minWidth: 120
        },
        {
          title: "上传视频数",
          key: "videoNum",
          align: "center",
          minWidth: 120
        },
        {
          title: "上传视频用户数",
          key: "storeNum",
          align: "center",
          minWidth: 150
        },
        {
          title: "合格视频数",
          key: "videoCheck",
          align: "center",
          minWidth: 120
        },
        {
          title: "视频合格用户数",
          key: "storeCheck",
          align: "center",
          minWidth: 150
        },
        {
          title: "不合格视频数",
          key: "videoUnCheck",
          align: "center",
          minWidth: 120
        },
        {
          title: "不合格用户数",
          key: "storeUnCheck",
          align: "center",
          minWidth: 120
        }
      ],
      pageNum: 0, //总页数
      page: 1, //当前页
      pageSize: 10, //每页数据条数，默认10条
      brandList: [],
      groupList: [],
      activityList: [],
      timeDataList: []
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
      }
    });
  },
  components: {
    dataRange
  },
  methods: {
    activityChangeValue(value) {
      let activityList = this.activityList; //品牌列表
      for (var i = 0; i < activityList.length; i++) {
        if (value == activityList[i].id) {
          this.formData.activityId = activityList[i].id;
          this.formData.activityName = activityList[i].name;
        }
      }
      if (this.activityList.length > 0) {
        setTimeout(() => {
          this.getTimeDataList(); //获取活动周序列表
        }, 500);
      } else {
        this.timeDataList = [];
      }
    },
    getTimeDataList() {
      //获取活动周序列表
      let data = {
        brandId: this.formData.brandId,
        activityId: this.formData.activityId
      };
      this.Global.doPost("report/getActivityMonthDict.json", data, res => {
        if (res) {
          let timeDataList = [];
          for (const key in res) {
            let item = {
              queryMonth: res[key]
            };
            timeDataList.push(item);
          }
          this.timeDataList = timeDataList;
          this.formData.queryMonth = timeDataList[0].queryMonth;
        }
      });
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
      this.formData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    exportExcel() {
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
      delete data["queryMonth"];
      delete data["activityName"];
      console.log(data);
      this.Global.deleteEmptyProperty(data);
      let url = this.Global.getExportUrl(
        "report/uploadViedoDetailExport.json",
        data
      );
      window.open(url);
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.page = 1;
          this.init();
        } else {
          this.$Message.error("请输入查询条件！");
        }
      });
    },
    init() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
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
      delete data["queryMonth"];
      delete data["activityName"];
      // data["currentPage"] = this.page;
      // data["pageSize"] = this.pageSize;
      this.Global.doPost("report/uploadViedoDetail.json", data, res => {
        // console.log(res);

        // this.pageNum = res.items;
        // this.page = res.page;
        if (res.datalist && res.datalist.length) {
          let storeUnCheck = 0; //不合格用户数
          let videoUnCheck = 0; //不合格视频数
          let storeCheck = 0; //视频合格用户数
          let videoCheck = 0; //视频合格数
          let storeNum = 0; //上传视频用户数
          let videoNum = 0; //上传视频数
          let upStoreNum = 0; //上报门店数
          let upActNum = 0; //上报活动数
          res.datalist.forEach(item => {
            storeUnCheck += item.storeUnCheck ? item.storeUnCheck : 0;
            videoUnCheck += item.videoUnCheck ? item.videoUnCheck : 0;
            storeCheck += item.storeCheck ? item.storeCheck : 0;
            videoCheck += item.videoCheck ? item.videoCheck : 0;
            storeNum += item.storeNum ? item.storeNum : 0;
            videoNum += item.videoNum ? item.videoNum : 0;
            upStoreNum += item.upStoreNum ? item.upStoreNum : 0;
            upActNum += item.upActNum ? item.upActNum : 0;
          });
          res.datalist.push({
            storeUnCheck,
            videoUnCheck,
            storeCheck,
            videoCheck,
            storeNum,
            videoNum,
            upStoreNum,
            upActNum,
            salesRegion: "total"
          });
          this.pageData = res.datalist;
        }
      });
    },
    getActivityList(value) {
      if (!value) return;
      this.activityList = [];
      this.formData.activityId = "";
      typeQueryActivityVOByGroupId({ groupId: value, type: 3 }).then(res => {
        if (res && res.status == 1) {
          this.activityList = res.data;
        }
      });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      typeQueryActivityGroupVOByBrandId({ brandId: value, groupType: 3 }).then(
        res => {
          if (res && res.status == 1) {
            this.groupList = res.data;
            if (res.data && res.data.length) {
              this.formData.groupId = res.data[0].id;
            }
          }
        }
      );
    },
    timeDataChangeValue(value) {
      let timeDataList = this.timeDataList;
      if (value) {
        for (var i = 0; i < timeDataList.length; i++) {
          if (value == timeDataList[i].actStartTime) {
            this.formData.queryMonth = timeDataList[i].queryMonth;
          }
        }
      }
    }
  }
};
</script>


