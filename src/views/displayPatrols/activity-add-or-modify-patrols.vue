<style lang="less" scoped>
@import "../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 30px 20px;
  // padding-bottom: 20;
  background: #fff;
  // overflow: hidden;
}

.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}

.area {
  border-radius: 4px;
  border: 1px solid #dddee1;
  height: 32px;
  padding: 4px 7px;
  line-height: 2;
  cursor: pointer;
  .TextOverflow();
}

.ivu-date-picker {
  display: block;
}
.container {
  // height: 470px;
  position: relative;
  .top-left {
    float: left;
    width: 15%;
    height: 200px;
    min-width: 180px;
    img {
      display: block;
      width: 170px;
      height: 150px;
    }
    .upload-box {
      text-align: center;
      margin-top: 10px;
      // margin:10px 0 5px 40px;
      span {
        text-align: center;
        margin-top: 8px;
        color: @primary-color;
      }
    }
  }
  .top-right {
    float: left;
    width: 80%;
  }
  .word-import {
    // position: absolute;
    // bottom: 0;
    // left: 0;
    height: 32px;
    padding-left: 20%;
    .word {
      font-size: 14px;
      font-weight: bold;
    }

    display: flex;
    flex-direction: row;
  }
}

.sku {
  i {
    font-style: normal;
  }
}
.sku.issku {
  color: #ff830b;
  i {
    color: #3254ff;
    text-decoration: underline;
    cursor: pointer;
  }
}
//活动管理
.activityList {
  height: auto;
  .title {
    border-left: 3px solid #ff8a23;
    font-size: 14px;
    font-weight: bold;
    padding-left: 10px;
    line-height: 16px;
    margin-bottom: 20px;
  }
  .activityBox {
    height: auto;
    .activityTitle {
      height: 40px;
      line-height: 40px;
      background-color: @tablehead-color;
      .titMain {
        width: 100%;
        height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        // color: white;
        font-weight: bold;
      }
    }
    .activityContent {
      // height: 40px;
      line-height: 40px;
      .ContentMain {
        width: 100%;
        min-height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 12px;
        .skuandmust {
          border: none;
          outline: none;
        }
        .btn {
          // padding: 6px 10px;
          padding: 3px 7px;
          transition: all 0.2s;
        }
        .border-right {
          border-radius: 0;
          border-right: 1px solid #e5e5e5;
        }
      }
    }
    .createNewAct {
      margin: 20px 0;
      transition: all 0.2s;
    }
  }
}
.btnBox {
  overflow: hidden;
  height: 40px;
  .btn {
    float: right;
    // padding: 5px 10px;
    padding: 3px 7px;
    // background: rgba(0, 0, 0, 0) !important;
  }
}

.ivu-btn-text:focus {
  box-shadow: none;
}
.grayColor {
  color: #e5e5e5;
}
#textarea {
  display: block;
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 100%;
  text-indent: 10px;
  min-height: 120px;
  resize: none;
}
#textarea::-webkit-input-placeholder {
  color: #c5c8ce;
}
#textarea:-moz-placeholder {
  color: #c5c8ce;
}
#textarea::-moz-placeholder {
  color: #c5c8ce;
}
#textarea:-ms-input-placeholder {
  color: #c5c8ce;
}
.numColor {
  color: @primary-color;
}
.changeBtn {
  margin-top: 20px;
}
.image-upload {
  clear: both;
}
.merchant {
  cursor: pointer;
  margin-left: 10px;
  color: @primary-color;
}
.merchantBox {
  display: flex;
  flex-direction: row;
  width: 800px;
  height: 320px;
  .left,
  .right {
    width: 390px;
    height: 300px;
    overflow-y: auto;
  }
  .left {
    border-right: 1px solid #e5e5e5;
  }
}
</style>

