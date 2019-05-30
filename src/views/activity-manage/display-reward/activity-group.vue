<style lang="less" scoped>
@import "../../../config/index.less";

.box {
  width: 100%;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  padding: 20px 20px 0;
  background: #fff;
  overflow: hidden;
}
.activity-content-group-box {
  transition: all 0.2s;
  padding: 10px;
}
.ivu-table-row {
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(0px);
}
.ivu-date-picker {
  display: block;
}

.imgBox {
  width: 100%;
  position: relative;
  .changeImg {
    width: 100%;
    img {
      display: block;
      width: 105px;
      height: 85px;
    }
  }
}
#imgVideo {
  clear: both;
  height: 180px;
  margin-top: 40px;
  overflow: hidden;
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
}
.textbox {
  overflow: hidden;
  min-height: 200px;
  div:first-child {
    float: left;
    width: 10%;
    text-align: right;
    padding-right: 10px;
  }
  div:last-child {
    float: left;
    width: 90%;
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
.groupList {
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
      transition: all 0.2s;
      line-height: 40px;
      .ContentMain {
        width: 100%;
        min-height: 40px;
        text-align: center;
        line-height: 40px;
        font-size: 12px;

        .btn {
          padding: 3px 7px;
          border-radius: 0;
        }
        .border-right {
          border-right: 1px solid #e5e5e5;
        }
        .skuandmust {
          border: none;
          outline: none;
        }
      }
    }
    .defaultWord {
      text-align: center;
      height: 40px;
      line-height: 40px;
      font-size: 12px;
    }
    .createNewAct {
      margin: 20px 0;
    }
  }
}
#textarea {
  display: block;
  outline: none;
  border: 1px solid #e5e5e5;
  border-radius: 4px;
  width: 100%;
  text-indent: 10px;
  min-height: 190px;
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
  display: flex;
  justify-content: center;
  align-items: center;
  height: 170px;
  p {
    line-height: 20px;
    font-size: 12px;
  }
}
.addAssessment {
  color: @primary-color;
  cursor: pointer;
}

.word-import {
  height: 32px;
  // padding-left: 20%;
  .word {
    font-size: 14px;
    font-weight: bold;
  }
  display: flex;
  flex-direction: row;
}
</style>

