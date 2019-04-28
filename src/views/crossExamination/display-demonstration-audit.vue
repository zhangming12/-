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
.numColor {
  color: @primary-color;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title"">陈列一级审核</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="queryStartTime">
                <data-range
                  @dataChange="startTimeChange"
                  placeholder="申请开始时间"
                  hour="00:00"
                  :time="formData.queryStartTime"
                  start
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryEndTime">
                <data-range
                  hour="24:00"
                  placeholder="申请结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select
                  v-model="formData.brandId"
                  placeholder="品牌名称"
                  @on-change="changeValue"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select
                  v-model="formData.groupId"
                  placeholder="活动名称"
                  @on-change="getActivityList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in groupList"
                    :key="index"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId">
                <Select
                  v-model="formData.activityId"
                  placeholder="子活动名称"
                  @on-change="getpresentList"
                  clearable
                >
                  <Option
                    :value="item.id"
                    v-for="(item,index) in activityList"
                    :key="index"
                  >{{ item.name }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <Icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
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
                <Form-item prop="activityId">
                  <Select v-model="formData.presentId" placeholder="子活动分组" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in presentNameList"
                      :key="index"
                    >{{ item.activityTag }}</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.joinCode" placeholder="客户编号"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeName" placeholder="门店名称"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.salesRoute" placeholder="销售路线"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Select v-model="formData.warning" placeholder="是否预警" clearable>
                    <Option value="1">是</Option>
                    <Option value="0">否</Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>

      <div class="export" style="overflow:hidden;" v-if="storeGoodsList && storeGoodsList.length">
        <span @click="handleBatchSure">批量确认</span>
        <span @click="riskShow">风险预警</span>
        <!-- <span @click="selectAll">全选</span> -->
      </div>
      <div
        class="box clear container"
        style="width:100%;padding-top:30px;"
        v-if="storeGoodsList && storeGoodsList.length"
      >
        <!-- <p style="padding-left:10px;margin-bottom:10px;">待审核 <span class="numColor">{{ allNum - auditNum}}</span>  个，已审核 <span class="numColor">{{ auditNum }}</span> 个</p> -->
        <CheckboxGroup size="large" v-model="social">
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
                      <Col span="8">
                        <div class="item-box">
                          <p>
                            <span>提交时间：</span>
                            <span>{{ item.submitTime | formatYearMonth}}</span>
                          </p>
                        </div>
                        <div class="item-box">
                          <p :title="item.activityTag">
                            <span>活动分组：</span>
                            <span>{{ item.activityTag }}</span>
                          </p>
                        </div>
                        <div class="item-box">
                          <p :title="item.workerName">
                            <span>业代姓名：</span>
                            <span>{{ item.workerName }}</span>
                          </p>
                        </div>
                        <div class="item-box">
                          <p>
                            <span>AI审核状态：</span>
                            <span>{{ item.aiStatus | aiFilter }}</span>
                          </p>
                        </div>
                        <div class="item-box">
                          <span>审核状态：</span>
                          <span :class="item.checkStatus == 1001? 'warnColor' :''">未审核</span>
                        </div>
                      </Col>
                      <Col span="8">
                        <div class="item-box">
                          <span>客户编号：</span>
                          <span>{{ item.joinCode }}</span>
                        </div>
                        <div class="item-box">
                          <p :title="getWeek(item.startTime,item.endTime)">
                            <span>上传周期：</span>
                            <span>{{ getWeek(item.startTime,item.endTime) }}</span>
                          </p>
                        </div>

                        <div class="item-box">
                          <span>销售路线：</span>
                          <span>{{ item.salesRoute }}</span>
                        </div>
                        <div class="item-box">
                          <span>拍摄人员：</span>
                          <span>{{ item.radioChannel | storeOrWorker}}</span>
                        </div>
                        <div class="item-box">
                          <span>渠道：</span>
                          <span>{{ item.bapChannel }}</span>
                        </div>
                      </Col>
                      <Col span="8">
                        <div class="item-box">
                          <p :title="item.activityName">
                            <span>活动名称：</span>
                            <span>{{ item.activityName }}</span>
                          </p>
                        </div>
                        <div class="item-box">
                          <span>门店名称：</span>
                          <span>{{ item.storeName }}</span>
                        </div>
                        <div class="item-box">
                          <p :title="item.storeRange > 200 ? '位置偏移' : ''">
                            <span>预警：</span>
                            <span
                              :class="item.storeRange > 200 ? 'warnColor' : ''"
                            >{{ item.storeRange > 200 ? "位置偏移" :"无" }}</span>
                          </p>
                        </div>

                        <div class="item-box">
                          <span>视频编号：</span>
                          <span>{{ item.id }}</span>
                        </div>
                      </Col>
                      <Col span="23">
                        <!-- <div class="item-box">
                                        <span class="status">合格分项:</span>
                                        <RadioGroup  v-model="item.status" @on-change="radioChange"> 
                                            <Radio :label="index + '-1'">必备包装合格</Radio>
                                            <Radio :label="index + '-2'">全部SKU数合格</Radio>
                                            <Radio :label="index + '-3'">货架牌面数合格</Radio>
                                        </RadioGroup>
                        </div>-->
                        <div class="item-box" v-if="item.isOpenCheck == 1">
                          <check-look
                            :position="getPosition(index)"
                            :presentId="item.presentSkuVO.presentId"
                            :fileType="item.fileType"
                            :key="item.id"
                            :index="index"
                            @getRadioData="getRadioData"
                            @getSkuNecessary="getSkuNecessary"
                            :ind="index"
                            :showAudit="item.presentSkuVO.isSkuNecessary == 1 || item.presentSkuVO.skuNum"
                            :allData="item"
                          ></check-look>
                        </div>
                        <div class="item-box">
                          <span class="status">审核状态：</span>
                          <RadioGroup v-model="item.status" @on-change="radioChange">
                            <Radio :label="index + '-1001'">通过</Radio>
                            <Radio :label="index + '-2'">不通过</Radio>
                            <Radio v-if="item.isBack == 0" :label="index + '-3'">退回</Radio>
                          </RadioGroup>
                          <div class="tooltip" style="display:inline-block;">
                            <my-tooltip
                              :auditPolicy="item.auditPolicy"
                              :placement="getPlacement(index)"
                              style="margin-top:10px;"
                            />
                          </div>
                        </div>
                        <div class="item-box">
                          <span class="status">审核意见：</span>
                          <Input :key="item.id" v-model.trim="item.checkMessage" placeholder="审核意见"></Input>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div class="btn-box">
                    <Button
                      class="lookDetail"
                      @click="handleLookDetail(item,'store')"
                      style="margin-right:10px;"
                    >查看详情</Button>
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
        </CheckboxGroup>
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
              <Radio label="2">不通过</Radio>
              <Radio v-if="formItem.isBack == 0" label="3">退回</Radio>
            </RadioGroup>
          </FormItem>

          <div id="examine-right" v-show="!activityIsPass">
            <span style="color:#ff8a34">可输入原因,并反馈给门店</span>
            <Input v-model="checkMessage" style="width:220px" placeholder="请输入原因"></Input>
          </div>
          <div id="examine-right" v-show="activityIsPass">
            <span style="color:#ff8a34">输入不通过的原因,并反馈给门店，要求重新提交</span>
            <FormItem label="审核意见:" :label-width="70">
              <Input @on-change="wordFilter" v-model="checkMessage"></Input>
            </FormItem>
            <RadioGroup v-model="checkMessage" vertical class="radio" @on-change="wordChange">
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
    <Modal
      v-model="riskIsShow"
      width="600"
      id="goodsStausShow"
      style="position:relative;z-index:1000000;"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <span>风险预警</span>
      </p>
      <div>
        <Form :model="riskData" :label-width="90">
          <FormItem label="视频编码:">
            <Input v-model.trim="riskData.ids" placeholder="请输入视频编码，多个用逗号隔开"></Input>
          </FormItem>
          <FormItem label="风险类型:">
            <Select v-model="riskData.riskType" placeholder="风险类型">
              <Option value="no">无</Option>
              <Option value="V">视频异常</Option>
            </Select>
          </FormItem>
          <FormItem label="风险描述:">
            <Input v-model.trim="riskData.riskDes" placeholder="风险描述"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" @click="riskIsShow = false;">取消</Button>
        <Button type="warning" @click="riskSure">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
import checkLook from "@/components/checkLook/check-look.vue";
import myTooltip from "@/components/tooltip/tooltip.vue";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import imageLook from "@/components/imgLook/img-look.vue";
export default {
  name: "first-instance-display-single-keepAlive",
  components: {
    dataRange,
    imageLook,
    checkLook,
    myTooltip
  },
  data() {
    return {
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
        groupId: "", //活动包名ID
        brandId: "",
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
      social: [],
      storeGoodsList: null,
      goodsStausShow: false,
      formItem: {
        storeName: "",
        checkStatus: "",
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
      pageSize: 2,
      pageNum: 0,
      displayExamineType: "A",
      examineB: "",
      checkObj: [],
      wordList: [],
      allNum: 0,
      auditNum: 0
    };
  },
  created() {
    if (Object.keys(this.$route.query).length) {
      let { brandId, groupId, activityId } = this.$route.query;
      this.Global.doPostNoLoading(
        "condition/queryBrands.json",
        { date: 7, activityType: 3, scope: "a" },
        res => {
          this.brandList = [];
          Object.entries(res).forEach(item => {
            this.brandList.push({ id: Number(item[0]), brandName: item[1] });
          });
          if (this.brandList && this.brandList.length) {
            this.formData.brandId = brandId;
            this.groupList = [];
            this.formData.groupId = "";
            this.Global.doPostNoLoading(
              "condition/queryGroup.json",
              {
                date: 7,
                activityType: 3,
                scope: "a",
                brandId
              },
              res => {
                Object.entries(res).forEach(item => {
                  this.groupList.push({
                    id: Number(item[0]),
                    groupName: item[1]
                  });
                });
                if (this.groupList && this.groupList.length) {
                  this.formData.groupId = groupId;
                  this.Global.doPostNoLoading(
                    "condition/queryActivity.json",
                    { date: 7, activityType: 3, scope: "a", groupId },
                    res => {
                      Object.entries(res).forEach(item => {
                        this.activityList.push({
                          id: Number(item[0]),
                          name: item[1]
                        });
                      });
                      this.formData.activityId = activityId;
                      this.init();
                    }
                  );
                }
              }
            );
          }
        }
      );
    } else {
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
            this.groupList = [];
            this.formData.groupId = "";
            this.Global.doPostNoLoading(
              "condition/queryGroup.json",
              {
                date: 7,
                activityType: 3,
                scope: "a",
                brandId: this.formData.brandId
              },
              res => {
                Object.entries(res).forEach(item => {
                  this.groupList.push({
                    id: Number(item[0]),
                    groupName: item[1]
                  });
                });
                if (this.groupList && this.groupList.length) {
                  this.formData.groupId = this.groupList[0].id;

                  this.init();
                  this.getActivityList(this.formData.groupId);
                }
              }
            );
          }
        }
      );
    }
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
    getPlacement(index) {
      let str = "right";
      if (index % 2) {
        str = "left";
      }
      return str;
    },
    selectAll() {
      this.storeGoodsList.forEach((item, index) => {
        item.status = `${index}-1001`;
      });
    },
    getSkuNecessary(obj) {
      let { index, skuNecessary } = obj;
      this.storeGoodsList[index].skuNecessary = skuNecessary;
    },
    queryAuditNum() {
      if (!this.formData.groupId) {
        this.$Message.error("活动包不能为空");
        return;
      }
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
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
      data["currentPage"] = 1;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.formData.brandId;
      data["level"] = 1;
      this.Global.doPost(
        "displayYxtg/queryVideoNumAndAuditedNum.json",
        data,
        res => {
          if (res) {
            let data = Object.entries(res);
            this.auditNum = parseInt(data[0][1], 10);
            this.allNum = parseInt(data[0][0], 10);
          }
        }
      );
    },
    getRadioData(v) {
      let { index, data, len } = v;
      this.storeGoodsList[index].checkProject = data;
      this.storeGoodsList[index].len = len;
    },
    riskSure() {
      if (this.riskData.riskType != "no" && !this.riskData.riskDes) {
        this.$Message.error("风险描述不能为空");
        return false;
      }
      let { riskType, riskDes } = this.riskData;
      if (riskType == "no") {
        riskType = "";
      }
      let data = {
        riskType,
        riskDes,
        memo: this.riskData.ids,
        riskSource: "H"
      };
      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("displayYxtg/addVideoRiskBatch.json", data, res => {
        this.$Message.success("操作成功");
        this.riskIsShow = false;
        this.init();
      });
    },
    riskShow() {
      this.riskIsShow = true;
    },
    wordChange(val) {
      if (val) {
      }
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
      this.presentNameList = [];
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
    // changePage(size) {
    //   this.page = size;
    //   this.init();
    // },
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
      if (!this.formData.groupId) {
        this.$Message.error("活动包不能为空");
        return;
      }
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryStartTime
      );
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
      data["currentPage"] = 1;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.formData.brandId;
      data["level"] = 1;
      // queryAcrossAudit.json
      this.Global.doPost(
        "displayYxtg/queryAcrossAuditByUpdatedVersion.json",
        data,
        res => {
          this.storeGoodsList = res.datalist;
          if (res.datalist && res.datalist.length) {
            res.datalist.forEach(item => {
              let imageList = [];
              if (item.image) {
                imageList = item.image.filter(val => val);
              }
              item.imageList = imageList;
              item.checkProject = {};
              item.len = 0;
              let firstImageList = [];
              if (item.firstRadio) {
                if (item.firstRadio.image) {
                  firstImageList = item.firstRadio.image.filter(val => val);
                }
              }
              item.firstImageList = firstImageList;
            });
          }
          this.pageNum = res.items;
          // this.page = res.page;
        }
      );
      // this.queryAuditNum();
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
    handleLookDetail(val, flag) {
      let { id, activityId, storeId } = val;
      let queryParams = {
        id,
        activityId,
        storeId
      };
      queryParams = this.Global.JsonChange(queryParams);
      queryParams["displayActCategory"] = "singleOne";
      this.Global.deleteEmptyProperty(queryParams);
      this.$router.push({
        path: "/auditDetail",
        query: queryParams
      });
    },
    handleSaveEidtGooodsStatu() {
      let objList = this.saveData;
      if (!this.formItem.checkStatus) {
        this.$Message.warning("请选择审核状态");
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
    },
    save(item, index) {
      let statusC = item.status;
      if (!statusC) {
        this.$Message.error("请选择审核状态");
        return false;
      }
      statusC = statusC.split("-")[1];

      var params = {
        id: item.id,
        brandId: item.brandId,
        groupId: item.groupId,
        activityId: item.activityId,
        checkMessage: item.checkMessage,
        checkStatus: parseInt(statusC, 10)
      };
      let data = item.presentSkuVO;
      if (item.isOpenCheck == 1 || data) {
        let entries = Object.values(item.checkProject);
        let len = 0;
        for (let i = 0; i < entries.length; i++) {
          len += entries[i];
        }
        if (!len && statusC == "1001") {
          this.$Message.info("只有考核项全部通过才能选择通过");
          return false;
        }
        if (len == item.len) {
          //全部通过
          if (statusC != 1001) {
            this.$Message.info("考核项全部通过只能选择通过");
            return false;
          }
        } else {
          if (statusC == 1001) {
            this.$Message.info("只有考核项全部通过才能选择通过");
            return false;
          }
        }
        params["checkProject"] = item.checkProject;
      }

      if (data) {
        if (data.isSkuNecessary == 1) {
          params["skuNecessary"] = item.skuNecessary;
        }
      }
      if (statusC == 2 || statusC == 3) {
        if (!item.checkMessage) {
          this.$Message.error("请输入审核意见");
          return false;
        }
      }
      if (statusC == 1001) {
        delete params["checkMessage"];
      }
      this.Global.doPost("displayYxtg/displayVideoAudit.json", params, res => {
        this.storeGoodsList.splice(index, 1);
        this.saveData = {};
        this.goodsStausShow = false;
        this.$Message.success("保存成功");
        this.formItem.status = "";
        if (this.storeGoodsList.length == 0) {
          this.init();
        }
      });
    },
    handleBatchSure() {
      //批量确认
      let social = [];
      this.storeGoodsList.forEach(item => {
        if (item.status) {
          let index = item.status.split("-")[0];
          social.push(index);
        }
      });
      let len = social.length;
      if (!len) {
        this.$Message.info("请选择需要批量确认的视频");
        return false;
      }

      let dataList = [];
      for (let i = 0; i < len; i++) {
        let arr = social[i];
        let statusC = this.storeGoodsList[social[i]].status;
        if (!statusC) {
          this.$Message.error("请选择审核状态");
          return false;
        }
        statusC = statusC.split("-")[1];
        let data = this.storeGoodsList[social[i]].presentSkuVO;
        if (this.storeGoodsList[social[i]].isOpenCheck == 1 || data) {
          let entries = Object.values(
            this.storeGoodsList[social[i]].checkProject
          );
          let len = 0;
          let arrr = entries.forEach(item => {
            if (item) {
              len++;
            }
          });
          if (!len && statusC == "1001") {
            this.$Message.info("只有考核项全部通过才能选择通过");
            return false;
          }
          if (len == entries.length) {
            if (statusC != 1001) {
              this.$Message.info("考核项全部通过只能选择通过");
              return false;
            }
          } else {
            if (statusC == 1001) {
              this.$Message.info("只有考核项全部通过才能选择通过");
              return false;
            }
          }
        }
        if (statusC == 2 || statusC == 3) {
          if (!this.storeGoodsList[social[i]].checkMessage) {
            this.$Message.error("请输入审核意见");
            return false;
          }
        }
        let obj = {
          id: this.storeGoodsList[social[i]].id,
          brandId: this.storeGoodsList[social[i]].brandId,
          activityId: this.storeGoodsList[social[i]].activityId,
          groupId: this.storeGoodsList[social[i]].groupId,
          checkMessage: this.storeGoodsList[social[i]].checkMessage,
          checkStatus: parseInt(statusC, 10)
        };
        if (data) {
          if (data.isSkuNecessary == 1) {
            obj["skuNecessary"] = this.storeGoodsList[social[i]].skuNecessary;
          }
        }
        this.Global.deleteEmptyProperty(obj);
        if (this.storeGoodsList[social[i]].isOpenCheck == 1) {
          obj.checkProject = this.storeGoodsList[social[i]].checkProject;
        }
        if (statusC == "1001") {
          delete obj["checkMessage"];
        }
        dataList.push(obj);
      }
      this.Global.doPost(
        "displayYxtg/displayVideoBathAudit.json",
        dataList,
        res => {
          this.$Message.success("批量审核成功");
          social.reverse().forEach(item => {
            this.storeGoodsList.splice(item, 1);
          });
          if (this.storeGoodsList.length == 0) {
            this.init();
          } else {
            // this.queryAuditNum();
          }
          window.scrollTo(0, 0);
        }
      );
    }
  },

  filters: {
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
    },
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
    }
  }
};
</script>