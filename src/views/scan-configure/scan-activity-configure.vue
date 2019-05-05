<style lang="less" scoped>
@import "../../config/index.less";
#scan-Main {
  height: 100%;
  .area {
    border-radius: 4px;
    border: 1px solid #dddee1;
    height: 32px;
    padding: 4px 7px;
    line-height: 2;
    cursor: pointer;
    .TextOverflow();
  }
  .main-container {
    position: relative;
    min-height: 100%;
    margin-left: 10px;
    overflow: hidden;
    background: #ffffff;
    padding: 10px 10px;
    .title-box {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      .title {
        font-size: 14px;
        border-left: 3px solid @primary-color;
        padding-left: 8px;
        height: 16px;
        line-height: 16px;
      }
    }
    .tab-box {
      width: 100%;
      box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
      margin: 10px 0 25px;
      padding-top: 10px;
      .tabs-head {
        padding-right: 30px;
        padding-left: 5px;
        height: 32px;
        li {
          cursor: pointer;
          box-sizing: border-box;
          padding: 0 10px;
          text-align: center;
          border-radius: 2px;
          float: left;
          min-width: 100px;
          text-align: center;
          position: relative;
          height: 32px;
          line-height: 32px;
          margin-left: 3px;
          .close {
            position: absolute;
            top: 5px;
            right: 3px;
            cursor: pointer;
          }
          .add-btn {
            cursor: pointer;
            position: absolute;
            top: 3px;
            left: 10px;
          }
        }
        li.color {
          color: @primary-color;
        }
        li.notColor {
          background: #e5e5e5;
        }
        li:not(:last-child):hover {
          background: #e5e5e5;
        }
      }
      .tabs-main {
        width: 100%;
        margin-top: 10px;
        height: 140px;
        transition: all 0.3s;

        .tabs-box {
          transition: all 0.3s;
          height: 130px;
          display: flex;
          flex-direction: row;
          box-sizing: border-box;
          position: relative;
          z-index: 900;
          .tabs-item {
            height: 140px;
            flex: 1;
            padding-right: 20px;
            .present-name {
              display: flex;
              flex-direction: row;
              .colors {
                width: 100px;
                color: @primary-color;
                text-decoration: underline;
                cursor: pointer;
                padding-left: 10px;
              }
            }
          }
        }
      }
    }
    .box {
      position: relative;
      z-index: 0;
      .area-out-box {
        display: flex;
        flex-direction: row;
        .RadioGroup {
          width: 130px;
        }
        .Select {
          width: 150px;
        }
      }
    }
    .scan-box {
      position: relative;
      z-index: 901;
    }
    .scan-box,
    .tabs-item {
      width: 90%;
      .upload-box {
        display: flex;
        position: relative;
        .zhezhao {
          cursor: not-allowed;
          width: 50px;
          height: 50px;
          position: absolute;
          top: -5px;
          left: 0;
        }
        img {
          width: 50px;
          height: 50px;
          transform: translateY(-6px);
        }
        span {
          transform: translateY(3px);
          margin-left: 10px;
        }
      }
    }

    footer {
      display: flex;
      justify-content: flex-end;
      position: absolute;
      bottom: 15px;
      right: 15px;
      button {
        padding: 3px 20px;
        margin-left: 20px;
      }
    }
  }
}
.numberInput {
  border: 1px solid #dddee1;
  width: 100%;
  height: 32px;
  line-height: 32px;
  padding: 0 0 0 7px;
  text-align: left;
  outline: 0;
  -moz-appearance: textfield;
  color: #666;
  border-radius: 4px;
  transition: all 0.2s linear;
  text-align: center;
}
.numberInput::-webkit-input-placeholder {
  color: #c5c8ce;
}
.numberInput[disabled] {
  opacity: 1;
  background: #f3f3f3;
}
.grayDiv {
  background-color: #f3f3f3;
  opacity: 1;
  cursor: not-allowed;
}
</style>

