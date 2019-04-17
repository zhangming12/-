// 上传周期配置
<style lang="less" scoped>
.upload-weeks {
  display: block;
  width: 100%;
  .week {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    span {
      color: #777;
      font-size: 14px;
    }
  }
  .upload-btn {
    background-color: white;
    color: #ffa15d;
    border: none;
    font-weight: 500;
    font-size: 14px;
  }
}
.model-main {
  .l-title {
    text-align: center;
  }
  .title {
    border-bottom: 1px solid #e5e5e5;
    line-height: 40px;
    span {
      display: inline-block;
      margin-right: 20px;
    }
  }
  .main {
    padding-top: 10px;
    .top {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      span {
        cursor: pointer;
        &:hover {
          color: #ffa15d;
        }
      }
    }
    .labelBox {
      overflow: hidden;
      padding-top: 10px;
      div {
        float: left;
        margin-left: 20px;
        cursor: pointer;
        background-color: #e5e5e5;
        padding: 5px 20px;
        margin-bottom: 10px;
        border-radius: 2px;
        &.active {
          color: white;
          font-weight: 500;
          background-color: #ffa15d;
        }
      }
    }
    .setting {
      padding-top: 15px;
      ul li:first-child > div {
        color: #777;
      }
      ul li div {
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        padding: 0 5px;
        text-align: center;
      }
      .add {
        text-align: center;
        margin: 10px 0;
        span {
          display: inline-block;
          padding: 10px 60px;
          cursor: pointer;
          background-color: #e5e5e5;
          border-radius: 2px;
        }
      }
    }
    .elseBox {
      text-align: center;
      height: 150px;
      line-height: 150px;
      font-size: 30px;
      color: #777;
      font-weight: 600;
    }
  }
}
</style>
<template>
  <div class="upload-weeks">
    <div class="week">
      <Button class="upload-btn" type="primary" @click="showModel = true;">上传周期管理</Button>
      <span>{{ weekdata }}</span>
    </div>

    <!-- 配置周期 弹窗-->
    <Modal v-model="showModel" width="800" title="周期配置">
      <div class="model-main">
        <div class="title">
          <span>上传周期</span>
          <RadioGroup @on-change="uploadTypeChange" v-model="uploadPeriod">
            <Radio :disabled="dis" label="week">
              <span>自然周</span>
            </Radio>
            <Radio :disabled="dis" label="hbkl">
              <span>445</span>
            </Radio>
          </RadioGroup>
        </div>
        <div class="main">
          <div class="top">
            <Checkbox
              @on-change="settingMonthChange"
              :disabled="!uploadPeriod"
              v-model="configureMonth"
            >启用配置月</Checkbox>
            <span @click="showLabel" v-if="configureMonth && uploadPeriod">配置标签</span>
          </div>
          <div class="labelBox" v-if="uploadPeriod && configureMonth && labelList.length">
            <div
              :class="{'active':item.active}"
              v-for="item in labelList"
              :key="item.name"
              @click="changeLabel(item)"
            >{{ item.name }}</div>
          </div>
          <div class="setting" v-if="configureMonth && uploadPeriod">
            <ul>
              <li>
                <Row>
                  <Col span="5">
                    <div>
                      <span>月度</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <span>开始时间</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <span>结束时间</span>
                    </div>
                  </Col>
                  <Col span="4">
                    <div>
                      <span>周</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <span>操作</span>
                    </div>
                  </Col>
                </Row>
              </li>
              <li v-for="(item,index) in settingData" :key="index">
                <Row>
                  <Col span="5">
                    <div>
                      <DatePicker
                        v-if="item.type == 'add' || item.type == 'edit'"
                        type="month"
                        v-model="item.periodMonth"
                        placeholder="月度"
                        format="yyyy-MM"
                      ></DatePicker>
                      <span v-else>{{ item.periodMonth | filterMonth }}</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <DatePicker
                        v-if="item.type == 'add' || item.type == 'edit'"
                        type="date"
                        v-model="item.startTime"
                        :disabled="item.type == 'edit' && judgeDis(item.startTime)"
                        :options="startTimeOption"
                        placeholder="开始时间"
                        format="yyyy-MM-dd"
                      ></DatePicker>
                      <span v-else>{{ item.startTime | filterDay }}</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <DatePicker
                        v-if="item.type == 'add' || item.type == 'edit'"
                        type="date"
                        v-model="item.endTime"
                        :disabled="item.type == 'edit' && judgeDis(item.endTime)"
                        :options="endTimeOptions"
                        placeholder="结束时间"
                        format="yyyy-MM-dd"
                      ></DatePicker>
                      <span v-else>{{ item.endTime | filterDay }}</span>
                    </div>
                  </Col>
                  <Col span="4">
                    <div>
                      <span>{{ item.periods }}周</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <Button
                        type="success"
                        @click="save('set',index)"
                        v-if="item.type == 'add' || item.type == 'edit'"
                        size="small"
                      >确认</Button>
                      <Button type="primary" v-else @click="edit(index)" size="small">编辑</Button>
                      <Button type="info" @click="remove(index)" size="small">删除</Button>
                    </div>
                  </Col>
                </Row>
              </li>
            </ul>
            <div class="add">
              <span @click="addWeeks('set')">
                <Icon size="20" type="md-add"/>
              </span>
            </div>
          </div>
          <div v-else class="elseBox">已有默认项目，无需配置</div>
        </div>
      </div>
      <div slot="footer">
        <Button type="info" @click="showModel = false">取消</Button>
        <Button type="primary" @click="ok">确定</Button>
      </div>
    </Modal>
    <!-- 配置标签 弹窗-->
    <Modal v-model="showlabelSetting" width="800" title="配置标签">
      <div class="model-main">
        <div class="l-title">
          <Input style="width:200px;" placeholder="请输入标签名" v-model="labelName"></Input>
        </div>
        <div class="main">
          <div class="setting">
            <ul>
              <li>
                <Row>
                  <Col span="5">
                    <div>
                      <span>月度</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <span>开始时间</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <span>结束时间</span>
                    </div>
                  </Col>
                  <Col span="4">
                    <div>
                      <span>周</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <span>操作</span>
                    </div>
                  </Col>
                </Row>
              </li>
              <li v-for="(item,index) in labelSettingData" :key="index">
                <Row>
                  <Col span="5">
                    <div>
                      <DatePicker
                        v-if="item.type == 'add'"
                        type="month"
                        v-model="item.periodMonth"
                        placeholder="月度"
                        format="yyyy-MM"
                      ></DatePicker>
                      <span v-else>{{ item.periodMonth | filterMonth }}</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <DatePicker
                        v-if="item.type == 'add'"
                        type="date"
                        v-model="item.startTime"
                        :options="startTimeOption"
                        placeholder="开始时间"
                        format="yyyy-MM-dd"
                      ></DatePicker>
                      <span v-else>{{ item.startTime | filterDay }}</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <DatePicker
                        v-if="item.type == 'add'"
                        type="date"
                        v-model="item.endTime"
                        :options="endTimeOptions"
                        placeholder="结束时间"
                        format="yyyy-MM-dd"
                      ></DatePicker>
                      <span v-else>{{ item.endTime | filterDay }}</span>
                    </div>
                  </Col>
                  <Col span="4">
                    <div>
                      <span>{{ item.periods }}周</span>
                    </div>
                  </Col>
                  <Col span="5">
                    <div>
                      <Button
                        type="success"
                        @click="save('label',index)"
                        v-if="item.type == 'add'"
                        size="small"
                      >确认</Button>
                      <Button type="primary" v-else @click="labelEdit(index)" size="small">编辑</Button>
                      <Button type="info" @click="labelRemove(index)" size="small">删除</Button>
                    </div>
                  </Col>
                </Row>
              </li>
            </ul>
            <div class="add">
              <span @click="addWeeks('label')">
                <Icon size="20" type="md-add"/>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer">
        <Button type="info" @click="showlabelSetting = false">取消</Button>
        <Button type="primary" @click="labelOk">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "upload-weeks",
  data() {
    return {
      configureMonth: this.CM, //启用配置月
      showModel: false, //配置周期
      showlabelSetting: false, //配置标签
      uploadPeriod: this.UP,
      labelSettingData: [],
      settingData: [...this.modelList],
      labelList: [], //标签数据
      labelName: "", //标签名称
      weekdata: ""
    };
  },
  watch: {
    info(val) {
      if (val) {
        this.weekdata = val;
      }
    },
    showlabelSetting(val) {
      if (!val) {
        this.labelName = "";
        this.labelSettingData = [];
      }
    },
    CM(val) {
      if (val) {
        this.configureMonth = true;
        // this.queryLabel();
      }
    },
    UP(val) {
      if (val) {
        this.uploadPeriod = val;
        this.queryLabel();
      }
    },
    modelList(val) {
      if (val) {
        this.settingData = [...val];
      }
    }
  },
  created() {},
  computed: {
    // 根据选择的周期类型判断开始时间只能选择周几 自然周--周一  445--周六
    startTimeOption() {
      let week = this.uploadPeriod == "week" ? 1 : 6;
      return {
        disabledDate(date) {
          return date && date.getDay() != week;
        }
      };
    },
    // 根据选择的周期类型判断结束时间只能选择周几 自然周--周天  445--周五
    endTimeOptions() {
      let week = this.uploadPeriod == "week" ? 0 : 5;
      return {
        disabledDate(date) {
          return date && date.getDay() != week;
        }
      };
    }
  },
  props: {
    dis: {
      type: Boolean,
      default: false
    },
    modelList: {
      type: Array,
      default() {
        return [];
      }
    },
    UP: {
      type: [String],
      default: ""
    },
    CM: {
      type: [Boolean],
      default: false
    },
    info: {
      type: String
    }
  },
  methods: {
    //判断时间是都可以修改
    judgeDis(time) {
      if (!time) return false;
      let nowTime = Date.now();
      time = this.timeToStampe(time);
      if (time > nowTime) {
        return false;
      }
      return true;
    },
    //启用配置月
    settingMonthChange(val) {
      if (val)
        //当启用的时候查询所选周期类型下的标签
        this.queryLabel();
    },
    //获取当前时间在哪一个周期内的下一个月度周期
    getWeekData() {
      let str = "",
        timestamp = Date.now(),
        len = this.settingData.length,
        i = null;

      if (len) {
        this.settingData.forEach((item, index) => {
          if (
            this.timeToStampe(item.startTime) <= timestamp &&
            timestamp <= this.timeToStampe(item.endTime)
          ) {
            i = index;
          }
        });
      }

      if (i !== null) {
        let data = this.settingData[++i];
        if (data) {
          str = `(
                ${this.uploadPeriod == "week" ? "自然周" : "445周"}，
                ${new Date(data.startTime).pattern("yyyy-MM-dd")} 至
                ${new Date(data.endTime).pattern("yyyy-MM-dd")},${
            data.periods
          }周)`;
        }
      }
      return str;
    },
    //标签切换
    changeLabel(item) {
      //当点击的是选中的标签，取消选中状态
      if (item.active) {
        this.$set(item, "active", false);
        return;
      }
      //否则，取消其他的标签的选中状态
      this.labelList.forEach(val => {
        val.active = false;
      });
      //将当前点击的标签置为选中状态
      this.$set(item, "active", true);
      //根据标签ID查询标签内容
      this.queryLabelDetail(item.id);
    },
    //查询标签内容详情
    queryLabelDetail(labelId) {
      this.Global.doPost(
        "displayYxtg/getPeriodLableById.json",
        { id: labelId },
        res => {
          this.settingData = res;
        }
      );
    },
    //配置标签
    labelOk() {
      if (!this.labelName) {
        this.$Message.info("请输入标签名称");
        return false;
      }
      if (!this.validateTime(this.labelSettingData)) {
        return false;
      }
      let data = {
        name: this.labelName,
        type: this.uploadPeriod
      };
      let content = {
        presentId: -1
      };
      let modelList = [];

      this.labelSettingData.forEach(item => {
        let { periodMonth, startTime, endTime, periods } = item;
        startTime = new Date(startTime).pattern("yyyy-MM-dd");
        endTime = new Date(endTime).pattern("yyyy-MM-dd");
        periodMonth = new Date(periodMonth).pattern("yyyy-MM");
        let obj = { periodMonth, startTime, endTime, periods };
        modelList.push(obj);
      });
      content["modelList"] = modelList;
      data["content"] = content;
      this.Global.doPost("displayYxtg/addPeriodLable.json", data, res => {
        this.$Message.success("标签配置成功");
        let obj = {
          id: res,
          name: this.labelName,
          active: false
        };
        this.labelList.push(obj);
        this.showlabelSetting = false;
      });
    },
    //显示配置标签
    showLabel() {
      this.showlabelSetting = true;
    },
    //查询标签
    queryLabel() {
      let data = {
        type: this.uploadPeriod
      };
      this.Global.doPost("displayYxtg/queryPeriodLable.json", data, res => {
        if (res && res.length) {
          res.forEach(item => {
            item.active = false;
          });
          this.labelList = res;
        } else {
          this.labelList = [];
        }
      });
    },
    //周期类型切换
    uploadTypeChange(val) {
      this.settingData = [];
      //当开启了配置月时查询标签
      if (this.configureMonth) {
        this.queryLabel();
      }
    },
    //根据开始时间与结束时间计算之间包含了多少周
    computeWeeks(start, end) {
      let weekStampe = 7 * 24 * 60 * 60 * 1000;
      let weeks =
        (this.timeToStampe(end) - this.timeToStampe(start)) / weekStampe;
      return Math.ceil((end - start) / weekStampe); //向上取整
    },
    //时间转时间戳
    timeToStampe(str) {
      if (typeof str == "object") {
        return new Date(str).getTime();
      }
      str = str.replace(/-/g, "/");
      var timestamp = new Date(str).getTime();
      return timestamp;
    },
    ok() {
      let query = {};
      if (!this.uploadPeriod) {
        this.$Message.info("请选择上传周期");
        return;
      }
      query["uploadPeriod"] = this.uploadPeriod;
      if (this.configureMonth) {
        //启用了配置月
        query["configureMonth"] = 1;
        if (!this.settingData.length) {
          this.$Message.info("请配置周期");
          return;
        }
        let modelList = [];
        if (!this.validateTime(this.settingData)) {
          return false;
        }
        this.settingData.forEach(item => {
          let { periodMonth, startTime, endTime, periods } = item;
          startTime = new Date(startTime).pattern("yyyy-MM-dd");
          endTime = new Date(endTime).pattern("yyyy-MM-dd");
          periodMonth = new Date(periodMonth).pattern("yyyy-MM");
          let obj = { periodMonth, startTime, endTime, periods };
          modelList.push(obj);
        });
        query["modelList"] = modelList;
      } else {
        query["configureMonth"] = 0;
        query["modelList"] = null;
      }
      this.$emit("getWeeksData", query);
      this.showModel = false;

      this.weekdata = this.getWeekData();
    },
    addWeeks(type) {
      let obj = {
        periodMonth: "",
        startTime: "",
        endTime: "",
        periods: "",
        type: "add"
      };
      let str = "",
        index = null;
      if (type === "set") {
        str = "settingData";
      } else if (type === "label") {
        str = "labelSettingData";
      }
      let flag = false;
      this[str].forEach((item, i) => {
        if (item.type == "add" || item.type == "edit") {
          flag = true;
          index = i;
        }
      });
      if (flag) {
        this.$Modal.confirm({
          title: "警告",
          content: "您还有配置项未保存，是否确认保存并新增？",
          onOk: () => {
            if (this.save(type, index)) this[str].push(obj);
          }
        });
      } else {
        this[str].push(obj);
      }
    },
    //验证时间是否重叠
    validateTime(arr) {
      let len = arr.length;
      if (!len) {
        return false;
      }
      let set = new Set();
      for (let i = 0; i < len; i++) {
        let { startTime, endTime, periodMonth } = arr[i];
        periodMonth = new Date(periodMonth).pattern("yyyy-MM");
        set.add(periodMonth);
        startTime = this.timeToStampe(startTime);
        endTime = this.timeToStampe(endTime);
        if (!startTime || !endTime || !periodMonth) {
          this.$Message.info("周期时间不能为空");
          return false;
        }
        if (startTime >= endTime) {
          this.$Message.info("同一周期内开始时间必须小于结束时间");
          return false;
        }
        for (let n = 0; n < len; n++) {
          if (i == n) {
            continue;
          }
          let n_startTime = this.timeToStampe(arr[n].startTime);
          let n_endTime = this.timeToStampe(arr[n].endTime);
          if (startTime >= n_startTime && startTime <= n_endTime) {
            this.$Message.info("周期时间重叠，请检查");
            return false;
          }
          if (endTime >= n_startTime && endTime <= n_endTime) {
            this.$Message.info("周期时间重叠，请检查");
            return false;
          }
        }
      }
      if (set.size != len) {
        this.$Message.info("周期月度重叠，请检查");
        return false;
      }
      return true;
    },
    //标签时间删除
    labelRemove(index) {
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该项配置？",
        onOk: () => {
          this.labelSettingData.splice(index, 1);
        }
      });
    },
    //标签时间编辑
    labelEdit(index) {
      this.$set(this.labelSettingData[index], "type", "add");
    },
    //删除
    remove(index) {
      let nowTimeStape = Date.now();
      let { startTime, endTime } = this.settingData[index];
      if (
        this.timeToStampe(startTime) <= nowTimeStape &&
        nowTimeStape <= this.timeToStampe(endTime)
      ) {
        this.$Message.info("活动已经开始，不允许删除");
        return false;
      }
      this.$Modal.confirm({
        title: "警告",
        content: "确定删除该项配置？",
        onOk: () => {
          this.settingData.splice(index, 1);
        }
      });
    },
    //保存
    save(type, index) {
      let str = type == "set" ? "settingData" : "labelSettingData";
      let data = this[str][index];
      let { startTime, endTime, periodMonth } = data;
      startTime = this.timeToStampe(startTime);
      endTime = this.timeToStampe(endTime);
      if (!startTime || !endTime || !periodMonth) {
        this.$Message.info("周期时间不能为空");
        return false;
      }
      if (startTime >= endTime) {
        this.$Message.info("同一周期内开始时间必须小于结束时间");
        return false;
      }
      this.$set(data, "type", "modify");

      let week = this.computeWeeks(data.startTime, data.endTime);
      this.$set(data, "periods", week);
      return true;
    },
    //编辑
    edit(index) {
      let n = null;
      let flag = this.settingData.some((item, i) => {
        if (item.type == "edit") n = i;
        return item.type == "edit";
      });
      if (flag) {
        this.$Modal.confirm({
          title: "警告",
          content: "您还有配置项未保存，是否确认保存并编辑？",
          onOk: () => {
            if (this.save("set", n))
              this.$set(this.settingData[index], "type", "edit");
          }
        });
      } else {
        this.$set(this.settingData[index], "type", "edit");
      }
    }
  },
  filters: {
    //月度时间格式化
    filterMonth(time) {
      return new Date(time).pattern("yyyy-MM");
    },
    //日期时间格式化
    filterDay(time) {
      return new Date(time).pattern("yyyy-MM-dd");
    }
  }
};
</script>