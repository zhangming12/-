<style lang="less" scoped>
.check-boxs {
  display: flex;
  flex-direction: row;
  cursor: pointer;
  .check {
    width: 100%;
    height: 36px;
    line-height: 36px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
}
.modal-main {
  .topBox {
    width: 100%;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 10px;
    .conBox,
    .videoBox {
      width: 50%;
    }
    .conBox {
      display: flex;
      flex-direction: row;
      // align-items: center;
      .item-box {
        line-height: 36px;
        font-size: 12px;
        p {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .status {
          width: 80px;
        }
      }
    }
    .videoBox {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      height: 250px;
      // height: 213px;
      video {
        width: 250px;
        height: 213px;
      }
      img.triangle {
        position: absolute;
        top: 0;
        left: 0;
      }
      .left,
      .right {
        position: absolute;
        top: 0;
        width: 40px;
        z-index: 100;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .left {
        left: 0;
      }
      .right {
        right: 0;
      }
      .imageBox {
        display: flex;
        justify-content: center;
        align-items: center;

        flex-direction: row;
        img {
          display: inline-block;
          max-height: 250px;
        }
      }
    }
  }
  .main-box {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    padding-top: 10px;
    .main-left {
      width: 666px;
      .search-box {
        display: flex;
        justify-content: flex-start;
        span {
          width: 80px;
        }
        .checkbox-group {
          flex: 1;
        }
      }
      .select-box {
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        .s-left,
        .s-right {
          width: 47%;
          margin-left: 2%;
          .sMain {
            border: 1px solid #e5e5e5;
            border-radius: 4px;
            height: 320px;
            padding: 5px;
            box-sizing: border-box;
            .keyWord {
              height: 24px;
              line-height: 24px;
              font-size: 12px;
              span {
                margin-right: 10px;
                cursor: pointer;
                &.active {
                  color: red;
                }
              }
            }
            .sBox {
              height: 264px;
              padding: 0 5px;
              // box-sizing: border-box;
              overflow-y: auto;
            }
          }
          .s-box {
            display: flex;
            justify-content: flex-start;
            flex-direction: row;
            line-height: 30px;
            .s-item {
              width: 50%;
            }
            .t-contant {
              width: 200px;
              height: auto;
              display: flex;
              justify-content: center;
              align-items: center;
              padding: 10px;
              img {
                display: block;
                max-width: 200px;
              }
            }
          }
        }
      }
    }
    .main-right {
      width: 333px;
      margin-left: 1px;
      height: 350px;
      position: relative;

      .arrow-left,
      .arrow-right {
        position: absolute;
        top: 0;
        display: flex;
        height: 100%;
        justify-content: center;
        align-items: center;
        width: 30px;
        .btn {
          cursor: pointer;
        }
      }
      .arrow-right {
        right: 0;
      }
      .arrow-left {
        left: 0;
      }
      .image-con {
        width: 270px;
        margin-left: 31px;
        height: 320px;
        border: 1px solid #e5e5e5;
        border-radius: 4px;
      }
      .saveBtn {
        position: absolute;
        bottom: 0px;
        right: 10px;
      }
    }
  }
}
.modal-footer {
  width: 0;
  height: 0;
  display: none;
}
</style>

<template>
  <div class="check-boxs">
    <div class="check">
      <span>考核项：</span>
      <Checkbox-group v-model="checkedList" @on-change="radioChange">
        <Checkbox
          :disabled="item.disabled"
          :label="item.key"
          v-for="(item,index) in checkBoxData"
          :key="index"
        >{{ item.name }}</Checkbox>
      </Checkbox-group>
      <Button v-if="showAudit" class="btn" type="info" size="small" @click="showModal">审核</Button>
    </div>
    <Modal v-model="showToolTip" width="1000" title="SKU审核">
      <div class="modal-main">
        <div class="topBox">
          <div class="conBox">
            <Row style="width:100%;">
              <Col span="8">
                <div class="item-box">
                  <p>
                    <span>提交时间：</span>
                    <span>{{ allData.submitTime | formatYearMonth}}</span>
                  </p>
                </div>
                <div class="item-box">
                  <p :title="allData.activityTag">
                    <span>活动分组：</span>
                    <span>{{ allData.activityTag }}</span>
                  </p>
                </div>
                <div class="item-box">
                  <p :title="allData.workerName">
                    <span>业代姓名：</span>
                    <span>{{ allData.workerName }}</span>
                  </p>
                </div>
                <div class="item-box">
                  <p>
                    <span>AI审核状态：</span>
                    <span>{{ allData.aiStatus | aiFilter }}</span>
                  </p>
                </div>
                <div class="item-box">
                  <span>审核状态：</span>
                  <span :class="allData.checkStatus == 1001? 'warnColor' :''">未审核</span>
                </div>
              </Col>
              <Col span="8">
                <div class="item-box">
                  <span>客户编号：</span>
                  <span>{{ allData.joinCode }}</span>
                </div>
                <div class="item-box">
                  <p :title="getWeek(allData.startTime,allData.endTime)">
                    <span>上传周期：</span>
                    <span>{{ getWeek(allData.startTime,allData.endTime) }}</span>
                  </p>
                </div>
                <div class="item-box">
                  <span>销售路线：</span>
                  <span>{{ allData.salesRoute }}</span>
                </div>
                <div class="item-box">
                  <span>拍摄人员：</span>
                  <span>{{ allData.radioChannel | storeOrWorker}}</span>
                </div>
                <div class="item-box">
                  <span>渠道：</span>
                  <span>{{ allData.bapChannel }}</span>
                </div>
              </Col>
              <Col span="8">
                <div class="item-box">
                  <p :title="allData.activityName">
                    <span>活动名称：</span>
                    <span>{{ allData.activityName }}</span>
                  </p>
                </div>
                <div class="item-box">
                  <span>门店名称：</span>
                  <span>{{ allData.storeName }}</span>
                </div>
                <div class="item-box">
                  <p :title="allData.storeRange > 200 ? '位置偏移' : ''">
                    <span>预警：</span>
                    <span
                      :class="allData.storeRange > 200 ? 'warnColor' : ''"
                    >{{ allData.storeRange > 200 ? "位置偏移" :"无" }}</span>
                  </p>
                </div>
                <div class="item-box">
                  <span>视频编号：</span>
                  <span>{{ allData.id }}</span>
                </div>
              </Col>
            </Row>
          </div>
          <div class="videoBox" v-if="fileType == 'radio'">
            <video ref="modalvideo" controls :src="allData.radioUrl" id="myVideo"></video>
          </div>
          <div class="videoBox" v-else>
            <imageLook :key="allData.imageList[0]" position="left" :imageList="allData.imageList"/>
          </div>
        </div>
        <div class="main-box">
          <div class="main-left">
            <div class="search-box">
              <span>考核项:</span>
              <Checkbox-group class="checkbox-group" v-model="checkedList" @on-change="radioChange">
                <Checkbox
                  :disabled="item.disabled"
                  :label="item.key"
                  v-for="(item,index) in checkBoxData"
                  :key="index"
                >{{ item.name }}</Checkbox>
              </Checkbox-group>
            </div>
            <div class="select-box">
              <div class="s-left">
                <h3>待选</h3>
                <div class="sMain">
                  <div class="keyWord">
                    <span
                      @click="keyWordClick('left',item)"
                      :class="{'active':item == leftKeyWord}"
                      v-for="(item,index) in keyWordList"
                      :key="item"
                    >{{ item }}</span>
                  </div>
                  <div class="s-input">
                    <Input
                      @input="filterSku"
                      v-model.trim="leftWord"
                      placeholder="请搜索关键字"
                      clearable
                      style="display:block;"
                    />
                  </div>
                  <div class="sBox">
                    <CheckboxGroup @on-change="leftCheckChange" v-model="selectedLable">
                      <div class="s-box" v-for="(item,index) in filterAllSkuList" :key="item.id">
                        <Checkbox :label="item.id">
                          <span>{{ item.skuName }}</span>
                        </Checkbox>
                      </div>
                    </CheckboxGroup>
                  </div>
                </div>
              </div>
              <div class="s-right">
                <h3>
                  已选
                  <span>{{ filterSkuList.length }}</span>
                  <Button type="info" size="small" @click="testing">检测</Button>
                </h3>
                <div class="sMain">
                  <div class="keyWord">
                    <span
                      @click="keyWordClick('right',item)"
                      :class="{'active':item == rightKeyWord}"
                      v-for="(item,index) in keyWordList"
                      :key="item"
                    >{{ item }}</span>
                  </div>
                  <div class="s-input">
                    <Input
                      @input="filterChecked"
                      v-model.trim="rightWord"
                      placeholder="请搜索关键字"
                      clearable
                      style="display:block;"
                    />
                  </div>
                  <div class="sBox">
                    <CheckboxGroup v-model="filterSkuList">
                      <div class="s-box" v-for="(item,index) in filterCheckedSkuList" :key="item">
                        <Checkbox disabled :label="item">
                          <span>{{ item }}</span>
                        </Checkbox>
                      </div>
                    </CheckboxGroup>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="main-right">
            <div class="arrow-left"></div>
            <div class="arrow-right"></div>
            <div class="image-con">
              <img src alt>
            </div>
            <Button type="primary" class="saveBtn" size="small" @click="save">保存</Button>
          </div>
        </div>
      </div>
      <div slot="footer" class="modal-footer"></div>
    </Modal>
  </div>
</template>

<script>
import imageLook from "@/components/imgLook/img-look.vue";
export default {
  name: "check-look",
  components: {
    imageLook
  },
  data() {
    return {
      dom: null,
      skuNum: null,
      leftWord: "",
      rightWord: "",
      allSkuList: [], //该分组下的所有sku
      filterCheckedSkuList: [],
      filterSkuList: [],
      checkedList: [...this.checkList], //已选中
      showToolTip: false,
      leftKeyWord: "",
      rightKeyWord: "",
      firstImageUrl: null,
      selectedLable: [], //已选sku
      allSkuList: [],
      filterAllSkuList: [],
      selectSkuList: [],
      filterSelectSkuList: [],
      keyWordList: [], //关键字列表
      thisRadioSrc: null //本次视频地址
    };
  },
  props: {
    fileType: {
      type: String,
      default: "radio"
    },
    index: {
      type: Number,
      default: 0
    },
    allData: {
      type: Object,
      default() {
        return {};
      }
    },
    position: {
      type: String,
      default: "right"
    },
    showAudit: {
      type: Boolean,
      default: true
    },
    presentId: {
      type: [Number, String],
      default: ""
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    checkList: {
      type: Array,
      default() {
        return [];
      }
    },
    ind: {
      type: Number,
      default: 0
    }
  },
  mounted() {
    if (this.fileType == "radio") {
      this.dom = document.getElementById("myVideo");
      let self = this;
      window.addEventListener(
        "keyup",
        function(e) {
          if (self.dom) {
            if (e.keyCode == 32) {
              if (self.dom.paused) {
                self.dom.play();
              } else {
                self.dom.pause();
              }
            }
          }
        },
        false
      );
    }
  },
  beforeDestory() {
    window.removeEventListener("keyup");
  },
  computed: {
    checkBoxData() {
      let data = this.allData.presentSkuVO;
      let arr = [];
      let arr1 = [];
      if (data && this.allData.isOpenCheck == 1) {
        arr = JSON.parse(data.checkProject);
      }
      arr.forEach(item => {
        arr1.push({
          name: item,
          disabled: false,
          key: item
        });
      });
      let data1 = {};

      if (data.skuNum) {
        this.skuNum = data.skuNum;
        arr1.push({
          name: data.skuNum + "个SKU",
          disabled: false,
          key: "skuNum"
        });
      }
      if (data.isSkuNecessary == 1) {
        arr1.push({
          name: "SKU品类考核",
          disabled: true,
          key: "skuNessery"
        });
      }
      arr1.forEach(item => {
        data1[item.name] = "0";
      });

      this.$emit("getRadioData", {
        index: this.ind,
        data: data1,
        len: arr1.length
      });
      return arr1;
    }
  },
  destroyed() {
    this.checkedList = [];
  },
  methods: {
    //待选--选择逻辑
    leftCheckChange(val) {
      let arr = [];
      if (val && val.length) {
        val.forEach(item => {
          this.allSkuList.forEach(v => {
            if (v.id == item) arr.push(v.skuName);
          });
        });
      }
      this.filterSkuList = [...arr];
      this.filterChecked(this.rightWord);
    },
    //关键词点击逻辑
    keyWordClick(dir, item) {
      if (dir == "left") {
        if (this.leftKeyWord == item) {
          this.leftKeyWord = "";
        } else {
          this.leftKeyWord = item;
        }
        this.filterSku();
      } else {
        if (this.rightKeyWord == item) {
          this.rightKeyWord = "";
        } else {
          this.rightKeyWord = item;
        }
        this.filterChecked();
      }
    },
    //筛选已选择的
    filterChecked() {
      let val = this.rightKeyWord + this.rightWord;
      let arr1 = [];
      let arr = [];
      if (this.rightKeyWord) {
        this.filterSkuList.forEach(item => {
          if (item.indexOf(this.rightKeyWord) != -1) {
            arr.push(item);
          }
        });
      } else {
        arr = [...this.filterSkuList];
      }
      if (this.rightWord) {
        arr.forEach(item => {
          if (item.indexOf(this.rightWord) != -1) {
            arr1.push(item);
          }
        });
      } else {
        arr1 = [...arr];
      }
      this.filterCheckedSkuList = [...arr1];
    },
    //筛选SKU
    filterSku() {
      let arr = [];
      let arr1 = [];
      if (this.leftKeyWord) {
        this.allSkuList.forEach(item => {
          if (item.skuName.indexOf(this.leftKeyWord) != -1) {
            arr.push(item);
          }
        });
      } else {
        arr = [...this.allSkuList];
      }
      if (this.leftWord) {
        arr.forEach(item => {
          if (item.skuName.indexOf(this.leftWord) != -1) {
            arr1.push(item);
          }
        });
      } else {
        arr1 = [...arr];
      }
      this.filterAllSkuList = [...arr1];
    },
    //保存函数
    save() {
      this.$emit("getSkuNecessary", {
        skuNecessary: this.selectedLable.sort((a, b) => a - b),
        index: this.ind
      });
      this.testing();
      this.showToolTip = false;
      this.radioChange(this.checkedList);
    },
    //检测
    testing() {
      let skuNecessary = this.selectedLable.sort((a, b) => a - b);
      let data = {
        presentId: this.presentId,
        skuNecessary
      };
      this.Global.doPost("displayYxtg/auditSkuNecessary.json", data, res => {
        if (this.skuNum) {
          if (this.selectedLable.length >= this.skuNum) {
            if (this.checkedList.indexOf("skuNum") == -1) {
              this.checkedList.push("skuNum");
            }
          } else {
            let i = this.checkedList.indexOf("skuNum");
            if (i != -1) {
              this.checkedList.splice(i, 1);
            }
          }
        }

        if (res && this.checkedList.indexOf("skuNessery") == -1) {
          this.checkedList.push("skuNessery");
        }
      });
    },
    //根据分组ID查询该分组下的所有SKU
    queryAllSkuData() {
      let data = {
        presentId: this.presentId
      };
      this.Global.doPost(
        "displayYxtg/querySkuDetailAndLabelByPresentId.json",
        data,
        res => {
          this.allSkuList = res.list;
          this.filterAllSkuList = [...this.allSkuList];
          this.keyWordList = res.label.split(",");
          this.showToolTip = true;
        }
      );
    },
    //多选框监控函数
    radioChange(val) {
      let data = {};
      this.checkBoxData.forEach(item => {
        if (item.name == "skuNum") {
          data[this.skuNum + "个SKU"] = "0";
        } else if (item.name == "skuNessery") {
          data["SKU品类考核"] = 0;
        } else data[item.name] = 0;
      });
      if (val && val.length) {
        val.forEach(item => {
          if (item == "skuNum") {
            data[this.skuNum + "个SKU"] = 1;
          } else if (item == "skuNessery") {
            data["SKU品类考核"] = 1;
          } else data[item] = 1;
        });
      }
      this.$emit("getRadioData", {
        index: this.ind,
        data,
        len: this.checkBoxData.length
      });
    },
    //时间处理
    getWeek(start, end) {
      return `${this.formatTime(start)}至${this.formatTime(end)}`;
    },
    //时间处理
    formatTime(time) {
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
    //展示弹窗
    showModal() {
      this.queryAllSkuData();
    }
  },
  filters: {
    //判断是门店还是业务员
    storeOrWorker(val) {
      let str = "";
      if (val == "main" || val == "staff") {
        str = "门店";
      } else if (val == "worker") {
        str = "业务员";
      }
      return str;
    },
    //格式化时间
    formatYearMonth(time) {
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
    //状态筛选
    aiFilter(val) {
      let str = "";
      if (val == 0) {
        str = "不通过";
      } else if (val == 1) {
        str = "通过";
      } else if (val == 10) {
        str = "人工介入";
      } else {
        str = "无";
      }
      return str;
    }
  }
};
</script>