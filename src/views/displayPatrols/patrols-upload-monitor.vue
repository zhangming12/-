<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  background: #fff;
}
//搜索条件 时间控件
.ivu-date-picker {
  display: block;
}
.export {
  overflow: hidden;
  button {
    float: right;
    padding: 5px 15px;
    margin-left: 10px;
  }
}
//店铺商品详情
#storeGoodsInfor {
  margin-top: 15px;
  .storeGoods {
    height: 290px;
    .goodsOperator {
      overflow: hidden;
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
      display: flex;
      flex-direction: row;
      .showVideoPlay {
        // height: 200px;
        height: 213px;
        position: relative;
        // float: left;
        // width: 48%;
        // video {
        //   width: 100%;
        //   height: 100%;
        // }
        width: 250px;
        video {
          width: 250px;
          height: 213px;
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
          // &:hover{
          //     opacity: 1;
          // }
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
        // float: right;
        // width: 48%;
        flex: 1;
        padding-left: 10px;
        p {
          margin-bottom: 0;
        }
      }
    }
  }
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
.w36 {
  width: 35%;
}
.auditImg {
  display: block;
  width: 240px;
  height: 200px;
}
.card {
  float: left;
  width: 47%;
  margin-left: 2%;
  margin-bottom: 10px;
  height: 290px;
}
.pictureBox {
  display: flex;
  justify-content: center;
  img {
    display: block;
    max-width: 780px;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">巡拍上传监控</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item prop="brandId" required>
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
              <Form-item prop="brandId" required>
                <Select v-model="formData.merchantId" placeholder="经销商" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in distributorList"
                    :key="index"
                  >{{ item.merchantName }}</Option>
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
                  placeholder="项目名称"
                  @on-change="getpresentList"
                  @on-clear="getpresentList"
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
              <Form-item prop="presentId">
                <Select v-model="formData.presentId" placeholder="子活动分组" clearable>
                  <Option
                    :value="item.id"
                    v-for="(item,index) in presentNameList"
                    :key="index"
                  >{{ item.activityTag }}</Option>
                </Select>
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
          <transition name="fade" v-if="showQuery">
            <div class="container">
              <div class="btn-left w18">
                <Form-item>
                  <DatePicker
                    v-model="formData.queryTime"
                    type="datetimerange"
                    format="yyyy-MM-dd"
                    placeholder="上传时间"
                  ></DatePicker>
                </Form-item>
              </div>
              <!-- <div class="btn-left w18">
                    <Form-item>
                          <Input v-model.trim="formData.userId" placeholder="配送员ID" ></Input>
                    </Form-item>
              </div>-->
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.userName" placeholder="配送员姓名"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeId" placeholder="门店ID"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.storeName" placeholder="门店名称"></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.id" placeholder="陈列视频ID"></Input>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div class="box" style="margin-top: 15px;padding-bottom:20px;overflow:hidden;">
        <div id="storeGoodsInfor" v-if="storeGoodsList && storeGoodsList.length">
          <CheckboxGroup v-model="social">
            <div class="card" v-for="(item, index) in storeGoodsList" :key="index">
              <div class="storeGoods">
                <div class="goodsOperator">
                  <div class="operator-l">
                    <!-- <Checkbox :label="item.id">                                
                                    <span>状态:</span>
                    </Checkbox>-->
                    <!-- colorSuccess colorError colorPrimary -->
                    <span
                      :class="{ 'colorPrimary': item.checkStatus == 1 , 
                                                'colorError': item.checkStatus == 2 , 
                                                'colorBack': item.checkStatus == 3,
                                                'colorSuccess': item.checkStatus == 4}"
                    >{{ item.checkStatus | displayCheckStatusFilters}}</span>
                  </div>
                  <div class="operator-r">
                    <Button type="primary" @click="handleLookDetail(item)">查看详情</Button>
                  </div>
                </div>
                <Card>
                  <div class="goodsDetail">
                    <div class="showVideoPlay" v-if="item.fileType == 'radio'">
                      <video :src="item.radioUrl" controls></video>
                      <!-- <img class="auditImg" :src="item.radioUrl" :ref='"playVideo" + index' @click="showBigPicure(item.radioUrl)" />  -->
                    </div>
                    <div class="showVideoPlay" v-else>
                      <imageLook
                        :key="item.image[0]"
                        :position="getPosition(index)"
                        v-if="item.image.length"
                        :imageList="item.image"
                      />
                    </div>
                    <div class="goodsInfor">
                      <P>上传时间：{{item.uploadTime | formatYearMonth}}</P>
                      <P>陈列周期：{{item.startTime |formatYearMonth }}至 {{item.endTime | formatYearMonth }}</P>
                      <P>陈列活动：{{item.activityName}}</P>
                      <P class="displayGroupPrimary">活动分组：{{item.activityTag}}</P>
                      <P>配送员姓名：{{item.workerName}}</P>
                      <P>配送员手机：{{item.workerPhone}}</P>
                      <P>门店ID：{{item.storeId}}</P>
                      <P>经销商名称：{{item.merchantName}}</P>
                      <P>门店名称：{{item.storeName}}</P>
                      <P>备注：{{item.memo}}</P>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </CheckboxGroup>
        </div>
        <div v-else style="text-align: center;">暂无数据</div>
      </div>
      <div class="page-box">
        <div style="float: right;">
          <Page :total="pageNum" :current="page" @on-change="changePage"></Page>
        </div>
      </div>
    </div>
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
import dataRange from "@/components/data-rang.vue";
import {
  queryActivityPresentVOByactivityId //根据活动ID获取陈列活动分组列表
} from "@/api/common.js";
import imageLook from "@/components/imgLook/img-look.vue";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,

} from "@/util/index.js"; //搜索条件默认时间
import { displayParketCheckStatus } from "@/util/ENUMS.js";

export default {
  name: "patrols-upload-monitor-keepAlive",
  data() {
    return {
      groupList: [],
      showQuery: false,

      distributorList: [],
      formData: {
        queryTime: [EDFAULT_STARTTIME, EDFAULT_ENDTIME],
        brandId: "",
        activityId: "",
        groupId: "",
        storeId: ""
      },
      presentNameList: [],
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
      pictureUrl: "",
      showPicture: false,
      checkMessage: "",
      activityIsPass: false,
      refuseReason: "",
      page: 1,
      pageSize: 10,
      pageNum: 0
    };
  },
  components: { dataRange, imageLook },
  created() {
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { date: 7, scope: "a", activityType: 6 },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.formData.brandId = this.brandList[0].id;
          this.changeValue(this.formData.brandId);
        }
      }
    );
  },
  methods: {
    getPosition(index) {
      if (!index) return "right";
      if (index % 2 == 0) return "right";
      else return "left";
    },
    getpresentList(value) {
      this.presentNameList = [];
      this.formData.presentId = "";
      this.$set(this.formData, "presentId", null);
      if (!value) return;
      queryActivityPresentVOByactivityId(value).then(res => {
        if (res && res.status == 1) {
          this.presentNameList = res.data;
        }
      });
    },
    showBigPicure(url) {
      this.pictureUrl = url;
      this.showPicture = true;
    },
    //查询经销商数据
    getDistributorList(brandId) {
      this.distributorList = [];
      this.Global.doPost(
        "dealers/doQueryMerchantByBrandId.json",
        { brandId },
        res => {
          if (res.length) {
            this.distributorList = res;
          }
        }
      );
    },
    changeValue(value) {
      this.distributorList = [];
      this.formData.merchantId = "";
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      //查询经销商数据
      this.getDistributorList(value);
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
    submit(name) {
      if (!this.formData.queryTime[0]) {
        this.$Message.error("请输入查询起始时间");
        return false;
      }

      if (!this.formData.queryTime[1]) {
        this.$Message.error("请输入查询截止时间");
        return false;
      }
      this.page = 1;
      this.init(this.page, 10);
    },
    getActivityList(value) {
      this.activityList = [];
      this.formData.activityId = "";
      this.formData.presentId = "";
      this.presentNameList = [];
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
    changePage(size) {
      this.page = size;
      this.init();
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      data["queryStartTime"] = this.Global.createTime(
        this.formData.queryTime[0]
      );
      data["queryEndTime"] = this.Global.createTime(this.formData.queryTime[1]);

      this.Global.deleteEmptyProperty(data);
      delete data["queryTime"];
      data["currentPage"] = this.page;
      data["pageSize"] = this.pageSize;
      this.Global.doPost("patrol/uploadMonitor.json", data, res => {
        this.storeGoodsList = res.datalist;
        this.pageNum = res.items;
        this.page = res.page;
      });
    },
    handleLookDetail(val) {
      let { id, activityId, storeId } = val;
      let queryParams = {
        id,
        activityId,
        storeId,
        displayActCategory: "partake"
      };
      this.$router.push({ path: "/auditDetailPatrols", query: queryParams });
    }
  },
  filters: {
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
    displayCheckStatusFilters(val) {
      return displayParketCheckStatus[val];
    }
  }
};
</script>