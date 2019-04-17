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
      border: 2px solid #666;
      height: 597px;
      margin-bottom: 10px;
      .card-top {
        height: 530px;
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
        .card-left,
        .card-right {
          box-sizing: border-box;
          padding-left: 20px;
          width: 50%;
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
            font-size: 12px;
            .item-box {
              line-height: 36px;
              //   padding-left: 10px;
              p {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
              .status {
                width: 110px;
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
      .card-bottom {
        box-sizing: border-box;
        border-top: 1px solid #666;
        .card-bottom-container {
          height: 67px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          span {
            width: 80px;
            font-size: 12px;
          }
          .btn {
            line-height: 32px;
            background: @primary-color;
            border-radius: 20px;
            color: white;
            cursor: pointer;
            text-align: center;
          }
        }
      }
    }
  }
}
//店铺商品详情
#storeGoodsInfor {
  margin-top: 15px;
  overflow: hidden;
  .storeGoods {
    // position: relative;
    box-sizing: border-box;
    float: left;
    width: 47%;
    width: calc(~"(100% - 30px)/2");
    margin-left: 10px;
    margin-bottom: 10px;
    .goodsOperator {
      overflow: hidden;
      margin-top: 2px;
      margin-bottom: 2px;
      .operator-l {
        float: left;
        .colorPrimary {
          color: @primary-color;
        }
        .colorSuccess {
          color: #19be6b;
        }
        .colorError {
          color: #ed3f14;
        }
        .colorBack {
          color: #80848f;
        }
        button {
          padding: 3px 10px;
        }
        label {
          height: 30px;
          line-height: 30px;
        }
        span {
          display: inline-block;
        }
      }
      .operator-r {
        float: right;
        button {
          padding: 3px 10px;
        }
      }
    }
    .goodsDetail {
      overflow: hidden;
      .showVideoPlay {
        height: 200px;
        margin-bottom: 10px;
        width: 100%;
        video {
          width: 100%;
          height: 100%;
          position: relative;
          z-index: 100;
        }
        .ivu-btn {
          padding: 3px 15px;
        }
        .mask {
          position: absolute;
          z-index: 1;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          opacity: 0;
          background: rgba(0, 0, 0, 0.3);
          transition: opacity 0.5s;
          color: #fff;
          text-align: center;
          &:hover {
            opacity: 1;
          }
          .maskTxt {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            margin: auto;
            width: 60px;
            height: 40px;
          }
        }
      }
      .goodsInfor {
        width: 100%;
        p {
          line-height: 32px;
          font-size: 12px;
          // height: 20px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
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
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
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
</style>

<template>
	<div id="Main" @click="closeAlertBox">
		<!-- <h2 class="Title" v-if="displayExamineType == 'A'">陈列二级审核</h2> -->
        <div class="main-container">
            <div class="box">
                <Form ref="form" :model="formData" :label-width="10">
                    <div class="container">
                            
                        <div class="btn-left w18">
                            <Form-item  prop="queryStartTime" required>
                                <data-range @dataChange="startTimeChange" placeholder="申请开始时间" hour="00:00" :time="formData.queryStartTime" start></data-range>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item  prop="queryEndTime" required>
                                <data-range hour="24:00" placeholder="申请结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                            </Form-item>
                        </div>
                        <div class="btn-left w18">
                            <Form-item required prop="brandId">
                                <Select v-model="formData.brandId" placeholder="品牌名称"  @on-change="changeValue">
                                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                                </Select>
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
                                <Select v-model="formData.activityId" placeholder="子活动名称" @on-change="getpresentList" clearable>
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
                                <Form-item prop="activityId">
                                    <Select v-model="formData.presentId" placeholder="子活动分组" clearable>
                                        <Option :value="item.id" v-for="(item,index) in presentNameList" :key="index">{{ item.activityTag }}</Option>
                                    </Select>
                                </Form-item>
                            </div>
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
                            <div class="btn-left w18">
                                <Form-item prop="activityId">
                                    <Select v-model="formData.warning" placeholder="是否预警" clearable>
                                        <Option value="1" >是</Option>
                                        <Option value="0" >否</Option>
                                    </Select>
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
            <div class="box" style="width:100%;padding:40px 10px 10px;" v-if="storeGoodsList && storeGoodsList.length">
              <CheckboxGroup size="large" v-model="social">
                <div class="card" v-for="(item,index) in storeGoodsList" :key="index">
                    <div class="card-top">
                    <div class="card-left">
                        
                        <template v-if="item.store && item.store.checkStatus != -1" >
                            <div class="check-box">
                                <Checkbox v-if="item.store.checkStatus != 0 && item.store.checkStatus != 2001 && item.store.checkStatus != 2 && item.store.checkStatus != 3" size="large" :label="index + '-store'">
                                    <span style="display:none;"></span>
                                </Checkbox>
                            </div>
                            <div class="video-box">
                                <div class="video">
                                    <div class="video-main">
                                        <video :src="item.store.firstRadio.radioUrl" v-if="item.store.firstRadio" controls></video>
                                        <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                        <img class="triangle" src="../../assets/image/triangle-first.jpg">
                                    </div>
                                    
                                </div>
                                <div class="video">
                                    <div class="video-main">
                                        <video :src="item.store.radioUrl" v-if="item.store.radioUrl" controls></video>
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
                                            <span>{{ item.store.uploadTime  | formatYearMonth}}</span>
                                        </p>
                                        
                                    </div>
                                    <div class="item-box">
                                        <p :title="item.store.presentName">
                                            <span>活动分组：</span>
                                            <span>{{ item.store.presentName }}</span>
                                        </p>
                                    </div>
                                    <div class="item-box">
                                        <p :title="item.store.workerName">
                                            <span>业代姓名：</span>
                                            <span>{{ item.store.workerName }}</span>
                                        </p>
                                    </div>
                                    <div class="item-box">
                                        <span>预审状态：</span>
                                        <span :class="item.store.checkStatus == 1001 || item.store.checkStatus == 2001 || item.store.checkStatus == 1? 'successColor' : item.store.checkStatus == 1002 || item.store.checkStatus == 2 ? 'primaryColor' : item.store.checkStatus == 1003 || item.store.checkStatus == 3 ? 'warnColor' :''">{{ item.store.checkStatus | checkStatusFilter }}</span>
                                    </div>
                                    </Col>
                                    <Col span="8">
                                    <div class="item-box">
                                        <p :title="getWeek(item.store.startTime,item.store.endTime)">
                                          <span>上传周期：</span>
                                          <span>{{ getWeek(item.store.startTime,item.store.endTime) }}</span>
                                        </p>
                                    </div>
                                    <div class="item-box">
                                        <span>客户编号：</span>
                                        <span>{{ item.store.joinCode }}</span>
                                    </div>
                                    <div class="item-box">
                                        <span>销售路线：</span>
                                        <span>{{ item.store.salesRoute }}</span>
                                    </div>
                                    <div class="item-box">
                                        <span>拍摄人员：</span>
                                        <span>{{ item.store.uploadChannel | storeOrWorker}}</span>
                                    </div>
                                    </Col>
                                    <Col span="8">
                                    <div class="item-box">
                                        <span>活动名称：</span>
                                        <span>{{ item.store.activityName }}</span>
                                    </div>
                                    <div class="item-box">
                                        <span>门店名称：</span>
                                        <span>{{ item.store.storeName }}</span>
                                    </div>
                                    <div class="item-box">
                                        <p :title="item.store.locate">
                                            <span>预警编码：</span>
                                            <span :class="item.store.locate ? 'warnColor' : ''">{{ item.store.locate ? item.store.locate : "无"}}</span>
                                        </p>
                                    </div>
                                    </Col>
                                    <Col span="23">
                                    <div class="item-box">
                                        <span class="status">修改审核状态：</span>
                                        <RadioGroup v-model="item['store'].status" @on-change="radioChange"> 
                                            <Radio :disabled="item.store.checkStatus == 0 || item.store.checkStatus == 2001 || item.store.checkStatus == 2 || item.store.checkStatus == 3 || item.store.checkStatus == 1" :label="index + '-store-2001'">通过</Radio>
                                            <Radio :disabled="item.store.checkStatus == 0 || item.store.checkStatus == 2001 || item.store.checkStatus == 2 || item.store.checkStatus == 3 || item.store.checkStatus == 1" :label="index + '-store-2'">不通过</Radio>
                                            <Radio :disabled="item.store.checkStatus == 0 || item.store.checkStatus == 2001 || item.store.checkStatus == 2 || item.store.checkStatus == 3 || item.store.checkStatus == 1" :label="index + '-store-3'">退回</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div class="item-box">
                                        <span class="status">修改审核意见：</span>
                                        <Input :disabled="item.store.checkStatus == 0 || item.store.checkStatus == 2001 || item.store.checkStatus == 2 || item.store.checkStatus == 3 || item.store.checkStatus == 1" v-model.trim="item['store'].checkMessage" placeholder="审核意见"></Input>
                                    </div>
                                    <div class="item-box">
                                        <span class="status">修改内部备注：</span>
                                        <Input :disabled="item.store.checkStatus == 0 || item.store.checkStatus == 2001 || item.store.checkStatus == 2 || item.store.checkStatus == 3 || item.store.checkStatus == 1" v-model.trim="item['store'].memo" placeholder="内部备注"></Input>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                            <div class="btn-box">
                                <Button class="lookDetail" @click="handleLookDetail(item,'store')" style="margin-right:10px;">查看详情</Button>
                                <Button v-if="item.store.checkStatus != 0 && item.store.checkStatus != 2001 && item.store.checkStatus != 2 && item.store.checkStatus != 3 && item.store.checkStatus != 1" type="primary" @click="save(item,index,'store')">保存</Button>
                            </div>
                        </template>
                        <div class="no-upload" v-else>
                            <img src="../../assets/image/no-video.jpg" alt="暂未上传视频">
                            <p>暂未上传视频</p>
                        </div>
                    </div>
                    <div class="card-right">
                        
                        <template v-if="item.worker && item.worker.checkStatus != -1" >
                            <div class="check-box">
                                <Checkbox v-if="item.worker.checkStatus != 0 && item.worker.checkStatus != 2001 && item.worker.checkStatus != 2 && item.worker.checkStatus != 3" size="large" :label="index + '-worker'">
                                    <span style="display:none;"></span>
                                </Checkbox>
                            </div>
                            <div class="video-box">
                            <div class="video">
                              <div class="video-main">
                                <video :src="item.worker.firstRadio.radioUrl" v-if="item.worker.firstRadio" controls></video>
                                <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                <img class="triangle" src="../../assets/image/triangle-first.jpg">
                              </div>
                                
                            </div>
                            <div class="video">
                              <div class="video-main">
                                <video :src="item.worker.radioUrl" v-if="item.worker.radioUrl" controls></video>
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
                                            <span>{{ item.worker.uploadTime  | formatYearMonth}}</span>
                                        </p>
                                        
                                    </div>
                                    <div class="item-box">
                                        <p :title="item.worker.presentName">
                                            <span>活动分组：</span>
                                            <span>{{ item.worker.presentName }}</span>
                                        </p>
                                    </div>
                                    <div class="item-box">
                                        <p :title="item.worker.workerName">
                                            <span>业代姓名：</span>
                                            <span>{{ item.worker.workerName }}</span>
                                        </p>
                                    </div>
                                    <div class="item-box">
                                        <span>预审状态：</span>
                                        <span :class="item.worker.checkStatus == 1001 || item.worker.checkStatus == 2001 || item.worker.checkStatus == 1? 'successColor' : item.worker.checkStatus == 1002 || item.worker.checkStatus == 2 ? 'primaryColor' : item.worker.checkStatus == 1003 || item.worker.checkStatus == 3 ? 'warnColor' :''">{{ item.worker.checkStatus | checkStatusFilter }}</span>
                                        
                                    </div>
                                    </Col>
                                    <Col span="8">
                                    <div class="item-box">
                                        <p :title="getWeek(item.worker.startTime,item.worker.endTime)">
                                          <span>上传周期：</span>
                                          <span>{{ getWeek(item.worker.startTime,item.worker.endTime) }}</span>
                                        </p>
                                    </div>
                                    <div class="item-box">
                                        <span>客户编号：</span>
                                        <span>{{ item.worker.joinCode }}</span>
                                    </div>
                                    <div class="item-box">
                                        <span>销售路线：</span>
                                        <span>{{ item.worker.salesRoute }}</span>
                                    </div>
                                    <div class="item-box">
                                        <span>拍摄人员：</span>
                                        <span>{{ item.worker.uploadChannel | storeOrWorker}}</span>
                                        <!-- M--门店  W--业务员 -->
                                    </div>
                                    </Col>
                                    <Col span="8">
                                    <div class="item-box">
                                        <span>活动名称：</span>
                                        <span>{{ item.worker.activityName }}</span>
                                    </div>
                                    <div class="item-box">
                                        <span>门店名称：</span>
                                        <span>{{ item.worker.storeName }}</span>
                                    </div>
                                    <div class="item-box">
                                        <p :title="item.worker.locate">
                                            <span>预警编码：</span>
                                            <span :class="item.worker.locate ? 'warnColor' : ''">{{ item.worker.locate ? item.worker.locate : "无" }}</span>
                                        </p>
                                    </div>
                                    </Col>
                                    <Col span="23">
                                    <div class="item-box">
                                        <span class="status">修改审核状态：</span>
                                        <RadioGroup v-model="item['worker'].status" @on-change="radioChange"> 
                                            <Radio :disabled="item.worker.checkStatus == 0 || item.worker.checkStatus == 2001 || item.worker.checkStatus == 2 || item.worker.checkStatus == 3 || item.worker.checkStatus == 1" :label="index + '-worker-2001'">通过</Radio>
                                            <Radio :disabled="item.worker.checkStatus == 0 || item.worker.checkStatus == 2001 || item.worker.checkStatus == 2 || item.worker.checkStatus == 3 || item.worker.checkStatus == 1" :label="index + '-worker-2'">不通过</Radio>
                                            <Radio :disabled="item.worker.checkStatus == 0 || item.worker.checkStatus == 2001 || item.worker.checkStatus == 2 || item.worker.checkStatus == 3 || item.worker.checkStatus == 1" :label="index + '-worker-3'">退回</Radio>
                                        </RadioGroup>
                                    </div>
                                    <div class="item-box">
                                        <span class="status">修改审核意见：</span>
                                        <Input :disabled="item.worker.checkStatus == 0 || item.worker.checkStatus == 2001 || item.worker.checkStatus == 2 || item.worker.checkStatus == 3 || item.worker.checkStatus == 1" v-model.trim="item['worker'].checkMessage" placeholder="审核意见"></Input>
                                    </div>
                                    <div class="item-box">
                                        <span class="status">修改内部备注：</span>
                                        <Input :disabled="item.worker.checkStatus == 0 || item.worker.checkStatus == 2001 || item.worker.checkStatus == 2 || item.worker.checkStatus == 3 || item.worker.checkStatus == 1" v-model.trim="item['worker'].memo" placeholder="内部备注"></Input>
                                    </div>
                                    </Col>
                                </Row>
                            </div>
                            <div class="btn-box">
                                <Button class="lookDetail" @click="handleLookDetail(item,'worker')" style="margin-right:10px;">查看详情</Button>
                                <Button v-if="item.worker.checkStatus != 0 && item.worker.checkStatus != 2001 && item.worker.checkStatus != 2 && item.worker.checkStatus != 3 && item.worker.checkStatus != 1" type="primary" @click="save(item,index,'worker')">保存</Button>
                            </div>
                        </template>
                        <div class="no-upload" v-else>
                            <img src="../../assets/image/no-video.jpg" alt="暂未上传视频">
                            <p>暂未上传视频</p>
                        </div>
                    </div>
                    </div>
                    <div class="card-bottom">
                      <Row>
                          <Col span="8" offset="1">
                            <div class="card-bottom-container">
                                <span>风险类型：</span>
                                <Select v-model="item.riskType" placeholder="风险类型">
                                <Option value="no">无</Option>
                                <Option value="V">视频异常</Option>
                                </Select>
                            </div>
                          </Col>
                          <Col span="8" offset="1">
                            <div class="card-bottom-container">
                                <span>风险描述:</span>
                                <Input v-model.trim="item.riskDes" placeholder="风险描述"></Input>
                            </div>
                          </Col>
                          <Col span="3" offset="1">
                            <div class="card-bottom-container">
                                <span class="btn" @click="saveWarning(item,index)">保存</span>
                            </div>
                          </Col>
                      </Row>
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
		<Modal v-model="goodsStausShow" width="600" id="goodsStausShow" style="position:relative;z-index:1000000;">
			<p slot="header" style="color:#f60;text-align:center">
				<span>{{formItem.storeName}}</span>
			</p>
			<div>
				<Form :model="formItem" :label-width="60">
					<FormItem label="状态:">
						<RadioGroup v-model="formItem.checkStatus" @on-change="handleIsPass">
							<Radio label="2001">通过</Radio>
							<Radio label="2">不通过</Radio>
							<Radio label="3">退回</Radio>
						</RadioGroup>
					</FormItem>
          
					<div id="examine-right" v-show="!activityIsPass">
						<span style="color:#ff8a34">可输入原因,并反馈给门店</span>
						<Input v-model.trim="checkMessage" style="width:220px" placeholder="请输入原因"></Input>
					</div>
					<div id="examine-right" v-show="activityIsPass">
						<span style="color:#ff8a34">输入不通过的原因,并反馈给门店，要求重新提交</span>
            <FormItem label="审核意见:" :label-width="70">
            <Input @on-change="wordFilter"></Input>
            </FormItem>
            <RadioGroup v-model="checkMessage" vertical class="radio">
                <!-- <Radio v-for="(val,i) in getDisplayExamineWord(saveData.brandId,saveData.activityId)" :key="i" :label="val.word">{{val.word}}</Radio> -->
                <Radio v-if="i < 10" v-for="(val,i) in displayExamineWordList" :key="i" :label="val.word">{{val.word}}</Radio>        
                <Radio label="2">其他
                    <Input v-model="refuseReason" placeholder="请输入原因"></Input>
                </Radio>
            </RadioGroup>
					</div>
					<FormItem label="备注" style="margin-right: 30px;">
						<Input v-model="formItem.memo" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="请输入备注"></Input>
					</FormItem>
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
import {
  queryActivityGroupVOByBrandId, //根据品牌ID获取活动包名
  queryActivityVOByGroupId //根据活动包名ID获取陈列活动列表
} from "@/api/common.js";
import area from "@/config/china_code_data.js";
import dataRange from "@/components/data-rang.vue";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_TOMORROW
} from "@/util/index.js"; //搜索条件默认时间
import { displayExamineWord } from "@/util/displayExamineWord.js"; //审核话术
import qs from "qs";
import { displayCheckStatus } from "@/util/ENUMS.js";
import { getDisplayActivityListDoQuery } from "@/api/common.js";
import {
  queryYxtgFirstAudit, //一审查询
  queryYxtgSecondAudit, //二审查询
} from "@/api/activity-manage/display-apply-examine.js";
export default {
  name: "display-two-level-audit-keepAlive",
  components: {
    dataRange
  },
  data() {
    return {
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
      checkStatusList: [],
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
        checkMessage: "",
        areaName: "", //活动区域
        areaCode: [], //区域代码
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME]
      },
      areaData: area,
      brandList: [],
      activityList: [],
      social: [],
      storeGoodsList: null,
      goodsStausShow: false,
      formItem: {
        storeName: "",
        checkStatus: "",
        memo: ""
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
      pageSize: 5,
      pageNum: 0,
      displayExamineType: "A",
      examineB: "",
      checkObj: [],
      wordList: []
    };
  },
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
    goodsStausShow(val) {
      //模态框关闭，清空
      if (val == false) {
        this.refuseReason = "";
        this.agreeReason = "";
        this.checkMessage = "";
      }
    }
  },
  beforeRouteEnter(to, from, next) {
    //陈列一审
    next(vm => {
      vm.displayExamineType = "A";
      // vm.storeGoodsList = null;
      vm.checkStatus = {
        success: "1001",
        fail: "1002",
        back: "1003"
      };
      vm.page = 1;
      vm.pageNum = 0;
      vm.examineB = "审核";
    });
  },
  methods: {
    getWeek(start,end){
      return `${this.formatTime(start)}至${this.formatTime(end)}`
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
    saveWarning(item, index) {
      if (item.riskType == "no") {
        this.$Message.info("请选择风险类型");
        return false;
      }
      let data = {};
      if (item.riskType == "V") {
        data["riskType"] = "V";
        if (!item.riskDes) {
          this.$Message.error("请填写风险描述！");
          return false;
        }
        data["riskDes"] = item.riskDes;
      }
      let val = item.store ? item.store : item.worker;

      let { storeId, period, activityId } = val;
      data["storeId"] = storeId;
      data["period"] = period;
      data["activityId"] = activityId;
      data["riskSource"] = "H";
      console.log(data);
      this.Global.doPost("displayYxtg/addVideoRisk.json", data, res => {
        this.$Message.success("保存成功");
      });
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
      this.formItem.checkStatus = arr[2];
      this.index = arr[0];
      this.flag = arr[1];
      this.saveData.brandId = this.storeGoodsList[arr[0]][arr[1]].brandId;
      this.saveData.activityId = this.storeGoodsList[arr[0]][arr[1]].activityId;

      this.displayExamineWordList = [];
      this.displayExamineWordList = this.getDisplayExamineWord(
        this.saveData.brandId,
        this.saveData.activityId
      );
      if (arr[2] != 2001) {
        this.goodsStausShow = true;
        this.activityIsPass = true;
      }
    },
    beforePage() {
      this.currentPage--;
      if (this.currentPage <= 1) {
        this.currentPage = 1;
        this.init(this.currentPage, 10);
      }
    },
    nextPage() {
      this.currentPage++;
      this.init(this.currentPage, 10);
    },
    refleshItem(val, index) {
      this.Global.doPost("displayYxtg/getSkuCheckResult.json", val.id, res => {
        if (res) {
          this.storeGoodsList[index].skuScoreVO.skuNum = res.skuNum;
          this.storeGoodsList[index].score = res.score;
          this.storeGoodsList[index].skuScoreVO.total = res.total;
          this.storeGoodsList[index].skuScoreVO.skuStatus = res.skuStatus;

          this.storeGoodsList[index].skuScoreVO.scoreStatus = res.scoreStatus;

          // qualifiedScore
          let qualifiedScore = this.storeGoodsList[index].qualifiedScore;
          if (res.scoreStatus == 1) {
            qualifiedScore.push("bibei");
          }
          if (res.skuStatus == 1) {
            qualifiedScore.push("total");
          }
          this.storeGoodsList[index].qualifiedScore = this.uniquArr(
            qualifiedScore
          );
        }
      });
    },
    uniquArr(arr) {
      let newArr = [];
      let obj = {};
      for (let i = 0; i < arr.length; i++) {
        if (!obj[arr[i]]) {
          obj[arr[i]] = "abc";
          newArr.push(arr[i]);
        }
      }
      return newArr;
    },
    getDisplayExamineWord(brandId, activityId, filter) {
      let str = `b${brandId}g${this.formData.groupId}`;
      let str1 = `b${brandId}a${activityId}`;
      let arr = [];
      if (displayExamineWord[str1]) {
        arr = displayExamineWord[str1];
      } else if (displayExamineWord[str]) {
        arr = displayExamineWord[str];
      } else {
        arr = displayExamineWord["defaultWord"];
      }
      //   return arr.filter(item => {
      //     return item.name.indexOf(filter) != -1
      //   })
      this.wordList = arr;
      return arr;
    },
    closeAlertBox(e) {
      if (
        e.target.className == "extraBox" ||
        e.target.className == "alertBox"
      ) {
        return false;
      } else {
        for (let i = 0; i < this.ruleBox.length; i++) {
          this.ruleBox[i].ruleBoxIsShow = false;
        }
        this.ruleBoxData = [];
      }
    },
    ruleBoxShow(v, i, e) {
      // console.log(v)
      e.stopPropagation();
      if (this.ruleBox[i].ruleBoxIsShow == false) {
        this.ruleBoxData = [];
        this.ruleBox[i].ruleBoxIsShow = true;
      } else {
        this.ruleBox[i].ruleBoxIsShow = false;
        this.ruleBoxData = [];
        return;
      }
      for (let n = 0; n < this.ruleBox.length; n++) {
        if (i == n) {
          continue;
        }
        this.ruleBox[n].ruleBoxIsShow = false;
      }
      let data = {
        brandId: v.brandId,
        joinCode: v.joinCode,
        // activityCode: v.activityCode,
        activityId: v.activityId,
        presentCode: v.presentCode
      };
      data = this.Global.JsonChange(data);
      this.Global.deleteEmptyProperty(data);
      if (data) {
        this.Global.doPost(
          "displayYxtg/getBrandActivityPresentLoadInfo.json",
          data,
          res => {
            if (res.content) {
              let arr = res.content.split("|");
              let address = arr.pop();
              let title1 = arr.shift();
              let body1 = arr;
              this.ruleBoxData.push({
                title: title1,
                body: arr
              });
              this.ruleBoxData.push(address);
            }
          }
        );
      }
    },
    //状态过滤
    wordFilter(e) {
      let val = e.target.value;
      if (!val) {
        this.displayExamineWordList = JSON.parse(JSON.stringify(this.wordList));
        return false;
      }
      this.displayExamineWordList = this.wordList.filter(item => {
        return item.word.indexOf(val) != -1;
      });
    },
    aiStatusChange(val) {
      if (val == 1002 || val == 1003 || val == 2 || val == 3) {
        this.goodsStausShow = true;
      }
    },
    save(item, index, flag) {
      let statusC = item[flag].status;
      if (!statusC) {
        this.$Message.error("请选择审核意见");
        return false;
      }
      statusC = statusC.split("-")[2];
      if (statusC == 2 || statusC == 3) {
        if (!item[flag].checkMessage) {
          this.$Message.error("请输入审核意见");
          return false;
        }
      }
      var params = {
        id: item[flag].id,
        brandId: item[flag].brandId,
        activityId: item[flag].activityId,
        storeId: item[flag].storeId,
        memo: item[flag].memo,
        checkMessage: item[flag].checkMessage,
        checkStatus: statusC
      };

      params = this.Global.JsonChange(params);
      this.Global.deleteEmptyProperty(params);
      if(params['checkStatus'] == 2001 ){
        delete params['checkMessage']
      }
      this.Global.doPost("displayYxtg/displaySecondAudit.json", params, res => {
        this.checkStatusList = [];
        this.init();
        this.saveData = {};
        this.goodsStausShow = false;
        this.$Message.success("保存成功");
        this.formItem.checkStatus = "";
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
      delete data["queryTime"];
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      data["brandId"] = this.formData.brandId;
      data["level"] = 2;
      this.Global.doPost(
        "displayYxtg/queryDisplayRecordDubbo.json",
        data,
        res => {
          this.storeGoodsList = res.datalist;
          this.pageNum = res.items;
          this.currentPage = res.page;
          for (let i = 0, len = res.datalist.length; i < len; i++) {
            let val = res.datalist[i].store ? res.datalist[i].store : res.datalist[i].worker;
            res.datalist[i].riskType = val.riskType ? val.riskType : 'no';
            res.datalist[i].riskDes = val.riskDes;
            if (res.datalist[i].store) {
              let storeStatus = this.getStatus(
                res.datalist[i].store.checkStatus
              );
              res.datalist[i].store.status = `${i}-store-${storeStatus}`;
            }
            if (res.datalist[i].worker) {
              let workerStatus = this.getStatus(
                res.datalist[i].worker.checkStatus
              );
              res.datalist[i].worker.status = `${i}-worker-${workerStatus}`;
            }
          }

          console.log(this.storeGoodsList);
        }
      );
    },
    getStatus(val) {
      if (val == 1001 || val == 2001 || val == 1) {
        return 2001;
      } else if (val == 1002 || val == 2) {
        return 2;
      } else if (val == 1003 || val == 3) {
        return 3;
      } else {
        return "";
      }
    },
    handleLookDetail(val, flag) {
      let { id, activityId, storeId } = val[flag];
      let queryParams = {
        id,
        activityId,
        storeId
      };
      queryParams = this.Global.JsonChange(queryParams);
      queryParams["displayActCategory"] = "TwoLevelNew";
      this.Global.deleteEmptyProperty(queryParams);
      this.$router.push({
        path: "/displayResultTwoEdit",
        query: queryParams
      });
      // return
      // window.open(
      //   location.origin +
      //     location.pathname +
      //     "#" +
      //     "/displayResultOneEdit?" +
      //     qs.stringify(queryParams)
      // );
    },
    skuClick(val) {
      let { id } = val;
      let queryParams = {
        id,
        brandId: this.formData.brandId
      };
      queryParams = this.Global.JsonChange(queryParams);
      this.Global.deleteEmptyProperty(queryParams);

      window.open(
        location.origin +
          location.pathname +
          "#" +
          "/examineSKU?" +
          qs.stringify(queryParams)
      );
    },
    handleSaveEidtGooodsStatu() {
      let objList = this.saveData;
      if (!this.formItem.checkStatus) {
        this.$Message.warning("请选择审核意见");
        return false;
      }

      if (this.displayExamineType == "A") {
        if (this.formItem.checkStatus != "1001" && !this.checkMessage) {
          this.$Message.warning("请选择不通过的原因");
          return false;
        }
      } else if (this.displayExamineType == "B") {
        if (this.formItem.checkStatus != "2001" && !this.checkMessage) {
          this.$Message.warning("请选择不通过的原因");
          return false;
        }
      }
      if (
        this.formItem.checkStatus == "1002" ||
        this.formItem.checkStatus == "1003" ||
        this.formItem.checkStatus == "2" ||
        this.formItem.checkStatus == "3"
      ) {
        //不通过、退回
        objList["checkMessage"] = this.checkMessage;
        if (this.checkMessage == 2) {
          if (!this.refuseReason) {
            this.$Message.warning("请填写其他原因");
            return;
          }
          objList["checkMessage"] = this.refuseReason;
        }
      } else {
        //通过
        objList["checkMessage"] = this.agreeReason;
      }
      objList["checkStatus"] = this.changeCheckStatus(
        this.formItem.checkStatus
      );
      this.storeGoodsList[this.index][this.flag].checkMessage =
        objList["checkMessage"];
      this.storeGoodsList[this.index][this.flag].status = `${this.index}-${
        this.flag
      }-${this.formItem.checkStatus}`;
      this.storeGoodsList[this.index][this.flag].memo = this.formItem.memo;

      this.goodsStausShow = false;
      this.formItem = {};
    },
    changeCheckStatus(val) {
      if (this.displayExamineType == "B") {
        if (val == 1001) {
          val = 2001;
        } else if (val == 1002) {
          val = 2;
        } else if (val == 1003) {
          val = 3;
        }
        return val;
      }
      return val;
    },
    handleCloseModal() {
      this.goodsStausShow = false;
      this.formItem = {};
    },
    handleIsPass(val) {
      this.activityIsPass = val == "2001" || val == "1001" ? false : true;
    },

    handleAllSurePage() {
      //单页面全选
      this.social = [];
      for (let i = 0; i < this.storeGoodsList.length; i++) {
        if (this.storeGoodsList.store) {
          this.social.push(`${i}-store`);
        }
        if (this.storeGoodsList.worker) {
          this.social.push(`${i}-worker`);
        }
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
        let arr = this.social[i].split("-");
        let statusC = this.storeGoodsList[arr[0]][arr[1]].status;
        if (!statusC) {
          this.$Message.error("请选择审核意见");
          return false;
        }
        statusC = statusC.split("-")[2];
        if (statusC == 2 || statusC == 3) {
          if (!this.storeGoodsList[arr[0]][arr[1]].checkMessage) {
            this.$Message.error("请输入审核意见");
            return false;
          }
        }
        let obj = {
          id: this.storeGoodsList[arr[0]][arr[1]].id,
          brandId: this.storeGoodsList[arr[0]][arr[1]].brandId,
          activityId: this.storeGoodsList[arr[0]][arr[1]].activityId,
          storeId: this.storeGoodsList[arr[0]][arr[1]].storeId,
          memo: this.storeGoodsList[arr[0]][arr[1]].memo,
          checkMessage: this.storeGoodsList[arr[0]][arr[1]].checkMessage,
          checkStatus: statusC
        };
        dataList.push(obj);
      }
      this.Global.doPost("displayYxtg/checkTwo.json", dataList, res => {
        this.$Message.success("批量审核成功");
        this.init();
      });
    }
  },

  filters: {
    checkStatusFilter(val) {
      let str = "";
      if (val == 1001 || val == 2001 || val == 1) {
        str = "通过";
      } else if (val == 1002 || val == 2) {
        str = "不通过";
      } else if (val == 1003 || val == 3) {
        str = "退回";
      } else if (val == 0) {
        str = "未审核";
      }
      return str;
    },
    storeOrWorker(val) {
      if (val == "W") {
        return "业务员";
      } else if (val == "M") {
        return "门店";
      } else {
        return "";
      }
    },
    warningStatuFilter(val) {
      let va = Number(val);
      if (va == 100) {
        return "正常";
      } else {
        return "无";
      }
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