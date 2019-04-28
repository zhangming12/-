<style lang="less" scoped>
@import "../../../config/index.less";
#Main {
  padding: 15px;
}

.box {
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

.time {
  float: left;
  padding: 0px 10px;
  border: 1px solid @primary-color;
  margin-right: 10px;
  cursor: pointer;
}

.select {
  background: @primary-color;
  color: #fff;
}

.Title {
  text-indent: 1%;
  padding-bottom: 15px;
  font-size: 16px;
}

.export {
  height: 24px;
  position: relative;
  div {
    background: @primary-color;
    color: #fff;
    padding: 3px 12px;
    float: right;
    border-bottom: 0;
    position: absolute;
    right: 1px;
    bottom: 10px;
    cursor: pointer;
    i {
      margin-right: 2px;
    }
  }
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

#imgBox {
  height: 120px;
  display: table;
  line-height: 120px;
  .changeImg {
    width: 120px;
    height: 120px;
    display: table-cell;
    vertical-align: middle;
    transform: translateX(20px);
    border: 1px solid #efefef;
    img {
      width: 100%;
      display: block;
    }
  }
}

#rules {
  &:before {
    content: "规则：";
    display: inline-block;
  }
  .rulesTitle {
    display: inline-block;
    width: calc(~"100% - 36px");
    span {
      display: inline-block;
      width: 8%;
      text-align: center;
    }
  }
  #rulesList {
    padding-left: 36px;
    overflow: hidden;
    .radio {
      width: 80px;
      text-align: center;
      height: 44px;
      float: left;
      label {
        margin: 0;
        line-height: 40px;
        span {
          margin: 0;
        }
      }
    }
    .rulesBox {
      width: calc(~"100% - 85px");
      float: left;
      .rulesChild {
        select {
          outline: none;
          height: 24px;
          border-radius: 3px;
          border: 1px solid #dddee1;
        }
        .ivu-input {
          // width: 8.8%;
          width: 90px;
          padding: 1px 7px;
          height: 24px;
          border-radius: 3px;
          text-align: center;
        }
        .rulesBtn {
          transform: translateY(5px);
          display: inline-block;
          color: @primary-color;
        }
      }
    }
  }
}

footer {
  text-align: center;
  margin: 40px 0 20px;
  button {
    display: inline-block;
    width: 76px;
    text-align: center;
    font-size: 16px;
    border: 0;
    outline: none;
    cursor: pointer;
  }
  button:last-child {
    // background:#009847;
    margin-left: 60px;
  }
  .ivu-btn {
    line-height: 1;
  }
}
</style>

