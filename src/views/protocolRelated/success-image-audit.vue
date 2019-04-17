<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  background: #ffffff;
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .export {
    position: fixed;
    z-index: 900;
    top: 140px;
    right: 40px;
    span {
      padding: 0 15px;
      border-radius: 20px;
      color: @primary-color;
      border: 1px solid @primary-color;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      transition: all 0.5s;
      cursor: pointer;
      &:hover {
        color: white;
        background-color: @primary-color;
      }
    }
  }
  .page-box {
    overflow: hidden;
    position: absolute;
    bottom: 10px;
    right: 10px;
  }
  .box {
    .card {
      border: 1px solid #e5e5e5;
      width: 47%;
      margin-left: 2%;
      float: left;
      border-radius: 2px;
      // height: 530px;
      margin-bottom: 10px;
      .card-top {
        // height: 420px;
        box-sizing: border-box;
        padding: 10px 0;
        position: relative;
        display: flex;
        flex-direction: row;
        .no-upload {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          img {
            width: 163px;
            height: 163px;
          }
          p {
            margin-top: 15px;
          }
        }
        .card-left {
          border-right: 1px solid #e5e5e5;
        }
        .card-left {
          box-sizing: border-box;
          padding-left: 20px;
          width: 100%;
          position: relative;
          .check-box {
            position: absolute;
            top: 0;
            right: 0;
          }
          .video-box {
            width: 100%;
            height: 213px;
            display: flex;
            .video {
              width: 100%;
              height: 213px;
              //   display: flex;
              //   justify-content: center;

              .video-main {
                width: 170px;
                position: relative;
                // height: 213px;
                video {
                  width: 179px;
                  height: 213px;
                }
                img.triangle {
                  position: absolute;
                  top: 0;
                  left: 0;
                }
              }
            }
          }
          .content-box {
            display: flex;
            flex-direction: row;
            align-items: center;
            .item-box {
              line-height: 36px;
              font-size: 12px;
              //   padding-left: 10px;
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .status {
                width: 70px;
              }

              display: flex;
              flex-direction: row;
              align-items: center;
            }
          }
          .btn-box {
            text-align: right;
            margin-top: 10px;
            margin-right: 10px;
          }
        }
      }
    }
  }
}

.triangle {
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 50px;
  z-index: 100;
}

.noneVideoUrl {
  display: block;
  object-fit: cover;
  height: 100%;
}
.container-box {
  margin-bottom: 10px;
  height: 75px;
  .left {
    float: left;
    width: 60px;
    height: 75px;
    font-size: 12px;
  }
  .right {
    float: left;
    margin-left: 8px;
    width: calc(~"(100% - 100px)");
  }
}

