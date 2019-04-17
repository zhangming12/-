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
      <!-- <h2 class="Title">业代关联扫码趋势</h2> -->
        <div class="box">
                <Form ref="form" :model="formData" :label-width="88" :rules="rule">
                    <Row>
                        <Col span="10">
                            <Form-item label="品牌名称" prop="brandId" :label-width="90">
                                <Select v-model="formData.brandId" placeholder="请选择" @on-change="brandChangeValue">
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                </Select>  
                            </Form-item> 
                            <Form-item label="业代手机" prop="workerPhone" :label-width="90">
                                <Input v-model="formData.workerPhone"></Input> 
                            </Form-item>          
                        </Col>   
                        <Col span="10" offset="1" > 
                            <Form-item label="活动名称"  prop="activityId" :label-width="90">
                                <Select v-model="formData.activityId" placeholder="请选择" @on-change="activetyChangeValue">
                                    <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                                </Select>  
                            </Form-item> 
                        </Col>   
                        <Col span='2' offset="1" >
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
export default {
  name:"salesman-relate-scancode-keepAlive",

  data() {
    const that = this;
    return {
      formData: {
        brandId: "",
        brandName: "",
        activityId: "",
        activityName: "",
        workerPhone: ""
      },
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }],
        workerPhone: [{ required: true, message: "请填写手机号" }],
        activityId: [{ required: true, message: "请选择活动名称" }]
      },
      brandList: [],
      activityList: [],

      myChart: ""
    };
  },
  components: {},
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.brandChangeValue(this.formData.brandId);
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
      let option = {
        title: {
          text: "业代关联扫码趋势"
        },
        tooltip: {
          trigger: "axis"
        },
        color: ["#FF0000", "#00BFFF"],
        legend: {
          data: ["当日扫描数量", "门店数"]
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
            min: 1,
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
            name: "当日扫描数量",
            type: "line",
            lineStyle: {
              normal: {
                width: 2
              }
            },
            data: [10, 4]
          },
          {
            name: "门店数",
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
      // data['brandId'] = '1';
      // data['activityId'] = '2';
      // data['workerPhone'] = '18819192569';
      //获取活动周序列表 params:brandId,activityId
      this.Global.doPost("report/workerStoreScanTrend.json", data, res => {
        console.log(res);
        if (res) {
          let datalist = res;
          let activityCountDate = []; //时间
          let activityScanCount = []; //门店扫码量
          let activityStoreCount = []; //活跃门店数
          for (var key in datalist) {
            activityCountDate.push(datalist[key]["countDate"]);
            activityScanCount.push(datalist[key]["scanCount"]);
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
                min: 1,
                max: NumberMax
              }
            ],
            series: [
              {
                name: "当日扫描数量",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityScanCount
              },
              {
                name: "门店数",
                type: "line",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                },
                data: activityStoreCount
                //data: this.activityGrowup.activityStoreCount,
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
    brandChangeValue(value) {
      this.activityList = [];
      let brandList = this.brandList;
      for (var i = 0; i < brandList.length; i++) {
        if (value == brandList[i].id) {
          this.formData.brandId = brandList[i].id;
          this.formData.brandName = brandList[i].brandName;
        }
      }
      this.Global.getActivityList(value, res => {
        this.activityList = res.datalist;
        this.formData.activityId = res.datalist[0].id;
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