<template>
  <div id="Main">
    <!-- <h2 class="Title">陈列活动维护</h2> -->
    <div class="box">
      <div class="container">
        <div class="top-left">
          <img :src="formData.logoUrl" alt v-if="formData.logoUrl ">
          <img src="../../assets/image/imgBg.png" alt v-else>
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
              <Button v-if="type != 'look'" type="primary">重新上传</Button>
            </Upload>
            <span>(建议尺寸:210*170px)</span>
          </div>
        </div>
        <div class="top-right">
          <Form :label-width="88">
            <Row>
              <Col span="8">
                <Form-item label="活动包名:" required>
                  <span v-if="type == 'look'">{{formData.groupName}}</span>
                  <Input v-else v-model.trim="formData.groupName" placeholder="请输入活动包名"></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="活动包别名:">
                  <span v-if="type == 'look'">{{formData.name}}</span>
                  <Input v-else v-model.trim="formData.name" placeholder="请输入活动包名别名"></Input>
                </Form-item>
              </Col>
              <Col span="8">
                <Form-item label="品牌名称:" required>
                  <span v-if="type == 'look'">{{formData.brandName}}</span>
                  <Select
                    v-else
                    v-model="formData.brandId"
                    placeholder="请选择品牌"
                    @on-change="changeValue"
                  >
                    <Option
                      :value="item.id"
                      v-for="(item,index) in brandList"
                      :key="index"
                    >{{ item.brandName }}</Option>
                  </Select>
                </Form-item>
              </Col>
              <Col span="24">
                <Row>
                  <Col span="8">
                    <Form-item label="活动区域:" prop="areaCode" required>
                      <span v-if="type == 'look'">{{areaName}}</span>
                      <div v-else @click="showTree" class="area">{{areaName}}</div>
                    </Form-item>
                  </Col>
                  <Col span="8">
                    <Form-item label="活动简介:" required>
                      <span v-if="type == 'look'">{{formData.groupSummary}}</span>
                      <Input v-else v-model.trim="formData.groupSummary" placeholder="请输入活动简介"></Input>
                    </Form-item>
                  </Col>
                </Row>
              </Col>
              <Col span="24">
                <Form-item label="周期管理:" required>
                  <Row>
                    <Col span="6">
                      <span style="font-size:12px;">清算周期</span>
                      <span
                        v-if="type == 'look' || disable"
                      >{{ formData.liquidatePeriod | filterLiquidatePeriod}}</span>
                      <Radio-group v-else v-model="formData.liquidatePeriod">
                        <Radio label="W">
                          <span>周</span>
                        </Radio>
                        <Radio label="M">
                          <span>月</span>
                        </Radio>
                      </Radio-group>
                    </Col>
                    <Col span="14">
                      <uploadWeeks
                        :dis="type == 'look' || disable"
                        :modelList="formData.modelList"
                        :UP="formData.uploadPeriod"
                        :CM="formData.configureMonth"
                        :info="formData.info"
                        @getWeeksData="getWeeksData"
                      />
                    </Col>
                  </Row>
                </Form-item>
              </Col>
              <Col span="24">
                <Form-item label="经销商:" required>
                  <span
                    class="merchant"
                    @click="merchantSelect"
                  >{{ list.length > 0 ? '已选择' : "请选择经销商"}}</span>
                </Form-item>
                <Form-item label="特殊说明:" :label-width="88">
                  <span v-if="type == 'look'">{{formData.specDesc}}</span>
                  <textarea
                    v-else
                    v-model.trim="formData.specDesc"
                    placeholder="请输入特殊说明"
                    id="textarea"
                  ></textarea>
                </Form-item>
                <!-- <div class="btnBox">
                        <Button class="btn lookDetail" type="default"  @click="saveGroup">保存活动包</Button>
                </div>-->
              </Col>
            </Row>
          </Form>
        </div>
        <!-- 新增图片上传 -->
        <div class="image-upload" v-if="showImageUpload">
          <Row>
            <Col span="10" offset="4">
              <Row>
                <Col span="5">
                  <div class="changeBtn">
                    <Upload
                      action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                      :data="upData"
                      :before-upload="beforeUploadImage"
                      :on-success="bacLogoUrlUpload"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png']"
                      :on-format-error="handleFormatError"
                    >
                      <p>未上传背景:</p>
                      <p>(700*240)</p>
                      <Button v-if="type != 'look'" type="primary">重新上传</Button>
                    </Upload>
                  </div>
                </Col>
                <Col span="13">
                  <div class="imgBox">
                    <div class="changeImg">
                      <img
                        :src="formData.pictureUrlOne"
                        alt
                        v-if="formData.pictureUrlOne"
                        style="width:350px;height:120px;display:block;"
                      >
                      <img
                        src="../../assets/image/imgBg.png"
                        alt
                        v-else
                        style="width:350px;height:120px;display:block;"
                      >
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span="10">
              <Row>
                <Col span="5">
                  <div class="changeBtn">
                    <Upload
                      action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                      :data="upData"
                      :before-upload="beforeUploadImage"
                      :on-success="logoUrlUpload"
                      :show-upload-list="false"
                      :format="['jpg','jpeg','png']"
                      :on-format-error="handleFormatError"
                    >
                      <p>已上传背景:</p>
                      <p>(700*240)</p>
                      <Button v-if="type != 'look'" type="primary">重新上传</Button>
                    </Upload>
                  </div>
                </Col>
                <Col span="13">
                  <div class="imgBox">
                    <div class="changeImg">
                      <img
                        :src="formData.pictureUrlTwo"
                        alt
                        v-if="formData.pictureUrlTwo"
                        style="width:350px;height:120px;display:block;"
                      >
                      <img
                        src="../../assets/image/imgBg.png"
                        alt
                        v-else
                        style="width:350px;height:120px;display:block;"
                      >
                    </div>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <!-- 新增审核话术导入 -->
        <div class="word-import" style="margin-top:10px;">
          <span class="word">审核话术：</span>
          <importBtn @click.native="importShow = true"/>
          <exportBtn @click.native="exportExcel"/>
        </div>
        <div class="btnBox" style="margin-top:10px;">
          <Button class="btn lookDetail" type="default" @click="saveGroup">保存活动包</Button>
        </div>
      </div>
      <div class="activityList">
        <div class="title">活动信息</div>
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{ displayActivityList.length }}</span> 条数据
          </span>
          <addBtn class="btn-right" @btnClick="addActivity"/>
        </div>
        <div class="activityBox">
          <div class="activityTitle">
            <Row>
              <Col span="3">
                <div class="titMain">活动名称</div>
              </Col>
              <Col span="3">
                <div class="titMain">活动别名</div>
              </Col>
              <Col span="4">
                <div class="titMain">开始时间</div>
              </Col>
              <Col span="4">
                <div class="titMain">结束时间</div>
              </Col>
              <Col span="2">
                <div class="titMain">必选活动</div>
              </Col>
              <Col span="2">
                <div class="titMain">启用SKU</div>
              </Col>
              <Col span="2">
                <div class="titMain">格式</div>
              </Col>
              <Col span="4">
                <div class="titMain">操作</div>
              </Col>
            </Row>
          </div>
          <div class="activityContent" v-if="displayActivityList.length">
            <Row
              style="border-bottom:1px solid #e5e5e5;"
              v-for="(item ,index) in displayActivityList"
              :key="index"
              :label="item.acttivityName"
            >
              <Col span="3">
                <div class="ContentMain" style="padding:0 10px;">
                  <Input
                    v-if="item.isModify"
                    size="small"
                    :readonly="type == 'look'"
                    style="width:100%;"
                    v-model.trim="item.name"
                    placeholder="请输入活动名称"
                  ></Input>
                  <span v-else>{{item.name}}</span>
                </div>
              </Col>
              <Col span="3">
                <div class="ContentMain" style="padding:0 10px;">
                  <Input
                    v-if="item.isModify"
                    size="small"
                    :readonly="type == 'look'"
                    style="width:100%;"
                    v-model.trim="item.anotherName"
                    placeholder="请输入活动名称"
                  ></Input>
                  <span v-else>{{item.anotherName}}</span>
                </div>
              </Col>
              <Col span="4">
                <div class="ContentMain">
                  <Row v-if="item.isModify">
                    <Col span="15">
                      <Date-picker
                        style="margin-top:10px;"
                        size="small"
                        :disabled="type == 'look'"
                        type="date"
                        placeholder="选择时间"
                        v-model.trim="item.startTime"
                      ></Date-picker>
                    </Col>
                    <Col span="8" offset="1">
                      <Select
                        placeholder="时间"
                        size="small"
                        :disabled="type == 'look'"
                        v-model="item.startHour"
                      >
                        <Option
                          :value="item.dataTime"
                          :key="item.dataTime"
                          v-for="item in dataList"
                        >{{item.dataTime}}</Option>
                      </Select>
                    </Col>
                  </Row>

                  <span v-else>{{item.startTime}}</span>
                </div>
              </Col>
              <Col span="4">
                <div class="ContentMain">
                  <Row v-if="item.isModify">
                    <Col span="15">
                      <Date-picker
                        style="margin-top:10px;"
                        size="small"
                        :disabled="type == 'look'"
                        type="date"
                        placeholder="选择时间"
                        v-model.trim="item.endTime"
                      ></Date-picker>
                    </Col>
                    <Col span="8" offset="1">
                      <Select
                        size="small"
                        placeholder="时间"
                        :disabled="type == 'look'"
                        v-model="item.endHour"
                      >
                        <Option
                          :value="item.dataTime"
                          :key="item.dataTime"
                          v-for="item in dataList"
                        >{{item.dataTime}}</Option>
                      </Select>
                    </Col>
                  </Row>
                  <span v-else>{{item.endTime}}</span>
                </div>
              </Col>
              <Col span="2">
                <div class="ContentMain">
                  <select v-if="item.isModify" v-model="item.isMustOpt" class="skuandmust">
                    <option :value="1">是</option>
                    <option :value="0">否</option>
                  </select>
                  <span v-else>{{item.isMustOpt | isFilter}}</span>
                </div>
              </Col>
              <Col span="2">
                <div class="ContentMain">
                  <select v-if="item.isModify" v-model="item.isSku" class="skuandmust">
                    <option :value="1">是</option>
                    <option :value="0">否</option>
                  </select>
                  <span v-else>{{item.isSku | isFilter}}</span>
                </div>
              </Col>
              <Col span="2">
                <div class="ContentMain">
                  <Select
                    v-if="!item.id"
                    :disabled="type == 'look'"
                    placeholder="选择格式"
                    v-model="item.confValue"
                  >
                    <Option value="video">视频</Option>
                    <Option :value="1">图片1张</Option>
                    <Option :value="2">图片2张</Option>
                    <Option :value="3">图片3张</Option>
                    <Option :value="4">图片4张</Option>
                    <Option :value="5">图片5张</Option>
                    <Option :value="6">图片6张</Option>
                  </Select>
                  <span v-else>{{item.confValue | confFilter}}</span>
                </div>
              </Col>
              <Col span="4">
                <div class="ContentMain" style="width: 200px;">
                  <Button
                    :class="type == 'look'?'grayColor':''"
                    v-if="!item.isModify"
                    class="btn border-right"
                    id="success"
                    type="text"
                    @click="modifyData(index)"
                  >修改</Button>
                  <!-- <Button :class="type == 'look'?'grayColor':''" v-if="!item.isModify" class="btn border-right" id="fail" type="text" @click="closeActivityItem(index)">删除</Button> -->
                  <Button
                    :class="type == 'look'?'grayColor':''"
                    v-if="!item.isModify"
                    class="btn"
                    id="primary"
                    type="text"
                    @click="activityMaintenance(index)"
                  >分组维护</Button>

                  <Button
                    v-if="item.isModify"
                    class="btn border-right"
                    id="success"
                    @click="cancel(index)"
                    type="text"
                  >取消</Button>
                  <Button
                    v-if="item.isModify"
                    class="btn"
                    id="primary"
                    @click="saveActivity(index)"
                    type="text"
                  >保存</Button>
                </div>
              </Col>
            </Row>
          </div>
          <div v-else style="text-align:center;height:40px;line-height:40px;">暂无活动</div>
          <!-- <div class="createNewAct">
                  <Button type="primary" @click="addActivity">新建活动</Button>
          </div>-->
        </div>
      </div>
    </div>
    <Modal v-model="treeShow" @on-ok="areaList">
      <div style="height: 400px; overflow-y:auto;">
        <div style="height: 400px; overflow-y:auto;" v-if="treeShow">
          <Tree :data="areaData" ref="tree" multiple show-checkbox></Tree>
        </div>
      </div>
    </Modal>
    <Modal v-model="importShow">
      <h2 style="text-align:center;">导入</h2>
      <i-Form>
        <div style="overflow:hidden;">
          <div
            class="upDate"
            style="cursor:pointer;text-align:center;border: 1px solid #aeaeae;padding: 2px 12px;margin-right: 10px;width:150px;"
          >
            <Upload
              :action="url"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :on-error="handleError"
            >
              <Icon type="ios-folder" size="14" color="#53a3f4"></Icon>
              {{uploadText}}
            </Upload>
          </div>
        </div>
      </i-Form>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="closeModel">取消</i-button>
        <i-button type="success" @click="uploadExcel">确定</i-button>
      </div>
    </Modal>

    <Modal v-model="merchantShow" width="800">
      <h2 style="text-align:center;margin-bottom:20px;">选择经销商</h2>
      <div class="merchantBox">
        <div class="left">
          <h3>待选择</h3>

          <CheckboxGroup
            style="margin-left:20px;margin-top:20px;"
            v-model="list"
            @on-change="listChange"
          >
            <div v-for="(item ,index) in distributorList" :key="index">
              <Checkbox :disabled="type == 'look'" :label="item.id">{{ item.merchantName }}</Checkbox>
            </div>
          </CheckboxGroup>
        </div>
        <div class="right">
          <h3 style="margin-left:10px;">已选择</h3>

          <CheckboxGroup style="margin-left:20px;margin-top:20px;" v-model="selectedList">
            <div v-for="(item ,index) in selectedList" :key="index">
              <Checkbox disabled checked :label="item">{{ item }}</Checkbox>
            </div>
          </CheckboxGroup>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script>
