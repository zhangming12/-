
<style lang="less" scoped>
@import "../../config/index.less";
#Main {
  padding: 15px;
}

.box {
  // position: relative;
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
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

//店铺信息
#shopInfor {
  margin-top: 10px;
  overflow: hidden;
  .title {
    display: inline-block;
    float: left;
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

footer {
  text-align: center;
  margin: 40px 0 20px;
  .btn-save {
    color: #fff;
    background-color: @primary-color;
    border-color: @primary-color;
    padding: 5px 15px;
    cursor: pointer;
  }
}

#container {
  height: 300px;
}

.videoInfor {
  margin-top: 10px;
  overflow: hidden;
  .videoTitle {
    float: left;
  }
  .videoRecord {
    float: right;
    height: 26px;
    line-height: 26px;
    .color-orange {
      color: @primary-color;
      cursor: pointer;
    }
  }
}
.goodsDetail {
  overflow: hidden;

  .showVideoPlay {
    height: 180px;
    position: relative;
    float: left;
    width: 40%;
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

  .goodsInfor {
    float: right;
    width: 60%;
    p {
      margin-bottom: 24px;
    }
  }
  .colorError {
    color: #ed3f14;
  }
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">预警详情</h2> -->

        <div class="box">
            <!-- 店铺信息 -->
            <Form :model="formData" label-position="left" :label-width="80">
            <div class="form-title">店铺信息</div>
            <div id="shopInfor">
                <div class='child'>                     
                         <Row>
                            <Col span="6">
                                <FormItem label="客户编号：">
                                    <span>{{formData.joinCode}}</span>
                                </FormItem> 
                                <FormItem label="手机号码：">
                                    <span>{{formData.phone | phoneFormat}}</span>
                                </FormItem> 
                                <FormItem label="销售部：">
                                    <span>{{formData.salesDept}}</span>
                                </FormItem>                                                                                                                               
                            </Col>
                            <Col span="6"  >
                                <FormItem label="店铺ID：">  
                                    <span>{{formData.storeId}}</span>
                                </FormItem>
                                 <FormItem label="业代姓名：">
                                    <span>{{formData.workerName}}</span>
                                </FormItem>    
                                <FormItem label="销售大区：">
                                    <span>{{formData.salesRegion}}</span>
                                </FormItem>                                                                                                                                                              
                            </Col>
                            <Col span="6">
                                <FormItem label="店铺名称：">
                                    <span>{{formData.storeName}}</span>
                                </FormItem>
                                <FormItem label="业代手机：">
                                    <span>{{formData.workerPhone | phoneFormat}}</span>
                                </FormItem>                                
                                <FormItem label="营业部：">
                                    <span>{{formData.busiDept}}</span>
                                </FormItem>                                                                
                            </Col>
                            <Col span="6"  >
                                <FormItem label="姓名：">  
                                    <span>{{formData.name}}</span>
                                </FormItem>
                                <FormItem label="路线编号：">
                                    <span>{{formData.salesRoute}}</span>
                                </FormItem>                                                                                                
                            </Col>  
                            <Col span="24"  > 
                                <FormItem label="地 址：">
                                    <span>{{formData.address}}</span>
                                </FormItem>                          
                            </Col>  
                            
                        </Row>                    
                </div>
            </div>
            </Form>
            <div class="form-title">地图预警</div>
            <div id="container" ></div>
            <div class="videoInfor">
                <div class="form-title videoTitle">视频信息</div>
                <div class="videoRecord">
                    累计上传<span class="color-orange">{{uploadCount}}</span>次,预警<span class="color-orange">{{riskCount}}</span>次 <span class="color-orange" @click="handleLookMore">{{isShowMore?'收起列表':'查看更多'}}>></span>
                </div>
            </div>
            <div>
                <Row>                   
                    <Col span="11"  offset="1" v-for="(item, index) in storeGoodsList" :key="index"  style="margin-top:10px;height: 220px;">
                        <div class="storeGoods">
                            <Card >                            
                                <div class="goodsDetail">
                                    <div class="showVideoPlay">
                                        <video   :src="item.radioUrl" :ref='"playVideo" + index' controls></video> 
                                        <img class="triangle" src="../../assets/image/triangle-first.jpg" v-if=" index == 0 ">                                    
                                        <img class="triangle" src="../../assets/image/triangle-this.jpg" v-else-if=" index == 1 ">                                                                        
                                    </div>                                
                                    <div class="goodsInfor">
                                        <P>拍摄时间：{{item.uploadTime | formatDate}}</P>
                                        <P>上传时间：{{item.startTime | formatYear }}至{{item.endTime | formatYear }}</P>                                    
                                        <P>上传周数：第{{item.weeks}}周</P>
                                        <P>坐标预警： <span  :class="{ 'colorError': item.locate == '异常'}">{{item.locate}}</span></P>                                                                    
                                    </div>                                
                                </div>                              
                            </Card>
                        </div>
                    </Col>                              
                </Row>
                <Row>                   
                    <Col span="11"  offset="1" v-for="(item, index) in otherStoreGoodsList" :key="index" v-show="isShowMore" style="margin-top:10px;height: 220px;">
                        <div class="storeGoods">
                            <Card >                            
                                <div class="goodsDetail">
                                    <div class="showVideoPlay">
                                        <video   :src="item.radioUrl" :ref='"playVideo" + index' controls></video>                                                                                                                
                                    </div>                                
                                    <div class="goodsInfor">
                                        <P>拍摄时间：{{item.uploadTime | formatDate}}</P>
                                        <P>上传时间：{{item.startTime | formatYear }}至{{item.endTime | formatYear }}</P>                                    
                                        <P>上传周数：第{{item.weeks}}周</P>
                                        <P>坐标预警： <span  :class="{ 'colorError': item.locate == '异常'}">{{item.locate}}</span></P>                                                                    
                                    </div>                                
                                </div>                              
                            </Card>
                        </div>
                    </Col>                              
                </Row>
            </div>           
            <footer >
              <Button type="success" class="btn-back" @click="handlePartakeBack">返回</Button>
            </footer>
        </div>    
    </div>
</template>

<script>
import { dispalyExamineRecStatus } from "@/util/ENUMS.js";
import { formatYearMonth, formatDate, formatYear } from "@/filters/filters.js";

import { getLoongActivityInfo } from "@/api/landLoong-activity-manage/landLoong-activity-manage.js";

export default {
  data() {
    const that = this;

    return {
      vertical: 0,

      formData: {
        storeId: "",
        storeName: "",
        name: "",
        storePhone: "",

        storeAddress: "",
        workerName: "", //业代手机号
        workerPhone: "" //业代姓名
      },
      isShowMore: false,

      storeGoodsList: null,
      otherStoreGoodsList: null,

      uploadCount: 0, //累计上传记录
      riskCount: 0, //预警次数
      storeLocate: null
    };
  },
  created: function() {},
  mounted() {
    var joinCode = this.$route.query.joinCode;
    var id = this.$route.query.id;
    var loongBizType = this.$route.query.loongBizType;
    if (joinCode && id) {
      this.activityDetail({ joinCode, id, loongBizType });
    }
  },
  watch: {},
  methods: {
    mapLation(locateList, storeLocate, firstLocateList) {
      console.log(firstLocateList);

      var map = new BMap.Map("container"); // 创建地图实例
      var point = new BMap.Point(
        Number(storeLocate[0]),
        Number(storeLocate[1])
      ); // 创建点坐标
      map.centerAndZoom(point, 15);

      //locateList 首次 本次

      if (firstLocateList.length > 1) {
        var pt = new BMap.Point(
          Number(firstLocateList[1][0]),
          Number(firstLocateList[1][1])
        );
        var myIcon1 = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-first.jpg",
          // new BMap.Size(100, 150),
          new BMap.Size(48, 55)
        ); //本次
        // var myIcon = new BMap.Icon(
        //   "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-this.jpg",
        //   new BMap.Size(100, 150)
        // ); //首次
        var marker = new BMap.Marker(pt, { icon: myIcon1 }); //本次
        map.addOverlay(marker); //本次
      }
      if (firstLocateList.length > 0) {
        var pt1 = new BMap.Point(
          Number(firstLocateList[0][0]),
          Number(firstLocateList[0][1])
        );
        var myIcon = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-this.jpg",
          // new BMap.Size(100, 150)
          new BMap.Size(48, 55)
        ); //首次
        // var myIcon1 = new BMap.Icon(
        //   "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-first.jpg",
        //   new BMap.Size(100, 150)
        // ); //本次
        var marker1 = new BMap.Marker(pt1, { icon: myIcon });
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
        var point = new BMap.Point(locateList[i][0], locateList[i][1]);
        addMarker(point);
      }
      map.enableScrollWheelZoom(true);
    },
    activityDetail: function(queryParams) {
      var newDate = new Date();
      if (queryParams) {
        getLoongActivityInfo(queryParams).then(res => {
          if (res && res.status === 1) {
            this.formData = res.data;
            let firstLocateList = []; //首次、本次
            if (res.data.firstLocateList) {
              for (let k = 0; k < res.data.firstLocateList.length; k++) {
                firstLocateList.push(
                  res.data.firstLocateList[k].split(",").reverse()
                );
              }
            }
            let locateList = []; //其他
            for (const key in res.data.locateList) {
              locateList.push(res.data.locateList[key].split(",").reverse());
            }

            this.storeGoodsList =
              res.data.firstRadioList && res.data.firstRadioList.reverse();
            this.otherStoreGoodsList = res.data.loongRadio;
            this.uploadCount = res.data.uploadCount;
            this.riskCount = res.data.riskCount;
            let storeLocate = [];
            if (res.data.storeLocate) {
              storeLocate = res.data.storeLocate.split(",").reverse();
            }

            this.storeLocate = storeLocate; //本店位置
            this.mapLation(locateList, storeLocate, firstLocateList);
          }
        });
      }
    },
    handlePartakeBack() {
      this.$router.back(-1);
    },
    handleLookMore() {
      this.isShowMore = !this.isShowMore;
    }
  },
  filters: {
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
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, "yyyy-MM-dd hh:mm:ss");
    },
    formatYear(time) {
      return formatYear(time);
    }
  }
};
</script>


