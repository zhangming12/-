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
.areaBox {
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  #province,
  #city,
  #area,
  #store {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    padding: 70px 20px 20px;
    background: url("../../assets/image/guanlian.png") center 25px no-repeat;
    background-size: 175px 18px;
    background-color: #fff;
    position: relative;
    li {
      display: flex;
      border-bottom: 1px solid #e3e3e3;
      color: #4a4a4a;
      span {
        width: 50px;
        height: 30px;
        line-height: 30px;
        .TextOverflow();
        text-align: center;
      }
    }
    li:first-child {
      span:after {
        content: "";
        height: 12px;
        border-right: 1px solid #4a4a4a;
        display: block;
        float: right;
        margin-top: 10px;
      }
      span:last-child:after {
        border: 0;
      }
    }
    li:nth-child(2) {
      color: #ce1b20;
      span:first-child {
        background: url("../../assets/image/gold.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
    li:nth-child(3) {
      color: #ffa60c;
      span:first-child {
        background: url("../../assets/image/silver.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
    li:nth-child(4) {
      color: #2285cc;
      span:first-child {
        background: url("../../assets/image/copper.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
  }
  #city {
    background-image: url("../../assets/image/store.png");
  }
  #area {
    background-image: url("../../assets/image/jinhuo.png");
  }
  #store {
    background-image: url("../../assets/image/guanlian1.png");
  }
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
.echarts {
  width: 100%;
  margin: 0 auto;
  padding: 30px 0;
  padding-bottom: 0;
  background: #fff;
  min-height: 400px;
  margin-bottom: 20px;
}
.icon-container {
  width: 50px;
  height: 50px;
  position: absolute;
  top: -1px;
  right: 0px;
  cursor: pointer;
  .icon-box {
    width: 0;
    height: 0;
    border-color: #ff8a23 #ff8a23 transparent transparent;
    border-width: 25px;
    border-style: solid;
  }
  .icon-share {
    display: block;
    position: absolute;
    width: 23px;
    height: 23px;
    top: 2px;
    right: 2px;
  }
}

.contentTop {
  overflow: hidden;
  // margin-bottom: 10px;
  .export {
    height: 24px;
    float: right;
    div {
      background: @primary-color;
      color: #fff;
      padding: 3px 12px;

      border-bottom: 0;
      cursor: pointer;
      i {
        margin-right: 2px;
      }
    }
  }
  .btn-export {
    width: 100px;
  }
}
</style>

<template>
  <div id="Main">
      <!-- <h2 class="Title">返利汇总数据</h2> -->
      <div class="box">
            <Form ref="form" :model="formData" :label-width="80" >
                <Row>
                    <Col span="10">
                        <Form-item required label="品牌名称:" prop="brandId">
                            <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue" clearable>
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="1">
                        <Form-item label="活动名称" prop="activityId" required>
                            <Select v-model="formData.activityId" placeholder="请选择">
                                <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="2" offset="1">
                        <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
                    </Col>
                    <Col span="21">
                        <Radio-group v-model="formData.monthOrDay" style="width:100%;">
                            <Row>
                                <Col span="8"> 
                                    <div>
                                        <div style="float:left;width:18px;">
                                            <Radio style="margin-left:10px;margin-top:6px;" label="month">{{str}}</Radio> 
                                        </div>
                                        <div style="float:left;width:90%;">
                                            <Form-item label="月份选择:" prop="activityId" >
                                                <Date-picker :disabled="formData.monthOrDay == 'day' || formData.monthOrDay == 'total'" v-model="formData.month" type="month" placeholder="选择月"></Date-picker>
                                            </Form-item>
                                        </div>
                                        
                                    </div>     
                                </Col>
                                <Col span="8"> 
                                    <div>
                                        <div style="float:left;width:18px;">
                                            <Radio label="day" style="margin-left:10px;margin-top:6px;">{{str}}</Radio> 
                                        </div>
                                        <div style="float:left;width:90%;">
                                            <Form-item label="日期选择:" prop="activityId" >
                                                <Date-picker :disabled="formData.monthOrDay == 'month' || formData.monthOrDay == 'total'" v-model="formData.day" format="yyyy-MM-dd" type="date" placeholder="选择日期"></Date-picker> 
                                            </Form-item>
                                            
                                        </div>
                                        
                                    </div> 
                                                      
                                </Col>
                                <Col span="8"> 
                                    <div>
                                        <div style="float:left;width:18px;">
                                            <Radio label="total" style="margin-left:10px;margin-top:6px;">全部</Radio> 
                                        </div>
                                        
                                    </div> 
                                                      
                                </Col>

                            </Row>
                        </Radio-group>                       
                    </Col>
                    </Col>
                    
                </Row>
            </Form>
      </div>

      <!-- echarts图标 -->
      <div class="box" id="box" style="margin-top:20px;">
        <div class='contentTop'>
          <Button class="btn-export" icon="ios-download-outline" @click="imageExportExcel" type="primary">导出表格</Button>
        </div>
        <div class="echarts" ref="echart" id="echarts"></div>
      </div>
      

      <!-- 排名 -->
      <div class="areaBox">
          <!-- 进货量排行 -->
          <div id="area">
              <div class="icon-container" @click="exportExcel(1)">
                <div class="icon-box"></div>
                <img class="icon-share" src="../../assets/image/share.png">
              </div>
              <ul>
                  <li>
                      <span>排名</span>
                      <span>省</span>
                      <span>市</span>
                      <span>区</span>
                      <span>进货量</span>
                  </li>
                  <li v-for="(item,index) in areaList" :key="index"  >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.province }}</span>
                      <span>{{ item.city }}</span>
                      <span>{{ item.area }}</span>
                      <span>{{ item.winCount }}</span>
                  </li>
              </ul>
          </div>
          <!-- 关联门店进货量排行 -->
          <div id="province">
              <div class="icon-container" @click="exportExcel(2)">
                <div class="icon-box"></div>
                <img class="icon-share" src="../../assets/image/share.png">
              </div>
              <ul>
                  <li>
                      <span>排名</span>
                      <span>省</span>
                      <span>市</span>
                      <span>区</span>
                      <span>进货量</span>
                  </li>
                  <li v-for="(item,index) in provinceList" :key="index"  >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.province }}</span>
                      <span>{{ item.city }}</span>
                      <span>{{ item.area }}</span>
                      <span>{{ item.winCount }}</span>
                  </li>
              </ul>
          </div>
          <!-- 门店数排行 -->
          <div id="city">
              <div class="icon-container" @click="exportExcel(3)">
                <div class="icon-box"></div>
                <img class="icon-share" src="../../assets/image/share.png">
              </div>
              <ul>
                  <li>
                      <span>排名</span>
                      <span>省</span>
                      <span>市</span>
                      <span>区</span>
                      <span>门店数</span>
                  </li>
                  <li v-for="(item,index) in cityList" :key="index"  >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.province }}</span>
                      <span>{{ item.city }}</span>
                      <span>{{ item.area }}</span>
                      <span>{{ item.storeCount }}</span>
                  </li>
              </ul>
          </div>
          <!-- 关联门店数排行 -->
          <div id="store">
              <div class="icon-container" @click="exportExcel(4)">
                <div class="icon-box"></div>
                <img class="icon-share" src="../../assets/image/share.png">
              </div>
              <ul>
                  <li>
                      <span>排名</span>
                      <span>省</span>
                      <span>市</span>
                      <span>区</span>
                      <span>门店数</span>
                  </li>
                  <li v-for="(item,index) in storeList" :key="index"  >
                      <span>{{ index + 1}}</span>
                      <span>{{ item.province }}</span>
                      <span>{{ item.city }}</span>
                      <span>{{ item.area }}</span>
                      <span>{{ item.storeCount }}</span>
                  </li>
              </ul>
          </div>
          
      </div>
  </div>