<template>
  <div id="scan-Main">
    <!-- <h2 class="Title">扫码活动配置</h2> -->
    <div class="main-container">
      <!-- 基础设置 -->
      <div class="title-box">
        <h3 class="title">基础设置</h3>
        <saveBtn v-if="type != 'look'" @click.native="saveBaseSetting"/>
      </div>

      <div class="scan-box">
        <Form ref="form1" :model="formData1" :label-width="88" :rules="rule">
          <Row>
            <Col span="6">
              <Form-item label="活动名称:" required>
                <Input
                  :disabled="type == 'look'"
                  v-model="formData1.activityName"
                  placeholder="活动名称"
                />
              </Form-item>

              <Form-item label="page-url:" required>
                <Input
                  :disabled="type == 'look'"
                  v-model="formData1.pageUrl"
                  placeholder="page-url"
                />
              </Form-item>
            </Col>

            <Col span="12">
              <Form-item label="活动时间:" required>
                <Row>
                  <Col span="11">
                    <data-range :dis="type == 'look'" hour="00:00" v-model="formData1.startTime"></data-range>
                  </Col>
                  <Col span="11" offset="1">
                    <data-range
                      placeholder="结束时间"
                      :dis="type == 'look'"
                      hour="24:00"
                      v-model="formData1.endTime"
                    ></data-range>
                  </Col>
                </Row>
              </Form-item>
              <Form-item label="消息通知logo:" :label-width="120" required>
                <div class="upload-box">
                  <Upload
                    action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                    :data="upData"
                    :before-upload="beforeUpload"
                    :on-success="UploadLogoUrl"
                    :show-upload-list="false"
                    :format="['jpg','jpeg','png']"
                    :on-format-error="handleFormatError"
                  >
                    <img :src="formData1.logoUrl " alt v-if="formData1.logoUrl ">
                    <img src="../../assets/image/imgBg.png" alt v-else>
                    <div class="zhezhao" @click.stop.prevent="zhezhaoClick" v-if="type == 'look'"></div>
                  </Upload>
                  <span>(建议尺寸:210*170)</span>
                </div>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="活动区域:" required>
                <!-- <span v-if="areaName">{{areaName}}</span> -->
                <div
                  :class="type == 'look' ? 'grayDiv' : ''"
                  @click="showTree"
                  :title="areaName"
                  class="area"
                >{{areaName}}</div>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </div>

      <!-- 奖项设置 -->
      <div class="title-box">
        <h3 class="title">奖项设置</h3>
        <saveBtn v-if="type != 'look'" @click.native="savePresentsSetting"/>
      </div>
      <div class="tab-box">
        <ul class="tabs-head">
          <li
            :class="index == activeIndex?'color':'notColor'"
            @click="liClick(index)"
            v-for="(item,index) in presentList"
            :key="index"
          >
            <span :title="item.name" class="text-overflow">{{item.name}}</span>
            <Icon
              v-if="type != 'look'"
              class="close"
              @click="deletePresent(index)"
              type="ios-close-circle"
              size="22"
              :color="index == activeIndex?'#ff8a34':'#999'"
            />
          </li>
          <li class="add" v-if="type != 'look'">
            <Icon
              class="add-btn"
              type="md-add-circle"
              @click="addPresent"
              size="25"
              color="#ff8a34"
            />
          </li>
        </ul>
        <div class="tabs-main">
          <div ref="tabsBox" class="tabs-box" :style="styles">
            <div class="tabs-item" v-for="(item,i) in presentList" :key="i + 'input'">
              <Form ref="form2" :model="formData" :label-width="88">
                <Row>
                  <Col span="6">
                    <Form-item label="折扣名称:" required>
                      <Input
                        :disabled="type == 'look'"
                        v-model="item.activityTag"
                        placeholder="折扣名称"
                      />
                    </Form-item>
                    <Form-item label="中奖概率:" required>
                      <input
                        :disabled="type == 'look'"
                        type="number"
                        placeholder="中奖概率"
                        min="0"
                        max="1"
                        step="0.01"
                        class="numberInput"
                        v-model.number="item.rate"
                      >
                    </Form-item>
                  </Col>
                  <Col span="6">
                    <Form-item label="折扣类别:" required>
                      <Select
                        :disabled="type == 'look' || !activityId"
                        v-model="item.presentType"
                        @on-change="getGoodsList"
                        placeholder="折扣类别*"
                      >
                        <Option value="1">实物奖品</Option>
                        <Option value="2">现金红包</Option>
                        <Option value="0">电子券</Option>
                        <Option value="9">谢谢参与</Option>
                      </Select>
                    </Form-item>
                    <Form-item label="日中奖次数上限:" :label-width="110">
                      <input
                        :disabled="type == 'look'"
                        type="number"
                        placeholder="日中奖次数上限"
                        min="0"
                        class="numberInput"
                        v-model.number="item.dailyLimit"
                      >
                    </Form-item>
                  </Col>
                  <Col span="6">
                    <Form-item label="折扣内容:" required>
                      <div class="present-name">
                        <Select
                          :disabled="type == 'look'"
                          v-if="item.presentType == 0 || item.presentType == 1"
                          v-model="item.goodsName"
                        >
                          <Option
                            :key="item.id"
                            v-for="item in goodsList"
                            :value="item.id"
                          >{{item.name}}</Option>
                        </Select>
                        <input
                          :disabled="type == 'look'"
                          v-else-if="item.presentType == 2"
                          type="number"
                          placeholder="折扣内容"
                          min="0"
                          class="numberInput"
                          v-model.number="item.goodsName"
                        >
                        <Input
                          :disabled="type == 'look'"
                          v-else
                          v-model="item.goodsName"
                          placeholder="折扣内容"
                          name="content"
                        />
                        <div class="colors" @click="setPrize">设置折扣</div>
                      </div>
                    </Form-item>
                    <Form-item label="周中奖次数上限:" :label-width="110">
                      <input
                        :disabled="type == 'look'"
                        type="number"
                        placeholder="周中奖次数上限"
                        min="0"
                        class="numberInput"
                        v-model.number="item.weekLimit"
                      >
                    </Form-item>
                  </Col>
                  <Col span="6">
                    <Form-item label="折扣数量:" required>
                      <input
                        :disabled="type == 'look'"
                        type="number"
                        placeholder="折扣数量"
                        min="0"
                        class="numberInput"
                        v-model.number="item.totalQuantity"
                      >
                    </Form-item>
                    <Form-item label="总中奖次数上限:" :label-width="110">
                      <input
                        :disabled="type == 'look'"
                        type="number"
                        placeholder="总中奖次数上限"
                        min="0"
                        class="numberInput"
                        v-model.number="item.userLimit"
                      >
                    </Form-item>
                  </Col>
                  <Col span="24">
                    <Row>
                      <Col span="12">
                        <Form-item label="中奖消息:" required>
                          <Input
                            :disabled="type == 'look'"
                            v-model="item.notifyContent"
                            :maxlength="25"
                            placeholder="最多25个中文"
                          />
                        </Form-item>
                      </Col>
                      <Col span="6">
                        <Form-item label="折扣有效期:" required>
                          <data-range
                            :dis="type == 'look'"
                            placement="bottom"
                            hour="00:00"
                            v-model="item.endWinTime"
                            start
                          ></data-range>
                        </Form-item>
                      </Col>
                      <Col span="6">
                        <Form-item label="折扣消息logo:" :label-width="120" required>
                          <div class="upload-box">
                            <Upload
                              action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                              :data="upData"
                              :before-upload="beforeUpload2"
                              :on-success="notifyUploadLogoUrl"
                              :show-upload-list="false"
                              :format="['jpg','jpeg','png']"
                              :on-format-error="handleFormatError"
                            >
                              <img :src="item.notifyLogo " alt v-if="item.notifyLogo ">
                              <img src="../../assets/image/imgBg.png" alt v-else>
                              <div
                                class="zhezhao"
                                @click.stop.prevent="zhezhaoClick"
                                v-if="type == 'look'"
                              ></div>
                            </Upload>
                            <span>(建议尺寸:210*170)</span>
                          </div>
                        </Form-item>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>

      <!-- 限制设置 -->
      <div class="title-box">
        <h3 class="title">限制设置</h3>
        <saveBtn v-if="type != 'look'" @click.native="saveLimitSetting"/>
      </div>
      <div class="box">
        <Form ref="form3" :model="formData" :label-width="110" :rules="rule">
          <Row>
            <Col span="6">
              <Form-item label="日活动次数上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="日活动次数上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.daily_limit"
                >
              </Form-item>
              <Form-item label="月活动次数上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="月活动次数上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.month_limit"
                >
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="日活动金额上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="日活动金额上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.daily_amount_limit"
                >
              </Form-item>
              <Form-item label="月活动金额上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="月活动金额上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.month_amount_limit"
                >
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="周活动次数上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="周活动次数上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.week_limit"
                >
              </Form-item>
              <Form-item label="总活动次数上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="总活动次数上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.user_limit"
                >
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="周活动金额上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="周活动金额上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.week_amount_limit"
                >
              </Form-item>
              <Form-item label="总活动金额上限:">
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="总活动金额上限"
                  min="0"
                  class="numberInput"
                  v-model="formData2.user_amount_limit"
                >
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="地理位置扫码限制:" :label-width="126" required>
                <Select
                  @on-change="conficChange"
                  :disabled="type == 'look'"
                  v-model="formData2.confSpec"
                  placeholder="地理位置扫码限制*"
                >
                  <Option value="kong">关闭</Option>
                  <Option value="back">3个位置后回原位置扫码</Option>
                  <Option value="lock">3个位置后锁定账号</Option>
                </Select>
              </Form-item>
            </Col>
            <Col span="6">
              <Form-item label="限制距离(M):" :label-width="110" required>
                <input
                  :disabled="type == 'look'"
                  type="number"
                  placeholder="限制距离"
                  min="0"
                  class="numberInput"
                  v-model="formData2.distance"
                >
              </Form-item>
            </Col>
            <Col span="12">
              <Form-item label="活动区域外扫码:">
                <div class="area-out-box">
                  <RadioGroup
                    :disabled="type == 'look'"
                    @on-change="getPreSentList"
                    class="RadioGroup"
                    v-model="formData2.out_area"
                  >
                    <Radio label="2">不中奖</Radio>
                    <Radio label="1">中奖</Radio>
                  </RadioGroup>
                  <Select
                    class="Select"
                    :disabled="formData2.out_area == 2 || type == 'look'"
                    v-model="formData2.present"
                    placeholder="请选择奖项*"
                  >
                    <Option
                      :value="item.id"
                      v-for="(item,index) in preSentList"
                      :key="index"
                    >{{ item.goodsName }}</Option>
                  </Select>
                </div>
              </Form-item>
            </Col>
          </Row>
        </Form>
      </div>
      <Modal v-model="treeShow" @on-ok="areaList">
        <div style="height: 400px; overflow-y:auto;">
          <div style="height: 400px; overflow-y:auto;">
            <Tree :data="areaData" ref="tree" multiple show-checkbox></Tree>
          </div>
        </div>
      </Modal>
      <!-- 底部按钮 -->
      <footer>
        <Button @click="goBack" type="info">返回</Button>
        <Button v-if="type != 'look'" @click="saveAll" type="primary">保存</Button>
      </footer>
      <fieldNameDes/>
    </div>
  </div>
