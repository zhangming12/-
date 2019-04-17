<style lang="less" scoped>
@import "../../../config/index.less";
.main-container {
  width: 100%;
  height: 100%;
  background: white;
  padding-bottom: 0 !important;
  .box {
    width: 100%;
    padding: 10px;
    padding-top: 0;
    overflow: hidden;
    .container {
      .w18 {
        width: 50%;
      }
      .w16 {
        width: 35%;
      }
    }
    #mapContainer {
      width: 100%;
      height: 300px;
      margin-left: 10px;
    }
  }
}
.search-box {
  p {
    line-height: 24px;
    margin-left: 10px;
  }
}
.box {
  padding: 0 10px;

  .title {
    font-weight: bold;
    font-size: 14px;
    text-align: 40px;
    padding-left: 10px;
    display: block;
    margin-bottom: 20px;
  }
}
.modify {
  margin-top: 20px;
}
.addressBox {
  p {
    line-height: 40px;
    text-indent: 30px;
  }
  .sureBtn {
    margin: 10px;
  }
}
</style>

<template>
  <div id="Main">
    <div class="main-container">
      <div class="box">
        <div class="title">店铺信息</div>
        <div class="main-box">
          <Row>
            <Col span="5" offset="1">
              <span>客户编号：</span>
              <span>{{ showData.joinCode }}</span>
            </Col>
            <Col span="6">
              <span>店铺ID：</span>
              <span>{{ showData.storeId }}</span>
            </Col>
            <Col span="6">
              <span>店铺名称：</span>
              <span>{{ showData.storeName }}</span>
            </Col>
            <Col span="6">
              <span>手机号：</span>
              <span>{{ showData.phone }}</span>
            </Col>
          </Row>
        </div>
      </div>
      <div class="box modify">
        <div class="title">修改信息</div>
        <div class="search-box">
          <Form ref="form" style="margin-top:10px;" :model="formData" :label-width="10">
            <div class="container">
              <div class="btn-left w18">
                <Form-item required>
                  <Input clearable v-model.trim="formData.areaName" placeholder="请输入地址"/>
                </Form-item>
              </div>
              <div class="btn-left w10" style="margin-left:20px;">
                <div class="searchBox">
                  <div class="search-right" @click="submit('form')">
                    <Button shape="circle" icon="ios-search" type="primary">搜索地址</Button>
                  </div>
                </div>
              </div>
            </div>
          </Form>
        </div>
        <div id="mapContainer"></div>
      </div>
      <div class="box addressBox">
        <p>原地址：{{ showData.oldAddress }}</p>
        <p>选定新地址：
          <Input v-model="newAddress" placeholder="新地址" style="width: 400px"/>
        </p>
        <Button class="btn-right sureBtn" type="primary" @click="sureModifyAddress">确定修改</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "modify-store-address",
  data() {
    return {
      formData: {
        areaName: ""
      },
      showData: {
        //展示的数据
        joinCode: "",
        storeId: "",
        storeName: "",
        phone: "",
        oldAddress: ""
      },
      newAddress: "", //新地址
      province: null,
      city: null,
      area: null,
      signName: null,
      id: null,
      signAddress: null,
      signLocate: null,
      lng: null,
      locate: []
    };
  },
  computed: {},
  created() {
    if (Object.keys(this.$route.query).length) {
      let {
        storeId,
        storeName,
        joinCode,
        address,
        phone,
        locate
      } = this.$route.query;
      this.showData = {
        storeId,
        storeName,
        joinCode,
        oldAddress: address,
        phone
      };
      if (locate) {
        this.locate = locate.split(",").reverse();
      }
    }
  },
  mounted() {
    if (this.locate.length) {
      this.queryLocate();
    }else{
      //根据地理位置名称查询经纬度
      this.Global.doPost("cnySign/getLocate.json", {areaName:this.showData.oldAddress}, res => {
        if (res) {
          let locate = res.split(",").reverse();
          this.locate = locate;
          this.queryLocate();
          // this.mapInit(this.locate, this.firstLocate, this.thisLocate);
        }
      });
    }
  },
  filters: {},
  methods: {
    //查询本次，首次地址定位
    queryLocate() {
      this.Global.doPost(
        "store/queryThisLocateAndFirstLocate.json",
        this.showData.storeId,
        res => {
          if (res) {
            let firstLocate = res.firstLocate ? res.firstLocate : "";
            let thisLocate = res.thisLocate ? res.thisLocate : "";
            this.thisLocate = thisLocate.split(",").reverse();
            this.firstLocate = firstLocate.split(",").reverse();
          }

          this.mapInit(this.locate, this.firstLocate, this.thisLocate);
        }
      );
    },
    //确定修改
    sureModifyAddress() {
      if (!this.signLocate || !this.signLocate) {
        this.$Message.error("请选择本店位置");
        return false;
      }
      let data = {
        storeId: this.showData.storeId,
        locate: this.signLocate,
        address: this.newAddress
      };
      this.Global.doPost("store/doSettingStore.json", data, res => {
        this.$Message.success("修改成功");
        setTimeout(() => {
          this.$router.push({
            path: "/customerInformate"
          });
        }, 1000);
      });
    },
    submit() {
      if (!this.formData.areaName) {
        this.$Message.info("请输入地址");
        return false;
      }
      let data = {};
      data["areaName"] = this.formData.areaName;
      //根据地理位置名称查询经纬度
      this.Global.doPost("cnySign/getLocate.json", data, res => {
        if (res) {
          let locate = res.split(",").reverse();
          this.mapInit(this.locate, this.firstLocate, this.thisLocate, locate);
        }
      });
    },
    mapInit(storeLocate, firstLocate = [], thisLocate = [], locateList = []) {
      let self = this;
      var map = new BMap.Map("mapContainer"); // 创建地图实例
      var point = new BMap.Point(
        Number(storeLocate[0]),
        Number(storeLocate[1])
      ); // 创建点坐标
      map.centerAndZoom(point, 15);
      var geocoder = new BMap.Geocoder();
      // 编写自定义函数,创建标注
      function addMarker(point) {
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
      }
      let myIconRed = new BMap.Icon(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/ecuda/image/pos-red.png",
        new BMap.Size(32, 32)
      );
      let myIconGreen = new BMap.Icon(
        "https://hbrand.oss-cn-hangzhou.aliyuncs.com/ecuda/image/pos-green.png",
        new BMap.Size(32, 32)
      );
      //标记的点击事件
      function clickEvent(e) {
        //bmap进行了封装，它将原始的事件放到domEvent
        //阻止事件冒泡
        e.domEvent.stopPropagation();
        //删除绿点
        if (self.lng) {
          deletePoint(self.lng);
        }
        let position = [e.point.lng, e.point.lat];
        self.signLocate = position.reverse().join();
        let locate = geocoder.getLocation(e.point, function(rs) {
          self.newAddress = rs.address;
        });
      }
      if (firstLocate.length > 0) {
        var pt = new BMap.Point(Number(firstLocate[0]), Number(firstLocate[1]));
        var myIcon = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-first.jpg",
          new BMap.Size(48, 55)
        ); //首次
        var marker = new BMap.Marker(pt, { icon: myIcon }); //本次
        marker.addEventListener("click", function(e) {
          clickEvent(e);
        });
        map.addOverlay(marker); //本次
      }
      if (thisLocate.length > 0) {
        var pt1 = new BMap.Point(Number(thisLocate[0]), Number(thisLocate[1]));
        var myIcon1 = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-this.jpg",
          new BMap.Size(48, 55)
        ); //首次
        var marker1 = new BMap.Marker(pt1, { icon: myIcon1 });
        marker1.addEventListener("click", function(e) {
          clickEvent(e);
        });
        map.addOverlay(marker1);
      }
      if (storeLocate.length > 0) {
        var pt2 = new BMap.Point(
          Number(storeLocate[0]),
          Number(storeLocate[1])
        );
        var myIcon2 = new BMap.Icon(
          "https://hbrand.oss-cn-hangzhou.aliyuncs.com/map/location-store.jpg",
          new BMap.Size(48, 55)
        ); //本店
        var marker2 = new BMap.Marker(pt2, { icon: myIcon2 });
        map.addOverlay(marker2);
        marker2.addEventListener("click", function(e) {
          clickEvent(e);
        });
      }
      if (locateList && locateList.length) {
        let pt = new BMap.Point(Number(locateList[0]), Number(locateList[1]));
        let marker3 = new BMap.Marker(pt, { icon: myIconRed });
        map.addOverlay(marker3);
        marker3.addEventListener("click", function(e) {
          clickEvent(e);
        });
      }
      map.centerAndZoom(point, 18);
      map.enableScrollWheelZoom(true);
      //根据经度删除单个的标记点
      function deletePoint(lng) {
        var allOverlay = map.getOverlays();
        for (var i = 0; i < allOverlay.length; i++) {
          //删除指定经度的点
          if (allOverlay[i].toString() == "[object Marker]") {
            if (allOverlay[i].getPosition().lng == lng) {
              map.removeOverlay(allOverlay[i]);
              return false;
            }
          }
        }
      }
      map.addEventListener("click", function(e) {
        // map.clearOverlays();清除地图上所有的marker
        if (self.lng) {
          deletePoint(self.lng);
        }
        let position = [e.point.lng, e.point.lat];
        self.lng = e.point.lng;
        self.signLocate = position.reverse().join();
        let pt = new BMap.Point(Number(e.point.lng), Number(e.point.lat));
        let marker = new BMap.Marker(pt, { icon: myIconGreen });
        map.addOverlay(marker);
        //获取位置信息 省市区街道等
        let locate = geocoder.getLocation(e.point, function(rs) {
          self.newAddress = rs.address;
        });
      });
    }
  }
};
</script>