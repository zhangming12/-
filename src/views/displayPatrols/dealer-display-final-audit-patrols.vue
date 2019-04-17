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
  width: 200px;
  height: 180px;
  cursor: pointer;
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
.pictureBox {
  display: flex;
  justify-content: center;
  img {
    display: block;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title"">经销商陈列巡拍复审</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item required prop="brandId">
                <Select v-model="formData.brandId" placeholder="品牌名称" @on-change="changeValue">
                  <Option
                    :value="item.id"
                    v-for="(item,index) in brandList"
                    :key="index"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="queryStartTime" required>
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
              <Form-item prop="queryEndTime" required>
                <data-range
                  hour="24:00"
                  placeholder="申请结束时间"
                  @dataChange="endTimeChange"
                  :time="formData.queryEndTime"
                ></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item required>
                <Select v-model="formData.checkUserId" placeholder="初审人员" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in audioPersonList"
                    :key="index"
                  >{{ item.userName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Input v-model.trim="formData.storeId" placeholder="门店ID" clearable></Input>
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
                <Form-item prop="merchantId">
                  <Select v-model.trim="formData.merchantId" placeholder="经销商" clearable>
                    <Option
                      :value="item.id"
                      v-for="(item,index) in distributorList"
                      :key="index"
                    >{{ item.merchantName }}</Option>
                  </Select>
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
              <div class="btn-left w18">
                <Form-item prop="groupId" required>
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
            </div>
          </transition>
        </Form>
      </div>

      <!-- <div class="export" style="overflow:hidden;" v-if="storeGoodsList && storeGoodsList.length">
            <span @click="handleAllSurePage">全选</span>
            <span @click="handleBatchSure">批量确认</span>
            <span @click="riskShow">风险预警</span>
      </div>-->
      <div
        class="box container"
        style="width:100%;padding-top:30px;"
        v-if="storeGoodsList && storeGoodsList.length"
      >
        <!-- <CheckboxGroup size="large" v-model="social"> -->
        <div class="card" v-for="(item,index) in storeGoodsList" :key="index">
          <div class="card-top">
            <div class="card-left">
              <template v-if="item && item.checkStatus != -1">
                <!-- <div class="check-box">
                                <Checkbox  size="large" :label="index">
                                    <span style="display:none;"></span>
                                </Checkbox>
                </div>-->
                <div class="video-box">
                  <div class="video">
                    <!-- <div class="video-main">
                                        <img class="noneVideoUrl" :src="item.firstRadio.radioUrl" v-if="item.firstRadio" @click="showBigPicure(item.firstRadio.radioUrl)"/>
                                        <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                        <img class="triangle" src="../../assets/image/triangle-first.jpg">
                    </div>-->
                    <div class="video-main" v-if="item.fileType == 'radio'">
                      <video :src="item.firstRadio.radioUrl" v-if="item.firstRadio" controls></video>
                      <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                      <img class="triangle" src="../../assets/image/triangle-first.jpg">
                    </div>
                    <div class="video-main" v-if="item.fileType == 'image'">
                      <imageLook
                        :key="item.firstRadio.image[0]"
                        :position="getPosition(index)"
                        v-if="item.firstRadio"
                        :imageList="item.firstRadio.image"
                      />
                      <img v-else src="../../assets/image/nullImage.png" class="noneVideoUrl">
                      <img class="triangle" src="../../assets/image/triangle-first.jpg">
                    </div>
                  </div>
                  <div class="video">
                    <!-- <div class="video-main">
                                        <img :src="item.radioUrl" v-if="item.radioUrl" class="noneVideoUrl" @click="showBigPicure(item.radioUrl)"/>
                                        <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                        <img class="triangle" src="../../assets/image/triangle-this.jpg">
                    </div>-->
                    <div class="video-main" v-if="item.fileType == 'radio'">
                      <video :src="item.radioUrl" v-if="item.radioUrl" controls></video>
                      <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                      <img class="triangle" src="../../assets/image/triangle-this.jpg">
                    </div>
                    <div class="video-main" v-if="item.fileType == 'image'">
                      <imageLook
                        :key="item.image[0]"
                        :position="getPosition(index)"
                        v-if="item.image"
                        :imageList="item.image"
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
                          <span>上传姓名：</span>
                          <span>{{ item.workerName }}</span>
                        </p>
                      </div>
                      <div class="item-box">
                        <span>上传渠道：</span>
                        <span>工仔</span>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="item-box">
                        <p :title="getWeek(item.startTime,item.endTime)">
                          <span>上传周期：</span>
                          <span>{{ getWeek(item.startTime,item.endTime) }}</span>
                        </p>
                      </div>
                      <div class="item-box">
                        <span>门店ID：</span>
                        <span>{{ item.storeId }}</span>
                      </div>
                      <div class="item-box">
                        <p :title="item.merchantName">
                          <span>所属经销商：</span>
                          <span>{{ item.merchantName }}</span>
                        </p>
                      </div>
                    </Col>
                    <Col span="8">
                      <div class="item-box">
                        <p :title="item.activityName">
                          <span>活动名称：</span>
                          <span>{{ item.activityName}}</span>
                        </p>
                      </div>
                      <div class="item-box">
                        <p :title="item.storeName">
                          <span>门店名称：</span>
                          <span>{{ item.storeName }}</span>
                        </p>
                      </div>
                      <div class="item-box">
                        <p :title="item.storeRange > 200 ? '位置偏移' :''">
                          <span>预警：</span>
                          <span
                            :class="item.storeRange > 200 ? 'warnColor' : ''"
                          >{{ item.storeRange > 200 ? "位置偏移" :"无" }}</span>
                        </p>
                      </div>
                    </Col>
                    <Col span="23">
                      <div style="border-top:1px solid #666;border-bottom:1px solid #666;">
                        <Row>
                          <Col span="1">
                            <div class="item-box">
                              <span>1</span>
                            </div>
                          </Col>
                          <Col span="4">
                            <div class="item-box">
                              <p :title="item.checkFirstOneUserId">
                                <span>{{item.checkFirstOneUserId}}</span>
                              </p>
                            </div>
                          </Col>
                          <Col span="3">
                            <div class="item-box">
                              <span>{{item.checkFirstOneStatus | statusFilter}}</span>
                            </div>
                          </Col>
                          <Col span="15">
                            <div class="item-box">
                              <p :title="item.checkFirstOneMessage">
                                <span>审核意见：</span>
                                <span>{{ item.checkFirstOneMessage | messageFilter}}</span>
                              </p>
                            </div>
                          </Col>
                        </Row>
                        <Row>
                          <Col span="1">
                            <div class="item-box">
                              <span>2</span>
                            </div>
                          </Col>
                          <Col span="4">
                            <div class="item-box">
                              <p :title="item.checkFirstTwoUserId">
                                <span>{{item.checkFirstTwoUserId}}</span>
                              </p>
                            </div>
                          </Col>
                          <Col span="3">
                            <div class="item-box">
                              <span>{{item.checkFirstTwoStatus | statusFilter}}</span>
                            </div>
                          </Col>
                          <Col span="15">
                            <div class="item-box">
                              <p :title="item.checkFirstTwoMessage">
                                <span>审核意见：</span>
                                <span>{{ item.checkFirstTwoMessage | messageFilter}}</span>
                              </p>
                            </div>
                          </Col>
                        </Row>
                      </div>
                      <!-- <div class="item-box">
                                            <span class="status">合格分项:</span>
                                            <RadioGroup  v-model="item.status" @on-change="radioChange"> 
                                              <Radio :label="index + '-1'">必备包装合格</Radio>
                                              <Radio :label="index + '-2'">全部SKU数合格</Radio>
                                              <Radio :label="index + '-3'">货架牌面数合格</Radio>
                                            </RadioGroup>
                      </div>-->
                      <div class="item-box">
                        <span class="status">审核状态：</span>
                        <RadioGroup v-model="item.status" @on-change="radioChange">
                          <Radio :label="index + '-1'">通过</Radio>
                          <Radio :label="index + '-2'">不通过</Radio>
                          <Radio :label="index + '-3'">退回</Radio>
                        </RadioGroup>
                        <div class="tooltip" style="display:inline-block;">
                          <!-- <Tooltip class="btn-right" max-width="200" :content="item.auditPolicy">
                            <Icon
                              type="md-help-circle"
                              style="margin-left:20px;margin-top:10px;"
                              size="20"
                            />
                          </Tooltip>-->
                          <my-tooltip
                            :auditPolicy="item.auditPolicy"
                            :placement="getPlacement(index)"
                            style="margin-top:10px;"
                          />
                        </div>
                      </div>
                      <div class="item-box">
                        <span class="status">审核意见：</span>
                        <Input v-model.trim="item.checkMessage" placeholder="审核意见"></Input>
                      </div>
                      <!-- <div class="item-box">
                                            <span class="status">内部备注：</span>
                                            <Input v-model.trim="item.memo" placeholder="内部备注"></Input>
                      </div>-->
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
        <!-- </CheckboxGroup> -->
      </div>
      <div class="noData" v-else>暂无数据</div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :page-size="pageSize" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
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
              <Radio label="1">通过</Radio>
              <Radio label="2">不通过</Radio>
              <Radio label="3">退回</Radio>
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
          <FormItem label="客户编号:">{{ joinCodeList.join() }}</FormItem>
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
    <!-- 显示大图 -->
    <Modal
      v-model="showPicture"
      width="800"
      id="goodsStausShow"
      style="position:relative;z-index:1000000;"
    >
      <div class="pictureBox">
        <img :src="pictureUrl" alt>
      </div>
    </Modal>
  </div>
</template>

<script>
import myTooltip from "@/components/tooltip/tooltip.vue";
import dataRange from "@/components/data-rang.vue";
import imageLook from "@/components/imgLook/img-look.vue";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
export default {
  name: "adealer-display-final-audit-patrols-keepAlive",
  components: {
    dataRange,
    imageLook,
    myTooltip
  },
  data() {
    return {
      riskData: {
        riskType: "no"
      },
      audioPersonList: [],
      joinCodeList: [],
      distributorList: [],
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
      showPicture: false,
      storeGoodsList: null,
      goodsStausShow: false,
      formItem: {
        storeName: "",
        checkStatus: "",
        memo: ""
        // isBack: null
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
      pictureUrl: "",
      pageSize: 10,
      pageNum: 0,
      displayExamineType: "A",
      examineB: "",
      checkObj: [],
      wordList: []
    };
  },
  created() {
    // 查询品牌
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, activityType: 6, scope: "a" },
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
    // return
    //查询初审人员列表
    this.Global.doPostNoLoading(
      "displayYxtg/queryRoleAndUserInfo.json",
      { id: 34 },
      res => {
        this.audioPersonList = res;
      }
    );
  },
  mounted() {},
  watch: {
    "formItem.checkStatus"(val) {
      if (val == 2001 || val == 1 || val == 1001) {
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
    getPosition(index) {
      if (!index) return "right";
      if (index % 2 == 0) return "right";
      else return "left";
    },
    showBigPicure(url) {
      this.pictureUrl = url;
      this.showPicture = true;
    },
    //查询经销商数据
    getDistributorList(brandId) {
      this.Global.doPost(
        "dealers/doQueryMerchantByBrandId.json",
        { brandId },
        res => {
          if (res.length) {
            this.distributorList = res;
            setTimeout(() => {
              this.formData.merchantId = "";
            }, 0);
          }
        }
      );
    },
    riskSure() {
      let len = this.social.length;
      let dataList = [];
      if (this.riskData.riskType != "no" && !this.riskData.riskDes) {
        this.$Message.error("风险描述不能为空");
        return false;
      }
      let { riskType, riskDes } = this.riskData;
      if (riskType == "no") {
        riskType = "";
      }
      for (let i = 0; i < len; i++) {
        let obj = {
          activityId: this.storeGoodsList[this.social[i]].activityId,
          storeId: this.storeGoodsList[this.social[i]].storeId,
          period: this.storeGoodsList[this.social[i]].period,
          riskSource: "H",
          riskDes,
          riskType
        };
        this.Global.deleteEmptyProperty(obj);
        dataList.push(obj);
      }
      this.Global.doPost(
        "displayYxtg/addVideoRiskForList.json",
        dataList,
        res => {
          this.$Message.success("操作成功");
          this.riskIsShow = false;
          this.init();
        }
      );
    },
    riskShow() {
      this.joinCodeList = [];
      if (!this.social.length) {
        this.$Message.info("请选择需要批量确认的视频");
        return false;
      }
      let len = this.social.length;
      for (let i = 0; i < len; i++) {
        this.joinCodeList.push(this.storeGoodsList[this.social[i]].joinCode);
      }
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
      // this.formItem.isBack = this.storeGoodsList[arr[0]].isBack;
      if (arr[1] != 1) {
        this.displayExamineWordList = [];
        this.wordList = this.getDisplayExamineWord(
          this.saveData.brandId,
          this.saveData.groupId
        );
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
      this.Global.doPost("patrol/differentPictureCheck.json", params, res => {
        this.init();
        this.saveData = {};
        this.goodsStausShow = false;
        this.$Message.success("保存成功");
        this.formItem.status = "";
      });
    },
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      this.distributorList = [];
      this.formData.merchantId = "";
      if (!value) return;
      //查询经销商数据
      this.getDistributorList(value);
      //查询活动包数据
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        { date: 7, scope: "a", brandId: value },
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
        { date: 7, scope: "a", groupId: value },
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
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.formData.brandId;
      data["level"] = 1;
      this.Global.doPost(
        "patrol/queryDifferentPictureCheckStatus.json",
        data,
        res => {
          this.storeGoodsList = res.datalist;
          this.pageNum = res.items;
          this.page = res.page;
        }
      );
    },
    handleLookDetail(val, flag) {
      let { id, activityId, storeId } = val;
      let queryParams = {
        id,
        activityId,
        storeId
      };
      queryParams = this.Global.JsonChange(queryParams);
      queryParams["displayActCategory"] = "patrolsTwo";
      this.Global.deleteEmptyProperty(queryParams);
      this.$router.push({
        path: "/auditDetailPatrols",
        query: queryParams
      });
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
      this.activityIsPass = val == "1" || val == "1001" ? false : true;
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
        let arr = this.social[i];
        let statusC = this.storeGoodsList[this.social[i]].status;
        if (!statusC) {
          this.$Message.error("请选择审核意见");
          return false;
        }
        statusC = statusC.split("-")[1];
        if (statusC == 2 || statusC == 3) {
          if (!this.storeGoodsList[this.social[i]].checkMessage) {
            this.$Message.error("请输入审核意见");
            return false;
          }
        }
        let obj = {
          id: this.storeGoodsList[this.social[i]].id,
          brandId: this.storeGoodsList[this.social[i]].brandId,
          activityId: this.storeGoodsList[this.social[i]].activityId,
          groupId: this.storeGoodsList[this.social[i]].groupId,
          memo: this.storeGoodsList[this.social[i]].memo,
          checkMessage: this.storeGoodsList[this.social[i]].checkMessage,
          checkStatus: statusC
        };
        this.Global.deleteEmptyProperty(obj);
        dataList.push(obj);
      }
      // return /
      this.Global.doPost("displayYxtg/checkOne.json", dataList, res => {
        this.$Message.success("批量审核成功");
        this.init();
      });
    }
  },

  filters: {
    checkStatusFilter(val) {
      let str = "";
      if (val == 1001 || val == 1) {
        str = "通过";
      } else if (val == 1002 || val == 2) {
        str = "不通过";
      } else if (val == 1003 || val == 3) {
        str = "退回";
      } else if (val == 0) {
        str = "未审核";
      } else if (val == 1) {
        str = "终审通过";
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
    warningStatuFilter(val) {
      let va = Number(val);
      if (va == 100) {
        return "正常";
      } else {
        return "无";
      }
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
    statusFilter(val) {
      let statu = Number(val);
      if (statu == 0) {
        return "未审核";
      } else if (statu == 1 || statu == 1001 || statu == 2001) {
        return "通过";
      } else if (statu == 2 || statu == 1002 || statu == 2002) {
        return "不通过";
      } else if (statu == 3 || statu == 1003 || statu == 2003) {
        return "退回";
      }
    },
    messageFilter(val) {
      if (val) {
        return val;
      }
      return "无";
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