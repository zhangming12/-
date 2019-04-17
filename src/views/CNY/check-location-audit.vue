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
    .left,
    .right {
      //   display: inline-block;
      float: left;
      height: 100%;
    }
    .left {
      width: 35%;
      overflow-y: scroll;
      .item {
        border-bottom: 1px solid #e5e5e5;
        cursor: pointer;
        min-height: 60px;
        line-height: 24px;
        padding-bottom: 5px;
        border-radius: 4px;
        padding-left: 8px;
        &.active {
          background-color: gray;
          color: white;
        }
      }
      .else {
        text-align: center;
        line-height: 32px;
        color: #999;
      }
    }
    .right {
      width: 64%;
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
</style>

<template>
    <div id="Main">
        <div class="main-container">
            <div class="box">
                <div class="left">
                    <Tabs value="name1">
                        <TabPane :label="addressLabel" name="name1">
                            <template v-if="addressData && addressData.length">
                                <div class="item" :class="{'active' : item.active}" @click="itemClick('address',item,index)" v-for="(item,index) in addressData" :key="index">
                                    <Row>
                                        <Col span="12">
                                            {{ item.signName }}
                                        </Col>
                                        <Col span="12">
                                            {{ item.province }}{{ item.city }}{{ item.area }}
                                        </Col>
                                        <Col span="24">
                                            {{ item.signAddress }}
                                        </Col>
                                        <Col span="20">
                                            {{ item.signLocate | locateFilter }}
                                        </Col>
                                        <Col span="4">
                                            <Button type="success" size="small" @click.stop="addressPass('address',item,index)">通过</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </template>
                            <div class="else" v-else>
                                暂无数据
                            </div>
                        </TabPane>
                        <TabPane :label="nameLabel" name="name2">
                            <template v-if="nameData && nameData.length">
                                <div class="item" :class="{'active' : item.active}" @click="itemClick('name',item,index)" v-for="(item,index) in nameData" :key="index">
                                    <Row>
                                        <Col span="12">
                                            {{ item.signName }}
                                        </Col>
                                        <Col span="12">
                                            {{ item.province }}{{ item.city }}{{ item.area }}
                                        </Col>
                                        <Col span="24">
                                            {{ item.signAddress }}
                                        </Col>
                                        <Col span="20">
                                            {{ item.signLocate | locateFilter }}
                                        </Col>
                                        <Col span="4">
                                            <Button type="success" size="small" @click.stop="addressPass('address',item,index)">通过</Button>
                                        </Col>
                                    </Row>
                                </div>
                            </template>
                            <div class="else" v-else>
                                暂无数据
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <div class="right">
                    <div class="search-box">
                        <Form ref="form" :model="formData" :label-width="10">
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
      brandId: null,
      namePosition: 0,
      addressPostion: 0,
      addressData: [],
      index: 0,
      type: "address",
      nameData: []
    };
  },
  computed: {
    addressLabel() {
      return h => {
        return h("div", [
          h("span", "地址定位"),
          h("Badge", {
            props: {
              count: this.addressPostion,
              overflowCount: 10000
            }
          })
        ]);
      };
    },
    nameLabel() {
      return h => {
        return h("div", [
          h("span", "名称定位"),
          h("Badge", {
            props: {
              count: this.namePosition,
              overflowCount: 10000
            }
          })
        ]);
      };
    }
  },
  created() {
    if (Object.keys(this.$route.query).length) {
      this.brandId = this.$route.query.brandId;
    }
  },
  mounted() {
    this.init();
  },
  filters: {
    locateFilter(val) {
      if (!val) return "无定位";
      return val;
    }
  },
  methods: {
    init() {
      let data = {
        brandId: this.brandId
      };
      this.Global.doPost(
        "cnySign/queryWaitingCheckSignLocate.json",
        data,
        res => {
          this.addressPostion = res.addressNum;
          this.namePosition = res.signNameNum;
          this.nameData = res.signName;
          this.addressData = res.address;
          if (this.addressData.length) {
            this.itemClick(this.type, this.addressData[this.index], this.index);
          }
        }
      );
    },
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
            if (this.type == "address") {
              if (this.addressData[this.index].signLocate) {
                let store = this.addressData[this.index].signLocate
                  .split(",")
                  .reverse();
                this.mapInit(store, locate);
              }
            } else {
              this.mapInit(locate);
            }
          }
        });
      } else {
        let locate = this.formData.areaName.split(",").reverse();
        if (this.type == "address") {
          if (this.addressData[this.index].signLocate) {
            let store = this.addressData[this.index].signLocate
              .split(",")
              .reverse();
            this.mapInit(store, locate);
          }
        } else {
          this.mapInit([116.23, 39.54], locate);
        }
      }
    },
    itemClick(type, item, index) {
      this.index = index;
      this.type = type;
      this.getActiveItem();
      item.active = true;
      this.$set(item, "active", true);
      if (type == "address" && item.signLocate) {
        let locate = item.signLocate.split(",").reverse();
        this.mapInit(locate);
      } else if(type == 'name'){
        if (!item.signLocate) {
          this.mapInit([116.23, 39.54]);
        }else{
          let locate = item.signLocate.split(",").reverse();
          this.mapInit(locate);
        }
      }
    },
    getActiveItem() {
      if (this.addressData && this.addressData.length) {
        this.addressData.forEach(item => {
          this.$set(item, "active", false);
        });
      }
      if (this.nameData && this.nameData.length) {
        this.nameData.forEach(item => {
          this.$set(item, "active", false);
        });
      }
    },
    addressPass(type, item, index) {
      if (!item.signLocate) {
        this.$Message.info("没有经纬度");
        return false;
      }
      let data = {};
      data["id"] = item.id;
      data["signLocate"] = item.signLocate;
      this.Global.doPost("cnySign/checkSignLocate.json", data, res => {
        this.$Message.success("操作成功");
        this.init();
      });
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
        if (self.type == "address") {
          self.addressData[self.index].signLocate = position.reverse().join();
        } else {
          self.nameData[self.index].signLocate = position.reverse().join();
        }

        let pt = new BMap.Point(Number(e.point.lng), Number(e.point.lat));
        let marker = new BMap.Marker(pt, { icon: myIconGreen });
        map.addOverlay(marker);
        let locate = geocoder.getLocation(e.point, function(rs) {
          if (self.type == "address") {
            self.addressData[self.index].signAddress = rs.address;
          } else {
            self.nameData[self.index].signAddress = rs.address;
          }
        });
      });
    }
  }
};
</script>


