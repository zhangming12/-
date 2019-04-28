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
    <!-- <h2 class="Title" id="Title">业代关联门店分布</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="10">
            <Form-item label="品牌名称" prop="brandId" :label-width="90">
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="brandChangeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="10" offset="1"></Col>
          <Col span="2" offset="1">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="box" style="margin-top: 15px;padding-bottom:20px">
      <div id="scancodeActivity" :style="{  height: '800px'}"></div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import "echarts/map/js/china.js";
export default {
  name: "national-stores-statistics-keepAlive",

  data() {
    return {
      formData: {
        brandId: "",
        brandName: ""
      },
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }]
      },
      brandList: [],
      activityList: [],
      myChart: "",
      boxHeight: null
    };
  },
  components: {},
  created: function() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
      }
    });
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = echarts.init(document.getElementById("scancodeActivity"));

      function randomData() {
        return Math.round(Math.random() * 1000);
      }

      var data = [
        {
          name: "澳门",
          value1: 1,
          value2: randomData()
        },
        {
          name: "香港",
          value1: 1,
          value2: randomData()
        },
        {
          name: "台湾",
          value1: 4,
          value2: randomData()
        },
        {
          name: "宁夏",
          value1: 1193,
          value2: randomData()
        },
        {
          name: "西藏",
          value1: 1567,
          value2: randomData()
        },
        {
          name: "海南",
          value1: 1642,
          value2: randomData()
        },
        {
          name: "青海",
          value1: 1671,
          value2: randomData()
        },
        {
          name: "贵州",
          value1: 2679,
          value2: randomData()
        },
        {
          name: "广西",
          value1: 3035,
          value2: randomData()
        },
        {
          name: "吉林",
          value1: 3109,
          value2: randomData()
        },
        {
          name: "上海",
          value1: 3630,
          value2: randomData()
        },
        {
          name: "江西",
          value1: 4426,
          value2: randomData()
        },
        {
          name: "云南",
          value1: 4451,
          value2: randomData()
        },
        {
          name: "甘肃",
          value1: 4501,
          value2: randomData()
        },
        {
          name: "天津",
          value1: 4709,
          value2: randomData()
        },
        {
          name: "内蒙古",
          value1: 5461,
          value2: randomData()
        },
        {
          name: "福建",
          value1: 5519,
          value2: randomData()
        },
        {
          name: "重庆",
          value1: 5761,
          value2: randomData()
        },
        {
          name: "黑龙江",
          value1: 5908,
          value2: randomData()
        },

        {
          name: "新疆",
          value1: 6204,
          value2: randomData()
        },
        {
          name: "北京",
          value1: 8105,
          value2: randomData()
        },
        {
          name: "安徽",
          value1: 8297,
          value2: randomData()
        },
        {
          name: "山西",
          value1: 8568,
          value2: randomData()
        },
        {
          name: "湖北",
          value1: 8907,
          value2: randomData()
        },
        {
          name: "湖南",
          value1: 9083,
          value2: randomData()
        },
        {
          name: "陕西",
          value1: 9747,
          value2: randomData()
        },
        {
          name: "辽宁",
          value1: 11868,
          value2: randomData()
        },
        {
          name: "四川",
          value1: 12994,
          value2: randomData()
        },
        {
          name: "河北",
          value1: 13921,
          value2: randomData()
        },
        {
          name: "河南",
          value1: 16976,
          value2: randomData()
        },
        {
          name: "浙江",
          value1: 18146,
          value2: randomData()
        },

        {
          name: "山东",
          value1: 19946,
          value2: randomData()
        },
        {
          name: "江苏",
          value1: 25321,
          value2: randomData()
        },
        {
          name: "广东",
          value1: 61606,
          value2: randomData()
        }
      ];

      var resultdata0 = [];
      var resultdata1 = [];
      var resultdata2 = [];
      var sum0 = 0;
      var sum1 = 0;
      var sum2 = 0;
      var titledata = [];
      for (var i = 0; i < data.length; i++) {
        var d0 = {
          name: data[i].name,
          value: data[i].value1 + data[i].value2
        };
        var d1 = {
          name: data[i].name,
          value: data[i].value1
        };
        var d2 = {
          name: data[i].name,
          value: data[i].value2
        };
        titledata.push(data[i].name);
        resultdata0.push(d1);
        resultdata1.push(d1);
        resultdata2.push(d2);
        sum0 += data[i].value1 + data[i].value2;
        sum1 += data[i].value1;
        sum2 += data[i].value2;
      }

      function NumDescSort(a, b) {
        return a.value - b.value;
      }
      console.log(resultdata0);
      resultdata0.sort(NumDescSort);
      console.log(resultdata0);
      resultdata1.sort(NumDescSort);
      resultdata2.sort(NumDescSort);

      let option = {
        title: [
          {
            text: "全国门店分布",

            left: "center"
          },
          {
            text: "全部: " + sum1,
            right: 120,
            top: 40,
            width: 100,
            textStyle: {
              color: "#fff",
              fontSize: 16
            }
          }
        ],
        tooltip: {
          trigger: "item"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["全部"],
          selectedMode: "single"
        },
        visualMap: {
          min: 0,
          max: 70000,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          calculable: true,
          colorLightness: [0.2, 100],
          color: ["#cfcfcf", "#bfbfbf", "#828282"],
          dimension: 0
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: {
              readOnly: false
            },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          right: 40,
          top: 100,
          bottom: 40,
          width: "30%"
        },
        xAxis: [
          {
            position: "top",
            type: "value",
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            data: titledata,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        series: [
          {
            z: 1,
            name: "全部",
            type: "map",
            map: "china",
            left: "10",
            right: "35%",
            top: 100,
            bottom: "35%",
            zoom: 0.75,
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            //roam: true,
            data: resultdata0
          },
          {
            name: "全部",
            z: 2,
            type: "bar",
            label: {
              normal: {
                show: true
              },
              emphasis: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                color: "rgb(254,153,78)"
              }
            },
            data: resultdata0
          }
        ]
      };

      this.myChart.setOption(option);
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          //this.getTimeList();
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      if (JSON.stringify(data) == "{}") {
        this.$Message.error("至少有一个筛选条件");
        return;
      }
      //业代关联门店分布报表 params:brandId,activityId
      this.Global.doPost("report/workerStoreDistribution.json", data, res => {
        let datalist = res;

        let brandAllStoreCount = []; //关联门店数
        let brandWorkerCount = []; //业代数
        for (var key in datalist) {
          brandAllStoreCount.push(datalist[key]["allStoreCount"]); //关联门店数
          brandWorkerCount.push(datalist[key]["workerCount"]); //业代数
        }

        this.myChart.setOption({
          xAxis: {
            type: "category",
            boundaryGap: false,
            data: brandAllStoreCount
          },
          series: [
            {
              name: "业代数量",
              type: "line",
              stack: "总量",
              label: {
                normal: {
                  show: true,
                  position: "top"
                }
              },
              areaStyle: { normal: {} },
              data: brandWorkerCount
            }
          ]
        });
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

    brandChangeValue(value) {
      this.activityList = [];
      let brandList = this.brandList;

      for (let i = 0, len = brandList.length; i < len; i++) {
        if (value == brandList[i].id) {
          this.formData.brandId = brandList[i].id;
          this.formData.brandName = brandList[i].brandName;
        }
      }
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