</template>

<script>
import fieldNameDes from "@/components/field-name-description.vue";
import dataRange from "@/components/data-range/data-range.vue";
import saveBtn from "@/components/Button/save-btn.vue";
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import area from "@/config/areaCode.js";
import {
  EDFAULT_STARTTIME,
  EDFAULT_ENDTIME,
  EDFAULT_END_TIME
} from "@/util/index.js"; //搜索条件默认时间
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  name: "scan-activity-configure",

  data() {
    return {
      activityId: "",
      type: "", //add 新建  look 详情  modify 修改
      id: "", //活动ID
      n: 1,
      hasError: false,
      groupId: "", //活动包ID
      proCodeList: [], //省级行政区code
      preSentList: [], //奖品列表
      formData1: {
        //基础设置数据
        activityId: "",
        activityName: "",
        areaList: [],
        endTime: EDFAULT_ENDTIME,
        startTime: EDFAULT_STARTTIME,
        logoUrl: "",
        pageUrl: "",
        operateType: "" //操作类型
      },
      placement: "top",
      formData2: {
        //限制设置数据
        activityId: "",
        daily_amount_limit: null, //日金额上限
        daily_limit: null, //日上限
        distance: null,
        confSpec: "kong", //位置限制
        month_amount_limit: null, //月金额上限
        month_limit: null, //月上限
        user_amount_limit: null, //总金额上限
        week_amount_limit_group: null, //周金额上限
        week_limit: null, //周上限
        user_limit: null, //总上线
        present: "",
        out_area: "2"
      },
      areaData: area,
      areaName: "",
      activeIndex: 0,
      upData: upData,
      columns1: [],
      groupList: [],
      formData: {
        queryStartTime: EDFAULT_STARTTIME,
        queryEndTime: EDFAULT_ENDTIME,
        brandId: "",
        groupId: "",
        activityId: "",
        logoUrl: ""
      },
      treeShow: false,
      rule: {
        queryStartTime: [{ validator: validateStart }],
        queryEndTime: [{ validator: validateEnd }]
      },
      brandList: [],
      activityList: [],
      presentList: [
        {
          name: "奖项1",
          presentType: "",
          endWinTime: EDFAULT_END_TIME,
          hour: "00:00",
          time: EDFAULT_END_TIME,
          presentType: "",
          rate: null,
          activityTag: "",
          dailyLimit: null,
          goodsName: null,
          weekLimit: null,
          totalQuantity: null,
          userLimit: null,
          notifyContent: "",
          notifyLogo: ""
        }
      ],
      bizAreaList: [],
      brandId: "",
      allsave: false,
      goodsList: [] //奖品列表
    };
  },
  components: {
    dataRange,
    saveBtn,
    fieldNameDes
  },
  computed: {
    styles() {
      let list = this.presentList;
      let n = list.length;
      return {
        width: `${n * 100}%`
      };
    }
  },
  created() {
    this.type = this.$route.query.type;
    this.id = this.$route.query.id;
    this.groupId = this.$route.query.groupId;
    this.brandId = this.$route.query.brandId;
    if (this.type != "add" && this.id) {
      this.init(this.id);
    }
    this.areaData.forEach(item => {
      this.proCodeList.push(item.value);
    });
  },
  watch: {
    activeIndex(val) {
      this.resizeWidth(val);
    },
    treeShow(val) {
      this.clearSelected();

      if (val) {
        this.$nextTick(() => {
          this.showSeleckedList();
        });
      }
    }
  },
  methods: {
    zhezhaoClick() {
      return false;
    },
    showSeleckedList() {
      let areaData = JSON.parse(JSON.stringify(this.areaData));
      let len = this.bizAreaList.length;
      for (let i = 0; i < len; i++) {
        for (let j = 0, lens = areaData.length; j < lens; j++) {
          if (areaData[j].value == this.bizAreaList[i]) {
            areaData[j].checked = true;
            break;
          }

          if (areaData[j].children && areaData[j].children.length) {
            let lenss = areaData[j].children.length;
            for (let n = 0; n < lenss; n++) {
              if (this.bizAreaList[i] == areaData[j].children[n].value) {
                areaData[j].children[n].checked = true;
                break;
              }
            }
          }
        }
      }
      this.areaData = areaData;
    },
    clearSelected() {
      for (let i = 0, len = this.areaData.length; i < len; i++) {
        this.areaData[i].checked = false;
        if (this.areaData[i].children && this.areaData[i].children.length) {
          let lens = this.areaData[i].children.lens;
          for (let j = 0; j < lens; j++) {
            this.areaData[i].children[j].checked = false;
          }
        }
      }
    },
    conficChange(val) {
      if (val == "kong") {
        this.formData2.distance = null;
      }
    },
    async saveAll() {
      this.allsave = true;
      await this.saveBaseSetting();
      await this.savePresentsSetting();
      await this.saveLimitSetting();
      if (this.hasError) {
        this.hasError = false;
        return;
      }

      this.$Message.success("保存成功");
      this.goBack();
    },
    init(id) {
      this.Global.doPost(
        "activityMaintain/getActivityLimitConfig.json",
        { id },
        res => {
          //基础设置
          this.formData1 = res.base;
          this.formData1.startTime = this.Global.createTime(res.base.startTime);
          this.formData1.endTime = this.Global.createTime(res.base.endTime);

          this.formData1.activityName = res.base.name;
          this.bizAreaList = res.base.areaList;
          this.activityId = res.base.id;
          this.getPreSentList(this.activityId);
          this.areaName = this.findAreaName(res.base.areaList);

          //奖项设置
          this.n = 0;

          for (let i = 0, len = res.presentList.length; i < len; i++) {
            res.presentList[i].name = res.presentList[i].activityTag;
            res.presentList[i].endWinTime = this.Global.createTime(
              res.presentList[i].endWinTime
            );
            this.$set(
              res.presentList[i],
              "endWinTime",
              this.Global.createTime(res.presentList[i].endWinTime)
            );
            res.presentList[i].presentType =
              res.presentList[i].presentType + "";
          }
          this.presentList = res.presentList;
          res.presentList.forEach(item => {
            if (item.presentType == 0 || item.presentType == 1) {
              item.goodsName = item.goodsId;
            }
          });
          this.liClick(0);
          //限制设置
          this.formData2 = res.limitModel;
          if (res.limitModel.out_area) {
            this.formData2.present = Number(res.limitModel.out_area);
            this.formData2.out_area = "1";
          } else {
            this.formData2.out_area = "2";
          }

          if (!res.limitModel.four_locate_check_activity) {
            this.formData2.confSpec = "kong";
            this.formData2.distance = null;
          } else {
            this.formData2.distance =
              res.limitModel.four_locate_check_activity.distance;
            this.formData2.confSpec =
              res.limitModel.four_locate_check_activity.confSpec;
          }
        }
      );
    },
    getGoodsList(type) {
      if (!this.activityId) {
        this.$Message.error("没有活动ID");
        return false;
      }
      this.presentList[this.activeIndex].goodsId = "";
      this.Global.doPostNoLoading(
        "activityMaintain/getGoodsUnderBrand.json",
        { activityId: this.activityId, type },
        res => {
          this.goodsList = res;
        }
      );
    },
    closeModal() {
      this.treeShow = false;
    },
    //设置折扣
    setPrize() {
      this.$router.push({
        path: "/presentManagement",
        query: {
          brandId: this.brandId
        }
      });
    },
    //保存基础设置
    saveBaseSetting() {
      return new Promise((resolve, reject) => {
        if (!this.formData1.activityName) {
          this.$Message.error("活动名称不能为空");
          return reject("活动名称不能为空");
        }
        if (!this.formData1.startTime || !this.formData1.endTime) {
          this.$Message.error("活动时间不能为空");
          return reject();
        }
        if (!this.bizAreaList.length) {
          this.$Message.error("请选择活动区域");
          return reject();
        }
        if (!this.formData1.pageUrl) {
          this.$Message.error("pageUrl不能为空");
          return reject();
        }
        if (!this.formData1.logoUrl) {
          this.$Message.error("logoUrl不能为空");
          return reject();
        }
        let data = {};
        data["activityName"] = this.formData1.activityName;
        data["logoUrl"] = this.formData1.logoUrl;
        data["pageUrl"] = this.formData1.pageUrl;
        data["groupId"] = this.groupId;
        data["operateType"] = this.allsave ? 2 : this.type == "add" ? 1 : 2;
        data["startTime"] = this.Global.createTime(this.formData1.startTime);

        data["endTime"] = this.Global.createTime(this.formData1.endTime);

        if (this.type == "modify" || this.allsave) {
          data["activityId"] = this.formData1["id"];
        }
        this.Global.deleteEmptyProperty(data);
        data["areaList"] = this.bizAreaList;
        this.Global.doPost(
          "activityMaintain/doUpdateOrBuildActivityBase.json",
          data,
          res => {
            if (!this.allsave) {
              this.$Message.success("基础设置保存成功");
            }

            this.activityId = res;
            this.formData1.activityId = res;
            resolve();
          }
        );
      }).catch(e => {
        this.hasError = true;
      });
    },
    //保存限制设置
    saveLimitSetting() {
      return new Promise((resolve, reject) => {
        if (!this.formData2.confSpec) {
          this.$Message.error("位置限制不能为空");
          return reject();
        }
        if (this.formData2.confSpec != "kong" && !this.formData2.distance) {
          this.$Message.error("限制距离不能为空");
          return reject();
        }
        let data = {};
        data["activityId"] = this.activityId;
        let obj = {};
        obj["daily_amount_limit"] = this.formData2.daily_amount_limit;
        obj["daily_limit"] = this.formData2.daily_limit;

        obj["month_amount_limit"] = this.formData2.month_amount_limit;
        obj["month_limit"] = this.formData2.month_limit;
        obj["user_amount_limit"] = this.formData2.user_amount_limit;
        obj["week_amount_limit"] = this.formData2.week_amount_limit;

        obj["week_limit"] = this.formData2.week_limit;
        obj["user_limit"] = this.formData2.user_limit;
        obj["four_locate_check_activity"] =
          this.formData2.confSpec == "kong" ? "" : this.formData2.confSpec;
        obj["distance"] = this.formData2.distance;
        obj["out_area"] =
          this.formData2.out_area == 1 ? this.formData2.present + "" : "";
        this.Global.deleteEmptyProperty(obj);
        data["limitConfig"] = obj;
        this.Global.doPost(
          "activityMaintain/doUpdateOrBuildLimitConfig.json",
          data,
          res => {
            if (!this.allsave) {
              this.$Message.success("限制设置保存成功");
            }
            return resolve();
          }
        );
      }).catch(e => {
        this.hasError = true;
      });
    },
    //保存奖项设置
    savePresentsSetting() {
      return new Promise((resolve, reject) => {
        let list = [];
        this.presentList.forEach((item, index) => {
          let obj = {};
          if (!item.activityTag) {
            this.$Message.error("折扣名称不能为空");
            return reject();
          }
          obj.activityTag = item.activityTag;
          if (!item.presentType) {
            this.$Message.error("折扣类别不能为空");
            return reject();
          }
          if (!item.goodsName) {
            this.$Message.error("折扣不能为空");
            return reject();
          }
          obj.goodsName = item.goodsName;
          obj.id = item.id;
          obj["presentType"] = Number(item.presentType);
          obj["dailyLimit"] = item.dailyLimit;
          obj["weekLimit"] = item.weekLimit;
          obj["totalQuantity"] = Number(item.totalQuantity);
          obj["userLimit"] = item.userLimit;
          if (!item.rate && item.rate != 0) {
            this.$Message.error("中奖率不能为空");
            return reject();
          }
          obj["rate"] = Number(item.rate);
          if (!item.notifyContent) {
            this.$Message.error("中奖消息");

            return reject();
          }
          obj["notifyContent"] = item.notifyContent;
          if (!item.notifyLogo) {
            this.$Message.error("折扣消息logo不能为空");
            return reject();
          }
          obj["notifyLogo"] = item.notifyLogo;
          if (!item.endWinTime) {
            this.$Message.error("折扣有效期不能为空");
            return reject();
          }
          obj["endWinTime"] = this.Global.createTime(item.endWinTime);

          list.push(obj);
        });
        let data = {};

        data["activityId"] = this.activityId;
        data["groupId"] = Number(this.groupId);
        this.Global.deleteEmptyProperty(data);
        data["presentList"] = list;
        this.Global.doPost(
          "activityMaintain/doUpdateOrBuildPresents.json",
          data,
          res => {
            if (!this.allsave) {
              this.$Message.success("奖项设置保存成功");
              this.init(this.activityId);
            }
            return resolve();
          }
        );
      }).catch(e => {
        this.hasError = true;
      });
    },
    areaList() {
      let treeData = this.$refs.tree.getCheckedNodes();
      this.bizAreaList = [];
      let arr = [];
      treeData.forEach(item => {
        this.bizAreaList.push(item.value);
      });
      for (let i = 0, len = this.bizAreaList.length; i < len; i++) {
        let index = this.proCodeList.indexOf(this.bizAreaList[i]);
        if (index > -1) {
          //包含
          let children = this.areaData[index].children
            ? this.areaData[index].children
            : "";
          let cityCodeList = [];
          if (children) {
            children.forEach(item => {
              cityCodeList.push(item.value);
            });
          }
          if (cityCodeList.length) {
            if (this.isContained(this.bizAreaList, cityCodeList)) {
              let proIndex = this.bizAreaList.indexOf(this.proCodeList[index]);
              this.bizAreaList.splice(proIndex, 1);
            }
          }
        }
      }
      this.areaName = this.findAreaName(this.bizAreaList);
    },
    showTree() {
      if (this.type == "look") return;
      this.treeShow = true;
    },
    //获取奖品列表
    getPreSentList(val) {
      if (!this.activityId) {
        this.$Message.error("没有活动ID");
        return false;
      }
      if (val == 2) {
        this.formData2.present = "";
        return;
      } //当变为不中奖是默认不调接口
      this.Global.doPost(
        "activityMaintain/getPresentUnderActivity.json",
        { activityId: this.activityId },
        res => {
          this.preSentList = res;
        }
      );
    },
    findAreaName(arr = []) {
      //通过数组获取areaName
      let areaName = "";
      for (let i = 0; i < arr.length; i++) {
        if (this.findOne(arr[i])) {
          areaName += `${this.findOne(arr[i])}/`;
        }
      }
      return areaName;
    },
    findOne(id) {
      let str = "";
      for (let i = 0, len = this.areaData.length; i < len; i++) {
        if (this.areaData[i].value == id) {
          str = this.areaData[i].title;
          return str;
        }
        if (this.areaData[i].children) {
          for (let j = 0; j < this.areaData[i].children.length; j++) {
            if (this.areaData[i].children[j].value == id) {
              str = this.areaData[i].children[j].title;
              return str;
            }
          }
        }
      }
      return str;
    },
    isContained(a, b) {
      if (!(a instanceof Array) || !(b instanceof Array)) return false;
      if (a.length < b.length) return false;
      let aStr = a.toString();
      for (let i = 0, len = b.length; i < len; i++) {
        if (aStr.indexOf(b[i]) == -1) return false;
      }
      return true;
    },
    resizeWidth(n) {
      let node = this.$refs.tabsBox;
      let len = this.presentList.length;
      let style = -n / len;
      node.style.transform = `translateX(${style * 100}%) translateZ(0)`;
    },
    goBack() {
      this.$router.push({
        path: "/scanActivityConfigureActivity",
        query: {
          groupId: this.groupId,
          brandId: this.brandId
        }
      });
    },
    //新增奖项
    addPresent() {
      this.n++;
      this.presentList.push({
        name: `奖项${this.n}`,
        presentType: "",
        endWinTime: EDFAULT_END_TIME,
        hour: "00:00",
        time: EDFAULT_END_TIME,
        presentType: "",
        rate: null,
        activityTag: "",
        dailyLimit: "",
        goodsName: null,
        goodsId: "",
        weekLimit: null,
        totalQuantity: null,
        userLimit: null,
        notifyContent: "",
        notifyLogo: "",
        img1TimeStr: "",
        img2TimeStr: ""
      });
      this.$nextTick(() => {
        this.activeIndex = this.presentList.length - 1;
      });
    },
    deletePresent(index) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该奖项？",
        onOk: () => {
          if (!this.presentList[this.activeIndex].id) {
            this.$Message.success("删除成功");
            this.presentList.splice(index, 1);
            this.$nextTick(() => {
              this.activeIndex =
                this.presentList.length > 1 ? this.presentList.length - 1 : 0;
            });
          } else {
            this.Global.doPost(
              "activityMaintain/doDeletePresent.json",
              {
                id: this.presentList[this.activeIndex].id,
                activityId: this.activityId
              },
              res => {
                this.$Message.success("删除成功");
                this.presentList.splice(index, 1);
                this.$nextTick(() => {
                  this.activeIndex =
                    this.presentList.length > 1
                      ? this.presentList.length - 1
                      : 0;
                });
              }
            );
          }
        }
      });
    },
    liClick(index) {
      this.activeIndex = index;
      let type = this.presentList[this.activeIndex].presentType;
      this.getGoodsList(type);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    beforeUpload(res) {
      this.img1TimeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.img1TimeStr + res.name;
    },
    beforeUpload2(res) {
      this.img2TimeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.img2TimeStr + res.name;
    },
    UploadLogoUrl(response, file, fileList) {
      //陈列图片
      this.formData1.logoUrl =
        PROJECT_CONFIG.ossServer +
        "ecuda/image/" +
        this.img1TimeStr +
        file.name;
    },
    notifyUploadLogoUrl(response, file, fileList) {
      //陈列图片
      this.presentList[this.activeIndex].notifyLogo =
        PROJECT_CONFIG.ossServer +
        "ecuda/image/" +
        this.img2TimeStr +
        file.name;
    }
  }
};
</script>