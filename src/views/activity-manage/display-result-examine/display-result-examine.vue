
<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  padding: 15px;
}
.footerBottun {
  position: fixed;
  bottom: 15px;
  // width: 100%;
  right: 70px;
}
.box {
  width: 100%;
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  overflow: hidden;
  .form-title {
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    font-weight: 600;
    padding-left: 10px;
    border-left: 3px solid @primary-color;
    margin-bottom: 10px;
  }
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
// 陈列视频
#displayViedo {
  margin-top: 10px;
  overflow: hidden;
  .title {
    display: inline-block;
    // float: left;
    height: 150px;
    line-height: 150px;
  }

  #imgBox {
    height: 150px;
    margin-left: 20px;
    display: table;
    float: left;
    .changeImg {
      width: 300px;
      height: 200px;

      display: table-cell;
      vertical-align: middle;
      border: 1px solid #efefef;
      img {
        width: 100%;
        height: 200px;
        display: block;
      }
      video {
        width: 300px;
        height: 300px;
        display: block;
      }
    }
  }
  .firstTitel {
    height: 150px;
    line-height: 150px;
    padding-left: 20px;
    color: rgb(255, 138, 52);
  }
}
// 近期扫码量
#nearScanQuantity {
  margin-top: 10px;
  overflow: hidden;
  .title {
    display: inline-block;
    // float: left;
    height: 120px;
    line-height: 120px;
  }
  .scanbox {
    float: left;
    margin-left: 6px;
    .nearScan {
      overflow: hidden;
      .scan {
        float: left;
        width: 100px;
        height: 120px;
        text-align: center;
        margin: 10px;
        box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
        .num {
          color: @primary-color;
          padding-top: 20px;
          font-size: 12px;
          font-weight: 600;
          height: 56px;
        }
        .month {
          padding-top: 30px;
          font-size: 16px;
        }
      }
      .scanCount {
        width: 130px;
      }
    }
  }
}
//店铺信息
#shopInfor {
  margin-top: 10px;
  overflow: hidden;
  .title {
    display: inline-block;
    // float: left;
    height: 228px;
    line-height: 228px;
  }
  .child {
    width: 95%;
    float: left;
    margin-left: 20px;
    .Input {
      display: inline-block;
      .ivu-input {
        width: 300px;
        padding: 1px 7px;
        height: 52px;
        border-radius: 3px;
        text-align: center;
      }
    }
    .ivu-radio-group-vertical .ivu-radio-wrapper {
      display: inline;
    }
  }
  .ivu-form-item {
    margin-bottom: 0;
  }
  .clickPlay {
    color: @primary-color;
    cursor: pointer;
  }
}

//审核意见
#examine {
  margin-top: 10px;
  overflow: hidden;
  .title {
    // float: left;
    display: inline-block;
    height: 30px;
    line-height: 30px;
  }
  #examine-left {
    //float: left;
    width: 450px;
    .ivu-radio-group-vertical .ivu-radio-wrapper {
      display: inline;
      margin-left: 10px;
    }
  }

  #examine-right {
    //float: left;
    margin: 4px;
    margin-top: 10px;
    margin-left: 10px;
    padding: 14px;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
    width: 450px;
    span {
      display: block;
    }
  }
  #displayMemo {
    margin-top: 20px;
    span {
      display: inline-block;
    }
  }
}

