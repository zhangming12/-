<style lang="less" scoped>
@import "../../config/index.less";
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

#outArea {
  margin-top: 10px;
  &:before {
    content: "区域外奖项：";
    display: inline-block;
  }
  .outInput {
    display: inline-block;
    transform: translateY(-13px);
    .ivu-input {
      padding: 1px 7px;
      height: 24px;
      border-radius: 3px;
      text-align: center;
    }
  }
}

#limit {
  margin-top: 30px;
  &:before {
    content: "限制条件：";
    display: inline-block;
  }
  .child {
    display: inline-block;
    margin-right: 30px;
    .Input {
      display: inline-block;
      // transform: translateY(0px);
      .ivu-input {
        padding: 1px 7px;
        height: 24px;
        border-radius: 3px;
        text-align: center;
      }
    }
  }
}
footer {
  text-align: center;
  margin: 40px 0 20px;
  button {
    width: 70px;
  }
  .btn-next {
    margin-left: 20px;
  }
  .ivu-btn {
    line-height: 1;
  }
  // button{
  //     display: inline-block;
  //     width: 76px;
  //     height: 28px;
  //     text-align: center;
  //     line-height: 28px;
  //     font-size: 16px;
  //     border: 0;
  //     outline: none;
  //     color: #fff;
  //     background: #fd7f23;
  //     cursor: pointer;
  // }
  // button:last-child{
  //     background:#009847;
  //     margin-left: 60px;
  // }
}
</style>

