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
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  #province,
  #city,
  #area {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    padding: 20px;
    // width: 30%;
    // padding-top: 70px;
    // padding-bottom: 20px;
    // background: url('../../../assets/image/provinceTop.png') center 25px no-repeat;
    background-size: 175px 18px;
    background-color: #fff;
    li {
      display: flex;
      border-bottom: 1px solid #e3e3e3;
      color: #4a4a4a;
      span {
        width: 65px;
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
.select {
  background: @primary-color;
  color: #fff;
}
.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
}
.export {
  height: 24px;
  position: relative;
  div {
    border: 1px solid @primary-color;
    padding: 3px 12px;
    float: right;
    border-bottom: 0;
    position: absolute;
    right: 1px;
    bottom: -1px;
    color: @primary-color;
    cursor: pointer;
    i {
      margin-right: 2px;
    }
  }
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
    <!-- <h2 class="Title">陈列活动排行榜</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="80" :rules="rule">
        <Row>
          <Col span="12">
            <Form-item label="上传时间:" required>
              <Row>
                <Col span="11">
                  <Form-item>
                    <data-range hour="00:00" v-model="formData.queryStartTime" start></data-range>
                  </Form-item>
                </Col>
                <Col span="2" style="text-align: center;">至</Col>
                <Col span="11">
                  <Form-item>
                    <data-range placeholder="结束时间" hour="24:00" v-model="formData.queryEndTime"></data-range>
                  </Form-item>
                </Col>
              </Row>
            </Form-item>
            <Form-item label="活动包名:" prop="groupId" required>
              <Select v-model="formData.groupId" placeholder="请选择" @on-change="getActivityList">
                <Option
                  :value="item.id"
                  v-for="(item,index) in groupList"
                  :key="index"
                >{{ item.groupName }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="8" offset="1">
            <Form-item label="品牌名称:" prop="brandId" required>
              <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                <Option
                  :value="item.id"
                  v-for="(item,index) in brandList"
                  :key="index"
                >{{ item.brandName }}</Option>
              </Select>
            </Form-item>
            <Form-item label="陈列活动:" prop="activityId">
              <Select v-model="formData.activityId" placeholder="请选择" clearable>
                <Option
                  :value="item.id"
                  v-for="(item,index) in activityList"
                  :key="index"
                >{{ item.name }}</Option>
              </Select>
            </Form-item>
          </Col>
          <Col span="2" offset="1" style="margin-top:24px">
            <Button @click="submit('form')" class="btn-search" type="primary">查询</Button>
          </Col>
        </Row>
      </Form>
    </div>
    <h2 class="Title" style="margin-top: 20px;">区域上传排行榜</h2>
    <div class="areaBox">
      <div id="province">
        <div class="top">
          <div class="top-img">
            <img src="../../../assets/image/provinceTop20.png" class="top-img" alt="本周业代关联门店扫码量排行榜">
          </div>
          <div class="top-icon" @click="displayRateExport" v-show="provinceList.length>0">
            <img src="../../../assets/image/echart-down.jpg" alt>
          </div>
        </div>
        <ul>
          <li>
            <span>排名</span>
            <span>省</span>
            <span>上传数</span>
            <span>门店数</span>
          </li>
          <li v-for="(item,index) in provinceList" :key="index">
            <span>{{ index + 1}}</span>
            <span>{{ item.province }}</span>
            <span>{{ item.winCount }}</span>
            <span>{{ item.winUserCount }}</span>
          </li>
        </ul>
      </div>
      <div id="city">
        <div class="top">
          <div class="top-img">
            <img src="../../../assets/image/areaTop20.png" class="top-img" alt="本周业代关联门店扫码量排行榜">
          </div>
          <div class="top-icon" @click="displayRateExport" v-show="cityList.length>0">
            <img src="../../../assets/image/echart-down.jpg" alt>
          </div>
        </div>
        <ul>
          <li>
            <span>排名</span>
            <span>省</span>
            <span>市</span>
            <span>上传数</span>
            <span>门店数</span>
          </li>
          <li v-for="(item,index) in cityList" :key="index">
            <span>{{ index + 1}}</span>
            <span>{{ item.province }}</span>
            <span>{{ item.city }}</span>
            <span>{{ item.winCount }}</span>
            <span>{{ item.winUserCount }}</span>
          </li>
        </ul>
      </div>
      <div id="area">
        <div class="top">
          <div class="top-img">
            <img src="../../../assets/image/cityTop20.png" class="top-img" alt="本周业代关联门店扫码量排行榜">
          </div>
          <div class="top-icon" @click="displayRateExport" v-show="areaList.length>0">
            <img src="../../../assets/image/echart-down.jpg" alt>
          </div>
        </div>
        <ul>
          <li>
            <span>排名</span>
            <span>省</span>
            <span>市</span>
            <span>区</span>
            <span>上传数</span>
            <span>门店数</span>
          </li>
          <li v-for="(item,index) in areaList" :key="index">
            <span>{{ index + 1}}</span>
            <span>{{ item.province }}</span>
            <span>{{ item.city }}</span>
            <span>{{ item.area }}</span>
            <span>{{ item.winCount }}</span>
            <span>{{ item.winUserCount }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import dataRange from "@/components/data-range/data-range.vue";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import { displayRankingShow } from "@/api/activity-manage/apply-survey-statistics.js";
export default {
  name: "display-activity-ranking-keepAlive",
  data() {
    return {
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: ""
      },
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "品牌不能为空" }],
        groupId: [{ required: true, message: "活动包名不能为空" }]
      },

      brandList: [],
      activityList: [],
      provinceList: [],
      cityList: [],
      areaList: []
    };
  },
  components: { dataRange },
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

      displayRankingShow(data).then(res => {
        if (res.status == 1) {
          this.provinceList = res.data.provList;
          this.cityList = res.data.cityList;
          this.areaList = res.data.areaList;
        }
      });
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
    displayRateExport() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      var url = this.Global.getExportUrl(
        "report/displayRankingShowExport.json",
        data
      );
      window.open(url);
    }
  }
};
</script>