<template>
  <div id="Main">
    <div class="box">
      <div class="groupList">
        <div class="title">分组管理</div>
        <div class="contentTop">
          <span class="btn-left">
            此表共包含
            <span class="numColor">{{ presentList.length }}</span> 条数据
          </span>
          <addBtn class="btn-right" @btnClick="addGroup"/>
        </div>
        <div class="activityBox">
          <div class="activityTitle">
            <Row>
              <Col span="8">
                <div class="titMain">分组名称</div>
              </Col>
              <Col span="8">
                <div class="titMain">分组别名</div>
              </Col>
              <Col span="8">
                <div class="titMain">操作</div>
              </Col>
            </Row>
          </div>
          <div v-if="presentList.length" class="activityContent">
            <div
              v-for="(item ,index) in presentList"
              :key="index"
              style="border-bottom:1px solid #e5e5e5;"
            >
              <Row>
                <Col span="8">
                  <div class="ContentMain" style="padding:0 10px;">
                    <Input
                      required
                      v-if="item.isModify"
                      :readonly="type == 'look'|| item.type == 'look'"
                      style="width:100%;"
                      v-model.trim="item.activityTag"
                      placeholder="请输入分组名称"
                    ></Input>
                    <span v-else>{{ item.activityTag }}</span>
                  </div>
                </Col>
                <Col span="8">
                  <div class="ContentMain" style="padding:0 10px;">
                    <Input
                      v-if="item.isModify"
                      :readonly="type == 'look'|| item.type == 'look'"
                      style="width:100%;"
                      v-model.trim="item.name"
                      placeholder="请输入分组别名"
                    ></Input>
                    <span v-else>{{ item.name }}</span>
                  </div>
                </Col>
                <Col span="8">
                  <div class="ContentMain btnBox">
                    <Button
                      type="text"
                      class="btn border-right"
                      v-if="!item.isModify"
                      id="success"
                      @click="modifyGroup(index)"
                    >修改</Button>
                    <Button
                      type="text"
                      class="btn"
                      v-if="!item.isModify"
                      id="primary"
                      @click="lookDetail(index)"
                    >详情</Button>

                    <Button
                      type="text"
                      class="btn"
                      :class="item.isModify && item.type !='look'?'border-right':''"
                      v-if="item.isModify"
                      id="success"
                      @click="cancel(index)"
                    >取消</Button>
                    <Button
                      type="text"
                      class="btn"
                      id="primary"
                      v-if="item.isModify && item.type !='look'"
                      @click="saveGroup(index)"
                    >保存</Button>
                  </div>
                </Col>
              </Row>
              <div class="activity-content-group-box" :id="'ref' + index" v-if="item.showMore">
                <Form :label-width="88">
                  <Row>
                    <Col span="5">
                      <Form-item label="陈列折扣:" required>
                        <Select
                          :disabled="type == 'look'|| item.type == 'look'"
                          v-model="item.presentType"
                          placeholder="请选择陈列奖励类型"
                          @on-change="prizeChange"
                        >
                          <Option :value="1">实物折扣</Option>
                          <Option :value="2">现金红包</Option>
                          <Option :value="0">电子劵</Option>
                        </Select>
                      </Form-item>
                    </Col>
                    <Col span="8" offset="2" required v-if="prizeShow">
                      <Form-item v-if="isSku == 1" label :label-width="30" required>
                        <!-- isSku -->
                        <span class="sku" :class="isSku?'issku':''">
                          <i @click="openSKU(index,$event)">设置SKU</i>
                        </span>
                      </Form-item>
                      <Form-item required label="奖项:">
                        <!-- 实物奖励 -->
                        <div v-if="item.presentType == 1" key="111">
                          <Row>
                            <Col span="8" style="margin-bottom: 0;">
                              <Select
                                :disabled="type == 'look'|| item.type == 'look'"
                                style="width:100%;margin-bottom: 0;"
                                v-model="item.goodsId"
                                placeholder="请选择奖项"
                                clearable
                              >
                                <Option
                                  :value="val.id"
                                  v-for="(val,indexInd) in jiangpinList"
                                  :key="indexInd"
                                >{{ val.name }}</Option>
                              </Select>
                            </Col>
                            <Col
                              span="5"
                              style="height: 32px;line-height: 32px;margin-bottom: 0;"
                              offset="1"
                            >
                              <input
                                :readonly="type == 'look'|| item.type == 'look'"
                                type="number"
                                min="1"
                                max="4999.99"
                                class="numberInput"
                                v-model="item.minAmount"
                              >
                            </Col>
                            <Col span="2" style="margin-bottom: 0;text-align:center;">至</Col>
                            <Col span="5" style="height: 32px;line-height: 32px;margin-bottom: 0;">
                              <input
                                :readonly="type == 'look'|| item.type == 'look'"
                                type="number"
                                min="1"
                                max="4999.99"
                                class="numberInput"
                                v-model="item.maxAmount"
                              >
                            </Col>
                            <Col span="3" style="margin-bottom: 0;text-align:center;">份</Col>
                          </Row>
                        </div>
                        <!-- 电子劵 -->
                        <div v-else-if="item.presentType == 0" key="222">
                          <Row>
                            <Col span="8" style="margin-bottom: 0;">
                              <Select
                                :disabled="type == 'look'|| item.type == 'look'"
                                style="width:100%;margin-bottom: 0;"
                                v-model="item.goodsId"
                                placeholder="请选择奖项"
                                clearable
                              >
                                <Option
                                  :value="val.id"
                                  v-for="(val,indexInd) in jiangpinList"
                                  :key="indexInd"
                                >{{ val.name }}</Option>
                              </Select>
                            </Col>
                            <Col
                              span="5"
                              style="height: 32px;line-height: 32px;margin-bottom: 0;"
                              offset="1"
                            >
                              <input
                                :readonly="type == 'look'|| item.type == 'look'"
                                type="number"
                                min="1"
                                max="4999.99"
                                class="numberInput"
                                v-model="item.minAmount"
                              >
                            </Col>
                            <Col span="2" style="margin-bottom: 0;text-align:center;">至</Col>
                            <Col span="5" style="height: 32px;line-height: 32px;margin-bottom: 0;">
                              <input
                                :readonly="type == 'look'|| item.type == 'look'"
                                type="number"
                                min="1"
                                max="4999.99"
                                class="numberInput"
                                v-model="item.maxAmount"
                              >
                            </Col>
                            <Col span="3" style="margin-bottom: 0;text-align:center;">份</Col>
                          </Row>
                        </div>
                        <!-- 现金红包 -->
                        <div v-else key="333">
                          <Row>
                            <Col span="6" style="margin-bottom: 0;">
                              <input
                                :disabled="type == 'look'|| item.type == 'look'"
                                type="number"
                                min="1"
                                max="4999.99"
                                class="numberInput"
                                v-model="item.minAmount"
                              >
                            </Col>
                            <Col
                              span="3"
                              style="height: 32px;line-height: 32px;margin-bottom: 0;text-align:center;"
                            >至</Col>
                            <Col span="6" style="margin-bottom: 0;">
                              <input
                                :disabled="type == 'look'|| item.type == 'look'"
                                type="number"
                                min="1"
                                max="4999.99"
                                class="numberInput"
                                v-model="item.maxAmount"
                              >
                            </Col>
                          </Row>
                        </div>
                      </Form-item>
                    </Col>
                    <Col span="7">
                      <Form-item label="奖励有效期:" :label-width="100" required>
                        <Row>
                          <Col span="15">
                            <Form-item prop="endTime">
                              <Date-picker
                                :disabled="type == 'look' || item.type == 'look'"
                                type="date"
                                placeholder="选择时间"
                                v-model="item.endWinTime"
                              ></Date-picker>
                            </Form-item>
                          </Col>
                          <Col span="8" offset="1">
                            <Form-item prop="startTime">
                              <Select
                                placeholder="时间"
                                :disabled="type == 'look' || item.type == 'look'"
                                v-model="item.endHour"
                              >
                                <Option
                                  :value="item.dataTime"
                                  :key="item.dataTime"
                                  v-for="item in dataList"
                                >{{item.dataTime}}</Option>
                              </Select>
                            </Form-item>
                          </Col>
                        </Row>
                      </Form-item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="2">
                      <Form-item required :label-width="2">
                        <Checkbox
                          :disabled="type == 'look'|| item.type == 'look'"
                          v-model="item.isOpenCheck"
                          @on-change="resertNum"
                        >开启考核项</Checkbox>
                      </Form-item>
                    </Col>
                    <Col span="14" required>
                      <Form-item required>
                        <div key="333">
                          <Row>
                            <Col span="4" style="margin-bottom: 0;">
                              <Checkbox
                                :disabled="!item.isOpenCheck || type == 'look'|| item.type == 'look'"
                                @on-change="resertNum"
                                v-model="item.isSkuNum"
                              >SKU数量</Checkbox>
                            </Col>
                            <Col span="8" style="margin-bottom: 0;" v-if="showSkuNum">
                              <input
                                :disabled="!item.isSkuNum || type == 'look'|| item.type == 'look'"
                                v-model.number="item.skuNum"
                                type="number"
                                min="1"
                                max="4999.99"
                                class="numberInput"
                              >
                            </Col>
                            <Col span="6" style="margin-bottom: 0;" offset="1">
                              <Input disabled placeholder="输入模型编号"></Input>
                            </Col>
                          </Row>
                        </div>
                      </Form-item>
                    </Col>
                    <Col span="2">
                      <Form-item required :label-width="2">
                        <Checkbox
                          :disabled="!item.isOpenCheck || type == 'look'|| item.type == 'look'"
                          @on-change="resertRule"
                          v-model="item.isSkuNecessary"
                        >SKU必备项</Checkbox>
                      </Form-item>
                    </Col>
                    <Col span="2" v-if="showSkuRule">
                      <Form-item required :label-width="10">
                        <configure-btn
                          :skuNecessary="item.skuNecessary ? item.skuNecessary : []"
                          :skuExpression="item.skuExpression"
                          :label="item.label"
                          :ind="index"
                          :dis="!item.isSkuNecessary || type == 'look'|| item.type == 'look'"
                          :categoryList="categoryList"
                          :sCategoryList="item.sCategoryList"
                          :brandId="brandId"
                          @getSKUInfomation="getSKUInfomation"
                          @sCategoryListChange="sCategoryListChange"
                        />
                        <!-- skuExpression skuNecessary label -->
                      </Form-item>
                    </Col>
                  </Row>
                  <template v-if="showOpt">
                    <template v-if="item.checkProject.length && item.isOpenCheck">
                      <Row v-for="(val,i) in item.checkProject" :key="i">
                        <Col span="8">
                          <Form-item required label="考核项名称:">
                            <Input
                              :disabled="type == 'look'|| item.type == 'look'"
                              v-model.trim="item.checkProject[i]"
                              placeholder="输入考核项名称"
                            ></Input>
                          </Form-item>
                        </Col>
                        <Col span="6">
                          <Form-item label="关联模型:">
                            <Input disabled placeholder="输入模型编号"></Input>
                          </Form-item>
                        </Col>
                        <Col span="2" offset="1" v-if="type != 'look'&& item.type != 'look'">
                          <Form-item required :label-width="10">
                            <Button size="small" @click="deletessessment(index,i)" type="error">删除</Button>
                          </Form-item>
                        </Col>
                      </Row>
                    </template>
                  </template>
                  <p
                    v-if="type != 'look'&& item.type != 'look'"
                    @click="addAssessmentMethod(index)"
                    class="addAssessment"
                  >
                    <Icon type="ios-add"/>添加考核项
                  </p>
                </Form>

                <div class="textbox">
                  <div>
                    <p>陈列规则及</p>
                    <p>陈列要求:</p>
                  </div>
                  <div>
                    <textarea
                      :readonly="type == 'look'|| item.type == 'look'"
                      v-model.trim="item.content"
                      placeholder="请输入陈列规则,陈列要求"
                      id="textarea"
                    ></textarea>
                  </div>
                </div>
                <!-- 新增审核规则 -->
                <div class="textbox">
                  <div>
                    <p>审核规则:</p>
                  </div>
                  <div>
                    <textarea
                      :readonly="type == 'look'|| item.type == 'look'"
                      v-model.trim="item.auditPolicy"
                      placeholder="请输入审核规则"
                      id="textarea"
                    ></textarea>
                  </div>
                </div>

                <div id="imgVideo">
                  <Row>
                    <Col span="8">
                      <Row>
                        <Col span="9">
                          <div class="changeBtn">
                            <Upload
                              action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                              :data="upData"
                              :before-upload="beforeUpload"
                              :on-success="logoUrlUpload"
                              :show-upload-list="false"
                              :format="['jpg','jpeg','png']"
                              :on-format-error="handleFormatError"
                            >
                              <p>陈列效果图:</p>
                              <p>(710*400)</p>
                              <Button
                                v-if="type != 'look'|| item.type != 'look'"
                                :disabled="type =='look' || item.type == 'look'"
                                @click="getIndex(index)"
                                type="primary"
                              >重新上传</Button>
                            </Upload>
                          </div>
                        </Col>
                        <Col span="13">
                          <div class="imgBox">
                            <div class="changeImg">
                              <img
                                :src="presentList[index].imageUrl"
                                alt
                                v-if="presentList[index].imageUrl"
                                style="width:200px;height:170px;display:block;"
                              >
                              <img
                                src="../../../assets/image/imgBg.png"
                                alt
                                v-else
                                style="width:200px;height:170px;display:block;"
                              >
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span="8">
                      <Row>
                        <Col span="9">
                          <div class="changeBtn">
                            <Upload
                              action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                              :data="upData"
                              :before-upload="beforeUploadVideo"
                              :on-success="videoUpload"
                              :show-upload-list="false"
                              :format="['mp4','wmv']"
                              :on-format-error="handleViedoFormatError"
                            >
                              <p>陈列小视频:</p>
                              <Button
                                v-if="type != 'look'|| item.type != 'look'"
                                :disabled="type =='look' || item.type == 'look'"
                                @click="getIndex(index)"
                                type="primary"
                              >重新上传</Button>
                            </Upload>
                          </div>
                        </Col>
                        <Col span="13">
                          <div class="imgBox">
                            <div class="changeImg">
                              <video
                                controls
                                v-if="presentList[index].radioUrl"
                                :src="presentList[index].radioUrl"
                                style="width:200px;height:170px;display:block;"
                              ></video>
                              <img
                                src="../../../assets/image/imgBg.png"
                                alt
                                v-else
                                style="width:200px;height:170px;display:block;"
                              >
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    <Col span="8">
                      <Row>
                        <Col span="9">
                          <div class="changeBtn">
                            <Upload
                              action="https://hbrand.oss-cn-hangzhou.aliyuncs.com"
                              :data="upData"
                              :before-upload="beforeUploadImage"
                              :on-success="logoUrlUploadImage"
                              :show-upload-list="false"
                              :format="['jpg','jpeg','png']"
                              :on-format-error="handleFormatError"
                            >
                              <p>上传提醒图:</p>
                              <p>(建议宽度不超过800)</p>
                              <Button
                                v-if="type != 'look'|| item.type != 'look'"
                                :disabled="type =='look' || item.type == 'look'"
                                @click="getIndex(index)"
                                type="primary"
                              >重新上传</Button>
                            </Upload>
                          </div>
                        </Col>
                        <Col span="13">
                          <div class="imgBox">
                            <div class="changeImg">
                              <img
                                :src="presentList[index].pictureUrl"
                                alt
                                v-if="presentList[index].pictureUrl"
                                style="width:200px;height:170px;display:block;"
                              >
                              <img
                                src="../../../assets/image/imgBg.png"
                                alt
                                v-else
                                style="width:200px;height:170px;display:block;"
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
                  <importBtn @click.native="showModal(index)"/>
                  <exportBtn @click.native="exportExcel(index)"/>
                </div>
              </div>
            </div>
          </div>
          <div class="defaultWord" v-else>该活动下暂无分组</div>
        </div>
      </div>
    </div>
    <!-- 审核话术导入 -->
    <Modal v-model="importShow">
      <h2 style="text-align:center;">导入</h2>
      <upload-file :fileTitle="uploadText" v-model="wordFilePath"/>
      <div slot="footer" style="text-align:center;">
        <i-button type="text" @click="closeModel">取消</i-button>
        <i-button type="success" @click="uploadWord">确定</i-button>
      </div>
    </Modal>
    <Modal v-model="skuIsShow" width="1000" style="height:600px;" id="skuContainer">
      <h3 slot="header" style="text-align:center;">SKU设置</h3>
      <skuModel
        :arecoredSkuList="recoredSkuList"
        :aid="aid"
        :gid="gid"
        :brandId="brandId"
        :type="presentList[ind]&&presentList[ind].type?presentList[ind].type:''"
        @getData="getSkuSetData"
      ></skuModel>
      <div slot="footer" style="text-align:center;display:none;"></div>
    </Modal>
  </div>
