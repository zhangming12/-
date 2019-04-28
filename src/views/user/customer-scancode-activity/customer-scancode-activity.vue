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
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">客户扫码活动分布</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="60" :rules="rule">
        <Row>
          <Col span="7">
            <Form-item label="品牌名称" prop="brandId" :label-width="90">
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
            <Form-item label="活动包名" prop="groupId" :label-width="90">
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
            <Form-item label="活动名称" prop="activityId" :label-width="90">
              <Select v-model="formData.activityId" placeholder="请选择" @on-change="changeActivity">
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
      <div id="scancodeActivity" :style="{height: '600px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "customer-scancode-activity-keepAlive",

  data() {
    return {
      formData: {
        brandId: "",
        groupId: "",
        activityId: ""
      },
      rule: {
        brandId: [{ required: true, message: "请选着品牌" }],
        groupId: [{ required: true, message: "请选择活动包名" }]
      },
      brandList: [],
      groupList: [],
      activityList: [],
      myChart: "",
      timeLine: "",
      searchIndex: 0,
      count: [0, 1, 2]
    };
  },
  components: {},
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 1, scope: "a", channel: "B" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.formData.brandName = this.brandList[0].brandName;
          console.log("value");
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("scancodeActivity"));
      let option = {
        baseOption: {
          timeline: {
            axisType: "category",
            autoPlay: false, //自动播放
            playInterval: 1000,
            data: [],
            label: {
              formatter: function(s) {
                return new Date(s).getMonth() + 1 + "-" + new Date(s).getDate();
              }
            }
          },
          title: {},
          tooltip: {},
          legend: {
            x: "center",
            data: ["门店数量"]
          },
          toolbox: {
            feature: {
              saveAsImage: {
                title: "保存"
              }
            }
          },
          calculable: true,
          grid: {
            top: 80,
            bottom: 100,
            right: "7%",
            left: "5%",
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow",
                label: {
                  show: true,
                  formatter: function(params) {
                    return params.value.replace("\n", "");
                  }
                }
              }
            }
          },
          xAxis: [
            {
              type: "category",
              name: "周扫码量",
              axisLabel: { interval: 0 },
              data: [],
              splitLine: { show: false }
            }
          ],
          yAxis: [
            {
              type: "value",
              name: "门店数量"
            }
          ],
          series: [{ name: "门店数量", type: "bar" }]
        },
        options: []
      };
      this.myChart.setOption(option, true);
      this.myChart.on("timelinechanged", timeLineIndex => {
        this.searchIndex = timeLineIndex.currentIndex;
        this.changeTime();
      });
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
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);

      this.Global.doPost("report/getActivityWeekDict.json", data, res => {
        if (res) {
          res.reverse();
          var arr = [];

          for (var i = 0; i < res.length; i++) {
            arr.push(res[i][1]);
          }
          // arr.reverse();
          this.dateArray = arr;
          this.timeLine = res;
          var option = {
            baseOption: {
              timeline: {
                data: arr
              }
            }
          };
          this.myChart.setOption(option);
          this.changeTime();
        } else {
          this.$Message.error("没有时间区间");
        }
      });
    },
    changeTime(time) {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["queryStartTime"] = this.timeLine[this.searchIndex][0];
      data["queryEndTime"] = this.timeLine[this.searchIndex][1];
      this.Global.doPost("report/storeScanDistribution.json", data, res => {
        this.lineChart(res);
      });
    },
    lineChart(res) {
      this.myChart.setOption({
        baseOption: {
          xAxis: [
            {
              data: this.getData(res).x_data
            }
          ],
          series: [
            {
              data: this.getData(res).series_data
            }
          ]
        }
      });
    },
    getData: function(res) {
      var obj = {
        x_data: [],
        series_data: []
      };
      for (var i = 0; i < res.length; i++) {
        obj.series_data.push(res[i].storeCount);
        obj.x_data.push(res[i].scanCount);
      }
      return obj;
    },
    changeValue(value) {
      let brandList = this.brandList;
      for (var i = 0; i < brandList.length; i++) {
        if (value == brandList[i].id) {
          this.formData.brandId = brandList[i].id;
          this.formData.brandName = brandList[i].brandName;
        }
      }
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { activityType: 1, scope: "a", brandId: value, channel: "B" },
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
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 7, activityType: 1, scope: "a", groupId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
        }
      );
    },
    changeActivity: function(value) {
      this.formData.activityName = value.label;
    }
  },
  destroyed: function() {
    this.myChart.dispatchAction({
      type: "timelinePlayChange",
      // 播放状态，true 为自动播放
      playState: false
    });
  }
};
</script>