.goodsDetail {
  // width: 47%;
  // margin-left: 2%;
  margin-top: 15px;
  width: 100%;
  display: flex;
  flex-direction: row;
  .showVideoPlay {
    height: 213px;
    position: relative;
    width: 250px;
    margin-left: 10px;
    video {
      width: 100%;
      height: 100%;
    }
    .ivu-btn {
      padding: 3px 15px;
    }
    .triangle {
      position: absolute;
      top: 0;
      z-index: 99;
      width: 50px;
      height: 50px;
    }
  }

  .goodsInfors {
    padding-left: 5px;
    flex: 1;
    margin-left: 4px;
    p {
      font-size: 12px;
      margin-bottom: 20px;
    }
  }
  .colorError {
    color: #ed3f14;
  }
}
footer {
  text-align: right;
  margin: 40px 0 20px;
  .btn-save {
    color: #fff;
    background-color: @primary-color;
    border-color: @primary-color;
    padding: 5px 15px;
    cursor: pointer;
  }
}
.groupStyle {
  color: @primary-color;
  span {
    font-size: 14px;
    font-weight: 600;
  }
}
.fl-l {
  float: left;
}
.fl-r {
  float: right;
  color: #fd8a34;
  font-size: 12px;
  cursor: pointer;
}
#container {
  height: 300px;
}
.qualified {
  overflow: hidden;
  height: 75px;
  .left {
    float: left;
    font-size: 12px;
    width: 60px;
    height: 75px;
  }
  .right {
    float: left;
    width: calc(~"(100% - 60px)");
    height: 75px;
    ul li {
      height: 25px;
      font-size: 12px;
      line-height: 25px;
      img {
        display: inline-block;
        width: 12px;
        margin-top: 2px;
        height: 12px;
      }
    }
  }
}
.videoBox {
  // display: flex;

  .storeGoods {
    float: left;
    width: 47%;
    margin-left: 2%;
    margin-top: 10px;
    border: 1px solid #e5e5e5;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title" v-if="displayActCategory == 'OneLevel' ">陈列结果一级审核</h2>
        <h2 class="Title" v-else-if=" displayActCategory == 'TwoLevel' ">陈列结果二级审核</h2>
        <h2 class="Title" v-else-if=" displayActCategory == 'ThreeLevel' ">陈列确认及奖励发放</h2>
         <h2 class="Title" v-else-if=" displayActCategory == 'partake' && displayBackType == 'C' ">陈列活动参与明细</h2>
        <h2 class="Title" v-else-if=" displayActCategory == 'partake' && displayBackType == 'D' ">陈列活动参与明细2</h2>
    <h2 class="Title" v-else-if=" displayActCategory == 'partake' && displayBackType == 'E' ">河北中粮陈列活动参与明细</h2>-->
    <div class="box">
      <!-- 店铺信息 -->
      <Form :model="formData" label-position="left" :label-width="0">
        <div class="form-title">店铺信息</div>
        <div id="shopInfor">
          <div class="child">
            <Row>
              <Col span="6">
                <FormItem>
                  <span>客户编号 :</span>
                  <span>{{formData.joinCode}}</span>
                </FormItem>
                <FormItem>
                  <span>手机号码 :</span>
                  <span>{{formData.phone | phoneFormat}}</span>
                </FormItem>
                <FormItem>
                  <span>线路编号 :</span>
                  <span>{{formData.salesRoute}}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>店铺ID :</span>
                  <span>{{formData.storeId}}</span>
                </FormItem>
                <FormItem class="TextOverflow">
                  <span>地 址 :</span>
                  <span :title="formData.address">{{formData.address}}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>店铺名称 :</span>
                  <span>{{formData.storeName}}</span>
                </FormItem>
                <FormItem>
                  <span>业代姓名 :</span>
                  <span>{{formData.workerName}}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>姓 名 :</span>
                  <span>{{formData.name}}</span>
                </FormItem>
                <FormItem>
                  <span>业代手机 :</span>
                  <span>{{formData.workerPhone | phoneFormat}}</span>
                </FormItem>
              </Col>
            </Row>
          </div>
        </div>
        <!-- 陈列活动 -->
        <div class="form-title">活动信息</div>
        <div id="shopInfor">
          <div class="child">
            <Row>
              <Col span="6">
                <FormItem>
                  <span>陈列活动 :</span>
                  <span>{{formData.activityName}}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>活动分组 :</span>
                  <span class="displayGroupPrimary">{{formData.presentName}}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>陈列折扣 :</span>
                  <span>{{ formData.reward }}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>上传周期 :</span>
                  <span>{{formData.startTime | formatYearMonth}}至{{formData.endTime | formatYearMonth}}</span>
                </FormItem>
              </Col>
            </Row>
          </div>
        </div>
        <!-- 预警信息 -->
        <div class="form-title">预警信息</div>
        <div id="shopInfor">
          <div class="child">
            <Row>
              <Col span="6">
                <FormItem>
                  <span>风险来源 :</span>
                  <span>{{formData.riskSource | riskSourceFilter}}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>风险类型 :</span>
                  <span class="displayGroupPrimary">{{formData.riskType | riskTypeFilter}}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>风险描述 :</span>
                  <span>{{ formData.riskDes }}</span>
                </FormItem>
              </Col>
              <Col span="6">
                <FormItem>
                  <span>风险状态 :</span>
                  <span>{{ formData.riskStatus | riskStatusFilter}}</span>
                </FormItem>
              </Col>
            </Row>
          </div>
        </div>
      </Form>
      <!-- 地图预警 -->
      <div class="form-title" style="margin-top:10px;">地图预警</div>
      <div id="container"></div>
      <!-- 视频信息 -->
      <div class="videoInfor" style="margin-top:15px;overflow:hidden;">
        <div class="form-title videoTitle fl-l">视频信息</div>
        <div class="videoRecord fl-r">
          累计上传
          <span class="color-orange">{{ uploadCount }}</span>次,预警
          <span class="color-orange">{{ riskCount }}</span>次
          <span class="color-orange" @click="handleLookMore">{{isShowMore?'收起列表':'查看更多'}}>></span>
        </div>
      </div>
      <div class="videoBox container">
        <div class="storeGoods" v-if="firstRadio">
          <div class="goodsDetail">
            <!-- v-if="firstRadio.fileType == 'video'" -->
            <div class="showVideoPlay" v-if="firstRadio.fileType == 'radio'">
              <video :src="firstRadio.radioUrl" ref="playVideo" controls></video>
              <img class="triangle" src="../../../assets/image/triangle-first.jpg">
            </div>
            <div class="showVideoPlay" v-if="firstRadio.fileType == 'image'">
              <imageLook
                :key="firstRadio.imageList[0]"
                position="right"
                :imageList="firstRadio.imageList"
              />
              <img class="triangle" src="../../../assets/image/triangle-first.jpg">
            </div>
            <div class="goodsInfors">
              <P>拍摄时间：{{firstRadio.uploadTime | formatYearMonth}}</P>
              <P>上传周期：{{firstRadio.uploadStartTime | formatYearMonth }}至{{firstRadio.uploadEndTime | formatYearMonth }}</P>
              <P style="white-space: nowrap;text-overflow:ellipsis; overflow:hidden;">
                坐标预警：
                <span :class="{ 'colorError': firstRadio.locate == '异常'}">{{firstRadio.riskLocate}}</span>
              </P>
              <p>状态预警：{{firstRadio.warningStatus | warningStatuFilter}}</p>
              <!-- 合格分项 -->
              <div class="qualified" v-if="firstRadio.isSku == 1&& firstRadio.skuScoreVO">
                <div class="left">合格分项:</div>
                <div class="right">
                  <ul>
                    <li>
                      <img
                        v-if="firstRadio.skuScoreVO.scoreStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img
                        v-if="firstRadio.skuScoreVO.scoreStatus == 2"
                        src="../../../assets/image/SKU3.png"
                        alt
                      >
                      <span>必备包装合格</span>
                    </li>
                    <li>
                      <img
                        v-if="firstRadio.skuScoreVO.skuStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img
                        v-if="firstRadio.skuScoreVO.skuStatus == 2"
                        src="../../../assets/image/SKU3.png"
                        alt
                      >
                      <span>全部SKU数合格</span>
                    </li>
                    <li>
                      <img
                        v-if="firstRadio.skuScoreVO.faceStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img
                        v-if="firstRadio.skuScoreVO.faceStatus == 2"
                        src="../../../assets/image/SKU3.png"
                        alt
                      >
                      <span>货架排面数合格</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>审核状态：{{firstRadio.checkStatus | statusFilter }}</p>
              <p>审核意见：{{firstRadio.checkMessge}}</p>
            </div>
          </div>
        </div>
        <div class="storeGoods" v-if="thisRadio">
          <div class="goodsDetail">
            <!-- v-if="fileType == 'radio'" -->
            <div class="showVideoPlay" v-if="fileType == 'radio'">
              <video :src="thisRadio.radioUrl" ref="playVideo" controls></video>
              <img class="triangle" src="../../../assets/image/triangle-this.jpg">
            </div>
            <div class="showVideoPlay" v-if="fileType == 'image'">
              <imageLook
                :key="thisRadio.imageList[0]"
                :position="firstRadio ? 'left' : 'right'"
                :imageList="thisRadio.imageList"
              />
              <img class="triangle" src="../../../assets/image/triangle-this.jpg">
            </div>
            <div class="goodsInfors">
              <P>拍摄时间：{{thisRadio.uploadTime | formatYearMonth}}</P>
              <P>上传周期：{{thisRadio.uploadStartTime | formatYearMonth }}至{{thisRadio.uploadEndTime | formatYearMonth }}</P>
              <P style="white-space: nowrap;text-overflow:ellipsis; overflow:hidden;">
                坐标预警：
                <span :class="{ 'colorError': thisRadio.locate == '异常'}">{{thisRadio.riskLocate}}</span>
              </P>
              <p>状态预警：{{thisRadio.warningStatus | warningStatuFilter}}</p>
              <!-- 合格分项 -->
              <!-- <div class="qualified">
                          <div class="left">合格分项:</div>
                          <div class="right">
                            <ul>
                              <li v-for="(val,i) in qualifiedList" :key="i">
                                <img v-if="val.value" src="../../../assets/image/SKU1.png" alt="">
                                <img v-if="!val.value" src="../../../assets/image/SKU3.png" alt="">
                                <span>{{val.name}}</span>
                              </li>
                            </ul>
                          </div>
              </div>-->
              <div class="qualified" v-if="thisRadio.isSku == 1&&thisRadio.skuScoreVO">
                <div class="left">合格分项:</div>
                <div class="right">
                  <ul>
                    <li>
                      <img
                        v-if="thisRadio.skuScoreVO.scoreStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img
                        v-if="thisRadio.skuScoreVO.scoreStatus == 2"
                        src="../../../assets/image/SKU3.png"
                        alt
                      >
                      <span>必备包装合格</span>
                    </li>
                    <li>
                      <img
                        v-if="thisRadio.skuScoreVO.skuStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img
                        v-if="thisRadio.skuScoreVO.skuStatus == 2"
                        src="../../../assets/image/SKU3.png"
                        alt
                      >
                      <span>全部SKU数合格</span>
                    </li>
                    <li>
                      <img
                        v-if="thisRadio.skuScoreVO.faceStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img
                        v-if="thisRadio.skuScoreVO.faceStatus == 2"
                        src="../../../assets/image/SKU3.png"
                        alt
                      >
                      <span>货架排面数合格</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>审核状态：{{thisRadio.checkStatus | statusFilter}}</p>
              <p>审核意见：{{thisRadio.checkMessage}}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="videoBox container">
        <div class="storeGoods" v-for="(item, index) in radioList" :key="index" v-show="isShowMore">
          <div class="goodsDetail">
            <!-- v-if="fileType == 'radio'" -->
            <div class="showVideoPlay" v-if="fileType == 'radio'">
              <video :src="item.radioUrl" :ref=""playVideo" + index" controls></video>
            </div>
            <div class="showVideoPlay" v-if="fileType == 'image'">
              <imageLook
                :key="item.imageList[0]"
                :position="getPosition(index)"
                :imageList="item.imageList"
              />
            </div>
            <div class="goodsInfors">
              <P>拍摄时间：{{item.uploadTime | formatYearMonth}}</P>
              <P>上传周期：{{item.uploadStartTime | formatYearMonth }}至{{item.uploadEndTime | formatYearMonth }}</P>
              <P
                style="white-space: nowrap;text-overflow:ellipsis; overflow:hidden;"
                :title="item.riskLocate"
              >
                坐标预警：
                <span :class="{ 'colorError': item.locate == '异常'}">{{item.riskLocate}}</span>
              </P>
              <p>状态预警：{{item.warningStatus | warningStatuFilter}}</p>
              <!-- 合格分项 -->
              <!-- <div class="qualified">
                          <div class="left">合格分项:</div>
                          <div class="right">
                            <ul>
                              <li v-for="(val,i) in qualifiedList" :key="i">
                                <img v-if="val.value" src="../../../assets/image/SKU1.png" alt="">
                                <img v-if="!val.value" src="../../../assets/image/SKU3.png" alt="">
                                <span>{{val.name}}</span>
                              </li>
                            </ul>
                          </div>
              </div>-->
              <div class="qualified" v-if="item.isSku == 1 && item.skuScoreVO">
                <div class="left">合格分项:</div>
                <div class="right">
                  <ul>
                    <li>
                      <img
                        v-if="item.skuScoreVO.scoreStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img v-else src="../../../assets/image/SKU3.png" alt>
                      <span>必备包装合格</span>
                    </li>
                    <li>
                      <img
                        v-if="item.skuScoreVO.skuStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img v-else src="../../../assets/image/SKU3.png" alt>
                      <span>全部SKU数合格</span>
                    </li>
                    <li>
                      <img
                        v-if="item.skuScoreVO.faceStatus == 1"
                        src="../../../assets/image/SKU1.png"
                        alt
                      >
                      <img v-else src="../../../assets/image/SKU3.png" alt>
                      <span>货架排面数合格</span>
                    </li>
                  </ul>
                </div>
              </div>
              <p>审核状态：{{item.checkStatus | statusFilter}}</p>
              <p>审核意见：{{item.checkMessage}}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 操作日志  -->
      <div
        class="form-title"
        style="margin-top:18px;"
        v-if=" !(displayActCategory == 'partake' && displayBackType == 'C' || displayActCategory == 'partake'&&displayBackType == 'D')"
      >操作日志</div>
      <div
        class="option-record"
        v-if=" !(displayActCategory == 'partake' && displayBackType == 'C' || displayActCategory == 'partake'&&displayBackType == 'D')"
      >
        <p style="margin-left:18px;" v-for="(item,index) in auditLogList" :key="index">
          {{index + 1}} , {{item.checkTime | formatYearMonth}} 由{{item.userId}}进行{{item.operateDesc}} ，审核状态为{{item.checkStatus | statusFilter}}
          <span v-if="item.checkMessage">, 原因为{{ item.checkMessage }}</span>
        </p>
      </div>
    </div>
    <footer v-if="displayActCategory == 'OneLevel'" class="footerBottun">
      <Button type="success" class="btn-back" @click="handleOnelevelBack">返回</Button>
    </footer>
    <footer v-else-if=" displayActCategory == 'TwoLevel' " class="footerBottun">
      <Button type="success" class="btn-back" @click="handleTwolevelBack">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'ThreeLevel'">
      <Button type="success" class="btn-back" @click="handleThreelevelBack">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'partake'">
      <Button type="success" class="btn-back" @click="handlePartakeBack">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'partakeXiaMen'">
      <Button type="success" class="btn-back" @click="handlePartakeBackXiaMen">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'partakeJiMei'">
      <Button type="success" class="btn-back" @click="handlePartakeBackJiMei">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'partakeTongAn'">
      <Button type="success" class="btn-back" @click="handlePartakeBackTongAn">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'OneLevelNew'">
      <Button type="success" class="btn-back" @click="handleOnelevelNewBack">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'TwoLevelNew'">
      <Button type="success" class="btn-back" @click="handleTwolevelNewBack">返回</Button>
    </footer>
    <!-- 交叉审核 -->
    <footer class="footerBottun" v-else-if=" displayActCategory == 'singleOne'">
      <Button type="success" class="btn-back" @click="handleSingleOne">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'singleTwo'">
      <Button type="success" class="btn-back" @click="handleSingleTwo">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'doubleOne'">
      <Button type="success" class="btn-back" @click="handleDoubleOne">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'doubleTwo'">
      <Button type="success" class="btn-back" @click="handleDoubleTwo">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'risk'">
      <Button type="success" class="btn-back" @click="handlerisk">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'uploadDetail'">
      <Button type="success" class="btn-back" @click="handleUpload">返回</Button>
    </footer>
    <footer class="footerBottun" v-else-if=" displayActCategory == 'partake-upload'">
      <Button type="success" class="btn-back" @click="handleUploads">返回</Button>
    </footer>
  </div>
</template>

<script>
import area from "../../../config/areaCode.js";
import upData from "../../../assets/js/upload.js";
import PROJECT_CONFIG from "../../../util/config.js";
import imageLook from "@/components/imgLook/img-look.vue";
import { displayFinalAudit } from "@/api/activity-manage/display-apply-examine.js";
/**
 * @desc 审核意见为不同或者退回
 * @param {ArrayList}  require 陈列详情
 * @param require vue实例
 */
let noPassReason = (res, that) => {
  if (!res || !that) {
    return;
  }
  let checkMessage = res.checkMessage;
  if (
    checkMessage == "拍摄模糊，请重新拍摄上传5秒以上视频" ||
    checkMessage == "陈列摆放错误，请按要求摆放" ||
    checkMessage == "没有价格标识，请添加价格签，谢谢！" ||
    checkMessage == "请及时补货，割箱陈列首层产品不能低于100%，谢谢！" ||
    checkMessage ==
      "请重新上传视频，请拍摄到超市入口处或超市明显位置，谢谢！" ||
    checkMessage ==
      "陈列产品两侧或前面请勿遮挡，请重新陈列后上传视频，谢谢！" ||
    checkMessage ==
      "陈列位置不符合要求，请陈列在超市入口处或超市明显处，谢谢！" ||
    checkMessage ==
      "视频拍摄模糊，无法识别陈列箱数，请在光线充足的情况下拍摄上传，谢谢！"
  ) {
    that.checkMessage = checkMessage;
  } else {
    that.checkMessage = 2;
    that.refuseReason = checkMessage;
  }
};
export default {
  data() {
    return {
      fileType: "",
      qualifiedList: [
        {
          name: "必备包装合格",
          value: false
        },
        {
          name: "全部SKU数合格",
          value: true
        },
        {
          name: "货架排面数合格",
          value: false
        }
      ],
      uploadCount: null, //总共上传次数
      radioList: [], //视频信息集合
      // firstRadioList: [], //首次 本次 上传视频的信息
      thisRadio: {}, //本次
      firstRadio: {}, //首次
      checkStatus: 0, //审核状态，0-未审核 1-通过 2-不通过 3-退回
      auditLogList: [], //日志文件
      vertical: 0,
      riskCount: null, //预警次数
      locateList: [],
      storeGoodsList: null,
      isShowMore: false,
      formData: {
        reward: "", //陈列奖励
        storeRoute: "", //线路编号
        storeId: "",
        storeName: "",
        name: "",
        storePhone: "",
        address: "", //店铺地址
        workerName: "", //业代手机号
        workerPhone: "", //业代姓名
        activityName: "", //陈列活动
        groupeName: "", //分组名称
        joinCode: "", //客户编号

        // displayAward: "", //陈列奖励
        uploadDayCount: "", //上传周期
        uploadGoodDate: "", //上传有效期

        specialRemarks: "", //特殊说明
        displayRules: "", //陈列规则
        ruleText: ""
      },
      otherStoreGoodsList: null,

      notifyMessage: "",
      rule: {
        brandId: [{ required: true, message: "请选择品牌名称" }]
      },
      displayActCategory: null, //活动类别
      displayBackType: null, ////A:终审，B：发奖,C:陈列活动参与明细,D:陈列活动参与明细2
      monthScanCode: null,
      oneMonthScanCode: "",
      // twoMonthScanCode:'',
      activityIsPass: false, //通过时true，不通过、退回时false
      activityIsShow: false, //审核中、折扣发放不显示为false
      displayMemo: "", //备注
      firstRadioUrl: "", //首次合格视频URL
      lastRadioUrl: "", //最后上传视频
      displayAtcCheckStatus: "", //审核状态
      checkMessage: "", //不通过的原因
      refuseReason: "", //手填原因
      agreeReason: "", //通过时原因
      isCheckMessage: false, //
      joinTime: "" //近期进货量更新时间
    };
  },
  components: {
    imageLook
  },
  created() {
    var displayActCategory = this.$route.query.displayActCategory;
    if (displayActCategory) {
      this.displayActCategory = displayActCategory;
    }
    var displayBackType = this.$route.query.displayBackType;

    if (displayBackType) {
      this.displayBackType = displayBackType;
    }
  },
  mounted() {
    var queryParams = this.$route.query;

    if (queryParams) {
      let { activityId, storeId, id } = queryParams;
      let params = {
        activityId,
        storeId,
        id
      };
      this.activityDetail(params);
    }
  },
  watch: {
    checkMessage(val) {
      if (val == 2) {
        this.isCheckMessage = false;
      } else {
        this.isCheckMessage = true;
      }
    },
    displayAtcCheckStatus(val) {
      if (val == 1001 || val == 2001 || val == 1) {
        this.activityIsPass = false;
        this.activityIsShow = true;
      } else if (val == 0 || val == 4) {
        //审核中，发奖
        this.activityIsShow = false;
      } else {
        this.activityIsPass = true;
        this.activityIsShow = true;
      }
    }
  },
  methods: {
    checkStatusMethod() {
      let statu = this.checkStatus;
      if (statu == 0) {
        return "未审核";
      } else if (statu == 1) {
        return "通过";
      } else if (statu == 2) {
        return "不通过";
      } else if (statu == 3) {
        return "退回";
      }
    },
    mapLation(storeLocate, locateList, firstLocate, thisLocate) {
      var map = new BMap.Map("container"); // 创建地图实例
      var point = new BMap.Point(
        Number(storeLocate[0]),
        Number(storeLocate[1])
      ); // 创建点坐标
      map.centerAndZoom(point, 15);
      //locateList 首次 本次
      if (firstLocate.length > 0) {
        var pt = new BMap.Point(Number(firstLocate[0]), Number(firstLocate[1]));
        var myIcon = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-first.jpg",
          // new BMap.Size(100, 150),
          new BMap.Size(48, 55)
        ); //首次
        var marker = new BMap.Marker(pt, { icon: myIcon }); //本次
        map.addOverlay(marker); //本次
      }
      if (thisLocate.length > 0) {
        var pt1 = new BMap.Point(Number(thisLocate[0]), Number(thisLocate[1]));
        var myIcon1 = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-this.jpg",
          // new BMap.Size(100, 150)
          new BMap.Size(48, 55)
        ); //首次
        var marker1 = new BMap.Marker(pt1, { icon: myIcon1 });
        map.addOverlay(marker1);
      }
      if (storeLocate) {
        var pt2 = new BMap.Point(
          Number(storeLocate[0]),
          Number(storeLocate[1])
        );
        var myIcon2 = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-store.jpg",
          // new BMap.Size(100, 150)
          new BMap.Size(48, 55)
        ); //本店
        var marker2 = new BMap.Marker(pt2, { icon: myIcon2 });
        map.addOverlay(marker2);
      }
      // 编写自定义函数,创建标注
      function addMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
      }

      for (var i = 0; i < locateList.length; i++) {
        var point = new BMap.Point(
          Number(locateList[i][0]),
          Number(locateList[i][1])
        );
        addMarker(point);
      }
      map.enableScrollWheelZoom(true);
    },
    activityDetail(queryParams) {
      var that = this;
      var newDate = new Date();
      if (queryParams) {
        this.Global.doPost(
          "displayYxtg/getDisplayYxtgInfo.json",
          queryParams,
          res => {
            this.fileType = res.fileType;
            this.formData = res;
            this.thisRadio = res.thisRadio; //本次
            this.firstRadio = res.firstRadio; //首次
            if (res.firstRadio) {
              let imageList = [];
              if (res.firstRadio.image) {
                imageList = res.firstRadio.image.filter(val => val);
              }
              this.firstRadio.imageList = imageList;
            }
            if (res.thisRadio) {
              this.fileType = res.thisRadio.fileType;
              let imageList = [];
              if (res.thisRadio.image) {
                imageList = res.thisRadio.image.filter(val => val);
              }
              this.thisRadio.imageList = imageList;
            }
            this.uploadCount = res.uploadCount; //总共上传次数
            this.riskCount = res.riskCount; //预警次数
            this.radioList = res.radioList; //其他视频信息集合
            if (res.radioList && res.radioList.length) {
              res.radioList.forEach(item => {
                let imageList = [];
                if (item.image) {
                  imageList = item.image.filter(val => val);
                }
                item.imageList = imageList;
              });
            }

            this.auditLogList = res.auditLogList; //日志记录

            let firstLocate = []; //首次
            if (res.firstRadio && res.firstRadio.locate) {
              firstLocate = res.firstRadio.locate.split(",").reverse();
            }
            let thisLocate = []; //本次
            if (res.thisRadio && res.thisRadio.locate) {
              thisLocate = res.thisRadio.locate.split(",").reverse();
            }
            let locateList = []; //其他
            if (res.locateList) {
              for (let i = 0; i < res.locateList.length; i++) {
                locateList.push(res.locateList[i].split(",").reverse());
              }
            }

            if (res.radioList && res.radioList.length) {
              for (const key in res.radioList) {
                if (res.radioList[key].locate) {
                  locateList.push(
                    res.radioList[key].locate.split(",").reverse()
                  );
                }
              }
            }
            let storeLocate = [];
            if (res.storeLocate) {
              storeLocate = res.storeLocate.split(",").reverse();
            }
            this.mapLation(storeLocate, locateList, firstLocate, thisLocate);
            if (res.summary) {
              let summary = JSON.parse(res.summary);
            }
            if (that.displayActCategory == "TwoLevel") {
              //二审
              switch (res.checkStatus) {
                case 1001:
                  //状态为1、1001、2001为通过，意见用this.agreeReason字段
                  that.displayAtcCheckStatus = 2001;
                  that.agreeReason = res.checkMessage;
                  break;
                case 1002:
                  that.displayAtcCheckStatus = 2;
                  noPassReason(res, that);
                  break;
                case 1003:
                  that.displayAtcCheckStatus = 3;
                  noPassReason(res, that);
                  break;
              }
            } else if (that.displayActCategory == "ThreeLevel") {
              switch (res.checkStatus) {
                case 2001:
                  that.displayAtcCheckStatus = 1;
                  that.agreeReason = res.checkMessage;
                  break;
                case 2:
                  that.displayAtcCheckStatus = 2;
                  noPassReason(res, that);
                  break;
                case 3:
                  that.displayAtcCheckStatus = 3;
                  noPassReason(res, that);
                case 4:
                  this.activityIsShow = false;
                  break;
              }
            } else if (that.displayActCategory == "partake") {
              switch (res.checkStatus) {
                case 1001:
                case 1002:
                case 1003:
                case 2001:
                  that.displayAtcCheckStatus = 0;
                  break;

                case 1:
                  that.displayAtcCheckStatus = 1;
                  that.agreeReason = res.checkMessage;
                  break;

                case 2:
                  that.displayAtcCheckStatus = 2;
                  noPassReason(res, that);
                  break;

                case 3:
                  that.displayAtcCheckStatus = 3;
                  noPassReason(res, that);
                  break;

                default:
                  that.displayAtcCheckStatus = res.checkStatus;
                  break;
              }
            }
          }
        );
      }
    },
    getPosition(index) {
      if (!index) return "right";
      if (index % 2 == 0) return "right";
      return "left";
    },
    handleOnelevelBack() {
      //一审返回
      this.$router.push({ path: "/displayResultOne" });
    },
    handleOnelevelNewBack() {
      //一审新页面返回
      this.$router.push({ path: "/displayOneLevelAudit" });
    },
    handleTwolevelBack() {
      //二审返回
      this.$router.push({ path: "/displayResultTwo" });
    },
    handleTwolevelNewBack() {
      //二审新页面返回
      this.$router.push({ path: "/displayTwoLevelAudit" });
    },
    //交叉审核
    handleSingleOne() {
      //一审新页面返回
      this.$router.push({ path: "/firstInstanceDisplaySingle" });
    },
    handleSingleTwo() {
      //复审新页面返回
      this.$router.push({ path: "/auditReviewSingle" });
    },
    handleDoubleOne() {
      //双端上传一审新页面返回
      this.$router.push({ path: "/firstInstanceDisplayDouble" });
    },
    handleDoubleTwo() {
      //双端上传复审新页面返回
      this.$router.push({ path: "/auditReviewDouble" });
    },
    handlerisk() {
      //陈列风险记录
      this.$router.push({ path: "/displayRiskRecord" });
    },

    handleUpload() {
      //陈列风险记录
      this.$router.push({ path: "/displayPartakeDetail" });
    },
    handleUploads() {
      //陈列风险记录
      this.$router.push({ path: "/displayActivityUploadMonitor" });
    },
    handleThreelevelBack() {
      if (this.displayBackType == "A") {
        this.$router.push({ path: "/displayActivityConfirm" });
      } else if (this.displayBackType == "B") {
        this.$router.push({ path: "/displayAwardGiveout" });
      }
    },
    handlePartakeBack() {
      if (this.displayBackType == "C") {
        this.$router.push({ path: "/displayPartakeDetail" });
      } else if (this.displayBackType == "D") {
        this.$router.push({ path: "/displayPartakeDetail2" });
      } else if (this.displayBackType == "E") {
        this.$router.push({ path: "/displayPartakeDetail3" });
      }
    },
    handlePartakeBackXiaMen() {
      this.$router.push({ path: "/displayActivityUploadMonitorXiaMen" });
    },
    handlePartakeBackJiMei() {
      this.$router.push({ path: "/displayActivityUploadMonitorJiMei" });
    },
    handlePartakeBackTongAn() {
      this.$router.push({ path: "/displayActivityUploadMonitorTongAn" });
    },
    handleLookMore() {
      this.isShowMore = !this.isShowMore;
    }
  },
  filters: {
    warningStatuFilter(val) {
      let va = Number(val);
      if (va == 100) {
        return "正常";
      } else {
        return "无";
      }
    },
    statusFilter(val) {
      let statu = Number(val);
      if (statu == 0) {
        return "未审核";
      } else if (statu == 1 || statu == 1001 || statu == 2001) {
        return "通过";
      } else if (statu == 2 || statu == 1002) {
        return "不通过";
      } else if (statu == 3 || statu == 1003) {
        return "退回";
      } else if (statu == -1) {
        return "未上传";
      }
    },
    phoneFormat(val) {
      var reg = /^(\d{3})(\d{4})(\d{4})$/;
      var matches = reg.exec(val);
      if (matches) {
        return `${matches[1]}-${matches[2]}-${matches[3]}`;
      } else {
        return val;
      }
    },
    formatYearMonth(time) {
      /**
       * @desc 格式化时间
       * @param {String} 时间戳
       * @return {String} 11月11日
       */
      return new Date(Number(time)).pattern("yyyy-MM-dd");
    },
    riskTypeFilter(val) {
      let str = "";
      if (val == "M") {
        str = "自动";
      } else if (val == "H") {
        str = "人工";
      }
      return str;
    },
    riskStatusFilter(val) {
      let str = "";
      if (val == "0") {
        str = "正常";
      } else if (val == "1") {
        str = "预警";
      }
      return str;
    },
    riskSourceFilter(val) {
      let str = "";
      if (val == "V") {
        str = "视频异常";
      } else if (val == "H") {
        str = "人工";
      } else if (val == "M") {
        str = "自动";
      }
      return str;
    }
  }
};
</script>