import uploadWeeks from "@/components/uploadWeeks/upload-weeks.vue";
import area from "@/config/areaCode.js";
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import index from "vue";
import config from "@/util/config.js";
import addBtn from "@/components/Button/addNew-btn.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
import { validateStart, validateEnd } from "@/util/index.js"; //验证规则

export default {
  data() {
    return {
      disable: false,
      list: [],
      uploadTime: "",
      timeStr: "",
      selectedList: [],
      merchantStr: "请选择经销商",
      merchantShow: false,
      url: config.uploadWorkerExcel,
      uploadUrl: "",
      uploadText: "请选择上传文件",
      importShow: false,
      aid: "",
      gid: "",
      skuIsShow: false,
      dataList: [],
      checkedList: [],
      checkedNames: [],
      treeShow: false,
      n: 1,
      formData: {
        groupName: "", //活动包名
        specDesc: "", //特殊说明
        brandId: "",
        brandName: "",
        groupSummary: "", //活动简介
        areaCode: [],
        logoUrl: ""
      },
      presentList: [],
      showImageUpload: true,
      displayActivityList: [],

      rule: {
        startTime: [{ validator: validateStart }],
        endTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "请选择品牌名称" }],
        name: [{ required: true, message: "请输入陈列活动名称" }]
        // bizAreaList: [{ required: true, message: "请选择活动区域" }]
      },
      deleteActivityList: [], //删除活动
      deletePresentList: [], //删除活动分组
      areaData: area,
      areaName: "",
      brandList: [],
      activityList: [],
      type: "",
      upData: upData,
      notifyImg: "",
      activityImg: "",
      bizAreaList: [],
      distributorList: [],
      // activityIndex: 0,
      ind: null, //分组下标
      displayActivityData: [],
      skuSettingData: {},
      recoredSkuList: {},
      groupId: "",
      brandId: "",
      activityTempData: {} //活动临时数据
    };
  },
  mounted() {},
  components: { addBtn, exportBtn, importBtn, uploadWeeks },
  created() {
    let str = ":00";
    for (let i = 0; i <= 24; i++) {
      let time = i < 10 ? "0" + i : i;
      time += str;
      this.dataList.push({ dataTime: time });
    }
    let type = this.$route.query.type;
    let groupId = this.$route.query.groupId;
    let brandId = this.$route.query.brandId;
    this.formData.brandName = this.$route.query.brandName;
    this.formData.brandId = brandId;
    this.groupId = groupId;
    this.brandId = brandId;
    if (type) {
      this.type = type;
    }
    if (groupId && brandId) {
      this.activityDetail(groupId, brandId);
    }
    this.Global.doPostNoLoading(
      "condition/queryBrands.json",
      { scope: "a" },
      res => {
        this.brandList = [];
        Object.entries(res).forEach(item => {
          this.brandList.push({ id: Number(item[0]), brandName: item[1] });
        });
        if (this.brandList && this.brandList.length) {
          this.changeValue(this.formData.brandId);
        }
      }
    );
    for (let i = 0; i < this.areaData.length; i++) {
      this.checkedList.push({
        checked: false,
        children: []
      });
      if (this.areaData[i].children) {
        for (let j = 0; j < this.areaData[i].children.length; j++) {
          this.checkedList[i].children.push({
            checked: false
          });
        }
      }
    }
  },
  watch: {
    importShow(val) {
      if (!val) {
        this.uploadText = "请选择上传文件";
      }
    }
  },
  methods: {
    getWeeksData(query) {
      let { uploadPeriod, configureMonth, modelList } = query;
      this.formData.uploadPeriod = uploadPeriod;
      this.formData.configureMonth = configureMonth;
      this.formData.modelList = modelList;
    },
    merchantSelect() {
      if (this.distributorList.length) {
        this.merchantShow = true;
      } else {
        if (this.formData.brandId) {
          this.$Message.error("该品牌下没有经销商");
        } else {
          this.$Message.error("请选择品牌");
        }
      }
    },
    listChange(val) {
      this.selectedList = [];
      val.forEach(item => {
        this.distributorList.forEach(val => {
          if (val.id == item) {
            this.selectedList.push(val.merchantName);
          }
        });
      });
    },
    closeModel() {
      this.importShow = false;
    },
    uploadExcel() {
      if (!this.groupId) {
        this.$Message.error("请先保存活动包");
        return false;
      }
      if (!this.uploadUrl) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let data = {
        loadFilePath: this.uploadUrl,
        brandId: this.brandId ? this.brandId : this.formData.brandId,
        groupId: this.groupId
      };
      this.Global.doPost("displayYxtg/importAuditExplain.json", data, () => {
        this.$Message.success("导入成功");
        this.importShow = false;
        this.uploadText = "选择导入文件";
      });
    },
    handleError() {},
    handleSuccess(response, file, fileList) {
      this.uploadText = file.name;
      var url = response.data;
      if (url) {
        this.uploadUrl = url;
      }
    },
    showImage() {
      this.showImageUpload = false;
      this.$nextTick(() => {
        this.showImageUpload = true;
      });
    },
    //导出审核话术
    exportExcel() {
      if (!this.groupId) {
        this.$Message.warning("请先保存活动包");
        return;
      }
      let data = {
        brandId: this.brandId ? this.brandId : this.formData.brandId,
        groupId: this.groupId
      };
      var url = this.Global.getExportUrl(
        "displayYxtg/exportAuditExplain.json",
        data
      );
      window.open(url);
    },
    getBrandName(id) {
      for (let i = 0; i < this.brandList.length; i++) {
        if (this.brandList[i].id == id) {
          return this.brandList[i].brandName;
        }
      }
    },
    //数据深拷贝
    deepClone(index) {
      let data = {};
      let keys = Object.keys(this.displayActivityList[index]);
      keys.forEach(item => {
        data[item] = this.displayActivityList[index][item];
      });
      return data;
    },
    modifyData(index) {
      if (this.type == "look") {
        return;
      }
      this.displayActivityList[index]["isModify"] = true;
      this.displayActivityList[index]["startHour"] = this.Global.createTime(
        this.displayActivityList[index].startTime
      ).slice(11, 16);
      this.displayActivityList[index]["endHour"] = this.Global.createTime(
        this.displayActivityList[index].endTime
      ).slice(11, 16);
      this.displayActivityList[index]["isModify"] = true;
      this.activityTempData = this.deepClone(index);
    },
    //保存活动包名
    saveGroup() {
      if (!this.list.length) {
        this.$Message.error("请选择经销商");
        return false;
      }
      if (!this.formData.liquidatePeriod) {
        this.$Message.info("请选择清算周期");
        return false;
      }

      if (!this.formData.uploadPeriod) {
        this.$Message.info("请配置上传周期");
        return false;
      }
      let data = this.Global.JsonChange(this.formData);
      delete data["info"];
      delete data["areaCode"];
      delete data["notifyLogo"];
      data["id"] = this.groupId;
      data["brandName"] = this.getBrandName(this.formData.brandId);
      this.Global.deleteEmptyProperty(data);
      data["bizAreaList"] = this.bizAreaList;
      delete data["name"];
      data["groupType"] = 6;

      if (this.formData.periodId) {
        data["periodId"] = this.formData.periodId;
      }

      data["liquidatePeriod"] = this.formData.liquidatePeriod;

      data["uploadPeriod"] = this.formData.uploadPeriod;

      data["configureMonth"] = this.formData.configureMonth ? 1 : 0;
      if (this.formData.configureMonth == 1) {
        let modelList = [];
        this.formData.modelList.forEach(item => {
          let { endTime, startTime, periods, periodMonth } = item;
          modelList.push({ endTime, startTime, periods, periodMonth });
        });
        data["modelList"] = modelList;
      }
      let merchantList = [];
      this.list.forEach(item => {
        merchantList.push({
          id: item
        });
      });
      data["merchantList"] = merchantList;
      this.Global.doPost("displayYxtg/addActivityGroup.json", data, res => {
        if (res) {
          this.groupId = res;
        }
        this.$Message.success("保存成功");
        let brandId = this.brandId ? this.brandId : this.formData.brandId;
        let query = {
          type: this.type,
          groupId: this.groupId,
          brandId
        };
        this.$router.push({
          path: "/activityAddOrModifyPatrols",
          query
        });
        this.activityDetail(this.groupId, brandId);
      });
    },
    //保存活动
    saveActivity(index) {
      let data = {};
      data["confValue"] = this.displayActivityList[index].confValue
        ? this.displayActivityList[index].confValue
        : "";
      data["confValue"] = data["confValue"] == "video" ? "" : data["confValue"];
      // delete data["confValue"];
      data["id"] = this.displayActivityList[index].id;
      data["groupId"] = this.groupId;
      data["brandId"] = this.brandId ? this.brandId : this.formData.brandId;
      data["brandName"] = this.getBrandName(data["brandId"]);
      data["endTime"] = this.Global.setHoursData(
        this.displayActivityList[index].endTime,
        this.displayActivityList[index].endHour
      );
      data["startTime"] = this.Global.setHoursData(
        this.displayActivityList[index].startTime,
        this.displayActivityList[index].startHour
      );
      data["isMustOpt"] = this.displayActivityList[index].isMustOpt;
      data["isSku"] = this.displayActivityList[index].isSku;
      data["name"] = this.displayActivityList[index].name;
      data["type"] = 6;
      this.Global.doPost("displayYxtg/updateActivity.json", data, res => {
        this.$Message.success("保存成功");
        // this.cancel(index);
        this.displayActivityList[index].isModify = false;
        this.activityTempData = {};
        this.displayActivityList[index]["endTime"] = this.Global.createTime(
          this.Global.setHoursData(
            this.displayActivityList[index].endTime,
            this.displayActivityList[index].endHour
          )
        );
        this.displayActivityList[index]["startTime"] = this.Global.createTime(
          this.Global.setHoursData(
            this.displayActivityList[index].startTime,
            this.displayActivityList[index].startHour
          )
        );
        let brandId = this.brandId ? this.brandId : this.formData.brandId;
        this.activityDetail(this.groupId, brandId);
      });
    },
    //取消
    cancel(index) {
      this.displayActivityList[index].isModify = false;
      //新建时取消
      if (!this.displayActivityList[index].id) {
        this.displayActivityList.splice(index, 1);
      } else {
        //修改时取消
        if (this.compareData) {
          this.activityDetail(this.groupId, this.brandId);
        }
      }
    },
    //比较数据是否发生了变化
    compareData(index) {
      let keys = Object.keys(this.activityTempData);
      keys.forEach(item => {
        if (
          this.activityTempData[item] != this.displayActivityList[index][item]
        ) {
          return true;
        }
      });
    },
    //活动维护
    activityMaintenance(index) {
      if (this.type == "look") {
        return false;
      }
      let query = {
        type: this.type,
        id: this.displayActivityList[index].id,
        brandId: this.brandId ? this.brandId : this.formData.brandId,
        groupId: this.groupId,
        isSku: this.displayActivityList[index].isSku
      };
      this.$router.push({
        path: "/presentWeiHu",
        query
      });
    },
    areaList() {
      var treeData = this.$refs.tree.getCheckedNodes();
      this.bizAreaList = [];
      var arr = [];
      var areaName = "";
      for (var i = 0; i < treeData.length; i++) {
        this.bizAreaList.push(treeData[i].value);
        areaName += treeData[i].title + "/";
      }
      this.areaName = areaName;
    },
    findAreaName(arr = []) {
      //通过数组获取areaName
      let areaName = "";
      for (let i = 0; i < arr.length; i++) {
        let str = this.findOne(arr[i]);
        if (str) {
          areaName += `${str}/`;
        }
      }
      return areaName;
    },
    findOne(id) {
      let str = "";
      for (let i = 0; i < this.areaData.length; i++) {
        if (this.areaData[i].value == id) {
          str = this.areaData[i].title;
          this.checkedList[i].checked = true;
          this.$set(this.areaData[i], "checked", true);
          return str;
        }
        if (this.areaData[i].children) {
          for (let j = 0; j < this.areaData[i].children.length; j++) {
            if (this.areaData[i].children[j].value == id) {
              str = this.areaData[i].children[j].title;
              this.checkedList[i].children[j].checked = true;
              this.$set(this.areaData[i].children[j], "checked", true);
              return str;
            }
          }
        }
      }
      return str;
    },
    showTree() {
      this.treeShow = true;
    },
    closeActivityItem(index) {
      //删除某一项活动
      if (this.type == "look") {
        return false;
      }
      if (this.type == "edit") {
        let time = this.displayActivityList[index].startTime;
        if (new Date().getTime() > time) {
          this.$Message.error("活动已开始，不能删除！");
          return false;
        }
      }
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该活动？",
        onOk: () => {
          let data = {};
          data["id"] = this.displayActivityList[index].id;
          if (!data["id"]) {
            this.displayActivityList.splice(index, 1);
            this.$Message.success("删除成功");
            return;
          }
          this.Global.doPost("displayYxtg/deleteActivity.json", data, res => {
            this.$Message.success("删除成功");
            this.displayActivityList.splice(index, 1);
          });
        }
      });
    },
    addActivity() {
      // 增加活动
      let flag = true;
      for (let i = 0; i < this.displayActivityList.length; i++) {
        if (
          !this.displayActivityList[i].id &&
          this.displayActivityList.length
        ) {
          flag = false;
          this.$Modal.confirm({
            title: "警告",
            content: "是否放弃保存新建活动？",
            onOk: () => {
              this.displayActivityList.splice(i, 1);
              this.displayActivityList.push({
                name: "", //活动名称
                startTime: "", //活动开始时间
                endTime: "", //活动结束时间
                startHour: "00:00",
                id: "", //活动ID
                endHour: "24:00",
                confValue: "video",
                isSku: 0, //是否开启SKU检测
                isMustOpt: 0, //是否是必选活动
                isModify: true,
                showMore: false
              });
            },
            onCancel: () => {
              return false;
            }
          });
        }
      }
      if (flag) {
        this.displayActivityList.push({
          name: "", //活动名称
          startTime: "", //活动开始时间
          endTime: "", //活动结束时间
          startHour: "00:00",
          id: "", //活动ID
          endHour: "24:00",
          confValue: "video",
          isSku: 0, //是否开启SKU检测
          isMustOpt: 0, //是否是必选活动
          isModify: true,
          showMore: false
        });
      }
    },
    beforeUpload(res) {
      this.uploadTime = Date.now();
      this.upData["key"] = "ecuda/image/" + this.uploadTime + res.name;
    },
    beforeUploadImage(res) {
      this.timeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.timeStr + res.name;
      return this.checkImageWH(res, 700, 240);
    },
    handleName(str) {
      let arr = str.split("."),
        len = arr.length,
        time = Date.now();
      let name = `${time}.${arr[len - 1]}`;
      return name;
    },
    checkImageWH(file, width, height) {
      let self = this;
      return new Promise(function(resolve, reject) {
        let filereader = new FileReader();
        filereader.onload = e => {
          let src = e.target.result;
          const image = new Image();
          image.onload = function() {
            if (
              (width && this.width != width) ||
              (height && this.height != height)
            ) {
              self.$Notice.info({
                title: `请上传宽为${width},高为${height}的图片"`
              });
              reject();
            } else {
              resolve();
            }
          };
          image.onerror = reject;
          image.src = src;
        };
        filereader.readAsDataURL(file);
      });
    },
    UploadLogoUrl(response, file, fileList) {
      //陈列图片
      this.formData.logoUrl =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.uploadTime + file.name;
    },
    logoUrlUpload(response, file, fileList) {
      //陈列图片
      this.formData.pictureUrlTwo =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr + file.name;
      this.$set(
        this.formData,
        "pictureUrlTwo",
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr + file.name
      );
      this.showImage();
    },
    bacLogoUrlUpload(response, file, fileList) {
      //陈列图片
      this.formData.pictureUrlOne =
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr + file.name;
      this.$set(
        this.formData,
        "pictureUrlOne",
        PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr + file.name
      );
      this.showImage();
    },
    displayUpload(response, file, fileList) {
      //陈列效果图片
      this.display_url = PROJECT_CONFIG.ossServer + "ecuda/image/" + file.name;
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    activityDetail(id, brandId) {
      if (id && brandId) {
        this.Global.doPost(
          "displayYxtg/getActivityList.json",
          { id, brandId, groupType: 6 },
          res => {
            // return;

            this.formData.brandId = res.brandId;
            // this.formData["brandName"] = res.brandName;
            this.disable = Date.now() > res.startTime;
            this.getDistributorList(res.brandId, true);
            this.formData["groupName"] = res.groupName;
            this.formData["periodId"] = res.periodId;
            this.formData["groupSummary"] = res.summary;
            this.formData["specDesc"] = res.specDesc;
            this.formData["areaCode"] = (res && res.areaList) || [];
            this.bizAreaList = (res && res.areaList) || [];
            this.formData["logoUrl"] = res.logoUrl; //活动包名图片
            this.formData["pictureUrlOne"] = res.pictureUrlOne; //未上传背景图
            this.formData["pictureUrlTwo"] = res.pictureUrlTwo; //已上传背景图
            this.areaName = this.findAreaName(this.bizAreaList);
            this.formData["periodId"] = res.periodId;
            this.formData["liquidatePeriod"] = res.liquidatePeriod;
            this.formData["info"] = res.info;

            this.formData["uploadPeriod"] = res.uploadPeriod;
            let modelList = res.periodList ? res.periodList.modelList : [];
            modelList.forEach(item => {
              item.type = "modify";
            });
            this.formData["modelList"] = modelList;

            this.formData["configureMonth"] =
              res.configureMonth == 1 ? true : false;
            //活动数据
            for (let i = 0; i < res.activityList.length; i++) {
              res.activityList[i].isModify = false;
              res.activityList[i].showMore = false;
              res.activityList[i].startTime = this.Global.createTime(
                res.activityList[i].startTime
              );
              res.activityList[i].endTime = this.Global.createTime(
                res.activityList[i].endTime
              );
            }
            this.displayActivityList = res.activityList;
            if (res.activityList && res.activityList.length) {
              res.activityList.forEach(item => {
                item.confValue =
                  item.fileType == "radio"
                    ? "video"
                    : parseInt(item.fileType, 10);
              });
            }
          }
        );
      } else {
        this.$Message.error("请在活动列表重新选择");
      }
    },
    changeValue(value) {
      for (var i = 0; i < this.brandList.length; i++) {
        if (this.brandList[i].id == value) {
          this.formData["brandName"] = this.brandList[i].brandName;
          this.formData["brandId"] = this.brandList[i].id;
          this.formData["notifyLogo"] = this.brandList[i].logoUrl;
          break;
        }
      }
      this.distributorList = [];
      this.formData.merchantId = "";
      if (!value) return;
      //查询经销商数据
      this.getDistributorList(value);
    },
    //查询经销商数据
    getDistributorList(brandId, flag) {
      this.distributorList = [];
      this.Global.doPost(
        "dealers/doQueryMerchantByBrandId.json",
        { brandId, status: 1 },
        res => {
          if (res.length) {
            this.distributorList = res;
            this.list = [];
            this.selectedList = [];
            if (flag) {
              this.getSelectedMerchant();
            }
          }
        }
      );
    },
    getSelectedMerchant() {
      let data = {
        groupType: 6,
        id: this.groupId,
        brandId: this.formData.brandId ? this.formData.brandId : this.brandId
      };
      this.Global.doPost("displayYxtg/queryGroupMerchant.json", data, res => {
        if (res && res.length) {
          res.forEach(item => {
            this.list.push(item.id);
            this.selectedList.push(item.merchantName);
          });
        }
      });
    },
    goBack() {
      this.$router.push({ path: "/displayReward" });
    },
    handleTagsOption(name, index) {
      if (name === "save") {
        this.saveActivity(index);
      }
      if (name === "cancel") {
        this.cancel(index);
      }
      if (name === "delete") {
        this.closeActivityItem(index);
      }
    }
  },
  filters: {
    isFilter(val) {
      let str = "";
      switch (val) {
        case 1:
          str = "是";
          break;
        case 0:
          str = "否";
          break;
        default:
          str = "";
          break;
      }
      return str;
    },
    confFilter(val) {
      let str = "";
      switch (val) {
        case 1:
          str = "图片1张";
          break;
        case 2:
          str = "图片2张";
          break;
        case 3:
          str = "图片3张";
          break;
        case 4:
          str = "图片4张";
          break;
        case 5:
          str = "图片5张";
          break;
        case 6:
          str = "图片6张";
          break;
        case "video":
          str = "视频";
          break;
        default:
          str = "";
          break;
      }
      return str;
    }
  }
};
</script>