.searchBox {
  overflow: hidden;
  .search_btn {
    float: left;
    width: 50px;
    padding: 5px 14px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  .search_icon {
    float: left;
    padding: 5px 10px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
}
.warnColor {
  color: #ed3f14;
}
.primaryColor {
  color: @primary-color;
}
.successColor {
  color: #19be6b;
}
.noData {
  text-align: center;
  line-height: 100px;
}
</style>

<template>
	<div id="Main">
        <!-- <h2 class="Title">成功图像审核</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" :model="formData" :label-width="10">
                    <div class="container">
                        <div class="btn-left w18">
                            <Form-item required prop="brandId">
                                <Select v-model="formData.brandId" placeholder="品牌名称"  @on-change="changeValue">
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                </Select>
                            </Form-item>
                        </div>    
                        <div class="btn-left w18">
                            <Form-item  prop="queryStartTime" required>
                                <data-range @dataChange="startTimeChange" placeholder="拍摄开始时间" hour="00:00" :time="formData.queryStartTime" start></data-range>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item  prop="queryEndTime" required>
                                <data-range hour="24:00" placeholder="拍摄结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                            </Form-item>
                        </div>
                        
                        <div class="btn-left w18">
                            <Form-item prop="groupId" required>
                                <Select v-model="formData.groupId" placeholder="活动名称" @on-change="getActivityList" clearable>
                                    <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                                </Select>
                            </Form-item> 
                        </div>
                        <div class="btn-left w18">
                            <Form-item prop="activityId">
                                <Select v-model="formData.activityId" placeholder="子活动名称" clearable>
                                    <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                                </Select>
                            </Form-item>
                        </div>
                        <div class="btn-left w10">
                            <div class="searchBox">
                                <div class="btn-left search-left" @click="showQuery=!showQuery">
                                <button type="button">
                                    {{showQuery?'收起':'更多'}}
                                    <Icon type="ios-arrow-down" size="14" style="margin-top:-2px;" v-if="!showQuery"/>
                                    <Icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
                                </button>
                                </div>
                                <div class="btn-right search-right" @click="submit('search')">
                                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <transition name="fade">
                        <div class="container" v-if="showQuery">
                            <div class="btn-left w18">
                                <Form-item>
                                    <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                                </Form-item>
                            </div>
                            <div class="btn-left w18">
                                <Form-item required>
                                    <Input v-model.trim="formData.storeName" placeholder="门店名称"></Input>
                                </Form-item>
                            </div>
                            <div class="btn-left w18">
                                <Form-item required>
                                    <Input v-model.trim="formData.salesRoute" placeholder="销售路线"></Input>
                                </Form-item>
                            </div>
                        </div>
                    </transition>
                </Form>
            </div>

            <div class="export" style="overflow:hidden;" v-if="storeGoodsList && storeGoodsList.length">
                <!-- <span @click="handleAllSurePage">全选</span> -->
                <span @click="handleBatchSure">批量确认</span>
            </div>
            <div class="box" style="width:100%;padding:40px 10px 10px;overflow:hidden;" v-if="storeGoodsList && storeGoodsList.length">
                <CheckboxGroup size="large" v-model="social">
                    <div class="card" v-for="(item,index) in storeGoodsList" :key="index">
                        <div class="card-top">
                            <div class="card-left">
                              <div class="check-box">
                                  <Checkbox size="large" :label="index">
                                      <span style="display:none;"></span>
                                  </Checkbox>
                              </div>
                              <div class="video-box">
                                  <div class="video">
                                      <div class="video-main">
                                          <video :src="item.defaultRadioUrl" v-if="item.defaultRadioUrl" controls></video>
                                          <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                          <img class="triangle" src="../../assets/image/triangle-first.jpg">
                                      </div>
                                      
                                  </div>
                                  <div class="video">
                                      <div class="video-main">
                                          <video :src="item.radioUrl" v-if="item.radioUrl" controls></video>
                                          <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                          <img class="triangle" src="../../assets/image/triangle-this.jpg">
                                      </div>
                                      
                                  </div>
                              </div>
                              <div class="content-box">
                                  <Row style="width:100%;">
                                      <Col span="8">
                                          <div class="item-box">
                                              <p>
                                                  <span>提交时间：</span>
                                                  <span>{{ item.uploadTime  | formatYearMonth}}</span>
                                              </p>
                                          </div>
                                          <div class="item-box">
                                              <span>客户编号：</span>
                                              <span>{{ item.joinCode }}</span>
                                          </div>
                                          <div class="item-box">
                                              <p :title="item.workerName">
                                                  <span>业代姓名：</span>
                                                  <span>{{ item.workerName }}</span>
                                              </p>
                                          </div>
                                      </Col>
                                      <Col span="8">
                                          <div class="item-box">
                                              <span>活动名称：</span>
                                              <span>{{ item.activityName }}</span>
                                          </div>
                                          <div class="item-box">
                                              <span>门店名称：</span>
                                              <span>{{ item.storeName }}</span>
                                          </div>
                                      
                                          
                                      </Col>
                                      <Col span="8">
                                          <div class="item-box">
                                              <p :title="item.presentName">
                                                  <span>活动分组：</span>
                                                  <span>{{ item.activityTag }}</span>
                                              </p>
                                          </div>
                                          <div class="item-box">
                                              <span>销售路线：</span>
                                              <span>{{ item.salesRoute }}</span>
                                          </div>
                                      </Col>
                                      <Col span="23">
                                          <div class="item-box">
                                              <span class="status">审核状态：</span>
                                              <RadioGroup  v-model="item.status"> 
                                                <Radio :label="1">通过</Radio>
                                                <Radio :label="2">不通过</Radio>
                                                <Radio :label="3">退回</Radio>
                                              </RadioGroup>
                                          </div>
                                          <div class="item-box">
                                              <span class="status">审核意见：</span>
                                              <Input v-model.trim="item.checkMessage" placeholder="审核意见"></Input>
                                          </div>
                                      </Col>
                                  </Row>
                              </div>
                              <div class="btn-box">
                                  <Button  type="primary" @click="save(item,index)">保存</Button>
                              </div>
                            </div>
                        </div>
                    </div>
                </CheckboxGroup>
            </div>
            <div class="noData" v-else>暂无数据</div>
            <div class="page-box">
                <div style="float: right;">
                    <Page :total="pageNum" :page-size='pageSize' :current="page" @on-change="changePage"></Page>
                </div>
            </div>
        </div>
	</div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "success-image-audit-keepAlive",
  components: {
    dataRange
  },
  data() {
    return {
      showQuery: false,
      groupList: [], //活动包名
      saveData: {},
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
        groupId: "", //活动包名ID
        brandId: "",
        activityId: "",
        storeId: "",
        joinCode: "",
        salesRoute: ""
      },
      brandList: [],
      activityList: [],
      social: [],
      storeGoodsList: [],
      page: 1,
      pageSize: 10,
      pageNum: 0
    };
  },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a" },
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
    save(item, index) {
      let statusC = item.status;
      if (!statusC) {
        this.$Message.error("请选择审核状态");
        return false;
      }
      if (statusC == 2 || statusC == 3) {
        if (!item.checkMessage) {
          this.$Message.error("请输入审核意见");
          return false;
        }
      }
      var params = {
        id: item.id,
        memo: item.checkMessage,
        checkStatus: statusC
      };

      params = this.Global.JsonChange(params);
      this.Global.deleteEmptyProperty(params);
      this.Global.doPost("uploadReport/checkSuccessVideo.json", params, res => {
        this.init();
        this.$Message.success("保存成功");
      });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
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
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
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
    init() {
      if (!this.formData.groupId) {
        this.$Message.error("活动包不能为空");
        return;
      }
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(this.formData.queryStartTime);
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
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.formData.brandId;
      this.Global.doPost(
        "uploadReport/querySuccessVideo.json",
        data,
        res => {
          this.storeGoodsList = res.datalist;
          this.pageNum = res.items;
          this.currentPage = res.page;
          this.social = [];
        }
      );
    },

    handleAllSurePage() {
      //单页面全选
      this.social = [];
      for (let i = 0; i < this.storeGoodsList.length; i++) {
        this.social.push(i);
      }
    },
    handleBatchSure() {
      //批量确认
      if (!this.social.length) {
        this.$Message.info("请选择需要批量确认的视频");
        return false;
      }
      let len = this.social.length;
      let dataList = [];
      for (let i = 0; i < len; i++) {
        let n = this.social[i]
        let statusC = this.storeGoodsList[n].status;
        if (!statusC) {
          this.$Message.error("请选择审核状态");
          return false;
        }
        if (statusC == 2 || statusC == 3) {
          if (!this.storeGoodsList[n].checkMessage) {
            this.$Message.error("请输入审核意见");
            return false;
          }
        }
        let obj = {
          id: this.storeGoodsList[n].id,
          memo: this.storeGoodsList[n].checkMessage,
          checkStatus: statusC
        };
        this.Global.deleteEmptyProperty(obj);
        dataList.push(obj);
      }
      this.Global.doPost("uploadReport/successVideoBatchAudit.json", dataList, res => {
        this.$Message.success("批量审核成功");
        this.init();
        this.social = [];
      });
    }
  },

  filters: {
    formatYearMonth(time) {
      var time = new Date(time);
      var month = time.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = time.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      var date = month + "月" + day + "日";
      return date;
    }
  }
};
</script>