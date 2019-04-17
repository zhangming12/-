<style lang="less" scoped>
@import "../../config/index.less";
.main-container {
  width: 100%;
  height: 100%;
  background: white;
  padding-bottom: 0 !important;
  .box {
    width: 100%;
    height: 100%;
    padding: 10px;
    padding-top: 0;
    overflow: hidden;
    display: flex;
    justify-content: center;
    .right {
      height: 100%;
    }
    .right {
      width: 80%;
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
        height: 96%;
        margin-left: 10px;
      }
    }
  }
}
.search-box {
  p {
    line-height: 24px;
    margin-left: 10px;
  }
}
</style>

<template>
    <div id="Main">
        <div class="main-container">
            <div class="box">
                <div class="right">
                    <div class="search-box">
                        <Row>
                            <Col span="8">
                                <p>
                                    {{signName }}
                                </p>
                            </Col>
                            <Col span="8">
                                <p>
                                    {{ province }} {{ city }} {{ area }}
                                </p>
                            </Col>
                            <Col span="8">
                                <p>
                                    {{ signAddress }}
                                </p>
                            </Col>
                            <Col span="20">
                                <p>
                                    {{ signLocate }}
                                </p>
                            </Col>
                            <Col span="4">
                                <p>
                                    <Button type="info" @click="addressPass" size="small">保存修改</Button>
                                </p>
                            </Col>
                        </Row>
                        <Form ref="form" style="margin-top:10px;" :model="formData" :label-width="10">
                            <div class="container">
                                <div class="btn-left w18">
                                    <Form-item  required>
                                        <Input clearable v-model.trim="formData.areaName" placeholder="经度、维度之间用英文逗号隔开"/>
                                            <!-- <Icon slot="prepend" type="ios-search"></Icon> -->
                                        <!-- </Input> -->
                                    </Form-item>
                                </div>
                                <div class="btn-left w16">
                                    <Form-item  prop="groupId" required>
                                        <Radio-group v-model="formData.type">
                                            <Radio label="word">
                                                <span>关键词搜索</span>
                                            </Radio>
                                            <Radio label="lat">
                                                <span>经纬度搜索</span>
                                            </Radio>
                                        </Radio-group>
                                    </Form-item>
                                </div>
                                <div class="btn-left w10">
                                <div class="searchBox">
                                    <div class=" search-right" @click="submit('form')">
                                        <Button shape="circle" icon="ios-search" type="primary">搜索</Button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </Form>
                    </div>
                    <div id="mapContainer">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        type: "word"
      },
      province: null,
      city: null,
      area: null,
      signName: null,
      id: null,
      signAddress: null,
      signLocate: null,
      locate: []
    };
  },
  computed: {},
  created() {
    if (Object.keys(this.$route.query).length) {
      this.locate = this.$route.query.signLocate.split(",").reverse();
      let {
        province,
        city,
        area,
        signName,
        signLocate,
        signAddress,
        id
      } = this.$route.query;
      this.province = province;
      this.city = city;
      this.area = area;
      this.signName = signName;
      this.signLocate = signLocate;
      this.signAddress = signAddress;
      this.id = id;
    }
  },
  mounted() {
    this.mapInit(this.locate);
  },
  filters: {},
  methods: {
    submit() {
      if (!this.formData.areaName) {
        this.$Message.info("请输入检索条件");
        return false;
      }
      let data = {};
      data["areaName"] = this.formData.areaName;
      if (this.formData.type == "word") {
        this.Global.doPost("cnySign/getLocate.json", data, res => {
          if (res) {
            let locate = res.split(",").reverse();
            this.mapInit(this.locate, locate);
          }
        });
      } else {
        let locate = this.formData.areaName.split(",").reverse();
        this.mapInit(this.locate, locate);
      }
    },
    addressPass() {
      if (!this.signLocate) {
        this.$Message.info("没有经纬度");
        return false;
      }
      let data = {};
      data["id"] = this.id;
      data["signLocate"] = this.signLocate;
      this.Global.doPost(
        "cnySign/updateSignLocateOfSuccess.json",
        data,
        res => {
          this.$Message.success("操作成功");
          setTimeout(() => {
            this.$router.push({
              path: "/checkLocationMaintenance"
            });
          }, 1000);
        }
      );
    },
    mapInit(storeLocate, locateList = []) {
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
      if (storeLocate) {
        let pt = new BMap.Point(Number(storeLocate[0]), Number(storeLocate[1]));
        let marker = new BMap.Marker(pt, { icon: myIconGreen });
        map.addOverlay(marker);
      }
      if (locateList && locateList.length) {
        let pt = new BMap.Point(Number(locateList[0]), Number(locateList[1]));
        let marker = new BMap.Marker(pt, { icon: myIconRed });
        map.addOverlay(marker);
      }
      map.centerAndZoom(point, 50);
      map.enableScrollWheelZoom(true);
      map.addEventListener("click", function(e) {
        map.clearOverlays();
        if (locateList && locateList.length) {
          let pt = new BMap.Point(
            Number(storeLocate[0]),
            Number(storeLocate[1])
          );
          let marker = new BMap.Marker(pt, { icon: myIconRed });
          map.addOverlay(marker);
        }
        let position = [e.point.lng, e.point.lat];
        self.signLocate = position.reverse().join();

        let pt = new BMap.Point(Number(e.point.lng), Number(e.point.lat));
        let marker = new BMap.Marker(pt, { icon: myIconGreen });
        map.addOverlay(marker);
        let locate = geocoder.getLocation(e.point, function(rs) {
          //   self.signAddress = rs.address;
          //   self.province = rs.addressComponents.province;
          //   self.city = rs.addressComponents.city;
          //   self.area = rs.addressComponents.district;
        });
      });
    }
  }
};
</script>