</template>

<script>
import echarts from "echarts";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name:"summary-rebate-data-keepAlive",

  data() {
    return {
      storeList: [], //关联门店数排行
      str: "",
      // w:box.getBoundingClientRect().width,
      myChart: null,
      formData: {
        brandId: "",
        activityId: "",
        monthOrDay: "month",
        month: EDFAULT_ENDTIME,
        day: EDFAULT_ENDTIME
      },
      rule: {
        brandId: [{ message: "请选择品牌名称", trigger: "blur" }],
        activityId: [{ message: "请选择活动名称", trigger: "blur" }]
      },
      brandList: [],
      activityList: [],
      provinceList: [],
      cityList: [],
      areaList: [],
      legend: [],
      xData: [],
      series: []
    };
  },
  props: {
    status: {
      type: Boolean
    }
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 15, activityType: 4, scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if(this.brandList && this.brandList.length){
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  watch: {
    status(val) {
      console.log(val);
      // this.$nextTick(() => {
      //   this.myChart.resize();
      // });
    }
  },
  mounted() {
    this.myChart = echarts.init(this.$refs.echart);
    this.drawLine();
    window.addEventListener('resize',()=>{
      this.myChart.resize()
    })
  },
  beforeDestory(){
    window.removeEventListener('resize',()=>{
      this.myChart.resize();
    })
  },
  methods: {
    imageExportExcel() {
      let data = this.Global.JsonChange(this.formData);
      if (this.formData.monthOrDay == "month") {
        data["queryStartTime"] = `${this.Global.createTime(
          this.formData.month
        ).slice(0, 7)}-01 00:00:00`;
        data["queryEndTime"] = this.getFormatTime(
          this.Global.createTime(this.formData.month).slice(0, 7)
        );
      } else if (this.formData.monthOrDay == "day") {
        data["daysTime"] = this.Global.createTime(this.formData.day).slice(
          0,
          10
        );
      }
      if (!this.formData.activityId) {
        this.$Message.error("请选择活动");
        return false;
      }
      this.Global.deleteEmptyProperty(data);
      delete data["monthOrDay"];
      delete data["month"];
      delete data["day"];
      console.log(data);
      let url = this.Global.getExportUrl(
        "joinGoodsRebate/rebateActivityChartExport.json",
        data
      );
      window.open(url);
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例

      let option = {
        color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "1%",
          right: "5%",
          bottom: "15%",
          top: "2%",
          containLabel: true
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            saveAsImage: {
              show: true
            }
          }
        },
        legend: {
          data: [],
          top: "20px"
        },
        xAxis: {
          data: [],
          name: "(区)",
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            type: "value",
            name: "(数量)",
            axisTick: {
              show: false
            }
          }
        ],
        series: []
      };
      this.myChart.setOption(option);
    },
    exportExcel(val) {
      let data = this.Global.JsonChange(this.formData);
      if (this.formData.monthOrDay == "month") {
        data["queryStartTime"] = `${this.Global.createTime(
          this.formData.month
        ).slice(0, 7)}-01 00:00:00`;
        data["queryEndTime"] = this.getFormatTime(
          this.Global.createTime(this.formData.month).slice(0, 7)
        );
      } else if (this.formData.monthOrDay == "day") {
        data["daysTime"] = this.Global.createTime(this.formData.day).slice(
          0,
          10
        );
      }
      if (!this.formData.activityId) {
        this.$Message.error("请选择活动");
        return false;
      }
      this.Global.deleteEmptyProperty(data);
      delete data["monthOrDay"];
      delete data["month"];
      delete data["day"];
      console.log(data);
      let api = "";
      let datas = {};
      switch (val) {
        case 1:
          api = "joinGoodsRebate/joinGoodsRankingExport.json";
          datas = Object.assign({}, data, { status: 1 });
          break;
        case 2:
          api = "joinGoodsRebate/joinGoodsRankingExport.json";
          datas = Object.assign({}, data, { status: 2 });
          break;
        case 3:
          api = "joinGoodsRebate/storeCountRankingExport.json";
          datas = Object.assign({}, data, { status: 1 });
          break;
        case 4:
          api = "joinGoodsRebate/storeCountRankingExport.json";

          datas = Object.assign({}, data, { status: 2 });
          break;
        default:
          api = "";
          return;
      }

      this.$Modal.confirm({
        title: "警告",
        content: "确定导出？",
        onOk: () => {
          let url = this.Global.getExportUrl(api, datas);
          window.open(url);
        }
      });
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
    getFormatTime(str) {
      let year = str.slice(0, 4);
      let month = Number(str.slice(5, 7));
      let m = "";
      if (month < 12) {
        m = month < 9 ? "0" + (month + 1) : month + 1;
        str = year + "-" + m + "-01 00:00:00";
      } else {
        year = Number(year) + 1;

        str = year + "-01-01 00:00:00";
      }
      return str;
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      if (this.formData.monthOrDay == "month") {
        data["queryStartTime"] = `${this.Global.createTime(
          this.formData.month
        ).slice(0, 7)}-01 00:00:00`;
        data["queryEndTime"] = this.getFormatTime(
          this.Global.createTime(this.formData.month).slice(0, 7)
        );
      } else if (this.formData.monthOrDay == "day") {
        data["daysTime"] = this.Global.createTime(this.formData.day).slice(
          0,
          10
        );
      }
      if (!this.formData.activityId) {
        this.$Message.error("请选择活动");
        return false;
      }
      // return;
      this.Global.deleteEmptyProperty(data);
      delete data["monthOrDay"];
      delete data["month"];
      delete data["day"];
      console.log(data);
      //图表数据
      this.legend = [];
      this.xData = [];
      this.series = [];
      this.Global.doPost(
        "joinGoodsRebate/rebateActivityReport.json",
        data,
        res => {
          if (res.rebateMap) {
            for (let item in res.rebateMap) {
              if (res.rebateMap.hasOwnProperty(item)) {
                this.xData.push(item); //x轴数据
                for (let i = 0; i < res.rebateMap[item].length; i++) {
                  this.legend.push(res.rebateMap[item][i].presentName); //图例
                }
              }
            }
            this.legend = [...new Set(this.legend)];
            this.series = [];
            for (let i = 0; i < this.legend.length; i++) {
              let obj = {};
              obj["name"] = this.legend[i];
              obj["type"] = "bar";
              obj["stack"] = "jieti";
              obj["label"] = {
                normal: {
                  formatter: function(params) {
                    if (params.value > 0) {
                      return params.value;
                    } else {
                      return "";
                    }
                    
                  },
                  show: true,
                  position: "inside"
                }
              };
              let arr = [];
              for (let j = 0; j < this.xData.length; j++) {
                if (
                  !res.rebateMap[this.xData[j]][i] ||
                  !res.rebateMap[this.xData[j]][i].winCount
                ) {
                  arr.push(0);
                } else {
                  arr.push(res.rebateMap[this.xData[j]][i].winCount);
                }
              }
              obj["data"] = arr;
              this.series.push(obj);
            }
          }

          this.myChart.clear();
          this.myChart.setOption({
            color: ["#FE1F08", "#FF7E00", "#FFD300", "#26A7D9"],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                type: "shadow"
              }
            },
            grid: {
              left: "3%",
              right: "5%",
              bottom: "15%",
              top: "10%",
              containLabel: true
            },
            toolbox: {
              show: true,
              feature: {
                mark: { show: true },
                saveAsImage: {
                  show: true
                }
              }
            },
            legend: {
              data: this.legend
              // top: "20px"
            },
            xAxis: {
              data: this.xData,
              name: "(区)",
              axisTick: {
                show: false
              },
              axisLabel: {
                interval: 0,
                rotate: 40,
                show: true,
                textStyle: {
                  fontSize: "10"
                }
              }
            },
            yAxis: [
              {
                type: "value",
                name: "(数量)",
                axisTick: {
                  show: false
                }
              }
            ],
            series: this.series
          });
        }
      );
      //门店排行
      this.Global.doPost(
        "joinGoodsRebate/storeCountRanking.json",
        Object.assign({}, data, { status: 1 }),
        res => {
          // console.log(res)
          this.cityList = res.datalist;
        }
      );
      //关联门店排行
      this.Global.doPost(
        "joinGoodsRebate/storeCountRanking.json",
        Object.assign({}, data, { status: 2 }),
        res => {
          // console.log(res)
          this.storeList = res.datalist;
        }
      );
      //进货量排行
      this.Global.doPost(
        "joinGoodsRebate/joinGoodsRanking.json",
        Object.assign({}, data, { status: 1 }),
        res => {
          console.log(res);
          this.areaList = res.datalist;
        }
      );
      //关联门店进货量排行
      this.Global.doPost(
        "joinGoodsRebate/joinGoodsRanking.json",
        Object.assign({}, data, { status: 2 }),
        res => {
          console.log(res);
          this.provinceList = res.datalist;
        }
      );
    },
    changeValue(value) {
      this.activityList = [];
      this.formData.activityId = "";
      if(!value) {return}
      this.Global.doPostNoLoading(
        "condition/queryActivity.json",
        { date: 15, activityType: 4, scope: "a", brandId: value },
        res => {
          Object.entries(res).forEach(item => {
            this.activityList.push({ id: Number(item[0]), name: item[1] });
          });
          if(this.activityList.length){
            this.formData.activityId = this.activityList[0].id;
          }
        }
      );
      // this.Global.doPost(
      //   "joinGoodsRebate/getRebateActivityList.json",
      //   value,
      //   res => {
      //     if (res && res.length) {
      //       this.activityList = res;
      //       this.formData.activityId = res[0].id;
      //     }
      //   }
      // );
    }
  }
};
</script>