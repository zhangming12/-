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
                    <Form-item label="品牌名称:" prop="brandId" :label-width="90" >
                        <Select v-model="formData.brandId" placeholder="请选择" @on-change="brandChangeValue">
                            <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                        </Select>  
                    </Form-item> 
                            
                </Col>   
                <Col span="10" offset="1" > 
                </Col>   
                <Col span='2' offset="1" >
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
  name:"salesman-relate-store-keepAlive",

  data() {
    const that = this;
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
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.formData.brandName = this.brandList[0].brandName;
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
          text: "业代关联门店分布"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "业代数量"],
          height: this.boxHeight
        },
        toolbox: {
          feature: {
            saveAsImage: {
              title: "保存"
            }
          }
        },
        grid: {
          left: "1%",
          right: "7%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            name: "关联门店数",
            type: "category",
            boundaryGap: false,
            //data : ['周一','周二','周三','周四','周五','周六','周日'],
            data: []
          }
        ],
        yAxis: [
          {
            name: "业代数量",
            type: "value"
          }
        ],
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
            //data:[],
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

      for (var i = 0; i < brandList.length; i++) {
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