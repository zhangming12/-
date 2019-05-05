<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  height: 400px;
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  padding-bottom: 0;
  background: #fff;
  overflow: hidden;
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

#imgBox {
  height: 120px;
  display: table;
  line-height: 120px;
  span {
    display: inline-block;
    width: 80px;
  }
  .changeImg {
    width: 150px;
    height: 120px;
    display: table-cell;
    vertical-align: middle;
    transform: translateX(20px);
    border: 1px solid #efefef;
    img {
      //width: 100%;
      width: 150px;
      height: 120px;
      display: block;
    }
  }
  p {
    display: inline-block;
  }
}

footer {
  text-align: center;
  margin: 40px 0 20px;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">修改</h2> -->
    <div class="box">
      <Form ref="form" :model="formData" :label-width="88">
        <Row>
          <Col span="10">
            <Form-item label="店铺名称" prop="storeName">
              <Input v-model="formData.storeName" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item label="省市区">
              <!-- <div @click='handleshowTree' class='area'>{{areaName}}</div> -->
              <div
                class="area"
                v-if="isAreaShow"
                @click="showCascader"
              >{{AreaProvince}}/{{AreaCity}}/{{AreaArea}}</div>
              <Cascader
                :data="areaArrayList"
                v-else
                v-model="formData.areaCode"
                :load-data="loadData"
                change-on-select
              ></Cascader>
            </Form-item>
          </Col>
          <Col span="10" offset="1">
            <Form-item label="姓名">
              <Input v-model="formData.name" placeholder="请输入..."></Input>
            </Form-item>
            <Form-item label="地址">
              <Input v-model="formData.address"></Input>
            </Form-item>
          </Col>
        </Row>
      </Form>
      <footer>
        <Button type="primary" @click="goBack">返回</Button>
        <Button type="success" @click="submit('form')" style="margin-left:24px">保存</Button>
      </footer>
    </div>
    <!-- 省市区三级联动组件 -->
    <!-- <city-select :formAreaCode="formAreaCode" :isShowTree="isShowTree" 
    @sendCityTreeCode="sendCityTreeCode" @sendCityTreeStatus="sendCityTreeStatus"></city-select>-->
  </div>
</template>

<script>
function filterCity(arrayList) {
  let areaArrayList = [];
  for (var value of arrayList) {
    let item = {
      value: value.id,
      label: value.areaName,
      loading: false,
      level: value.level,
      children: []
    };
    areaArrayList.push(item);
  }
  return areaArrayList;
}
function filterArea(arrayList) {
  let areaArrayList = [];
  for (var value of arrayList) {
    let item = {
      value: value.id,
      label: value.areaName,
      level: value.level
    };
    areaArrayList.push(item);
  }
  return areaArrayList;
}
import PROJECT_CONFIG from "@/util/config.js";
import citySelect from "@/components/city-select-tree.vue";
import { doQueryProvinceCityAll } from "@/api/common.js";
export default {
  name: "customer-information-edit-keepAlive",

  components: {
    citySelect
  },
  data() {
    return {
      formData: {
        storeName: "",
        name: "",
        areaCode: [],
        address: "",
        storeId: null
      },
      areaData: [],
      isShowTree: false, //省市区三级树
      areaArrayList: [],
      formAreaCode: "",
      isAreaShow: true,
      AreaProvince: null,
      AreaCity: null,
      AreaArea: null
    };
  },
  created() {
    let {
      userId,
      storeName,
      nickName,
      address,
      areaCode,
      province,
      city,
      area
    } = this.$route.query;
    this.formData = {
      storeId: userId,
      storeName: storeName,
      name: nickName,
      address: address,
      storeName: storeName
    };

    this.AreaProvince = province;
    this.AreaCity = city;
    this.AreaArea = area;
    let AreaCode = areaCode;
    let provinceCode = areaCode.slice(0, 2) + "0000";
    let cityCode = areaCode.slice(0, 4) + "00";
    doQueryProvinceCityAll(1)
      .then(res => {
        if (res.status == 1) {
          let arrayList = res.data;
          let areaArrayList = [];
          for (var value of arrayList) {
            let item = {
              value: value.id,
              label: value.areaName,
              loading: false,
              level: value.level,
              children: []
            };
            areaArrayList.push(item);
          }
          this.areaArrayList = areaArrayList;
        }
      })
      .then(() => {
        doQueryProvinceCityAll(null, provinceCode).then(res => {
          let filterAreas = filterCity(res.data);
          let areaArrayList = this.areaArrayList;
          for (var i = 0; i < areaArrayList.length; i++) {
            if (areaArrayList[i].value == provinceCode) {
              areaArrayList[i].children = filterAreas;
            }
          }
        });
      })
      .then(() => {
        doQueryProvinceCityAll(null, cityCode).then(res => {
          let filterAreas = filterArea(res.data);
          let areaArrayList = this.areaArrayList;
          for (var i = 0; i < areaArrayList.length; i++) {
            if (areaArrayList[i].value == provinceCode) {
              for (var j = 0; j < areaArrayList[i].children.length; j++) {
                if (areaArrayList[i].children[j].value == cityCode) {
                  areaArrayList[i].children[j].children = filterAreas;
                }
              }
            }
          }
          this.formData.areaCode = [provinceCode, cityCode, AreaCode];
        });
      });
  },
  methods: {
    showCascader() {
      this.isAreaShow = false;
    },
    activityDetail(id) {
      var newDate = new Date();
      if (id) {
        this.Global.doPost("goodsInfo/getGoodsInfo.json", id, res => {
          this.formData["name"] = res.name;
          this.formData["memo"] = res.memo;
          this.formData["startTime"] = newDate.setTime(res.startTime);
          this.formData["endTime"] = newDate.setTime(res.endTime);
          this.notifyImg = res.url;
        });
      } else {
        this.$Message.error("请在活动列表重新选择");
      }
    },
    submit: function(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);

      this.Global.deleteEmptyProperty(data);
      this.Global.doPost("store/modifyStoreInfo.json", data, res => {
        this.$router.push("/customerInformate");
      });
    },
    goBack: function() {
      this.$router.back();
    },
    loadData(item, callback) {
      //第二个参数为回调，如果执行，则会自动展开当前项的子列表。
      //区级不能设置loading: false,
      item.loading = true;
      if (item.level == 2) {
        doQueryProvinceCityAll(null, item.value).then(res => {
          if (res.status == 1) {
            let arrayList = res.data;
            let areaArrayList = [];
            for (var value of arrayList) {
              let item = {
                value: value.id,
                label: value.areaName,
                level: value.level
              };
              areaArrayList.push(item);
            }
            item.children = areaArrayList;
            item.loading = false;
            callback();
          }
        });
      } else if (item.level == 1) {
        doQueryProvinceCityAll(null, item.value).then(res => {
          if (res.status == 1) {
            let arrayList = res.data;
            let areaArrayList = [];
            for (var value of arrayList) {
              let item = {
                value: value.id,
                label: value.areaName,
                loading: false,
                level: value.level,
                children: []
              };
              areaArrayList.push(item);
            }
            item.children = areaArrayList;
            item.loading = false;
            callback();
          }
        });
      }
    }
  }
};
</script>


