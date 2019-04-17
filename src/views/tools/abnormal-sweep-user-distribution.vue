
<style lang="less" scoped>
@import "../../config/index.less";
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
  // position: relative;
  width: 100%;
  // box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
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
    float: left;
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
    float: left;
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

//审核意见
#examine {
  margin-top: 10px;
  overflow: hidden;
  .title {
    float: left;
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
  overflow: hidden;

  .showVideoPlay {
    height: 280px;
    position: relative;
    float: left;
    width: 40%;
    // margin-right: 5px;
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
    padding-left: 5px;
    float: right;
    width: 60%;
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
  height: 600px;
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
</style>

<template>
    <div id="Main">
        <div class="box">
          <Form ref="form" :model="formData" :label-width="88">
            <Row>
              <Col span="7">
                <Form-item label="品牌名称"    >
                  <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                    <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                  </Select>
                </Form-item>
                <Form-item label="开始时间"     >
                  <data-range @dataChange="startTimeChange" hour="00:00" :time="formData.queryStartTime"  placeholder="选择开始时间" start></data-range>
                
                </Form-item>
              </Col>
              <Col span="7">
                <Form-item label="活动包名"    >
                  <Select v-model="formData.groupId" placeholder="活动包名" @on-change="getActivityList" clearable>
                    <Option :value="item.id" v-for="(item,index) in groupList" :key="index">{{ item.groupName }}</Option>
                  </Select>
                </Form-item>
                <Form-item label="结束时间"     >
                  <data-range hour="24:00" placeholder="结束时间" @dataChange="endTimeChange" :time="formData.queryEndTime"></data-range>
                </Form-item>
              </Col>
              <Col span="7">
                <Form-item label="活动名称"    >
                  <Select v-model="formData.oneLevel" placeholder="活动名称" multiple clearable>
                    <Option :value="item.id" v-for="(item,index) in activityList" :key="index">{{ item.name }}</Option>
                  </Select>
                </Form-item>
                <Form-item label="门店ID"    >
                    <Input type="text" clearable v-model.trim="formData.storeId" placeholder="门店ID"></Input>
                </Form-item>
              </Col>
              <Col span="2" offset='1'>
                <Button @click="submit('form')" type="primary" class="btn-search">查询</Button>
              </Col>
            </Row>
          </Form>
            <!-- 地图预警 -->
            <div class="form-title" style="margin-top:10px;">地图预警</div>
            <div id="container"></div>
        </div>   
    </div>
</template>

<script>
import dataRange from "@/components/data-rang.vue";
export default {
  data() {
    return {
      start: {
        time: "",
        hour: ""
      },
      end: {
        time: "",
        hour: "24:00"
      },
      formData: {
        brandId: "",
        groupId: "",
        oneLevel: [],
        storeId: "",
        queryStartTime: "",
        queryEndTime: ""
      },
      brandList: [],
      groupList: [],
      activityList: [],
      locateList: []
    };
  },
  components: { dataRange },
  created() {
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
      if (this.brandList && this.brandList.length) {
        this.formData.brandId = this.brandList[0].id;
        this.changeValue(this.formData.brandId);
      }
    });
  },
  mounted() {
    let locateList = [116.6812687404, 39.7132611372];
    this.mapLation(locateList);
  },
  methods: {
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
        this.formData.queryEndTime = value.time;
        return;
      }
      this.formData.queryEndTime = this.Global.setHoursData(
        value.time,
        value.hour
      );
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.oneLevel = "";
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
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "condition/queryGroup.json",
        // { date: 7, activityType: 3, scope: "a", brandId: value },
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
    mapLation(storeLocate, locateList = [], firstLocate = [], thisLocate = []) {
      var map = new BMap.Map("container"); // 创建地图实例
      var point = new BMap.Point(
        Number(storeLocate[0]),
        Number(storeLocate[1])
      ); // 创建点坐标
      map.centerAndZoom(point, 15);
      //locateList 首次 本次
      // if (firstLocate.length > 0) {
      //   var pt = new BMap.Point(Number(firstLocate[0]), Number(firstLocate[1]));
      //   var myIcon = new BMap.Icon(
      //     "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-first.jpg",
      //     // new BMap.Size(100, 150),
      //     new BMap.Size(48, 55)
      //   ); //首次
      //   var marker = new BMap.Marker(pt, { icon: myIcon }); //本次
      //   map.addOverlay(marker); //本次
      // }
      // if (thisLocate.length > 0) {
      //   var pt1 = new BMap.Point(Number(thisLocate[0]), Number(thisLocate[1]));
      //   var myIcon1 = new BMap.Icon(
      //     "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-this.jpg",
      //     // new BMap.Size(100, 150)
      //     new BMap.Size(48, 55)
      //   ); //首次
      //   var marker1 = new BMap.Marker(pt1, { icon: myIcon1 });
      //   map.addOverlay(marker1);
      // }
      // if (storeLocate) {
      //   var pt2 = new BMap.Point(
      //     Number(storeLocate[0]),
      //     Number(storeLocate[1])
      //   );
      //   var myIcon2 = new BMap.Icon(
      //     "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-store.jpg",
      //     new BMap.Size(48, 55)
      //   ); //本店
      //   var marker2 = new BMap.Marker(pt2, { icon: myIcon2 });
      //   map.addOverlay(marker2);
      // }
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
    submit() {
      if (
        !this.formData.brandId ||
        !this.formData.groupId ||
        !this.formData.oneLevel ||
        !this.formData.storeId ||
        !this.formData.queryStartTime ||
        !this.formData.queryEndTime
      ) {
        this.$Message.error("必选条件不能为空");
        return false;
      }
      this.init();
    },
    init() {
      let data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
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
      data["oneLevel"] = this.formData.oneLevel.join();
      this.Global.doPost("tool/getUserScanInfo.json", data, res => {
        let locateList = [];
        res.forEach(item => {
          locateList.push(item.memo.split(",").reverse());
        });
        console.log(locateList);
        this.mapLation(locateList[0], locateList);
      });
    }
  }
};
</script>