<template>
    <div id="Main">
        <h2 class="Title">新建&修改</h2>
        <div class="box">
            <Form ref="form" :model="formData" :label-width="80" :rules="rule">
                <Row>
                    <Col span="10">
                        <Form-item label="活动时间" required>
                            <Row>
                                <Col span="11">
                                <Form-item prop="startTime">
                                    <Date-picker type="datetime" placeholder="选择时间" v-model="formData.startTime" style="width: 100%;"></Date-picker>
                                </Form-item>
                                </Col>
                                <Col span="2" style="text-align: center">至</Col>
                                <Col span="11">
                                <Form-item prop="endTime">
                                    <Date-picker type="datetime" placeholder="选择时间" v-model="formData.endTime" style="width: 100%;"></Date-picker>
                                </Form-item>
                                </Col>
                            </Row>
                        </Form-item>
                        <Form-item label="活动区域" prop="areaCode">
                            <div @click='showTree' class='area'>{{areaName}}</div>

                        </Form-item>
                        <Form-item label="活动样式" prop='pageUrl'>
                            <Input icon="ios-gear-outline" v-model='formData.pageUrl'></Input>
                        </Form-item>
                        
                        <Form-item :label-width="1">
                            <div id="imgBox">
                                <span>新通知消息图片</span>
                                <div class="changeImg">
                                    <img :src="notifyImg" alt="" v-if="notifyImg">
                                    <img src="../../../assets/image/imgBg.png" alt="" v-else>
                                </div>
                                <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
                                style="transform:translateX(40px)"
                                :data="upData" 
                                :before-upload="beforeUpload2" 
                                :on-success="notifyUpload" 
                                :show-upload-list="false"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError">
                                    <Button type="primary" style="width:80px">重新上传</Button>
                                    <span style="color:#ff8a34">（建议尺寸：210*170px）</span>
                                </Upload>
                            </div>
                        </Form-item>
                    </Col>
                    <Col span="10" offset="2">
                        <Form-item label="品牌名称" prop="brandId">
                            <Select v-model="formData.brandId" placeholder="请选择" @on-change="changeValue">
                                <Option :value="item.id" v-for="(item,index) in brandList" :key="index">{{ item.brandName }}</Option>
                            </Select>
                        </Form-item>
                        <Form-item label="活动名称" prop="name">
                            <Input v-model='formData.name'></Input>
                        </Form-item>
                        <Form-item label="小程序URL" prop='detailUrl'>
                            <Input icon="ios-gear-outline" v-model='formData.detailUrl'></Input>
                        </Form-item>
                        <Form-item :label-width="1">
                            <div id="imgBox">
                                <span>活动查看列表</span>
                                <div class="changeImg">
                                    <img :src="activityImg" alt="" v-if="activityImg">
                                    <img src="../../../assets/image/imgBg.png" alt="" v-else>
                                </div>
                                <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
                                style="transform:translateX(40px)"
                                :data="upData" 
                                :before-upload="beforeUpload" 
                                :on-success="activityUpload" 
                                :show-upload-list="false"
                                :format="['jpg','jpeg','png']"
                                :on-format-error="handleFormatError">
                                    <Button type="primary" style="width:80px">重新上传</Button>
                                    <span style="color:#ff8a34">（建议尺寸：210*170px）</span>
                                </Upload>
                            </div>
                        </Form-item>
                    </Col>
                </Row>
            </Form>
            <!-- 规则 -->
            <div id="rules">
                <div class="rulesTitle">
                    <!-- <span style="width: 100px;">最小奖</span> -->
                    <span style="width: 100px;">类型</span>
                    <span style="width: 100px;">奖项</span>
                    <span style="width: 90px;">数量</span>
                    <span style="width: 88px;">概率</span>
                    <span style="width: 90px;">活动总量</span>
                    <span style="width: 90px;">单ID上限/日</span>
                    <!-- <span>单ID上限/周</span> -->
                    <span style="width: 90px;">单ID上限</span>
                    <span style="width: 90px;">通知消息</span>
                    <span style="width: 120px;">URL</span>
                </div>
                <!-- 规则 -->
                <div id="rulesList">
                    <div class="rulesItem">
                        <!-- <RadioGroup v-model="vertical" vertical class="radio">
                            <Radio :label="index" v-for="(item,index) in list" :key="index">
                                
                            </Radio>
                        </RadioGroup> -->
                        <div class="rulesBox" >
                            <div class="rulesChild" v-for="(item,index) in list" :key="index">
                                <select style="width:100px" id='presentType' v-model="item.presentType"  @change="handlePresent">
                                    <option value="0">电子券</option>
                                    <option value="1">实物</option>
                                    <option value="2">红包</option>
                                </select>
                                <!-- <Input class="rulesInput" size="small"></Input> -->
                                <select style="width:100px" id='goodsId' v-model="item.goodsId">
                                    <option :value="item.id" v-for="(item,index) in redGoodsList" :key='index'>{{ item.name }}/</option>
                                </select>
                                <!-- 有id为更新，无id为添加 -->
                                <input type="hidden" class="ivu-input" id="id" v-model="item.id">
                                <!-- 中奖数量 -->
                                <input type="number" class="ivu-input" id="quantity" v-model="item.quantity" @change="handleQuantity(item.quantity,item.totalQuantity,'单次中奖数量')">
                                <!-- 概率 -->
                                <input type="number" class="ivu-input" id="rate" v-model="item.rate">
                                <!-- 活动总量 -->
                                <input type="number" class="ivu-input" id="totalQuantity" v-model="item.totalQuantity" @change="handleTotalQuantity(item.quantity,item.userLimit,item.dailyLimit,item.totalQuantity)">
                                <!-- 单ID上限/日 -->
                                <input type="number" class="ivu-input" id="userLimit" v-model="item.userLimit" @change="handleQuantity(item.userLimit,item.totalQuantity,'单ID上限/日')">
                                <!-- 单ID上限 -->
                                <input type="number" class="ivu-input" id="dailyLimit" v-model="item.dailyLimit" @change="handleQuantity(item.dailyLimit,item.totalQuantity,'单ID上限')">
                                <input type="text" class="ivu-input" id="notifyContent" v-model="item.notifyContent">
                                <input type="text" class="ivu-input" style="width: 120px;" id="notifyDetailUrl" v-model="item.notifyDetailUrl">
                                
                                <div @click="addRules" class="rulesBtn" v-if="index == 0">
                                    <Icon type="plus-circled" size="25"></Icon>
                                </div>
                                <div v-else @click="delRules(index,item.id)"  class="rulesBtn" data-id=''>
                                    <Icon type="trash-a" size="25"></Icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <footer>
                <Button type="primary" @click='goBack'>返回</Button>
                <Button @click="submit('form')" type="success">保存</Button>
            </footer>
        </div>
        <Modal v-model='treeShow' @on-ok="areaList">
            <div style='height: 400px; overflow-y:auto;'>
                <ul v-for='(item,index) in areaData'>
                  <li style="overflow:hidden;">
                    <div style="float:left;width:15px;height:15px;cursor:pointer;" @click="areaDataShow[index].isShow=!areaDataShow[index].isShow">
                        <Icon type="arrow-down-b" size='15' v-if="item.children&&areaDataShow[index].isShow"></Icon>
                        <Icon type="arrow-right-b" size='15' v-if="item.children&&!areaDataShow[index].isShow"></Icon>
                    </div>
                    
                    <input :ref="'check' + index" @click="selectNames(index)" v-model="checkedList[index].checked" style="width:15px;height:15px;float:left" type="checkbox" :name="item.value" :value="item.value" />
                    <span style="font-size:14px;float:left;">{{item.title}}</span>
                    <ul v-if='item.children&&areaDataShow[index].isShow' v-for='(v,i) in item.children' style="margin-left:30px;clear:both;">
                      <li>
                        <input :ref="'check' + index + i" @click="selectNames(index,i)" v-model="checkedList[index].children[i].checked" style="width:15px;height:15px;" type="checkbox" :name="v.value" :value="v.value" />
                        <span style="font-size:14px;">{{v.title}}</span>
                      </li>
                    </ul>
                  </li>
                </ul>
            </div>
        </Modal>
        
    </div>
