<style lang="less" scoped>
@import "../../../config/index.less";
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
  padding-top: 15px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  #scancode {
    li {
      span {
        // width: 75px;
        width: 20%;
      }
    }
  }
  #activityRate {
    li {
      span {
        // width: 75px;
        width: 16%;
      }
    }
  }
  #province,
  #scancode,
  #activityRate {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    width: 49%;
    padding: 20px;
    //padding-top: 20px;
    //padding-bottom: 20px;
    //background: url('../../../assets/image/provinceTop.png') center 25px no-repeat;
    background-size: 300px 20px;
    background-color: #fff;
    overflow: hidden;
    ul {
      display: inline-block;
      width: 100%;
    }
    li {
      display: flex;
      border-bottom: 1px solid #e3e3e3;
      color: #4a4a4a;
      span {
        // width: 75px;
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
        background: url("../../../assets/image/gold.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
    li:nth-child(3) {
      color: #ffa60c;
      span:first-child {
        background: url("../../../assets/image/silver.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
    li:nth-child(4) {
      color: #2285cc;
      span:first-child {
        background: url("../../../assets/image/copper.png") center no-repeat;
        background-size: auto;
        color: #fff;
      }
    }
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
    <!-- <h2 class="Title">业代扫码绩效排行</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88" :rules="rule">
        <Row>
          <Col span="10">
            <Form-item label="品牌名称" prop="brandId" required>
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="brandChangeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>

            <Form-item label="时间" prop="queryStartTime">
              <Select
                v-model="formData.queryStartTime"
                placeholder="请选择"
                @on-change="timeDataChangeValue"
              >
                <Option
                  :value="item.actStartTime"
                  v-for="(item,index) in timeDataList"
                  :key="index"
                >{{ item.actStartTime}} - {{ item.actEndTime}}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="10" offset="1">
            <Form-item label="活动名称" prop="activityId" required>
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
          <Col span="2" offset="1" style="margin-top:24px">
            <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <div class="areaBox">
      <div id="scancode">
        <div class="top">
          <div class="top-img">
            <img
              src="../../../assets/image/week-worker-scancode.jpg"
              class="top-img"
              alt="本周业代关联门店扫码量排行榜"
            >
          </div>

          <div class="top-icon" @click="activityRateExport" v-show="activityRate.length>0">
            <!-- <Icon type="ios-download" size="18" /> -->
            <img src="../../../assets/image/echart-down.jpg" alt>
          </div>
        </div>
        <ul>
          <li>
            <span>排名</span>
            <span>业代姓名</span>
            <span>手机号</span>
            <span>周活跃门店数</span>
            <span>门店周扫码量</span>
          </li>
          <li v-for="(item,index) in scancodeDatalist" :key="index">
            <span>{{ index + 1}}</span>
            <span>{{ item.workerName }}</span>
            <span>{{ item.workerPhone }}</span>
            <span>{{ item.storeCount }}</span>
            <span>{{ item.scanCount }}</span>
          </li>
        </ul>
      </div>
      <div id="activityRate">
        <div class="top">
          <div class="top-img">
            <img src="../../../assets/image/week-worker-actrate.jpg" alt>
          </div>
          <div class="top-icon" @click="scancodeExport" v-show="activityRate.length>0">
            <img src="../../../assets/image/echart-down.jpg" alt>
          </div>
        </div>
        <ul>
          <li>
            <span>排名</span>
            <span>业代姓名</span>
            <span>手机号</span>
            <span>总关联门店</span>
            <span>周活跃门店</span>
            <span>活跃率</span>
          </li>
          <li v-for="(item,index) in activityRate" :key="index">
            <span>{{ index + 1}}</span>
            <span>{{ item.workerName }}</span>
            <span>{{ item.workerPhone }}</span>
            <span>{{ item.allStoreCount }}</span>
            <span>{{ item.storeCount }}</span>
            <span>{{ (item.actRate * 100).toFixed(2) + '%'}}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "scancode-achieve-ranking-keepAlive",

  data() {
    return {
      formData: {
        brandId: "",
        brandName: "",
        activityId: "",
        activityName: "",
        queryStartTime: "",
        queryEndTime: ""
      },
      rule: {
        queryStartTime: [{ required: true, message: "请选择时间" }]
      },
      brandList: [],
      activityList: [],
      timeDataList: [], //时间，活动周序列表
      scancodeDatalist: [], //关联门店扫码量
      activityRate: [] //活跃率排行榜
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
        this.brandChangeValue(this.brandList[0].id);
      }
    });
  },
  methods: {
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        }
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["needCount"] = false;
      this.Global.doPost(
        "report/workerStoreScanPerformanceRanking.json",
        data,
        res => {
          // console.log(res)
          this.scancodeDatalist = res.datalist;
        }
      );
      //业代(关联门店)活跃率排行报表
      this.Global.doPost("report/workerStoreActRateRanking.json", data, res => {
        // console.log(res)
        this.activityRate = res.datalist;
      });
    },
    brandChangeValue(value) {
      this.activityList = [];
      let brandList = this.brandList; //品牌列表
      for (var i = 0; i < brandList.length; i++) {
        if (value == brandList[i].id) {
          this.formData.brandId = brandList[i].id;
          this.formData.brandName = brandList[i].brandName;
        }
      }
      //活动的接口
      this.Global.getActivityList(value, res => {
        this.activityList = res.datalist;
        this.formData.activityId = res.datalist[0].id;
        this.activityChangeValue(this.formData.activityId);
      });
    },
    activityChangeValue(value) {
      let activityList = this.activityList; //品牌列表
      for (var i = 0; i < activityList.length; i++) {
        if (value == activityList[i].id) {
          this.formData.activityId = activityList[i].id;
          this.formData.activityName = activityList[i].name;
        }
      }
      setTimeout(() => {
        this.getTimeDataList(); //获取活动周序列表
      }, 500);
    },
    getTimeDataList() {
      //获取活动周序列表
      let data = {
        brandId: this.formData.brandId,
        activityId: this.formData.activityId
      };
      this.Global.doPost("report/getActivityWeekDict.json", data, res => {
        if (res) {
          let timeDataList = [];
          for (const key in res) {
            let item = {
              actStartTime: res[key][0],
              actEndTime: res[key][1]
            };
            timeDataList.push(item);
          }
          timeDataList.reverse(); //倒序
          this.timeDataList = timeDataList;
          this.formData.queryStartTime = timeDataList[0].actStartTime;
          this.formData.queryEndTime = timeDataList[0].actEndTime;
        }
      });
    },
    scancodeExport() {
      //扫码量导出
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "report/workerStoreActRateRankingExport.json",
        data
      );
      window.open(url);
    },
    activityRateExport() {
      //活跃率
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "report/workerStoreScanPerformanceRankingExport.json",
        data
      );
      window.open(url);
    },
    timeDataChangeValue(value) {
      let timeDataList = this.timeDataList;
      if (value) {
        for (var i = 0; i < timeDataList.length; i++) {
          if (value == timeDataList[i].actStartTime) {
            this.formData.queryStartTime = timeDataList[i].actStartTime;
            this.formData.queryEndTime = timeDataList[i].actEndTime;
          }
        }
      }
    }
  }
};
</script>