</template>

<script>
import skuModel from "../../activity-statistics-C/setting-SKU.vue";
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import uploadFile from "@/components/uploadFile/upload-file.vue";
import config from "@/util/config.js";
import { EDFAULT_STARTTIME, EDFAULT_ENDTIME } from "@/util/index.js"; //搜索条件默认时间
import index from "vue";
import addBtn from "@/components/Button/addNew-btn.vue";
import configureBtn from "@/components/configureBtn/configure-btn.vue";
import exportBtn from "@/components/Button/export-btn.vue";
import importBtn from "@/components/Button/import-btn.vue";
export default {
  data() {
    return {
      wordFilePath: "", //审核话术文件路径
      wordIndex: null,
      uploadText: "请选择上传文件",
      importShow: false,
      showSkuNum: true,
      showSkuRule: true,
      skuData: {},
      prizeShow: true,
      isSku: "",
      aid: "",
      gid: "",
      skuIsShow: false,
      dataList: [],
      checkedList: [],
      checkedNames: [],
      n: 1,
      jiangpinList: [],
      brandId: "",
      groupId: "",
      id: "", //活动ID
      presentList: [],
      type: "",
      upData: upData,
      notifyImg: "",
      activityImg: "",
      bizAreaList: [],
      showOpt: true,
      activityIndex: 0,
      ind: null, //分组下标
      displayActivityData: [],
      skuSettingData: {},
      recoredSkuList: {},
      categoryList: [],
      url: config.uploadWorkerExcel
    };
  },
  mounted() {
    let sku = document.getElementById("skuContainer");
    sku.style.display = "none";
  },
  components: {
    skuModel,
    addBtn,
    configureBtn,
    exportBtn,
    importBtn,
    uploadFile
  },
  created() {
    let str = ":00";
    for (let i = 0; i <= 24; i++) {
      let time = i < 10 ? "0" + i : i;
      time += str;
      this.dataList.push({ dataTime: time });
    }
    this.type = this.$route.query.type;
    this.groupId = this.$route.query.groupId;
    this.brandId = this.$route.query.brandId;
    this.id = this.$route.query.id; //活动ID
    this.isSku = this.$route.query.isSku;
    this.activityDetail(this.id);
  },
  watch: {
    skuIsShow(val) {
      let sku = document.getElementById("skuContainer");
      if (val) {
        sku.style.display = "block";
      } else {
        sku.style.display = "none";
        this.recoredSkuList = {};
        this.aid = "";
        this.gid = "";
      }
    },
    importShow(val) {
      if (!val) {
        this.uploadText = "请选择上传文件";
        this.wordFilePath = "";
        this.wordIndex = null;
      }
    }
  },
  methods: {
    showModal(index) {
      if (!this.presentList[index].id) {
        this.$Message.info("请先保存分组，再上传审核话术");
        return false;
      }
      this.wordIndex = index;
      this.importShow = true;
    },

    sCategoryListChange(index) {
      this.$set(this.presentList[index], "sCategoryList", []);
    },
    //查询品牌下面的所有SKU
    queryAllCategory(skuNecessary = [], index = 0) {
      //确保接口只调用一次
      if (!this.categoryList.length) {
        this.Global.doPost(
          "displayYxtg/querySkuDetailByBrandId.json",
          {
            brandId: this.brandId
          },
          res => {
            this.categoryList = res ? res : [];
            if (skuNecessary.length) {
              this.$set(
                this.presentList[index],
                "sCategoryList",
                this.getsCategoryList(skuNecessary)
              );
            }
          }
        );
      } else {
        this.$set(
          this.presentList[index],
          "sCategoryList",
          this.getsCategoryList(skuNecessary)
        );
      }
    },
    closeModel() {
      this.importShow = false;
    },
    //导出审核话术
    exportExcel(index) {
      if (!this.presentList[index].id) {
        this.$Message.warning("请先保存分组");
        return;
      }
      let data = {
        brandId: this.brandId ? this.brandId : this.formData.brandId,
        groupId: this.groupId,
        presentId: this.presentList[index].id,
        activityId: this.id
      };
      var url = this.Global.getExportUrl(
        "displayYxtg/exportAuditExplain.json",
        data
      );
      window.open(url);
    },
    //导入审核话术
    uploadWord() {
      if (!this.presentList[this.wordIndex].id) {
        this.$Message.error("请先保存分组");
        return false;
      }
      if (!this.wordFilePath) {
        this.$Message.error("请核实上传文件");
        return false;
      }
      let data = {
        loadFilePath: this.wordFilePath,
        brandId: this.brandId ? this.brandId : this.formData.brandId,
        groupId: this.groupId,
        activityId: this.id,
        presentId: this.presentList[this.wordIndex].id
      };
      this.Global.doPost("displayYxtg/importAuditExplain.json", data, () => {
        this.$Message.success("导入成功");
        this.importShow = false;
        this.uploadText = "选择导入文件";
      });
    },
    resertNum() {
      this.showSkuNum = false;
      this.$nextTick(() => {
        this.showSkuNum = true;
      });
    },
    resertRule(val) {
      this.showSkuRule = false;
      this.$nextTick(() => {
        this.showSkuRule = true;
      });
    },
    getSKUInfomation(obj) {
      let { skuExpression, label, skuNecessary } = obj;
      this.skuData = { skuExpression, label, skuNecessary };
    },
    deletessessment(index, i) {
      this.presentList[index].checkProject.splice(i, 1);
      this.showMoreOpt();
    },
    addAssessmentMethod(index) {
      if (this.presentList[index].isOpenCheck) {
        this.presentList[index].checkProject.push("");
      }
      this.showMoreOpt();
    },
    showMoreOpt() {
      this.showOpt = false;
      this.$nextTick(() => {
        this.showOpt = true;
      });
    },
    prizeChange(val, flag) {
      this.presentList[this.ind].presentType = val;
      this.showPrize();
      if (val == 2) {
        return;
      }
      if (!flag) {
        this.presentList[this.ind].goodsId = "";
      }
      this.Global.doPost(
        "goodsInfo/queryByBrandAndType.json",
        {
          brandId: this.brandId,
          type: val
        },
        res => {
          this.jiangpinList = res;
        }
      );
    },
    showPrize() {
      this.prizeShow = false;
      this.$nextTick(() => {
        this.prizeShow = true;
      });
    },
    getIndex(index) {
      this.ind = index;
    },
    //删除分组
    deleteGroup(index) {
      this.ind = index;
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该分组？",
        onOk: () => {
          if (!this.presentList[index].id) {
            this.presentList.splice(index, 1);
            this.$Message.success("删除成功");
          } else {
            this.Global.doPost(
              "displayYxtg/deleteActivityPresentInfo.json",
              { id: this.presentList[index].id },
              res => {
                this.$Message.success("删除成功");
                this.activityDetail(this.id);
              }
            );
          }
        }
      });
    },
    //取消
    cancel(index) {
      this.ind = index;
      this.presentList[index].isModify = false;
      //新建时取消
      if (!this.presentList[index].id) {
        this.presentList.splice(index, 1);
      } else {
        //修改时取消
        if (this.compareData(index)) {
          this.activityDetail(this.id);
          this.presentList[index].type = "";
        }
      }
    },
    compareData() {
      return true;
    },
    //修改分组
    modifyGroup(index) {
      this.ind = index;
      this.closeMoreOpen("add");
      if (this.presentList[index].id) {
        this.presentList[index].type = "modify";
      } else {
        this.presentList[index].type = "add";
      }
      this.getGroupDetail(this.presentList[index].id, index, "modify");
    },
    //查看详情
    lookDetail(index) {
      this.ind = index;
      this.closeMoreOpen("add");
      this.getGroupDetail(this.presentList[index].id, index, "look");
    },
    myReplace(str, f, e) {
      if (!str) return null;
      str = str.split(f);
      str = str.join(e);
      return str;
    },
    //获取分组详情
    getGroupDetail(id, index, type) {
      this.Global.doPost(
        "displayYxtg/getPresentInfoDetails.json",
        { id },
        res => {
          this.presentList[index]["activityTag"] = res["activityTag"];
          this.presentList[index]["content"] = this.myReplace(
            res.content,
            "|",
            "\n"
          );
          this.presentList[index]["auditPolicy"] = this.myReplace(
            res.auditPolicy,
            "|",
            "\n"
          );
          this.presentList[index]["endWinTime"] = this.Global.createTime(
            res.endWinTime
          );
          this.presentList[index]["endHour"] = this.Global.createTime(
            res.endWinTime
          ).slice(11, 16);
          this.presentList[index]["goodsId"] = res.goodsId;
          this.presentList[index]["maxAmount"] = res.maxAmount;
          this.presentList[index]["minAmount"] = res.minAmount;
          this.presentList[index]["presentType"] = res.presentType;
          this.prizeChange(res.presentType, true);
          this.presentList[index]["imageUrl"] = res.imageUrl;
          this.presentList[index]["pictureUrl"] = res.pictureUrl;

          this.presentList[index]["radioUrl"] = res.radioUrl;
          this.presentList[index]["id"] = res.id;
          this.presentList[index]["isModify"] = true;
          this.presentList[index]["type"] = type;
          this.presentList[index]["isOpenCheck"] =
            res.isOpenCheck == 1 ? true : false;
          let presentSku = res.presentSku;
          if (res.isOpenCheck == 1) {
            this.presentList[index]["checkProject"] =
              presentSku && presentSku.checkProject
                ? JSON.parse(presentSku.checkProject)
                : [];
          } else {
            this.presentList[index]["checkProject"] = [];
          }
          if (presentSku) {
            this.presentList[index]["isSkuNecessary"] =
              presentSku.isSkuNecessary == 1 ? true : false;
            this.presentList[index]["isSkuNum"] = presentSku.skuNum
              ? true
              : false;
            this.presentList[index]["skuNum"] = presentSku.skuNum;
            this.presentList[index]["label"] = presentSku.label;
            this.presentList[index]["skuExpression"] = presentSku.skuExpression;
            let skuNecessary = this.getSkuNecessary(presentSku.skuNecessary);
            this.queryAllCategory(skuNecessary, index);
            this.presentList[index]["skuNecessary"] = skuNecessary;
            this.skuData = {
              skuExpression: presentSku.skuExpression,
              label: presentSku.label,
              skuNecessary
            };
          } else {
            this.queryAllCategory([], index);
          }

          this.presentList[index]["showMore"] = true;
          // this.presentList[index]['sCategoryList'] = this.getsCategoryList(skuNecessary);
          // console.log(this.presentList[index]['sCategoryList'])
          if (this.isSku == 1) {
            let str = `b${this.brandId}a${this.id}g${res.id}`;
            let skuList = [];
            res.skuList.forEach(item => {
              skuList.push({ id: item });
            });
            this.skuSettingData[str] = {
              recoredSkuList: skuList,
              skuNumberRule: res.skuLimit,
              skuRule: res.skuRule
            };
          }
        }
      );
    },
    getsCategoryList(value = []) {
      let arr = [];
      if (value && value.length) {
        value.forEach(item => {
          this.categoryList.forEach(v => {
            if (item == v.id) {
              arr.push(v.skuName);
            }
          });
        });
      }
      return arr;
    },
    getSkuNecessary(val) {
      let data = [];
      if (val) {
        data = JSON.parse(val);
      }
      return data;
    },
    //保存分组
    saveGroup(index) {
      this.ind = index;
      this.init(index);
    },
    //新增分组
    addGroup() {
      let flag = true;
      this.queryAllCategory();
      for (let i = 0; i < this.presentList.length; i++) {
        if (!this.presentList[i].id && this.presentList.length) {
          flag = false;
          this.$Modal.confirm({
            title: "警告",
            content: "是否放弃保存新建分组？",
            onOk: () => {
              this.presentList.splice(i, 1);
              this.presentList.push({
                activityTag: "", //分组名称
                name: "", //分组别名
                presentType: "", //奖励类型
                endWinTime: "",
                endHour: "24:00",
                id: "", //分组Id
                goodsId: "",
                imageUrl: "",
                isSkuNum: false,
                isSkuNecessary: false,
                skuNum: null,
                checkProject: [],
                radioUrl: "",
                isOpenCheck: false,
                content: null,
                minAmount: null,
                maxAmount: null,
                totalQuantity: null,
                content: "",
                isModify: true,
                showMore: true,
                type: "add",
                skuExpression: "",
                skuNecessary: [],
                label: "",
                imageTimeStr: "",
                imageTimeStr1: "",
                videoTimeStr: ""
              });
            },
            onCancel: () => {
              return false;
            }
          });
        }
      }
      if (flag) {
        this.closeMoreOpen("add");

        this.presentList.push({
          activityTag: "", //分组名称
          name: "", //分组别名
          presentType: "", //奖励类型
          endWinTime: "",
          endHour: "24:00",
          id: "", //分组Id
          goodsId: "",
          imageUrl: "",
          radioUrl: "",
          isSkuNum: false,
          skuExpression: "",
          skuNecessary: [],
          label: "",
          isSkuNecessary: false,
          skuNum: null,
          isOpenCheck: false,
          checkProject: [],
          content: null,
          minAmount: null,
          maxAmount: null,
          totalQuantity: null,
          content: "",
          isModify: true,
          showMore: true,
          type: "add"
        });
        this.ind = this.presentList.length - 1;
      }
    },
    getSkuSetData(val) {
      this.skuIsShow = false;
      if (val == "close") {
        return false;
      }
      this.skuSettingData[val[0]] = val[1];
    },
    //开启SKU
    openSKU(index, e) {
      this.getIndex(index);
      this.gid = this.presentList[index].id
        ? this.presentList[index].id
        : index;
      this.aid = this.id;
      let str = `b${this.brandId}a${this.aid}g${this.gid}`;
      if (this.skuSettingData[str]) {
        this.recoredSkuList = this.skuSettingData[str];
      }
      this.skuIsShow = true;
    },
    beforeUpload(res) {
      this.imageTimeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.imageTimeStr + res.name;
      return this.checkImageWH(res, 710, 400);
    },
    beforeUploadImage(res) {
      this.imageTimeStr1 = Date.now();
      this.upData["key"] = "ecuda/image/" + this.imageTimeStr1 + res.name;
      // return this.checkImageWH(res, 710, 400);
    },
    beforeUploadVideo(res) {
      this.videoTimeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.videoTimeStr + res.name;
      // return this.checkImageWH(res, 700, 240);
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
    logoUrlUpload(response, file, fileList) {
      this.presentList[this.ind].imageUrl =
        PROJECT_CONFIG.ossServer +
        "ecuda/image/" +
        this.imageTimeStr +
        file.name;
      this.$set(this.presentList, this.ind, this.presentList[this.ind]);
    },
    logoUrlUploadImage(response, file, fileList) {
      this.presentList[this.ind].pictureUrl =
        PROJECT_CONFIG.ossServer +
        "ecuda/image/" +
        this.imageTimeStr1 +
        file.name;
      this.$set(this.presentList, this.ind, this.presentList[this.ind]);
    },
    videoUpload(response, file, fileList) {
      //陈列效果视频
      this.presentList[this.ind].radioUrl =
        PROJECT_CONFIG.ossServer +
        "ecuda/image/" +
        this.videoTimeStr +
        file.name;
      this.$set(this.presentList, this.ind, this.presentList[this.ind]);
    },
    handleFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    handleViedoFormatError(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 MP4 或 wmv 格式的视频。"
      });
    },
    getTimeStrape() {
      return new Date().getTime();
    },
    closeMoreOpen(index) {
      for (let i = 0; i < this.presentList.length; i++) {
        this.presentList[i].showMore = false;
        this.presentList[i].isModify = false;
        if (index == i) {
          this.presentList[i].showMore = true;
        }
      }
    },
    activityDetail(id) {
      if (id) {
        this.Global.doPost("displayYxtg/getPresentList.json", { id }, res => {
          this.presentList = [];
          if (res && res.length) {
            for (let i = 0; i < res.length; i++) {
              let obj = {};
              obj["id"] = res[i].id;
              obj["activityTag"] = res[i].activityTag;
              obj["isModify"] = false;
              obj["showMore"] = false;
              obj["type"] = "";
              this.presentList.push(obj);
            }
          }
        });
      } else {
        this.$Message.error("该活动下暂无分组");
      }
    },
    init(index) {
      var obj1 = {};
      let id = "";
      let auditData = this.presentList[index];
      if (auditData.id) {
        id = auditData.id;
      } else {
        id = index;
      }
      var bb = `b${this.brandId}a${this.id}g${id}`;
      if (this.isSku == 1 && this.skuSettingData[bb]) {
        obj1["skuLimit"] = this.skuSettingData[bb].skuNumberRule;
        obj1["skuRule"] = this.skuSettingData[bb].skuRule;
        if (
          this.skuSettingData[bb].recoredSkuList &&
          this.skuSettingData[bb].recoredSkuList.length
        ) {
          let sArr = [];
          for (
            let x = 0;
            x < this.skuSettingData[bb].recoredSkuList.length;
            x++
          ) {
            sArr.push(this.skuSettingData[bb].recoredSkuList[x].id);
          }
          obj1["skuList"] = sArr;
        }
      }
      obj1["activityId"] = this.id;
      obj1["isSkuNecessary"] = 0;
      obj1["activityTag"] = encodeURI(auditData.activityTag);
      obj1["endWinTime"] = this.Global.setHoursData(
        auditData.endWinTime,
        auditData.endHour
      );
      if (auditData.isSkuNum) {
        if (!auditData.skuNum) {
          this.$Message.error("请输入sku数量");
          return false;
        }
        obj1["skuNum"] = auditData.skuNum;
      }
      if (auditData.isSkuNecessary) {
        obj1["isSkuNecessary"] = 1;
        if (!Object.keys(this.skuData).length) {
          this.$Message.info("请配置SKU必备项");
          return false;
        }
        obj1["skuNecessary"] = this.skuData.skuNecessary;
        obj1["label"] = this.skuData.label;
        obj1["skuExpression"] = this.skuData.skuExpression;
      } else {
        obj1["isSkuNecessary"] = 0;
      }
      // obj1["content"] = this.transformText(auditData.content);
      obj1["content"] = encodeURI(this.transformText(auditData.content));
      obj1["auditPolicy"] = this.transformText(auditData.auditPolicy);
      obj1["imageUrl"] = auditData.imageUrl;
      obj1["pictureUrl"] = auditData.pictureUrl;
      obj1["radioUrl"] = auditData.radioUrl;

      obj1["presentType"] = auditData.presentType;
      obj1["minAmount"] = auditData.minAmount;
      obj1["maxAmount"] = auditData.maxAmount;
      if (auditData.presentType == 1 || auditData.presentType == 0) {
        obj1["goodsId"] = auditData.goodsId;
      }
      var api;
      if (auditData.type == "add") {
        api = "displayYxtg/saveActivityPresentInfo.json";
      } else {
        api = "displayYxtg/updateActivityPresentInfo.json";
        obj1["id"] = auditData.id;
      }
      if (auditData.isOpenCheck) {
        obj1["isOpenCheck"] = 1;
        let arr = auditData.checkProject;
        // if (!arr.length) {
        //   this.$Message.info("请添加必备项");
        //   return false;
        // }
        if (
          !auditData.isSkuNum &&
          !auditData.isSkuNecessary &&
          arr.length == 0
        ) {
          this.$Message.info("请添加sku数量或者配置SKU必备项或添加考核项");
          return false;
        }
        for (let i = 0; i < arr.length; i++) {
          if (!arr[i]) {
            this.$Message.info("请填写必备项");
            return false;
          }
        }
        obj1["checkProject"] = arr;
      } else {
        obj1["isOpenCheck"] = 0;
      }
      this.Global.doPost(api, obj1, res => {
        this.$Message.success("成功");
        this.activityDetail(this.id);
      });
    },
    goBack() {
      this.$router.push({ path: "/displayReward" });
    },
    transforRuleText(str) {
      let index = str.indexOf("||");
      if (index != -1) {
        str = str.split("||").join("|");
      }
      return str.replace(/\|/g, "\r\n");
    },
    transformText(str) {
      if (str) {
        str = str.replace(/\n/g, "|");
        let index = str.indexOf("|陈列要求");
        if (index != -1) {
          str = str.split("|陈列要求").join("||陈列要求");
        }
        return str;
      }
    }
  }
};
</script> 