<template>
    <div id="Main">
        <!-- <h2 class="Title">新建&修改</h2> -->
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
                        <!-- <Cascader :data="areaData" v-model="formData.areaCode"></Cascader> -->
                        <!-- <Input icon="ios-gear-outline" v-model='areaName' readonly @click='showTree'></Input> -->
                        <div @click='showTree' class='area'>{{areaName}}</div>
                    </Form-item>
                    <Form-item label="活动样式" prop='pageUrl'>
                        <Input icon="ios-gear-outline" v-model='formData.pageUrl'></Input>
                    </Form-item>
                    <!-- <Form-item label="公众号URL">
                        <Input icon="ios-gear-outline"></Input>
                    </Form-item> -->
                    <Form-item :label-width="1">
                        <div id="imgBox">
                            <span>通知消息图片</span>
                            <div class="changeImg">
                                <img :src="notifyImg" alt="" v-if="notifyImg">
                                <img src="../../assets/image/imgBg.png" alt="" v-else>
                            </div>
                            <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
                            style="transform:translateX(40px)"
                            :data="upData" 
                            :before-upload="beforeUpload2" 
                            :on-success="notifyUpload" 
                            :show-upload-list="false"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError">
                                <Button type="primary">重新上传</Button>
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
                    <!-- <Form-item>
                        <Input style="visibility:hidden"></Input>
                    </Form-item> -->
                    <Form-item :label-width="1">
                        <div id="imgBox">
                            <span>活动查看列表</span>
                            <div class="changeImg">
                                <img :src="activityImg" alt="" v-if="activityImg">
                                <img src="../../assets/image/imgBg.png" alt="" v-else>
                            </div>
                            <Upload action="https://hbrand.oss-cn-hangzhou.aliyuncs.com" 
                            style="transform:translateX(40px)"
                            :data="upData" 
                            :before-upload="beforeUpload" 
                            :on-success="activityUpload" 
                            :show-upload-list="false"
                            :format="['jpg','jpeg','png']"
                            :on-format-error="handleFormatError">
                                <Button type="primary">重新上传</Button>
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
                    <span style="width: 80px;">最小奖</span>
                    <span style="width: 98px;">类型</span>
                    <span style="width: 96px;">奖项</span>
                    <span style="width: 94px;">数量</span>
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
                        <RadioGroup v-model="vertical" vertical class="radio">
                            <Radio :label="index" v-for="(item,index) in list" :key="index">
                                {{item}}
                            </Radio>
                        </RadioGroup>
                        <div class="rulesBox" >
                            <div class="rulesChild" v-for="(item,index) in list" :key="index">
                                <select style="width:100px" id='presentType' @change="handlePresent">
                                    <option value="0">电子券</option>
                                    <option value="1">实物</option>
                                    <option value="2">红包</option>
                                </select>
                                
                                <!-- <Input class="rulesInput" size="small"></Input> -->
                                <select style="width:100px" id='goodsId'>
                                    <option :value="item.id" v-for="(item,index) in redGoodsList" :key='index'>{{ item.name }}/</option>
                                </select>
                                <input type="text" class="ivu-input" id="quantity">
                                <input type="text" class="ivu-input" id="rate">
                                <input type="text" class="ivu-input" id="totalQuantity">
                                <input type="text" class="ivu-input" id="userLimit">
                        
                                <input type="text" class="ivu-input" id="dailyLimit">
                                <input type="text" class="ivu-input" id="notifyContent">
                                <input type="text" class="ivu-input" style="width: 120px;" id="notifyDetailUrl">
                                <div @click="addRules" class="rulesBtn" v-if="index == 0">
                                    <Icon type="plus-circled" size="25"></Icon>
                                </div>
                                <div v-else @click="delRules(index)" class="rulesBtn">
                                    <Icon type="trash-a" size="25"></Icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- 区域外奖项 -->
            <div id="outArea">
                <RadioGroup v-model="outArea" vertical class="radio">
                    <Radio label="">
                        非活动区域不中奖
                    </Radio>
                    <Radio label="min">
                        非活动区域中最小奖
                    </Radio>
                </RadioGroup>
                <div class='outInput'>
                    <input type="text" class="ivu-input" v-model='notifyMessage'>
                </div>
            </div>
            <!-- 限制条件 -->
            <div id='limit'>
                <div class='child'>
                    <span>单ID上限/日</span>
                    <div class='Input'>
                        <input type="text" class="ivu-input" v-model='dailyLimit'>
                    </div>  
                    
                </div>
                <div class='child'>
                    <span>单ID上限/周</span>
                    <div class='Input'>
                        <input type="text" class="ivu-input" v-model='weekLimit'>
                    </div> 
                </div>
                <div class='child'>
                    <span>单ID上限/总</span>
                    <div class='Input'>
                        <input type="text" class="ivu-input" v-model='userLimit'>
                    </div> 
                </div>
            </div>
            <footer>
                <Button type="primary" @click='goBack'>取消</Button>
                <Button type="success" @click="submit('form')" class="btn-next">下一步</Button>
            </footer>
        </div>
        <Modal v-model='treeShow' @on-ok="areaList">
            <div style='height: 400px; overflow-y:auto;'>
                <Tree :data="areaData" ref='tree' multiple show-checkbox></Tree>
            </div>
        </Modal>
        
    </div>
</template>