</template>

<script>
import area from "@/config/areaCode.js";
import upData from "@/assets/js/upload.js";
import PROJECT_CONFIG from "@/util/config.js";
import { validateStart, validateEnd } from "@/util/index.js";//验证规则

export default {
  data() {
    return {
      checkedList: [],
      checkedNames: [],
      treeShow: false,
      vertical: "none",
      // outArea: '',
      formData: {
        startTime: "",
        endTime: "",
        brandId: "",
        id: "",
        name: "",
        pageUrl: "",
        detailUrl: "",
        brandName: ""
      },
      list: [
        {
          presentType: "",
          quantity: "",
          rate: "",
          totalQuantity: "",
          userLimit: "",
          dailyLimit: "",
          notifyContent: "",
          notifyDetailUrl: ""
        }
      ],
      areaDataShow: [],
      notifyMessage: "",
      rule: {
        startTime: [{ validator: validateStart }],
        endTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "请选择品牌名称" }],
        name: [{ required: true, message: "请输入活动名称" }]
      },
      areaData: area,
      areaName: "",
      brandList: [], //品牌名称
      activityList: [],
      type: "",
      redGoodsList: [], //奖项
      upData: upData,
      notifyImg: "",
      activityImg: "",
      dailyLimit: "",
      weekLimit: "",
      userLimit: "",
      bizAreaList: [],
      vendorName: "",
      timeStr1:"",
      timeStr2:"",
      deleteItem: [] //要删除数组的id集合
    };
  },
  created() {
    // console.log(area)
    var type = this.$route.query.type;
    var id = this.$route.query.id;
    if (type) {
      this.type = type;
    }
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
    });
    this.Global.doPost(
      "goodsInfo/queryWithPage.json",
      {
        status: 1,
        type: 2,
        brandId: this.formData.brandId
          ? this.formData.brandId
          : this.$route.query.brandId
      },
      res => {
        this.redGoodsList = res.datalist;
        // console.log(this.redGoodsList);
      }
    );
    // this.Global.redGoodsList(res => {
    //   //奖项
    //   this.redGoodsList = res;
    // });
    if (id) {
      this.activityDetail(id);
    }
    for (let i = 0; i < 35; i++) {
      this.areaDataShow.push({
        isShow: false
      });
    }
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
  methods: {
    selectNames(index, i) {
      if (i == undefined) {
        for (let j = 0; j < this.checkedList[index].children.length; j++) {
          if (this.checkedList[index].checked) {
            if (this.checkedList[index].children) {
              this.checkedList[index].children[j].checked = false;
            }
          } else {
            this.checkedList[index].children[j].checked = true;
          }
        }
      } else {
        let n = this.checkedList[index].children.length;
        let m = 0;
        for (let j = 0; j < n; j++) {
          if (this.checkedList[index].children[j].checked) {
            m++;
          }
        }
        if (m + 1 == n) {
          this.checkedList[index].checked = true;
        }
        // else {
        //   this.checkedList[index].checked = false;
        // }
      }
    },
    addRules() {
      /* 
                添加空是因为 单选框会默认显示label数据
            */
      let item = {
        presentType: "",
        quantity: "",
        rate: "",
        totalQuantity: "",
        userLimit: "",
        dailyLimit: "",
        notifyContent: "",
        notifyDetailUrl: ""
      };
      this.list.push(item);
      // this.list.push('');
    },
    beforeUpload: function(res) {
      this.timeStr1 = Date.now()
      this.upData["key"] = "ecuda/image/" + this.timeStr1 + res.name;
    },
    beforeUpload2: function(res) {
      this.timeStr2 = Date.now()
      this.upData["key"] = "ecuda/image/" + this.timeStr2 + res.name;
    },
    notifyUpload: function(response, file, fileList) {
      this.notifyImg = PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr2 + file.name;
    },
    activityUpload: function(response, file, fileList) {
      this.activityImg = PROJECT_CONFIG.ossServer + "ecuda/image/" + this.timeStr1 + file.name;
    },
    handleFormatError: function(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    delRules(index, id) {
      if (id) {
        this.deleteItem.push(id);
      }
      this.list.splice(index, 1);
    },
    areaEcho(value) {
      function getNameByValue(value, data, level) {
        var temp = (value.substr(0, level) + "0000").substr(0, 6);

        for (var i = 0; i < data.length; i++) {
          if (data[i].value == temp) {
            if (value == temp) {
              // return data[i].label;
              data[i]["checked"] = true;
              data[i]["expand"] = true;
            } else {
              if (data[i].children) {
                getNameByValue(value, data[i].children, level + 2);
              }
            }
          }
        }
      }
      getNameByValue(value, this.areaData, 2);
    },
    areaInit() {
      let areaData = this.areaData;
      for (var i = 0; i < areaData.length; i++) {
        areaData[i].checked = false;
        if (areaData[i].children) {
          for (var j = 0; j < areaData[i].children.length; j++) {
            areaData[i].children[j].checked = false;
          }
        }
      }
    },
    activityDetail(id) {
      var newDate = new Date();
      if (id) {
        this.Global.doPost("activity/queryDrawActivityInfo.json", id, res => {
          this.formData["brandId"] = res.brandId;
          this.formData["name"] = res.name;
          this.formData["id"] = res.id;
          this.formData["pageUrl"] = res.pageUrl;
          this.formData["startTime"] = newDate.setTime(res.startTime);
          this.formData["endTime"] = newDate.setTime(res.endTime);
          this.formData["detailUrl"] = res.detailUrl;
          this.activityImg = res.logoUrl;
          this.notifyImg = res.presentList[0].notifyLogo;
          if (res.bizAreaList.length > 0) {
            console.log(res.bizAreaList);
            for (var i = 0; i < res.bizAreaList.length; i++) {
              this.bizAreaList.push(res.bizAreaList[i].areaCode);
              this.areaEcho(res.bizAreaList[i].areaCode);
              this.areaName += res.bizAreaList[i].areaName + "/";
            }
          }
          this.list = res.presentList;
          if (res.activityConfigList.length > 0) {
            for (var i = 0; i < res.activityConfigList.length; i++) {
              if (res.activityConfigList[i]["confType"] == "user_limit") {
                this.userLimit = res.activityConfigList[i].confValue;
              }
              if (res.activityConfigList[i]["confType"] == "daily_limit") {
                this.dailyLimit = res.activityConfigList[i].confValue;
              }
              if (res.activityConfigList[i]["confType"] == "week_limit") {
                this.weekLimit = res.activityConfigList[i].confValue;
              }
              if (res.activityConfigList[i]["confType"] == "out_area") {
                if (res.activityConfigList[i].confValue == "" || -1) {
                  this.notifyMessage = res.activityConfigList[i].notifyMessage;
                } else {
                  // this.outArea = 'min';
                }
              }
            }
          }
        });
      } else {
        this.$Message.error("请在活动列表重新选择");
      }
    },
    submit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.init();
        } else {
          this.$Message.error("请选择查询条件!!");
        }
      });
    },
    getInputValue(dom) {
      var arr = document.querySelectorAll(dom);
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        var b = arr[i].getElementsByTagName("input");
        var obj = {};
        for (var j = 0; j < b.length; j++) {
          if (b[j].type == "text") {
            obj[b[j].id] = b[j].value;
          }
          if (b[j].type == "hidden") {
            obj[b[j].id] = b[j].value;
          }
          if (b[j].type == "number") {
            obj[b[j].id] = b[j].value;
          }
        }
        var c = arr[i].getElementsByTagName("select");
        for (var g = 0; g < c.length; g++) {
          obj[c[g].id] = c[g].value;
        }
        obj["winFreq"] = "daily";
        newArr.push(obj);
        if (Number(this.vertical)) {
          newArr[this.vertical]["target"] = 2;
        }
      }
      return newArr;
    },
    setInputValue(dom, arr) {
      //  querySelectorAll() 是静态的，不会随着文档的改变而改变；

      for (var i = 0; i < arr.length - 1; i++) {
        this.addRules();
      }
      var a = document.getElementsByClassName("rulesChild");
      this.$nextTick(() => {
        for (var j = 0; j < a.length; j++) {
          var b = a[j].children;
          var c = {};
          for (var s in b) {
            c[s] = b[s];
          }
          for (var h in arr[j]) {
            if (c[h]) {
              c[h].value = arr[j][h];
            }
          }
        }
      });
    },
    init() {
      var data = this.Global.JsonChange(this.formData);
      console.log(this.formData);
      this.changeValue(this.formData.brandId);
      data["startTime"] = this.Global.createTime(this.formData.startTime);
      data["endTime"] = this.Global.createTime(this.formData.endTime);
      this.Global.deleteEmptyProperty(data);
      data["notifyLogo"] = this.notifyImg; //新消息通知图片notifyLogo
      data["logoUrl"] = this.activityImg; //活动查看列表
      data["bizAreaList"] = this.bizAreaList; //
      delete data.areaCode;
      var list = this.getInputValue(".rulesChild");
      data["presentList"] = list; //规则

      var config = [];
      // if( this.outArea == '' ){
      //     config.push({
      //         confType: 'out_area',
      //         confValue: '',
      //         notifyMessage: this.notifyMessage
      //     })
      // }else{
      //     config.push({
      //         confType: 'out_area',
      //         confValue: list[this.vertical].goodsId
      //     })
      // }
      if (this.dailyLimit) {
        config.push({
          confType: "daily_limit",
          confValue: this.dailyLimit
        });
      }
      if (this.weekLimit) {
        config.push({
          confType: "week_limit",
          confValue: this.weekLimit
        });
      }
      if (this.userLimit) {
        config.push({
          confType: "user_limit",
          confValue: this.userLimit
        });
      }
      data["activityConfigList"] = config;
      data["type"] = 1;
      var api;
      if (this.type == "edd") {
        api = "activity/modiActivityInfo.json";
      }
      if (this.type == "add") {
        api = "activity/addActivityInfo.json";
      }
      data["presentDeleteList"] = this.deleteItem; //删除数组的id集合
      this.Global.doPost(api, data, res => {
        this.$router.push("/openawardActivityMaintain");
      });
    },
    changeValue(value) {
      for (var i = 0; i < this.brandList.length; i++) {
        if (this.brandList[i].id == value) {
          this.formData["brandName"] = this.brandList[i].brandName;
          this.formData["brandId"] = this.brandList[i].id;
          this.vendorName = this.brandList[i].vendorName;
          break;
        }
      }
    },
    areaList() {
      // console.log(this.checkedList)
      // return
      // var treeData = this.$refs.tree.getCheckedNodes();
      // console.log(treeData)
      var arr = [];
      var areaName = "";
      for (let i = 0; i < this.checkedList.length; i++) {
        if (this.checkedList[i].checked) {
          arr.push(this.areaData[i].value);
          areaName += this.areaData[i].title + "/";
        }
        if (this.checkedList[i].children) {
          for (let j = 0; j < this.checkedList[i].children.length; j++) {
            if (this.checkedList[i].children[j].checked) {
              arr.push(this.areaData[i].children[j].value);
              areaName += this.areaData[i].children[j].title + "/";
            }
          }
        }
      }
      // for (var i = 0; i < treeData.length; i++) {
      //   arr.push(treeData[i].value);
      //   areaName += treeData[i].title + "/";
      // }
      this.bizAreaList = arr;
      this.areaName = areaName;
    },
    showTree() {
      let len = this.areaData.length;
      for (let i = 0; i < len; i++) {
        this.areaDataShow[i].isShow = false;
      }
      this.treeShow = true;
    },
    goBack() {
      this.$router.back();
    },
    exportExcel() {
      var data = this.Global.JsonChange(this.formData);
      this.Global.deleteEmptyProperty(data);
      data["userType"] = "B";
      var url = this.Global.getExportUrl(
        "report/userInfoDetailExport.json",
        data
      );
      window.open(url);
    },
    handleQuantity(num, totalNum, string) {
      //单次中奖数量
      if (num && totalNum) {
        if (num > totalNum) {
          this.$Message.error(string + "不得超过活动总量");
        }
      }
    },
    handleTotalQuantity(quantity, userLimit, dailyLimit, totalNum) {
      //活动总量
      //quantity单次中奖数量  userLimit单ID上限/日 dailyLimit单ID上限

      if (quantity && totalNum) {
        if (quantity > totalNum) {
          this.$Message.error({
            content: "单次中奖数量不得超过活动总量",
            duration: 5
          });
        }
      }
      if (userLimit && totalNum) {
        if (userLimit > totalNum) {
          this.$Message.error({
            content: "单ID上限/日数量不得超过活动总量",
            duration: 5
          });
        }
      }
      if (dailyLimit && totalNum) {
        if (dailyLimit > totalNum) {
          this.$Message.error({
            content: "单ID上限数量不得超过活动总量",
            duration: 5
          });
        }
      }
    },
    handlePresent(val) {
      let presentVal = document.getElementById("presentType").value;
      console.log(presentVal);
    }
  }
};
</script>


