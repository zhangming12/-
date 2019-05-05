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
.center-title {
  text-indent: 1%;
  padding: 10px 0;
  font-size: 16px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列上传成长曲线</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称:" prop="brandId" :label-width="90">
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="活动包名:" prop="groupId" :label-width="90">
              <Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList">
                <Option
                  :value="item.id"
                  v-for="(item,index) in groupList"
                  :key="index"
                >{{ item.groupName }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="7">
            <Form-item label="陈列活动:" prop="activityId" :label-width="90">
              <Select
                v-model="formData.activityId"
                placeholder="请选择"
                @on-change="activetyChangeValue"
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

    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div id="scancodeActivity" :style="{height: '500px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { storeDisplayUploadScanGrowthCurve } from "@/api/activity-manage/display-activity-manage.js";
export default {
  name: "display-growup-curve-keepAlive",
  data() {
    return {
      formData: {
        brandId: "",
        brandName: "",
        activityId: "",
        groupId: "",
        activityName: ""
      },
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }],
        groupId: [{ required: true, message: "请选择活动包名称" }]
      },
      brandList: [],
      groupList: [],
      activityList: [],
      myChart: ""
    };
  },
  components: {},
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 3, scope: "a" },
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
  mounted() {
    this.drawLine();
  },
  methods: {
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 3, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, activityType: 3, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.groupList.push({ id: Number(item[0]), groupName: item[1] });
          });
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].id;
            this.getActivityList(this.formData.groupId);
          }
        }
      );
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("scancodeActivity"));
      let option = {
        title: {
          text: "陈列上传成长曲线"
        },
        tooltip: {
          trigger: "axis"
        },
        // color: ["#FF0000"],
        legend: {
          data: ["当日上传门店数", "当日上传数"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: "保存"
            }
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
          //data:this.activityGrowup.activityCountDate,
        },
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} "
            },
            min: 0,
            max: 30
          }
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100
          },
          {
            show: true,
            type: "slider",
            y: "90%",
            start: 50,
            end: 100
          }
        ],
        series: [
          {
            name: "当日上传门店数",
            type: "line",
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: []
          },
          {
            name: "当日上传数",
            type: "line",
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: []
          }
        ]
      };

      this.myChart.setOption(option);
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      storeDisplayUploadScanGrowthCurve(data).then(res => {
        if (res.status == "1") {
          let datalist = res.data;
          let activityCountDate = []; //时间
          let activityScanCount = []; //当日上传门店数
          let activityStoreCount = []; //活跃门店数
          for (var key in datalist) {
            activityCountDate.push(datalist[key]["countDate"]);
            activityScanCount.push(datalist[key]["uploadCount"]);
            activityStoreCount.push(datalist[key]["storeCount"]);
          }
          //分别返回扫码量和门店数最大值
          let ScanMax = Math.max.apply(Math, activityScanCount);
          let StoreMax = Math.max.apply(Math, activityStoreCount);

          //返回扫码量和门店数中最大值
          let NumberMax = ScanMax > StoreMax ? ScanMax : StoreMax;
          this.myChart.setOption({
            xAxis: {
              type: "category",
              boundaryGap: false,
              data: activityCountDate
            },
            yAxis: [
              {
                type: "value",
                axisLabel: {
                  formatter: "{value} "
                },
                min: 0,
                max: NumberMax
              }
            ],
            series: [
              {
                name: "当日上传门店数",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityStoreCount
              },
              {
                name: "当日上传数",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityScanCount
              }
            ]
          });
        }
      });
    },
    getTimeList() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      if (JSON.stringify(data) == "{}") {
        this.$Message.error("至少有一个筛选条件");
        return;
      }
      //获取活动周序列表 params:brandId,activityId
      this.Global.doPost("report/getActivityWeekDict.json", data, res => {
        let datalist = res;
        let timeItem = [];
        for (var key in datalist) {
          timeItem.push(datalist[key][1]);
        }
        this.activityGrowup = timeItem;
      });
    },
    activetyChangeValue(value) {
      let activityList = this.activityList;
      for (var i = 0; i < activityList.length; i++) {
        if (value == activityList[i].id) {
          this.formData.activityId = activityList[i].id;
          this.formData.activityName = activityList[i].name;
        }
      }
    }
  }
};
</script>