<script>
import area from "../../config/areaCode.js";
import { areaTreeInit } from "@/util/index.js";
import upData from "../../assets/js/upload.js";
import PROJECT_CONFIG from "../../util/config.js";
export default {
  data() {
    const that = this;
    const validateStart = (rule, value, callback) => {
      // 验证开始时间
      if (value == "") {
        callback(new Error("请输入开始时间"));
      } else {
        if (this.formData.endTime !== "") {
          // 对结束时间单独验证
          this.$refs.form.validateField("endTime");
        }
        callback();
      }
    };
    const validateEnd = (rule, value, callback) => {
      // 验证结束时间

      if (value == "") {
        callback(new Error("请输入结束时间"));
      } else {
        const str = new Date(this.formData.startTime).getTime();
        const end = new Date(value).getTime();
        if (end < str) {
          // 判断开始时间是否大于结束时间
          callback(new Error("开始时间大于结束时间"));
        } else {
          callback();
        }
      }
    };
    return {
      treeShow: false,
      wenzi: "",
      vertical: "none",
      outArea: "",
      formData: {
        startTime: "",
        endTime: "",
        brandId: "",
        id: "",
        name: "",
        pageUrl: "",
        detailUrl: ""
      },
      list: [""],
      notifyMessage: "",
      rule: {
        startTime: [{ validator: validateStart }],
        endTime: [{ validator: validateEnd }],
        brandId: [{ required: true, message: "请选择品牌名称" }],
        name: [{ required: true, message: "请输入活动名称" }]
      },
      areaData: area,
      areaName: "",
      brandList: [],
      activityList: [],
      type: "",
      redGoodsList: [],
      upData: upData,
      notifyImg: "",
      activityImg: "",
      dailyLimit: "",
      weekLimit: "",
      userLimit: "",
      bizAreaList: [],
      vendorName: "",
      img1TimeStr:"",
      img2TimeStr:""
    };
  },
  created: function() {
    var type = this.$route.query.type;
    var id = this.$route.query.id;
    if (type) {
      this.type = type;
    }
    if (id) {
      this.activityDetail(id);
    }
    var that = this;
    this.Global.doPostNoLoading("condition/queryBrands.json", {}, res => {
      this.brandList = [];
      Object.entries(res).forEach(item => {
        this.brandList.push({ id: Number(item[0]), brandName: item[1] });
      });
    });
    this.Global.redGoodsList(function(res) {
      that.redGoodsList = res;
    });
    areaTreeInit(this.areaData); //重新打开地区tree，取消上次选中效果
  },
  methods: {
    addRules: function() {
      /* 
                添加空是因为 单选框会默认显示label数据
            */
      this.list.push("");
    },
    beforeUpload: function(res) {
      this.img1TimeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.img1TimeStr + res.name;
    },
    beforeUpload2: function(res) {
      this.img2TimeStr = Date.now();
      this.upData["key"] = "ecuda/image/" + this.img2TimeStr + res.name;
    },
    notifyUpload: function(response, file, fileList) {
      this.notifyImg = PROJECT_CONFIG.ossServer + "ecuda/image/" + this.img2TimeStr + file.name;
    },
    activityUpload: function(response, file, fileList) {
      this.activityImg = PROJECT_CONFIG.ossServer + "ecuda/image/" + this.img1TimeStr + file.name;
    },
    handleFormatError: function(file) {
      this.$Notice.warning({
        title: "文件格式不正确",
        desc:
          "文件 " + file.name + " 格式不正确，请上传 jpg 或 png 格式的图片。"
      });
    },
    delRules: function(index) {
      this.list.splice(index, 1);
    },
    areaEcho: function(value) {
      var that = this;
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
      getNameByValue(value, that.areaData, 2);
    },
    activityDetail: function(id) {
      var that = this;
      var newDate = new Date();
      if (id) {
        this.Global.doPost("activity/queryDrawActivityInfo.json", id, function(
          res
        ) {
          that.formData["brandId"] = res.brandId;
          that.formData["name"] = res.name;
          that.formData["id"] = res.id;
          that.formData["pageUrl"] = res.pageUrl;
          that.formData["startTime"] = newDate.setTime(res.startTime);
          that.formData["endTime"] = newDate.setTime(res.endTime);
          that.formData["detailUrl"] = res.detailUrl;
          that.activityImg = res.logoUrl;
          that.notifyImg = res.presentList[0].notifyLogo;
          if (res.bizAreaList.length > 0) {
            for (var i = 0; i < res.bizAreaList.length; i++) {
              that.bizAreaList.push(res.bizAreaList[i].areaCode);
              that.areaEcho(res.bizAreaList[i].areaCode);
              that.areaName += res.bizAreaList[i].areaName + "/";
            }
          }
          that.setInputValue("rulesChild", res.presentList);
          if (res.activityConfigList.length > 0) {
            for (var i = 0; i < res.activityConfigList.length; i++) {
              if (res.activityConfigList[i]["confType"] == "user_limit") {
                that.userLimit = res.activityConfigList[i].confValue;
              }
              if (res.activityConfigList[i]["confType"] == "daily_limit") {
                that.dailyLimit = res.activityConfigList[i].confValue;
              }
              if (res.activityConfigList[i]["confType"] == "week_limit") {
                that.weekLimit = res.activityConfigList[i].confValue;
              }
              if (res.activityConfigList[i]["confType"] == "out_area") {
                if (res.activityConfigList[i].confValue == "" || -1) {
                  that.outArea = "";
                  that.notifyMessage = res.activityConfigList[i].notifyMessage;
                } else {
                  that.outArea = "min";
                }
              }
            }
          }
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
    getInputValue: function(dom) {
      var arr = document.querySelectorAll(dom);
      var newArr = [];
      for (var i = 0; i < arr.length; i++) {
        var b = arr[i].getElementsByTagName("input");
        var obj = {};
        for (var j = 0; j < b.length; j++) {
          if (b[j].type == "text") {
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
    setInputValue: function(dom, arr) {
      //  querySelectorAll() 是静态的，不会随着文档的改变而改变；

      for (var i = 0; i < arr.length - 1; i++) {
        this.addRules();
      }
      var a = document.getElementsByClassName("rulesChild");
      this.$nextTick(function() {
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
    init: function() {
      var that = this;
      var data = this.Global.JsonChange(this.formData);
      data["startTime"] = this.Global.createTime(this.formData.startTime);
      data["endTime"] = this.Global.createTime(this.formData.endTime);
      this.Global.deleteEmptyProperty(data);
      data["notifyLogo"] = this.notifyImg;
      data["logoUrl"] = this.activityImg;
      data["bizAreaList"] = this.bizAreaList;
      delete data.areaCode;
      var list = this.getInputValue(".rulesChild");
      data["presentList"] = list;
      var config = [];
      if (this.outArea == "") {
        config.push({
          confType: "out_area",
          confValue: "",
          notifyMessage: this.notifyMessage
        });
      } else {
        config.push({
          confType: "out_area",
          confValue: list[this.vertical].goodsId
        });
      }
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
      data["isPromote"] = 1;
      var api;
      if (this.type == "edd") {
        api = "activity/modiActivityInfo.json";
      }
      if (this.type == "add") {
        api = "activity/addActivityInfo.json";
      }
      this.Global.doPost(api, data, function(res) {
        // that.$router.push('/salesmanNext');
        // that.$store.commit('default',{
        //     brandId: that.formData['brandId'],
        //     vendorName: that.vendorName,
        //     id: that.formData['id'],
        //     brandName: that.formData['brandName']
        // })
        let pramasData = {
          brandId: that.formData["brandId"],
          vendorName: that.vendorName,
          id: res,
          brandName: that.formData["brandName"]
        };
        that.$router.push({ path: "/salesmanNext", query: pramasData });
      });
    },
    changeValue: function(value) {
      for (var i = 0; i < this.brandList.length; i++) {
        if (this.brandList[i].id == value) {
          this.formData["brandName"] = this.brandList[i].brandName;
          this.formData["brandId"] = this.brandList[i].id;
          this.vendorName = this.brandList[i].vendorName;
          break;
        }
      }
    },
    areaList: function() {
      var treeData = this.$refs.tree.getCheckedNodes();
      var arr = [];
      var areaName = "";
      for (var i = 0; i < treeData.length; i++) {
        arr.push(treeData[i].value);
        areaName += treeData[i].title + "/";
      }
      this.bizAreaList = arr;
      this.areaName = areaName;
    },
    showTree: function() {
      this.treeShow = !this.treeShow;
    },
    goBack: function() {
      this.$router.back();
    },
    handlePresent() {
      let presentVal = document.getElementById("presentType").value;
      console.log(presentVal);
    }
  }
};
</script>


