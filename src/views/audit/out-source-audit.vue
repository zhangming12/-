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
    // overflow: hidden;
    .card {
      border: 1px solid #e5e5e5;
      float: left;
      width: 47%;
      margin-left: 2%;
      border-radius: 2px;
      margin-bottom: 10px;
      .card-top {
        // height: 530px;
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
                width: 250px;
                position: relative;
                // height: 213px;
                video {
                  width: 250px;
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
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .status {
                width: 80px;
              }

              display: flex;
              flex-direction: row;
              align-items: center;
              .ruleBox {
                height: 60px;
                max-height: 60px;
                border: 1px solid #e5e5e5;
                line-height: 20px;
                overflow-y: scroll;
                flex: 1;
                padding: 4px;
                border-radius: 4px;
                p {
                  word-wrap: break-word;
                  word-break: break-all;
                  overflow: hidden;
                }
              }
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

#goodsStausShow {
  .ivu-form-item {
    margin-bottom: 12px;
  }
  #examine-right {
    margin: 0 auto 10px;
    padding: 14px;
    // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    width: 500px;
    span {
      display: block;
    }
  }
}

.zhezhao {
  width: 100%;
  height: 100%;
  background-color: #000;
  filter: alpha(opacity=50);
  -moz-opacity: 0.5;
  opacity: 0.5;
  position: absolute;
  left: 0px;
  top: 0px;
  display: block;
  z-index: 1000000;
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
.container-status {
  overflow: hidden;
  // float: left;
  margin-top: 3px;
  line-height: 28px;
  margin-bottom: 10px;
  cursor: pointer;
  span {
    float: left;
    line-height: 15px;
    margin-left: 10px;
  }
  .bigCircle {
    margin-left: 20px;
    width: 15px;
    height: 15px;
    border: 1px solid #ff9900;
    border-radius: 50%;
    position: relative;
    float: left;
    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ff9900;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
    }
  }
}
.alertBox {
  border-radius: 8px;
  width: 300px;
  height: auto;
  padding: 5px;
  position: absolute;
  top: 0;
  z-index: 100000;
  background: #2d8cf0;
  color: white;
}
.alertBox.alertBoxLeft {
  left: 100%;
}
.alertBox.alertBoxRight {
  left: -300px;
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
.form {
  position: relative;
  display: flex;
  justify-content: center;
  .container {
    width: 70%;
    .w18 {
      width: 25%;
    }
  }
  .w10 {
    position: absolute;
    top: 0;
    right: 0;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title"">外包审核页面</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" class="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select v-model="formData.brandId" @on-change="changeValue" placeholder="品牌ID">
                  <!-- <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.id }}</Option> -->
                  <Option :value="1">1</Option>
                  <Option :value="8">8</Option>
                  <Option :value="15">15</Option>
                  <Option :value="25">25</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="groupId">
                <Select v-model="formData.groupId" placeholder="活动ID" @on-change="getActivityList">
                  <Option :value="item" v-for="(item,index) in groupList" :key="item">{{ item }}</Option>
                  <!-- <Option :value="151">151</Option>
                  <Option :value="155">155</Option>-->
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId">
                <Select
                  v-model="formData.activityId"
                  placeholder="项目ID"
                  @on-change="getpresentList"
                  clearable
                >
                  <Option :value="item" v-for="(item,index) in activityList" :key="item">{{ item }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18" v-if="showPresent">
              <Form-item prop="activityId">
                <Select v-model="formData.presentId" placeholder="分组ID" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in presentNameList"
                    :key="item.id"
                  >{{ item.id }}</Option>
                </Select>
              </Form-item>
            </div>
          </div>
          <div class="btn-left w10">
            <div class="searchBox">
              <div class="btn-right search-right" @click="submit('search')">
                <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
              </div>
            </div>
          </div>
        </Form>
      </div>

      <div
        class="box clear container"
        style="width:100%;padding-top:30px;"
        v-if="storeGoodsList && storeGoodsList.length"
      >
        <p style="padding-left:10px;margin-bottom:10px;">
          待处理记录
          <span class="numColor">{{ allNum }}</span>
        </p>
        <div class="card" v-for="(item,index) in storeGoodsList" :key="index">
          <div class="card-top">
            <div class="card-left">
              <template v-if="item && item.checkStatus != -1">
                <div class="video-box">
                  <div class="video">
                    <div class="video-main" v-if="item.fileType == 'radio'">
                      <video :src="item.firstRadio.radioUrl" v-if="item.firstRadio" controls></video>
                      <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                      <img class="triangle" src="../../assets/image/triangle-first.jpg">
                    </div>
                    <div class="video-main" v-if="item.fileType == 'image'">
                      <imageLook
                        :key="item.firstImageList[0]"
                        :position="getPosition(index)"
                        v-if="item.firstImageList.length"
                        :imageList="item.firstImageList"
                      />
                      <img v-else src="../../assets/image/nullImage.png" class="noneVideoUrl">
                      <img class="triangle" src="../../assets/image/triangle-first.jpg">
                    </div>
                  </div>
                  <div class="video">
                    <div class="video-main" v-if="item.fileType == 'radio'">
                      <video :src="item.radioUrl" v-if="item.radioUrl" controls></video>
                      <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                      <img class="triangle" src="../../assets/image/triangle-this.jpg">
                    </div>
                    <div class="video-main" v-if="item.fileType == 'image'">
                      <imageLook
                        :key="item.imageList[0]"
                        :position="getPosition(index)"
                        v-if="item.imageList.length"
                        :imageList="item.imageList"
                      />
                      <img v-else src="../../assets/image/nullImage.png" class="noneVideoUrl">
                      <img class="triangle" src="../../assets/image/triangle-this.jpg">
                    </div>
                  </div>
                </div>
                <div class="content-box">
                  <Row style="width:100%;">
                    <Col span="6">
                      <div class="item-box">
                        <p>
                          <span>活动ID：</span>
                          <span>{{ item.activityId }}</span>
                        </p>
                      </div>
                    </Col>
                    <Col span="6">
                      <div class="item-box">
                        <span>分组ID：</span>
                        <span>{{ item.presentId }}</span>
                      </div>
                    </Col>
                    <Col span="6">
                      <div class="item-box">
                        <p :title="item.storeRange > 200 ? '位置偏移' : ''">
                          <span>预警：</span>
                          <span
                            :class="item.storeRange > 200 ? 'warnColor' : ''"
                          >{{ item.storeRange > 200 ? "位置偏移" :"无" }}</span>
                        </p>
                      </div>
                    </Col>
                    <Col span="6">
                      <div class="item-box">
                        <span>图像编号：</span>
                        <span>{{ item.id }}</span>
                      </div>
                    </Col>
                    <Col span="23">
                      <div class="item-box">
                        <span class="status">审核规则：</span>
                        <!-- <div class="ruleBox">{{ item.auditPolicy }}</div> -->
                        <div class="ruleBox">
                          <div v-for="v in item.auditPolicy">{{ v }}</div>
                        </div>
                      </div>
                      <div class="item-box">
                        <span class="status">审核状态：</span>
                        <RadioGroup v-model="item.status" @on-change="radioChange">
                          <Radio :label="index + '-1001'">通过</Radio>
                          <Radio v-if="item.isBack == 0" :label="index + '-3'">退回</Radio>
                          <Radio :label="index + '-2'">作弊</Radio>
                        </RadioGroup>
                      </div>
                      <div class="item-box">
                        <span class="status">审核意见：</span>
                        <span>{{ item.checkMessage }}</span>
                      </div>
                    </Col>
                  </Row>
                </div>
                <div class="btn-box">
                  <Button type="primary" @click="save(item,index)">保存</Button>
                </div>
              </template>
              <div class="no-upload" v-else>
                <img src="../../assets/image/no-video.jpg" alt="暂未上传视频">
                <p>暂未上传视频</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="noData" v-else>暂无数据</div>
      <!-- <div class="page-box">
            <div style="float: right;">
                <Page :total="pageNum" :page-size='pageSize' :current="page" @on-change="changePage"></Page>
            </div>
      </div>-->
    </div>
    <Modal
      v-model="goodsStausShow"
      width="600"
      id="goodsStausShow"
      style="position:relative;z-index:1000000;"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{formItem.storeName}}</span>
      </p>
      <div>
        <Form :model="formItem" :label-width="60">
          <FormItem label="状态:">
            <RadioGroup v-model="formItem.checkStatus" @on-change="handleIsPass">
              <Radio label="1001">通过</Radio>
              <Radio v-if="formItem.isBack == 0" label="3">退回</Radio>
              <Radio label="2">作弊</Radio>
            </RadioGroup>
          </FormItem>

          <div id="examine-right" v-show="!activityIsPass">
            <span style="color:#ff8a34">可输入原因,并反馈给门店</span>
            <Input v-model="checkMessage" style="width:220px" placeholder="请输入原因"></Input>
          </div>
          <div id="examine-right" v-show="activityIsPass">
            <span style="color:#ff8a34">输入不通过的原因,并反馈给门店，要求重新提交</span>
            <FormItem label="审核意见:" :label-width="70">
              <Input @on-change="wordFilter"></Input>
            </FormItem>
            <RadioGroup v-model="checkMessage" vertical class="radio">
              <Radio
                v-if="i < 10"
                v-for="(val,i) in displayExamineWordList"
                :key="i"
                :label="val.content"
              >{{val.content}}</Radio>
            </RadioGroup>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" @click="handleCloseModal">返回</Button>
        <Button type="warning" @click="handleSaveEidtGooodsStatu">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import imageLook from "@/components/imgLook/img-look.vue";
export default {
  name: "out-source-audit-keepAlive",
  components: {
    dataRange,
    imageLook
  },
  data() {
    return {
      allNum: 0,
      showPresent: true,
      riskData: {
        riskType: "no"
      },
      joinCodeList: [],
      riskIsShow: false,
      displayExamineWordList: [],
      index: null,
      flag: null,
      startTime: EDFAULT_STARTTIME,
      endTime: EDFAULT_ENDTIME,
      startHour: "00:00",
      endHour: "24:00",
      showQuery: false,
      groupList: [], //活动包名
      enterTime: null,
      leaveTime: null,
      ruleBoxData: [], //规则框数据
      ruleBox: [], //规则框是否显示
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
        groupId: 123, //活动包名ID
        brandId: 1,
        activityId: "",
        storeId: "",
        storeName: "",
        workerName: "",
        workerPhone: "",
        checkStatus: "",
        joinCode: "",
        salesRoute: "",
        checkMessage: ""
      },
      brandList: [],
      activityList: [],
      allGroupList: {
        "1": [123],
        "8": [157, 160],
        "15": [126],
        "25": [151, 155]
      },
      allActivityList: {
        "151": [537, 538, 539, 540, 541, 542, 543, 652],
        "155": [559, 560, 561, 562, 563, 565, 566, 687],
        "123": [482, 573, 574, 575, 571],
        "126": [476, 479],
        "157": [572],
        "160": [582]
      },
      social: [],
      storeGoodsList: null,
      goodsStausShow: false,
      formItem: {
        storeName: "",
        checkStatus: "",
        memo: "",
        isBack: null
      },
      checkStatus: {
        success: "1001",
        fail: "1002",
        back: "1003"
      },
      presentNameList: [],
      checkMessage: "",
      activityIsPass: false,
      refuseReason: "", //不通过、拒绝时可填写原因
      agreeReason: "", //通过可填写原因
      page: 1,
      pageSize: 10,
      pageNum: 0,
      displayExamineType: "A",
      examineB: "",
      checkObj: [],
      wordList: []
    };
  },
  created() {
    this.changeValue(1);
  },
  mounted() {},
  watch: {
    "formItem.checkStatus"(val) {
      if (val == 2001 || val == 1001) {
        this.activityIsPass = false;
      } else if (val == 1002 || val == 1003 || val == 2 || val == 3) {
        this.activityIsPass = true;
      }
    },
    riskIsShow(val) {
      if (!val) {
        this.riskData = {
          riskType: "no"
        };
      }
    },
    goodsStausShow(val) {
      //模态框关闭，清空
      if (val == false) {
        this.refuseReason = "";
        this.agreeReason = "";
        this.checkMessage = "";
      }
    }
  },
  methods: {
    showP() {
      this.showPresent = false;
      this.$nextTick(() => {
        this.showPresent = true;
      });
    },
    getWeek(start, end) {
      return `${this.formatTime(start)}至${this.formatTime(end)}`;
    },
    formatTime(time) {
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
    },
    getpresentList(value) {
      this.$set(this.formData, "presentId", "");
      this.presentNameList = [];
      this.showP();
      if (value == 476) {
        this.presentNameList = [
          { id: 1084 },
          { id: 1478 },
          { id: 1487 },
          { id: 1660 },
          { id: 1661 },
          { id: 1708 }
        ];
        return;
      }
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    radioChange(val) {
      let arr = val.split("-");
      this.formItem.checkStatus = arr[1];
      this.index = arr[0];
      this.saveData.brandId = this.storeGoodsList[arr[0]].brandId;
      this.saveData.groupId = this.storeGoodsList[arr[0]].groupId;
      this.formItem.isBack = this.storeGoodsList[arr[0]].isBack;

      this.displayExamineWordList = [];
      this.wordList = this.getDisplayExamineWord(
        this.saveData.brandId,
        this.saveData.groupId
      );
      if (arr[1] != 1001) {
        this.goodsStausShow = true;
        this.activityIsPass = true;
      } else {
        this.storeGoodsList[this.index].checkMessage = "";
        this.$set(this.storeGoodsList[this.index], "checkMessage", "");
      }
    },
    getDisplayExamineWord(brandId, groupId) {
      this.wordList = [];
      this.displayExamineWordList = [];
      this.Global.doPost(
        "displayYxtg/queryAuditReason.json",
        { brandId, groupId },
        res => {
          if (res && res.length) {
            this.wordList = res;
            this.displayExamineWordList = JSON.parse(
              JSON.stringify(this.wordList)
            );
          }
        }
      );
    },
    //状态过滤
    wordFilter(e) {
      let val = e.target.value;
      if (!val) {
        this.displayExamineWordList = JSON.parse(JSON.stringify(this.wordList));
        return false;
      }
      this.displayExamineWordList = this.wordList.filter(item => {
        return item.content.indexOf(val) != -1;
      });
    },
    aiStatusChange(val) {
      if (val == 1002 || val == 1003 || val == 2 || val == 3) {
        this.goodsStausShow = true;
      }
    },
    save(item, index) {
      let statusC = item.status;
      if (!statusC) {
        this.$Message.error("请选择审核意见");
        return false;
      }
      statusC = statusC.split("-")[1];
      if (statusC == 2 || statusC == 3) {
        if (!item.checkMessage) {
          this.$Message.error("请输入审核意见");
          return false;
        }
      }
      var params = {
        id: item.id,
        brandId: item.brandId,
        groupId: item.groupId,
        activityId: item.activityId,
        memo: item.memo,
        checkMessage: item.checkMessage,
        checkStatus: statusC
      };

      params = this.Global.JsonChange(params);
      this.Global.deleteEmptyProperty(params);
      this.Global.doPost(
        "displayYxtg/displayVideoAuditByUpdatedVersion.json",
        params,
        res => {
          this.storeGoodsList.splice(index, 1);
          this.saveData = {};
          this.goodsStausShow = false;
          this.$Message.success("保存成功");
          this.formItem.status = "";
          if (this.storeGoodsList.length == 0) {
            this.init();
          }
        }
      );
    },
    changeValue(value) {
      this.formData.groupId = "";
      if (value) this.groupList = this.allGroupList[value];
      else this.groupList = [];
      this.formData.groupId = this.groupList[0];
      this.getActivityList(this.formData.groupId);

      // this.groupList = [];
      // this.formData.groupId = "";
      // this.Global.doPostNoLoading(
      //   "condition/queryGroup.json",
      //   { date: 7, activityType: 3, scope: "d", brandId: value },
      //   res => {
      //     Object.entries(res).forEach(item => {
      //       this.groupList.push({ id: Number(item[0]), groupName: item[1] });
      //     });
      //   }
      // );
    },
    // getActivityList(value) {
    //   this.activityList = [];
    //   this.formData.activityId = "";
    //   if (!value) return;
    //   this.Global.doPostNoLoading(
    //     "condition/queryActivity.json",
    //     { date: 7, activityType: 3, scope: "a", groupId: value },
    //     res => {
    //       Object.entries(res).forEach(item => {
    //         this.activityList.push({ id: Number(item[0]), name: item[1] });
    //       });
    //     }
    //   );
    // },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      this.activityList = this.allActivityList[value];
      this.formData.activityId = this.activityList[0];
      this.getpresentList(this.formData.activityId);
      // if (!value) return;
      // this.Global.doPostNoLoading(
      //   "condition/queryActivity.json",
      //   { date: 7, activityType: 3, scope: "a", groupId: value },
      //   res => {
      //     Object.entries(res).forEach(item => {
      //       this.activityList.push({ id: Number(item[0]), name: item[1] });
      //     });
      //   }
      // );
    },
    submit(name) {
      this.page = 1;
      this.init();
    },
    changePage(size) {
      this.page = size;
      this.init();
    },
    createTime(val) {
      var time = this.Global.createTime(val);
      return time;
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
      if (!this.formData.brandId) {
        this.$Message.info("品牌ID不能为空");
        return false;
      }
      if (!this.formData.groupId) {
        this.$Message.info("活动ID不能为空");
        return false;
      }
      if (!this.formData.activityId) {
        this.$Message.info("项目ID不能为空");
        return false;
      }
      if (this.formData.activityId == 476 && !this.formData.presentId) {
        this.$Message.info("分组ID不能为空");
        return false;
      }
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.formData.brandId;
      data["level"] = 1;
      this.Global.doPost(
        "displayYxtg/queryAcrossAuditByUpdatedVersion.json",
        data,
        res => {
          this.allNum = res.items;
          this.storeGoodsList = res.datalist;
          if (res.datalist && res.datalist.length) {
            res.datalist.forEach(item => {
              let imageList = [];
              if (item.image) {
                imageList = item.image.filter(val => val);
              }
              item.imageList = imageList;
              let firstImageList = [];
              if (item.firstRadio) {
                if (item.firstRadio.image) {
                  firstImageList = item.firstRadio.image.filter(val => val);
                }
              }
              item.firstImageList = firstImageList;
              if (item.auditPolicy) {
                item.auditPolicy = item.auditPolicy.split("|");
              } else {
                item.auditPolicy = [];
              }
            });
          }
          this.pageNum = res.items;
          this.page = res.page;
        }
      );
    },
    getPosition(index) {
      if (!index) return "right";
      if (index % 2 == 0) return "right";
      else return "left";
    },
    setStatus(val, flag, index) {
      if (val == 0) {
        return;
      }
      if (val == 1001 || val == 2001 || val == 1) {
        val = 1001;
      }
      if (val == 1002 || val == 2) {
        val = 1002;
      }
      if (val == 1003 || val == 3) {
        val = 1003;
      }
      return `${index}-${flag}-${val}`;
    },
    handleSaveEidtGooodsStatu() {
      let objList = this.saveData;
      if (!this.formItem.checkStatus) {
        this.$Message.warning("请选择审核意见");
        return false;
      }
      if (this.formItem.checkStatus != "1001" && !this.checkMessage) {
        this.$Message.warning("请选择不通过的原因");
        return false;
      }
      if (
        this.formItem.checkStatus == "2" ||
        this.formItem.checkStatus == "3"
      ) {
        //不通过、退回
        objList["checkMessage"] = this.checkMessage;
      } else {
        //通过
        objList["checkMessage"] = this.agreeReason;
      }
      objList["checkStatus"] = this.formItem.checkStatus;
      this.storeGoodsList[this.index].checkMessage = objList["checkMessage"];
      this.storeGoodsList[this.index].status = `${this.index}-${
        this.formItem.checkStatus
      }`;

      this.goodsStausShow = false;
      this.formItem = {};
    },
    handleCloseModal() {
      this.goodsStausShow = false;
      this.formItem = {};
    },
    handleIsPass(val) {
      this.activityIsPass = val == "2001" || val == "1001" ? false : true;
    }
  },

  filters: {
    aiFilter(val) {
      let str = "";
      if (val == 0) {
        str = "不通过";
      } else if (val == 1) {
        str = "通过";
      } else if (val == 10) {
        str = "人工介入";
      } else {
        str = "无";
      }
      return str;
    },
    storeOrWorker(val) {
      let str = "";
      if (val == "main" || val == "staff") {
        str = "门店";
      } else if (val == "worker") {
        str = "业务员";
      }
      return str;
    },
    skufilter(val) {
      let str = "";
      if (val == 1) {
        str = "/合格";
      } else if (val == 2) {
        str = "/不合格";
      }
      return str;
    },
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