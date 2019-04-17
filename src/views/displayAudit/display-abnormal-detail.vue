<style lang="less" scoped>
@import "../../config/index.less";
.box {
  width: 100%;
  background: #ffffff;
  padding-left: 10px;
  .item-box {
    line-height: 32px;
    font-size: 12px;
  }
}
.main-container {
  min-height: 100%;
  position: relative;
  background: #ffffff;
  padding-bottom: 60px;
  .box {
    .card {
      border: 1px solid #e5e5e5;
      height: 411px;
      margin-bottom: 10px;
      .card-top {
        height: 344px;
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
      .card-bottom {
        box-sizing: border-box;
        border-top: 1px solid #e5e5e5;
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

.warnColor {
  color: #ed3f14;
}
.primaryColor {
  color: @primary-color;
}
.successColor {
  color: #19be6b;
}
#container {
  height: 400px;
}
</style>

<template>
	<div id="Main">
		<!-- <h2>异常详情</h2> -->
        <div class="main-container">
            <div class="box">
                <Row>
                    <Col span="7">
                        <div class="item-box">
                            <p title="">
                                <span>客户编号：</span>
                                <span>{{ formData.joinCode }}</span>
                            </p>
                        </div>
                        <div class="item-box">
                            <p title="">
                                <span>销售路线：</span>
                                <span>{{ formData.salesRoute }}</span>
                            </p>
                        </div>
                        <div class="item-box">
                            <p title="">
                                <span>上传周期：</span>
                                <span>{{formData.startTime | formatYearMonth }} 至 {{formData.endTime | formatYearMonth }}</span>
                            </p>
                        </div>
                    </Col>
                    <Col span="7">
                        <div class="item-box">
                            <p title="">
                                <span>门店ID：</span>
                                <span>{{ formData.storeId }}</span>
                            </p>
                        </div>
                        <div class="item-box">
                            <p title="">
                                <span>业代姓名：</span>
                                <span>{{ formData.workerName }}</span>
                            </p>
                        </div>
                        <div class="item-box">
                            <p title="">
                                <span>活动名称：</span>
                                <span>{{ formData.activityName }}</span>
                            </p>
                        </div>
                    </Col>
                    <Col span="7">
                        <div class="item-box">
                            <p title="">
                                <span>门店名称：</span>
                                <span>{{ formData.storeName }}</span>
                            </p>
                        </div>
                        <div class="item-box">
                            <p title="">
                                <span>业代手机：</span>
                                <span>{{ formData.workerPhone }}</span>
                            </p>
                        </div>
                        <div class="item-box">
                            <p title="">
                                <span>活动分组：</span>
                                <span>{{ formData.presentName }}</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div class="box">
                <div class="card">
                    <div class="card-top">
                        <div class="card-left">
                            <template v-if="storeGoodsList.store" >
                                <div class="video-box">
                                    <div class="video">
                                        <div class="video-main">
                                            <video :src="storeGoodsList.store.firstRadio.radioUrl" v-if="storeGoodsList.store.firstRadio" controls></video>
                                            <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                            <img class="triangle" src="../../assets/image/triangle-first.jpg">
                                        </div>
                                        
                                    </div>
                                    <div class="video">
                                        <div class="video-main">
                                            <video :src="storeGoodsList.store.radioUrl" v-if="storeGoodsList.store.radioUrl" controls></video>
                                            <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                            <img class="triangle" src="../../assets/image/triangle-this.jpg">
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="content-box">
                                    <Row style="width:100%;">
                                        <Col span="8">
                                            <div class="item-box">
                                                <span>上传类型:</span>
                                                <span>{{ storeGoodsList.store.uploadChannel | storeOrWorker}}</span>
                                            </div>
                                            <div class="item-box">
                                                <p :title="storeGoodsList.store.locate">
                                                    <span>预警编码：</span>
                                                    <span :class="storeGoodsList.store.locate ? 'warnColor' : ''">{{ storeGoodsList.store.locate ? storeGoodsList.store.locate :"无" }}</span>
                                                </p>
                                            </div>
                                        </Col>
                                        <Col span="8">
                                            <div class="item-box">
                                                <p>
                                                    <span>提交时间：</span>
                                                    <span>{{ storeGoodsList.store.uploadTime  | formatYearMonth}}</span>
                                                </p>
                                            </div>
                                            
                                        </Col>
                                        <Col span="8">
                                            <div class="item-box">
                                                <span>审核状态：</span>
                                                <span :class="storeGoodsList.store.checkStatus == 1001 || storeGoodsList.store.checkStatus == 1 || storeGoodsList.store.checkStatus == 2001 ? 'successColor' : storeGoodsList.store.checkStatus == 1002 ? 'primaryColor' : storeGoodsList.store.checkStatus == 1003 ?'warnColor':''">{{ storeGoodsList.store.checkStatus | checkStatusFilter }}</span>
                                            </div>
                                        </Col>
                                        <Col span="23">
                                            <div class="item-box">
                                                <span class="status">审核意见：</span>
                                                <Input disabled v-model.trim="storeGoodsList['store'].checkMessage" placeholder="审核意见"></Input>
                                            </div>
                                            <!-- <div class="item-box">
                                                <span class="status">内部备注：</span>
                                                <Input disabled v-model.trim="storeGoodsList['store'].memo" placeholder="内部备注"></Input>
                                            </div> -->
                                        </Col>
                                    </Row>
                                </div>
                            </template>
                            <div class="no-upload" v-else>
                                <img src="../../assets/image/no-video.jpg" alt="暂未上传视频">
                                <p>暂未上传视频</p>
                            </div>
                        </div>
                        <div class="card-right">
                            
                            <template v-if="storeGoodsList.worker" >
                                <div class="video-box">
                                <div class="video">
                                    <div class="video-main">
                                        <video :src="storeGoodsList.worker.firstRadio.radioUrl" v-if="storeGoodsList.worker.firstRadio" controls></video>
                                        <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                        <img class="triangle" src="../../assets/image/triangle-first.jpg">
                                    </div>
                                    
                                </div>
                                <div class="video">
                                    <div class="video-main">
                                        <video :src="storeGoodsList.worker.radioUrl" v-if="storeGoodsList.worker.radioUrl" controls></video>
                                        <img v-else src="../../assets/image/nullVideo.png" class="noneVideoUrl">
                                        <img class="triangle" src="../../assets/image/triangle-this.jpg">
                                    </div>
                                    
                                </div>
                                </div>
                                <div class="content-box">
                                    <Row style="width:100%;">
                                        <Col span="8">
                                            <div class="item-box">
                                                <span>上传类型:</span>
                                                <span>{{ storeGoodsList.worker.uploadChannel | storeOrWorker}}</span>
                                            </div>
                                            <div class="item-box">
                                                <p :title="storeGoodsList.worker.locate">
                                                    <span>预警编码：</span>
                                                    <span :class="storeGoodsList.worker.locate ? 'warnColor' : ''">{{ storeGoodsList.worker.locate ? storeGoodsList.worker.locate :"无" }}</span>
                                                </p>
                                            </div>
                                        </Col>
                                        <Col span="8">
                                            <div class="item-box">
                                                <p>
                                                    <span>提交时间：</span>
                                                    <span>{{ storeGoodsList.worker.uploadTime  | formatYearMonth}}</span>
                                                </p>
                                            </div>
                                            
                                        </Col>
                                        <Col span="8">
                                            <div class="item-box">
                                                <span>审核状态：</span>
                                                <span :class="storeGoodsList.worker.checkStatus == 1001 || storeGoodsList.worker.checkStatus == 1 ? 'successColor' : storeGoodsList.worker.checkStatus == 1002 ? 'primaryColor' : storeGoodsList.worker.checkStatus == 1003 ?'warnColor':''">{{ storeGoodsList.worker.checkStatus | checkStatusFilter }}</span>
                                            </div>
                                        </Col>
                                        <Col span="23">
                                            <div class="item-box">
                                                <span class="status">审核意见：</span>
                                                <Input disabled v-model.trim="storeGoodsList['worker'].checkMessage" placeholder="审核意见"></Input>
                                            </div>
                                            <!-- <div class="item-box">
                                                <span class="status">内部备注：</span>
                                                <Input disabled v-model.trim="storeGoodsList['worker'].memo" placeholder="内部备注"></Input>
                                            </div> -->
                                        </Col>
                                    </Row>
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
                            <Col span="11" offset="1">
                                <div class="card-bottom-container">
                                    <span>风险类型：</span>
                                    <Select disabled v-model="storeGoodsList.riskType" placeholder="异常类型">
                                        <Option value="no">无</Option>
                                        <Option value="V">视频异常</Option>
                                    </Select>
                                </div>
                            </Col>
                            <Col span="10" offset="1">
                                <div class="card-bottom-container">
                                    <span>风险描述:</span>
                                    <Input disabled v-model.trim="storeGoodsList.riskDes" placeholder="异常描述"></Input>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="box" style="padding:10px;">
                <div id="container"></div>
            </div>
        </div>
	</div>
</template>

<script>
export default {
  name: "display-abnormal-detail",
  data() {
    return {
      storeGoodsList: {},
      formData: {},
      locateList: [],
      storeLocate: [],
      workerLocate: []
    };
  },
  created() {
    let { storeId, activityId, period } = this.$route.query;
    let data = {
      storeId,
      activityId,
      period
    };
    this.init(data);
    // let locateList = [116.6812687404, 39.7132611372];
    // this.mapLation(locateList, [[116.6812687404, 39.7132611372]]);
  },
  mounted() {},
  methods: {
    mapLation(locateList) {
      var map = new BMap.Map("container"); // 创建地图实例
      var point = new BMap.Point(
        Number(locateList[0].locate[0]),
        Number(locateList[0].locate[1])
      ); // 创建点坐标
      map.centerAndZoom(point, 15);
      // 编写自定义函数,创建标注
      function addMarker(point, word) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
        var label = new BMap.Label(word, { offset: new BMap.Size(-5, -15) });
        label.setStyle({
          border: "none",
          backgroundColor: "transparent",
          fontWeight:"900"
        });
        marker.setLabel(label);
      }

      for (let i = 0; i < locateList.length; i++) {
        var point = new BMap.Point(
          Number(locateList[i].locate[0]),
          Number(locateList[i].locate[1])
        );
        addMarker(point, locateList[i].name);
      }
      map.enableScrollWheelZoom(true);
    },
    init(data) {
      this.Global.doPost(
        "displayYxtg/queryDisplayRecordDubbo.json",
        data,
        res => {
          if (res.datalist && res.datalist.length) {
            this.locateList = [];
            this.storeGoodsList = res.datalist[0];
            this.formData = this.storeGoodsList.store
              ? this.storeGoodsList.store
              : this.storeGoodsList.worker;
            this.storeGoodsList.riskDes = this.formData.riskDes;
            this.storeGoodsList.riskType = this.formData.riskType
              ? this.formData.riskType
              : "no";

            if (this.storeGoodsList.store && this.storeGoodsList.store.locate) {
              this.locateList.push({
                locate: this.storeGoodsList.store.locate.split(",").reverse(),
                name: "门店"
              });
            }

            if (
              this.storeGoodsList.worker &&
              this.storeGoodsList.worker.locate
            ) {
              this.locateList.push({
                locate: this.storeGoodsList.worker.locate.split(",").reverse(),
                name: "业务员"
              });
            }
            this.mapLation(this.locateList);
          }
        }
      );
    }
  },

  filters: {
    checkStatusFilter(val) {
      let str = "";
      if (val == 1001) {
        str = "一审通过";
      } else if (val == 1002) {
        str = "一审不通过";
      } else if (val == 1003) {
        str = "一审退回";
      } else if (val == 0) {
        str = "未审核";
      } else if (val == 2001) {
        str = "二审通过";
      } else if (val == 2) {
        str = "二审不通过";
      } else if (val == 3) {
        str = "二审退回";
      }else if (val == 1){
          str = "终审通过"
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