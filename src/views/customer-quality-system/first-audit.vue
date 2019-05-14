//初审
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
  .box {
    .card {
      border: 1px solid #e5e5e5;
      float: left;
      width: 47%;
      height: 445px;
      margin-left: 2%;
      border-radius: 2px;
      margin-bottom: 10px;
    }
  }
}

#goodsStausShow {
  #examine-right {
    margin: 0 auto 10px;
    padding: 14px;
    width: 500px;
    span {
      display: block;
    }
  }
}
.noData {
  text-align: center;
  line-height: 100px;
}
.numColor {
  color: @primary-color;
}
.ivu-modal-footer {
  border: none !important;
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title"">初审</h2> -->
    <div class="main-container">
      <div class="box">
        <Form ref="form" :model="formData" :label-width="10">
          <div class="container">
            <div class="btn-left w18">
              <Form-item>
                <data-range placeholder="上传开始时间" hour="00:00" v-model="formData.queryStartTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <data-range hour="24:00" placeholder="上传结束时间" v-model="formData.queryEndTime"></data-range>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="brandId">
                <Select v-model="formData.brandId" placeholder="品牌名称*" @on-change="changeValue">
                  <Option
                    :value="item.brandId"
                    v-for="(item,index) in brandList"
                    :key="item.brandId"
                  >{{ item.brandName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item>
                <Select v-model="formData.groupId" placeholder="活动名称*" @on-change="getActivityList">
                  <Option
                    :value="item.groupId"
                    v-for="(item,index) in groupList"
                    :key="item.groupId"
                  >{{ item.groupName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w18">
              <Form-item prop="activityId">
                <Select
                  v-model="formData.activityId"
                  placeholder="项目*"
                  @on-change="getpresentList"
                  clearable
                >
                  <Option
                    :value="item.activityId"
                    v-for="(item,index) in activityList"
                    :key="item.activityId"
                  >{{ item.activityName }}</Option>
                </Select>
              </Form-item>
            </div>
            <div class="btn-left w10">
              <div class="searchBox">
                <div class="btn-left search-left" @click="showQuery=!showQuery">
                  <button type="button">
                    {{showQuery?'收起':'更多'}}
                    <i-icon
                      type="ios-arrow-down"
                      size="14"
                      style="margin-top:-2px;"
                      v-if="!showQuery"
                    />
                    <i-icon type="ios-arrow-up" size="14" style="margin-top:-2px;" v-else/>
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
                    <Option
                      :value="item.presentId"
                      v-for="(item,index) in presentNameList"
                      :key="item.presentId"
                    >{{ item.presentName }}</Option>
                  </Select>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.joinCode" placeholder="客户编号" clearable></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.id" placeholder="图像编号" clearable></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item>
                  <Input v-model.trim="formData.salesRoute" placeholder="销售路线" clearable></Input>
                </Form-item>
              </div>
              <div class="btn-left w18">
                <Form-item prop="activityId">
                  <Select v-model="formData.defer" placeholder="状态" clearable>
                    <Option value="all">全部</Option>
                    <Option value="0">初审</Option>
                    <Option value="1">暂缓</Option>
                  </Select>
                </Form-item>
              </div>
            </div>
          </transition>
        </Form>
      </div>
      <div
        class="box clear container"
        style="width:100%;padding-top:30px;"
        v-if="storeGoodsList && storeGoodsList.length"
      >
        <p style="padding-left:10px;margin-bottom:10px;">
          待处理记录
          <span class="numColor">{{ allNum }},</span>
          有
          <span class="numColor">{{ deferNum }}</span>
          条暂缓
        </p>
        <div class="card" v-for="(item,index) in storeGoodsList" :key="index">
          <audit-item
            @radioChange="radioChange"
            :itemData="item"
            :showList="showList"
            :position="getPosition(index)"
            :index="index"
            showReprieve
            @lookDetail="lookDetail"
            @save="save"
          ></audit-item>
        </div>
      </div>
      <no-data v-else :noneStatus="noneStatus"/>
    </div>
    <!-- 审核意见 -->
    <Modal
      v-model="goodsStausShow"
      width="600"
      id="goodsStausShow"
      style="position:relative;z-index:1000000;"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <span>{{formItem.storeName}}</span>
      </p>
      <div>
        <Form :model="formItem" :label-width="60">
          <FormItem label="状态:">
            <RadioGroup v-model="formItem.checkStatus" @on-change="handleIsPass">
              <Radio :label="1">通过</Radio>
              <Radio :label="2">不通过</Radio>
              <Radio v-if="formItem.isBack == 0" :label="3">退回</Radio>
            </RadioGroup>
          </FormItem>

          <div id="examine-right" v-show="!activityIsPass">
            <span style="color:#ff8a34">可输入原因,并反馈给门店</span>
            <Input v-model="checkMessage" style="width:220px" placeholder="请输入原因"></Input>
          </div>
          <div id="examine-right" v-show="activityIsPass">
            <span style="color:#ff8a34">输入不通过的原因,并反馈给门店，要求重新提交</span>
            <FormItem label="审核意见:" :label-width="70">
              <Input @on-change="wordFilter" v-model="checkMessage"></Input>
            </FormItem>
            <RadioGroup v-model="checkMessage" vertical class="radio">
              <Radio
                v-if="i < 10"
                v-for="(val,i) in displayExamineWordList"
                :key="i"
                :label="val.content"
              >{{val.content}}</Radio>
            </RadioGroup>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button type="success" @click="handleCloseModal">返回</Button>
        <Button type="warning" @click="saveEditStatus">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import dataRange from "@/components/data-range/data-range.vue";
import noData from "@/components/NoData/no-data.vue";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import auditItem from "@/components/auditItem/audit-item.vue";
export default {
  name: "first-audit-keepAlive",
  components: {
    dataRange,
    auditItem,
    noData
  },
  data() {
    return {
      deferNum: 0,
      noneStatus: false,
      showList: [
        {
          title: "提交时间",
          key: "submitTime"
        },
        {
          title: "图像编号",
          key: "id"
        },
        {
          title: "项目名称",
          key: "activityName"
        },
        {
          title: "活动分组",
          key: "presentName"
        },
        {
          title: "预警",
          key: "storeRange",
          type: "门头照"
        },
        {
          title: "渠道",
          key: "bapChannel"
        }
      ],
      displayExamineWordList: [],
      index: null,
      showQuery: false,
      groupList: [], //活动包名
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
        joinCode: "",
        salesRoute: "",
        defer: "all"
      },
      brandList: [],
      activityList: [],
      storeGoodsList: null,
      goodsStausShow: false,
      formItem: {
        storeName: "",
        checkStatus: ""
      },
      presentNameList: [],
      checkMessage: "",
      activityIsPass: false,
      page: 1,
      pageSize: 10,
      pageNum: 0,
      wordList: [],
      allNum: 0
    };
  },
  created() {
    //查询品牌
    this.queryBrand();
  },
  mounted() {},
  watch: {
    goodsStausShow(val) {
      //模态框关闭，清空
      if (val == false) {
        this.checkMessage = "";
      }
    }
  },
  methods: {
    queryBrand() {
      this.Global.doPostNoLoading("audit/queryBrandByTeam.json", "1", res => {
        this.brandList = res;
        if (res && res.length) {
          this.$set(this.formData, "brandId", res[0].brandId);
          this.changeValue(this.formData.brandId);
        }
      });
    },
    //根据品牌获取活动
    changeValue(value) {
      this.groupList = [];
      this.formData.groupId = "";
      if (!value) return;
      this.Global.doPostNoLoading(
        "audit/queryGroupByBrandAndTeam.json",
        value,
        res => {
          this.groupList = res;
          if (this.groupList && this.groupList.length) {
            this.formData.groupId = this.groupList[0].groupId;
            this.getActivityList(this.formData.groupId);
          }
        }
      );
    },
    //根据活动获取项目
    getActivityList(val) {
      this.activityList = [];
      this.formData.activityId = "";
      if (!val) return;
      //查询活动
      this.Global.doPostNoLoading(
        "audit/queryActivityByBrandAndTeam.json",
        val,
        res => {
          this.activityList = res;
          if (res && res.length) {
            this.formData.activityId = res[0].activityId;
            this.getpresentList(this.formData.activityId);
          }
        }
      );
    },
    //根据项目获取分组
    getpresentList(value) {
      this.presentNameList = [];
      this.$set(this.formData, "presentId", "");
      if (!value) return;
      this.Global.doPostNoLoading(
        "audit/queryPresentByActivityAndTeam.json",
        value,
        res => {
          this.presentNameList = res;
        }
      );
    },
    //审核状态变化
    radioChange(obj) {
      let { index, val } = obj;
      this.index = index;

      this.formItem.checkStatus = val;
      this.displayExamineWordList = [];

      if (val != 1) {
        let { brandId, groupId, presentId, isBack } = this.storeGoodsList[
          index
        ];
        this.formItem.isBack = isBack;
        this.wordList = this.getDisplayExamineWord(brandId, groupId, presentId);
        this.goodsStausShow = true;
        this.activityIsPass = true;
      }
    },
    //获取审核话术
    getDisplayExamineWord(brandId, groupId, presentId) {
      this.wordList = [];
      this.displayExamineWordList = [];
      this.Global.doPost(
        "displayYxtg/queryAuditReason.json",
        { brandId, groupId, presentId },
        res => {
          if (res && res.length) {
            this.wordList = res;
            this.displayExamineWordList = JSON.parse(
              JSON.stringify(this.wordList)
            );
          }
        }
      );
    },
    //状态过滤
    wordFilter(e) {
      let val = e.target.value;
      if (!val) {
        this.displayExamineWordList = JSON.parse(JSON.stringify(this.wordList));
        return false;
      }
      this.displayExamineWordList = this.wordList.filter(item => {
        return item.content.indexOf(val) != -1;
      });
    },
    //查询
    submit(name) {
      this.page = 1;
      this.init();
    },
    init() {
      if (!this.formData.groupId) {
        this.$Message.error("活动包不能为空");
        return;
      }
      if (!this.formData.activityId) {
        this.$Message.error("项目不能为空");
        return;
      }
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["currentPage"] = 1;
      data["pageSize"] = this.pageSize;
      if (this.formData.defer == "all") {
        delete data["defer"];
      }
      this.Global.doPost("audit/queryFirstVideo.json", data, res => {
        this.noneStatus = true;
        this.allNum = res.items;
        this.storeGoodsList = res.datalist;
        this.deferNum = res.itemsPerPage;
        if (res.datalist && res.datalist.length) {
          res.datalist.forEach(item => {
            let imageList = [];
            if (item.image) {
              imageList = item.image.filter(val => val);
            }
            item.submitTime = new Date(item.submitTime).pattern(
              "yyyy-MM-dd hh:mm:ss"
            );
            item.storeRange = item.storeRange > 200 ? "位置偏移" : "无";
            item.imageList = imageList;
            item.checkProject = {};
            item.len = 0;

            let firstImageList = [];
            if (item.firstRadio) {
              if (item.firstRadio.image) {
                firstImageList = item.firstRadio.image.filter(val => val);
              }
            }
            item.firstImageList = firstImageList;

            if (item.fileType == "radio") {
              item.imageOneUrl = item.firstRadio
                ? item.firstRadio.radioUrl
                : "";
              item.imageTwoUrl = item.radioUrl;
            } else {
              item.imageOneUrl = item.firstRadio ? item.firstRadio.image : [];
              item.imageTwoUrl = item.image;
            }

            item.showBack =
              !item.firstTwoBatchMessage && !item.secondBatchMessage
                ? false
                : true;
            if (item.showBack) {
              let backMessage = "";
              if (item.firstTwoBatchMessage) {
                backMessage += `复：${item.firstTwoBatchMessage}`;
              }
              if (item.secondBatchMessage) {
                if (item.firstTwoBatchMessage) {
                  backMessage += "|";
                }
                backMessage += `质：${item.secondBatchMessage}`;
              }
              item.backMessage = backMessage;
            } else {
              item.backMessage = "";
            }
          });
        }
        this.pageNum = res.items;
      });
    },
    //获取tooltip的位置
    getPosition(index) {
      if (!index) return "right";
      if (index % 2 == 0) return "right";
      else return "left";
    },
    //查看详情
    lookDetail(val) {
      let { id, activityId, storeId } = val;
      let queryParams = {
        id,
        activityId,
        storeId
      };
      queryParams = this.Global.JsonChange(queryParams);
      queryParams["displayActCategory"] = "singleOne";
      this.Global.deleteEmptyProperty(queryParams);
      this.$router.push({
        path: "/auditDetail",
        query: queryParams
      });
    },
    //弹窗保存
    saveEditStatus() {
      if (!this.formItem.checkStatus) {
        this.$Message.warning("请选择审核状态");
        return false;
      }
      if (this.formItem.checkStatus != 1 && !this.checkMessage) {
        this.$Message.warning("请选择不通过的原因");
        return false;
      }
      if (this.formItem.checkStatus == 2 || this.formItem.checkStatus == 3) {
        //不通过、退回
        this.storeGoodsList[this.index].checkMessage = this.checkMessage;
      }
      this.storeGoodsList[this.index].status = this.formItem.checkStatus;

      this.goodsStausShow = false;
      this.formItem = {};
    },
    //关闭弹窗
    handleCloseModal() {
      this.goodsStausShow = false;
      this.formItem = {};
    },
    handleIsPass(val) {
      this.activityIsPass = val == 1 ? false : true;
    },
    //保存
    save(obj) {
      let { item, index } = obj;
      let { defer } = item;
      //暂缓
      if (defer == 1) {
        let data = { id: item.id };
        this.Global.doPost("audit/updateVideoDefer.json", data, res => {
          this.$Message.success("暂缓成功");
          if (this.formData.defer == 0) {
            //当选择的状态为初审时，删除
            this.storeGoodsList.splice(index, 1);
          }
        });
      } else {
        //正常的审核流程
        let statusC = item.status;
        if (!statusC) {
          this.$Message.error("请选择审核状态");
          return false;
        }
        var params = {
          id: item.id,
          brandId: item.brandId,
          groupId: item.groupId,
          activityId: item.activityId,
          checkMessage: item.checkMessage,
          checkStatus: statusC,
          memo: item.memo
        };
        if (statusC == 2 || statusC == 3) {
          if (!item.checkMessage) {
            this.$Message.error("请输入审核意见");
            return false;
          }
        } else {
          delete params["checkMessage"];
        }
        this.Global.doPost("audit/doVideoFirstAudit.json", params, res => {
          this.storeGoodsList.splice(index, 1);
          this.goodsStausShow = false;
          this.$Message.success("保存成功");
          this.formItem.status = "";
          if (this.storeGoodsList.length == 0) {
            this.init();
          }
        });
      }
    }
  }
};
</script>